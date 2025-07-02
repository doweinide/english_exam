<template>
  <div
    class="mx-auto flex h-screen min-h-screen w-full max-w-4xl flex-col p-2 sm:p-4"
  >
    <!-- 顶部导航栏 -->
    <div class="mb-4 flex items-center justify-between sm:mb-6">
      <button
        @click="goBack"
        class="back-btn flex items-center text-gray-600 transition-colors hover:text-gray-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mr-1 h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
        返回
      </button>

      <!-- 跳题模式按钮 -->
      <div class="relative">
        <button
          @click="toggleSkipMenu"
          data-skip-menu-button
          class="flex items-center rounded-lg px-3 py-1.5 text-sm transition-colors"
          :class="getSkipModeButtonClass()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-1 h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          {{ getSkipModeButtonText() }}
        </button>

        <!-- 跳题模式菜单 -->
        <div
          v-if="showSkipMenu"
          data-skip-menu-dropdown
          class="absolute left-0 top-full z-10 mt-1 min-w-48 rounded-lg border border-gray-200 bg-white shadow-lg"
        >
          <button
            @click="setSkipMode('off')"
            class="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-50"
            :class="skipMode === 'off' ? 'bg-blue-50 text-blue-700' : ''"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-2 h-4 w-4"
              :class="skipMode === 'off' ? 'text-blue-600' : 'text-gray-400'"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
            关闭跳题模式
          </button>
          <button
            @click="setSkipMode('reading')"
            class="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-50"
            :class="skipMode === 'reading' ? 'bg-green-50 text-green-700' : ''"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-2 h-4 w-4"
              :class="
                skipMode === 'reading' ? 'text-green-600' : 'text-gray-400'
              "
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            自动跳转阅读理解
          </button>
          <button
            @click="setSkipMode('cloze')"
            class="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-50"
            :class="skipMode === 'cloze' ? 'bg-blue-50 text-blue-700' : ''"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-2 h-4 w-4"
              :class="skipMode === 'cloze' ? 'text-blue-600' : 'text-gray-400'"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
            自动跳转完形填空
          </button>
          <button
            @click="setSkipMode('translation')"
            class="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-50"
            :class="
              skipMode === 'translation' ? 'bg-purple-50 text-purple-700' : ''
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-2 h-4 w-4"
              :class="
                skipMode === 'translation' ? 'text-purple-600' : 'text-gray-400'
              "
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.723 1.447a1 1 0 11-1.79-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z"
              />
            </svg>
            自动跳转英译汉
          </button>
        </div>
      </div>

      <!-- 当前题目正确率 -->
      <div
        v-if="currentQuestion"
        class="question-stats rounded-full bg-gray-100 px-3 py-1 text-sm"
      >
        <span class="text-gray-600">正确率: </span>
        <span
          :class="getCorrectRateClass(questionCorrectRate)"
          class="font-medium"
        >
          {{ formatCorrectRate(questionCorrectRate) }}%
        </span>
      </div>

      <div class="flex items-center">
        <span class="mr-2 text-sm">显示中文翻译</span>
        <button
          @click="toggleChinese"
          class="toggle-btn h-6 w-12 rounded-full p-1 transition-colors duration-200 ease-in-out"
          :class="questionStore.showChinese ? 'bg-indigo-600' : 'bg-gray-300'"
        >
          <div
            class="toggle-dot h-4 w-4 transform rounded-full bg-white shadow-md duration-200 ease-in-out"
            :class="questionStore.showChinese ? 'translate-x-6' : ''"
          ></div>
        </button>
      </div>
    </div>

    <!-- 题集信息 -->
    <div v-if="currentSet" class="mb-4 sm:mb-6">
      <h1 class="mb-2 text-xl font-bold sm:text-2xl">
        {{ currentChapter?.title }} - {{ currentSet.title }}
      </h1>
      <p class="text-sm text-gray-600 sm:text-base">
        {{ currentSet.description }}
      </p>

      <!-- 进度信息 -->
      <div class="progress-info mt-4 flex items-center">
        <div
          class="progress-bar h-2 flex-grow overflow-hidden rounded-full bg-gray-200"
        >
          <div
            class="progress-fill h-full bg-indigo-600"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
        <span class="ml-3 text-sm text-gray-600">
          {{ questionStore.currentQuestionIndex + 1 }} /
          {{ currentSet.questions.length }}
        </span>
      </div>
    </div>

    <!-- 内容区域：动态布局，移动端全屏显示选项 -->
    <div class=" ">
      <!-- 阅读理解文章（桌面端显示，移动端隐藏） -->
      <div
        v-if="currentSet?.type === 'reading' && currentSet.article"
        class="mb-4 hidden overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 sm:block"
        :class="{
          'max-h-96': isArticleExpanded,
          'max-h-24': !isArticleExpanded,
        }"
      >
        <div
          class="flex cursor-pointer items-start justify-between p-4 pb-2"
          @click="toggleArticle"
        >
          <div class="flex-1">
            <h2 class="text-xl font-semibold">
              {{ currentSet.article.title }}
            </h2>
            <h3
              v-if="questionStore.showChinese && currentSet.article.titleCN"
              class="mt-1 text-lg text-gray-600"
            >
              {{ currentSet.article.titleCN }}
            </h3>
          </div>
          <button
            class="ml-2 flex-shrink-0 rounded p-1 transition-colors hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 transform transition-transform duration-300"
              :class="{ 'rotate-180': isArticleExpanded }"
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
        </div>

        <div class="overflow-hidden">
          <div
            class="whitespace-pre-line p-4 pt-0"
            :class="{
              'max-h-80 overflow-y-auto': isArticleExpanded,
              'relative max-h-16 overflow-hidden': !isArticleExpanded,
            }"
          >
            <p class="text-base leading-relaxed">
              {{ currentSet.article.content }}
            </p>
            <p
              v-if="questionStore.showChinese && currentSet.article.contentCN"
              class="mt-4 border-t pt-4 text-base leading-relaxed text-gray-600"
            >
              {{ currentSet.article.contentCN }}
            </p>
            <div
              v-if="!isArticleExpanded"
              class="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"
            ></div>
          </div>
        </div>
      </div>

      <!-- 问题区域（动态高度） -->
      <div
        v-if="currentQuestion"
        class="mb-4 flex min-h-0 flex-grow flex-col overflow-hidden rounded-lg bg-white p-3 shadow-md sm:p-4"
      >
        <!-- 翻译题型特殊显示 -->
        <div
          v-if="currentQuestion.type === 'translation'"
          class="flex flex-grow flex-col"
        >
          <div class="mb-4 flex-shrink-0 text-base font-medium sm:text-lg">
            <div class="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
              <div class="mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-2 h-5 w-5 text-blue-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.723 1.447a1 1 0 11-1.79-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z"
                  />
                </svg>
                <span class="font-medium text-blue-800">英译汉练习</span>
              </div>
              <p class="text-sm text-blue-700">
                请将下面的英文翻译成中文，然后点击"显示答案"查看参考翻译
              </p>
            </div>
          </div>

          <div class="flex flex-grow flex-col">
            <div class="mb-4 flex-grow rounded-lg bg-gray-50 p-4">
              <h3 class="mb-2 text-sm text-gray-600">英文原文：</h3>
              <p class="text-base leading-relaxed text-gray-900 sm:text-lg">
                {{ currentQuestion.text }}
              </p>
            </div>

            <div
              v-if="showTranslationAnswer"
              class="mb-4 rounded-lg border-l-4 border-green-400 bg-green-50 p-4"
            >
              <h3 class="mb-2 text-sm font-medium text-green-700">
                参考翻译：
              </h3>
              <p class="text-base leading-relaxed text-green-800 sm:text-lg">
                {{ currentQuestion.textCN }}
              </p>
              <div
                v-if="currentQuestion.explanation"
                class="mt-3 border-t border-green-200 pt-3"
              >
                <h4 class="mb-1 text-sm font-medium text-green-700">解析：</h4>
                <p class="text-sm text-green-700">
                  {{ currentQuestion.explanation }}
                </p>
              </div>
            </div>

            <div class="mb-4 flex justify-center">
              <button
                v-if="!showTranslationAnswer"
                @click="showTranslationAnswer = true"
                class="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
              >
                显示答案
              </button>
              <button
                v-else
                @click="nextTranslationQuestion"
                class="rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700"
              >
                {{ isLastQuestion ? '完成练习' : '下一题' }}
              </button>
            </div>
          </div>
        </div>

        <!-- 非翻译题型的常规显示 -->
        <div v-else>
          <div class="mb-4 flex-shrink-0 text-base font-medium sm:text-lg">
            <span>{{ currentQuestion.text }}</span>
            <p
              v-if="questionStore.showChinese && currentQuestion.textCN"
              class="mt-1 text-sm text-gray-600 sm:text-base"
            >
              {{ currentQuestion.textCN }}
            </p>
          </div>

          <!-- 选项列表 - 使用flex布局占领高度 -->
          <div class="flex flex-col gap-2 overflow-y-auto sm:gap-3">
            <div
              v-for="option in currentQuestion.options"
              :key="option.id"
              class="flex min-h-[3rem] cursor-pointer items-center rounded-lg border p-3 transition-all duration-200 hover:border-indigo-500 sm:min-h-[3.5rem] sm:p-4"
              :class="[
                getOptionClass(option.id),
                { 'hover:border-gray-200': selectedOptionId },
              ]"
              @click="selectOption(option.id)"
            >
              <div class="flex w-full items-start">
                <div
                  class="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-200"
                  :class="getOptionMarkerClass(option.id)"
                >
                  <span
                    v-if="
                      selectedOptionId &&
                      option.id === currentQuestion.correctOptionId
                    "
                    class="text-sm text-white"
                  >
                    ✓
                  </span>
                  <span
                    v-else-if="
                      selectedOptionId &&
                      option.id === selectedOptionId &&
                      option.id !== currentQuestion.correctOptionId
                    "
                    class="text-sm text-white"
                  >
                    ✗
                  </span>
                  <span v-else class="text-sm font-medium">
                    {{ option.id.slice(-1) }}
                  </span>
                </div>
                <div class="flex-1">
                  <div class="text-sm leading-relaxed sm:text-base">
                    {{ option.text }}
                  </div>
                  <div
                    v-if="questionStore.showChinese && option.textCN"
                    class="mt-1 text-xs leading-relaxed text-gray-600 sm:text-sm"
                  >
                    {{ option.textCN }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 答题结果 -->
    <div v-if="selectedOptionId" class="flex-shrink-0 overflow-y-auto pb-24">
      <div
        class="result-message mb-4 rounded-lg p-4"
        :class="
          isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        "
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

      <div
        class="fixed bottom-4 left-0 right-0 z-50 mx-4 flex justify-between rounded-lg bg-white p-4 shadow-lg"
      >
        <div class="flex items-center text-sm text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-1 h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a8 8 0 100 16 8 8 0 000-16zM6.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm7 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              clip-rule="evenodd"
            />
          </svg>
          <span>点击鼠标右键或按→键进入下一题</span>
          <span v-if="canShowPreviousButton" class="ml-2">按←键返回上一题</span>
        </div>
        <div class="flex gap-2">
          <button
            v-if="canShowPreviousButton"
            @click="previousQuestion"
            class="rounded-lg bg-gray-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-gray-600 sm:px-4 sm:py-2 sm:text-base"
          >
            上一题
          </button>
          <button
            v-if="isLastQuestion"
            @click="finishQuestionSet"
            class="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm text-white transition-colors hover:bg-indigo-700 sm:px-4 sm:py-2 sm:text-base"
          >
            完成
          </button>
          <button
            v-else
            @click="nextQuestion"
            class="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm text-white transition-colors hover:bg-indigo-700 sm:px-4 sm:py-2 sm:text-base"
          >
            下一题
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useQuestionStore } from '@/stores/question';
  import { useRouter, useRoute } from 'vue-router';
  import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
  import type { Option } from '@/types/question';
  // 注意：不在这里直接导入 questionData，而是在需要时动态导入

  const questionStore = useQuestionStore();
  const router = useRouter();
  const route = useRoute();

  // 当前选中的选项ID
  const selectedOptionId = ref<string>('');
  // 是否回答正确
  const isCorrect = ref<boolean>(false);
  // 文章是否展开
  const isArticleExpanded = ref<boolean>(false);
  // 是否显示跳题菜单
  const showSkipMenu = ref<boolean>(false);
  // 跳题模式状态：'off' | 'reading' | 'cloze' | 'translation'
  const skipMode = ref<string>('off');
  // 是否显示翻译答案
  const showTranslationAnswer = ref<boolean>(false);

  // 计算属性
  const currentChapter = computed(() => questionStore.currentChapter);
  const currentSet = computed(() => questionStore.currentQuestionSet);
  const currentQuestion = computed(() => questionStore.currentQuestion);

  // 计算进度百分比
  const progressPercentage = computed(() => {
    if (!currentSet.value) return 0;
    return (
      (questionStore.currentQuestionIndex / currentSet.value.questions.length) *
      100
    );
  });

  // 判断是否为最后一题
  const isLastQuestion = computed(() => {
    if (!currentSet.value) return false;
    return (
      questionStore.currentQuestionIndex ===
      currentSet.value.questions.length - 1
    );
  });

  // 是否可以显示上一题按钮
  const canShowPreviousButton = computed(() => {
    return questionStore.currentQuestionIndex > 0;
  });

  // 计算当前题目的正确率
  const questionCorrectRate = computed(() => {
    if (!currentQuestion.value) return 0;
    return questionStore.getQuestionCorrectRate(currentQuestion.value.id);
  });

  // 监听问题变化，重置选中状态
  watch(currentQuestion, () => {
    selectedOptionId.value = '';
    isCorrect.value = false;
    showTranslationAnswer.value = false;
  });

  // 添加鼠标右键事件监听
  function handleContextMenu(event: MouseEvent) {
    // 阻止默认的右键菜单
    event.preventDefault();

    // 如果已经选择了选项，则进入下一题
    if (selectedOptionId.value) {
      if (isLastQuestion.value) {
        finishQuestionSet();
      } else {
        nextQuestion();
      }
    }
  }

  // 点击外部区域关闭跳题菜单
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const skipMenuButton = document.querySelector('[data-skip-menu-button]');
    const skipMenuDropdown = document.querySelector(
      '[data-skip-menu-dropdown]'
    );

    if (
      skipMenuButton &&
      skipMenuDropdown &&
      !skipMenuButton.contains(target) &&
      !skipMenuDropdown.contains(target)
    ) {
      showSkipMenu.value = false;
    }
  }

  // 处理键盘事件
  function handleKeyDown(event: KeyboardEvent) {
    // 左箭头键 - 上一题
    if (event.key === 'ArrowLeft' && canShowPreviousButton.value) {
      previousQuestion();
    }

    // 右箭头键 - 下一题或完成
    if (event.key === 'ArrowRight' && selectedOptionId.value) {
      if (isLastQuestion.value) {
        finishQuestionSet();
      } else {
        nextQuestion();
      }
    }
  }

  // 组件挂载时添加事件监听
  onMounted(() => {
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    // 从查询参数获取章节ID和题集ID
    const chapterId = route.query.chapterId as string;
    const questionSetId = route.query.questionSetId as string;

    if (chapterId && questionSetId) {
      console.log('从查询参数获取章节ID和题集ID:', chapterId, questionSetId);

      // 确保题库数据已加载
      if (questionStore.chapters.length === 0) {
        console.log('题库数据未加载，正在从 questionData 加载...');
        // 导入题库数据
        import('@/data/questionData')
          .then(({ questionData }) => {
            // 初始化题库数据
            questionStore.initQuestionData(questionData);
            console.log(
              '题库数据加载完成，章节数量:',
              questionStore.chapters.length
            );

            // 数据加载后再检查章节和题集
            loadChapterAndQuestionSet(chapterId, questionSetId);
          })
          .catch(error => {
            console.error('加载题库数据失败:', error);
            router.push('/');
          });
      } else {
        // 题库数据已加载，直接检查章节和题集
        loadChapterAndQuestionSet(chapterId, questionSetId);
      }
    } else {
      console.error('查询参数缺失，无法加载题目');
      router.push('/');
    }
  });

  // 加载章节和题集
  function loadChapterAndQuestionSet(chapterId: string, questionSetId: string) {
    // 检查章节是否存在
    const chapterExists = questionStore.chapters.some(
      chapter => chapter.id === chapterId
    );
    if (!chapterExists) {
      console.error(`章节 ${chapterId} 不存在`);
      router.push('/');
      return;
    }

    // 设置当前章节
    questionStore.setCurrentChapter(chapterId);

    // 检查题集是否存在
    const chapter = questionStore.chapters.find(
      chapter => chapter.id === chapterId
    );
    const questionSetExists = chapter?.questionSets.some(
      set => set.id === questionSetId
    );
    if (!questionSetExists) {
      console.error(`题集 ${questionSetId} 不存在于章节 ${chapterId} 中`);
      router.push('/');
      return;
    }

    // 设置当前题集
    questionStore.setCurrentQuestionSet(questionSetId);
    console.log('成功加载章节和题集:', chapterId, questionSetId);
  }

  // 组件卸载时移除事件监听
  onUnmounted(() => {
    window.removeEventListener('contextmenu', handleContextMenu);
    window.removeEventListener('click', handleClickOutside);
    window.removeEventListener('keydown', handleKeyDown);
  });

  // 选择选项
  function selectOption(optionId: string) {
    // 如果已经选择了选项，检查是否点击的是正确答案
    if (selectedOptionId.value) {
      // 如果点击的是正确答案，跳到下一题
      if (optionId === currentQuestion.value?.correctOptionId) {
        if (isLastQuestion.value) {
          finishQuestionSet();
        } else {
          nextQuestion();
        }
      }
      return;
    }

    selectedOptionId.value = optionId;

    // 判断是否正确
    if (currentQuestion.value) {
      isCorrect.value = optionId === currentQuestion.value.correctOptionId;

      // 记录答题结果
      questionStore.recordAnswer(
        currentQuestion.value.id,
        optionId,
        isCorrect.value
      );
    }
  }

  // 获取选项样式类
  function getOptionClass(optionId: string): string {
    if (!selectedOptionId.value) {
      return 'hover:bg-gray-50 border-gray-200';
    }

    if (optionId === currentQuestion.value?.correctOptionId) {
      return 'border-green-500 bg-green-50';
    }

    if (optionId === selectedOptionId.value) {
      return 'border-red-500 bg-red-50';
    }

    return 'border-gray-200 opacity-70';
  }

  // 获取选项标记样式类
  function getOptionMarkerClass(optionId: string): string {
    if (!selectedOptionId.value) {
      return 'bg-gray-200 text-gray-700';
    }

    if (optionId === currentQuestion.value?.correctOptionId) {
      return 'bg-green-500 text-white';
    }

    if (optionId === selectedOptionId.value) {
      return 'bg-red-500 text-white';
    }

    return 'bg-gray-200 text-gray-700';
  }

  // 获取正确选项文本
  function getCorrectOptionText(): string {
    if (!currentQuestion.value) return '';

    const correctOption = currentQuestion.value.options.find(
      option => option.id === currentQuestion.value?.correctOptionId
    );

    return correctOption ? correctOption.text : '';
  }

  // 下一题
  function nextQuestion() {
    // 先重置选中状态
    selectedOptionId.value = '';
    isCorrect.value = false;

    // 移动到下一题
    questionStore.moveToNextQuestion();
  }

  // 上一题
  function previousQuestion() {
    console.log(
      '开始执行上一题功能，当前题目索引:',
      questionStore.currentQuestionIndex
    );

    // 检查是否是第一题
    if (questionStore.currentQuestionIndex <= 0) {
      console.log('已经是第一题，无法返回上一题');
      return;
    }

    // 手动实现移动到上一题的逻辑
    questionStore.currentQuestionIndex -= 1;
    console.log(
      '移动到上一题，移动后题目索引:',
      questionStore.currentQuestionIndex
    );

    // 重置选中状态
    selectedOptionId.value = '';
    isCorrect.value = false;

    // 获取当前问题的最新答题记录（因为已经移动到上一题，所以currentQuestion.value已经是上一题了）
    if (currentQuestion.value) {
      const questionId = currentQuestion.value.id;
      console.log('当前问题ID:', questionId);

      const userAnswersForQuestion = questionStore.userAnswers
        .filter(answer => answer.questionId === questionId)
        .sort((a, b) => b.timestamp - a.timestamp); // 按时间戳降序排序

      console.log('找到的答题记录数量:', userAnswersForQuestion.length);

      // 如果有答题记录，恢复选中状态
      if (userAnswersForQuestion.length > 0) {
        const latestAnswer = userAnswersForQuestion[0];
        console.log('最新答题记录:', latestAnswer);
        selectedOptionId.value = latestAnswer.selectedOptionId;
        isCorrect.value = latestAnswer.isCorrect;
      } else {
        console.log('没有找到答题记录');
      }
    } else {
      console.log('当前问题为空');
    }
  }

  // 完成题集
  function finishQuestionSet() {
    console.log(
      '完成题集开始，当前章节:',
      questionStore.currentChapterId,
      '当前题集:',
      questionStore.currentQuestionSetId
    );

    // 检查当前题集是否全部做对
    const allCorrect =
      questionStore.isCurrentSetAllCorrect &&
      questionStore.isCurrentSetAllCorrect();
    console.log('当前题集是否全部做对:', allCorrect);

    if (allCorrect) {
      // 如果全部做对，根据跳题模式决定下一步
      if (
        skipMode.value === 'reading' ||
        skipMode.value === 'cloze' ||
        skipMode.value === 'translation'
      ) {
        // 跳题模式开启，查找指定类型的下一个题集
        const targetType = skipMode.value;
        const jumped = jumpToNextQuestionSetByType(targetType);

        if (jumped) {
          selectedOptionId.value = '';
          isCorrect.value = false;
          showTranslationAnswer.value = false;
          const typeNames = {
            reading: '阅读理解',
            cloze: '完形填空',
            translation: '英译汉',
          };
          console.log(
            `跳题模式：成功跳转到下一个${typeNames[targetType as keyof typeof typeNames]}题集`
          );
          return;
        } else {
          const typeNames = {
            reading: '阅读理解',
            cloze: '完形填空',
            translation: '英译汉',
          };
          console.log(
            `跳题模式：没有找到${typeNames[targetType as keyof typeof typeNames]}题集，使用默认逻辑`
          );
        }
      }

      // 默认逻辑：尝试移动到下一个题集
      const result = questionStore.moveToNextQuestionSet();
      console.log('移动到下一个题集结果:', result);

      if (result.success && !result.reset) {
        // 如果成功移动到下一个题集
        selectedOptionId.value = '';
        isCorrect.value = false;
        showTranslationAnswer.value = false;
        console.log(
          '全部做对，进入下一个题集:',
          questionStore.currentQuestionSet?.title
        );

        // 更新查询参数
        router.push(
          `/exam?chapterId=${questionStore.currentChapterId}&questionSetId=${questionStore.currentQuestionSetId}`
        );
      } else {
        // 如果没有下一个题集，但全部做对了，提示用户并重置当前题集
        questionStore.resetCurrentSetProgress();
        selectedOptionId.value = '';
        isCorrect.value = false;
        showTranslationAnswer.value = false;
        console.log('已完成所有题集，重新开始当前题集');
      }
    } else {
      // 如果没有全部做对，重置当前题集
      questionStore.resetCurrentSetProgress();
      selectedOptionId.value = '';
      isCorrect.value = false;
      showTranslationAnswer.value = false;
      console.log(
        '未全部做对，重新开始当前题集，当前问题索引:',
        questionStore.currentQuestionIndex
      );
    }

    // 确保界面更新到第一题
    if (questionStore.currentQuestionIndex !== 0) {
      console.warn('问题索引未正确重置，强制设置为0');
      questionStore.currentQuestionIndex = 0;
    }

    console.log(
      '完成题集结束，当前章节:',
      questionStore.currentChapterId,
      '当前题集:',
      questionStore.currentQuestionSetId,
      '当前问题索引:',
      questionStore.currentQuestionIndex
    );
  }

  // 返回
  function goBack() {
    router.push('/');
  }

  // 切换中文显示
  function toggleChinese() {
    questionStore.toggleChineseDisplay();
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

  // 切换文章展开收起
  function toggleArticle() {
    isArticleExpanded.value = !isArticleExpanded.value;
  }

  // 切换跳题菜单显示
  function toggleSkipMenu() {
    showSkipMenu.value = !showSkipMenu.value;
  }

  // 设置跳题模式
  function setSkipMode(mode: string) {
    skipMode.value = mode;
    showSkipMenu.value = false;
  }

  // 获取跳题模式按钮样式类
  function getSkipModeButtonClass(): string {
    switch (skipMode.value) {
      case 'reading':
        return 'bg-green-100 text-green-700 hover:bg-green-200';
      case 'cloze':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
      case 'translation':
        return 'bg-purple-100 text-purple-700 hover:bg-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
  }

  // 获取跳题模式按钮文本
  function getSkipModeButtonText(): string {
    switch (skipMode.value) {
      case 'reading':
        return '跳题模式: 阅读理解';
      case 'cloze':
        return '跳题模式: 完形填空';
      case 'translation':
        return '跳题模式: 英译汉';
      default:
        return '跳题模式: 关闭';
    }
  }

  // 翻译题型的下一题方法
  function nextTranslationQuestion() {
    // 记录答题结果 - 翻译题型默认为正确
    if (currentQuestion.value) {
      questionStore.recordAnswer(
        currentQuestion.value.id,
        'translation', // 翻译题型没有选项ID，使用固定值
        true // 翻译题型默认为正确
      );
    }

    if (isLastQuestion.value) {
      finishQuestionSet();
    } else {
      questionStore.moveToNextQuestion();
    }
  }

  // 根据类型跳转到下一个题集
  function jumpToNextQuestionSetByType(targetType: string): boolean {
    // 获取所有章节的所有题集
    const allQuestionSets: Array<{ chapterId: string; questionSet: any }> = [];
    questionStore.chapters.forEach(chapter => {
      chapter.questionSets.forEach(set => {
        allQuestionSets.push({
          chapterId: chapter.id,
          questionSet: set,
        });
      });
    });

    // 找到当前题集的位置
    const currentIndex = allQuestionSets.findIndex(
      item =>
        item.chapterId === questionStore.currentChapterId &&
        item.questionSet.id === questionStore.currentQuestionSetId
    );

    // 从当前位置开始查找下一个指定类型的题集
    for (let i = currentIndex + 1; i < allQuestionSets.length; i++) {
      if (allQuestionSets[i].questionSet.type === targetType) {
        // 找到下一个指定类型的题集，跳转过去
        const nextChapterId = allQuestionSets[i].chapterId;
        const nextSetId = allQuestionSets[i].questionSet.id;
        questionStore.setCurrentChapter(nextChapterId);
        questionStore.setCurrentQuestionSet(nextSetId);
        // 更新查询参数
        router.push(
          `/exam?chapterId=${nextChapterId}&questionSetId=${nextSetId}`
        );
        return true;
      }
    }

    // 如果没找到，从头开始查找第一个指定类型的题集
    for (let i = 0; i <= currentIndex; i++) {
      if (allQuestionSets[i].questionSet.type === targetType) {
        const nextChapterId = allQuestionSets[i].chapterId;
        const nextSetId = allQuestionSets[i].questionSet.id;
        questionStore.setCurrentChapter(nextChapterId);
        questionStore.setCurrentQuestionSet(nextSetId);
        // 更新查询参数
        router.push(
          `/exam?chapterId=${nextChapterId}&questionSetId=${nextSetId}`
        );
        return true;
      }
    }

    // 如果还是没找到，返回false
    return false;
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
