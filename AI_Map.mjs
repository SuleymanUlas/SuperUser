import nlp from 'compromise';
import { Code_Edit_Used, Job, Bootfunc, Control, Simulation, Fell, Train, Memory, Norology } from './AI_Class.mjs';
import { SUFunc } from './AI_Func.mjs'; 
const ceu = new Code_Edit_Used; const job = new Job; const sufunc = new SUFunc; const boot = new Bootfunc;
const fell = new Fell; const control = new Control; const train = new Train; const memory = new Memory;
const norology = new Norology; const simulation = new Simulation;
const mimes = [{ ext: "pdf", desc: "Portable Document Format File" }, { ext: "jpg", desc: "JPEG Image" }, { ext: "jpeg", desc: "JPEG Image" }, { ext: "png", desc: "Portable Network Graphics Image" }, { ext: "gif", desc: "Graphics Interchange Format Image" }, { ext: "html", desc: "HyperText Markup Language" }, { ext: "txt", desc: "Text File" }, { ext: "csv", desc: "Comma Separated Values" }, { ext: "zip", desc: "ZIP Archive" }, { ext: "mp3", desc: "MP3 Audio" }, { ext: "mp4", desc: "MPEG-4 Video" }, { ext: "json", desc: "JavaScript Object Notation" }, { ext: "xml", desc: "Extensible Markup Language" }, { ext: "css", desc: "Cascading Style Sheets" }, { ext: "js", desc: "JavaScript File" }, { ext: "xls", desc: "Microsoft Excel Spreadsheet" }, { ext: "xlsx", desc: "Microsoft Excel Open XML Spreadsheet" }, { ext: "ppt", desc: "Microsoft PowerPoint Presentation" }, { ext: "pptx", desc: "Microsoft PowerPoint Open XML Presentation" }, { ext: "doc", desc: "Microsoft Word Document" }, { ext: "docx", desc: "Microsoft Word Open XML Document" }, { ext: "avi", desc: "Audio Video Interleave File" }, { ext: "mov", desc: "Apple QuickTime Movie" }, { ext: "ogg", desc: "Ogg Media File" }, { ext: "flv", desc: "Flash Video" }, { ext: "wav", desc: "Waveform Audio File" }];
/**
 * @description Analyzing Query and matched Reply return unique Reply
 * @param {*} Query 
 * @param {*} Reply 
 * @param {*} Status 
 * @param {*} User 
 * ? Usage example => sentences 
 */
const nlpUsage = async (Query, User) => {
    let feel = await Return_Fell(User); // Get user's feeling or state
    const query_doc = nlp(Query); // Process the entire query using Compromise NLP
    const sentences = query_doc.sentences().out('array'); // Split into individual sentences
    const extracted_meanings = []; // To store the extracted meanings

    // Iterate over each sentence to extract information
    for (let sentence of sentences) {
        const sentence_doc = nlp(sentence);
        const query_verbs = sentence_doc.verbs().out('array');

        // Extract people (subjects)
        let persons = [];
        sentence_doc.people().forEach(person => {
            persons.push(person.text());
        });

        // Extract places (locations)
        let places = [];
        sentence_doc.places().forEach(place => {
            places.push(place.text());
        });

        // Extract objects (direct objects)
        let objects = [];
        sentence_doc.match('#Noun').forEach(noun => {
            objects.push(noun.text());
        });

        // Extract time-related information (e.g. "in the morning", "yesterday")
        let time = [];
        sentence_doc.match('#Date').forEach(date => {
            time.push(date.text());
        });

        // Extract reasons (e.g. "because he was late")
        let reasons = [];
        sentence_doc.match('because').forEach(match => {
            reasons.push(match.text());
        });
        // Extract methods (How someone is doing something)
        let methods = [];
        sentence_doc.match('#Adverb').forEach(adverb => {
            methods.push(adverb.text());
        });

        const verb_query = query_verbs.length > 0 ? query_verbs.join(' ') : "no verb detected";
        // If verbs are detected, extract meaning
        if (verb_query !== "no verb detected") {
            extracted_meanings.push({
                type: 'query',
                verb: verb_query,
                person: persons,
                places: places,
                objects: objects,
                time: time,
                reasons: reasons,
                methods: methods,
            });
        }
    }
    return {
        query: query_doc,
        feel: feel,
        extracted_meanings: extracted_meanings
    };
};
export const Map = async (Query, Reply, Status, User) => {
    const qr = { q: await sufunc.SummaryRatio('What can I do?', Query).res || Query };
    const data = await nlpUsage(qr.q, User); let reply = '';
    if (data) {
        reply = await norology.Analayzing(Query.toLowerCase().replace(/([?!\.])(?!\s)/g, ' $1'), User);
    }
    return reply;
}
const Return_Fell = async (USER) => {
    const feData = await fell.Data(USER);
    const maxValue = Math.max(...Object.values(feData));
    const maxKey = Object.keys(feData).find(key => feData[key] === maxValue);
    let word = '';
    switch (maxKey) {
        case 'Hqx':
            word = 'Happy  ';
            break;
        case 'Aqx':
            word = 'Angry  ';
            break;
        case 'Sqx':
            word = 'Scared ';
            break;
        case 'Saqx':
            word = 'Sad    ';
            break;
        case 'Suqx':
            word = 'Suspect';
            break;
        case 'Default':
            word = 'Default';
            break;
        default:
            break;
    }
    return word;
}



