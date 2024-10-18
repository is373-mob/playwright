import { test, expect } from "@playwright/test";
import { BASE_URL } from "../../utils";

// User Story 1.1.3: "As a user, I want a 'Back' button or link on each page, so I can return to the previous page easily."

test.describe("Back Button Tests", () => {
    test("should have a functional back button or link on each page", async ({ page }) => {
        // Go to the base URL (home page)
        await page.goto(BASE_URL);

        // Locate all internal links within the content area to navigate to other pages
        const contentLinks = await page.locator('main a[href^="/"]');
        const firstLink = contentLinks.first();
        const href = await firstLink.getAttribute("href");

        // Click the link to navigate to another page
        await firstLink.click();
        await expect(page).toHaveURL(`${BASE_URL}${href}`);

        // Locate and click the back button or link
        const backButton = page.locator("a.back-button, button.back-button");
        await expect(backButton).toBeVisible();
        await backButton.click();

        // Verify that we have navigated back to the home page
        await expect(page).toHaveURL(BASE_URL);
    });
});
