import Skeleton from "base-app-for-discordjs/src/Skeleton"
import { Intents } from "discord.js";
import { Inventory } from "./controllers/inventory/inventory";
import { Item, ItemManager } from "./controllers/items/item";
import Ledger from "./controllers/ledger";
import { Shop, ShopManager } from "./controllers/shop/shop";
import { Voice } from "./voice/voice";



export class BardApp {
  public skeleton: Skeleton<BardApp>
  public ledger: Ledger
  public inventory: Inventory
  public shopManager: ShopManager
  public itemManager: ItemManager
  public voice: Voice

}

let bardApp = new BardApp()
   
import("../config.json").then(config => {
    const intents = { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] }
    const skeleton = new Skeleton(
        bardApp, 
        config["APP_TOKEN"],
        config["APP_ID"],
        intents,
        config["DEV_GUILD_ID"]
      );



      skeleton.client.login(config["APP_TOKEN"]);


      skeleton.on("ready", () => {
        bardApp.skeleton = skeleton


        let shopManager = new ShopManager()
        skeleton.jobRegister.onRegister(Shop, shop => shopManager.shops.set(shop.shop.id, shop))
        let itemManager = new ItemManager()
        skeleton.jobRegister.onRegister(Item, item => itemManager.items.set(item.item.id, item))

        skeleton.jobRegister.loadAndRegister(true, false)

        bardApp.ledger = new Ledger(skeleton.getStorage("ledger"))
        bardApp.inventory = new Inventory(skeleton.getStorage("inventory"))
        bardApp.shopManager = shopManager
        bardApp.itemManager = itemManager
        bardApp.voice = new Voice(skeleton.client)
        

      })
})
