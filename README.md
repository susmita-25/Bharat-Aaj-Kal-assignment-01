## Export Software Frontend

Built on top of [fe-zen-arch](git@github.com:shivamkj/fe-zen-arch.git) — the core shared architecture for B2B SaaS frontends.

### Libraries

- **React** [Docs](https://react.dev/reference/react)
- **Tailwind CSS** [Docs](https://tailwindcss.com/docs/installation)
- **React Query** [Docs](https://tanstack.com/query/latest/docs/framework/react/overview)
- **React Hook Form** [Docs](https://www.react-hook-form.com/get-started)
- **Zustand** [Docs](https://zustand.docs.pmnd.rs/)

### Setup

```bash
pnpm install   # fe-zen-arch is included as a git submodule, init it first if missing
pnpm dev       # dev server on port 5173
pnpm lint      # prettier + tsc + eslint (fe-zen-arch lint pipeline)
pnpm build     # production build
```

### Notes

- `core`, `ui`, `auth`, `icons` are fe-zen-arch workspace packages, aliased via tsconfig paths & vite aliases.
- Forms are built directly with `useForm` from `core/form` + `Form` / `SubmitButton` from `core/form/components` — no generic form templates.
- Routing uses fe-zen-arch's zustand router: routes defined in `src/shared/routes.tsx`, paths in `src/shared/route-paths.ts`.
- Auth uses the fe-zen-arch auth module (routes, interceptors, login pages) out of the box.
- API base URL comes from `PUBLIC_API_URL` (`.env`).
- Don't use react-query mutation for react-hook-form submit handler.
- For HMR (hot refresh), the file must export only react component, and not any other constant or object.
- While most input elements use `...register('name')`, custom elements like select require `<Select<T> name="name" />` instead.


## Shipping Bill form: architecture and mock data

The Shipping Bill editor keeps its existing multi-section workflow and local demo data. The main boundaries are:

- **UI and form state** — `src/shipping-bills/shipping-bill-form.tsx` renders the form, controls tabs, and displays submit/loading/error feedback.
- **Domain model and payload mapping** — `model.ts` owns form types, defaults, totals, and domain-to-payload conversion.
- **Mock data access** — `demo-store.ts` manages the in-memory demo store and browser persistence; `party-mock-service.ts` provides Promise-based async searches for exporters, branches, consignees, and ports.
- **Form reference data** — `shipping-bill-options-service.ts` asynchronously loads the form's code lists and select options as one replaceable service boundary. The page shows loading, retry, and error states while this data is unavailable.
- **Marks and numbers options** — `marks-and-numbers-source.ts` exposes an async data-source function.
- **Submission boundary** — `shipping-bill-mock-service.ts` simulates network latency, validates required party and route relationships, and delegates persistence to the demo store. Replace this implementation with an API client when a backend becomes available.

No backend is required. The final Save action uses the Promise-based mock submission service, prevents duplicate submissions, and displays loading, success, and error feedback. Intermediate “Save & Next” actions continue to save the current draft locally.

## AI Usage & Approach

GitHub Copilot was used to inspect the existing form/service flow and assist with the async options-service refactor and documentation. The existing form model and multi-step workflow were preserved, and no dependencies were added. TypeScript diagnostics and the configured production bundle build pass.
