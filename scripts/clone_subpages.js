const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const targetPages = [
  { url: 'https://eql-apparel.com/products', key: 'products' },
  { url: 'https://eql-apparel.com/about', key: 'about' },
  { url: 'https://eql-apparel.com/faq', key: 'faq' }
];

(async () => {
  console.log(`Starting Subpage Extractor...`);
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  for (const target of targetPages) {
    console.log(`\n>>> Extracting ${target.url} [Key: ${target.key}]`);
    await page.goto(target.url, { waitUntil: 'networkidle' });

    // Cuộn trang để kích hoạt lazy load
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });

    // Extract detailed semantic sections with raw HTML and computed styles
    const sectionsData = await page.evaluate(() => {
      const sections = [];
      const elements = document.querySelectorAll('main > section, main > div.shopify-section, main > div');

      elements.forEach((el, index) => {
        // Bỏ qua các section rỗng
        if (!el.innerText.trim() && !el.querySelector('img, svg')) return;

        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        let name = el.tagName.toLowerCase();
        if (el.id) name += `#${el.id}`;
        else if (el.className && typeof el.className === 'string') name += `.${el.className.split(' ').slice(0, 2).join('.')}`;
        else name += `-section-${index}`;

        // Làm sạch HTML
        const clone = el.cloneNode(true);
        clone.querySelectorAll('script, style, noscript').forEach(e => e.remove());
        const rawHtml = clone.outerHTML;

        // Tương tác
        const interactives = [];
        el.querySelectorAll('button, a, input, select').forEach(interactive => {
           const iStyle = window.getComputedStyle(interactive);
           interactives.push({
             tag: interactive.tagName.toLowerCase(),
             text: interactive.innerText.trim().slice(0, 50),
             classes: interactive.className
           });
        });

        sections.push({
          name,
          width: rect.width,
          height: rect.height,
          rawHtml: rawHtml,
          interactives: interactives
        });
      });

      return sections;
    });

    const outputDir = path.join(__dirname, '..', 'docs', 'design-references', 'eql', target.key);
    fs.mkdirSync(outputDir, { recursive: true });

    let taskList = `# UI/UX Implementation Tasks (${target.key})\n\n`;

    sectionsData.forEach((sec, idx) => {
      const taskName = `${idx.toString().padStart(2, '0')}_${sec.name.replace(/[^a-zA-Z0-9]/g, '_')}`;
      const specPath = path.join(outputDir, `${taskName}.spec.md`);
      
      let specContent = `# Component Spec: ${sec.name}\n\n`;
      specContent += `## 1. Overview & Dimensions\n`;
      specContent += `- **Width:** ${sec.width}px\n`;
      specContent += `- **Height:** ${sec.height}px\n\n`;

      specContent += `## 2. Interactive Elements (UI/UX Details)\n`;
      sec.interactives.forEach(i => {
        specContent += `- \`${i.tag}\`: "${i.text}" (Classes: \`${i.classes}\`)\n`;
      });
      specContent += `\n`;

      specContent += `## 3. Raw HTML Reference\n`;
      specContent += `\`\`\`html\n${sec.rawHtml}\n\`\`\`\n`;

      fs.writeFileSync(specPath, specContent);
      taskList += `- [ ] Implement **${taskName}** (See \`${specPath}\`)\n`;
    });

    fs.writeFileSync(path.join(outputDir, 'TASK_LIST.md'), taskList);
    console.log(`Saved detailed specs and tasks to ${outputDir}`);
  }

  await browser.close();
})();
