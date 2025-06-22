<template>
  <div class="english-exam-container p-4">
    <h1 class="text-2xl font-bold mb-6">英语刷题系统</h1>
    
    <!-- 章节列表 -->
    <div class="chapters-container">
      <div v-for="chapter in questionStore.chapters" :key="chapter.id" class="chapter-card mb-6 bg-white rounded-lg shadow-md p-4">
        <div class="chapter-header flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">{{ chapter.title }}</h2>
          <div class="chapter-stats text-sm">
            <span class="text-gray-600">总正确率: </span>
            <span :class="getCorrectRateClass(getChapterCorrectRate(chapter.id))">
              {{ formatCorrectRate(getChapterCorrectRate(chapter.id)) }}%
            </span>
          </div>
        </div>
        
        <p class="text-gray-600 mb-4">{{ chapter.description }}</p>
        
        <!-- 题集列表 -->
        <div class="question-sets grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            v-for="set in chapter.questionSets" 
            :key="set.id"
            class="question-set-card border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
            @click="startQuestionSet(chapter.id, set.id)"
          >
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-medium">{{ set.title }}</h3>
              <div class="question-set-type px-2 py-1 text-xs rounded-full" :class="{
                'bg-blue-100 text-blue-800': set.type === 'reading',
                'bg-green-100 text-green-800': set.type === 'cloze'
              }">
                {{ set.type === 'reading' ? '阅读理解' : '完形填空' }}
              </div>
            </div>
            
            <p class="text-gray-500 text-sm mb-2">{{ set.description }}</p>
            
            <div class="question-set-stats flex justify-between text-sm">
              <span>{{ set.questions.length }} 题</span>
              <div>
                <span class="text-gray-600">正确率: </span>
                <span :class="getCorrectRateClass(getSetCorrectRate(chapter.id, set.id))">
                  {{ formatCorrectRate(getSetCorrectRate(chapter.id, set.id)) }}%
                </span>
              </div>
            </div>
            
            <div class="mt-2 text-xs text-gray-500">
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
</template>

<script setup lang="ts">
import { useQuestionStore } from '@/stores/question'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { questionData } from '@/data/questionData'

const questionStore = useQuestionStore()
const router = useRouter()

onMounted(() => {
  // 初始化题库数据
  questionStore.initQuestionData(questionData)
})

// 开始做题
function startQuestionSet(chapterId: string, questionSetId: string) {
  questionStore.setCurrentChapter(chapterId)
  questionStore.setCurrentQuestionSet(questionSetId)
  router.push('/exam')
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
</script>

<style scoped>
.english-exam-container {
  max-width: 1200px;
  margin: 0 auto;
}

.chapter-card {
  transition: all 0.3s ease;
}

.chapter-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.question-set-card {
  transition: all 0.2s ease;
}

.question-set-card:hover {
  border-color: #4f46e5;
}
</style>