<template>
    <main class="grid">
            <div :class="$style.flex">
                <MainButton
                    :data="{
                        content: 'Test',
                    }"
                    :settings="{
                        color: 'black',
                    }"
                    @click="togglePopup"
                />
                <SecondaryButton
                    :data="{
                        content: 'Test',
                    }"
                />
            </div>
            <div :class="$style.flex">
                <UserVerticalCard />
            </div>
            <div :class="$style.flex">
                <UserHorizontalCard />
            </div>
            <div :class="$style.flex">
                <ActionCard
                    :data="{
                        cardTitle: 'My Card',
                        cardContent: 'My epic popup i guess',
                    }"
                    v-if="showPopup"
                    @close-popup="showPopup = false"
                />
            </div>
            <div :class="$style.flex">
                <TallFormComponent />
            </div>
            <div :class="$style.flex">
                <TestimonialCard />
            </div>
            <div :class="$style.flex">
                <TallTestimonialCard />
            </div>
    </main>

    <!-- 
    Photo by
    <a
        href="https://unsplash.com/@podpros?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >PodPros</a
    >
    on
    <a
        href="https://unsplash.com/photos/GEnCnYhA1J4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >Unsplash</a    
    > 
    Photo by <a href="https://unsplash.com/@contentbyemile?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Emile</a> on <a href="https://unsplash.com/photos/ANKHSrwLhWU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
        
    -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainButton from './components/MainButtonComponent.vue';
import UserVerticalCard from './components/UserVerticalCardComponent.vue';
import ActionCard from './components/ActionCardComponent.vue';
import UserHorizontalCard from './components/UserHorizontalCardComponent.vue';
import SecondaryButton from './components/SecondaryButtonComponent.vue';
import TallFormComponent from './components/FormComponent.vue';
import TestimonialCard from './components/TestimonialCardComponent.vue';
import TallTestimonialCard from './components/TallTestimonialCardComponent.vue';

const showPopup = ref(false);

function togglePopup() {
    showPopup.value = true;
}
</script>
<style module>
.flex{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}
</style>
