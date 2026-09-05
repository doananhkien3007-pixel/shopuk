const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BASE_URL = 'https://eql-apparel.com';
const MAX_PAGES = 50; // Giới hạn số trang để không bị treo
const visited = new Set();
const queue = [BASE_URL];

// Hàm tạo tên thư mục an toàn từ URL
function getPathKey(urlStr) {
  try {
    const url = new URL(urlStr);
    let key = url.pathname.replace(/^\/|\/$/g, '').replace(/\//g, '-');
    if (!key) key = 'root';
    // Thêm query params nếu có
    if (url.search) {
        const hash = crypto.createHash('md5').update(url.search).digest('hex').substring(0, 6);
        key += `-${hash}`;
    }
    return key;
  } catch (e) {
    return 'unknown';
  }
}

(async () => {
  console.log(`Starting Recursive Playwright crawler for ${BASE_URL}...`);
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 }
  });

  let count = 0;

  while (queue.length > 0 && count < MAX_PAGES) {
    const currentUrl = queue.shift();
    
    // Bỏ qua nếu đã thăm hoặc là link rác
    const cleanUrl = currentUrl.split('#')[0];
    if (visited.has(cleanUrl)) continue;
    visited.add(cleanUrl);
    
    // Bỏ qua file tĩnh
    if (cleanUrl.match(/\.(jpg|jpeg|png|gif|svg|pdf|zip|mp4)$/i)) continue;

    console.log(`\n[${count + 1}/${MAX_PAGES}] Scanning: ${cleanUrl}`);
    
    try {
      await page.goto(cleanUrl, { waitUntil: 'networkidle', timeout: 20000 });
      count++;
      
      const key = getPathKey(cleanUrl);
      const outputDir = path.join(__dirname, '..', 'docs', 'research', 'eql-apparel', key);
      fs.mkdirSync(outputDir, { recursive: true });
      
      // 1. Chụp ảnh màn hình toàn trang
      const screenshotPath = path.join(outputDir, 'full-page.png');
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(` - Saved screenshot to ${screenshotPath}`);

      // 2. Lấy tất cả các link con để quét tiếp
      const hrefs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a[href]')).map(a => a.href);
      });
      
      let newLinks = 0;
      for (const href of hrefs) {
        try {
          const urlObj = new URL(href);
          // Chỉ quét link nội bộ
          if (urlObj.origin === BASE_URL) {
            const normalized = href.split('#')[0];
            if (!visited.has(normalized) && !queue.includes(normalized)) {
              queue.push(normalized);
              newLinks++;
            }
          }
        } catch (e) {}
      }
      console.log(` - Found ${newLinks} new internal links.`);

      // 3. Phân tích chức năng và cấu trúc
      const topology = await page.evaluate(() => {
        const getStyles = (el) => {
          const style = window.getComputedStyle(el);
          return {
            tag: el.tagName.toLowerCase(),
            className: el.className,
            dimensions: `${style.width} x ${style.height}`,
            display: style.display
          };
        };

        const sections = [];
        const elements = document.querySelectorAll('header, footer, nav, form, button, main, section, article, .product-card');
        
        elements.forEach(el => {
          let name = el.tagName.toLowerCase();
          if (el.className && typeof el.className === 'string') {
              name += `.${el.className.split(' ').join('.')}`;
          }
          sections.push({
            type: name,
            style: getStyles(el),
            isInteractive: el.tagName === 'BUTTON' || el.tagName === 'FORM' || el.tagName === 'A'
          });
        });

        // Lấy tất cả input/form/chức năng
        const inputs = Array.from(document.querySelectorAll('input, select, textarea, button')).map(el => ({
            tag: el.tagName.toLowerCase(),
            type: el.type || '',
            name: el.name || '',
            placeholder: el.placeholder || '',
            text: el.innerText || ''
        }));

        return {
          title: document.title,
          url: window.location.href,
          sections: sections.slice(0, 100), // giới hạn số lượng để tránh quá lớn
          inputs: inputs
        };
      });

      // 4. Ghi Markdown
      let mdContent = `# Page Analysis: ${topology.title}\n\n`;
      mdContent += `**URL:** ${topology.url}\n\n`;
      mdContent += `## Interactive Elements (Functions)\n`;
      topology.inputs.forEach(input => {
          mdContent += `- \`${input.tag}\` (Type: ${input.type}, Name: ${input.name}, Placeholder: ${input.placeholder}, Text: ${input.text})\n`;
      });
      
      mdContent += `\n## Structural Layout\n`;
      topology.sections.forEach(sec => {
          if (sec.type.length > 300) return; // Ignore very long auto-generated class names
          mdContent += `- **${sec.type}** (${sec.style.dimensions}, ${sec.style.display}) ${sec.isInteractive ? '👉 INTERACTIVE' : ''}\n`;
      });

      const topologyPath = path.join(outputDir, 'ANALYSIS.md');
      fs.writeFileSync(topologyPath, mdContent);
      console.log(` - Saved analysis to ${topologyPath}`);

    } catch (e) {
      console.error(` - Failed to process ${cleanUrl}: ${e.message}`);
    }
  }

  await browser.close();
  console.log(`\nCrawler finished. Scanned ${count} pages.`);
})();
