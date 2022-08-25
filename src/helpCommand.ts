import { Client, EmbedBuilder } from "discord.js"
import env from "./env"
import { Log } from "./utils"

export default async (interaction: any, client: Client): Promise<void> =>{
    interaction.reply({ embeds: [
        new EmbedBuilder()
        .setFooter({ text: "Powered by FreaSearch", iconURL: "https://freasearch.org/favicon.ico" })
        .setTitle("飯テロBOT HELP")
        .setDescription("飯テロ爆弾を投下します\nデータの取得は[FreaSearch](https://freasearch.org/)を利用しています。ありがとうございます")
        .addFields([
            { name: "使い方", value: "`/meshitero <query: 検索ワード>`" },
            { name: "INFO", value: `\`\`\`Servers: ${client.guilds.cache.size}\nPing: ${client.ws.ping}ms\nVersion: v${env.VERSION}\`\`\`` },
            { name: "Links", value: `[Github](${env.REPO_URL})\n[FreaSearch](https://freasearch.org/)` }
        ])
    ] }).catch((e: Error) =>{
        return Log({
            type: "error",
            content: e.message
        });
    })
};
