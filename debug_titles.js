const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const iitPath = path.join(process.cwd(), 'content/research_topics/01-iit.md');
const iitContent = fs.readFileSync(iitPath, 'utf8');
const iitData = matter(iitContent).data;

const pub1Path = path.join(process.cwd(), 'content/publications/2014-from-the-phenomenology-to-the-mechanisms-of-consciousness-integrated-information-theory-3-0.md');
const pub1Content = fs.readFileSync(pub1Path, 'utf8');
const pub1Data = matter(pub1Content).data;

const pub2Path = path.join(process.cwd(), 'content/publications/2015-stimulus-set-meaningfulness-and-neurophysiological-differentiation-a-functional-magnetic-resonance-imaging-study.md');
const pub2Content = fs.readFileSync(pub2Path, 'utf8');
const pub2Data = matter(pub2Content).data;

function toHex(str) {
    let hex = '';
    for (let i = 0; i < str.length; i++) {
        hex += str.charCodeAt(i).toString(16).padStart(4, '0') + ' ';
    }
    return hex;
}

console.log('--- IIT 3.0 ---');
const ref1 = iitData.references[0]; // Assuming it's the first one
console.log('Ref: ', ref1);
console.log('Hex: ', toHex(ref1));
console.log('Pub: ', pub1Data.title);
console.log('Hex: ', toHex(pub1Data.title));
console.log('Match (trim/lower):', ref1.trim().toLowerCase() === pub1Data.title.trim().toLowerCase());

console.log('\n--- Stimulus Set ---');
const ref2 = iitData.references[4]; // Assuming it's the 5th one based on previous order
console.log('Ref: ', ref2);
console.log('Hex: ', toHex(ref2));
console.log('Pub: ', pub2Data.title);
console.log('Hex: ', toHex(pub2Data.title));
console.log('Match (trim/lower):', ref2.trim().toLowerCase() === pub2Data.title.trim().toLowerCase());
