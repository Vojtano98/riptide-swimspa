// What the three equipment levels mean, in one line each. Derived from the spec sheets —
// the same pattern holds for every model: Hydro has 2 swim jets on a 25 A supply, Pro Luxury
// 4 jets on 32 A, Pro Premium 4 jets with the 10-step variable-speed pumps on 40 A.
export const tiers = {
  Hydro: {
    summary: '2 plavecké trysky, jedna síla proudu',
    who: 'Na rekreační plavání a s nejnižší pořizovací cenou.',
  },
  'Pro Luxury': {
    summary: '4 plavecké trysky, jedna síla proudu',
    who: 'Silnější proud pro pravidelné plavání.',
  },
  'Pro Premium': {
    summary: '4 plavecké trysky, 10 stupňů síly proudu',
    who: 'Na trénink — proud si nastavíte od klidného tempa po sprint.',
  },
}

export const tierOrder = ['Hydro', 'Pro Luxury', 'Pro Premium']
