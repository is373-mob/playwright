import { test, expect } from "@playwright/test";
import { BASE_URL } from "../../utils";

// User Story 1.1.2: "As a user, I want links within the content to be clickable, so I can easily navigate to related information."

test.describe("Clickable Content Links Tests", () => {
    test("should find and click on internal links within the content", async ({ page }) => {
        // Go to the base URL (home page)
        await page.goto(BASE_URL);

        // Locate all internal links within the content area
        const contentLinks = await page.locator('main a[href^="/"]');
        const linkCount = await contentLinks.count();

        // Iterate through all internal links and click them to ensure they navigate properly
        for (let i = 0; i < linkCount; i++) {
            const link = contentLinks.nth(i);
            const href = await link.getAttribute("href");

            // Click the link and verify navigation
            await link.click();
            await expect(page).toHaveURL(`${BASE_URL}${href}`);

            // Go back to the home page before the next iteration
            await page.goBack();
        }
    });
});
