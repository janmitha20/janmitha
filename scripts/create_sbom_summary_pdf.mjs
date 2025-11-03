import fs from 'fs';
import PDFDocument from 'pdfkit';

const outputPath = new URL('../SBOM_Enrichment_Summary.pdf', import.meta.url).pathname;

const doc = new PDFDocument({ margin: 50 });
const writeStream = fs.createWriteStream(outputPath);

doc.pipe(writeStream);

const writeSectionTitle = (title) => {
  doc.moveDown();
  doc.font('Helvetica-Bold').fontSize(14).text(title);
  doc.moveDown(0.5);
  doc.font('Helvetica').fontSize(11);
};

doc.font('Helvetica-Bold').fontSize(18).text('SBOM Enrichment Summary & Next Steps', { align: 'center' });
doc.moveDown();
doc.font('Helvetica').fontSize(11);

writeSectionTitle('Files Changed');
doc.text('metadata-enricher.mjs ? Core enrichment logic with hardened fallbacks and dependency cleaning.');
doc.moveDown(0.25);
doc.text('tools/run_metadata_enricher.mjs ? Runner script to load SBOM, run enrichment, and write output.');
doc.moveDown(0.25);
doc.text('tools/diff_enrichment.mjs ? Diff reporter that compares pre/post enrichment metadata changes.');

writeSectionTitle('Key Changes in Behavior');
doc.font('Helvetica-Bold').fontSize(12).text('Hardened Fallbacks');
doc.moveDown(0.35);
doc.font('Helvetica').fontSize(11).text('getFallbackMetadata(...) now injects CycloneDX-safe defaults:');
doc.moveDown(0.25);
doc.font('Courier').fontSize(9).text('licenses: [{ license: { id: "NOASSERTION", name: "License Not Specified" } }]');
doc.text('supplier: { name: "NOASSERTION" }');
doc.text('author: "NOASSERTION"');
doc.text('version: "0.0.0"');
doc.text('copyright: "NOASSERTION"');
doc.font('Helvetica').fontSize(11);

doc.moveDown();
doc.font('Helvetica-Bold').fontSize(12).text('Always-Apply Sanitizer');
doc.moveDown(0.35);
doc.font('Helvetica').fontSize(11).text('ensureFallbacks(component, validRefs) now ensures:');
doc.moveDown(0.25);
doc.list([
  'Non-empty, normalized licenses',
  'Supplier object with a populated name',
  'Author string',
  'Copyright stanza',
  'Version value',
  'Valid dependsOn references only',
], {
  bulletIndent: 20,
  textIndent: 30,
  bulletRadius: 2,
});

doc.moveDown();
doc.font('Helvetica-Bold').fontSize(12).text('Dependency Cleaning');
doc.moveDown(0.35);
doc.font('Helvetica').fontSize(11).text('Valid references map built during enrichSbom. Invalid dependsOn entries are removed and logged.');

writeSectionTitle('Behavior Before vs After');
doc.font('Helvetica-Bold').fontSize(11).text('Before');
doc.font('Helvetica').fontSize(11);
doc.list([
  'Web lookups attempted, but missing fields remained untouched',
  'SBOM validation could fail due to missing metadata',
  'Invalid dependsOn references caused errors',
], {
  bulletIndent: 20,
  textIndent: 30,
  bulletRadius: 2,
});

doc.moveDown();
doc.font('Helvetica-Bold').fontSize(11).text('After');
doc.font('Helvetica').fontSize(11);
doc.list([
  'Web lookups still attempted, but safe defaults injected when data is missing',
  'SBOM becomes validator-safe with fallback metadata',
  'Invalid dependsOn references removed; dependency graph cleaned',
], {
  bulletIndent: 20,
  textIndent: 30,
  bulletRadius: 2,
});

writeSectionTitle('Run Results');
doc.list([
  'Enrichment complete ? stage_10_auto-enrich.cdx.json written',
  'Diff report ? 3 components updated with fallback metadata',
], {
  bulletIndent: 20,
  textIndent: 30,
  bulletRadius: 2,
});

writeSectionTitle('Commands You Can Run');
doc.font('Courier').fontSize(9).text('git status');
doc.text('git diff metadata-enricher.mjs');
doc.text('node tools/run_metadata_enricher.mjs');
doc.text('node tools/diff_enrichment.mjs');
doc.text('cyclonedx validate --input stage_10_auto-enrich.cdx.json');
doc.font('Helvetica').fontSize(11);

writeSectionTitle('Next Suggested Steps');
doc.font('Helvetica-Bold').fontSize(11).text('Resume pipeline now');
doc.font('Courier').fontSize(9).text('node products/factory-views/00-scripts/sbom/sbom.script.mjs --resume');
doc.font('Helvetica').fontSize(11).moveDown(0.5);

doc.font('Helvetica-Bold').fontSize(11).text('Run CycloneDX validation first');
doc.font('Helvetica').fontSize(11).text('Confirm schema compliance before resuming.');
doc.moveDown(0.5);

doc.font('Helvetica-Bold').fontSize(11).text('Produce NOASSERTION audit report');
doc.font('Helvetica').fontSize(11).text('List components using fallback metadata for review.');

doc.end();

writeStream.on('finish', () => {
  console.log(`PDF created at ${outputPath}`);
});
