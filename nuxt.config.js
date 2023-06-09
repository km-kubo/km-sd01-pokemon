import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  css: ["animate.css"],
  runtimeConfig: {
    region: "us-east-2",
    bucketName: "km-sd01-pokemon",
    public: {
      backendOrigin: "http://localhost:3000",
    },
  },
});
