# MeshiteroBot

Discordに飯テロ画像を投下できるDiscordボットです。

# Use

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