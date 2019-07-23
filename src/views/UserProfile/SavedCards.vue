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

    <div v-if="isLoading" class="spinner flex justify-center items-center w-full h-64">
      <radar-spinner :animation-duration="2000" :size="60" color="#000" />
    </div>

      <div class="lg:px-16 px-4 py-4" v-if="!isLoading && cards.length==0">
        <p>No saved cards.</p>
      </div>
    <div class="cards w-full flex flex-col" v-if="!isLoading">
      <div class="card-wrapper h-64" v-for="(card,index) in cards" :key="card._id">
        <div class="my-card" onclick="flip(event)">
          <div class="front h-56 px-6 py-2">
            <p class="mb-3 italic">{{card.category.name}}</p>
            <h2 class="mb-3 font-bold">{{card.title}}</h2>
            <p>
              by
              <a class="font-semibold">{{card.user.name}}</a>
            </p>
          </div>
          <div class="back h-56 px-4 py-1">
            <p v-html="card.description.slice(0,200)">...</p>
          </div>
        </div>
        <div class="flex card-links px-3 py-2 h-8 justify-end mt-2">
          <h5 class="mr-2 text-black-">{{card.likes}}</h5>
          <a @click="likeCard(card._id,index)">
            <i class="far fa-heart"></i>
          </a>
          <a class="ml-4" @click.stop="$refs.menu.open($event,{cardId:card._id})">
            <i class="fas fa-folder-plus"></i>
          </a>
          <router-link :to="{name:'singlecard',params:{cardId:card._id}}" class="ml-4">
            <i class="fas fa-eye"></i>
          </router-link>
          <a class="ml-4" @click="removeSavedCard(card._id,index)">
            <i class="fas fa-times"></i>
          </a>
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
import { RadarSpinner } from "epic-spinners";

export default {
  props: ["email"],
  components: {
    VueContext,
    RadarSpinner
  },
  data() {
    return {
      cards: [],
      decks: [],
      isLoading: true
    };
  },
  methods: {
    async likeCard(cardId, index) {
      const user = this.$store.state.user;
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
      const results = await this.$store.dispatch("addCardToDeck", {
        cardId: card.cardId,
        deckId
      });
      if (results.data.error) {
        return this.$toasted.show(results.data.errorLog);
      }
      this.$toasted.show("Card added successfully to the deck!");
    },
    async removeSavedCard(cardId,index){
      const result=await axios.delete(`${process.env.VUE_APP_API_URL}card/deletesaved/${this.$store.state.user._id}/${cardId}`);
        if(result.data.error){
            return this.$toasted.show(result.data.errorLog);
        }
        this.$toasted.show(result.data);
        this.$delete(this.cards,index);
        // this.$store.commit('deleteFromSavedCards',index);
        this.$forceUpdate();
    },
    async fetchSavedCards() {
      const results = await axios.get(
        `${process.env.VUE_APP_API_URL}user/savedcards/${this.$route.params.email}`
      );
      if (results.data.error) {
        return this.$toasted.show(results.data.errorLog);
      }
      this.cards = results.data.savedCards;
      // this.cards=this.$store.state.user.savedCards;
    },
    async fetchDecks() {
      const results = await this.$store.dispatch(
        "fetchDecks",
        this.$route.params.email
      );
      this.decks = results.data.decks;
      this.isLoading = false;
    }
  },
  created() {
    this.fetchSavedCards();
    this.fetchDecks();
  }
};
</script>
