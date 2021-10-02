import { joinVoiceChannel } from "@discordjs/voice";
import { Snowflake } from "discord-api-types";
import { Collection, VoiceChannel, StageChannel, Client } from "discord.js";
import VoiceSubscription from "./VoiceSubscription";

export class Voice {
    public subscriptions: Collection<Snowflake, VoiceSubscription> = new Collection();
    
    constructor(public client: Client) {
        
    }

    getSubscription(guildId: Snowflake) {
        return this.subscriptions.get(guildId)
    }
    
    createSubscription(guildId: Snowflake, voiceChannel: VoiceChannel | StageChannel) {
        if (!voiceChannel) return undefined
        const permissions = voiceChannel.permissionsFor(this.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            console.log("No permission for guild " + guildId)
            return undefined
        }
        let voiceConnection =  joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });
        let subscription = new VoiceSubscription(voiceConnection)
        this.subscriptions.set(guildId, subscription)
        return subscription;
    }

    async playInGuild(filePath: string, guildId: Snowflake, voiceChannel?: VoiceChannel | StageChannel) {
        let subscription: VoiceSubscription = this.subscriptions.get(guildId)
        if (!subscription) {
            subscription = this.createSubscription(guildId, voiceChannel)
        }
        subscription.playFile(filePath)
    }

}