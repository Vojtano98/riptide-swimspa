// Shell + cabinet colour options — printed on every Riptide spec sheet as a
// swatch row (Alpine White shell, Ice Grey / Ash Black cabinet), never rendered
// on the site until now.
export function renderMaterialsSwatches(model) {
  const { materials } = model
  if (!materials) return ''

  const swatch = (o) => `
    <div class="material-swatch">
      <span class="material-swatch-color" style="background:${o.color}"></span>
      <span class="material-swatch-name">${o.name}</span>
    </div>
  `

  return `
        <div class="materials-layout" data-reveal>
          <div>
            <span class="eyebrow">Barevné provedení</span>
            <h2 class="h-sub">Barvy dle vzorníku výrobce.</h2>
            <p class="body-l">${materials.note}</p>
          </div>
          <div class="materials-groups">
            <div class="material-group">
              <div class="material-group-label">${materials.shell.label}</div>
              <div class="material-swatches">${materials.shell.options.map(swatch).join('')}</div>
            </div>
            <div class="material-group">
              <div class="material-group-label">${materials.cabinet.label}</div>
              <div class="material-swatches">${materials.cabinet.options.map(swatch).join('')}</div>
            </div>
          </div>
        </div>
  `
}
