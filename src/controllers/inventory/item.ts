import JobRegister, { Job } from "base-app-for-discordjs/src/Jobs";
import { Collection } from "discord.js";

export interface ItemInput {
    id: string,
    name: string,
    info: string,
    onSale: boolean,
    price: number,
    description: string,
    image: string,
    use?: any
}

@JobRegister.JobClass
export class Item extends Job {
    item: ItemInput
    constructor(itemInput: ItemInput) {
        super(itemInput);
        this.item = itemInput
    }
}


export class ItemManager {
    public items: Collection<string, Item> = new Collection()

}