import { DEFAULT_IMG_URL } from '@/constant';

export function checkJson(data, defaultValue = {}) {
  if (data === null || typeof data !== 'object') {
    if (!data) {
      data = defaultValue;
    }
    else {
      try {
        data = JSON.parse(data) || defaultValue;
        if (typeof data !== 'object') {
          data = defaultValue;
        }
      }
      catch(e) {
        data = defaultValue;
      }
    }
  }
  return data;
}

export function thumb(url, options) {
  const defaultOptions = {
    func: 'imageView2',
    mode: '',
    width: '',
    height: '',
    q: '70'
  };
  options = { ...defaultOptions, ...options };
  options || (options = {});
  if (!url) {
    return DEFAULT_IMG_URL;
  }
  url = String(url);
  if (isQiniuUrl(url)) {
    url = url.replace(/\?.*$/, '');
    let type = options.width && options.height ? 1 : 2;
    if (options.mode) {
      type = options.mode;
    }
    const width = options.width ? `/w/${options.width}` : '';
    const height = options.height ? `/h/${options.height}` : '';
    return `${url}?${options.func}/${type}/q/${options.q}${width}${height}`;
  }
  else if (/https?:\/\/wx\.qlogo\.cn/.test(url)) {
    let size = Number(options.width) || Number(options.height) || 0;
    const sizes = [0, 96, 132];
    for (const val of sizes) {
      if (size <= val) {
        size = val;
        break;
      }
    }
    if (!size) {
      size = 0;
    }
    if (size > sizes[sizes.length - 1]) {
      size = sizes[sizes.length - 1];
    }
    return url.replace(/^(.+)\/\d*$/, `$1/${size}`);
  }
  return url;
}

function isQiniuUrl(url) {
  const hosts = [/\.qiniudn\.com/];
  return hosts.some(match => url.search(match) !== -1);
}

export function isPhone(phone) {
  return /^1\d{10}$/.test(phone);
}

export function isEmail(mail) {
  return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(mail);
}

export function getScrollWidth() {
  const div = document.createElement('div');
  div.style.cssText = 'position:absolute;top:-1000px;width:100px;height:100px; overflow:hidden;';
  const noScrollWidth = document.body.appendChild(div).clientWidth;
  div.style.overflowY = 'scroll';
  const scrollWidth = div.clientWidth;
  document.body.removeChild(div);
  return noScrollWidth - scrollWidth;
}
