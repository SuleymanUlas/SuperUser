import fs from 'fs';
import fsp from 'fs/promises';
import { SUFunc } from './AI_Func.mjs';
import { Bootfunc, Code_Edit_Used, Fell, Job, Memory, CreateQuery, Train } from './AI_Class.mjs';
import { SU_QUERY } from './AI.mjs';
import { compareTwoStrings } from 'string-similarity';
let DefaultUser = `User`;
const fe = new Fell; const train = new Train; const ceuupdate = new Code_Edit_Used;
let fileName = './AllData/memory.sup'; let DataSU = []; let USER = ''; const sufuncuser = new SUFunc;
let susp = 3; let fsusp = ''; let usall = ''; let dataAI = { o: '', t: '', th: '', f: '', fi: 0 }
const mimes = [{ ext: "pdf", desc: "Portable Document Format File" }, { ext: "jpg", desc: "JPEG Image" }, { ext: "jpeg", desc: "JPEG Image" }, { ext: "png", desc: "Portable Network Graphics Image" }, { ext: "gif", desc: "Graphics Interchange Format Image" }, { ext: "html", desc: "HyperText Markup Language" }, { ext: "txt", desc: "Text File" }, { ext: "csv", desc: "Comma Separated Values" }, { ext: "zip", desc: "ZIP Archive" }, { ext: "mp3", desc: "MP3 Audio" }, { ext: "mp4", desc: "MPEG-4 Video" }, { ext: "json", desc: "JavaScript Object Notation" }, { ext: "xml", desc: "Extensible Markup Language" }, { ext: "css", desc: "Cascading Style Sheets" }, { ext: "js", desc: "JavaScript File" }, { ext: "xls", desc: "Microsoft Excel Spreadsheet" }, { ext: "xlsx", desc: "Microsoft Excel Open XML Spreadsheet" }, { ext: "ppt", desc: "Microsoft PowerPoint Presentation" }, { ext: "pptx", desc: "Microsoft PowerPoint Open XML Presentation" }, { ext: "doc", desc: "Microsoft Word Document" }, { ext: "docx", desc: "Microsoft Word Open XML Document" }, { ext: "avi", desc: "Audio Video Interleave File" }, { ext: "mov", desc: "Apple QuickTime Movie" }, { ext: "ogg", desc: "Ogg Media File" }, { ext: "flv", desc: "Flash Video" }, { ext: "wav", desc: "Waveform Audio File" }];
export class SUPER_USER_AI {
  async AI(query) {
    const feelarray = new Code_Edit_Used;
    await feelarray.PushArrayFeel(); let us;
    const qy = query;
    USER = 'Default';
    const query_user = qy;
    if (!fs.existsSync(`./User/${USER}/Data`)) { fs.mkdirSync(`./User/${USER}/Data`, { recursive: true }) }
    await fsp.readFile(`./User/${USER}/Data/data.su`, 'utf8').catch((err) => {
      if (err) {
        fsp.writeFile(`./User/${USER}/Data/data.su`,
          `
          ⁂username=>⁂SuperUser⁂
          `, 'utf8');
      }
    });
    await fsp.readFile(`./User/${USER}/Data/Memory.smu`, 'utf8').catch((err) => {
      if (err) {
        fsp.writeFile(`./User/${USER}/Data/Memory.smu`, '', 'utf8');
      }
    }); us = USER; usall = USER
    if (!fs.existsSync(`./${DefaultUser}/${us}`)) { fs.mkdirSync(`./${DefaultUser}/${us}`) }
    const q = new UI_SU;
    const okstatus = await q.AI(query_user, us);
    if (okstatus) { return await this.ReplyFunc(dataAI.o, dataAI.t, dataAI.th, dataAI.f, dataAI.fi) }
  }
  async ReplyFunc(value, DataSU, Query, filename, Status) {
    let retunmessage = ''; let question = '';
    if (Status != 0) {
      const mems = new Memory; const sq = new CreateQuery;
      if (/:([^:]+):/.test(value)) { retunmessage = value.replaceAll('(:[n]:)', '\n') }
      else {
        const message = await SU_QUERY(DataSU, usall, Query, value, filename);
        retunmessage = message.replaceAll('(:[n]:)', '\n');
      }
      question = await sq.Query(USER, DataSU);
    }
    else { retunmessage = value }
    if (Status === 2) {
      let prnum = Math.floor(Math.random() * 2);
      if (prnum === 1) { question = '' }
    }
    return retunmessage + '\n' + question;
  }
  /**
   * 
   * @param {*} Query 
   * @param {*} Reply 
   * @param {*} Feel 
   * @returns 
   */
  async Train(Query, Reply, Feel) {
    return await train.Train(Query, Reply, Feel, '', './AllData/memory.sup');
  }
  /**
   * 
   * @param {*} Query 
   * @returns 
   */
  async Remove(Query) {
    return await train.Remove(Query);
  }
  /**
   * @description json file content example
   * @example {"id": 0, "context": ["Are you looking for an apartment?", "Yes, I am interested in finding a one-bedroom apartment near Washington Square.", "I think I have just a right apartment for you."], "positive_responses": ["Well! That is really good news.", "Are you serious! Where is it?", "Could you please tell me something more about it?", "That is awesome! Could you please show it to me?", "Really! What is the rent they are asking for? Do you know it?"], "adversarial_negative_responses": ["I think, most of the people wanted to travel to holy place to get a right path in their life.", "Anger rusts intellect so I think that it cannot discern right from wrong", "There is a huge temple recognized near to the building which is familiar with those localities.", "In my the bed room the things which is spread over is so rediculous. I couldnt acquiste.", "Yes, I am fond of having an ice cream with strawberry flavour in my new apartment."], "random_negative_responses": ["Because, my friends wants to meet you.", "See everything comes with some or the other disadvantages. People should be smart enough to tackle it.", "I eat a lot of fresh herbs.", "After lunch you should be back at the workshop.", "Yes. How is everyone at home?"]}
   * @param {*} filename 
   */
  async ALLTRAİN(filename) {
    return await train.ALLTRAIN(filename);
  }
  async Update() {
    return ceuupdate.Update();
  }
  async readData(read) {
    return await ceuupdate.UserData('Default', { prp: 'read', param: read });
  }
  async writeData(param, inf) {
    return await ceuupdate.UserData('Default', { prp: 'write', param: param, inf: inf })
  }
  async allData() {
    return await ceuupdate.UserData('Default', { prp: 'all' });
  }
}
class UI_SU {
  async AI(s, User) {
    if (s && User) {
      let Maxquery = 3;
      let processFinish = await this.readData(fileName);
      if (processFinish) { return await this.processQuery(User, DataSU, Maxquery, s) }
    }
  }
  async readData(fileName) {
    try {
      const dataUsed = await fsp.readFile(`${fileName}`, 'utf-8');
      DataSU.push(dataUsed);
    } catch (err) {
      console.error(err);
    }
    return true;
  }
  async processQuery(User, DataSU, Maxquery, s) {
    if (s.endsWith('--notfix--')) {
      s = s.replace(/--notfix--/g, '');
      return await this.auto(s, User, DataSU, Maxquery);
    } else {
      const Sim = new SUFunc; const fix = await Sim.Similitary(s).then(corect => { return corect });
      return await this.auto(fix.replace(/\s+/g, ' '), User, DataSU, Maxquery);
    }
  }
  async auto(queryAuto, User, DataSU, Maxquery) {
    if (fsusp == queryAuto) {
      susp--;
      if (susp === 0) {
        fe.Hqx(-20, User); fe.Suqx(20, User); fe.Sqx(20, User);
        susp = 1;
      }
    }
    fsusp = queryAuto;
    const dataRegex = /Query:⁂([^⁂]*)⁂Reply:⁂([^⁂]*)⁂feel=>([^⁂]*)⁂/g;
    let DataS = DataSU.toString();
    if (queryAuto) {
      const CEU = new Code_Edit_Used;
      let ss = queryAuto; let maxscore = 0; let I = -1; let DataParse = [];
      const matches = [...DataS.matchAll(dataRegex)];
      if (matches.length === 0) {
        console.info("No matches found in DataSU.");
      }
      matches.forEach(match => {
        DataParse.push({ query: match[1], reply: match[2], feels: match[3] });
      });
      const fd = new Fell;
      const feels = await fd.Data(USER);
      const maxValue = Math.max(...Object.values(feels));
      const maxKey = Object.keys(feels).find(key => feels[key] === maxValue);
      let searchedword = '';
      switch (maxKey) {
        case 'Hqx':
          searchedword = 'Happy';
          break;
        case 'Aqx':
          searchedword = 'Angry';
          break;
        case 'Sqx':
          searchedword = 'Scared';
          break;
        case 'Saqx':
          searchedword = 'Sad';
          break;
        case 'Suqx':
          searchedword = 'Suspect';
          break;
        case 'Default':
          searchedword = 'Happy';
          break;
        default:
          searchedword = 'Happy';
          break;
      }
      const scoredQueries = [];
      for (let i = 0; i < DataParse.length; i++) {
        try {
          const currentQuery = DataParse[i].query;
          if (currentQuery.length === 0) {
            console.warn(`Empty query found at index ${i}.`);
            continue;
          }
          const score = compareTwoStrings(ss, currentQuery);
          scoredQueries.push({ index: i, score: score, feels: DataParse[i].feels });
        } catch (err) {
          console.error(`Error during loop iteration ${i}:`, err);
        }
      }
      scoredQueries.sort((a, b) => b.score - a.score);
      const topQueries = scoredQueries.slice(0, 5);
      const filteredTopQueries = topQueries.filter(query => query.feels == searchedword);
      const validFilteredQueries = filteredTopQueries.filter(query => query.score >= 0.9);
      let randomQuery;
      if (validFilteredQueries.length > 0) {
        randomQuery = validFilteredQueries[Math.floor(Math.random() * validFilteredQueries.length)];
      } else {
        randomQuery = filteredTopQueries[Math.floor(Math.random() * filteredTopQueries.length)];
      }
      I = randomQuery.index; const FuncRegex = /.:([^:]+):./g; const datsearch = /<=DA<([^>]+)>TA=>/g;
      if (FuncRegex.test(DataParse[I].reply) || queryAuto) {
        let message = DataParse[I].reply;
        const getdataRegex = new RegExp('::<([^>]+)>::', 'g');
        const processMatch = async (match, funct) => {
          let replacement = '';
          if (/weather/.test(funct)) {
            const bot = new Bootfunc;
            const get_Data = new Code_Edit_Used;
            let locate = queryAuto;
            const nlpWeatherMatch = queryAuto.match(/\b(?:weather\s?in|forecast\s?for|in\s?the\s?city\s?of)\s?([a-zA-Z\s,]+)/);
            if (nlpWeatherMatch) {
              locate = nlpWeatherMatch[1];
            } else {
              const locationData = await get_Data.UserData(User, { prp: 'read', param: 'location' });
              if (!datsearch.test(locationData)) {
                const reweather = await bot.Weather(locationData + ' weather');
                replacement = '\n' + reweather;
              } else {
                replacement = locationData;
              }
            }
          } else if (/file/.test(funct)) {
            let fext = '';
            let sword = queryAuto.split(' ');
            sword.forEach(ext => {
              for (let i = 0; i < mimes.length; i++) {
                if (ext.toLowerCase() === mimes[i].ext) {
                  fext = mimes[i].ext;
                }
              }
            });
            const fileb = new Bootfunc;
            const refile = await fileb.File(queryAuto, fext);
            replacement = refile.join(' ');
          }
          else if (/search/.test(funct)) {
            const boot = new Bootfunc;
            replacement = '\n' + await boot.GoogleDATA(queryAuto, 'body', 'text');
          }
          else if (/summarize/.test(funct)) {
            const sufunc = new SUFunc;
            const result = await sufunc.SummaryRatio('summarize sentences', queryAuto);
            replacement = result.res;
          }
          else if (/job/.test(funct)) {
            const job = new Job;
            const jobNameMatch = Query.match(/\b([A-Za-z\s]+)\b\s*(job|position|role)/i);
            if (jobNameMatch && jobNameMatch[1]) {
              const jobName = jobNameMatch[1].trim();
              replacement = await job.Job(User, { prp: 'read', param: jobName });
            } else {
              replacement = "I couldn't find any job details. Could you specify your job name?";
            }
          }
          else if (/time/.test(funct)) {
            replacement = (new Date).toString();
          }
          else {
            replacement = funct;
          }
          return { match, replacement };
        };
        const processDataPlaceholders = async (dat) => {
          const data = await CEU.cleanedReply(dat)
          const matches = data.match(getdataRegex);
          if (matches) {
            const get_Data = new Code_Edit_Used;
            const promises = matches.map(async (match) => {
              let param = match.match(getdataRegex)[0].replace(/:/g, '').replace(/</g, '').replace(/>/g, '');
              const dataResponse = await get_Data.UserData(User, { prp: 'read', param: param });
              return { match, dataResponse };
            });
            const resolvedData = await Promise.all(promises);
            let rdata = data;
            resolvedData.forEach(({ match, dataResponse }) => {
              rdata = rdata.replace(match, dataResponse);
            });
            return rdata;
          } else {
            return data;
          }
        };
        const replaceAllMatches = async () => {
          const matches = message.match(FuncRegex);
          if (matches) {
            const promises = matches.map(async (match) => {
              const funct = match;
              return processMatch(match, funct);
            });
            const replacements = await Promise.all(promises);
            let finalMessage = message;
            replacements.forEach(({ match, replacement }) => {
              finalMessage = finalMessage.replace(match, replacement);
            });
            finalMessage = await processDataPlaceholders(finalMessage);
            const questions = { name: { question: "What is your name?", type: "string" }, age: { question: "How old are you?", type: "number" }, gender: { question: "What is your gender?", type: "string" }, job: { question: "What is your current job or profession?", type: "string" }, location: { question: "Where do you currently live?", type: "string" }, education: { question: "What is the highest level of education you've completed?", type: "string" }, hobby: { question: "What are some of your favorite hobbies?", type: "string" }, email: { question: "What is your email address?", type: "string" }, phone: { question: "What is your phone number?", type: "string" }, socialMedia: { question: "Do you use social media? If so, which platforms?", type: "string" }, maritalStatus: { question: "What is your marital status?", type: "string" }, languages: { question: "What languages do you speak?", type: "string" }, skills: { question: "What are some of your key skills?", type: "string" }, favoriteFood: { question: "What is your favorite food?", type: "string" }, travelExperience: { question: "Have you traveled to any other countries? If yes, where?", type: "string" }, pets: { question: "Do you have any pets?", type: "string" }, goals: { question: "What are your short-term or long-term goals?", type: "string" } };
            let ques = '';
            finalMessage.replace(datsearch, (match, pm) => {
              if (match) {
                ques = questions[pm].question;
              }
            });
            if (ques) { dataAI.o = ques; dataAI.t = DataS; dataAI.th = queryAuto; dataAI.f = fileName; dataAI.fi = 0; }
            else {
              dataAI.o = finalMessage; dataAI.t = DataS; dataAI.th = queryAuto; dataAI.f = fileName; dataAI.fi = 1;
            }
          }
          else {
            const reply = DataParse[I].reply;
            const feeling = DataParse[I].feels;
            if (maxscore !== -1) {
              switch (feeling) {
                case 'Happy':
                  fe.Hqx(5, usall);
                  break;
                case 'Angry':
                  fe.Aqx(5, usall);
                  break;
                case 'Scared':
                  fe.Sqx(5, usall);
                  break;
                case 'Sad':
                  fe.Saqx(5, usall);
                  break;
                case 'Suspect':
                  fe.Suqx(5, usall);
                  break;
                case 'Default':
                  fe.Default(5, usall);
                  break;
                default:
                  break;
              }
              dataAI.o = reply; dataAI.t = DataS; dataAI.th = queryAuto; dataAI.f = fileName; dataAI.fi = 2;
            }
          }
        };
        await replaceAllMatches();
      }
    }
    return true;
  }
}