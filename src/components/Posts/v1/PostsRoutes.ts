import { Response, Router } from 'express'
import { CustomRequest } from '../../../environment'
import PostsController from './PostsController'
import PostsValidation from './PostsValidation'
import Authenticate from '../../../middlewares/authenticate'

const router: Router = Router()

// Add new post

router.post('/', [Authenticate.is_authorized, PostsValidation.add], (req: CustomRequest, res: Response) => {
	PostsController.add(req, res)
})

// Get all posts

router.get('/', [Authenticate.is_authorized], (req: CustomRequest, res: Response) => {
	PostsController.getAll(req, res)
})

// Get post detail

router.get('/:id', [Authenticate.is_authorized], (req: CustomRequest, res: Response) => {
	PostsController.getOne(req, res)
})

// Update post

router.put('/:id', [Authenticate.is_authorized, PostsValidation.update], (req: CustomRequest, res: Response) => {
	PostsController.update(req, res)
})

// Delete post

router.delete('/:id', [Authenticate.is_authorized], (req: CustomRequest, res: Response) => {
	PostsController.delete(req, res)
})

export default router
