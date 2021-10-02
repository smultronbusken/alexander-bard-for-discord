import JobRegister, { Job } from "base-app-for-discordjs/src/Jobs";
import { Collection, MessageEmbed, TextChannel } from "discord.js";
import { Inventory } from "../inventory/inventory";
import { ItemManager } from "../items/item";
import Ledger from "../ledger";
export interface ShopInput {
    id: string,
    info: string,
    name: string,
    title: string,
    url: string,
    thumbnail: string,
    image: string,
    description: string,
    items: string[],
    musicName: string
}

@JobRegister.JobClass
export class Shop extends Job {
    shop: ShopInput
    constructor(shopInput: ShopInput) {
        super(shopInput);
        this.shop = shopInput
    }
}

export enum TRANSACTION_RESPONSE {
  NOT_ENOUGH_FUNDS,
  OTHER,
  SUCCESS,
  NO_SUCH_ITEM,
  NO_SUCH_ITEM_IN_SHOP,
};

export class ShopManager {
    public shops: Collection<string, Shop> = new Collection()

    buyItem(itemID, userID, itemManager: ItemManager, ledger: Ledger, inventory: Inventory) {
      if (!itemManager.items.get(itemID))
        return TRANSACTION_RESPONSE.NO_SUCH_ITEM;
  
    
      let item = itemManager.items.get(itemID);
      let itemPrice = item.item.price;
      let ledgerAmount = ledger.funds(userID);
    
      if (ledgerAmount < itemPrice) {
        return TRANSACTION_RESPONSE.NOT_ENOUGH_FUNDS;
      }
    
      if (inventory.getInventory(userID).find((i) => i == itemID))
        return TRANSACTION_RESPONSE.OTHER;
    
      ledger.subtractFunds(itemPrice, userID);
      inventory.addItem(itemID, userID);

      return TRANSACTION_RESPONSE.SUCCESS;
    }

    
    printShopBig(shopID) : MessageEmbed{
      const shop = this.shops.get(shopID);
      let exampleEmbed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle(shop.shop.title)
        .setURL(shop.shop.url)
        .setThumbnail(shop.shop.thumbnail)
        .setImage(shop.shop.image)
        .setDescription(
          shop.shop.description +
            `\n Behöver du mer <:bardbuck:833349173981478942> så bör du be till med genom att skriva *pray* eller ansöka till Bards College genom att skriva *börja bardscollege*.`
        );
      return exampleEmbed
    }

}