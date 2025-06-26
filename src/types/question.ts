/**
 * 题库数据类型定义
 */

// 选项类型
export interface Option {
  id: string;
  text: string;
  textCN?: string; // 中文翻译（可选）
}

// 问题类型
export interface Question {
  id: string;
  type: 'reading' | 'cloze' | 'translation'; // 阅读理解 or 完形填空 or 英翻中
  text: string;
  textCN?: string; // 中文翻译（可选）
  options: Option[];
  correctOptionId: string;
  explanation?: string; // 解析（可选）
}

// 文章类型（用于阅读理解）
export interface Article {
  id: string;
  title: string;
  titleCN?: string; // 中文标题（可选）
  content: string;
  contentCN?: string; // 中文内容（可选）
}

// 题集类型
export interface QuestionSet {
  id: string;
  title: string;
  description: string;
  type: 'reading' | 'cloze' | 'translation'; // 阅读理解 or 完形填空 or 英翻中
  article?: Article; // 阅读理解文章（仅阅读理解类型需要）
  questions: Question[];
}

// 章节类型（一个章节包含多个题集）
export interface Chapter {
  id: string;
  title: string;
  description: string;
  questionSets: QuestionSet[];
}

// 用户答题记录
export interface UserAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  timestamp: number;
}

// 题集完成情况
export interface QuestionSetProgress {
  questionSetId: string;
  totalQuestions: number;
  correctAnswers: number;
  completedQuestions: number;
  lastAttemptDate?: number;
}

// 章节完成情况
export interface ChapterProgress {
  chapterId: string;
  questionSetProgress: Record<string, QuestionSetProgress>;
  totalCorrectRate: number; // 总正确率
}