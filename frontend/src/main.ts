import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createI18n } from "vue-i18n";
import en from "./i18n/en.json"
import fr from "./i18n/fr.json"

const i18n = createI18n({
    legacy: false,
    messages: {
        en,
        fr
    },
    locale: "en",
});

createApp(App)
.use(router)
.use(i18n)
.mount("#app");
