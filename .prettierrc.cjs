// .prettierrc.cjs
// Prettier 代码格式化配置文件（CommonJS 模块格式）

module.exports = {
  // 语句末尾使用分号
  semi: true,

  // 使用单引号替代双引号
  singleQuote: true,

  // 每个缩进级别使用 2 个空格
  tabWidth: 2,

  // 对象或数组末尾的逗号格式（ES5 规范允许的格式）
  trailingComma: "es5",

  // 对象字面量的大括号内添加空格（如 { a: 1 } 而非 {a: 1}）
  bracketSpacing: true,

  // 箭头函数参数只有一个时省略括号（如 x => x 而非 (x) => x）
  arrowParens: "avoid",

  // 每行代码最大宽度（超过则换行）
  printWidth: 80,

  // 使用空格缩进而非 Tab
  useTabs: false,

  // 行尾使用 LF 换行符（Unix/Mac 风格）
  endOfLine: "lf",

  // 大括号不强制放在同一行（如 if 语句的 { 不与条件同行）
  bracketSameLine: false,

  // HTML 空白字符敏感度，遵循 CSS 盒模型规则
  htmlWhitespaceSensitivity: "css",

  // Vue 文件中的 <script> 和 <style> 标签内容缩进
  vueIndentScriptAndStyle: true,

  // 注册 Tailwind CSS 的 Prettier 插件
  plugins: ["prettier-plugin-tailwindcss"],
};