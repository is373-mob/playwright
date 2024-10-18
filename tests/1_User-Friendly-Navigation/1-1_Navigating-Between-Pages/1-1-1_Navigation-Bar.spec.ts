import { test, expect } from "@playwright/test";
import { BASE_URL, MENU_LINKS } from "../../utils";

// User Story 1.1.1: "As a user, I want to use the navigation bar to quickly access other pages, so I can explore the website efficiently."

test.describe("Navigation Bar Tests", () => {
    MENU_LINKS.forEach((menuLink) => {
        test(`should navigate to ${menuLink} using the navigation bar`, async ({ page }) => {
            // Go to the base URL (home page)
            await page.goto(BASE_URL);

            // Check that the main navigation bar is visible
            const navBar = page.locator("#main-nav");
            await expect(navBar).toBeVisible();

            // Find the link that corresponds to the current menu link path
            const link = navBar.locator(`a[href="/website${menuLink}"]`);
            await expect(link).toBeVisible();

            // Click the link and verify navigation
            await link.click();
            await expect(page).toHaveURL(`${BASE_URL}${menuLink}`);
        });
    });
});
