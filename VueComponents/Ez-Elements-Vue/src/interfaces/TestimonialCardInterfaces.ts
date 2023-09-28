export interface TestimonialCardSettings {
    subtitleColor?: string;
    subtitleFont?: string;
    subtitleSize?: string;
    opinionColor?: string;
    opinionFont?: string;
    opinionSize?: string;
    radiusPreset?: RadiusPreset;
    background?: string;
    pictureBorderStyle?: string;
    highlightLine?: {
        showHighlight: true;
        style: string;
    };
}


export interface TallTestimonialCardSettings {
    opinionColor?: string;
    opinionFont?: string;
    opinionSize?: string;
    radiusPreset?: RadiusPreset;
    background?: string;
    pictureBorderStyle?: string;
    bannerBackground?: string;
}


export interface TestimonialCardData {
    userName?: string;
    userOpinion: string;
    userPictureUrl: string;
}
