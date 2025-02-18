<template>
  <h2>게시글 수정</h2>
  <hr class="my-4" />
  <PostForm v-model:title="post.title" v-model:content="post.content" @submit.prevent="edit">
    <template #actions>
      <button type="button" class="btn btn-outline-dark" @click="goDetailPage">취소</button>
      <button class="btn btn-primary">수정</button>
    </template>
  </PostForm>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getPostsById, updatePost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
console.log(id);

const post = ref({
  title: null,
  content: null,
});

const fetchPost = async () => {
  const { data } = await getPostsById(id);
  setPost(data);
};

const setPost = ({ title, content }) => {
  post.value.title = title;
  post.value.content = content;
};

fetchPost();
const edit = async () => {
  try {
    await updatePost(id, { ...post.value });
    router.replace({ name: 'PostDetail', params: { id } });
  } catch (error) {
    console.error(error);
  }
};

const goDetailPage = () => {
  router.push({ name: 'PostDetail', params: { id } });
};
</script>

<style lang="scss" scoped></style>
