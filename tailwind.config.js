module.exports = {
    // '{tsx, ts, js, jsx}' 中不要空格，會失效
    content: ['./public/index.html', './src/**/*.{tsx,ts,jsx,js}'],
    theme: {
        fontFamily: {
            didot: ['GFS Didot', 'serif'],
            arial: ['Arial Black', 'sans-serif'],
            fira: ['Fira Sans', 'sans-serif'],
            rubik: ['Rubik', 'sans-serif']
        }
    },
    plugins: []

}