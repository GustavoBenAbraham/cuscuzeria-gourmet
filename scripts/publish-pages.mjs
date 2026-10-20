import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist-pages');
const checkout = path.join(root, '.openai', 'pages-publish');
const remote = 'https://github.com/GustavoBenAbraham/cuscuzeria-gourmet-site.git';
function git(args, cwd = checkout) {
 const result = spawnSync('git', args, { cwd, encoding:'utf8', stdio:['ignore','pipe','pipe'] });
 if(result.error || result.status !== 0) throw new Error(result.error?.message || result.stderr);
 return result.stdout.trim();
}
if(!fs.existsSync(path.join(output,'index.html'))) throw new Error('Run npm run build:pages first');
if(!fs.existsSync(path.join(checkout,'.git'))) {
 fs.mkdirSync(path.dirname(checkout), {recursive:true});
 git(['clone',remote,checkout],root);
}
if(git(['remote','get-url','origin'])!==remote) throw new Error('Unexpected deployment repository');
if(git(['status','--porcelain'])) throw new Error('Deployment checkout has uncommitted changes');
git(['pull','--ff-only']);
// Remove only tracked artifact files inside the verified deployment checkout.
for(const entry of git(['ls-files','-z']).split('\0').filter(Boolean)) {
 const target=path.resolve(checkout,entry);
 if(!target.startsWith(checkout+path.sep)) throw new Error('Invalid tracked path');
 if(fs.existsSync(target)) fs.unlinkSync(target);
}
fs.cpSync(output,checkout,{recursive:true});
fs.writeFileSync(path.join(checkout,'README.md'),'# Cuscuzeria Gourmet\n\nPublished website files. Source code and project documentation: https://github.com/GustavoBenAbraham/cuscuzeria-gourmet\n');
git(['add','--all']);
if(git(['status','--porcelain'])) {
 git(['-c','user.name=GustavoBenAbraham','-c','user.email=GustavoBenAbraham@users.noreply.github.com','commit','-m','deploy: update restaurant website']);
 git(['push','origin','main']);
}
console.log('Published artifacts: '+remote);
