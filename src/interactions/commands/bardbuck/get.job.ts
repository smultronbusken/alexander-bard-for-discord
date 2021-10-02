import { SubCommand } from "base-app-for-discordjs/src/Jobs";
import { BardApp } from "../../../main";

export default new SubCommand<BardApp>({
    masterCommand: "bardbuck",
    name: "get",
    info: "Bard bucks ger dig 10 bardbucks",
    execute(interaction, app) {
        app.ledger.addFunds(100, interaction.user.id)
        let total = app.ledger.funds(interaction.user.id);
        interaction.reply("Grattis, du fick 100 Bardbucks. Du har nu " + total + " bardbucks")
    }
})