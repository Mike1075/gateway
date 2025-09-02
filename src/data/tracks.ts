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
const audioExt = (process.env.NEXT_PUBLIC_AUDIO_EXT || 'flac').replace(/^\./, '');

const u = (name: string) => `${base.replace(/\/$/, '')}/${prefix}${name}.${audioExt}`;

// Minimal seed listing to demonstrate structure. Add remaining tracks as needed.
export const tracks: Track[] = [
  // Wave I
  { id: 'W1CD1', wave: 'I', cd: 1, title: '发现 #1', url: 'https://youtu.be/CFU1EZXIkDY' },
  { id: 'W1CD2', wave: 'I', cd: 2, title: '发现 #2', url: 'https://youtu.be/5CVB3RigKQY' },
  { id: 'W1CD3', wave: 'I', cd: 3, title: '发现 #3', url: 'https://youtu.be/2LKCXXjnYYk' },
  { id: 'W1CD4', wave: 'I', cd: 4, title: '发现 #4', url: 'https://youtu.be/UVhoJHZxZEs' },
  { id: 'W1CD5', wave: 'I', cd: 5, title: '发现 #5', url: 'https://youtu.be/v_jkXO0Um1Y' },
  { id: 'W1CD6', wave: 'I', cd: 6, title: '发现 #6', url: 'https://youtu.be/n4axsvsiKRA' },

  // Wave II
  { id: 'W2CD1', wave: 'II', cd: 1, title: '门槛 #1', url: 'https://youtu.be/Lyqr1mcKC_A' },
  { id: 'W2CD2', wave: 'II', cd: 2, title: '门槛 #2', url: 'https://youtu.be/NC-jYgA4dlc' },
  { id: 'W2CD3', wave: 'II', cd: 3, title: '门槛 #3', url: 'https://youtu.be/4KxiGiFk6pM' },
  { id: 'W2CD4', wave: 'II', cd: 4, title: '门槛 #4', url: 'https://youtu.be/2R9XstySrVQ' },
  { id: 'W2CD5', wave: 'II', cd: 5, title: '门槛 #5', url: 'https://youtu.be/Q1lN1g01GCc' },
  { id: 'W2CD6', wave: 'II', cd: 6, title: '门槛 #6', url: 'https://youtu.be/c7Xt29PKWnc' },

  // Wave III
  { id: 'W3CD1', wave: 'III', cd: 1, title: '自由 #1', url: 'https://youtu.be/nbbnfffOItw' },
  { id: 'W3CD2', wave: 'III', cd: 2, title: '自由 #2', url: 'https://youtu.be/IiAemQSs4ug' },
  { id: 'W3CD3', wave: 'III', cd: 3, title: '自由 #3', url: 'https://youtu.be/yxIoKRvzGkE' },
  { id: 'W3CD4', wave: 'III', cd: 4, title: '自由 #4', url: 'https://youtu.be/rrz64ZdNQ6E' },
  { id: 'W3CD5', wave: 'III', cd: 5, title: '自由 #5', url: 'https://youtu.be/b1P1kLsGcdM' },
  { id: 'W3CD6', wave: 'III', cd: 6, title: '自由 #6', url: 'https://youtu.be/1qZG0Jyc9kU' },

  // Wave IV (CD2 is bilibili)
  { id: 'W4CD1', wave: 'IV', cd: 1, title: '冒险 #1', url: 'https://youtu.be/VxqpigVEX9Y' },
  { id: 'W4CD2', wave: 'IV', cd: 2, title: '冒险 #2', url: 'https://www.bilibili.com/video/BV1RsaPzeEhb/?vd_source=c5ae5858e26dce3198372fd061490be0' },
  { id: 'W4CD3', wave: 'IV', cd: 3, title: '冒险 #3', url: 'https://youtu.be/Cd2q5l1Tr8g' },
  { id: 'W4CD4', wave: 'IV', cd: 4, title: '冒险 #4', url: 'https://youtu.be/9hxrSPqfHSM' },
  { id: 'W4CD5', wave: 'IV', cd: 5, title: '冒险 #5', url: 'https://youtu.be/Q3_F1wF-BAw' },
  { id: 'W4CD6', wave: 'IV', cd: 6, title: '冒险 #6', url: 'https://youtu.be/eg-6_0TJA2A' },

  // Wave V
  { id: 'W5CD1', wave: 'V', cd: 1, title: '探索 #1', url: 'https://youtu.be/N3Doi5Fp6cY' },
  { id: 'W5CD2', wave: 'V', cd: 2, title: '探索 #2', url: 'https://youtu.be/PYWbn7EAVCE' },
  { id: 'W5CD3', wave: 'V', cd: 3, title: '探索 #3', url: 'https://youtu.be/r37dJ8yS9ZI' },
  { id: 'W5CD4', wave: 'V', cd: 4, title: '探索 #4', url: 'https://youtu.be/MILFj9gApRg' },
  { id: 'W5CD5', wave: 'V', cd: 5, title: '探索 #5', url: 'https://youtu.be/8uz947PDB68' },
  { id: 'W5CD6', wave: 'V', cd: 6, title: '探索 #6', url: 'https://youtu.be/VR3hxzdSEkw' },

  // Wave VI
  { id: 'W6CD1', wave: 'VI', cd: 1, title: '奥德赛 #1', url: 'https://youtu.be/i_VKuxM0J3c' },
  { id: 'W6CD2', wave: 'VI', cd: 2, title: '奥德赛 #2', url: 'https://youtu.be/Ps2bvIr1WR0' },
  { id: 'W6CD3', wave: 'VI', cd: 3, title: '奥德赛 #3', url: 'https://youtu.be/-dFRrl1IIQM' },
  { id: 'W6CD4', wave: 'VI', cd: 4, title: '奥德赛 #4', url: 'https://youtu.be/Wp0pPuKHXuk' },
  { id: 'W6CD5', wave: 'VI', cd: 5, title: '奥德赛 #5', url: 'https://youtu.be/EaVcLeWTSmk' },
  { id: 'W6CD6', wave: 'VI', cd: 6, title: '奥德赛 #6', url: 'https://youtu.be/n8J8fxrRn1I' },
];

export const waves = [
  { key: 'I', name: '发现' },
  { key: 'II', name: '门槛' },
  { key: 'III', name: '自由' },
  { key: 'IV', name: '冒险' },
  { key: 'V', name: '探索' },
  { key: 'VI', name: '奥德赛' },
  // { key: 'VII', name: '奥德赛' }, // 暂未配置视频
];

export function tracksByWave(key: string) {
  return tracks.filter(t => t.wave === key);
}
