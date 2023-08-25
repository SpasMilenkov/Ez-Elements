import { ButtonSettings } from "./ButtonInterfaces"

export interface ActionCardSettings {
    background?:string,
    showTitle?: boolean,
    showButtons?: boolean,
    radiusPreset?: RadiusPreset,
    titleColor?: string,
    titleFont?: string,
    titleSize?: string,
    contentFont?: string
    contentSize?: string,
    contentColor?: string,
    highlightLine?: {
        showHighlight?: boolean,
        style?: string
    },
    secondaryButtonSettings?: ButtonSettings,
    mainButtonSettings?: ButtonSettings,
}