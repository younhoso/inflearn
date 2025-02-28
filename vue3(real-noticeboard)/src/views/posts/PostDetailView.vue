<template>
  <AppLoading v-if="loading" />

  <AppError v-else-if="error" :message="error.message" />

  <div v-else>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p class="text-muted">{{ $dayjs(post.contentedAt).format('YYYY. MM. DD HH:mm:ss') }}</p>
    <hr class="my-4" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">수정</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger" @click="removePost">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { deletePost, getPostsById } from '@/api/posts';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const post = ref({
  title: null,
  content: null,
  createdAt: null,
});

const error = ref(null);
const loading = ref(false);

const props = defineProps({
  id: String,
});

(async function () {
  try {
    loading.value = true;
    const { data } = await getPostsById(id);
    setPost(data);
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
})();

const setPost = ({ title, content, createdAt }) => {
  post.value.title = title;
  post.value.content = content;
  post.value.createdAt = createdAt;
};

const removePost = () => {
  try {
    if (confirm('삭제 하시겠습니끼?') === false) {
      return;
    }
    deletePost(id);
    router.replace({ name: 'PostList' });
  } catch (error) {
    console.error(error);
  }
};

const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () => router.push({ name: 'PostEdit', params: { id } });
</script>

<style lang="scss" scoped></style>
