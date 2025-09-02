export type TrackId = string; // e.g., W1CD1

export type Track = {
  id: TrackId;
  wave: string; // e.g., I, II, ...
  cd: number;
  title: string;
  url: string; // full URL to file
};

const base = process.env.NEXT_PUBLIC_R2_PUBLIC_BASE || '';
const prefix = process.env.NEXT_PUBLIC_R2_PREFIX || '';

const u = (name: string) => `${base.replace(/\/$/, '')}/${prefix}${name}`;

// Minimal seed listing to demonstrate structure. Add remaining tracks as needed.
export const tracks: Track[] = [
  // Wave I (示例)
  { id: 'W1CD1', wave: 'I', cd: 1, title: '发现 #1', url: u('W1CD1.wav') },
  { id: 'W1CD2', wave: 'I', cd: 2, title: '发现 #2', url: u('W1CD2.wav') },
  { id: 'W1CD3', wave: 'I', cd: 3, title: '发现 #3', url: u('W1CD3.wav') },

  // Wave V has two sets; the special English set in its own folder
  { id: 'W5CD1', wave: 'V', cd: 1, title: '探索 #1', url: u('W5CD1.wav') },
  { id: 'W5CD2', wave: 'V', cd: 2, title: '探索 #2', url: u('W5CD2.wav') },
  { id: 'W5CD3', wave: 'V', cd: 3, title: '探索 #3', url: u('W5CD3.wav') },

  // Special Wave V (English folder example). Adjust folder naming if needed.
  { id: 'W5EN-CD1', wave: 'V-EN', cd: 1, title: 'Exploration V EN #1', url: u('WaveV_EN/CD1.wav') },
  { id: 'W5EN-CD2', wave: 'V-EN', cd: 2, title: 'Exploration V EN #2', url: u('WaveV_EN/CD2.wav') },
  { id: 'W5EN-CD3', wave: 'V-EN', cd: 3, title: 'Exploration V EN #3', url: u('WaveV_EN/CD3.wav') },
];

export const waves = [
  { key: 'I', name: '发现' },
  { key: 'II', name: '门槛' },
  { key: 'III', name: '自由' },
  { key: 'IV', name: '冒险' },
  { key: 'V', name: '探索' },
  { key: 'VI', name: '奥德赛' },
  { key: 'VII', name: '奥德赛' },
  { key: 'V-EN', name: '探索 (英文集)' },
];

export function tracksByWave(key: string) {
  return tracks.filter(t => t.wave === key);
}

