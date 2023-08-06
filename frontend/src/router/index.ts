import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AdminView from '../views/AdminView.vue';
import UnsubscribeView from '../views/UnsubscribeView.vue';
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue';
import TermsOfServiceView from '../views/TermsOfServiceView.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/admin",
        name: "admin",
        component: AdminView,
    },
    {
        path: "/unsubscribe",
        name: "unsubscribe",
        component: UnsubscribeView,
    },
    {
        path: "/privacy-policy",
        name: "privacy-policy",
        component: PrivacyPolicyView,
    },
    {
        path: "/terms-of-service",
        name: "terms-of-service",
        component: TermsOfServiceView,
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/",
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
