<template>
    <button type="button" class="secondary-button">{{ data.content }}</button>
</template>
<script setup lang="ts">
import { ButtonData, ButtonSettings } from '../interfaces/ButtonInterfaces';
import { ref } from 'vue';
import { useBorderRadius } from '../composables/usePresets';
interface SecondaryButtonProps {
    settings?: ButtonSettings;
    data: ButtonData;
}
const defaultSettings: ButtonSettings = {
    color: '#F4F7F9',
    background: 'transparent',
    fontFamily: 'Lato, var(--system-ui)',
    radiusPreset: 'rounded',
    shadow: 'none',
    fontSize: '1rem',
    border: '2px solid transparent',
    borderFocused: '2px solid #1E2833',
};
const props = withDefaults(defineProps<SecondaryButtonProps>(), {
    settings: () => {
        return {
            color: '#F4F7F9',
            background: 'transparent',
            fontFamily: 'Lato, var(--system-ui)',
            radiusPreset: 'rounded',
            shadow: 'none',
            fontSize: '1rem',
            border: '2px solid transparent',
            borderFocused: '2px solid #1E2833',
        };
    },
    data: () => {
        return {
            content: 'secondary',
            action: () => window.alert('Hello world'),
        };
    },
});

const finalSettings = ref({ ...defaultSettings, ...props.settings });
const borderRadius = ref<string>(useBorderRadius(props.settings.radiusPreset));
</script>
<style scoped>
.secondary-button {
    display: inline-flex;
    overflow: hidden;
    padding: 0.25rem 0.625rem;
    border: 2px solid #3f54a8;
    background: rgba(255, 255, 255, 0);
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    border-radius: v-bind('borderRadius');
    max-width: fit-content;
    height: fit-content;

    color: v-bind('finalSettings.color');
    text-align: center;
    /* Regular text small */
    font-family: v-bind('finalSettings.fontFamily');
    font-size: v-bind('finalSettings.fontSize');
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
    transition:
        border 0.3s,
        color 0.3s;
}

.secondary-button:hover,
.secondary-button:focus {
    border: v-bind('finalSettings.borderFocused');
}

.secondary-button:focus-visible {
    outline: v-bind('finalSettings.borderFocused');
    border: 2px solid transparent;
}
</style>
