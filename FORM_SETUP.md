# Contact Form Google Sheets Integration Setup

## Step 1: Create/Open a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet or open an existing one
3. Name it something like "Sequim AI Contact Form Submissions"

## Step 2: Set Up Google Apps Script
1. In your Google Sheet, click **Extensions** > **Apps Script**
2. Delete any existing code
3. Copy the entire contents of `google-apps-script.js` from this project
4. Paste it into the Apps Script editor
5. Click the save icon (💾) and name the project (e.g., "Contact Form Handler")

## Step 3: Deploy as Web App
1. Click **Deploy** > **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: "Contact form submission handler"
   - **Execute as**: **Me** (your Google account)
   - **Who has access**: **Anyone**
5. Click **Deploy**
6. **Authorize** the script (you'll need to grant permissions)
7. Copy the **Web app URL** that appears (it will look like: `https://script.google.com/macros/s/...`)

## Step 4: Update Your Website
1. Open `form-handler.js`
2. Find the line: `const scriptURL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';`
3. Replace `'YOUR_GOOGLE_SCRIPT_URL_HERE'` with your actual web app URL (keep the quotes)
4. Save the file

## Step 5: Update Dockerfile
Add `form-handler.js` to your Docker image:

```dockerfile
COPY index.html styles.css favicon.svg form-handler.js ./
```

## Step 6: Test
1. Deploy your updated site
2. Fill out the contact form and submit
3. Check your Google Sheet - you should see a new row with the submission data

## Troubleshooting
- **CORS errors**: Make sure you deployed with "Who has access: Anyone"
- **No data appearing**: Check the Apps Script execution logs (View > Executions)
- **Permission errors**: Re-authorize the script in the deployment settings

## Sheet Columns
The script will automatically create these columns:
- Timestamp
- Name
- Email
- Phone
- Message
