const fs = require("fs");
const path = require("path");

const htaccessContent = `
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule . /index.html [L]
</IfModule>
`;

fs.writeFileSync(
  path.join(__dirname, "dist", ".htaccess"),
  htaccessContent.trim()
);
