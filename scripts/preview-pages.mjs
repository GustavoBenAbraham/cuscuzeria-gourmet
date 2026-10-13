import { createServer } from 'node:http';
import { readFileSync, statSync } from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist-pages');
const base='/cuscuzeria-gourmet-site/';
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.json':'application/json'};
createServer((req,res)=>{
 try {
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(!pathname.startsWith(base)){res.writeHead(404);res.end();return;}
  let file=path.resolve(root,pathname.slice(base.length));
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  if(statSync(file).isDirectory())file=path.join(file,'index.html');
  res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});
  res.end(readFileSync(file));
 } catch {res.writeHead(404,{'Content-Type':'text/html'});res.end(readFileSync(path.join(root,'404.html')));}
}).listen(4180,'127.0.0.1',()=>console.log('http://127.0.0.1:4180'+base));
