function doPost(e) {
  try {
    // Log the incoming request
    Logger.log("Received request");
    Logger.log("Request contents:", e.postData.contents);

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Log the parsed data
    Logger.log("Parsed data:", data);

    const trainingLevelResolved =
      data.demographics.trainingLevel === "Other"
        ? data.demographics.trainingLevelOther || ""
        : data.demographics.trainingLevel || "";

    // Flatten the data structure (demographics: ID, training level when Other uses free text)
    const row = [
      data.timestamp,
      data.demographics.participantId || "",
      trainingLevelResolved,
      data.demographics.ultrasoundExperienceYears || "",
      data.demographics.needlePlacementsEstimate || "",
      // SUS questions
      data.sus.q1 || "",
      data.sus.q2 || "",
      data.sus.q3 || "",
      data.sus.q4 || "",
      data.sus.q5 || "",
      data.sus.q6 || "",
      data.sus.q7 || "",
      data.sus.q8 || "",
      data.sus.q9 || "",
      data.sus.q10 || "",
      // NASA-TLX: Freehand technique (6 subscales)
      data.nasaTlx.freehand[0] || 0,
      data.nasaTlx.freehand[1] || 0,
      data.nasaTlx.freehand[2] || 0,
      data.nasaTlx.freehand[3] || 0,
      data.nasaTlx.freehand[4] || 0,
      data.nasaTlx.freehand[5] || 0,
      // NASA-TLX: In-plane guide
      data.nasaTlx.inPlaneGuide[0] || 0,
      data.nasaTlx.inPlaneGuide[1] || 0,
      data.nasaTlx.inPlaneGuide[2] || 0,
      data.nasaTlx.inPlaneGuide[3] || 0,
      data.nasaTlx.inPlaneGuide[4] || 0,
      data.nasaTlx.inPlaneGuide[5] || 0,
      // Post-session evaluation
      data.generalFeedback.preferredTechnique || "",
      data.generalFeedback.preferredTechniqueWhy || "",
      data.generalFeedback.mostAccuratePosteriorCalyx || "",
      data.generalFeedback.mostAccuratePosteriorCalyxWhy || "",
      data.generalFeedback.clinicalChoice || "",
      data.generalFeedback.clinicalChoiceWhy || "",
      data.generalFeedback.easeLearnNeedleGuide || "",
      data.generalFeedback.trainingRequiredBeforeClinical || "",
    ];

    // Add the row to the sheet
    sheet.appendRow(row);
    Logger.log("Row added successfully");

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        result: "success",
        message: "Survey submitted successfully",
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Log the error
    Logger.log("Error in doPost:", error);
    Logger.log("Error stack:", error.stack);

    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        result: "error",
        message: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle CORS preflight requests
function doOptions(e) {
  return ContentService.createTextOutput("").setMimeType(
    ContentService.MimeType.TEXT
  );
}
