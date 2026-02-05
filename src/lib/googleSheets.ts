import { google } from 'googleapis';

// Initialize Google Sheets API client
const getGoogleSheetsClient = () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
};

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!;

// MAPPING KOLOM (Sesuai Tabel Baru)
const COLUMNS = {
  NO: 0,              // A
  EMAIL: 1,           // B
  FULL_NAME: 2,       // C
  PACKAGE: 3,         // D
  TEST_TYPE: 4,       // E
  ACCESS_STATUS: 5,   // F
  PRETEST_SCORE: 6,   // G
  POSTTEST_SCORE: 7,  // H
};

// Fix 1: Tambahkan registrationDate kembali ke Interface
export interface SheetRegistration {
  email: string;
  fullName: string;
  testType: 'ielts' | 'toefl' | 'toeic' | 'sat';
  registrationDate: string; // ✅ Added back
  accessStatus: 'active' | 'expired';
  pretestScore?: number;
  posttestScore?: number;
  rowIndex: number;
}

/**
 * Check if an email exists in the spreadsheet
 */
export async function verifyEmailAccess(email: string): Promise<SheetRegistration | null> {
  try {
    const sheets = getGoogleSheetsClient();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "'Test Taker Tracker'!A2:H", 
    });

    const rows = response.data.values || [];
    
    const rowIndex = rows.findIndex(row => 
      row[COLUMNS.EMAIL]?.toLowerCase().trim() === email.toLowerCase().trim()
    );

    if (rowIndex === -1) {
      return null;
    }

    const row = rows[rowIndex];
    
    const rawTestType = row[COLUMNS.TEST_TYPE]?.toLowerCase().trim();
    const testType = (rawTestType === 'ielts' || rawTestType === 'toefl' || rawTestType === 'toeic') 
      ? rawTestType 
      : 'ielts';

    // Status logic
    const rawStatus = row[COLUMNS.ACCESS_STATUS]?.toLowerCase().trim();
    const accessStatus = (rawStatus === 'expired') ? 'expired' : 'active';

    return {
      email: row[COLUMNS.EMAIL] || '',
      fullName: row[COLUMNS.FULL_NAME] || 'Member',
      testType: testType as any,
      // Fix 1: Kasih default date karena di sheet gak ada kolom tanggal
      registrationDate: new Date().toISOString(), 
      accessStatus: accessStatus,
      pretestScore: row[COLUMNS.PRETEST_SCORE] ? parseFloat(row[COLUMNS.PRETEST_SCORE]) : undefined,
      posttestScore: row[COLUMNS.POSTTEST_SCORE] ? parseFloat(row[COLUMNS.POSTTEST_SCORE]) : undefined,
      rowIndex: rowIndex + 2, 
    };
  } catch (error) {
    console.error('Error verifying email in Google Sheets:', error);
    return null;
  }
}

/**
 * Update test score
 */
export async function updateTestScore(
  email: string,
  scoreType: 'pretest' | 'posttest',
  score: number
): Promise<void> {
  try {
    const registration = await verifyEmailAccess(email);
    
    if (!registration) {
      throw new Error('Email not found in registrations');
    }

    const sheets = getGoogleSheetsClient();
    const columnLetter = scoreType === 'pretest' ? 'G' : 'H'; 
    
    const range = `'Test Taker Tracker'!${columnLetter}${registration.rowIndex}`;

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[ score.toFixed(1) ]],
      },
    });

    console.log(`Updated ${scoreType} score for ${email}: ${score}`);
  } catch (error) {
    console.error('Error updating test score:', error);
  }
}

/**
 * Fetch all registrations
 */
export async function getAllRegistrations(): Promise<SheetRegistration[]> {
  try {
    const sheets = getGoogleSheetsClient();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "'Test Taker Tracker'!A2:H",
    });

    const rows = response.data.values || [];
    
    // Fix 2: Explicit Type Casting biar TypeScript gak marah soal 'active'
    return rows.map((row, index) => ({
      email: row[COLUMNS.EMAIL] || '',
      fullName: row[COLUMNS.FULL_NAME] || '',
      testType: (row[COLUMNS.TEST_TYPE]?.toLowerCase() || 'ielts') as any,
      registrationDate: new Date().toISOString(), // Default date
      accessStatus: 'active' as 'active' | 'expired', // ✅ Fix Type Error
      rowIndex: index + 2,
    })).filter(reg => reg.email && reg.email.includes('@')); 
  } catch (error) {
    console.error('Error fetching all registrations:', error);
    return [];
  }
}