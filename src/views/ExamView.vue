<template>
  <div class="exam-container p-4 flex flex-col h-screen">
    <!-- 顶部导航栏 -->
    <div class="top-bar flex justify-between items-center mb-6">
      <button 
        @click="goBack" 
        class="back-btn flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        返回
      </button>
      
      <!-- 当前题目正确率 -->
      <div v-if="currentQuestion" class="question-stats px-3 py-1 rounded-full bg-gray-100 text-sm">
        <span class="text-gray-600">正确率: </span>
        <span :class="getCorrectRateClass(questionCorrectRate)" class="font-medium">
          {{ formatCorrectRate(questionCorrectRate) }}%
        </span>
      </div>
      
      <div class="flex items-center">
        <span class="mr-2 text-sm">显示中文翻译</span>
        <button 
          @click="toggleChinese" 
          class="toggle-btn w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out"
          :class="questionStore.showChinese ? 'bg-indigo-600' : 'bg-gray-300'"
        >
          <div 
            class="toggle-dot bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ease-in-out"
            :class="questionStore.showChinese ? 'translate-x-6' : ''"
          ></div>
        </button>
      </div>
    </div>
    
    <!-- 题集信息 -->
    <div v-if="currentSet" class="question-set-info mb-6">
      <h1 class="text-2xl font-bold mb-2">{{ currentChapter?.title }} - {{ currentSet.title }}</h1>
      <p class="text-gray-600">{{ currentSet.description }}</p>
      
      <!-- 进度信息 -->
      <div class="progress-info flex items-center mt-4">
        <div class="progress-bar bg-gray-200 h-2 flex-grow rounded-full overflow-hidden">
          <div 
            class="progress-fill bg-indigo-600 h-full" 
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
        <span class="ml-3 text-sm text-gray-600">
          {{ questionStore.currentQuestionIndex + 1 }} / {{ currentSet.questions.length }}
        </span>
      </div>
    </div>
    
    <!-- 内容区域：文章可滚动，问题固定 -->
    <div class="content-area flex-grow flex flex-col overflow-hidden">
      <!-- 阅读理解文章（可滚动区域） -->
      <div v-if="currentSet?.type === 'reading' && currentSet.article" class="article-container mb-4 bg-white rounded-lg shadow-md p-4 overflow-y-auto flex-shrink">
        <div class="article-header mb-4">
          <h2 class="text-xl font-semibold">{{ currentSet.article.title }}</h2>
          <h3 v-if="questionStore.showChinese && currentSet.article.titleCN" class="text-lg text-gray-600 mt-1">
            {{ currentSet.article.titleCN }}
          </h3>
        </div>
        
        <div class="article-content whitespace-pre-line">
          <p>{{ currentSet.article.content }}</p>
          <p v-if="questionStore.showChinese && currentSet.article.contentCN" class="text-gray-600 mt-4 border-t pt-4">
            {{ currentSet.article.contentCN }}
          </p>
        </div>
      </div>
      
      <!-- 问题区域（固定在底部） -->
      <div v-if="currentQuestion" class="question-container bg-white rounded-lg shadow-md p-4 mb-4 flex-shrink-0">
      <div class="question-text text-lg font-medium mb-4">
        <span>{{ currentQuestion.text }}</span>
        <p v-if="questionStore.showChinese && currentQuestion.textCN" class="text-gray-600 mt-1 text-base">
          {{ currentQuestion.textCN }}
        </p>
      </div>
      
      <!-- 选项列表 -->
      <div class="options-list space-y-3">
        <div 
          v-for="option in currentQuestion.options" 
          :key="option.id"
          class="option-item p-3 border rounded-lg cursor-pointer transition-colors"
          :class="getOptionClass(option.id)"
          @click="selectOption(option.id)"
        >
          <div class="flex items-start">
            <div class="option-marker w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                :class="getOptionMarkerClass(option.id)">
              <span v-if="selectedOptionId && option.id === currentQuestion.correctOptionId" class="text-white">
                ✓
              </span>
              <span v-else-if="selectedOptionId && option.id === selectedOptionId && option.id !== currentQuestion.correctOptionId" class="text-white">
                ✗
              </span>
              <span v-else>
                {{ option.id.slice(-1) }}
              </span>
            </div>
            <div>
              <div>{{ option.text }}</div>
              <div v-if="questionStore.showChinese && option.textCN" class="text-gray-600 text-sm mt-1">
                {{ option.textCN }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
      <!-- 答题结果 -->
      <div v-if="selectedOptionId" class="result-container mb-4 flex-shrink-0">
        <div 
          class="result-message p-4 rounded-lg mb-4" 
          :class="isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
        >
          <div class="font-medium">
            {{ isCorrect ? '回答正确！' : '回答错误！' }}
          </div>
          <div v-if="!isCorrect" class="mt-2">
            <span class="font-medium">正确答案：</span> 
            {{ getCorrectOptionText() }}
          </div>
          <div v-if="currentQuestion?.explanation" class="mt-2">
            <span class="font-medium">解析：</span> 
            {{ currentQuestion.explanation }}
          </div>
        </div>
        
        <div class="flex justify-between">
          <button 
            v-if="isLastQuestion"
            @click="finishQuestionSet"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            完成
          </button>
          <button 
            v-else
            @click="nextQuestion"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            下一题
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuestionStore } from '@/stores/question'
import { useRouter } from 'vue-router'
import { ref, computed, watch } from 'vue'
import type { Option } from '@/types/question'

const questionStore = useQuestionStore()
const router = useRouter()

// 当前选中的选项ID
const selectedOptionId = ref<string>('')
// 是否回答正确
const isCorrect = ref<boolean>(false)

