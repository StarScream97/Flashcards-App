<template>
  <div>
    <div class="min-h-screen px-2 py-4">
      <div class="w-full max-w-lg mx-auto">
        <form @submit.prevent="createdeck" class="shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2" for="name">Name</label>
            <input
              class="shadow appearance-none rounded w-full py-2 px-3  leading-tight"
              id="name"
              type="text"
              placeholder="Name"
              v-model="deck.name"
            />
          </div>
          <div class="mb-6">
            <label class="block  text-sm font-bold mb-2" for="description">Description</label>
            <input
              class="shadow appearance-none rounded w-full py-2 px-3  mb-3 leading-tight"
              id="description"
              type="text"
              placeholder="Description"
              v-model="deck.description"
            />
          </div>
          <div class="mb-6">
            <label class="block  text-sm font-bold mb-2" for="private">Private</label>
            <!-- <input
              class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
              id="password"
              type="password"
              placeholder="Password"
              v-model="user.password"
            />
            -->
            <input
              class="block  text-sm font-bold mb-2"
              type="checkbox"
              id="checkbox"
              v-model="deck.private"
            />
          </div>
           <div class="mb-6">
            <label class="block  text-sm font-bold mb-2" for="category">Category</label>
            <select
              class="shadow outline-none rounded w-full py-2 px-3  mb-3 leading-tight"
              v-model="categoryId"
            >
              <option disabled value>Please select a category</option>
              <option v-for="category in categories" :key="category._id" :value="category._id">{{category.name}}</option>
            </select>
          </div>

          <div class="flex items-center justify-between">
            <button
              class="shadow-lg hover:bg-gray-500 text-black bg-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      deck: {
        name: "",
        description: "",
        private: false,
      },
      user:{},
      categoryId: "",
      categories:[]
    };
  },
  methods: {
    async createdeck() {
      if (!this.deck.name || !this.deck.description) {
        return this.$toasted.show("Please fill all the inputs");
      }
        const userId=this.user._id;
        if(!userId){
            return this.$toasted.show('You must me logged in to create a deck!');
        }
        let newDeck={
            name:this.deck.name,
            description:this.deck.description,
            private:this.deck.private,
            userId:this.user._id
        }
        if(!this.deck.private){
            newDeck.categoryId=this.categoryId
        }
        await this.$store.dispatch('createDeck',newDeck);

        this.$router.push("/profile/decks");
    },
    async fetchCategories(){
        const result=await axios.get(`${process.env.VUE_APP_API_URL}category`);      
        this.categories=result.data;
    }
  },
  created() {
      this.fetchCategories();
      const user=JSON.parse(localStorage.getItem('flashcards-user'));
      if(!user){
          return this.$toasted.show('You should be logged In!');
      }
      this.user=user;
  }
};
</script>

<style scoped>
</style>
