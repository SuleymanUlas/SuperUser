import { Memory, MatchedMessage } from "./Memory";
import { Fell } from "./Fell";
import fsp from 'fs/promises';
import nlp from 'compromise';
import { faker } from '@faker-js/faker';
import { Code_Edit_Used } from "./Code_Edit_Used";

export interface Word{
    tags:any[],
    word:string,
    meanings:any
}

interface MoodFilterItem{
    adjective:string[],
    verb:string[]
}

interface MoodFilter{
    [key: string]: MoodFilterItem
}
type Mood = "Happy" | "Angry" | "Sad" | "Scared" | "Suspicious"

export class CreateQuery {

    async nlpUsage(Query:string) {
        const query_doc = nlp(Query);
        const sentences = query_doc.sentences().out('array');
        const extracted_meanings = [];
        for (let sentence of sentences) {
            const sentence_doc = nlp(sentence);
            const query_verbs = sentence_doc.verbs().out('array');
            let persons:string[] = [];
            sentence_doc.people().forEach((person:any) => {
                persons.push(person.text());
            });
            let places:string[] = [];
            sentence_doc.places().forEach((place:any) => {
                places.push(place.text());
            });
            let objects:string[] = [];
            sentence_doc.match('#Noun').forEach((noun:any) => {
                objects.push(noun.text());
            });
            let time:string[] = [];
            sentence_doc.match('#Date').forEach((date:any) => {
                time.push(date.text());
            });
            let reasons:string[] = [];
            sentence_doc.match('because').forEach((match:any) => {
                reasons.push(match.text());
            });
            let methods:string[] = [];
            sentence_doc.match('#Adverb').forEach((adverb:any) => {
                methods.push(adverb.text());
            });

            const verb_query = query_verbs.length > 0 ? query_verbs.join(' ') : "no verb detected";
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
            extracted_meanings: extracted_meanings
        };
    };
    async Query(User: string) {
        const memoryparse = new Memory();
        const memorydata = await memoryparse.Memory({ process: 'read' }, User);
        let query = '';
        for (let memoryEntry of memorydata) {
            query += (memoryEntry as MatchedMessage).Query + " ";
        }
        const fe = new Fell();
        const feData: Record<string, number> = await fe.AllData();
        const maxValue = Math.max(...Object.values(feData));
        const maxKey = Object.keys(feData).find((key: string) => feData[key] === maxValue);
        let mood = '';
        switch (maxKey) {
            case 'Hqx': mood = 'Happy'; break;
            case 'Aqx': mood = 'Angry'; break;
            case 'Sqx': mood = 'Scared'; break;
            case 'Saqx': mood = 'Sad'; break;
            case 'Suqx': mood = 'Suspicious'; break;
            case 'Default': mood = 'Neutral'; break;
            default: mood = 'Neutral'; break;
        }
        const readData = await fsp.readFile('./AllData/QueryTemplates.json');
        const templates = JSON.parse(readData.toString('utf-8'));
        let templateChoice = templates.moodBased;
        if (query.includes('mood') || query.includes('emotion') || query.includes('feel') || query.includes('happy') || query.includes('sad') || query.includes('moodiness')) {
            templateChoice = templates.moodBased;
        } else if (query.includes('behavior') || query.includes('action') || query.includes('habit') || query.includes('attitude') || query.includes('reaction') || query.includes('response')) {
            templateChoice = templates.behaviorBased;
        } else if (query.includes('routine') || query.includes('habit') || query.includes('schedule') || query.includes('daily') || query.includes('practice') || query.includes('regularly')) {
            templateChoice = templates.routineBased;
        } else if (query.includes('improvement') || query.includes('growth') || query.includes('better') || query.includes('enhance') || query.includes('development') || query.includes('upgrade')) {
            templateChoice = templates.improvementBased;
        }
        const wordsData = await this.loadWordData();
        const { selectedVerb, selectedNoun, selectedAdjective, selectedConjunction } = await this.selectWordsBasedOnQueryAndMood(query, mood, wordsData, User);
        let dynamicComplement = selectedNoun;
        const template = templateChoice[Math.floor(Math.random() * templateChoice.length)];
        let finalReply = template.replace("{subject}", "you")
            .replace("{verb}", await this.getSafeString(selectedVerb))
            .replace("{complement}", await this.getSafeString(dynamicComplement))
            .replace("{adjective}", await this.getSafeString(selectedAdjective))
            .replace("{conjunction}", await this.getSafeString(selectedConjunction));
        const placeholders = ["{subject}", "{verb}", "{complement}", "{adjective}", "{conjunction}"];
        for (let placeholder of placeholders) {
            while (finalReply.includes(placeholder)) {
                if (placeholder === "{subject}") {
                    finalReply = finalReply.replace(placeholder, "you");
                } else if (placeholder === "{verb}") {
                    finalReply = finalReply.replace(placeholder, await this.getSafeString(selectedVerb));
                } else if (placeholder === "{complement}") {
                    finalReply = finalReply.replace(placeholder, await this.getSafeString(dynamicComplement));
                } else if (placeholder === "{adjective}") {
                    finalReply = finalReply.replace(placeholder, await this.getSafeString(selectedAdjective));
                } else if (placeholder === "{conjunction}") {
                    finalReply = finalReply.replace(placeholder, await this.getSafeString(selectedConjunction));
                }
            }
        }
        async function fixsentences(text: string) {
            const charactor = text.charAt(0);
            if (isNaN(Number(charactor))) {
                return (charactor.toUpperCase() + text.slice(1)).replace(/\s+/g, ' ');
            }
            return text.replace(/\s+/g, ' ');
        }
        return await fixsentences(finalReply.trim());
    }

