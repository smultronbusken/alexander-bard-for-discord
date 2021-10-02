import { Item } from "../item";

export default new Item({
  id: "läskeblask",
  name: "läskeblask",
  description: "item",
  onSale: false,
  price: 1,
  info: "en nedkyld läskeblask tackar man aldrig nej till",
  use(msg, ownerID, args, client) {
    msg.channel.send(`Din törst är släckt.`);
    client.inventory.removeItem(this.id, ownerID);
  },
  image:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.4ChlAcjkBzmec-CshGbk1AHaEK%26pid%3DApi&f=1",
});
