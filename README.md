<p>
  <a href="https://www.tinybird.co/join-our-slack-community"><img alt="Slack Status" src="https://img.shields.io/badge/slack-chat-1FCC83?style=flat&logo=slack"></a>
</p>

# Tinybird Log Analytics Starter Kit + Godot Engine

This is a fork of the [Tinybird Log Analytics Starter Kit](https://github.com/tinybirdco/log-analytics-starter-kit) to show how the kit can be customised to work with any kind of project.

In this case, a game built with the [Godot game engine](https://godotengine.org/).

## Godot

This demo was built on Godot 4 RC 1.

The game in this project is simply an implementation of the [Godot 2D Game tutorial](https://docs.godotengine.org/en/latest/getting_started/first_2d_game/index.html#prerequisites) for [Dodge The Creeps](https://github.com/godotengine/godot-demo-projects/tree/master/2d/dodge_the_creeps). Credit to the original authors of the tutorial for all game code & assets.

## How to use

### Tinybird project

Use the [Tinybird CLI](https://www.tinybird.co/docs/quick-start-cli.html) to push the data project resources to Tinybird. From the Tinybird UI, copy the `app` Auth Token.


### Godot game
To run the game, you need to download the Godot Game Engine. Find the right build for your system [here](https://downloads.tuxfamily.org/godotengine/4.0/rc1/).

Launch Godot, and click Import button. Locate the `./log-analytics-godot-engine/godot/godot.project` and import it.

Open the project and, in the editor, find the `config.ini` file. Add your Tinybird `app` token to the `tinybird_token=""` line, between the quotes.

Run the game and try to dodge the creeps! The logs will be set to Tinybird while you play.

### Dashboard

Run `npm i` inside the `./dashboard` directory. 

Then run the dashboard with `npm run dev`. 

Open the URL in your browser (by default it's [http://localhost:3000](http://localhost:3000)). 

Paste the Tinybird `app` token into the prompt in the browser.

