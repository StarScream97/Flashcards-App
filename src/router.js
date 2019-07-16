import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CreateACard from './views/CreateACard'
import Search from './views/Search'
import Register from './views/Register'
import MyCards from './views/UserProfile/MyCards'
import Login from './views/Login'
import ProfileHome from './views/UserProfile/ProfileHome'
import Practice from './views/Practice'
import Info from './views/UserProfile/Info'
import SavedCards from './views/UserProfile/SavedCards'
import MyDecks from './views/UserProfile/MyDecks'
import DeckCards from './views/DeckCards'
import CreateACategory from './views/UserProfile/CreateACategory'
import SingleCard from './views/SingleCard'
import Reports from './views/UserProfile/Reports'
import Learn from './views/UserProfile/Learn'


const Nprogress=require('nprogress');

Vue.use(Router)

const router= new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/card/:cardId',
      name: 'singlecard',
      component: SingleCard
    },
    {
      path:'/create',
      name:'createcard',
      component:CreateACard
    },
    {
      path:'/search',
      name:'searchcard',
      component:Search
    },
    {
      path:'/:deckId/cards',
      name:'deckcards',
      component:DeckCards
    },
    {
      path: '/practice',
      name: 'practice',
      component: Practice,
    },
    {
      path:'/profile',
      name:'profile',
      component:ProfileHome,
      children:[
        // {
        //   path:'/',
        //   name:'profile',
        //   component:ProfileHome
        // },
        {
          path: '/profile/info',
          name: 'info',
          component: Info,
          props:true
        },
        {
          path: '/profile/mycards',
          name: 'cards',
          component: MyCards,
          props:true
        },
        {
          path: '/profile/saved',
          name: 'savedcards',
          component: SavedCards,
          props:true
        },
        {
          path: '/profile/decks',
          name: 'mydecks',
          component: MyDecks,
        },
        {
          path: '/profile/report',
          name: 'report',
          component: Reports,
        },
        {
          path: '/profile/learn',
          name: 'learn',
          component: Learn,
        }
      ]
    },
    {
      path: '/createcategory',
      name: 'createcategory',
      component: CreateACategory,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ],
  mode:'history'
})

// Nprogress Loading Bar
router.beforeResolve((to,from,next)=>{
  if(to.name){
    Nprogress.start();
  }
  next();
})
router.afterEach((to,from)=>{
  Nprogress.done();
});

export default router;
