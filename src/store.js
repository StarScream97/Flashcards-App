import Vue from 'vue'
import Vuex from 'vuex'
const axios=require('axios')
import VuexPersist from 'vuex-persist'



Vue.use(Vuex)

const vuexLocalStorage=new VuexPersist({
  key:'flashcards-vuex',
  storage: window.localStorage,
  reducer:state=>({
    user:state.user,
    isLoggedIn:state.isLoggedIn,
    themeMode:state.themeMode
  })
})


export default new Vuex.Store({
  state: {
    user:{},
    categories:[],
    cards:[],
    isLoggedIn:false,
    themeMode:'light'
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
    },
    setUser(state,payload){
      state.user=payload;
    },
    newCardAdded(state,card){
      state.user.cards.push(card);
    },
    newlyCreatedDeck(state,deck){
      state.user.savedDecks.push(deck);
    },
    deleteFromSavedDecks(state,index){
      state.user.savedDecks.splice(index,1);
    },
    deleteFromSavedCards(state,index){
      state.user.savedCards.splice(index,1);
    },
    newCardSaved(state,card){
      state.user.savedCards.push(card);
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
      return axios.get(`${process.env.VUE_APP_API_URL}category`);
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
    fetchAllDecks(context){
      return axios.get(`${process.env.VUE_APP_API_URL}deck`)
    },
    
    addCardToDeck(context,payload){
      return axios.post(`${process.env.VUE_APP_API_URL}deck/addCard`,payload);
    },
    createCategory(context,payload){
      return axios.post(`${process.env.VUE_APP_API_URL}category`,payload);
    },
    createDeck(context,payload){
      return axios.post(`${process.env.VUE_APP_API_URL}deck`,payload);
    },
    deleteCard(context,payload){
      return axios.delete(`${process.env.VUE_APP_API_URL}card/delete/${payload.userId}/${payload.cardId}`);
    },
  },
  plugins: [vuexLocalStorage.plugin]
  
})
