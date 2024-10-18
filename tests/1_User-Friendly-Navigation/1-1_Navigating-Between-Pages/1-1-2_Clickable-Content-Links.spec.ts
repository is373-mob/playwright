import { test, expect } from "@playwright/test";
import { BASE_URL, FILES } from "../../utils";

// User Story 1.1.2: "As a user, I want links within the content to be clickable, so I can easily navigate to related information."

test.describe("Content Links Tests", () => {
    FILES.forEach((file) => {
        test(`should navigate to the correct page when clicking a link in ${file}`, async ({ page }) => {
            // Navigate to the target HTML file
            await page.goto(`${BASE_URL}${file}`);

            // Get all links in the content area
            const contentLinks = await page.locator("main a");
            const linkCount = await contentLinks.count();

            // Iterate through each link in the content
            for (let i = 0; i < linkCount; i++) {
                // Click the link and verify the correct page
                const link = contentLinks.nth(i);
                const href = await link.getAttribute("href");

                if (href) {
                    await Promise.all([page.waitForNavigation(), link.click()]);
                    await expect(page).toHaveURL(new RegExp(`${BASE_URL}${href}`));

                    // Navigate back to continue testing remaining links
                    await page.goBack();
                }
            }
        });
    });

    test("should ensure all links are visually distinct", async ({ page }) => {
        // Navigate to the home page
        await page.goto(`${BASE_URL}`);

        // Verify that links in the content are visually distinct (e.g., different color or underlined)
        const links = await page.locator("main a");
        const linkCount = await links.count();

        for (let i = 0; i < linkCount; i++) {
            const link = links.nth(i);
            const textDecoration = await link.evaluate((el) => getComputedStyle(el).textDecoration);
            const color = await link.evaluate((el) => getComputedStyle(el).color);

            // Ensure either an underline or distinct color is applied
            expect(textDecoration).toContain("underline");
            expect(color).not.toBe("rgb(0, 0, 0)"); // Assuming black color is the default and should not be used for links
        }
    });
});
