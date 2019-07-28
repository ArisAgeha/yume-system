<template>
  <div class="signup">
    <el-dialog
      :visible.sync="show"
      :fullscreen="true"
      :show-close="false"
      :append-to-body="true">

      <div class="album-mask medium-scrollbar" @click="cancel">
        <div class="album-creator-body" @click.stop>
          <div class="body-left">
            <el-form ref="albumForm" :model="formData" label-width="150px" :rules="rules">
              <div @mouseenter="changeHint('title')" @mouseleave="changeHint('default')">
                <el-form-item prop="title" label="标题">
                  <el-input v-model="formData.title" />
                </el-form-item>
              </div>
              <div @mouseenter="changeHint('tags')" @mouseleave="changeHint('default')">
                <el-form-item label="标签">
                  <el-tag
                    :key="index"
                    v-for="(tag, index) in formData.tags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                    {{tag}}
                  </el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                    />
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新标签</el-button>
                </el-form-item>
              </div>
              <div @mouseenter="changeHint('storyManager')" @mouseleave="changeHint('default')">
                <el-form-item label="故事集管理">
                  <el-button @click="showStorySelector = true">管理</el-button>
                </el-form-item>
              </div>
              <div @mouseenter="changeHint('cg')" @mouseleave="changeHint('default')">
                <el-form-item prop="cg" label="上传CG">
                  <upload :multiple="false">
                    <div class="upload-wrapper">
                      <el-image :src="formData.cg" v-if="formData.cg"/>
                      <i class="el-icon-upload2" v-else></i>
                    </div>
                  </upload>
                </el-form-item>
              </div>
              <div @mouseenter="changeHint('allowAddStory')" @mouseleave="changeHint('default')">
                <el-form-item label="">
                  <el-checkbox v-model="formData.allow_add_story" label="允许其他人添加故事" border />
                </el-form-item>
              </div>
              <el-form-item size="large">
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button @click="cancel">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="body-right">
            <h3>{{ hintTitle }}</h3>
            <div v-html="hintText"></div>
          </div>
        </div>
        
      </div>
      <story-selector :init-data="formData.story" @update="updateStory" v-if="showStorySelector" :is-admin="true" :dialog-visible.sync="showStorySelector" />

    </el-dialog>
  </div>
</template>

<script>
import { store } from '@/store';
import Upload from '@/components/MultiUpload';
import services from '@/services';
import { 
  defaultHint,
  titleHint,
  tagsHint, 
  storyManagerHint, 
  cgHint, 
  allowAddStoryHint 
} from './albumText.js';

export default {
  components: {
    Upload,
    StorySelector: () => import('@/components/StorySelector')
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hintTitle: '',
      hintText: '',
      showStorySelector: false,
      inputVisible: false,
      inputValue: '',
      formData: {
        title: '',
        tags: [],
        cg: '',
        storyIds: [],
        allow_add_story: false,
        story: []
      },
      rules: {
        title: [
          { required: true, message: '请先填写标题', triger: 'blur' },
          { min: 1, max: 18, message: '标题长度在18字以内', trigger: 'blur' }
        ],
        cg: [
          { required: true, message: '请先上传画集', triger: 'change' }
        ]
      }
    };
  },
  methods: {
    changeHint(text) {
      switch(text) {
        case 'title':
          this.hintText = titleHint;
          this.hintTitle = '标题';
          break;
        case 'tags':
          this.hintText = tagsHint;
          this.hintTitle = '标签';
          break;
        case 'storyManager':
          this.hintText = storyManagerHint;
          this.hintTitle = '故事集管理';
          break;
        case 'cg':
          this.hintText = cgHint;
          this.hintTitle = '上传CG';
          break;
        case 'allowAddStory':
          this.hintText = allowAddStoryHint;
          this.hintTitle = '允许其他人添加故事';
          break;
        default:
          this.hintText = defaultHint;
          this.hintTitle = '创建画集';
      }
    },
    updateStory(storys) {
      this.formData.story = storys.map(item => {
        return {
          ...item
        };
      });
    },
    onSubmit() {
      this.$refs['albumForm'].validate(async (valid) => {
        if (valid) {
          try {
            let saveData = {
              ...this.formData,
              story: this.formData.story.map(item => item.story_id)
            };
            await services.album.createAlbum(saveData);
            this.$message.success('创建成功');
            this.cancel();
          }
          catch(err) {
            console.error(err);
            this.$message.error(err.message);
          }
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.show = false;
    },
    handleClose(tag) {
      this.formData.tags.splice(this.formData.tags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.formData.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  },
  created() {
    this.changeHint('default');
  },
  watch: {
    hintText(val) {
      let newVal = val.replace(/\r\n/g, '<br>')
      newVal = newVal.replace(/\n/g, '<br>');
      this.hintText = newVal;
    },
    show(val) {
      if (val) {
        store.ui.setBlur(4);
      }
      else {
        store.ui.setBlur(0);
      }
    }
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
  beforeDestroy() {
    store.ui.setBlur(0);
  },
  beforeCreate() {
    store.ui.setBlur(4);
  }
};
</script>

<style lang='scss' scoped>
.el-input {
  max-width: 225px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.album-creator-body {
  background-color: #fff;
  border-radius: 10px;
  margin: auto;
  width: 1024px;
  padding: 40px;
  display: flex;
  margin-top: 15vh;
  margin-bottom: 50px;
  z-index: 10;

  .body-left {
    min-width: 60%;
    max-width: 60%;
    border-right: 1px solid #DCDFE6;
  }
  .body-right {
    padding: 20px;
    line-height: 1.6;
  }

  .upload-wrapper {
    width: 320px;
    min-height: 180px;
    border: 2px dashed #DCDFE6;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      font-size: 50px;
    }
  }
}

.album-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
}
</style>
