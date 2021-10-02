import { SlashCommand } from "base-app-for-discordjs/src/Jobs";
import { BardApp } from "../../../main";

export default new SlashCommand<BardApp>({
    name: "inventory",
    info: "Föremål kommandon"
})