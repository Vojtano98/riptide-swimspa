#!/usr/bin/env python3
"""Regenerates src/data/shop/<model>.js and src/data/shared/insulation.js from the official SwimSpa.cz product pages.

Pulls, per model, only what the page itself states: the model description and the
equipment lists (water care, insulation, additional equipment). Prices are NOT taken from
here — see the note in the module header. The main product image (top view, transparent background) is downloaded and trimmed to
its content; that step needs Pillow (pip install pillow).
Run: python3 scripts/fetch-shop-content.py
"""
import html, io, json, os, re, urllib.request

BASE = 'https://www.swimspa.cz/swim-spa/'
MODELS = {  # our slug -> shop slug
    'atlas-4-4': 'riptide-atlas-hydro-4-4', 'atlas-6-0': 'riptide-atlas-hydro-6-0',
    'aqua-life-4-0': 'riptide-aqua-life-hydro-4-0', 'aqua-life-4-4': 'riptide-aqua-life-hydro-4-4',
    'aqua-life-5-5': 'riptide-aqua-life-hydro-5-5', 'aqua-life-6-0': 'riptide-aqua-life-hydro-6-0',
    'aqua-life-6-0-duo': 'riptide-aqua-life-hydro-6-0-duo',
    'atlantis-4-4': 'riptide-atlantis-pro-premium-4-4', 'atlantis-6-0': 'riptide-atlantis-pro-premium-6-0',
    'atlantis-7-0': 'riptide-atlantis-pro-premium-7-0',
    'easy-life-4-4': 'riptide-easy-life-pro-4-4', 'easy-life-5-5': 'riptide-easy-life-pro-5-5',
    'easy-life-6-0': 'riptide-easy-life-pro-6-0', 'easy-life-6-0-duo': 'riptide-easy-life-pro-6-0-duo',
    'easy-life-7-0': 'riptide-easy-life-pro-7-0', 'easy-life-7-0-duo': 'riptide-easy-life-pro-7-0-duo',
    'easy-life-8-0': 'riptide-easy-life-pro-8-0', 'easy-life-8-0-duo': 'riptide-easy-life-pro-8-0-duo',
}
NAMES = {'atlas': 'Atlas', 'atlantis': 'Atlantis', 'aqua-life': 'Aqua Life', 'easy-life': 'Easy Life'}

# Evident typos / formatting slips in the shop copy (wording otherwise untouched).
FIXES = [
    ('3``', '3″'), ('zńa', 'zóna'), ('jejo', 'její'), ('jendozónových', 'jednozónových'),
    ('výkonností plavání', 'výkonnostní plavání'), ('jsou pak obsluhování', 'jsou pak obsluhovány'),
    ('5 sedících osoby', '5 sedících osob'), ('Swim spy', 'Swim spa'),
]


