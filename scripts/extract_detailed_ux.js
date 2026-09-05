const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const url = 'https://eql-apparel.com/';

(async () => {
  console.log(`Starting Detailed UI/UX Playwright Extractor for ${url}...`);
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  await page.goto(url, { waitUntil: 'networkidle' });

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
    const elements = document.querySelectorAll('header, section, footer, .shopify-section');

    elements.forEach((el, index) => {
      // Bỏ qua các section rỗng
      if (!el.innerText.trim() && !el.querySelector('img, svg')) return;

      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      let name = el.tagName.toLowerCase();
      if (el.id) name += `#${el.id}`;
      else if (el.className && typeof el.className === 'string') name += `.${el.className.split(' ').slice(0, 2).join('.')}`;
      else name += `-section-${index}`;

      // Làm sạch HTML để lưu trữ (bỏ đi các script tag, nội dung thừa)
      const clone = el.cloneNode(true);
      clone.querySelectorAll('script, style, noscript').forEach(e => e.remove());
      const rawHtml = clone.outerHTML;

      // Tìm tất cả các thành phần tương tác (buttons, links)
      const interactives = [];
      el.querySelectorAll('button, a, input, select').forEach(interactive => {
         const iStyle = window.getComputedStyle(interactive);
         interactives.push({
           tag: interactive.tagName.toLowerCase(),
           text: interactive.innerText.trim().slice(0, 50),
           classes: interactive.className,
           styles: {
             color: iStyle.color,
             backgroundColor: iStyle.backgroundColor,
             border: iStyle.border,
             padding: iStyle.padding,
             fontFamily: iStyle.fontFamily,
             fontSize: iStyle.fontSize
           }
         });
      });

      sections.push({
        name,
        width: rect.width,
        height: rect.height,
        background: style.background,
        color: style.color,
        fontFamily: style.fontFamily,
        rawHtml: rawHtml,
        interactives: interactives
      });
    });

    return sections;
  });

  const outputDir = path.join(__dirname, '..', 'docs', 'design-references', 'eql-apparel', 'root');
  fs.mkdirSync(outputDir, { recursive: true });

  // Tạo các file spec.md (tasks) cho từng section
  let taskList = `# UI/UX Implementation Tasks (Root Page)\n\n`;

  sectionsData.forEach((sec, idx) => {
    const taskName = `${idx.toString().padStart(2, '0')}_${sec.name.replace(/[^a-zA-Z0-9]/g, '_')}`;
    const specPath = path.join(outputDir, `${taskName}.spec.md`);
    
    let specContent = `# Component Spec: ${sec.name}\n\n`;
    specContent += `## 1. Overview & Dimensions\n`;
    specContent += `- **Width:** ${sec.width}px\n`;
    specContent += `- **Height:** ${sec.height}px\n`;
    specContent += `- **Background:** ${sec.background}\n`;
    specContent += `- **Typography:** ${sec.fontFamily}, Color: ${sec.color}\n\n`;

    specContent += `## 2. Interactive Elements (UI/UX Details)\n`;
    sec.interactives.forEach(i => {
      specContent += `- \`${i.tag}\`: "${i.text}"\n`;
      specContent += `  - Classes: \`${i.classes}\`\n`;
      specContent += `  - Typography: ${i.styles.fontSize} ${i.styles.fontFamily}\n`;
      specContent += `  - Styles: color ${i.styles.color}, bg ${i.styles.backgroundColor}, border ${i.styles.border}, padding ${i.styles.padding}\n`;
    });
    specContent += `\n`;

    specContent += `## 3. Raw HTML Reference\n`;
    specContent += `\`\`\`html\n${sec.rawHtml}\n\`\`\`\n`;

    fs.writeFileSync(specPath, specContent);
    taskList += `- [ ] Implement **${taskName}** (See \`${specPath}\`)\n`;
  });

  fs.writeFileSync(path.join(outputDir, 'TASK_LIST.md'), taskList);
  console.log(`Saved detailed specs and tasks to ${outputDir}`);

  await browser.close();
})();
