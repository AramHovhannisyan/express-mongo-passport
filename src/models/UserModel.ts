import { Schema, model, connect } from 'mongoose';

interface IUser {
  name: string
  password: string,
  email: string;
  date: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  date: {type: Date, default: Date.now }
});

const User = model<IUser>('User', userSchema);

export { User, IUser };