<template>
    <button class="main-button reset" type="button">{{ data.content }}</button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ButtonSettings, ButtonData } from '../interfaces/ButtonInterfaces';
import { useBorderRadius } from '../composables/usePresets';
interface MainButtonProps {
    settings?: ButtonSettings,
    data: ButtonData
}
const defaultSettings: ButtonSettings = {
    color: '#F4F7F9',
    background: '#3F54A8',
    fontFamily: "Lato, var(--system-ui)",
    radiusPreset: 'rounded',
    shadow: 'none',
    fontSize: '1rem',
    border: '2px solid transparent',
    borderFocused: '2px solid #E0E8F9',
}
const props = withDefaults(defineProps<MainButtonProps>(),
    {
        settings: () => {
            return {
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

const borderRadius = ref<string>(useBorderRadius(props.settings.radiusPreset))
const finalSettings = ref({ ...defaultSettings, ...props.settings })

</script>
<style scoped>
.main-button {
    all: unset;
    display: inline-flex;
    overflow: hidden;
    padding: 0.25rem 0.625rem;
    background: v-bind('finalSettings.background');
    justify-content: center;
    align-items: center;
    cursor: pointer;
    gap: 0.625rem;

    color: v-bind('finalSettings.color');
    font-family: v-bind('finalSettings.fontFamily');
    border: v-bind('finalSettings.border');
    font-size: v-bind('finalSettings.borderFocused');
    border-radius: v-bind('borderRadius');
}

.main-button:hover,
.main-button:focus {
    border: v-bind('finalSettings.borderFocused');
}

.main-button:focus-visible {
    outline: v-bind('finalSettings.borderFocused');
    border: 2px solid transparent;
}
</style>