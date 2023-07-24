import { model } from 'mongoose'
import { UserSchema } from '../schema'
import { logger } from '../../../utils/logger'

const UserModel = model('user_master', UserSchema)

class UserMaster {
	/**
	 * @description Add new user
	 * @param userObj
	 * @param transaction
	 */
	async addOne(userObj: Object) {
		try {
			return await UserModel.create(userObj)
		} catch (error) {
			logger.error(__filename, 'User Model addOne', '', 'Error while performing database addOne operation', error)
			return false
		}
	}

	/**
	 * @description Get single user details
	 * @param condition
	 * @param attributes
	 * @param others
	 */
	async getOne(others: { selectedFields: string }, condition: object = {}) {
		try {
			const selectedFields = others.selectedFields ? others.selectedFields : '-_id -__v'
			return await UserModel.findOne(condition).select(selectedFields).exec()
		} catch (error) {
			logger.error(__filename, 'User Model getOne', '', 'Error while performing database getOne operation', error)
			return false
		}
	}

	/**
	 * @description Get user details by id
	 * @param condition
	 * @param attributes
	 * @param others
	 */
	async getByID(id: string, others: { selectedFields: string }) {
		try {
			const selectedFields = others.selectedFields ? others.selectedFields : '-_id -__v'
			return await UserModel.findById(id).select(selectedFields).exec()
		} catch (error) {
			logger.error(__filename, 'User Model getByID', '', 'Error while performing database getByID operation', error)
			return false
		}
	}
}

export default new UserMaster()
