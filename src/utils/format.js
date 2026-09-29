export function formatPrice(value, currency = 'Kč') {
  const formatted = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return `${formatted} ${currency}`
}
