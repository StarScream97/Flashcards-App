<template>
  <div>
    <Navbar />
    <div class="min-h-screen px-2 py-4">
      <div class="w-full max-w-lg mx-auto">
        <form @submit.prevent="register" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
            <input
              class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="name"
              type="text"
              placeholder="Name"
              v-model="user.name"
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Email</label>
            <input
              class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
              id="email"
              type="email"
              placeholder="Email"
              v-model="user.email"
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
            <input
              class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
              id="password"
              type="password"
              placeholder="Password"
              v-model="user.password"
            />
          </div>

          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="repeatPassword">Repeat Password</label>
             <input
              class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
              id="repeatPassword"
              type="password"
              placeholder="Password"
              v-model="repeatPassword"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="shadow-lg hover:bg-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >Signup</button>
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
      user:{
          name:"",
          password:"",
          email:""
      },
      repeatPassword:""
    };
  },
  methods: {
      register(){
          if(!this.user.name || !this.user.password || !this.user.email){
              return this.$toasted.show('Please fill all the inputs');
          }
          if(this.user.password!==this.repeatPassword){
              return this.$toasted.show("Passwords do not match!");
          }
        this.$store.dispatch('register',this.user);
        this.$router.push('/cards');
      }
  }
};
</script>

<style scoped>
</style>
