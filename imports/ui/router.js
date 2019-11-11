import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


import Login from './Login.vue';
import Home from './Home.vue';
import Signup from './Signup.vue';
import Users from './Users.vue'


const routes = [
    { path: '/', component: Login },
    {
        path: '/home', component: Home,
        children: [
            { path: '/users', component: Users, },
        ]
    },
    { path: '/signup', component: Signup },

    { path: '*', redirect: '/' },
];

const router = new VueRouter({ mode: 'history', routes })

router.beforeEach((to, from, next) => {

    const publicPages = ['/', '/register', '/signup'];
    let validUser = localStorage.getItem('user');
    let viewIsPrivate = !publicPages.includes(to.path);

    if (!validUser && viewIsPrivate) {
        next('/');
    } else if (!viewIsPrivate && validUser) {
        next('/dependencies');
    } else {
        next();
    }
})

export default router
