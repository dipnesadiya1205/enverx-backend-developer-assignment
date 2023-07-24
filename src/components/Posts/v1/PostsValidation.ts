import { NextFunction, Response } from 'express'
import { CustomRequest } from '../../../environment'
import { isEmail, isEmpty, isLength, isString, isValidPhoneNo } from '../../../utils/validator'
import { createValidationResponse } from '../../../utils/helper'

class PostsValidation {
	/**
	 * @description add new post
	 * @param req
	 * @param res
	 * @param next
	 */
	add(req: CustomRequest, res: Response, next: NextFunction) {
		const { title, content, category } = req.body
		const errors: {
			title?: string
			content?: string
			category?: string
		} = {}

		if (isEmpty(title)) {
			errors.title = res.__('POST.VALIDATION.TITLE.required')
		} else if (!isString(title)) {
			errors.title = res.__('POST.VALIDATION.TITLE.type')
		} else if (!isLength(title, { min: 1, max: 255 })) {
			errors.title = res.__('POST.VALIDATION.TITLE.valid')
		}

		if (isEmpty(content)) {
			errors.content = res.__('POST.VALIDATION.CONTENT.required')
		} else if (!isString(content)) {
			errors.content = res.__('POST.VALIDATION.CONTENT.type')
		} else if (!isLength(content, { min: 1, max: 1000 })) {
			errors.content = res.__('POST.VALIDATION.CONTENT.valid')
		}

		if (isEmpty(category)) {
			errors.category = res.__('POST.VALIDATION.CATEGORY.required')
		} else if (!isString(category)) {
			errors.category = res.__('POST.VALIDATION.CATEGORY.type')
		} else if (!isLength(category, { min: 1, max: 50 })) {
			errors.category = res.__('POST.VALIDATION.CATEGORY.valid')
		}

		if (Object.keys(errors).length > 0) {
			createValidationResponse(res, errors)
		} else {
			next()
		}
	}

	/**
	 * @description update post
	 * @param req
	 * @param res
	 * @param next
	 */
	update(req: CustomRequest, res: Response, next: NextFunction) {
		const { title, content, category } = req.body
		const errors: { title?: string; content?: string; category?: string } = {}

		if (title) {
			if (isEmpty(title)) {
				errors.title = res.__('POST.VALIDATION.TITLE.required')
			} else if (!isString(title)) {
				errors.title = res.__('POST.VALIDATION.TITLE.type')
			} else if (!isLength(title, { min: 1, max: 255 })) {
				errors.title = res.__('POST.VALIDATION.TITLE.valid')
			}
		}

		if (content) {
			if (isEmpty(content)) {
				errors.content = res.__('POST.VALIDATION.CONTENT.required')
			} else if (!isString(content)) {
				errors.content = res.__('POST.VALIDATION.CONTENT.type')
			} else if (!isLength(content, { min: 1, max: 1000 })) {
				errors.content = res.__('POST.VALIDATION.CONTENT.valid')
			}
		}

		if (category) {
			if (isEmpty(category)) {
				errors.category = res.__('POST.VALIDATION.CATEGORY.required')
			} else if (!isString(category)) {
				errors.category = res.__('POST.VALIDATION.CATEGORY.type')
			} else if (!isLength(category, { min: 1, max: 50 })) {
				errors.category = res.__('POST.VALIDATION.CATEGORY.valid')
			}
		}

		if (Object.keys(errors).length > 0) {
			createValidationResponse(res, errors)
		} else {
			next()
		}
	}
}

export default new PostsValidation()
