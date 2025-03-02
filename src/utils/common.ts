/**
 * 日期格式化
 * @param date 日期
 * @param fmt 格式
 */
export function formatDate(date: Date | string | number, fmt = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) return '';
  const d = new Date(date);
  const o: { [key: string]: number } = {
    'M+': d.getMonth() + 1,
    'D+': d.getDate(),
    'H+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds(),
    'q+': Math.floor((d.getMonth() + 3) / 3),
    S: d.getMilliseconds(),
  };
  
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k].toString() : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
}

/**
 * 金额格式化
 * @param amount 金额
 * @param decimals 小数位数
 */
export function formatAmount(amount: number | string, decimals = 2) {
  if (!amount) return '0.00';
  return Number(amount).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 文件大小格式化
 * @param bytes 字节数
 */
export function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 生成UUID
 */
export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 */
export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

/**
 * 下载文件
 * @param url 文件地址
 * @param filename 文件名
 */
export function downloadFile(url: string, filename?: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || url.substring(url.lastIndexOf('/') + 1);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * 获取图片的Base64
 * @param file 图片文件
 */
export function getBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

/**
 * 防抖函数
 * @param fn 要执行的函数
 * @param delay 延迟时间
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let timer: number;
  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * 节流函数
 * @param fn 要执行的函数
 * @param limit 限制时间
 */
export function throttle<T extends (...args: any[]) => any>(fn: T, limit: number) {
  let inThrottle: boolean;
  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
} 