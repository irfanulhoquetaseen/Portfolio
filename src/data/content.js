/**
 * ============================================================
 *  SINGLE SOURCE OF TRUTH
 * ------------------------------------------------------------
 *  Every piece of text, link, skill and project on the site is
 *  defined here. To update the portfolio you only ever need to
 *  edit this file — no component changes required.
 * ============================================================
 */

export const profile = {
  name: 'MD IRFANUL HOQUE TASEEN',
  shortName: 'Irfanul Hoque Taseen',
  initials: 'IHT',
  title: 'CSE Student | Aspiring Software Engineer',
  location: 'Dhaka, Bangladesh',
  email: 'irfanul.tae@gmail.com',
  phone: '01826380359',
  phoneHref: '+8801826380359',
  /**
   * PROFILE PHOTO
   * Drop a square image at  public/profile.jpg  and it appears
   * automatically. Until then a generated monogram is shown.
   */
  photo: '/profile.jpg',
};

export const hero = {
  greeting: "Hi, I'm Irfanul Hoque Taseen.",
  subtitle: 'CSE Student & Aspiring AI Software Engineer',
  supporting: 'Building software, exploring AI, and turning ideas into real-world projects.',
  primaryCta: { label: 'View My Work', target: 'work' },
  secondaryCta: { label: 'Get In Touch', target: 'contact' },
  // Small stats strip under the hero — factual, no invented numbers.
  meta: [
    { k: 'Based in', v: 'Dhaka, BD' },
    { k: 'Focus', v: 'AI + Systems' },
    { k: 'Judge', v: 'Codeforces' },
    { k: 'Status', v: 'Open to work' },
  ],
};

export const about = {
  lead: 'I build things that have to work — then I take them apart to understand why they do.',
  paragraphs: [
    "I'm a Computer Science and Engineering student in Dhaka, working toward a career built on depth rather than surface. My goal is specific: master computer science, software programming and robotics engineering thoroughly enough that I can reason about a system from the algorithm all the way down to the hardware it runs on.",
    "That means writing C++ until the memory model is instinct instead of theory, solving problems on Codeforces until pattern recognition becomes reflex, and shipping projects that answer a real question rather than sit unfinished in a folder. I'd rather understand one layer completely than skim five.",
    'The direction I\'m heading is AI software engineering — building the systems that make intelligent software dependable in production, not just impressive in a notebook. Game development runs alongside it as a parallel track, where millisecond budgets, physics and real-time rendering teach discipline that transfers straight back into engineering. I\'m early in the arc and entirely clear about the destination.',
  ],
  facts: [
    { k: 'Discipline', v: 'Computer Science & Engineering' },
    { k: 'Core languages', v: 'C++, Python, C' },
    { k: 'Studying now', v: 'Algorithms, AI engineering, robotics' },
    { k: 'Side track', v: 'Real-time & game systems' },
  ],
};

/**
 * Career roadmap. `branch: true` renders the item as a parallel
 * track forking off the main trunk instead of a trunk stage.
 */
export const roadmap = [
  {
    id: 'se',
    index: '01',
    stage: 'Stage 01',
    status: 'In progress',
    title: 'Software Engineer',
    blurb:
      'Own the fundamentals completely: data structures, algorithms, clean architecture, version control, and the habit of shipping software that survives contact with real users.',
    markers: ['Data structures', 'Algorithms', 'Systems design', 'Clean code'],
    branch: false,
  },
  {
    id: 'ai',
    index: '02',
    stage: 'Stage 02',
    status: 'Next',
    title: 'AI Engineer',
    blurb:
      'Move up the stack into machine learning: training and evaluation, data pipelines, and the unglamorous work of making a model behave predictably once it leaves the notebook.',
    markers: ['ML foundations', 'Model evaluation', 'Data pipelines', 'MLOps'],
    branch: false,
  },
  {
    id: 'ai-se',
    index: '03',
    stage: 'Stage 03',
    status: 'Destination',
    title: 'AI Software Engineer',
    blurb:
      'Fuse both disciplines — production systems where intelligence is a first-class component, engineered with the same rigour as everything around it.',
    markers: ['Applied AI systems', 'Inference at scale', 'Product engineering'],
    branch: false,
  },
  {
    id: 'gamedev',
    index: '↳',
    stage: 'Parallel track',
    status: 'Passion project',
    title: 'Game Developer',
    blurb:
      'A deliberate detour, not a distraction. Rendering, physics and gameplay systems force you to think in frame budgets — and constraints make better engineers.',
    markers: ['Real-time rendering', 'Physics', 'Gameplay systems'],
    branch: true,
  },
];

/**
 * Skills. `mark` is the monogram rendered inside the tile —
 * the site uses a typographic mark set rather than a grid of
 * multi-coloured brand logos, to stay in one visual language.
 */
