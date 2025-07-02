import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type {
  Chapter,
  QuestionSet,
  Question,
  UserAnswer,
  QuestionSetProgress,
  ChapterProgress,
} from '@/types/question';

export const useQuestionStore = defineStore('question', () => {
  // 所有章节数据
  const chapters = ref<Chapter[]>([]);

  // 用户答题记录
  const userAnswers = ref<UserAnswer[]>([]);

  // 章节进度
  const chapterProgress = ref<Record<string, ChapterProgress>>({});

  // 当前选中的章节ID
  const currentChapterId = ref<string>('');

  // 当前选中的题集ID
  const currentQuestionSetId = ref<string>('');

  // 当前问题索引
  const currentQuestionIndex = ref<number>(0);

  // 是否显示中文翻译
  const showChinese = ref<boolean>(false);

  // 获取当前章节
  const currentChapter = computed(() => {
    return chapters.value.find(
      chapter => chapter.id === currentChapterId.value
    );
  });

  // 获取当前题集
  const currentQuestionSet = computed(() => {
    if (!currentChapter.value) return null;
    return currentChapter.value.questionSets.find(
      set => set.id === currentQuestionSetId.value
    );
  });

  // 获取当前问题
  const currentQuestion = computed(() => {
    if (!currentQuestionSet.value) return null;
    return (
      currentQuestionSet.value.questions[currentQuestionIndex.value] || null
    );
  });

  // 获取当前题集进度
  const currentSetProgress = computed(() => {
    if (!currentChapterId.value || !currentQuestionSetId.value) return null;
    return (
      chapterProgress.value[currentChapterId.value]?.questionSetProgress[
        currentQuestionSetId.value
      ] || null
    );
  });

  // 初始化题库数据
  function initQuestionData(data: Chapter[]) {
    chapters.value = data;

    // 从本地存储加载用户答题记录和进度
    const savedAnswers = localStorage.getItem('userAnswers');
    const savedProgress = localStorage.getItem('chapterProgress');

    if (savedAnswers) {
      userAnswers.value = JSON.parse(savedAnswers);
    }

    if (savedProgress) {
      chapterProgress.value = JSON.parse(savedProgress);
    } else {
      // 初始化进度数据
      initProgress();
    }
  }

  // 初始化进度数据
  function initProgress() {
    const progress: Record<string, ChapterProgress> = {};

    chapters.value.forEach(chapter => {
      const questionSetProgress: Record<string, QuestionSetProgress> = {};

      chapter.questionSets.forEach(set => {
        questionSetProgress[set.id] = {
          questionSetId: set.id,
          totalQuestions: set.questions.length,
          correctAnswers: 0,
          completedQuestions: 0,
        };
        console.log(`初始化题集进度: ${set.id}`, questionSetProgress[set.id]);
      });

      progress[chapter.id] = {
        chapterId: chapter.id,
        questionSetProgress,
        totalCorrectRate: 0,
      };
    });

    chapterProgress.value = progress;
    console.log('初始化所有章节进度完成:', chapterProgress.value);
    saveProgress();
  }

  // 保存进度到本地存储
  function saveProgress() {
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers.value));
    localStorage.setItem(
      'chapterProgress',
      JSON.stringify(chapterProgress.value)
    );
  }

  // 记录用户答案
  function recordAnswer(
    questionId: string,
    selectedOptionId: string,
    isCorrect: boolean
  ) {
    // 记录答题
    const answer: UserAnswer = {
      questionId,
      selectedOptionId,
      isCorrect,
      timestamp: Date.now(),
    };

    userAnswers.value.push(answer);

    // 更新进度
    if (currentChapterId.value && currentQuestionSetId.value) {
      const progress = chapterProgress.value[currentChapterId.value];
      if (!progress) {
        console.error('章节进度不存在:', currentChapterId.value);
        // 尝试初始化章节进度
        if (currentChapter.value) {
          chapterProgress.value[currentChapterId.value] = {
            chapterId: currentChapterId.value,
            questionSetProgress: {},
            totalCorrectRate: 0,
          };
          console.log(`重新初始化章节进度: ${currentChapterId.value}`);
        } else {
          return isCorrect;
        }
      }

      // 重新获取进度（可能刚刚初始化）
      const updatedProgress = chapterProgress.value[currentChapterId.value];

      // 检查题集进度
      let setProgress =
        updatedProgress.questionSetProgress[currentQuestionSetId.value];
      if (!setProgress) {
        console.error('题集进度不存在:', currentQuestionSetId.value);
        // 尝试初始化题集进度
        if (currentQuestionSet.value) {
          updatedProgress.questionSetProgress[currentQuestionSetId.value] = {
            questionSetId: currentQuestionSetId.value,
            totalQuestions: currentQuestionSet.value.questions.length,
            correctAnswers: 0,
            completedQuestions: 0,
          };
          console.log(
            `重新初始化题集进度: ${currentQuestionSetId.value}`,
            updatedProgress.questionSetProgress[currentQuestionSetId.value]
          );
          setProgress =
            updatedProgress.questionSetProgress[currentQuestionSetId.value];
        } else {
          return isCorrect;
        }
      }

      setProgress.completedQuestions += 1;
      if (isCorrect) {
        setProgress.correctAnswers += 1;
      }

      // 更新最后尝试时间
      setProgress.lastAttemptDate = Date.now();

      // 更新章节总正确率
      updateChapterCorrectRate(currentChapterId.value);

      saveProgress();
    }

    return isCorrect;
  }

  // 更新章节总正确率
  function updateChapterCorrectRate(chapterId: string) {
    const progress = chapterProgress.value[chapterId];
    if (!progress) {
      console.error('章节进度不存在:', chapterId);
      return;
    }

    let totalCorrect = 0;
    let totalCompleted = 0;

    Object.values(progress.questionSetProgress).forEach(setProgress => {
      totalCorrect += setProgress.correctAnswers;
      totalCompleted += setProgress.completedQuestions;
    });

    progress.totalCorrectRate =
      totalCompleted > 0 ? totalCorrect / totalCompleted : 0;
  }

  // 设置当前章节
  function setCurrentChapter(chapterId: string) {
    currentChapterId.value = chapterId;
    currentQuestionSetId.value = '';
    currentQuestionIndex.value = 0;
  }

  // 设置当前题集
  function setCurrentQuestionSet(questionSetId: string) {
    currentQuestionSetId.value = questionSetId;
    currentQuestionIndex.value = 0;
  }

  // 移动到下一题
  function moveToNextQuestion() {
    if (!currentQuestionSet.value) return false;

    if (
      currentQuestionIndex.value <
      currentQuestionSet.value.questions.length - 1
    ) {
      currentQuestionIndex.value += 1;
      return true;
    }

    return false; // 已经是最后一题
  }

  // 移动到上一题
  function moveToPreviousQuestion() {
    if (!currentQuestionSet.value) return false;

    if (currentQuestionIndex.value > 0) {
      currentQuestionIndex.value -= 1;
      return true;
    }

    return false; // 已经是第一题
  }

  // 获取下一个题集
  function getNextQuestionSet(): {
    chapterId: string;
    questionSetId: string;
  } | null {
    console.log(
      '开始获取下一个题集，当前章节:',
      currentChapterId.value,
      '当前题集:',
      currentQuestionSetId.value
    );

    if (!currentChapter.value) {
      console.error('当前章节不存在');
      return null;
    }

    // 获取当前章节中的所有题集
    const questionSets = currentChapter.value.questionSets;
    console.log(
      '当前章节包含题集数量:',
      questionSets.length,
      '题集列表:',
      questionSets.map(s => s.id)
    );

    // 找到当前题集在数组中的索引
    const currentSetIndex = questionSets.findIndex(
      set => set.id === currentQuestionSetId.value
    );
    console.log('当前题集索引:', currentSetIndex, '(从0开始计数)');

    // 如果找到了当前题集，并且不是最后一个题集
    if (currentSetIndex !== -1 && currentSetIndex < questionSets.length - 1) {
      // 返回同一章节中的下一个题集
      const nextSetId = questionSets[currentSetIndex + 1].id;
      console.log('找到同一章节中的下一个题集:', nextSetId);
      return {
        chapterId: currentChapterId.value,
        questionSetId: nextSetId,
      };
    }

    // 如果当前题集是当前章节的最后一个题集，尝试找下一个章节的第一个题集
    const chapterIndex = chapters.value.findIndex(
      chapter => chapter.id === currentChapterId.value
    );
    console.log(
      '当前章节索引:',
      chapterIndex,
      '总章节数:',
      chapters.value.length
    );

    if (chapterIndex !== -1 && chapterIndex < chapters.value.length - 1) {
      const nextChapter = chapters.value[chapterIndex + 1];
      console.log(
        '找到下一个章节:',
        nextChapter.id,
        '包含题集数量:',
        nextChapter.questionSets.length
      );

      if (nextChapter.questionSets.length > 0) {
        // 返回下一个章节的第一个题集
        const nextSetId = nextChapter.questionSets[0].id;
        console.log('找到下一个章节的第一个题集:', nextSetId);
        return {
          chapterId: nextChapter.id,
          questionSetId: nextSetId,
        };
      } else {
        console.log('下一个章节没有题集');
      }
    } else {
      console.log('已经是最后一个章节或章节不存在');
    }

    // 如果没有下一个题集，返回null
    console.log('没有找到下一个题集，返回null');
    return null;
  }

  // 检查当前题集是否全部做对
  function isCurrentSetAllCorrect(): boolean {
    if (!currentChapter.value || !currentQuestionSet.value) return false;

    // 获取当前题集的所有问题ID
    const questionIds = currentQuestionSet.value.questions.map(q => q.id);

    // 获取当前题集的最新答题记录（每个问题的最后一次回答）
    const latestAnswers = new Map<string, UserAnswer>();

    // 遍历所有答题记录，找出每个问题的最新回答
    userAnswers.value.forEach(answer => {
      if (questionIds.includes(answer.questionId)) {
        const existingAnswer = latestAnswers.get(answer.questionId);

        // 如果没有该问题的回答，或者当前回答比已存在的更新，则更新
        if (!existingAnswer || answer.timestamp > existingAnswer.timestamp) {
          latestAnswers.set(answer.questionId, answer);
        }
      }
    });

    // 检查是否所有问题都已回答，且全部正确
    if (latestAnswers.size !== questionIds.length) {
      // 有问题未回答
      return false;
    }

    // 检查是否所有回答都正确
    for (const answer of latestAnswers.values()) {
      if (!answer.isCorrect) {
        return false;
      }
    }

    return true;
  }

  // 移动到下一个题集
  function moveToNextQuestionSet(): { success: boolean; reset?: boolean } {
    // 检查当前题集是否全部做对
    if (!isCurrentSetAllCorrect()) {
      // 如果没有全部做对，重置当前题集进度并重新开始
      resetCurrentSetProgress();
      return { success: true, reset: true };
    }

    // 如果全部做对，移动到下一个题集
    const nextSet = getNextQuestionSet();

    if (nextSet) {
      // 在切换前，确保下一个题集的进度已初始化
      ensureProgressInitialized(nextSet.chapterId, nextSet.questionSetId);

      // 切换到下一个题集
      setCurrentChapter(nextSet.chapterId);
      setCurrentQuestionSet(nextSet.questionSetId);
      return { success: true, reset: false };
    }

    // 如果没有下一个题集，也返回成功但标记为重置
    return { success: true, reset: true };
  }

  // 确保章节和题集进度已初始化
  function ensureProgressInitialized(chapterId: string, questionSetId: string) {
    console.log(`尝试确保进度初始化: 章节=${chapterId}, 题集=${questionSetId}`);

    // 检查章节进度是否存在
    if (!chapterProgress.value[chapterId]) {
      console.log(`初始化缺失的章节进度: ${chapterId}`);
      chapterProgress.value[chapterId] = {
        chapterId: chapterId,
        questionSetProgress: {},
        totalCorrectRate: 0,
      };
    }

    // 检查题集进度是否存在
    if (!chapterProgress.value[chapterId].questionSetProgress[questionSetId]) {
      console.log(`题集进度不存在: ${questionSetId}，尝试初始化`);

      const chapter = chapters.value.find(c => c.id === chapterId);
      if (chapter) {
        console.log(
          `找到章节: ${chapterId}，包含 ${chapter.questionSets.length} 个题集`
        );
        const questionSet = chapter.questionSets.find(
          s => s.id === questionSetId
        );

        if (questionSet) {
          console.log(
            `找到题集: ${questionSetId}，包含 ${questionSet.questions.length} 个问题`
          );
          chapterProgress.value[chapterId].questionSetProgress[questionSetId] =
            {
              questionSetId: questionSetId,
              totalQuestions: questionSet.questions.length,
              correctAnswers: 0,
              completedQuestions: 0,
            };
          console.log(
            `成功初始化题集进度: ${questionSetId}`,
            chapterProgress.value[chapterId].questionSetProgress[questionSetId]
          );
        } else {
          console.error(
            `未找到题集: ${questionSetId}，可用题集:`,
            chapter.questionSets.map(s => s.id)
          );
        }
      } else {
        console.error(
          `未找到章节: ${chapterId}，可用章节:`,
          chapters.value.map(c => c.id)
        );
      }
    } else {
      console.log(
        `题集进度已存在: ${questionSetId}`,
        chapterProgress.value[chapterId].questionSetProgress[questionSetId]
      );
    }

    // 保存更新后的进度
    saveProgress();
  }

  // 重置当前题集进度（重新开始做题）
  function resetCurrentSetProgress() {
    if (!currentChapterId.value || !currentQuestionSetId.value) return;

    const progress = chapterProgress.value[currentChapterId.value];
    if (!progress) {
      console.error('章节进度不存在:', currentChapterId.value);
      return;
    }

    const setProgress =
      progress.questionSetProgress[currentQuestionSetId.value];
    if (!setProgress) {
      console.error('题集进度不存在:', currentQuestionSetId.value);
      // 如果题集进度不存在，尝试重新初始化
      if (currentQuestionSet.value) {
        progress.questionSetProgress[currentQuestionSetId.value] = {
          questionSetId: currentQuestionSetId.value,
          totalQuestions: currentQuestionSet.value.questions.length,
          correctAnswers: 0,
          completedQuestions: 0,
        };
        console.log(
          `重新初始化题集进度: ${currentQuestionSetId.value}`,
          progress.questionSetProgress[currentQuestionSetId.value]
        );
      } else {
        return;
      }
    }

    // 过滤掉当前题集的答题记录
    const currentSetQuestionIds =
      currentQuestionSet.value?.questions.map(q => q.id) || [];
    userAnswers.value = userAnswers.value.filter(
      answer => !currentSetQuestionIds.includes(answer.questionId)
    );

    // 重置进度
    setProgress.completedQuestions = 0;
    setProgress.correctAnswers = 0;

    // 更新章节总正确率
    updateChapterCorrectRate(currentChapterId.value);

    saveProgress();

    // 重置当前问题索引
    currentQuestionIndex.value = 0;
    console.log('重置题集进度完成，当前问题索引重置为0');
  }

  // 切换中文显示
  function toggleChineseDisplay() {
    showChinese.value = !showChinese.value;
  }

  // 获取题目的正确率
  function getQuestionCorrectRate(questionId: string): number {
    // 过滤出该题目的所有答题记录
    const questionAnswers = userAnswers.value.filter(
      answer => answer.questionId === questionId
    );

    // 如果没有答题记录，返回0
    if (questionAnswers.length === 0) return 0;

    // 计算正确的次数
    const correctCount = questionAnswers.filter(
      answer => answer.isCorrect
    ).length;

    // 返回正确率
    return (correctCount / questionAnswers.length) * 100;
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
    moveToPreviousQuestion,
    moveToNextQuestionSet,
    getNextQuestionSet,
    getQuestionCorrectRate,
    resetCurrentSetProgress,
    toggleChineseDisplay,
    isCurrentSetAllCorrect,
  };
});
