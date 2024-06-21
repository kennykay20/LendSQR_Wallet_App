import { injectable } from "tsyringe";
import { Request, Response } from "express";
import { UserService } from "../users/user.service";
import knex from "knex";
import { generateRandom11DigitNumber } from "../utils";

@injectable()
export class AccountService {
  private userSvc: UserService;
  tableName = "accounts";
  constructor(userService: UserService) {
    this.userSvc = userService;
  }

  createAccount = async (req: Request, res: Response) => {
    try {
      const { user_id } = req.body;
      const isUser = await this.userSvc.getUserById(user_id, res);
      if (!isUser) {
        return res.status(400).send("User not found");
      }
      const generatedId = generateRandom11DigitNumber();
      const accountId = await this.getAccountById(generatedId, res);
      if (!accountId) {
        const result = await knex(this.tableName)
          .insert({
            id: generatedId,
            user_id,
            balance: 0
          })
          .returning("*");
        return res.status(201).json(result[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fundAccount = async (req: Request, res: Response) => {
    try {
      const { account_id, type, amount, recipient_account_id } = req.body;
      const account = await this.getAccountById(account_id, res);
      if (!account) {
        return res.status(400).send("Account not found");
      }

      let generatedId = generateRandom11DigitNumber();
      const accountId = await this.getAccountById(generatedId, res);
      if (!accountId) {
        const result = await knex(this.tableName)
          .insert({
            id: generatedId,
            balance: 0
          })
          .returning("*");
        return res.status(201).json(result[0]);
      } else {
        generatedId = generateRandom11DigitNumber();

      }
      
      const result = await knex(this.tableName)
        .insert({
          account_id,
          type,
          amount,
          recipient_account_id
        })
        .returning("*");
      return res.status(201).json(result[0]);
    } catch (error) {
      console.log(error);
    }
  };

  transferFunds = async (req: Request, res: Response) => {
    try {
      const { account_id, recipient_account_id, amount} = req.body;
      const acctBalance = await this.accountBalance(req, res);
      // check accountBalance with the amount you want to transfer to another account
      // if accountbalance is greater than amount

    } catch (error) {
      console.log(error);
    }
  };

  withdrawFunds = async (req: Request, res: Response) => {
    try {
      const acctBalance = await this.accountBalance(req, res);
    } catch (error) {
      console.log(error);
    }
  };

  accountBalance = async (req: Request, res: Response) => {
    try {
      const { account_id } = req.body;
      const result = await this.getAccountById(account_id, res);
      console.log('account ', result);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  };

  getAccountById = async (id: number, res: Response) => {
    try {
      const account = await knex(this.tableName).where({ id });
      return res.json(account[0]);
    } catch (error) {
      res.status(404).send(`account with id ${id} : ${error}`);
    }
  };
}
