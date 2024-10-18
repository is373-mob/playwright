import { test, expect } from "@playwright/test";
import { BASE_URL, NAVIGATION_PATHS } from "../../utils";

test.describe("Navigation Bar Tests", () => {
    NAVIGATION_PATHS.forEach((path) => {
        test(`should navigate to ${path} using the navigation bar`, async ({ page }) => {
            // Go to the base URL (home page)
            await page.goto(BASE_URL);

            // Check that the navigation bar is visible
            const navBar = page.locator("nav");
            await expect(navBar).toBeVisible();

            // Find the link that corresponds to the current path
            const link = navBar.locator(`a[href="${path}"]`);
            await expect(link).toBeVisible();

            // Click the link and verify navigation
            await link.click();
            await expect(page).toHaveURL(`${BASE_URL}${path}`);
        });
    });
});
