<template>
  <div>
    <Navbar />
    <div class=" px-16 py-4" id="create">
      <div class="lg:w-2/3 w-full">
        <form  class="shadow-md rounded lg:px-8 pt-6 pb-8 mb-2 px-1">
          <div class="mb-4">
            <label class="block  text-sm font-bold mb-2" for="title">Title</label>
            <input
              class="shadow appearance-none rounded w-full py-2 px-3  leading-tight"
              id="title"
              type="text"
              placeholder="Title"
              v-model="card.title"
            />
          </div>
          <div class="mb-6">
            <label class="block  text-sm font-bold mb-2" for="description">Description</label>
             <quill-editor
                          class="text-white" 
                          v-model="card.description"
                          ref="myQuillEditor"
                          :options="editorOption"
                          >
            </quill-editor>
          </div>
          
          <div class="mb-6">
            <label class="block  text-sm font-bold mb-2" for="category">Category</label>
            <select
              class="shadow outline-none rounded w-full py-2 px-3  mb-3 leading-tight"
              v-model="card.category"
            >
              <option disabled value>Please select a category</option>
              <option v-for="category in categories" :key="category._id" :value="category._id">{{category.name}}</option>
            </select>
          </div>
          <div class="flex items-center justify-between">
            <button
              @click="createACard"
              class="shadow-lg bg-gray-500 hover:bg-gray-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >Create</button>
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
      editorOption:{

      },
      card: {
        title: "",
        description: "",
        // image: "",
        category: "",
        user:''
      },
      categories:[]
    };
  },
  methods: {
    async fetchCategories(){
      const result=await axios.get(`${process.env.VUE_APP_API_URL}category`);      
      this.categories=result.data;
    },
    async createACard(){
      // console.log(this.card.description);
      if(!this.card.title || !this.card.description || !this.card.category || !this.card.user){
        return this.$toasted.show('Please fill all the input fields!');
      }
      const result=await axios.post(`${process.env.VUE_APP_API_URL}card`,this.card);
      this.$router.push('/search');
    }
  },
  created(){
    this.fetchCategories();
    const user=JSON.parse(localStorage.getItem('flashcards-user'));
    if(user){
      this.card.user=user._id;
    }
  }
};
</script>

<style scoped>
</style>
