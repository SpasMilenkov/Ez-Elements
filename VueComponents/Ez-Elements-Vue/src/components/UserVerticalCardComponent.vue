<template>
    <div class="card flex">
        <div class="banner"></div>
        <div class="image-container">
            <img src="/default_images/profile-picture.jpg" alt="profile picture" class="user-picture" />
        </div>
        <div class="flex-column">
            <h2 class="subtitle">{{ data.userName }}</h2>

            <div class="flex-column" v-if="!customInfoColors">
                <div class="flex" v-for="(info, index) in data.userInfo" :key="index">
                    <Icon :icon="data.infoIcons[index]" :color="finalSettings.infoIcons?.iconFillColor"
                        :width="finalSettings.infoIcons?.iconSize" />
                    <h3 class="user-info">{{ info }}</h3>
                </div>
            </div>

            <div class="flex-column" v-if="customInfoColors">
                <div class="flex" v-for="(info, index) in data.userInfo" :key="index">
                    <Icon :icon="data.infoIcons[index]" :color="finalSettings.infoIcons?.iconFillColor"
                        :width="finalSettings.infoIcons?.iconSize" />
                    <h3 class="user-info">{{ info }}</h3>
                </div>
            </div>

            <div class="flex bottom-icons" v-if="!customMediaColors">
                <a class="media-link" :href="info" v-for="(info, index) in data.mediaIcons" :key="index">
                    <Icon :icon="data.mediaIcons[index]" :color="finalSettings.mediaIcons?.iconFillColor"
                        :width="finalSettings.mediaIcons?.iconSize" :inline="true"></Icon>

                </a>
            </div>
            <div class="flex bottom-icons" v-if="customMediaColors">
                <a class="media-link"  :href="info" v-for="(info, index) in data.mediaIcons" :key="index">
                    <Icon :icon="data.mediaIcons[index]" :color="finalSettings.mediaIcons?.multipleColors[index]"
                        :width="finalSettings.mediaIcons?.iconSize"  :inline="true" />
                </a>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {computed, ref } from 'vue';
import { CardData, CardSettings } from '../interfaces/CardInterfaces';
import { useBorderRadius } from '../composables/usePresets';
interface VerticalCardProps {
    settings?: CardSettings;
    data: CardData;
}
const defaultSettings: CardSettings = {
    subtitleColor: '#1E2833',
    subtitleFont: 'Roboto, var(--system-ui)',
    subtitleSize: '1.5625rem',
    detailsColor: '#1E2833',
    detailsFont: 'Lato, var(--system-ui)',
    detailsSize: '1.25rem',
    pictureBorder: 'solid 3px #F4F4F4',
    cardBackground: '#F4F7F9',
    radiusPreset: 'rounded',
    infoIcons: {
        iconFillColor: '#292D32',
        multipleColors: [],
        iconSize: 28,
    },
    mediaIcons: {
        iconFillColor: '#292D32',
        multipleColors: [],
        iconSize: 28,
    },
};

const props = withDefaults(defineProps<VerticalCardProps>(), {
    settings: (): CardSettings => {
        return {
            subtitleColor: '#1E2833',
            subtitleFont: 'Roboto, var(--system-ui)',
            subtitleSize: '1.5625rem',
            detailsColor: '#1E2833',
            detailsFont: 'Lato, var(--system-ui)',
            detailsSize: '1.25rem',
            pictureBorder: 'solid 3px #F4F4F4',
            cardBackground: '#F4F7F9',
            radiusPreset: 'rounded',
            infoIcons: {
                iconFillColor: '#292D32',
                multipleColors: [],
                iconSize: 28,
            },
            mediaIcons: {
                iconFillColor: '#292D32',
                multipleColors: [],
                iconSize: 28,
            },
        };
    },
    data: (): CardData => {
        return {
            userName: 'Spas Milenkov',
            userPicture: '/default_images/profile-picture.jpg',
            userBanner: '#3F54A8',
            userInfo: [
                'spasmilenkov123123@gmai.com',
                'www.spasmilenkov.dev',
                'Pazardjik, Bulgaria',
                '+359 123 456 78',
            ],
            infoIcons: [
                'bi:envelope',
                'bi:globe',
                'ion:location-outline',
                'bi:telephone',
            ],
            mediaIcons: [
                'bi:facebook',
                'bi:instagram',
                'bi:linkedin',
                'bi:twitter',
            ],
            userMedia: ['', '', ',', ''],
        };
    },
});
const finalSettings = computed(() => {
    const mergedSettings = {
        ...defaultSettings,
        ...props.settings
    };

    return mergedSettings;
});
const customInfoColors = ref<boolean>(false);
const customMediaColors = ref<boolean>(false);

function composeLayout(): void {
    if (props.settings === undefined) return;
    if (props.settings.infoIcons?.multipleColors.length !== 0) {
        customInfoColors.value = true;
    }
    if (props.settings.mediaIcons?.multipleColors.length !== 0) {
        customMediaColors.value = true;
    }
    console.log(props.settings.mediaIcons?.multipleColors);
}

const borderRadius = ref<string>(useBorderRadius(props.settings.radiusPreset));

composeLayout();
</script>
<style scoped>
.flex,
.flex-column {
    gap: 0.5rem;
    width: 100%;
}

.flex-column {
    align-items: flex-start;
    height: 65%;
    padding: 1rem;
}

.card,
.banner {
    width: 100%;
    max-width: 19.375rem;
    flex-shrink: 0;
    gap: 1rem;
}

.card {
    height: fit-content;
    max-height: 26.875rem;
    overflow: hidden;
    background: #f4f7f9;
    flex-direction: column;
    justify-content: flex-start;
    background: v-bind('finalSettings.cardBackground');
    border-radius: v-bind('borderRadius');
}

.banner {
    border-radius: v-bind('finalSettings.radiusPreset');
    height: 35%;
    min-height: 4.375rem;
    background: v-bind('data.userBanner');
    display: flex;
    z-index: 1;
    margin-bottom: 15%;
}

.image-container {
    width: 6.25rem;
    height: 6.25rem;
    flex-shrink: 0;
    position: absolute;
    transform: translateY(20%);
    z-index: 5;
}

.user-picture {
    object-fit: cover;
    outline: v-bind('finalSettings.pictureBorder');
    stroke-width: 3px;
    width: 6.25rem;
    height: 6.25rem;
    border-radius: 50%;
}

.subtitle,
.user-info {
    color: v-bind('finalSettings.subtitleColor');
    font-family: v-bind('finalSettings.subtitleFont');
    font-size: v-bind('finalSettings.subtitleSize');
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    width: 100%;
}

.user-info {
    color: v-bind('finalSettings.detailsColor');
    font-family: v-bind('finalSettings.detailsFont');
    font-size: v-bind('finalSettings.detailsSize');
    font-size: 1.25rem;
    text-align: left;
    max-width: 15.25rem;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 100%;
}

.bottom-icons {
    justify-content: center;
}

@media (max-width: 350px) {
    .user-info {
        max-width: 12rem;
    }
}
.media-link {
    width: v-bind('finalSettings.mediaIcons?.iconSize');
    height: v-bind('finalSettings.mediaIcons?.iconSize');

}
</style>
