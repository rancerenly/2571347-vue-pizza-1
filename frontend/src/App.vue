<script setup>
import { AppLayout } from "@/layouts";
</script>

<template>
  <div class="main__wrapper">
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
