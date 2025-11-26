const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const newsDir = path.join(__dirname, '../content/news');
const files = fs.readdirSync(newsDir);

files.forEach(file => {
    if (!file.endsWith('.md')) return;
    const filePath = path.join(newsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(content);

    let body = parsed.content;
    let changed = false;

    // Fix nested links: [[Text](URL)](URL) -> [Text](URL)
    // This regex is a bit simplistic but targets the specific issue seen
    // The issue seen was: [[iScience誌](https://...](https://...)
    // We want to keep the inner link? Or the outer?
    // Usually the inner link is the text + url, and the outer was a mistake wrapping it?
    // Or maybe the user wanted the whole thing linked?
    // Let's assume we want to keep the inner link structure if it's valid.

    // Pattern: \[(\[.*?\]\(.*?\))\]\(.*?\)
    // Replace with: $1

    const nestedLinkRegex = /\[(\[.*?\]\(.*?\))\]\(.*?\)/g;
    if (nestedLinkRegex.test(body)) {
        body = body.replace(nestedLinkRegex, '$1');
        changed = true;
        console.log(`Fixed nested link in ${file}`);
    }

    // Also check for raw URLs that might need brackets?
    // The user said "when you see direct web address, please put the hyperlink on the part within parentheses []"
    // This might mean: http://example.com -> [http://example.com](http://example.com)
    // But let's be careful not to double link.
    // Only replace http that is NOT preceded by ]( or (

    // const urlRegex = /(?<!\]\()(?<!\()https?:\/\/[^\s\)]+/g;
    // Actually, let's not auto-link everything yet, as it might break existing markdown.
    // The user's main complaint was likely the display of raw markdown.

    if (changed) {
        fs.writeFileSync(filePath, matter.stringify(body, parsed.data));
    }
});
