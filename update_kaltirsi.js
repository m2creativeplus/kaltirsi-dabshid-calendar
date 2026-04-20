const fs = require('fs');

const dataStr = fs.readFileSync('lib/kaltirsi-data.ts', 'utf8');

const updates = {
  1: { altNames: '["Samalaho", "Habar-Karan"]', ecologicalIndicatorSo: '"Roobka hordhaca ah ee Xagaaga; xooluhu waxay dhuuxaan doogga galbeedka."', gregorianStart: '"July 20"' },
  2: { name: '"Habar-ari"', altNames: '["Habar-adhi"]', ecologicalIndicatorSo: '"\\"Roobka Habarta\\"; waa dhibic yar oo kaliya ariga qoyn karta."', gregorianStart: '"Aug 20"' },
  3: { name: '"Diraac-good"', altNames: '["Diraac-peak"]', ecologicalIndicatorSo: '"Kulka ugu dambeeya ee Xagaaga ka hor intaan Dayrtu curan."', gregorianStart: '"Sept 19"' },
  4: { name: '"Dambasame"', altNames: '["Dayrweyn", "Dalali"]', ecologicalIndicatorSo: '"Curashada Dayrta; dhulku wuxuu noqdaa dambas la sifeeyay oo barwaaqo leh."', gregorianStart: '"Oct 19"' },
  5: { name: '"Xoomir"', altNames: '["Ximir", "Ururdha"]', ecologicalIndicatorSo: '"Barwaaqada Dayrta oo fadhida; xooluhu aad bay u dhergaan."', gregorianStart: '"Nov 19"' },
  6: { name: '"Xays"', altNames: '["Xaysin", "Daradhaf"]', ecologicalIndicatorSo: '"Roobabka qabow ee xilliga qaboobaha ee dhulka xeebta."', gregorianStart: '"Dec 19"' },
  7: { name: '"Lixkor"', altNames: '["Lix-koore"]', ecologicalIndicatorSo: '"Marka dayaxu Dirir lix habeen kaga koro; waa digniinta jiilaalka adag."', gregorianStart: '"Jan 18"' },
  8: { name: '"Toddob"', altNames: '["Adhi-caseeye"]', ecologicalIndicatorSo: '"Abaarta ugu adag; xooluhu waxay tirsadaan biyaha ceelasha moolka ah."', gregorianStart: '"Feb 18"' },
  9: { name: '"Aminla\'"', altNames: '["Daydo", "Ma-hubto"]', ecologicalIndicatorSo: '"\\"Waqtiga aan la isku halleyn karin\\"; xilliga ugu dambeeya ee dhibka miyiga."', gregorianStart: '"Mar 20"' },
  10: { name: '"Fushade"', altNames: '["Ceelka-geeye", "Seer-ma-weydo"]', ecologicalIndicatorSo: '"\\"Ceelka ka kici\\"; curashada roobka Gu\'ga iyo barwaaqada koowaad."', gregorianStart: '"Apr 19"' },
  11: { name: '"Gu\'-soore"', altNames: '["Badhayse", "Dhaseyne"]', ecologicalIndicatorSo: '"Barkadda barwaaqada; xooluhu waxay qabaan raaxo iyo dhalmo badan."', gregorianStart: '"May 20"' },
  12: { name: '"Samuulad"', altNames: '["Lixadhaqo", "Adar"]', ecologicalIndicatorSo: '"Dhammaadka roobka iyo xilliga badda la xidho (Bad-xiran)."', gregorianStart: '"Jun 19"' },
};

let output = dataStr;

for (let id = 1; id <= 12; id++) {
  const meta = updates[id];
  for (const [key, value] of Object.entries(meta)) {
    // A primitive but effective regex replacement targeted inside the block with id: <id>
    const blockRegex = new RegExp(`(id:\\s*${id},\\s*[\\s\\S]*?)(?:${key}\\s*:\\s*(?:\\[.*?\\]|".*?"|'.*?'))([\\s\\S]*?})`, 'g');
    
    output = output.replace(blockRegex, (match, p1, p2) => {
       return `${p1}${key}: ${value}${p2}`;
    });
  }
}

fs.writeFileSync('lib/kaltirsi-data.ts', output);
console.log('Updated lib/kaltirsi-data.ts with localized alt names and ecological stats');
