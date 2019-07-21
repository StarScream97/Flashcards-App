<template>
  <div>
    <!-- <div v-if="isLoading" class="spinner flex justify-center items-center w-full h-64">
      <radar-spinner :animation-duration="2000" :size="60" color="#fff" />
    </div>-->
    <div class="cards w-full">
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
        <div class="flex h-8 card-links px-3 py-2 justify-end mt-2">
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
import { RadarSpinner } from "epic-spinners";

export default {
  props: ["cards"],
  components: {
    VueContext,
    RadarSpinner
  },
  data() {
    return {
      isLoading: true,
      decks: [],
      email: "",
      selectedCardId: ""
    };
  },
  methods: {
    showContextMenu(cardId) {
      this.$refs.menu.open;
      this.selectedCardId = cardId;
    },
    async addCardToDeck(deckId, card) {
      const results=await this.$store.dispatch('addCardToDeck',{cardId:card.cardId,deckId});
      if(results.data.error){
        return this.$toasted.show(results.data.errorLog);
      }
      this.$toasted.show('Card added successfully to the deck!');
    },
    async likeCard(cardId, index) {
      const user = JSON.parse(localStorage.getItem("flashcards-user"));
      if (!user) {
        return this.$toasted.show("You must be logged in to like cards");
      }
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
    async fetchDeckNames() {
      const results = await axios.get(
        `${process.env.VUE_APP_API_URL}user/fetchdeck/${this.email}`
      );
      this.isLoading = false;
      if (results.data.error) {
        return this.$toasted.show(
          "Oops! Something went wrong! Please go to another tab and revisit this one."
        );
      }
      this.decks = results.data.decks;
    }
  },
  created() {
    const user = JSON.parse(localStorage.getItem("flashcards-user"));
    this.email = user.email;
    this.fetchDeckNames();
  }
};
</script>
