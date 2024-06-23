import { Request, Response } from "express";
import { injectable } from "tsyringe";
import knex from "../database/db";
import { TransactionsType } from "../utils";
import { transactionDetails } from "./dto/transaction.interface";

@injectable()
export class TransactionService {
  tableName = "transactions";
  constructor () {}

  fundTransaction = async (req: Request, res: Response) => {

    try {
      // update the transaction type as fund
      const { account_id, amount } = req.body;
      // id of the table is increment
      const [insertedId] = await knex(this.tableName).insert({
        type: TransactionsType.fund,
        account_id,
        amount
      });
      const insertedFund: transactionDetails | undefined = await knex(this.tableName)
        .where({ id: insertedId })
        .first();
      return insertedFund;
    } catch (error) {
      console.log(error);
    }
  }

  transferTransaction = async (req: Request, res: Response) => {
    try {
      // update the transaction type as transfer
      const { account_id, amount, recipient_account_id } = req.body;

      // id of the table is increment
      const [insertedId] = await knex(this.tableName).insert({
        type: TransactionsType.transfer,
        account_id,
        amount,
        recipient_account_id
      });
      const insertedTransfer: transactionDetails | undefined = await knex(this.tableName)
        .where({ id: insertedId })
        .first();

      return insertedTransfer;
    } catch (error) {
      console.log(error);
    }
  }

  withdrawTransaction = async (req: Request, res: Response) => {
    try {
      // update the transaction type as withdraw
      const { account_id, amount } = req.body;

      // id of the table is increment
      const [insertedId] = await knex(this.tableName).insert({
        type: TransactionsType.withdraw,
        account_id,
        amount
      });
      const insertedWithdraw: transactionDetails | undefined = await knex(this.tableName)
        .where({ id: insertedId })
        .first();

      return insertedWithdraw;
    } catch (error) {
      console.log(error);
    }
  }
}