def fetch(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'}), timeout=60).read()


def product_image(slug, page_html):
    """Main product image from the shop CDN -> trimmed WebP in public/assets/photos."""
    from PIL import Image
    m = re.search(r'https://cdn\.myshoptet\.com/usr/www\.swimspa\.cz/user/shop/orig/([^"\'\s?<>]+)', page_html)
    if not m:
        return None
    im = Image.open(io.BytesIO(fetch(m.group(0)))).convert('RGBA')
    box = im.split()[3].point(lambda v: 255 if v > 8 else 0).getbbox()
    if box:
        pad = 6
        box = (max(0, box[0] - pad), max(0, box[1] - pad), min(im.width, box[2] + pad), min(im.height, box[3] + pad))
        im = im.crop(box)
    name = 'model-%s.webp' % slug
    im.save('public/assets/photos/' + name, 'WEBP', quality=92, alpha_quality=100, method=6)
    return {'src': '/assets/photos/' + name, 'width': im.width, 'height': im.height}


def lines_of(url, raw=None):
    t = fetch(url).decode('utf-8', 'ignore')
    t = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', t, flags=re.S)
    t = re.sub(r'<(br|/p|/li|/h\d|/div|/tr)[^>]*>', '\n', t)
    txt = html.unescape(re.sub(r'<[^>]+>', '', t))
    return [l for l in (re.sub(r'\s+', ' ', x).strip() for x in txt.split('\n')) if l]


def idx(L, prefix, start=0):
    return next(i for i in range(start, len(L)) if L[i].startswith(prefix))


def clean(slug, p):
    for a, b in FIXES:
        p = p.replace(a, b)
    base = slug.rsplit('-', 2)[0] if slug[-1].isdigit() else slug
    series = next(k for k in NAMES if slug.startswith(k))
    # Shop names carry the shop's variant (Hydro / Pro / Pro Premium); the site names the model.
    p = re.sub(r'%s (?:Hydro|Pro Premium|Pro) (\d\.\d)' % NAMES[series], NAMES[series] + r' \1', p)
    p = p.replace(NAMES[series] + ' Hydro PRO', NAMES[series] + ' PRO')
    return p


def group(L, start, end):
    """Collapse 'Label:' + following zone lines into (label, value) pairs."""
    rows, cur = [], None
    for l in L[start:end]:
        if l.endswith(':'):
            cur = [l[:-1], []]
            rows.append(cur)
        elif cur and re.match(r'^(Vířivková|Plavací) zóna:', l):
            cur[1].append(l)
        else:
            cur = None
            k, _, v = l.partition(': ')
            rows.append([k, [v]])
    return [[k, '; '.join(v)] for k, v in rows]


out = {}
for slug, shop in MODELS.items():
    page = fetch(BASE + shop + '/').decode('utf-8', 'ignore')
    L = lines_of(BASE + shop + '/')
    d0 = idx(L, 'Reproduktory') + 1
    d1 = idx(L, 'Inovativní design')
    paras = [clean(slug, p) for p in L[d0:d1]]
    if slug.startswith(('atlantis', 'easy-life')):
        # The shop copy also describes the entry "Hydro" build (2 jets); the site does not
        # sell that build for these series, so that paragraph would contradict the spec table.
        paras = [p for p in paras if 'V klasickém provedení' not in p]

    w0, w1 = idx(L, 'Vodní péče'), idx(L, 'Izolační systém')
    i0 = idx(L, '5-stupňový celopěnový')
    layers = []
    for l in L[i0 + 1:i0 + 6]:
        m = re.match(r'^\d\. (.+?) [-–] (.+)$', l)
        layers.append({'name': m.group(1), 'text': m.group(2)})
    e0 = idx(L, 'Doplňková výbava')
    out[slug] = {
        'source': BASE + shop + '/',
        'image': product_image(slug, page),
        'description': paras,
        'equipment': {
            'water': group(L, w0 + 1, w1),
            'insulation': {'label': L[w1 + 1], 'layers': layers},
            'extras': group(L, e0 + 1, e0 + 5),
        },
    }

import os
os.makedirs('src/data/shop', exist_ok=True)
layers = {json.dumps(v['equipment']['insulation'], sort_keys=True) for v in out.values()}
assert len(layers) == 1, 'insulation text differs between models - handle per model'
insulation = next(iter(out.values()))['equipment']['insulation']

header = (
    '// GENERATED by scripts/fetch-shop-content.py from the official SwimSpa.cz product pages\n'
    '// (model description + equipment lists). Prices are deliberately not imported: the shop\n'
    '// shows discounted prices for a single equipment level that do not line up with the\n'
    '// per-level prices in src/data/models.\n'
)
for slug, v in out.items():
    v['equipment'].pop('insulation')
    body = json.dumps(v, ensure_ascii=False, indent=2)
    open('src/data/shop/%s.js' % slug, 'w', encoding='utf-8').write(header + 'export const shop = ' + body + '\n')
open('src/data/shared/insulation.js', 'w', encoding='utf-8').write(
    header + 'export const insulation = ' + json.dumps(insulation, ensure_ascii=False, indent=2) + '\n'
)
print('wrote', len(out), 'models')
