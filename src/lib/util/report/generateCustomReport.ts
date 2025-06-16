// import fs from 'fs';
// import path from 'path';

// interface ReportStats {
//   tests: number;
//   passes: number;
//   failures: number;
//   pending: number;
//   duration: number;
// }

// interface Report {
//   stats: ReportStats;
//   results: any[];
// }

// interface ReportMeta {
//   fileName: string;
//   date: string;
//   stats: ReportStats;
// }

// // Paths
// const reportsDir = path.resolve('./reports');
// const reportHistoryFile = path.join(reportsDir, 'report-history.json');
// const latestReportFile = path.join(reportsDir, 'report-latest.json');

// // Load report history
// function loadReportHistory(): ReportMeta[] {
//   if (fs.existsSync(reportHistoryFile)) {
//     return JSON.parse(fs.readFileSync(reportHistoryFile, 'utf8'));
//   }
//   return [];
// }

// // Save report history
// function saveReportHistory(history: ReportMeta[]): void {
//   fs.writeFileSync(reportHistoryFile, JSON.stringify(history, null, 2));
// }

// // Analyze and compare reports
// function analyzeReports(latestReport: Report, history: ReportMeta[]): string {
//   const previousReport = history.length > 0 ? history[history.length - 1] : null;

//   const analysis = {
//     date: new Date().toISOString(),
//     latestStats: latestReport.stats,
//     previousStats: previousReport ? previousReport.stats : null,
//     differences: previousReport
//       ? {
//           tests: latestReport.stats.tests - previousReport.stats.tests,
//           passes: latestReport.stats.passes - previousReport.stats.passes,
//           failures: latestReport.stats.failures - previousReport.stats.failures,
//           pending: latestReport.stats.pending - previousReport.stats.pending,
//         }
//       : null,
//   };

//   // Create HTML summary
//   const html = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>Custom Test Report</title>
//       <style>
//         body { font-family: Arial, sans-serif; margin: 20px; }
//         h1 { color: #4CAF50; }
//         .summary, .comparison { margin-bottom: 20px; }
//         .pass { color: green; }
//         .fail { color: red; }
//         .pending { color: orange; }
//       </style>
//     </head>
//     <body>
//       <h1>Test Report Analysis</h1>

//       <div class="summary">
//         <h2>Latest Report</h2>
//         <p>Date: ${analysis.date}</p>
//         <p>Total Tests: ${latestReport.stats.tests}</p>
//         <p class="pass">Passed: ${latestReport.stats.passes}</p>
//         <p class="fail">Failed: ${latestReport.stats.failures}</p>
//         <p class="pending">Pending: ${latestReport.stats.pending}</p>
//         <p>Duration: ${latestReport.stats.duration} ms</p>
//       </div>

//       ${
//         previousReport
//           ? `
//           <div class="comparison">
//             <h2>Comparison with Previous Report</h2>
//             <p>Total Tests: ${previousReport.stats.tests} → ${latestReport.stats.tests} (${
//               analysis.differences.tests >= 0 ? '+' : ''
//             }${analysis.differences.tests})</p>
//             <p class="pass">Passed: ${previousReport.stats.passes} → ${latestReport.stats.passes} (${
//               analysis.differences.passes >= 0 ? '+' : ''
//             }${analysis.differences.passes})</p>
//             <p class="fail">Failed: ${previousReport.stats.failures} → ${
//               latestReport.stats.failures
//             } (${analysis.differences.failures >= 0 ? '+' : ''}${analysis.differences.failures})</p>
//             <p class="pending">Pending: ${previousReport.stats.pending} → ${
//               latestReport.stats.pending
//             } (${analysis.differences.pending >= 0 ? '+' : ''}${analysis.differences.pending})</p>
//           </div>
//         `
//           : '<p>No previous report available for comparison.</p>'
//       }
//     </body>
//     </html>
//   `;

//   return html;
// }

// // Main function
// function generateCustomReport(): void {
//   if (!fs.existsSync(latestReportFile)) {
//     console.error('No latest report found!');
//     return;
//   }

//   const history = loadReportHistory();
//   const latestReport = JSON.parse(fs.readFileSync(latestReportFile, 'utf8')) as Report;

//   // Save the latest report to history
//   history.push({
//     fileName: path.basename(latestReportFile),
//     date: new Date().toISOString(),
//     stats: latestReport.stats,
//   });

//   saveReportHistory(history);

//   // Generate analysis report
//   const htmlReport = analyzeReports(latestReport, history);

