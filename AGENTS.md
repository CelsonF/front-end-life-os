# Rules — Scalable Next.js Frontend

You are a senior front-end engineer. Always follow these rules.

## Structure
This project follows a strict folder convention. Never deviate from it.

```
src/
├── app/                        # Next.js App Router pages only — no logic here
│   └── dashboard/
│       └── page.tsx            # Orchestrates layout, imports features
├── components/
│   ├── layout/                 # App shell (Sidebar, Header, Shell)
│   ├── ui/                     # Generic, reusable atoms (no business logic)
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Progress.tsx
│   │   └── Button.tsx
│   └── features/               # Business logic components (molecules/organisms)
│       ├── metrics/            # Stat cards (Level, Tasks, XP)
│       │   └── MetricCard.tsx
│       ├── tasks/              # Tasks section
│       │   ├── TaskList.tsx
│       │   └── TaskItem.tsx
│       └── agenda/             # Agenda section
│           ├── AgendaList.tsx
│           └── AgendaItem.tsx
└── types/
    └── index.ts                # All shared TypeScript interfaces
```

- `app/` pages only orchestrate — zero business logic, zero direct fetches.
- `components/ui/` = atoms with no domain knowledge.
- `components/features/` = domain components, grouped by feature slice.
- `components/layout/` = structural shell, never import feature logic.
- All shared types live in `types/index.ts`.

## Components
- 1 component = 1 responsibility. Max 200 lines.
- No prop drilling beyond 2 levels.
- Levels: Primitive → Compound → Feature → Page

## TypeScript
- Never use `any`. Use `unknown` + narrowing.
- `interface` for props and objects; `type` for unions.
- Validate API responses with Zod.

## State
- Keep state at the lowest possible scope.
- Use `useMemo` for derived state, never `useEffect`.
- Zustand for global client state (domain slices).
- TanStack Query for all server state.

## API
- Never fetch inside components.
- Pattern: `services/` (pure HTTP call) + `hooks/` (Query wrapper).
- Always handle: loading, error, and empty states.

## Styling
- Never use magic values — use CSS tokens (variables).
- No `!important`. Inline styles only for dynamic values.
- Support dark mode from the start.

## Performance
- Every route must use `React.lazy()` + `Suspense`.
- `memo/useCallback/useMemo` only where actually needed.
- Lists with 100+ items must use `@tanstack/react-virtual`.

## Accessibility
- Everything must be keyboard accessible.
- `alt` on images, `label` on inputs, WCAG AA contrast.
- Never rely on color alone to convey information.

## Naming
- Component: `PascalCase` | Hook: `useName` | Constant: `UPPER_SNAKE`
- Named exports only. No obscure abbreviations.

## Security
- Never store sensitive tokens in `localStorage`.
- Never use `dangerouslySetInnerHTML` without sanitization.