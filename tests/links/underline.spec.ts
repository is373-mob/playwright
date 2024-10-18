import { test, expect } from "@playwright/test";

const FILES = [
    "./0-0-initiative.html",
    "./1-0-kernel.html",
    "./2-0-virtualization.html",
    "./2-1-type1.html",
    "./2-2-type2.html",
    "./3-0-containerization.html",
    "./3-1-docker.html",
    "./3-2-kubernetes.html",
    "./3-3-k3s.html",
];

for (const file of FILES) {
    test(`check CSS for hover effect on links in .article-entry for ${file}`, async ({ page }) => {
        await page.goto(file);

        // Get the style sheet and check for the specific rule
        const hasHoverRule = await page.evaluate(() => {
            // Find all stylesheets
            const stylesheets = Array.from(document.styleSheets);
            // Check each stylesheet for the specific rule
            return stylesheets.some(sheet => {
                try {
                    // Get the CSS rules from the stylesheet
                    const rules = Array.from(sheet.cssRules || []);
                    // Look for the specific hover rule
                    return rules.some(rule => rule.cssText.includes('.article-entry a:hover { text-decoration: underline; }'));
                } catch (e) {
                    // Handle cross-origin stylesheets
                    return false;
                }
            });
        });

        // Assert that the CSS rule exists
        expect(hasHoverRule).toBe(true);
    });
}
