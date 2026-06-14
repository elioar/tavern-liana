const fs = require('fs');
const path = require('path');

const files = ['index.html', 'menu.html', 'contact.html'];
const dir = path.join('d:', 'Projects', 'Toli-Tavern.com Website');

const srButtonDesktop = `
                            <button type="button" class="lang-btn lang-btn-flag" data-lang="sr" aria-label="Serbian">
                                <svg class="flag-icon" viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
                                    <rect width="3" height="0.6667" y="0" fill="#C6363C"></rect>
                                    <rect width="3" height="0.6667" y="0.6667" fill="#0C4076"></rect>
                                    <rect width="3" height="0.6667" y="1.3333" fill="#FFFFFF"></rect>
                                </svg>
                            </button>`;

const roButtonDesktop = `
                            <button type="button" class="lang-btn lang-btn-flag" data-lang="ro" aria-label="Romanian">
                                <svg class="flag-icon" viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
                                    <rect width="1" height="2" x="0" fill="#002B7F"></rect>
                                    <rect width="1" height="2" x="1" fill="#FCD116"></rect>
                                    <rect width="1" height="2" x="2" fill="#CE1126"></rect>
                                </svg>
                            </button>`;

const srButtonMobile = `<button type="button" class="lang-btn lang-btn-flag" data-lang="sr" aria-label="Serbian"><svg class="flag-icon" viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><rect width="3" height="0.6667" y="0" fill="#C6363C"></rect><rect width="3" height="0.6667" y="0.6667" fill="#0C4076"></rect><rect width="3" height="0.6667" y="1.3333" fill="#FFFFFF"></rect></svg></button>`;
const roButtonMobile = `<button type="button" class="lang-btn lang-btn-flag" data-lang="ro" aria-label="Romanian"><svg class="flag-icon" viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><rect width="1" height="2" x="0" fill="#002B7F"></rect><rect width="1" height="2" x="1" fill="#FCD116"></rect><rect width="1" height="2" x="2" fill="#CE1126"></rect></svg></button>`;

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf-8');

  // Insert before Greek button in desktop switcher
  content = content.replace(
    /(<button type="button" class="lang-btn lang-btn-flag" data-lang="el" aria-label="Greek">)/,
    srButtonDesktop + roButtonDesktop + '\n$1'
  );

  // For the mobile switcher, the Greek button might be minified on one line or slightly different.
  // The mobile buttons are in <div class="lang-mobile-panel" aria-label="Select language">
  content = content.replace(
    /(<button type="button" class="lang-btn lang-btn-flag" data-lang="el" aria-label="Greek">\s*<svg.*?<\/svg>\s*<\/button>)/,
    srButtonMobile + '\n                            ' + roButtonMobile + '\n                            $1'
  );

  // Insert hreflang links in <head>
  content = content.replace(
    /(<link rel="alternate" hreflang="el" href="[^"]+">)/,
    '<link rel="alternate" hreflang="sr" href="https://toli-tavern.com/">\n    <link rel="alternate" hreflang="ro" href="https://toli-tavern.com/">\n    $1'
  );

  // Insert og:locale:alternate
  content = content.replace(
    /(<meta property="og:locale:alternate" content="el_GR">)/,
    '<meta property="og:locale:alternate" content="sr_RS">\n    <meta property="og:locale:alternate" content="ro_RO">\n    $1'
  );

  fs.writeFileSync(filePath, content, 'utf-8');
});
console.log('HTML files updated successfully!');
