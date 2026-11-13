import fs from'node:fs/promises';import path from'node:path';import{fileURLToPath}from'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),out=path.join(root,'dist');
const routes=['jeu','demo','kit-decouverte','professionnels','contact','sur-le-terrain','mentions-legales','conditions-utilisation','politique-confidentialite'];
await fs.rm(out,{recursive:true,force:true});await fs.mkdir(out,{recursive:true});
for(const file of['index.html','page.css','robots.txt','sitemap.xml','.htaccess','_headers','_redirects'])await fs.copyFile(path.join(root,file),path.join(out,file));
for(const dir of['assets',...routes])await fs.cp(path.join(root,dir),path.join(out,dir),{recursive:true});
console.log('Version statique prête dans dist/ — sans dépendance ni service externe au démarrage.');
