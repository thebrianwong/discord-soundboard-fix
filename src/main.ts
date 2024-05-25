// import puppeteer from "puppeteer";
import puppeteer from "puppeteer-core";

const main = async (durationInSeconds: number) => {
  console.time("main");
  const browser = await puppeteer.connect({
    // browserURL: "https://discord.com/channels/@me",
    // browserURL: "http://127.0.0.1:21222",
    browserURL: "http://localhost:9222",

    // browserWSEndpoint:
    //   "ws://127.0.0.1:9222/devtools/browser/63441216-e885-4a03-85d3-fdd12ec41e51",
  });

  // const browser = await puppeteer.launch({ headless: false });

  // const browser = await puppeteer.launch({
  //   headless: false,
  //   args: [
  //     "--user-data-dir=/Users/brian/Library/Application Support/Google/Chrome",
  //   ],
  //   executablePath: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`,
  //   // executablePath: "/opt/homebrew/bin/chromium",
  //   ignoreDefaultArgs: ["--enable-automation"],
  //   // ignoreDefaultArgs: ["--disable-extensions"],
  //   // userDataDir: "/Users/brian/Library/Application Support/Google/Chrome",
  //   // userDataDir: "~/Library/Application Support/Google/Chrome",
  //   // userDataDir: `/Users/brian/Library/'Application Support'/Google/Chrome/Default`,
  //   userDataDir: `/Users/brian/Library/Application Support/Google/Chrome`,
  // });
  // console.log(browser.browserContexts());

  // const page = await browser.newPage();
  // await page.setViewport({
  //   width: 1200,
  //   height: 900,
  // });
  // await page.goto("https://discord.com/app");

  const pages = await browser.pages();
  const page = pages[0];

  // Takes too much time and isn't actually necessary
  /*
  await page.setViewport({
    width: 1200,
    height: 900,
    await page.bringToFront();
  });
  */

  // const title = await page.title();
  // console.log(title);
  // if (title === "• Discord | Voice & Video | User Settings") {
  //   console.log("heh");
  //   // Open settings menu
  //   const userSettings = await page.waitForSelector(
  //     '::-p-aria([name="User Settings"][role="button"])'
  //     );
  //     // @ts-expect-error
  //     await page.evaluate((el) => el?.click(), userSettings);

  //     // Go to voice settings
  //     const voiceAndVideo = await page.waitForSelector(
  //       '::-p-aria([name="Voice & Video"][role="tab"])'
  //       );
  //       // @ts-expect-error
  //       await page.evaluate((el) => el?.click(), voiceAndVideo);
  //   }

  // const content = await page.content();
  // console.log(content);

  // const userSettings = await page.waitForSelector(
  //   '::-p-aria([name="User Settings"][role="button])'
  // );

  // const inVoiceSettings = await page.evaluate(() => {
  //   const slider = document.querySelector(".track_b31f5a");
  //   return slider;
  // });

  // console.log(inVoiceSettings);

  /*
  // Open settings menu
  const userSettings = await page.waitForSelector(
    '::-p-aria([name="User Settings"][role="button"])'
  );
  //// @ts-expect-error
  await page.evaluate((el) => el?.click(), userSettings);

  // Go to voice settings
  const voiceAndVideo = await page.waitForSelector(
    '::-p-aria([name="Voice & Video"][role="tab"])'
  );
  //// @ts-expect-error
  await page.evaluate((el) => el?.click(), voiceAndVideo);
  */

  // const radioDiv = await page.waitForSelector(
  //   // '::-p-aria([labelledby=":r25:"][orientation="vertical"])'
  //   '::-p-aria([disabled="false"][orientation="vertical"])'
  // );

  // const radioButtons = await page.evaluate(() => {
  //   return document.querySelectorAll(".item_b7fb7e.itemFilled__5a849");
  // });
  // const radioButtons = await page.$$("div.item_b7fb7e.itemFilled__5a849");

  // Wait for noise suppression radio buttons to render then find them
  // await page.waitForSelector(".radioBar__70669.radioPositionLeft_c8ce26");
  const radioButtons = await page.$$(
    ".radioBar__70669.radioPositionLeft_c8ce26"
  );

  // const radioButtonGroup = await page.waitForSelector(
  //   '::-p-aria([name="VOICE PROCESSING"][role="radiogroup"])'
  // );
  // // @ts-expect-error
  // const radioButtons = await page.evaluate(
  //   (el) => el?.querySelectorAll(".item_b7fb7e.itemFilled__5a849"),
  //   radioButtonGroup
  // );
  // console.log(radioButtons);
  const krispButton = radioButtons[2];
  const noneButton = radioButtons[4];

  // await noneButton?.click();
  // Turn off noise suppression
  await page.evaluate((el) => {
    el.scrollIntoView();
    // @ts-expect-error
    el?.click();
  }, noneButton);

  console.timeEnd("main");

  // Wait for soundboard sound to play
  await new Promise((resolve) => setTimeout(resolve, durationInSeconds * 1000));

  // Turn noise suppression back on
  // @ts-expect-error
  await page.evaluate((el) => el?.click(), krispButton);

  // await page.waitForSelector(".lottieIcon_c7076c");
  // const test = await page.$('::-p-aria([name="User Settings"][role="button"])');
  // const userSettings = await page.evaluate(() => {
  //   return document.querySelector('[aria-label="Message Body"]')
  // const button = document.querySelector('[aria-label="Message Body"]')
  // button?.as
  // })

  // await page.$eval('[aria-label="Message Body"]', (el) => el.click())

  // userSettings?.click();

  // const info = await userSettings?.getProperties();
  // const test = await userSettings?.click({ button: "right" });
  // await userSettings?.click();
  // await userSettings?.click();

  // const title2 = await page.title();
  // console.log(title2);
  // await browser.close();
  await browser.disconnect();
};

main(2);
