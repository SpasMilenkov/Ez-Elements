<template>
    <div class="card">
        <div class="banner"></div>
        <div class="image-container">
            <img src="/default_images/profile-picture.jpg" alt="profile picture" class="user-picture">
        </div>
        <div class="flex-column-container">

            <h2 class="subtitle">{{ data.userName }}</h2>

            <div class="flex-column-container" v-if="!customInfoColors">
                <div class="flex-container" v-for="(info, index) in data.userInfo" :key="index">
                    <v-icon :name="data.infoIcons[index]" :fill="settings.infoIcons?.iconFillColor"
                        :scale="settings.infoIcons?.iconSize"></v-icon>
                    <h3 class="user-info">{{ info }}</h3>
                </div>
            </div>

            <div class="flex-column-container" v-if="customInfoColors">
                <div class="flex-container" v-for="(info, index) in data.userInfo" :key="index">
                    <v-icon :name="data.infoIcons[index]" :fill="settings.infoIcons?.multipleColors[index]"
                        :scale="settings.infoIcons?.iconSize"></v-icon>
                    <h3 class="user-info">{{ info }}</h3>
                </div>
            </div>


            <div class="flex-container bottom-icons" v-if="!customMediaColors">
                <a :href="info" v-for="(info, index) in data.mediaIcons" :key="index">
                    <v-icon :name="data.mediaIcons[index]" :fill="settings.mediaIcons?.iconFillColor"
                        :scale="settings.mediaIcons?.iconSize" />
                </a>
            </div>

            <div class="flex-container bottom-icons" v-if="customMediaColors">
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


export interface VerticalCardSettings {
    subtitleColor?: string,
    subtitleFont?: string,
    subtitleSize?: string,
    detailsColor?: string,
    detailsFont?: string,
    detailsSize?: string,
    infoIcons?: {
        iconFillColor?: string,
        multipleColors: string[],
        iconSize?: number
    },
    mediaIcons?: {
        iconFillColor?: string,
        multipleColors: string[],
        iconSize?: number
    }
}
export interface VerticalCardData {
    userName: string,
    userPicture: string,
    userBanner?: string,
    userInfo: string[],
    userMedia: string[],
    infoIcons: string[],
    mediaIcons: string[]
}
interface VerticalCardProps {
    settings?: VerticalCardSettings,
    data: VerticalCardData
}
const props = withDefaults(defineProps<VerticalCardProps>(), {
    settings: (): VerticalCardSettings => {
        return {
            subtitleColor: '#1E2833',
            subtitleFont: 'Roboto, var(--system-ui)',
            subtitleSize: '1.5625rem',
            detailsColor: '#1E2833',
            detailsFont: 'Lato, var(--system-ui)',
            detailsSize: '1.25rem',
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
    data: (): VerticalCardData => {
        return {
            userName: 'Spas Milenkov',
            userPicture: '/default_images/profile-picture.jpg',
            userBanner: '#3F54A8',
            userInfo: ['spasmilenkov123123@gmai.com', 'www.spasmilenkov.dev', 'Pazardjik, Bulgaria', '+359 123 456 78'],
            infoIcons: ['io-mail', 'io-globe-outline', 'io-location-sharp', 'bi-telephone-fill'],
            mediaIcons: ['bi-facebook', 'bi-instagram', 'bi-linkedin', 'bi-twitter'],
            userMedia: ['', '', ',', '']
        }
    }
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

composeLayout()


</script>
<style scoped>
.flex-container,
.flex-column-container,
.card {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 100%;
}

.flex-column-container {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1.2rem;
}

.flex-container {
    gap: 0.5rem;
}

.card {
    width: 19.375rem;
    height: 26.875rem;
    overflow: hidden;
    background: #F4F7F9;
    flex-shrink: 0;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;
    padding: 0 1rem 1rem 1rem;
}

.banner {
    width: 100%;
    height: 100%;
    min-width: 19.375rem;
    max-height: 4.375rem;
    background: #3F54A8;
    flex-shrink: 0;
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
    outline: solid 3px #F4F7F9;
    stroke-width: 3px;
    width: 6.25rem;
    height: 6.25rem;
    border-radius: 50%;
}

.subtitle {
    color: #1E2833;
    font-family: Roboto, var(--system-ui);
    font-size: 1.5625rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: center;
    width: 100%;
}

.user-info {
    color: #1E2833;
    font-family: Lato, var(--system-ui);
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: left;
    width: 100%;
    height: 100%;
    max-width: 15.25rem;
    text-overflow: ellipsis;
    overflow: hidden;

}

.bottom-icons {
    margin-top: 1rem;
}
</style>