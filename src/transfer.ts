import { Browser, Page } from "puppeteer";
import { config } from "./config.js";
import ora from "ora";
import { goToURL, initBrowser, openNewPage } from "./utils.js";

export async function transfer(): Promise<void> {
  const spinner = ora("Loading...").start();

  let browser: Browser | null = null;

  try {
    browser = await initBrowser();
    const targetPage = await openNewPage(browser);
    const destinationPage = await openNewPage(browser);

    await Promise.all([goToURL(targetPage, config.targetURL), goToURL(destinationPage, config.destinationURL)]);

    const localStorageData = await getLocalStorageData(targetPage, config.keys);

    if (isEmptyLocalStorage(localStorageData)) {
      throw new Error(`No data found in localStorage on ${config.targetURL} for keys: ${config.keys.join(", ")}`);
    }

    await setLocalStorageData(destinationPage, localStorageData)

    spinner.succeed(`Local Storage data transferred successfully! Keys: ${config.keys.join(", ")}`);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    spinner.fail(`Failed! Error: ${errorMessage}`);
    spinner.stop();
  } finally {
    if (browser) browser.close(); // TODO: config.closeBrowserAfter ? await browser.close() : await page.close();
    spinner.stop();
  }
}



async function getLocalStorageData(page: Page, keys: string[]): Promise<Record<string, string | null>> {
  return page.evaluate((keys) => {
    return keys.reduce<Record<string, string | null>>((acc, key) => {
      acc[key] = localStorage.getItem(key);
      return acc;
    }, {});
  }, keys);
}

async function setLocalStorageData(page: Page, data: Record<string, string | null>): Promise<void> {
  return page.evaluate((data) => {
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null) {
        localStorage.setItem(key, value);
      }
    });
  }, data);
}

function isEmptyLocalStorage(data: Record<string, string | null>): boolean {
  return !data || Object.keys(data).length === 0 || Object.values(data).every(v => v === null)
} 