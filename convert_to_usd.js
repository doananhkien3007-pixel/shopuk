const fs = require('fs');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            results.push(file);
        }
    });
    return results;
}

const files = walk('src').filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Replace £ symbol with $
    content = content.replace(/£/g, '$');
    
    // Convert formatGBP to formatUSD
    content = content.replace(/formatGBP/g, 'formatUSD');
    
    // Convert toLocaleString('en-GB') to toLocaleString('en-US')
    content = content.replace(/toLocaleString\('en-GB'/g, "toLocaleString('en-US'");
    
    // Replace GBP with USD
    content = content.replace(/GBP/g, 'USD');
    content = content.replace(/gbp/g, 'usd'); // for api/checkout/route.ts
    
    // Specific fix for footer
    content = content.replace(/UK \(USD \$\)/g, 'US (USD $)');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated', file);
    }
});
