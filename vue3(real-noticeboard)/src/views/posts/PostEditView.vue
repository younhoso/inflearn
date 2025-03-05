<template>
  <AppLoading v-if="loading" />

  <AppError v-else-if="error" :message="error.message" />

  <div v-else>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <PostForm v-model:title="post.title" v-model:content="post.content" @submit.prevent="edit">
      <template #actions>
        <button type="button" class="btn btn-outline-dark" @click="goDetailPage">취소</button>
        <button class="btn btn-primary">수정</button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getPostsById, updatePost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/hooks/useAlert';

const { vSuccess, vError } = useAlert();
const route = useRoute();
const router = useRouter();
const id = route.params.id;

const post = ref({
  title: null,
  content: null,
});

const error = ref(null);
const loading = ref(false);

const fetchPost = async () => {
  try {
    loading.value = true;
    const { data } = await getPostsById(id);
    setPost(data);
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

const setPost = ({ title, content }) => {
  post.value.title = title;
  post.value.content = content;
};

fetchPost();
const edit = async () => {
  try {
    await updatePost(id, { ...post.value });
    vSuccess('수정이 완료되었습니다.!');
    router.push({ name: 'PostDetail', params: { id } });
  } catch (error) {
    console.error(error);
    vError(error.message);
  }
};

const goDetailPage = () => {
  router.push({ name: 'PostDetail', params: { id } });
};
</script>

<style scoped></style>
