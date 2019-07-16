<template>
    <div>
        <Navbar />
        <div id="practice">
            <p>This is where you practice a number of cards on a certain category.</p>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar';
const axios=require('axios');

export default {
    components:{
        Navbar
    },
    data(){
        return{

        }
    }
}
</script>
