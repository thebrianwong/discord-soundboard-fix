import puppeteer from "puppeteer";
// import puppeteer from "puppeteer-core";

const navigateToVoiceSettings = async () => {
  console.time("nav");
  const browser = await puppeteer.connect({
    browserURL: "http://localhost:9222",
  });
  const pages = await browser.pages();
  const page = pages[0];
  await page.bringToFront();
  await page.setViewport({
    width: 1200,
    height: 900,
  });

  // Open settings menu
  const userSettings = await page.waitForSelector(
    '::-p-aria([name="User Settings"][role="button"])'
  );
  // @ts-expect-error
  await page.evaluate((el) => el?.click(), userSettings);

  // Go to voice settings
  const voiceAndVideo = await page.waitForSelector(
    '::-p-aria([name="Voice & Video"][role="tab"])'
  );
  // @ts-expect-error
  await page.evaluate((el) => el?.click(), voiceAndVideo);
  console.timeEnd("nav");
};

navigateToVoiceSettings();
