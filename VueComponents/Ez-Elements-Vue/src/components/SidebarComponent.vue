<template>
    <div class="sidebar flex-column" @mouseleave="shrink" @mouseover="expand">
        <ul class="flex-column list-container">
            <li v-for="(link, index) in data.links" :key="index" class="list-item" ref="tabs">
                <router-link :to="link.linkPath" class="nav-link flex" @click="switchTab(index)">
                    <Icon :icon="link.iconName" class="icon" />
                    <h2 :class="{ minimized: !fullSize }" class=" subtitle">{{ link.linkText }}</h2>
                    <Icon :icon="finalSettings.arrowSettings?.customArrow" class="arrow-icon"
                        :color="finalSettings.arrowSettings?.color" v-if="finalSettings.showArrows"
                        :class="{ minimized: !fullSize }" />
                </router-link>
            </li>
        </ul>
        <div class="theme-switcher flex-column" :class="{ 'minimize-padding': !fullSize }">
            <div class="flex meta-wrapper">
                <Icon class="theme-icon" icon="mdi:brush-variant" />
                <h2 class="subtitle" :class="{ minimized: !fullSize }">Theme</h2>
            </div>
            <div class="button-wrapper flex" :class="{ minimized: !fullSize }">
                <button class="theme-button theme-container-active flex-column">
                    <Icon icon="material-symbols:clear-day-rounded" class="icon" />
                    Light
                </button>
                <button class="theme-button theme-container-inactive flex-column">
                    <Icon icon="ph:moon-stars-duotone" class="icon" />
                    Dark
                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';


// Define the interface for the settings 
export interface SidebarSettings {
    // Toggles arrows in the menu bar
    showArrows?: boolean;
    // Settings for the arrows
    arrowSettings?: {
        customArrow?: string;
        color?: string;
        size?: string;
    };
    linkSettings?: LinkSettings;
    // Controls for the minimize button
    minimizeButtonSettings?: {
        size?: string;
        color?: string;
        background?: string;
    };
    // Settings for the theme switcher on the bottom of the menu
    themeSwitcherSettings?: {
        activeThemeColor: string,
        activeThemeIcon: string,
        inactiveThemeColor: string,
        inactiveThemeIcon: string
    }
    // Toggles the use of individual settings for every link
    // Example: different backgrounds for every menu tab
    useIndividualSettings?: boolean;
    // Array of link settings for each link
    individualLinkSettings?: LinkSettings[];
}
// Settings for the links in the menu
export interface LinkSettings {
    color?: string;
    size?: string;
    font?: string;
    hoverColor?: string;
    activeColor?: string;
    background?: string;
    activeBackground?: string;
    iconColor?: string;
    iconSize?: string;
    showArrow?: boolean;
}
// Data provided for the link
export interface LinkData {
    iconName: string;
    linkPath: string;
    linkText: string;
}

export interface SidebarData {
    menuTitle: string;
    minimizeButton: string;
    links: LinkData[];
}

interface SidebarProps {
    settings?: SidebarSettings;
    data?: SidebarData;
}

// Defines the default configuration for the menu
// By the default all links share the same settings and arrows are turned on
const defaultSettings: SidebarSettings = {
    showArrows: true,
    arrowSettings: {
        customArrow: 'ic:round-arrow-forward-ios',
        color: '#f4f7f9',
        size: '2rem',
    },
    linkSettings: {
        color: '#CAD2D9'
    },
    minimizeButtonSettings: {
        size: '3rem',
        color: '#f4f7f9',
        background: '#3f54a8',
    },
    useIndividualSettings: false,
    individualLinkSettings: [],
};

