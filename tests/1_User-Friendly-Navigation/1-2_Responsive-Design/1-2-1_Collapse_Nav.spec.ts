import { test, expect } from "@playwright/test";
import { BASE_URL } from "../../utils";

// User Story 1.2.1: "As a mobile user, I want the navigation bar to collapse into a dropdown menu, so I can easily navigate on smaller screens."

test.describe("Responsive Navigation Bar Tests", () => {
    /*test("should collapse navigation bar into a dropdown on small screens", async ({ page }) => {
        // Set the viewport to a small screen size
        await page.setViewportSize({ width: 375, height: 667 });

        // Navigate to the home page
        await page.goto(`${BASE_URL}`);

        // Ensure that the collapsed menu icon (hamburger) is visible
        const menuButton = await page.locator("#main-nav-toggle"); // Updated selector for Hexo Landscape theme's hamburger menu
        await expect(menuButton).toBeVisible();
    });*/

    test("should expand the dropdown menu when the menu button is clicked", async ({ page }) => {
        // Set the viewport to a small screen size
        await page.setViewportSize({ width: 375, height: 667 });

        // Navigate to the home page
        await page.goto(`${BASE_URL}`);

        // Click on the menu button to expand the navigation
        const menuButton = await page.locator("#main-nav-toggle"); // Updated selector for Hexo Landscape theme's hamburger menu
        await menuButton.click();

        // Verify that the navigation links are now visible
        const navLinks = await page.locator("#mobile-nav .mobile-nav-link"); // Updated selector for Hexo Landscape theme navigation links
        await expect(navLinks.first()).toBeVisible();
    });

    test("should navigate to the correct page when a dropdown link is clicked", async ({ page }) => {
        // Set the viewport to a small screen size
        await page.setViewportSize({ width: 375, height: 667 });

        // Navigate to the home page
        await page.goto(`${BASE_URL}`);

        // Click on the menu button to expand the navigation
        const menuButton = await page.locator("#main-nav-toggle"); // Updated selector for Hexo Landscape theme's hamburger menu
        await menuButton.click();

        // Click on the "Archives" link in the dropdown menu (assuming it exists)
        const archivesLink = await page.locator("#mobile-nav .mobile-nav-link >> text=Archives"); // Updated selector for Hexo Landscape theme navigation link
        await archivesLink.click();

        // Verify that the correct page is displayed
        await expect(page).toHaveURL(`${BASE_URL}archives`);
    });
});
