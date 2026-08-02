<?xml version="1.0" encoding="UTF-8"?>
<!--
  Hoja de estilos del feed. Un lector de RSS la ignora por completo: solo la
  aplica un navegador, que sin ella muestra el XML crudo y hace pensar que el
  feed está roto.

  Los estilos van dentro del archivo porque esto se sirve como XML suelto, sin
  el CSS del sitio. Los colores son los mismos tokens de global.css, copiados a
  mano: es el único sitio del proyecto donde eso es inevitable.
-->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />

  <xsl:template match="/rss/channel">
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <title><xsl:value-of select="title" /> — feed</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <style>
          :root {
            --cream: #f7f4ee; --ink: #17110d; --ink-2: #332720;
            --muted: rgba(23,17,13,.6); --rule: rgba(90,60,30,.16);
            --accent: #c41508; --gold: #d4bb7c; --teal: #0f4b4b;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --cream: #020609; --ink: #f2ede4; --ink-2: #cfc6ba;
              --muted: rgba(242,237,228,.56); --rule: rgba(212,187,124,.18);
              --accent: #e5502f; --teal: #1f8080;
            }
          }
          * { box-sizing: border-box; }
          body {
            max-width: 42.5rem; margin: 0 auto; padding: 3rem 1.5rem;
            background: var(--cream); color: var(--ink);
            font-family: "Newsreader", "Iowan Old Style", Georgia, serif;
            font-size: 1.06rem; line-height: 1.65;
          }
          .mono {
            font-family: "IBM Plex Mono", Consolas, monospace;
            font-size: .7rem; letter-spacing: .1em; text-transform: uppercase;
            color: var(--muted);
          }
          h1 { margin: .5rem 0 .75rem; font-size: 2rem; font-weight: 400; letter-spacing: -.02em; }
          .lede { margin: 0 0 2rem; color: var(--ink-2); }
          .aviso {
            margin: 0 0 3rem; padding: 1rem 1.25rem;
            border-left: 3px solid var(--gold); background: rgba(212,187,124,.08);
            font-size: .95rem;
          }
          .aviso code { font-family: "IBM Plex Mono", Consolas, monospace; font-size: .85em; }
          article { padding: 1.5rem 0; border-top: 1px solid var(--rule); }
          h2 { margin: .375rem 0 .5rem; font-size: 1.3rem; font-weight: 500; line-height: 1.2; }
          h2 a { color: var(--ink); text-decoration: none; }
          h2 a:hover { color: var(--accent); }
          .desc { margin: 0; color: var(--ink-2); }
          .meta { display: flex; flex-wrap: wrap; gap: .875rem; }
          footer { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--rule); }
          a { color: var(--accent); text-underline-offset: .25em; }
        </style>
      </head>
      <body>
        <p class="mono">Feed RSS</p>
        <h1><xsl:value-of select="title" /></h1>
        <p class="lede"><xsl:value-of select="description" /></p>

        <p class="aviso">
          Esto es un <strong>feed</strong>, no una página. Copia esta dirección
          en tu lector —NetNewsWire, Feedly, Reeder, Thunderbird— y recibirás
          cada texto nuevo sin algoritmo de por medio:
          <br />
          <code><xsl:value-of select="link" />rss.xml</code>
        </p>

        <xsl:for-each select="item">
          <article>
            <p class="mono meta">
              <span><xsl:value-of select="substring(pubDate, 6, 11)" /></span>
              <xsl:if test="category">
                <span><xsl:value-of select="category" /></span>
              </xsl:if>
            </p>
            <h2>
              <a><xsl:attribute name="href"><xsl:value-of select="link" /></xsl:attribute>
                <xsl:value-of select="title" />
              </a>
            </h2>
            <p class="desc"><xsl:value-of select="description" /></p>
          </article>
        </xsl:for-each>

        <footer class="mono">
          <a><xsl:attribute name="href"><xsl:value-of select="link" /></xsl:attribute>
            ← ir al blog
          </a>
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
