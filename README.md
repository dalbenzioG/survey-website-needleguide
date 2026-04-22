# Survey Website - Complete Setup Guide 🚀

Hey there! 👋 This guide will walk you through creating your own survey website from scratch. It's like building with LEGO blocks - we'll go step by step, and you'll have a working survey site at the end!

## Acknowledgments

This app was built using the template provided by the brilliant **[Maha](https://github.com/MahaK21)** on GitHub: [https://github.com/MahaK21/survey-website](https://github.com/MahaK21/survey-website).

## What You'll Build

A beautiful, multi-step survey website that:

- Collects user responses
- Saves data to Google Sheets
- Looks professional with Material-UI
- Works on phones, tablets, and computers
- Deploys easily to the web

---

## 📋 Prerequisites

Before we start, make sure you have:

- [Node.js](https://nodejs.org/) installed (version 16 or higher)
- A Google account (for Google Sheets)
- A GitHub account (for hosting)
- A Vercel account (for deployment)

---

## 🚀 Step 1: Get the Code

### Option A: Clone the Repository

```bash
# Open your terminal and run:
git clone https://github.com/your-username/survey-website.git
cd survey-website
```

### Option B: Download and Extract

1. Click the green "Code" button on GitHub
2. Select "Download ZIP"
3. Extract the folder
4. Open terminal in the extracted folder

---

## 🏗️ Step 2: Understand the Structure

Here's what's in the project:

```
survey-website/
├── src/
│   ├── components/
│   │   ├── sections/          # Survey sections
│   │   │   ├── Demographics.tsx
│   │   │   ├── SystemUsabilityScale.tsx
│   │   │   ├── NasaTLX.tsx
│   │   │   └── GeneralFeedback.tsx
│   │   └── Survey.tsx        # Main survey component
│   ├── services/
│   │   └── googleSheets.ts   # Google Sheets connection
│   └── App.tsx               # Main app file
├── public/
│   ├── logos/                # Your organization logos
│   └── index.html
├── google-apps-script/
│   └── Code.gs              # Google Apps Script code
└── package.json             # Dependencies and scripts
```

---

## 🎨 Step 3: Customize Your Survey

### Change the Website Name

**File to edit:** `public/index.html`

```html
<!-- Change this line: -->
<title>Survey Website</title>
```

**File to edit:** `src/App.tsx`

```typescript
// Change the title in the Survey component:
<Typography variant="h4" gutterBottom align="center">
  Your Survey Title Here
</Typography>
```

### Add or Remove Survey Sections

**File to edit:** `src/components/Survey.tsx`

1. **Add a new section:**

   ```typescript
   // Add your new section import at the top
   import YourNewSection from './sections/YourNewSection';

   // Add to the steps array:
   const steps = ['Demographics', 'Your New Section', 'System Usability Scale', 'NASA-TLX', 'General Feedback'];

   // Add to the renderStepContent function:
   case 1: // Adjust the number based on position
     return <YourNewSection
       onDataChange={handleYourNewSectionChange}
       initialData={formData.yourNewSection}
     />;
   ```

2. **Remove a section:**
   - Delete the import line
   - Remove from the `steps` array
   - Remove the case from `renderStepContent`
   - Remove the data from `formData` state

### Change Survey Questions

Each section is in its own file in `src/components/sections/`:

- **Demographics:** `Demographics.tsx`
- **System Usability Scale:** `SystemUsabilityScale.tsx`
- **NASA-TLX:** `NasaTLX.tsx`
- **General Feedback:** `GeneralFeedback.tsx`

Just edit the questions in these files!

In my NASA-TLX survey section I had 2 conditions for each of the 6 questions. You can make it 1 section or more if you'd like.

### Update Logos and Branding

**File to edit:** `src/App.tsx`

```typescript
// Replace the logos in the footer:
<img src="/logos/yourLogo.png" alt="Your Organization" height={40} />
```

**Add your logos to:** `public/logos/` folder

---

## 📊 Step 4: Set Up Google Sheets

### Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Survey Responses"
4. **Important:** Note the spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID_HERE/edit
   ```

### Set Up Google Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy the entire contents of `google-apps-script/Code.gs` (you will need to change this according to your survey sections and survey questions!!)
4. Paste it into the Apps Script editor
5. Click **Save** (the disk icon)
6. Click **Deploy** → **New deployment**
7. Choose **Web app** as the type
8. Set these settings:
   - **Execute as:** Me
   - **Who has access:** Anyone
9. Click **Deploy**
10. **Copy the deployment URL** (you'll need this next!)

### Understanding and Editing the Google Apps Script Code

The `Code.gs` file tells Google Sheets how to save your survey data. Here's how it works:

**What the code does:**

- Receives survey data from your website
- Organizes it into a row format
- Saves it to your Google Sheet

**How to customize it for your survey:**

1. **Look at the `row` array** (around line 15-50). Each item in this array becomes a column in your Google Sheet:

```javascript
const row = [
  data.timestamp, // Column A: When the survey was submitted
  data.demographics.initials, // Column B: User's initials
  data.demographics.specialty, // Column C: User's specialty
  // ... and so on
];
```

2. **Match your survey structure:**
   - If your survey has different sections, update the `data.` references
   - If you have different questions, add or remove items from the array
   - The order matters! Column A = first item, Column B = second item, etc.

**Example for a simple survey:**

```javascript
const row = [
  data.timestamp, // When submitted
  data.demographics.name, // User's name
  data.demographics.email, // User's email
  data.survey.question1, // Answer to question 1
  data.survey.question2, // Answer to question 2
  data.survey.rating, // Rating (1-5)
  data.feedback.comments, // Text comments
];
```

**Important:** The `data.` references must match exactly what your survey sends. Check your survey components to see what data they're sending!

### Understanding Your Google Sheet Structure

After you set up the Apps Script, your Google Sheet will automatically create columns based on your code. Here's what each column will contain:

**For the current survey structure:**

| Column | Data                         | Example                            |
| ------ | ---------------------------- | ---------------------------------- |
| A      | Timestamp                    | "2024-01-15T10:30:00.000Z"         |
| B      | Initials                     | "JD"                               |
| C      | Specialty                    | "Radiology"                        |
| D      | Other Specialty              | "Interventional"                   |
| E      | Training Status              | "Resident"                         |
| F      | Other Training Status        | ""                                 |
| G      | Experience                   | "2-5 years"                        |
| H      | Used 3D Slicer               | "Yes"                              |
| I      | Slicer Familiarity           | 4                                  |
| J-P    | SUS Questions 1-10           | "Strongly Agree", "Disagree", etc. |
| Q-V    | NASA-TLX Without Depth Guide | 1, 3, 2, 4, 1, 5                   |
| W-BB   | NASA-TLX With Depth Guide    | 2, 1, 3, 2, 1, 4                   |
| BC     | Depth Guide Usefulness       | 4                                  |
| BD     | Shortcuts Help               | "Yes"                              |
| BE     | Shortcuts Comments           | "Very helpful shortcuts"           |
| BF     | Icons Layout Clarity         | 3                                  |
| BG     | Responsiveness               | 4                                  |
| BH     | Overall Feedback             | "Great tool overall"               |

**Example data from a user response:**

```
A: "2024-01-15T10:30:00.000Z" | B: "JD" | C: "Radiology" | D: "Interventional" | E: "Resident" | F: "" | G: "2-5 years" | H: "Yes" | I: 4
J: "Strongly Agree" | K: "Disagree" | L: "Agree" | M: "Neutral" | N: "Strongly Agree" | O: "Disagree" | P: "Agree" | Q: "Strongly Disagree" | R: "Agree" | S: "Neutral"
T: 1 | U: 3 | V: 2 | W: 4 | X: 1 | Y: 5
Z: 2 | AA: 1 | AB: 3 | AC: 2 | AD: 1 | AE: 4
AF: 4 | AG: "Yes" | AH: "Very helpful shortcuts" | AI: 3 | AJ: 4 | AK: "Great tool overall"
```

**To customize for your survey:**

1. **Change the column headers** in your Google Sheet to match your questions
2. **Update the Apps Script code** to match your survey data structure
3. **Test with a sample response** to make sure everything lines up

**Pro tip:** You can add column headers in your Google Sheet to make it easier to understand the data:

- Row 1: Add headers like "Timestamp", "Name", "Question 1", etc.
- The Apps Script will add data starting from Row 2

### Connect Your Website to Google Sheets

**File to edit:** `src/services/googleSheets.ts`

Replace the URL in line 15 with your deployment URL you just copied:

```typescript
const response = await fetch('YOUR_DEPLOYMENT_URL_HERE', {
```

**To find your deployment URL:**

1. Go back to Apps Script
2. Click **Deploy** → **Manage deployments**
3. Click the three dots next to your deployment
4. Select **Web app**
5. Copy the URL

---

## 🚀 Step 5: Test Locally

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm start
   ```

3. **Open your browser** to `http://localhost:3000`

4. **Test your survey** - fill it out and check if data appears in your Google Sheet!

---

## 🌐 Step 6: Deploy to Vercel

### Option A: Deploy with Vercel CLI

1. **Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Deploy:**

   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Login to Vercel (if needed)
   - Choose your project settings
   - Wait for deployment

### Option B: Deploy with GitHub Integration

1. **Push your code to GitHub:**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Go to [Vercel](https://vercel.com)**
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Deploy!**

### Option C: Drag and Drop

1. **Build your project:**

   ```bash
   npm run build
   ```

2. **Go to [Vercel](https://vercel.com)**
3. **Drag the `build` folder** to the Vercel dashboard
4. **Your site is live!**

---

## 🎉 You're Done!

Your survey website is now live! 🎊

**Your survey URL will look like:** `https://your-project-name.vercel.app`

---

## 🔧 Troubleshooting

### Common Issues:

**"Module not found" errors:**

```bash
npm install
```

**Google Sheets not receiving data:**

- Check your deployment URL in `googleSheets.ts`
- Make sure your Apps Script is deployed as a web app
- Check the Apps Script logs for errors

**Vercel deployment fails:**

- Make sure all files are committed to git
- Check that `package.json` has all dependencies
- Try deploying locally first with `npm start`

### Need Help?

- Check the [React documentation](https://reactjs.org/)
- Look at [Material-UI examples](https://mui.com/material-ui/getting-started/)
- Google Apps Script [documentation](https://developers.google.com/apps-script)

---

## 🎯 Next Steps

Want to make it even better?

- **Add more questions** to your survey sections
- **Change the colors** in `src/App.tsx` (look for the `theme` object)
- **Add a progress bar** or animations
- **Create different surveys** for different audiences
- **Add data visualization** to see your results

---

**Happy surveying! 📝✨**

\_Made with ❤️
