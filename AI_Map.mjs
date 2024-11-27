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
    try {
        const query_doc = nlp(Query); 
        const sentences = query_doc.sentences().out('array'); 
        const extracted_meanings = []; 
        let objects = [];
        let places = [];
        let persons = [];
        let time = [];
        let reasons = [];
        let methods = [];
        let adjectives = [];
        let verbs = [];
        let negations = [];
        for (let sentence of sentences) {
            const sentence_doc = nlp(sentence);
            sentence_doc.people().forEach(person => {
                persons.push(person.text());
            });
            sentence_doc.match('#Noun').forEach(noun => {
                const nounText = noun.text();
                if (nounText && !objects.includes(nounText)) {
                    objects.push(nounText);
                }
            });
            sentence_doc.places().forEach(place => {
                places.push(place.text());
            });
            sentence_doc.match('#Date').forEach(date => {
                time.push(date.text());
            });
            sentence_doc.match('because').forEach(match => {
                reasons.push(match.text());
            });
            sentence_doc.match('#Adverb').forEach(adverb => {
                methods.push(adverb.text());
            });
            sentence_doc.match('#Adjective').forEach(adj => {
                adjectives.push(adj.text());
            });
            sentence_doc.verbs().forEach(verb => {
                verbs.push(verb.text());
            });
            sentence_doc.match('not|never|nothing').forEach(negation => {
                negations.push(negation.text());
            });
            const sentence_data = {
                type: 'query',
                persons: persons,
                objects: objects,
                places: places ,
                time: time,
                reasons: reasons,
                methods: methods,
                adjectives: adjectives,
                verbs: verbs,
                negations: negations,
            };
            const valid_data = Object.keys(sentence_data).some(key => sentence_data[key]);
            if (valid_data) {
                extracted_meanings.push(sentence_data);
            }
            objects = [];
            places = [];
            persons = [];
            time = [];
            reasons = [];
            methods = [];
            adjectives = [];
            verbs = [];
            negations = [];
        }
        return {
            extracted_meanings: extracted_meanings
        };
    } catch {
        return {
            type: 'query',
            persons: undefined,
            objects: undefined,
            places: undefined,
            time: undefined,
            reasons: undefined,
            methods: undefined,
            adjectives: undefined,
            verbs: undefined,
            negations: undefined,
        };
    }
};
export const Map = async (Query, Reply, Status, User) => {
    const qr = { q: Query };
    const data = await nlpUsage(qr.q, User); let reply = '';
    console.log(data)
    if (data) {
        reply = await norology.Analayzing(Query.toLowerCase().replaceAll(/\s([?!\.,;:])$/g, '$1').replaceAll(/([+\-*/=%^&|<>!])/g, ' $1 '), User, data.extracted_meanings);
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



