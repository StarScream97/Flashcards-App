<template>
    <div class="flex flex-col  mt-8 items-center" v-if="userDetails">
        <h5>
            {{userDetails.name}}
        </h5>
        <p>{{userDetails.email}}</p>
    </div>
</template>

<script>
export default {
    props:['userDetails'],
    data(){
        return{
            
        }
    },
    created(){

    }
}
</script>
