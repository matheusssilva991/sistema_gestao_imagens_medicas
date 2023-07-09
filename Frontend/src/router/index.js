import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CadastroUsuarioView from '../views/CadastroUsuarioView.vue';
import DatabaseView from '../views/DatabaseView.vue';
import UserView from '../views/UsersView.vue';
import SolicitationsView from '../views/SolicitationView.vue';
import ImagesView from '../views/ImagesView.vue';
import ImageTypesView from '../views/ImageTypesView.vue';

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
    component: DatabaseView
  },
  {
    path: '/users',
    name: 'users',
    component: UserView
  },
  {
    path: '/solicitations',
    name: 'solicitations',
    component: SolicitationsView
  },
  {
    path: '/images',
    name: 'images',
    component: ImagesView
  },
  {
    path: '/image-types',
    name: 'image-types',
    component: ImageTypesView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
