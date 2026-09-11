# Nick Zipagan Portfolio

Static site deployed on Vercel from this repo root. No build step — Framework Preset: Other.

## Files

- `index.html` — public site (homepage, manifesto, archive, designer)
- `support.js`, `image-slot.js` — runtime
- `opt/`, `drops/`, `nz-portrait.jpg` — images
- `api/` — serverless functions guarding the case studies

## Password-protected case studies

The four case-study pages are NOT in `index.html`. They live in `api/_cases.js`,
which is bundled with the serverless function and never served to the browser
directly. Clicking Explore asks for a password; on success the session stays
unlocked for 30 minutes across all four projects.

### Required environment variable

In Vercel: Project → Settings → Environment Variables

| Name | Value |
|------|-------|
| `CASE_PASSWORD` | the password you hand out |

Apply it to Production, Preview and Development, then redeploy.

To change the password, edit that variable and redeploy. No code change needed.

### Endpoints

- `POST /api/unlock` — checks the password, sets a signed 30-minute http-only cookie
- `GET /api/cases` — returns the case markup only with a valid cookie, otherwise 401

### Known limitation

The case *markup* is protected, but the image files in `opt/` and `drops/` remain
publicly reachable by direct URL. Anyone who knows or guesses a filename can view
a photo. Gating the imagery as well would require routing every image through the
function.
