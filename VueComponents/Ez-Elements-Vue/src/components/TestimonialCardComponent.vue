<template>
    <div class="flex-column card">
        <div class="info-wrapper flex">
            <img :src="data.userPictureUrl" alt="User picture" class="user-picture">
            <h2 class="subtitle">{{ data.userName }}</h2>
        </div>
        <p class="user-opinion">{{ data.userOpinion }}</p>
    </div>
</template>
<script setup lang='ts'>
import { computed, ref } from 'vue'
import { TestimonialCardSettings, TestimonialCardData } from '../interfaces/TestimonialCardInterfaces';
import { useBorderRadius } from '../composables/usePresets';


interface TestimonialCardProps {    
    settings?: TestimonialCardSettings,
    data: TestimonialCardData,
}

const defaultSettings = ref<TestimonialCardSettings>({
    subtitleColor: '#1E2833',
    subtitleFont: 'Lato, var(--system-ui)',
    subtitleSize: '2rem',
    opinionColor: '#1E2833',
    opinionFont: 'Lato, var(--system-ui)',
    opinionSize: '1',
    radiusPreset: 'rounded',
    background: '#F4F7F9',
    pictureBorderStyle: '3px solid #34469C',
    highlightLine: {
        showHighlight: true,
        style: '5px solid #34469C'
    }
})

const props = withDefaults(defineProps<TestimonialCardProps>(), {
    settings: (): TestimonialCardSettings => {
        return {
            subtitleColor: '#1E2833',
            subtitleFont: 'Lato, var(--system-ui)',
            subtitleSize: '2rem',
            opinionColor: '#1E2833',
            opinionFont: 'Lato, var(--system-ui)',
            opinionSize: '1',
            radiusPreset: 'rounded',
            background: '#F4F7F9',
            pictureBorderStyle: '3px solid #34469C',
            highlightLine: {
                showHighlight: true,
                style: '5px solid #34469C'
            }
        }
    },
    data: (): TestimonialCardData => {
        return {
            userName: 'User name',
            userOpinion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique senectus et netus et malesuada.',
            userPictureUrl: '/default_images/profile-picture.jpg'
        }
    }
})

const borderRadius = ref<string>(useBorderRadius(props.settings.radiusPreset));
const finalSettings = computed(() => {
    const mergedSettings = {
        ...defaultSettings.value,
        ...props.settings
    };

    return mergedSettings;
});
</script>
<style scoped>
.card {
    max-width: 35.6875rem;
    min-height: 16.4375rem;
    width: 100%;
    overflow: hidden;
    background: v-bind('finalSettings.background');
    padding: 1rem 2rem;
    gap: 1rem;
    border-bottom: v-bind('finalSettings.highlightLine?.style');
    border-radius: v-bind('borderRadius');
}

.info-wrapper {
    gap: 1rem;
    width: 100%;
}

.user-picture {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    border: v-bind('finalSettings.pictureBorderStyle');
    object-fit: cover;
}

.subtitle {
    overflow: hidden;
    gap: 0.625rem;
    color: v-bind('finalSettings.subtitleColor');
    font-family:v-bind('finalSettings.subtitleFont');
    font-size: v-bind('finalSettings.subtitleSize');
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.user-opinion {
    color: v-bind('finalSettings.opinionColor');
    font-family: v-bind('finalSettings.opinionFont');
    font-size: v-bind('finalSettings.opinionSize');
    font-style: normal;
    font-weight: 400;
    line-height: 1.5625rem;
    text-align: left;
}
@media (max-width: 450px){
    .info-wrapper {
        flex-direction: column;
    }
}
</style>