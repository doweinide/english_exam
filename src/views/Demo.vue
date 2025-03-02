<script setup lang="ts">
import { ref } from 'vue';
import { encrypt, decrypt, md5 } from '@/utils/crypto';
import {
  useDebounce,
  deepClone,
  checkEmpty,
  typeUtils,
  getValue,
  pickProps
} from '@/utils/lodash';

// 加密演示
const originalText = ref('');
const encryptedText = ref('');
const decryptedText = ref('');
const md5Text = ref('');

const handleEncrypt = () => {
  encryptedText.value = encrypt(originalText.value);
};

const handleDecrypt = () => {
  decryptedText.value = decrypt(encryptedText.value);
};

const handleMd5 = () => {
  md5Text.value = md5(originalText.value);
};

// Lodash 工具演示
const debouncedInput = ref('');
const handleDebounceInput = useDebounce((value: string) => {
  debouncedInput.value = value;
}, 500);

// 对象操作演示
const originalObject = {
  name: '张三',
  age: 25,
  email: 'zhangsan@example.com',
  address: {
    city: '北京',
    district: '朝阳区'
  }
};

const clonedObject = deepClone(originalObject);

// 类型判断演示
const typeChecks = {
  isArray: typeUtils.isArray([1, 2, 3]),
  isObject: typeUtils.isObject({}),
  isString: typeUtils.isString('test'),
  isNumber: typeUtils.isNumber(123),
};

// 对象属性获取演示
const nestedValue = getValue(originalObject, 'address.city', '默认值');

// 对象属性选择演示
const pickedProps = pickProps(originalObject, ['name', 'age']);
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-8 text-[red]">工具函数演示</h1>

    <!-- 加密解密演示 -->
    <section class="card mb-8">
      <h2 class="text-xl font-semibold mb-6 text-gray-700">加密解密演示</h2>
      <div class="space-y-6">
        <div>
          <label class="block mb-2 text-gray-600">原始文本：</label>
          <input
            v-model="originalText"
            type="text"
            class="input"
            placeholder="请输入要加密的文本"
          />
        </div>
        <div class="space-x-4">
          <button @click="handleEncrypt" class="btn btn-primary">加密</button>
          <button @click="handleMd5" class="btn btn-success">MD5</button>
        </div>
        <div v-if="encryptedText" class="bg-gray-50 p-4 rounded-lg">
          <p class="font-medium text-gray-700 mb-2">加密结果：</p>
          <p class="break-all text-gray-600">{{ encryptedText }}</p>
        </div>
        <div v-if="md5Text" class="bg-gray-50 p-4 rounded-lg">
          <p class="font-medium text-gray-700 mb-2">MD5结果：</p>
          <p class="text-gray-600">{{ md5Text }}</p>
        </div>
        <div v-if="encryptedText">
          <button @click="handleDecrypt" class="btn bg-purple-500 hover:bg-purple-600">解密</button>
          <div v-if="decryptedText" class="mt-4 bg-gray-50 p-4 rounded-lg">
            <p class="font-medium text-gray-700 mb-2">解密结果：</p>
            <p class="text-gray-600">{{ decryptedText }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Lodash工具演示 -->
    <section class="card">
      <h2 class="text-xl font-semibold mb-6 text-gray-700">Lodash工具演示</h2>
      
      <!-- 防抖输入 -->
      <div class="mb-8">
        <h3 class="font-medium mb-3 text-gray-600">防抖输入：</h3>
        <input
          type="text"
          @input="e => handleDebounceInput((e.target as HTMLInputElement).value)"
          class="input"
          placeholder="输入后500ms才会更新结果"
        />
        <p class="mt-2 text-gray-600">防抖结果：{{ debouncedInput }}</p>
      </div>

      <!-- 对象操作 -->
      <div class="mb-8">
        <h3 class="font-medium mb-3 text-gray-600">对象操作：</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="font-medium text-gray-700 mb-2">原始对象：</p>
            <pre class="text-gray-600">{{ originalObject }}</pre>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="font-medium text-gray-700 mb-2">深拷贝结果：</p>
            <pre class="text-gray-600">{{ clonedObject }}</pre>
          </div>
        </div>
      </div>

      <!-- 类型检查 -->
      <div class="mb-8">
        <h3 class="font-medium mb-3 text-gray-600">类型检查：</h3>
        <div class="bg-gray-50 p-4 rounded-lg">
          <pre class="text-gray-600">{{ typeChecks }}</pre>
        </div>
      </div>

      <!-- 对象属性操作 -->
      <div>
        <h3 class="font-medium mb-3 text-gray-600">对象属性操作：</h3>
        <div class="space-y-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="font-medium text-gray-700 mb-2">获取嵌套属性 (address.city)：</p>
            <p class="text-gray-600">{{ nestedValue }}</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="font-medium text-gray-700 mb-2">选择特定属性 (name, age)：</p>
            <pre class="text-gray-600">{{ pickedProps }}</pre>
          </div>
        </div>
      </div>
    </section>
  </div>
</template> 