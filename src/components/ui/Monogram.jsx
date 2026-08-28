import { useState } from 'react';
import { profile } from '../../data/content';

/**
 * Profile mark with a swappable photo slot.
 *
 * ── TO ADD YOUR REAL PHOTO ─────────────────────────────────
 *  Save a square image (800×800 or larger) as:
 *      public/profile.jpg
 *  That is the whole job. It is picked up automatically and the
 *  monogram below stops rendering. To use a .png or a different
 *  name, change `profile.photo` in src/data/content.js.
 * ───────────────────────────────────────────────────────────
 *
 * Until a photo exists, a generated monogram stands in: a rotating
 * conic ring around the initials, so the empty state still looks
 * intentional rather than unfinished.
 */
export default function Monogram({ size = 200, showPhoto = true, className = '' }) {
  const [hasPhoto, setHasPhoto] = useState(false);

  const ring = Math.max(2, Math.round(size * 0.014));
  const inset = ring + Math.max(3, Math.round(size * 0.02));

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer bloom */}
      <div
        className="pointer-events-none absolute -inset-[18%] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(10,122,79,0.12) 0%, rgba(10,122,79,0) 68%)',
        }}
      />

      {/* Rotating signal ring */}
      <div
        className="absolute inset-0 animate-spin-slow rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(10,122,79,0) 0deg, #0a7a4f 55deg, rgba(10,122,79,0) 150deg, rgba(10,122,79,0) 200deg, #0d9c5e 265deg, rgba(10,122,79,0) 340deg)',
        }}
      />

      {/* Mask the ring down to a hairline */}
      <div className="absolute rounded-full bg-void" style={{ inset: ring }} />

      {/* Content disc */}
      <div
        className="absolute flex items-center justify-center overflow-hidden rounded-full border border-[rgba(10,122,79,0.2)]"
        style={{
          inset,
          background:
            'radial-gradient(120% 120% at 30% 20%, #eaf4ee 0%, #d8eae0 55%, #c8e0d2 100%)',
        }}
      >
        {showPhoto ? (
          <img
            src={profile.photo}
            alt={`${profile.shortName} — portrait`}
            width={size}
            height={size}
            // Eager, not lazy: it is one small image, and deferring it
            // would let the monogram→photo swap happen in full view.
            loading="eager"
            decoding="async"
            // While no photo exists this element is a transparent, 404ing
            // box — keep it out of the accessibility tree so screen
            // readers do not announce a portrait that is not there.
            aria-hidden={!hasPhoto}
            onLoad={() => setHasPhoto(true)}
            onError={() => setHasPhoto(false)}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
            style={{ opacity: hasPhoto ? 1 : 0 }}
          />
        ) : null}

        {!hasPhoto ? (
          <div className="relative flex flex-col items-center justify-center">
            <span
              className="glow-text font-display font-semibold leading-none tracking-tightest text-signal"
              style={{ fontSize: Math.round(size * 0.3) }}
            >
              {profile.initials}
            </span>
            {size >= 150 ? (
              <span
                className="readout mt-3"
                style={{ fontSize: Math.max(8, Math.round(size * 0.045)) }}
              >
                portrait pending
              </span>
            ) : null}
          </div>
        ) : null}

        {/* Scanline sheen so the disc reads as a screen, not a sticker */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, rgba(10,122,79,0.15) 0px, rgba(10,122,79,0.15) 1px, transparent 1px, transparent 4px)',
          }}
        />
      </div>
    </div>
  );
}
