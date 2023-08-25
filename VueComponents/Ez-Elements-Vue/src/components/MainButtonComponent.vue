<template>
    <button class="main-button reset" type="button" >{{ data.content }}</button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ButtonSettings, ButtonData } from '../interfaces/ButtonInterfaces';

interface MainButtonProps {
    settings?: ButtonSettings,
    data: ButtonData
}
const props = withDefaults(defineProps<MainButtonProps>(),
    {
        settings: () => {
            return {
                content: 'button',
                color: '#F4F7F9',
                background: '#3F54A8',
                fontFamily: "Lato, var(--system-ui)",
                radiusPreset: 'rounded',
                shadow: 'none',
                fontSize: '1rem',
                border: '2px solid transparent',
                borderFocused: '2px solid #E0E8F9',
            }
        },
        data: () => {
            return {
                content: 'My button',
                action: () => window.alert('Hello world')
            }
        }
    })

const borderRadius = ref<string>()

function setBorderRadius() {
    if (props.settings.customRadius !== undefined) {
        borderRadius.value = props.settings.customRadius;
        return;
    }
    if (props.settings.radiusPreset === 'no-radius') {
        borderRadius.value = '0rem'
        return;
    }
    if (props.settings.radiusPreset === 'rounded') {
        borderRadius.value = '0.9375rem'
        return;
    }
    if (props.settings.radiusPreset === 'semi-rounded') {
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
    background: v-bind('settings.background');
    justify-content: center;
    align-items: center;
    cursor: pointer;
    gap: 0.625rem;

    color: v-bind('settings.color');
    font-family: v-bind('settings.fontFamily');
    border: v-bind('settings.border');
    font-size: v-bind('settings.borderFocused');
}

.main-button:focus-visible {
    outline: v-bind('settings.borderFocused');
    border: 2px solid transparent;
}
</style>