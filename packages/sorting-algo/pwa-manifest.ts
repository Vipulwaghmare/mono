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
  }
  // manifest:{
  //   name:"React-vite-app",
  //   short_name:"react-vite-app",
  //   description:"I am a simple vite app",
  //   icons:[{
  //     src: '/android-chrome-192x192.png',
  //     sizes:'192x192',
  //     type:'image/png',
  //     purpose:'favicon'
  //   },
  //   {
  //     src:'/android-chrome-512x512.png',
  //     sizes:'512x512',
  //     type:'image/png',
  //     purpose:'favicon'
  //   },
  //   {
  //     src: '/apple-touch-icon.png',
  //     sizes:'180x180',
  //     type:'image/png',
  //     purpose:'apple touch icon',
  //   },
  //   {
  //     src: '/maskable_icon.png',
  //     sizes:'512x512',
  //     type:'image/png',
  //     purpose:'any maskable',
  //   }
  // ],
  // theme_color:'#171717',
  // background_color:'#f0e7db',
  // display:"standalone",
  // scope:'/',
  // start_url:"/",
  // orientation:'portrait'
  // }
  ,
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