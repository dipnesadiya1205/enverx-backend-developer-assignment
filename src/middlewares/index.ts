import express, { Application } from 'express'
import cors from 'cors'
import { i18n } from './i18n'
import uuid from './uuid'

const allowedOrigins = ['*']

const options: cors.CorsOptions = {
	origin: allowedOrigins
}

export default (app: Application) => {
	app.use(cors())
	app.use(express.json())
	app.disable('x-powered-by')
	app.use(express.urlencoded({ extended: true }))
	app.use(i18n.init) // support internationalization
	uuid(app) // add uuid in req if not available
}
