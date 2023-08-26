export interface CardSettings {
    subtitleColor?: string;
    subtitleFont?: string;
    subtitleSize?: string;
    detailsColor?: string;
    detailsFont?: string;
    detailsSize?: string;
    pictureBorder?: string;
    cardBackground?: string;
    radiusPreset?: RadiusPreset;
    infoIcons?: {
        iconFillColor?: string;
        multipleColors: string[];
        iconSize?: number;
    };
    mediaIcons?: {
        iconFillColor?: string;
        multipleColors: string[];
        iconSize?: number;
    };
}
export interface CardData {
    userName: string;
    userPicture: string;
    userBanner?: string;
    userInfo: string[];
    userMedia: string[];
    infoIcons: string[];
    mediaIcons: string[];
}
