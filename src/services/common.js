import axios from 'axios';
import _ from 'lodash';

export async function qiniuConfig() {
  return await axios.get('/api/default/qiniu');
}

export async function uploadByQiniu(file, qiniuConfig) {
  const { token, origin } = qiniuConfig;
  const data = new FormData();
  data.append('file', file);
  data.append('token', token);
  const { key } = await axios.post('//up.qiniup.com', data, false);
  if (key) {
    return `${_.trimEnd(origin, '/')}/${key}`;
  }
}

export async function uploadBase64ByQiniu(dataURL, qiniuConfig) {
  const { token, origin } = qiniuConfig;
  const { key } = await axios.post('https://upload.qiniup.com/putb64/-1', dataURL, {
    headers: {
      'Content-Type': 'application/octet-stream',
      Authorization: `UpToken ${token}`
    }
  });
  if (key) {
    return `${_.trimEnd(origin, '/')}/${key}`;
  }
}
