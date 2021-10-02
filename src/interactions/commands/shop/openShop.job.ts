import { SubCommand } from "base-app-for-discordjs/src/Jobs";
import { ApplicationCommandOptionType } from "discord-api-types";
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, SelectMenuInteraction } from "discord.js";
import { BardApp } from "../../../main";

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
        
        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector<SelectMenuInteraction>({ filter });
        collector.on('collect', async i => {

            if (i.customId === "infoItems")  {

                
                let item = app.itemManager.items.get(i.values[0])
                let embedded = new MessageEmbed()
                .setColor("#0099ff")
                .setTitle(
                  item.name + `\n**${item.item.price}** <:bardbuck:833349173981478942>`
                )
                .setImage(item.item.image);
                
                const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('buyItem')
                        .setLabel('Köp')
                        .setStyle('SUCCESS'),
                );


                i.reply({components: [row], embeds: [embedded]})
            }

            if (i.customId === "buyItems") {

            }

            if (i.customId === 'shop') {
                let shopID = i.values[0];
                let items = app.shopManager.shops.get(shopID).shop.items


                const guild = app.skeleton.client.guilds.cache.get(interaction.guildId)
                const member = guild.members.cache.get(interaction.member.user.id);
                const voiceChannel = member.voice.channel;
                if (voiceChannel) {
                    app.voice.playInGuild("./media/" + app.shopManager.shops.get(shopID).shop.musicName, i.guildId, voiceChannel)
                }

                const infoRow = new MessageActionRow()
                let infoMenu = new MessageSelectMenu()
                .setCustomId('infoItems')
                .setPlaceholder('Mer info om vara')
                
                
                const buyRow = new MessageActionRow()
                let buyMenu = new MessageSelectMenu()
                .setCustomId('buyItems')
                .setPlaceholder('Köp vara')
                
                items.forEach(itemID => {
                    let item = app.itemManager.items.get(itemID)
                    infoMenu.addOptions({
                        value: item.item.id,
                        label: item.item.name,
                    })
                    buyMenu.addOptions({
                        value: item.item.id,
                        label: item.item.name,
                    })
                })
                
                infoRow.addComponents(infoMenu)
                buyRow.addComponents(buyMenu)

                let embeddedShopMessage = app.shopManager.printShopBig(shopID)
                i.reply({ embeds: [embeddedShopMessage],  components: [infoRow, buyRow] })
            }
        });

    }
})