import { ref } from 'vue';

const alerts = ref([]);
export function useAlert() {
  // alert
  const vAlert = (message, type = 'error', duration = 2000) => {
    const id = Date.now();
    alerts.value.push({ id, message, type });
    setTimeout(() => {
      alerts.value = alerts.value.filter(alert => alert.id !== id);
    }, duration);
  };

  const vSuccess = message => vAlert(message, 'success');
  const vError = message => vAlert(message, 'error');

  return {
    alerts,
    vAlert,
    vSuccess,
    vError,
  };
}
