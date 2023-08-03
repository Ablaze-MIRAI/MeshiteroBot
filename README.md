# MeshiteroBot

#  ⚠ FreaSearchの開発終了に伴い、開発を終了しました。

Discordに飯テロ画像を投下できるDiscordボットです。

## Use

<a href="https://aka.ablaze.one/meshiterobot" target="_blank" rel="noopener noreferrer"><img src="https://user-images.githubusercontent.com/67790884/186777559-8f6a771c-5725-4723-976e-3fe0911c48a7.png" width="200px"></a>

## Run

1. APIトークンを設定

```yml
app:
  build: .
    environment:
      # Discord API Token
      - DISCORD_TOKEN=<トークンを設定>
```

2. コンテナーを起動

```
docker compose up -d
```
