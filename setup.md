npx nx g @nx/react:app shell --bundler=vite
npx nx g @nx/react:app todo --bundler=vite
npx nx g @nx/react:app login --bundler=vite
npx nx g @nx/react:lib ui


npx nx run-many -t build --projects=ui,login,todo
npx nx run-many -t build --projects=shell
npx nx run-many -t serve --projects=shell,login,todo


Comparison to MFE:
| **Approach** | **Ports/Deployment** | **Integration** | **Best For** |
| --- | --- | --- | --- |
| **Multi‑app monorepo** | Each app runs on its own port | Linked via routes | Simple dev setup |
| **Micro‑frontend** | Host loads remotes dynamically | Module Federation | Independent deploys, team autonomy |

The micro‑frontend setup is different. Instead of just routing to other apps, the shell dynamically imports their bundles at runtime. This allows independent deployment while still composing them into one UI.