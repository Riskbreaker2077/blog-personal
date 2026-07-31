// data.js — contenido del blog de Camilo Moreno
// Posts, proyectos, y la página /now

window.BLOG_AUTHOR = {
  name: "Camilo Moreno",
  handle: "@camilomoreno",
  bio: "Escribo sobre filosofía, educación e inteligencia artificial. Doy clases. Leo despacio.",
  location: "Bogotá",
  since: "2021",
};

window.BLOG_CATEGORIES = {
  filosofia:  { label: "Filosofía",  short: "fil", tone: "accent" },
  educacion:  { label: "Educación",  short: "edu", tone: "gold"   },
  ia:         { label: "IA",         short: "ia",  tone: "ink"    },
};

// Posts, en orden cronológico inverso. `body` es array de bloques.
window.BLOG_POSTS = [
  {
    slug: "maquinas-que-parecen-pensar",
    title: "Sobre máquinas que parecen pensar",
    date: "2026-04-22",
    reading: 9,
    category: "ia",
    tags: ["filosofía de la mente", "LLMs"],
    excerpt: "El problema no es si las máquinas piensan, sino qué hacemos con su semejanza al pensamiento.",
    body: [
      { kind: "p", text: "Durante mucho tiempo la pregunta fue si una máquina podía pensar. Hoy, después de pasar tres meses conversando con modelos que escriben mejor que muchos de mis estudiantes, la pregunta me parece mal formulada." },
      { kind: "p", text: "No es que los modelos piensen. Es que la pregunta — '¿pensar?' — exige que sepamos antes qué cosa es pensar, y ahí, francamente, no tenemos un consenso." },
      { kind: "h2", text: "El criterio que nunca tuvimos" },
      { kind: "p", text: "Turing, con su elegancia habitual, propuso una prueba operativa: si no podemos distinguirlo, no importa. Esa fue, durante setenta años, una respuesta cómoda.", note: "Computing Machinery and Intelligence, 1950." },
      { kind: "p", text: "Pero la prueba operativa siempre tuvo un problema filosófico: confunde el indicio con la cosa. Un loro repite 'te quiero' sin querernos. Un termostato 'decide' encender la calefacción sin decidir nada." },
      { kind: "pull", text: "Lo interesante no es que las máquinas piensen. Es que pensar resulta no ser lo que creíamos." },
      { kind: "h2", text: "Una semejanza sin esencia" },
      { kind: "p", text: "Lo que tenemos hoy es semejanza funcional sin parentesco metafísico. Y eso, lejos de cerrar el debate, lo desplaza: la pregunta deja de ser ontológica y se vuelve política." },
      { kind: "p", text: "¿Qué queremos hacer con artefactos que se parecen al pensamiento? ¿En qué espacios los dejamos entrar? ¿A qué los obligamos a renunciar para entrar?" },
    ],
  },
  {
    slug: "pedagogia-de-la-pregunta",
    title: "La pedagogía de la pregunta",
    date: "2026-04-10",
    reading: 6,
    category: "educacion",
    tags: ["pedagogía", "Freire"],
    excerpt: "Enseñar no es transferir certezas; es enseñar a habitar la incertidumbre con dignidad.",
    body: [
      { kind: "p", text: "Hay un texto breve de Freire y Faundez que vuelvo a leer cada semestre. Se llama Por una pedagogía de la pregunta. Una de sus tesis es desconcertantemente simple: la escuela enseña a responder antes de enseñar a preguntar." },
      { kind: "p", text: "Eso quiere decir, en la práctica, que el alumno aprende que las preguntas son tareas — algo que viene desde fuera, con una respuesta correcta esperando — y no formas de habitar el mundo." },
      { kind: "h2", text: "El silencio del aula" },
      { kind: "p", text: "Cuando pregunto en clase '¿qué dudas tienen?', el silencio que sigue no es desinterés. Es el residuo de catorce años de instrucción en los que preguntar era ruido." },
      { kind: "p", text: "Recuperar la pregunta como práctica exige, primero, devolverle su densidad. Una buena pregunta no se responde rápido. A veces no se responde nunca. A veces lo que hacemos con ella es vivirla.", note: "Rilke, Cartas a un joven poeta." },
    ],
  },
  {
    slug: "wittgenstein-y-los-llms",
    title: "Wittgenstein y los modelos de lenguaje",
    date: "2026-03-28",
    reading: 11,
    category: "ia",
    tags: ["Wittgenstein", "filosofía del lenguaje"],
    excerpt: "Si el significado es uso, entonces los LLMs no están tan lejos del lenguaje como sugieren sus críticos — ni tan cerca como sugieren sus defensores.",
    body: [
      { kind: "p", text: "Una lectura demasiado rápida del segundo Wittgenstein concluye que los LLMs ya 'hablan' en sentido pleno: si el significado es uso, y los modelos usan el lenguaje, entonces significan." },
      { kind: "p", text: "El argumento es tentador y, creo, equivocado. No porque el uso sea insuficiente como criterio, sino porque malinterpreta qué quiere decir 'uso' en las Investigaciones." },
      { kind: "h2", text: "Formas de vida" },
      { kind: "p", text: "El uso, para Wittgenstein, no es producción verbal. Es participación en una forma de vida: un tejido de prácticas, dolores, intereses, cuerpos." },
      { kind: "p", text: "Los modelos producen las cadenas de signos correctas sin participar de las prácticas que les dan sentido. Es una forma de uso sin uso, si se me permite la torpeza." },
    ],
  },
  {
    slug: "aprender-en-tiempos-de-ia",
    title: "Aprender en tiempos de IA",
    date: "2026-03-15",
    reading: 7,
    category: "educacion",
    tags: ["IA", "educación superior"],
    excerpt: "La trampa no es que los estudiantes usen IA. Es que la usen sin que se dé un cambio en lo que pedimos de ellos.",
    body: [
      { kind: "p", text: "Cuando llegó ChatGPT a las aulas, la primera reacción institucional fue prohibitiva. La segunda, integradora. La tercera — la que apenas empieza — es la única interesante: repensar qué evaluamos." },
    ],
  },
  {
    slug: "aula-como-espacio-fenomenologico",
    title: "El aula como espacio fenomenológico",
    date: "2026-02-20",
    reading: 8,
    category: "educacion",
    tags: ["fenomenología", "Merleau-Ponty"],
    excerpt: "Antes de ser un lugar pedagógico, el aula es un lugar corporal. Conviene recordarlo.",
    body: [
      { kind: "p", text: "Hay un cuerpo en el aula. Veintitantos, en realidad. Y antes de que ocurra cualquier cosa intelectual, ocurren cosas corporales: alguien tiene frío, alguien no durmió, alguien está enamorado." },
    ],
  },
  {
    slug: "atencion-recurso-escaso",
    title: "Atención: el recurso más escaso",
    date: "2026-02-04",
    reading: 5,
    category: "filosofia",
    tags: ["Simone Weil", "atención"],
    excerpt: "Simone Weil escribió que la atención es la forma más rara y pura de generosidad. Tenía razón, y ahora más que nunca.",
    body: [
      { kind: "p", text: "Hay algo que las plataformas han descubierto antes que los filósofos: la atención es escasa, y por eso es valiosa. Lo que las plataformas no entienden — lo que Weil sí — es que la atención no es un recurso a extraer." },
    ],
  },
  {
    slug: "heidegger-y-la-tecnica",
    title: "Notas sobre Heidegger y la técnica",
    date: "2026-01-18",
    reading: 10,
    category: "filosofia",
    tags: ["Heidegger", "técnica"],
    excerpt: "La técnica no es el conjunto de las máquinas. Es un modo de desocultar lo real — y por eso es peligroso.",
    body: [
      { kind: "p", text: "El ensayo de Heidegger sobre la técnica sigue siendo, después de setenta años, el texto que más vuelvo a leer cuando alguien habla de IA con entusiasmo." },
    ],
  },
  {
    slug: "lo-que-un-llm-no-explica",
    title: "Lo que un LLM no puede explicar",
    date: "2025-12-22",
    reading: 6,
    category: "ia",
    tags: ["interpretabilidad", "LLMs"],
    excerpt: "Que un modelo responda bien no implica que sepa por qué. Que un humano responda bien tampoco — pero esa simetría es engañosa.",
    body: [
      { kind: "p", text: "Hay una asimetría incómoda en las defensas habituales de los modelos: 'tampoco los humanos sabemos por qué pensamos lo que pensamos'." },
    ],
  },
  {
    slug: "oficio-de-ensenar",
    title: "Sobre el oficio de enseñar",
    date: "2025-11-30",
    reading: 4,
    category: "educacion",
    tags: ["docencia", "oficio"],
    excerpt: "Llevo doce años entrando a un salón de clases. Algo he aprendido. Casi nada de lo que esperaba aprender.",
    body: [
      { kind: "p", text: "Lo primero: nadie te prepara para la mirada de veinticinco personas esperando que ocurra algo." },
    ],
  },
  {
    slug: "verdad-como-practica",
    title: "La verdad como práctica",
    date: "2025-10-15",
    reading: 7,
    category: "filosofia",
    tags: ["pragmatismo", "verdad"],
    excerpt: "Tengo la sospecha de que la verdad no es un estado del enunciado, sino un compromiso del que lo enuncia.",
    body: [
      { kind: "p", text: "El pragmatismo tiene mala prensa entre los filósofos analíticos." },
    ],
  },
  {
    slug: "etica-para-sistemas-que-no-entienden",
    title: "Ética para sistemas que no entienden",
    date: "2025-09-08",
    reading: 9,
    category: "ia",
    tags: ["ética", "alineamiento"],
    excerpt: "Diseñar un sistema ético es más difícil cuando el sistema no tiene la menor idea de lo que está haciendo.",
    body: [
      { kind: "p", text: "Buena parte de la ética occidental presupone agentes. Un agente delibera, escoge, asume." },
    ],
  },
];

