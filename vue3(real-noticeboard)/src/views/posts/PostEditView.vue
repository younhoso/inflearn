<template>
  <h2>게시글 수정</h2>
  <hr class="my-4" />
  <PostForm v-model:title="post.title" v-model:content="post.content" @submit.prevent="edit">
    <template #actions>
      <button type="button" class="btn btn-outline-dark" @click="goDetailPage">취소</button>
      <button class="btn btn-primary">수정</button>
    </template>
  </PostForm>

  <AppAlert :show="showAlert" :message="alertMessage" :type="alertType" />
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getPostsById, updatePost } from '@/api/posts';
import AppAlert from '@/components/AppAlert.vue';
import PostForm from '@/components/posts/PostForm.vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const post = ref({
  title: null,
  content: null,
});

const fetchPost = async () => {
  try {
    const { data } = await getPostsById(id);
    setPost(data);
  } catch (error) {
    console.error(error);
    vAlert('네트워크 오류!');
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
    vAlert('수정이 완료되었습니다.!', 'success');
    // router.push({ name: 'PostDetail', params: { id } });
  } catch (error) {
    console.error(error);
  }
};

const goDetailPage = () => {
  router.push({ name: 'PostDetail', params: { id } });
};

const showAlert = ref(false);
const alertMessage = ref('');
const alertType = ref('');
const vAlert = (message, type = 'error') => {
  showAlert.value = true;
  alertMessage.value = message;
  alertType.value = type;
  setTimeout(() => {
    showAlert.value = false;
  }, 2000);
};
</script>

<style scoped></style>
