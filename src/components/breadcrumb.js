export function renderBreadcrumb(items) {
  const parts = items
    .map((it, i) =>
      i < items.length - 1
        ? `<a href="${it.href}">${it.label}</a><span class="breadcrumb-sep">/</span>`
        : `<span class="breadcrumb-current">${it.label}</span>`
    )
    .join('')

  return `
    <nav class="breadcrumb">
      <div class="container breadcrumb-inner">${parts}</div>
    </nav>
  `
}
