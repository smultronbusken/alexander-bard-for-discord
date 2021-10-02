import Skeleton from "base-app-for-discordjs/src/Skeleton"
import { Intents } from "discord.js";


import("../config.json").then(config => {
    const intents = { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] }
    const skeleton = new Skeleton(
        {}, 
        config["APP_TOKEN"],
        config["APP_ID"],
        intents,
        config["DEV_GUILD_ID"]
      );
      skeleton.client.login(config["APP_TOKEN"]);
})
