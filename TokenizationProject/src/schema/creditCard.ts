export interface CreditCard {
    token?: string,
    tokenExpirationTime?: string,
    card_number?: string;
    cvv?: number;
    expiration_month?: string;
    expiration_year?: string;
    email?: string;
}
