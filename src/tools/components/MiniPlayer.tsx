import { useEffect, useRef, useState } from "react";
import { FiMaximize2, FiX } from "react-icons/fi";
import { navigate } from "../hooks/LOCAL/useRoute";

const ORIGIN = "https://playlistgo.vercel.app";
const PLAYER = `${ORIGIN}/myplayer`;
export const PLAYER_PATH = "/playlist";

// the playlist iframe lives here, not in a page, so it keeps playing while you browse.
// it is created on the first visit to /playlist and never moved in the DOM
// (moving an iframe reloads it) — only its CSS switches between full page and mini strip.
// in the strip, playlistGo shows only its mini bar: we post { type: "playlistgo:mini", mini }
// and it posts { type: "playlistgo:open" } back when its bar is tapped
export default function MiniPlayer({ path }: { path: string }) {
  const full = path === PLAYER_PATH;
  const [on, setOn] = useState(full);
  const [loaded, setLoaded] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);

  if (full && !on) setOn(true);

  // tell playlistGo which mode it is in (again after every load: it starts in full mode)
  useEffect(() => {
    if (!on || !loaded) return;
    frame.current?.contentWindow?.postMessage({ type: "playlistgo:mini", mini: !full }, ORIGIN);
  }, [on, loaded, full]);

  // a tap on playlistGo's mini bar opens our full playlist page
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== ORIGIN || e.source !== frame.current?.contentWindow) return;
      if (e.data?.type === "playlistgo:open") navigate(PLAYER_PATH);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (!on) return null;

  return (
    <aside className={`player ${full ? "is-full" : "is-mini"}`} aria-label="My playlist">
      <div className="player-actions">
        <button onClick={() => navigate(PLAYER_PATH)} aria-label="Open playlist" title="Open">
          <FiMaximize2 />
        </button>
        <button onClick={() => { setOn(false); setLoaded(false); }} aria-label="Close player" title="Close">
          <FiX />
        </button>
      </div>

      <div className="player-frame">
        {!loaded && <p className="page-status">Loading my playlist…</p>}
        <iframe
          ref={frame}
          src={PLAYER}
          title="Jasur's playlist"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture; clipboard-write"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </aside>
  );
}
