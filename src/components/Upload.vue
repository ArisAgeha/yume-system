<template>
  <div :class="[$style.upload, disabled ? $style.disabled : '']" v-loading="loading && showLoading">
    <slot></slot>
    <div :class="$style.file" @click="startUpload">
      <input
        ref="input"
        type="file"
        :accept="accept"
        :multiple="multiple"
        :disabled="loading"
        @change="onInputChange"
      />
    </div>
    <el-dialog
      width="500px"
      @close="onCropClose"
      append-to-body
      :show-close="!cropLoading"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="showCrop"
    >
      <div :class="$style.cropper">
        <vue-cropper
          ref="cropper"
          :view-mode="1"
          :aspect-ratio="car"
          v-if="cropFile"
          :class="$style.cropper"
          :ready="previewCrop"
          :cropend="previewCrop"
          :src="cropFile"
        />
      </div>
      <div :class="$style.preview" :style="previewStyle">
        <img :src="previewImage" alt="" />
      </div>
      <el-button @click="saveCrop" :class="$style.btn" :loading="cropLoading" type="primary">保存图片</el-button>
    </el-dialog>
  </div>
</template>
<script>
import { store } from '@/store';
import services from '@/services';
import VueCropper from 'vue-cropperjs';
import { MIN_UPLOAD_FILE_SIZE, MAX_CROP_FILE_SIZE, MAX_UPLOAD_IMG_WIDTH, MAX_UPLOAD_FILE_SIZE } from '@/constant';

let fetched = false;

