<template>
  <div>
     <div v-if="isLoading" class="spinner flex justify-center items-center w-full h-64">
        <radar-spinner :animation-duration="2000" :size="60" color="#fff" />
      </div>
    <div class="decks" v-if="!isLoading">
      <div class="deck px-3 py-2"  v-for="deck in decks" :key="deck._id" @click="viewDeck(deck._id)">
        <h4 class="font-bold">{{deck.name}}</h4>
        <p class="font-semibold mb-2 mt-2">{{deck.description}}</p>
        <p class="mb-2" v-if="deck.categoryId">Category: {{deck.categoryId.name}}</p>
        <p class="mb-2">{{deck.cards.length}} cards</p>
        <!-- <div class="flex items-center">
          <p class="mr-4">Private: </p>
            <label class="switch">
              <input type="checkbox" :checked="deck.private">
            <span class="slider round"></span>
          </label>
        </div> -->
        <p>Private: {{deck.private}}</p>
      </div>
    </div>
  </div>
</template>


<script>
const axios = require("axios");
import { RadarSpinner } from "epic-spinners";


export default {
  components:{
    RadarSpinner
  },
  // props:['email'],
  data() {
    return {
      isLoading:true,
      email: "",
      decks: [],
      makePrivate: false
    };
  },
  methods:{
    viewDeck(deckId){
      this.$router.push({name:'deckcards',params:{deckId}});
    }
  },
  computed: {
    async fetchDecks() {
      // const results = await axios.get(
      //   `${process.env.VUE_APP_API_URL}user/fetchdeck/${this.email}`
      // );
      const results=await this.$store.dispatch('fetchDecks',this.email);
      if (results.data.error) {
        return this.$toasted.show(
          "Oops! Something went wrong! Please go to another tab and revisit this one."
        );
      }
      this.decks = results.data.decks;
      this.isLoading=false;
    },
  },
  created() {
    const user = JSON.parse(localStorage.getItem("flashcards-user"));
    this.email = user.email;
    this.fetchDecks;
  }
};
</script>
