import fs from "fs";
import * as yaml from "js-yaml";

// Load configuration from _config.yml and set environment-like variables once
let BASE_URL: string;
let NAVIGATION_PATHS: string[];

(function initializeConfig() {
    try {
        const config = yaml.load(fs.readFileSync("../../../website/_config.yml", "utf8")) as { baseUrl?: string };
        BASE_URL = config.baseUrl || "http://localhost:4000";
    } catch (e) {
        console.warn("Could not load base URL from _config.yml, falling back to localhost:4000");
        BASE_URL = "http://localhost:4000";
    }

    // Mapping your Markdown files to paths that should exist in your navigation
    NAVIGATION_PATHS = ["/", "/1-0-kernel", "/2-0-virtualization", "/2-1-type1", "/2-2-type2", "/3-0-containerization", "/3-1-docker", "/3-2-kubernetes", "/3-3-k3s"];
})();

export { BASE_URL, NAVIGATION_PATHS };
