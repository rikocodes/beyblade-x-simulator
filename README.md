# Beyblade X — Physics Simulator

This repository contains a static simulator page (beyblade_simulator.html) and a small updater script (scripts/fetch_parts.js) that fetches parts data.

Publishing
- This project includes a GitHub Actions workflow (.github/workflows/deploy.yml) to publish the repository to GitHub Pages on push to main.
- To publish:
  1. Push this repository to GitHub (main branch).
  2. Optionally update CNAME with your custom domain.
  3. Actions will build and deploy the repository root to GitHub Pages.

Notes
- The updater script requires Node.js and these packages: cheerio, node-fetch.
- For dynamic scraping on GitHub Actions, consider adding a scheduled job in the workflow and ensure scraping respects site terms and robots.txt.
