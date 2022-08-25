import { EmbedBuilder } from "discord.js";
import { embedError, FreaSearchImageUrl, FreaSearchImageUrlHtml, Log } from "./utils";
import axios from "axios";

export default async (interaction: any): Promise<void> =>{
    await interaction.deferReply().catch((e: Error) => Log({ type: "error", content: e.message }));
    const Query = interaction.options.getString("query");
    const options = {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:100.0) Gecko/20100101 Firefox/100.0"
        }
    };
    await axios.get(FreaSearchImageUrl(Query), options)
    .then((response:any) =>{ 
        return interaction.editReply({
            embeds: [
                new EmbedBuilder().setTitle(`「${Query}」を投下`).setDescription(`[すべての検索結果](${FreaSearchImageUrlHtml(Query)})`).setImage(response.data.results[Math.floor(Math.random() * response.data.results.length)].thumbnail_src),
                new EmbedBuilder().setImage(response.data.results[Math.floor(Math.random() * response.data.results.length)].thumbnail_src).setFooter({ text: "Powered by FreaSearch", iconURL: "https://freasearch.org/favicon.ico" })
            ]
        });
    }).catch((e: Error) =>{
        Log({
            type: "error",
            content: e.message
        });
        if(e.message === "Request failed with status code 429"){
            return interaction.editReply({
                embeds: [
                    embedError({
                        title: "レート制限エラー",
                        content: "レート制限により取得に失敗"
                    })
                ]
            });
        }
        interaction.editReply({
            embeds: [
                embedError({
                    title: "エラー",
                    content: "データの取得に失敗"
                })
            ]
        })
    });
}
