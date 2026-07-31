// screens.jsx — Pantallas del blog
// Cada pantalla es un componente React. Se exponen a window al final.

const { useEffect, useState, useMemo, useRef } = React;

// ─────────────────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────────────────
const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
function fmtDate(iso, fmt = "short") {
  const [y, m, d] = iso.split("-").map(Number);
  if (fmt === "long") return `${d} de ${["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"][m - 1]}, ${y}`;
  if (fmt === "year") return String(y);
  if (fmt === "monthday") return `${String(d).padStart(2, "0")} ${MESES[m - 1]}`;
  return `${String(d).padStart(2, "0")}.${String(m).padStart(2, "0")}.${String(y).slice(2)}`;
}
function tone(slug) {
  return (window.BLOG_CATEGORIES[slug] || {}).tone || "ink";
}
function catLabel(slug) {
  return (window.BLOG_CATEGORIES[slug] || {}).label || slug;
}
const PUNCT_RE = /([.,;:!?¿¡—–…«»"'()])/g;
function Punct({ text }) {
  if (!text) return text;
  return text.split(PUNCT_RE).map((part, i) =>
    PUNCT_RE.test(part) && part.length === 1 ?
    <span key={i} className="punct">{part}</span> :
    part
  );
}

// ─────────────────────────────────────────────────────────
//  HomeScreen
// ─────────────────────────────────────────────────────────
function HomeScreen({ onOpen }) {
  const [filter, setFilter] = useState("todos");

  const filtered = useMemo(() => {
    return filter === "todos" ?
    window.BLOG_POSTS :
    window.BLOG_POSTS.filter((p) => p.category === filter);
  }, [filter]);

  // Agrupar por año
  const byYear = useMemo(() => {
    const m = new Map();
    filtered.forEach((p) => {
      const y = p.date.slice(0, 4);
      if (!m.has(y)) m.set(y, []);
      m.get(y).push(p);
    });
    return [...m.entries()];
  }, [filtered]);

  return (
    <div className="screen">
      <section className="hero">
        <div className="hero-wrap">
          <div className="hero-copy">
            <h1>
              <Punct text="Notas sobre filosofía, educación y " /><span className="em">máquinas que parecen pensar</span><Punct text="." />
            </h1>
            <p>
              <Punct text="Soy Camilo. Doy clases, leo despacio y escribo aquí cuando una idea me persigue durante más de una semana. Sin calendario editorial, sin newsletter, sin prisa." />
            </p>
          </div>
          <figure className="hero-figure">
            <div className="img-frame" style={{ aspectRatio: "3 / 4" }}>
              <image-slot id="hero-portrait" shape="rect" placeholder="Retrato o ilustración — 3:4"></image-slot>
            </div>
            <figcaption className="img-caption">retrato / ilustración</figcaption>
          </figure>
        </div>
      </section>

      <div className="filter-row">
        <span className="filter-label">filtrar —</span>
        <button
          className={"chip" + (filter === "todos" ? " is-on" : "")}
          onClick={() => setFilter("todos")}>
          
          todos
        </button>
        {Object.entries(window.BLOG_CATEGORIES).map(([key, c]) =>
        <button
          key={key}
          className={"chip" + (filter === key ? " is-on" : "")}
          data-tone={c.tone}
          onClick={() => setFilter(key)}>
          
            <span className="dot" />
            {c.label.toLowerCase()}
          </button>
        )}
      </div>

      <div className="timeline">
        {byYear.map(([year, posts]) =>
        <React.Fragment key={year}>
            <div className="year">
              <div className="year-num">{year}</div>
              <div className="year-caption">
                {posts.length} {posts.length === 1 ? "entrada" : "entradas"}
              </div>
            </div>
            {posts.map((p) =>
          <article
            key={p.slug}
            className="row hoverable"
            data-tone={tone(p.category)}
            onClick={() => onOpen(p.slug)}>
            
                <div className="row-date">{fmtDate(p.date, "monthday")}</div>
                <div className="row-marker" />
                <div className="row-body">
                  <h2 className="row-title"><Punct text={p.title} /></h2>
                  <p className="row-excerpt"><Punct text={p.excerpt} /></p>
                  <div className="row-meta">
                    <span className="cat" data-tone={tone(p.category)}>{catLabel(p.category)}</span>
                    <span>{p.reading} min</span>
                    {p.tags && p.tags.slice(0, 2).map((t) =>
                <span key={t} style={{ color: "var(--muted-2)" }}>#{t.replace(/\s+/g, "-")}</span>
                )}
                  </div>
                </div>
              </article>
          )}
          </React.Fragment>
        )}
      </div>
    </div>);

}

// ─────────────────────────────────────────────────────────
//  PostScreen
// ─────────────────────────────────────────────────────────
function PostScreen({ slug, onOpen, onBack }) {
  const post = window.BLOG_POSTS.find((p) => p.slug === slug);
  const idx = window.BLOG_POSTS.findIndex((p) => p.slug === slug);
  const prev = idx >= 0 ? window.BLOG_POSTS[idx + 1] : null; // older
  const next = idx > 0 ? window.BLOG_POSTS[idx - 1] : null; // newer
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.scrollTo(0, 0);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  if (!post) return <div>Post no encontrado.</div>;

  return (
    <div className="screen post">
      <div className="progress" style={{ width: `${progress * 100}%` }} />
      <button className="back-link" onClick={onBack}>
        ← volver al índice
      </button>

      <header className="post-head">
        <div className="post-eyebrow">
          <span className="pill" data-tone={tone(post.category)}>{catLabel(post.category)}</span>
          <span>{fmtDate(post.date, "long")}</span>
          <span>·</span>
          <span>{post.reading} min de lectura</span>
        </div>
        <h1 className="post-title"><Punct text={post.title} /></h1>
        <p className="post-lede"><Punct text={post.excerpt} /></p>
      </header>

      <figure className="post-cover">
        <div className="img-frame" style={{ aspectRatio: "16 / 9" }}>
          <image-slot id={"cover-" + slug} shape="rect" placeholder="Imagen de portada — 16:9"></image-slot>
        </div>
        <figcaption className="img-caption">portada del texto</figcaption>
      </figure>

      <div className="post-body">
        {post.body.map((b, i) => {
          const fig = i === 3 ?
          <figure className="post-figure" key={"fig" + i}>
              <div className="img-frame" style={{ aspectRatio: "4 / 3" }}>
                <image-slot id={"inline-" + slug} shape="rect" placeholder="Fotografía o ilustración en el cuerpo"></image-slot>
              </div>
              <figcaption className="img-caption">imagen / pie de foto</figcaption>
            </figure> :
          null;
          const wrap = (el) => fig ? <React.Fragment key={i}>{fig}{el}</React.Fragment> : el;
          void wrap;
          if (b.kind === "h2") return wrap(<h2 key={i}><Punct text={b.text} /></h2>);
          if (b.kind === "pull") return wrap(<blockquote key={i} className="pull"><Punct text={b.text} /></blockquote>);
          if (b.kind === "p" && b.note) {
            // split off the last sentence and mark "note" word
            return wrap(
              <p key={i}>
                <span className="note" data-note={b.note}><Punct text={b.text} /></span>
              </p>);

          }
          return wrap(<p key={i}><Punct text={b.text} /></p>);
        })}
      </div>

      <footer className="post-foot">
        <div>
          {prev &&
          <a onClick={() => onOpen(prev.slug)} style={{ cursor: "pointer" }}>
              ← {prev.title}
            </a>
          }
        </div>
        <div style={{ textAlign: "right" }}>
          {next &&
          <a onClick={() => onOpen(next.slug)} style={{ cursor: "pointer" }}>
              {next.title} →
            </a>
          }
        </div>
      </footer>
    </div>);

}

// ─────────────────────────────────────────────────────────
//  AboutScreen
// ─────────────────────────────────────────────────────────
function AboutScreen() {
  return (
    <div className="screen">
      <div className="about-grid">
        <figure className="portrait-figure">
          <div className="img-frame" style={{ aspectRatio: "3 / 4" }}>
            <image-slot id="about-portrait" shape="rect" placeholder="Retrato — 3:4"></image-slot>
          </div>
          <figcaption className="img-caption">retrato</figcaption>
        </figure>
        <div className="about-body">
          <h1>Hola, soy <em>Camilo</em><Punct text="." /></h1>
          <p>
            <Punct text="Doy clases de filosofía en una universidad de Bogotá. Llevo doce años entrando a un salón cada semana y todavía no sé bien por qué no me canso." />
          </p>
          <p>
            <Punct text="Escribo sobre los temas que me obsesionan: la pregunta por la técnica desde Heidegger, la pedagogía como práctica filosófica, y lo que los grandes modelos de lenguaje nos obligan a reformular sobre qué cosa es pensar." />
          </p>
          <p>
            <Punct text="Este blog no tiene calendario, ni newsletter, ni métricas. Lo escribo en las mañanas, antes de que el día se vuelva otro día. Si algo aquí te resuena, escríbeme — leo todos los correos, aunque a veces tardo en responder." />
          </p>
          <dl className="about-facts">
            <dt>Vive en</dt><dd>Bogotá, Colombia</dd>
            <dt>Trabaja en</dt><dd>Universidad — Filosofía</dd>
            <dt>Escribiendo</dt><dd>desde 2021</dd>
            <dt>Lee</dt><dd>despacio, releyendo</dd>
            <dt>Contacto</dt><dd>camilo@correo.tld</dd>
          </dl>
        </div>
      </div>
    </div>);

}

// ─────────────────────────────────────────────────────────
//  NowScreen
// ─────────────────────────────────────────────────────────
function NowScreen() {
  const data = window.BLOG_NOW;
  return (
    <div className="screen">
      <header className="now-head">
        <div className="stamp">
          <span className="blip" />
          Actualizado el {fmtDate(data.updated, "long")} · {data.city}
        </div>
        <h1>¿En qué <em>ando</em> ahora?</h1>
        <p>
          Esta página intenta responder, en pocas palabras, qué tengo entre
          manos esta semana. La actualizo cada quince días, o cuando algo
          cambia de verdad.
        </p>
      </header>
      <div className="now-grid">
        {data.blocks.map((block) =>
        <div key={block.label} className="now-block">
            <h3>{block.label}</h3>
            <ul>
              {block.items.map((it, i) => <li key={i}>{it}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>);

}

// ─────────────────────────────────────────────────────────
//  ProjectsScreen
// ─────────────────────────────────────────────────────────
function ProjectsScreen() {
  return (
    <div className="screen">
      <header className="projects-head">
        <h1>Cosas en las que <em>trabajo</em>.</h1>
        <p>
          Cursos que doy, textos en proceso, seminarios. La lista es corta a
          propósito.
        </p>
      </header>
      {window.BLOG_PROJECTS.map((p) =>
      <div key={p.name} className="project-row">
          <div>
            <h3>{p.name}</h3>
            <p>{p.summary}</p>
          </div>
          <div className="side">
            <div>{p.period}</div>
            <div className="status" data-s={p.status}>{p.status}</div>
          </div>
        </div>
      )}
    </div>);

}

// ─────────────────────────────────────────────────────────
//  ArchiveScreen
// ─────────────────────────────────────────────────────────
function ArchiveScreen({ onOpen }) {
  const byYear = useMemo(() => {
    const m = new Map();
    window.BLOG_POSTS.forEach((p) => {
      const y = p.date.slice(0, 4);
      if (!m.has(y)) m.set(y, []);
      m.get(y).push(p);
    });
    return [...m.entries()];
  }, []);

  return (
    <div className="screen">
      <header className="archive-head">
        <h1>Archivo <em>cronológico</em>.</h1>
        <p>Todas las entradas, de la más reciente a la más antigua.</p>
      </header>
      {byYear.map(([year, posts]) =>
      <section className="archive-section" key={year}>
          <div className="yr">{year}</div>
          <ul>
            {posts.map((p) =>
          <li key={p.slug} onClick={() => onOpen(p.slug)}>
                <span className="a-date">{fmtDate(p.date, "monthday")}</span>
                <span className="a-title">{p.title}</span>
                <span className="a-tag">{catLabel(p.category).toLowerCase()}</span>
              </li>
          )}
          </ul>
        </section>
      )}
    </div>);

}

Object.assign(window, {
  HomeScreen, PostScreen, AboutScreen, NowScreen, ProjectsScreen, ArchiveScreen
});