<template>
    <div
        class="flex-column"
        :class="{
            form: settings.formStyle === 'tall ',
            'form-wide': settings.formStyle === 'wide',
        }"
    >
        <div class="circle1 circle"></div>
        <div class="circle2 circle"></div>
        <div class="circle3 circle"></div>
        <div class="circle4 circle"></div>

        <h1 class="subtitle">{{ data.formTitle }}</h1>
        <div class="flex-column input-wrapper">
            <label :for="data.inputOneId" class="input-label">{{
                data.labelOne
            }}</label>
            <InputComponent
                :id="data.inputOneId"
                v-model="inputFieldOne"
                :placeholder="data.inputOnePlaceHolder"
            />
        </div>
        <div class="flex-column input-wrapper">
            <label :for="data.inputTwoId" class="input-label">{{
                data.labelTwo
            }}</label>
            <InputComponent
                :id="data.inputTwoId"
                v-model="inputFieldTwo"
                :placeholder="data.inputTwoPlaceHolder"
            />
        </div>
        <div class="button-wrapper flex">
            <SecondaryButton
                :settings="{
                    color: 'black',
                }"
                :data="{
                    content: 'Register',
                }"
            ></SecondaryButton>
            <MainButton
                :data="{
                    content: 'Log in',
                }"
                @click="data.formAction"
            ></MainButton>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useBorderRadius } from '../composables/usePresets';
import { FormSettings, FormData } from '../interfaces/FormInterfaces';
import InputComponent from './InputComponent.vue'; 
import MainButton from './MainButtonComponent.vue';
import SecondaryButton from './SecondaryButtonComponent.vue';
import { ref } from 'vue';

const inputFieldOne = ref('');
const inputFieldTwo = ref('');

const defaultSettings: FormSettings = {
    formBackground: '#F4F7F9',
    subtitleColor: '#292d32',
    subtitleFont: 'Lato, var(--system-ui)',
    subtitleSize: '1.5rem',
    labelFont: 'Lato, var(--system-ui)',
    labelColor: '#292D32',
    labelSize: '1.125rem',
    formStyle: 'wide',
    radiusPreset: 'semi-rounded',
    showDotPattern: true,
    lightColor: 'rgba(63, 84, 168, 0.50)',
    darkColor: 'rgba(75, 99, 182, 0.50)',
};
interface FormProps {
    settings?: FormSettings;
    data?: FormData;
    formStyle?: 'wide' | 'tall ';
}
const props = withDefaults(
    defineProps<FormProps>(),
    {
        settings: (): FormSettings => {
            return {
                formBackground: '#F4F7F9',
                subtitleColor: '#292D32',
                subtitleFont: 'Lato, var(--system-ui)',
                subtitleSize: '1.5rem',
                labelFont: 'Lato, var(--system-ui)',
                labelColor: '#292D32',
                labelSize: '1.125rem',
                formStyle: 'wide',
                radiusPreset: 'semi-rounded',
                showDotPattern: true,
                lightColor: 'rgba(63, 84, 168, 0.50)',
                darkColor: 'rgba(75, 99, 182, 0.50)',
                
            };
        },
        data: (): FormData => {
            return {
                formTitle: 'Sample Form',
                labelOne: 'Email:',
                labelTwo: 'Password:',
                inputOnePlaceHolder: 'Enter your email',
                inputTwoPlaceHolder: 'Enter your password',
                inputOneType: 'email',
                inputTwoType: 'password',
                inputOneId: 'username',
                inputTwoId: 'userpassword',
                formAction: () => console.log('Set custom command'),
            };
        },
        shape: 'wide',
    }
);

const borderRadius = ref<string>(useBorderRadius(props.settings.radiusPreset));
const finalSettings = ref({ ...defaultSettings, ...props.settings });
console.log(finalSettings.value);
</script>
<style scoped>
.form,
.form-wide {
  position: relative;
  background: v-bind('finalSettings.formBackground');
  overflow: hidden;
  flex-shrink: 0;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
  height: 100%;
  border-radius: v-bind('borderRadius');
}

.form {
  width: 16.25rem;
  min-height: 21.25rem;
  gap: 1.2rem;
}

.form-wide {
  width: 20.25rem;
  min-height: 19.25rem;
  gap: 1rem;
}

.circle {
  position: absolute;
  border-radius: 50%;
}

.circle1,
.circle2,
.circle3,
.circle4 {
  background-color: v-bind('settings.lightColor');
  flex-shrink: 0;
}

.circle1,
.circle2 {
  width: 6.25rem;
  height: 6.25rem;
  top: -3rem;
  right:-2rem;
}

.circle2 {
  width: 7.1875rem;
  height: 7.1875rem;
  right: -2.2rem;
  top: -3.2rem;
}

.circle3,
.circle4 {
  width: 6.25rem;
  height: 6.25rem;
  bottom: -4rem;
  left: -3rem;
}

.circle4 {
  background-color: v-bind('settings.darkColor');
  width: 7.1875rem;
  height: 7.1875rem;
  bottom: -4.2rem;
  left: -3.2rem;
}

.subtitle {
color: v-bind('finalSettings.subtitleColor');
}

.subtitle,
.input-label {
  font-family: v-bind('finalSettings.subtitleFont');
  font-size: v-bind('finalSettings.subtitleSize');
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.input-label {
  color: v-bind('finalSettings.labelColor');
  font-family: v-bind('finalSettings.labelFont');
  font-size: v-bind('finalSettings.labelSize');
  width: 100%;
  text-align: left;
}

.input-wrapper,
.button-wrapper {
  width: 100%;
}

.button-wrapper {
  gap: 1rem;
  justify-content: space-between;
}

</style>
../interfaces/FormInterfaces