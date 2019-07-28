<template>
  <div class="home-page">
    <transition name="el-zoom-in-top">
      <main-cover />
    </transition>

    <p class="title"> - CG欣赏 - </p>
    <home-album ref="homeAlbum" class="home-album" />

    <div v-if="step >= 2">
      <p class="project-title title"> - 最新企划 - </p>
      <home-project />
    </div>

    <router-view />
  </div>
</template>

<script>
import MainCover from './HomePageComponents/MainCover';

export default {
  components: {
    MainCover,
    HomeAlbum: () => import('./HomePageComponents/HomeAlbum'),
    HomeProject: () => import('./HomePageComponents/HomeProject')
  },
  data() {
    return {
      step: 1
    };
  },
  methods: {
    listenToLoad() {
      let el = this.$refs.homeAlbum.$el;
      let shift = el.getBoundingClientRect().y;
      if (shift <= 400) this.step = 2;
    }
  },
  computed: {
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.listenToLoad);
  },
  async mounted() {
    document.addEventListener('scroll', this.listenToLoad);
  }
};
</script>

<style lang='scss' scoped>
.title {
  font-size: 30px;
  text-align: center;
  color: #4a4a4a;
  margin-top: 80px;
  margin-bottom: 0;
}

.project-title {
  background-color: #e6eaee;
  margin-top: 0;
  margin-bottom: 0;
  padding: 80px 0;
} 

.main-cover-wrapper {
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;

  .space-wrapper {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
</style>
