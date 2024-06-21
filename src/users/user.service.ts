import { injectable } from "tsyringe";
import { Request, Response } from "express";
import knex from "../database/db";
import { isValidEmail, isValidPassword } from "../utils/helpers";
import { Authentication } from "../utils/auth";

@injectable()
export class UserService {
  tableName = "users";
  constructor () {}

  createUser = async (req: Request, res: Response) => {
    try {
      let hashPassword: any = null;
      const { email, username, full_name, password, address } = req.body;
      if (!email ) {
        return res
          .status(400)
          .send("please enter email");
      }
      if (email && !isValidEmail(email)) {
        return res.status(400).send("Invalid email address supplied");
      }

      if (password && !isValidPassword(password)) {
        return res.status(400).send("Password must be at least 5 characters with 1 uppercase");
      }

      // check if this user already has records in the karma blacklist
      // if yes user cannot be onboarded

      // check if this email already exist
      const emailExist = await this.getUserByEmail(email);
      if (emailExist) {
        res.status(400).send('Email already exist');
      }

      if (password) {
        const salt = Authentication.generateSalt();
        const passwordHash = Authentication.generatePasswordHash(
          password,
          salt,
        );
        hashPassword = `${salt}.${passwordHash}`;
      }
      const [insertedId] = await knex(this.tableName).insert({
        email,
        username,
        full_name,
        password_hash: hashPassword,
        address
      });

      const insertedUser = await knex(this.tableName).where('id', insertedId).first();
      console.log('result ', insertedUser);
      delete insertedUser.password_hash;
      return res.status(201).json(insertedUser);

    } catch (error) {
      console.log(error);
      return res.sendStatus(400)
    } finally {
      await knex.destroy();
    }
  };

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await knex(this.tableName);
      res.json(users);
    } catch (error) {
      res.status(404).send(`error fetching user ${error}`);
    } finally {
      await knex.destroy();
    }
  };

  getUserById = async (id: string, res: Response) => {
    try {
      const user = await knex(this.tableName).where({ id, is_deleted: false });
      return res.json(user[0]);
    } catch (error) {
      res.status(404).send(`user with id ${id} not found`);
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { fullName, username } = req.body;
      const result = await knex(this.tableName).where({ id }).update({ fullName, username })
      res.json(result);
    } catch (error) {
      res
        .status(400)
        .json({ message: `failed to update the user `, error: error });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await knex(this.tableName).where({ id }).update({ is_deleted: true, deleted_at: Date.now().toString()})
            .returning("*");
      if(result) {
        res.status(200).send(`user for id ${id} successfully deleted`);
      }
      
    } catch (error) {
      res
        .status(400)
        .json({ message: `failed to delete the user `, error: error });
    }
  };

  getUserByEmail = async(email: string): Promise<any> => {
    try {
      const result = await knex(this.tableName).where(
        {email, is_delete: false });
      console.log('result ', result);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
}
