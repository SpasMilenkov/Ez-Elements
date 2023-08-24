<template>
    <div class="card flex">
        <div class="banner"></div>
        <div class="image-container">
            <img src="/default_images/profile-picture.jpg" alt="profile picture" class="user-picture">
        </div>
        <div class="flex-column">

            <h2 class="subtitle">{{ data.userName }}</h2>

            <div class="flex-column" v-if="!customInfoColors">
                <div class="flex" v-for="(info, index) in data.userInfo" :key="index">
                    <v-icon :name="data.infoIcons[index]" :fill="settings.infoIcons?.iconFillColor"
                        :scale="settings.infoIcons?.iconSize"></v-icon>
                    <h3 class="user-info">{{ info }}</h3>
                </div>
            </div>

            <div class="flex-column" v-if="customInfoColors">
                <div class="flex" v-for="(info, index) in data.userInfo" :key="index">
                    <v-icon :name="data.infoIcons[index]" :fill="settings.infoIcons?.multipleColors[index]"
                        :scale="settings.infoIcons?.iconSize"></v-icon>
                    <h3 class="user-info">{{ info }}</h3>
                </div>
            </div>


            <div class="flex bottom-icons" v-if="!customMediaColors">
                <a :href="info" v-for="(info, index) in data.mediaIcons" :key="index">
                    <v-icon :name="data.mediaIcons[index]" :fill="settings.mediaIcons?.iconFillColor"
                        :scale="settings.mediaIcons?.iconSize" />
                </a>
            </div>

            <div class="flex bottom-icons" v-if="customMediaColors">
                <a :href="info" v-for="(info, index) in data.mediaIcons" :key="index">
                    <v-icon :name="data.mediaIcons[index]" :fill="settings.mediaIcons?.multipleColors[index]"
                        :scale="settings.mediaIcons?.iconSize" />
                </a>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { CardData, CardSettings } from '../interfaces/CardInterfaces'
import { setBorderRadius } from '../presets';
interface VerticalCardProps {
    settings?: CardSettings,
    data: CardData
}
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
                iconSize: 1.3
            },
            mediaIcons: {
                iconFillColor: '#292D32',
                multipleColors: [],
                iconSize: 1.5
            }
        }
    },
    data: (): CardData => {
        return {
            userName: 'Spas Milenkov',
            userPicture: '/default_images/profile-picture.jpg',
            userBanner: '#3F54A8',
            userInfo: ['spasmilenkov123123@gmai.com', 'www.spasmilenkov.dev', 'Pazardjik, Bulgaria', '+359 123 456 78'],
            infoIcons: ['io-mail', 'bi-globe', 'io-location-sharp', 'bi-telephone-fill'],
            mediaIcons: ['bi-facebook', 'bi-instagram', 'bi-linkedin', 'bi-twitter'],
            userMedia: ['', '', ',', '']
        }
    },
    cardBackground: '#F4F7F9'
})
const customInfoColors = ref<boolean>(false)
const customMediaColors = ref<boolean>(false)

function composeLayout(): void {
    if (props.settings === undefined)
        return;
    if (props.settings.infoIcons?.multipleColors.length !== 0) {
        customInfoColors.value = true
    }
    if (props.settings.mediaIcons?.multipleColors.length !== 0) {
        customMediaColors.value = true
    }
    console.log(props.settings.mediaIcons?.multipleColors)
}

const borderRadius = ref<string>(setBorderRadius(props.settings.radiusPreset))

composeLayout()


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
    height: 100%;
    max-height: 26.875rem;
    overflow: hidden;
    background: #F4F7F9;
    flex-direction: column;
    justify-content: flex-start;
    background: v-bind('settings.cardBackground');
    border-radius: v-bind('borderRadius');
}

.banner {
    border-radius: v-bind('settings.radiusPreset');
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
    outline: v-bind('settings.pictureBorder');
    stroke-width: 3px;
    width: 6.25rem;
    height: 6.25rem;
    border-radius: 50%;
}

.subtitle,
.user-info {
    color: v-bind('settings.subtitleColor');
    font-family: v-bind('settings.subtitleFont');
    font-size: v-bind('settings.subtitleSize');
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    width: 100%;
}

.user-info {
    color: v-bind('settings.detailsColor');
    font-family: v-bind('settings.detailsFont');
    font-size: v-bind('settings.detailsSize');
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
</style>