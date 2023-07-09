import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CadastroUsuarioView from '../views/CadastroUsuarioView.vue';
import DatabaseView from '../views/DatabaseView.vue';
import UserView from '../views/UsersView.vue';
import SolicitationsView from '../views/SolicitationView.vue';
import ImagesView from '../views/ImagesView.vue';
import ImageTypesView from '../views/ImageTypesView.vue';

import axios from 'axios';

function adminAuth(to, from, next) {
    const token = localStorage.getItem('token');

    if (token != undefined) {
        const req = {
            headers: {
                Authorization: "Bearer " + token
            }
        };

        axios.get("http://localhost:8081/authenticate", req).then(response => {
            let user = response.data;

            if (user?.role == 1)
                next();
            else
                next("/databases");
        }).catch(err => {
            console.log(err.response);
            next("/home");
        });

    } else {
        next("/home");
    }
}

function loginAuth(to, from, next) {
    const token = localStorage.getItem('token');

    if (token != undefined) {
        const req = {
            headers: {
                Authorization: "Bearer " + token
            }
        };

        axios.get("http://localhost:8081/authenticate", req).then(response => {
            let user = response.data;

            if (user)
                next();
            else
                next("/home");
        }).catch(err => {
            console.log(err.response);
            next("/home");
        });

    } else {
        next("/home");
    }
}


const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/cadastroUsuario',
        name: 'cadastroUsuario',
        component: CadastroUsuarioView
    },
    {
        path: '/databases',
        name: 'databases',
        component: DatabaseView,
        beforeEnter: loginAuth
    },
    {
        path: '/users',
        name: 'users',
        component: UserView,
        beforeEnter: adminAuth
    },
    {
        path: '/solicitations',
        name: 'solicitations',
        component: SolicitationsView,
        beforeEnter: adminAuth
    },
    {
        path: '/images',
        name: 'images',
        component: ImagesView,
        beforeEnter: loginAuth
    },
    {
        path: '/image-types',
        name: 'image-types',
        component: ImageTypesView,
        beforeEnter: loginAuth
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
