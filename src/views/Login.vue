<template>
  <div>
    <Navbar />
    <form @submit.prevent="login"  class="lg:w-2/3 w-full px-16 py-2 mt-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
        <input
          class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight"
          id="email"
          type="email"
          placeholder="Email"
          v-model="user.email"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
        <input
          class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight"
          id="password"
          type="password"
          placeholder="Password"
          v-model="user.password"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="shadow-lg hover:bg-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
const axios = require("axios");

export default {
  components: {
    Navbar
  },
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
        if(this.user.email==="" || this.user.password===""){
            return this.$toasted.show('Please fill all the inputs');            
        }
        const result=await axios.post(`${process.env.VUE_APP_API_URL}user/login`,this.user);
        console.log(result.data);
        localStorage.setItem('flashcards-user',JSON.stringify(result.data));
        this.$router.push('/cards');
    }
  }
};
</script>
