import { EmbedBuilder } from "discord.js";
import fetch from "node-fetch";

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

export { embedError, embedSuccess, Log, FreaSearchImageUrl, FreaSearchImageUrlHtml };
