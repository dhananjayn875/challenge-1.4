## Live Deployments
- Vibe version: https://dhananjayn875.github.io/vibe-version/
- Pair version: https://dhananjayn875.github.io/pair-version/

## Comparison Table

| Dimension      | Vibe Version (Google AI Studio) | Pair Version (VS Code + GitHub Copilot) | Verdict |
|----------------|----------------------------------|------------------------------------------|---------|
| Speed          | AI Studio built a full project — Express backend, 4 REST routes, Tailwind, animations, TypeScript — before I even figured out what I was building. 6 commits total, most of them me just cleaning up what it generated. | Built it piece by piece with Copilot suggesting inline. Only 2 commits because I actually thought before pushing. Took longer but I knew what was happening at each step. | Vibe was faster. Not even close for the initial scaffold. |
| Control        | It added an Express server, `motion` for animations, and literally pulled in the Google GenAI SDK — none of which I asked for. I found `@google/genai` in the package.json and had no memory of requesting it. | Only `react` and `react-dom` in production dependencies. That's it. Because that's all I needed. Copilot suggested things, I said yes or no. | Pair gave more control. Vibe just... decided things for me. |
| Code Quality   | TypeScript throughout, proper client/server split, `server.ts` is clean at 75 lines. But it has 8 production deps for what is essentially a to-do app. Feels overengineered. | Plain JS, CSS in its own file, no type safety. Simpler stack means fewer things that can go wrong. But also no types, which I'd probably regret on a bigger project. | Honestly depends on what you value. Vibe is more structured. Pair is leaner. I'd give the edge to pair for a small project like this. |
| Explainability | There's a `motion` import doing animation stuff I didn't consciously design. The GenAI SDK is there for some reason. Had to actually read the code to understand what AI Studio was thinking, and I'm still not fully sure about the GenAI tsx file. | I wrote it or I accepted it. Either way I understood it before it went in. Can explain every function without re-reading it. | Pair wins. I can actually walk someone through the pair version without embarrassing myself. |
| Editability    | Removing the backend means touching `server.ts`, `vite.config.ts`, the scripts in `package.json`, and wherever the frontend is calling the API. Four files for what should be a simple change. | No backend means no layers to dig through. CSS is separate so styling changes don't touch logic. Adding something new means editing one file, maybe two. | Pair is easier to edit. The vibe version's architecture is fine until you want to change something you didn't choose in the first place. |

## When I Would Use Each Tool

**Google AI Studio (vibe coding) for:** Hackathons, demos, anything where you need something working fast and you're not going to maintain it. It got me from nothing to a deployed full-stack app faster than I could've done it manually. For something like Vibeathon the time matters.

**VS Code + GitHub Copilot (pair programming) for:** Anything I actually have to explain to someone — a portfolio project, an internship task, a code review. The pair version has no mystery dependencies, no surprise architecture decisions. It's mine in a way the vibe version isn't. Copilot helped but I was still the one making the calls.