export const skillGroups = [
  {
    id: 'languages',
    label: 'Languages',
    note: 'Where the real work happens',
    items: [
      { name: 'C++', mark: 'C++', detail: 'Primary — DSA & competitive' },
      { name: 'Python', mark: 'PY', detail: 'Scripting, data, AI tooling' },
      { name: 'C', mark: 'C', detail: 'Memory & systems fundamentals' },
      { name: 'JavaScript', mark: 'JS', detail: 'Interfaces & tooling' },
    ],
  },
  {
    id: 'web',
    label: 'Web',
    note: 'Shipping to the browser',
    items: [
      { name: 'HTML', mark: '</>', detail: 'Semantic structure' },
      { name: 'CSS', mark: '#', detail: 'Layout & responsive systems' },
      { name: 'JavaScript', mark: 'JS', detail: 'Behaviour & interaction' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    note: 'Non-negotiables',
    items: [
      { name: 'Git', mark: '⎇', detail: 'Branching & history hygiene' },
      { name: 'GitHub', mark: 'GH', detail: 'Collaboration & review' },
    ],
  },
];

export const learning = [
  {
    id: 'cp',
    title: 'Competitive Programming',
    handle: 'codeforces.com/profile/TaseenXNeo',
    href: 'https://codeforces.com/profile/TaseenXNeo',
    blurb:
      'Timed problem solving as deliberate practice. It sharpens the two things that never stop mattering: choosing the right structure, and seeing the constraint before you write the loop.',
    focus: ['Graphs & trees', 'Dynamic programming', 'Greedy & binary search', 'Complexity budgets'],
    level: 0.55,
  },
  {
    id: 'aie',
    title: 'AI Engineering',
    handle: 'from fundamentals up',
    href: null,
    blurb:
      'Learning AI the engineering way — how models are trained, evaluated, served and monitored — so the intelligence in a product is something I can debug rather than something I hope holds.',
    focus: ['Neural network foundations', 'Training & evaluation', 'Inference & serving', 'Applied tooling'],
    level: 0.4,
  },
];

export const projects = [
  {
    id: 'optinode',
    index: '01',
    name: 'OptiNode',
    subtitle: 'AI Cluster Optimization',
    year: 'Hackathon build',
    motif: 'cluster',
    summary:
      'A GPU cluster optimization project built under hackathon pressure. It treats scheduling as what it actually is — a resource allocation problem — modelling node load so work lands where there is capacity instead of where it happens to be sent. The premise: a smarter allocation beats a bigger budget.',
    tags: ['Python', 'Optimization', 'GPU Scheduling', 'Systems'],
    repo: 'https://github.com/irfanulhoquetaseen/OptiNode-Ai-Cluster-Hackathon.git',
  },
  {
    id: 'navigator',
    index: '02',
    name: 'DIU Campus Navigator',
    subtitle: 'Campus wayfinding',
    year: 'Project',
    motif: 'path',
    summary:
      'Wayfinding for the DIU campus — turning a layout that is hard to explain in words into a route you can follow while walking. Underneath it is a graph problem: model the campus as nodes and edges, then find the path a person would actually take.',
    tags: ['JavaScript', 'Pathfinding', 'Graphs', 'UI'],
    repo: 'https://github.com/irfanulhoquetaseen/DIU-Campus-Navigator.git',
  },
  {
    id: 'grabit',
    index: '03',
    name: 'GRABit',
    subtitle: 'Media downloader',
    year: 'Tool',
    motif: 'stream',
    summary:
      'A media downloader with the interaction stripped to the minimum: paste a link, choose a format, get the file. Built to replace ad-heavy web tools and to learn first-hand how streams, formats and progress state behave when the network is imperfect.',
    tags: ['Python', 'Streams', 'Media', 'CLI'],
    repo: 'https://github.com/irfanulhoquetaseen/GRABit.git',
  },
];

export const sideQuest = {
  eyebrow: 'Side quest',
  title: 'Games are engineering with an audience',
  body: "Game development is the track I keep coming back to. A frame budget of 16 milliseconds is an unforgiving teacher — it makes you care about cache behaviour, allocation and maths in a way a web request never will. I'm drawn to the systems layer: movement that feels right, physics that behaves, worlds that hold together.",
  items: [
    { k: 'Pull', v: 'Real-time systems & simulation' },
    { k: 'Learning', v: 'Rendering, physics, gameplay loops' },
    { k: 'Why it matters', v: 'Constraints make better engineers' },
  ],
};

export const socials = [
  {
    id: 'github',
    label: 'GitHub',
    handle: 'irfanulhoquetaseen',
    href: 'https://github.com/irfanulhoquetaseen',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'md-irfanul-hoque-taseen',
    href: 'https://www.linkedin.com/in/md-irfanul-hoque-taseen-05163a427/',
  },
  {
    id: 'codeforces',
    label: 'Codeforces',
    handle: 'TaseenXNeo',
    href: 'https://codeforces.com/profile/TaseenXNeo',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    handle: 'irfanul.hoque.taseen',
    href: 'https://www.facebook.com/irfanul.hoque.taseen',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: 'irfanul_taseen',
    href: 'https://www.instagram.com/irfanul_taseen/',
  },
];

export const contact = {
  eyebrow: 'Contact',
  title: 'Let’s build something worth shipping.',
  body: 'Open to internships, collaborations and student projects — especially anything touching AI, systems or competitive programming. The fastest way to reach me is email.',
};

/**
 * Section registry — drives the navbar, the active-section
 * indicator and the section index numbers. Order here is the
 * order on the page.
 */
export const sections = [
  { id: 'home', label: 'Index', index: '00', nav: false },
  { id: 'about', label: 'About', index: '01', nav: true },
  { id: 'journey', label: 'Journey', index: '02', nav: true },
  { id: 'stack', label: 'Stack', index: '03', nav: true },
  { id: 'work', label: 'Work', index: '04', nav: true },
  { id: 'growth', label: 'Growth', index: '05', nav: true },
  { id: 'contact', label: 'Contact', index: '06', nav: true },
];

export const navItems = sections.filter((s) => s.nav);

export const footerTagline = 'Built with React, Tailwind, GSAP & Lenis.';
