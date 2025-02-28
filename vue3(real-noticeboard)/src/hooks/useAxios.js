import axios from 'axios';
import { ref, unref, watchEffect } from 'vue';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

export const useAxios = (url, config = {}) => {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const response = ref(null);

  const { params } = config;

  const excute = () => {
    data.value = null;
    loading.value = true;
    error.value = null;
    axios(url, {
      ...config,
      params: unref(params),
    })
      .then(res => {
        data.value = res.data;
        response.value = res;
      })
      .catch(err => {
        error.value = err;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  watchEffect(excute);

  return {
    data,
    response,
    loading,
    error,
  };
};
