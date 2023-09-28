<template>
    <input
        :value="modelValue"
        class="form-input"
        :type="settings.inputType"
        :placeholder="settings.placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useBorderRadius } from '../composables/usePresets';

export interface InputSettings {
    color?: string;
    backgroundColor?: string;
    fontSize?: string;
    fontFamily?: string;
    placeholder?: string;
    inputType?: string;
    radiusPreset: RadiusPreset;
}

interface InputProps {
    settings?: InputSettings;
    modelValue: string;
}
const defaultSettings: InputSettings = {
    color: '#1E2833',
    backgroundColor: '#E0E8F9',
    fontSize: '1rem',
    fontFamily: 'Lato, var(--system-ui)',
    placeholder: 'Input text here...',
    inputType: 'text',
    radiusPreset: 'semi-rounded',
};
const props = withDefaults(defineProps<InputProps>(), {
    settings: (): InputSettings => {
        return {
            color: '#1E2833',
            backgroundColor: '#E0E8F9',
            fontSize: '1rem',
            fontFamily: 'Lato, var(--system-ui)',
            placeholder: 'Input text here...',
            inputType: 'text',
            radiusPreset: 'semi-rounded',
        };
    },
    value: 'Default input value',
});
const borderRadius = ref<string>(useBorderRadius(props.settings.radiusPreset));
const finalSettings = ref({ ...defaultSettings, ...props.settings });
</script>
<style scoped>
.form-input {
    min-width: 9.375rem;
    width: 100%;
    overflow: hidden;
    padding: 0.25rem 0.1875rem;
    border-radius: v-bind('borderRadius');
    background: v-bind('finalSettings.backgroundColor');
    color: v-bind('finalSettings.color');
    font-family: v-bind('finalSettings.fontFamily');
    font-size: v-bind('finalSettings.fontSize');
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
</style>
