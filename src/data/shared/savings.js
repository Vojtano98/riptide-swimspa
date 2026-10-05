// Real measured energy data from the Riptide (Oasis) product catalogues —
// CEC energy test comparison printed on every spec sheet.

export const savings = {
  eyebrow: 'ÚSPORA ENERGIE',
  headline: 'Až o 26 % nižší náklady na ohřev než standard CEC.',
  text: 'CEC je kalifornský energetický standard pro vířivky a swim spa. V nezávislém testu spotřeboval Riptide 11,2 kWh denně oproti 14,98 kWh u standardu CEC. Rozdíl dělá pětivrstvá izolace Platinum Lock.',
  bars: [
    {
      label: 'Standard CEC',
      sublabel: '14,98 kWh / den',
      value: 14.98,
      display: '14,98 kWh',
      tone: 'muted',
    },
    {
      label: 'Riptide swim spa',
      sublabel: '11,2 kWh / den',
      value: 11.2,
      display: '11,2 kWh',
      tone: 'accent',
    },
  ],
  stats: [
    { value: '−26 %', label: 'nižší spotřeba než standard CEC' },
    { value: '5 vrstev', label: 'izolace Platinum Lock' },
    { value: '6 režimů', label: 'ovládání tepelného čerpadla SpaTech' },
  ],
  note: 'Zdroj: CEC test (72 hodin, voda 39 ± 1 °C, okolní teplota 17 °C) — technický katalog Riptide 2026.',
}
