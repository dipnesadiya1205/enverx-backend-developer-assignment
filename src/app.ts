import express, { Request, Response } from 'express'
import STATUS_CODES from 'http-status-codes'
import { logger } from './utils/logger'
import middlewares from './middlewares'
import routes from './routes'
import morgan from 'morgan'

const app: express.Application = express()

app.use(morgan('dev'))

middlewares(app) // bind middlewares

routes(app) // initialize all routes

// Base route to health check
app.get('/health', (_req: Request, res: Response) => res.status(STATUS_CODES.OK).send('healthy'))

// Handle invalid Route
app.all('/*', (req: Request, res: Response) => {
	logger.info(__filename, 'Invalid Route Handler', 'No UUID', 'Invalid Route Fired : ' + req.path, {})
	return res.status(STATUS_CODES.BAD_REQUEST).json({
		status: 400,
		message: 'Bad Request'
	})
})

export default app
