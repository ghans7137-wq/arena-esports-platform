(() => {
  'use strict';

  const STORAGE_KEY = 'arena-platform-v1';
  const isoDay = (date) => date.toISOString().slice(0, 10);
  const toLocalDateTimeValue = (value) => {
    const date = new Date(value);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 16);
  };
  const plusDays = (days, hour = 18) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    date.setHours(hour, 0, 0, 0);
    return date.toISOString();
  };
  const seed = {
    user: {
      username: 'RogueNova',
      displayName: 'RogueNova',
      avatar: '',
      favoriteGame: 'Valorant',
      region: 'South Asia',
      joinedAt: '2025-08-14',
      bio: 'Climbing one match at a time. Always up for a good scrim.',
      notifications: true,
      publicProfile: true
    },
    coins: 1250,
    rewardAmounts: { daily: 50, profile: 100, community: 25 },
    lastDailyReward: '',
    sponsorClaims: { date: '', claimed: [] },
    arcadeBest: 0,
    joinedLobbyIds: [],
    lobbies: [
      { id: 'bgmi-erangel-classic', game: 'BGMI', name: 'Erangel Classic · Squad', mode: 'Squad · TPP', map: 'Erangel', region: 'India', players: 3, capacity: 4, host: 'KairoZen', start: plusDays(0, 20) },
      { id: 'bgmi-miramar-duo', game: 'BGMI', name: 'Miramar Duo Warm-up', mode: 'Duo · TPP', map: 'Miramar', region: 'South Asia', players: 1, capacity: 2, host: 'MisoPlays', start: plusDays(0, 21) },
      { id: 'ff-bermuda-scrim', game: 'Free Fire', name: 'Bermuda Squad Scrim', mode: 'Squad · Clash Squad', map: 'Bermuda', region: 'India', players: 3, capacity: 4, host: 'NovaRift', start: plusDays(0, 20) },
      { id: 'ff-purgatory-duo', game: 'Free Fire', name: 'Purgatory Duo Practice', mode: 'Duo · Battle Royale', map: 'Purgatory', region: 'South Asia', players: 1, capacity: 2, host: 'PixelViper', start: plusDays(0, 22) }
    ],
    claimedRewards: [],
    transactions: [
      { id: 'tx-1', label: 'Season welcome bonus', amount: 500, kind: 'earned', date: '2026-11-18' },
      { id: 'tx-2', label: 'Daily login streak', amount: 100, kind: 'earned', date: '2026-11-20' },
      { id: 'tx-3', label: 'Community challenge', amount: 250, kind: 'earned', date: '2026-11-22' },
      { id: 'tx-4', label: 'Profile completion', amount: 400, kind: 'earned', date: '2026-11-24' }
    ],
    tournaments: [
      { id: 'valorant-nightfall', name: 'Nightfall Open', game: 'Valorant', mode: '5v5', status: 'upcoming', start: plusDays(3, 19), prize: 5000, players: 64, capacity: 128, platform: 'PC', region: 'Asia', format: 'Single elimination', description: 'A fast-paced open bracket for teams ready to make their mark. Bring your best five and fight through the night.', rules: 'All players must be registered before check-in. Best of one until semifinals; best of three for the final. No smurfing, cheating, or account sharing.', organizer: 'Arena Competitive', monogram: 'V', glow: 'rgba(255,87,105,.34)' },
      { id: 'bgmi-squad-rush', name: 'Squad Rush #08', game: 'BGMI', mode: 'Squad', status: 'live', start: plusDays(-1, 17), prize: 3200, players: 80, capacity: 100, platform: 'Mobile', region: 'India', format: 'Points league', description: 'Drop in, stay sharp, and rack up placement points across four custom-room matches.', rules: 'Four matches, points awarded for placement and eliminations. Room credentials are shared with verified registered players 15 minutes before each match.', organizer: 'Arena Mobile', monogram: 'B', glow: 'rgba(255,173,102,.35)' },
      { id: 'apex-ascension', name: 'Apex Ascension', game: 'Apex Legends', mode: 'Trios', status: 'upcoming', start: plusDays(6, 16), prize: 2500, players: 36, capacity: 60, platform: 'PC / Console', region: 'Global', format: 'Points league', description: 'Three legends. One squad. Prove your rotations and consistency in an open trios series.', rules: 'Three rounds of points play. Teams must use the same roster for all rounds. Match screenshots must include the complete scoreboard.', organizer: 'Arena Competitive', monogram: 'A', glow: 'rgba(98,221,255,.32)' },
      { id: 'cod-mobile-circuit', name: 'Mobile Masters', game: 'Call of Duty: Mobile', mode: '5v5', status: 'complete', start: plusDays(-8, 14), prize: 1800, players: 32, capacity: 32, platform: 'Mobile', region: 'South Asia', format: 'Double elimination', description: 'A community circuit built for tactical five-stacks and mobile precision.', rules: 'Double elimination, best of three. Final result verified by both team captains.', organizer: 'Arena Mobile', monogram: 'C', glow: 'rgba(166,138,255,.34)', winner: 'Team Orbit' },
      { id: 'valorant-quickplay', name: 'Quickplay Friday', game: 'Valorant', mode: '5v5', status: 'upcoming', start: plusDays(10, 20), prize: 1200, players: 40, capacity: 64, platform: 'PC', region: 'Asia', format: 'Single elimination', description: 'One evening, a compact bracket, and a little friendly rivalry. New teams welcome.', rules: 'Single elimination, best of one. Captains report scores in the match lobby.', organizer: 'Arena Community', monogram: 'V', glow: 'rgba(255,87,105,.3)' },
      { id: 'rocket-league-duos', name: 'Boosted Duos', game: 'Rocket League', mode: '2v2', status: 'complete', start: plusDays(-14, 18), prize: 900, players: 24, capacity: 24, platform: 'PC / Console', region: 'Global', format: 'Single elimination', description: 'A short-format doubles cup for mechanical players and smart rotations.', rules: 'Best of three. Teams have five minutes after the scheduled start to join.', organizer: 'Arena Community', monogram: 'R', glow: 'rgba(98,221,255,.25)', winner: 'Boost Theory' }
    ],
    registrations: [],
    players: [
      { username: 'PixelViper', rating: 2840, wins: 48, game: 'Valorant', initials: 'PV', color: '#b28cff' },
      { username: 'KairoZen', rating: 2715, wins: 42, game: 'BGMI', initials: 'KZ', color: '#74d5cf' },
      { username: 'LunaFrag', rating: 2630, wins: 38, game: 'Apex Legends', initials: 'LF', color: '#ffac72' },
      { username: 'RogueNova', rating: 2480, wins: 31, game: 'Valorant', initials: 'RN', color: '#f0806b' },
      { username: 'HexaCore', rating: 2390, wins: 29, game: 'Valorant', initials: 'HC', color: '#7fa9ff' },
      { username: 'MisoPlays', rating: 2260, wins: 26, game: 'BGMI', initials: 'MP', color: '#f194c8' },
      { username: 'DriftKing', rating: 2140, wins: 21, game: 'Rocket League', initials: 'DK', color: '#f3d16f' },
      { username: 'NovaRift', rating: 2030, wins: 18, game: 'Apex Legends', initials: 'NR', color: '#94d87b' }
    ],
    matches: [
      { id: 'm-101', event: 'Nightfall Open Qualifier', opponent: 'HexaCore', game: 'Valorant', date: '2026-11-24', result: 'win', score: '13 : 9', status: 'verified' },
      { id: 'm-102', event: 'Community Scrim Series', opponent: 'PixelViper', game: 'Valorant', date: '2026-11-21', result: 'loss', score: '10 : 13', status: 'verified' },
      { id: 'm-103', event: 'Apex Weekend Ladder', opponent: 'LunaFrag', game: 'Apex Legends', date: '2026-11-19', result: 'win', score: '1st place', status: 'verified' },
      { id: 'm-104', event: 'Squad Rush #07', opponent: 'KairoZen', game: 'BGMI', date: '2026-11-16', result: 'win', score: 'Winner winner', status: 'verified' }
    ],
    teams: [
      { id: 'team-orbit', name: 'Team Orbit', tag: 'ORBT', game: 'Valorant', members: ['RogueNova', 'HexaCore', 'PixelViper'], description: 'Disciplined comms, clean executes. Open to one flexible duelist.' },
      { id: 'team-afterglow', name: 'Afterglow', tag: 'AG', game: 'Apex Legends', members: ['LunaFrag', 'NovaRift'], description: 'Late-night ranked grinders turning into tournament regulars.' },
      { id: 'team-dropzone', name: 'Dropzone Unit', tag: 'DZU', game: 'BGMI', members: ['KairoZen', 'MisoPlays'], description: 'Aggressive entries, smart resets. Looking for a reliable IGL.' }
    ],
    announcements: [
      { id: 'ann-1', title: 'Season 04 is live', body: 'New brackets, fresh rewards, and more ways to climb. Welcome to the new season.', date: '2026-11-20' },
      { id: 'ann-2', title: 'Nightfall Open check-in', body: 'Team check-in opens 30 minutes before the first match. Make sure your full roster is ready.', date: '2026-11-24' }
    ],
    reports: [],
    mutedPlayers: [],
    adminTab: 'overview',
    tournamentFilter: 'all'
  };

  let state = loadState();
  let currentPage = 'overview';
  let selectedTournament = '';
  let modalKind = '';
  let adminTab = 'overview';
  let tournamentSearch = '';
  let leaderboardFilter = 'all';
  let lobbyFilter = 'all';
  let aimSession = null;
  let sponsorSession = null;
  let aimTimer = 0;
  let sponsorTimer = 0;

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return structuredClone(seed);
      const parsed = JSON.parse(saved);
      return { ...structuredClone(seed), ...parsed, user: { ...seed.user, ...(parsed.user || {}) } };
    } catch (error) {
      console.error('Could not load saved Arena demo data:', error);
      return structuredClone(seed);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Could not save Arena demo data:', error);
      toast('Your browser could not save this change. Check local storage settings.', 'error');
    }
  }

  const icons = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    trophy: '<path d="M8 21h8m-4-4v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4v2a4 4 0 0 0 4 4m9-6h3v2a4 4 0 0 1-4 4"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    gamepad: '<path d="M6 12h4m-2-2v4"/><path d="M15 11h.01M18 13h.01"/><path d="M7 6h10a4 4 0 0 1 3.9 3.1l1 5a3 3 0 0 1-4.9 2.8l-2.1-1.7H9.1L7 16.9a3 3 0 0 1-4.9-2.8l1-5A4 4 0 0 1 7 6Z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/>',
    chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-5 5"/>',
    coin: '<circle cx="12" cy="12" r="9"/><path d="M15.5 9.5c-.6-1-1.6-1.5-3-1.5-1.7 0-2.8.8-2.8 2s1 1.8 2.8 2c1.8.2 2.8.8 2.8 2 0 1.3-1.2 2.2-3 2.2-1.4 0-2.5-.5-3.2-1.5M12 6v12"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.5.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.5-.9l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-1.8l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.5-.9l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.5.9l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 1.8Z" transform="translate(-1 -1) scale(1.08)"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
    arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
    users2: '<path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M21 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="m8.2 13.5-1 8.5 4.8-2 4.8 2-1-8.5"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    close: '<path d="m18 6-12 12M6 6l12 12"/>',
    zap: '<path d="m13 2-3 8h7l-6 12 1-9H5l8-11Z"/>',
    flag: '<path d="M4 22V4"/><path d="M4 4c5-4 11 4 16 0v12c-5 4-11-4-16 0"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    edit: '<path d="m15 5 4 4M4 20l4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16l-1 4Z"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    gift: '<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18"/><path d="M12 8H8.5a2.5 2.5 0 1 1 2.5-2.5V8Zm0 0h3.5a2.5 2.5 0 1 0-2.5-2.5V8Z"/>',
    sparkles: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 14 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14ZM5 3l.7 1.3L7 5l-1.3.7L5 7l-.7-1.3L3 5l1.3-.7L5 3Z"/>'
  };

  const icon = (name, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.grid}</svg>`;
  const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const initials = (name = '') => name.trim().split(/\s+/).slice(0, 2).map((part) => part[0] || '').join('').toUpperCase();
  const avatarHtml = (name, extra = '', image = '') => `<div class="avatar ${extra}">${image ? `<img src="${escapeHtml(image)}" alt="">` : escapeHtml(initials(name))}</div>`;
  const formatDate = (value, options = { month: 'short', day: 'numeric' }) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? 'Date pending' : new Intl.DateTimeFormat('en', options).format(date);
  };
  const dayDistance = (value) => Math.ceil((new Date(value).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 86400000);
  const tournamentState = (item) => item.status === 'upcoming' && dayDistance(item.start) < 0 ? 'live' : item.status;
  const sponsorOffers = [
    { id: 'pulse', name: 'Pulse Energy', category: 'GAMING ENERGY · SAMPLE SPONSOR', offer: 'Discover the focus fuel for your next session.', color: 'lime' },
    { id: 'dropzone', name: 'Dropzone Gear', category: 'ESPORTS GEAR · SAMPLE SPONSOR', offer: 'Take a look at a setup built for the climb.', color: 'purple' },
    { id: 'hyperbyte', name: 'Hyperbyte Cloud', category: 'GAMING TECH · SAMPLE SPONSOR', offer: 'See how a smoother setup can level up play.', color: 'cyan' }
  ];
  const pageTitles = {
    overview: 'Overview', tournaments: 'Tournaments', 'tournament-detail': 'Tournament details', play: 'Play & lobbies',
    leaderboard: 'Leaderboard', teams: 'Teams', profile: 'Player profile', wallet: 'Coins & rewards',
    admin: 'Admin console', settings: 'Settings', notifications: 'Announcements', matches: 'Match history'
  };

  function toast(message, type = 'success') {
    const region = document.querySelector('#toast-region');
    if (!region) return;
    const item = document.createElement('div');
    item.className = `toast ${type}`;
    item.textContent = message;
    region.append(item);
    setTimeout(() => item.remove(), 3800);
  }

  function navLink(page, label, iconName, count = '') {
    const active = currentPage === page || (page === 'tournaments' && currentPage === 'tournament-detail');
    return `<a class="nav-link ${active ? 'active' : ''}" href="#${page}" data-page="${page}">${icon(iconName)}<span>${label}</span>${count ? `<span class="nav-count">${count}</span>` : ''}</a>`;
  }

  function renderShell() {
    const unread = state.announcements.length;
    document.querySelector('#app').innerHTML = `
      <div class="shell">
        <aside class="sidebar">
          <a class="brand" href="#overview" data-page="overview"><span class="brand-mark">A</span><span class="brand-copy"><strong>ARENA</strong><small>Play. Compete. Rise.</small></span></a>
          <div class="nav-caption">Workspace</div>
          <nav class="nav-list" aria-label="Main navigation">
            ${navLink('overview', 'Overview', 'grid')}
            ${navLink('tournaments', 'Tournaments', 'trophy')}
            ${navLink('play', 'Play & lobbies', 'gamepad')}
            ${navLink('leaderboard', 'Leaderboard', 'chart')}
            ${navLink('teams', 'Teams', 'users')}
            ${navLink('profile', 'Player profile', 'user')}
          </nav>
          <div class="nav-spacer"></div>
          <div class="nav-caption">Your arena</div>
          <nav class="nav-list" aria-label="Player navigation">
            ${navLink('wallet', 'Coins & rewards', 'coin')}
            ${navLink('notifications', 'Announcements', 'bell', String(unread))}
            ${navLink('admin', 'Admin console', 'shield')}
          </nav>
          <div class="sidebar-bottom">
            <div class="season-card"><span class="eyebrow">Current season</span><strong>Season 04 · Ascension</strong><p>Season ends in 18 days. Keep climbing the ladder.</p><div class="season-progress"><span></span></div></div>
            <div class="sidebar-user">${avatarHtml(state.user.username, '', state.user.avatar)}<div class="user-meta"><strong>${escapeHtml(state.user.username)}</strong><span>Demo player · Level 18</span></div><button class="icon-button" data-action="go-settings" aria-label="Account settings">${icon('settings')}</button></div>
          </div>
        </aside>
        <main class="main">
          <header class="topbar">
            <div class="crumbs"><span>ARENA</span>${icon('chevron')}<strong>${pageTitles[currentPage] || 'Overview'}</strong></div>
            <a class="mobile-brand" href="#overview" data-page="overview"><span class="brand-mark">A</span><strong>ARENA</strong></a>
            <div class="top-actions">
              <button class="coin-pill" data-page="wallet" aria-label="Open coin wallet"><span class="coin">A</span><span class="coin-label">${Number(state.coins).toLocaleString()} ARC</span></button>
              <button class="icon-button notification-dot" data-page="notifications" aria-label="Open announcements">${icon('bell')}</button>
              <button class="icon-button" data-page="profile" aria-label="Open player profile">${icon('user')}</button>
            </div>
          </header>
          <div class="page-content" id="page-content"></div>
          <nav class="mobile-nav" aria-label="Mobile navigation">
            ${navLink('overview', 'Home', 'grid')}
            ${navLink('tournaments', 'Events', 'trophy')}
            ${navLink('play', 'Play', 'gamepad')}
            ${navLink('leaderboard', 'Ranks', 'chart')}
            ${navLink('teams', 'Teams', 'users')}
            ${navLink('profile', 'Profile', 'user')}
          </nav>
        </main>
      </div>
      ${modalKind ? renderModal() : ''}
    `;
    renderPage();
  }

  function pageHeading(eyebrow, title, description, button = '') {
    return `<div class="page-heading"><div><div class="eyebrow heading-eyebrow">${eyebrow}</div><h1>${title}</h1><p>${description}</p></div>${button}</div>`;
  }

  function statCard(label, value, iconName, color, change = '') {
    return `<div class="card stat-card"><div class="stat-icon ${color}">${icon(iconName)}</div><div class="stat-info"><span>${label}</span><strong>${value}</strong></div>${change ? `<span class="stat-change">${change}</span>` : ''}</div>`;
  }

  function tournamentCard(item, compact = false) {
    const status = tournamentState(item);
    const spots = Math.max(0, item.capacity - item.players);
    const stateLabel = status === 'live' ? 'LIVE NOW' : status === 'complete' ? 'COMPLETED' : `STARTS ${formatDate(item.start).toUpperCase()}`;
    const badge = status === 'live' ? 'live' : status === 'complete' ? 'complete' : 'upcoming';
    const registered = state.registrations.some((registration) => registration.tournamentId === item.id);
    return `<article class="card tournament-card" data-action="tournament-open" data-id="${escapeHtml(item.id)}" tabindex="0" role="button" aria-label="View ${escapeHtml(item.name)}">
      <div class="tournament-art" style="--art-glow:${escapeHtml(item.glow || 'rgba(201,255,87,.3)')}"><span class="game-monogram">${escapeHtml(item.monogram || initials(item.game))}</span><div class="tournament-art-copy"><span>${escapeHtml(item.game)} · ${escapeHtml(item.mode)}</span><h3>${escapeHtml(item.name)}</h3></div></div>
      <div class="tournament-body"><div class="tournament-tags"><span class="tag ${badge}">${stateLabel}</span><span class="tag">${escapeHtml(item.platform)}</span></div>
      <div class="tournament-meta"><div class="meta-item"><span>${status === 'complete' ? 'Winner' : 'Format'}</span><strong>${escapeHtml(status === 'complete' ? item.winner || 'Pending' : item.format)}</strong></div><div class="meta-item"><span>${status === 'complete' ? 'Played' : 'Players'}</span><strong>${status === 'complete' ? formatDate(item.start) : `${item.players}/${item.capacity}`}</strong></div></div>
      <div class="tournament-footer"><span class="prize"><span class="coin">A</span>${Number(item.prize).toLocaleString()} ARC</span><span class="spots">${registered ? '✓ Registered' : status === 'complete' ? 'View results' : spots ? `${spots} spots left` : 'Full'}</span></div></div>
    </article>`;
  }

  function playerRow(player, index) {
    const colors = ['#ffd675', '#bcc8dc', '#d99f72'];
    const isCurrent = player.username === state.user.username;
    return `<tr><td><span class="rank-number ${index < 3 ? 'top' : ''}">#${index + 1}</span></td><td><div class="table-player"><div class="mini-avatar" style="background:${escapeHtml(player.color || '#c9ff57')}">${escapeHtml(player.initials || initials(player.username))}</div><strong>${escapeHtml(player.username)}${isCurrent ? ' <span class="tag upcoming">YOU</span>' : ''}</strong></div></td><td>${escapeHtml(player.game)}</td><td><strong>${Number(player.rating).toLocaleString()}</strong></td><td>${player.wins}</td><td>${index < 3 ? `<span style="color:${colors[index]}">Top ${index + 1}</span>` : '—'}</td></tr>`;
  }

  function renderOverview() {
    const upcoming = state.tournaments.filter((item) => tournamentState(item) !== 'complete').sort((a, b) => new Date(a.start) - new Date(b.start));
    const sortedPlayers = [...state.players].sort((a, b) => b.rating - a.rating);
    const played = state.matches.filter((match) => match.status === 'verified').length;
    const wins = state.matches.filter((match) => match.status === 'verified' && match.result === 'win').length;
    return `${`<section class="hero"><div class="hero-copy"><div class="eyebrow">THE COMPETITIVE SEASON IS ON</div><h1>Find your next <span>big win.</span></h1><p>Join the arena, sharpen your skills, and make every match count. Your next chapter starts here.</p><div class="hero-actions"><button class="btn btn-primary" data-page="tournaments">${icon('trophy')} Explore tournaments ${icon('arrow')}</button><button class="btn btn-ghost" data-action="edit-profile">${icon('user')} Build your player card</button></div></div><div class="hero-art"><div class="hero-orbit"></div><div class="hero-emblem"><span>A</span></div><div class="hero-float one">${icon('zap')} SEASON 04<strong>Ascension</strong></div><div class="hero-float two">THIS WEEK<strong>12 tournaments</strong></div></div></section>`}
      <div class="section-heading"><div><h2>Your season at a glance</h2><p>Keep an eye on your climb, ${escapeHtml(state.user.username)}.</p></div><span class="tag upcoming">SEASON 04</span></div>
      <div class="stat-grid">${statCard('Current rating', '2,480', 'chart', '', '+8.4% this season')}${statCard('Matches played', String(played + 27), 'zap', 'purple', '↑ 4 this week')}${statCard('Win rate', `${Math.round(wins / Math.max(played, 1) * 100)}%`, 'trophy', 'cyan', 'Verified matches')}${statCard('Community rank', '#4', 'award', 'orange', '↑ 2 places')}</div>
      <div class="quick-play-strip"><div><div class="eyebrow">JUMP IN FOR FREE</div><strong>BGMI & Free Fire lobbies + a quick aim warm-up</strong><span>Find a squad or play a free browser mini-game.</span></div><button class="btn btn-primary" data-page="play">${icon('gamepad')} Play now ${icon('arrow')}</button></div>
      <div class="section-heading"><div><h2>In the arena</h2><p>Events worth showing up for.</p></div><a class="text-link" href="#tournaments" data-page="tournaments">All tournaments ${icon('arrow')}</a></div>
      <div class="tournament-grid">${upcoming.slice(0, 3).map((item) => tournamentCard(item, true)).join('')}</div>
      <div class="section-heading"><div><h2>Your competitive pulse</h2><p>Recent results and the community climbing with you.</p></div><a class="text-link" href="#leaderboard" data-page="leaderboard">Leaderboard ${icon('arrow')}</a></div>
      <div class="dashboard-grid"><section class="card panel"><div class="panel-title"><div><h3>Recent match history</h3><p>Your latest verified matches</p></div><button class="btn btn-small btn-ghost" data-page="matches">View all</button></div><div class="activity-list">${state.matches.slice(0, 4).map((match) => `<div class="activity-row"><div class="activity-icon">${icon(match.result === 'win' ? 'trophy' : 'users')}</div><div class="activity-copy"><strong>${escapeHtml(match.event)}</strong><span>vs ${escapeHtml(match.opponent)} · ${formatDate(match.date)}</span></div><span class="activity-score ${match.result === 'win' ? 'win' : 'loss'}">${escapeHtml(match.score)}</span></div>`).join('')}</div></section>
      <section class="card panel"><div class="panel-title"><div><h3>Top challengers</h3><p>Community rating · this season</p></div><a class="text-link" href="#leaderboard" data-page="leaderboard">View all</a></div><div class="rank-list">${sortedPlayers.slice(0, 5).map((player, index) => `<div class="rank-row"><span class="rank-number ${index < 3 ? 'top' : ''}">0${index + 1}</span><div class="mini-avatar" style="background:${escapeHtml(player.color)}">${escapeHtml(player.initials)}</div><div class="rank-meta"><strong>${escapeHtml(player.username)}</strong><span>${escapeHtml(player.game)}</span></div><strong class="rank-score">${Number(player.rating).toLocaleString()}</strong></div>`).join('')}</div></section></div>
      <div class="disclaimer">Demo experience: your profile and activity are stored only in this browser. Arena does not have a connected account service, live tournament backend, or real-time match verification yet.</div>`;
  }

  function renderTournaments() {
    let items = state.tournaments.filter((item) => state.tournamentFilter === 'all' || tournamentState(item) === state.tournamentFilter);
    if (tournamentSearch.trim()) {
      const query = tournamentSearch.trim().toLowerCase();
      items = items.filter((item) => `${item.name} ${item.game} ${item.mode} ${item.region}`.toLowerCase().includes(query));
    }
    const actions = `<button class="btn btn-primary" data-action="show-modal" data-modal="report">${icon('flag')} Report an issue</button>`;
    return `${pageHeading('YOUR NEXT MATCH STARTS HERE', 'Tournaments', 'Find your format, lock in your roster, and compete for the top spot.', actions)}
      <div class="filters" role="group" aria-label="Filter tournaments">${['all', 'upcoming', 'live', 'complete'].map((filter) => `<button class="filter-btn ${state.tournamentFilter === filter ? 'active' : ''}" data-action="tournament-filter" data-filter="${filter}">${filter === 'all' ? 'All events' : filter === 'complete' ? 'Completed' : filter[0].toUpperCase() + filter.slice(1)}</button>`).join('')}<input class="search-input" type="search" placeholder="Search events, games, regions…" aria-label="Search tournaments" value="${escapeHtml(tournamentSearch)}" data-action="tournament-search"></div>
      <div class="tournament-grid">${items.map((item) => tournamentCard(item)).join('') || `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">${icon('search')}</div><strong>No tournaments found</strong><p>Try a different filter or search term. There are always more matches on the horizon.</p></div>`}</div>
      <div class="disclaimer">Tournament listings, schedules, rewards, and registration in this demo are sample data saved locally in your browser. No real tournament entry or prize is issued.</div>`;
  }

  function renderTournamentDetail() {
    const item = state.tournaments.find((tournament) => tournament.id === selectedTournament);
    if (!item) {
      currentPage = 'tournaments';
      return renderTournaments();
    }
    const status = tournamentState(item);
    const registered = state.registrations.find((registration) => registration.tournamentId === item.id);
    const isFull = item.players >= item.capacity;
    const action = status === 'complete'
      ? `<button class="btn btn-ghost" data-action="show-modal" data-modal="report">${icon('flag')} Report result issue</button>`
      : registered
        ? `<button class="btn btn-primary" disabled>${icon('check')} You're registered</button>`
        : `<button class="btn btn-primary" data-action="register" data-id="${escapeHtml(item.id)}" ${isFull ? 'disabled' : ''}>${isFull ? 'Event full' : 'Register to compete'} ${icon('arrow')}</button>`;
    const bracketStages = [
      { title: 'Quarter-finals', matches: [['Team Orbit', 'TBD'], ['Afterglow', 'TBD']] },
      { title: 'Semi-finals', matches: [['Winner QF 1', 'Winner QF 2']] },
      { title: 'Grand final', matches: [[item.winner || 'TBD', item.winner ? 'Champion' : 'TBD']] }
    ];
    return `<div class="page-heading"><div><a class="text-link" href="#tournaments" data-page="tournaments">← Back to tournaments</a></div><button class="btn btn-ghost" data-action="show-modal" data-modal="report">${icon('flag')} Report</button></div>
      <section class="card panel"><div class="detail-banner"><span class="game-monogram">${escapeHtml(item.monogram)}</span><div class="detail-banner-copy"><span class="tag ${status === 'live' ? 'live' : status === 'complete' ? 'complete' : 'upcoming'}">${status === 'live' ? 'LIVE NOW' : status === 'complete' ? 'COMPLETED' : 'OPEN FOR REGISTRATION'}</span><h2>${escapeHtml(item.name)}</h2><p>${escapeHtml(item.game)} · ${escapeHtml(item.mode)} · ${escapeHtml(item.region)}</p></div></div>
      <div class="detail-grid"><div class="detail-block"><h3>About this tournament</h3><p>${escapeHtml(item.description)}</p><h3 style="margin-top:16px">Tournament rules</h3><p>${escapeHtml(item.rules)}</p></div><div class="detail-block"><h3>Event details</h3>
      <div class="detail-line"><span>Starts</span><strong>${formatDate(item.start, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</strong></div>
      <div class="detail-line"><span>Format</span><strong>${escapeHtml(item.format)}</strong></div><div class="detail-line"><span>Platform</span><strong>${escapeHtml(item.platform)}</strong></div>
      <div class="detail-line"><span>Players</span><strong>${item.players}/${item.capacity}</strong></div><div class="detail-line"><span>Prize pool</span><strong style="color:#f4d479">${Number(item.prize).toLocaleString()} ARC</strong></div>
      <div class="detail-line"><span>Organizer</span><strong>${escapeHtml(item.organizer)}</strong></div>${item.winner ? `<div class="detail-line"><span>Winner</span><strong style="color:var(--lime)">${escapeHtml(item.winner)}</strong></div>` : ''}
      </div></div>
      <div class="section-heading"><div><h2>Bracket & match schedule</h2><p>Illustrative bracket · times shown in your local timezone.</p></div></div>
      <div class="bracket-grid">${bracketStages.map((stage, stageIndex) => `<section class="bracket-stage"><div class="eyebrow">${stage.title}</div><div class="bracket-stage-time">${stageIndex === 0 ? `Check-in · ${formatDate(new Date(new Date(item.start).getTime() - 30 * 60000), { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}` : stageIndex === 1 ? 'After quarter-finals' : 'Final match'}</div>${stage.matches.map((match, matchIndex) => `<div class="bracket-match"><span class="bracket-match-label">${stageIndex === 2 ? 'CHAMPIONSHIP' : `${stageIndex === 0 ? 'QF' : 'SF'} 0${matchIndex + 1}`}</span><div class="bracket-team">${escapeHtml(match[0])}${stageIndex === 2 && item.winner ? '<b>WINNER</b>' : ''}</div><div class="bracket-team">${escapeHtml(match[1])}</div></div>`).join('')}</section>`).join('')}</div>
      <div class="modal-note">Bracket participants and match times are placeholders in this demo. Official schedules and results require an organizer service.</div>
      ${registered ? `<div class="modal-note">Registered as <strong>${escapeHtml(registered.teamName || state.user.username)}</strong>. This confirmation is local to this browser and has not been sent to an organizer.</div>` : ''}
      <div class="detail-actions">${action}<button class="btn btn-ghost" data-action="share-tournament" data-id="${escapeHtml(item.id)}">Share event</button></div>
      <div class="disclaimer">Demo tournament: registration is saved locally and does not create an official entry. ARC coins are virtual, have no cash value, and cannot be redeemed or wagered.</div></section>`;
  }

  function renderPlay() {
    const lobbies = state.lobbies.filter((lobby) => lobbyFilter === 'all' || lobby.game === lobbyFilter);
    const isPlaying = Boolean(aimSession && aimSession.active);
    return `${pageHeading('DROP IN · PLAY FOR FREE', 'Play & lobbies', 'Join a local BGMI or Free Fire practice lobby, or warm up in the free aim trainer.', `<span class="tag">FREE TO PLAY</span>`)}
      <section class="card arcade-card">
        <div class="arcade-intro"><div class="arcade-icon">${icon('zap')}</div><div><div class="eyebrow">NO DOWNLOAD · NO ENTRY FEE</div><h2>Arena Aim Trainer</h2><p>Hit as many targets as you can before the 30-second round ends. Your best score stays on this device.</p></div></div>
        <div class="aim-game ${isPlaying ? 'is-playing' : ''}" id="aim-game">
          <div class="aim-hud"><span>TIME <strong id="aim-timer">${isPlaying ? aimSession.remaining : '30'}s</strong></span><span>HITS <strong id="aim-score">${isPlaying ? aimSession.score : '0'}</strong></span><span>BEST <strong>${Number(state.arcadeBest || 0)}</strong></span></div>
          <div class="aim-playfield" id="aim-playfield">
            ${isPlaying ? `<button class="aim-target" data-action="aim-hit" aria-label="Hit target">${icon('zap')}</button>` : `<div class="aim-ready"><div class="aim-ready-icon">${icon('gamepad')}</div><strong>Ready when you are</strong><span>30 seconds · target practice</span><button class="btn btn-primary" data-action="start-aim">${icon('zap')} Start free game</button></div>`}
          </div>
        </div>
        <div class="arcade-footer"><span>${icon('shield')} Free browser mini-game · scores are just for fun</span><span>No ARC is awarded for game scores</span></div>
      </section>
      <div class="section-heading"><div><h2>Mobile practice lobbies</h2><p>Find a casual squad or duo. These rooms coordinate practice inside this demo only.</p></div><button class="btn btn-primary" data-action="show-modal" data-modal="lobby">${icon('plus')} Create lobby</button></div>
      <div class="filters" role="group" aria-label="Filter practice lobbies">${['all', 'BGMI', 'Free Fire'].map((game) => `<button class="filter-btn ${lobbyFilter === game ? 'active' : ''}" data-action="lobby-filter" data-filter="${escapeHtml(game)}">${game === 'all' ? 'All lobbies' : escapeHtml(game)}</button>`).join('')}<span class="muted" style="margin-left:auto;font-size:10px">${lobbies.length} practice rooms</span></div>
      <div class="lobby-grid">${lobbies.map((lobby) => {
        const joined = state.joinedLobbyIds.includes(lobby.id);
        const isHost = lobby.host === state.user.username;
        const full = lobby.players >= lobby.capacity;
        return `<article class="card lobby-card ${lobby.game === 'Free Fire' ? 'freefire' : 'bgmi'}"><div class="lobby-top"><div class="lobby-game-mark">${lobby.game === 'BGMI' ? 'B' : 'FF'}</div><span class="tag ${full ? 'complete' : 'upcoming'}">${full ? 'FULL' : 'OPEN'}</span></div><span class="eyebrow">${escapeHtml(lobby.game)} · PRACTICE</span><h3>${escapeHtml(lobby.name)}</h3><div class="lobby-details"><span>${icon('users')} ${escapeHtml(lobby.mode)}</span><span>${icon('grid')} ${escapeHtml(lobby.map)}</span><span>${icon('calendar')} ${formatDate(lobby.start, { weekday: 'short', hour: 'numeric', minute: '2-digit' })}</span><span>${icon('user')} Host: ${escapeHtml(lobby.host)}</span></div><div class="lobby-capacity"><span>${lobby.players}/${lobby.capacity} players</span><span>${full ? 'Squad full' : `${lobby.capacity - lobby.players} open`}</span></div><div class="lobby-progress"><span style="width:${Math.min(100, lobby.players / lobby.capacity * 100)}%"></span></div><div class="lobby-actions">${joined ? `<button class="btn btn-small btn-ghost" data-action="leave-lobby" data-id="${escapeHtml(lobby.id)}">${isHost ? 'Close lobby' : 'Leave lobby'}</button>` : `<button class="btn btn-small btn-primary" data-action="join-lobby" data-id="${escapeHtml(lobby.id)}" ${full ? 'disabled' : ''}>${full ? 'Lobby full' : 'Join practice lobby'}</button>`}<span class="tag">${escapeHtml(lobby.region)}</span></div></article>`;
      }).join('') || `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">${icon('users')}</div><strong>No practice lobbies yet</strong><p>Create a local room and invite friends to join this demo.</p></div>`}</div>
      <div class="disclaimer">These are Arena practice-room listings, not BGMI or Free Fire custom rooms. Joining does not launch either game or generate game room IDs/passwords. Share the actual room details with friends in-game yourself.</div>`;
  }

  function renderLeaderboard() {
    const players = [...state.players]
      .filter((player) => leaderboardFilter === 'all' || player.game === leaderboardFilter)
      .sort((a, b) => b.rating - a.rating);
    const podium = [players[1], players[0], players[2]].filter(Boolean);
    return `${pageHeading('THE COMMUNITY CLIMB', 'Leaderboard', 'Every match moves the needle. See where the community stands this season.')}
      <div class="filters"><span class="tag upcoming">SEASON 04</span>${['all', 'Valorant', 'BGMI', 'Apex Legends', 'Rocket League'].map((game) => `<button class="filter-btn ${leaderboardFilter === game ? 'active' : ''}" data-action="leaderboard-filter" data-filter="${escapeHtml(game)}">${game === 'all' ? 'All games' : escapeHtml(game)}</button>`).join('')}<span class="muted" style="margin-left:auto;font-size:10px">Updated just now · Demo ratings</span></div>
      <section class="card leaderboard-top"><div class="leaderboard-podium">${podium.map((player, index) => { const placement = index === 1 ? 'first' : ''; const rank = index === 1 ? '01' : index === 0 ? '02' : '03'; return `<div class="podium-player ${placement}">${avatarHtml(player.username, '', '')}<strong>${escapeHtml(player.username)}</strong><span>${Number(player.rating).toLocaleString()} RP</span><div class="podium-rank">${rank}</div></div>`; }).join('')}</div></section>
      <div class="section-heading"><div><h2>All competitors</h2><p>Rating points · ${players.length} players</p></div><button class="btn btn-small btn-ghost" data-page="profile">Your player card ${icon('arrow')}</button></div>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>Rank</th><th>Player</th><th>Main game</th><th>Rating</th><th>Wins</th><th>Badge</th></tr></thead><tbody>${players.map(playerRow).join('')}</tbody></table></div>
      <div class="disclaimer">Leaderboard ratings are illustrative sample values, not verified or synced from a game publisher.</div>`;
  }

  function renderTeams() {
    const ownTeam = state.teams.find((team) => team.members.includes(state.user.username));
    return `${pageHeading('BETTER TOGETHER', 'Teams & community', 'Find your people, build a roster, and show up as a unit.', `<button class="btn btn-primary" data-action="show-modal" data-modal="team" ${ownTeam ? 'disabled title="Leave your current team before creating another."' : ''}>${icon('plus')} Create a team</button>`)}
      <div class="section-heading" style="margin-top:0"><div><h2>${ownTeam ? 'Your squad' : 'Community teams'}</h2><p>${ownTeam ? `You're on ${escapeHtml(ownTeam.name)}. Roster and membership are demo-only.` : 'A few squads looking for their next teammate.'}</p></div><span class="tag">${state.teams.length} teams</span></div>
      <div class="team-grid">${state.teams.map((team) => {
        const isMember = team.members.includes(state.user.username);
        return `<article class="card team-card"><div class="team-heading"><div class="team-logo">${escapeHtml(team.tag.slice(0, 3))}</div><div><h3>${escapeHtml(team.name)}</h3><p>${escapeHtml(team.game)} · ${team.members.length} members</p></div></div><p>${escapeHtml(team.description)}</p><div class="team-members"><div class="avatar-stack">${team.members.slice(0, 4).map((member, index) => `<div class="mini-avatar" title="${escapeHtml(member)}" style="background:${['#ffb66c','#8ed8cc','#a68aff','#f0806b'][index % 4]}">${escapeHtml(initials(member))}</div>`).join('')}</div>${isMember ? `<button class="btn btn-small btn-ghost" data-action="leave-team" data-id="${escapeHtml(team.id)}">Leave team</button>` : `<button class="btn btn-small btn-ghost" data-action="join-team" data-id="${escapeHtml(team.id)}">Request to join</button>`}</div></article>`;
      }).join('')}</div>
      <div class="disclaimer">Team creation and join requests are local demo interactions. There is no live community service or invite system connected.</div>`;
  }

  function renderProfile() {
    const verifiedMatches = state.matches.filter((match) => match.status === 'verified');
    const wins = verifiedMatches.filter((match) => match.result === 'win').length;
    const winRate = Math.round(wins / Math.max(verifiedMatches.length, 1) * 100);
    return `${pageHeading('YOUR PLAYER CARD', 'Player profile', 'Your competitive identity, all in one place.', `<button class="btn btn-primary" data-action="edit-profile">${icon('edit')} Edit profile</button>`)}
      <section class="card profile-hero">${avatarHtml(state.user.username, 'profile-avatar', state.user.avatar)}<div class="profile-intro"><h2>${escapeHtml(state.user.displayName || state.user.username)}</h2><p>@${escapeHtml(state.user.username)} · ${escapeHtml(state.user.region)} · Member since ${formatDate(state.user.joinedAt, { month: 'long', year: 'numeric' })}</p><div class="profile-badges"><span class="tag upcoming">SEASON 04 · ASCENSION</span><span class="tag">${escapeHtml(state.user.favoriteGame)} main</span><span class="tag">${state.teams.some((team) => team.members.includes(state.user.username)) ? 'Team player' : 'Solo queue'}</span></div></div><button class="btn btn-ghost" data-action="show-modal" data-modal="report">${icon('flag')} Report a player</button></section>
      <div class="profile-stat-grid"><div class="card profile-stat"><span>Rating points</span><strong>2,480</strong></div><div class="card profile-stat"><span>Verified wins</span><strong>${wins + 27}</strong></div><div class="card profile-stat"><span>Win rate</span><strong>${winRate}%</strong></div><div class="card profile-stat"><span>Community rank</span><strong>#4</strong></div></div>
      <div class="section-heading"><div><h2>Match history</h2><p>Recent verified results from your player card.</p></div><button class="btn btn-small btn-ghost" data-page="matches">See all ${icon('arrow')}</button></div>
      ${renderMatchesTable(verifiedMatches)}
      <div class="section-heading"><div><h2>About</h2><p>How you show up to the arena.</p></div></div><div class="card panel"><p style="margin:0;color:#b1b8c5;font-size:12px;line-height:1.75">${escapeHtml(state.user.bio || 'This player has not added a bio yet.')}</p></div>
      <div class="disclaimer">This is a demo player card. Profile information is stored in this browser only and is not an authenticated account.</div>`;
  }

  function renderMatchesTable(matches = state.matches) {
    if (!matches.length) return `<div class="empty-state"><div class="empty-icon">${icon('trophy')}</div><strong>No match history yet</strong><p>Your verified results will appear here after you compete.</p></div>`;
    return `<div class="table-wrap"><table class="data-table"><thead><tr><th>Match / event</th><th>Opponent</th><th>Game</th><th>Date</th><th>Result</th><th>Score</th></tr></thead><tbody>${matches.map((match) => `<tr><td><strong>${escapeHtml(match.event)}</strong></td><td>${escapeHtml(match.opponent)}</td><td>${escapeHtml(match.game)}</td><td>${formatDate(match.date, { month: 'short', day: 'numeric', year: 'numeric' })}</td><td><span class="tag ${match.result === 'win' ? 'upcoming' : 'complete'}">${escapeHtml(match.result.toUpperCase())}</span> ${match.status === 'pending' ? '<span class="tag">PENDING</span>' : ''}</td><td><strong>${escapeHtml(match.score)}</strong></td></tr>`).join('')}</tbody></table></div>`;
  }

  function renderMatches() {
    return `${pageHeading('YOUR RECORD', 'Match history', 'A clean record of your latest competitive results.', `<button class="btn btn-primary" data-action="show-modal" data-modal="match">${icon('plus')} Submit a result</button>`)}
      <div class="filters"><span class="tag upcoming">ALL GAMES</span><span class="muted" style="margin-left:auto;font-size:10px">Results are demo data · ${state.matches.length} matches</span></div>
      ${renderMatchesTable(state.matches)}
      <div class="disclaimer">Submitted results in this demo remain pending locally until you use the simulated admin verification controls. This does not contact an organizer or game API.</div>`;
  }

  function renderWallet() {
    const claimedToday = state.lastDailyReward === isoDay(new Date());
    const sponsorState = state.sponsorClaims && state.sponsorClaims.date === isoDay(new Date())
      ? { ...state.sponsorClaims, claimed: Array.isArray(state.sponsorClaims.claimed) ? state.sponsorClaims.claimed : [] }
      : { date: isoDay(new Date()), claimed: [] };
    const rewards = [
      { id: 'daily-login', name: 'Daily check-in', description: 'Show up each day and keep your streak alive.', amount: state.rewardAmounts.daily, icon: 'calendar', claimed: claimedToday, label: claimedToday ? 'Collected' : 'Claim coins' },
      { id: 'profile-ready', name: 'Player card complete', description: 'Build your profile so teammates know your game.', amount: state.rewardAmounts.profile, icon: 'user', claimed: state.claimedRewards.includes('profile-ready'), label: 'Claim coins' },
      { id: 'community-voice', name: 'Community voice', description: 'Read the latest Arena announcements.', amount: state.rewardAmounts.community, icon: 'bell', claimed: state.claimedRewards.includes('community-voice'), label: 'Claim coins' }
    ];
    const transactions = [...state.transactions].sort((a, b) => b.date.localeCompare(a.date));
    return `${pageHeading('VIRTUAL REWARDS', 'Coins & rewards', 'Earn ARC by showing up and taking part in the community.', `<span class="tag">VIRTUAL · NO CASH VALUE</span>`)}
      <section class="card wallet-hero"><div class="wallet-balance"><div class="coin-big">A</div><div><span>Your available balance</span><strong>${Number(state.coins).toLocaleString()} <span style="color:#d8bd79;font-size:13px">ARC</span></strong></div></div><button class="btn btn-primary" data-action="claim-daily" ${claimedToday ? 'disabled' : ''}>${claimedToday ? icon('check') : icon('gift')}${claimedToday ? 'Daily reward collected' : `Collect daily reward · ${state.rewardAmounts.daily} ARC`}</button></section>
      <div class="section-heading"><div><h2>Earn more coins</h2><p>Simple, non-cash rewards for being part of Arena.</p></div></div>
      <div class="reward-grid">${rewards.map((reward) => `<article class="card reward-card"><div class="reward-icon">${icon(reward.icon)}</div><h3>${reward.name}</h3><p>${reward.description}</p><div class="reward-foot"><span class="reward-value">+${reward.amount} ARC</span><button class="btn btn-small ${reward.claimed ? 'btn-ghost' : 'btn-primary'}" data-action="claim-reward" data-id="${reward.id}" ${reward.claimed ? 'disabled' : ''}>${reward.claimed ? 'Collected' : 'Claim'}</button></div></article>`).join('')}</div>
      <div class="section-heading"><div><h2>Sponsored spotlights</h2><p>Preview sample sponsor messages to try the optional reward flow · ${sponsorState.claimed.length}/3 today.</p></div><span class="tag">SPONSORED · DEMO</span></div>
      <div class="sponsor-grid">${sponsorOffers.map((sponsor) => {
        const claimed = sponsorState.claimed.includes(sponsor.id);
        return `<article class="card sponsor-card ${sponsor.color}"><div class="sponsor-label"><span class="sponsor-dot"></span>${sponsor.category}</div><h3>${sponsor.name}</h3><p>${sponsor.offer}</p><div class="sponsor-footer"><span class="reward-value">+20 ARC · DEMO</span><button class="btn btn-small ${claimed ? 'btn-ghost' : 'btn-primary'}" data-action="sponsor-preview" data-id="${sponsor.id}" ${claimed || sponsorState.claimed.length >= 3 ? 'disabled' : ''}>${claimed ? 'Claimed today' : 'View spotlight'}</button></div></article>`;
      }).join('')}</div>
      <div class="modal-note">These fictional sponsor cards are previews only—no advertisement is loaded, watched, or reported to an ad network. Completing the timed preview grants demo ARC in this browser; it is not real advertising income. A production ad network and fraud-safe backend are not connected.</div>
      <div class="section-heading"><div><h2>Coin activity</h2><p>A transparent history of your virtual rewards.</p></div></div>
      ${transactions.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th>Activity</th><th>Date</th><th>Type</th><th>Amount</th></tr></thead><tbody>${transactions.map((transaction) => `<tr><td><strong>${escapeHtml(transaction.label)}</strong></td><td>${formatDate(transaction.date, { month: 'short', day: 'numeric', year: 'numeric' })}</td><td><span class="tag upcoming">${escapeHtml(transaction.kind)}</span></td><td style="color:${transaction.amount < 0 ? 'var(--red)' : 'var(--green)'}"><strong>${transaction.amount > 0 ? '+' : ''}${transaction.amount} ARC</strong></td></tr>`).join('')}</tbody></table></div>` : `<div class="empty-state"><div class="empty-icon">${icon('coin')}</div><strong>No activity yet</strong><p>Claim your first reward to start your coin history.</p></div>`}
      <div class="disclaimer">ARC is a virtual, non-redeemable demo currency with no cash value. It cannot be purchased, withdrawn, transferred, wagered, or exchanged for real-world goods or services. No real-money payments or gambling are part of Arena.</div>`;
  }

  function renderNotifications() {
    return `${pageHeading('FROM THE ARENA', 'Announcements', 'Updates and important notes from the community team.', `<button class="btn btn-ghost" data-action="show-modal" data-modal="report">${icon('flag')} Report an issue</button>`)}
      <div class="notice-list">${state.announcements.map((notice) => `<article class="card notice-card"><div class="activity-icon">${icon('sparkles')}</div><div><strong>${escapeHtml(notice.title)}</strong><p>${escapeHtml(notice.body)}</p><span class="muted" style="display:block;margin-top:8px;font-size:9px">${formatDate(notice.date, { month: 'long', day: 'numeric', year: 'numeric' })}</span></div></article>`).join('') || `<div class="empty-state"><div class="empty-icon">${icon('bell')}</div><strong>You're all caught up</strong><p>New announcements will appear here.</p></div>`}
      <div class="disclaimer">Announcements shown here are sample content in this local demo.</div>`;
  }

  function renderSettings() {
    return `${pageHeading('YOUR PREFERENCES', 'Settings', 'Manage your demo profile and interface preferences.')}
      <div class="settings-grid"><section class="card settings-card"><h3>Player profile</h3><p>Keep your public player card up to date.</p><div class="setting-row"><span>Username</span><strong>@${escapeHtml(state.user.username)}</strong></div><div class="setting-row"><span>Favorite game</span><strong>${escapeHtml(state.user.favoriteGame)}</strong></div><div class="setting-row"><span>Profile visibility</span><button class="switch ${state.user.publicProfile ? 'on' : ''}" data-action="toggle-setting" data-setting="publicProfile" aria-label="Toggle profile visibility"></button></div><button class="btn btn-small btn-primary" style="margin-top:13px" data-action="edit-profile">${icon('edit')} Edit player card</button></section>
      <section class="card settings-card"><h3>Notifications</h3><p>Choose how this demo displays updates.</p><div class="setting-row"><span>In-app announcements</span><button class="switch ${state.user.notifications ? 'on' : ''}" data-action="toggle-setting" data-setting="notifications" aria-label="Toggle notifications"></button></div><div class="modal-note">Browser notifications are not enabled. This preference only affects the local demo interface.</div></section>
      <section class="card settings-card"><h3>About this demo</h3><p>There is no backend, real account, or remote database connected. Demo data stays in your browser's local storage.</p><div class="setting-row"><span>App version</span><strong>0.1.0 · Local demo</strong></div><div class="setting-row"><span>Authentication</span><strong style="color:var(--orange)">Not connected</strong></div></section>
      <section class="card settings-card"><h3>Reset demo data</h3><p>Restore the sample account and original tournament data on this device.</p><button class="btn btn-danger btn-small" data-action="reset-demo">${icon('close')} Reset all local demo data</button><div class="modal-note">This only clears Arena demo data for this browser. It does not affect other sites or files.</div></section></div>`;
  }

  function renderAdmin() {
    const reports = state.reports;
    const pendingMatches = state.matches.filter((match) => match.status === 'pending');
    const tabs = ['overview', 'tournaments', 'matches', 'players', 'rewards', 'announcements', 'reports'];
    let content = '';
    if (adminTab === 'overview') {
      content = `<div class="admin-grid"><div class="card admin-stat"><span>Registered players</span><strong>${(state.players.length + 127).toLocaleString()}</strong><small>+12% this month</small></div><div class="card admin-stat"><span>Active tournaments</span><strong>${state.tournaments.filter((item) => tournamentState(item) !== 'complete').length}</strong><small>Across 4 game titles</small></div><div class="card admin-stat"><span>Pending verification</span><strong>${pendingMatches.length}</strong><small>${reports.length} open reports</small></div><div class="card admin-stat"><span>Participation</span><strong>${state.tournaments.reduce((sum, item) => sum + item.players, 0)}</strong><small>Sample registrations</small></div></div>
        <div class="section-heading"><div><h2>Console activity</h2><p>Quick actions for the sample admin console.</p></div></div><div class="team-grid"><div class="card panel"><div class="panel-title"><div><h3>Manage tournaments</h3><p>Create or update local demo events.</p></div></div><button class="btn btn-small btn-primary" style="margin-top:15px" data-action="admin-tab" data-tab="tournaments">${icon('trophy')} Open tournaments</button></div><div class="card panel"><div class="panel-title"><div><h3>Verify match results</h3><p>Review and approve submitted results.</p></div></div><button class="btn btn-small btn-ghost" style="margin-top:15px" data-action="admin-tab" data-tab="matches">${icon('check')} Review matches</button></div><div class="card panel"><div class="panel-title"><div><h3>Community reports</h3><p>Review reports submitted from player screens.</p></div></div><button class="btn btn-small btn-ghost" style="margin-top:15px" data-action="admin-tab" data-tab="reports">${icon('flag')} Review reports</button></div></div>`;
    } else if (adminTab === 'tournaments') {
      content = `<div class="section-heading" style="margin-top:0"><div><h2>Tournament management</h2><p>Changes are stored only in this browser.</p></div><button class="btn btn-primary btn-small" data-action="show-modal" data-modal="tournament">${icon('plus')} Create tournament</button></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Event</th><th>Status</th><th>Schedule</th><th>Players</th><th>Prize</th><th>Actions</th></tr></thead><tbody>${state.tournaments.map((item) => `<tr><td><strong>${escapeHtml(item.name)}</strong><br><span class="muted" style="font-size:9px">${escapeHtml(item.game)} · ${escapeHtml(item.mode)}</span></td><td><span class="tag ${tournamentState(item) === 'live' ? 'live' : tournamentState(item) === 'complete' ? 'complete' : 'upcoming'}">${tournamentState(item)}</span></td><td>${formatDate(item.start, { month: 'short', day: 'numeric', hour: 'numeric' })}</td><td>${item.players}/${item.capacity}</td><td>${Number(item.prize).toLocaleString()} ARC</td><td><div class="table-actions"><button class="btn btn-small btn-ghost" data-action="edit-tournament" data-id="${escapeHtml(item.id)}">Edit</button><button class="btn btn-small btn-ghost" data-action="toggle-tournament" data-id="${escapeHtml(item.id)}">${item.status === 'complete' ? 'Reopen' : 'Complete'}</button></div></td></tr>`).join('')}</tbody></table></div>`;
    } else if (adminTab === 'matches') {
      content = `<div class="section-heading" style="margin-top:0"><div><h2>Match verification</h2><p>Confirm results submitted to this demo.</p></div></div>${state.matches.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th>Event</th><th>Players</th><th>Result</th><th>Status</th><th>Actions</th></tr></thead><tbody>${state.matches.map((match) => `<tr><td><strong>${escapeHtml(match.event)}</strong></td><td>${escapeHtml(state.user.username)} vs ${escapeHtml(match.opponent)}</td><td>${escapeHtml(match.score)}</td><td><span class="tag ${match.status === 'verified' ? 'upcoming' : 'live'}">${match.status}</span></td><td>${match.status === 'pending' ? `<button class="btn btn-small btn-primary" data-action="verify-match" data-id="${escapeHtml(match.id)}">${icon('check')} Verify</button>` : '<span class="muted">Verified</span>'}</td></tr>`).join('')}</tbody></table></div>` : '<div class="empty-state"><strong>No match submissions</strong></div>'}`;
    } else if (adminTab === 'players') {
      content = `<div class="section-heading" style="margin-top:0"><div><h2>Player directory</h2><p>Sample player data · moderation changes are local.</p></div></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Player</th><th>Game</th><th>Rating</th><th>Wins</th><th>Moderation</th></tr></thead><tbody>${[...state.players].sort((a, b) => b.rating - a.rating).map((player) => `<tr><td><div class="table-player"><div class="mini-avatar" style="background:${escapeHtml(player.color)}">${escapeHtml(player.initials)}</div><strong>${escapeHtml(player.username)}</strong></div></td><td>${escapeHtml(player.game)}</td><td>${Number(player.rating).toLocaleString()}</td><td>${player.wins}</td><td>${state.mutedPlayers.includes(player.username) ? `<button class="btn btn-small btn-ghost" data-action="moderate-player" data-id="${escapeHtml(player.username)}">Unmute</button>` : `<button class="btn btn-small btn-ghost" data-action="moderate-player" data-id="${escapeHtml(player.username)}">Mute</button>`}</td></tr>`).join('')}</tbody></table></div>`;
    } else if (adminTab === 'rewards') {
      content = `<div class="section-heading" style="margin-top:0"><div><h2>Reward overview</h2><p>Adjust virtual demo rewards. No cash value or redemption.</p></div><span class="tag">NON-REDEEMABLE</span></div><div class="admin-grid"><div class="card admin-stat"><span>Coin economy</span><strong>ARC</strong><small>Virtual demo currency</small></div><div class="card admin-stat"><span>Rewards available</span><strong>3</strong><small>Daily and activity</small></div><div class="card admin-stat"><span>Redemptions</span><strong>0</strong><small>Not supported</small></div><div class="card admin-stat"><span>Real-money flows</span><strong>Off</strong><small>Not implemented</small></div></div><section class="card panel" style="margin-top:14px"><div class="panel-title"><div><h3>Reward values</h3><p>Amounts update the local wallet reward catalog.</p></div></div><form data-form="reward-config" style="margin-top:15px"><div class="form-grid"><div class="field"><label for="reward-daily">Daily check-in · ARC</label><input id="reward-daily" name="daily" type="number" min="0" max="1000" value="${state.rewardAmounts.daily}" required></div><div class="field"><label for="reward-profile">Player card · ARC</label><input id="reward-profile" name="profile" type="number" min="0" max="1000" value="${state.rewardAmounts.profile}" required></div><div class="field"><label for="reward-community">Community voice · ARC</label><input id="reward-community" name="community" type="number" min="0" max="1000" value="${state.rewardAmounts.community}" required></div></div><div class="form-actions"><button class="btn btn-primary" type="submit">Save reward values</button></div></form></section><div class="modal-note">Reward balances are browser-local demo values. Reward changes do not create a real wallet, payment, redemption, or transferable value.</div>`;
    } else if (adminTab === 'announcements') {
      content = `<div class="section-heading" style="margin-top:0"><div><h2>Community announcements</h2><p>Publish a message to the local announcements feed.</p></div><button class="btn btn-primary btn-small" data-action="show-modal" data-modal="announcement">${icon('plus')} New announcement</button></div><div class="notice-list">${state.announcements.map((notice) => `<article class="card notice-card"><div class="activity-icon">${icon('sparkles')}</div><div style="flex:1"><strong>${escapeHtml(notice.title)}</strong><p>${escapeHtml(notice.body)}</p><span class="muted" style="display:block;margin-top:7px;font-size:9px">${formatDate(notice.date, { month: 'long', day: 'numeric', year: 'numeric' })}</span></div><button class="icon-button" data-action="delete-announcement" data-id="${escapeHtml(notice.id)}" aria-label="Delete announcement">${icon('close')}</button></article>`).join('') || '<div class="empty-state"><strong>No announcements</strong></div>'}</div>`;
    } else if (adminTab === 'reports') {
      content = `<div class="section-heading" style="margin-top:0"><div><h2>Abuse & issue reports</h2><p>Review community reports created in this browser.</p></div></div>${reports.length ? `<div class="notice-list">${reports.map((report) => `<article class="card notice-card"><div class="activity-icon" style="color:var(--orange)">${icon('flag')}</div><div style="flex:1"><strong>${escapeHtml(report.category)} · ${escapeHtml(report.target)}</strong><p>${escapeHtml(report.details)}</p><span class="muted" style="display:block;margin-top:7px;font-size:9px">${formatDate(report.date, { month: 'long', day: 'numeric', year: 'numeric' })} · ${escapeHtml(report.status)}</span></div>${report.status === 'open' ? `<button class="btn btn-small btn-ghost" data-action="resolve-report" data-id="${escapeHtml(report.id)}">Resolve</button>` : '<span class="tag upcoming">CLOSED</span>'}</article>`).join('')}</div>` : `<div class="empty-state"><div class="empty-icon">${icon('check')}</div><strong>No reports to review</strong><p>Reports submitted by players will be listed here.</p></div>`}`;
    }
    return `${pageHeading('STAFF WORKSPACE · DEMO MODE', 'Admin console', 'Manage sample community content. This console has no server or access control.')}<div class="admin-tabs" role="tablist">${tabs.map((tab) => `<button class="admin-tab ${adminTab === tab ? 'active' : ''}" data-action="admin-tab" data-tab="${tab}" role="tab" aria-selected="${adminTab === tab}">${tab[0].toUpperCase() + tab.slice(1)}</button>`).join('')}</div>${content}<div class="disclaimer">Admin actions are for local demonstration only. This client-side console has no authentication or authorization and must not be used to manage real players, tournaments, or private information.</div>`;
  }

  function renderPage() {
    const outlet = document.querySelector('#page-content');
    if (!outlet) return;
    const pages = {
      overview: renderOverview, tournaments: renderTournaments, 'tournament-detail': renderTournamentDetail, play: renderPlay,
      leaderboard: renderLeaderboard, teams: renderTeams, profile: renderProfile, wallet: renderWallet,
      admin: renderAdmin, settings: renderSettings, notifications: renderNotifications, matches: renderMatches
    };
    outlet.innerHTML = (pages[currentPage] || renderOverview)();
  }

  function renderModal() {
    const tournament = state.tournaments.find((item) => item.id === selectedTournament);
    let heading = '';
    let body = '';
    if (modalKind === 'profile') {
      heading = ['Update your player card', 'A demo profile saved only in this browser. No password or real account is created.'];
      body = `<form data-form="profile"><div class="form-grid">
        <div class="field"><label for="profile-username">Player username</label><input id="profile-username" name="username" required maxlength="20" pattern="[A-Za-z0-9_]{3,20}" value="${escapeHtml(state.user.username)}" autocomplete="off"></div>
        <div class="field"><label for="profile-name">Display name</label><input id="profile-name" name="displayName" required maxlength="30" value="${escapeHtml(state.user.displayName)}"></div>
        <div class="field"><label for="profile-game">Favorite game</label><select id="profile-game" name="favoriteGame">${['Valorant', 'BGMI', 'Apex Legends', 'Call of Duty: Mobile', 'Rocket League', 'Other'].map((game) => `<option ${state.user.favoriteGame === game ? 'selected' : ''}>${game}</option>`).join('')}</select></div>
        <div class="field"><label for="profile-region">Region</label><select id="profile-region" name="region">${['South Asia', 'India', 'Asia', 'North America', 'Europe', 'Global'].map((region) => `<option ${state.user.region === region ? 'selected' : ''}>${region}</option>`).join('')}</select></div>
        <div class="field full"><label for="profile-bio">Player bio</label><textarea id="profile-bio" name="bio" maxlength="180" placeholder="A little about your playstyle…">${escapeHtml(state.user.bio)}</textarea></div>
        <div class="field full"><label for="profile-avatar">Profile photo URL (optional)</label><input id="profile-avatar" name="avatar" type="url" maxlength="300" value="${escapeHtml(state.user.avatar)}" placeholder="https://example.com/photo.jpg"></div>
      </div><div class="modal-note">For this offline demo, profile updates save on this device only. Never enter passwords or sensitive information here.</div><div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">Cancel</button><button class="btn btn-primary" type="submit">Save player card</button></div></form>`;
    } else if (modalKind === 'register') {
      const eligibleTeams = state.teams.filter((team) => team.members.includes(state.user.username));
      heading = ['Register for the event', `${tournament ? escapeHtml(tournament.name) : ''} · No entry fee · Local demo registration`];
      body = `<form data-form="register" data-id="${escapeHtml(selectedTournament)}"><div class="field"><label for="register-type">Registration type</label><select id="register-type" name="type"><option value="solo">Solo / individual</option>${eligibleTeams.map((team) => `<option value="${escapeHtml(team.id)}">Team · ${escapeHtml(team.name)}</option>`).join('')}</select></div><div class="modal-note">No coins are spent to enter. Registration will be recorded only in this browser and is not sent to a tournament organizer.</div><div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">Cancel</button><button class="btn btn-primary" type="submit">Confirm registration</button></div></form>`;
    } else if (modalKind === 'team') {
      heading = ['Create a team', 'Build a squad for your next tournament.'];
      body = `<form data-form="team"><div class="form-grid"><div class="field"><label for="team-name">Team name</label><input id="team-name" name="name" required maxlength="28" placeholder="e.g. Neon Outlaws"></div><div class="field"><label for="team-tag">Team tag</label><input id="team-tag" name="tag" required maxlength="5" pattern="[A-Za-z0-9]{2,5}" placeholder="NEON"></div><div class="field"><label for="team-game">Main game</label><select id="team-game" name="game"><option>Valorant</option><option>BGMI</option><option>Apex Legends</option><option>Call of Duty: Mobile</option><option>Rocket League</option></select></div><div class="field full"><label for="team-description">Team description</label><textarea id="team-description" name="description" maxlength="120" placeholder="Tell players what your squad is about."></textarea></div></div><div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">Cancel</button><button class="btn btn-primary" type="submit">Create local team</button></div></form>`;
    } else if (modalKind === 'lobby') {
      heading = ['Create a practice lobby', 'Set up a local player list for your next mobile-game session.'];
      body = `<form data-form="lobby"><div class="form-grid"><div class="field"><label for="lobby-game">Game</label><select id="lobby-game" name="game" data-lobby-game><option>BGMI</option><option>Free Fire</option></select></div><div class="field"><label for="lobby-name">Lobby name</label><input id="lobby-name" name="name" maxlength="40" required placeholder="Friday squad practice"></div><div class="field"><label for="lobby-mode">Mode</label><select id="lobby-mode" name="mode" data-lobby-mode></select></div><div class="field"><label for="lobby-map">Map</label><select id="lobby-map" name="map" data-lobby-map></select></div><div class="field"><label for="lobby-region">Region</label><select id="lobby-region" name="region"><option>India</option><option>South Asia</option><option>Global</option></select></div><div class="field"><label for="lobby-capacity">Squad size</label><select id="lobby-capacity" name="capacity"><option value="2">2 players</option><option value="4" selected>4 players</option></select></div><div class="field full"><label for="lobby-start">Practice time</label><input id="lobby-start" name="start" type="datetime-local" required value="${toLocalDateTimeValue(plusDays(0, new Date().getHours() + 1))}"></div></div><div class="modal-note">This creates an Arena coordination card only. It will not create a room inside BGMI or Free Fire or show any in-game room code.</div><div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">Cancel</button><button class="btn btn-primary" type="submit">Create local lobby</button></div></form>`;
    } else if (modalKind === 'sponsor') {
      const sponsor = sponsorOffers.find((offer) => offer.id === (sponsorSession && sponsorSession.id));
      if (!sponsor) return '';
      heading = ['Sponsored spotlight · demo', `${escapeHtml(sponsor.name)} · sample sponsor message`];
      body = `<div class="sponsor-preview ${sponsor.color}"><span class="sponsor-label">${escapeHtml(sponsor.category)}</span><div class="sponsor-preview-mark">${sponsor.id === 'pulse' ? 'P' : sponsor.id === 'dropzone' ? 'D' : 'H'}</div><h3>${escapeHtml(sponsor.name)}</h3><p>${escapeHtml(sponsor.offer)}</p></div><div class="sponsor-progress"><span id="sponsor-progress-fill"></span></div><div class="sponsor-countdown" id="sponsor-countdown">Preview starts…</div><div class="modal-note">Demo only: this is not an advertisement and no sponsor receives viewing or click data. A real ad provider is not connected. Completing this preview adds virtual, non-redeemable ARC to your local balance.</div><div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">Close</button><button type="button" class="btn btn-primary" data-action="claim-sponsor" disabled>${icon('gift')} Claim 20 demo ARC</button></div>`;
    } else if (modalKind === 'tournament') {
      heading = ['Create tournament', 'Add a sample event to the local tournament list.'];
      body = `<form data-form="tournament"><div class="form-grid"><div class="field"><label for="t-name">Tournament name</label><input id="t-name" name="name" required maxlength="40"></div><div class="field"><label for="t-game">Game</label><select id="t-game" name="game"><option>Valorant</option><option>BGMI</option><option>Apex Legends</option><option>Call of Duty: Mobile</option><option>Rocket League</option></select></div><div class="field"><label for="t-mode">Mode</label><input id="t-mode" name="mode" required maxlength="20" placeholder="5v5 / Solo / Trios"></div><div class="field"><label for="t-start">Start date & time</label><input id="t-start" name="start" type="datetime-local" required></div><div class="field"><label for="t-capacity">Player capacity</label><input id="t-capacity" name="capacity" type="number" min="2" max="512" value="64" required></div><div class="field"><label for="t-prize">Virtual prize (ARC)</label><input id="t-prize" name="prize" type="number" min="0" max="1000000" value="500" required></div><div class="field"><label for="t-platform">Platform</label><input id="t-platform" name="platform" maxlength="25" value="PC"></div><div class="field"><label for="t-region">Region</label><input id="t-region" name="region" maxlength="25" value="Global"></div><div class="field full"><label for="t-description">Description</label><textarea id="t-description" name="description" required maxlength="300"></textarea></div><div class="field full"><label for="t-rules">Rules</label><textarea id="t-rules" name="rules" required maxlength="500"></textarea></div></div><div class="modal-note">ARC prize values are virtual sample data with no cash value. Creating this item does not publish an actual tournament.</div><div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">Cancel</button><button class="btn btn-primary" type="submit">Create event</button></div></form>`;
    } else if (modalKind === 'edit-tournament' && tournament) {
      heading = ['Edit tournament', `Update ${escapeHtml(tournament.name)} · changes stay in this browser.`];
      body = `<form data-form="edit-tournament" data-id="${escapeHtml(tournament.id)}"><div class="form-grid">
        <div class="field"><label for="e-name">Tournament name</label><input id="e-name" name="name" value="${escapeHtml(tournament.name)}" required maxlength="40"></div>
        <div class="field"><label for="e-game">Game</label><select id="e-game" name="game">${['Valorant', 'BGMI', 'Apex Legends', 'Call of Duty: Mobile', 'Rocket League'].map((game) => `<option ${tournament.game === game ? 'selected' : ''}>${game}</option>`).join('')}</select></div>
        <div class="field"><label for="e-mode">Mode</label><input id="e-mode" name="mode" value="${escapeHtml(tournament.mode)}" required maxlength="20"></div>
        <div class="field"><label for="e-status">Status</label><select id="e-status" name="status">${['upcoming', 'live', 'complete'].map((status) => `<option value="${status}" ${tournament.status === status ? 'selected' : ''}>${status[0].toUpperCase() + status.slice(1)}</option>`).join('')}</select></div>
        <div class="field"><label for="e-start">Start date & time</label><input id="e-start" name="start" type="datetime-local" value="${toLocalDateTimeValue(tournament.start)}" required></div>
        <div class="field"><label for="e-capacity">Player capacity</label><input id="e-capacity" name="capacity" type="number" min="${Math.max(2, tournament.players)}" max="512" value="${tournament.capacity}" required></div>
        <div class="field"><label for="e-prize">Virtual prize · ARC</label><input id="e-prize" name="prize" type="number" min="0" max="1000000" value="${tournament.prize}" required></div>
        <div class="field"><label for="e-platform">Platform</label><input id="e-platform" name="platform" maxlength="25" value="${escapeHtml(tournament.platform)}"></div>
        <div class="field"><label for="e-region">Region</label><input id="e-region" name="region" maxlength="25" value="${escapeHtml(tournament.region)}"></div>
        <div class="field"><label for="e-format">Format</label><input id="e-format" name="format" maxlength="40" value="${escapeHtml(tournament.format)}"></div>
        <div class="field full"><label for="e-description">Description</label><textarea id="e-description" name="description" required maxlength="300">${escapeHtml(tournament.description)}</textarea></div>
        <div class="field full"><label for="e-rules">Rules</label><textarea id="e-rules" name="rules" required maxlength="500">${escapeHtml(tournament.rules)}</textarea></div>
      </div><div class="modal-note">Prize amounts are virtual sample ARC only. Saving does not publish or update an external tournament.</div><div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">Cancel</button><button class="btn btn-primary" type="submit">Save event</button></div></form>`;
    } else if (modalKind === 'announcement') {
      heading = ['New announcement', 'Post a message to the local community feed.'];
      body = `<form data-form="announcement"><div class="form-grid"><div class="field full"><label for="a-title">Title</label><input id="a-title" name="title" required maxlength="60"></div><div class="field full"><label for="a-body">Message</label><textarea id="a-body" name="body" required maxlength="300"></textarea></div></div><div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">Cancel</button><button class="btn btn-primary" type="submit">Publish locally</button></div></form>`;
    } else if (modalKind === 'report') {
      heading = ['Report an issue', 'Help keep the community fair and welcoming.'];
      body = `<form data-form="report"><div class="form-grid"><div class="field"><label for="report-category">Report category</label><select id="report-category" name="category"><option>Player conduct</option><option>Match result</option><option>Tournament issue</option><option>Technical problem</option><option>Other</option></select></div><div class="field"><label for="report-target">Player / event (optional)</label><input id="report-target" name="target" maxlength="60" placeholder="Name or event"></div><div class="field full"><label for="report-details">What happened?</label><textarea id="report-details" name="details" required maxlength="400" placeholder="Share only the relevant details. Avoid including private information."></textarea></div></div><div class="modal-note">This report is saved locally and is not sent to a moderation team. Do not include passwords, personal contact details, or other sensitive information.</div><div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">Cancel</button><button class="btn btn-primary" type="submit">Submit demo report</button></div></form>`;
    } else if (modalKind === 'match') {
      heading = ['Submit a match result', 'Add a result to your local player history.'];
      body = `<form data-form="match"><div class="form-grid"><div class="field full"><label for="m-event">Event name</label><input id="m-event" name="event" required maxlength="60"></div><div class="field"><label for="m-opponent">Opponent</label><input id="m-opponent" name="opponent" required maxlength="30"></div><div class="field"><label for="m-game">Game</label><select id="m-game" name="game"><option>Valorant</option><option>BGMI</option><option>Apex Legends</option><option>Call of Duty: Mobile</option><option>Rocket League</option></select></div><div class="field"><label for="m-result">Result</label><select id="m-result" name="result"><option value="win">Win</option><option value="loss">Loss</option></select></div><div class="field"><label for="m-score">Score / placement</label><input id="m-score" name="score" required maxlength="30" placeholder="13 : 9"></div></div><div class="modal-note">The result will be marked pending until an admin uses the demo verification tool. This is not official match verification.</div><div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">Cancel</button><button class="btn btn-primary" type="submit">Submit for review</button></div></form>`;
    } else if (modalKind === 'edit-tournament') {
      heading = ['Update event status', 'Change the sample tournament status.'];
      body = `<div class="field"><label for="edit-status">Status</label><select id="edit-status"><option value="upcoming" ${tournament && tournament.status === 'upcoming' ? 'selected' : ''}>Upcoming</option><option value="live" ${tournament && tournament.status === 'live' ? 'selected' : ''}>Live</option><option value="complete" ${tournament && tournament.status === 'complete' ? 'selected' : ''}>Completed</option></select></div><div class="form-actions"><button class="btn btn-ghost" data-action="close-modal">Cancel</button><button class="btn btn-primary" data-action="save-tournament-status" data-id="${escapeHtml(selectedTournament)}">Save status</button></div>`;
    }
    if (!heading) return '';
    return `<div class="modal-backdrop" data-action="backdrop-close"><section class="modal ${['tournament', 'lobby'].includes(modalKind) ? 'wide' : ''}" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-head"><div><h2 id="modal-title">${heading[0]}</h2><p>${heading[1]}</p></div><button class="icon-button modal-x" data-action="close-modal" aria-label="Close dialog">${icon('close')}</button></div>${body}</section></div>`;
  }

  function changePage(page) {
    if (!pageTitles[page]) return;
    if (page !== 'play') stopAimGame();
    currentPage = page;
    modalKind = '';
    const hash = `#${page === 'tournament-detail' ? 'tournaments' : page}`;
    if (location.hash !== hash) history.pushState(null, '', hash);
    renderShell();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openTournament(id) {
    if (!state.tournaments.some((item) => item.id === id)) return;
    stopAimGame();
    selectedTournament = id;
    currentPage = 'tournament-detail';
    const hash = `#tournament/${encodeURIComponent(id)}`;
    if (location.hash !== hash) history.pushState(null, '', hash);
    renderShell();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openModal(kind) {
    modalKind = kind;
    renderShell();
    const firstInput = document.querySelector('.modal input, .modal select, .modal textarea');
    if (firstInput) firstInput.focus();
    if (kind === 'lobby') updateLobbyOptions('BGMI');
    if (kind === 'sponsor' && sponsorSession) {
      const countdown = document.querySelector('#sponsor-countdown');
      const progress = document.querySelector('#sponsor-progress-fill');
      const claimButton = document.querySelector('[data-action="claim-sponsor"]');
      sponsorSession.startedAt = Date.now();
      clearInterval(sponsorTimer);
      sponsorTimer = window.setInterval(() => {
        const remaining = Math.max(0, 5 - (Date.now() - sponsorSession.startedAt) / 1000);
        if (countdown) countdown.textContent = remaining > 0 ? `Preview demo message · ${remaining.toFixed(1)}s` : 'Demo preview complete';
        if (progress) progress.style.width = `${(1 - remaining / 5) * 100}%`;
        if (remaining === 0) {
          if (claimButton) claimButton.disabled = false;
          clearInterval(sponsorTimer);
        }
      }, 100);
    }
  }

  function updateLobbyOptions(game) {
    const modeSelect = document.querySelector('[data-lobby-mode]');
    const mapSelect = document.querySelector('[data-lobby-map]');
    if (!modeSelect || !mapSelect) return;
    const options = game === 'Free Fire'
      ? { modes: ['Squad · Clash Squad', 'Duo · Battle Royale', 'Squad · Battle Royale', 'Solo · Battle Royale'], maps: ['Bermuda', 'Purgatory', 'Kalahari'] }
      : { modes: ['Squad · TPP', 'Duo · TPP', 'Squad · FPP', 'Solo · TPP'], maps: ['Erangel', 'Miramar', 'Sanhok'] };
    modeSelect.replaceChildren(...options.modes.map((value) => new Option(value, value)));
    mapSelect.replaceChildren(...options.maps.map((value) => new Option(value, value)));
  }

  function closeModal() {
    clearInterval(sponsorTimer);
    modalKind = '';
    sponsorSession = null;
    renderShell();
  }

  function placeAimTarget() {
    const target = document.querySelector('.aim-target');
    if (!target) return;
    target.style.left = `${5 + Math.random() * 84}%`;
    target.style.top = `${7 + Math.random() * 78}%`;
  }

  function startAimGame() {
    clearInterval(aimTimer);
    aimSession = { active: true, score: 0, remaining: 30, startedAt: Date.now() };
    renderPage();
    placeAimTarget();
    aimTimer = window.setInterval(() => {
      if (!aimSession || !aimSession.active) { clearInterval(aimTimer); return; }
      aimSession.remaining = Math.max(0, 30 - Math.floor((Date.now() - aimSession.startedAt) / 1000));
      const timer = document.querySelector('#aim-timer');
      if (timer) timer.textContent = `${aimSession.remaining}s`;
      if (aimSession.remaining <= 0) finishAimGame();
    }, 200);
  }

  function finishAimGame() {
    if (!aimSession || !aimSession.active) return;
    aimSession.active = false;
    clearInterval(aimTimer);
    const score = aimSession.score;
    if (score > Number(state.arcadeBest || 0)) state.arcadeBest = score;
    saveState();
    renderPage();
    toast(`Round over — ${score} hits. Best score: ${state.arcadeBest}.`);
  }

  function stopAimGame() {
    if (!aimSession || !aimSession.active) return;
    aimSession.active = false;
    clearInterval(aimTimer);
  }

  function addCoins(label, amount) {
    state.coins = Number(state.coins || 0) + amount;
    state.transactions.push({ id: `tx-${Date.now()}`, label, amount, kind: 'earned', date: isoDay(new Date()) });
  }

  function getFormData(form) {
    return Object.fromEntries(new FormData(form).entries());
  }

  function updateUsername(oldUsername, newUsername) {
    if (oldUsername === newUsername) return;
    state.players.forEach((player) => {
      if (player.username === oldUsername) {
        player.username = newUsername;
        player.initials = initials(newUsername);
      }
    });
    state.teams.forEach((team) => { team.members = team.members.map((member) => member === oldUsername ? newUsername : member); });
    state.matches.forEach((match) => { if (match.player === oldUsername) match.player = newUsername; });
  }

  function handleForm(form) {
    const formData = getFormData(form);
    const type = form.dataset.form;
    if (type === 'profile') {
      const username = formData.username.trim();
      if (!/^[A-Za-z0-9_]{3,20}$/.test(username)) {
        toast('Username must be 3–20 characters using letters, numbers, or underscores.', 'error');
        return;
      }
      const old = state.user.username;
      if (state.players.some((player) => player.username.toLowerCase() === username.toLowerCase() && player.username !== old)) {
        toast('That username is already used by another sample player.', 'error');
        return;
      }
      state.user = { ...state.user, ...formData, username, displayName: formData.displayName.trim(), bio: formData.bio.trim(), avatar: formData.avatar.trim() };
      updateUsername(old, username);
      if (!state.players.some((player) => player.username === username)) {
        state.players.push({ username, rating: 2480, wins: 31, game: state.user.favoriteGame, initials: initials(username), color: '#f0806b' });
      } else {
        const player = state.players.find((item) => item.username === username);
        player.game = state.user.favoriteGame;
        player.initials = initials(username);
      }
      saveState(); modalKind = ''; renderShell(); toast('Your local player card has been updated.');
    } else if (type === 'register') {
      const id = form.dataset.id;
      const item = state.tournaments.find((event) => event.id === id);
      if (!item || item.players >= item.capacity || state.registrations.some((registration) => registration.tournamentId === id)) {
        toast('Registration is no longer available for this event.', 'error'); closeModal(); return;
      }
      const team = state.teams.find((candidate) => candidate.id === formData.type);
      state.registrations.push({ tournamentId: id, username: state.user.username, teamName: team ? team.name : '', date: isoDay(new Date()) });
      item.players += 1;
      saveState(); modalKind = ''; renderShell(); toast(`You're registered for ${item.name}.`);
    } else if (type === 'team') {
      const name = formData.name.trim();
      if (state.teams.some((team) => team.members.includes(state.user.username))) {
        toast('Leave your current team before creating another.', 'error'); return;
      }
      if (state.teams.some((team) => team.name.toLowerCase() === name.toLowerCase())) {
        toast('A team with that name already exists.', 'error'); return;
      }
      const team = { id: `team-${Date.now()}`, name, tag: formData.tag.toUpperCase(), game: formData.game, members: [state.user.username], description: formData.description.trim() || 'A new team looking for its first tournament.' };
      state.teams.unshift(team);
      saveState(); modalKind = ''; renderShell(); toast(`${name} is ready for its first tournament.`);
    } else if (type === 'lobby') {
      const start = new Date(formData.start);
      const capacity = Number(formData.capacity);
      if (Number.isNaN(start.getTime()) || start < new Date() || ![2, 4].includes(capacity)) {
        toast('Choose a future practice time and a valid squad size.', 'error'); return;
      }
      const lobby = {
        id: `lobby-${Date.now()}`, game: formData.game, name: formData.name.trim(),
        mode: formData.mode, map: formData.map, region: formData.region,
        players: 1, capacity, host: state.user.username, start: start.toISOString()
      };
      state.lobbies.unshift(lobby);
      state.joinedLobbyIds.push(lobby.id);
      saveState(); modalKind = ''; lobbyFilter = 'all'; renderShell(); toast('Your local practice lobby is open.');
    } else if (type === 'tournament') {
      const start = new Date(formData.start);
      if (Number.isNaN(start.getTime()) || Number(formData.capacity) < 2 || Number(formData.prize) < 0) {
        toast('Check the date, capacity, and virtual prize amount.', 'error'); return;
      }
      const game = formData.game;
      const newEvent = { id: `event-${Date.now()}`, name: formData.name.trim(), game, mode: formData.mode.trim(), status: 'upcoming', start: start.toISOString(), prize: Number(formData.prize), players: 0, capacity: Number(formData.capacity), platform: formData.platform.trim() || 'PC', region: formData.region.trim() || 'Global', format: 'Single elimination', description: formData.description.trim(), rules: formData.rules.trim(), organizer: 'Arena Community', monogram: initials(game).slice(0, 1), glow: 'rgba(201,255,87,.3)' };
      state.tournaments.unshift(newEvent);
      saveState(); modalKind = ''; adminTab = 'tournaments'; renderShell(); toast('Sample tournament created.');
    } else if (type === 'edit-tournament') {
      const item = state.tournaments.find((event) => event.id === form.dataset.id);
      const start = new Date(formData.start);
      if (!item || Number.isNaN(start.getTime()) || Number(formData.capacity) < item.players || Number(formData.prize) < 0) {
        toast('Check the event details. Capacity cannot be lower than current registrations.', 'error'); return;
      }
      Object.assign(item, {
        name: formData.name.trim(), game: formData.game, mode: formData.mode.trim(), status: formData.status,
        start: start.toISOString(), capacity: Number(formData.capacity), prize: Number(formData.prize),
        platform: formData.platform.trim() || 'PC', region: formData.region.trim() || 'Global',
        format: formData.format.trim(), description: formData.description.trim(), rules: formData.rules.trim(),
        monogram: initials(formData.game).slice(0, 1)
      });
      if (item.status === 'complete' && !item.winner) item.winner = 'Pending organizer result';
      if (item.status !== 'complete' && item.winner === 'Pending organizer result') delete item.winner;
      saveState(); modalKind = ''; adminTab = 'tournaments'; renderShell(); toast('Tournament details updated in this demo.');
    } else if (type === 'reward-config') {
      const amounts = [formData.daily, formData.profile, formData.community].map(Number);
      if (amounts.some((amount) => !Number.isInteger(amount) || amount < 0 || amount > 1000)) {
        toast('Reward amounts must be whole numbers from 0 to 1,000 ARC.', 'error'); return;
      }
      state.rewardAmounts = { daily: amounts[0], profile: amounts[1], community: amounts[2] };
      saveState(); renderPage(); toast('Virtual reward values updated.');
    } else if (type === 'announcement') {
      state.announcements.unshift({ id: `ann-${Date.now()}`, title: formData.title.trim(), body: formData.body.trim(), date: isoDay(new Date()) });
      saveState(); modalKind = ''; renderShell(); toast('Announcement published to the local feed.');
    } else if (type === 'report') {
      state.reports.unshift({ id: `report-${Date.now()}`, category: formData.category, target: formData.target.trim() || 'Community', details: formData.details.trim(), date: isoDay(new Date()), status: 'open' });
      saveState(); modalKind = ''; renderShell(); toast('Demo report saved locally.');
    } else if (type === 'match') {
      state.matches.unshift({ id: `match-${Date.now()}`, event: formData.event.trim(), opponent: formData.opponent.trim(), game: formData.game, date: isoDay(new Date()), result: formData.result, score: formData.score.trim(), status: 'pending' });
      saveState(); modalKind = ''; renderShell(); toast('Match result submitted for demo review.');
    }
  }

  function handleAction(target) {
    const actionElement = target.closest('[data-action]');
    if (!actionElement) return;
    const { action, id } = actionElement.dataset;
    if (action === 'close-modal') { closeModal(); return; }
    if (action === 'backdrop-close' && target === actionElement) { closeModal(); return; }
    if (action === 'go-settings') { changePage('settings'); return; }
    if (action === 'show-modal') { openModal(actionElement.dataset.modal); return; }
    if (action === 'edit-profile') { openModal('profile'); return; }
    if (action === 'tournament-open') { openTournament(id); return; }
    if (action === 'register') { selectedTournament = id; openModal('register'); return; }
    if (action === 'start-aim') { startAimGame(); return; }
    if (action === 'aim-hit') {
      if (!aimSession || !aimSession.active) return;
      aimSession.score += 1;
      const score = document.querySelector('#aim-score');
      if (score) score.textContent = String(aimSession.score);
      placeAimTarget();
      return;
    }
    if (action === 'lobby-filter') { lobbyFilter = actionElement.dataset.filter; renderPage(); return; }
    if (action === 'join-lobby') {
      const lobby = state.lobbies.find((item) => item.id === id);
      if (!lobby || lobby.players >= lobby.capacity || state.joinedLobbyIds.includes(id)) {
        toast('That practice lobby is full or no longer available.', 'error'); return;
      }
      lobby.players += 1;
      state.joinedLobbyIds.push(id);
      saveState(); renderPage(); toast(`Joined ${lobby.game} practice lobby.`); return;
    }
    if (action === 'leave-lobby') {
      const lobby = state.lobbies.find((item) => item.id === id);
      if (!lobby || !state.joinedLobbyIds.includes(id)) return;
      if (lobby.host === state.user.username) {
        state.lobbies = state.lobbies.filter((item) => item.id !== id);
      } else {
        lobby.players = Math.max(0, lobby.players - 1);
      }
      state.joinedLobbyIds = state.joinedLobbyIds.filter((lobbyId) => lobbyId !== id);
      saveState(); renderPage(); toast(lobby.host === state.user.username ? 'Your local lobby was closed.' : 'You left the practice lobby.'); return;
    }
    if (action === 'sponsor-preview') {
      const sponsor = sponsorOffers.find((offer) => offer.id === id);
      const claims = state.sponsorClaims && state.sponsorClaims.date === isoDay(new Date())
        ? { ...state.sponsorClaims, claimed: Array.isArray(state.sponsorClaims.claimed) ? state.sponsorClaims.claimed : [] }
        : { date: isoDay(new Date()), claimed: [] };
      if (!sponsor || claims.claimed.includes(id) || claims.claimed.length >= 3) {
        toast('This demo spotlight has already been claimed today.', 'error'); return;
      }
      sponsorSession = { id, startedAt: 0 };
      openModal('sponsor'); return;
    }
    if (action === 'claim-sponsor') {
      const elapsed = sponsorSession ? Date.now() - sponsorSession.startedAt : 0;
      const claims = state.sponsorClaims && state.sponsorClaims.date === isoDay(new Date())
        ? { ...state.sponsorClaims, claimed: Array.isArray(state.sponsorClaims.claimed) ? state.sponsorClaims.claimed : [] }
        : { date: isoDay(new Date()), claimed: [] };
      if (!sponsorSession || elapsed < 5000 || claims.claimed.includes(sponsorSession.id) || claims.claimed.length >= 3) {
        toast('Finish an available sponsor demo preview first.', 'error'); return;
      }
      const sponsor = sponsorOffers.find((offer) => offer.id === sponsorSession.id);
      if (!sponsor) { toast('That demo offer is no longer available.', 'error'); return; }
      state.sponsorClaims = { date: claims.date, claimed: [...claims.claimed, sponsor.id] };
      addCoins(`${sponsor.name} demo spotlight`, 20);
      state.transactions[state.transactions.length - 1].kind = 'sponsored demo';
      saveState(); clearInterval(sponsorTimer); modalKind = ''; sponsorSession = null; renderShell(); toast('20 demo ARC added. This is not real advertising income.'); return;
    }
    if (action === 'tournament-filter') {
      state.tournamentFilter = actionElement.dataset.filter;
      saveState(); renderPage(); return;
    }
    if (action === 'admin-tab') { adminTab = actionElement.dataset.tab; renderPage(); return; }
    if (action === 'leaderboard-filter') { leaderboardFilter = actionElement.dataset.filter; renderPage(); return; }
    if (action === 'claim-daily') {
      if (state.lastDailyReward === isoDay(new Date())) { toast('Your daily reward is already collected.', 'error'); return; }
      state.lastDailyReward = isoDay(new Date()); addCoins('Daily check-in reward', state.rewardAmounts.daily); saveState(); renderShell(); toast(`${state.rewardAmounts.daily} ARC added to your virtual balance.`); return;
    }
    if (action === 'claim-reward') {
      if (state.claimedRewards.includes(id)) { toast('You already collected this reward.', 'error'); return; }
      if (id === 'profile-ready' && (!state.user.bio || !state.user.favoriteGame)) { toast('Add a short bio and favorite game to your player card first.', 'error'); return; }
      const reward = id === 'profile-ready' ? { label: 'Player card completion reward', amount: state.rewardAmounts.profile } : { label: 'Community announcement reward', amount: state.rewardAmounts.community };
      state.claimedRewards.push(id); addCoins(reward.label, reward.amount); saveState(); renderShell(); toast(`${reward.amount} ARC added to your virtual balance.`); return;
    }
    if (action === 'join-team') {
      const team = state.teams.find((candidate) => candidate.id === id);
      if (!team) return;
      if (state.teams.some((candidate) => candidate.members.includes(state.user.username))) { toast('You are already on a team in this demo. Leave it before joining another.', 'error'); return; }
      team.members.push(state.user.username); saveState(); renderShell(); toast(`You're now on ${team.name}.`); return;
    }
    if (action === 'leave-team') {
      const team = state.teams.find((candidate) => candidate.id === id);
      if (!team || !team.members.includes(state.user.username)) return;
      team.members = team.members.filter((member) => member !== state.user.username);
      saveState(); renderShell(); toast(`You left ${team.name}.`); return;
    }
    if (action === 'toggle-setting') {
      const setting = actionElement.dataset.setting;
      state.user[setting] = !state.user[setting]; saveState(); renderShell(); return;
    }
    if (action === 'reset-demo') {
      if (!window.confirm('Reset Arena demo data in this browser? This cannot be undone.')) return;
      try { localStorage.removeItem(STORAGE_KEY); } catch (error) { console.error('Could not clear Arena demo data:', error); toast('Could not clear local demo data.', 'error'); return; }
      state = structuredClone(seed); currentPage = 'overview'; adminTab = 'overview'; modalKind = ''; saveState(); renderShell(); toast('Demo data restored to the sample account.'); return;
    }
    if (action === 'verify-match') {
      const match = state.matches.find((item) => item.id === id);
      if (!match || match.status !== 'pending') return;
      match.status = 'verified'; saveState(); renderPage(); toast('Match result marked verified in this demo.'); return;
    }
    if (action === 'moderate-player') {
      if (state.mutedPlayers.includes(id)) state.mutedPlayers = state.mutedPlayers.filter((name) => name !== id);
      else state.mutedPlayers.push(id);
      saveState(); renderPage(); toast(`${id} moderation status updated locally.`); return;
    }
    if (action === 'toggle-tournament') {
      const item = state.tournaments.find((event) => event.id === id);
      if (!item) return;
      item.status = item.status === 'complete' ? 'upcoming' : 'complete';
      if (item.status === 'complete' && !item.winner) item.winner = 'Pending organizer result';
      if (item.status !== 'complete' && item.winner === 'Pending organizer result') delete item.winner;
      saveState(); renderPage(); toast('Sample tournament status updated.'); return;
    }
    if (action === 'edit-tournament') {
      selectedTournament = id; openModal('edit-tournament'); return;
    }
    if (action === 'delete-announcement') {
      state.announcements = state.announcements.filter((item) => item.id !== id); saveState(); renderPage(); toast('Announcement removed from the local feed.'); return;
    }
    if (action === 'resolve-report') {
      const report = state.reports.find((item) => item.id === id);
      if (report) report.status = 'resolved';
      saveState(); renderPage(); toast('Report marked resolved in this demo.'); return;
    }
    if (action === 'share-tournament') {
      const item = state.tournaments.find((event) => event.id === id);
      if (!item) return;
      const url = `${location.origin}${location.pathname}#tournament/${encodeURIComponent(id)}`;
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(() => toast('Event link copied.')).catch((error) => { console.error('Could not copy event link:', error); toast('Could not copy link. You can copy the page URL from your browser.', 'error'); });
      } else {
        toast('Open this event link from your browser address bar to share it.');
      }
      return;
    }
  }

  function navigateFromHash() {
    const hash = decodeURIComponent(location.hash.slice(1));
    const match = hash.match(/^tournament\/(.+)$/);
    if (match) {
      selectedTournament = match[1]; currentPage = 'tournament-detail'; modalKind = '';
      if (!state.tournaments.some((item) => item.id === selectedTournament)) { currentPage = 'tournaments'; selectedTournament = ''; }
      renderShell(); return;
    }
    const page = hash.split('/')[0];
    if (pageTitles[page]) {
      if (page !== 'play') stopAimGame();
      currentPage = page; modalKind = ''; renderShell();
    }
  }

  document.addEventListener('click', (event) => {
    const nav = event.target.closest('[data-page]');
    if (nav) {
      event.preventDefault();
      const page = nav.dataset.page;
      if (page === 'tournaments' && nav.dataset.id) openTournament(nav.dataset.id);
      else changePage(page);
      return;
    }
    handleAction(event.target);
  });

  document.addEventListener('keydown', (event) => {
    const card = event.target.closest('.tournament-card');
    if (card && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); openTournament(card.dataset.id); }
    if (event.key === 'Escape' && modalKind) closeModal();
  });

  document.addEventListener('input', (event) => {
    if (event.target.matches('[data-action="tournament-search"]')) {
      tournamentSearch = event.target.value;
      const selection = event.target.selectionStart;
      renderPage();
      const input = document.querySelector('[data-action="tournament-search"]');
      if (input) { input.focus(); input.setSelectionRange(selection, selection); }
    }
  });

  document.addEventListener('change', (event) => {
    if (event.target.matches('[data-lobby-game]')) updateLobbyOptions(event.target.value);
  });

  document.addEventListener('submit', (event) => {
    const form = event.target.closest('form[data-form]');
    if (!form) return;
    event.preventDefault();
    handleForm(form);
  });

  window.addEventListener('hashchange', navigateFromHash);
  window.addEventListener('popstate', navigateFromHash);
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) {
      state = loadState(); renderShell(); toast('Arena demo data refreshed from another tab.');
    }
  });

  navigateFromHash();
  if (!location.hash) renderShell();
})();
