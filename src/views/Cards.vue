<template>
  <div class="w-full overflow-x-hidden search">
    <Navbar />
    <div v-if="isLoading" class="spinner flex justify-center items-center w-full h-64">
      <radar-spinner :animation-duration="2000" :size="60" color="#000" />
    </div>
    <div class="sm:px-8 py-4 flex flex-col" v-if="!isLoading">
      <div class="search-filters w-full mb-10">
        <div class="w-full mx-auto">
          <form class="shadow-md rounded px-8 pt-6 pb-8 mb-4 lg:flex lg:items-center">
            <div class="mr-6 lg:w-1/3 mb-3">
              <label class="block text-sm font-bold mb-2" for="title">Title</label>
              <input
                class="shadow appearance-none rounded w-full py-2 px-3 leading-tight"
                id="search"
                type="text"
                placeholder="Search"
                v-model="search.text"
              />
            </div>

            <div class="mr-6 lg:w-1/3 mb-3 mt-2">
              <label class="block text-sm font-bold mb-2" for="category">Category</label>
              <select
                class="shadow outline-none rounded w-full py-2 px-3 mb-3 leading-tight"
                v-model="search.category"
              >
                <option disabled value>Please select a category</option>
                <option
                  v-for="category in categories"
                  :key="category._id"
                  :value="category.name"
                >{{category.name}}</option>
              </select>
            </div>
          </form>
        </div>
      </div>

      <div class="search-results w-full px-3">
        <transition-group name="flip-list" tag="div" class="cards w-full">
          <div class="card-wrapper h-64" v-for="(card,index) in filteredCards" :key="card._id">
            <div class="my-card" onclick="flip(event)">
              <div class="front h-56 px-6 py-2">
                <p class="mb-3 italic">{{card.category.name}}</p>
                <h2 class="mb-3 font-bold">{{card.title}}</h2>
                <p>
                  by
                  <a class="font-semibold">{{card.user.name}}</a>
                </p>
              </div>
              <div class="back px-2 py-3 h-56 ">
                <p>{{card.description.slice(0,200)}}...</p>
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
              <a class="ml-4" @click="saveCard(card._id,index)">
                <i class="fas fa-save"></i>
              </a>
              <router-link :to="{name:'singlecard',params:{cardId:card._id}}" class="ml-4">
                <i class="fas fa-eye"></i>
              </router-link>
            </div>
          </div>
        </transition-group>
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
      user: {},
      toggleCard: false,
      search: {
        text: "",
        category: ""
      },
      searchText: "",
      cards: [],
      categories: [],
      isLoading: true,
      decks: []
    };
  },
  methods: {
    async saveCard(cardId,index) {
      const results = await this.$store.dispatch("saveCard", {
        cardId,
        userId: this.user._id
      });
      if (results.data.error) {
        return this.$toasted.show(results.data.errorLog);
      }
      this.$toasted.show("Card successfully saved!");
      this.$store.commit('newCardSaved',this.cards[index])
    },
    async fetchCategories() {
      // this.$store.dispatch('fetchCategories');
      const result = await this.$store.dispatch("fetchCategories");
      this.categories = result.data;
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
    async fetchCards() {
      // this.$store.dispatch('fetchCards');
      const result = await this.$store.dispatch("fetchCards");
      this.cards = result.data;
      this.isLoading = false;
    },
    async likeCard(cardId, index) {
      console.log(cardId)
      const result = await this.$store.dispatch("likeCard", {
        cardId,
        userId: this.user._id
      });
      if (result.data.error) {
        return this.$toasted.show(result.data.errorLog);
      }
      this.$toasted.show('You liked the card');
      this.cards[index].likes++;
      this.$forceUpdate();
    }
  },
  computed: {
    filteredCards() {
      // If user has selected a category filter, search only in that category
      if (this.search.category) {
        return this.cards.filter(card => {
          return (
            card.category.name === this.search.category &&
            card.title.toLowerCase().match(this.search.text.toLowerCase())
          );
        });
      }
      // Else search in all categories
      return this.cards.filter(card => {
        return card.title.toLowerCase().match(this.search.text.toLowerCase());
      });
    },
    async fetchDecks() {
      const results = await this.$store.dispatch("fetchDecks", this.$store.state.user.email);
      this.decks = results.data.decks;
    }
  },
  mounted() {
    // const user = JSON.parse(localStorage.getItem("flashcards-user"));
    this.user = this.$store.state.user;
    this.fetchCategories();
    this.fetchCards();
    this.fetchDecks;
  }
};
</script>


<style scoped>
.flip-list-move {
  transition: transform 1s;
}
</style>

