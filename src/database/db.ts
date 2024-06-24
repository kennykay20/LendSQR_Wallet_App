import Knex from "knex";
import knexConfig from '../../knexfile';
import { config } from '../config';

const env = config.NODE_ENV;
const options = knexConfig[env];
const knex = Knex(options);
export default knex;
