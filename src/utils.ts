import puppeteer, { Browser, HTTPResponse, Page } from "puppeteer";
import { config } from "./config.js";

export async function initBrowser(): Promise<Browser> {
  return puppeteer.launch({
    headless: true,
    userDataDir: config.userDataDir,
    ignoreDefaultArgs: ["--enable-automation"],
    args: ["--no-sandbox", "--no-first-run", "--no-default-browser-check", "--disable-extensions", "--disable-sync"],
  });
}

export async function openNewPage(browser: Browser): Promise<Page> {
  return browser.newPage();
}

export async function goToURL(page: Page, url: string): Promise<HTTPResponse | null> {
  return page.goto(url, { waitUntil: "networkidle0" });
}

export function isValidUrl(url: unknown): boolean {
  if (typeof url !== "string") return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}