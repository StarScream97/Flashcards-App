<template>
  <div class="home">
    <Navbar/>
    <div class="mt-5 lg:px-16 px-2 py-2">
        <h5>Welcome to the Flashcards App.</h5>
        <p class="mb-2">It is designed to be used as a flashcard for remembering important notes and topics.</p>
        <p class="mb-2">This is a Progressive Web App so it will sit right into your smartphone like any app would. Of course you can view it in the browser as well.</p>
        <p class="mb-2">The app also supports caching, so you can view all the cards and decks even Offline!</p>
        <p class="mb-2">Please note that this is just a prototype, there are lots of areas to improve upon, such as the UI, different sections/pages. And there are tonnes of bugs to be dealt with.</p>
        <p class="mb-2">Having said that, please create and share as much cards as you can to help others as well.</p>


        <div class="mt-8" v-if="!isLoggedIn">
          <router-link to="/register" class="mr-4 rounded-full border px-8 py-2">Register</router-link>
          <router-link to="/login" class="mr-4 rounded-full border px-8 py-2">Login</router-link>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'home',
  components: {
    Navbar
  },
  data(){
    return{
      isLoggedIn:false
    }
  },
  created(){
    // if(JSON.parse(localStorage.getItem('flashcards-vuex'))){
    //   this.isLoggedIn=true;
    // }
    if(this.$store.state.isLoggedIn){
      this.isLoggedIn=true;
    }
  }
}
</script>
