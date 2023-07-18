<template>
    <div class="main" @mousemove="handleMouseMove">
        <div class="top-bar sc">
            <div>
                <img @click="scrollToTop" src="../assets/AbruptValleyLogo.png" height="40" width="40">
                <a href="#community">Community</a>
                <a href="#overview">Overview</a>
                <a href="#about-us">About Us</a>
            </div>
            <div class="social-links">
                <a href="http://discord.gg/zCHVCb5fGH" target="_blank"><img src="../assets/discord.png" height="30" width="30"></a>
                <a href="https://twitter.com/AbruptGames" target="_blank"><img src="../assets/twitter.png" height="30" width="30"></a>
                <a href="https://www.youtube.com/@abruptgames" target="_blank"><img src="../assets/youtube.png" height="30" width="30"></a>
            </div>
        </div>
        <div class="parallax-container">
            <div class="parallax" :style="{ transform: `translate3d(-50%, ${offsetY}px, 0)` }">
                <img src="../assets/background-1.png">
            </div>
            <div class="parallax blur" :style="{ transform: `translate3d(-50%, ${offsetY * 0.2}px, 0)` }">
                <img src="../assets/background-2.png">
            </div>
            <div class="parallax">
                <h1 class="main-title sc">
                    Abrupt Valley
                </h1>
            </div>
            <div class="parallax" :style="{ transform: `translate3d(-50%, ${offsetY * 0.1}px, 0)` }">
                <img src="../assets/background-3.png">
            </div>
        </div>
        <div class="background">
            <div class="section community-section" id="community">
                <div>
                    <form class="newsletter" @submit.prevent="subscribeNewsletter">
                        <h2 class="sc">
                            Become beta tester
                        </h2>
                        <p>
                            Become a beta tester to receive an email with a game key when the beta is released.
                            Subscribe to our newsletter to get the latest news about the game.
                        </p>
                        <div v-if="!alreadySubscribed" class="newsletter-form">
                            <label>
                                <span class="checkmark-text">I want to subscribe to newsletter</span>
                                <input type="checkbox" :disabled="isLoading">
                            </label>
                            <div class="newsletter-input-and-button">
                                <input class="input-field" type="email" v-model="email" placeholder="Enter your email" required :disabled="isLoading">
                                <button type="submit" :disabled="isLoading">
                                    <span v-if="isLoading">⌛</span>
                                    <span v-else>Join</span>
                                </button>
                            </div>
                            <p :class="messageColor">{{ message }}</p>
                        </div>
                    </form>
                </div>
                <div class="community">
                    <h2 class="sc">
                        Join the community
                    </h2>
                    <div class="social-links">
                        <a href="http://discord.gg/zCHVCb5fGH" target="_blank"><img src="../assets/discord.png" height="30" width="30">
                            <span>Join our Discord Server</span>
                        </a>
                        <a href="https://twitter.com/AbruptGames" target="_blank"><img src="../assets/twitter.png" height="30" width="30">
                            <span>Follow us on Twitter</span>
                        </a>
                        <a href="https://youtube.com/" target="_blank"><img src="../assets/youtube.png" height="30" width="30">
                            <span>Subscribe to our YouTube channel</span>
                        </a>
                    </div>
                </div>
            </div>

            <div class="section" id="overview">
                <div class="overview-box image-right">
                    <div class="overview-element">
                        <h2 class="section-title sc">Build your city</h2>
                        <p>
                            Build the best city to defeat your enemy. Gather gold and
                            resources to build and upgrade military buildings.
                            Adapt to your territory and optimize building placements.
                        </p>
                    </div>
                    <div class="overview-element">
                        <img src="../assets/CityImage.png"/>
                    </div>
                </div>
                <div class="overview-box image-left">
                    <div class="overview-element">
                        <img src="../assets/FightScene.png"/>
                    </div>
                    <div class="overview-element">
                        <h2 class="section-title sc">Create you army</h2>
                        <p>
                            Create your army from the military units of your city.
                            Choose the best units adapt your army to your enemy's troops.
                            Grow your army and upgrade your units to become stronger.
                        </p>
                    </div>
                </div>
                <div class="overview-box image-right">
                    <div class="overview-element">
                        <h2 class="section-title sc">Fight for the throne</h2>
                        <p>
                            Fight against opponents all around the world or train against
                            an AI to learn the game. Become the best player and climb the
                            ladder. Become the true king of the Abrupt Valley.
                        </p>
                    </div>
                    <div class="overview-element">
                        <img src="../assets/CityImage.png"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="section about-us" id="about-us">
            <h2 class="sc">
                About us
            </h2>
            <div class="about-us-body">
                <div class="about-us-element dev">
                    <img src="../assets/Krun.png" height="100"/>
                    <div class="about-us-name sc">
                        <p class="name"> Krun </p>
                        <p class="job-title"> CEO </p>
                    </div>
                </div>
                <div class="about-us-element dev">
                    <img src="../assets/Obsi.png" height="100"/>
                    <div class="about-us-name sc">
                        <p class="name"> Obsi </p>
                        <p class="job-title"> Lead Developer </p>
                    </div>
                </div>
                
                <div class="about-us-element">
                    <p>
                        We are a small team of passionate developers who want to create
                        the best strategy game. We are working hard to make this game
                        the best it can be. We are open to any feedback and suggestions
                        to improve the game.
                    </p>
                </div>
            </div>
        </div>
        <div class="bottom-bar">
            <div class="legal-stuff">
                <a href="" target="_blank"> Privacy Policy </a> |
                <a href="" target="_blank"> Cookies </a> |
                <a href="" target="_blank"> Terms of Service </a>
            </div>
            <div>
                Copyright @2023 Abrupt Games. All right reserved
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Ref, computed, ref } from 'vue';

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /** Paralax effect */

    const offsetY = ref(0);

    const handleMouseMove = (event: { clientY: number; }) => {
        offsetY.value = event.clientY / 10;
    };
    
    /** Email subscription */

    const email = ref('');
    const message = ref('');
    const messageType: Ref<"green" | "red"> = ref('green');
    const isLoading = ref(false);
    const alreadySubscribed = ref(false);

    const messageColor = computed(() => {
        return {
            active: true,
            "green": messageType.value === "green",
            "red": messageType.value === "red",
        }
    });

    const subscribeNewsletter = async () => {
        isLoading.value = true;
        try {
            const response = await fetch("http://localhost:4000/subscriptions/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email.value,
                    language: navigator.language.startsWith("fr") ? "french" : "english"
                }),
            });
        
            if (!response.ok) {
                const error = await response.json();
                if (response.status == 409) {
                    alreadySubscribed.value = true;
                }
                message.value = error.message;
                messageType.value = "red";
            } else {
                const data = await response.json();
                messageType.value = "green";
                message.value = `Welcome, ${data.email}! You have successfully subscribed.`;
                alreadySubscribed.value = true;
            }
        } catch (e) {
            message.value = "An error occured. Please try again later.";
            messageType.value = "red";
        } finally {
            isLoading.value = false;
        }
    };
