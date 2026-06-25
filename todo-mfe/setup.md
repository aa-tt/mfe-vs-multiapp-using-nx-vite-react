## Steps to Create the Project - Micro‑Frontend Setup with Nx + Vite + React
1. Create Nx Workspace
`npx create-nx-workspace@latest todo-mfe`
2. Add Module Federation Plugin
`npm install --save-dev @nx/react`
** Generate apps, use `:host` (against `:app` generator) which will make Nx configure Vite for micro-frontends natively. lso, using `--remotes` generate shell and its mfe sub-apps simultaneously. To add more mfe sub-app use `:remote` genertor `npx nx g @nx/react:remote logout --bundler=vite`:**
```shell
npx nx g @nx/react:host shell --bundler=vite --remotes=login,todo
```
optionally:
```shell
npx nx g @nx/react:remote todo --bundler=vite
npx nx g @nx/react:remote login --bundler=vite
```
**In modern versions of Nx, the old `@nx/react:host` generator is deprecated for Vite and strictly coupled to webpack or rspack. Nx has overhauled its Module Federation architecture. Instead of static `host/remote` generation, it uses a dynamic, runtime-first pattern called `Consumer` and `Provider`.The Correct Command to Generate a Vite Host Application is To create Vite shell app along with the login and todo remotes by switching out `:host` for `:consumer`, and using `--providerNames` instead of `--remotes`:**
```shell
npx nx g @nx/react:consumer shell --bundler=vite --providerNames=login,todo
```
3. Build

`npx nx run-many -t build projects=login,todo,shell`

4. Serve

**if only shell served `npx nx serve shell`, the mfe sub-apps will not load**:
`npx nx serve shell`

Sample output:
```
shell app
Provider "login" unavailable: Failed to fetch dynamically imported module: http://localhost:5101/remoteEntry.js

Provider "todo" unavailable: Failed to fetch dynamically imported module: http://localhost:5102/remoteEntry.js
```

**if login served now `npx nx serve login`**, Sample output:
```
shell
Hello from login
Provider "todo" unavailable: Failed to fetch dynamically imported module: http://localhost:5102/remoteEntry.js
```

5. Implement router based navigation to sub-apps:
`npm install react-router-dom`

## Comparison to multi-app monorepo:
| **Approach** | **Ports/Deployment** | **Integration** | **Best For** |
| --- | --- | --- | --- |
| **Multi‑app monorepo** | Each app runs on its own port | Linked via routes | Simple dev setup |
| **Micro‑frontend** | Host loads remotes dynamically | Module Federation | Independent deploys, team autonomy |

The micro‑frontend setup is different. Instead of just routing to other apps, the shell dynamically imports their bundles at runtime. This allows independent deployment while still composing them into one UI.
