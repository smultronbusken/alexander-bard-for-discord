import JobRegister, { Job } from "base-app-for-discordjs/src/Jobs";
import { Collection, MessageEmbed, TextChannel } from "discord.js";

export interface ShopInput {
    id: string,
    info: string,
    name: string,
    title: string,
    url: string,
    thumbnail: string,
    image: string,
    description: string,
    items: string[],
    musicName: string
}

@JobRegister.JobClass
export class Shop extends Job {
    shop: ShopInput
    constructor(shopInput: ShopInput) {
        super(shopInput);
        this.shop = shopInput
    }
}

export class ShopManager {
    public shops: Collection<string, Shop> = new Collection()

    printShopBig(shopID) : MessageEmbed{
        const shop = this.shops.get(shopID);
        let exampleEmbed = new MessageEmbed()
          .setColor("#0099ff")
          .setTitle(shop.shop.title)
          .setURL(shop.shop.url)
          .setThumbnail(shop.shop.thumbnail)
          .setImage(shop.shop.image)
          .setDescription(
            shop.shop.description +
              `\n Behöver du mer <:bardbuck:833349173981478942> så bör du be till med genom att skriva *pray* eller ansöka till Bards College genom att skriva *börja bardscollege*.`
          );
        return exampleEmbed

        
      
      
        /*Object.values(shop.shop.items).forEach((itemID) => {
          item = this.client.items.getItem(itemID);
          if (item.onSale) {
            exampleEmbed = new Discord.MessageEmbed()
              .setColor("#0099ff")
              .setTitle(
                item.name + `\n**${item.price}** <:bardbuck:833349173981478942>`
              )
              .addField(`ON SALE.\nSkriv *köp ${item.id}* `, item.info, true)
              .setImage(item.image);
            channel.send(exampleEmbed);
          }
        });
      
        exampleEmbed = new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setTitle("Resten av sortimentet:");
      
        Object.values(this.getShop(shopID).items).forEach((itemID) => {
          item = this.client.items.getItem(itemID);
          if (!item.onSale) {
            exampleEmbed.addField(
              `${item.name}\n**${item.price}** <:bardbuck:833349173981478942>`,
              `${item.info}.\nSkriv *köp ${item.id}*`,
              true
            );
          }
        });
        channel.send(exampleEmbed);*/
      }

}