<template>
    <div class="flex flex-col  mt-8 items-center" >
        <h5>
            {{this.$store.state.user.name}}
        </h5>
        <p>{{this.$store.state.user.email}}</p>
    </div>
</template>

<script>
export default {
    // props:['userDetails'],
    data(){
        return{
            
        }
    },
    created(){

    }
}
</script>
