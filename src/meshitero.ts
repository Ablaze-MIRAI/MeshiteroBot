import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import { FreaSearchRequest, Log, embedError, Base64Encode, SendSuccessMessage } from "./utils";

export default async (interaction: any): Promise<void> =>{
    const nowTime = new Date().getTime();
    await interaction.deferReply().catch((e: Error) => Log({ type: "error", content: e.message }));
    const Query = interaction.options.getString("query");

    // Cache
    const encoded = Base64Encode(Query);
    if(existsSync(`./cache/${encoded}.json`)){
        const cached = JSON.parse(readFileSync(`./cache/${encoded}.json`, { encoding: "utf-8", flag: "r" }));
        if(cached.limit > nowTime){
            const processed_time = (new Date().getTime()) - nowTime;
            SendSuccessMessage(cached, Query, processed_time, true, interaction);
            Log({
                type: "info",
                content: "Use cache"
            });
            return;
        }
        unlinkSync(`./cache/${encoded}.json`);
        Log({
            type: "info",
            content: "Removed cache"
        });
    }

    const resp = await FreaSearchRequest(Query);
    if(resp.success !== undefined){
        Log({
            type: "error",
            content: resp.ms
        });

        if(resp.type === 429){
            return interaction.editReply({
                embeds: [
                    embedError({
                        title: "レート制限エラー",
                        content: "レート制限により取得に失敗"
                    })
                ]
            }).catch((e: any) =>{
                Log({
                    type: "error",
                    content: e.message
                });
            });
        }

        return interaction.editReply({
            embeds: [
                embedError({
                    title: "エラー",
                    content: "データの取得に失敗"
                })
            ]
        }).catch((e: any) =>{
            Log({
                type: "error",
                content: e.message
            });
        });
    }

    // Send
    const processed_time = (new Date().getTime()) - nowTime;
    SendSuccessMessage(resp.data, Query, processed_time, false, interaction);

    // New Cache
    if(!existsSync("./cache")) mkdirSync("./cache");
    resp.data.limit = nowTime+(1000*60*60*24);
    writeFileSync(`./cache/${Base64Encode(Query)}.json`, JSON.stringify(resp.data));
    Log({
        type: "info",
        content: `"${Query}" cached`
    });
}
