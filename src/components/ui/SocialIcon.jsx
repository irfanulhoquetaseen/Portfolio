/**
 * Social marks.
 *
 * Drawn by hand on the same 24×20 grid and 1.5 stroke weight as the
 * interface icons, so the footer row reads as one designed set rather
 * than five borrowed logos in five different styles. Every mark is
 * always paired with a visible text label.
 *
 * Want literal brand logos instead? Install react-icons and swap the
 * component bodies below — the MARKS map is the only contract.
 */

const base = {
  width: '1em',
  height: '1em',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
};

/** GitHub — git's own branch-and-node glyph. */
function GithubMark(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="7" cy="5.4" r="2.15" />
      <circle cx="7" cy="18.6" r="2.15" />
      <circle cx="17.4" cy="9.2" r="2.15" />
      <path d="M7 7.55v8.9" />
      <path d="M7 14.1V13a3.8 3.8 0 0 1 3.8-3.8h4.45" />
    </svg>
  );
}

/** LinkedIn — the 'in' lockup inside its rounded tile. */
function LinkedinMark(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3.4" />
      <path d="M8 10.6v6.1" />
      <circle cx="8" cy="7.7" r="0.95" fill="currentColor" stroke="none" />
      <path d="M12.1 16.7v-6.1" />
      <path d="M12.1 13.3a2.45 2.45 0 0 1 4.9 0v3.4" />
    </svg>
  );
}

/** Facebook — the f, set on its circle. */
function FacebookMark(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.6 8.1h-1.2a2 2 0 0 0-2 2V21" />
      <path d="M9.4 12.6h4.6" />
    </svg>
  );
}

/** Instagram — rounded tile, lens, flash dot. */
function InstagramMark(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.9" r="0.95" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Codeforces — its three bars, in mono. */
function CodeforcesMark(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3.6" y="12" width="4.6" height="9" rx="1.4" />
      <rect x="9.7" y="6" width="4.6" height="15" rx="1.4" />
      <rect x="15.8" y="9.4" width="4.6" height="11.6" rx="1.4" />
    </svg>
  );
}

const MARKS = {
  github: GithubMark,
  linkedin: LinkedinMark,
  facebook: FacebookMark,
  instagram: InstagramMark,
  codeforces: CodeforcesMark,
};

export default function SocialIcon({ id, ...props }) {
  const Mark = MARKS[id];
  if (!Mark) return null;
  return <Mark {...props} />;
}

export { MARKS };
