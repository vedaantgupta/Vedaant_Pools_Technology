const fs = require('fs');
const path = require('path');

const xmlPath = path.join(__dirname, '..', 'example', 'extracted_docx', 'word', 'document.xml');

try {
    const xml = fs.readFileSync(xmlPath, 'utf8');
    
    // A quick way to get w:t tag contents:
    // <w:t>some text</w:t> or <w:t xml:space="preserve">some text</w:t>
    const matches = xml.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
    
    if (matches) {
        const textContent = matches.map(match => {
            const clean = match.replace(/<[^>]+>/g, '');
            return clean;
        });
        
        // Let's write the text to a file so it's easy to read
        const outputPath = path.join(__dirname, '..', 'example', 'extracted_text.txt');
        fs.writeFileSync(outputPath, textContent.join(' '), 'utf8');
        console.log(`Successfully extracted ${matches.length} text segments to ${outputPath}`);
    } else {
        console.log('No text segments found in the XML.');
    }
} catch (err) {
    console.error('Error parsing document.xml:', err);
}
