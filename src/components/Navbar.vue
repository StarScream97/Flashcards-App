<template>
  <div class="shadow-md lg:px-16 text-white px-4 py-2" id="navbar">
      <div class="lg:flex lg:justify-between">
        <div class="header">
          <router-link to="/"><h5>Flashcards</h5></router-link>
        </div>
        <div class="navbar-links flex">
          <router-link to="/create" class="mr-3">Create a card</router-link>
          <router-link to="/createcategory" class="mr-3">Create Category</router-link>
          <router-link to="/search" class="mr-3">Search</router-link>
          <router-link to="/practice" class="mr-3">Practice</router-link>
          <router-link to="/profile" class="mr-3">Profile</router-link>
          <router-link to="/login" v-if="!isLoggedIn" class="mr-3">Login</router-link>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data(){
    return{
      user:{},
      isLoggedIn:false
    }
  },
  created(){
    const user=JSON.parse(localStorage.getItem('flashcards-user'));
    if(user){
      this.isLoggedIn=true;
      this.user=user;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
