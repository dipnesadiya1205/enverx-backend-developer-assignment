import { NextFunction, Response } from 'express'
import STATUS_CODE from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { createResponse } from '../utils/helper'
import { CustomRequest } from '../environment'
import { UserMaster } from '../components/User/model'

class Authorization {
	// authentication of token
	async is_authorized(req: CustomRequest, res: Response, next: NextFunction) {
		try {
			const authorization = req.headers.authorization

			req.custom = {}

			if (!authorization) {
				return createResponse(res, STATUS_CODE.UNAUTHORIZED, res.__('ERROR_MISSING_AUTH_TOKEN'))
			}

			const token: string = authorization.replace('Bearer ', '')

			const jwtSecretKey = process.env.JWT_SECRET_KEY || ''

			const isJWTValid: any = jwt.verify(token, jwtSecretKey)

			const isUserExist: any = await UserMaster.getOne(
				{ selectedFields: '_id email' },
				{
					_id: isJWTValid.id
				}
			)

			if (!isUserExist) {
				return createResponse(res, STATUS_CODE.UNAUTHORIZED, res.__('UNAUTHORIZED'))
			}

			req.custom.userID = isUserExist?._id.toString()

			next()
		} catch (error: any) {
			createResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, res.__('SERVER_ERROR_MESSAGE'), error)
		}
	}
}

export default new Authorization()
