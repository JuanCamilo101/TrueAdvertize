const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');
const SRC = __dirname;

// Simple CSS minifier (no dependencies)
function minifyCSS(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '')   // remove comments
        .replace(/\s+/g, ' ')               // collapse whitespace
        .replace(/\s*([{}:;,>~+])\s*/g, '$1') // remove space around symbols
        .replace(/;}/g, '}')                // remove last semicolon
        .trim();
}

// Simple JS minifier (basic — removes comments and extra whitespace)
function minifyJS(js) {
    return js
        .replace(/\/\/.*$/gm, '')            // remove single-line comments
        .replace(/\/\*[\s\S]*?\*\//g, '')    // remove multi-line comments
        .replace(/\n\s*\n/g, '\n')           // collapse blank lines
        .replace(/^\s+/gm, '')              // remove leading whitespace
        .trim();
}

// Simple HTML minifier
function minifyHTML(html) {
    return html
        .replace(/<!--[\s\S]*?-->/g, '')     // remove comments (except conditionals)
        .replace(/\n\s+/g, '\n')             // collapse indentation
        .replace(/\n{2,}/g, '\n')            // collapse blank lines
        .trim();
}

// Generate hash from content for cache-busting
function contentHash(content) {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
        const char = content.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return Math.abs(hash).toString(36).substring(0, 8);
}

// Clean dist folder
function cleanDist() {
    if (fs.existsSync(DIST)) {
        fs.rmSync(DIST, { recursive: true });
    }
    fs.mkdirSync(DIST, { recursive: true });
    fs.mkdirSync(path.join(DIST, 'css'), { recursive: true });
    fs.mkdirSync(path.join(DIST, 'js'), { recursive: true });
    fs.mkdirSync(path.join(DIST, 'assets'), { recursive: true });
}

function build() {
    console.log('Building for production...\n');
    cleanDist();

    // Minify CSS
    const cssSource = fs.readFileSync(path.join(SRC, 'css', 'styles.css'), 'utf8');
    const cssMin = minifyCSS(cssSource);
    const cssHash = contentHash(cssMin);
    const cssFilename = `styles.${cssHash}.css`;
    fs.writeFileSync(path.join(DIST, 'css', cssFilename), cssMin);
    console.log(`  css/${cssFilename} (${(cssMin.length / 1024).toFixed(1)}KB, was ${(cssSource.length / 1024).toFixed(1)}KB)`);

    // Minify JS
    const jsSource = fs.readFileSync(path.join(SRC, 'js', 'main.js'), 'utf8');
    const jsMin = minifyJS(jsSource);
    const jsHash = contentHash(jsMin);
    const jsFilename = `main.${jsHash}.js`;
    fs.writeFileSync(path.join(DIST, 'js', jsFilename), jsMin);
    console.log(`  js/${jsFilename} (${(jsMin.length / 1024).toFixed(1)}KB, was ${(jsSource.length / 1024).toFixed(1)}KB)`);

    // Process HTML — update references to hashed filenames
    let html = fs.readFileSync(path.join(SRC, 'index.html'), 'utf8');
    html = html.replace('href="css/styles.css"', `href="css/${cssFilename}"`);
    html = html.replace('src="js/main.js"', `src="js/${jsFilename}"`);
    const htmlMin = minifyHTML(html);
    fs.writeFileSync(path.join(DIST, 'index.html'), htmlMin);
    console.log(`  index.html (${(htmlMin.length / 1024).toFixed(1)}KB, was ${(html.length / 1024).toFixed(1)}KB)`);

    // Copy static files
    // Process legal pages (privacy + terms) with hashed CSS reference
    ['privacy.html', 'terms.html'].forEach(page => {
        const pageSrc = path.join(SRC, page);
        if (fs.existsSync(pageSrc)) {
            let pageHtml = fs.readFileSync(pageSrc, 'utf8');
            pageHtml = pageHtml.replace('href="css/styles.css"', `href="css/${cssFilename}"`);
            const pageMin = minifyHTML(pageHtml);
            fs.writeFileSync(path.join(DIST, page), pageMin);
            console.log(`  ${page} (${(pageMin.length / 1024).toFixed(1)}KB)`);
        }
    });

    const staticFiles = ['robots.txt', 'sitemap.xml', '404.html', '_headers', 'CNAME'];
    staticFiles.forEach(file => {
        const src = path.join(SRC, file);
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, path.join(DIST, file));
            console.log(`  ${file} (copied)`);
        }
    });

    // Copy assets
    const assetsDir = path.join(SRC, 'assets');
    if (fs.existsSync(assetsDir)) {
        fs.readdirSync(assetsDir).forEach(file => {
            fs.copyFileSync(path.join(assetsDir, file), path.join(DIST, 'assets', file));
        });
        console.log(`  assets/ (${fs.readdirSync(assetsDir).length} files copied)`);
    }

    console.log('\nBuild complete! Output in dist/');
}

build();
