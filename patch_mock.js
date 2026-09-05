const fs = require('fs');
const file = 'src/app/products/page.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/rating: \{ score: 5\.0, count: 12 \},/g, "rating: { score: 5.0, count: 12 }, sizes: ['S', 'M'], activity: ['studio'], isNewProduct: true,");
content = content.replace(/rating: \{ score: 4\.8, count: 4 \},/g, "rating: { score: 4.8, count: 4 }, sizes: ['XS', 'M'], activity: ['train', 'new'],");
content = content.replace(/rating: \{ score: 5\.0, count: 6 \},/g, "rating: { score: 5.0, count: 6 }, sizes: ['L', 'XL'], activity: ['court', 'run'], isNewProduct: true,");
content = content.replace(/rating: \{ score: 4\.9, count: 12 \},/g, "rating: { score: 4.9, count: 12 }, sizes: ['S', 'M', 'L'], activity: ['studio', 'lounge'],");
content = content.replace(/rating: \{ score: 4\.7, count: 5 \},/g, "rating: { score: 4.7, count: 5 }, sizes: ['S'], activity: ['train'],");
content = content.replace(/rating: \{ score: 4\.9, count: 9 \},/g, "rating: { score: 4.9, count: 9 }, sizes: ['M', 'L'], activity: ['run', 'new'], isNewProduct: true,");
content = content.replace(/rating: \{ score: 5\.0, count: 11 \},/g, "rating: { score: 5.0, count: 11 }, sizes: ['XS', 'S'], activity: ['studio'],");
content = content.replace(/rating: \{ score: 4\.6, count: 7 \},/g, "rating: { score: 4.6, count: 7 }, sizes: ['M', 'XL'], activity: ['lounge'],");
content = content.replace(/rating: \{ score: 4\.8, count: 8 \},/g, "rating: { score: 4.8, count: 8 }, sizes: ['XS', 'M', 'XL'], activity: ['court'], isNewProduct: true,"); // Just in case there's another

fs.writeFileSync(file, content);