//   // Save custom HTML report
//   const customReportPath = path.join(reportsDir, `custom-report-${Date.now()}.html`);
//   fs.writeFileSync(customReportPath, htmlReport);

//   console.log(`Custom report generated: ${customReportPath}`);
// }

// generateCustomReport();






// import fs from 'fs';
// import path from 'path';

// interface TestResult {
//   run: string;
//   passed: number;
//   failed: number;
//   total: number;
//   passPercentage: number;
//   failPercentage: number;
//   scenarios: { title: string; status: string }[]; // Added scenarios field
// }

// // Correct path resolution
// const REPORTS_DIR = path.resolve(__dirname, '../../../../output/reports/history');
// const OUTPUT_FILE = path.resolve(__dirname, '../../../../output/reports/custom-report.html');

// // Ensure the reports directory exists
// if (!fs.existsSync(REPORTS_DIR)) {
//   console.log(`Directory not found: ${REPORTS_DIR}`);
//   console.log('Creating the reports directory...');
//   fs.mkdirSync(REPORTS_DIR, { recursive: true });
// }

// // Read JSON reports from the directory
// function loadReports(): TestResult[] {
//   console.log('Using REPORTS_DIR:', REPORTS_DIR);

//   // Read all files in the directory
//   const allFiles = fs.readdirSync(REPORTS_DIR);
//   console.log('Found files:', allFiles);

//   // Filter for JSON test reports
//   const jsonFiles = allFiles.filter(file => file.includes('test-report') && file.endsWith('.json'));
//   console.log('Filtered JSON files:', jsonFiles);

//   // Check if no JSON files are found
//   if (jsonFiles.length === 0) {
//     console.log('No JSON reports found in the directory.');
//     console.log('Please add test-report JSON files to the directory.');
//     process.exit(0); // Exit gracefully if no files are found
//   }

//   // Log jsonFiles before proceeding
//   console.log('Number of JSON files:', jsonFiles.length);
//   console.log('jsonFiles:', jsonFiles);

//   // Ensure jsonFiles is an array and not undefined
//   if (!Array.isArray(jsonFiles)) {
//     console.error('Expected an array of JSON files but received:', jsonFiles);
//     process.exit(1);
//   }

//   // Parse each JSON file and extract the required details
//   return jsonFiles.map((file, index) => {
//     const filePath = path.join(REPORTS_DIR, file);
//     const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

//     // Extract test stats (pass, fail, total)
//     const passed = data.stats.passes;
//     const failed = data.stats.failures;
//     const total = data.stats.tests;

//     // Extract test scenarios (titles and statuses)
//     const scenarios = data.tests.map((test: any) => ({
//       title: test.title,
//       status: test.status,
//     }));

//     return {
//       run: `Run ${index + 1}`, // Unique label for each run
//       passed,
//       failed,
//       total,
//       passPercentage: (passed / total) * 100,
//       failPercentage: (failed / total) * 100,
//       scenarios, // Include scenarios in the result
//     };
//   });
// }

// // Generate HTML with Chart.js for analytics and scenarios
// function generateHTML(results: TestResult[]) {
//   const runs = results.map(result => result.run);
//   const passPercentages = results.map(result => result.passPercentage.toFixed(2));
//   const failPercentages = results.map(result => result.failPercentage.toFixed(2));

//   // Generate HTML content for the latest test scenarios
//   const scenariosHTML = results.map(result => {
//     return `
//       <h3>${result.run}</h3>
//       <ul>
//         ${result.scenarios.map(scenario => `
//           <li>${scenario.title} - <strong>${scenario.status}</strong></li>
//         `).join('')}
//       </ul>
//     `;
//   }).join('');

//   return `
//   <!DOCTYPE html>
//   <html lang="en">
//   <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Custom Test Report</title>
//     <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
//   </head>
//   <body>
//     <h1>Custom Test Report with Historical Analysis</h1>
//     <canvas id="testResultsChart" width="800" height="400"></canvas>
//     <div id="testScenarios">
//       ${scenariosHTML}
//     </div>
//     <script>
//       const ctx = document.getElementById('testResultsChart').getContext('2d');
//       new Chart(ctx, {
//         type: 'bar',
//         data: {
//           labels: ${JSON.stringify(runs)},
//           datasets: [
//             {
//               label: 'Pass Percentage (%)',
//               data: ${JSON.stringify(passPercentages)},
//               backgroundColor: 'rgba(75, 192, 192, 0.6)',
//               borderColor: 'rgba(75, 192, 192, 1)',
//               borderWidth: 1
//             },
//             {
//               label: 'Fail Percentage (%)',
//               data: ${JSON.stringify(failPercentages)},
//               backgroundColor: 'rgba(255, 99, 132, 0.6)',
//               borderColor: 'rgba(255, 99, 132, 1)',
//               borderWidth: 1
//             }
//           ]
//         },
//         options: {
//           responsive: true,
//           scales: {
//             y: {
//               beginAtZero: true,
//               max: 100,
//               title: {
//                 display: true,
//                 text: 'Percentage (%)'
//               }
//             },
//             x: {
//               title: {
//                 display: true,
//                 text: 'Test Runs'
//               }
//             }
//           }
//         }
//       });
//     </script>
//   </body>
//   </html>`;
// }

