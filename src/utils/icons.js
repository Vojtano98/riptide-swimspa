// Minimal 24x24 stroke-based line icons. Keyed by name so spec items and
// UI controls can reference an icon without embedding markup inline.

const paths = {
  flow: '<path d="M3 8c2 0 2 3 4 3s2-3 4-3 2 3 4 3 2-3 4-3M3 16c2 0 2 3 4 3s2-3 4-3 2 3 4 3 2-3 4-3"/>',
  gauge: '<path d="M4 16a8 8 0 1 1 16 0M12 16l4-5"/>',
  width: '<path d="M3 12h18M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3"/>',
  wave: '<path d="M2 12c2.5-4 5-4 7.5 0s5 4 7.5 0 5-4 7.5 0"/>',
  bubble: '<circle cx="9" cy="10" r="3"/><circle cx="16" cy="15" r="2"/><circle cx="15" cy="7" r="1.4"/>',
  seat: '<path d="M6 20V11a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v9M6 15h12"/>',
  foot: '<path d="M9 3c-2 0-3 2-3 5 0 3-2 4-2 8a4 4 0 0 0 4 4c3 0 3-2 5-2h3a3 3 0 0 0 3-3c0-3-4-2-6-5-1.3-2-1-7-4-7Z"/>',
  air: '<path d="M3 8h11a2.5 2.5 0 1 0-2.2-3.6M3 12h15a2.5 2.5 0 1 1-2.2 3.6M3 16h9"/>',
  cpu: '<rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',
  heat: '<path d="M12 2c1.5 3-2 4-2 7a2 2 0 0 0 4 0c1 1.5 1 3 1 4a5 5 0 1 1-10 0c0-3 2-4 3-6 .3 1 1 1.5 1.5 1 1-1-1-3.2 2.5-6Z"/>',
  filter: '<path d="M4 5h16l-6 8v6l-4-2v-4Z"/>',
  uv: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  wifi: '<path d="M5 9a11 11 0 0 1 14 0M8 12.5a6.5 6.5 0 0 1 8 0M11 16a2 2 0 0 1 2 0"/><circle cx="12" cy="19" r="0.8" fill="currentColor" stroke="none"/>',
  shield: '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6Z"/>',
  shell: '<path d="M3 13h18M5 13a7 7 0 0 1 14 0M4 17h16"/>',
  frame: '<rect x="4" y="4" width="16" height="16" rx="1.5"/>',
  cladding: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  depth: '<path d="M12 3v18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3"/>',
  weight: '<rect x="3" y="9" width="4" height="6" rx="1"/><rect x="17" y="9" width="4" height="6" rx="1"/><path d="M7 12h10"/>',
  drop: '<path d="M12 2s7 8 7 13a7 7 0 1 1-14 0c0-5 7-13 7-13Z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  chevron: '<path d="M5 8l7 7 7-7"/>',
  arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
  check: '<path d="M5 13l4 4L19 7"/>',
  pin: '<path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13Z"/><circle cx="12" cy="9" r="2.4"/>',
  phone: '<path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2 2C10.5 19 5 13.5 5 6a2 2 0 0 1 1-3Z"/>',
  mail: '<path d="M4 5h16v14H4Z"/><path d="M4 6l8 7 8-7"/>',
}

export function icon(name, size = 24) {
  const body = paths[name] || paths.check
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`
}
