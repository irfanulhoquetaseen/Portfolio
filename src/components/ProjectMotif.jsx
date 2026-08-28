/**
 * PROJECT MOTIFS
 *
 * There are no screenshots for these projects yet, and a stock
 * gradient placeholder is exactly what makes a portfolio look
 * templated. So each card gets a diagram of what the project
 * actually does, drawn from the problem it solves:
 *
 *   cluster → nodes under load with packets on the links (OptiNode)
 *   path    → a route solved across a campus grid (Navigator)
 *   stream  → many sources funnelled into one file (GRABit)
 *
 * All geometry is deterministic — no randomness, so the diagram is
 * identical on every render and can be tuned like any other asset.
 */

const VIEW = '0 0 400 260';

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

/* ---------------------------------------------------------------- */

function ClusterMotif() {
  const COLS = 5;
  const ROWS = 3;
  const nodes = [];

  for (let r = 0; r < ROWS; r += 1) {
    for (let c = 0; c < COLS; c += 1) {
      const i = r * COLS + c;
      nodes.push({
        i,
        x: 52 + c * 74,
        y: 62 + r * 68,
        hot: i % 4 === 2,
        r,
        c,
      });
    }
  }

  const edges = [];
  nodes.forEach((n) => {
    if (n.c < COLS - 1) edges.push([n.i, n.i + 1]);
    if (n.r < ROWS - 1 && n.i % 3 === 0) edges.push([n.i, n.i + COLS]);
  });

  return (
    <svg viewBox={VIEW} className="h-full w-full text-signal" aria-hidden="true">
      {edges.map(([a, b], k) => {
        const A = nodes[a];
        const B = nodes[b];
        const live = k % 3 === 1;
        return (
          <line
            key={`e${k}`}
            x1={A.x}
            y1={A.y}
            x2={B.x}
            y2={B.y}
            {...stroke}
            className={live ? 'motif-dash' : undefined}
            strokeWidth={live ? 1.4 : 1}
            opacity={live ? 0.62 : 0.2}
          />
        );
      })}

      {nodes.map((n) => (
        <g key={`n${n.i}`}>
          {n.hot ? (
            <circle
              cx={n.x}
              cy={n.y}
              r="11"
              {...stroke}
              strokeWidth="1"
              className="motif-pulse"
            />
          ) : null}
          <circle
            cx={n.x}
            cy={n.y}
            r={n.hot ? 4.2 : 2.4}
            fill="currentColor"
            opacity={n.hot ? 0.95 : 0.42}
          />
        </g>
      ))}

      {/* Load legend — the diagram says what it is measuring. */}
      <g opacity="0.55">
        <text x="52" y="240" className="fill-current font-mono" fontSize="9" letterSpacing="1.6">
          NODE LOAD
        </text>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect
            key={`l${i}`}
            x={140 + i * 11}
            y={232}
            width="7"
            height="9"
            fill="currentColor"
            opacity={0.16 + i * 0.14}
          />
        ))}
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------- */

function PathMotif() {
  const route = 'M 42 216 H 104 V 148 H 196 V 94 H 274 V 48 H 358';
  const blocks = [
    { x: 120, y: 170, w: 54, h: 34 },
    { x: 214, y: 108, w: 46, h: 30 },
    { x: 62, y: 96, w: 40, h: 44 },
    { x: 292, y: 132, w: 62, h: 38 },
  ];

  return (
    <svg viewBox={VIEW} className="h-full w-full text-signal" aria-hidden="true">
      {/* Campus grid */}
      <g opacity="0.14">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line key={`v${i}`} x1={40 + i * 46} y1="26" x2={40 + i * 46} y2="234" {...stroke} strokeWidth="1" />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={`h${i}`} x1="30" y1={40 + i * 48} x2="370" y2={40 + i * 48} {...stroke} strokeWidth="1" />
        ))}
      </g>

      {/* Buildings */}
      {blocks.map((b, i) => (
        <rect
          key={`b${i}`}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx="3"
          fill="currentColor"
          opacity="0.09"
          stroke="currentColor"
          strokeOpacity="0.22"
          strokeWidth="1"
        />
      ))}

      {/* Solved route: a faint bed with a live signal running along it */}
      <path d={route} {...stroke} strokeWidth="2.5" opacity="0.18" />
      <path d={route} {...stroke} strokeWidth="2.2" opacity="0.95" className="motif-dash" />

      {/* Origin */}
      <circle cx="42" cy="216" r="9" {...stroke} strokeWidth="1.2" opacity="0.5" className="motif-pulse" />
      <circle cx="42" cy="216" r="4" fill="currentColor" />

      {/* Destination pin */}
      <g transform="translate(358 48)">
        <path d="M0 10 C -7 2 -9 -3 -9 -7 A 9 9 0 0 1 9 -7 C 9 -3 7 2 0 10 Z" fill="currentColor" opacity="0.95" />
        <circle cx="0" cy="-7" r="3.1" fill="var(--void)" />
      </g>

      <text x="42" y="246" className="fill-current font-mono" fontSize="9" letterSpacing="1.6" opacity="0.55">
        SHORTEST WALKABLE ROUTE
      </text>
    </svg>
  );
}

/* ---------------------------------------------------------------- */

function StreamMotif() {
  const sources = [72, 136, 200, 264, 328];

  return (
    <svg viewBox={VIEW} className="h-full w-full text-signal" aria-hidden="true">
      {/* Source rails */}
      {sources.map((x, i) => (
        <g key={`s${i}`}>
          <line x1={x} y1="34" x2={x} y2="150" {...stroke} strokeWidth="1" opacity="0.18" />
          <rect
            x={x - 13}
            y="26"
            width="26"
            height="16"
            rx="3"
            fill="currentColor"
            opacity="0.14"
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
          {/* Packet in flight */}
          <g className="motif-packet" style={{ animationDelay: `${i * 0.24}s` }}>
            <circle cx={x} cy="46" r="3.2" fill="currentColor" />
          </g>
        </g>
      ))}

      {/* Funnel into a single output */}
      {sources.map((x, i) => (
        <line
          key={`f${i}`}
          x1={x}
          y1="150"
          x2="200"
          y2="186"
          {...stroke}
          strokeWidth={i === 2 ? 1.6 : 1.1}
          opacity={i === 2 ? 0.6 : 0.28}
          className={i % 2 === 0 ? 'motif-dash' : undefined}
        />
      ))}

      {/* Output file */}
      <g transform="translate(200 186)">
        <circle cx="0" cy="0" r="13" {...stroke} strokeWidth="1.2" opacity="0.45" className="motif-pulse" />
        <path d="M0 -6 V 6 M -5 1 L 0 6 L 5 1" {...stroke} strokeWidth="1.8" />
      </g>
      <rect
        x="140"
        y="208"
        width="120"
        height="12"
        rx="6"
        fill="currentColor"
        opacity="0.16"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1"
      />
      <rect x="140" y="208" width="74" height="12" rx="6" fill="currentColor" opacity="0.62" />

      <text
        x="200"
        y="244"
        textAnchor="middle"
        className="fill-current font-mono"
        fontSize="9"
        letterSpacing="1.6"
        opacity="0.55"
      >
        MANY SOURCES → ONE FILE
      </text>
    </svg>
  );
}

/* ---------------------------------------------------------------- */

const MOTIFS = {
  cluster: ClusterMotif,
  path: PathMotif,
  stream: StreamMotif,
};

export default function ProjectMotif({ motif }) {
  const Motif = MOTIFS[motif] || ClusterMotif;
  return <Motif />;
}
