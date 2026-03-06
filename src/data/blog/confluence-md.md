---
title: "Confluence to Markdown Exporter"
pubDatetime: 2026-03-06T00:00:00Z
description: "A short note on why I built a CLI to convert Confluence pages into Markdown."
tags:
  - tools
  - writing
draft: false
---

I built [`confluence-md`](https://github.com/erycwang/confluence-md), a small CLI that pulls a Confluence Cloud page and converts it into Markdown, with local image downloads when needed.

As I work more with Claude Code and Codex, I wanted an easy way to reference highly curated, hand-written Confluence pages for context management. Most of our intenral writing stays in Confluence as a way of maintaining the source of truth, but Confluence doesn't offer an "Export to MD" option. Their MCP often fails and at the time I built this, doesn't preserve images. Also, while it seems that MCPs are coming back into fashion these days, the atlassian MCP often took 1-3 minutes to run – while this CLI takes less than a second. 

As part of the building process, I asked Claude to teach me about what it was doing and this solidified very quickly for me a mental model for thinking about CLI tools. It was fun to do some scripting again – even though Claude was the one scripting it. 

I also asked the robot many questions about security – how to ensure that we only pass keys to validated URLs, etc. I don't expect anyone to actually use this, but let me know if it fits in your workflow!

Google docs >>> Confluence.
