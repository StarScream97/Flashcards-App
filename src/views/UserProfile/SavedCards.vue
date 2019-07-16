<template>
  <div>
    <!-- <div class="cards w-full">
           <div v-for="card in cards" :key="card._id" class="card">
               <div class="card-wrapper">
                    <div class="card-front">
                        <div class="card-text">
                        <p>{{card.category.name}}</p>
                        <h3>
                            {{card.title}}
                        </h3>
                        <p>
                            by
                            <a>{{card.user.name}}</a>
                        </p>
                        </div>
                    </div>
                    <div class="card-back text-left">
                        <p v-html="card.description">
                        </p>
                        <div class="flex justify-end mt-2">
                            <div>
                                <i class="far fa-heart"></i>
                            </div>
                            <div class="ml-4">
                                <i class="fas fa-folder-plus"></i>
                            </div>
                        </div>
                    </div>
               </div>
           </div>
    </div>-->
    <div class="cards w-full">
      <div class="card-wrapper" v-for="(card,index) in cards" :key="card._id">
        <div class="my-card" onclick="flip(event)">
          <div class="front px-6 py-2">
            <p class="mb-3 italic">{{card.category.name}}</p>
            <h2 class="mb-3 font-bold">{{card.title}}</h2>
            <p>
              by
              <a class="font-semibold">{{card.user.name}}</a>
            </p>
          </div>
          <div class="back px-4 py-1">
            <p v-html="card.description.slice(0,200)">...</p>
          </div>
        </div>
        <div class="flex card-links px-3 py-2 text-white justify-end mt-2">
          <h5 class="mr-2">{{card.likes}}</h5>
          <a @click="likeCard(card._id,index)">
            <i class="far fa-heart"></i>
          </a>
          <a class="ml-4" @click.stop="$refs.menu.open($event,{cardId:card._id})">
            <i class="fas fa-folder-plus"></i>
          </a>
          <router-link :to="{name:'singlecard',params:{cardId:card._id}}" class="ml-4"><i class="fas fa-eye"></i></router-link>
        </div>
      </div>
    </div>
    <vue-context ref="menu">
      <template slot-scope="child">
        <li v-for="deck in decks" :key="deck._id">
          <!-- <a href="#" @click="addCardToDeck(deck._id)">{{deck.name}}</a> -->
          <a href="#" @click.prevent="addCardToDeck(deck._id, child.data)">{{deck.name}}</a>
        </li>
      </template>
    </vue-context>
  </div>
</template>

<script>
const axios = require("axios");
import { VueContext } from "vue-context";


export default {
  props: ["email"],
  components:{
      VueContext
  },
  data() {
    return {
      cards: [],
      decks:[]
    };
  },
  methods: {
    async likeCard(cardId, index) {
      const user = JSON.parse(localStorage.getItem("flashcards-user"));
      const result = await this.$store.dispatch("likeCard", {
        cardId,
        userId: user._id
      });
      if (result.data.error) {
        return this.$toasted.show(result.data.errorLog);
      }
      this.cards[index].likes++;
      this.$forceUpdate();
    },
    async addCardToDeck(deckId, card) {
        const results=await this.$store.dispatch('addCardToDeck',{cardId:card.cardId,deckId});
        if(results.data.error){
            return this.$toasted.show(results.data.errorLog);
        }
        this.$toasted.show('Card added successfully to the deck!');
    },
  },
  computed: {
    async fetchSavedCards() {
      const results = await axios.get(
        `${process.env.VUE_APP_API_URL}user/savedcards/${this.$route.params.email}`
      );
      if (results.data.error) {
        return this.$toasted.show(results.data.errorLog);
      }
      this.cards = results.data.savedCards;
    },
    async fetchDecks(){
      const results=await this.$store.dispatch('fetchDecks',this.$route.params.email);        
      this.decks=results.data.decks;
    }
  },
  created() {
    this.fetchSavedCards;
    this.fetchDecks;
  }
};
</script>
