<template>
  <div>
    <Navbar />
    <div id="deckCards">
      <div v-if="isLoading" class="spinner flex justify-center items-center w-full h-64">
        <radar-spinner :animation-duration="2000" :size="60" color="#fff" />
      </div>
      <div class="cards w-full" v-if="!isLoading">
        <div class="card-wrapper" v-for="(card,index) in cards" :key="card._id">
          <div class="my-card" onclick="flip(event)">
            <div class="front px-6 py-2">
              <h2 class="mb-3 mt-8 font-bold">{{card.title}}</h2>
              <p class="mt-12">
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
            <a href="#" class="ml-4" @click="saveCard(card._id)">
              <i class="fas fa-save"></i>
            </a>
            <router-link :to="{name:'singlecard',params:{cardId:card._id}}" class="ml-4"><i class="fas fa-eye"></i></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import Navbar from "@/components/Navbar";
import { RadarSpinner } from "epic-spinners";


export default {
  components: {
    Navbar,
    RadarSpinner
  },
  data() {
    return {
      isLoading:true,
      deckId: "",
      cards: [],
      user:{}
    };
  },
  computed: {
    async fetchCards() {
      const results = await axios.get(
        `${process.env.VUE_APP_API_URL}deck/${this.deckId}`
      );
      if (results.data.error) {
        return this.$toasted.show(results.data.errorLog);
      }
    //   console.log(results.data);
      this.cards = results.data.cards;
      this.isLoading=false;
    }
  },
  methods:{
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
    async saveCard(cardId){
      const results=await this.$store.dispatch('saveCard',{
        cardId,
        userId:this.user._id
      });
      if(results.data.error){
        return this.$toasted.show(results.data.errorLog);
      }
      this.$toasted.show('Card successfully saved!');
    },
  },
  created() {
    const user = JSON.parse(localStorage.getItem("flashcards-user"));
    this.user=user;
    this.deckId = this.$route.params.deckId;
    this.fetchCards;
  }
};
</script>

