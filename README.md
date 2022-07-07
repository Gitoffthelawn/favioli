# Favioli 🤯

<p>
<a href="https://chrome.google.com/webstore/detail/favioli/pnoookpoipfmadlpkijnboajfklplgbe">
  <img alt="Download for Chrome" src="https://img.shields.io/badge/download_for-chrome-blue.svg" />
</a>
<a href="https://addons.mozilla.org/en-US/firefox/addon/favioli/">
  <img alt="Download for Firefox" src="https://img.shields.io/badge/download_for-firefox-orange.svg" />
</a>
</p>

Favioli is a tool for overriding Favicons for websites.

## Quick Setup (For Building Release)

Release 2.0.1 was build with:

- macOS 12.3.1
- [Deno](https://deno.land/) 1.23.2
- Bext v0.1.2

Directions for Shell on OSX
(PowerShell on Windows is same, except for Deno installation step)

```sh
# install Deno @ v1.23.2
curl -fsSL https://deno.land/install.sh | sh -s v1.23.2

# Install bext packager @ v0.1.2
deno install --name=bext -A https://deno.land/x/bext@v0.1.2/main.ts

# Change directory to this repo
cd favioli

bext # run bext packager

# Unpacked extension output should be available in `dist/{browser}`
open dist/firefox

# You should be able to load your unpacked extension using a browser.
```

## Development Setup

[Deno](https://deno.land/) is a javascript/typescript runtime (think spiritual successor to node.js)

[bext](https://github.com/bpevs/bext) is a set of browser extension build tools, types, and utilities for deno. It was created for Favioli.

To load Favioli into a browser, point to each browser's respective dist directory.
[Google](https://developer.chrome.com/extensions) and
[Mozilla](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons) each have
resources about developing for their respective platforms.

If you want to install latest bext with more limited permissions:

```sh
deno install --name=bext --allow-read --allow-write --allow-run --allow-env -f https://deno.land/x/bext/main.ts
```

| Commands                | What they Do                        |
| ----------------------- | ----------------------------------- |
| `bext`                  | bundles extension and watch code    |
| `bext chrome`           | bundles extension only for chrome   |
| `bext firefox`          | bundles extension only for firefox  |
| `deno task test:all`    | run code formatter, then unit tests |
| `deno task test:update` | run code formatter, then unit tests |

## Inspiration

- [Emoji-Favicon-Toolkit](https://github.com/eligrey/emoji-favicon-toolkit) by
  [OFTN Inc.](https://oftn.org) and [Eli Grey](https://eligrey.com)
- [eft-input-modified-indicator.js](https://gist.github.com/eligrey/4df9453c3bc20acd38728ccba7bb7160)
  by [Eli Grey](https://eligrey.com)
