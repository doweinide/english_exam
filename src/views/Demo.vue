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
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">工具函数演示</h1>

    <!-- 加密解密演示 -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">加密解密演示</h2>
      <div class="space-y-4">
        <div>
          <label class="block mb-2">原始文本：</label>
          <input
            v-model="originalText"
            type="text"
            class="border p-2 rounded w-full"
            placeholder="请输入要加密的文本"
          />
        </div>
        <div class="space-x-4">
          <button
            @click="handleEncrypt"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            加密
          </button>
          <button
            @click="handleMd5"
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            MD5
          </button>
        </div>
        <div v-if="encryptedText" class="bg-gray-100 p-4 rounded">
          <p class="font-medium">加密结果：</p>
          <p class="break-all">{{ encryptedText }}</p>
        </div>
        <div v-if="md5Text" class="bg-gray-100 p-4 rounded">
          <p class="font-medium">MD5结果：</p>
          <p>{{ md5Text }}</p>
        </div>
        <div v-if="encryptedText">
          <button
            @click="handleDecrypt"
            class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            解密
          </button>
          <div v-if="decryptedText" class="mt-4 bg-gray-100 p-4 rounded">
            <p class="font-medium">解密结果：</p>
            <p>{{ decryptedText }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Lodash工具演示 -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Lodash工具演示</h2>
      
      <!-- 防抖输入 -->
      <div class="mb-6">
        <h3 class="font-medium mb-2">防抖输入：</h3>
        <input
          type="text"
          @input="e => handleDebounceInput((e.target as HTMLInputElement).value)"
          class="border p-2 rounded w-full"
          placeholder="输入后500ms才会更新结果"
        />
        <p class="mt-2">防抖结果：{{ debouncedInput }}</p>
      </div>

      <!-- 对象操作 -->
      <div class="mb-6">
        <h3 class="font-medium mb-2">对象操作：</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-100 p-4 rounded">
            <p class="font-medium">原始对象：</p>
            <pre>{{ originalObject }}</pre>
          </div>
          <div class="bg-gray-100 p-4 rounded">
            <p class="font-medium">深拷贝结果：</p>
            <pre>{{ clonedObject }}</pre>
          </div>
        </div>
      </div>

      <!-- 类型检查 -->
      <div class="mb-6">
        <h3 class="font-medium mb-2">类型检查：</h3>
        <div class="bg-gray-100 p-4 rounded">
          <pre>{{ typeChecks }}</pre>
        </div>
      </div>

      <!-- 对象属性操作 -->
      <div class="mb-6">
        <h3 class="font-medium mb-2">对象属性操作：</h3>
        <div class="space-y-4">
          <div class="bg-gray-100 p-4 rounded">
            <p class="font-medium">获取嵌套属性 (address.city)：</p>
            <p>{{ nestedValue }}</p>
          </div>
          <div class="bg-gray-100 p-4 rounded">
            <p class="font-medium">选择特定属性 (name, age)：</p>
            <pre>{{ pickedProps }}</pre>
          </div>
        </div>
      </div>
    </section>
  </div>
</template> 