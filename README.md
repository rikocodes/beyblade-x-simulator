# Beyblade X - Physics Simulator

A browser-based Beyblade X simulator that estimates how a build behaves using simplified physics models for inertia, tip friction, aerodynamic drag, center of mass, and launch RPM.

## Live Demo

Play it here:

[https://rikocodes.github.io/beyblade-x-simulator/](https://rikocodes.github.io/beyblade-x-simulator/)

## Screenshot

Add your webpage screenshot here once you export it.

Example:

```md
![Beyblade X Simulator Screenshot](./docs/simulator-screenshot.png)
```

## What The Simulator Does

- Lets you tune blade, ratchet, and bit-related values.
- Simulates spin decay over time.
- Estimates attack, defense, stamina, balance, and burst-style ratings.
- Generates charts for RPM decay, energy loss, and impact force.
- Suggests build tips based on the simulated result.

## Physics Inputs

The simulator uses configurable values such as:

- Blade mass and diameter
- Ratchet mass and diameter
- Bit height and tip radius
- Launch RPM
- Air resistance
- Estimated center of mass and rotational inertia

## How To Use

1. Open the live site.
2. Pick a preset or enter your own build values.
3. Click `Run Simulation`.
4. Review the ratings, charts, and build tips.
5. Compare different setups to see how small part changes affect stamina, attack, and stability.

## Local Development

This project is a static site, so it should be served from a local web server rather than opened directly with `file://`.

Example with Python:

```bash
python -m http.server 8000
```

Then open:

`http://localhost:8000/beyblade_simulator.html`

## Parts Data

The repo includes a small updater script that can refresh `data/parts.json` from external sources:

```bash
npm install
npm run fetch-parts
```

## Deployment

The site is deployed with GitHub Pages through GitHub Actions. The workflow builds a static `dist/` output and publishes it automatically on pushes to `main`.
