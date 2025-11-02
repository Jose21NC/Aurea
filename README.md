# Aurea (Expo + React Native)

Proyecto inicial scaffold para una app de marketplace con estética tipo Shein / Uber Eats.

Qué incluye:
- Estructura básica con `App.js`, `screens/HomeScreen.js`, `components/ProductCard.js`, y `styles/theme.js`.

Instalación y ejecución:

```bash
# en la raíz del proyecto
npm install
# o con yarn
# yarn

# iniciar el servidor de Expo
npm run start
# abrir en Android
npm run android
# abrir en iOS
npm run ios
# abrir en web
npm run web
```

Notas:
- Después de `npm install` asegúrate de instalar los paquetes nativos de React Navigation si es necesario:
  - `npx expo install react-native-gesture-handler react-native-screens react-native-safe-area-context`
- Para adaptar a web más adelante podemos usar Expo Web o migrar la UI a Next.js + Expo for Web.

Siguientes pasos recomendados:
- Añadir navegación (tabs/categories), filtros y pantalla de producto.
- Integrar backend (GraphQL/REST) y pasarela de pagos.
