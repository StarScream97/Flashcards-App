<template>
  <div>
    <Navbar />
    <div v-if="isLoading" class="spinner flex justify-center items-center w-full h-64">
      <radar-spinner :animation-duration="2000" :size="60" color="#000" />
    </div>
    <div v-if="!isLoading && decks.length==0" class="lg:px-16 px-4 py-4">
      <p>Sorry, there are no public decks available.</p>
    </div>
    <div class="flex flex-col lg:px-16 px-4 py-4" v-if="!isLoading">
      <div class="mb-8 text-right">
        <router-link to="/profile/decks/create" class="rounded-full border px-3 py-2">Create A Deck</router-link>
      </div>
      <div class="decks">
        <div v-for="(deck,index) in decks" :key="deck._id" class="deck px-3 py-2">
          <div @click="viewDeck(deck._id)">
            <h4 class="font-bold">{{deck.name}}</h4>
            <p class="font-semibold mb-2 mt-2">{{deck.description}}</p>
            <div>
              <p class="mb-2" v-if="deck.categoryId">Category: {{deck.categoryId.name}}</p>
              <p v-else class="mb-2">Category: N/A</p>
            </div>
            <p class="mb-2">{{deck.cards.length}} cards</p>
          </div>
          
          <a href="#" @click="saveDeck(deck._id,index)">
            <i class="fas fa-save"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
const axios = require("axios");
import { RadarSpinner } from "epic-spinners";
import Navbar from "@/components/Navbar";

export default {
  components: {
    RadarSpinner,
    Navbar
  },
  // props:['email'],
  data() {
    return {
      isLoading: true,
      decks: [],
      makePrivate: false
    };
  },
  methods: {
    viewDeck(deckId) {
      this.$router.push({ name: "deckcards", params: { deckId } });
    },
    async saveDeck(deckId, index) {
      const result=await axios.post(`${process.env.VUE_APP_API_URL}deck/save`,{
        userId:this.$store.state.user._id,
        deckId
      });
      if(result.data.error){
        return this.$toasted.show(result.data.errorLog);
      }
      this.$toasted.show(result.data);
      this.$store.commit('newlyCreatedDeck',this.decks[index]);
    }
  },
  computed: {
    async fetchDecks() {
      const results = await this.$store.dispatch("fetchAllDecks");
      if (results.data.error) {
        return this.$toasted.show("Oops! Something went wrong!");
      }
      this.decks = results.data;
      this.isLoading = false;
    }
  },
  created() {
    this.fetchDecks;
  }
};
</script>

