const fs = require('fs');
const path = require('path');

const filesToUpdate = {
  'src/app/(main)/page.js': 'FitNova | Home',
  'src/app/(main)/(auth)/login/page.jsx': 'FitNova | Login',
  'src/app/(main)/(auth)/register/page.jsx': 'FitNova | Register',
  'src/app/(main)/classes/page.jsx': 'FitNova | Classes',
  'src/app/(main)/forum/page.jsx': 'FitNova | Community Forum',
  'src/app/payment-success/page.jsx': 'FitNova | Payment Success',
  'src/app/(dashboard)/dashboard/user/page.jsx': 'FitNova | User Dashboard',
  'src/app/(dashboard)/dashboard/user/apply/page.jsx': 'FitNova | Apply for Trainer',
  'src/app/(dashboard)/dashboard/user/booked/page.jsx': 'FitNova | My Booked Classes',
  'src/app/(dashboard)/dashboard/user/favorites/page.jsx': 'FitNova | My Favorites',
  'src/app/(dashboard)/dashboard/trainer/page.jsx': 'FitNova | Trainer Dashboard',
  'src/app/(dashboard)/dashboard/trainer/add-class/page.jsx': 'FitNova | Add Class',
  'src/app/(dashboard)/dashboard/trainer/add-forum-post/page.jsx': 'FitNova | Add Forum Post',
  'src/app/(dashboard)/dashboard/trainer/classes/page.jsx': 'FitNova | My Classes',
  'src/app/(dashboard)/dashboard/trainer/posts/page.jsx': 'FitNova | My Posts',
  'src/app/(dashboard)/dashboard/admin/page.jsx': 'FitNova | Admin Dashboard',
  'src/app/(dashboard)/dashboard/admin/classes/page.jsx': 'FitNova | Manage Classes',
  'src/app/(dashboard)/dashboard/admin/forum/add-post/page.jsx': 'FitNova | Admin Add Post',
  'src/app/(dashboard)/dashboard/admin/forum-posts/page.jsx': 'FitNova | Manage Forum Posts',
  'src/app/(dashboard)/dashboard/admin/trainer-applications/page.jsx': 'FitNova | Trainer Applications',
  'src/app/(dashboard)/dashboard/admin/trainers/page.jsx': 'FitNova | Manage Trainers',
  'src/app/(dashboard)/dashboard/admin/transactions/page.jsx': 'FitNova | Transactions',
  'src/app/(dashboard)/dashboard/admin/users/page.jsx': 'FitNova | Manage Users'
};

for (const [relPath, title] of Object.entries(filesToUpdate)) {
  const fullPath = path.join('d:/ASSESSMENT-PH/ASSESSMENT-PH-A10/fontrend', relPath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    if (!content.includes('export const metadata')) {
      const metaString = `\nexport const metadata = { title: '${title}' };\n`;
      
      // Find the last import statement
      const importMatches = [...content.matchAll(/^import .*;?/gm)];
      if (importMatches.length > 0) {
        const lastMatch = importMatches[importMatches.length - 1];
        const insertPos = lastMatch.index + lastMatch[0].length;
        content = content.slice(0, insertPos) + '\n' + metaString + content.slice(insertPos);
      } else {
        content = metaString + '\n' + content;
      }
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log('Updated', relPath);
    } else {
        console.log('Skipped (already has metadata)', relPath);
    }
  } else {
    console.log('Not found:', relPath);
  }
}
