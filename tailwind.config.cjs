import colors from 'tailwindcss/colors'

// 删除 tailwincss 弃用颜色，避免警告信息
delete colors['lightBlue']
delete colors['warmGray']
delete colors['trueGray']
delete colors['coolGray']
delete colors['blueGray']

export const THEME = {
    gaoyi: {
        ...colors,
        primary: 'var(--primary)',
        dark: '#20233d',
        grey: '#f2f6fa',
        raise: 'var(--raise)',
        fall: 'var(--fall)',
        text: '#b2a290',
        active: 'var(--primary)'
    }
}

module.exports = {
    content: [
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        colors: THEME['gaoyi']
    },
    plugins: [],
    corePlugins: {
    }
}
