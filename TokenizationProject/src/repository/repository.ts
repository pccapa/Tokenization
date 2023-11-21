import { DatabaseType } from "../database/enumDatabase";
import { FactoryDB } from "../database/factoryDB";
import { CreditCard } from "../schema/creditCard";
import { TokenCard } from "../schema/tokenCard";

class Repository extends FactoryDB {
    public async insertCharges(creditCard: CreditCard) {
        try {
            const database: any = this.getDatabase(DatabaseType.REDIS);
            await database.add(creditCard.token, creditCard);
        }
        catch (error) {
            throw error;
        }
    }


    public async getCharges(tokenCard: TokenCard) {
        try {
            const database: any = this.getDatabase(DatabaseType.REDIS);
            const response = await database.get(tokenCard.token);
            return response;
        }
        catch (error) {
            throw error;
        }

    }


    async findCreditCard(credictCard: CreditCard) {
        try {
            const database: any = this.getDatabase(DatabaseType.MYSQL);
            const response = await database.get("call findCreditCard(?,?,?,?,?)", [credictCard.card_number, credictCard.cvv,
            credictCard.expiration_month, credictCard.expiration_year, credictCard.email]);
            return response as CreditCard;
        }
        catch (error) {
            throw error;
        }

    }

    async checkMerchant(merchantPk: string) {
        try {
            const database: any = this.getDatabase(DatabaseType.MYSQL);
            const response = await database.get("call checkMerchant(?)", [merchantPk]);
            return Boolean(response.countRecords);
        }
        catch (error) {
            throw error;
        }

    }

}

export default new Repository();