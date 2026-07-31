// app.jsx — Root, navegación y tweaks

const { useState, useEffect, useRef } = React;

// Defaults persistidos por el host
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dark": false,
  "accent": "#c41508",
  "typography": "editorial",
  "density": "regular",
  "life": "subtle"
}/*EDITMODE-END*/;

const TYPOGRAPHY_PRESETS = {
  editorial: {
    label: "Editorial",
    serif: '"Newsreader", "Source Serif 4", Georgia, serif',
    mono:  '"JetBrains Mono", ui-monospace, monospace',
  },
  library: {
    label: "Biblioteca",
    serif: '"Source Serif 4", "Newsreader", Georgia, serif',
    mono:  '"IBM Plex Mono", ui-monospace, monospace',
  },
  classic: {
    label: "Clásica",
    serif: '"EB Garamond", "Newsreader", Georgia, serif',
    mono:  '"JetBrains Mono", ui-monospace, monospace',
  },
};

const ACCENT_OPTIONS = ["#c41508", "#0f4b4b", "#854d27", "#d4bb7c"];
// Variante luminosa para modo oscuro (contraste sobre fondo #0e0b22)
const ACCENT_DARK = { "#c41508": "#e5502f", "#0f4b4b": "#1f8080", "#854d27": "#b47a45", "#d4bb7c": "#d4bb7c" };

// ─────────────────────────────────────────────────────────
//  Cursor follower (life=playful)
// ─────────────────────────────────────────────────────────
function useCursorFollower() {
  useEffect(() => {
    const ring = document.getElementById("cursor-ring");
    if (!ring) return;
    let x = 0, y = 0, rx = 0, ry = 0, raf = 0;
    function onMove(e) { x = e.clientX; y = e.clientY; }
    function onOver(e) {
      const t = e.target.closest("a, button, .row, .chip, .archive-section li, .project-row, .note");
      ring.classList.toggle("hover", !!t);
    }
    function loop() {
      rx += (x - rx) * 0.22;
      ry += (y - ry) * 0.22;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);
}

// ─────────────────────────────────────────────────────────
//  App root
// ─────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useState({ name: "home" });

  useCursorFollower();

  // Apply tokens to <html> / <body> based on tweaks
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", t.dark ? "dark" : "light");
    document.documentElement.setAttribute("data-density", t.density);
    document.body.setAttribute("data-life", t.life);

    const preset = TYPOGRAPHY_PRESETS[t.typography] || TYPOGRAPHY_PRESETS.editorial;
    document.documentElement.style.setProperty("--font-serif", preset.serif);
    document.documentElement.style.setProperty("--font-mono", preset.mono);
    const accent = t.dark ? (ACCENT_DARK[t.accent] || t.accent) : t.accent;
    document.documentElement.style.setProperty("--accent", accent);
    document.documentElement.style.setProperty("--tone-accent", accent);
  }, [t]);

  // Reset scroll on screen change
  useEffect(() => {
    if (route.name !== "post") window.scrollTo(0, 0);
  }, [route]);

  function goto(name, extra = {}) { setRoute({ name, ...extra }); }
  function openPost(slug) { setRoute({ name: "post", slug }); }

  const screen = (() => {
    switch (route.name) {
      case "home":     return <HomeScreen     onOpen={openPost} />;
      case "post":     return <PostScreen     slug={route.slug} onOpen={openPost} onBack={() => goto("home")} />;
      case "about":    return <AboutScreen    />;
      case "archive":  return <ArchiveScreen  onOpen={openPost} />;
      default:         return <HomeScreen     onOpen={openPost} />;
    }
  })();

  const isActive = (name) => route.name === name || (name === "home" && route.name === "post");

  return (
    <div className="shell">
      {/* Topbar */}
      <header className="topbar">
        <button className="brand" onClick={() => goto("home")} aria-label="Inicio">
          <span className="brand-dot" />
          <span>Camilo Moreno</span>
          <span className="brand-sub">— bitácora</span>
        </button>
        <nav className="nav">
          <button className={isActive("home") ? "is-active" : ""} onClick={() => goto("home")}>índice</button>
          <button className={isActive("about") ? "is-active" : ""} onClick={() => goto("about")}>sobre</button>
          <button className={isActive("archive") ? "is-active" : ""} onClick={() => goto("archive")}>archivo</button>
          <button
            className="theme-toggle"
            onClick={() => setTweak("dark", !t.dark)}
            aria-label="Cambiar tema"
            title={t.dark ? "Modo claro" : "Modo oscuro"}
          >
            {t.dark ? "○" : "●"}
          </button>
        </nav>
      </header>

      {/* Screen */}
      {screen}

      {/* Footer */}
      <footer className="footer">
        <div className="colophon">
          Hecho con 🫰 desde el Quindío.
        </div>
        <div>© 2021–2026 · CC BY-NC 4.0</div>
      </footer>

      {/* Tweaks */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Apariencia" />
        <TweakToggle
          label="Modo oscuro"
          value={t.dark}
          onChange={(v) => setTweak("dark", v)}
        />
        <TweakColor
          label="Color de acento"
          value={t.accent}
          options={ACCENT_OPTIONS}
          onChange={(v) => setTweak("accent", v)}
        />

        <TweakSection label="Tipografía" />
        <TweakRadio
          label="Pareja"
          value={t.typography}
          options={["editorial", "library", "classic"]}
          onChange={(v) => setTweak("typography", v)}
        />

        <TweakSection label="Layout" />
        <TweakRadio
          label="Densidad"
          value={t.density}
          options={["compact", "regular", "relaxed"]}
          onChange={(v) => setTweak("density", v)}
        />

        <TweakSection label="Detalles con vida" />
        <TweakRadio
          label="Estilo"
          value={t.life}
          options={["off", "subtle", "playful"]}
          onChange={(v) => setTweak("life", v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
