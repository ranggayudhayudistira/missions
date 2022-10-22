import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/', 
            name: 'Home', 
            component: () => import('../views/HomeView.vue') 
        },
        {
            path: '/insert', 
            name: 'Insert Data', 
            component: () => import('../views/InsertView.vue') 
        }
    ]
  })

export default router;