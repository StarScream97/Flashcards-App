<template>
  <div>
    <Navbar />
    <div class="w-full flex flex-col lg:flex-row px-8 py-4 min-h-screen">
      <div class="mr-2 lg:w-1/6 w-full ">
        <div class="flex flex-col">
            <div class="mb-4 flex  flex-col">
                <p class=" mb-2 uppercase">Profile</p>
                <div class="lg:flex-col  flex">
                  <!-- <router-link class="mb-1 mr-4" to="/profile/info" ><i class="fas fa-user-alt mr-3"></i> <strong> Info</strong></router-link> -->
                  <router-link class="mb-1 mr-4" :to="{name:'info', params:{userDetails:{name:user.name,email:user.email}}}" ><i class="fas fa-user-alt mr-3"></i> <strong> Info</strong></router-link>
                  <router-link class="mb-1 mr-4" :to="{name:'cards',params:{cards:user.cards}}"><i class="fas fa-square mr-3"></i><strong>My Cards</strong> </router-link>
                  <router-link class="mb-1" :to="{name:'savedcards',params:{email:user.email}}"><i class="fas fa-star mr-3"></i><strong>Saved Cards</strong> </router-link>
                  <router-link class="mb-1" :to="{name:'mydecks',params:{email:user.email}}"><i class="fas fa-star mr-3"></i><strong>Decks</strong> </router-link>
                </div>
            </div>
            <div class="mb-4 flex flex-col">
                <p class="  mb-2 uppercase">Learn</p>
                <div class="lg:flex lg:flex-col">
                  <router-link class="mb-1 mr-4" to="/profile/learn"><i class="fab fa-leanpub mr-3"></i><strong>Learn</strong> </router-link>
                  <router-link class="mb-1 mr-4" to="/profile/reports"><i class="fas fa-file mr-3"></i><strong>Reports</strong> </router-link>
                </div>
            </div>
        </div>
      </div>
      <router-view class="px-2 py-2 w-full"></router-view>
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
    async fetchUserProfile(){
      const user=JSON.parse(localStorage.getItem('flashcards-user'));

      const result=await axios.get(`${process.env.VUE_APP_API_URL}user/profile/${user.email}`);
      if(!result.error){
        this.user=result.data;
        // console.log(result.data);
        localStorage.setItem('flashcards-user',JSON.stringify(result.data));
      }
    }
  },
  created() {
    this.fetchUserProfile();
  }
};
</script>
