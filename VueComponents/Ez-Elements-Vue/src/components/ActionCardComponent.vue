<template>
    <div class="flex-column card">
        <h1 class="subtitle">Card title goes here</h1>
        <div class="flex card-body">
            <v-icon></v-icon>
            <p class="card-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div class="flex button-container">
            <EzSecondaryButton color="#1E2833"/>
            <EzMainButton background="#CF1124" />
        </div>
    </div>
</template>
<script setup lang='ts'>
import { EzMainButton } from '..';
import { EzSecondaryButton } from '..';
import {ref} from 'vue'
import { setBorderRadius } from '../presets';

export interface ActionCardSettings{
    radiusPreset: RadiusPreset
}

interface ActionCardProps {
    settings?: ActionCardSettings,
    data: {
        cardTitle: string,
        cardContent: string,
        buttonSettingsLeft: {},
        buttonSettingsRight: {} 
    }
}
const props = withDefaults(defineProps<ActionCardProps>(),  {
    settings: () => {
        return {
            radiusPreset: 'semi-rounded'
        }
    }
})

const borderRadius = ref<string>(setBorderRadius(props.settings.radiusPreset))
</script>
<style scoped>
.card {
    width: 20.75rem;
    height: 13rem;
    overflow: hidden;
    border-left: 5px solid #CF1124;
    background: #F4F7F9;
    flex-shrink: 0;
    padding: 1rem;
    align-items: flex-start;
    justify-content: space-between;
    border-radius: v-bind('borderRadius');
}

.subtitle {
    color: #1E2833;
    font-family: Lato;
    font-size: 1.675rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}


.card-content {
    text-align: left;
    width: 100%;
    color: #1E2833;
    font-family: Lato;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.button-container {
    justify-content: space-between;
    width: 100%;
}
</style>