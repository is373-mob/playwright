import { test, expect } from "@playwright/test";
import { BASE_URL, FILES, MENU_LINKS } from "../../utils";

// User Story: "As a user, I want to use the navigation bar to quickly access other pages, so I can explore the website efficiently."

test.describe("Navigation Bar Tests", () => {
    test("should display navigation bar on all pages", async ({ page }) => {
        for (const file of FILES) {
            // Navigate to each page
            await page.goto(BASE_URL + file);

            // Verify that the navigation bar is visible on all pages
            const navBar = await page.locator("#main-nav");
            await expect(navBar).toBeVisible();
        }
    });

    test("should navigate to the correct page when clicking on a link", async ({ page }) => {
        // Iterate through each link and test navigation
        for (const link of MENU_LINKS) {
            await page.goto(BASE_URL);

            // Click on the link in the navigation bar
            await page.click(`nav >> text=${link.name}`);

            // Verify that the correct page is displayed
            await expect(page).toHaveURL(`${BASE_URL}${link.path}`);
        }
    });
});
