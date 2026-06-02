import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:5000';

const viewports = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

const pages = [
  { path: '/', name: '首页' },
  { path: '/api-review', name: 'API测评页' },
  { path: '/tutorial', name: '教程列表页' },
  { path: '/tutorial/aliyun', name: '阿里云教程' },
  { path: '/use-case', name: '场景推荐页' },
  { path: '/faq', name: 'FAQ页' },
  { path: '/cloud-api', name: '云API页' },
];

async function testPage(browser, pagePath, pageName, viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
  });
  const page = await context.newPage();

  const errors = [];
  const warnings = [];

  // 监听控制台错误
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
    if (msg.type() === 'warning' && !msg.text().includes('DevTools')) {
      warnings.push(msg.text());
    }
  });

  // 监听页面错误
  page.on('pageerror', err => {
    errors.push(`Page error: ${err.message}`);
  });

  try {
    await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);

    // 检查横向滚动
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    // 检查文本溢出
    const textOverflow = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const overflowElements = [];
      for (const el of elements) {
        if (el.scrollWidth > el.clientWidth && el.textContent.trim().length > 0) {
          const style = window.getComputedStyle(el);
          if (style.overflow === 'visible' || style.overflow === '') {
            overflowElements.push({
              tag: el.tagName,
              class: el.className?.substring(0, 50),
              text: el.textContent?.substring(0, 30),
            });
          }
        }
      }
      return overflowElements.slice(0, 5); // 只返回前5个
    });

    // 检查图片加载
    const brokenImages = await page.evaluate(() => {
      const images = document.querySelectorAll('img');
      const broken = [];
      for (const img of images) {
        if (!img.complete || img.naturalWidth === 0) {
          broken.push(img.src);
        }
      }
      return broken;
    });

    // 检查按钮/链接点击区域（移动端）
    let smallClickTargets = [];
    if (viewport.width <= 768) {
      smallClickTargets = await page.evaluate(() => {
        const clickables = document.querySelectorAll('a, button, [role="button"]');
        const small = [];
        for (const el of clickables) {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
            small.push({
              tag: el.tagName,
              text: el.textContent?.substring(0, 20)?.trim(),
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            });
          }
        }
        return small.slice(0, 5);
      });
    }

    // 截图
    const screenshotPath = `D:/projects/.tmp-playwright/${viewport.name}-${pagePath.replace(/\//g, '-') || 'home'}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: false });

    return {
      page: pageName,
      path: pagePath,
      viewport: viewport.name,
      errors,
      warnings,
      hasHorizontalScroll,
      textOverflow,
      brokenImages,
      smallClickTargets,
      screenshotPath,
    };
  } catch (err) {
    return {
      page: pageName,
      path: pagePath,
      viewport: viewport.name,
      errors: [`Navigation error: ${err.message}`],
      warnings: [],
      hasHorizontalScroll: false,
      textOverflow: [],
      brokenImages: [],
      smallClickTargets: [],
      screenshotPath: null,
    };
  } finally {
    await context.close();
  }
}

async function main() {
  console.log('🔍 开始响应式布局检查...\n');

  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const viewport of viewports) {
    console.log(`\n📱 测试视口: ${viewport.name} (${viewport.width}x${viewport.height})`);
    console.log('='.repeat(50));

    for (const { path, name } of pages) {
      const result = await testPage(browser, path, name, viewport);
      results.push(result);

      const status = result.errors.length > 0 ? '❌' : '✅';
      console.log(`\n${status} ${name} (${path})`);

      if (result.hasHorizontalScroll) {
        console.log('  ⚠️ 存在横向滚动');
      }

      if (result.textOverflow.length > 0) {
        console.log('  ⚠️ 文本溢出:');
        result.textOverflow.forEach(t => {
          console.log(`    - <${t.tag}> ${t.text}...`);
        });
      }

      if (result.brokenImages.length > 0) {
        console.log('  ⚠️ 图片加载失败:');
        result.brokenImages.forEach(src => {
          console.log(`    - ${src}`);
        });
      }

      if (result.smallClickTargets.length > 0) {
        console.log('  ⚠️ 点击区域过小 (<44px):');
        result.smallClickTargets.forEach(t => {
          console.log(`    - <${t.tag}> "${t.text}" (${t.width}x${t.height}px)`);
        });
      }

      if (result.errors.length > 0) {
        console.log('  ❌ 控制台错误:');
        result.errors.forEach(e => {
          console.log(`    - ${e.substring(0, 100)}`);
        });
      }
    }
  }

  await browser.close();

  // 汇总
  console.log('\n\n📊 检查汇总');
  console.log('='.repeat(50));

  const totalIssues = results.reduce((sum, r) => {
    return sum + (r.hasHorizontalScroll ? 1 : 0) +
      (r.textOverflow.length > 0 ? 1 : 0) +
      (r.brokenImages.length > 0 ? 1 : 0) +
      (r.smallClickTargets.length > 0 ? 1 : 0) +
      (r.errors.length > 0 ? 1 : 0);
  }, 0);

  console.log(`总问题数: ${totalIssues}`);
  console.log(`测试页面: ${pages.length}`);
  console.log(`测试视口: ${viewports.length}`);
  console.log(`截图保存位置: D:/projects/.tmp-playwright/`);
}

main().catch(console.error);
