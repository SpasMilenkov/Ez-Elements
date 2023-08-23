import { createApp } from 'vue'
import "./assets/styles.css"
import App from './App.vue'

import { OhVueIcon, addIcons } from "oh-vue-icons";

import { 
    BiFacebook,
    BiInstagram,
    BiLinkedin,
    BiTwitter,
    BiTelephoneFill,
    IoLocationSharp,
    BiGlobe,
    IoMail 
} from "oh-vue-icons/icons";

addIcons(BiFacebook, 
    BiInstagram,
    BiLinkedin,
    BiTwitter,
    BiTelephoneFill,
    IoLocationSharp,
    BiGlobe,
    IoMail)

const app =createApp(App)

app.component('v-icon', OhVueIcon)
app.mount('#app')
        