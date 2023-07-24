import { Response } from 'express'
import STATUS_CODES from 'http-status-codes'
import { CustomRequest } from '../../../environment'
import { logger } from '../../../utils/logger'
import { createResponse } from '../../../utils/helper'
import { PostsMaster } from '../model'

class PostsController {
	/**
	 * @description add new post
	 * @param req
	 * @param res
	 */

	async add(req: CustomRequest, res: Response) {
		try {
			const { title, content, category } = req.body

			await PostsMaster.addOne({
				title,
				content,
				category: category.toUpperCase(),
				author: req.custom.userID
			})

			return createResponse(res, STATUS_CODES.CREATED, res.__('POST.ADD'))
		} catch (error) {
			logger.error(__filename, 'addPost', req.custom.uuid, 'Error During add new post : ', error)
			return createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, res.__('SERVER_ERROR_MESSAGE'))
		}
	}

	/**
	 * @description update post
	 * @param req
	 * @param res
	 */

	async update(req: CustomRequest, res: Response) {
		try {
			const { id } = req.params
			const { title, content, category } = req.body

			const postDetail = await PostsMaster.getByID(id, { selectedFields: '_id author' })

			if (!postDetail) {
				return createResponse(res, STATUS_CODES.NOT_FOUND, res.__('POST.NOT_FOUND'))
			}

			if (req.custom.userID !== postDetail.author) {
				return createResponse(res, STATUS_CODES.UNAUTHORIZED, res.__('UNAUTHORIZED'))
			}

			await PostsMaster.updateByID(id, {
				title,
				content,
				category: category?.toUpperCase()
			})

			return createResponse(res, STATUS_CODES.CREATED, res.__('POST.UPDATE'))
		} catch (error) {
			logger.error(__filename, 'updatePost', req.custom.uuid, 'Error During update post : ', error)
			return createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, res.__('SERVER_ERROR_MESSAGE'))
		}
	}

	/**
	 * @description delete post
	 * @param req
	 * @param res
	 */

	async delete(req: CustomRequest, res: Response) {
		try {
			const { id } = req.params

			const postDetail = await PostsMaster.getByID(id, { selectedFields: '_id author' })

			if (!postDetail) {
				return createResponse(res, STATUS_CODES.NOT_FOUND, res.__('POST.NOT_FOUND'))
			}

			if (req.custom.userID !== postDetail.author) {
				return createResponse(res, STATUS_CODES.UNAUTHORIZED, res.__('UNAUTHORIZED'))
			}

			await PostsMaster.deleteByID(id)

			return createResponse(res, STATUS_CODES.CREATED, res.__('POST.DELETE'))
		} catch (error) {
			logger.error(__filename, 'deletePost', req.custom.uuid, 'Error During delete post : ', error)
			return createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, res.__('SERVER_ERROR_MESSAGE'))
		}
	}

	/**
	 * @description get post detail
	 * @param req
	 * @param res
	 */
	async getOne(req: CustomRequest, res: Response) {
		try {
			const { id } = req.params

			const postDetail = await PostsMaster.getByID(id, { selectedFields: '_id -__v ' })

			if (!postDetail) {
				return createResponse(res, STATUS_CODES.NOT_FOUND, res.__('POST.NOT_FOUND'))
			}

			return createResponse(res, STATUS_CODES.CREATED, res.__('POST.FOUND'), postDetail)
		} catch (error) {
			logger.error(__filename, 'getOnePost', req.custom.uuid, 'Error During get one post : ', error)
			return createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, res.__('SERVER_ERROR_MESSAGE'))
		}
	}

	/**
	 * @description get all post
	 * @param req
	 * @param res
	 */
	async getAll(req: CustomRequest, res: Response) {
		try {
			const { category, sortFields, title, content } = req.query

			const sortByFields = sortFields ? String(sortFields) : '-created_at' // sorting for one or more fields example: "created_at -title"

			// exact match condition in category, regex implemented in title, content
			// sorting apply on all fields default is created_at in descending order
			const condition = {
				$and: [
					category
						? {
								category: category.toString().toUpperCase()
						  }
						: {},
					title
						? {
								title: { $regex: title, $options: 'i' }
						  }
						: {},
					content
						? {
								content: { $regex: content, $options: 'i' }
						  }
						: {}
				]
			}

			const postDetails: any = await PostsMaster.getMany({ selectedFields: '-__v', sortFields: sortByFields }, condition)

			if (postDetails.length === 0) {
				return createResponse(res, STATUS_CODES.NOT_FOUND, res.__('POST.NOT_FOUND'))
			}

			return createResponse(res, STATUS_CODES.CREATED, res.__('POST.FOUND'), postDetails)
		} catch (error) {
			logger.error(__filename, 'getOnePost', req.custom.uuid, 'Error During get one post : ', error)
			return createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, res.__('SERVER_ERROR_MESSAGE'))
		}
	}
}

export default new PostsController()
