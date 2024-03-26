<template>
    <el-carousel :interval="5000" arrow="always" height="440px">
        <el-carousel-item v-for="carousel in carouselList" :key="carousel">
            <img class="image" :src="'data:image/jpeg;base64,' + carousel" alt="" srcset="">
        </el-carousel-item>
    </el-carousel>
</template>
  
<script setup>
import api from '../../../api';
import { reactive } from 'vue'

const carouselList = reactive([]);

load();

function load() {
    api.getGetCarousel().then(Response => {
        if (true === Response.data.data.isGet) {
            Response.data.data.carouselList.forEach((value) => {
                carouselList.push(value);
            });
        }
    })
}

</script>

<style scoped>
.image {
    width: 100%;
    height: 100%;
}
</style>
  