<template>
    <div class="card flex">
        <div class="banner flex">
            <div class="image-container flex-column">
                <img :src="data.userPicture" alt="" class="user-picture">
                <h1 class="user-name">Spas Milenkov</h1>
            </div>

            <div class="media-container flex">
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
        <div class="flex-column card-body">
            <h1 class="subtitle">Info:</h1>
            <div class="flex-column info-container" v-if="!customInfoColors">
                <div class="flex" v-for="(info, index) in data.userInfo" :key="index">
                    <v-icon :name="data.infoIcons[index]" :fill="settings.infoIcons?.iconFillColor"
                        :scale="settings.infoIcons?.iconSize"></v-icon>
                    <h3 class="user-info">{{ info }}</h3>
                </div>
            </div>

            <div class="flex-column" v-if="customInfoColors">
                <div class="flex info-container" v-for="(info, index) in data.userInfo" :key="index">
                    <v-icon :name="data.infoIcons[index]" :fill="settings.infoIcons?.multipleColors[index]"
                        :scale="settings.infoIcons?.iconSize"></v-icon>
                    <h3 class="user-info">{{ info }}</h3>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang='ts'>
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
                iconSize: 1.5
            },
            mediaIcons: {
                iconFillColor: '#EFF6FF',
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
            infoIcons: ['io-mail', 'bi-globe', 'io-location-sharp', 'bi-telephone-fill'],
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
.card, .banner, .card-body {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.card {
  width: 100%;
  height: 100%;
  background: #F4F7F9;
  overflow: hidden;
}

.card-body {
  width: 65%;
  padding: 1.5rem;
  align-self: stretch;
  gap: 1rem;
}

.banner {
  width: 35%;
  background: #34469C;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  align-items: center;
}

.image-container {
  gap: 1rem;
  padding: 1rem 0.2rem;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 1;
}

.user-picture {
  object-fit: cover;
  outline: solid 3px #F4F7F9;
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
.subtitle, .user-info {
  color: #292D32;
  font-family: Lato;
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-overflow: ellipsis;
  overflow: hidden;
}

.user-info {
  font-size: v-bind('settings.detailsSize') 1.375rem;
  text-align: left;
  gap: 0.5rem;
  min-width: 0;
}

.user-name {
  color: #EFF6FF;
  font-family: v-bind('settings.subtitleFont');
  font-size: 1.5rem;
  width: 100%;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.bottom-icons {
  margin-top: 1rem;
  gap: 0.5rem;
}

@media (max-width: 650px) {
  .card {
    flex-direction: column;
  }
  .banner, .card-body {
    width: 100%;
  }
  .user-info {
    max-width: 12rem;
    overflow-wrap: break-word;
  }
}

</style>