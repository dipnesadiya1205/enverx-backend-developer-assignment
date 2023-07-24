import { model } from 'mongoose'
import { PostSchema } from '../schema'
import { logger } from '../../../utils/logger'

const PostsModel = model('posts_master', PostSchema)

class PostsMaster {
	/**
	 * @description Add new post
	 * @param postObj
	 * @param transaction
	 */
	async addOne(postObj: Object) {
		try {
			return await PostsModel.create(postObj)
		} catch (error) {
			logger.error(__filename, 'Post Model addOne', '', 'Error while performing database addOne operation', error)
			return false
		}
	}

	/**
	 * @description Get all posts
	 * @param others
	 * @param condition
	 */
	async getMany(others: { selectedFields: string; sortFields?: string }, condition: object = {}) {
		try {
			const selectedFields = others.selectedFields ? others.selectedFields : '-_id -__v'
			return await PostsModel.find(condition).select(selectedFields).sort(others.sortFields).exec()
		} catch (error) {
			logger.error(__filename, 'Post Model getMany', '', 'Error while performing database getMany operation', error)
			return false
		}
	}

	/**
	 * @description Get post details by id
	 * @param id
	 * @param others
	 */
	async getByID(id: string, others: { selectedFields: string }) {
		try {
			const selectedFields = others.selectedFields ? others.selectedFields : '-_id -__v'
			return await PostsModel.findById(id).select(selectedFields).exec()
		} catch (error) {
			logger.error(__filename, 'Post Model getByID', '', 'Error while performing database getByID operation', error)
			return false
		}
	}

	/**
	 * @description update post details by id
	 * @param id
	 * @param postObj
	 */
	async updateByID(id: string, postObj: object) {
		try {
			return await PostsModel.findByIdAndUpdate(id, postObj).exec()
		} catch (error) {
			logger.error(__filename, 'Post Model updateByID', '', 'Error while performing database updateByID operation', error)
			return false
		}
	}

	/**
	 * @description delete post by id
	 * @param id
	 */
	async deleteByID(id: string) {
		try {
			return await PostsModel.findByIdAndDelete(id).exec()
		} catch (error) {
			logger.error(__filename, 'Post Model deleteByID', '', 'Error while performing database deleteByID operation', error)
			return false
		}
	}
}

export default new PostsMaster()
