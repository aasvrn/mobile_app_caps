const fs = require('fs');
const path = require('path');

const root = process.cwd();
const files = [
  'docs/user-stories.md',
  'screens/SignupScreen.tsx',
  'screens/LoginScreen.tsx',
  'screens/HomeScreen.tsx',
  'screens/DetailScreen.tsx',
  'components/SettingsMenu.tsx',
  'screens/SettingsScreen.tsx'
];

const screenshots = [
  'figma-evidence1.png', 'figma-evidence1.jpg',
  'figma-evidence2.png', 'figma-evidence2.jpg',
  'signup_screen_evidence.png', 'signup_screen_evidence.jpg',
  'signup_error.png', 'signup_error.jpg',
  'login_screen_evidence.png', 'login_screen_evidence.jpg',
  'login_error.png', 'login_error.jpg',
  'home-screen-evidence.png', 'home-screen-evidence.jpg',
  'evidence-detail-navigation.png', 'evidence-detail-navigation.jpg',
  'evidence-detail-screen.png', 'evidence-detail-screen.jpg',
  'evidence-persistence.png', 'evidence-persistence.jpg',
  'evidence-integrateScreen-persistence.png', 'evidence-integrateScreen-persistence.jpg',
  'evidence-api-ux.png', 'evidence-api-ux.jpg',
  'evidence-menu-icon.png', 'evidence-menu-icon.jpg',
  'evidence-menu-items.png', 'evidence-menu-items.jpg',
  'evidence-settings-screen.png', 'evidence-settings-screen.jpg',
  'evidence-notification-configure.png', 'evidence-notification-configure.jpg',
  'evidence-notification-alert.png', 'evidence-notification-alert.jpg'
].map(f => path.join('evidence', f));

function exists(p) {
  return fs.existsSync(path.join(root, p));
}

console.log('=== Submission Checklist ===');
console.log('Repo (set public): https://github.com/aasvrn/mobile_app_caps');
console.log('User stories file:', path.join(root, 'docs/user-stories.md'));

let missing = [];
for (const f of files) {
  if (!exists(f)) missing.push(f);
}

if (missing.length) {
  console.log('\nMissing code files:', missing.join(', '));
} else {
  console.log('\nAll code files found.');
}

const presentShots = screenshots.filter(exists);
const missingShots = screenshots.filter(s => !exists(s));

console.log('\nScreenshots present:', presentShots.length);
if (missingShots.length) {
  console.log('Screenshots missing:', missingShots.length);
  console.log('Add images to folder:', path.join(root, 'evidence'));
}

console.log('\nNext commands:');
console.log('  npm run typecheck');
console.log('  npm run web  # then run npm run web:open');
console.log('  npm run repo:init');
console.log('  npm run repo:push');
console.log('\nDone.');