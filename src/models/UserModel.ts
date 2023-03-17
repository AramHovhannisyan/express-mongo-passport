import { Schema, model, connect } from 'mongoose';

interface IUser {
  password: string,
  email: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const User = model<IUser>('User', userSchema);

export { User };