window.BLOG_PROJECTS = [
  {
    name: "Curso: Filosofía de la IA",
    period: "2025 — en curso",
    status: "activo",
    summary: "Curso semestral en la universidad. Lecturas que van de Turing a Floridi, pasando por Wittgenstein.",
  },
  {
    name: "Cuaderno sobre la atención",
    period: "2024 — borrador",
    status: "lento",
    summary: "Manuscrito de un libro corto. Cien páginas. Avanza más despacio de lo que me gustaría.",
  },
  {
    name: "Pedagogías del prompt",
    period: "2025",
    status: "publicado",
    summary: "Artículo en revista de educación sobre cómo cambian las consignas cuando los estudiantes tienen LLMs.",
  },
  {
    name: "Seminario abierto: Heidegger + IA",
    period: "2026",
    status: "planeado",
    summary: "Ocho sesiones gratuitas, abiertas, sobre 'La pregunta por la técnica' leída a la luz del presente.",
  },
];

window.BLOG_NOW = {
  updated: "2026-05-12",
  city: "Bogotá",
  blocks: [
    {
      label: "Leyendo",
      items: [
        "Iris Murdoch — La soberanía del bien",
        "Brian Christian — The Alignment Problem (relectura)",
        "Antonio Machado — Juan de Mairena, por las noches",
      ],
    },
    {
      label: "Escribiendo",
      items: [
        "Un ensayo largo sobre la diferencia entre comprender y predecir",
        "Notas dispersas para el cuaderno sobre atención",
      ],
    },
    {
      label: "Enseñando",
      items: [
        "Filosofía de la IA (lunes y miércoles)",
        "Seminario de lectura: Wittgenstein tardío (jueves)",
      ],
    },
    {
      label: "Pensando",
      items: [
        "Por qué los modelos hacen mejor metáforas que argumentos",
        "Si tiene sentido seguir hablando de 'inteligencia' en singular",
      ],
    },
  ],
};
