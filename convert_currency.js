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

    // Convert strings like '1.050.000 ₫' to '£105'
    content = content.replace(/(\d+)\.(\d{3})\.000 ₫/g, '£$1$2');
    // Convert strings like '850.000 ₫' to '£85'
    content = content.replace(/(\d+)\.000 ₫/g, '£$1');
    // Convert formatVND function
    content = content.replace(/formatVND/g, 'formatGBP');
    // Convert return num.toLocaleString('vi-VN') + ' ₫'; to return '£' + (num / 10000).toLocaleString('en-GB');
    content = content.replace(/num\.toLocaleString\('vi-VN'\)\s*\+\s*' ₫'/g, "'£' + (num / 10000).toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})");
    // Convert 0 ₫
    content = content.replace(/'0 ₫'/g, "'£0.00'");
    
    // Header banner
    content = content.replace(/1\.500\.000 ₫/g, "£150");
    
    // VN (VND đ) to UK (GBP £)
    content = content.replace(/VN \(VND đ\)/g, "UK (GBP £)");

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated', file);
    }
});
