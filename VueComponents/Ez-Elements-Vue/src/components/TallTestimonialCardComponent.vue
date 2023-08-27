<template>
    <div class="flex-column card">
        <div class="flex-column card-body">
            <p class="user-opinion">{{data.userOpinion}}</p>
            <img :src="data.userPictureUrl" alt="user picture" class="user-picture">
        </div>
        <div class="banner"></div>
    </div>
</template>
<script setup lang='ts'>
import {ref} from 'vue'
import { TallTestimonialCardSettings, TestimonialCardData } from '../interfaces/TestimonialCardInterfaces';

interface TallTestimonialCardProps {
    settings: TallTestimonialCardSettings,
    data: TestimonialCardData
}   
const defaultSettings = ref<TallTestimonialCardSettings>({
    opinionColor: '#1E2833',
    opinionFont: 'Lato, var(--system-ui)',
    opinionSize: '1',
    radiusPreset: 'rounded',
    background: '#F4F7F9',
    pictureBorderStyle: '3px solid #4B63B6',
    bannerBackground: '#34469C'
})
const props = withDefaults(defineProps<TallTestimonialCardProps>(), {
    settings: () => {
        return {
            opinionColor: '#1E2833',
            opinionFont: 'Lato, var(--system-ui)',
            opinionSize: '1.1rem',
            radiusPreset: 'rounded',
            background: '#F4F7F9',
            pictureBorderStyle: '3px solid #34469C',
            bannerColor: '#34469C'
        }
    },
    data: () => {
        return {
            userOpinion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique senectus et netus et malesuada.',
            userPictureUrl: '/default_images/profile-picture.jpg'
        }
    }
})
const finalSettings = ref({ ...defaultSettings.value, ...props.settings });
console.log(finalSettings.value.background); 
</script>
<style scoped>
.card{
  height: 100%;
  width: clamp(18.75rem, 100%, 20.75rem);
  height: 23.4375rem;
  overflow: hidden;
  flex-shrink: 0;
}
.card-body{
    background: v-bind('finalSettings.background');
    width:100%;
    min-height: 17.1875rem;
    position: relative;
    align-items: center;
    justify-content: center;
}
.user-opinion{
    width: 100%;
    height: 100%;
    color: v-bind('finalSettings.opinionColor');
    font-family: v-bind('finalSettings.opinionFont');
    font-size: v-bind('finalSettings.opinionSize');
    font-style: normal;
    font-weight: 400;
    line-height: 1.5625rem;
    text-align: left;
    padding: 1rem;
}
.user-picture{
    width: 6.25rem;
    height: 6.25rem;
    border-radius: 6.25rem;
    border: v-bind('finalSettings.pictureBorderStyle');
    position: absolute;
    bottom: -3rem;
    object-fit: cover;
}
.banner{
    width: 100%;
    height: 5rem;
    background: v-bind('finalSettings.bannerBackground');
    flex-shrink: 0;
}
</style>