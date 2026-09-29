// Shared spec-table row definitions (label only — values live per variant on each
// model). Kept as three variants since the three series shapes genuinely differ in
// the catalogue: Atlas/Atlantis are pure swim-pools (no separate massage seating),
// Aqua Life / Easy Life single-zone models add a lounger + massage jets, and the
// "Duo" dual-zone models split power/control into separate spa + swim systems.

export const poolSpecRows = [
  { key: 'dimensions', label: 'Rozměry (D × Š × V)' },
  { key: 'capacity', label: 'Objem vody' },
  { key: 'weight', label: 'Suchá hmotnost' },
  { key: 'power', label: 'Napájení' },
  { key: 'swimJets', label: 'Plavecké trysky' },
  { key: 'tenSpeed', label: '10-stupňové plavání' },
  { key: 'swimPumps', label: 'Plavecká čerpadla' },
  { key: 'swimPipe', label: 'Průměr plaveckého potrubí' },
  { key: 'swimPole', label: 'Plavecká tyč a madlo' },
  { key: 'control', label: 'Řídicí systém' },
  { key: 'panel', label: 'Ovládací panel' },
]

export const singleZoneSpecRows = [
  { key: 'dimensions', label: 'Rozměry (D × Š × V)' },
  { key: 'seating', label: 'Posezení' },
  { key: 'capacity', label: 'Objem vody' },
  { key: 'weight', label: 'Suchá hmotnost' },
  { key: 'power', label: 'Napájení' },
  { key: 'massageJets', label: 'Masážní trysky' },
  { key: 'massageWall', label: 'Masážní stěna' },
  { key: 'swimJets', label: 'Plavecké trysky' },
  { key: 'tenSpeed', label: '10-stupňové plavání' },
  { key: 'swimPumps', label: 'Plavecká čerpadla' },
  { key: 'swimPipe', label: 'Průměr plaveckého potrubí' },
  { key: 'swimPole', label: 'Plavecká tyč a madlo' },
  { key: 'control', label: 'Řídicí systém' },
  { key: 'panel', label: 'Ovládací panel' },
]

export const duoSpecRows = [
  { key: 'dimensions', label: 'Rozměry (D × Š × V)' },
  { key: 'seating', label: 'Posezení' },
  { key: 'capacity', label: 'Objem vody' },
  { key: 'weight', label: 'Suchá hmotnost' },
  { key: 'power', label: 'Napájení' },
  { key: 'massagePump', label: 'Masážní čerpadlo' },
  { key: 'massageJets', label: 'Masážní trysky' },
  { key: 'swimJets', label: 'Plavecké trysky' },
  { key: 'tenSpeed', label: '10-stupňové plavání' },
  { key: 'swimPumps', label: 'Plavecká čerpadla' },
  { key: 'swimPipe', label: 'Průměr plaveckého potrubí' },
  { key: 'swimPole', label: 'Plavecká tyč a madlo' },
  { key: 'spaControl', label: 'Řídicí systém — spa zóna' },
  { key: 'spaPanel', label: 'Ovládací panel — spa zóna' },
  { key: 'swimControl', label: 'Řídicí systém — swim zóna' },
  { key: 'swimPanel', label: 'Ovládací panel — swim zóna' },
]
