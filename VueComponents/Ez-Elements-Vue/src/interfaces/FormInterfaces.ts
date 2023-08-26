import { ButtonSettings, ButtonData } from './ButtonInterfaces';

export interface FormSettings {
    formBackground?: string;
    subtitleColor?: string;
    subtitleFont?: string;
    subtitleSize?: string;
    labelFont?: string;
    labelColor?: string;
    labelSize?: string;
    formStyle: 'wide' | 'tall ';
    secondaryButtonSettings?: ButtonSettings;
    mainButtonSettings?: ButtonSettings;
    showDotPattern?: boolean;
    radiusPreset?: RadiusPreset;
    lightColor?: string;
    darkColor?: string;
    
}

export interface FormData {
    formTitle?: string;
    mainButtonData?: ButtonData;
    secondaryButtonData?: ButtonData;
    labelOne?: string;
    labelTwo?: string;
    inputOnePlaceHolder?: string;
    inputTwoPlaceHolder?: string;
    inputOneType: string;
    inputTwoType: string;
    inputOneId: string;
    inputTwoId: string;
    formAction: (args: any) => any;
}
