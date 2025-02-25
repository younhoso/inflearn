<template>
  <div>게시글 목록</div>
  <PostFilter v-model:title="params.title_like" v-model:limit="params._limit" />

  <hr class="my-4" />

  <AppLoading v-if="loading" />

  <AppError v-else-if="error" :message="error.message" />

  <template v-else>
    <AppGrid :items="posts">
      <template v-slot="item">
        <PostItem
          :title="item.item.title"
          :content="item.item.content"
          :created-at="item.item.createdAt"
          @click="goPage(item.item.id)"
        />
      </template>
    </AppGrid>

    <AppPagination
      :current-page="params._page"
      :page-count="pageCount"
      @page="page => (params._page = page)"
    />
  </template>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

import { getPosts } from '@/api/posts';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostItem from '@/components/posts/PostItem.vue';

const router = useRouter();
const error = ref(null);
const loading = ref(false);
const posts = ref([]);
const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 3,
  title_like: '',
});
const totalCount = ref(0);
const pageCount = computed(() => Math.ceil(totalCount.value / params.value._limit));

const fetchPost = async () => {
  try {
    loading.value = true;
    const { data, headers } = await getPosts(params.value);
    posts.value = data;
    totalCount.value = headers['x-total-count'];
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

watchEffect(fetchPost);

const goPage = id => {
  router.push({
    name: 'PostDetail',
    params: {
      id,
    },
  });
};
</script>

<style lang="scss" scoped></style>
