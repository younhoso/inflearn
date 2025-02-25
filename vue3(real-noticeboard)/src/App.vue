<template>
  <TheHeader />
  <TheView />
  <AppAlert :items="alerts" />
</template>

<script setup>
import AppAlert from './components/app/AppAlert.vue';
import { useAlert } from './hooks/useAlert';
import TheHeader from './layouts/TheHeader.vue';
import TheView from './layouts/TheView.vue';

const { alerts } = useAlert();
</script>

<style lang="scss" scoped></style>
