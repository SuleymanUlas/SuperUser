import { parentPort } from 'worker_threads';
import fs from 'fs';import nlp from 'compromise';
import { compareTwoStrings } from 'string-similarity';
async function readFileAsync(filePath) {
    return new Promise((resolve, reject) => {
        let data = '';
        const readStream = fs.createReadStream(filePath, 'utf-8');

        readStream.on('data', (chunk) => {
            data += chunk;
        });

        readStream.on('error', (err) => {
            reject(err);
        });

        readStream.on('end', () => {
            resolve(data);
        });
    });
}
let max = 0;
let In = 0;
let words2 = [];
let str = '';
let alldata = ''; 
async function fetchAndFilterDictionary() {
    const alphabetLower = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z'
    ];
    for (let i = 0; i < alphabetLower.length; i++) {
        alldata += await readFileAsync(`./src/Dictionary/${alphabetLower[i]}.wl`);
    }
    words2 = alldata.split('\n').filter(word => word.trim() !== '');
}
fetchAndFilterDictionary().then(() => {
    parentPort.on('message', (sentence) => {
        const words = sentence.split(' ');
        let str = '';
        
        words.forEach(word => {
            if (!isNaN(word)) {
                str += word + ' ';
            } else {
                let max = 0;
                let In = -1;
                for (let i = 0; i < words2.length; i++) {
                    const score = compareTwoStrings(word, words2[i]);
                    if (score > max) {
                        max = score;
                        In = i;
                    }
                }
                if (In !== -1) {
                    const setSS = new Set(words2[In]);
                    const setCurrentQuery = new Set(word);
                    
                    if (JaccardSimilarity(setSS, setCurrentQuery) > 0.8) {
                        str += words2[In] + ' ';
                    } else {
                        str += word + ' ';
                    }
                } else {
                    str += word + ' ';
                }
            }
        });
        parentPort.postMessage(str.trim());
    });
    
});

const JaccardSimilarity = (setA, setB) => {
    const intersection = [...setA].filter(x => setB.has(x));
    const union = new Set([...setA, ...setB]);
    return intersection.length / union.size;
};
/**
  const getWordMeaning = async (word) => {
        const apiKey = 'adb540fb-5f12-4b2e-860a-9f213c46c539';  
        const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                const definitions = data.map(entry => entry.shortdef).flat();
                return definitions.length > 0 ? definitions : ['No definition found'];
            } else {
                return ['No definition found'];
            }
        } catch (error) {
            console.error(`Error fetching meaning for word "${word}":`, error);
            return ['Error fetching definition'];
        }
    };
    const analyzeAndSaveToJson = async (words, filename) => {
        let analyzedData = []; 
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            console.log(`Processing word: ${word}`); 
            const doc = nlp(word);const tags = doc.out('tags');  
            const meanings = await getWordMeaning(word);
            analyzedData.push({
                word: word,
                tags: tags,
                meanings: meanings
            });
        }
        const jsonData = JSON.stringify(analyzedData, null, 2); 
        fs.writeFile(filename, jsonData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            } else {
                console.log(`Data has been written to ${filename}`);
            }
        });
    };
    analyzeAndSaveToJson(words2, './QueryAnalayzing.json');
 */