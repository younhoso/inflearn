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
import { useAxios } from '@/hooks/useAxios';

const router = useRouter();
const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 3,
  title_like: '',
});

const { data: posts, response, loading, error } = useAxios('/posts', { method: 'get', params });
const totalCount = computed(() => response.value.headers['x-total-count']);
const pageCount = computed(() => Math.ceil(totalCount.value / params.value._limit));

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