    async getSafeString(value: any) {
        if (typeof value === 'object' && value !== null) {
            if (value && value.toString) {
                return value.toString();
            }
            return 'something';
        }
        return value || 'something';
    }
    async selectWordsBasedOnQueryAndMood(query: string, mood:any, wordsData:Word[], user: string) {
        const knownParams = [
            "name", "age", "job", "location", "hobby", "email", "gender", "education",
            "phone", "socialMedia", "maritalStatus", "languages", "skills", "favoriteFood",
            "travelExperience", "pets", "goals", "favoriteColor", "diet", "music", "fitness"
        ];
        let mem: string | MatchedMessage[] = await (new Memory).Memory({ process: 'read' }, user);
        let previous:MatchedMessage;
        if (mem == 'Not found!') {
            mem = [
                {
                    Query: 'how are you?',
                    Reply: 'I\'m fine thank you!',
                    Fell: 'Happy'
                }
            ];
            previous = mem.find(entry => entry.Reply.toLowerCase()) as MatchedMessage;
        }
        else {
            previous = (mem as MatchedMessage[]).find(entry => entry.Reply.toLowerCase()) as MatchedMessage;
        }
        const data = await this.nlpUsage(previous.Reply);
        let memory = mem;
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
        const filterByQuery = (words:Word[], queryArray:string[]) => {
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
        const resolveObjectToString = (obj:any) => {
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
        const moodFilters:MoodFilter = {
            Happy: { adjective: ["happy", "joyful", "excited"], verb: ["celebrate", "enjoy", "laugh"] },
            Angry: { adjective: ["angry", "frustrated", "irritated"], verb: ["fight", "argue", "shout"] },
            Sad: { adjective: ["sad", "lonely", "melancholy"], verb: ["cry", "weep", "slow"] },
            Scared: { adjective: ["scared", "worried", "nervous"], verb: ["flee", "hide", "shiver"] },
            Suspicious: { adjective: ["suspicious", "doubtful", "questioning"], verb: ["question", "suspect", "distrust"] }
        };
        const selectBestWord = (words:Word[]) => {
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
        const extractWordsAndNumbers = (query:string) => {
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
        const previousMemory = (memory as MatchedMessage[]).find((entry:MatchedMessage) => entry.Query.toLowerCase() === query.toLowerCase());

        if (previousMemory) {
            const previousMood:Mood = previousMemory.Fell as Mood;
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
            if (!isNaN(Number(word))) {
                selectedNoun = word;
            }
        });
        const ceu = new Code_Edit_Used;
        const requestedParam = knownParams.find(param => query.includes(param));
        if (requestedParam) {
            const isTalkingAboutSelf = /(my|i am|i\'m|my name|i'm)/.test(query);
            const isTalkingAboutUser = /(your|you|are you|do you)/.test(query);
            const udata:any = await ceu.UserData(user, { prp: 'all' });
            let formattedParam:string = requestedParam.charAt(0).toUpperCase() + requestedParam.slice(1);
            if (isTalkingAboutUser) {
                return {
                    selectedVerb: ["is"],
                    selectedNoun: udata[`bot${formattedParam}`] || "unknow",
                    selectedAdjective: ["known"],
                    selectedConjunction: ["and"]
                };
            } else if (isTalkingAboutSelf) {
                return {
                    selectedVerb: ["is"],
                    selectedNoun: udata[`user${formattedParam}`] || "unknow",
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
    async loadWordData() {
        const filePath = './AllData/QueryAnalayzing.json';
        const data = await fsp.readFile(filePath, 'utf8');
        return JSON.parse(data);
    }
}