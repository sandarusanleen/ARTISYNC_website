// ─────────────────────────────────────────────
// Artisync — Shared Constants & Mock Data
// ─────────────────────────────────────────────

/** Gradient backgrounds used as artwork placeholders */
export const ARTWORK_GRADIENTS = [
  'linear-gradient(135deg, #1a0533, #6b21a8, #db2777)',
  'linear-gradient(135deg, #0f172a, #1e3a5f, #0ea5e9)',
  'linear-gradient(135deg, #1a2a1a, #15803d, #86efac)',
  'linear-gradient(135deg, #2d1515, #dc2626, #f97316)',
  'linear-gradient(135deg, #0f1629, #1d4ed8, #a855f7)',
  'linear-gradient(135deg, #1a1a0a, #854d0e, #facc15)',
  'linear-gradient(135deg, #1a0a1a, #9333ea, #ec4899)',
  'linear-gradient(135deg, #0a1a1a, #0f766e, #34d399)',
  'linear-gradient(135deg, #1a0f0f, #9f1239, #f43f5e)',
  'linear-gradient(135deg, #0a0f1a, #1e40af, #60a5fa)',
  'linear-gradient(135deg, #0a1a0f, #166534, #4ade80)',
  'linear-gradient(135deg, #1a1a0a, #713f12, #fb923c)',
];

/** Software filter options */
export const SOFTWARE_OPTIONS = [
  'All',
  'Photoshop',
  'Illustrator',
  'After Effects',
  'Premiere Pro',
  'Blender',
  'Cinema 4D',
  'Figma',
  'DaVinci Resolve',
  'Procreate',
  'Houdini',
  'Framer',
];

/** Job type filter options */
export const JOB_TYPES = [
  'All',
  'Motion Designer',
  'Visual Artist',
  '3D Artist',
  'Video Editor',
  'Graphic Designer',
  'UI/UX Designer',
  'Illustrator',
  'Photographer',
];

/** Mock creators for development / demo */
export const MOCK_CREATORS = [
  {
    id: 1,
    name: 'Leila Nazari',
    jobType: 'Motion Designer',
    software: ['After Effects', 'Cinema 4D', 'Blender'],
    bio: 'Crafting immersive motion experiences that blur the line between art and brand identity. 5+ years pushing the boundaries of digital movement.',
    location: 'Berlin, DE',
    projects: 38,
    hires: 12,
    artworkIds: [0, 5, 3, 8, 1, 6],
    accent: '#C084FC',
  },
  {
    id: 2,
    name: 'Marcus Webb',
    jobType: 'Visual Artist',
    software: ['Photoshop', 'Illustrator', 'Procreate'],
    bio: 'Editorial illustration and visual storytelling for global brands. Bold shapes, bolder ideas. Available for commissions.',
    location: 'London, UK',
    projects: 52,
    hires: 27,
    artworkIds: [1, 7, 4, 9, 2, 5],
    accent: '#38BDF8',
  },
  {
    id: 3,
    name: 'Yuki Tanaka',
    jobType: '3D Artist',
    software: ['Blender', 'Cinema 4D', 'Houdini', 'ZBrush'],
    bio: 'Hyperrealistic 3D worlds and abstract digital sculptures. Every render tells a story worth spending time in.',
    location: 'Tokyo, JP',
    projects: 29,
    hires: 8,
    artworkIds: [2, 6, 9, 0, 4, 11],
    accent: '#34D399',
  },
  {
    id: 4,
    name: 'Amara Osei',
    jobType: 'Video Editor',
    software: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    bio: 'Cinematic cuts and color grades that transform raw footage into emotional journeys. Worked with 50+ brands across 3 continents.',
    location: 'Lagos, NG',
    projects: 67,
    hires: 34,
    artworkIds: [3, 8, 1, 5, 10, 7],
    accent: '#FB923C',
  },
  {
    id: 5,
    name: 'Sofia Reyes',
    jobType: 'Graphic Designer',
    software: ['Figma', 'Photoshop', 'Illustrator', 'InDesign'],
    bio: 'Brand systems and identity design. Creating visual languages for tomorrow\'s companies. Minimal, purposeful, memorable.',
    location: 'Mexico City, MX',
    projects: 44,
    hires: 19,
    artworkIds: [4, 10, 7, 2, 6, 0],
    accent: '#F472B6',
  },
  {
    id: 6,
    name: 'Dmitri Volkov',
    jobType: 'UI/UX Designer',
    software: ['Figma', 'Framer', 'Sketch', 'Principle'],
    bio: 'Human-centered interfaces with an obsessive eye for detail. Design that feels inevitable. Previously at Spotify and Revolut.',
    location: 'Amsterdam, NL',
    projects: 33,
    hires: 15,
    artworkIds: [5, 11, 3, 8, 1, 9],
    accent: '#A78BFA',
  },
  {
    id: 7,
    name: 'Chen Wei',
    jobType: 'Illustrator',
    software: ['Procreate', 'Photoshop', 'Illustrator'],
    bio: 'Character design and world-building for games, animation, and publishing. Every line has intention.',
    location: 'Shanghai, CN',
    projects: 41,
    hires: 22,
    artworkIds: [6, 0, 9, 3, 11, 4],
    accent: '#FBBF24',
  },
  {
    id: 8,
    name: 'Nadia Laurent',
    jobType: 'Photographer',
    software: ['Lightroom', 'Photoshop', 'Capture One'],
    bio: 'Documentary and commercial photographer. I find the quiet moments that speak loudest.',
    location: 'Paris, FR',
    projects: 85,
    hires: 41,
    artworkIds: [7, 3, 10, 1, 5, 8],
    accent: '#6EE7B7',
  },
];

/** Platform-level stats shown on landing page */
export const PLATFORM_STATS = [
  { value: '2,400+', label: 'Creators' },
  { value: '8,900+', label: 'Projects' },
  { value: '1,200+', label: 'Clients' },
];

/** Feature highlight cards for landing page */
export const FEATURES = [
  {
    icon: '◈',
    title: 'Curated Portfolios',
    description:
      'Showcase your work in a premium space that puts your art first. No clutter, no noise.',
  },
  {
    icon: '◎',
    title: 'Smart Discovery',
    description:
      'Filter creators by software, style, and specialty. Find exactly who you need.',
  },
  {
    icon: '◉',
    title: 'Direct Hiring',
    description:
      'Connect with clients who value your skills. No middlemen, no platform cut.',
  },
  {
    icon: '◐',
    title: 'Real-Time Preview',
    description:
      'See exactly how your portfolio looks to clients before you hit publish.',
  },
];
