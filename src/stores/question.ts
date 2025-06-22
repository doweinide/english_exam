import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { 
  Chapter, 
  QuestionSet, 
  Question, 
  UserAnswer, 
  QuestionSetProgress,
  ChapterProgress 
} from '@/types/question'

export const useQuestionStore = defineStore('question', () => {
  // 所有章节数据
  const chapters = ref<Chapter[]>([])
  
  // 用户答题记录
  const userAnswers = ref<UserAnswer[]>([])
  
  // 章节进度
  const chapterProgress = ref<Record<string, ChapterProgress>>({})
  
  // 当前选中的章节ID
  const currentChapterId = ref<string>('')
  
  // 当前选中的题集ID
  const currentQuestionSetId = ref<string>('')
  
  // 当前问题索引
  const currentQuestionIndex = ref<number>(0)
  
  // 是否显示中文翻译
  const showChinese = ref<boolean>(false)
  
  // 获取当前章节
  const currentChapter = computed(() => {
    return chapters.value.find(chapter => chapter.id === currentChapterId.value)
  })
  
  // 获取当前题集
  const currentQuestionSet = computed(() => {
    if (!currentChapter.value) return null
    return currentChapter.value.questionSets.find(set => set.id === currentQuestionSetId.value)
  })
  
  // 获取当前问题
  const currentQuestion = computed(() => {
    if (!currentQuestionSet.value) return null
    return currentQuestionSet.value.questions[currentQuestionIndex.value] || null
  })
  
  // 获取当前题集进度
  const currentSetProgress = computed(() => {
    if (!currentChapterId.value || !currentQuestionSetId.value) return null
    return chapterProgress.value[currentChapterId.value]?.questionSetProgress[currentQuestionSetId.value] || null
  })
  
  // 初始化题库数据
  function initQuestionData(data: Chapter[]) {
    chapters.value = data
    
    // 从本地存储加载用户答题记录和进度
    const savedAnswers = localStorage.getItem('userAnswers')
    const savedProgress = localStorage.getItem('chapterProgress')
    
    if (savedAnswers) {
      userAnswers.value = JSON.parse(savedAnswers)
    }
    
    if (savedProgress) {
      chapterProgress.value = JSON.parse(savedProgress)
    } else {
      // 初始化进度数据
      initProgress()
    }
  }
  
  // 初始化进度数据
  function initProgress() {
    const progress: Record<string, ChapterProgress> = {}
    
    chapters.value.forEach(chapter => {
      const questionSetProgress: Record<string, QuestionSetProgress> = {}
      
      chapter.questionSets.forEach(set => {
        questionSetProgress[set.id] = {
          questionSetId: set.id,
          totalQuestions: set.questions.length,
          correctAnswers: 0,
          completedQuestions: 0
        }
      })
      
      progress[chapter.id] = {
        chapterId: chapter.id,
        questionSetProgress,
        totalCorrectRate: 0
      }
    })
    
    chapterProgress.value = progress
    saveProgress()
  }
  
  // 保存进度到本地存储
  function saveProgress() {
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers.value))
    localStorage.setItem('chapterProgress', JSON.stringify(chapterProgress.value))
  }
  
  // 记录用户答案
  function recordAnswer(questionId: string, selectedOptionId: string, isCorrect: boolean) {
    // 记录答题
    const answer: UserAnswer = {
      questionId,
      selectedOptionId,
      isCorrect,
      timestamp: Date.now()
    }
    
    userAnswers.value.push(answer)
    
    // 更新进度
    if (currentChapterId.value && currentQuestionSetId.value) {
      const progress = chapterProgress.value[currentChapterId.value]
      const setProgress = progress.questionSetProgress[currentQuestionSetId.value]
      
      setProgress.completedQuestions += 1
      if (isCorrect) {
        setProgress.correctAnswers += 1
      }
      
      // 更新最后尝试时间
      setProgress.lastAttemptDate = Date.now()
      
      // 更新章节总正确率
      updateChapterCorrectRate(currentChapterId.value)
      
      saveProgress()
    }
    
    return isCorrect
  }
  
  // 更新章节总正确率
  function updateChapterCorrectRate(chapterId: string) {
    const progress = chapterProgress.value[chapterId]
    let totalCorrect = 0
    let totalCompleted = 0
    
    Object.values(progress.questionSetProgress).forEach(setProgress => {
      totalCorrect += setProgress.correctAnswers
      totalCompleted += setProgress.completedQuestions
    })
    
    progress.totalCorrectRate = totalCompleted > 0 ? (totalCorrect / totalCompleted) : 0
  }
  
  // 设置当前章节
  function setCurrentChapter(chapterId: string) {
    currentChapterId.value = chapterId
    currentQuestionSetId.value = ''
    currentQuestionIndex.value = 0
  }
  
  // 设置当前题集
  function setCurrentQuestionSet(questionSetId: string) {
    currentQuestionSetId.value = questionSetId
    currentQuestionIndex.value = 0
  }
  
  // 移动到下一题
  function moveToNextQuestion() {
    if (!currentQuestionSet.value) return false
    
    if (currentQuestionIndex.value < currentQuestionSet.value.questions.length - 1) {
      currentQuestionIndex.value += 1
      return true
    }
    
    return false // 已经是最后一题
  }
  
  // 获取下一个题集
  function getNextQuestionSet(): { chapterId: string, questionSetId: string } | null {
    if (!currentChapter.value) return null
    
    // 获取当前章节中的所有题集
    const questionSets = currentChapter.value.questionSets
    
    // 找到当前题集在数组中的索引
    const currentSetIndex = questionSets.findIndex(set => set.id === currentQuestionSetId.value)
    
    // 如果找到了当前题集，并且不是最后一个题集
    if (currentSetIndex !== -1 && currentSetIndex < questionSets.length - 1) {
      // 返回同一章节中的下一个题集
      return {
        chapterId: currentChapterId.value,
        questionSetId: questionSets[currentSetIndex + 1].id
      }
    }
    
    // 如果当前题集是当前章节的最后一个题集，尝试找下一个章节的第一个题集
    const chapterIndex = chapters.value.findIndex(chapter => chapter.id === currentChapterId.value)
    
    if (chapterIndex !== -1 && chapterIndex < chapters.value.length - 1) {
      const nextChapter = chapters.value[chapterIndex + 1]
      if (nextChapter.questionSets.length > 0) {
        // 返回下一个章节的第一个题集
        return {
          chapterId: nextChapter.id,
          questionSetId: nextChapter.questionSets[0].id
        }
      }
    }
    
    // 如果没有下一个题集，返回null
    return null
  }
  
  // 移动到下一个题集
  function moveToNextQuestionSet(): boolean {
    const nextSet = getNextQuestionSet()
    
    if (nextSet) {
      setCurrentChapter(nextSet.chapterId)
      setCurrentQuestionSet(nextSet.questionSetId)
      return true
    }
    
    return false
  }
  
  // 重置当前题集进度（重新开始做题）
  function resetCurrentSetProgress() {
    if (!currentChapterId.value || !currentQuestionSetId.value) return
    
    const progress = chapterProgress.value[currentChapterId.value]
    const setProgress = progress.questionSetProgress[currentQuestionSetId.value]
    
    // 过滤掉当前题集的答题记录
    const currentSetQuestionIds = currentQuestionSet.value?.questions.map(q => q.id) || []
    userAnswers.value = userAnswers.value.filter(answer => !currentSetQuestionIds.includes(answer.questionId))
    
    // 重置进度
    setProgress.completedQuestions = 0
    setProgress.correctAnswers = 0
    
    // 更新章节总正确率
    updateChapterCorrectRate(currentChapterId.value)
    
    saveProgress()
    
    // 重置当前问题索引
    currentQuestionIndex.value = 0
  }
  
  // 切换中文显示
  function toggleChineseDisplay() {
    showChinese.value = !showChinese.value
  }
  
  // 获取题目的正确率
  function getQuestionCorrectRate(questionId: string): number {
    // 过滤出该题目的所有答题记录
    const questionAnswers = userAnswers.value.filter(answer => answer.questionId === questionId)
    
    // 如果没有答题记录，返回0
    if (questionAnswers.length === 0) return 0
    
    // 计算正确的次数
    const correctCount = questionAnswers.filter(answer => answer.isCorrect).length
    
    // 返回正确率
    return (correctCount / questionAnswers.length) * 100
  }
  
  return { 
    chapters,
    userAnswers,
    chapterProgress,
    currentChapterId,
    currentQuestionSetId,
    currentQuestionIndex,
    showChinese,
    currentChapter,
    currentQuestionSet,
    currentQuestion,
    currentSetProgress,
    initQuestionData,
    recordAnswer,
    setCurrentChapter,
    setCurrentQuestionSet,
    moveToNextQuestion,
    moveToNextQuestionSet,
    getNextQuestionSet,
    getQuestionCorrectRate,
    resetCurrentSetProgress,
    toggleChineseDisplay
  }
})