const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const membersDir = path.join(__dirname, '../content/members');
const alumniDir = path.join(__dirname, '../content/alumni');

if (!fs.existsSync(alumniDir)) {
    fs.mkdirSync(alumniDir);
}

const files = fs.readdirSync(membersDir);
const alumniMap = {};

files.forEach(file => {
    if (!file.endsWith('.md')) return;

    const fullPath = path.join(membersDir, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(content);

    if (data.group === 'Alumni') {
        const name = data.title;
        if (!alumniMap[name]) {
            alumniMap[name] = {
                title: name,
                roles: new Set(),
                image: data.image || '',
                bio: data.bio || '',
                website: data.website || '',
                originalFiles: []
            };
        }

        // Determine role
        let role = data.role;
        // Normalize role based on filename or existing role field
        if (file.includes('-master')) role = '修士課程修了';
        else if (file.includes('-undergrad')) role = '学部卒業';
        else if (file.includes('-phd')) role = '博士課程修了';

        // If role is still generic or missing, try to infer or keep original
        if (!role) {
            // Fallback or check if it's "Researcher"
            // Some files might have role: '研究員'
        }

        if (role) alumniMap[name].roles.add(role);

        // Merge other fields (prefer non-empty)
        if (data.image) alumniMap[name].image = data.image;
        if (data.bio) alumniMap[name].bio = data.bio;
        if (data.website) alumniMap[name].website = data.website;

        alumniMap[name].originalFiles.push(fullPath);
    }
});

// Write new files
Object.values(alumniMap).forEach(person => {
    const roles = Array.from(person.roles);
    // Sort roles? Maybe not strictly necessary but good for consistency
    // Order: Researcher, PhD, Master, Undergrad
    const roleOrder = ["研究員", "博士課程修了", "修士課程修了", "学部卒業"];
    roles.sort((a, b) => roleOrder.indexOf(a) - roleOrder.indexOf(b));

    const newContent = `---
title: ${person.title}
roles: ${JSON.stringify(roles)}
image: ${person.image || ''}
bio: ${person.bio || ''}
website: ${person.website || ''}
---
`;

    const newFilePath = path.join(alumniDir, `${person.title}.md`);
    fs.writeFileSync(newFilePath, newContent);
    console.log(`Created ${newFilePath}`);

    // Delete old files
    person.originalFiles.forEach(f => {
        fs.unlinkSync(f);
        console.log(`Deleted ${f}`);
    });
});
