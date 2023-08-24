<template>
    <button class="main-button reset" type="button" @click="action">{{ content }}</button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ButtonSettings } from '../interfaces/ButtonInterfaces';

const props = withDefaults(defineProps<ButtonSettings>(),
    {
        content: 'button',
        color: '#F4F7F9',
        background: '#3F54A8',
        fontFamily: "'Lato', var(--system-ui)",
        radiusPreset: 'rounded',
        shadow: 'none',
        fontSize: '1rem',
        border: '2px solid transparent',
        borderFocused: '2px solid #E0E8F9',
        action: () => {
            window.alert('Hello world') 
        }
    })

const borderRadius = ref<string>()

function setBorderRadius() {
    if (props.customRadius !== undefined) {
        borderRadius.value = props.customRadius;
        return;
    }
    if (props.radiusPreset === 'no-radius') {
        borderRadius.value = '0rem'
        return;
    }
    if (props.radiusPreset === 'rounded') {
        borderRadius.value = '0.9375rem'
        return;
    }
    if (props.radiusPreset === 'semi-rounded') {
        borderRadius.value = '0.3125rem'
        return;
    }
}

setBorderRadius()


</script>
<style scoped>
.main-button {
    all: unset;
    display: inline-flex;
    overflow: hidden;
    padding: 0.25rem 0.625rem;
    background: v-bind(background);
    justify-content: center;
    align-items: center;
    gap: 0.625rem;

    color: v-bind(color);
    font-family: v-bind(fontFamily);
    border: v-bind(border);
    font-size: v-bind(fontSize);
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: center;

    box-shadow: v-bind(shadow);
    cursor: pointer;
    border-radius: v-bind(borderRadius);
    transition: border 0.3s, color 0.3s;
}

.main-button:hover,
.main-button:focus {
    border: v-bind(borderFocused);
}
.main-button:focus-visible {
    outline: v-bind(borderFocused);
    border: 2px solid transparent;
}
</style>