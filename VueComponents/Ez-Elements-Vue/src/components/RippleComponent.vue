<template>
    <div ref="container" @mousedown="addRipple" class="ripple-outer">
        <transition-group class="ripples" name="grow" :tag="tag">
            <div class="ripple" v-for="ripple in ripples" :key="ripple.id" :style="{
                top: ripple.top,
                left: ripple.left,
                width: ripple.width,
                height: ripple.height,
                background: color
            }"></div>
        </transition-group>
        <slot></slot>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

interface Ripple {
    width: string;
    height: string;
    left: string;
    top: string;
    id: number;
}
defineProps<{
    tag: string
}>()
const ripples = ref<Ripple[]>([]);
const rippleWidth = ref(0);
const halfRippleWidth = ref(0);

const color = 'rgba(255, 255, 255, 0.3)';

const addRipple = (e: MouseEvent) => {
        console.log('I got clicked')
    const container = e.currentTarget as HTMLElement;
    const { left, top } = container.getBoundingClientRect();
    const rippleId = Date.now();
    const rippleLeft = `${e.clientX - left - halfRippleWidth.value}px`;
    const rippleTop = `${e.clientY - top - halfRippleWidth.value}px`;
    ripples.value.push({
        width: `${rippleWidth.value}px`,
        height: `${rippleWidth.value}px`,
        left: rippleLeft,
        top: rippleTop,
        id: rippleId,
    });
};

const purgeRipples = () => {
    ripples.value = [];
};

onMounted(() => {
    const container = document.querySelector('.ripple-outer') as HTMLElement;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    rippleWidth.value = width > height ? width : height;
    halfRippleWidth.value = rippleWidth.value / 2;

    window.addEventListener('mouseup', purgeRipples);
});

onBeforeUnmount(() => {
    window.removeEventListener('mouseup', purgeRipples);
});
</script>

<style scoped>
.ripple-outer {
    position: relative;
    z-index: 1;
    overflow: hidden;
    cursor: pointer;
}

.ripples {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
}

.ripple {
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
}


.grow-enter-active,
.grow-enter-to-active {
    transition: all 1500ms ease-out;
}

.grow-leave-active,
.grow-leave-to-active {
    transition: all 700ms ease-out;
}

.grow-enter {
    transform: scale(0);
    opacity: 1;
}

.grow-enter-to {
    transform: scale(4);
    opacity: 1;
}

.grow-leave {
    transform: scale(4);
    opacity: 1;
}

.grow-leave-to {
    transform: scale(4);
    opacity: 0;
}</style>
