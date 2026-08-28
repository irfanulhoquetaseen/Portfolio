/**
 * Icon set.
 *
 * Hand-authored on a 24×24 grid with a single 1.5 stroke weight so
 * every glyph on the page shares one drawing language. These are the
 * interface icons; the social brand marks live in SocialIcon.jsx and
 * are drawn to the same spec — no icon library, one visual voice.
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

export function ArrowUpRight(props) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </svg>
  );
}

export function ArrowRight(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowDown(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4v15" />
      <path d="m6 13 6 6 6-6" />
    </svg>
  );
}

export function MailIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="2.75" y="5" width="18.5" height="14" rx="2.5" />
      <path d="m3.5 7.5 7.3 5.2a2 2 0 0 0 2.4 0l7.3-5.2" />
    </svg>
  );
}

export function PhoneIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 3.5h2.2l1.6 3.9-1.9 1.3a11.4 11.4 0 0 0 5.4 5.4l1.3-1.9 3.9 1.6v2.2a2.5 2.5 0 0 1-2.7 2.5C10.2 20 4 13.8 4 6.2A2.5 2.5 0 0 1 6.5 3.5Z" />
    </svg>
  );
}

export function CopyIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2.2" />
      <path d="M15 6.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h.5" />
    </svg>
  );
}

export function CheckIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function MenuIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8h16" />
      <path d="M4 16h16" />
    </svg>
  );
}

export function CloseIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

export function PinIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s6.5-6.1 6.5-11a6.5 6.5 0 1 0-13 0C5.5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

/** Cluster/topology glyph — the site's recurring structural motif. */
export function NodeIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <circle cx="12" cy="18" r="2.2" />
      <path d="M7.6 7.7 10.6 16" />
      <path d="M16.4 7.7 13.4 16" />
      <path d="M8.2 6h7.6" />
    </svg>
  );
}

export function BranchIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="6.5" cy="5" r="2.2" />
      <circle cx="6.5" cy="19" r="2.2" />
      <circle cx="17.5" cy="8" r="2.2" />
      <path d="M6.5 7.2v9.6" />
      <path d="M6.5 13.5c0-2.4 1.9-4.3 4.3-4.3h4.5" />
    </svg>
  );
}

export function TerminalIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="2.75" y="4" width="18.5" height="16" rx="2.5" />
      <path d="m7 10 2.5 2.5L7 15" />
      <path d="M12.5 15.5H17" />
    </svg>
  );
}

export function SparkIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <path d="m6.3 6.3 2.6 2.6" />
      <path d="m15.1 15.1 2.6 2.6" />
      <path d="m17.7 6.3-2.6 2.6" />
      <path d="m8.9 15.1-2.6 2.6" />
    </svg>
  );
}
