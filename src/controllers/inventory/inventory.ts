import StormDB from "stormdb";

export class Inventory {
    
    constructor(public db: StormDB)  {
    }

    addItem(itemID, userID) {
        if (this.getInventory(userID).length === 0) {
            this.db.get("inventories").get(userID).set([itemID]);
        } else {
            this.db.get("inventories").get(userID).push(itemID);
        }
        this.db.save()
    }
      
    getInventory(userID) : Array<string> {
        let inventory = this.db.get("inventories").get(userID).value()
        if (!inventory) return [];
        return inventory;
    }
      
    hasItem(itemID, userID) : Boolean{
        const inventory = this.getInventory(userID);
        return inventory.includes(itemID);
    }
      
    removeItem(itemID, userID) {
        const inventory = this.getInventory(userID);
        const filtered = inventory.filter((id) => id != itemID);
        this.db.get("inventories").get(userID).set(filtered);
        this.db.save()
    }
      
}