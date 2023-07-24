import { Schema } from 'mongoose'

const UserSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		contact_no: { type: String, required: true },
		password: { type: String, required: true }
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

export default UserSchema