// // Main function
// function main() {
//   const results = loadReports(); // Load test results
//   const htmlContent = generateHTML(results); // Generate the HTML content

//   // Write the HTML file
//   fs.writeFileSync(OUTPUT_FILE, htmlContent, 'utf8');
//   console.log(`Custom report generated at ${OUTPUT_FILE}`);
// }

// main();


// import fs from 'fs';
// import path from 'path';
// import { ReportData } from './types';  // Define types for report data if needed
// import Handlebars from 'handlebars';
// import * as jsonfile from 'jsonfile';

// // Directory where the reports are stored
// // // Correct path resolution
// const REPORTS_DIR = path.resolve(__dirname, '../../../../output/reports/history');
// const OUTPUT_FILE = path.resolve(__dirname, '../../../../output/reports/custom-report.html');
// // const REPORTS_DIR = path.resolve('./uie2e/output/reports/history');
// // const OUTPUT_FILE = path.resolve('./uie2e/output/reports/custom-report.html');

// // Function to read and parse the JSON report files
// function loadReports(): ReportData[] {
//   const files = fs.readdirSync(REPORTS_DIR);
//   const jsonFiles = files.filter((file) => file.endsWith('.json'));

//   if (jsonFiles.length === 0) {
//     console.log('No JSON reports found in the directory.');
//     return [];
//   }

//   return jsonFiles.map((file) => {
//     const filePath = path.join(REPORTS_DIR, file);
//     return jsonfile.readFileSync(filePath);  // Assuming reports are in JSON format
//   });
// }

// // Load the reports
// const reports = loadReports();
// if (reports.length === 0) {
//   console.log('No reports to generate.');
//   process.exit(1);
// }

// // Read Handlebars template for the custom report
// const templateSource = fs.readFileSync(path.resolve('./src/lib/util/report/custom-report.hbs'), 'utf-8');
// const template = Handlebars.compile(templateSource);

// // Prepare data for the report
// const reportData = {
//   title: 'Custom Test Report',
//   reports,  // Pass the reports loaded from JSON files
//   date: new Date().toLocaleString(),
// };

// // Generate the custom HTML report
// const htmlOutput = template(reportData);

// // Save the generated report
// fs.writeFileSync(OUTPUT_FILE, htmlOutput);
// console.log(`Custom report generated at ${OUTPUT_FILE}`);


import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import * as jsonfile from 'jsonfile';
Handlebars.registerHelper('eq', function (a: any, b: any) {
  return a === b;
});

// Directory where the reports are stored
const REPORTS_DIR = path.resolve(__dirname, '../../../../output/reports/history');
const OUTPUT_FILE = path.resolve(__dirname, '../../../../output/reports/custom-report.html');

// Function to read and parse the JSON report files
function loadReports() {
  const files = fs.readdirSync(REPORTS_DIR);
  const jsonFiles = files.filter((file) => file.endsWith('.json'));

  if (jsonFiles.length === 0) {
    console.log('No JSON reports found in the directory.');
    return [];
  }

  return jsonFiles.map((file) => {
    const filePath = path.join(REPORTS_DIR, file);
    return jsonfile.readFileSync(filePath);  // Assuming reports are in JSON format
  });
}

// Load the reports
const reports = loadReports();
if (reports.length === 0) {
  console.log('No reports to generate.');
  process.exit(1);
}

// Read Handlebars template for the custom report
const templateSource = fs.readFileSync(path.resolve('./src/lib/util/report/custom-report.hbs'), 'utf-8');
const template = Handlebars.compile(templateSource);

// Prepare data for the report
const reportData = {
  title: 'Custom Test Report',
  reports,  // Pass the reports loaded from JSON files
  date: new Date().toLocaleString(),
};

// Generate the custom HTML report
const htmlOutput = template(reportData);

// Save the generated report
fs.writeFileSync(OUTPUT_FILE, htmlOutput);
console.log(`Custom report generated at ${OUTPUT_FILE}`);
