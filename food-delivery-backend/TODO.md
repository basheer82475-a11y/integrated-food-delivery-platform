# TODO - Convert backend from CommonJS to ES Modules

- [x] Inspect repo structure and identify CommonJS entry points and modules
- [ ] Update `food-delivery-backend/package.json` to set `"type": "module"`
- [ ] Convert `src/server.js` to ESM (import syntax)
- [ ] Convert `src/app.js` to ESM and switch exports to `export default`
- [ ] Convert `src/routes/index.js` to ESM and remove duplicate `/auth` route wiring
- [ ] Convert shared middleware/utils (`src/middleware/error.middleware.js`, `src/utils/*`)
- [ ] Convert all auth module files under `src/modules/auth/**` to ESM with `.js` extensions in relative imports
- [ ] Ensure all exports/imports match (default vs named)
- [ ] Run backend (`npm run dev` / `npm start`) and fix any remaining ESM runtime/import errors

