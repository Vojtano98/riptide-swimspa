export function formatPrice(value, currency = 'Kč') {
  const formatted = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return `${formatted} ${currency}`
}

// Czech number formatting: non-breaking space thousands separator, decimal comma.
export function formatNumber(value) {
  const [int, dec] = String(value).split('.')
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return dec ? `${grouped},${dec}` : grouped
}
