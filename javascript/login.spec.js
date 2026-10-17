// @ts-check
const { test, expect } = require('@playwright/test');

// Demo login flow against Playwright's practice site:
// https://practicetestautomation.com/practice-test-login/
const LOGIN_URL = 'https://practicetestautomation.com/practice-test-login/';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
  });

  test('logs in with valid credentials', async ({ page }) => {
    await page.getByLabel('Username').fill('student');
    await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: 'Submit' }).click();

    // Expect to land on the success page.
    await expect(page).toHaveURL(/logged-in-successfully/);
    await expect(page.getByText(/Logged In Successfully/i)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  });

  test('shows an error for an invalid username', async ({ page }) => {
    await page.getByLabel('Username').fill('incorrectUser');
    await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: 'Submit' }).click();

    const error = page.locator('#error');
    await expect(error).toBeVisible();
    await expect(error).toContainText('Your username is invalid!');
  });

  test('shows an error for an invalid password', async ({ page }) => {
    await page.getByLabel('Username').fill('student');
    await page.getByLabel('Password').fill('wrongPassword');
    await page.getByRole('button', { name: 'Submit' }).click();

    const error = page.locator('#error');
    await expect(error).toBeVisible();
    await expect(error).toContainText('Your password is invalid!');
  });
});
