import dayjs from 'dayjs';
import { thumb } from './tools';

export default {
  install(Vue) {
    Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm') => {
      if (!value) {
        return '';
      }
      if (String(value).length === 13) {
        value = Math.floor(value / 1000);
      }
      return dayjs(value * 1000).format(format);
    });
    Vue.filter('thumb', (url, width = 200, height) => {
      return thumb(url, { width, height });
    });
    Vue.filter('avatar', (url, width = 200) => {
      return thumb(url, { width, height: width });
    });
  }
};
