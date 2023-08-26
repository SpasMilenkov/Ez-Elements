export interface ButtonSettings {
    background?: string;
    fontFamily?: string;
    color?: string;
    radiusPreset?: RadiusPreset;
    customRadius?: string;
    shadow?: string;
    fontSize?: string;
    border?: string;
    borderFocused?: string;
}
export interface ButtonData {
    content: string;
    action?: () => any;
}
