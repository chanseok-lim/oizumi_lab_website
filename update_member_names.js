const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const membersDir = path.join(process.cwd(), 'content/members');

const nameMap = {
    '大泉匡史.md': 'Masafumi Oizumi',
    'mikito-ogino.md': 'Mikito Ogino',
    '林燦碩-1.md': 'Chanseok Lim',
    '池田宗樹.md': 'Muneki Ikeda',
    '横田早紀.md': 'Saki Yokota',
    'nipun-ravindu-wickramanayaka.md': 'Nipun Ravindu Wickramanayaka',
    '井上昌和.md': 'Masakazu Inoue',
    '張晗.md': 'Han Zhang',
    '浅沼遥香.md': 'Haruka Asanuma',
    '清岡大毅.md': 'Daiki Kiyooka',
    '片岡麻輝.md': 'Asaki Kataoka',
    '関澤太樹.md': 'Daiki Sekizawa',
    '清水優梨亜.md': 'Yuria Shimizu',
    '堀口維里優.md': 'Ilya Horiguchi',
    '服部信吾.md': 'Shingo Hattori',
    '武田賢.md': 'Ken Takeda',
    '高橋創.md': 'Soh Takahashi',
    '三好楽.md': 'Raku Miyoshi',
    '富樫悠.md': 'Yu Togashi',
    '小川純平.md': 'Jumpei Ogawa',
    '小笠原永輝.md': 'Eiki Ogasawara'
};

Object.entries(nameMap).forEach(([filename, nameEn]) => {
    const filePath = path.join(membersDir, filename);
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const parsed = matter(fileContent);

        // Add name_en to data
        parsed.data.name_en = nameEn;

        // Stringify back to markdown
        const newContent = matter.stringify(parsed.content, parsed.data);

        fs.writeFileSync(filePath, newContent);
        console.log(`Updated ${filename} with name_en: ${nameEn}`);
    } else {
        console.warn(`File not found: ${filename}`);
    }
});
