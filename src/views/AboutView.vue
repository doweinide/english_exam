<template>
  <div class="about-container">
    <div class="rounded-lg bg-white p-6 shadow-md">
      <h1 class="mb-4 text-2xl font-bold">关于英语刷题系统</h1>

      <div class="space-y-4">
        <section>
          <h2 class="mb-2 text-xl font-semibold">系统介绍</h2>
          <p class="text-gray-700">
            英语刷题系统是一个帮助用户提高英语阅读理解和完形填空能力的练习工具。系统提供了多套英语题目，包括阅读理解和完形填空两种题型，用户可以根据自己的需求选择不同的题集进行练习。
          </p>
        </section>

        <section>
          <h2 class="mb-2 text-xl font-semibold">功能特点</h2>
          <ul class="list-disc space-y-2 pl-5 text-gray-700">
            <li>多套英语题目，包括阅读理解和完形填空</li>
            <li>题目配有中文翻译，可选择是否显示</li>
            <li>即时反馈答题结果，答对自动进入下一题</li>
            <li>记录每套题的正确率和练习历史</li>
            <li>数据本地存储，无需网络连接</li>
          </ul>
        </section>

        <section>
          <h2 class="mb-2 text-xl font-semibold">使用说明</h2>
          <ol class="list-decimal space-y-2 pl-5 text-gray-700">
            <li>在首页选择要练习的章节和题集</li>
            <li>阅读题目，选择你认为正确的选项</li>
            <li>系统会立即显示答题结果和解析</li>
            <li>答对后可点击"下一题"继续，或完成后返回首页</li>
            <li>可随时切换是否显示中文翻译</li>
          </ol>
        </section>

        <section>
          <h2 class="mb-2 text-xl font-semibold">数据说明</h2>
          <p class="text-gray-700">
            系统使用本地存储保存用户的答题记录和进度，数据不会上传到服务器。用户可以随时清除浏览器缓存来重置所有数据。
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .about-container {
    max-width: 800px;
    margin: 0 auto;
  }
</style>
