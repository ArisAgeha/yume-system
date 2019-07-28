<template>
  <div class="main-cover-wrapper">
    <el-image class="main-cover" fit="cover" :src="mainCover1" :class="{ show: showCover1 }" />
    <el-image class="main-cover" fit="cover" :src="mainCover2" :class="{ show: showCover2 }" />
    <el-image class="space-wrapper" :src="spaceWrapper" />
  </div>
</template>

<style lang='scss' scoped>
.main-cover-wrapper {
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;

  .main-cover {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: 0.8s;
    opacity: 0;
  }
  .main-cover.show {
    opacity: 1;
  }

  .space-wrapper {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
</style>

<script>
import SpaceWrapper from '@/assets/images/space-wrapper.svg';
import img1 from '@/assets/images/hp-banner1.jpg';
import img2 from '@/assets/images/hp-banner2.jpg';
import img3 from '@/assets/images/hp-banner3.jpg';
import img4 from '@/assets/images/hp-banner4.jpg';

export default {
  data() {
    return {
      spaceWrapper: SpaceWrapper,
      mainCover1: '',
      mainCover2: '',
      showCover1: true,
      showCover2: false
    };
  },
  methods: {
    setCarousal(imgs) {
      if (imgs.length === 0) {}
      else if (imgs.length === 1) {
        this.mainCover1 = imgs[0];
        this.showCover1 = true;
      }
      else {
        this.mainCover1 = imgs[0];
        this.showCover1 = true;
        let imgsIndex = 0;
        let container = 1;
        let timer = 5000;

        setInterval(() => {
          this[`showCover${container}`] = false;
          container = container === 1 ? 2 : 1;
          imgsIndex = imgsIndex >= imgs.length - 1 ? 0 : imgsIndex + 1;
          this[`mainCover${container}`] = imgs[imgsIndex];
          this[`showCover${container}`] = true;
        }, timer);
      }
    }
  },
  computed: {
  },
  created() {
    let imgs = [img1, img2, img3, img4];
    this.setCarousal(imgs);
  }
};
</script>
