<template>
  <div>
    <Navbar />
    <div class="px-16 py-4" id="create">
      <div class="lg:w-2/3 w-full">
        <form class="shadow-md rounded lg:px-8 pt-6 pb-8 mb-2 px-1">
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2" for="title">Title</label>
            <input
              class="shadow appearance-none rounded w-full py-2 px-3 leading-tight"
              id="title"
              type="text"
              placeholder="Title"
              v-model="card.title"
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-bold mb-2" for="description">Description</label>
            <textarea
              class="shadow appearance-none rounded w-full py-2 px-3 outline-none leading-tight"
              name="description"
              id
              cols="30"
              rows="10"
              placeholder="Description"
              v-model="card.description"
            ></textarea>
          </div>

          <div class="mb-6">
            <label class="block text-sm font-bold mb-2" for="category">Category</label>
            <p class="mb-2">{{card.category.name}}</p>
            <select
              class="shadow outline-none rounded w-full py-2 px-3 mb-3 leading-tight"
              v-model="card.category"
            >
              <option disabled >Please select a category</option>
              <option
                v-for="category in categories"
                :key="category._id"
                :value="category._id"
              >{{category.name}}</option>
            </select>
          </div>
          <div class="flex items-center justify-between">
            <button
              @click="editCard"
              class="shadow-lg bg-gray-500 hover:bg-gray-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >Edit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar
  },
  data() {
    return {
      card: {
        title: "",
        description: "",
        // image: "",
        category: "",
        user: "",
        cardId:''
      },

      categories: []
    };
  },
  methods: {
    async fetchCategories() {
      const result = await axios.get(`${process.env.VUE_APP_API_URL}category`);
      this.categories = result.data;
    },
    async editCard() {
      // console.log(this.card.description);
        if(!this.card.title || !this.card.description || !this.card.category || !this.card.user){
          return this.$toasted.show('Fields cannot be empty');
        }
        const result=await axios.post(`${process.env.VUE_APP_API_URL}card/edit`,this.card);
        // console.log(result.data);
        this.card=result.data;
        this.$forceUpdate();
        this.$toasted.show('Card Successfully Updated!');
          setTimeout(()=>{
          this.$router.go(-1);
        },1500)
    },
    async fetchCardInfo() {
      const result = await this.$store.dispatch(
        "fetchSingleCard",
        this.$route.params.cardId
      );
    
      this.card.title=result.data.title;
      this.card.description=result.data.description;
      this.card.category=result.data.category._id;
      this.card.cardId=result.data._id;
      this.isLoading = false;
    }
  },
  created() {
    this.fetchCategories();
    this.fetchCardInfo();
    this.card.cardId=this.$route.params.cardId
    const user = this.$store.state.user;
    if (user) {
      this.card.user = user._id;
    }
  }
};
</script>

<style scoped>
</style>