</script>

<style scoped>
    .main {
        font-family: "SugoPro", sans-serif;
        --background-color: #f0d98f;
        --text-color: #333;
    }

    .sc {
        font-variant: small-caps;
    }

    /*************************/
    /******** TOP BAR ********/
    /*************************/

    .top-bar {
        position: fixed;
        top: 0;
        width: 100%;
        height: 60px;
        background-color: #333;
        padding: 0 10px;

        display: flex;
        align-items: center;
        justify-content: space-between
    }

    .top-bar div {
        display: flex;
        align-items: center;
        gap: 25px;
    }

    .top-bar .social-links {
        margin-right: 30px;
        gap: 10px;
    }

    .top-bar .social-links img {
        border-radius: 0;
        filter: brightness(0) invert(1);
    }

    .top-bar img {
        border-radius: 50%;
        transition: transform 0.1s ease;
    }

    .top-bar img:hover {
        transform: scale(1.1);
        cursor: pointer;
    }

    .top-bar a {
        color: #fff;
        text-decoration: none;
        font-size: 24px;
        transition: transform 0.1s ease;
        height: 30px;
    }

    .top-bar a:hover {
        transform: scale(1.1);
        color: var(--background-color);
        cursor: pointer;
    }


    .top-background {
        box-shadow: 0px 3px 5px;
        background: var(--background-color);
        height: 200px;
    }

    /**************************/
    /******** PARALLAX ********/
    /**************************/

    .parallax-container {
        height: 700px;
    }

    .parallax {
        position: absolute;
        top: -100px;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: -1;
    }

    .parallax h1 {
        margin-top: 100px;
    }

    .main-title {
        font-size: 120px;
        color: var(--text-color);
        text-align: center;
        margin: 0;
        padding-top: 60px;
        text-shadow: 2px 2px 2px #00000088;
    }

    .parallax img {
        width: auto;
        height: 850px;
    }

    .blur {
        filter: blur(2px);
    }

    
    /****************************/
    /******** BACKGROUND ********/
    /****************************/

    .background {
        box-shadow: 0px -3px 5px;
        background: var(--background-color);
        padding: 50px;
    }

    .section {
        width: 100%;
        scroll-margin-top: 60px;
    }

    /**************************/
    /******** SOCIALS *********/
    /**************************/

    .community-section {
        display: flex;
        justify-content: center;
        gap: 50px;
    }

    .community-section h2 {
        margin-top: 0;
    }

    .community-section div {
        flex: 1;
        max-width: 500px;
    }

    .community-section .social-links a {
        padding-left: 20px;
        text-decoration: none;
        color: #333;
        font-size: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    /**************************/
    /******* NEWSLETTER *******/
    /**************************/

    
    .newsletter {
        width: 100%;
        margin: auto;
        gap: 20px;
    }

    .newsletter-form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .newsletter-form p {
        margin: 0;
        height: 20px;
    }

    .newsletter-input-and-button {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .newsletter-input-and-button input {
        font-family: "SugoPro";
        flex: 1 0 auto;
        padding: 10px;
        width: 300px;
        font-size: 16px;
        outline: none;
    }

    .newsletter button {
        font-family: "SugoPro";
        color: #fff;
        background-color: #007bff;
        border: none;
        cursor: pointer;
        outline: none;
        padding: 10px 20px;
        font-size: 20px;
        transition: background-color 0.2s ease;
    }

    .newsletter button:hover {
        background-color: #0056b3;
    }


    /****************************/
    /********* OVERVIEW *********/
    /****************************/

    .overview-box {
        display: flex;
        justify-content: space-around;
        padding: 40px 0;
        margin: auto;
        justify-content: center;
        gap: 50px;
    }

    @media (max-width: 800px) {
        .overview-box {
            flex-direction: column;
            gap: 10px;
            float: initial;
        }
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

    .overview-element {
        flex: 1;
        margin: auto 0;
        max-width: 500px;
    }

    .overview-element h2 {
        font-size: 60px;
        margin: 0;
    }

    .overview-element p {
        font-size: 24px;
        color: black;
    }

    .overview-element img {
        width: 100%;
        box-shadow: 5px 5px 5px;
    }

    /**************************/
    /******** ABOUT US ********/
    /**************************/

    .about-us {
        background-color: #666;
        color: #fff;
        font-size: 20px;
    }

    .about-us h2 {
        text-align: left;
        font-weight: lighter;
        font-size: 40px;
        margin: 0;
        padding: 30px 0 0 60px;
        text-shadow: 2px 2px 2px #00000088;
    }

    .about-us-body {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 50px;
        padding-bottom: 50px;
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
        border: solid 1px white;
    }

    .about-us .name {
        font-size: 24px;
        font-weight: bold;
        margin: 0;
    }

    .about-us .job-title {
        margin: 0;
        margin-bottom: 50px;
    }

    
    /***************************/
    /****** BOTTOM BAR *********/
    /***************************/

    .bottom-bar {
        background-color: #333;
        color: #fff;
        height: 60px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .bottom-bar .legal-stuff {
        display: flex;
        gap: 10px;
    }

    .bottom-bar a {
        color: #fff;
        text-decoration: none;
    }

    .green {
        color: green;
    }

    .red {
        color: red;
    }
</style>