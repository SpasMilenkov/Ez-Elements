<template>
    <div class="sidebar flex-column">
        <div class="flex top-buttons">
            <div class="title-container">
                <h1 class="main-title flex">{{ data.menuTitle }}</h1>
            </div>
            <button class="minimize-button" @click="toggle">{{ data.minimizeButton }}</button>
        </div>
        <ul class="flex-column list-container">
            <li v-for="(link, index) in data.links" :key="index" class="list-item">
                <router-link :to="link.linkPath" class="nav-link flex">
                    <Icon :icon="link.iconName" class="icon" />
                    <h2 class="subtitle" v-if="fullSize">{{ link.linkText }}</h2>
                    <Icon :icon="finalSettings.arrowSettings?.customArrow" class="arrow-icon"
                        :color="finalSettings.arrowSettings?.color" v-if="finalSettings.showArrows && fullSize" />
                </router-link>
            </li>
        </ul>
        <div class="theme-switcher flex-column">
            <div class="flex meta-wrapper">
                <Icon class="theme-icon" icon="mdi:brush-variant" />
                <h2 class="subtitle" v-if="fullSize">Theme</h2>
            </div>
            <div class="button-wrapper flex" v-if="fullSize">
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
        div.
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';

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
    // Settings for the title of the menu
    menuTitleSettings?: {
        size?: string;
        color?: string;
        font?: string;
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
        inactiveThemIcon: string
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
    menuTitleSettings: {
        size: '1rem',
        color: '#f4f7f9',
        font: 'Roboto, var(--system-ui)',
    },
    linkSettings: {},
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
            menuTitleSettings: {
                size: '1rem',
                color: '#f4f7f9',
                font: 'Roboto, var(--system-ui)',
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
// Controls the width of the menu
const width = ref<string>('16.75rem')
// Tracks whether the menu is expanded on minimized
const fullSize = ref<boolean>(true)
// Switches the menu between expanded and minimized state
const toggle = () => {
    width.value = `${2.75}rem`
    fullSize.value = !fullSize.value
}
</script>
<style scoped>
.top-buttons {
    width: 100%;
    justify-content: space-between;
}

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
}

.title-container {
    height: 3.125rem;
    width: 100%;
    max-width: 12rem;
    border-radius: 0.9375rem;
    background: #3f54a8;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
}

.main-title {
    color: #f4f7f9;
    font-family: Lato;
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-align: center;
}

.minimize-button {
    display: flex;
    overflow: hidden;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: #3f54a8;
    justify-content: center;
    align-items: center;
    color: #f4f7f9;
    font-family: Lato;
    font-size: 3rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: center;
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
    background: #3f54a8;
    gap: 1rem;
    padding: 0.5rem 0.5rem;
}

.subtitle {
    color: #f4f7f9;
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

.icon.minimized.selected {
    width: 2.38238rem;
    height: 2.25rem;
    border-radius: 2.38238rem;
    background: #34469C;
    flex-shrink: 0;
}
.icon.minimized {
    width: 2.38238rem;
    height: 2.25rem;
    border-radius: 2.38238rem;
    background: transparent;
    flex-shrink: 0;
}
.theme-switcher {
    width: 100%;
    min-height: 6rem;
    border-radius: 0.9375rem;
    background: #3f54a8;
    margin-top: auto;
    padding: 1rem 0.5rem;
    align-items: center;
    justify-content: center;
    gap: 1rem;
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
