<template>
  <AppLoading v-if="loading" />

  <AppError v-else-if="error" :message="error.message" />

  <div v-else>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <PostForm v-model:title="form.title" v-model:content="form.content" @submit.prevent="edit">
      <template #actions>
        <button type="button" class="btn btn-outline-dark" @click="goDetailPage">취소</button>
        <button class="btn btn-primary" :disabled="editLoading">
          <template v-if="editLoading">
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"> </span>
            <span class="visually-hidden">Loadding...</span>
          </template>
          <template v-else>수정</template>
        </button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';

const { vSuccess, vError } = useAlert();
const route = useRoute();
const router = useRouter();
const id = route.params.id;

const { data: form, loading, error } = useAxios(`/posts/${id}`);

const {
  error: editError,
  loading: editLoading,
  execute,
} = useAxios(
  `/posts/${id}`,
  { method: 'patch' },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess('수정이 완료되었습니다.!');
      router.push({ name: 'PostDetail', params: { id } });
    },
    onError: err => {
      vError(err.message);
    },
  },
);

const edit = () => {
  execute({
    ...form.value,
  });
};

const goDetailPage = () => {
  router.push({ name: 'PostDetail', params: { id } });
};
</script>

<style scoped></style>
