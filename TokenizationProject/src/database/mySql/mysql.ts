import mysql from 'mysql2/promise';
import * as dotenv from "dotenv";

dotenv.config();

export class Mysql {
    private config;

    constructor() {
        this.config = {
            db: {
                host: process.env.HOST_MYSQL,
                user: process.env.USER_MYSQL,
                password: process.env.PASS_MYSQL,
                database: process.env.DATABASE
            }
        };

    }


    public async get(query: string, parameters: Array<any>) {
        try {
            const client = mysql.createPool(this.config.db);
            let [response] = await client.execute(query, parameters);
            if (response == null) return null;
            return JSON.parse(JSON.stringify(response))[0][0];
        }
        catch (error) {
            throw error;
        }

    }

}