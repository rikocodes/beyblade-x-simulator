const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const distDir = path.join(repoRoot, 'dist');
const sourceHtml = path.join(repoRoot, 'beyblade_simulator.html');
const sourceDataDir = path.join(repoRoot, 'data');
const sourceCname = path.join(repoRoot, 'CNAME');
const placeholderCname = 'your-custom-domain.example.com';

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

fs.copyFileSync(sourceHtml, path.join(distDir, 'index.html'));
fs.copyFileSync(sourceHtml, path.join(distDir, 'beyblade_simulator.html'));
fs.cpSync(sourceDataDir, path.join(distDir, 'data'), { recursive: true });
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

if (fs.existsSync(sourceCname)) {
  const cname = fs.readFileSync(sourceCname, 'utf8').trim();
  if (cname && cname !== placeholderCname) {
    fs.writeFileSync(path.join(distDir, 'CNAME'), `${cname}\n`);
  } else {
    console.warn('Skipping placeholder CNAME. Add your real custom domain to CNAME when ready.');
  }
}
