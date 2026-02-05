import { jsPDF } from "jspdf";

interface CertificateData {
  fullName: string;
  testType: string;
  attemptType: "pre-test" | "post-test";
  overallScore: number;
  listeningScore: number;
  readingScore: number;
  writingScore: number;
  speakingScore: number;
  certificateNumber: string;
  issuedDate: Date;
  verificationCode: string;
}

/**
 * Generate IELS Test Certificate as PDF Blob/DataURI
 * (Client-side friendly, no node-canvas needed)
 */
export async function generateCertificatePDF(data: CertificateData): Promise<Blob> {
  // 1. Create PDF Document (A4 Landscape: 297mm x 210mm)
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const width = doc.internal.pageSize.getWidth(); // 297
  const height = doc.internal.pageSize.getHeight(); // 210
  const centerX = width / 2;

  // --- Background & Borders ---
  
  // Background Color (Very light gray/white)
  doc.setFillColor(248, 249, 250); // #f8f9fa
  doc.rect(0, 0, width, height, "F");

  // Outer Border (IELS Blue: #2F4157)
  doc.setDrawColor(47, 65, 87);
  doc.setLineWidth(2);
  doc.rect(10, 10, width - 20, height - 20);

  // Inner Border (IELS Red: #E56668)
  doc.setDrawColor(229, 102, 104);
  doc.setLineWidth(1);
  doc.rect(15, 15, width - 30, height - 30);

  // --- Header ---
  
  doc.setTextColor(47, 65, 87); // #2F4157
  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  doc.text("IELS TEST CERTIFICATE", centerX, 35, { align: "center" });

  // Badge (Rectangle)
  doc.setFillColor(229, 102, 104); // #E56668
  doc.roundedRect(centerX - 40, 45, 80, 12, 2, 2, "F");
  
  doc.setTextColor(255, 255, 255); // White
  doc.setFontSize(16);
  doc.text(data.testType.toUpperCase(), centerX, 52.5, { align: "center" });

  // --- Student Info ---
  
  doc.setTextColor(47, 65, 87); // #2F4157
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text("This is to certify that", centerX, 75, { align: "center" });

  // Student Name
  doc.setTextColor(229, 102, 104); // #E56668
  doc.setFont("times", "bolditalic"); // Font Times looks more prestigious
  doc.setFontSize(36);
  doc.text(data.fullName, centerX, 90, { align: "center" });

  // Achievement Text
  doc.setTextColor(47, 65, 87);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  const attemptText = `has successfully completed the ${data.testType.toUpperCase()} ${data.attemptType.toUpperCase()}`;
  doc.text(attemptText, centerX, 105, { align: "center" });
  doc.text("and achieved the following scores:", centerX, 115, { align: "center" });

  // --- Scores Section ---
  const scoresY = 135;
  const scoreSpacing = 50;
  const startX = centerX - (scoreSpacing * 1.5);

  const scores = [
    { label: "Listening", score: data.listeningScore },
    { label: "Reading", score: data.readingScore },
    { label: "Writing", score: data.writingScore },
    { label: "Speaking", score: data.speakingScore },
  ];

  scores.forEach((item, index) => {
    const x = startX + (index * scoreSpacing);
    
    // Circle Background
    doc.setFillColor(240, 240, 240);
    doc.setDrawColor(200, 200, 200);
    doc.circle(x, scoresY, 12, "FD");

    // Score Value
    const scoreColor = getScoreColorRGB(item.score);
    doc.setTextColor(scoreColor.r, scoreColor.g, scoreColor.b);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(item.score.toFixed(1), x, scoresY + 2, { align: "center" });

    // Label
    doc.setTextColor(80, 80, 80);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(item.label, x, scoresY + 18, { align: "center" });
  });

  // --- Overall Score ---
  const overallY = 165;
  
  doc.setTextColor(47, 65, 87);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("OVERALL BAND SCORE", centerX, overallY, { align: "center" });

  // Big Circle
  doc.setFillColor(16, 185, 129); // #10b981 (Green)
  doc.circle(centerX, overallY + 12, 10, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.text(data.overallScore.toFixed(1), centerX, overallY + 13.5, { align: "center" });

  // --- Footer ---
  const footerY = 190;
  
  // Left: Cert No
  doc.setTextColor(100, 100, 100);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Certificate No: ${data.certificateNumber}`, 20, footerY);
  doc.text(`Verification Code: ${data.verificationCode}`, 20, footerY + 5);

  // Center: Issued Date
  const dateStr = data.issuedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Issued on: ${dateStr}`, centerX, footerY, { align: "center" });

  // Right: Branding
  doc.text("Indo-English Learning Space", width - 20, footerY, { align: "right" });

  // Signature Line
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(centerX - 30, footerY + 10, centerX + 30, footerY + 10);
  doc.setFontSize(8);
  doc.text("IELS Test Director", centerX, footerY + 15, { align: "center" });

  // Return as Blob
  return doc.output("blob");
}

/**
 * Get color RGB based on score
 */
function getScoreColorRGB(score: number) {
  if (score >= 8.0) return { r: 16, g: 185, b: 129 }; // Green
  if (score >= 7.0) return { r: 59, g: 130, b: 246 }; // Blue
  if (score >= 6.0) return { r: 245, g: 158, b: 11 }; // Orange
  return { r: 239, g: 68, b: 68 }; // Red
}

/**
 * Generate PDF and open in new tab (Preview)
 */
export async function previewCertificate(data: CertificateData) {
  const blob = await generateCertificatePDF(data);
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
}

/**
 * Generate PDF and download it
 */
export async function downloadCertificate(data: CertificateData) {
  const blob = await generateCertificatePDF(data);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `IELS-Certificate-${data.fullName}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}