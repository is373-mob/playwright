/*
import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

// Directory containing Markdown files
const CONTENT_DIR = path.join(__dirname, "../../../content");

// Extracted links JSON file
const OUTPUT_FILE = path.join(__dirname, "extractedLinks.json");

// Path to Hexo _config.yml file
const CONFIG_FILE = path.join(__dirname, "../../../website/_config.yml");

// Regex to match Markdown links - [text](link)
const LINK_REGEX = /\[[^\]]+\]\(([^\)]+)\)/g;

// Load root from Hexo _config.yml
type Config = {
    root: string;
};

function loadConfig(): Config {
    const configContent = fs.readFileSync(CONFIG_FILE, "utf-8");
    const config = yaml.load(configContent) as Config;
    return config;
}

const { root: ROOT_PATH } = loadConfig();

// Extract internal links from Markdown files
function extractInternalLinks(): { source: string; link: string }[] {
    const links: { source: string; link: string }[] = [];

    // Read all files
    const files = fs.readdirSync(CONTENT_DIR);

    files.forEach((file) => {
        const filePath = path.join(CONTENT_DIR, file);

        // Only markdown files
        if (path.extname(file) === ".md") {
            const content = fs.readFileSync(filePath, "utf-8");
            let match;

            // Find all links
            while ((match = LINK_REGEX.exec(content)) !== null) {
                let link = match[1];

                // Only internal links
                if (!link.startsWith("http")) {
                    // Normalize links
                    link = link.replace(/^\.\//, "").replace(/^\.\.\//, "");
                    link = link.replace(/\.md$/, ".html");
                    links.push({ source: file, link });
                }
            }
        }
    });

    // Write links to JSON file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(links, null, 2));
    return links;
}

// Extract links before running tests
let links: { source: string; link: string }[] = [];

// Playwright Tests to Extract Links
test.describe("Extract Internal Links", () => {
    test.beforeAll(() => {
        links = extractInternalLinks();
    });

    test("should extract all internal links", () => {
        expect(links.length).toBeGreaterThan(0); // Ensure at least one link is extracted
    });
});

// Playwright Tests to Verify Links
test.describe("Internal Links Verification", () => {
    test.beforeAll(() => {
        links = extractInternalLinks();
    });

    test("should verify all internal links are accessible", async ({ page }) => {
        for (const { source, link } of links) {
            const completeURL = `http://localhost:4000${ROOT_PATH}${link}`;
            console.log(`Testing URL: ${completeURL} from source file: ${source}`);

            try {
                // Navigate to the URL and expect a 200 response
                const response = await page.goto(completeURL, { timeout: 10000 }); // 10 second timeout
                if (response?.status() !== 200) {
                    console.error(`Link verification failed: ${link} in file: ${source}. Received status: ${response?.status()}`);
                }
                expect(response?.status()).toBe(200);
            } catch (error) {
                console.error(`Failed to verify link: ${link} in file: ${source}. Error: ${error.message}`);
                throw error;
            }
        }
    });
});

// Playwright Tests to Validate Content
test.describe("Content Validation - Title Check", () => {
    test.beforeAll(() => {
        links = extractInternalLinks();
    });

    test("should ensure the page title is not empty", async ({ page }) => {
        for (const { source, link } of links) {
            const completeURL = `http://localhost:4000${ROOT_PATH}${link}`;

            try {
                // Navigate to the URL and expect a 200 response
                const response = await page.goto(completeURL, { timeout: 10000 }); // 10 second timeout
                expect(response?.status()).toBe(200);

                // Check that the page title is not empty
                const pageTitle = await page.title();
                expect(pageTitle).not.toBeFalsy(); // Ensure title exists and is not empty
            } catch (error) {
                console.error(`Failed to validate title for link: ${link} in file: ${source}. Error: ${error.message}`);
                throw error;
            }
        }
    });
});

test.describe("Content Validation - Header Check", () => {
    test.beforeAll(() => {
        links = extractInternalLinks();
    });

    test("should ensure the page contains at least one header element", async ({ page }) => {
        for (const { source, link } of links) {
            const completeURL = `http://localhost:4000${ROOT_PATH}${link}`;

            try {
                // Navigate to the URL and expect a 200 response
                const response = await page.goto(completeURL, { timeout: 10000 }); // 10 second timeout
                expect(response?.status()).toBe(200);

                // Check for at least one header element (e.g., <h1>, <h2>, <h3>)
                const headerExists = await page.locator("h1, h2, h3").first().isVisible();
                expect(headerExists).toBeTruthy(); // Ensure at least one header element is present
            } catch (error) {
                console.error(`Failed to validate headers for link: ${link} in file: ${source}. Error: ${error.message}`);
                throw error;
            }
        }
    });
});

test.describe("Content Validation - Body Content Check", () => {
    test.beforeAll(() => {
        links = extractInternalLinks();
    });

    test("should ensure the page body contains meaningful content", async ({ page }) => {
        for (const { source, link } of links) {
            const completeURL = `http://localhost:4000${ROOT_PATH}${link}`;

            try {
                // Navigate to the URL and expect a 200 response
                const response = await page.goto(completeURL, { timeout: 10000 }); // 10 second timeout
                expect(response?.status()).toBe(200);

                // Ensure the page body contains meaningful content
                const bodyText = await page.locator("body").innerText();
                expect(bodyText.trim()).not.toBe(""); // Ensure body is not empty or whitespace only
            } catch (error) {
                console.error(`Failed to validate body content for link: ${link} in file: ${source}. Error: ${error.message}`);
                throw error;
            }
        }
    });
});

*/
