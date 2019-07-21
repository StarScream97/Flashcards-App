<template>
  <div>
    <Navbar />
    <div class=" px-16 py-4" id="create">
      <div class="lg:w-2/3 w-full">
        <form  class="shadow-md rounded lg:px-8 px-2 pt-6 pb-8 mb-2">
          <div class="mb-4">
            <label class="block  text-sm font-bold mb-2" for="name">Name</label>
            <input
              class="shadow appearance-none rounded w-full py-2 px-3  leading-tight"
              id="name"
              type="text"
              placeholder="Name"
              v-model="category.name"
            />
          </div>
          <div class="mb-4">
            <label class="block  text-sm font-bold mb-2" for="description">Description</label>
            <input
              class="shadow appearance-none rounded w-full py-2 px-3  leading-tight"
              id="description"
              type="text"
              placeholder="Description"
              v-model="category.description"
            />
          </div>        
          <div class="flex items-center justify-between">
            <button
              @click="createCategory"
              class="shadow-lg bg-gray-300 hover:bg-gray-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
        category:{
            name:'',
            description:'',
            
        },
        user:''
    };
  },
  methods: {
    async createCategory(){
        if(this.name=="" || this.description==""){
            return this.$toasted.show('Please fill in all the fields!');
        }
        await this.$store.dispatch('createCategory',{
            name:this.category.name,
            description:this.category.description,
            user:this.user
        });
        this.$router.push('/search');

    }
  },
  created(){
    const user=this.$store.state.user;
    if(user){
      this.user=user._id;
    }
  }
};
</script>

<style scoped>
</style>
