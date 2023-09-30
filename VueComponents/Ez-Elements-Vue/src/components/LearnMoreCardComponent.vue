<template>
    <div class="card-body">
        <div class="flex-column">
            <h1 class="card-heading">{{ data.cardTitle }}</h1>
            <p class="card-text">{{ data.cardContent }}</p>
            <router-link :to="data.linkPath" class="card-link">{{ data.linkContent }}</router-link>
        </div>
        <picture>
            <source type="webp" srcset="">
            <img class="info-image" :src="data.imageSingleSource" :alt="data.imageAlt" class="info-image" :loading="finalSettings.imageSettings?.imageLoading" :decoding="finalSettings.imageSettings?.imageDecoding" fetchpriority="high" sizes="">
        </picture>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
import { InfoCardSettings, InfoCardData } from '../interfaces/InfoCardInterfaces'

const defaultSettings: InfoCardSettings = {
    titleColor: '#333',
    contentColor: '#666',
    titleSize: '1.5rem',
    contentSize: '1rem',
    backgroundColor: '#f7f7f7',
    cardBorderRadius: 'semi-rounded',
    imageSettings: {
        pictureBorderRadius: 'rounded',
        imageSizes: ['100px', '200px', '300px'],
        imageLoading: 'lazy',
        imageDecoding: 'auto'
    },
    linkSettings: {
        color: '#3498db',
        background: 'transparent',
        borderRadius: 'rounded'
    }
};


interface InfoCardProps {
    settings?: InfoCardSettings,
    data?: InfoCardData
}

const props = withDefaults(defineProps<InfoCardProps>(), {
    settings: () => {
        return {
            titleColor: '#333',
            contentColor: '#666',
            titleSize: '1.5rem',
            contentSize: '1rem',
            backgroundColor: '#f7f7f7',
            cardBorderRadius: 'semi-rounded',
            imageSettings: {
                pictureBorderRadius: 'rounded',
                imageSizes: ['100px', '200px', '300px'],
                imageLoading: 'lazy',
                imageDecoding: 'auto'
            },
            linkSettings: {
                color: '#3498db',
                background: 'transparent',
                borderRadius: 'rounded'
            }
        }
    },
    data: () => {
        return {
            cardTitle: 'Sample Card Title',
            cardContent: 'This is some sample card content. You can replace it with your own text.',
            linkContent: 'Read More',
            linkPath: '/sample-link',
            imageSingleSource: 'https://example.com/sample-image.jpg',
            imageAlt: 'Sample Image Alt Text',
            imageSrcSet: ['https://example.com/sample-image-400w.jpg 400w', 'https://example.com/sample-image-800w.jpg 800w']
        }

interface InfoCardProps {
    settings?: InfoCardSettings,
    data?: InfoCardData
}
</script>
<style scoped></style>