// 计算属性
const currentChapter = computed(() => questionStore.currentChapter)
const currentSet = computed(() => questionStore.currentQuestionSet)
const currentQuestion = computed(() => questionStore.currentQuestion)

// 计算进度百分比
const progressPercentage = computed(() => {
  if (!currentSet.value) return 0
  return (questionStore.currentQuestionIndex / currentSet.value.questions.length) * 100
})

// 判断是否为最后一题
const isLastQuestion = computed(() => {
  if (!currentSet.value) return false
  return questionStore.currentQuestionIndex === currentSet.value.questions.length - 1
})

// 计算当前题目的正确率
const questionCorrectRate = computed(() => {
  if (!currentQuestion.value) return 0
  return questionStore.getQuestionCorrectRate(currentQuestion.value.id)
})

// 监听问题变化，重置选中状态
watch(currentQuestion, () => {
  selectedOptionId.value = ''
  isCorrect.value = false
})

// 选择选项
function selectOption(optionId: string) {
  // 如果已经选择了选项，不允许再次选择
  if (selectedOptionId.value) return
  
  selectedOptionId.value = optionId
  
  // 判断是否正确
  if (currentQuestion.value) {
    isCorrect.value = optionId === currentQuestion.value.correctOptionId
    
    // 记录答题结果
    questionStore.recordAnswer(
      currentQuestion.value.id,
      optionId,
      isCorrect.value
    )
  }
}

// 获取选项样式类
function getOptionClass(optionId: string): string {
  if (!selectedOptionId.value) {
    return 'hover:bg-gray-50 border-gray-200'
  }
  
  if (optionId === currentQuestion.value?.correctOptionId) {
    return 'border-green-500 bg-green-50'
  }
  
  if (optionId === selectedOptionId.value) {
    return 'border-red-500 bg-red-50'
  }
  
  return 'border-gray-200 opacity-70'
}

// 获取选项标记样式类
function getOptionMarkerClass(optionId: string): string {
  if (!selectedOptionId.value) {
    return 'bg-gray-200 text-gray-700'
  }
  
  if (optionId === currentQuestion.value?.correctOptionId) {
    return 'bg-green-500 text-white'
  }
  
  if (optionId === selectedOptionId.value) {
    return 'bg-red-500 text-white'
  }
  
  return 'bg-gray-200 text-gray-700'
}

// 获取正确选项文本
function getCorrectOptionText(): string {
  if (!currentQuestion.value) return ''
  
  const correctOption = currentQuestion.value.options.find(
    option => option.id === currentQuestion.value?.correctOptionId
  )
  
  return correctOption ? correctOption.text : ''
}

// 下一题
function nextQuestion() {
  // 先重置选中状态
  selectedOptionId.value = ''
  isCorrect.value = false
  
  // 移动到下一题
  questionStore.moveToNextQuestion()
}

// 完成题集
function finishQuestionSet() {
  // 检查当前题集是否全部做对
  const allCorrect = questionStore.isCurrentSetAllCorrect && questionStore.isCurrentSetAllCorrect()
  
  if (allCorrect) {
    // 如果全部做对，尝试移动到下一个题集
    const result = questionStore.moveToNextQuestionSet()
    
    if (result.success && !result.reset) {
      // 如果成功移动到下一个题集
      selectedOptionId.value = ''
      isCorrect.value = false
      console.log('全部做对，进入下一个题集:', questionStore.currentQuestionSet?.title)
    } else {
      // 如果没有下一个题集，但全部做对了，提示用户并重置当前题集
      questionStore.resetCurrentSetProgress()
      selectedOptionId.value = ''
      isCorrect.value = false
      console.log('已完成所有题集，重新开始当前题集')
    }
  } else {
    // 如果没有全部做对，重置当前题集
    questionStore.resetCurrentSetProgress()
    selectedOptionId.value = ''
    isCorrect.value = false
    console.log('未全部做对，重新开始当前题集，当前问题索引:', questionStore.currentQuestionIndex)
  }
  
  // 确保界面更新到第一题
  if (questionStore.currentQuestionIndex !== 0) {
    console.warn('问题索引未正确重置，强制设置为0')
    questionStore.currentQuestionIndex = 0
  }
}

// 返回
function goBack() {
  router.push('/')
}

// 切换中文显示
function toggleChinese() {
  questionStore.toggleChineseDisplay()
}

// 格式化正确率
function formatCorrectRate(rate: number): string {
  return rate.toFixed(1)
}

// 根据正确率获取样式类
function getCorrectRateClass(rate: number): string {
  if (rate === 0) return 'text-gray-500'
  if (rate < 60) return 'text-red-500'
  if (rate < 80) return 'text-yellow-500'
  return 'text-green-500'
}
</script>

<style scoped>
.exam-container {
  max-width: 1000px;
  margin: 0 auto;
}

.content-area {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 180px); /* 减去顶部导航栏和题集信息的高度 */
}

.article-container {
  max-height: 40vh; /* 文章区域最大高度为视口高度的40% */
  overflow-y: auto; /* 允许垂直滚动 */
}

.question-container {
  overflow-y: auto; /* 如果问题内容过长，允许滚动 */
  max-height: 40vh; /* 问题区域最大高度为视口高度的40% */
}

.option-item {
  transition: all 0.2s ease;
}

.option-item:hover:not(.selected) {
  border-color: #6366f1;
}

.article-content {
  line-height: 1.6;
}

/* 自定义滚动条样式 */
.article-container::-webkit-scrollbar,
.question-container::-webkit-scrollbar {
  width: 6px;
}

.article-container::-webkit-scrollbar-track,
.question-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.article-container::-webkit-scrollbar-thumb,
.question-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.article-container::-webkit-scrollbar-thumb:hover,
.question-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>