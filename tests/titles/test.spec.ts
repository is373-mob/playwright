import { test, expect } from "@playwright/test";

test("test title correct", async ({ page }) => {
    await page.goto("/");
    expect(await page.title()).toBe("Hexo");
});

// Array of file paths to be tested
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
    test(`test for main <h1> title presence on ${file}`, async ({ page }) => {
        // Navigate to the page
        await page.goto(file);

        // Select the main content <h1> title (skipping logo or other <h1>s)
        const mainTitle = await page.locator("h1:not(#logo-wrap)");  // Assuming #logo-wrap is the id of the unwanted <h1>
        await expect(mainTitle).toBeVisible();
    });
}