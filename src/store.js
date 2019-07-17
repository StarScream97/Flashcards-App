import Vue from 'vue'
import Vuex from 'vuex'
const axios=require('axios')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{},
    categories:[],
    cards:[],
    isLoggedIn:false
  },
  mutations: {
    register(state,user){
      state.user=user;
    },
    setCategories(state,categories){
      state.categories=categories;
    },
    setCards(state,cards){
      state.cards=cards;
    },
    loggedIn(state,value){
      state.isLoggedIn=value;
    }
  },
  actions: {
    async register(context,user){
      const result=await axios.post(`${process.env.VUE_APP_API_URL}user`,user);
      context.commit('register',result.data);
    },
    fetchSingleCard(context,cardId){
      return axios.get(`${process.env.VUE_APP_API_URL}card/card/${cardId}`);
    },
    async fetchCategories(context){
      const result=await axios.get(`${process.env.VUE_APP_API_URL}category`);
      // console.log(result);
      context.commit('setCategories',result.data);
    },
    fetchCards(context){
      return axios.get(`${process.env.VUE_APP_API_URL}card`);
    },
    likeCard(context,payload){
      return axios.post(`${process.env.VUE_APP_API_URL}card/like`,payload);
    },
    saveCard(context,payload){
      return axios.post(`${process.env.VUE_APP_API_URL}user/save`,payload);
    },
    fetchDecks(context,email){
      return axios.get(`${process.env.VUE_APP_API_URL}user/fetchdeck/${email}`)
    },
    addCardToDeck(context,payload){
      return axios.post(`${process.env.VUE_APP_API_URL}deck/addCard`,payload);
    },
    createCategory(context,payload){
      return axios.post(`${process.env.VUE_APP_API_URL}category`,payload);
    },
    createDeck(context,payload){
      return axios.post(`${process.env.VUE_APP_API_URL}deck`,payload);
    }

  }
})
