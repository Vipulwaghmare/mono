import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to dashboard page
    await page.goto(process.env.BASE_URL + '/');
  });

  test('should display dashboard header and main content', async ({ page }) => {
    // Check for main heading
    await expect(page.getByRole('heading', { name: 'My Diary' })).toBeVisible();

    // Check for date navigation controls
    await expect(page.getByRole('button', { name: /chevron-left/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /chevron-right/i })).toBeVisible();

    // Check for date input
    await expect(page.getByRole('textbox', { name: /date/i })).toBeVisible();
  });

  test('should have all required tabs', async ({ page }) => {
    // Check for all tab triggers
    await expect(page.getByRole('tab', { name: 'Personal' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Work' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Health' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Gym Progress' })).toBeVisible();
  });

  test('should navigate between dates', async ({ page }) => {
    // Get current date input value
    const dateInput = page.getByRole('textbox', { name: /date/i });
    const initialDate = await dateInput.inputValue();

    // Click next day
    await page.getByRole('button', { name: /chevron-right/i }).click();
    const nextDate = await dateInput.inputValue();
    expect(nextDate).not.toBe(initialDate);

    // Click previous day
    await page.getByRole('button', { name: /chevron-left/i }).click();
    const prevDate = await dateInput.inputValue();
    expect(prevDate).toBe(initialDate);
  });

  test('should switch between tabs', async ({ page }) => {
    // Click each tab and verify content
    const tabs = ['Personal', 'Work', 'Health', 'Gym Progress'];

    for (const tab of tabs) {
      await page.getByRole('tab', { name: tab }).click();
      // Verify tab is selected
      await expect(page.getByRole('tab', { name: tab })).toHaveAttribute('data-state', 'active');
    }
  });

  test('should format date display correctly', async ({ page }) => {
    // Get the formatted date text
    const formattedDate = page.getByText(/[A-Za-z]+ \d{1,2}, \d{4}/);
    await expect(formattedDate).toBeVisible();
  });
});

