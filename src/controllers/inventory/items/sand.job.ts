import { Item } from "../item";

export default new Item({
  id: "sand",
  name: "sand",
  description: "item",
  onSale: false,
  price: 1,
  info: "sand från stranden",
  use(msg, ownerID, args, client) {
    client.util
      .randomUser(client)
      .then((user) => {
        msg.channel
          .send(`Du slänger sanden i **${user.username}**'s ögon. Du skrattar.\n
Medan **${user.username}** ligger och gråter på marken tar du 10 <:bardbuck:833349173981478942> från hen.`);

        client.ledger.addFunds(10, ownerID);
        client.ledger.subtractFunds(10, user.id);
        client.inventory.removeItem(this.id, ownerID);
      })
      .catch(console.log);
  },
  image:
    "https://media.istockphoto.com/photos/broken-chair-picture-id1066585154?k=6&m=1066585154&s=612x612&w=0&h=N7I0VQN6rwlMbBTbdZM25hM7VnX66HB7S48bWKDlhYc=",
});
