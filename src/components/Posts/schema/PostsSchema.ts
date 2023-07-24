import { Schema } from 'mongoose'

const PostSchema: Schema = new Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		category: { type: String, required: true },
		author: { type: String, required: true }
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

export default PostSchema
