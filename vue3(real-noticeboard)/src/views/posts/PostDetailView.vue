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
import { defineProps } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';

const { vSuccess, vError } = useAlert();
const route = useRoute();
const router = useRouter();
const id = route.params.id;

const props = defineProps({
  id: String,
});

const { data: post, response, loading, error } = useAxios(`/posts/${props.id}`);

const {
  error: removeError,
  loading: removeLoading,
  execute,
} = useAxios(
  `/posts/${props.id}`,
  { method: 'delete' },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess('삭제가 완료되었습니다.');
      router.push({ name: 'PostList' });
    },
    onError: err => {
      vError(err.message);
    },
  },
);

const removePost = () => {
  if (confirm('삭제 하시겠습니끼?') === false) {
    return;
  }
  execute();
};

const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () => router.push({ name: 'PostEdit', params: { id } });
</script>

<style lang="scss" scoped></style>
