import { createServer } from 'http'
import { config } from 'dotenv'
import { resolve } from 'path'
import { logger } from './utils/logger'

/**
 * Load Env
 */
config({ path: resolve(__dirname, '../.env') })

/**
 * Load App
 */
import app from './app'
import mongoose from 'mongoose'

const server = createServer(app)
const port: number = Number(process.env.NODE_PORT) || 3000

;(async () => {
	try {
		const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
		mongoose.set('strictQuery', false)

		if (process.env.ENV === 'localhost') mongoose.set('debug', true)
		await mongoose.connect(connectionString)

		logger.info(__filename, '', '', 'DB Connection has been established successfully', '')

		server.listen(port, () => {
			logger.info(__filename, '', '', `Server is running on ${port}`, '')
		})
	} catch (err) {
		logger.error(__filename, '', '', 'Unable to connect to the server', err)
		process.exit(1)
	}
})()
