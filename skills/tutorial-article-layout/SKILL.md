---
name: tutorial-article-layout
description: Redesign a single tutorial or guide page into a clear tutorial article layout with hero, BLUF summary, tags, overview card, collapsible table of contents, step cards, preserved screenshots/code, and mobile-safe responsive behavior. Use when adapting one content page on any website without changing the whole site.
---

# Tutorial Article Layout
Transform one specified tutorial page into a structured, readable article layout. Apply changes only to the target page unless the user explicitly asks for global rollout.

## Core Layout
Use this structure:
1. Header
   - Preserve existing back navigation, category/list link, and official/external link.
   - Keep navigation compact on mobile.
2. Hero
   - Large title.
   - Short description.
   - Small badge for category/status.
   - BLUF summary card explaining the outcome directly.
   - 3-5 compact tags for key concepts.
3. Tutorial Overview
   - Estimated time.
   - Required materials.
   - Success signal.
   - Common blocker.
   - Security reminder.
4. Collapsible Contents
   - Show chapter count and operation/step count.
   - Link to each chapter anchor.
5. Step Body
   - Each chapter has a numbered circle and title.
   - Each operation is an individual card.
   - Preserve existing screenshots, code blocks, bullet lists, warnings, and tips.
   - Do not delete source content unless explicitly asked.

## Implementation Rules
- Prefer a dedicated component for the target page, for example `TargetArticleContentPage`.
- In the dynamic route, add only one conditional branch for the target id.
- Do not rewrite the global page renderer unless the user asks to apply this style globally.
- Reuse existing data source whenever possible.
- Preserve SEO/schema components unless the new branch would remove them; if unsure, keep the route-level schema outside the visual component.
- Avoid hardcoded content if existing page data already has title, description, steps, images, code, and tips.
- Keep the change surgical.

## Mobile Requirements
- No horizontal overflow at 360px width.
- Header may wrap but must remain usable.
- Hero badge should not squeeze the title on narrow screens; move it under or beside the title as space allows.
- Tags must wrap.
- Images must use responsive width and `object-contain`.
- Code blocks must scroll horizontally.
- Overview card must remain readable and not rely on multi-column layout on mobile.

## Validation
After implementation:
1. Open the target route locally.
2. Confirm HTTP 200.
3. Check desktop and mobile widths.
4. Verify no horizontal overflow.
5. Verify screenshots, code blocks, warnings, and links still render.
6. Provide a screenshot or concise summary of the result.
