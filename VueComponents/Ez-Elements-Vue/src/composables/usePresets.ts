function useBorderRadius(preset:RadiusPreset | undefined):string {
    if (preset === 'no-radius') {
        return '0rem';
    }
    if (preset === 'rounded') {
        return '0.9375rem';
    }
    if (preset === 'semi-rounded') {
        return '0.3125rem';
    }

    return '0.9375rem'
}

export {useBorderRadius}