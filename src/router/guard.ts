import type { Router } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    await wait(1000);
    // 设置页面标题
    document.title = `${to.meta.title || ''} - ${import.meta.env.VITE_APP_TITLE}`;

    // 判断是否需要登录权限
    if (to.matched.some(record => record.meta.requiresAuth)) {
      const token = localStorage.getItem('token');
      if (!token) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        });
        return;
      }
    }

    next();
  });

  router.afterEach(() => {
    NProgress.done();
  });

  router.onError(() => {
    NProgress.done();
  });
} 