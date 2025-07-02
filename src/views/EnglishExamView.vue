<template>
  <div class="english-exam-container p-4">
    <div class="mb-8 text-center">
      <h1 class="mb-2 text-3xl font-bold text-indigo-600">英语刷题系统</h1>
      <p class="text-gray-600">选择章节和题集开始练习，提高你的英语能力</p>
    </div>

    <!-- 搜索和筛选工具栏 -->
    <div
      class="filter-toolbar mb-6 flex flex-wrap items-center justify-between rounded-lg bg-white p-4 shadow"
    >
      <div class="search-box mb-3 w-full md:mb-0 md:w-1/3">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="搜索题集..."
            class="w-full rounded-lg border py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div class="filter-options flex space-x-2">
        <select
          v-model="typeFilter"
          class="rounded-lg border bg-white px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">所有类型</option>
          <option value="reading">阅读理解</option>
          <option value="cloze">完形填空</option>
          <option value="translation">英译汉</option>
        </select>

        <select
          v-model="sortOption"
          class="rounded-lg border bg-white px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="default">默认排序</option>
          <option value="correctRate">按正确率</option>
          <option value="lastAttempt">按最近练习</option>
        </select>
      </div>
    </div>

    <!-- 章节列表 -->
    <div class="chapters-container">
      <div v-if="paginatedChapters.length === 0" class="py-10 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mx-auto mb-4 h-16 w-16 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 class="mb-1 text-xl font-medium text-gray-700">未找到匹配的题集</h3>
        <p class="text-gray-500">请尝试调整搜索条件或筛选选项</p>
      </div>

      <div
        v-for="chapter in paginatedChapters"
        :key="chapter.id"
        class="chapter-card mb-8 rounded-lg border-t-4 border-indigo-500 bg-white p-6 shadow-lg"
      >
        <div class="chapter-header mb-4 flex items-center justify-between">
          <div class="flex items-center">
            <button
              @click="toggleChapter(chapter.id, $event)"
              class="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 transition-colors hover:bg-indigo-200 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 transition-transform duration-300"
                :class="{
                  'rotate-180 transform': !expandedChapters[chapter.id],
                }"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <h2 class="text-2xl font-semibold text-gray-800">
              {{ chapter.title }}
            </h2>
          </div>
          <div class="chapter-stats rounded-full bg-gray-100 px-3 py-1 text-sm">
            <span class="text-gray-600">总正确率: </span>
            <span
              :class="getCorrectRateClass(getChapterCorrectRate(chapter.id))"
              class="font-medium"
            >
              {{ formatCorrectRate(getChapterCorrectRate(chapter.id)) }}%
            </span>
          </div>
        </div>

        <p class="mb-6 text-gray-600">{{ chapter.description }}</p>

        <!-- 题集列表 -->
        <div
          class="question-sets-container"
          :style="{
            maxHeight: expandedChapters[chapter.id] ? '2000px' : '0',
            opacity: expandedChapters[chapter.id] ? 1 : 0,
            transform: expandedChapters[chapter.id]
              ? 'translateY(0)'
              : 'translateY(-10px)',
            overflow: 'hidden',
            transition: 'all 0.5s ease',
          }"
        >
          <div class="question-sets grid grid-cols-1 gap-6 md:grid-cols-2">
            <div
              v-for="set in chapter.questionSets"
              :key="set.id"
              class="question-set-card cursor-pointer rounded-lg border border-gray-200 bg-white p-4 transition-all duration-300 hover:translate-y-[-2px] hover:border-indigo-300 hover:shadow-md"
              @click="startQuestionSet(chapter.id, set.id)"
            >
              <div class="mb-3 flex items-center justify-between">
                <h3 class="text-lg font-medium text-gray-800">
                  {{ set.title }}
                </h3>
                <div
                  class="question-set-type rounded-full px-3 py-1 text-xs font-medium"
                  :class="{
                    'bg-blue-100 text-blue-800': set.type === 'reading',
                    'bg-green-100 text-green-800': set.type === 'cloze',
                    'bg-purple-100 text-purple-800': set.type === 'translation',
                  }"
                >
                  {{
                    set.type === 'reading'
                      ? '阅读理解'
                      : set.type === 'cloze'
                        ? '完形填空'
                        : '英译汉'
                  }}
                </div>
              </div>

              <p class="mb-3 text-sm text-gray-600">{{ set.description }}</p>

              <div
                class="mt-4 flex items-center justify-between border-t border-gray-100 pt-3"
              >
                <div class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-1 h-4 w-4 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fill-rule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-sm text-gray-600"
                    >{{ set.questions.length }} 题</span
                  >
                </div>
                <div>
                  <span class="text-sm text-gray-600">正确率: </span>
                  <span
                    :class="
                      getCorrectRateClass(getSetCorrectRate(chapter.id, set.id))
                    "
                    class="text-sm font-medium"
                  >
                    {{
                      formatCorrectRate(getSetCorrectRate(chapter.id, set.id))
                    }}%
                  </span>
                </div>
              </div>

              <div class="mt-2 flex items-center text-xs text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-1 h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span v-if="getLastAttemptDate(chapter.id, set.id)">
                  上次练习:
                  {{ formatDate(getLastAttemptDate(chapter.id, set.id)) }}
                </span>
                <span v-else>尚未练习</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页导航 -->
    <div
      v-if="totalPages > 1"
      class="pagination-container mb-4 mt-8 flex items-center justify-center space-x-2"
    >
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="pagination-btn rounded-md border px-3 py-1"
        :class="
          currentPage === 1
            ? 'cursor-not-allowed bg-gray-100 text-gray-400'
            : 'bg-white text-indigo-600 hover:bg-indigo-50'
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <template v-for="page in totalPages" :key="page">
        <button
          v-if="
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          "
          @click="changePage(page)"
          class="pagination-btn flex h-8 w-8 items-center justify-center rounded-md"
          :class="
            page === currentPage
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-indigo-600 hover:bg-indigo-50'
          "
        >
          {{ page }}
        </button>

        <span
          v-else-if="page === currentPage - 2 || page === currentPage + 2"
          class="text-gray-500"
        >
          ...
        </span>
      </template>

      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="pagination-btn rounded-md border px-3 py-1"
        :class="
          currentPage === totalPages
            ? 'cursor-not-allowed bg-gray-100 text-gray-400'
            : 'bg-white text-indigo-600 hover:bg-indigo-50'
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <!-- 显示筛选结果统计 -->
    <div class="results-stats mb-8 text-center text-gray-500">
      显示 {{ filteredChapters.length }} 个章节中的
      {{ paginatedChapters.length }} 个
      <span v-if="searchQuery || typeFilter !== 'all'">(已筛选)</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useQuestionStore } from '@/stores/question';
  import { useRouter } from 'vue-router';
  import { onMounted, ref, reactive, computed } from 'vue';
  import { questionData } from '@/data/questionData';
  import type { Chapter, QuestionSet } from '@/types/question';

  const questionStore = useQuestionStore();
  const router = useRouter();

  // 用于跟踪每个章节的展开/收起状态
  const expandedChapters = reactive<Record<string, boolean>>({});

  // 搜索和筛选状态
  const searchQuery = ref('');
  const typeFilter = ref('all');
  const sortOption = ref('default');
  const currentPage = ref(1);
  const chaptersPerPage = ref(3); // 每页显示的章节数

  // 计算属性：筛选后的章节列表
  const filteredChapters = computed(() => {
    // 首先筛选章节
    let result = [...questionStore.chapters];

    // 对每个章节的题集应用筛选
    result = result.map(chapter => {
      // 创建章节的深拷贝
      const chapterCopy = { ...chapter };

      // 筛选题集
      let filteredSets = [...chapter.questionSets];

      // 应用类型筛选
      if (typeFilter.value !== 'all') {
        filteredSets = filteredSets.filter(
          set => set.type === typeFilter.value
        );
      }

      // 应用搜索查询
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase();
        filteredSets = filteredSets.filter(
          set =>
            set.title.toLowerCase().includes(query) ||
            set.description.toLowerCase().includes(query)
        );
      }

      // 应用排序
      if (sortOption.value === 'correctRate') {
        filteredSets.sort((a, b) => {
          const rateA = getSetCorrectRate(chapter.id, a.id);
          const rateB = getSetCorrectRate(chapter.id, b.id);
          return rateB - rateA; // 降序排列
        });
      } else if (sortOption.value === 'lastAttempt') {
        filteredSets.sort((a, b) => {
          const dateA = getLastAttemptDate(chapter.id, a.id) || 0;
          const dateB = getLastAttemptDate(chapter.id, b.id) || 0;
          return dateB - dateA; // 降序排列，最近的在前
        });
      }

      // 更新章节的题集
      chapterCopy.questionSets = filteredSets;

      return chapterCopy;
    });

    // 过滤掉没有题集的章节
    result = result.filter(chapter => chapter.questionSets.length > 0);

    return result;
  });

  // 计算属性：分页后的章节列表
  const paginatedChapters = computed(() => {
    const startIndex = (currentPage.value - 1) * chaptersPerPage.value;
    return filteredChapters.value.slice(
      startIndex,
      startIndex + chaptersPerPage.value
    );
  });

  // 计算属性：总页数
  const totalPages = computed(() => {
    return Math.ceil(filteredChapters.value.length / chaptersPerPage.value);
  });

  // 切换页面
  function changePage(page: number) {
    currentPage.value = page;
    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  onMounted(() => {
    console.log('组件挂载，开始初始化数据');
    // 初始化题库数据
    questionStore.initQuestionData(questionData);

    // 确保数据加载后再初始化展开状态
    console.log('题库数据加载完成，章节数量:', questionStore.chapters.length);

    // 初始化所有章节为展开状态
    if (questionStore.chapters.length > 0) {
      questionStore.chapters.forEach(chapter => {
        console.log('初始化章节展开状态:', chapter.id);
        expandedChapters[chapter.id] = true;
      });

      // 根据章节数量调整每页显示的章节数
      if (questionStore.chapters.length <= 3) {
        chaptersPerPage.value = questionStore.chapters.length;
      } else {
        // 在移动设备上显示更少的章节
        const isMobile = window.innerWidth < 768;
        chaptersPerPage.value = isMobile ? 2 : 3;
      }
    } else {
      console.warn('没有找到章节数据');
    }

    // 监听窗口大小变化，调整每页显示的章节数
    window.addEventListener('resize', handleResize);
  });

  // 处理窗口大小变化
  function handleResize() {
    const isMobile = window.innerWidth < 768;
    chaptersPerPage.value = isMobile ? 2 : 3;

    // 确保当前页码有效
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value || 1;
    }
  }

  // 开始做题
  function startQuestionSet(chapterId: string, questionSetId: string) {
    questionStore.setCurrentChapter(chapterId);
    questionStore.setCurrentQuestionSet(questionSetId);
    router.push(`/exam?chapterId=${chapterId}&questionSetId=${questionSetId}`);
  }

  // 获取章节正确率
  function getChapterCorrectRate(chapterId: string): number {
    const progress = questionStore.chapterProgress[chapterId];
    return progress ? progress.totalCorrectRate * 100 : 0;
  }

  // 获取题集正确率
  function getSetCorrectRate(chapterId: string, setId: string): number {
    const progress =
      questionStore.chapterProgress[chapterId]?.questionSetProgress[setId];
    if (!progress || progress.completedQuestions === 0) return 0;
    return (progress.correctAnswers / progress.completedQuestions) * 100;
  }

  // 获取上次练习日期
  function getLastAttemptDate(
    chapterId: string,
    setId: string
  ): number | undefined {
    return questionStore.chapterProgress[chapterId]?.questionSetProgress[setId]
      ?.lastAttemptDate;
  }

  // 格式化正确率
  function formatCorrectRate(rate: number): string {
    return rate.toFixed(1);
  }

  // 根据正确率获取样式类
  function getCorrectRateClass(rate: number): string {
    if (rate === 0) return 'text-gray-500';
    if (rate < 60) return 'text-red-500';
    if (rate < 80) return 'text-yellow-500';
    return 'text-green-500';
  }

  // 格式化日期
  function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  }

  // 切换章节的展开/收起状态
  function toggleChapter(chapterId: string, event: Event) {
    // 阻止事件冒泡，避免触发题集的点击事件
    event.stopPropagation();

    // 获取当前状态
    const currentState = expandedChapters[chapterId];
    console.log('当前章节状态:', chapterId, currentState);

    // 切换状态
    expandedChapters[chapterId] = !currentState;

    // 记录新状态
    console.log('章节状态已切换为:', chapterId, expandedChapters[chapterId]);

    // 强制DOM更新
    setTimeout(() => {
      console.log('DOM更新后章节状态:', chapterId, expandedChapters[chapterId]);
    }, 0);
  }
