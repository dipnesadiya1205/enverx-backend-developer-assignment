import express, { Response, NextFunction } from 'express'
import { v4 as uuid4 } from 'uuid'
import { CustomRequest } from '../../environment'

export default (app: express.Application) => {
	app.use((req: CustomRequest, res: Response, next: NextFunction) => {
		if (req.custom && req.custom.uuid) {
			return next()
		}
		let uuidObj = {
			uuid: uuid4()
		}
		req.custom = uuidObj
		next()
	})
}
