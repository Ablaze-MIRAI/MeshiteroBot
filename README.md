# MeshiteroBot

Discordに飯テロ画像を投下できるDiscordボットです。

![https://ablaze.one](https://user-images.githubusercontent.com/67790884/186777559-8f6a771c-5725-4723-976e-3fe0911c48a7.png)

## Use

1. APIトークンを設定

```yml
app:
  build: .
    environment:
      # Discord API Token
      - DISCORD_TOKEN=<トークンを設定>
```

2. コンテナを起動

```
docker compose up -d
```
