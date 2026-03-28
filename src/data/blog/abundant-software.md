---
title: "Custom Linux setups with AI and the future of abundant software"
pubDatetime: 2026-03-27T00:00:00Z
description: "What rolling my own Linux distro taught me about building software in the age of AI."
draft: false
---

---
Tl;dr learnings
- Building your own desktop is the definition of abundant software, but it also means that you need to maintain it. Throw hardware differences in the mix, and there are clear reasons why you would still want to buy something that works every time instead of building it
- Validation is critical to the agentic loop, and physical frontiers stil force humans in the loop
- Product and Design are as much a laggard in the agentic loop as validation is; deciding what to work on and when it's done needs to be modeled in agent orchestration
- Project memory is important but imperfect; a combination of markdown files and git can work as a simple, declarative memory system. However, it then becomes important to keep your memory up-to-date - memory rot can cause hallucinations
---

# I use Arch, btw

Every few years, I take an old, underperforming computer and put linux on it in an attempt to make it faster. I started doing this in high school with Ubuntu, which was an out-of-the-box dualboot on a Windows machine. In college, I rolled Arch Linux on an old Lenovo, and ran into the classic Arch problems: sound didn't work, and it would crash on hibernate. But it gave me a real love for some of the more interesting things in the linux ecosystem - interacting with the computer through the command line, tiling window managers, and building some truly personal computing.

