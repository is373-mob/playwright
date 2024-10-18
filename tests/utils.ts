import fs from "fs";
import * as yaml from "js-yaml";
import path from "path";
import { exit } from "process";

// Load configuration from _config.yml and set environment-like variables once
let BASE_URL: string;
let NAVIGATION_PATHS: string[];
let MENU_LINKS: string[];

(function initializeConfig() {
    try {
        // Determine the environment based on the current directory structure
        const isProduction = __dirname.includes("website");

        // Set base paths depending on environment
        const configPath = isProduction ? path.resolve(__dirname, "../_config.yml") : path.resolve(__dirname, "../../website/_config.yml");
        const contentDir = isProduction ? path.resolve(__dirname, "../content") : path.resolve(__dirname, "../../content");

        // Load the configuration file
        const config = yaml.load(fs.readFileSync(configPath, "utf8")) as { url?: string; root?: string; menu?: Record<string, string> };
        BASE_URL = `${config.url}` || `http://localhost:4000`;

        // Add static paths
        NAVIGATION_PATHS = [];
        MENU_LINKS = [];

        // Extract menu links from the _config.yml and add them to the navigation paths
        if (config.menu) {
            for (let [name, path] of Object.entries(config.menu)) {
                MENU_LINKS.push(path);
                if (!NAVIGATION_PATHS.includes(path)) {
                    NAVIGATION_PATHS.push(path);
                }
            }
        }

        // Dynamically read paths from the content folder
        const contentFiles = fs.readdirSync(contentDir);
        contentFiles.forEach((file) => {
            if (file.endsWith(".md")) {
                const route = `/${file.replace(".md", "")}`;
                if (!NAVIGATION_PATHS.includes(route)) {
                    NAVIGATION_PATHS.push(route);
                }
            }
        });
    } catch (e) {
        console.warn("Could not load base URL, menu links, or content paths from _config.yml, falling back to default values");
        BASE_URL = "http://localhost:4000";
        NAVIGATION_PATHS = ["/"];
    }
})();

export { BASE_URL, NAVIGATION_PATHS, MENU_LINKS };
