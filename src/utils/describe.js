// Turns the flat list of paragraphs from the official SwimSpa.cz description into
// something readable: an intro, then labelled blocks (massage zone, swim section, current,
// entry), each cut into short paragraphs with the key facts in bold. Only restructures —
// every word is the shop's own; headings are plain topic labels, not claims.
const BLOCKS = [
  { id: 'masaz', label: 'Masážní zóna', test: /^(Masážní vířivková zóna|Vířivková část)/ },
  { id: 'plavani', label: 'Plavecká část', test: /^(Bazénová plavací část|Celá řada Atlas|Díky opravdu dlouhé bazénové)/ },
  { id: 'protiproud', label: 'Protiproud', test: /(protiproud)/i, strict: /^(Samotná kapitola|V provedení)/ },
  { id: 'nastup', label: 'Nástup do vody', test: /^Nedílnou součástí designu/ },
]

// One alternation so nothing is bolded twice. Terms are phrases that occur in the shop copy.
const KEY = new RegExp(
  [
    String.raw`\d+(?:[.,]\d+)?\s?(?:cm|mm|kW|hp|metrů|m)(?![\wěščřžýáíéúůď])`,
    String.raw`(?:minimálně\s)?\d+\s(?:osob\w*|osoby)`,
    String.raw`(?:jednoho|jedné)\s(?:lehu|sedolehu|lehátka)\s(?:a|s)\s\p{L}+\ssedov\p{L}+\spozic\p{L}*`,
    String.raw`\d+(?:[.,]\d+)?\smetrov\p{L}+`,
    String.raw`10 rychlostí`,
    String.raw`(?:dvěma|čtyřmi)\s3″\strysk\w+\sTurbo\sSwim\sJets`,
    String.raw`Turbo Swim Jets`,
    String.raw`10\s?stupň\p{L}+(?:\s(?:INVERTEROV|invertorov)\p{L}+)?`,
    String.raw`INVERTEROVÁ`,
    String.raw`jednorychlostním\sHPS\sčerpadlem`,
    String.raw`COOL DOWN`,
    String.raw`(?:Lehová pozice|Zádové partie|Ústřední rohová sedová pozice|Dvě prostřední sedové pozice)`,
    String.raw`komplexní masáž nohou|blowerová vzduchová masáž spodních stehen|chodidlová tryska`,
    String.raw`(?:oboustranné integrované schodiště|příjemný nástupní schůdek|příjemné nástupní schodiště)`,
    String.raw`nejlepší parametr mezi swim spami`,
  ].join('|'),
  'gu'
)

const emphasize = (text) => text.replace(KEY, '<strong>$&</strong>')

// Cut a long paragraph into short ones (at most two sentences / ~260 chars each).
function chunk(paragraph) {
  const sentences = paragraph.split(/(?<=[.!?])\s+(?=[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ])/)
  const out = []
  let cur = ''
  for (const s of sentences) {
    if (cur && (cur.length + s.length > 260)) {
      out.push(cur)
      cur = s
    } else {
      cur = cur ? `${cur} ${s}` : s
    }
  }
  if (cur) out.push(cur)
  return out
}

export function describeModel(paragraphs) {
  const [lead, ...rest] = paragraphs
  const intro = []
  const blocks = []
  let current = null
  for (const p of rest) {
    const def = BLOCKS.find((b) => (b.strict ? b.strict.test(p) : b.test.test(p)))
    if (def) {
      current = blocks.find((b) => b.id === def.id) || { id: def.id, label: def.label, paras: [] }
      if (!blocks.includes(current)) blocks.push(current)
      current.paras.push(p)
    } else if (current && !/^Model /.test(p)) {
      current.paras.push(p) // continuation of the previous topic (e.g. "Díky opravdu dlouhé…")
    } else {
      intro.push(p)
    }
  }
  const fmt = (list) => list.flatMap(chunk).map(emphasize)
  return {
    lead: emphasize(lead),
    intro: fmt(intro),
    blocks: blocks.map((b) => ({ id: b.id, label: b.label, paras: fmt(b.paras) })),
  }
}
