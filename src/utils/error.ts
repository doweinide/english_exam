interface ErrorOptions {
  message: string;
  type?: 'error' | 'warning' | 'info';
  duration?: number;
}

class ErrorHandler {
  private static instance: ErrorHandler;

  private constructor() {}

  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  // 全局错误处理
  public setupErrorHandle() {
    window.onerror = (message, source, lineno, colno, error) => {
      console.error('Global error:', { message, source, lineno, colno, error });
      this.showError({ message: String(message) });
    };

    window.addEventListener('unhandledrejection', event => {
      console.error('Unhandled promise rejection:', event.reason);
      this.showError({ message: String(event.reason) });
    });
  }

  // 显示错误信息（这里可以集成你喜欢的UI库的消息提示）
  public showError({ message, type = 'error', duration = 3000 }: ErrorOptions) {
    console.error(`[${type}] ${message}`);
    // 这里可以添加你的消息提示组件
  }

  // HTTP错误处理
  public handleHttpError(error: any) {
    const message =
      error.response?.data?.message || error.message || '未知错误';
    this.showError({ message });
  }

  // 业务错误处理
  public handleBusinessError(error: any) {
    const message = error.message || '业务处理失败';
    this.showError({ message, type: 'warning' });
  }
}

export const errorHandler = ErrorHandler.getInstance();
