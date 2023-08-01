<template>
    <router-view />
</template>

<style>
.main {
    font-family: "SugoPro", sans-serif;
    --background-color-topbar: #4d4d4d;
    --background-color-white: #eaeaea;
    --text-color-title-white: #ffffff;
    --text-color-white: #f2f2f2;
    --text-color-title-black: #191919;
    --text-color-black: #333333;
}

@font-face {
    font-family: "SugoPro";
    src: url("assets/fonts/SugoPro.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body, html {
    padding: 0;
    margin: 0;
    overflow-x: hidden;
}

.sc {
    font-variant: small-caps;
}

h2 {
    font-weight: normal;
    color: var(--text-color-title-black);
}

p {
    color: var(--text-color-black);
}

a {
    text-decoration: none;
    color: var(--text-color-black);
}
</style>