Last weekend, I decided that my old Intel MacBook was feeling a little sluggish and decided to roll [CachyOS](https://wiki.cachyos.org/) because it has hardware support for MacBooks. I also wanted to set up a sandbox for Claude Computer Use or OpenClaw.

# Why you should run Linux with AI in 2026

![The end result of my custom Linux setup](/assets/blog/linux-blog/setup-screenshot.png)

The pace of change in the technology industry is staggering, and there's only one way to get a real sense of it: by building your own software with AI. Building your own Linux desktop environment is particularly interesting because:

- Linux experiences vary with hardware, meaning compatibility issues can often be niche. This, combined with the small user-base and likely lack of training data around configurations means that it's easy for the LLM to build customization, but much harder for it to one-shot it
- A lot of issues with Linux comes down to how software and hardware interact. Agents don't yet have a way to easily interact with hardware (e.g., pressing the power button), so it forces the user to really feel the agentic loop
- Many Linux utilities are designed to be highly configurable, either with common configuration languages such as lua or their own custom language. Previously, customizing your Linux desktop involved reading through lots of documentation and writing configuration files or scripts by hand; agentic coding significantly decreases the barrier to create something custom
- It's a great introduction to open source software - it's free, and you get a highly personalized desktop out of it!
- Building your own Desktop is a devops loop in itself; designing, building, debugging, and iterating on your features may give us some pointers on the future of abundant software when the cost of code is effectively zero


# Embedding in the Agent Loop: installing and troubleshooting the OS

Installing CachyOS on my MacBook was pretty easy; following the instructions on the wiki gave me basic utilities out of the box. I then set up a project to start configuring. I had chosen to install hyprland as my desktop environment because it is highly configurable and designed around primitives of window management. I knew I would want to build a number of custom configurations, so I set up a [github repo](https://github.com/erycwang/linux-config) for version control. I knew that configuration could get pretty fragmented along a variety of different configs (e.g., service files for systemd, lua for neovim, etc.) so I wanted to make sure I was giving Claude enough context on my system so it could effectively help me keep track of all the changes it was making.


## Building my own memory system - a basic agent harness

First, I prompted Claude to look through my system and collect information about the system. Claude ran a few bash commands to explore what was installed along some standard categories of software (compositor, desktop environment, drivers, etc.).

![Initial Setup.md](/assets/blog/linux-blog/initial-setup-md.png)

Then, I had it start a changelog for a more descriptive set of the changes that it was making. This is a little bit redundant to git and commit messages, but I haven't figured out a good way to incorporate that data into the context yet, so I figured I'd start with a markdown file. After each change I made, I asked Claude to update the changelog, commit, and push it to Github.

This became really important before I discovered that /resume let you resume Claude Code sessions, because one of the first challenges I faced was getting suspend to work.

### Suspend, and feeling the agent loop

As is customary with an Arch Linux installation, suspending was an issue for my MacBook. After I closed the lid, I would get a black screen with no way to access the keyboard. I could only hard reboot the laptop by holding down the power button.

Solving this issue with Claude was surprisingly hard. A quick web search showed that not many people faced this problem. However, by looking at the logs, it was able to identify that the the suspend was being hung due to async conflicts waiting for drivers:

![system logs post suspend](/assets/blog/linux-blog/post-suspend-brcm-logs.png)

It tried a few fixes, specifically adding a [service file](https://github.com/erycwang/linux-config/blob/master/suspend-fix-t2.service) to sequentially disconnect and reboot drivers during the suspend / recovery process. This was much closer, but it still took a few loops before the model was able to create and identify all the drivers it needed to control for. This part of the fix was *severely hampered* by the human-in-the-loop: I still had to suspend and reboot the computer if there was an issue, and direct Claude to look at it's logs. I really felt need for validation loops to ensure the model's output was correct. Pointing Claude to look at the logs was the unlock here, but the latency of searching and finding the commands after every session was relatively slow. It would often look for logs from this session, but need to look at logs from the prior boot due to the suspend issues.

I faced this problem again when customizing the appearance of my desktop with Claude: without a screenshot capability or tool, I was the one checking it's work and checking for edge cases. This of course is easily solved in Linux - most screenshot utilities can be done through the command line, making it easy to build a skill for Claude.

### Memory means that memory maintenance becomes a real problem

As I was making changes and updating my home-grown memory layer, I quickly started experiencing memory rot. The model would sometimes add information about different approaches that it attempted, which would often create red-herrings in the context. Half-way through my implementation, Claude.ai released the memory feature for it's chat app. I started experiencing it there too - when asking it to help me plan a trip, it would remember certain preferences I had in a prior prompt, which guided it's research and results away from the more generative research I wanted when starting a new session.

Memory can be helpful in the project context, but it means that we need to keep the memory clean and relevant at all times. Claude is trying to solve this with the /dream feature, released a few days before this writing. Can't wait to check it out!

It also means that there are some searches where I don't want memory. When doing broad research, I don't want Claude to be anchored on what I've said in the past. A better way to toggle Memory on and off is a design and product challenge.

# Do we really want abundant software? The gap is not just validating, but also design

After solving my suspend problem, I went on to build the rest of my desktop. I thought this was going to be the easy part - building features. I started with hyprland for it's ability to hook into a number of applications. For my statusbar and the rest of my desktop, I decided to build on top of quickshell, another extensible but minimal platform. I made these decisions because there was good documentation as well as a number of public github repos with configuration and script examples that Claude could build on top of. I started by reading documentation and building (by hand) my own simple [status bar](https://www.tonybtw.com/tutorial/quickshell/). After implementing this very simple tool, I asked Claude to rearchitect my [quickshell implementation](https://github.com/erycwang/linux-config/tree/master/quickshell), and it landed on:

- A set of frontend configurations categorized into widgets for displaying basic information
- A set of backend services (using system utilities and open source apis) to fetch information such as the weather or wifi connectivity

This part was largely easy on the implementation but often took a few iterations with Claude to get right. I ran into a number of edge cases:

- Errors from the weather API not being handled cleanly in my weather widget
- Font icons for weather forecasts being mismapped (cloudy icon for a sunny day)
- Color scheming inconsistencies across widgets
- Latency refreshing the widget data after a suspend (I still haven't fixed this yet!)
- Workspace indicator not capturing certain less-used hyprland use-cases
- A bug in my temperature monitor widget that spiked CPU usage to 90% and sent the fans whirring

Apart from the status bar, I also implemented a full notification system as well as popup indicators when changing my volume settings:

![these were a lot of features!](/assets/blog/linux-blog/all-features.png)

In total, I probably installed and wired up at least 10 features to get the computer in working shape. I point this out because there were a ton of decisions to be made at every step: which features were important, which were not, what implementation approach to use (there are many opensource packages to solve the same problem). I had to make a choice on what to prioritize and what to build, and when to stop. I learned quickly that building your own software means that you have to maintain all of it; a problem that becomes harder when your software can differ from the rest of the user base.

## A note on the SaaSpocalypse

From this experience, have a bit of a new view on the recent narrative around SaaS dying because AI agents can roll their own. If this were true, why did Anthropic buy Datadog? Or Ramp? I think it's because:

- *Edge cases are everywhere:* Even when building something as simple as a status bar, I ran into numerous edge-cases that took another LLM cycle to think through, with varying results.
- *Maintaining software is hard:* especially with non-standard hardware, it can be a pain to operate and maintain your software at scale. This is probably particularly true for developer products where high volume data is a given

Sometimes, you just want something to work every time. And sometimes you don't want to think about how your CRM should handle edge cases when updating an account, just like most people don't want to build their own weather widget. Even though Linux ricing is more accessible than ever, there are things that most consumers won't want to build twice - it would be easier to buy from Apple, who has their software and hardware unified so things "just work".
