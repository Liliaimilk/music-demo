import Vue from 'vue'
import Layout from '@/views/Layout/Layout'
import Home from '@/views/Home/Home'
import Search from '@/views/Search/Search'
import Play from '@/views/Play'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        redirect: '/layout'
    },
    {
        path: '/layout',
        component: Layout,
        redirect: '/layout/home',
        children: [
            {
                path: 'home',
                component: Home,
                meta: {
                    title: '首页'
                }
            },
            {
                path: 'search',
                component: Search,
                meta: {
                    title: '搜索'
                }
            }
        ]
    },
    {
        path: '/play',
        component: Play
    }
]
const router = new VueRouter({
    routes
})
export default router