<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view />
</template>

<style>
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
  color: #2c3e50;
}

body {
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}

.footer {
  width: 100%;
  height: 100px;
  background-color: blue;
}
</style>
