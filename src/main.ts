import Skeleton from "base-app-for-discordjs/src/Skeleton"
import { Intents } from "discord.js";
import Ledger from "./controllers/ledger";



export class BardApp {
  public skeleton: Skeleton<BardApp>
  public ledger: Ledger

  public setUpControllers() {
    this.ledger = new Ledger(this.skeleton.getStorage("ledger"))
  }


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
        bardApp.setUpControllers()
      })
})
