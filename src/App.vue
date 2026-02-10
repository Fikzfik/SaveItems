<script setup>
import Login from "./components/Login.vue";
</script>

<template>
  <main>
    <Login />
  </main>
</template>

<style>
/* Global resets to ensure full screen layout */
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  max-width: none;
  margin: 0;
  padding: 0;
  font-weight: normal;
}
</style>
