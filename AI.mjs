import { Code_Edit_Used, Job, Bootfunc, Control, Simulation, Fell, Train, Memory, Norology } from './AI_Class.mjs';
import { SUFunc } from './AI_Func.mjs';
import Sentiment from 'sentiment';
import { Map } from './AI_Map.mjs';
import nlp from 'compromise';
const ceu = new Code_Edit_Used; const job = new Job; const sufunc = new SUFunc; const boot = new Bootfunc;
const fell = new Fell; const control = new Control; const train = new Train; const memory = new Memory;
const norology = new Norology; const simulation = new Simulation;
let status = 'Happy';
/**
 * Control reply after create Reply and Query
 * @param {*} DataSU 
 * @param {*} User 
 * @param {*} Query 
 * @param {*} Reply 
 * @param {*} filename 
 * @returns 
 * @description SU_QUERY Analayzing and Save after return reply
 */
export async function SU_QUERY(DataSU, User, Query, Reply, filename) {
    try {
        const sentiment = new Sentiment;
        const feels = await fell.Data(User);
        let scorepoint = 0.3;
        if (Query) {
            if (Query.includes('important')) { scorepoint = 0.6 }
            if (Query.includes('very important')) { scorepoint = 1 }
            let sentimentResult = sentiment.analyze(Query);
            if (sentimentResult.positive.length > 0) {
                await fell.Hqx(5, User);
                status = 'Happy';
            }
            else if (sentimentResult.negative.length > 0 && containsSadWords(Query)) {
                await fell.Aqx(5, User);
                status = 'Sad';
            }
            else if (sentimentResult.negative.length > 0) {
                await fell.Aqx(5, User);
                status = 'Angry';
            }
            function containsSadWords(text) {
                const sadKeywords = ["sad", "upset", "down", "depressed", "unhappy"];
                return sadKeywords.some(keyword => text.toLowerCase().includes(keyword));
            }
            await handleUserData(User, Query.toLowerCase());
            let replysreturn = await Map(Query, Reply, status, User);
            await memory.Memory({
                process: 'write',
                query: Query,
                reply: replysreturn || Reply,
                feel: status,
                score: scorepoint
            }, User);
            return replysreturn;
        }
    } catch (err){console.log(err); return Reply }
}
async function handleUserData(User, Query) {
    await processUserInformation(Query, User);
}
const knownParams=["name","age","job","location","hobby","email","gender","education","phone","socialMedia","maritalStatus","languages","skills","favoriteFood","travelExperience","pets","goals","favoriteColor","diet","music","fitness"];    
async function processUserInformation(Query, User) {
    let reply = 'Sorry, I didn\'t understand. Can you be more specific?';
    const cleanedQuery = Query.replace(/[^a-zA-Z0-9\s:.-]/g, '').toLowerCase();

    const isTalkingAboutSelf = /^(my|i am|i\'m|i am|i'm|my name|i'm)/.test(cleanedQuery);
    const isTalkingAboutUser = /^(your|you|are you|do you|what is your)/.test(cleanedQuery);

    if (isTalkingAboutSelf) {
        for (const param of knownParams) {
            const paramValue = await extractParameterValue(Query, param, User);
            if (paramValue) {
                reply = await ceu.UserData(User, { prp: 'write', param: param, inf: paramValue });
            } else {
                reply = await ceu.UserData(User, { prp: 'read', param: param });
            }
            break; 
        }
    }
    else if (isTalkingAboutUser) {
        for (const param of knownParams) {
            if (param === 'job') {
                const { jobName, jobDescription } = await extractJobInfoFromQuery(Query);
                if (jobName && jobDescription) {
                    await job.Job(User, { prp: 'write', param: jobName, inf: jobDescription });
                    reply = `Your job has been saved as: ${jobName} with the description: ${jobDescription}.`;
                } else {
                    reply = `I couldn't find enough information about your job. Could you please provide the details?`;
                }
            } else {
                const paramValue = await ceu.UserData(User, { prp: 'read', param: param });
                if (paramValue) {
                    reply = `Your ${param} is ${paramValue}.`;
                } else {
                    reply = `I don't have information about your ${param} yet.`;
                }
            }
        }
    } else {
        reply = 'Can you clarify if you\'re talking about yourself or someone else?';
    }

    return reply;
}

async function extractJobInfoFromQuery(Query) {
    const doc = nlp(Query);
    const jobName = doc.match('#Job').out('text');
    const jobDescription = doc.match('about').out('text');

    return { jobName, jobDescription };
}

async function extractParameterValue(Query, param, User) {
    const doc = nlp(Query);
    switch (param) {
        case 'age':
            const ageMatch = doc.match('#Age').out('text'); 
            if (ageMatch) {
                await ceu.UserData(User, { prp: 'write', param: 'userage', inf: ageMatch });
                return ageMatch;
            }
            break;

        case 'email':
            const emailMatch = doc.match('#Email').out('text'); 
            if (emailMatch) {
                await ceu.UserData(User, { prp: 'write', param: 'useremail', inf: emailMatch });
                return emailMatch;
            }
            break;

        case 'name':
            const nameMatch = doc.match('#Person').out('text');
            if (nameMatch) {
                await ceu.UserData(User, { prp: 'write', param: 'username', inf: nameMatch });
                return nameMatch;
            }
            break;

        case 'gender':
            const genderMatch = doc.match('#Gender').out('text'); 
            if (genderMatch) {
                await ceu.UserData(User, { prp: 'write', param: 'usergender', inf: genderMatch });
                return genderMatch;
            }
            break;

        case 'location':
            const locationMatch = doc.match('#Place').out('text'); 
            if (locationMatch) {
                await ceu.UserData(User, { prp: 'write', param: 'userlocation', inf: locationMatch });
                return locationMatch;
            }
            break;

        case 'phone':
            const phoneMatch = doc.match('#Phone').out('text');
            if (phoneMatch) {
                await ceu.UserData(User, { prp: 'write', param: 'userphone', inf: phoneMatch });
                return phoneMatch;
            }
            break;

        case 'hobby':
            const hobbyMatch = doc.match('#Hobby').out('text');
            if (hobbyMatch) {
                await ceu.UserData(User, { prp: 'write', param: 'userhobby', inf: hobbyMatch });
                return hobbyMatch;
            }
            break;

        case 'diet':
            const dietMatch = doc.match('#Diet').out('text');
            if (dietMatch) {
                await ceu.UserData(User, { prp: 'write', param: 'userdiet', inf: dietMatch });
                return dietMatch;
            }
            break;

        case 'music':
            const musicMatch = doc.match('#Music').out('text');
            if (musicMatch) {
                await ceu.UserData(User, { prp: 'write', param: 'usermusic', inf: musicMatch });
                return musicMatch;
            }
            break;

        default:
            return null;
    }
}


