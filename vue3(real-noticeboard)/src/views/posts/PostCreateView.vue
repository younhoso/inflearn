<template>
  <div>게시글 등록</div>
  <hr class="my-4" />
  <AppError v-if="error" :message="error.message" />
  <PostForm v-model:title="form.title" v-model:content="form.content" @submit.prevent="save">
    <template #actions>
      <button type="button" class="btn btn-outline-dark me-2" @click="goListPage">목록</button>

      <button class="btn btn-primary" :disabled="loading">
        <template v-if="loading">
          <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"> </span>
          <span class="visually-hidden">Loadding...</span>
        </template>
        <template v-else>저장</template>
      </button>
    </template>
  </PostForm>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { createPost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/hooks/useAlert';

const router = useRouter();
const { vSuccess } = useAlert();

const form = ref({
  title: null,
  content: null,
});

const error = ref(null);
const loading = ref(false);

const save = async () => {
  try {
    loading.value = true;
    await createPost({
      ...form.value,
      createdAt: Date.now(),
    });
    vSuccess('등록이 완료되었습니다.');
    router.push({ name: 'PostList' });
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

const goListPage = () => {
  router.push({ name: 'PostList' });
};
</script>

<style lang="scss" scoped></style>
