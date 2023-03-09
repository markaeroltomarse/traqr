import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - TraQR",
    title: "TraQR",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href:
          "https://lh3.googleusercontent.com/proxy/PL6_PGZuQ3dz6WgOSPn9qJ5P4uaAJlEmJ9MvEKCzMsX_3pHadf60koRcLvnB4sxiVveO3cgTK4LXpPZV452EMVgApNZuMKomawY9uH7dAcBv1fwgWNwjKpBRic9UWXrnGM5FC4wom3KiybYnUeDEbA"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "@/plugins/aos", ssr: false },
    { src: "@/plugins/vue-qrscanner", ssr: false, mode: "client" }
    //{ src: "@/plugins/instascan.min", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    [
      "@nuxtjs/vuetify",
      {
        icons: {
          iconfont: "mdi" // default - only for display purposes
        }
      }
    ],
    //'nuxt-socket-io',
    "@nuxtjs/auth"
  ],

  env: {
    AUTH_KEY: "adeef231asdqwd123"
  },

  axios: {
    credentials: true,
    baseURL:
      (process.env.NODE_ENV !== "production"
        ? `http://localhost:3000/`
        : process.env.PANGALAN) + "api"
  },

  auth: {
    plugins: ["@/plugins/auth-reload.js"],
    strategies: {
      local: {
        autoFetchUser: false,
        endpoints: {
          login: { url: "/auth/login", method: "post" },
          logout: { url: "/auth/logout", method: "get" }
          //getInfo: {url: '/auth/user', method: 'post'}
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  serverMiddleware: [{ path: "", handler: "~/api/server.js" }]
};
