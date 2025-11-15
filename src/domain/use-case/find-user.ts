import {User} from '../entities'

export interface FindUser { findById: (id: number) => User }
