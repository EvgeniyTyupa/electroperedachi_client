# Energy Passport cabinet

The cabinet uses the local `back` additions from the matching `cabinet` branch.

- Energy is credited after confirmed purchase, as before. Scanning affects stamps and levels only.
- One checked event gives one visit, including zero-price tickets. Multiple tickets for the same event do not multiply attendance.
- Streak multipliers and merch purchases remain disabled until their rules are agreed.
- The existing wallet, server checkout validation, marketing consent and Ukrainian/English locales are preserved. Geologica is self-hosted with its OFL licence.
- The story renderer produces a private PNG with event covers from the server public folder when available, typographic fallback stamps and a bundled dance-floor background. External cover URLs fall back to typography; no arbitrary remote images are fetched.
- The guest page checks the session once to distinguish returning users; fake blurred figures are guest-only.

## Isolated local preview

No production database, real mail, payment provider or worker is used by the preview script.

In `back`:

```sh
node scripts/cabinet-preview.js
```

In `client`:

```sh
NEXT_PUBLIC_API_URL=http://localhost:3102/api npm run dev -- --port 3100
```

Open `http://localhost:3100/account` for the guest page. Open `http://localhost:3102/__preview/login` for the fixture account with six visited events, one active ticket and 350 E. To test the real OTP flow against fake mail, sign out and use `raver@example.test`; the code is printed in the preview server terminal. All preview data disappears when the process stops.

`NEXT_PUBLIC_API_URL` is an optional build-time setting; without it, the existing production API URL is used. For a real local backend, match its allowed client origins and database settings; the preview uses ports 3100 and 3102.

## Checks

In `back`: `npm test`, `npm run test:integration`.
In `client`: `npm run build`.

The preview does not implement event landing-page purchases or payment-provider callbacks; those stay in the existing application and its integration tests.
