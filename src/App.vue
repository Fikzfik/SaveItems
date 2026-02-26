<script setup>
</script>

<template>
  <router-view />
</template>

<style>
/* Global resets */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  overflow-x: hidden;
  width: 100%;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  width: 100%;
  min-height: 100vh;
}

#app {
  max-width: none;
  margin: 0;
  padding: 0;
  font-weight: normal;
  width: 100%;
  overflow-x: hidden;
}
</style>
