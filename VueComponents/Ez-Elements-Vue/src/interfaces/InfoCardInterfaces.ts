import { ImageSettings } from "./ImageInterfaces";

export interface InfoCardSettings {
    titleColor?: string;
    contentColor?: string;
    titleSize?: string;
    contentSize?: string;
    backgroundColor?: string;
    cardBorderRadius?: RadiusPreset;
    imageSettings?: ImageSettings;
    linkSettings?: {
        color?: string;
        background?: string;
        borderRadius?: RadiusPreset;
    };
}
export interface InfoCardData {
    cardTitle?: string;
    cardContent?: string;
    linkContent?: string;
    linkPath?: string,
    imageSingleSource?: string,
    imageAlt?: string,
    imageSrcSet?: string[],
}
