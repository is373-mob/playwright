import { test, expect } from '@playwright/test';

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
    test(`test images have alt text in ${file}`, async ({ page }) => {
        await page.goto(file);
        
        // Locate all images on the page
        const images = await page.locator('img'); // Assuming images are <img> elements

        // Validate each image has alt text
        const count = await images.count(); // Get the total number of images
        for (let i = 0; i < count; i++) {
            const img = images.nth(i);
            const altText = await img.getAttribute('alt');

            // Check that the alt attribute exists and is not empty
            expect(altText).toBeTruthy(); // Ensure alt text is present
        }
    });
}
