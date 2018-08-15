import "reflect-metadata";
import { Service } from "typedi";
import { User } from "../models/User";
import { PasswordHelper } from "../helpers/PasswordHelper";

@Service()
export class UserService {
  constructor(
  ) {

  }

  async create(username: string, email: string, password: string) { 
    return await User.create({
      email: email,
      username: username,
      password: PasswordHelper.hash(password)
    })
  }
}