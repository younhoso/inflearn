import axios from 'axios';
import { isRef, ref, unref, watchEffect } from 'vue';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const defaultConfig = {
  method: 'get',
};

const defaultOption = {
  immediate: true,
};

export const useAxios = (url, config = {}, option = {}) => {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const response = ref(null);

  const { onSuccess, onError, immediate } = { ...defaultOption, ...option };

  const { params } = config;

  const excute = body => {
    data.value = null;
    loading.value = true;
    error.value = null;
    axios(url, {
      ...defaultConfig,
      ...config,
      params: unref(params),
      data: typeof body === 'object' ? body : {},
    })
      .then(res => {
        response.value = res;
        data.value = res.data;
        if (onSuccess) {
          onSuccess(res);
        }
      })
      .catch(err => {
        error.value = err;
        if (onError) {
          onError(err);
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };

  if (isRef(params)) {
    watchEffect(excute);
  } else {
    if (immediate) {
      excute();
    }
  }

  return {
    data,
    response,
    loading,
    error,
    excute,
  };
};
