import { SubCommand } from "base-app-for-discordjs/src/Jobs";
import { ApplicationCommandOptionType } from "discord-api-types";
import { MessageActionRow, MessageSelectMenu, SelectMenuInteraction } from "discord.js";
import { BardApp } from "../../main";

export default new SubCommand<BardApp>({
    masterCommand: "shop",
    name: "open",
    info: "Öppna en affär",
    execute(interaction, app) {
        let shops = app.shopManager.shops

        let selectMenu = new MessageSelectMenu()
        .setCustomId('shop')
        .setPlaceholder('Ingen affär vald')
    
        shops.forEach(shop => {
            selectMenu.addOptions({
                value: shop.shop.id,
                label: shop.name,
                description: shop.info,
                
            })
        })

        const chooseShop = new MessageActionRow().addComponents(selectMenu );
		interaction.reply({ content: 'Trevligt! Vilken affär ska du till?', components: [chooseShop] });
        
        const filter = i => i.customId === 'shop' && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector<SelectMenuInteraction>({ filter, time: 15000 });
        collector.on('collect', async i => {
            if (i.customId === 'shop') {
                let embeddedShopMessage = app.shopManager.printShopBig(i.values[0])
                i.reply({ embeds: [embeddedShopMessage] })
            }
        });

    }
})