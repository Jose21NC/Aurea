# Aurea — SPA de moda (React + Vite)

Aplicación web móvil-first para explorar prendas, probar looks con un “Probador con IA” (simulado), gestionar favoritos y perfil. Construida como Single Page Application con React, Vite y TailwindCSS.

## 🧰 Stack tecnológico

- React 19 (funcional, hooks)
- Vite 7 (dev server con HMR y build rápido)
- React Router DOM 7 (enrutado SPA)
- TailwindCSS 4 (estilos utilitarios, móvil-first)
- ESLint 9 (flat config) + plugins de React Hooks y React Refresh

## 🗺️ Arquitectura y flujo

- Entrypoint: `src/main.jsx` — monta `<App />` dentro de `BrowserRouter` y del contexto de favoritos.
- Rutas en `src/App.jsx`:
	- `/` Inicio (Home)
	- `/product/:id` Detalle de producto
	- `/favoritos`, `/notificaciones`, `/perfil`, `/cart`, `/orders`
	- `/probador` Galería de prendas con imagen de probador
- Layout: `src/components/Layout.jsx`
	- Contenedor tipo teléfono (`max-w-sm`, `h-screen`), animaciones de entrada (fade) y gesto de “swipe back”.
	- El scroll solo ocurre en `<main>` para preservar elementos fijos.
- Navegación inferior: `src/components/BottomNav.jsx` (fija, centrada)
- Estado global ligero: `src/context/FavoritesContext.jsx` (localStorage)
- Datos locales: `src/data/` (`products.js`, `sellers.js`, `user.jsx`)

## ✨ Funcionalidades principales

- Home: feed con ofertas, categorías y productos personalizados; filtros por chips.
- Detalle de producto:
	- Carrusel/galería con zoom, tallas, cantidad, subtotal fijo, y botón de favoritos.
	- Modal “Probador con IA” (simulado):
		- Usa `product.probadorUrl` cuando existe; de lo contrario, usa una imagen base configurable por el usuario.
		- Métricas de “Puntuación Aura”, ajuste recomendado, colorimetría y recomendaciones de look.
		- Imagen del probador ampliable en overlay.
- Perfil: visualización y cambio de la imagen base del probador (se guarda en `localStorage`).
- Probador: listado visual de prendas con `probadorUrl` (hero, badges, Aura score); tapping navega en la misma SPA.
- Favoritos: guardados en `localStorage` con ids normalizados a string.
- Transiciones y gestos: fade entre rutas, gesto de “swipe back” en el borde izquierdo.

## 🗂️ Estructura de carpetas

```
src/
	assets/
	components/
		Layout.jsx
		BottomNav.jsx
		ProductCard.jsx
		TryOnModal.jsx
	context/
		FavoritesContext.jsx
	data/
		products.js
		sellers.js
		user.jsx
	pages/
		Home.jsx
		ProductDetail.jsx
		TryOn.jsx
		Profile.jsx
		Favorites.jsx
		Cart.jsx
		Orders.jsx
		Notifications.jsx
	App.jsx
	main.jsx
public/
	_redirects  # SPA redirects para Netlify
```

## 💾 Persistencia (claves locales)

- Favoritos: `aurea:favorites` (Array de strings con ids de productos)
- Imagen base del probador: `aurea:tryOnBaseImageUrl` (string URL)

## 🚀 Desarrollo

Requisitos: Node 18+ y npm.

1) Instalar dependencias

```bash
npm install
```

2) Levantar el servidor de desarrollo (Vite + HMR)

```bash
npm run dev
```

3) Linter

```bash
npm run lint
```

4) Build de producción y preview

```bash
npm run build
npm run preview
```

## 🌐 Despliegue en Netlify

- Build command: `npm run build`
- Publish directory: `dist/`
- SPA routing: incluido `public/_redirects` con `/* /index.html 200` para soportar rutas como `/product/:id`.

## 🧩 Convenciones y notas

- IDs en favoritos son strings; normaliza con `String(id)` al comparar/guardar.
- El “Probador con IA” es una simulación de UI (no hay llamadas externas); si se integra un servicio real, crear un adaptador en `src/services/`.
- Diseño móvil-first; evita introducir dependencias pesadas sin justificación.
- Elementos “fijos” (navbar inferior, barra de subtotal, modales) se mantienen usando `position: fixed`; el contenedor principal no aplica `transform` de forma persistente para no romper el comportamiento en móviles.

## 🛡️ Calidad

- ESLint flat config (`eslint.config.js`).
- Recomendado: mantener funciones puras y hooks sin condiciones; evitar mutaciones directas.

## 🤝 Contribución

- Issues y PRs son bienvenidos. Mantén el estilo con Tailwind y componentes funcionales.
- Antes de enviar, ejecuta: `npm run lint` y asegura build `npm run build` sin errores.

---

Hecho con ❤️ para explorar ideas de ecommerce y probadores virtuales en una SPA ligera.
