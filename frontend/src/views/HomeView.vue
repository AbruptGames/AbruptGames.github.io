<template>
    <div class="main" @mousemove="handleMouseMove">
        <div class="top-bar sc">
            <div class="shortcuts">
                <img @click="scrollToTop" src="../assets/AbruptValleyLogo.png">
                <a href="#community">{{ t("community-button") }} </a>
                <a href="#trailer">{{ t("trailer-button") }}</a>
                <a href="#overview">{{ t("overview-button") }}</a>
                <a href="#about-us">{{ t("about-us-button") }}</a>
                <router-link v-if="admin" to="/admin">Admin</router-link>
            </div>
            <div class="social-links">
                <a href="http://discord.gg/zCHVCb5fGH" target="_blank"><img src="../assets/icons/community/discord.png"></a>
                <a href="https://twitter.com/AbruptGames" target="_blank"><img src="../assets/icons/community/twitter.png"></a>
                <a href="https://www.youtube.com/@abruptgames" target="_blank"><img src="../assets/icons/community/youtube.png"></a>
            </div>
        </div>
        <div class="parallax-container">
            <div class="parallax" :style="{ transform: `translate3d(-50%, ${offsetY}px, 0)` }">
                <img src="../assets/background-1.png">
            </div>
            <div class="parallax blur" :style="{ transform: `translate3d(-50%, ${offsetY * 0.5}px, 0)` }">
                <img src="../assets/background-2.png">
            </div>
            <div class="parallax main-title">
                <img src="../assets/AbruptValleyTitle.png">
            </div>
            <div class="parallax" :style="{ transform: `translate3d(-50%, ${offsetY * 0.25}px, 0)` }">
                <img src="../assets/background-3.png">
            </div>
        </div>
        <div class="section community-section" id="community">
            <subscribeForm></subscribeForm>
            <div class="community">
                <h2 class="sc">
                    {{ t("community-title") }}
                </h2>
                <div class="social-links">
                    <a href="http://discord.gg/zCHVCb5fGH" target="_blank"><img src="../assets/icons/community/discord.png">
                        <span>{{ t("join-discord") }}</span>
                    </a>
                    <a href="https://twitter.com/AbruptGames" target="_blank"><img src="../assets/icons/community/twitter.png">
                        <span>{{ t("join-twitter") }}</span>
                    </a>
                    <a href="https://youtube.com/" target="_blank"><img src="../assets/icons/community/youtube.png">
                        <span>{{ t("join-youtube") }}</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="section steam-section" id="steam">
            <div class="steam">
                <div class="steam-left">
                    <h2 class="sc">
                        {{ t("steam-title") }}
                    </h2>
                    <p>
                        {{ t("steam-text") }}
                    </p>
                </div>
                <div class="steam-right">
                    <a class="steam-button" href="https://steam.com/" target="_blank"><img src="../assets/icons/community/youtube.png">
                        <span>{{ t("steam-button") }}</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="section trailer-section" id="trailer">
            <div class="trailer">
                <iframe class="trailer-video" src="https://youtube.com/embed/f1uKQFi5_uI?rel=0" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
        <div class="section overview-section" id="overview">
            <div class="overview-box image-right">
                <div class="overview-element">
                    <h2 class="section-title sc">{{ t("overview-city-title") }}</h2>
                    <p>
                        {{ t("overview-city-text") }}
                    </p>
                </div>
                <div class="overview-element image-container">
                    <img src="../assets/screenshots/ScreenCity.png"/>
                </div>
            </div>
            <div class="overview-box image-left">
                <div class="overview-element image-container">
                    <img src="../assets/screenshots/ScreenBattle.png"/>
                </div>
                <div class="overview-element">
                    <h2 class="section-title sc">{{ t("overview-army-title") }}</h2>
                    <p>
                        {{ t("overview-army-text") }}
                    </p>
                </div>
            </div>
            <div class="overview-box image-right">
                <div class="overview-element">
                    <h2 class="section-title sc">{{ t("overview-ladder-title") }}</h2>
                    <p>
                        {{ t("overview-ladder-text") }}
                    </p>
                </div>
                <div class="overview-element image-container">
                    <img src="../assets/screenshots/ScreenThrone.png"/>
                </div>
            </div>
        </div>
        <div class="section about-us" id="about-us">
            <h2 class="sc">
                {{ t("about-us-title") }}
            </h2>
            <div class="about-us-body">
                <div class="about-us-element dev">
                    <img src="../assets/Krun.png" height="100"/>
                    <div class="about-us-name sc">
                        <p class="name"> Krun </p>
                        <p class="job-title">{{ t("krun-title") }}</p>
                    </div>
                </div>
                <div class="about-us-element dev">
                    <img src="../assets/Obsi.png" height="100"/>
                    <div class="about-us-name sc">
                        <p class="name"> Obsi </p>
                        <p class="job-title">{{ t("obsi-title") }}</p>
                    </div>
                </div>
                
                <div class="about-us-element">
                    <p>
                        {{ t("about-us-text") }}
                    </p>
                </div>
            </div>
        </div>
        <div class="bottom-bar">
            <div>
                Copyright @2023 Abrupt Games. All right reserved
            </div>

            <div class="legal-stuff">
                <a href="" target="_blank"> Privacy Policy </a> |
                <a href="" target="_blank"> Cookies </a> |
                <a href="" target="_blank"> Terms of Service </a>
            </div>
            
            <div class="languages">
                <img src="./../assets/icons/languages/france.png" @click="changeLanguage('fr')" height="20">
                <img src="./../assets/icons/languages/united-kingdom.png" @click="changeLanguage('en')" height="20">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import httpService from '@/services/http.service';
    import { onMounted, ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import subscribeForm from '@/components/subscribe-form.vue';

    const admin = ref(false);

    onMounted(async () => {
        changeLanguage(navigator.language.startsWith("fr") ? "fr" : "en");
        admin.value = await httpService.checkAdmin();
    });

    /** Scroll to top */

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /** Language */
    
    const { t, locale } = useI18n();

    const changeLanguage = (language: string) => {
        locale.value = language;
    }

    /** Paralax effect */

    const offsetY = ref(0);

    const handleMouseMove = (event: { clientY: number; }) => {
        offsetY.value = event.clientY / 10;
    };
</script>

<style scoped>
    /*************************/
    /******** TOP BAR ********/
    /*************************/

    .top-bar {
        position: fixed;
        top: 0;
        width: 100%;
        height: 60px;
        background-color: var(--background-color-topbar);
        padding: 0 20px;

        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 100;
    }

    .top-bar div {
        display: flex;
        align-items: center;
        gap: 25px;
    }

    .top-bar .social-links {
        margin-right: 40px;
        gap: 20px;
    }

    .top-bar .social-links img {
        height: 30px;
        border-radius: 0;
        filter: brightness(0) invert(1);
    }

    .top-bar img {
        height: 40px;
        border-radius: 50%;
        transition: all 0.2s ease;
    }

    .top-bar img:hover {
        transform: scale(1.1);
        border-radius: 30%;
        cursor: pointer;
    }

    .top-bar a {
        color: var(--text-color-white);
        text-decoration: none;
        font-size: 1.875rem;
        transition: transform 0.1s ease;
    }

    .top-bar a:hover {
        transform: scale(1.1);
        cursor: pointer;
    }

    .top-background {
        box-shadow: 0px 3px 5px;
        background: var(--background-color-white);
        height: 200px;
    }

    @media (max-width: 800px) {
        .top-bar .shortcuts a {
            display: none;
        }

        .top-bar .social-links {
            gap: 10px;
        }

        .top-bar .social-links img {
            width: 25px;
            height: 25px;
        }
    }

    /**************************/
    /******** PARALLAX ********/
    /**************************/

    .parallax-container {
        position: relative;
        overflow: hidden;
        height: 700px;
    }

    .parallax {
        position: absolute;
        top: -100px;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: -1;
    }

    .parallax img {
        width: auto;
        height: 850px;
    }

    .main-title img {
        margin-top: 160px;
        width: 70vw;
        height: auto;
    }

    @media (max-width: 800px) {
        .main-title img {
            width: 85vw;
            margin-top: 220px;
        }
    }

    .blur {
        filter: blur(2px);
    }

    
    /****************************/
    /******** BACKGROUND ********/
    /****************************/

    .section {
        padding: 5vh 5vw;
        scroll-margin-top: 60px;
    }

    /**************************/
    /******** SOCIALS *********/
    /**************************/

    .community-section {
        margin-top: -40px;
        padding-bottom: 50px;
        background-image: url('../assets/communityBackground.png');

        padding-top: 80px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 50px;
    }

    @media (max-width: 800px) {
        .community-section {
            flex-direction: column;
            text-align: center;
        }
    }

    .community-section h2 {
        margin-top: 0;
    }

    .community-section div,
    .community-section form {
        flex: 1;
        max-width: 500px;
    }

    .community-section .social-links img {
        width: 30px;
        height: 30px;
    }

    .community-section .social-links a {
        padding-left: 20px;
        font-size: 1.25rem;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    /**************************/
    /******** STEAM *********/
    /**************************/

    .steam-section {
        margin-top: -50px;
        background-image: url('../assets/steamBackground.png');

        display: flex;
        justify-content: space-around;
    }

    .steam {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 0px 50px 75px 50px;
        gap: 30px;
        text-align: left;
    }

    .steam-left {
        display: flex;
        flex: 2;
        flex-direction: column;
    }

    @media (max-width: 800px) {

        .steam {
            gap: 20px;
            flex-direction: column;
        }

        .steam-left {
            text-align: center;
        }
    }

    .steam-section img {
        width: 30px;
        height: 30px;
    }

    .steam-right {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
    }

    .steam-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 8px 20px;
        font-size: 1.25rem;
        border: solid var(--text-color-title-black) 2px;
    }


    /**************************/
    /******** TRAILER *********/
    /**************************/

    .trailer-section {
        margin-top: -100px;
        background-image: url('../assets/trailerBackground.png');

        display: flex;
        justify-content: space-around;
    }

    .trailer {
        display: flex;
        padding: 125px 50px 75px 50px;
        width: 50%;
        aspect-ratio: 16/9;
    }

    @media (max-width: 800px) {
        .trailer {
            display: flex;
            padding: 125px 50px 100px 50px;
            width: 75%;
            aspect-ratio: 16/9;
        }
    }

    .trailer-video {
        width: 100%;
        height: auto;
    }

    /****************************/
    /********* OVERVIEW *********/
    /****************************/

    .overview-section {
        margin-top: -75px;
        padding-top: 150px;
        background-image: url('../assets/overviewBackground.png');
    }

    .overview-box {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px 0;
        margin: auto;
        gap: 50px;
    }

    .overview-box.image-right {
        text-align: right;
    }
    .overview-box.image-right img {
        float: left;
    }

    .overview-box.image-left  {
        text-align: left;
    }
    .overview-box.image-left img {
        float: right;
    }

    @media (max-width: 800px) {
        .overview-box {
            flex-direction: column;
            gap: 10px;
            float: initial;
        }

        .overview-box.image-left {
            text-align: justify;
            flex-direction: column-reverse;
        }

        .overview-box.image-right {
            text-align: justify;
        }
    }

    .overview-element {
        flex: 1;
        margin: auto 0;
        max-width: 500px;
    }

    .overview-element h2 {
        font-size: 3.75rem;
        margin: 0;
    }

    .overview-element p {
        font-size: 1.5rem;
    }

    .overview-element img {
        width: 100%;
    }

    /**************************/
    /******** ABOUT US ********/
    /**************************/

    .about-us {
        margin-top: -55px;
        padding-top: 55px;
        background-image: url('../assets/aboutUsBackground.png');

        font-size: 1.25rem;
    }

    .about-us h2 {
        text-align: left;
        font-weight: lighter;
        font-size: 2.5rem;
        margin: 0;
        padding: 30px 0 0 60px;
        color: var(--text-color-title-white);
    }

    .about-us-body {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        gap: 50px;
        padding-bottom: 50px;
    }

    @media (max-width: 800px) {
        .about-us-body {
            flex-direction: column;
        }

        .about-us .dev img {
            width: 100px;
            height: 100px;
        }
    }

    .about-us-element {
        width: 300px;
        display: flex;
    }

    .about-us .dev {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .about-us .dev img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-right: 20px;
        padding: 10px;
        object-fit: cover;
        border: solid 2px white;
    }

    .about-us .name {
        font-size: 1.875rem;
        margin: 0;
        color: var(--text-color-white);
    }

    .about-us .job-title {
        margin: 0;
        margin-bottom: 50px;
        color: var(--text-color-white);
    }

    .about-us p {
        color: var(--text-color-white);
    }

    
    /***************************/
    /****** BOTTOM BAR *********/
    /***************************/

    .bottom-bar {
        margin-top: -20px;;
        background-color: #262626;

        color: var(--text-color-white);
        height: 60px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
    }

    .bottom-bar .legal-stuff {
        display: flex;
        gap: 10px;
    }

    .bottom-bar a {
        color: var(--text-color-white);
        text-decoration: none;
    }

    .bottom-bar div:first-child {
        margin-left: 50px;
    }

    .bottom-bar div:last-child {
        margin-right: 50px;
    }

    .languages img:first-child {
        margin-right: 5px;
    }

    .languages img {
        cursor: pointer;
    }

    @media (max-width: 800px) {
        .bottom-bar {
            flex-direction: column;
            font-size: 0.75rem;
            height: 80px;
        }

        .bottom-bar div:first-child {
            margin-top: 10px;
            margin-left: 0;
        }

        .bottom-bar div:last-child {
            margin-right: 0;
        }
    }
</style>