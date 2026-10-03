// Equipment levels from the cheapest to the best-equipped. Order is by level, not by price:
// not every level has a published price (the e-shop sells one level per model).
const ORDER = ['Hydro', 'Pro Luxury', 'Pro Premium']
const rank = (v) => {
  const i = ORDER.indexOf(v.name)
  return i < 0 ? ORDER.length : i
}

export const sortVariants = (variants) => [...variants].sort((a, b) => rank(a) - rank(b))

// The level the page opens on: the one with a real price, else the recommended one.
export const initialVariant = (model) => {
  const sorted = sortVariants(model.variants)
  return sorted.find((v) => v.price != null) || sorted.find((v) => v.featured) || sorted[0]
}
