<template>
  <div class="max-w-4xl mx-auto min-h-screen w-full p-2 sm:p-4 flex flex-col h-screen">
    <!-- 顶部导航栏 -->
    <div class="flex justify-between items-center mb-4 sm:mb-6">
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
    <div v-if="currentSet" class="mb-4 sm:mb-6">
      <h1 class="text-xl sm:text-2xl font-bold mb-2">{{ currentChapter?.title }} - {{ currentSet.title }}</h1>
      <p class="text-gray-600 text-sm sm:text-base">{{ currentSet.description }}</p>
      
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
    
    <!-- 内容区域：动态布局，移动端全屏显示选项 -->
    <div class="flex-grow flex flex-col overflow-hidden pb-16 sm:pb-20 h-[calc(100vh-8.75rem)] sm:h-[calc(100vh-11.25rem)]">
      <!-- 阅读理解文章（桌面端显示，移动端隐藏） -->
      <div v-if="currentSet?.type === 'reading' && currentSet.article" class="hidden sm:block mb-4 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300" :class="{ 'max-h-96': isArticleExpanded, 'max-h-24': !isArticleExpanded }">
        <div class="p-4 pb-2 flex justify-between items-start cursor-pointer" @click="toggleArticle">
          <div class="flex-1">
            <h2 class="text-xl font-semibold">{{ currentSet.article.title }}</h2>
            <h3 v-if="questionStore.showChinese && currentSet.article.titleCN" class="text-lg text-gray-600 mt-1">
              {{ currentSet.article.titleCN }}
            </h3>
          </div>
          <button class="ml-2 p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform transition-transform duration-300" :class="{ 'rotate-180': isArticleExpanded }" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div class="overflow-hidden">
          <div class="whitespace-pre-line p-4 pt-0" :class="{ 'overflow-y-auto max-h-80': isArticleExpanded, 'overflow-hidden max-h-16 relative': !isArticleExpanded }">
            <p class="text-base leading-relaxed">{{ currentSet.article.content }}</p>
            <p v-if="questionStore.showChinese && currentSet.article.contentCN" class="text-gray-600 mt-4 border-t pt-4 text-base leading-relaxed">
              {{ currentSet.article.contentCN }}
            </p>
            <div v-if="!isArticleExpanded" class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
      
      <!-- 问题区域（动态高度） -->
      <div v-if="currentQuestion" class="bg-white rounded-lg shadow-md p-3 sm:p-4 mb-4 flex-grow flex flex-col overflow-hidden min-h-0">
      <div class="text-base sm:text-lg font-medium mb-4 flex-shrink-0">
        <span>{{ currentQuestion.text }}</span>
        <p v-if="questionStore.showChinese && currentQuestion.textCN" class="text-gray-600 mt-1 text-sm sm:text-base">
          {{ currentQuestion.textCN }}
        </p>
      </div>
      
      <!-- 选项列表 - 使用flex布局占领高度 -->
      <div class="flex flex-col flex-1 gap-2 sm:gap-3 overflow-y-auto">
        <div 
          v-for="option in currentQuestion.options" 
          :key="option.id"
          class="p-3 sm:p-4 border rounded-lg cursor-pointer transition-all duration-200 flex items-center min-h-[3rem] sm:min-h-[3.5rem] hover:border-indigo-500"
          :class="[getOptionClass(option.id), { 'hover:border-gray-200': selectedOptionId }]"
          @click="selectOption(option.id)"
        >
          <div class="flex items-start w-full">
            <div class="w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 transition-colors duration-200"
                :class="getOptionMarkerClass(option.id)">
              <span v-if="selectedOptionId && option.id === currentQuestion.correctOptionId" class="text-white text-sm">
                ✓
              </span>
              <span v-else-if="selectedOptionId && option.id === selectedOptionId && option.id !== currentQuestion.correctOptionId" class="text-white text-sm">
                ✗
              </span>
              <span v-else class="text-sm font-medium">
                {{ option.id.slice(-1) }}
              </span>
            </div>
            <div class="flex-1">
              <div class="text-sm sm:text-base leading-relaxed">{{ option.text }}</div>
              <div v-if="questionStore.showChinese && option.textCN" class="text-gray-600 text-xs sm:text-sm mt-1 leading-relaxed">
                {{ option.textCN }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
      <!-- 答题结果 -->
      <div v-if="selectedOptionId" class="fixed bottom-2  pb-24 flex-shrink-0 overflow-y-auto">
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
        
        <div class="flex justify-between fixed bottom-4 left-0 right-0 bg-white p-4 shadow-lg rounded-lg mx-4 z-50">
          <div class="flex items-center text-gray-500 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM6.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm7 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clip-rule="evenodd" />
            </svg>
            <span>点击鼠标右键进入下一题</span>
          </div>
          <button 
            v-if="isLastQuestion"
            @click="finishQuestionSet"
            class="px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base"
          >
            完成
          </button>
          <button 
            v-else
            @click="nextQuestion"
            class="px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base"
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
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { Option } from '@/types/question'

const questionStore = useQuestionStore()
const router = useRouter()

// 当前选中的选项ID
const selectedOptionId = ref<string>('')
// 是否回答正确
const isCorrect = ref<boolean>(false)
// 文章是否展开
const isArticleExpanded = ref<boolean>(false)

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

// 添加鼠标右键事件监听
function handleContextMenu(event: MouseEvent) {
  // 阻止默认的右键菜单
  event.preventDefault()
  
  // 如果已经选择了选项，则进入下一题
  if (selectedOptionId.value) {
    if (isLastQuestion.value) {
      finishQuestionSet()
    } else {
      nextQuestion()
    }
  }
}

// 组件挂载时添加鼠标右键事件监听
onMounted(() => {
  window.addEventListener('contextmenu', handleContextMenu)
})

// 组件卸载时移除鼠标右键事件监听
onUnmounted(() => {
  window.removeEventListener('contextmenu', handleContextMenu)
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
  console.log('完成题集开始，当前章节:', questionStore.currentChapterId, '当前题集:', questionStore.currentQuestionSetId)
  
  // 检查当前题集是否全部做对
  const allCorrect = questionStore.isCurrentSetAllCorrect && questionStore.isCurrentSetAllCorrect()
  console.log('当前题集是否全部做对:', allCorrect)
  
  if (allCorrect) {
    // 获取下一个题集信息（用于调试）
    const nextSet = questionStore.getNextQuestionSet()
    console.log('下一个题集信息:', nextSet)
    
    // 如果全部做对，尝试移动到下一个题集
    const result = questionStore.moveToNextQuestionSet()
    console.log('移动到下一个题集结果:', result)
    
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
  
  console.log('完成题集结束，当前章节:', questionStore.currentChapterId, '当前题集:', questionStore.currentQuestionSetId, '当前问题索引:', questionStore.currentQuestionIndex)
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

// 切换文章展开收起
function toggleArticle() {
  isArticleExpanded.value = !isArticleExpanded.value
}
</script>

<style scoped>
/* 自定义滚动条样式 - 无法用Tailwind替代的部分 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>