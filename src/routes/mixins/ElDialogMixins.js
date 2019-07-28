import { store } from '@/store';

export default {
  beforeDestroy() {
    document.body.removeEventListener('mouseup', this.lockEvent);
  },
  beforeCreate() {
    store.ui.setBlur(4);
    document.body.addEventListener('mouseup', this.lockEvent);
  },
  computed: {
    show: {
      get() {
        return this.dialogVisible;
      },
      set(val) {
        this.$emit('update:dialogVisible', val);
      }
    } 
  },
  watch: {
    show(val) {
      if (val) {
        store.ui.setBlur(4);
        document.body.addEventListener('mouseup', this.lockEvent);
      }
      else {
        store.ui.setBlur(0);
        document.body.removeEventListener('mouseup', this.lockEvent);
      }
    }
  },
  methods: {
    lockEvent() {
      setTimeout(() => {
        this.lockModal = false;
      }, 0);
    }
  }
}
