<template>
  <div class="w-full overflow-x-hidden search">
    <Navbar />
    <div v-if="isLoading" class="spinner flex justify-center items-center w-full h-64">
      <radar-spinner :animation-duration="2000" :size="60" color="#000" />
    </div>
    <div class="sm:px-8 py-4 flex flex-col" v-if="!isLoading">
      <div class="px-6 py-2">
        <p class="mb-3 italic">{{card.category.name}}</p>
        <h2 class="mb-3 font-bold">{{card.title}}</h2>
        <p>
          by
          <a class="font-semibold">{{card.user.name}}</a>
        </p>
      </div>
      <div class="px-6 py-1 mb-8">
        <p>{{card.description}}</p>
      </div>
      <div class="flex card-links px-3 py-2 text-white justify-end mt-2">
        <div class="flex bg-blue-200 px-3 py-2 rounded">
          <h5 class="mr-2">{{card.likes}}</h5>
          <a @click="likeCard(card._id,index)">
            <i class="far fa-heart"></i>
          </a>
          <a class="ml-4" @click.stop="$refs.menu.open($event,{cardId:card._id})">
            <i class="fas fa-folder-plus"></i>
          </a>
          <a href="#" class="ml-4" @click="saveCard(card._id)">
            <i class="fas fa-save"></i>
          </a>
        </div>
        <div class="flex ml-3 bg-red-200 px-3 py-2 rounded" v-if="theCreatorHimself">
          <router-link :to="{name:'editcard',params:{cardId:card._id}}">
            <i class="fas fa-edit"></i>
          </router-link>
          <a href="#" class="ml-4" @click="deleteCard(card._id)">
            <i class="fas fa-trash"></i>
          </a>
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
  </div>
</template>

<script>
import { VueContext } from "vue-context";
import Navbar from "@/components/Navbar.vue";
import { RadarSpinner } from "epic-spinners";

const axios = require("axios");

export default {
  components: {
    Navbar,
    RadarSpinner,
    VueContext
  },
  data() {
    return {
      card: {},
      decks: [],
      isLoading: true,
      decks: [],
      user: {},
      theCreatorHimself:false
    };
  },
  methods: {
    async fetchCardInfo() {
      const result = await this.$store.dispatch(
        "fetchSingleCard",
        this.$route.params.cardId
      );
      this.card = result.data;
      this.isLoading = false;
      if(this.card._id===this.user._id){
        this.theCreatorHimself=false;
      }
    },
    async fetchDecks() {
      // this.$store.dispatch('fetchCategories');
      const result = await this.$store.dispatch("fetchDecks", this.user.email);
      this.decks = result.data.decks;
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
    async likeCard(cardId, index) {
      const result = await this.$store.dispatch("likeCard", {
        cardId,
        userId: this.user._id
      });
      if (result.data.error) {
        return this.$toasted.show(result.data.errorLog);
      }
      this.card.likes++;
      this.$forceUpdate();
    },
    async saveCard(cardId) {
      const results = await this.$store.dispatch("saveCard", {
        cardId,
        userId: this.user._id
      });
      if (results.data.error) {
        return this.$toasted.show(results.data.errorLog);
      }
      this.$toasted.show("Card successfully saved!");
    },
    async deleteCard(cardId) {
      const result = await this.$store.dispatch("deleteCard", {
        cardId,
        userId: this.user._id
      });
      if(result.data.error){
        return this.$toasted.show(result.data.errorLog);
      }
      this.$toasted.show("Card Successfully Deleted");
      setTimeout(() => {
        this.$router.go(-1);
      }, 1500);
    }
  },
  created() {
    const user = this.$store.state.user;
    this.user = user;
    this.fetchCardInfo();
    this.fetchDecks();
  }
};
</script>