</script>

<style scoped>
  .english-exam-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  /* 搜索和筛选工具栏样式 */
  .filter-toolbar {
    transition: all 0.3s ease;
    border: 1px solid rgba(229, 231, 235, 1);
  }

  .search-box input:focus {
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
  }

  .filter-options select {
    transition: all 0.2s ease;
  }

  .filter-options select:focus {
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
  }

  /* 章节卡片样式 */
  .chapter-card {
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .chapter-card:hover {
    transform: translateY(-3px);
    box-shadow:
      0 15px 30px -5px rgba(0, 0, 0, 0.1),
      0 10px 15px -5px rgba(0, 0, 0, 0.05);
  }

  .chapter-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(79, 70, 229, 0.05) 0%,
      transparent 100%
    );
    pointer-events: none;
  }

  .question-set-card {
    transition: all 0.3s ease;
    position: relative;
  }

  .question-set-card:hover {
    border-color: #4f46e5;
    box-shadow:
      0 10px 15px -3px rgba(79, 70, 229, 0.1),
      0 4px 6px -2px rgba(79, 70, 229, 0.05);
  }

  /* 展开/收起动画 */
  .question-sets-container {
    padding-top: 1rem;
    will-change: max-height, opacity, transform;
  }

  .question-sets {
    padding-bottom: 0.5rem;
  }

  /* 分页导航样式 */
  .pagination-container {
    user-select: none;
  }

  .pagination-btn {
    transition: all 0.2s ease;
  }

  .pagination-btn:not(:disabled):hover {
    transform: translateY(-1px);
  }

  .pagination-btn:not(:disabled):active {
    transform: translateY(0);
  }

  /* 响应式调整 */
  @media (max-width: 640px) {
    .filter-toolbar {
      flex-direction: column;
      align-items: stretch;
    }

    .search-box {
      margin-bottom: 1rem;
    }

    .filter-options {
      display: flex;
      justify-content: space-between;
    }

    .filter-options select {
      width: 48%;
    }

    .pagination-btn {
      width: 32px;
      height: 32px;
      font-size: 0.875rem;
    }
  }
</style>
