import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  state: {
    type: Boolean,
    default: true,
  },
  avatar: {
    type: Schema.Types.Mixed,
    default:
      "https://res.cloudinary.com/dn3kl3egc/image/upload/v1636226226/Avatar/avatar_default.png",
  },
  avatarId: {
    type: Schema.Types.Mixed,
  },
  banner: {
    type: Schema.Types.Mixed,
  },
  bannerId: {
    type: Schema.Types.Mixed,
  },
  phone: {
    type: Number,
  },
  date: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  biography: {
    type: String,
  },
  gender: {
    type: String,
  },
  followers: [{ type: Schema.Types.ObjectId, ref: "users" }],
  followings: [{ type: Schema.Types.ObjectId, ref: "users" }],
  savedPosts: [{ type: Schema.Types.ObjectId, ref: "posts" }],
});

UserSchema.method("toJSON", function () {
  const { __v, password, state, savedPosts, avatarId, bannerId, ...user } =
    this.toObject();
  return user;
});

export const UserModel = model("users", UserSchema);
