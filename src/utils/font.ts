
export const font = {
    didot: "font-family: GFS Didot, serif;",
    arial: "font-family: Arial Black, sans-serif;",
    fira: "font-family: Fira Sans, sans-serif",
    rubik: "font-family: Rubik, sans-serif"
};

export const fonts = {
    didot: 'GFS Didot, serif',
    arial: 'Arial Black, sans-serif',
    fira: 'Fira Sans, sans-serif',
    rubik: 'Rubik, sans-serif'
};

const fontSize = {
    'xs': '0.75rem',
    'sm': '0.875rem',
    'base': '1rem',
    'lg': '1.125rem',
    'xl': '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem'
};

const lineHeight = {
    'xs': '1rem',
    'sm': '1.25rem',
    'base': '1.5rem',
    'lg': '1.75rem',
    'xl': '1.75rem',
    '2xl': '2rem',
    '3xl': '2.25rem',
    '4xl': '2.5rem',
    '5xl': '1',
    '6xl': '1',
    '7xl': '1',
    '8xl': '1',
    '9xl': '1'
};


export type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
export type Transform = 'capitalize' | 'uppercase' | 'lowercase' | 'none' | 'full-width' | 'full-size-kan';

export type Text = {
    size?: Size,
    color?: string,
    weight?: number,
    spacing?: string,
    transform?: Transform,
};

export function text(props: Text) {
    const res = Object.keys(props).reduce((a, b) => {
        switch (b) {
            case 'size':
                return a += `font-size: ${fontSize[props[b] as Size]};
                             line-height: ${lineHeight[props[b] as Size]};`;
            case 'color':
                return a += `color: ${props[b]};`;
            case 'weight':
                return a += `font-weight: ${props[b]};`;
            case 'spacing':
                return a += `letter-spacing: ${props[b]};`;
            case 'transform':
                return a += `text-transform: ${props[b]};`;
            default:
                return a;
        }
    }, '');
    return res;
}


export default {
    font,
    text
};

