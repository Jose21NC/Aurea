## Contexto rápido del proyecto

- Proyecto: SPA React + Vite (plantilla Vite + React). Usa TailwindCSS para estilos.
- Entrypoint: `src/main.jsx` — monta `<App />` dentro de `<FavoritesProvider>` y `BrowserRouter`.
- Rutas principales: definidas en `src/App.jsx` (por ejemplo `/`, `/product/:id`, `/favoritos`, `/perfil`, `/cart`).

## Arquitectura & flujo de datos (lo esencial)

- UI: carpeta `src/components/` contiene piezas reutilizables (ej. `Layout.jsx`, `BottomNav.jsx`, `ProductCard.jsx`).
- Páginas: `src/pages/` contiene vistas por ruta. `ProductDetail.jsx` es una página con bastante lógica UI-local (zoom, probador IA simulado, modales).
- Estado global ligero: `src/context/FavoritesContext.jsx` expone `useFavorites()` y persiste IDs en `localStorage` bajo la clave `aurea:favorites` (IDs guardados como strings). Nota importante: `useFavorites()` lanza error si no está dentro del `FavoritesProvider`.
- Datos de referencia: `src/data/` contiene `products.js`, `sellers.js`, `user.jsx` — actualmente datos locales, no servicios remotos.

## Convenciones específicas del repositorio

- IDs en favoritos se guardan como strings. Cuando compares o manipules ids, conviértelos con `String(id)` — ver `FavoritesContext.jsx` y `ProductDetail.jsx`.
- No hay llamadas externas de IA: la UI del "Probador con IA" en `ProductDetail.jsx` usa `setTimeout` y datos locales; no agregar dependencias externas sin un punto claro de integración.
- Diseño móvil-first y container con `max-w-sm` (simula un teléfono). Ten en cuenta animaciones de swipe/back implementadas en `Layout.jsx` (constantes `EDGE_THRESHOLD`, `SWIPE_MIN_DISTANCE`).
- Componentes usan default exports y estilos con Tailwind utility classes. Sigue la estructura existente (funcionales, hooks localizados, props explícitas).

## Flujo de desarrollo y comandos útiles

- Levantar dev server: `npm run dev` (usa Vite + HMR).
- Build de producción: `npm run build`.
- Previsualizar build: `npm run preview`.
- Linter: `npm run lint` (ESLint configuración incluida). Si introduces nuevos archivos, respeta las reglas existentes.

## Integraciones y puntos de atención

- Router: `react-router-dom` v7 — las rutas se definen en `src/App.jsx`. Si agregas rutas, actualiza `BottomNav.jsx`/`NavBar.jsx` si es necesario.
- Persistencia: `localStorage` para favoritos (`aurea:favorites`) — migraciones deben mantener la forma (array de strings).
- Assets: imágenes se referencian desde `src/assets/` o CDN en `products.js`.

## Ejemplos concretos para asistentes de codificación

- Añadir favorito: llamar `toggleFavorite(id)` desde `useFavorites()` (ver `ProductDetail.jsx` botón corazón). Evitar manipular `localStorage` directamente — usar el contexto.
- Buscar producto por id: `getAllProducts().find(p => String(p.id) === idString)` (ver `ProductDetail.jsx`). Mantener la normalización a string.
- Evitar suponer APIs remotas para el probador IA: actualmente es UI simulada con `setTimeout`; si se integra un servicio, crea un adaptador en `src/services/` y documenta la API.

## Qué evitar o revisar antes de proponer cambios

- No tocar la persistencia de `FavoritesContext` sin justificar la compatibilidad con datos previos (IDs string).
- Revisar `Layout.jsx` antes de cambiar navegación táctil. Los thresholds están ajustados para UX móvil.
- Evitar agregar dependencias innecesarias: el proyecto es ligero (solo React, react-router-dom, Vite, Tailwind).

## Preguntas al autor si algo no está claro

- ¿Planean integrar un backend o servicios remotos (p. ej. para IA) a corto plazo? Si es así, dónde preferirían un adaptador (p. ej. `src/services/ai.js`).
- ¿Desean una convención para nuevos contextos/global state (Redux, Zustand) o seguir con providers locales?

---
Si quieres, puedo ajustar la extensión de este documento (snippets cortos, checklist de PR, reglas de commit) o añadir ejemplos de refactor seguro.
