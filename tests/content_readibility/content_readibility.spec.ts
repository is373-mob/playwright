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
    test(`check content readability and formatting for ${file}`, async ({ page }) => {
        await page.goto(file);

        // Check font size and style
        const fontSize = await page.evaluate(() => {
            const content = document.querySelector('.article-entry');
            return content ? window.getComputedStyle(content).fontSize : null;
        });
        expect(fontSize).toBeDefined(); // Ensure font size is defined
        if (fontSize){
            expect(parseFloat(fontSize)).toBeGreaterThan(12); // Check if font size is greater than 12px
        }

        const fontFamily = await page.evaluate(() => {
            const content = document.querySelector('.article-entry');
            return content ? window.getComputedStyle(content).fontFamily : null;
        });
        
        // Ensure the font family includes the specified system fonts
        expect(fontFamily).toContain('-apple-system');
        expect(fontFamily).toContain('Segoe UI');
        expect(fontFamily).toContain('Roboto');
        expect(fontFamily).toContain('Oxygen');
        expect(fontFamily).toContain('Ubuntu');
        expect(fontFamily).toContain('Cantarell');
        expect(fontFamily).toContain('Fira Sans');
        expect(fontFamily).toContain('Droid Sans');
        expect(fontFamily).toContain('Helvetica Neue');
        expect(fontFamily).toContain('sans-serif');

        // Check if either "BlinkMacSystemFont" or "system-ui" is present
        expect(fontFamily).toMatch(/BlinkMacSystemFont|system-ui/);

        // Check for headings and paragraphs
        const headingsCount = await page.evaluate(() => {
            return document.querySelectorAll('.article-entry h1, .article-entry h2, .article-entry h3').length;
        });
        expect(headingsCount).toBeGreaterThan(0); // Ensure at least one heading exists

        const paragraphsCount = await page.evaluate(() => {
            return document.querySelectorAll('.article-entry p').length;
        });
        expect(paragraphsCount).toBeGreaterThan(0); // Ensure at least one paragraph exists

        // Check for content overlap or clipping
        const isClipping = await page.evaluate(() => {
            const content = document.querySelector('.article-entry');
            return content ? content.scrollHeight > content.clientHeight : false;
        });
        expect(isClipping).toBe(false); // Ensure no clipping

        // Additionally, check for overflow
        const overflowX = await page.evaluate(() => {
            const content = document.querySelector('.article-entry');
            return content ? window.getComputedStyle(content).overflowX : 'visible';
        });
        expect(overflowX).toBe('visible'); // Ensure no horizontal overflow
    });
}
