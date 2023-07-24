import { NextFunction, Response } from 'express'
import { CustomRequest } from '../../../environment'
import { isEmail, isEmpty, isLength, isString, isValidPhoneNo } from '../../../utils/validator'
import { createValidationResponse } from '../../../utils/helper'

class UserValidation {
	/**
	 * @description add new user
	 * @param req
	 * @param res
	 * @param next
	 */

	add(req: CustomRequest, res: Response, next: NextFunction) {
		const { name, contact_no, email, password } = req.body
		const errors: any = {}

		if (isEmpty(name)) {
			errors.name = res.__('USER.VALIDATION.NAME.required')
		} else if (!isString(name)) {
			errors.name = res.__('USER.VALIDATION.NAME.type')
		}

		if (isEmpty(contact_no)) {
			errors.contact_no = res.__('USER.VALIDATION.CONTACT_NO.required')
		} else if (!isValidPhoneNo(contact_no)) {
			errors.contact_no = res.__('USER.VALIDATION.CONTACT_NO.valid')
		} else if (!isString(contact_no)) {
			errors.contact_no = res.__('USER.VALIDATION.CONTACT_NO.type')
		}

		if (isEmpty(email)) {
			errors.email = res.__('USER.VALIDATION.EMAIL.required')
		} else if (!isEmail(email)) {
			errors.email = res.__('USER.VALIDATION.EMAIL.type')
		} else if (!isLength(email, { min: 10, max: 255 })) {
			errors.email = res.__('USER.VALIDATION.EMAIL.valid')
		}

		if (isEmpty(password)) {
			errors.password = res.__('USER.VALIDATION.PASSWORD.required')
		} else if (!isLength(password, { min: 8, max: 16 })) {
			errors.password = res.__('USER.VALIDATION.PASSWORD.valid')
		} else if (!isString(password)) {
			errors.password = res.__('USER.VALIDATION.PASSWORD.type')
		}

		if (Object.keys(errors).length > 0) {
			createValidationResponse(res, errors)
		} else {
			next()
		}
	}

	/**
	 * @description login user
	 * @param req
	 * @param res
	 * @param next
	 */
	login(req: CustomRequest, res: Response, next: NextFunction) {
		const { email, password } = req.body
		const errors: any = {}

		if (isEmpty(email)) {
			errors.email = res.__('USER.VALIDATION.EMAIL.required')
		} else if (!isEmail(email)) {
			errors.email = res.__('USER.VALIDATION.EMAIL.type')
		} else if (!isLength(email, { min: 10, max: 255 })) {
			errors.email = res.__('USER.VALIDATION.EMAIL.valid')
		}

		if (isEmpty(password)) {
			errors.password = res.__('USER.VALIDATION.PASSWORD.required')
		} else if (!isLength(password, { min: 8, max: 16 })) {
			errors.password = res.__('USER.VALIDATION.PASSWORD.valid')
		} else if (!isString(password)) {
			errors.password = res.__('USER.VALIDATION.PASSWORD.type')
		}

		if (Object.keys(errors).length > 0) {
			createValidationResponse(res, errors)
		} else {
			next()
		}
	}
}

export default new UserValidation()
