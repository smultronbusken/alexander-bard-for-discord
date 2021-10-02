import { SubCommand } from "base-app-for-discordjs/src/Jobs";
import { BardApp } from "../../main";

export default new SubCommand<BardApp>({
    masterCommand: "bardbuck",
    name: "funds",
    info: "Hur många Bardbucks har du?",
    execute(interaction, app) {
        let total = app.ledger.funds(interaction.user.id);
        interaction.reply("Du har så mycket som " + total + " bardbucks")
    }
})