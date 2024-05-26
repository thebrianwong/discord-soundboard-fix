# Discord Soundboard Fix

## The Background

Discord has a soundboard feature that is only offered in servers, meaning that users who wish to play silly sounds for their friends in private Discord calls (like me) are out out luck. Luckily, there are many 3rd-party soundboard applications that can be used for free, and, if so desired, users can use streaming hardware like the [Elgato Stream Deck](https://www.elgato.com/us/en/p/stream-deck-mk2-black) (also me) to facilitate soundboard needs.

However, after testing out the Stream Deck, I soon discovered another problem: Discord can't use 2 audio input devices at the same time. It is not possible for me to direct both my microphone audio and my Stream Deck soundboard audio to Discord. After some research, I stumbled on [Voicemod](https://www.voicemod.net/) a dedicated soundboard application. The intention was not to replace my Stream Deck with Voicemod since Voicemod had limited soundbite slots in its free tier, but to make use of the virtualized microphone that Voicemod generates as part of its installation. With this virtual mic, I was able to direct my hardware microphone audio and my Stream Deck soundbites to the Voicemod mic, which was then directed to Discord. I then used the Stream Deck's Multi Action feature to play soundbites directed to my audio output for me to hear and to my audio output via the Voicemod mic for my friends to hear. This seemingly to be the end of my soundboard configuration journey. However, there was yet another issue.

## The Problem

When directed to Discord, Voicemod's audio is filtered through Discord's background noise settings. As a result, some of my soundbites would sound like jumbled messes on the other end. Voicemod recognizes his problem and recommends to turn this Discord setting off. This workaround is not feasible in my case due to my use of a mechanical keyboard. The sound of all my key presses is not a worthwhile trade off for playing funny noises.

The manual solution for this would be to turn off the noise setting, play the soundbite, then turn the setting back on every time I want to use the soundboard. As you can imagine, that is way too much work.

## The Considerations

Is there some way to automate turning off, waiting, then turning on the Discord setting? The answer is definitely yes, but which option would be the best for this scenario? The main requirements to note are:

1. The script has to be fast. There shouldn't be a long wait or delay as that could interfere with comedic timing of soundbites.
2. The script has to be non-intrusive. It shouldn't interrupt me when I'm playing a game or doing anything else.
3. The script has to compatible with the Stream Deck/Voicemod setup.

Another thing to note is that I mainly use Discord as a desktop application on my Windows computer. As such, I wanted find some sort of automation solution that would allow me to continue to do so. However, I was also ok with switching to the web app if it meant being able to solve this problem.

## The Solution

My first thought was to use some sort of Python library as this seems like the sort of problem that fits a Python script use case. I thought [PyAutoGUI](https://pyautogui.readthedocs.io/en/latest/index.html#) would be a good fit and started tinkering around. However, after looking into it more, I realized that this would not be the right tool for the job. A PyAutoGUI solution would require the script to scan my monitor to automate actions. The process of scanning was far too slow for this use case. This also entails requiring my Discord to be on screen at all times, unable to be minimized. Compounded by the limitation that it only works with the main screen of a multi-screen setup, PyAutoGUI was no longer a viable tool.

Another consideration was to drop any automation tools and go straight to the source by using the [Discord API](https://discord.com/developers/docs/reference). Examining the network activity using dev tools of Discord in a browser, you can see that API calls are made when you change the noise filtering settings. If there was a way to make the same HTTP requests to the API via cURL to disable and enable noise filtering, that would make things a lot faster and simpler. That sounds too good to be true because it is. At least from what I could gather, the Discord API doesn't reject the call but doesn't actually do anything with it to change settings. It seems that in the future, there might be [some possibility](https://discord.com/developers/docs/topics/rpc#setvoicesettings) of something worth looking at.

This takes us back to finding automation libraries that fit our use case. The main tools are Selenium, Playwright, and Puppeteer. Each one is able to make use of the browser API to automate tasks by finding desired HTML elements. Since one of the requirements of this solution is speed, I looked up some [benchmarking results](https://www.checklyhq.com/blog/puppeteer-vs-selenium-vs-playwright-speed-comparison/). The results showed that when it comes to speed, it is really a battle between Puppeteer and Playwright, so Selenium gets tossed out. I ended up deciding on Puppeteer because it had the slight edge over Playwright on speed, and I just so happened to look at the Puppeteer docs first.

Initially, I wanted my script to navigate to the voice settings and change them all in one. However, I tested the execution speed and found that the navigation segment took too much time. With it, the script took about 700ms to turn off the setting, and without it, about 100ms. Since speed was vital, I decided to split my script into two. The navigation script would run just once, and the toggle script would run whenever I played something on the soundboard.

The Stream Deck is capable of executing programs, but simply supplying it with the path where the JavaScript files exist would do no good. For the Stream Deck to execute my scripts, I created command files that would change directories to the aforementioned path then run the `node` command with the name of the files (and a duration argument for the toggle script). In the Stream Deck's Multi Actions keys, I added an additional action that would execute the command file for the toggle script, resulting in the toggling of the noise filtering setting for the duration of the soundbite. For the navigation script, I added a separate Stream Deck key.
