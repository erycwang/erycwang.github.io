Create a new blog post template in `src/data/blog/`.

1. Ask the user for a topic if one wasn't provided as an argument: $ARGUMENTS
2. Generate a kebab-case filename from the topic
3. Create the file with this frontmatter:

```yaml
---
title: "<title>"
pubDatetime: <today's date>T00:00:00Z
description: "<one-sentence summary>"
tags:
  - <relevant tags>
draft: true
---
```

4. Add 3-4 section headings using `###` based on the topic
5. If a URL was provided, fetch it and use the content to inform the title, description, tags, and section headings
