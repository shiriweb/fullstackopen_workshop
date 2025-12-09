const { test, describe, expect, beforeEach } = require("@playwright/test");
const { loginWith, createNote } = require("./helper");

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    await page.goto("/");
  });
  test("front page can be opened", async ({ page }) => {
    const locator = page.getByText("Notes");
    await expect(locator).toBeVisible();
    await expect(page.getByText("Note App, Tej Center")).toBeVisible();
  });

  test("user can log in", async ({ page }) => {
    await loginWith(page, "mluukkai", "salainen");
    await expect(page.getByText("Matti Luukkainen logged in")).toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");
    });

    test("a new note can be created", async ({ page }) => {
      await createNote(page, "a note created by playwright");

      await expect(
        page.getByText("a note created by playwright")
      ).toBeVisible();
    });

    describe("and several notes exist", () => {
      beforeEach(async ({ page }) => {
        await createNote(page, "first note");
        await createNote(page, "second note");
        
      });

      test("one of those can be made nonimportant", async ({ page }) => {
        await page.pause();
        const otherNoteElement = page.getByText("first note");

        await otherNoteElement.getByRole("button", { name: "true" }).click();
        await expect(otherNoteElement.getByText("false")).toBeVisible();
      });
    });

    // test("login fails with wrong password", async ({ page }) => {
    //   await loginWith(page, "mluukkai", "wrong");

    //   await expect(page.getByText("wrong credentials")).toBeVisible();
    // });
  });
});
