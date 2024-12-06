import fs from 'fs';
import fsp from 'fs/promises';
import nlp from 'compromise';
import { faker } from '@faker-js/faker';
import { MyEmitter } from "./dist/AI_Class/MyEmitter.js";
import { Memory } from "./dist/AI_Class/Memory.js";
import { Fell } from "./dist/AI_Class/Fell.js";
import { Code_Edit_Used } from "./dist/AI_Class/Code_Edit_Used.js";
import { Bootfunc } from "./dist/AI_Class/Bootfunc.js";
import { Train } from "./dist/AI_Class/Train.js";
import { Simulation } from "./dist/AI_Class/Simulation.js";
import { Job } from "./dist/AI_Class/Job.js";
import { CreateQuery } from "./dist/AI_Class/CreateQuery.js";
import { SUAI } from "./dist/AI_Class/SUAI.js";
import { Control } from "./dist/AI_Class/Control.js";

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
const allDataForDictionary = JSON.parse(await readFileAsync(`./AllData/QueryAnalayzing.json`));
class Norology {
    /**
     * for (let i ...) switch case create reply and query after train but only status, and feel status
     * Use Regexp for file evalatue query Note: (evalatuable) => Math , Code, ...
     * Analayzing Memory All days? or Days?
     * switch case <=Math.random case '0': case '1': ...
     * split(' ') after for word (i) => word[i] properties
     */
    /**
     * 
     * @param {*} Query 
     * @param {*} User 
     * @returns 
     */
    async Analayzing(Query, User, mapdata) {
        const memory = new Memory; let adm = await memory.Memory({ process: 'read' }, User);
        let query = Query.split(' ');
        return await this.Parse(Query, User, mapdata, adm);
    }
    async Parse(query, user, mapdata, memory) {
        const bot = new Bootfunc;
        let querymemory = '';
        const mems = new Memory;
        const meMory = await mems.Memory({ process: 'read' }, user);
        for (let memoryEntry of meMory) {
            querymemory += memoryEntry.Query + " ";
        }
        const ceu = new Code_Edit_Used;
        async function loadWordData() {
            const filePath = './AllData/QueryAnalayzing.json';
            const data = await fsp.readFile(filePath, 'utf8');
            const parsedData = JSON.parse(data);
            return parsedData;
        }
        const fd = new Fell;
        const feels = await fd.Data(user);
        const maxValue = Math.max(...Object.values(feels));
        const maxKey = Object.keys(feels).find(key => feels[key] === maxValue);
        let feel = '';
        switch (maxKey) {
            case 'Hqx':
                feel = 'Happy';
                break;
            case 'Aqx':
                feel = 'Angry';
                break;
            case 'Sqx':
                feel = 'Scared';
                break;
            case 'Saqx':
                feel = 'Sad';
                break;
            case 'Suqx':
                feel = 'Suspect';
                break;
            case 'Default':
                feel = 'Happy';
                break;
            default:
                feel = 'Happy';
                break;
        }
        const templates = JSON.parse(await fsp.readFile('./AllData/ReplyTemplates.json'));
        const generalReplyTemplates = templates.generalReplyTemplates;
        const personalReplyTemplates = templates.personalReplyTemplates;
        const healthReplyTemplates = templates.healthReplyTemplates;
        const careerReplyTemplates = templates.careerReplyTemplates;
        const dietReplyTemplates = templates.dietReplyTemplates;
        const workReplyTemplates = templates.workReplyTemplates;
        const emotionalReplyTemplates = templates.emotionalReplyTemplates;
        const supportReplyTemplates = templates.supportReplyTemplates;

        async function generatePersonalizedReply(query, user, mapdata, memory) {
            let wordsData = await loadWordData();
            let data = await ceu.UserData(user, { prp: 'all' });
            const botInfo = {};
            const knownParams = ["name", "age", "job", "location", "hobby", "email", "gender", "education", "phone", "socialMedia", "maritalStatus", "languages", "skills", "favoriteFood", "travelExperience", "pets", "goals", "favoriteColor", "diet", "music", "fitness"];
            knownParams.forEach(param => {
                botInfo[`bot${param.charAt(0).toUpperCase() + param.slice(1)}`] = data?.[param] || 'none';
            });
            let doc = nlp(query);
            const isWeatherQuery = doc.has('weather') || doc.has('forecast') || doc.has('current weather');
            const isGoogleQuery = doc.has('how to') || doc.has('define') || doc.has('explain') || doc.has('tell me about') || (doc.has('what is') && !doc.has('what is you') && !doc.has('what is your') && !doc.has('what is me'));
            const isFileLinkQuery = doc.has('link') || doc.has('file') || doc.has('download') || doc.has('get');
            const isDateQuery = doc.has('date');
            const isTimeQuery = doc.has('time');
            const SU = new SUAI();
            let value = '';
            if (await SU.EvalSU(query)) {
                query = query + ' you found answer ' + await SU.EvalSU(query);
            }
            if (isWeatherQuery) {
                value = await USF('weather', data);
            } else if (isGoogleQuery) {
                value = await USF('google');
            } else if (isFileLinkQuery) {
                value = await USF('file');
            }
            else if (isDateQuery) {
                value = await USF('date');
            }
            else if (isTimeQuery) {
                value = await USF('time');
            }
            let templateChoice = generalReplyTemplates;
            if (query.includes('health') || query.includes('fitness')) {
                templateChoice = healthReplyTemplates;
            } else if (query.includes('diet') || query.includes('nutrition')) {
                templateChoice = dietReplyTemplates;
            } else if (query.includes('career') || query.includes('job')) {
                templateChoice = careerReplyTemplates;
            } else if (query.includes('work') || query.includes('productivity')) {
                templateChoice = workReplyTemplates;
            } else if (query.includes('emotion') || query.includes('mood')) {
                templateChoice = emotionalReplyTemplates;
            } else if (query.includes('support') || query.includes('help')) {
                templateChoice = supportReplyTemplates;
            } else {
                templateChoice = Math.random() > 0.5 ? personalReplyTemplates : generalReplyTemplates;
            }
            const { selectedVerb, selectedNoun, selectedAdjective, selectedConjunction } = await selectWordsBasedOnQueryAndMood(query, feel, wordsData, mapdata, memory);
            let dynamicComplement = selectedNoun;
            const template = templateChoice[Math.floor(Math.random() * templateChoice.length)];
            let finalReply = template.replace("{subject}", "you")
                .replace("{verb}", await getSafeString(selectedVerb))
                .replace("{complement}", await getSafeString(value === '' ? dynamicComplement : value))
                .replace("{adjective}", await getSafeString(selectedAdjective))
                .replace("{conjunction}", await getSafeString(selectedConjunction));
            const placeholders = ["{subject}", "{verb}", "{complement}", "{adjective}", "{conjunction}"];
            for (let placeholder of placeholders) {
                while (finalReply.includes(placeholder)) {
                    if (placeholder === "{subject}") {
                        finalReply = finalReply.replace(placeholder, "you");
                    } else if (placeholder === "{verb}") {
                        finalReply = finalReply.replace(placeholder, await getSafeString(selectedVerb));
                    } else if (placeholder === "{complement}") {
                        finalReply = finalReply.replace(placeholder, await getSafeString(dynamicComplement));
                    } else if (placeholder === "{adjective}") {
                        finalReply = finalReply.replace(placeholder, await getSafeString(selectedAdjective));
                    } else if (placeholder === "{conjunction}") {
                        finalReply = finalReply.replace(placeholder, await getSafeString(selectedConjunction));
                    }
                }
            }
            return finalReply.trim();
        }
        const USF = async (use, data) => {
            if (use == 'weather') {
                try {
                    const location = data.userlocation || '';
                    const weatherData = await bot.Weather(location);
                    if (location) { return `The weather in ${location || 'your location'} is currently: \n${weatherData}.` }
                    else { return 'Where are you from?' }
                }
                catch {
                    return 'Error!';
                }
            }
            else if (use == 'file') {
                let fext = '';
                let sword = query.split(' ');
                sword.forEach(ext => {
                    for (let i = 0; i < Bootfunc.mimes.length; i++) {
                        if (ext.toLowerCase() === Bootfunc.mimes[i].ext) {
                            fext = Bootfunc.mimes[i].ext;
                        }
                    }
                });
                const refile = await bot.File(query, fext);
                if (fext.length > 0) { return `Here are the links I found for ${fext} files: ${refile}` + ' ' }
                else { return '' }
            }
            else if (use == 'google') {
                const replacequestion = new RegExp(`^${query}`, 'g');
                let googleSummary = await bot.GoogleDATA(query, 'body', 'text') || '';
                if (!googleSummary || googleSummary.trim() === '') {
                    googleSummary = await bot.getSumarizeINF(query, 'snippet') || '';
                }
                if (googleSummary) {
                    googleSummary = googleSummary.replace(replacequestion, '').trim();
                    googleSummary = googleSummary.replace(/\s+/g, ' ');
                    googleSummary = googleSummary || '{complement}';
                }
                return googleSummary + ' ';
            }
            else if (use == 'date') {
                return (new Date).toDateString();
            }
            else if (use == 'time') {
                return (new Date).toTimeString();
            }
        }
        async function getSafeString(value) {
            if (typeof value === 'object' && value !== null) {
                if (value && value.toString) {
                    return value.toString();
                }
                return 'something';
            }
            return value || 'something';
        }
        const knownParams = [
            "name", "age", "job", "location", "hobby", "email", "gender", "education",
            "phone", "socialMedia", "maritalStatus", "languages", "skills", "favoriteFood",
            "travelExperience", "pets", "goals", "favoriteColor", "diet", "music", "fitness"
        ];
        const selectWordsBasedOnQueryAndMood = async (query, mood, wordsData, data, mem) => {
            let memory = '';
            if (mem == 'Not found!') {
                memory = [
                    {
                        Query: 'how are you?',
                        Reply: 'I\'m fine thank you!',
                        Fell: 'Happy'
                    }
                ];
            } else {
                memory = mem;
            }
            const queryData = data && Array.isArray(data) ? data[0] : {};
            const queryObjects = queryData?.objects || [];
            const queryPlaces = queryData?.places || [];
            const queryPersons = queryData?.persons || [];
            const queryTime = queryData?.time || [];
            const queryReasons = queryData?.reasons || [];
            const queryMethods = queryData?.methods || [];
            const queryAdjectives = queryData?.adjectives || [];
            const queryVerbs = queryData?.verb || [];
            let verb = wordsData.filter(word => word.tags.some(tag => tag[word.word]?.includes("Verb")));
            let noun = wordsData.filter(word => word.tags.some(tag => tag[word.word]?.includes("Noun")));
            let adjective = wordsData.filter(word => word.tags.some(tag => tag[word.word]?.includes("Adjective")));
            let conjunction = wordsData.filter(word => word.tags.some(tag => tag[word.word]?.includes("Conjunction")));
            const filterByQuery = (words, queryArray) => {
                return words.filter(word => {
                    return queryArray.some(query => {
                        return word.meanings && Array.isArray(word.meanings) && word.meanings.some(meaning => {
                            if (typeof meaning === 'string') {
                                return meaning.includes(query);
                            }
                            return resolveObjectToString(meaning)?.includes(query);
                        });
                    });
                });
            };
            const resolveObjectToString = (obj) => {
                if (typeof obj === 'string') {
                    return obj;
                } else if (typeof obj === 'object') {
                    if (obj && obj.text) {
                        return obj.text;
                    }
                    return JSON.stringify(obj);
                }
                return '';
            };
            if (queryObjects.length > 0) noun = filterByQuery(noun, queryObjects);
            if (queryPlaces.length > 0) noun = filterByQuery(noun, queryPlaces);
            if (queryPersons.length > 0) noun = filterByQuery(noun, queryPersons);
            if (queryTime.length > 0) noun = filterByQuery(noun, queryTime);
            if (queryReasons.length > 0) noun = filterByQuery(noun, queryReasons);
            if (queryMethods.length > 0) noun = filterByQuery(noun, queryMethods);
            if (queryAdjectives.length > 0) adjective = filterByQuery(adjective, queryAdjectives);
            if (queryVerbs.length > 0) verb = filterByQuery(verb, queryVerbs);
            const moodFilters = {
                Happy: { adjective: ["happy", "joyful", "excited"], verb: ["celebrate", "enjoy", "laugh"] },
                Angry: { adjective: ["angry", "frustrated", "irritated"], verb: ["fight", "argue", "shout"] },
                Sad: { adjective: ["sad", "lonely", "melancholy"], verb: ["cry", "weep", "slow"] },
                Scared: { adjective: ["scared", "worried", "nervous"], verb: ["flee", "hide", "shiver"] },
                Suspicious: { adjective: ["suspicious", "doubtful", "questioning"], verb: ["question", "suspect", "distrust"] }
            };
            const selectBestWord = (words) => {
                if (!words.length) return null;
                let maxScore = 0;
                let bestWord = null;
                let index = 0;
                while (index < words.length) {
                    const word = words[index];
                    let score = 0;
                    if (word.meanings && Array.isArray(word.meanings)) {
                        for (let meaning of word.meanings) {
                            const resolvedMeaning = resolveObjectToString(meaning);
                            score += query.split(' ').filter(q => resolvedMeaning.includes(q)).length;
                        }
                    }
                    if (score > maxScore) {
                        maxScore = score;
                        bestWord = word;
                    }
                    index++;
                }
                return bestWord ? bestWord.word : null;
            };
            const extractWordsAndNumbers = (query) => {
                const regex = /\b(\w+|\d+(\.\d+)?)\b/g;
                let match;
                const wordsAndNumbers = [];
                while ((match = regex.exec(query)) !== null) {
                    wordsAndNumbers.push(match[0]);
                }
                return wordsAndNumbers;
            };
            const extractedWords = extractWordsAndNumbers(query);
            let selectedVerb = selectBestWord(verb) || faker.hacker.verb();
            let selectedNoun = selectBestWord(noun) || faker.hacker.noun();
            let selectedAdjective = selectBestWord(adjective) || faker.hacker.adjective();
            let selectedConjunction = selectBestWord(conjunction) || faker.word;
            const previousMemory = memory.find(entry => entry.Query.toLowerCase() === query.toLowerCase());

            if (previousMemory) {
                const previousMood = previousMemory.Fell;
                const previousMoodFilter = moodFilters[previousMood] || { adjective: [], verb: [] };
                if (previousMoodFilter.adjective.length > 0) {
                    adjective = adjective.filter(word => previousMoodFilter.adjective.some(moodWord => word.word.includes(moodWord)));
                }
                if (previousMoodFilter.verb.length > 0) {
                    verb = verb.filter(word => previousMoodFilter.verb.some(moodWord => word.word.includes(moodWord)));
                }
                selectedVerb = selectBestWord(verb) || faker.hacker.verb();
                selectedAdjective = selectBestWord(adjective) || faker.hacker.adjective();
            }
            extractedWords.forEach(word => {
                if (verb.some(v => v.word === word)) {
                    selectedVerb = word === 'complement' ? '' : word;
                }
                if (noun.some(n => n.word === word)) {
                    selectedNoun = word;
                }
                if (adjective.some(adj => adj.word === word)) {
                    selectedAdjective = word;
                }
                if (!isNaN(word)) {
                    selectedNoun = word;
                }
            });
            const requestedParam = knownParams.find(param => query.includes(param));
            if (requestedParam) {
                const isTalkingAboutSelf = /(my|i am|i\'m|my name|i'm)/.test(query);
                const isTalkingAboutUser = /(your|you|are you|do you)/.test(query);
                const udata = await ceu.UserData(user, { prp: 'all' });
                let formattedParam = requestedParam.charAt(0).toUpperCase() + requestedParam.slice(1);
                if (isTalkingAboutUser) {
                    return {
                        selectedVerb: ["is"],
                        selectedNoun: udata[`bot${formattedParam}`] || "unknown",
                        selectedAdjective: ["known"],
                        selectedConjunction: ["and"]
                    };
                } else if (isTalkingAboutSelf) {
                    return {
                        selectedVerb: ["is"],
                        selectedNoun: udata[`user${formattedParam}`] || "unknown",
                        selectedAdjective: ["known"],
                        selectedConjunction: ["and"]
                    };
                }
            }
            return {
                selectedVerb: [selectedVerb],
                selectedNoun: [selectedNoun],
                selectedAdjective: [selectedAdjective],
                selectedConjunction: [selectedConjunction]
            };
        };
        async function fixsentences(text) {
            if (isNaN(text.charAt(0))) {
                return (text.charAt(0).toUpperCase() + text.slice(1)).replace(/\s+/g, ' ');
            }
            return text.replace(/\s+/g, ' ');
        }
        const getReplyUntilValid = async (query, user) => {
            let reply = '';
            while (!reply.trim()) {
                reply = await fixsentences(await generatePersonalizedReply(query, user, mapdata, memory));
            }
            return reply;
        };
        return await getReplyUntilValid(query, user) || 'Sorry but I am not understand!';
    }
}
(function () {
    console.error = function () { };
    console.warn = function () { };
})();

export {
    Bootfunc,
    Code_Edit_Used,
    Control,
    CreateQuery,
    Fell,
    Job,
    MyEmitter,
    Norology,
    SUAI,
    Simulation,
    Train,
    Memory
}