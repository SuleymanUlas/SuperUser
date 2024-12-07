
import { Bootfunc, Code_Edit_Used, Fell, Job, Train } from "../AI_Class";
import { SUFunc } from '../Al_Func';
import fsp from 'fs/promises';
import { compareTwoStrings } from 'string-similarity';

interface DataParseItem {
  query: string,
  reply: string,
  feels: string
}
interface MIME {
  ext: string,
  desc: string
}
interface Question {
  question: string,
  type: string
}

const fe = new Fell;
const sufuncuser = new SUFunc;
const mimes = [
  { ext: "pdf", desc: "Portable Document Format File" },
  { ext: "jpg", desc: "JPEG Image" },
  { ext: "jpeg", desc: "JPEG Image" },
  { ext: "png", desc: "Portable Network Graphics Image" },
  { ext: "gif", desc: "Graphics Interchange Format Image" },
  { ext: "html", desc: "HyperText Markup Language" },
  { ext: "txt", desc: "Text File" },
  { ext: "csv", desc: "Comma Separated Values" },
  { ext: "zip", desc: "ZIP Archive" },
  { ext: "mp3", desc: "MP3 Audio" },
  { ext: "mp4", desc: "MPEG-4 Video" },
  { ext: "json", desc: "JavaScript Object Notation" },
  { ext: "xml", desc: "Extensible Markup Language" },
  { ext: "css", desc: "Cascading Style Sheets" },
  { ext: "js", desc: "JavaScript File" },
  { ext: "xls", desc: "Microsoft Excel Spreadsheet" },
  { ext: "xlsx", desc: "Microsoft Excel Open XML Spreadsheet" },
  { ext: "ppt", desc: "Microsoft PowerPoint Presentation" },
  { ext: "pptx", desc: "Microsoft PowerPoint Open XML Presentation" },
  { ext: "doc", desc: "Microsoft Word Document" },
  { ext: "docx", desc: "Microsoft Word Open XML Document" },
  { ext: "avi", desc: "Audio Video Interleave File" },
  { ext: "mov", desc: "Apple QuickTime Movie" },
  { ext: "ogg", desc: "Ogg Media File" },
  { ext: "flv", desc: "Flash Video" },
  { ext: "wav", desc: "Waveform Audio File" }
];
let fileName = './AllData/memory.sup';
let DataSU: string[] = [];
let susp = 3;
let fsusp = '';

export class UI_SU {
  static DefaultUser = `User`;
  static train = new Train;
  static ceuupdate = new Code_Edit_Used;
  static USER = '';
  static dataAI = { o: '', t: '', th: '', f: '', fi: 0 }
  static usall = '';
  static mimes: MIME[] = [
    { ext: "pdf", desc: "Portable Document Format File" },
    { ext: "jpg", desc: "JPEG Image" },
    { ext: "jpeg", desc: "JPEG Image" },
    { ext: "png", desc: "Portable Network Graphics Image" },
    { ext: "gif", desc: "Graphics Interchange Format Image" },
    { ext: "html", desc: "HyperText Markup Language" },
    { ext: "txt", desc: "Text File" },
    { ext: "csv", desc: "Comma Separated Values" },
    { ext: "zip", desc: "ZIP Archive" },
    { ext: "mp3", desc: "MP3 Audio" },
    { ext: "mp4", desc: "MPEG-4 Video" },
    { ext: "json", desc: "JavaScript Object Notation" },
    { ext: "xml", desc: "Extensible Markup Language" },
    { ext: "css", desc: "Cascading Style Sheets" },
    { ext: "js", desc: "JavaScript File" },
    { ext: "xls", desc: "Microsoft Excel Spreadsheet" },
    { ext: "xlsx", desc: "Microsoft Excel Open XML Spreadsheet" },
    { ext: "ppt", desc: "Microsoft PowerPoint Presentation" },
    { ext: "pptx", desc: "Microsoft PowerPoint Open XML Presentation" },
    { ext: "doc", desc: "Microsoft Word Document" },
    { ext: "docx", desc: "Microsoft Word Open XML Document" },
    { ext: "avi", desc: "Audio Video Interleave File" },
    { ext: "mov", desc: "Apple QuickTime Movie" },
    { ext: "ogg", desc: "Ogg Media File" },
    { ext: "flv", desc: "Flash Video" },
    { ext: "wav", desc: "Waveform Audio File" }
  ];

