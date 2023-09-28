export interface ImageData {
    imgSrc?: string;
    imgAlt?: string;
    imgSrcSet?: string[];
}

export interface ImageSettings {
    pictureBorderRadius?: RadiusPreset | string;
    imageSizes?: string[];
    imageLoading?: 'lazy' | 'eager';
    imageDecoding?: 'async' | 'auto' | 'sync';
}
