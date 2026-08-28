import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

/**
 * StrictMode is intentionally omitted.
 *
 * It double-invokes effects in development, which means ScrollTrigger
 * pins and the Lenis instance get created twice before the first
 * cleanup runs. The teardown here is correct either way, but the
 * double pass produces phantom pin-spacers in dev only — noise that
 * makes real scroll bugs harder to see. Nothing in this app fetches
 * data, so StrictMode buys us very little in return.
 */
createRoot(document.getElementById('root')).render(<App />);
