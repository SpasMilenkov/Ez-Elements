<template>
    <div class="flex-column card">
        <h1 class="subtitle">{{ data.cardTitle }}</h1>
        <div class="flex card-body">
            <v-icon></v-icon>
            <p class="card-content">{{ data.cardContent }}</p>
        </div>
        <div class="flex button-container">
            <EzSecondaryButton
                :settings="{ color: '#1E2833' }"
                @click="closePopup"
            />
            <EzMainButton background="#CF1124" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { EzMainButton } from '..';
import { EzSecondaryButton } from '..';
import { ref } from 'vue';
import { useBorderRadius } from '../composables/usePresets';
import { ActionCardSettings } from '../interfaces/ActionCardSettings';

interface ActionCardProps {
    settings?: ActionCardSettings;
    data: {
        cardTitle: string;
        cardContent: string;
    };
}
const props = withDefaults(defineProps<ActionCardProps>(), {
    settings: (): ActionCardSettings => {
        return {
            background: '#F4F7F9',
            showTitle: true,
            showButtons: true,
            radiusPreset: 'semi-rounded',
            titleColor: '#1E2833',
            titleFont: 'Lato, var(--system-ui)',
            titleSize: '1.675rem',
            contentFont: 'Lato, var(--system-ui)',
            contentSize: '1rem',
            contentColor: '#1E2833',
            highlightLine: {
                showHighlight: true,
                style: '5px solid #CF1124',
            },
        };
    },
});
const emit = defineEmits<{
    (e: 'close-popup'): void;
}>();

const closePopup = () => {
    emit('close-popup');
};

const borderRadius = ref<string>(useBorderRadius(props.settings.radiusPreset));
</script>
<style scoped>
.card {
    max-width: 20.75rem;
    min-height: 13rem;
    height: 100%;
    width: 100%;
    overflow: hidden;
    border-left: v-bind('settings.highlightLine?.style');
    background: v-bind('settings.background');
    flex-shrink: 0;
    padding: 1rem;
    align-items: flex-start;
    justify-content: space-between;
    border-radius: v-bind('borderRadius');
}

.subtitle {
    color: v-bind('settings.titleColor');
    font-family: v-bind('settings.titleFont');
    font-size: v-bind('settings.titleSize');
    font-style: bold;
    font-weight: 400;
    line-height: normal;
}

.card-content {
    text-align: left;
    width: 100%;
    color: v-bind('settings.contentColor');
    font-family: v-bind('settings.contentFont');
    font-size: v-bind('settings.contentSize');
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.button-container {
    justify-content: space-between;
    width: 100%;
}
</style>
../composables/presets
