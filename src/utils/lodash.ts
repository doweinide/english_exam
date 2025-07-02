import {
  debounce,
  throttle,
  cloneDeep,
  merge,
  get,
  set,
  isEqual,
  isEmpty,
  isNil,
  omit,
  pick,
} from 'lodash';

// 防抖函数
export const useDebounce = debounce;

// 节流函数
export const useThrottle = throttle;

// 深拷贝
export const deepClone = cloneDeep;

// 对象合并
export const deepMerge = merge;

// 安全获取对象属性
export const getValue = get;

// 安全设置对象属性
export const setValue = set;

// 判断两个值是否相等
export const isDeepEqual = isEqual;

// 判断是否为空
export const checkEmpty = isEmpty;

// 判断是否为null或undefined
export const isNullOrUndefined = isNil;

// 排除对象中的某些属性
export const excludeProps = omit;

// 选取对象中的某些属性
export const pickProps = pick;

// 类型判断工具
export const typeUtils = {
  isArray: Array.isArray,
  isObject: (val: unknown): val is object =>
    val !== null && typeof val === 'object',
  isString: (val: unknown): val is string => typeof val === 'string',
  isNumber: (val: unknown): val is number => typeof val === 'number',
  isBoolean: (val: unknown): val is boolean => typeof val === 'boolean',
  isFunction: (val: unknown): val is Function => typeof val === 'function',
};

export default {
  useDebounce,
  useThrottle,
  deepClone,
  deepMerge,
  getValue,
  setValue,
  isDeepEqual,
  checkEmpty,
  isNullOrUndefined,
  excludeProps,
  pickProps,
  typeUtils,
};
