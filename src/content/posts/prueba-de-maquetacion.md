---
title: "Prueba de maquetación del cuerpo del texto"
description: "Borrador técnico para validar el layout de lectura: encabezados, citas, listas, enlaces, código y párrafos largos. No es un texto editorial."
pubDate: 2026-07-31
topic: general
draft: true
epigraph:
  text: "Un epígrafe abre el texto y no discute con él: lo sitúa."
  source: "Nota al margen, sin fuente"
---

Este archivo existe para verificar cómo se comporta el layout de lectura con
Markdown representativo. No es un texto del blog: está marcado como borrador,
así que aparece en el servidor de desarrollo y desaparece del build de
producción. Cuando el primer texto real ocupe su lugar, este puede borrarse sin
consecuencias.

El primer párrafo lleva capitular. Conviene que tenga varias líneas para
comprobar que la letra flotante no empuja el texto de forma extraña ni se
solapa con la línea siguiente, sobre todo en pantallas estrechas donde el ancho
de lectura se reduce y cada línea acomoda menos caracteres de los previstos.

## Un encabezado de segundo nivel

Los encabezados de segundo nivel llevan un calderón en el margen izquierdo. En
pantallas menores de 48rem ese símbolo se oculta para que no se recorte contra
el borde de la ventana.

Un párrafo intermedio, con **negrita**, _cursiva_ y un [enlace de
prueba](https://astro.build), para ver el subrayado del acento y su separación
respecto de la línea base.

> Una cita en bloque, que en el prototipo hace las veces de frase destacada. Debe
> leerse en cursiva, con la barra de acento a la izquierda y aire suficiente
> arriba y abajo.

### Encabezado de tercer nivel

Una lista, para revisar sangrías y separación entre elementos:

- Primer elemento, corto.
- Segundo elemento, algo más largo, para comprobar cómo cae la segunda línea
  respecto de la viñeta.
- Tercer elemento con `código en línea` incrustado.

Y una lista ordenada:

1. Uno.
2. Dos.
3. Tres.

---

Después de una regla horizontal, un bloque de código:

```bash
pnpm dev
```

Y una tabla breve:

| Campo         | Obligatorio | Nota                         |
| ------------- | ----------- | ---------------------------- |
| `title`       | sí          | máximo 90 caracteres         |
| `description` | sí          | aparece en listados y en meta |
| `cover`       | no          | si existe, `alt` obligatorio |

Un último párrafo largo para cerrar y estimar el tiempo de lectura. El cálculo
descarta la sintaxis de Markdown, cuenta palabras separadas por espacio y las
divide entre doscientas por minuto, que es un ritmo razonable para prosa en
español. Es una aproximación declarada, no una medición: sirve para orientar al
lector sobre la extensión del texto, no para prometerle una duración exacta.
