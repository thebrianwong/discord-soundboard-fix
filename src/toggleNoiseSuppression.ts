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
  const radioButtons = await page.$$(
    ".radioBar__70669.radioPositionLeft_c8ce26"
  );
  const krispButton = radioButtons[0];
  const noneButton = radioButtons[2];

  // Turn off noise suppression
  await page.evaluate((el) => {
    el.scrollIntoView();
    // @ts-expect-error
    el?.click();
  }, noneButton);
  console.timeEnd("timeToToggleNoiseSuppression");

  // Wait for soundboard sound to play
  await new Promise((resolve) => setTimeout(resolve, durationInSeconds * 1000));

  // Turn noise suppression back on
  // @ts-expect-error
  await page.evaluate((el) => el?.click(), krispButton);
  await browser.disconnect();

  console.timeEnd("main");
};

toggleNoiseSuppression(Number(process.argv[2]));
