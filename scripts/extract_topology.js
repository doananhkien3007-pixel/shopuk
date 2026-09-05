const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('Starting Playwright...');
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 }
  });

  const url = 'https://eql-apparel.com/';
  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle' });

  // 1. Take full page screenshot
  const screenshotDir = path.join(__dirname, '..', 'docs', 'research', 'eql-apparel', 'root');
  fs.mkdirSync(screenshotDir, { recursive: true });
  const screenshotPath = path.join(screenshotDir, 'full-page.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`Saved screenshot to ${screenshotPath}`);

  // 2. Extract topology
  const topology = await page.evaluate(() => {
    const extractElementStyle = (el) => {
      const style = window.getComputedStyle(el);
      return {
        tag: el.tagName.toLowerCase(),
        id: el.id,
        className: el.className,
        width: style.width,
        height: style.height,
        padding: style.padding,
        margin: style.margin,
        backgroundColor: style.backgroundColor,
        color: style.color,
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        display: style.display,
        position: style.position,
      };
    };

    const sections = [];
    const elements = document.querySelectorAll('header, section, footer, main > div');
    
    elements.forEach((el, index) => {
      // Basic heuristic to name sections
      let name = el.tagName.toLowerCase();
      if (el.id) name += `#${el.id}`;
      else if (el.className) name += `.${el.className.split(' ')[0]}`;
      else name += `-${index}`;

      sections.push({
        name,
        style: extractElementStyle(el),
        textLength: el.innerText.length
      });
    });

    return {
      title: document.title,
      sections
    };
  });

  // 3. Save topology to Markdown
  let mdContent = `# Page Topology: ${url}\n\n`;
  mdContent += `**Page Title:** ${topology.title}\n\n`;
  mdContent += `## Sections Overview\n\n`;
  
  topology.sections.forEach(sec => {
    mdContent += `### ${sec.name}\n`;
    mdContent += `- **Dimensions:** ${sec.style.width} x ${sec.style.height}\n`;
    mdContent += `- **Positioning:** ${sec.style.position} | **Display:** ${sec.style.display}\n`;
    mdContent += `- **Spacing:** Margin: ${sec.style.margin} | Padding: ${sec.style.padding}\n`;
    mdContent += `- **Colors:** Text: ${sec.style.color} | Background: ${sec.style.backgroundColor}\n`;
    mdContent += `- **Typography:** ${sec.style.fontSize} ${sec.style.fontFamily}\n`;
    mdContent += `- **Text Content Length:** ${sec.textLength} characters\n\n`;
  });

  const topologyPath = path.join(screenshotDir, 'PAGE_TOPOLOGY.md');
  fs.writeFileSync(topologyPath, mdContent);
  console.log(`Saved topology to ${topologyPath}`);

  await browser.close();
  console.log('Extraction complete.');
})();
