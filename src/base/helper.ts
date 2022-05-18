import { message } from 'ant-design-vue';
interface CheckConditon {
  format?: string[];
  size?: number;
}
type ErrorType = 'size' | 'format' | null;
export const commonUploadCheck = (file: File) => {
  const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 1 });
  const { passed, error } = result;
  if (error === 'format') {
    message.error('上传图片格式错误');
  }
  if (error === 'size') {
    message.error('上传大小不嫩超过1M');
  }
  return passed;
};

const beforeUploadCheck = (file: File, condition: CheckConditon) => {
  const { format, size } = condition;
  const isValidFormat = format ? format.includes(file.type) : true;
  const isValidSize = size ? file.size / 1024 / 1024 < size : true;
  let error: ErrorType = null;
  if (!isValidFormat) {
    error = 'format';
  }
  if (!isValidSize) {
    error = 'size';
  }
  return { passed: isValidFormat && isValidSize, error };
};
