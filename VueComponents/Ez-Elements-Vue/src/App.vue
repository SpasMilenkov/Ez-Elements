<template>
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
    <UserVerticalCard />
    <UserHorizontalCard />
    <ActionCard
        :data="{
            cardTitle: 'My Card',
            cardContent: 'My epic popup i guess',
        }"
        v-if="showPopup"
        @close-popup="showPopup = false"
    />
    <TallFormComponent ></TallFormComponent>
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
    > -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainButton from './components/MainButtonComponent.vue';
import UserVerticalCard from './components/UserVerticalCardComponent.vue';
import ActionCard from './components/ActionCardComponent.vue';
import UserHorizontalCard from './components/UserHorizontalCardComponent.vue';
import SecondaryButton from './components/SecondaryButtonComponent.vue';
import TallFormComponent from './components/FormComponent.vue';
const showPopup = ref(false);

function togglePopup() {
    showPopup.value = true;
}
</script>
<style scoped></style>
