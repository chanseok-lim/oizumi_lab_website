const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const membersDir = path.join(__dirname, '../content/members');

// Map specific roles to groups
const roleToGroup = {
    '准教授': 'Principal Investigator',
    '特任専門職員': 'Staff',
    '特任研究員': 'Postdoc',
    '学振CPD': 'Postdoc',
    'D3': 'PhD Student',
    'D2': 'PhD Student',
    'D1': 'PhD Student',
    'M2': 'Master Student',
    'M1': 'Master Student',
    'B4': 'Undergraduate',
    'B3': 'Undergraduate',
    'Visitor': 'Visitor',
    '研究員': 'Alumni',
    '博士課程修了': 'Alumni',
    '修士課程修了': 'Alumni',
    '学部卒業': 'Alumni'
};

const files = fs.readdirSync(membersDir);

files.forEach(file => {
    if (!file.endsWith('.md')) return;

    const filePath = path.join(membersDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(fileContent);

    const role = parsed.data.role;
    let group = 'Alumni'; // Default fallback

    // Try exact match
    if (roleToGroup[role]) {
        group = roleToGroup[role];
    } else {
        // Try partial match or logic
        if (role.includes('D1') || role.includes('D2') || role.includes('D3')) group = 'PhD Student';
        else if (role.includes('M1') || role.includes('M2')) group = 'Master Student';
        else if (role.includes('B3') || role.includes('B4')) group = 'Undergraduate';
        else if (role.toLowerCase().includes('visitor')) group = 'Visitor';
    }

    // Update data
    parsed.data.group = group;

    // Write back
    fs.writeFileSync(filePath, matter.stringify(parsed.content, parsed.data));
    console.log(`Updated ${file}: ${role} -> ${group}`);
});
