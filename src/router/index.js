import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import DemoTable from '@/views/table';
import DemoFunction from '@/views/function';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/table',
      name: 'DemoTable',
      component: DemoTable,
    },
    {
      path: '/function',
      name: 'DemoFunction',
      component: DemoFunction,
    },
  ]
})
