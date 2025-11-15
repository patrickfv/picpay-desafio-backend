import { UserModel } from "../models/user-model"

export interface FindUserRepository { load: (id: number) => UserModel }
