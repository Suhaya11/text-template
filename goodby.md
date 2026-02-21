# Goodbye Routine - Workflow Instructions

To efficiently close your session, commit your changes, and summarize the progress, follow these instructions:

## 1. Automated Git Cleanup
Run the following command in your terminal to stage, commit, and push your progress:

```bash
git add . && git commit -m "feat: updated layout, login/signup UI, and installed zod" && git push origin main
```

## 2. Session Summary for AI Memory
Tell me the following when you are ready to stop:
> **"Run the goodbye routine. Summarize this session and save it to your memory."**

### I will then perform these steps:
1.  **Summarize Actions:** Refactored `TemplateCard`, built `(auth)` pages, refined `(dashboard)` layout, and installed `zod`.
2.  **Save to Global Memory:** I'll use `save_memory` to store high-level facts (e.g., your preference for the dark/green theme and the new project structure) across all workspaces.

---
*Created on 2026-02-20*
