import { EmbedBuilder } from "discord.js";
import axios from "axios";

const Log = ({ type, content }: {type: string, content: string}): void =>{
    switch(type){
        case "info":
            console.log(`[INFO] ${content}`);
            break;
        case "error":
            console.log(`[ERROR] ${content}`);
            break;
    }
}

interface EmbedType {
    title: string,
    content: string
};

const embedError = ({title, content}: EmbedType): EmbedBuilder =>{
    return new EmbedBuilder().setColor("#ff8989").setTitle(title).setDescription(content);
};

const embedSuccess = ({title, content}: EmbedType): EmbedBuilder =>{
    return new EmbedBuilder().setColor("#c4ff89").setTitle(title).setDescription(content);
};

const FreaSearchImageUrl = (query: string) => `https://freasearch.org/search?q=${encodeURIComponent(query)}&category_images=on&format=json`;

const FreaSearchImageUrlHtml = (query: string) => `https://freasearch.org/search?q=${encodeURIComponent(query)}&category_images=on`;

const FreaSearchRequest = async (query: string): Promise<any> =>{
    try{
        return await axios.get(FreaSearchImageUrl(query), {
            headers: {
                "User-Agent": "Mozilla/5.0 MeshiteroBot"
            }
        });
    }catch(e: any){
        if(e.message === "Request failed with status code 429"){
            return { success: false, type: 429, ms: e.message }
        }
        return { success: false, type: 1000, ms: e.message }
    }
}

const SendSuccessMessage = (data: any, query: string, time: number, cache: boolean, interaction: any) =>{
    const processtime = cache?`${time}ms (Cache used)`:`${time}ms (Cache not used)`
    interaction.editReply({
        embeds: [
            new EmbedBuilder().setTitle(`「${query}」を投下`).setDescription(`${processtime}\n[すべての検索結果](${FreaSearchImageUrlHtml(query)})`).setImage(data.results[Math.floor(Math.random() * data.results.length)].thumbnail_src),
            new EmbedBuilder().setImage(data.results[Math.floor(Math.random() * data.results.length)].thumbnail_src).setFooter({ text: "Powered by FreaSearch", iconURL: "https://freasearch.org/favicon.ico" })
        ]
    }).catch((e: any) =>{
        Log({
            type: "error",
            content: e.message
        });
    });
}

const Base64Encode = (string: string): string =>{
    return Buffer.from(string).toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "")
}

export { embedError, embedSuccess, Log, FreaSearchImageUrlHtml, FreaSearchRequest, Base64Encode, SendSuccessMessage };
