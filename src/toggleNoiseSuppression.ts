import puppeteer from "puppeteer";

const toggleNoiseSuppression = async (durationInSeconds: number) => {
  console.time("main");
  console.time("timeToToggleNoiseSuppression");

  const browser = await puppeteer.connect({
    browserURL: "http://localhost:9222",
  });
  const pages = await browser.pages();
  const page = pages[0];

  // Find noise suppression radio buttons
  // @ts-expect-error
  const radioButtons: HTMLOptionElement[] = await page.$$(
    ".radioBar__70669.radioPositionLeft_c8ce26"
  );
  const krispButton = radioButtons[2];
  const noneButton = radioButtons[4];

  // Turn off noise suppression
  await page.evaluate((el) => {
    el.scrollIntoView();
    el?.click();
  }, noneButton);
  console.timeEnd("timeToToggleNoiseSuppression");

  // Wait for soundboard sound to play
  await new Promise((resolve) => setTimeout(resolve, durationInSeconds * 1000));

  // Turn noise suppression back on
  await page.evaluate((el) => el?.click(), krispButton);
  await browser.disconnect();

  console.timeEnd("main");
};

if (process.argv[2] === undefined) {
  throw Error(
    "You are missing a duration argument. Make sure to run the script as 'npm run toggle -- [DURATION]'."
  );
} else if (Number.isNaN(Number(process.argv[2]))) {
  throw Error(
    "You must provide a number argument. Make sure to run the script as 'npm run toggle -- [DURATION]'."
  );
}

toggleNoiseSuppression(Number(process.argv[2]));
