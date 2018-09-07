# About

Geisha is a bot for Discord created in node.js<br>
Make sure you have ffmpeg installed to run the bot<br>

# Instructions

Join the official channel to try commands at https://discord.gg/66XNvzm 

Clone the repo and follow the instructions in this order:

- `brew install ffmpeg` for video/audio library
- `npm install` for dependencies
- `npm start` to run the bot

Start typing in the discord channel!

# Functionalities

- `!info` : Gives you basic info on the developer
- `!geisha` : Returns a cool geisha gif from ghost in the shell

- `!play <youtubeURL>` : Plays a youtube video, remove the < and >
- `!skip` : Skips to next song in the channel's queue
- `!stop` : Kicks the bot and stops playing music overall

- `!twitch <user>` : Checks if a Twitch streamer is on, and provides info for said user.

# Libraries

- `ffmpeg`
- `ytdl-core`
- `axios`
    - polls twitch for stream info
