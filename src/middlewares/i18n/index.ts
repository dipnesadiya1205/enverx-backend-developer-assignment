import i18n from 'i18n'

i18n.configure({
	defaultLocale: 'en',
	directory: __dirname + '/../../../locales/',
	locales: ['en'],
	cookie: 'enverx_backend',
	autoReload: true,
	objectNotation: true
})

export { i18n }
