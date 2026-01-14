// Google Apps Script for receiving form submissions and writing to Google Sheets
// 
// SETUP INSTRUCTIONS:
// 1. Go to https://script.google.com/
// 2. Create a new project
// 3. Paste this code
// 4. Click "Deploy" > "New deployment"
// 5. Choose type: "Web app"
// 6. Execute as: "Me"
// 7. Who has access: "Anyone"
// 8. Click "Deploy"
// 9. Copy the web app URL and paste it in form-handler.js

function doPost(e) {
  try {
    // Get the active spreadsheet (or create one if needed)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data from URLSearchParams
    const params = e.parameter;
    
    // Check if headers exist, if not add them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Message']);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    }
    
    // Add the form data as a new row
    sheet.appendRow([
      params.timestamp,
      params.name,
      params.email,
      params.phone,
      params.message
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional - for debugging)
function testPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        phone: '555-0123',
        message: 'This is a test message',
        timestamp: new Date().toISOString()
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}
