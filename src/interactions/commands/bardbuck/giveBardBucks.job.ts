import { UserCommand } from "base-app-for-discordjs/src/Jobs";
import { BardApp } from "../../../main";

export default new UserCommand<BardApp>({
    name: "Ge 100 Bardbucks",
    async execute(interaction, app) {
        let target = interaction.options.getUser("user");
        let giverID = interaction.user
        if (app.ledger.subtractFunds(100, giverID.id)) {
            app.ledger.addFunds(100, target.id)
            interaction.reply(`${target}, ${giverID} gave dig 100 bardbucks, wow!!`)
        }
    }
})