<template>
  <div class="cg-wrapper">
    <div class="tags">
      <div class="tag" :class="{ active: activeTag === '' }" @click="switchTag('')">
        <span class="label">全部</span>
        <span class="num">({{ album.length }})</span>
      </div>
      <div class="tag" :class="{ active: activeTag === tag.label }" v-for="tag in tags" :key="tag.label" @click="switchTag(tag.label)">
        <span class="label">{{ tag.label }}</span>
        <span class="num">({{ tag.num }})</span>
      </div>
    </div>

    <div class="album" :style="{ height: `${albumHeight + 10}px` }">
      <div 
        class="cg" 
        @click="previewCg(cg.cg_id)"
        v-for="cg in album" 
        :class="{ isShow: cg.tags.includes(activeTag) || activeTag === '' }"
        :key="cg.cg_id" 
        :style="{ left: `${cg.left}px`, top: `${cg.top}px`, width: `${(100 / lineNum)}%` }">
        <img :src="cg.cg">
        <div class="cg-mask"></div>
      </div>
    </div>
  </div>
</template>

<script>
import services from '@/services';
import { store } from '@/store';

export default {
  props: {
    projectId: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      tags: [],
      activeTag: '',
      album: [],
      loading: false,
      albumHeight: 0,
      tempAlbumHeight: 0,

      doQueue: [],
      sortArr: [],
      columnHeight: [],
      lineNum: 3,
      current: 0
    };
  },
  methods: {
    previewCg(cgId) {
      store.ui.previewCg(cgId);
    },
    async initData() {
      try {
        let album = await services.album.getProjectAlbum(this.projectId, this.page, this.size);

        // 获取标签列表及数量
        let tagsTree = {};
        album.forEach((item) => {
          item.tags.forEach((tag) => {
            if (!tagsTree[tag]) {
              tagsTree[tag] = 1;
              this.tags.push(tag);
            }
            else {
              tagsTree[tag]++;
            }
          });
        });
        let tags = [];
        for (let key in tagsTree) {
          tags.push({
            num: tagsTree[key],
            label: key
          });
        }

        // album添加位置信息字段
        album = album.map((item) => {
          return {
            ...item,
            left: 0,
            top: 0
          };
        });
        this.tags = tags;
        this.album = album;
        this.sortCg();
      }
      catch(err) {
        this.$message.error(err.message);
        console.error(err);
      }
    },
    switchTag(tagName) {
      this.activeTag = tagName;
      this.sortCg();
    },
    sortCg() {
      if (this.activeTag === '') this.sortArr = this.album;
      else this.sortArr = this.album.filter(item => item.tags.includes(this.activeTag));
      this.tempAlbumHeight = 0;
      this.doQueue = Array(this.sortArr.length).fill(null);
      this.columnHeight = Array(this.lineNum).fill(0);
      this.current = 0;

      this.sortArr.forEach((cg, cgIndex) => {
        let img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          let computedHeight = height / (width / ((810 / this.lineNum) - 20)) + 20;
          let doQueue = [...this.doQueue];
          doQueue[cgIndex] = computedHeight;
          this.doQueue = doQueue;
        };
        img.onerror = () => {
          let doQueue = [...this.doQueue];
          doQueue[cgIndex] = 0;
          this.doQueue = doQueue;
        }
        let delay = parseInt(Math.random() * 500);
        setTimeout(() => {
          img.src = cg.cg;
        }, delay);
      });

    },
    getHeight(cgIndex) {
      let minHeight = this.columnHeight[0];
      let minIndex = 0;
      this.columnHeight.forEach((h, index) => {
        if (h < minHeight) {
          minHeight = h;
          minIndex = index;
        }
      });
      this.sortArr[cgIndex].left = minIndex * (810 / this.lineNum);
      this.sortArr[cgIndex].top = this.columnHeight[minIndex];
      this.columnHeight[minIndex] += this.doQueue[cgIndex];
      if (this.columnHeight[minIndex] > this.tempAlbumHeight) {
        this.tempAlbumHeight = this.columnHeight[minIndex]; 
        this.albumHeight = this.tempAlbumHeight;
      }
      this.current++;
    }
  },
  watch: {
    doQueue: {
      handler(newVal, oldVal) {
        while (newVal[this.current] || newVal[this.current] === 0) {
          this.getHeight(this.current);
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
  },
  created() {
    this.initData();
  }
};
</script>

<style lang='scss' scoped>
.cg-wrapper {
  background-color: #fff;
  width: 100%;
  border-radius: 4px;

  .tags {
    padding: 20px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 2px solid #ececec;

    .tag {
      padding: 10px 15px;
      cursor: pointer;

      .num {
        color: #9b9b9b;
      }
    }

    .tag:last-child {
      padding-right: 0;
    }

    .tag.active {
      .label {
        color: $primaryColor;
      }
    }
  }
}

.album {
  margin: 5px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  transition: 0.6s;
  overflow: hidden;

  .cg {
    padding: 10px;
    position: absolute;
    transition: 0.6s;
    opacity: 0;
    cursor: pointer;
    overflow: hidden;

    img {
      width: 100%;
      border-radius: 4px;
      box-shadow: 0 0 3px rgba(0, 0, 0, 1);
    }

    .cg-mask {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: hsla(0,0%,100%,0);
      transition: 0.3s;
    }

    .cg-mask:hover {
      background: hsla(0,0%,100%,0.2);
    }
  }

  .cg.isShow {
    opacity: 1;
  }
}
</style>
