import { RedisBD } from "./redis/redis";
import { DatabaseType } from "./enumDatabase";
import { Mysql } from "./mySql/mysql";

export class FactoryDB {
    protected getDatabase(type: DatabaseType) {
        if (type === DatabaseType.MYSQL) return new Mysql();
        else if (type === DatabaseType.REDIS) return new RedisBD();
        else return null;
    }
}
