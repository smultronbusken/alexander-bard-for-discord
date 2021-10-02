import { SlashCommand } from "base-app-for-discordjs/src/Jobs";
import { BardApp } from "../../main";

export default new SlashCommand<BardApp>({
    name: "sing",
    info: "Be Alexander sjunga en sång",
    execute(interaction, app) {
        
        let subscription = app.voice.getSubscription(interaction.guildId)
        if (!subscription) {
            const guild = app.skeleton.client.guilds.cache.get(interaction.guildId)
            const member = guild.members.cache.get(interaction.member.user.id);
            const voiceChannel = member.voice.channel;
            if (voiceChannel) {
                app.voice.playInGuild("./media/crucified.mp3", interaction.guildId, voiceChannel)
                interaction.reply("ok jag är lite nervös men nu kör vi")
                return
            } 
        }
        interaction.reply("gå in i en röst  kanal hur ska du annars höra dum eller")
    }
})