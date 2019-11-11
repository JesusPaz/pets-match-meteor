import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


import Login from './Login.vue';
import Home from './Home.vue';
import Signup from './Signup.vue';
import Blackboard from './Blackboard.vue';
import MyPets from "./MyPets.vue";
import Lovers from "./Lovers.vue";


const routes = [
    { path: '/', component: Login },
    {
        path: '/blackboard', component: Blackboard,
        children: [
            { path: '/home', component: Home},
            { path: '/lovers', component: Lovers},
            { path: '/mypets', component: MyPets},
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
        next('/home');
    } else {
        next();
    }
})

export default router
