import { VitePWAOptions } from "vite-plugin-pwa";

const pwaManifest: VitePWAOptions = {
  registerType: 'prompt',
  includeAssets: ["**/*",],
  manifest: {
    "theme_color": "#8936FF",
    "background_color": "#2EC6FE",
    "icons": [
      {
        "purpose": "maskable",
        "sizes": "512x512",
        "src": "icon512_maskable.png",
        "type": "image/png"
      },
      {
        "purpose": "any",
        "sizes": "512x512",
        "src": "icon512_rounded.png",
        "type": "image/png"
      }
    ],
    "orientation": "any",
    "display": "standalone",
    "dir": "ltr",
    "lang": "en-GB",
    "name": "Sorting Algorithms Visualizer",
    "short_name": "algo_visualizer",
  },
  injectRegister: null,
  minify: false,
  workbox: {
    globPatterns: ["**/*"],
  },
  injectManifest: {

  },
  includeManifestIcons: false,
  disable: false
};

export default pwaManifest;