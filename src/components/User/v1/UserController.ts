import { Response } from 'express'
import STATUS_CODES from 'http-status-codes'
import sha from 'sha256'
import jwt from 'jsonwebtoken'
import { CustomRequest } from '../../../environment'
import { logger } from '../../../utils/logger'
import { createResponse } from '../../../utils/helper'
import { UserMaster } from '../model'

class UserController {
	/**
	 * @description add new user
	 * @param req
	 * @param res
	 */
	async add(req: CustomRequest, res: Response) {
		try {
			const { name, contact_no, email, password } = req.body

			const isUserExist = await UserMaster.getOne({ selectedFields: '_id' }, { email })

			if (isUserExist) {
				return createResponse(res, STATUS_CODES.OK, res.__('USER.FOUND'))
			}

			const userObj = await UserMaster.addOne({ name, contact_no, email, password: sha.x2(password) })

			if (!userObj) {
				return createResponse(res, STATUS_CODES.UNPROCESSABLE_ENTITY, res.__('ERROR_MSG'))
			}

			return createResponse(res, STATUS_CODES.OK, res.__('USER.ADD'))
		} catch (error) {
			logger.error(__filename, 'addUser', req.custom.uuid, 'Error During add new user : ', error)
			return createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, res.__('SERVER_ERROR_MESSAGE'))
		}
	}

	/**
	 * @description login user
	 * @param req
	 * @param res
	 */
	async login(req: CustomRequest, res: Response) {
		try {
			const { email, password } = req.body

			const isUserExist = await UserMaster.getOne({ selectedFields: '_id email password' }, { email })

			if (!isUserExist) {
				return createResponse(res, STATUS_CODES.NOT_FOUND, res.__('USER.NOT_FOUND'))
			}

			const isCredentialValid = email === isUserExist.email && sha.x2(password) === isUserExist.password

			if (!isCredentialValid) {
				return createResponse(res, STATUS_CODES.OK, res.__('LOGIN.FAIL'))
			}

			const token = jwt.sign({ id: isUserExist._id }, process.env.JWT_SECRET_KEY || '', { expiresIn: 3600 })

			return createResponse(res, STATUS_CODES.OK, res.__('LOGIN.SUCCESS'), { token })
		} catch (error) {
			logger.error(__filename, 'loginUser', req.custom.uuid, 'Error During login user : ', error)
			return createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, res.__('SERVER_ERROR_MESSAGE'))
		}
	}

	/**
	 * @description get user information
	 * @param req
	 * @param res
	 */
	async get(req: CustomRequest, res: Response) {
		try {
			const { user_id } = req.params

			if (req.custom.userID !== user_id) {
				return createResponse(res, STATUS_CODES.UNAUTHORIZED, res.__('UNAUTHORIZED'))
			}

			const userDetail = await UserMaster.getByID(user_id, { selectedFields: '-password -__v -created_at -updated_at' })

			if (!userDetail) {
				return createResponse(res, STATUS_CODES.OK, res.__('USER.NOT_FOUND'))
			}

			return createResponse(res, STATUS_CODES.OK, res.__('USER.GET_DETAIL'), userDetail)
		} catch (error) {
			logger.error(__filename, 'getUser', req.custom.uuid, 'Error During get user : ', error)
			return createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, res.__('SERVER_ERROR_MESSAGE'))
		}
	}
}

export default new UserController()
