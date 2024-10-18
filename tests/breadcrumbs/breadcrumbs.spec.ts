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
 
// Map of expected breadcrumb links for each file
const BREADCRUMB_MAP = {
    "./0-0-initiative.html": ['Home', 'Initiatives'],
    "./1-0-kernel.html": ['Home', 'Kernel'],
    "./2-0-virtualization.html": ['Home', 'Virtualization'],
    "./2-1-type1.html": ['Home', 'Virtualization', 'Type 1'],
    "./2-2-type2.html": ['Home', 'Virtualization', 'Type 2'],
    "./3-0-containerization.html": ['Home', 'Containerization'],
    "./3-1-docker.html": ['Home', 'Containerization', 'Docker'],
    "./3-2-kubernetes.html": ['Home', 'Containerization', 'Kubernetes'],
    "./3-3-k3s.html": ['Home', 'Containerization', 'K3s'],
};

const LINK_MAP = {
    'Home': 'index.html',
    'Initiatives': '0-0-initiative.html',
    'Kernel': '1-0-kernel.html',
    'Virtualization': '2-0-virtualization.html',
    'Type 1': '2-1-type1.html',
    'Type 2': '2-2-type2.html',
    'Containerization': '3-0-containerization.html',
    'Docker': '3-1-docker.html',
    'Kubernetes': '3-2-kubernetes.html',
    'K3s': '3-3-k3s.html',
};

for (const file of FILES) {
    test(`test breadcrumbs ${file}`, async ({ page }) => {
        await page.goto(file);

        // Check for the presence of breadcrumbs
        const breadcrumbs = await page.locator("div.breadcrumbs");
        await expect(breadcrumbs).toBeVisible();

        // Check the text of breadcrumbs
        const expectedBreadcrumbs = BREADCRUMB_MAP[file];
        const breadcrumbLinks = await breadcrumbs.locator("a"); // Assuming links are <a> elements

        // Check if the number of breadcrumb links matches
        expect(await breadcrumbLinks.count()).toBe(expectedBreadcrumbs.length - 1); // Last one is strong text

        // Validate each breadcrumb link
        for (let i = 0; i < expectedBreadcrumbs.length; i++) {
            if (i < expectedBreadcrumbs.length - 1) {
                // Only check links for non-current pages
                const link = breadcrumbLinks.nth(i);
                const linkText = await link.textContent();
                const href = await link.getAttribute("href");

                // Check that the link text matches
                expect(linkText.trim()).toBe(expectedBreadcrumbs[i]);

                // Use the LINK_MAP to check the correct href
                const expectedHref = LINK_MAP[expectedBreadcrumbs[i]];

                // Check that each breadcrumb links to the correct page
                expect(href).toBe(expectedHref);
            } else {
                // Last breadcrumb should be strong text, not a link
                const currentPageText = await breadcrumbs.locator("strong").textContent();
                expect(currentPageText).toBe(expectedBreadcrumbs[i]);
            }
        }
    });
}
