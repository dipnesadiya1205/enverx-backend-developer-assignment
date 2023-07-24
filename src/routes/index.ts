import { Application } from 'express'
import { UserRoutes } from '../components/User/v1'

/**
 * Init All routes here
 */
export default (app: Application) => {
	app.use('/api/v1/user', UserRoutes)
}
