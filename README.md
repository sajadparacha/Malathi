# Licorice Extract Website Clone

Static company website inspired by `licext.com`.

## Files

- `index.html` - page shell and asset includes.
- `site-config.js` - editable website configuration for titles, navigation, hero text, objectives, products, news, certificates, contact details, and footer text.
- `app.js` - renders the website from `site-config.js`.
- `styles.css` - responsive visual styling.

## Edit content

Update `site-config.js` to change page titles, menu items, section copy, product cards, certificate links, contact details, and footer text. No build step is required.

## Preview

Open `index.html` in a browser, or run a local static server:

```sh
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Publish on GitHub Pages

The repository includes `.github/workflows/pages.yml`, which deploys the static site to GitHub Pages whenever changes are pushed to `main`.

To activate publishing in GitHub:

1. Open the repository settings.
2. Go to **Pages**.
3. Set **Source** to **GitHub Actions**.
4. Merge changes to `main` or run the workflow manually from the **Actions** tab.

After the first successful deployment, the site will be available at:

```text
https://sajadparacha.github.io/Malathi/
```
