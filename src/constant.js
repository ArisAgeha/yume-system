import defaultImg from '@/assets/images/default-img.jpg';

export const API_URL = location.origin;
export const DEFAULT_IMG_URL = defaultImg;

export const MAX_UPLOAD_FILE_SIZE = 5 * 1024 * 1024; // 最大上传尺寸
export const MIN_UPLOAD_FILE_SIZE = 100; // 最小上传图片尺寸
export const MAX_CROP_FILE_SIZE = 5 * 1024 * 1024; // 最大裁剪图片尺寸，防止浏览器卡死
export const MAX_UPLOAD_IMG_WIDTH = 2000; // 最大图片上传宽度
export const MAX_UPLOAD_IMG_HEIGHT = 20000; // 最大图片上传高度

export const QINIU_UPLOAD_URL = 'https://up.qiniup.com';