export default {
  components: { VueCropper },
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'image',
      validator: value => ['image', 'video', 'file', 'audio'].indexOf(value) !== -1
    },
    multiple: {
      type: Boolean,
      default: false
    },
    showLoading: {
      type: Boolean,
      default: false
    },
    crop: {
      type: Boolean,
      default: false
    },
    cropAspectRatio: {
      type: Number,
      default: 1
    },
    hasMinSize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      cropFile: '',
      cropLoading: false,
      showCrop: false,
      loading: false,
      previewImage: '',
      supportCrop: typeof FileReader === 'function'
    };
  },
  computed: {
    accept() {
      return this.type === 'file' ? `` : `${this.type}/*`;
    },
    qiniuConfig() {
      return store.app.qiniuConfig;
    },
    disabled() {
      return this.loading || this.showCrop;
    },
    car() {
      return Number(this.cropAspectRatio.toFixed(2));
    },
    previewStyle() {
      const width = 150;
      const height = width / this.var;
      return {
        width: `${width}px`,
        height: `${Math.ceil(height)}px`
      };
    }
  },
  watch: {
    loading(value) {
      this.$emit('loading', value);
    }
  },
  methods: {
    handleUpload() {
      this.$refs.input.click();
    },
    previewCrop() {
      this.previewImage = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    async saveCrop() {
      if (this.previewImage) {
        this.cropLoading = true;
        await this.uploadFiles([
          this.previewImage
            .split(',')
            .slice(1)
            .join(',')
        ]);
        this.cropLoading = false;
        this.onCropClose();
      }
    },
    onCropClose() {
      this.previewImage = '';
      this.cropFile = '';
      this.showCrop = false;
    },
    openCropFile(file) {
      this.previewImage = '';
      let reader = new FileReader();
      this.showCrop = true;
      this.loading = true;
      reader.onload = event => {
        this.loading = false;
        reader.onerror = reader.onabort = reader.onload = null;
        reader = null;
        this.cropFile = event.target.result;
        this.$nextTick(() => {
          this.$refs.cropper.replace(event.target.result);
        });
      };
      reader.onerror = reader.onabort = () => {
        this.loading = false;
        reader.onerror = reader.onabort = reader.onload = null;
        reader = null;
        // 回退普通上传
        this.uploadFiles([file]);
      };
      reader.readAsDataURL(file);
    },
    startUpload() {
      if (!this.disabled) {
        this.$refs.input.click();
      }
    },
    toCanvasImage(files) {
      const newFiles = [];
      return new Promise((resolve, reject) => {
        for (const file of files) {
          let reader = new FileReader();
          // 1. 监听reader
          reader.onload = async e => {
            try {
              let img = new Image();
              img.src = e.target.result;
              let { width, height } = await new Promise((resolve, reject) => {
                img.onerror = e => reject(new Error('无效图片'));
                img.onload = e => resolve(e.target);
              });
              let scale = 1;
              if (width >= height && width > MAX_UPLOAD_IMG_WIDTH) {
                scale = MAX_UPLOAD_IMG_WIDTH / width;
                width *= scale;
                height *= scale;
              }
              let blob = file;
              // scale不等于1的时候，使用canvas缩放
              if (scale !== 1) {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = width;
                canvas.height = height;
                context.drawImage(img, 0, 0, width, height);
                blob = await new Promise(resolve => canvas.toBlob(e => resolve(e), file.type));
              }
              newFiles.push(blob);
              img = null;
              reader = null;
              if (newFiles.length === files.length) {
                resolve(newFiles);
              }
            } catch (error) {
              reject(error);
            }
          };
          reader.onerror = e => reject(e);
          // 2.读取图片,触发reader
          reader.readAsDataURL(file);
        }
      });
    },
    async onInputChange(e) {
      let files = e.target.files || [];
      files = Array.prototype.slice.call(files);
      this.$refs.input.value = '';
      if (files.length === 0) {
        return;
      }
      try {
        if (files.every(item => item.type.indexOf('image') !== -1)) {
          files = await this.toCanvasImage(files);
        }
        this.checkTypes(files);
        if (this.type === 'image') {
          this.checkSize(files);
        }

        if (this.type === 'image' && this.crop && !this.multiple && this.supportCrop) {
          // 检查图片大小，如果大于MAX_CROP_FILE_SIZE，不能使用裁剪模式
          if (Math.floor(files[0].size) < MAX_CROP_FILE_SIZE) {
            this.openCropFile(files[0]);
          } else {
            const mbSize = Math.ceil(MAX_CROP_FILE_SIZE / (1024 * 1024));
            this.$message.warning(`上传图片大于${mbSize}MB，不能在线裁剪图片，自动转换到普通上传模式`);
            this.uploadFiles(files);
          }
        } else {
          this.uploadFiles(files);
        }
      } catch (err) {
        if (err.message === "Object doesn't support property or method 'toBlob'") {
          this.$message.error('上传图片已损坏或者格式不符，请更换图片');
        } else {
          this.$message.error(err.message);
        }
      }
    },
    /**
     * 检查文件最小大小
     */
    checkSize(files) {
      for (let file of files) {
        if (this.hasMinSize && file.size < MIN_UPLOAD_FILE_SIZE) {
          const kbSize = Math.ceil(MIN_UPLOAD_FILE_SIZE / 1024);
          throw new Error(`上传图片必须大于${kbSize}KB`);
        }
        if (file.size > MAX_UPLOAD_FILE_SIZE) {
          const mbSize = Math.ceil(MAX_UPLOAD_FILE_SIZE / 1024 / 1024);
          throw new Error(`上传图片必须小于${mbSize}MB`);
        }
      }
    },
    checkTypes(files) {
      if (this.type === 'file') {
        return;
      }
      for (let file of files) {
        if (file.type.indexOf(`${this.type}`) !== 0) {
          throw new Error('上传文件类型错误!');
        }
      }
    },
    async uploadFiles(files) {
      const results = files.map(file => ({ file }));
      this.loading = true;
      // 为保证progress事件的url是按上传顺序触发, 此处不能并行上传
      for (let result of results) {
        await this.uploadFile(result);
      }
      this.loading = false;
      this.finishUpload(results);
    },
    async uploadFile(result) {
      try {
        let url;
        if (typeof result.file !== 'string') {
          url = await services.common.uploadByQiniu(result.file, this.qiniuConfig);
        } else {
          url = await services.common.uploadBase64ByQiniu(result.file, this.qiniuConfig);
        }
        if (this.multiple) {
          this.$emit('progress', url);
        }
        result.url = url;
      } catch (err) {
        result.error = err;
        this.$logger.warn(err);
      }
    },
    finishUpload(results) {
      const urls = [];
      const errors = [];
      results.forEach(result => {
        if (result.error) {
          errors.push(result.error);
        } else {
          urls.push(result.url || '');
        }
      });
      if (urls.length > 0) {
        if (this.multiple) {
          this.$emit('success', urls);
        } else {
          this.$emit('input', urls[0]);
          this.$emit('success', urls[0]);
        }
      }
      if (errors.length > 0) {
        if (this.multiple) {
          this.$emit('error', new Error(`${errors.length}个文件上传失败`));
        } else {
          this.$emit('error', new Error('文件上传失败'));
        }
      }
    }
  },
  async mounted() {
    if (!fetched) {
      fetched = true;
      try {
        await store.app.fetchQiniuConfig();
      } catch (err) {
        fetched = false;
      }
    }
  },
  beforeDestroy() {
    this.$refs.upload && this.$refs.upload.abort();
  }
};
</script>
<style lang="scss" module>
.upload {
  position: relative;
  display: inline-block;
  z-index: 2;
}
.file {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  line-height: 1;
  cursor: pointer;
  z-index: 99999;
  .disabled & {
    cursor: inherit;
  }
  input {
    display: block;
    position: absolute;
    width: 0;
    left: 0;
    top: -9999px;
    left: -9999px;
  }
}
.cropper {
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.preview {
  margin: 0 auto;
  background-color: #f7f7f7;
  margin-top: 30px;
  box-sizing: border-box;
  img {
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid #eee;
  }
}
.btn {
  display: block;
  width: 180px;
  height: 50px;
  margin: 30px auto 0;
}
</style>
