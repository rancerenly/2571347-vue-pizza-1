<script setup>
import AppHeader from "./layouts/AppHeader.vue";
import HomeView from "./views/HomeView.vue";
</script>

<template>
  <div class="main__wrapper">
    <AppHeader></AppHeader>
    <HomeView></HomeView>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
