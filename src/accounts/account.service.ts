import { injectable } from "tsyringe";
import { Request, Response } from "express";
import { UserService } from "../Users/user.service";
import knex from "../database/db";
import { generateRandom11DigitNumber } from "../utils";
import { TransactionService } from "../Transactions/transaction.service";
import { accountDetails } from "./dto/account.interface";
import { isPositiveValue } from "../utils/helpers";

@injectable()
export class AccountService {
  private userSvc: UserService;
  private readonly transSvc: TransactionService
  tableName = "accounts";
  constructor(userService: UserService, transService: TransactionService) {
    this.userSvc = userService;
    this.transSvc = transService;
  }

  createAccount = async (req: Request, res: Response) => {
    try {
      const { user_id } = req.body;
      const isUser = await this.userSvc.getUser(user_id);
      if (!isUser) {
        return res.status(400).send("User not found");
      }
      // generate a random 11 digit number for an account number for a user
      const generatedId = generateRandom11DigitNumber();
      // check if the generatedId as an account number already exist
      const accountId = await this.getAccount(generatedId);
      // if not then use for the user
      // the generatedId(account_number) is used as the primary id for the account table
      // by default balance is set as 0
      if (!accountId) {
        await knex(this.tableName)
          .insert({
            id: generatedId,
            user_id,
            amount: 0,
            balance: 0
          });
        const insertedAccount = await knex(this.tableName).where('id', generatedId).first();
        return res.status(201).json(insertedAccount);
      }
    } catch (error) {
      console.log(error);
      res.status(404).send(`error creating an account: ${error}`);
    }
  };

  fundAccount = async (req: Request, res: Response) => {
    try {
      const request  = req;
      const response = res;
      const { account_id, amount, remark } = req.body;
      const account = await this.getAccount(account_id);
      if (!account) {
        return res.status(400).send("Account not found, please create an account");
      }
      let validateAmount = isPositiveValue(amount);
      if (validateAmount === -1) {
        return res.status(400).send("Please enter a positive amount");
      }
      let fundBalance = (Number(account.balance) + Number(amount));
      await knex(this.tableName)
        .where({ id: account_id })
        .update({ id: account_id, amount, balance: fundBalance, remark });

      const updatedAccount: accountDetails | undefined = await knex(this.tableName)
        .where({ id: account_id })
        .first();

      if (updatedAccount) {
        // update the transaction table with the enum type as fund
        const transaction = await this.transSvc.fundTransaction(request, response);
        return res.status(200).json(updatedAccount);
      } else {
        return res.status(400).send("no account to fund ");
      }
    } catch (error) {
      console.log(error);
      res.status(404).send(`error funding an account: ${error}`);
    }
  };

  transferFunds = async (req: Request, res: Response) => {
    try {
      const request = req;
      const response = res;
      const { account_id, recipient_account_id, amount, remark } = req.body;
      const userAccount = await this.getAccount(account_id);

      if (!userAccount) {
        return res.status(400).send("account number not found");
      }
      // check recipient account number
      const recipientAccount = await this.getAccount(recipient_account_id);
      if (!recipientAccount) {
        return res.status(400).send("recipient account number not found");
      }
      // check the user account balance with the amount you want to transfer to recipient account
      if (userAccount && userAccount.balance < amount) {
        return res.status(400).send(`you don't have up to ${amount} in your account to transfer`);
      }
      let validateAmount = isPositiveValue(amount);
      if (validateAmount === -1) {
        return res.status(400).send("Please enter a positive amount");
      }
      // after successful balance check, deduct the amount we want to transfer
      const withdrawAccount: accountDetails | undefined = await this.withdrawAmount(Number(userAccount.balance), Number(amount), account_id);
      // update the recipient account
      let updatedBalance = (Number(recipientAccount?.balance) + Number(amount));
      await knex(this.tableName)
        .where({ id: recipient_account_id })
        .update({ balance: updatedBalance, amount, remark });

      const updatedAccount: accountDetails | undefined = await knex(this.tableName)
        .where({ id: account_id })
        .first();

      if (updatedAccount) {
        // update the transaction table with the enum type as transfer
        const transaction = await this.transSvc.transferTransaction(request, response);
        return res.status(200).json(updatedAccount);
      } else {
        return res.status(400).send("no recipient account to fund ");
      }
    } catch (error) {
      console.log(error);
      res.status(404).send(`error to transfer fund: ${error}`);
    }
  };

  withdrawFunds = async (req: Request, res: Response) => {
    try {
      const request = req;
      const response = res;
      const { account_id, amount } = req.body;
      const account = await this.getAccount(account_id);

      if (!account) {
        return res.status(400).send("account number not found");
      }
      if (account && account.balance < amount) {
        return res.status(400).send(`you don't have up to ${amount} in your account`);
      }
      let validateAmount = isPositiveValue(amount);
      if (validateAmount === -1) {
        return res.status(400).send("Please enter a positive amount");
      }
      const updatedAccount: accountDetails | undefined = await this.withdrawAmount(Number(account.balance), Number(amount), account_id);

      if (updatedAccount) {
        // update the transaction table with the enum type as withdraw
        const transaction = await this.transSvc.withdrawTransaction(request, response);
        return res.status(200).json(updatedAccount);
      } else {
        return res.status(400).send("no account to withdraw ");
      }
    } catch (error) {
      console.log(error);
      res.status(404).send(`error withdrawing an amount: ${error}`);
    }
  };

  withdrawAmount = async (balance: number, amount: number, account_id: number): Promise<accountDetails | undefined> => {

    let withdrawAmount = (Number(balance) - Number(amount));
    await knex(this.tableName)
      .where({ id: account_id })
      .update({ id: account_id, balance: withdrawAmount, amount });

    const updatedAccount = await knex(this.tableName)
      .where({ id: account_id })
      .first() as accountDetails;

    return updatedAccount;
  };

  accountBalance = async (req: Request, res: Response) => {
    try {
      const { account_id } = req.params;
      const account = await this.getAccount(parseInt(account_id));
      if(!account) {
        return null;
      }
      return res.status(200).json(account);
    } catch (error) {
      console.log(error);
      res.status(404).send(`error account balance: ${error}`);
    }
  };

  getAccountById = async (id: string, res: Response) => {
    try {
      console.log('id ', id);
      const account = await this.getAccount(parseInt(id));
      if(account) {
        return res.status(200).json(account);
      } else {
        return res.status(400).send(`account with id ${id} not found`);
      }
    } catch (error) {
      res.status(404).send(`error fetching account ${id}: ${error}`);
    }
  };

  getAccount = async (id: number): Promise<accountDetails | undefined> => {
    try {
      const account:accountDetails = await knex(this.tableName).where({ id }).first();
      return account;
    } catch (error) {
      console.log(error);
    }
  }
}
