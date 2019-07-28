<template>
  <div>
    <transition name="el-fade-in-liner">
      <div class="contributor">
        <div class="add-item" @click="addProject">
          添加企划
        </div>
        <div class="add-item" @click="addAlbum">
          添加画集
        </div>
      </div>
    </transition>
    
    <project-creator v-if="showProjectCreator" :dialog-visible.sync="showProjectCreator" />
    <album-creator v-if="showAlbumCreator" :dialog-visible.sync="showAlbumCreator" />
  </div>
</template>

<script>
export default {
  components: {
    ProjectCreator: () => import('../CreateComponents/ProjectCreator'),
    AlbumCreator: () => import('../CreateComponents/AlbumCreator')
  },
  data() {
    return {
      showProjectCreator: false,
      showAlbumCreator: false
    };
  },
  methods: {
    addProject() {
      this.showProjectCreator = true;
    },
    addAlbum() {
      this.showAlbumCreator = true;
    }
  },
  computed: {
  },
  created() {
  }
};
</script>

<style lang='scss' scoped>
.contributor {
  position: absolute;
  right: 0;
  top: 100%;
  width: 92px;
  background-color: $primaryColor;
  padding: 10px 0;

  .add-item {
    width: 100%;
    text-align: center;
    padding: 10px 0;
    transition: 0.3s;
    cursor: pointer;
  }

  .add-item:hover {
    background-color: $activeColor;
  }
}
</style>
