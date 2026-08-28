# MD Irfanul Hoque Taseen — Portfolio

A single-page portfolio built with React, Vite and Tailwind, with the motion layer handled by
GSAP ScrollTrigger, Framer Motion and Lenis. Dark, near-black green palette; one electric accent
used sparingly; typography doing most of the work.

---

## Run it

You need [Node.js](https://nodejs.org) 18 or newer. Open a terminal in this folder and run:

```bash
npm install
npm run dev
```

`npm install` takes a minute or two the first time. When it finishes, `npm run dev` prints a local
URL (`http://localhost:5173`) and opens it automatically. Edits to any file under `src/` appear in
the browser instantly without a reload.

Two other commands are available. `npm run build` produces an optimised `dist/` folder ready to
upload anywhere, and `npm run preview` serves that built output locally so you can check the real
production bundle before you deploy.

---

## (a) Adding your real profile photo

Save a square image as `profile.jpg` inside the `public/` folder — so the final path is
`public/profile.jpg`. That is the only step. The About section checks for that file at runtime and
swaps the glowing "IHT" monogram for your photo automatically, keeping the same circular frame,
green ring and hover glow. Nothing needs to be edited.

A square crop of at least 800×800 works best; anything wider gets centre-cropped. If you would
rather use a PNG or WebP, open `src/data/content.js` and change the `photo` field near the top of
the `profile` object to match your filename:

```js
export const profile = {
  name: 'MD Irfanul Hoque Taseen',
  ...
  photo: '/profile.jpg',   // ← change to '/profile.png' or '/profile.webp'
};
```

To go back to the monogram at any point, delete the image file. The fallback returns on its own.

---

## (b) Deploying it free

Both options below give you a live HTTPS URL at no cost, and both redeploy automatically every
time you push to GitHub. Push this folder to a new GitHub repository first.

**Vercel** is the shorter path. Go to [vercel.com](https://vercel.com), sign in with GitHub, click
*Add New → Project* and pick the repository. Vercel detects Vite on its own and fills in the build
command (`npm run build`) and output directory (`dist`) for you, so just press *Deploy*. About a
minute later you get a `your-project.vercel.app` URL.

**Netlify** works the same way from [netlify.com](https://netlify.com) — *Add new site → Import an
existing project → GitHub*. If it does not prefill them, set the build command to `npm run build`
and the publish directory to `dist`.

Either host will let you attach a custom domain later from the project settings if you buy one.

There is no backend, no environment variable and no API key anywhere in this project, so there is
nothing else to configure. If you would rather not use a host at all, run `npm run build` and
upload the resulting `dist/` folder to any static file host.

---

## (c) Updating the content later

**Almost all copy lives in one file: `src/data/content.js`.** It is plain JavaScript objects with
comments explaining each field. Editing it is the intended way to keep this site current — you
should rarely need to touch a component.

To **add a project**, copy an existing entry in the `projects` array and change the fields:

```js
{
  id: 'my-new-project',
  index: '04',                      // shown as a monospace number on the card
  name: 'Project Name',
  subtitle: 'One line on what it is',
  year: '2026',
  motif: 'cluster',                 // 'cluster' | 'path' | 'stream'
  summary: 'Two or three sentences on the problem and how you solved it.',
  tags: ['Python', 'PyTorch', 'FastAPI'],
  repo: 'https://github.com/irfanulhoquetaseen/your-repo',
}
```

`motif` picks which animated diagram draws on the card: `cluster` is a node graph under load,
`path` is a routed shortest path, and `stream` is many sources merging into one output. Pick
whichever best matches the project. To draw a genuinely new diagram, add a component to
`src/components/ProjectMotif.jsx` and register it in the `MOTIFS` map at the bottom of that file.

To **add a skill**, find the right group in `skillGroups` (`languages`, `web` or `tools`) and add
an item. `mark` is the short label drawn inside the tile, so keep it to one or two characters:

```js
{ name: 'TypeScript', mark: 'TS', detail: 'Typed JavaScript at scale' }
```

To **change what you are currently learning**, edit the `learning` array. Each entry has a `level`
between 0 and 1 that drives how far its glowing progress bar fills — `0.45` fills to 45%. Bump
those numbers as you improve.

The other exports are straightforward: `hero` holds the headline and both call-to-action buttons,
`about` holds the lead line and the three body paragraphs, `roadmap` holds the four career stages,
`sideQuest` holds the game-development aside, `contact` and `footerTagline` hold the closing copy,
and `socials` holds your five profile links.

One thing to be careful with: `navItems` and `sections` at the bottom of the file drive the
navbar, the scroll spy and the section index numbers all at once. If you add a whole new section,
add it to `sections`, render it in `src/App.jsx`, and give the `<section>` element an `id` that
matches. The numbering stays in sync on its own.

---

## How it is put together

```
public/favicon.svg          Monogram favicon
index.html                  Title, meta tags, fonts, no-JS fallback
src/
  main.jsx                  Entry point
  App.jsx                   Page composition and section order
  index.css                 Design tokens, component classes, keyframes
  data/content.js           ← all copy and links live here
  lib/
    gsap.js                 Registers ScrollTrigger once
    scroll.js               Lenis instance, scrollToSection, scroll lock
  hooks/
    useSmoothScroll.js      Boots Lenis on GSAP's ticker
    useActiveSection.js     Scroll spy + progress bar
    useReducedMotion.js     Reactive prefers-reduced-motion
    usePointerFine.js       True only for real hovering pointers
    useMagnetic.js          Magnetic button pull
  components/
    AmbientBackground.jsx   Grid, glow and grain layers
    CustomCursor.jsx        Dot and trailing ring
    Preloader.jsx           Page-load intro
    Navbar.jsx              Sticky nav, active pill, mobile sheet
    Hero.jsx  NodeLattice.jsx
    About.jsx  Roadmap.jsx  Skills.jsx
    Projects.jsx  ProjectCard.jsx  ProjectMotif.jsx
    Growth.jsx  SideQuest.jsx  Contact.jsx  Footer.jsx
    ui/                     Reveal, SplitText, SectionHeader, icons, etc.
```

The colour, type and spacing tokens are defined twice on purpose: as CSS custom properties in
`src/index.css` for anything hand-written, and in `tailwind.config.js` so the same values are
reachable as utility classes. Change a colour in both places and it propagates everywhere.

Every section, the navbar and the footer all use one `.shell` container class, which is why their
left edges line up exactly at every screen width. Headings are sized with `clamp()` so they scale
continuously rather than jumping at breakpoints.

Motion respects `prefers-reduced-motion` in three layers: a CSS media query neutralises
animations and transitions, a `useReducedMotion` hook lets components branch on it, and the
heavier effects — Lenis, the pinned roadmap, the custom cursor, the intro — skip mounting
entirely. With the setting on, the page still renders complete and readable content immediately.
The expensive pieces are also scoped: the roadmap only pins above 1024px, the hero canvas parks
its render loop when scrolled out of view, and the custom cursor never mounts on touch devices.

---

## Notes

Fonts load from Fontshare (Clash Display) and Google Fonts (Inter, JetBrains Mono) over the
network, with system fallbacks in the stack, so the first paint never blocks on them.

Scroll progress and the project-card tilt are written straight to the DOM instead of going through
React state. Those values change on every frame, and routing them through a render pass would
re-reconcile the page tree sixty or more times a second for a single CSS transform.
