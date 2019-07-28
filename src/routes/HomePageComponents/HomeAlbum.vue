<template>
  <div class="main-area">
    <div class="album-area">
      <div 
        class="cg-wrapper" 
        :class="{ isActive: index === cindex}" 
        v-for="(item, index) in album" 
        :style="{ left: `${pos[index]}px`, zIndex: zindex[index] }"
        :key="item.cg_id">
        <div class="cg-inner">
          <el-image @click="onImageClick(index, item)" :src="item.cg" fit="cover" v-if="index !== cindex" />
            <img @click="onImageClick(index, item)" class="current-cg" :src="item.cg" alt="" v-else>
        </div>
      </div>
    </div>
    <div class="preview-area">
      <div class="preview-wrapper small-scrollbar">
        <div 
          @click="onImageClick(index, item)"
          :class="{ isActive: index === cindex}" 
          v-for="(item, index) in album" 
          :key="item.cg_id"
          class="preview">
          <el-image :src="item.cg" fit="cover" />
        </div>
      </div>
    </div>
    <div class="album-mask"></div>
  </div>
</template>

<script>
import services from '@/services';
import { store } from '@/store';

export default {
  data() {
    return {
      cindex: 0,
      album: [],
      pos: [],
      zindex: []
    };
  },
  methods: {
    onImageClick(index, item) {
      if (index === this.cindex) {
        store.ui.previewCg(item.cg_id);
      }
      else {
        this.cindex = index;
      }
    },
    sortAlbum(val) {
      let pos = Array(this.album.length);
      let zindex = Array(this.album.length);
      let handleIndex = this.cindex;
      let windowShift = document.body.offsetWidth / 2;
      for (let i = 0; i < pos.length; i++) {
        let shift;
        let z;
        if (i > pos.length / 2) {
          shift = (i - pos.length) * 340 + windowShift;
          z = i;
        }
        else {
          shift = i * 340 + windowShift;
          z = pos.length - i;
        }
        pos[handleIndex] = shift;
        zindex[handleIndex] = z;
        handleIndex = handleIndex >= pos.length - 1 ? 0 : handleIndex + 1;
      }
      this.pos = pos;
      this.zindex = zindex;
    }
  },
  watch: {
    cindex(val) {
      this.sortAlbum(val);
    }
  },
  computed: {
  },
  async created() {
    try {
      this.album = await services.home.getAlbum();
      this.sortAlbum(0);
    }
    catch(err) {
      this.$message.error(err.message);
      console.error(err);
    }
  }
};
</script>

<style lang='scss' scoped>
.main-area {
  height: 800px;
  width: 100%;
  position: relative;
  margin-bottom: 100px;
  overflow: hidden;
}

.preview-area {
  height: 85px;
  width: 100%;

  .preview-wrapper {
    width: 80%;
    height: 105px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
    margin: auto;
    padding-bottom: 20px;

    .preview {
      height: 80px;
      box-shadow: 0 2px 5px 0 rgba(0,0,0,.5);
      border-radius: 4px;
      margin: 0 12px;
      position: relative;
      cursor: pointer;

      .el-image {
        height: 80px;
        width: 80px;
      }
    }

    .preview::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: hsla(0, 0%, 100%, .5);
      transition: opacity .3s;
    }

    .preview.isActive::after {
      background: hsla(0, 0%, 100%, 0);
    }
  }
}

.album-area {
  height: 650px;
  width: 100%;
  overflow: hidden;
  display: flex;

  .cg-wrapper {
    height: 650px;
    width: 340px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.8s;
    transform: translateX(-50%);

    .cg-inner {
      height: 340px;
      .el-image {
        width: 340px;
        height: 340px;
        cursor: pointer;

      }
    }
  }

  .cg-wrapper.isActive {
    width: 750px;
    z-index: 1;
    pointer-events: none;
    .cg-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 600px;
      width: 100%;
      pointer-events: none;
      position: relative;

      .current-cg {
        max-width: 100%;
        max-height: 100%;
        box-shadow: 0 0 5px rgba(0,0,0,.2);
        pointer-events: initial;
        cursor: pointer;
      }
    }
  }
}
.album-mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(90deg, #fff, hsla(0,0%,100%,0) 33%, hsla(0,0%,100%,0) 66%, #fff);
  z-index: 50;
  pointer-events: none;
}
</style>
