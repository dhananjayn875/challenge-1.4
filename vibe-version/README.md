# Vibe Version

This folder contains the task manager app built using a vibe coding tool.

**Tool used:** Google AI Studio
**Time to generate:** ~15 minutes
**Prompt used:** Build a task manager app with React. It should let users add tasks, mark them complete, delete them, and filter by status. Keep it clean and minimal.
**Live URL:** https://dhananjayn875.github.io/vibe-version/

## Notes

AI Studio went way beyond what I asked for. It scaffolded a full Express backend with REST API routes, pulled in Tailwind, a motion animation library, and somehow included the Google GenAI SDK — none of which I explicitly asked for. The frontend looked good immediately. The problem was I didn't fully understand the architecture it chose until I read through it after. Getting it deployed to GitHub Pages also needed extra work because the original setup assumed a Node server, not a static host.
