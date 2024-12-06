import puppeteer from 'puppeteer';
import { Code_Edit_Used } from "./Code_Edit_Used";
import { SUFunc } from "../Al_Func/SUFunc";
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
export class Bootfunc {
    static Info(param) {
        switch (param) {
            case '0':
                console.log(`\x1b[92m
                    No API key or No Search engine id or both!
                    Note: When getting data from the internet, you may need 
                    a search engine id with Google Search API. Write these values ​​with writeData.
                    How do you define the 2 parameters?\x1b[0m 
                    \x1b[95m import\x1b[0m \x1b[94m { SUPER_USER_AI } \x1b[0m\x1b[95m from \x1b[0m \x1b[93m"s.u.a.i"\x1b[0m;
                    \x1b[34m const\x1b[0m\x1b[94m SU \x1b[0m=\x1b[94m new \x1b[0m \x1b[92mSUPER_USER_AI \x1b[0m;
                    \x1b[95m await\x1b[0m\x1b[34m SU\x1b[0m\x1b[93m.writeData\x1b[0m\x1b[37m(\x1b[0m\x1b[93m"apikey"\x1b[0m,\x1b[93m"apikey"\x1b[0m\x1b[37m)\x1b[0m;
                    \x1b[95m await\x1b[0m\x1b[34m SU\x1b[0m\x1b[93m.writeData\x1b[0m\x1b[37m(\x1b[0m\x1b[93m"searchengineid"\x1b[0m,\x1b[93m"searchengineid"\x1b[0m\x1b[37m)\x1b[0m;
                    `);
                break;
            default:
                break;
        }
    }
    async File(SearchF, fmime) {
        const ceuser = new Code_Edit_Used;
        const apiKey = await ceuser.UserData('Default', { prp: 'read', param: 'apikey' });
        const searchEngineId = await ceuser.UserData('Default', { prp: 'read', param: 'searchengineid' });
        if (apiKey == '<=DA<apikey>TA=>' || searchEngineId == '<=DA<searchengineid>TA=>') {
            Bootfunc.Info('0');
            return '';
        }
        const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${SearchF}`;
        const flinkm = [];
        try {
            const response = await fetch(url);
            const data = await response.json();
            const { items } = data;
            let allLinks = [];
            for (const item of items) {
                try {
                    const link = item.link;
                    await page.goto(link, { timeout: 0 });
                    const hrefsOnPage = await page.$$eval('a', anchors => anchors.map(a => a.href));
                    allLinks.push(...hrefsOnPage);
                }
                catch (error) {
                    continue;
                }
            }
            for (const strLink of allLinks) {
                let thatsok = '';
                const linkRegex = /\.([a-zA-Z0-9]+)$/g;
                if (strLink.match(linkRegex)) {
                    strLink.replace(linkRegex, (match, one) => {
                        for (const mime of Bootfunc.mimes) {
                            if (mime.ext === one && one === fmime) {
                                flinkm.push(`${strLink} \n${mime.desc}`);
                                thatsok = 'finish';
                                break;
                            }
                        }
                        return "";
                    });
                }
                if (thatsok.length > 0) {
                    break;
                }
            }
            await page.close();
        }
        catch (error) {
            console.error('Error fetching links:', error.message);
        }
        return flinkm;
    }
    async Weather(from) {
        let link = `https://www.google.com/search?q=${from} weather`;
        await page.goto(link, { waitUntil: 'domcontentloaded', timeout: 0 });
        const textValue = await page.$eval('.UQt4rd', (el) => el.innerText);
        if (textValue) {
            return textValue;
        }
    }
    async getSumarizeINF(SearchG, property) {
        const ceuser = new Code_Edit_Used;
        const apiKey = await ceuser.UserData('Default', { prp: 'read', param: 'apikey' });
        const searchEngineId = await ceuser.UserData('Default', { prp: 'read', param: 'searchengineid' });
        if (apiKey == '<=DA<apikey>TA=>' || searchEngineId == '<=DA<searchengineid>TA=>') {
            Bootfunc.Info('0');
            return '';
        }
        const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${SearchG}`;
        const response = await fetch(url);
        const data = await response.json();
        const { items } = data;
        let All = [];
        if (data && Array.isArray(items) && items.length > 0) {
            All.push(items[0][property]);
        }
        else {
            All = 'Not found!';
        }
        return All;
    }
    async GoogleDATA(SearchG, Element, Setting) {
        const ceuser = new Code_Edit_Used;
        const apiKey = await ceuser.UserData('Default', { prp: 'read', param: 'apikey' });
        const searchEngineId = await ceuser.UserData('Default', { prp: 'read', param: 'searchengineid' });
        if (apiKey == '<=DA<apikey>TA=>' || searchEngineId == '<=DA<searchengineid>TA=>') {
            Bootfunc.Info('0');
            return '';
        }
        const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${SearchG}`;
        try {
            let num = '';
            const response = await fetch(url);
            const data = await response.json();
            const { items } = data;
            if (data && Array.isArray(items) && items.length > 0) {
                let result = [];
                let linkA = [];
                for (let i = 0; i < 1; i++) {
                    linkA.push(items[i].link);
                }
                for (let i = 0; i < linkA.length; i++) {
                    if (!linkA[i])
                        continue;
                    await page.goto(linkA[i], { timeout: 0 });
                    switch (Setting) {
                        case "html":
                            const htmlResults = await page.$$eval(Element, el => el.map(element => element.innerHTML));
                            result.push(...htmlResults.map(item => item));
                            break;
                        case "text":
                            try {
                                await page.reload();
                                await page.waitForSelector(Element, { timeout: 0 });
                                const elements = await page.$$(Element);
                                const textResults = await Promise.all(elements.map(async (element) => {
                                    try {
                                        const text = await page.evaluate((el) => {
                                            return el.innerText.trim();
                                        }, element);
                                        if (text.length === 0) {
                                            return null;
                                        }
                                        return text;
                                    }
                                    catch {
                                        return null;
                                    }
                                }));
                                const filteredTextResults = textResults.filter(text => text !== null);
                                if (filteredTextResults.length > 0) {
                                    result.push(filteredTextResults);
                                }
                            }
                            catch { }
                            break;
                        case "src":
                            const srcResults = await page.$$eval(Element, el => el.map((element) => element.src));
                            result.push(...srcResults.map(item => item));
                            break;
                        case "href":
                            const hrefResults = await page.$$eval(Element, el => el.map((element) => element.href));
                            result.push(...hrefResults.map(item => item));
                            break;
                        default:
                            break;
                    }
                }
                if (result.length > 0) {
                    let reply = '';
                    let score = 0;
                    const sufunc = new SUFunc;
                    for (let i = 0; i < result.length; i++) {
                        const maxscore = await sufunc.SummaryRatio(SearchG, result[i].toString());
                        if (maxscore.rc >= score) {
                            score = maxscore.rc;
                            reply = maxscore.res;
                        }
                    }
                    return reply;
                }
            }
        }
        catch (err) {
            console.error('Error occurred:', err);
        }
    }
}
Bootfunc.mimes = [
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
//# sourceMappingURL=Bootfunc.js.map