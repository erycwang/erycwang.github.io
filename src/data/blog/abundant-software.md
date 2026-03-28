---
title: "Custom Linux setups with AI and the future of abundant software"
pubDatetime: 2026-03-27
draft: false
---

---
Tl;dr - What I learned
- Validation is critical to the agentic loop, and there are some frontiers that aren't easy to validate
- Project memory is important but imperfect; a combination of markdown files and git can work as a simple, declaritive memory system. However, it then beccomes important to keep your memory up-to-date - memory rot can cause hallucinations
- Building your own desktop is a peek at a future of abundant software, but it's clear that there's still a tax and gap for product and design.
---

# I use Arch, btw

Every few years, I take an old, underperforming computer and put linux on it in an attempt to make it faster. I started doing this in high school with Ubuntu, which was an out-of-the-box dualboot on a Windows machine. In college, I rolled Arch Linux on an old Lenovo, and ran into the classic Arch problems: sound didn't work, and it would crash on hibernate. But it gave me a real love for some of the more interesting things in the linux ecosystem - interacting with the computer through the command line, tiling window managers, and building some truly personal computing.

Last weekend, I decided that my old Intel MacBook was feeling a little sluggish and decided to roll [CachyOS](https://wiki.cachyos.org/) because it has hardware support for MacBooks. I also wanted to set up a sandbox for Claude Computer Use or OpenClaw.

# Why you should run Linux with AI in 2026

![The end result of my custom Linux setup](/assets/blog/linux-blog/systemctl-logs-wifi.png)

The pace of change in the technology industry is staggering, and there's only one way to get a real sense of it: by building your own software with AI. Building your own Linux desktop environment is particularly interesting because:

- Linux experiences vary with hardware, meaning compatibility issues can often be niche. This, combined with the small user-base and likely lack of training data around configurations means that it's easy for the LLM to build customization, but much harder for it to one-shot it
- A lot of issues with Linux comes down to how software and hardware interact. Agents don't yet have a way to easily interact with hardware (e.g., pressing the power button), so it forces the user to really feel the agentic loop
- Many Linux utilities are designed to be highly configurable, either with common configuration languages such as lua or their own custom language. Previously, customizing your Linux desktop involved reading through lots of documentation and writing configuration files or scripts by hand; agentic coding significantly decreases the barrier to create something custom
- It's a great introduction to open source software - it's free, and you get a highly personalized desktop out of it!
- Building your own Desktop is a devops loop in itself; designing, building, debugging, and iterating on your feautres may give us some pointers on the future of abundant software when the cost of code is effectively zero


# Embedding in the Agent Loop: learnings for a basic agent harness

Installing CachyOS on my MacBook was pretty easy; following the instructions on the wiki gave me basic utilities out of the box. I then set up a project to start configuring. I had chosen to install hyprland as my desktop environment because it is highly configurable and designed around primitives of window management. I knew I would want to build a number of custom configurations, so I set up a [github repo](https://github.com/erycwang/linux-config) for version control. I knew that configuration could get pretty fragmented along a variety of different configs (e.g., service files for systemd, lua for neovim, etc.) so I wanted to make sure I was giving Claude enough context on my system so it could effectively help me keep track of all the changes it was making.


## Building my own memory system - a basic agent harness

First, I prompted Claude to look through my system and collect information about the system. It already knew I had installed CachyOS because I had resumed prior Claude Code session from MacOS. From there, it was only a matter of a few bash commands to explore what was installed along some standard categories of software (compositor, desktop environment, drivers, etc.)

![Initial Setup.md](/home/ericw/Projects/erycwang.github.io/public/assets/blog/linux-blog/initial-setup-md.png)

Then, I had it start a changelog for a more descriptive set of the changes that it was making. This is a little bit redundant to git and commit messages, but I haven't figured out a good way to incorporate that data into the context yet, so I figured I'd start with a markdown file. After each change I made, I asked Claude to commit, push

### Memory means that memory maintanence becomes a real problem


# Abundant Software and a take on the SaaSpocablypse
