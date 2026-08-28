import { useEffect, useState } from 'react';

/**
 * True only on devices that have a real hovering pointer — used to
 * gate the custom cursor and tilt effects, which are meaningless
 * (and harmful) on touch.
 */
export default function usePointerFine() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const apply = () => setFine(mq.matches);
    apply();

    if (mq.addEventListener) mq.addEventListener('change', apply);
    else mq.addListener(apply);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', apply);
      else mq.removeListener(apply);
    };
  }, []);

  return fine;
}
