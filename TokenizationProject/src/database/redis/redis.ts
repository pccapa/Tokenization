const Redis = require("ioredis");

require('dotenv').config();

export class RedisBD {
    private client;
    private expireToken: number;
    constructor() {
        this.client = new Redis({
            host: process.env.REDIS_SERVER,
            port: process.env.REDIS_PORT,
            username: process.env.REDIS_USER,
            password: process.env.REDIS_PASS,
            connectTimeout: 2000,
            lazyConnect: true,
            maxRetriesPerRequest: 2
        });
        this.client
            .on('error', (e: any) => {
                console.log(e)
                this.client.disconnect();
            })
            .on('close', () => {
                this.client.disconnect();
            });
        this.expireToken = Number(process.env.EXPIRE_TOKEN);
    }

    public async add(key: string, data: any) {
        try {

            await this.client.connect();
            await this.client.set(key, JSON.stringify(data), 'EX', this.expireToken);

        }
        catch (error) {
            throw error;
        }
        finally {
            this.client.disconnect();
        }
    }

    public async get(key: string) {
        try {

            await this.client.connect();
            const response = await this.client.get(key);

            if (response == null || response == undefined) return null;

            const dataFormatted = JSON.parse(response);
            return dataFormatted;
        }
        catch (error) {
            throw error;
        }
        finally {
            this.client.disconnect();
        }
    }


}