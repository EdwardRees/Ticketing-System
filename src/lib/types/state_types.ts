import {User} from './user';

export type UserState = {
  users: User[];
}

export type UserAction = {
  getUsers: () => void;
}

