import { SlashCommand, SubCommand } from "base-app-for-discordjs/src/Jobs";
import { MessageEmbed } from "discord.js";
import { BardApp } from "../../../main";

export default new SubCommand<BardApp>({
    name: "show",
    info: "Föremål kommandon",
    masterCommand: "inventory",
    execute(interaction, app) {
        let inventory = app.inventory.getInventory(interaction.user.id)
        if (inventory.length === 0) {
            interaction.reply(
              "Du har inte köpt något."
            );
            return;
          }

        let exampleEmbed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Dina föremål:");
        Object.values(inventory).forEach((itemID) => {
            const item = app.itemManager.items.get(itemID);
            if (item) {
                exampleEmbed.addField(
                    `${item.name}`,
                    `${item.info}\n
                Skriv *använd ${item.item.id}*`,
                    true)
            }
        })


        interaction.reply({ embeds: [exampleEmbed]});
    }
})