# Arena — esports tournament platform

Arena is a responsive, install-free web app for exploring esports events and a player community. It uses plain HTML, CSS, and JavaScript so it runs without a package install, build step, or development server.

## Run it

1. Open this folder in VS Code.
2. Open `index.html` in a browser (or use the VS Code Live Server extension if you already have it).

No commands or additional software are required.

## What's included

- Overview dashboard, upcoming/live/completed tournament filters, tournament details, demo brackets, schedule, rules, and local registration.
- BGMI and Free Fire practice-lobby listings with local create/join/leave flows, plus a free timed browser aim trainer.
- Player profile editing, match history, community leaderboard filters, team creation, and team membership.
- Virtual ARC coin balance, daily/activity rewards, timed sample sponsor spotlights, and transaction history.
- Local admin console for creating/editing events, changing event status, verifying demo match results, moderating sample players, updating virtual reward amounts, publishing announcements, and resolving reports.
- Responsive desktop sidebar and mobile bottom navigation.

Most interactions save to this browser's `localStorage`, so demo changes remain after refresh on the same device. **This is not a production service:** there is no server, database, sign-up/login authentication, authorization, live match feed, organizer integration, or cross-device sync. The admin console is deliberately not access-controlled and must not be used with real users or real events. Don't enter passwords, payment information, or other sensitive data.

ARC is virtual demo currency only. It has no cash value and cannot be purchased, withdrawn, transferred, redeemed, or wagered. The app has no real-money or gambling flows.

The BGMI and Free Fire lobbies are Arena-side practice coordination cards, not official in-game rooms; they do not launch the games or issue room codes/passwords. The aim trainer runs in the browser and its score does not award ARC. Sponsor spotlights are fictional timed previews used only to demonstrate a possible rewards interface: no actual ad is served, no ad provider receives a view, and no advertising income is earned. Real lobby integrations and advertising require approved provider integrations, a backend, and abuse/fraud controls.

## Technology choice

- **HTML** provides the app shell and semantic structure.
- **CSS** provides the design system and responsive layouts.
- **JavaScript** handles navigation, sample workflows, validation, and local demo persistence.

This keeps the project light on an 8 GB laptop and easy to open in VS Code. For production accounts and shared tournament data, the next step is a trusted backend with a database, secure authentication, server-side authorization, and validated APIs. A future Android release could use a PWA or a native wrapper such as Capacitor after that backend and production security model are in place.
