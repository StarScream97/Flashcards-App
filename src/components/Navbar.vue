<template>
  <div class="shadow-md lg:px-16  px-4 py-2" id="navbar">
      <div class="lg:flex lg:justify-between">
        <div class="header">
          <router-link to="/"><h5>Flashcards</h5></router-link>
        </div>
        <div class="navbar-links flex flex-wrap">
          <router-link to="/cards" class="mr-4">Cards</router-link>
          <router-link to="/decks" class="mr-4">Decks</router-link>
          <router-link to="/create" class="mr-4">Create a card</router-link>
          <router-link to="/createcategory" class="mr-4">Create Category</router-link>
          <router-link to="/practice" class="mr-4">Practice</router-link>
          <router-link to="/profile" v-if="isLoggedIn" class="mr-4">Profile</router-link>
          <!-- <router-link to="/register" v-if="!isLoggedIn" class="mr-4">Register</router-link>
          <router-link to="/login" v-if="!isLoggedIn" class="mr-4">Login</router-link> -->
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
  watch:{
    // user:function(newVal,oldVal){
    //   if(newVal){
    //     this.user=newVal;
    //     return this.isLoggedIn=true;
    //   }
    //   this.isLoggedIn=false;
    //   console.log(this.isLoggedIn)
    // }
  },
  created(){
    if(JSON.parse(localStorage.getItem('flashcards-vuex'))){
      this.isLoggedIn=true;
    }
    // const user=JSON.parse(localStorage.getItem('flashcards-user'));
    // this.user=user;
  //     this.$store.watch(
  //       (state)=>{
  //           return this.$store.state.isLoggedIn 
  //       },
  //       (newValue, oldValue)=>{
  //         this.isLoggedIn=newValue;
  //       })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
