import AppAlert from '@/components/app/AppAlert.vue';
import AppCard from '@/components/app/AppCard.vue';
import AppError from '@/components/app/AppError.vue';
import AppGrid from '@/components/app/AppGrid.vue';
import AppLoading from '@/components/app/AppLoading.vue';
import AppPagination from '@/components/app/AppPagination.vue';

export default {
  install(app) {
    app.component('AppAlert', AppAlert);
    app.component('AppCard', AppCard);
    app.component('AppGrid', AppGrid);
    app.component('AppPagination', AppPagination);
    app.component('AppError', AppError);
    app.component('AppLoading', AppLoading);
  },
};
