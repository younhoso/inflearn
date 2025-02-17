<template>
  <div>
    <h2>Home View</h2>
    <p>{{ $route.path }}</p>
    <p>{{ $route.name }}</p>
    <button class="btn btn-primary" @click="goAobutPage">About으로 이동</button>
  </div>
  <AppGrid :items="items" v-slot="{ item }" col-class="col-4">
    <AppCard>{{ item }}</AppCard>
  </AppGrid>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import AppCard from '@/components/AppCard.vue';
import AppGrid from '@/components/AppGrid.vue';

const router = useRouter();
const goAobutPage = () => {
  router.push({
    name: 'About',
  });
};

const items = ref(['사과', '딸기', '포도', '바나나']);
</script>

<style lang="scss" scoped></style>