  async AI(s: string, User: string) {
    if (s && User) {
      let Maxquery = 3;
      let processFinish = await this.readData(fileName);
      if (processFinish) { return await this.processQuery(User, DataSU, Maxquery, s) }
    }
  }
  async readData(fileName: string) {
    try {
      const dataUsed = await fsp.readFile(`${fileName}`, 'utf-8');
      DataSU.push(dataUsed);
    } catch (err) {
      console.error(err);
    }
    return true;
  }
  async processQuery(User: string, DataSU: string[], Maxquery: number, s: string) {
    if (s.endsWith('--notfix--')) {
      s = s.replace(/--notfix--/g, '');
      return await this.auto(s, User, DataSU, Maxquery);
    } else {
      const Sim = new SUFunc; const fix = await Sim.Similitary(s).then(corect => { return corect });
      return await this.auto(fix.replace(/\s+/g, ' '), User, DataSU, Maxquery);
    }
  }
  async auto(queryAuto: string, User: string, DataSU: string[], Maxquery: number) {
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
      let ss = queryAuto; let maxscore = 0; let I = -1; let DataParse: DataParseItem[] = [];
      const matches = [...DataS.matchAll(dataRegex)];
      if (matches.length === 0) {
        console.info("No matches found in DataSU.");
      }
      matches.forEach(match => {
        DataParse.push({ query: match[1], reply: match[2], feels: match[3] });
      });
      const fd = new Fell;
      const feels = await fd.Data(UI_SU.USER);
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
        const processMatch = async (match: string, funct: string) => {
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
            replacement = (refile as string[]).join(' ');
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
            const jobNameMatch = match.match(/\b([A-Za-z\s]+)\b\s*(job|position|role)/i);
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
        const processDataPlaceholders = async (dat: string) => {
          const data = await CEU.cleanedReply(dat)
          const matches = data.match(getdataRegex);
          if (matches) {
            const get_Data = new Code_Edit_Used;
            const promises = matches.map(async (match) => {
              let param = match.match(getdataRegex)?.[0].replace(/:/g, '').replace(/</g, '').replace(/>/g, '');
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
            const questions:Record<string,Question> = {
              name: { question: "What is your name?", type: "string" },
              age: { question: "How old are you?", type: "number" },
              gender: { question: "What is your gender?", type: "string" },
              job: { question: "What is your current job or profession?", type: "string" },
              location: { question: "Where do you currently live?", type: "string" },
              education: { question: "What is the highest level of education you've completed?", type: "string" },
              hobby: { question: "What are some of your favorite hobbies?", type: "string" },
              email: { question: "What is your email address?", type: "string" },
              phone: { question: "What is your phone number?", type: "string" },
              socialMedia: { question: "Do you use social media? If so, which platforms?", type: "string" },
              maritalStatus: { question: "What is your marital status?", type: "string" },
              languages: { question: "What languages do you speak?", type: "string" },
              skills: { question: "What are some of your key skills?", type: "string" },
              favoriteFood: { question: "What is your favorite food?", type: "string" },
              travelExperience: { question: "Have you traveled to any other countries? If yes, where?", type: "string" },
              pets: { question: "Do you have any pets?", type: "string" },
              goals: { question: "What are your short-term or long-term goals?", type: "string" }
            };
            let ques = '';
            finalMessage.replace(datsearch, (match: string, pm: string) => {
              if (match) {
                ques = questions[pm].question;
              }
              return "";
            });
            if (ques) { UI_SU.dataAI.o = ques; UI_SU.dataAI.t = DataS; UI_SU.dataAI.th = queryAuto; UI_SU.dataAI.f = fileName; UI_SU.dataAI.fi = 0; }
            else {
              UI_SU.dataAI.o = finalMessage; UI_SU.dataAI.t = DataS; UI_SU.dataAI.th = queryAuto; UI_SU.dataAI.f = fileName; UI_SU.dataAI.fi = 1;
            }
          }
          else {
            const reply = DataParse[I].reply;
            const feeling = DataParse[I].feels;
            if (maxscore !== -1) {
              switch (feeling) {
                case 'Happy':
                  fe.Hqx(5, UI_SU.usall);
                  break;
                case 'Angry':
                  fe.Aqx(5, UI_SU.usall);
                  break;
                case 'Scared':
                  fe.Sqx(5, UI_SU.usall);
                  break;
                case 'Sad':
                  fe.Saqx(5, UI_SU.usall);
                  break;
                case 'Suspect':
                  fe.Suqx(5, UI_SU.usall);
                  break;
                case 'Default':
                  fe.Default(5, UI_SU.usall);
                  break;
                default:
                  break;
              }
              UI_SU.dataAI.o = reply; UI_SU.dataAI.t = DataS; UI_SU.dataAI.th = queryAuto; UI_SU.dataAI.f = fileName; UI_SU.dataAI.fi = 2;
            }
          }
        };
        await replaceAllMatches();
      }
    }
    return true;
  }
}