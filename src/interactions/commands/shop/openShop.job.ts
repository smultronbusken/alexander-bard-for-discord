import { SubCommand } from "base-app-for-discordjs/src/Jobs";
import { ApplicationCommandOptionType } from "discord-api-types";
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, SelectMenuInteraction } from "discord.js";
import { TRANSACTION_RESPONSE } from "../../../controllers/shop/shop";
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
                .setDescription(item.item.info)
                .setImage(item.item.image);
                
                const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('buyItem-'+item.item.id)
                        .setLabel('Köp')
                        .setStyle('SUCCESS'),
                );


                i.reply({components: [row], embeds: [embedded]})
            }

            if (i.customId.startsWith("buyItem-")) {
                let item = i.customId.substring("buyItem-".length)
                let response = app.shopManager.buyItem(item, i.user.id, app.itemManager, app.ledger, app.inventory)

                

                switch(response) {
                    case TRANSACTION_RESPONSE.NOT_ENOUGH_FUNDS:

                        let funds = app.ledger.funds(i.user.id)
                        let itemObj = app.itemManager.items.get(item)
                        i.reply(`Du har bara **${funds}** Bardbucks medan ${itemObj.item.name} 
                        kostar **${itemObj.item.price}** <:bardbuck:833349173981478942>... fattig lapp.`)
                        break
                    case TRANSACTION_RESPONSE.NO_SUCH_ITEM:
                        i.reply("är du dum? det föremålet finns inte.")
                        break
                    case TRANSACTION_RESPONSE.OTHER:
                        i.reply("Det gick inte att köpa, jag tror att du redan har det föremålet?")
                        break
                    case TRANSACTION_RESPONSE.SUCCESS:
                        i.reply("Bra deal grabben.")
                        break
                }
            }

            if (i.customId === 'shop') {
                let shopID = i.values[0];
                let items = app.shopManager.shops.get(shopID).shop.items


                let subscription = app.voice.getSubscription(interaction.guildId)
                if (!subscription) {
                    const guild = app.skeleton.client.guilds.cache.get(interaction.guildId)
                    const member = guild.members.cache.get(interaction.member.user.id);
                    const voiceChannel = member.voice.channel;
                    if (voiceChannel) {
                        app.voice.playInGuild("./media/" + app.shopManager.shops.get(shopID).shop.musicName, i.guildId, voiceChannel)
                    }
                }

                const infoRow = new MessageActionRow()
                let infoMenu = new MessageSelectMenu()
                .setCustomId('infoItems')
                .setPlaceholder('Köp/info om vara')
                
    
                items.forEach(itemID => {
                    let item = app.itemManager.items.get(itemID)
                    infoMenu.addOptions({
                        value: item.item.id,
                        label: item.item.name,
                    })
                })
                
                infoRow.addComponents(infoMenu)

                let embeddedShopMessage = app.shopManager.printShopBig(shopID)
                i.reply({ embeds: [embeddedShopMessage],  components: [infoRow] })
            }
        });

    }
})