import { shopPrices } from './shopPrices.js'

const shops = import.meta.glob('../shop/*.js', { eager: true })

// Real product picture for a model card: the 3/4 view where the shop has one, else the top view.
const thumbFor = (slug) => {
  const shop = shops[`../shop/${slug}.js`]?.shop
  return shop?.imageSide || shop?.image || null
}

const slugOf = (href) => href.split('/').filter(Boolean).pop()

// Model-list entries (series pages, products page) get the e-shop price + its equipment level
// and the shop thumbnail. The page hero is deliberately not touched.
export function withShopData(models) {
  return models.map((m) => {
    const slug = slugOf(m.href)
    const p = shopPrices[slug]
    return { ...m, price: p ? p.price : null, priceTier: p?.tier ?? null, thumb: thumbFor(slug) }
  })
}
