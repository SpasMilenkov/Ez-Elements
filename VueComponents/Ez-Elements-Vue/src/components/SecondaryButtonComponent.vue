<template>
    <button type="button" class="secondary-button">{{ data.content }}</button>
</template>
<script setup lang="ts">
import { ButtonData, ButtonSettings } from '../interfaces/ButtonInterfaces';
import { ref } from 'vue'

interface SecondaryButtonProps {
    settings?: ButtonSettings,
    data: ButtonData
}
const props = withDefaults(defineProps<SecondaryButtonProps>(),
    {
        settings: () => {
            return {
                content: 'Log in',
                color: '#F4F7F9',
                background: 'transparent',
                fontFamily: "'Lato', var(--system-ui)",
                radiusPreset: 'rounded',
                shadow: 'none',
                fontSize: '1rem',
                border: '2px solid transparent',
                borderFocused: '2px solid #1E2833',
                action: () => {
                    window.alert('Hello world')
                }
            }
        },
        data: () => {
            return {
                content: 'secondary',
                action: () => window.alert('Hello world')
            }

        }
    },)

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
.secondary-button {
    display: inline-flex;
    overflow: hidden;
    padding: 0.25rem 0.625rem;
    border: 2px solid #3F54A8;
    background: rgba(255, 255, 255, 0.00);
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    border-radius: v-bind('borderRadius');

    color: v-bind('settings.color');
    text-align: center;
    /* Regular text small */
    font-family: v-bind('settings.fontFamily');
    font-size: v-bind('settings.fontSize');
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
    transition: border 0.3s, color 0.3s;
}

.secondary-button:hover,
.secondary-button:focus {
    border: v-bind('settings.borderFocused');
}

.secondary-button:focus-visible {
    outline: v-bind('settings.borderFocused');
    border: 2px solid transparent;
}</style>