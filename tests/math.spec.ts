import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";

for (const [format, inline, display] of [
  ["markdown", 8, 7],
  ["mdx", 3, 6],
] as const) {
  test(`${format}: formulas, plugins, fonts and responsive themes`, async ({
    page,
    colorScheme,
    viewport,
  }, testInfo) => {
    const failures: string[] = [];
    page.on("pageerror", error => failures.push(error.message));
    page.on("requestfailed", request => failures.push(request.url()));
    page.on("response", response => {
      if (response.status() >= 400) failures.push(response.url());
    });

    await page.goto(`/math-test/${format}/`);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("html")).toHaveAttribute(
      "data-theme",
      colorScheme!
    );
    await expect(page.locator(".katex-error")).toHaveCount(0);
    await expect(page.locator(".katex")).toHaveCount(inline + display);
    await expect(page.locator(".katex-display")).toHaveCount(display);
    await expect(page.locator(".katex math")).toHaveCount(inline + display);
    await expect(
      page.locator('.katex annotation[encoding="application/x-tex"]')
    ).toHaveCount(inline + display);
    await expect(page.locator(".callout .katex-display")).toHaveCount(1);
    await expect(page.locator(".astro-code .katex, code .katex")).toHaveCount(
      0
    );
    await expect(page.locator(".astro-code")).toContainText("$x_i$");
    if (format === "mdx") {
      await expect(page.locator('[data-mdx-check="true"]')).toBeVisible();
    }

    // remark-toc and remark-collapse must still produce a usable directory.
    const toc = page.locator("#article details:not(.callout)");
    await expect(toc.locator("a")).not.toHaveCount(0);
    await toc.locator("summary").click();
    await expect(toc.locator("a").first()).toBeVisible();

    const metrics = await page.evaluate(() => {
      const formula = document.querySelector<HTMLElement>(".katex")!;
      const rule = document.querySelector<HTMLElement>(".katex .frac-line")!;
      return {
        width: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        color: getComputedStyle(formula).color,
        bodyColor: getComputedStyle(document.body).color,
        ruleColor: getComputedStyle(rule).borderBottomColor,
        fonts: [...document.fonts].filter(
          font => font.family.startsWith("KaTeX") && font.status === "loaded"
        ).length,
      };
    });
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.width);
    expect(metrics.color).toBe(metrics.bodyColor);
    expect(metrics.ruleColor).toBe(metrics.color);
    expect(metrics.fonts).toBeGreaterThan(0);

    if (format === "markdown" && viewport!.width < 500) {
      const longFormula = page.locator(".katex-display").last();
      expect(
        await longFormula.evaluate(el => el.scrollWidth > el.clientWidth)
      ).toBe(true);
      await longFormula.evaluate(el => {
        el.scrollLeft = 100;
      });
      expect(await longFormula.evaluate(el => el.scrollLeft)).toBeGreaterThan(
        0
      );
    }
    const screenshotPath = testInfo.outputPath("math-page.png");
    await page.screenshot({ path: screenshotPath, fullPage: true });
    await testInfo.attach("math-page", {
      path: screenshotPath,
      contentType: "image/png",
    });

    // Exercise the real theme button as well as OS color-scheme detection.
    const before = metrics.color;
    await page.locator("#theme-btn").click();
    await expect(page.locator("html")).toHaveAttribute(
      "data-theme",
      colorScheme === "dark" ? "light" : "dark"
    );
    expect(
      await page
        .locator(".katex")
        .first()
        .evaluate(el => getComputedStyle(el).color)
    ).not.toBe(before);
    expect(failures).toEqual([]);
  });
}

test("production HTML is pre-rendered and fixtures stay outside publications", async ({
  browser,
}) => {
  // Formula HTML and MathML must work even with client JavaScript disabled.
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4321/math-test/markdown/");
  await expect(page.locator(".katex-display")).toHaveCount(7);
  await expect(page.locator(".katex-html").first()).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, nofollow"
  );
  await context.close();

  for (const path of [
    "sitemap-0.xml",
    "rss.xml",
    "search-index.json",
    "posts/index.html",
  ]) {
    expect(readFileSync(`dist/${path}`, "utf8")).not.toContain("/math-test/");
  }
});