const props = withDefaults(defineProps<SidebarProps>(), {
    settings: (): SidebarSettings => {
        return {
            showArrows: true,
            arrowSettings: {
                customArrow: 'ic:round-arrow-forward-ios',
                color: '#f4f7f9',
                size: '2rem'
            },
            linkSettings: {},
            minimizeButtonSettings: {
                size: '3rem',
                color: '#f4f7f9',
                background: '#3f54a8',
            },
            useIndividualSettings: false,
        };
    },
    data: (): SidebarData => {
        return {
            menuTitle: 'Ez Menu',
            minimizeButton: '-',
            links: [
                {
                    iconName: 'bi:house',
                    linkPath: '/',
                    linkText: 'Home',
                },
                {
                    iconName: 'material-symbols:storefront-outline',
                    linkPath: '/',
                    linkText: 'Store',
                },
                {
                    iconName: 'ri:contacts-line',
                    linkPath: '/',
                    linkText: 'Contacts',
                },
                {
                    iconName: 'material-symbols:account-circle-full',
                    linkPath: '/',
                    linkText: 'Profile',
                },
                {
                    iconName: 'material-symbols:settings-outline',
                    linkPath: '/',
                    linkText: 'Settings',
                },
            ]

        };
    },
});

const finalSettings = computed(() => {
    const mergedSettings = {
        ...defaultSettings,
        ...props.settings,
    };

    return mergedSettings;
});

const tabs = ref<InstanceType<typeof HTMLDListElement>[]>([])

const switchTab = (index: number) => {
    const activeTab = tabs.value[index]
    activeTab.classList.add('active')
}

// Controls the width of the menu
const width = ref<string>('16.75rem')
// Tracks whether the menu is expanded on minimized
const fullSize = ref<boolean>(true)

// Switches the menu between expanded and minimized state
const shrink = () => {
    width.value = `${4}rem`
    fullSize.value = false
}
const expand = () => {
    width.value = '16.75rem'
    fullSize.value = true
}

onMounted(() => {
    shrink()    
})
</script>
<style scoped>
.sidebar {
    height: 100vh;
    overflow: auto;
    position: sticky;
    left: 0;
    top: 0;

    display: flex;
    max-width: v-bind('width');
    width: 100%;
    overflow: hidden;
    padding: 0.5rem;
    background: #f4f7f9;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;

    transition: all .125s linear;
}

.minimized {
    opacity: 0;
    transition: opacity .1s linear;
}

.minimized>.nav-link {
    opacity: 1;
}

.list-container,
.list-item {
    width: 100%;
}

.list-container {
    gap: 0.5rem;
}

.nav-link {
    width: 100%;
    height: 3.125rem;
    border-radius: 0.9375rem;
    background: hsl(228, 45%, 45%);
    gap: 1rem;
    padding: 0.5rem 0.5rem;
    position: relative;
    overflow: hidden;
    cursor: pointer;
}
.nav-link.active{
    color: v-bind('finalSettings.linkSettings?.activeColor');
}

.subtitle {
    color: v-bind('settings.linkSettings?.color');
    font-family: Lato;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: center;
    margin-top: auto;
}

.arrow-icon {
    fill: #f4f7f9;
    width: 2rem;
    height: 2rem;
    justify-self: end;
    margin-left: auto;
}

.icon {
    fill: #f4f7f9;
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
}


.theme-switcher {
    width: 100%;
    border-radius: 0.9375rem;
    background: #3f54a8;
    margin-top: auto;
    padding: 1rem 0.5rem;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.minimize-padding {
    padding: 0.5rem;
}

.meta-wrapper {
    width: 100%;
    gap: 1rem;
}

.theme-icon {
    width: 2rem;
    height: 2rem;
}

.button-wrapper {
    gap: 1rem;
    justify-content: center;
}

.minimized.button-wrapper,
.minimized.subtitle {
    display: none;
}

.theme-button {
    min-height: 5rem;
    width: 100%;
    max-width: 6.5rem;
    padding: 0.5rem;
    gap: 0.2rem;
    border-radius: 15px;
}

.theme-container-active {
    background: #7a92db;
    color: #fff;
    text-align: center;

    /* Regular text small */
    font-family: Lato;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.theme-container-inactive {
    background: #34469c;
    color: #bdd0f7;
    text-align: center;

    /* Regular text small */
    font-family: Lato;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
</style>
