<template>
  <div class="english-exam-container p-4">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-indigo-600 mb-2">英语刷题系统</h1>
      <p class="text-gray-600">选择章节和题集开始练习，提高你的英语能力</p>
    </div>
    
    <!-- 章节列表 -->
    <div class="chapters-container">
      <div v-for="chapter in questionStore.chapters" :key="chapter.id" class="chapter-card mb-8 bg-white rounded-lg shadow-lg p-6 border-t-4 border-indigo-500">
        <div class="chapter-header flex justify-between items-center mb-4">
          <div class="flex items-center">
            <button 
              @click="toggleChapter(chapter.id, $event)" 
              class="mr-2 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center focus:outline-none hover:bg-indigo-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-300" :class="{ 'transform rotate-180': !expandedChapters[chapter.id] }" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            <h2 class="text-2xl font-semibold text-gray-800">{{ chapter.title }}</h2>
          </div>
          <div class="chapter-stats px-3 py-1 rounded-full bg-gray-100 text-sm">
            <span class="text-gray-600">总正确率: </span>
            <span :class="getCorrectRateClass(getChapterCorrectRate(chapter.id))" class="font-medium">
              {{ formatCorrectRate(getChapterCorrectRate(chapter.id)) }}%
            </span>
          </div>
        </div>
        
        <p class="text-gray-600 mb-6">{{ chapter.description }}</p>
        
        <!-- 题集列表 -->
        <div class="question-sets-container" :style="{ maxHeight: expandedChapters[chapter.id] ? '2000px' : '0', opacity: expandedChapters[chapter.id] ? 1 : 0, transform: expandedChapters[chapter.id] ? 'translateY(0)' : 'translateY(-10px)', overflow: 'hidden', transition: 'all 0.5s ease' }">
          <div class="question-sets grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              v-for="set in chapter.questionSets" 
              :key="set.id"
              class="question-set-card bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer transition-all duration-300 hover:border-indigo-300 hover:translate-y-[-2px]"
              @click="startQuestionSet(chapter.id, set.id)"
            >
            <div class="flex justify-between items-center mb-3">
              <h3 class="text-lg font-medium text-gray-800">{{ set.title }}</h3>
              <div class="question-set-type px-3 py-1 text-xs font-medium rounded-full" :class="{
                'bg-blue-100 text-blue-800': set.type === 'reading',
                'bg-green-100 text-green-800': set.type === 'cloze',
                'bg-purple-100 text-purple-800': set.type === 'translation'
              }">
                {{ set.type === 'reading' ? '阅读理解' : set.type === 'cloze' ? '完形填空' : '英译汉' }}
              </div>
            </div>
            
            <p class="text-gray-600 text-sm mb-3">{{ set.description }}</p>
            
            <div class="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm text-gray-600">{{ set.questions.length }} 题</span>
              </div>
              <div>
                <span class="text-gray-600 text-sm">正确率: </span>
                <span :class="getCorrectRateClass(getSetCorrectRate(chapter.id, set.id))" class="font-medium text-sm">
                  {{ formatCorrectRate(getSetCorrectRate(chapter.id, set.id)) }}%
                </span>
              </div>
            </div>
            
            <div class="mt-2 text-xs text-gray-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
              <span v-if="getLastAttemptDate(chapter.id, set.id)">
                上次练习: {{ formatDate(getLastAttemptDate(chapter.id, set.id)) }}
              </span>
              <span v-else>尚未练习</span>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuestionStore } from '@/stores/question'
import { useRouter } from 'vue-router'
import { onMounted, ref, reactive } from 'vue'
import { questionData } from '@/data/questionData'

const questionStore = useQuestionStore()
const router = useRouter()

// 用于跟踪每个章节的展开/收起状态
const expandedChapters = reactive<Record<string, boolean>>({})

// 初始化所有章节为展开状态
onMounted(() => {
  console.log('组件挂载，开始初始化数据')
  // 初始化题库数据
  questionStore.initQuestionData(questionData)
  
  // 确保数据加载后再初始化展开状态
  console.log('题库数据加载完成，章节数量:', questionStore.chapters.length)
  
  // 初始化所有章节为展开状态
  if (questionStore.chapters.length > 0) {
    questionStore.chapters.forEach(chapter => {
      console.log('初始化章节展开状态:', chapter.id)
      expandedChapters[chapter.id] = true
    })
  } else {
    console.warn('没有找到章节数据')
  }
})

// 开始做题
function startQuestionSet(chapterId: string, questionSetId: string) {
  questionStore.setCurrentChapter(chapterId)
  questionStore.setCurrentQuestionSet(questionSetId)
  router.push(`/exam?chapterId=${chapterId}&questionSetId=${questionSetId}`)
}

// 获取章节正确率
function getChapterCorrectRate(chapterId: string): number {
  const progress = questionStore.chapterProgress[chapterId]
  return progress ? progress.totalCorrectRate * 100 : 0
}

// 获取题集正确率
function getSetCorrectRate(chapterId: string, setId: string): number {
  const progress = questionStore.chapterProgress[chapterId]?.questionSetProgress[setId]
  if (!progress || progress.completedQuestions === 0) return 0
  return (progress.correctAnswers / progress.completedQuestions) * 100
}

// 获取上次练习日期
function getLastAttemptDate(chapterId: string, setId: string): number | undefined {
  return questionStore.chapterProgress[chapterId]?.questionSetProgress[setId]?.lastAttemptDate
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

// 格式化日期
function formatDate(timestamp: number): string {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
}

// 切换章节的展开/收起状态
function toggleChapter(chapterId: string, event: Event) {
  // 阻止事件冒泡，避免触发题集的点击事件
  event.stopPropagation()
  
  // 获取当前状态
  const currentState = expandedChapters[chapterId]
  console.log('当前章节状态:', chapterId, currentState)
  
  // 切换状态
  expandedChapters[chapterId] = !currentState
  
  // 记录新状态
  console.log('章节状态已切换为:', chapterId, expandedChapters[chapterId])
  
  // 强制DOM更新
  setTimeout(() => {
    console.log('DOM更新后章节状态:', chapterId, expandedChapters[chapterId])
  }, 0)
}
</script>

<style scoped>
.english-exam-container {
  max-width: 1200px;
  margin: 0 auto;
}

.chapter-card {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.chapter-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.05);
}

.chapter-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(79, 70, 229, 0.05) 0%, transparent 100%);
  pointer-events: none;
}

.question-set-card {
  transition: all 0.3s ease;
  position: relative;
}

.question-set-card:hover {
  border-color: #4f46e5;
  box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.1), 0 4px 6px -2px rgba(79, 70, 229, 0.05);
}

/* 展开/收起动画 */
.question-sets-container {
  padding-top: 1rem;
  will-change: max-height, opacity, transform;
}

.question-sets {
  padding-bottom: 0.5rem;
}
</style>