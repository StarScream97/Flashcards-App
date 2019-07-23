<template>
  <div>
    <Navbar />
    <div class="w-full flex flex-col lg:flex-row px-8 min-h-screen">
      <div class="mr-2 lg:w-1/6 w-full py-2">
        <div class="flex flex-col ">
            <div class="mb-4 flex  flex-col">
                <p class=" mb-2 uppercase">Profile</p>
                <div class="lg:flex-col  flex">
                  <!-- <router-link class="mb-1 mr-4" to="/profile/info" ><i class="fas fa-user-alt mr-3"></i> <strong> Info</strong></router-link> -->
                  <router-link class="mb-1 mr-4" :to="{name:'info', params:{userDetails:{name:user.name,email:user.email}}}" ><i class="fas fa-user-alt mr-3"></i> <strong> Info</strong></router-link>
                  <router-link class="mb-1 mr-4" :to="{name:'cards',params:{cards:user.cards}}"><i class="fas fa-square mr-3"></i><strong>My Cards</strong> </router-link>
                  <router-link class="mb-1" :to="{name:'mydecks',params:{email:user.email}}"><i class="fas fa-box mr-3"></i><strong>My Decks</strong> </router-link>
                  <router-link class="mb-1" :to="{name:'savedcards',params:{email:user.email}}"><i class="fas fa-star mr-3"></i><strong>Saved Cards</strong> </router-link>
                  <router-link class="mb-1" :to="{name:'saveddecks'}"><i class="fas fa-boxes mr-3"></i><strong>Saved Decks</strong> </router-link>
                </div>
            </div>
            <div class="mb-4 flex flex-col">
                <p class="  mb-2 uppercase">Learn</p>
                <div class="lg:flex lg:flex-col">
                  <router-link class="mb-1 mr-4" to="/profile/learn"><i class="fab fa-leanpub mr-3"></i><strong>Learn</strong> </router-link>
                  <router-link class="mb-1 mr-4" to="/profile/report"><i class="fas fa-file mr-3"></i><strong>Reports</strong> </router-link>
                </div>
            </div>
        </div>
      </div>
      <router-view class="px-2 py-8 w-full shadow"></router-view>
      <!-- <div class="px-2 py-2 lg:w-2/3 w-full">
        <div class="lg:w-1/2 w-full">
          <h6>{{user.name}}</h6>
        </div>
        <div class="lg:w-1/2 w-full">
          <h6>{{user.email}}</h6>
        </div>
         <div v-if="user.cards" class="lg:w-1/2 w-full">
          <p>Total Cards: {{user.cards.length}}</p>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

const axios=require('axios');

export default {
  components: {
    Navbar
  },
  data() {
    return {
      user:{}
    };
  },
  methods: {
    // async fetchUserProfile(){
    //   const user=this.$store.state.user;

    //   const result=await axios.get(`${process.env.VUE_APP_API_URL}user/profile/${user.email}`);
    //   if(result.data.error){
    //     return this.$toasted.show(result.data.errorLog);
    //   }
    //     this.user=result.data;
    //     this.$store.commit('setUser',result.data);
    // }
  },
  created() {
    this.user=this.$store.state.user;
    // this.fetchUserProfile();
  }
};
</script>
