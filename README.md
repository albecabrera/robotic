# Informatik an der ESG

Portal de Informatik para la **Elisabeth-Selbert-Gesamtschule Bonn**. Página única (one-page) con materiales de clase, planes de estudio internos (Lehrpläne), proyectos y videos de aprendizaje para el curso de Informatik del Sr. Cabrera.

**Dev**: [http://localhost:3000](http://localhost:3000) · **XAMPP**: [http://localhost/robotic/](http://localhost/robotic/)

## Stack

| Tecnología | Versión | Uso |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.x | Framework (App Router + Turbopack, static export) |
| [React](https://react.dev) | 19.x | UI |
| [TypeScript](https://www.typescriptlang.org) | 6.x | Tipado estático |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Estilos (`@tailwindcss/postcss`) |
| [framer-motion](https://motion.dev) | 12.x | Animaciones (springs, reveals, carrusel, contadores) |
| [Spline](https://spline.design) | 4.x / 1.x | Escena 3D del robot en el hero (WebGL) |
| [Radix UI](https://www.radix-ui.com) | — | Primitivas accesibles (`accordion`, `tabs`, `slot`) |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.4 | Tema forzado a **dark only** |
| [lucide-react](https://lucide.dev) | 1.x | Íconos |
| `react-icons` | — | Logos de lenguajes (SiScratch, SiPython, SiHtml5) |
| `class-variance-authority`, `clsx`, `tailwind-merge` | — | Composición de clases (`cn()`) |
| `tw-animate-css` | 1.x | Utilidades de animación CSS |

## Comandos

```bash
npm install            # instalar dependencias
npm run dev            # dev server → http://localhost:3000 (mata el puerto previo automáticamente)
npm run build          # build de producción estándar
npm run build:xampp    # build con BASE_PATH=/robotic para XAMPP
npm run deploy:xampp   # build:xampp + copia a /Users/acabrera/xampp-data/htdocs/robotic
npm run lint           # ESLint
npm run shots          # QA visual: capturas de las secciones clave (desktop + móvil) en .shots/
```

Requisitos: **Node.js 20+**, browser con **WebGL habilitado** (ver Troubleshooting).

> `npm run shots` necesita el dev server corriendo y el browser de Playwright (`npx playwright install chromium` una sola vez). Apunta a otra URL con `BASE=http://localhost/robotic npm run shots`. La salida en `.shots/` está en `.gitignore`.

## Estructura del proyecto

```
app/
  layout.tsx        # Root layout: fuentes, dark mode, preconnect Spline, Open Graph/Twitter meta
  page.tsx          # Página única — todas las secciones
  globals.css       # Tailwind 4, design tokens, clases utilitarias (section-shell, heading-2…)
  img/              # Logos de herramientas (Cubi, XLogo, TigerJython, App Inventor, Calliope)
components/
  blocks/
    spline-hero.tsx              # Hero: Spotlight + texto + robot 3D con ErrorBoundary
  ui/
    programming-tools-grid.tsx   # Grid animado de herramientas (stagger + hover spring)
    learning-roadmap.tsx         # Roadmap Kl.5→Abitur con contadores animados en los números
    project-showcase.tsx         # Proyecto destacado xLogo (galería + lightbox) + tarjetas de proyectos
    site-search.tsx              # Búsqueda full-text en la página (lupa en navbar + Cmd/Ctrl+K)
    curricula-cards.tsx          # Tarjetas de Lehrpläne con botón de descarga
    material-card.tsx            # Tarjeta de materiales (spring hover)
    material-filter.tsx          # Filtro de materiales por nivel
    eltern-section.tsx           # Sección para padres (3 tarjetas animadas)
    orbiting-skills.tsx          # Órbitas de lenguajes (rAF, client-only)
    orbiting-skills-no-ssr.tsx   # Wrapper dynamic(ssr:false) con skeleton de carga
    orbiting-carousel-*.tsx      # Carrusel de pioneros de la informática
    modern-animated-hero-section.tsx  # RainingLetters: lluvia de caracteres (100 nodos, RAF)
    vertical-tabs.tsx            # Tabs de cursos con auto-play e imágenes
    testimonials-columns-1.tsx   # Carrusel horizontal de Lernvideos
    navbar-1.tsx                 # Navegación con scroll-spy + botón de búsqueda
    footer-column.tsx            # Footer 4 columnas
    …                            # glowing-button, spline-hero, splite, accordion, etc.
public/
  docs/
    lehrplan-7-8.pdf             # Lehrplan interno Jahrgänge 7/8
    lehrplan-9-10.docx           # Lehrplan interno Jahrgänge 9/10
  projekte/
    xlogo/                       # Stadtlandschaften de alumnos (WP-Informatik 7)
lib/
  utils.ts          # cn() — clsx + tailwind-merge
  accents.ts        # Paleta de acento centralizada (blue, orange, green, purple, amber, red, teal)
```

## Secciones (`app/page.tsx`)

| Anchor | Contenido |
|---|---|
| `#inicio` | Hero: robot 3D (Spline) + CTAs |
| `#welcome` | RainingLetters — lluvia de caracteres con typewriter |
| `#programmieren` | Herramientas: Cubi, Scratch, App Inventor, XLogo, TigerJython, HTML/CSS, Python, Java |
| `#roadmap` | Von Klasse 5 bis zum Abitur — roadmap con contadores animados |
| `#kurse` | Tabs de cursos con imágenes |
| `#projekte` | Proyecto destacado **"Eine Stadtlandschaft mit xLogo bauen"** (WP-Informatik 7, galería + lightbox) + tarjetas de proyectos |
| `#materialien` | Materiales filtrados por nivel (Kl. 5–7, 7–10, EF–Q2) |
| `#lehrplaene` | Lehrpläne internos con descarga de PDF/Word para Jg. 7/8 y 9/10 |
| `#eltern` | Sección para padres |
| `#informatiker` | Carrusel de pioneros de la informática |
| `#lernvideos` | Carrusel de Lernvideos |
| `#kontakt` | Footer con contacto (cabrera@esg-bonn.de) |

## Animaciones

Todos los componentes con tarjetas siguen el mismo patrón:

- **Entrada**: `opacity 0→1` + `y 28→0` + `scale 0.92→1` con spring (stiffness 260, damping 22), escalonado por índice
- **Hover**: `scale 1.04`, `y -6`, `boxShadow` en el color del elemento, `borderColor` suavizado, glow radial detrás
- **Tap**: `scale 0.97`
- **prefers-reduced-motion**: los loops de RAF y los carruseles se detienen si el sistema lo pide

Componentes animados: `ProgrammingToolsGrid`, `ProjectShowcase`, `ElternSection`, `MaterialCard`, `CurriculaCards`, `LearningRoadmap` (contadores), `Testimonials` (carrusel pausable).

## Deploy a XAMPP

```bash
npm run deploy:xampp
```

Construye con `BASE_PATH=/robotic` y copia `out/` a `/Users/acabrera/xampp-data/htdocs/robotic`. Los documentos PDF/Word en `public/docs/` quedan accesibles en `localhost/robotic/docs/`.

> El directorio `out/` está en `.gitignore` — nunca se commitea el build.

> **Por qué copia y no symlink/bind-mount**: el contenedor XAMPP corre en Docker (Apache en el puerto 80). Un symlink a `out/` apunta a un path del host invisible dentro del contenedor; un bind-mount de `out/` se rompe porque `next build` recrea el directorio (nuevo inode) y VirtioFS pierde la referencia. La copia escribe archivos reales dentro del volumen `htdocs` ya montado — inmune a ambos problemas. Si el browser muestra una versión vieja, es caché: `Cmd+Shift+R`.

## Tipografía y responsividad

El sistema de tipos vive en `app/globals.css` (`@layer utilities`) y es **fluido** — escala con `clamp(min, preferido, max)` en vez de saltar por breakpoint, así cada texto se ve proporcionado de móvil 320px a ultra-wide.

| Clase | Tamaño fluido | Uso |
|---|---|---|
| `.heading-1` | `clamp(2.25rem, 1.63rem + 2.65vw, 3.75rem)` | Títulos hero (36→60px) |
| `.heading-2` | `clamp(1.875rem, 1.62rem + 1.1vw, 2.5rem)` | Títulos de sección (30→40px) |
| `.heading-3` | `clamp(1.25rem, 1.1rem + 0.7vw, 1.5rem)` | Subtítulos (20→24px) |
| `.lead` | `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)` | Párrafo introductorio (16→18px) |
| `.eyebrow` | `text-xs` | Etiqueta superior en mayúsculas |

- **Piso de legibilidad 11px**: no hay tamaños menores a `text-[11px]` — los micro-tamaños (`9px`/`10px`) se eliminaron para mejorar legibilidad y accesibilidad, sobre todo en móvil.
- **Contraste en oscuro**: `--muted-foreground` se subió a `oklch(0.75)` para que el texto secundario respire mejor sobre el fondo `oklch(0.145)`.
- **`text-balance` / `text-pretty`**: los headings usan `text-balance` (reparte líneas parejas, evita huérfanas) y los `.lead` usan `text-pretty`.
- **Ritmo vertical fluido**: `.section-gap` usa `padding-block: clamp(2.5rem, 1.75rem + 3vw, 4.5rem)` — todas las secciones comparten el mismo espaciado proporcional, ajustado para que el padding superior+inferior de secciones contiguas no deje un hueco excesivo.
- **Consistencia**: cada sección usa `.section-shell` (ancho máximo + padding lateral) + `.section-gap`; los títulos usan `.heading-2`/`.lead` en vez de tamaños hardcodeados.

## Decisiones técnicas

- **Dark mode only**: `html.dark` fijo + `forcedTheme="dark"` + `enableSystem={false}` en `next-themes`.
- **Carga rápida del robot**: `preconnect` + `preload` de `scene.splinecode` (~1.35 MB) en `layout.tsx` — la descarga arranca con el HTML en paralelo con el JS.
- **Client-only con skeleton**: `OrbitingSkills` usa `dynamic(ssr:false)` con `loading` prop — sin huecos en blanco durante la hydration.
- **Resiliencia WebGL**: `ErrorBoundary` en `splite.tsx` — si el browser no crea contexto WebGL, muestra un fallback SVG sin romper la página.
- **Open Graph**: `metadataBase` + `openGraph` + `twitter` en `layout.tsx` — links compartidos generan preview en redes y mensajería.
- **Puerto fijo**: `npm run dev` mata el proceso en `:3000` antes de arrancar — siempre mismo puerto.
- **Búsqueda full-text** (`site-search.tsx`): usa la **CSS Custom Highlight API** (`CSS.highlights` + `Range`) — resalta coincidencias sin mutar el DOM, así no rompe el árbol de React. Atajo `Cmd/Ctrl+K`, navegación `↑↓`/`Enter`, contador `n/total`. Excluye la navbar via `TreeWalker`. Requiere Chromium/Arc o Safari 17.2+; en navegadores sin soporte muestra un aviso en vez de fallar.
- **Paleta centralizada** (`lib/accents.ts`): los colores de acento recurrentes viven en un único módulo; los colores de marca de herramientas externas (Scratch, XLogo) quedan inline a propósito.

## Troubleshooting

### Robot 3D no aparece / error WebGL

Mensaje típico: `GL_VENDOR = Disabled, Sandboxed = yes`.

**Causa**: aceleración por hardware desactivada en Chrome — no es un bug de la app.

**Solución (Chrome)**:
1. `chrome://settings/system` → activar "Use graphics acceleration when available"
2. Relanzar Chrome
3. Verificar en `chrome://gpu` que WebGL figure como **Hardware accelerated**

Si WebGL sigue deshabilitado (VM, escritorio remoto, GPU en blocklist), el `ErrorBoundary` muestra un gráfico estático.

### Hydration error en componentes animados

Los componentes con valores calculados por frame deben ser client-only. Patrón: wrapper `"use client"` con `dynamic(() => import('./x'), { ssr: false, loading: () => <Skeleton /> })`.
