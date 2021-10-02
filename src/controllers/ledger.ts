import { Snowflake } from "discord-api-types";
import StormDB from "stormdb";

export default class Ledger {

    constructor(public db: StormDB)  {
    }

    public addFunds(amount, userID) : boolean {
        let ledger = this.db.get("ledger").get(userID);
        let currentAmount: number = ledger.value()
        if (currentAmount)
            ledger.set(currentAmount + amount);
        else
            ledger.set(amount);
        ledger.save()
        return true
    }
      
    public subtractFunds(amount: number, userID: Snowflake) : boolean {
        let ledger = this.db.get("ledger").get(userID);
        let currentAmount: number = ledger.value()
        if (currentAmount) {
            let sum = currentAmount + amount
            if (sum < 0) {
                return false;
            }
            ledger.set(currentAmount + amount);
        }
        else
            ledger.set(amount);
        ledger.save()
        return true;
    }
      
    public funds(userID) {
        return this.db.get("ledger").get(userID).value();
    }

}