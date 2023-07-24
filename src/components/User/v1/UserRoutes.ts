import { Response, Router } from 'express'
import { CustomRequest } from '../../../environment'
import UserController from './UserController'
import UserValidation from './UserValidation'
import Authenticate from '../../../middlewares/authenticate'

const router: Router = Router()

router.get('/:user_id', [Authenticate.is_authorized], (req: CustomRequest, res: Response) => {
	UserController.get(req, res)
})

router.post('/', [UserValidation.add], (req: CustomRequest, res: Response) => {
	UserController.add(req, res)
})

router.post('/login', [UserValidation.login], (req: CustomRequest, res: Response) => {
	UserController.login(req, res)
})

export default router
