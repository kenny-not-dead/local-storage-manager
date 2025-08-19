import { Browser } from "puppeteer";
import { config } from "./config.js";
import ora from "ora";
import { goToURL, initBrowser, isValidUrl, openNewPage } from "./utils.js";
import chalk from 'chalk';

export async function getAllLocalStorageData(target: unknown): Promise<void> {
  const spinner = ora("Loading...").start();
  let url;

  switch (target) {
    case "destination":
      url = config.destinationURL;
      break;
    case "target": {
      url = config.targetURL;
      break;
    }
    default: {
      url = target;
    }
  }

  if (!isValidUrl(url)) {
    spinner.fail(`Failed! Error: ${target} not URL`);
    spinner.stop();
    return
  }

  let browser: Browser | null = null;

  try {
    browser = await initBrowser();
    const page = await openNewPage(browser);
    await goToURL(page, url as string);

    const data = await page.evaluate(() => {
      return Object.entries(localStorage);
    })

    if (!data || data.length === 0) {
      spinner.succeed("Local storage is empty");
      return;
    }

    spinner.succeed("Local storage data successfully retrieved");

    for (let i = 0; i < data.length; i++) {
      const key = !isNaN(data[i][1]) ? chalk.blue(data[i][1]) : chalk.green(data[i][1])
      console.log(`${i + 1}.`, chalk.white(data[i][0], ": "), key)
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    spinner.fail(`Failed! Error: ${errorMessage}`);
    spinner.stop();
  } finally {
    if (browser) browser.close(); // TODO: config.closeBrowserAfter ? await browser.close() : await page.close();
    spinner.stop();
  }
}
