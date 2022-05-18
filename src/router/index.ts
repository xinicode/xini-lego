import { createRouter, createWebHashHistory } from 'vue-router';
import Index from '@pages/Index.vue';
import Home from '@pages/Home.vue';
import TemplateDetail from '@pages/TemplateDetail.vue';
import Login from '@pages/Login.vue';
import Editor from '@pages/Editor.vue';
import notFount from '@pages/notFount.vue';
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          meta: { title: '欢迎', withHeader: true },
        },
        {
          path: 'template/:id',
          name: 'template',
          component: TemplateDetail,
          meta: { title: '模板' },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        redirectAlreadyLogin: true,
        withHeader: false,
        title: '登录到',
        disableLoading: true,
      },
      component: Login,
      // component: () => import(/* webpackChunkName: "login" */ '../pages/Login.vue')
    },
    {
      path: '/editor',
      name: 'editor',
      meta: {
        redirectAlreadyLogin: true,
        withHeader: false,
        title: '登录到',
        disableLoading: true,
      },
      component: Editor,
      // component: () => import(/* webpackChunkName: "login" */ '../pages/Login.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: notFount,
    },
  ],
});
// router.beforeEach(async (to, from) => {
//   // const { title } = to.meta;
//   // const { title2 } = from.meta;
//   // if (title) {
//   //   document.title = title;
//   // }
//   // console.log(title);
//   // console.log(title2);
// });
export default router;
