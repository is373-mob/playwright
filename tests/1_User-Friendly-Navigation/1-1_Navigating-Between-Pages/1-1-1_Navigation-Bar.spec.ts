import { test, expect } from "@playwright/test";
import { BASE_URL, FILES, MENU_LINKS } from "../../utils";

// User Story: "As a user, I want to use the navigation bar to quickly access other pages, so I can explore the website efficiently."

test.describe("Navigation Bar Tests", () => {
    for (const file of FILES) {
        test(`should display navigation bar on ${file} page`, async ({ page }) => {
            test.setTimeout(120000); // 60 seconds
            // Navigate to each page inside the loop
            await page.goto(`./${file}`);

            // Verify that the navigation bar is visible on the current page
            const navBar = page.locator("#main-nav");
            await expect(navBar).toBeVisible();
        });
    }

    for (const link of MENU_LINKS) {
        test(`should navigate to ${link.name} when clicking on the link`, async ({ page }) => {
            // Navigate to the home page before clicking the link
            await page.goto(`/`);

            // Click on the link in the navigation bar
            await page.click(`nav >> text=${link.name}`);

            // Verify that the correct page is displayed after the click
            await expect(page).toHaveURL(`./${link.path}`);
        });
    }
});
