# erycwang.github.io

Personal site built with Astro. Hosted on GitHub Pages.

## Blog Posts

Blog posts live in `src/data/blog/` as Markdown files.

**File naming:** kebab-case, no date prefix (e.g. `youtube-digest.md`).

**Frontmatter:**

```yaml
---
title: "Post Title"
pubDatetime: 2026-03-09T00:00:00Z
description: "One-sentence summary."
tags:
  - lowercase-tag
draft: false
---
```

- `title` — quoted string
- `pubDatetime` — ISO 8601 with `T00:00:00Z`
- `description` — short summary used as excerpt
- `tags` — lowercase, hyphen-separated array
- `draft` — set to `true` while writing, `false` to publish

**Style:** Short (under ~1000 words), conversational, first-person. Section headings use `###`. Images go in `/assets/blog/`.

## Adding a New Post

1. Create `src/data/blog/your-post-name.md`
2. Add the frontmatter above with `draft: true`
3. Write the post
4. Set `draft: false` when ready to publish
