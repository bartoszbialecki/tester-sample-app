const puppeteer = require("puppeteer");
const faker = require("faker");

jest.setTimeout(30000);

let browser;
let page;
let baseUrl = "http://localhost:3000/";

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    slowMo: 50
  });

  page = await browser.newPage();

  page.emulate({
    viewport: {
      width: 800,
      height: 2400
    },
    userAgent: ""
  });
});

afterAll(() => {
  browser.close();
});

describe("Home page", () => {
  test("Header loads correctly", async () => {
    await page.goto(baseUrl);
    await page.waitForSelector(".app");

    const html = await page.$eval("h1", e => e.innerHTML);
    expect(html).toBe("My collection of books");
  }, 900000);

  test("Can go to add new book page", async () => {
    await page.goto(baseUrl);
    await page.waitForSelector("#add-book-button");

    await page.click("button#add-book-button");
    await page.waitForSelector(".add-new-book");

    const html = await page.$eval("h1", e => e.innerHTML);
    expect(html).toBe("Add new book");
  });
});

describe("Add book page", () => {
  test("Add new book correctly", async () => {
    const author = faker.name.firstName() + " " + faker.name.lastName();
    const title = faker.random.words();
    const isbn = faker.random.uuid();

    await page.goto(baseUrl + "new-book");
    await page.waitForSelector(".new-book-form");

    let isbnInput = "input[name=isbn]";
    await page.click(isbnInput);
    await page.type(isbnInput, isbn);

    let titleInput = "input[name=title]";
    await page.click(titleInput);
    await page.type(titleInput, title);

    let authorInput = "input[name=author]";
    await page.click(authorInput);
    await page.type(authorInput, author);

    await page.click("button[type=submit]");

    await page.waitForSelector(".success-message");

    const html = await page.$eval(".success-message", e => e.innerHTML);
    expect(html).toBe("The book was added.");
  }, 900000);
});
