import { SlashCommand } from "base-app-for-discordjs/src/Jobs";
import { BardApp } from "../../main";

export default new SlashCommand<BardApp>({
    name: "pray",
    info: "be till bard",
    execute(interaction, app) {
        app.ledger.addFunds(10, interaction.user.id)
        
        const guild = app.skeleton.client.guilds.cache.get(interaction.guildId)
        const member = guild.members.cache.get(interaction.member.user.id);
        const voiceChannel = member.voice.channel;
        if (voiceChannel) {
            app.voice.playInGuild("./media/pray.mp3", interaction.guildId, voiceChannel)
        }
        
        let funds = app.ledger.funds(interaction.user.id)
        interaction.reply({   
            content: `Jag hör dig mitt barn. Du får 10 <:bardbuck:833349173981478942> (totalt ${funds})`,
            files: [
              {
                attachment: "./media/happybard.png",
                name: "bard.jpg",
              },
            ],
        })
    }
})