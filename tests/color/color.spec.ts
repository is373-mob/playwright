import { test, expect } from "@playwright/test";
import { getContrastRatio } from "a11y-contrast-color";

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

// Helper function to parse RGB colors from CSS format to an array
function parseRGB(rgbString: string): number[] {
    const rgbMatch = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!rgbMatch) return [0, 0, 0]; // Return black if parsing fails
    return [parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3])];
}

// Test to check color contrast compliance for normal text
for (const file of FILES) {
    test(`check color contrast compliance for normal text in ${file}`, async ({ page }) => {
        await page.goto(file);

        // Get the background color of .article-inner
        const backgroundColor = await page.evaluate(() => {
            const element = document.querySelector('.article-inner');
            return window.getComputedStyle(element).backgroundColor;
        });

        const backgroundRGB = parseRGB(backgroundColor);

        // Review color contrast compliance for all text elements
        const textElements = await page.$$eval('.article-entry p, .article-entry h1, .article-entry h2, .article-entry h3', elements => {
            return elements.map(element => {
                const computedStyle = window.getComputedStyle(element);
                return {
                    foregroundColor: computedStyle.color,
                };
            });
        });

        for (const { foregroundColor } of textElements) {
            const foregroundRGB = parseRGB(foregroundColor);
            const contrastRatio = getContrastRatio(foregroundRGB, backgroundRGB);
            expect(contrastRatio).toBeGreaterThan(4.5); // Check for AA compliance for normal text
        }
    });

}
