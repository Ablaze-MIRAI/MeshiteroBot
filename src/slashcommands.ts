import { ApplicationCommandDataResolvable, ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";

const commands: ApplicationCommandDataResolvable[] = [
    {
        name: "help",
        description: "このBotの使い方を見れます",
        type: 1 // ApplicationCommandType.ChatInput
    },
    {
        name: "meshitero",
        description: "飯テロ爆弾を投下します",
        type: 1, // ApplicationCommandType.ChatInput
        options: [
            {
                name: "query",
                description: "飯テロしたいものを入力",
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    }
]

export default commands;