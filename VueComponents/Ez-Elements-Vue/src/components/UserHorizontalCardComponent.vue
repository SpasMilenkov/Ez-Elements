<template>
    <div class="card flex">
        <div class="banner flex">
            <div class="image-container flex-column">
                <img :src="data.userPicture" alt="" class="user-picture" />
            </div>

            <div class="media-container flex">
                <div class="flex bottom-icons" v-if="!customMediaColors">
                    <a
                        :href="info"
                        v-for="(info, index) in data.mediaIcons"
                        :key="index"
                    >
                        <v-icon
                            :name="data.mediaIcons[index]"
                            :fill="settings.mediaIcons?.iconFillColor"
                            :scale="settings.mediaIcons?.iconSize"
                        />
                    </a>
                </div>

                <div class="flex bottom-icons" v-if="customMediaColors">
                    <a
                        :href="info"
                        v-for="(info, index) in data.mediaIcons"
                        :key="index"
                    >
                        <v-icon
                            :name="data.mediaIcons[index]"
                            :fill="settings.mediaIcons?.multipleColors[index]"
                            :scale="settings.mediaIcons?.iconSize"
                        />
                    </a>
                </div>
            </div>
        </div>
        <div class="flex-column card-body">
            <h1 class="subtitle">Spas Milenkov</h1>
            <div class="flex-column info-container" v-if="!customInfoColors">
                <div
                    class="flex"
                    v-for="(info, index) in data.userInfo"
                    :key="index"
                >
                    <v-icon
                        :name="data.infoIcons[index]"
                        :fill="settings.infoIcons?.iconFillColor"
                        :scale="settings.infoIcons?.iconSize"
                    ></v-icon>
                    <h3 class="user-info">{{ info }}</h3>
                </div>
            </div>

            <div class="flex-column" v-if="customInfoColors">
                <div
                    class="flex info-container"
                    v-for="(info, index) in data.userInfo"
                    :key="index"
                >
                    <v-icon
                        :name="data.infoIcons[index]"
                        :fill="settings.infoIcons?.multipleColors[index]"
                        :scale="settings.infoIcons?.iconSize"
                    ></v-icon>
                    <h3 class="user-info">{{ info }}</h3>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
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
    cardBackground: '#F4F7F9',
    pictureBorder: 'solid 3px #F4F7F9',
    radiusPreset: 'rounded',
    infoIcons: {
        iconFillColor: '#292D32',
        multipleColors: [],
        iconSize: 1.5,
    },
    mediaIcons: {
        iconFillColor: '#EFF6FF',
        multipleColors: [],
        iconSize: 1.5,
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
            cardBackground: '#F4F7F9',
            pictureBorder: 'solid 3px #F4F7F9',
            radiusPreset: 'rounded',
            infoIcons: {
                iconFillColor: '#292D32',
                multipleColors: [],
                iconSize: 1.5,
            },
            mediaIcons: {
                iconFillColor: '#EFF6FF',
                multipleColors: [],
                iconSize: 1.5,
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
                'io-mail',
                'bi-globe',
                'io-location-sharp',
                'bi-telephone-fill',
            ],
            mediaIcons: [
                'bi-facebook',
                'bi-instagram',
                'bi-linkedin',
                'bi-twitter',
            ],
            userMedia: ['', '', ',', ''],
        };
    },
});
const customInfoColors = ref<boolean>(false);
const customMediaColors = ref<boolean>(false);
const finalSettings = ref({ ...defaultSettings, ...props.settings });
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
.card,
.banner,
.card-body {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
}

.card {
    width: 100%;
    height: fit-content;
    /* background: v-bind('settings.cardBackground'); */
    overflow: hidden;
    border-radius: v-bind('borderRadius');
}

.card-body .flex-column {
    align-self: stretch;
    align-items: flex-start;
    justify-content: center;
    gap: 0.5rem;
}

.card-body {
    width: 65%;
    height: 100%;
    flex: 1;
    min-height: 15.75rem;
    padding: 2rem 1.5rem; 
    justify-content: space-between;
    background: v-bind('finalSettings.cardBackground');
    gap: 1rem;
}

.banner {
    width: 35%;
    min-height: 15.75rem;
    height: 100%;
    background: v-bind('data.userBanner');
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1.5rem;
    align-items: center;
}

.image-container {
    gap: 1rem;
    padding: 0.2rem;
    text-overflow: ellipsis;
    overflow: hidden;
    flex: 1;
}

.user-picture {
    object-fit: cover;
    outline: v-bind('finalSettings.pictureBorder');
    width: 6.25rem;
    height: 6.25rem;
    border-radius: 50%;
}

.info-container {
    align-items: flex-start;
    gap: 1rem;
}

.info-container .flex {
    gap: 0.5rem;
}

.subtitle,
.user-info {
    color: v-bind('finalSettings.subtitleColor');
    font-family: v-bind('finalSettings.subtitleFont');
    font-size: v-bind('finalSettings.subtitleSize');
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-overflow: ellipsis;
    overflow: hidden;
}

.user-info {
    color: v-bind('finalSettings.detailsColor');
    font-family: v-bind('finalSettings.detailsFont');
    font-size: v-bind('finalSettings.detailsSize');
    text-align: left;
    max-width: 10rem;
    gap: 0.5rem;
    min-width: 0;
}

.bottom-icons {
    margin-top: 1rem;
    gap: 0.5rem;
}

@media (max-width: 650px) {
    .card {
        flex-direction: column;
    }

    .banner,
    .card-body {
        width: 100%;
    }

    .banner {
        min-height: 10.75rem;
    }

    .user-info {
        max-width: 12rem;
        overflow-wrap: break-word;
    }
}
</style>
