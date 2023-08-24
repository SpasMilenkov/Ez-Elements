export interface ButtonSettings {
    content: string,
    background?: string,
    fontFamily?: string,
    color?: string,
    radiusPreset?: RadiusPreset,
    customRadius?: string,
    shadow?: string,
    fontSize?: string,
    border?: string,
    borderFocused?: string,
    action: () => any
}