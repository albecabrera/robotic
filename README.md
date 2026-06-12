# Informatik an der ESG

Portal de Informatik para la **Elisabeth-Selbert-Gesamtschule Bonn**. Página única (one-page) con materiales de clase, planes de estudio internos (Lehrpläne), proyectos y videos de aprendizaje para el curso de Informatik del Sr. Cabrera.

**Local dev**: [http://localhost:3000](http://localhost:3000)

## Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.x | Framework (App Router + Turbopack) |
| [React](https://react.dev) | 19.x | UI |
| [TypeScript](https://www.typescriptlang.org) | 6.x | Tipado estático |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Estilos (vía `@tailwindcss/postcss`) |
| [motion / framer-motion](https://motion.dev) | 12.x | Animaciones (marquees, reveals, spotlight) |
| [Spline](https://spline.design) (`@splinetool/react-spline` + `runtime`) | 4.x / 1.x | Escena 3D del robot en el hero (WebGL) |
| [Radix UI](https://www.radix-ui.com) | — | Primitivas accesibles (`accordion`, `tabs`, `slot`) |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.4 | Tema — forzado a **dark only** |
| [lucide-react](https://lucide.dev) | 1.x | Íconos |
| `class-variance-authority`, `clsx`, `tailwind-merge` | — | Composición de clases (helper `cn()` en `lib/utils.ts`) |
| `dotted-map` | 3.x | Mapa de puntos (`world-map.tsx`) |
| `tw-animate-css` | 1.x | Utilidades de animación CSS |

## Comandos

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo → http://localhost:3000
npm run build    # build de producción
npm run start    # servir build de producción
npm run lint     # ESLint (eslint-config-next)
```

Requisitos: **Node.js 20+** y un browser con **WebGL habilitado** (ver Troubleshooting).

## Estructura del proyecto

```
app/
  layout.tsx        # Root layout: fuentes (Inter + Space Grotesk), dark mode forzado,
                    # preconnect/preload de la escena Spline
  page.tsx          # Página única con todas las secciones
  globals.css       # Tailwind 4, design tokens, clases utilitarias (section-shell, heading-2…)
  img/              # Logos de Scratch, XLogo, TigerJython
components/
  blocks/
    spline-hero.tsx                 # Hero: card con Spotlight + texto + robot 3D
  ui/                               # Componentes de UI (one component per file)
    splite.tsx                      # Wrapper de Spline: Suspense + ErrorBoundary con fallback
    orbiting-skills.tsx             # Órbitas animadas de lenguajes (rAF, client-only)
    orbiting-skills-no-ssr.tsx      # Wrapper client con dynamic(ssr:false) — evita hydration error
    orbiting-carousel-*.tsx         # Carrusel de pioneros de la informática
    modern-animated-hero-section.tsx # Sección "RainingLetters" (lluvia de caracteres)
    vertical-tabs.tsx               # Tabs de cursos
    testimonials-columns-1.tsx      # Carrusel horizontal de Lernvideos
    navbar-1.tsx / footer-column.tsx # Navegación y footer
    …                               # Cards, botones glow, marquee, timeline, etc.
lib/
  utils.ts          # cn() — clsx + tailwind-merge
```

## Secciones de la página (`app/page.tsx`)

| Anchor | Sección |
|---|---|
| `#inicio` | Hero con robot 3D (Spline) y CTAs |
| `#welcome` | Animación RainingLetters |
| `#programmieren` | Lenguajes: Scratch, XLogo, TigerJython, HTML/CSS, Python, Java (órbitas) |
| `#kurse` | Tabs de cursos |
| `#materialien` | Materiales por tema y nivel (Jg. 8–10, Oberstufe) |
| `#lehrplaene` | Lehrpläne internos: Jahrgänge 5/6, 7/8, 9/10 |
| `#informatiker` | Carrusel de pioneros de la informática |
| `#kontakt` | Footer con contacto |

## Decisiones técnicas y performance

- **Dark mode only**: `html.dark` fijo + `next-themes` con `forcedTheme="dark"` y `enableSystem={false}` (`app/layout.tsx`). El `colorScheme`/`themeColor` del viewport también están en dark.
- **Carga rápida de la escena 3D**: en `layout.tsx` hay `preconnect` a `prod.spline.design` y `preload` del archivo `scene.splinecode` (~1.35 MB) — la descarga arranca con el HTML, en paralelo con el JS. En `splite.tsx` el runtime de Spline se importa a nivel de módulo (no lazy-on-render).
- **Componentes client-only**: `OrbitingSkills` calcula posiciones con `Math.sin/cos` por frame — se renderiza solo en cliente vía `orbiting-skills-no-ssr.tsx` (`dynamic` + `ssr: false` dentro de un Client Component, porque `ssr: false` no está permitido en Server Components).
- **Resiliencia WebGL**: `splite.tsx` envuelve Spline en un `ErrorBoundary`; si el browser no puede crear contexto WebGL, se muestra un fallback SVG en vez de romper la página.
- **Guard de división por cero**: `hover-footer.tsx` ignora eventos de mouse cuando el SVG todavía mide 0×0 (evitaba `NaN%` en `radialGradient`).

## Troubleshooting

### El robot 3D no aparece / error `THREE.WebGLRenderer: A WebGL context could not be created`

Mensaje típico en consola: `GL_VENDOR = Disabled, GL_RENDERER = Disabled, Sandboxed = yes`.

**Causa**: WebGL está deshabilitado en el browser — casi siempre por la aceleración por hardware desactivada en Chrome. No es un bug de la app.

**Solución (Chrome)**:
1. Abrir `chrome://settings/system`
2. Activar **"Use graphics acceleration when available"** (Grafikbeschleunigung verwenden)
3. Relanzar Chrome
4. Verificar en `chrome://gpu` que *WebGL* figure como **Hardware accelerated**

Si WebGL sigue deshabilitado (GPU en blocklist, VM, escritorio remoto), la página sigue funcionando: el `ErrorBoundary` muestra un gráfico estático en lugar del robot.

### El robot tarda en aparecer

Normal en `npm run dev`: el runtime de Spline se sirve sin minificar (~7 s). En producción (`npm run build && npm run start`) es notablemente más rápido y queda cacheado en visitas siguientes.

### Hydration error en componentes animados

Los componentes con valores calculados por frame deben ser client-only. Patrón usado: wrapper `"use client"` con `dynamic(() => import('./x'), { ssr: false })` — ver `orbiting-skills-no-ssr.tsx`.
