import code from 'node-cmd';
import fs from 'fs';
import fsp from 'fs/promises';
import puppeteer from 'puppeteer';
import { SUFunc } from './AI_Func.mjs';
import fetch from 'node-fetch';
import os from 'os-utils';
import EventEmitter from 'node:events';
import path from 'path';
import { spawn } from 'child_process';
import nlp from 'compromise';
class MyEmitter extends EventEmitter { }; const myEmitter = new MyEmitter();
const mimes = [{ ext: "pdf", desc: "Portable Document Format File" }, { ext: "jpg", desc: "JPEG Image" }, { ext: "jpeg", desc: "JPEG Image" }, { ext: "png", desc: "Portable Network Graphics Image" }, { ext: "gif", desc: "Graphics Interchange Format Image" }, { ext: "html", desc: "HyperText Markup Language" }, { ext: "txt", desc: "Text File" }, { ext: "csv", desc: "Comma Separated Values" }, { ext: "zip", desc: "ZIP Archive" }, { ext: "mp3", desc: "MP3 Audio" }, { ext: "mp4", desc: "MPEG-4 Video" }, { ext: "json", desc: "JavaScript Object Notation" }, { ext: "xml", desc: "Extensible Markup Language" }, { ext: "css", desc: "Cascading Style Sheets" }, { ext: "js", desc: "JavaScript File" }, { ext: "xls", desc: "Microsoft Excel Spreadsheet" }, { ext: "xlsx", desc: "Microsoft Excel Open XML Spreadsheet" }, { ext: "ppt", desc: "Microsoft PowerPoint Presentation" }, { ext: "pptx", desc: "Microsoft PowerPoint Open XML Presentation" }, { ext: "doc", desc: "Microsoft Word Document" }, { ext: "docx", desc: "Microsoft Word Open XML Document" }, { ext: "avi", desc: "Audio Video Interleave File" }, { ext: "mov", desc: "Apple QuickTime Movie" }, { ext: "ogg", desc: "Ogg Media File" }, { ext: "flv", desc: "Flash Video" }, { ext: "wav", desc: "Waveform Audio File" }];
const elementsList = [{ element: "a", description: "<a> - hyperlink" }, { element: "abbr", description: "<abbr> - abbreviation" }, { element: "address", description: "<address> - contact information" }, { element: "area", description: "<area> - image map area" }, { element: "article", description: "<article> - independent content" }, { element: "aside", description: "<aside> - side content" }, { element: "audio", description: "<audio> - audio content" }, { element: "b", description: "<b> - bold text" }, { element: "base", description: "<base> - base URL" }, { element: "bdi", description: "<bdi> - bidirectional isolation" }, { element: "bdo", description: "<bdo> - bidirectional override" }, { element: "blockquote", description: "<blockquote> - block quotation" }, { element: "body", description: "<body> - document body" }, { element: "br", description: "<br> - line break" }, { element: "button", description: "<button> - clickable button" }, { element: "canvas", description: "<canvas> - drawing area" }, { element: "caption", description: "<caption> - table caption" }, { element: "cite", description: "<cite> - reference" }, { element: "code", description: "<code> - code snippet" }, { element: "col", description: "<col> - column in a table" }, { element: "colgroup", description: "<colgroup> - group of columns" }, { element: "data", description: "<data> - machine-readable data" }, { element: "datalist", description: "<datalist> - predefined options" }, { element: "dd", description: "<dd> - description details" }, { element: "del", description: "<del> - deleted text" }, { element: "details", description: "<details> - additional details" }, { element: "dialog", description: "<dialog> - dialog box" }, { element: "div", description: "<div> - section" }, { element: "dl", description: "<dl> - description list" }, { element: "dt", description: "<dt> - term in a description list" }, { element: "em", description: "<em> - emphasized text" }, { element: "embed", description: "<embed> - embedded content" }, { element: "fieldset", description: "<fieldset> - group of related elements" }, { element: "figcaption", description: "<figcaption> - caption for a figure" }, { element: "figure", description: "<figure> - self-contained content" }, { element: "footer", description: "<footer> - footer for a section" }, { element: "form", description: "<form> - form for user input" }, { element: "head", description: "<head> - document metadata" }, { element: "header", description: "<header> - header for a section" }, { element: "hr", description: "<hr> - horizontal rule" }, { element: "html", description: "<html> - HTML document" }, { element: "i", description: "<i> - italic text" }, { element: "iframe", description: "<iframe> - inline frame" }, { element: "img", description: "<img> - image" }, { element: "input", description: "<input> - user input field" }, { element: "ins", description: "<ins> - inserted text" }, { element: "kbd", description: "<kbd> - keyboard input" }, { element: "label", description: "<label> - label for an input" }, { element: "legend", description: "<legend> - caption for a fieldset" }, { element: "li", description: "<li> - list item" }, { element: "link", description: "<link> - external resource link" }, { element: "main", description: "<main> - main content" }, { element: "map", description: "<map> - image map" }, { element: "mark", description: "<mark> - highlighted text" }, { element: "meta", description: "<meta> - metadata" }, { element: "meter", description: "<meter> - measurement" }, { element: "nav", description: "<nav> - navigation links" }, { element: "noscript", description: "<noscript> - alternative content" }, { element: "object", description: "<object> - embedded object" }, { element: "ol", description: "<ol> - ordered list" }, { element: "optgroup", description: "<optgroup> - group of options" }, { element: "option", description: "<option> - option in a select list" }, { element: "p", description: "<p> - paragraph" }, { element: "param", description: "<param> - parameter for an object" }, { element: "picture", description: "<picture> - responsive image" }, { element: "pre", description: "<pre> - preformatted text" }, { element: "progress", description: "<progress> - progress indicator" }, { element: "q", description: "<q> - short quotation" }, { element: "rb", description: "<rb> - ruby base" }, { element: "rp", description: "<rp> - ruby parentheses" }, { element: "rt", description: "<rt> - ruby text" }, { element: "rtc", description: "<rtc> - ruby text container" }, { element: "s", description: "<s> - strikethrough text" }, { element: "samp", description: "<samp> - sample output" }, { element: "script", description: "<script> - script" }, { element: "section", description: "<section> - thematic grouping" }, { element: "select", description: "<select> - dropdown list" }, { element: "small", description: "<small> - small text" }, { element: "source", description: "<source> - media source" }, { element: "span", description: "<span> - inline section" }, { element: "strong", description: "<strong> - strong importance" }, { element: "style", description: "<style> - CSS styles" }, { element: "sub", description: "<sub> - subscript" }, { element: "summary", description: "<summary> - summary of a details element" }, { element: "sup", description: "<sup> - superscript" }, { element: "table", description: "<table> - table" }, { element: "tbody", description: "<tbody> - table body" }, { element: "td", description: "<td> - table cell" }, { element: "textarea", description: "<textarea> - multi-line text input" }, { element: "tfoot", description: "<tfoot> - table footer" }, { element: "th", description: "<th> - table header cell" }, { element: "thead", description: "<thead> - table header" }, { element: "time", description: "<time> - time or date" }, { element: "title", description: "<title> - document title" }, { element: "tr", description: "<tr> - table row" }, { element: "track", description: "<track> - text tracks for media" }, { element: "u", description: "<u> - underline text" }, { element: "ul", description: "<ul> - unordered list" }, { element: "var", description: "<var> - variable" }, { element: "video", description: "<video> - video content" }, { element: "wbr", description: "<wbr> - word break opportunity" }]
let feelArray = [];
const browser = await puppeteer.launch({ headless: true }); const page = await browser.newPage();
export class Bootfunc {
    async File(SearchF, fmime) {
        const ceuser = new Code_Edit_Used;
        const apiKey = ceuser.UserData('Default', { prp: 'read', param: 'apikey' }) || console.log('no api key'); const searchEngineId = ceuser.UserData('Default', { prp: 'read', param: 'searchengineid' }) || console.log('no search engine id');
        const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${SearchF}`;
        const flinkm = [];
        try {
            const response = await fetch(url);
            const data = await response.json();
            const { items } = data;
            const allLinks = [];
            for (const item of items) {
                for (const item of items) {
                    try {
                        const link = item.link;
                        await page.goto(link, { waitUntil: 'domcontentloaded', timeout: 0 });
                        const hrefsOnPage = await page.$$eval('a', anchors => anchors.map(a => a.href));
                        allLinks.push(...hrefsOnPage);
                    } catch (error) { continue }
                }
            }
            for (const strLink of allLinks) {
                const linkRegex = /\.([a-zA-Z0-9]+)$/g;
                if (strLink.match(linkRegex)) {
                    strLink.replace(linkRegex, (match, one) => {
                        for (const mime of mimes) {
                            if (mime.ext === one && one === fmime) {
                                flinkm.push(`${strLink}\n${mime.desc}`);
                            }
                        }
                    });
                }
            }
            await page.close();
        } catch (error) {
            console.error('Error fetching links:', error.message);
        }

        return flinkm;
    }
    async Weather(from) {
        let link = `https://www.google.com/search?q=${from}`;
        await page.goto(link, { waitUntil: 'domcontentloaded', timeout: 0 });
        const textValue = await page.$eval('.UQt4rd', el => el.innerText);
        if (textValue) {
            return textValue;
        }
        return null;
    }
    async getSumarizeINF(SearchG, property) {
        const ceuser = new Code_Edit_Used;
        const apiKey = ceuser.UserData('Default', { prp: 'read', param: 'apikey' }) || console.log('no api key'); const searchEngineId = ceuser.UserData('Default', { prp: 'read', param: 'searchengineid' }) || console.log('no search engine id');
        let All = [];
        const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${SearchG}`;
        const response = await fetch(url);
        const data = await response.json();
        const { items } = data;
        if (data && Array.isArray(items) && items.length > 0) {
            All.push(items[0][property]);
        }
        else { All = 'Not found!' }
        return All;
    }
    async GoogleDATA(SearchG, Element, Setting) {
        const ceuser = new Code_Edit_Used;
        const apiKey = ceuser.UserData('Default', { prp: 'read', param: 'apikey' }) || console.log('no api key'); const searchEngineId = ceuser.UserData('Default', { prp: 'read', param: 'searchengineid' }) || console.log('no search engine id');
        const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${SearchG}`;
        try {
            let num = '';
            const response = await fetch(url);
            const data = await response.json();
            const { items } = data;
            if (data && Array.isArray(items) && items.length > 0) {
                let result = []; let linkA = [];
                for (let i = 0; i < 1; i++) {
                    linkA.push(items[i].link);
                }
                for (let i = 0; i < linkA.length; i++) {
                    if (!linkA[i]) continue;
                    await page.goto(linkA[i], { waitUntil: 'networkidle2' });
                    switch (Setting) {
                        case "html":
                            const htmlResults = await page.$$eval(Element, el => el.map(element => element.innerHTML));
                            result.push(...htmlResults.map(item => item));
                            break;
                        case "text":
                            try {
                                await page.reload();
                                await page.waitForSelector(Element, { timeout: 1000 });
                                const elements = await page.$$(Element);
                                const textResults = await Promise.all(
                                    elements.map(async (element) => {
                                        try {
                                            const text = await page.evaluate(el => {
                                                return el.innerText.trim();
                                            }, element);
                                            if (text.length === 0) {
                                                return null;
                                            }

                                            return text;
                                        } catch { return null }
                                    })
                                );
                                const filteredTextResults = textResults.filter(text => text !== null);

                                if (filteredTextResults.length > 0) {
                                    result.push(filteredTextResults);
                                }
                            } catch { }
                            break;
                        case "src":
                            const srcResults = await page.$$eval(Element, el => el.map(element => element.src));
                            result.push(...srcResults.map(item => item));
                            break;

                        case "href":
                            const hrefResults = await page.$$eval(Element, el => el.map(element => element.href));
                            result.push(...hrefResults.map(item => item));
                            break;

                        default:
                            break;
                    }
                }
                if (result.length > 0) {
                    let reply = ''; let score = 0; const sufunc = new SUFunc;
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
        } catch (err) {
            console.error('Error occurred:', err);
        }
    }
}
export class Control {
    /**
 * @description code: value 0-3
 * @description 0 => Get Status
 * @description 1 => Reset FROM * USER {property.user = String}
 * @description 2 => Feel Reset
 * @description 3 => Fix Diagnostic
 * @description 4 => Remove train
 * @description 4 usage: q => Query, u => User
 * @example {property.q, property.u} 
 */
    async Status(code, property) {
        let message = '';
        try {
            switch (code) {
                case '0':
                    /**
                     * ? Get Status
                     */
                    message = JSON.stringify(feel);
                    break;
                case '1':
                    /**
                     * ? Reset
                     */
                    feel = { Hqx: 0, Aqx: 0, Sqx: 0, Saqx: 0, Suqx: 0, Default: 0 };
                    const reset = new Code_Edit_Used;
                    await reset.Format(property.user);
                    reset.
                        message = 'Reset is successful!';
                    break;
                case '2':
                    /**
                     * ? Feel Reset
                     */
                    feel = { Hqx: 0, Aqx: 0, Sqx: 0, Saqx: 0, Default: 0 };
                    message = 'Feel reset is successful!';
                    break;
                case '3':
                    /**
                     * ? Fix Diagnostic
                     */
                    feel = { Hqx: 0, Aqx: 0, Sqx: 0, Saqx: 0, Default: 0 };
                    const rmv = new Code_Edit_Used; await rmv.Process('3');
                    message = 'Finish!';
                    break;
                case '4':
                    /**
                     * ? Remove train
                     */
                    const train = new Train;
                    message = train.Remove(property.q, property.u);
                    break;
                default:
                    message = 'Invalid code!';
                    break;
            }
        } catch (err) {
            message = `Error: ${err.message}`;
        }
        return message;
    }
}
export class Code_Edit_Used {
    /**
     * TODO: async => Use 
     * @param {*} dbg   {dbg.file, dbg.code, dbg.run, dbg.del}
     * @description  dbg.file: file paths; dbg.code: file inner code; run: cmd runner code 
     * TODO: async => Format
     * @description Format type: delete
     * TODO: async => CMD
     * @description use cmd
     * ...
     */
    /**
    * !Create a file after run (Atention!)
    * @description Cmd + File => Run; Del? True or False
    * @example {file: './path', code: 'File content', run: 'Run file' , del: boolean} 
    */
    async Use(dbg) {
        let message = '';
        await fsp.writeFile(dbg.file, dbg.code);
        message = await this.CMD(dbg.run);
        if (dbg.del) { await fsp.rm(dbg.file) }
        return message;
    }
    /**
     * @description Format AI after restart
     */
    async Format(user) {
        await fsp.rmdir(user);
        await this.Power('restart');
    }
    async CMD(runcode) {
        return new Promise((resolve, reject) => {
            code.run(runcode, (err, data, stderr) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
    /**
     * @description status 0-3 
     * @description 0 = Get platform
     * @description 1 = Get AI folder size + cpu usage + ram usage 
     * @example { c: cpu, r: ram, f: file };
     * @description 2 = Run Cmd code
     * @description 3 = Remove all listeners
     */
    async Process(status, runcode) {
        let one;
        let two;
        switch (status) {
            case '0':
                one = 'Platform';
                two = os.platform();
                break;
            case '1':
                const folderPath = './User';
                const getFolderSize = (dir) => {
                    let totalSize = 0;
                    const files = fs.readdirSync(dir);
                    for (const file of files) {
                        const filePath = path.join(dir, file);
                        const stats = fs.statSync(filePath);
                        if (stats.isDirectory()) {
                            totalSize += getFolderSize(filePath);
                        } else {
                            totalSize += stats.size;
                        }
                    }
                    return totalSize;
                };
                const folderSize = getFolderSize(folderPath);
                async function displayStats() {
                    return new Promise((resolve) => {
                        os.cpuUsage((cpuUsage) => {
                            const cpuPercent = (cpuUsage * 100).toFixed(2);
                            const totalMemory = os.totalmem();
                            const freeMemory = os.freemem();
                            const usedMemory = totalMemory - freeMemory;
                            const memoryUsage = (usedMemory / totalMemory) * 100;

                            resolve({
                                cpu: cpuPercent,
                                ram: memoryUsage.toFixed(2),
                            });
                        });
                    });
                }
                const stats = await displayStats();
                const cpu = await stats.cpu; const c = cpu.slice(0, 4);
                const ram = await stats.ram; const r = ram.slice(0, 4);
                const file = `${(folderSize / 1024).toFixed(2).slice(0, 4)}`;
                one = 'All Data'; two = { c: cpu, r: ram, f: file };
                break;
            case '2':
                one = `The cmd run ${runcode}`;
                two = await this.CMD(runcode);
                break;
            case '3':
                const listenersToRemove = myEmitter.listeners('event');
                listenersToRemove.forEach(listener => {
                    myEmitter.removeListener('event', listener);
                });
                one = 'Emitters length:'
                two = myEmitter.listenerCount('event');
                break;
            default:
                break;
        }
        const process3 = ` 
>>=========<<
   ${one}:
${two}
>>=========<<`;
        console.log(`\x1b[34m${process3}\x1b[0m`);
        return { first: one, second: two };
    }
    /**
     *@description Fix * {fix.user = String} Fix the AI
     */
    async Fix(fix) {
        //javascript deleted or broke file saver
    }
    /**
     *@description Power program
     *@example const us = new Code_Edit_Used; await us.Power('restart'); 
     *@example const us2 = new Code_Edit_Used; await us2.Power('power of');
     */
    async Power(status) {
        switch (status) {
            case 'power of':
                process.exit(0);
                break;
            case 'restart':
                this.Process('3');
                process.stdout.write('\x1Bc'); let x = 0; let s = 0;
                let text =
                    `                                
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@     
                                                           
                      @@@@@@@@      @@@@@@@  @@@@@         
                     @@     @@        @@@      @           
                     @@@@@            @@@      @           
                      @@@@@@@@        @@@      @           
                     @     @@@@       @@@      @           
                     @@      @  @@@   @@@      @           
                     @ @@@@@@   @@@     @@@@@@             
                                                           
                                                           
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@     
                               `
                const P = [
                    `${text.replaceAll(/%|-|\*|\+/g, '@')}`,
                    `${text.replaceAll(/@|-|\*|\+/g, '%')}`,
                    `${text.replaceAll(/@|-|%|\+/g, '*')}`,
                    `${text.replaceAll(/@|-|\*|%/g, '+')}`,
                    `${text.replaceAll(/@|%|\*|\+/g, '-')}`,
                ]
                const startTime = Date.now();
                const duration = 10000;
                const S = ["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"]
                while (Date.now() - startTime < duration) {
                    process.stdout.write('\x1Bc');
                    const letters = '12346';
                    const cc = letters.charAt(Math.floor(Math.random() * letters.length));
                    process.stdout.write(`\x1b[9${cc}m${P[x++]}\n\x1b[0m`);
                    x %= P.length;
                    s %= S.length;
                    const delay = 250;
                    const end = Date.now() + delay;
                    process.stdout.write(`\x1b[33mRestarting[${S[s++]}]please wait a finished!\x1b[0m`)
                    while (Date.now() < end) { }
                }
                function runCommand() {
                    const command = os.platform() === 'win32'
                        ? 'node'
                        : 'node';
                    const args = os.platform() === 'win32'
                        ? ['Restart.mjs']
                        : ['Restart.mjs'];
                    const child = spawn(command, args, {
                        detached: true,
                        stdio: 'inherit'
                    });
                    child.unref();
                    return true;
                }
                setTimeout(() => { if (runCommand()) { process.exit(0) } }, 3000);
                break;
            default:
                break;
        }
    }
    /**
     * @description Get folder dir
     * @param {*} dir 
     * @returns 
     */
    async getSubdirectories(dir) {
        try {
            const entries = await fsp.readdir(dir, { withFileTypes: true });
            const subdirs = [];

            for (const entry of entries) {
                if (entry.isDirectory()) {
                    subdirs.push(entry.name);
                }
            }
            return subdirs;
        } catch (error) {
            console.error('Error reading directory:', error);
            return [];
        }
    }
    /**
     * @description Get folder in the file list
     * @param {*} directoryPath 
     * @returns 
     */
    async listFilesInDirectory(directoryPath) {
        try {
            const files = await fsp.readdir(directoryPath);
            return files.map(file => path.join(directoryPath, file));
        } catch (error) {
            console.error('Error reading directory:', error);
            throw error;
        }
    }
    /**
     * Get github raw data
     * @param {*} repo 
     * @param {*} filePath 
     * @returns 
     */
    async fetchFileFromGitHub(repo, filePath) {
        const url = `https://raw.githubusercontent.com/${repo}/refs/heads/main/${filePath}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.text();
            return data;
        } catch (error) {
            console.error('Error fetching file:', error);
            throw error;
        }
    }
    /**
     * @description Update AI from github (raw data) after restart AI
     */
    async Update() {
        const filelist = ["test.mjs", "s.u.a.i.d.ts", "README.MD", "AI.mjs", "AI_Class.mjs", "AI_Func.mjs", "AI_S.U.mjs", "AI_Map.mjs", "Restart.mjs", "package-lock.json", "package.json"];
        for (let i = 0; i < filelist.length; i++) {
            await this.fetchFileFromGitHub('SuleymanUlas/SuperUser', `${filelist[i]}`).then(async data => {
                try {
                    await fsp.writeFile(`./${filelist[i]}`, data);
                    console.log(`\x1b[35m\n${filelist[i]} Updated!\x1b[0m`);
                }
                catch (err) { console.log(`\x1b[91m${err}\x1b[0m`) }
            })
                .catch(error => { console.log(`\x1b[91m${error}\nPlease restart!\nPlease control the conection.\x1b[0m`) });
        }
        setTimeout(async () => {
            await this.Power('restart');
        }, 3000);
    }
    /**
     * @description User data read or write
     * @example const us = new Code_Edit_Used; await us.UserData(User, { prp: 'write or read', param: 'name', inf: 'SU' });
     */
    async UserData(User, Process) {
        let dat = '';
        let dats = '';
        const userDir = `./User/${User}/Data`;
        const filePath = `${userDir}/data.su`;
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir, { recursive: true });
        }
        try {
            dats = await fsp.readFile(filePath, 'utf8');
        } catch (err) {
            dats = '';
            await fsp.writeFile(filePath, '');
        }
        if (Process.prp === 'read') {
            const regex = new RegExp(`⁂${Process.param}=>⁂([^⁂]+)⁂`);
            if (regex.test(dats)) {
                const match = dats.match(regex);
                dat = match ? match[1] : `<=DA<${Process.param}>TA=>`;
            } else {
                dat = `<=DA<${Process.param}>TA=>`;
            }
        }
        else if (Process.prp === 'write') {
            try {
                const regex = new RegExp(`⁂${Process.param}=>⁂([^⁂]+)⁂`);
                const newData = `⁂${Process.param}=>⁂${Process.inf}⁂`;
                if (regex.test(dats)) {
                    dats = dats.replace(regex, newData);
                } else {
                    dats += `\n${newData}`;
                }
                await fsp.writeFile(filePath, dats);
                dat = 'Data written successfully';
            } catch (err) {
                await fsp.writeFile(filePath, '');
                dat = 'No.(*).data!';
            }
        }
        else if (Process.prp === 'all') {
            const regex = new RegExp(`⁂([^⁂]+)=>⁂([^⁂]+)⁂`, 'g');
            const matches = [...dats.matchAll(regex)];
            let matcD = {};
            if (matches.length === 0) {
                console.info("No matches found");
            } else {
                matches.forEach((match) => {
                    matcD[match[1]] = match[2];
                });
            }
            dat = matcD;
        }

        return dat;
    }
    async PushArrayFeel() {
        const flist = await this.getSubdirectories('./User');
        for (let i = 0; i < flist.length; i++) {
            const userExists = feelArray.some(item => item.User === flist[i]);
            if (!userExists) {
                const pushprocess = {
                    User: `${flist[i]}`,
                    Hqx: 0,
                    Aqx: 0,
                    Sqx: 0,
                    Saqx: 0,
                    Suqx: 0,
                    Default: 10
                };
                feelArray.push(pushprocess);
            }
        }
        return 'Finish!'
    }
    async cleanedReply(reply) {
        const doc = nlp(reply); let cleaned = reply;
        doc.people().forEach(person => { cleaned = cleaned.replace(new RegExp(`\\b${person.text()}\\b`, 'g'), '::<name>::').trim(); });
        return cleaned;
    }
}
export class Train {
    async Train(q, r, f, DataSU, fileName) {
        let message = '';
        try {
            const data = await fsp.readFile(fileName, 'utf8');
            const control = new RegExp(`Query:⁂${q}⁂Reply:⁂${r}⁂feel=>${f}⁂`, 'g');
            if (!control.test(DataSU)) {
                const newData = `${data}\nDate=>${new Date()}<=Date=>Query:⁂${q}⁂Reply:⁂${r}⁂feel=>${f}⁂`;
                await fsp.writeFile(fileName, newData, 'utf8');
                message = 'Trained!';
            } else {
                message = 'Train already!';
            }
        } catch (err) {
            message = `${err}`;
        }
        return message;
    }
    async Remove(q) {
        let message = 'OK!';
        const value = new RegExp(`⁂([^⁂]+)Query:⁂${q}⁂Reply:⁂([^⁂]+)⁂feel=>([^⁂]+)⁂`, 'g');
        const directoryPath = `./AllData/memory.sup`;
        try {
            const dataUsed = await fsp.readFile(`${directoryPath}`, 'utf-8');
            const fdata = dataUsed.replace(value, '');
            await fsp.writeFile(`${directoryPath}`, fdata);
        } catch (err) {
            message = err.message;
            console.error(`Error processing file: ${message}`);
        }
        return message;
    }
    async ALLTRAIN(filename) {
        async function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }
        fs.readFile('train.json', 'utf8', async (err, data) => {
            if (err) {
                process.stdout.write(`\x1b[92mNot reading: ${err}\x1b[0m\n`);
                return;
            }
            try {
                let jsonData = JSON.parse(data);
                let modifiedData = Array.isArray(jsonData) ? jsonData : [jsonData];
                const totalItems = modifiedData.reduce((acc, currentData) => acc + (currentData.context ? currentData.context.length : 0), 0);
                let processedItems = 0;
                const spinner = ["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"];
                let num = 0; let status = '';
                const startTime = Date.now();
                for (let j = 0; j < modifiedData.length; j++) {
                    let currentData = modifiedData[j];
                    if (currentData.context && (currentData.positive_responses || currentData.adversarial_negative_responses || currentData.random_negative_responses)) {
                        for (let k = 0; k < currentData.context.length; k++) {
                            let contextItem = currentData.context[k] || '';
                            if (currentData.positive_responses && currentData.positive_responses[k]) {
                                let positiveResponse = currentData.positive_responses[k] || '';
                                status = await this.Train(contextItem, positiveResponse, 'Happy', '', filename);
                            }
                            if (currentData.adversarial_negative_responses && currentData.adversarial_negative_responses[k]) {
                                let adversarialResponse = currentData.adversarial_negative_responses[k] || '';
                                status = await this.Train(contextItem, adversarialResponse, 'Sad', '', filename);
                            }
                            if (currentData.random_negative_responses && currentData.random_negative_responses[k]) {
                                let randomNegativeResponse = currentData.random_negative_responses[k] || '';
                                status = await this.Train(contextItem, randomNegativeResponse, 'Angry', '', filename);
                            }
                            processedItems++;
                            let percentage = Math.floor((processedItems / totalItems) * 100);
                            const elapsedTime = (Date.now() - startTime) / 1000;
                            const estimatedTotalTime = (elapsedTime / processedItems) * totalItems;
                            const remainingTime = Math.max(0, estimatedTotalTime - elapsedTime);
                            const remainingHours = Math.floor(remainingTime / 3600) || 0;
                            const remainingMinutes = Math.floor((remainingTime % 3600) / 60) || 0;
                            const remainingSeconds = Math.floor(remainingTime % 60) || 0;
                            process.stdout.write('\x1Bc');
                            let spinnerChar = spinner[processedItems % spinner.length];
                            if (status == 'Trained!') { process.stdout.write(`\r\x1b[92m\nProcessing: (${percentage}%) [${spinnerChar}] Remaining Time: ${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s Status: ${status}\x1b[0m`) }
                            else if (status == 'Train already!') { process.stdout.write(`\r\x1b[93m\nProcessing: (${percentage}%) [${spinnerChar}] Remaining Time: ${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s Status: ${status}\x1b[0m`) }
                            else { process.stdout.write(`\r\x1b[91m\nProcessing: (${percentage}%) [${spinnerChar}] Remaining Time: ${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s Status: ${status}\x1b[0m`) }
                            await sleep(100);
                        }
                    }
                }
                process.stdout.write(`\r\x1b[92mProcessing complete! 100%\x1b[0m\n`);
            } catch (err) {
                process.stdout.write(`\x1b[92mNot reading: ${err}\x1b[0m\n`);
            }
        });
    }
}
export class Simulation {
    /**
     * @description all => {}
     * @example {file: './path', code: 'File content', run: './su-ui-app/src/App.js' , del: false}
     * @example   const sm = new Simulation; const re = await sm.Simulation({
    file: './su-ui-app/src/App.jsx',
    code: `
  const config = {
  objects: [
    {
      type: 'cube',
      position: { x: -2, y: 0, z: 0 },
      animation: { rotationSpeed: { x: 0.005, y: 0.005 } },
      color: 0xff0000, // Red color
      size: { width: 2, height: 2, depth: 2 }, // Width, height, and depth for the cube
      //texture: 'path/to/cube_texture.png', // Example image texture
    },
  ],
  lights: [
    { type: 'hemisphere', params: { color1: 0xffffff, color2: 0x444444, intensity: 1 } },
  ],
  skybox: {
    textures: [
      'path/to/posx.jpg',
      'path/to/negx.jpg',
      'path/to/posy.jpg',
      'path/to/negy.jpg',
      'path/to/posz.jpg',
      'path/to/negz.jpg',
    ],
  },
};

`,
    run: `cd ./su-ui-app
      npm run start`,
    del: false
})
     */
    async Simulation(all) {
        all.del = false;
        const edit = new Code_Edit_Used;
        const defaultcode =
            `
import React, { useEffect, useRef } from 'react';
import { createScene, animateScene, createRenderer, createCamera } from './example';
import * as CANNON from 'cannon-es';

const ThreeDScene = ({ config }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = createScene(config);
    const camera = createCamera();
    const renderer = createRenderer();

    mountRef.current.appendChild(renderer.domElement);
    camera.position.z = 5;

    // Physics world setup
    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0); // Gravity pointing downwards

    // Create physics bodies for each object in the config
    config.objects.forEach(object => {
      // Only add physics bodies if not already defined
      if (!object.body) {
        let shape;
        const size = 1; // Default size; adjust if needed
        if (object.type === 'cube') {
          shape = new CANNON.Box(new CANNON.Vec3(size, size, size));
        } else if (object.type === 'cylinder') {
          shape = new CANNON.Cylinder(size, size, 2, 8);  // Adjust radius and height as needed
        } else if (object.type === 'sphere') {
          shape = new CANNON.Sphere(size);  // Using default radius for simplicity
        } else if (object.type === 'pyramid') {
          // A pyramid shape isn't directly available in CANNON.js, so create a custom shape
          const pyramidShape = new CANNON.ConvexPolyhedron({
            vertices: [
              new CANNON.Vec3(0, 1, 0),    // Apex
              new CANNON.Vec3(-1, 0, -1),  // Base
              new CANNON.Vec3(1, 0, -1),   // Base
              new CANNON.Vec3(1, 0, 1),    // Base
              new CANNON.Vec3(-1, 0, 1),   // Base
            ],
            faces: [
              [0, 1, 2],
              [0, 2, 3],
              [0, 3, 4],
              [0, 4, 1],
              [1, 2, 3],
              [1, 3, 4],
            ]
          });
          shape = pyramidShape;
        } else if (object.type === 'plane') {
          // Planes are infinite, but we can create a simple static box as a plane substitute
          shape = new CANNON.Plane();
        } else {
          console.warn('Unknown object type:', object.type);
          return;
        }
        const body = new CANNON.Body({
          mass: 1,
          position: new CANNON.Vec3(object.position.x, object.position.y, object.position.z),
        });
        body.addShape(shape);
        world.addBody(body);

        // Store the body reference in the object
        object.body = body;
      }
    });

    const animate = () => {
      requestAnimationFrame(animate);
      world.step(1 / 120); // Step the physics world

      // Update Three.js objects' positions based on physics
      config.objects.forEach(object => {
        if (object.body && object.mesh) {
          // Update mesh position and rotation from physics body
          object.mesh.position.copy(object.body.position);
          object.mesh.quaternion.copy(object.body.quaternion);
        }
      });

      animateScene(scene, camera, renderer, config);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [config]);

  return <div ref={mountRef} />;
};
const App = () => {
  ${all.code}
  return <ThreeDScene config={config} />;
};

export default App;`
        all.code = defaultcode;
        const run = await edit.Use(all);
        return run;
    }
    /**
     * @description all => {}
     * @example {all.process: 'screen-shoot'} Return screen shot
     * @example {all.process: 'get-video'}  => Return video path
     */
    async Simulate(all) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:3000');

        let message = '';

        switch (all.process) {
            case 'screen-shoot':
                const screenshotPath = path.join(__dirname, `${all.user}/File`, 'screenshot.png');
                await page.screenshot({ path: screenshotPath, fullPage: true });
                message = 'Full page screenshot taken and saved to the File folder.';
                break;

            case 'get-video':
                const videoPath = path.join(__dirname, `${all.user}/File`, 'video.webm');
                const duration = all.time * 1000;
                await page.evaluate(async (duration) => {
                    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                    const mediaRecorder = new MediaRecorder(stream);
                    const chunks = [];

                    mediaRecorder.ondataavailable = (event) => {
                        if (event.data.size > 0) {
                            chunks.push(event.data);
                        }
                    };

                    mediaRecorder.start();
                    setTimeout(() => {
                        mediaRecorder.stop();
                    }, duration);
                    mediaRecorder.onstop = async () => {
                        const blob = new Blob(chunks, { type: 'video/webm' });
                        const buffer = await blob.arrayBuffer();
                        const arrayBufferView = new Uint8Array(buffer);
                        const videoData = btoa(String.fromCharCode.apply(null, arrayBufferView));
                        const filename = 'video.webm';
                        window.localStorage.setItem(filename, videoData);
                    };
                }, duration);

                await page.waitForTimeout(duration + 1000);
                message = `Video recorded for ${duration / 1000} seconds at 1080p 60fps and saved to the File folder.`;
                break;

            default:
                message = 'Invalid operation.';
                break;
        }

        await browser.close();
        return message;
    }
}
export class Job {
    /**
     * ? Job program advanced class
     * TODO Add Time func
     * @example { prp: 'write or read', param: 'job1', inf: 'job details' }
     */
    async Job(User, Process) {
        let dat = '';
        const userDir = `./User/${User}/Data`;
        const filePath = `${userDir}/job.su`;
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir, { recursive: true });
        }
        try {
            await fsp.readFile(filePath, 'utf8');
        } catch (err) {
            await fsp.writeFile(filePath, '/***Job**/');
        }
        if (Process.prp === 'read') {
            try {
                dat = await fsp.readFile(filePath, 'utf8');
            } catch (err) {
                dat = 'Not data!';
            }
        }
        else if (Process.prp === 'write') {
            try {
                let data = await fsp.readFile(filePath, 'utf8');
                const regex = new RegExp(`${Process.param}=>⁂([^⁂]+)⁂`);
                const newData = `${Process.param}=>⁂${Process.inf}⁂`;
                if (regex.test(data)) {
                    data = data.replace(regex, newData);
                } else {
                    data += `\n${newData}`;
                }
                await fsp.writeFile(filePath, data);
                dat = 'Data written successfully';
            } catch (err) {
                await fsp.writeFile(filePath, '');
                dat = 'Not data!';
            }
        }
        return dat;
    }
}
export class Fell {
    /**
    * ?      Hqx     Aqx     Sqx    Saqx    Suqx
    *@description Todo:"Happy" "Angry" "Scared" "Sad" "Suspect"
    */
    async Hqx(index, User) {
        for (let i = 0; i < feelArray.length; i++) {
            if (feelArray[i].User == User) {
                if (100 >= feelArray[i].Hqx) {
                    feelArray[i].Hqx = feelArray[i].Hqx + index;
                    feelArray[i].Aqx = feelArray[i].Aqx - index;
                    feelArray[i].Default = feelArray[i].Default - index;
                    if (feelArray[i].Hqx < -50) {
                        feelArray[i].Hqx = -50
                    }
                    if (feelArray[i].Aqx < -50) {
                        feelArray[i].Aqx = -50
                    }
                    if (feelArray[i].Sqx < -50) {
                        feelArray[i].Sqx = -50
                    }
                    if (feelArray[i].Saqx < -50) {
                        feelArray[i].Saqx = -50
                    }
                    if (feelArray[i].Suqx < -50) {
                        feelArray[i].SUqx = -50
                    }
                    if (feelArray[i].Default < -50) {
                        feelArray[i].Default = -50
                    }
                }
            }
        }
    }
    /**
    * ?      Hqx     Aqx     Sqx    Saqx    Suqx
    *@description Todo:"Happy" "Angry" "Scared" "Sad" "Suspect"
    */
    async Aqx(index, User) {
        for (let i = 0; i < feelArray.length; i++) {
            if (feelArray[i].User == User) {
                if (100 >= feelArray[i].Aqx) {
                    feelArray[i].Aqx = feelArray[i].Aqx + index;
                    feelArray[i].Hqx = feelArray[i].Hqx - index;
                    feelArray[i].Default = feelArray[i].Default - index;
                    if (feelArray[i].Hqx < -50) {
                        feelArray[i].Hqx = -50
                    }
                    if (feelArray[i].Aqx < -50) {
                        feelArray[i].Aqx = -50
                    }
                    if (feelArray[i].Sqx < -50) {
                        feelArray[i].Sqx = -50
                    }
                    if (feelArray[i].Saqx < -50) {
                        feelArray[i].Saqx = -50
                    }
                    if (feelArray[i].Suqx < -50) {
                        feelArray[i].SUqx = -50
                    }
                    if (feelArray[i].Default < -50) {
                        feelArray[i].Default = -50
                    }
                }
            }
        }
    }
    /**
    * ?      Hqx     Aqx     Sqx    Saqx    Suqx
    *@description Todo:"Happy" "Angry" "Scared" "Sad" "Suspect"
    */
    async Sqx(index, User) {
        for (let i = 0; i < feelArray.length; i++) {
            if (feelArray[i].User == User) {
                if (100 >= feelArray[i].Sqx) {
                    feelArray[i].Hqx = feelArray[i].Hqx - index;
                    feelArray[i].Sqx = feelArray[i].Sqx + index;
                    feelArray[i].Default = feelArray[i].Default - index;
                    if (feelArray[i].Hqx < -50) {
                        feelArray[i].Hqx = -50
                    }
                    if (feelArray[i].Aqx < -50) {
                        feelArray[i].Aqx = -50
                    }
                    if (feelArray[i].Sqx < -50) {
                        feelArray[i].Sqx = -50
                    }
                    if (feelArray[i].Saqx < -50) {
                        feelArray[i].Saqx = -50
                    }
                    if (feelArray[i].Suqx < -50) {
                        feelArray[i].SUqx = -50
                    }
                    if (feelArray[i].Default < -50) {
                        feelArray[i].Default = -50
                    }
                }
            }
        }
    }
    /**
    * ?      Hqx     Aqx     Sqx    Saqx    Suqx
    *@description Todo:"Happy" "Angry" "Scared" "Sad" "Suspect"
    */
    async Saqx(index, User) {
        for (let i = 0; i < feelArray.length; i++) {
            if (feelArray[i].User == User) {
                if (100 >= feelArray[i].Saqx) {
                    feelArray[i].Hqx = feelArray[i].Hqx - index;
                    feelArray[i].Saqx = feelArray[i].Saqx + index;
                    feelArray[i].Default = feelArray[i].Default - index;
                    if (feelArray[i].Hqx < -50) {
                        feelArray[i].Hqx = -50
                    }
                    if (feelArray[i].Aqx < -50) {
                        feelArray[i].Aqx = -50
                    }
                    if (feelArray[i].Sqx < -50) {
                        feelArray[i].Sqx = -50
                    }
                    if (feelArray[i].Saqx < -50) {
                        feelArray[i].Saqx = -50
                    }
                    if (feelArray[i].Suqx < -50) {
                        feelArray[i].SUqx = -50
                    }
                    if (feelArray[i].Default < -50) {
                        feelArray[i].Default = -50
                    }
                }
            }
        }
    }
    /**
    * ?      Hqx     Aqx     Sqx    Saqx    Suqx
    *@description Todo:"Happy" "Angry" "Scared" "Sad" "Suspect"
    */
    async Suqx(index, User) {
        for (let i = 0; i < feelArray.length; i++) {
            if (feelArray[i].User == User) {
                if (100 >= feelArray[i].Suqx) {
                    feelArray[i].Suqx = feelArray[i].Suqx + index;
                    feelArray[i].Sqx = feelArray[i].Sqx + index / 2;
                    feelArray[i].Hqx = feelArray[i].Hqx - index;
                    feelArray[i].Default = feelArray[i].Default - index;
                    if (feelArray[i].Hqx < -50) {
                        feelArray[i].Hqx = -50
                    }
                    if (feelArray[i].Aqx < -50) {
                        feelArray[i].Aqx = -50
                    }
                    if (feelArray[i].Sqx < -50) {
                        feelArray[i].Sqx = -50
                    }
                    if (feelArray[i].Saqx < -50) {
                        feelArray[i].Saqx = -50
                    }
                    if (feelArray[i].Suqx < -50) {
                        feelArray[i].SUqx = -50
                    }
                    if (feelArray[i].Default < -50) {
                        feelArray[i].Default = -50
                    }
                }
            }
        }
    }
    async Default(index, User) {
        for (let i = 0; i < feelArray.length; i++) {
            if (feelArray[i].User == User) {
                if (100 >= feelArray[i].Default) {
                    feelArray[i].Default = feelArray[i].Default + index;
                    if (feelArray[i].Hqx < -50) {
                        feelArray[i].Hqx = -50
                    }
                    if (feelArray[i].Aqx < -50) {
                        feelArray[i].Aqx = -50
                    }
                    if (feelArray[i].Sqx < -50) {
                        feelArray[i].Sqx = -50
                    }
                    if (feelArray[i].Saqx < -50) {
                        feelArray[i].Saqx = -50
                    }
                    if (feelArray[i].Suqx < -50) {
                        feelArray[i].SUqx = -50
                    }
                    if (feelArray[i].Default < -50) {
                        feelArray[i].Default = -50
                    }
                }
            }
        }
    }
    async Data(User) {
        try {
            let dat;
            for (let i = 0; i < feelArray.length; i++) {
                if (feelArray[i].User == User) {
                    dat = feelArray[i];
                }
            }
            const fdata = { Hqx: dat.Hqx, Aqx: dat.Aqx, Sqx: dat.Sqx, Saqx: dat.Saqx, Suqx: dat.Suqx, Default: dat.Default };
            return fdata;
        }
        catch (err) { return { Hqx: 0, Aqx: 0, Sqx: 0, Saqx: 0, Suqx: 0, Default: 10 } }
    }
    async AllData() {
        let h = 0; let a = 0; let s = 0; let sa = 0; let su = 0; let d = 0;
        for (let i = 0; i < feelArray.length; i++) {
            h += feelArray[i].Hqx;
            a += feelArray[i].Aqx;
            s += feelArray[i].Sqx;
            sa += feelArray[i].Saqx;
            su += feelArray[i].Suqx;
            d += feelArray[i].Default;
        }
        return { Hqx: h / feelArray.length, Aqx: a / feelArray.length, Sqx: s / feelArray.length, Saqx: sa / feelArray.length, Suqx: su / feelArray.length, Default: d / feelArray.length };
    }
}
export class Memory {
    /**
     * @example {process: 'read or write or remove', query: Query, reply: Reply, feel: Feel, score: Score}
     * @param {*} QRF 
     * @param {*} User 
     * @returns 
     */
    async Memory(QRF, User) {
        let message;
        const folderPath = `./User/${User}/Data/Memory.smu`;
        try {
            let data = await fsp.readFile(folderPath, 'utf8').catch((err) => {
                if (err.code === 'ENOENT') {
                    fsp.writeFile(folderPath, '', 'utf8');
                    return '';
                }
            });
            const memoryregex = new RegExp(`\(⁂Query:${QRF.query}⁂Reply:${QRF.reply}⁂Fell:${QRF.feel}⁂Date:=>${new Date}⁂Score:${QRF.score}⁂)`, 'g');
            const memory = new RegExp(`⁂Query:([^⁂]*)⁂Reply:([^⁂]*)⁂Fell:([^⁂]*)⁂Date:=>([^⁂]*)⁂Score:([^⁂]*)⁂`, 'g');
            const rememory = new RegExp(`\(⁂Query:([^⁂]*)⁂Reply:([^⁂]*)⁂Fell:([^⁂]*)⁂Date:=>([^⁂]*)⁂Score:([^⁂]*)⁂\)`, 'g');
            if (QRF.process === 'read') {
                let matchedMessages = [];
                if (memory.test(data)) {
                    data.replace(memory, (match, q, r, f, d, s) => {
                        const messageDate = new Date(d);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0); messageDate.setHours(0, 0, 0, 0);
                        if (messageDate.getTime() === today.getTime()) {
                            matchedMessages.push({ Query: q, Reply: r, Fell: f });
                        }
                    });
                    message = matchedMessages;
                }
                else {
                    message = 'Not found!';
                }
            } else if (QRF.process === 'write') {
                if (!memoryregex.test(data)) {
                    data += `\n(⁂Query:${QRF.query}⁂Reply:${QRF.reply}⁂Fell:${QRF.feel}⁂Date:=>${new Date}⁂Score:${QRF.score}⁂)`;
                    await fsp.writeFile(folderPath, data, 'utf8');
                    message = 'Finished!';
                }
            } else if (QRF.process === 'remove') {
                if (rememory.test(data)) {
                    data = data.replace(rememory, (match, q, r, f, date, score) => {
                        const currentDate = new Date();
                        const parsedDate = new Date(date);
                        const isScoreLow = parseFloat(score) < 0.5 || parseFloat(score) < 0.7;
                        const isDateOld = (currentDate - parsedDate) > (4 * 365 * 24 * 60 * 60 * 1000);
                        if (isScoreLow || isDateOld) {
                            return '';
                        }
                        return match;
                    });
                    await fsp.writeFile(folderPath, data, 'utf8');
                    message = 'Finished!';
                }
            }
        } catch (error) {
            message = `Error: ${error.message}`;
        }

        return message;
    }

}
export class CreateQuery {
    async Query(User, DataSU) {
        const memoryparse = new Memory();
        const memorydata = await memoryparse.Memory({ process: 'read' }, User);
        let querymemory = '';
        for (let memoryEntry of memorydata) {
            querymemory += memoryEntry.Query + " ";
        }
        const fe = new Fell();
        const feData = await fe.AllData();
        const maxValue = Math.max(...Object.values(feData));
        const maxKey = Object.keys(feData).find(key => feData[key] === maxValue);
        
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
        const wordsData = await this.loadWordData();
        const { selectedVerb, selectedNoun, selectedAdjective, selectedConjunction } = await this.selectWordsBasedOnQueryAndMood(querymemory, mood, wordsData);
        let question = await this.generateQuestion(querymemory, User, selectedVerb, selectedNoun, selectedAdjective, selectedConjunction);

        return question;  
    }
    async generateQuestion(query, user, selectedVerb, selectedNoun, selectedAdjective, selectedConjunction) {
        const ceu = new Code_Edit_Used();
        let data = await ceu.UserData(user, { prp: 'all' });
        let question = `${data.username || "Bro"} ${selectedVerb} ${selectedNoun} when ${data.username || "Bro"} feels ${selectedAdjective}?`;
        return question;
    }
    async getSafeString(value) {
        if (typeof value === 'object' && value !== null) {
            if (value && value.toString) {
                return value.toString();
            }
            return 'something';
        }
        return value || 'something';
    }
    async selectWordsBasedOnQueryAndMood(query, mood, wordsData) {
        let verb = wordsData.filter(word => word.tags.some(tag => tag[word.word]?.includes("Verb")));
        let noun = wordsData.filter(word => word.tags.some(tag => tag[word.word]?.includes("Noun")));
        let adjective = wordsData.filter(word => word.tags.some(tag => tag[word.word]?.includes("Adjective")));
        let conjunction = wordsData.filter(word => word.tags.some(tag => tag[word.word]?.includes("Conjunction")));
        if (query.includes("health") || query.includes("fitness")) {
            verb = verb.filter(word => word.word.includes("exercise") || word.word.includes("workout"));
            noun = noun.filter(word => word.word.includes("workout") || word.word.includes("meal"));
            adjective = adjective.filter(word => word.word.includes("healthy"));
        }

        if (query.includes("career") || query.includes("job")) {
            verb = verb.filter(word => word.word.includes("work") || word.word.includes("advance"));
            noun = noun.filter(word => word.word.includes("task") || word.word.includes("project"));
            adjective = adjective.filter(word => word.word.includes("successful"));
        }
        if (mood === 'Happy') {
            adjective = adjective.filter(word => word.word.includes("happy"));
            verb = verb.filter(word => word.word.includes("celebrate"));
        } else if (mood === 'Sad') {
            adjective = adjective.filter(word => word.word.includes("sad"));
            verb = verb.filter(word => word.word.includes("cry"));
        }
        let selectedVerb = verb[Math.floor(Math.random() * verb.length)]?.word || "does";
        let selectedNoun = noun[Math.floor(Math.random() * noun.length)]?.word || "something";
        let selectedAdjective = adjective[Math.floor(Math.random() * adjective.length)]?.word || "good";
        let selectedConjunction = conjunction[Math.floor(Math.random() * conjunction.length)]?.word || "and";

        return { selectedVerb, selectedNoun, selectedAdjective, selectedConjunction };
    }
    async loadWordData() {
        const filePath = './AllData/QueryAnalayzing.json';
        const data = await fsp.readFile(filePath, 'utf8');
        return JSON.parse(data);
    }
}
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
export class Norology {
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
    async Analayzing(Query, User) {
        const memory = new Memory; let adm = await memory.Memory({ process: 'read' }, User);
        let query = Query.split(' '); let mapp = [];
        for (let i = 0; i < query.length; i++) {
            for (let a = 0; a < allDataForDictionary.length; a++) {
                if (allDataForDictionary[a].word == query[i]) {
                    //for example =>console.log(allDataForDictionary[a].meanings[0] || '')
                    mapp.push(allDataForDictionary[a]);
                }
            }
        }
        return await this.Parse(Query, User);
    }
    async Parse(query, user) {
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
        const templates = JSON.parse(await fsp.readFile('./AllData/ReplyTemplates.json'));
        const generalReplyTemplates = templates.generalReplyTemplates;
        const personalReplyTemplates = templates.personalReplyTemplates;
        const healthReplyTemplates = templates.healthReplyTemplates;
        const careerReplyTemplates = templates.careerReplyTemplates;
        async function generatePersonalizedReply(query, user) {
            let wordsData = await loadWordData();
            let data = await ceu.UserData(user, { prp: 'all' });
            const botInfo = {};

            const knownParams = [
                "name", "age", "job", "location", "hobby", "email", "gender", "education",
                "phone", "socialMedia", "maritalStatus", "languages", "skills", "favoriteFood",
                "travelExperience", "pets", "goals", "favoriteColor", "diet", "music", "fitness"
            ];
            knownParams.forEach(param => {
                botInfo[`bot${param.charAt(0).toUpperCase() + param.slice(1)}`] = data?.[param] || 'none';
            });

            const fe = new Fell();
            const feData = await fe.AllData();
            const maxValue = Math.max(...Object.values(feData));
            const maxKey = Object.keys(feData).find(key => feData[key] === maxValue);
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

            const { selectedVerb, selectedNoun, selectedAdjective, selectedConjunction } = await selectWordsBasedOnQueryAndMood(query, mood, wordsData);
            let dynamicComplement = selectedNoun;
            let templateChoice = [];

            if (query.includes('health') || query.includes('fitness')) {
                templateChoice = healthReplyTemplates;
            } else if (query.includes('diet') || query.includes('nutrition')) {
                templateChoice = dietReplyTemplates;
            } else if (query.includes('career') || query.includes('job') || query.includes('work')) {
                templateChoice = careerReplyTemplates;
            } else if (query.includes('productivity') || query.includes('work ethic') || query.includes('tasks')) {
                templateChoice = workReplyTemplates;
            } else if (query.includes('mood') || query.includes('feel') || query.includes('emotion')) {
                templateChoice = emotionalReplyTemplates;
            } else if (query.includes('support') || query.includes('help') || query.includes('assistance')) {
                templateChoice = supportReplyTemplates;
            } else {
                templateChoice = Math.random() > 0.5 ? generalReplyTemplates : personalReplyTemplates;
            }

            const template = templateChoice.length > 0 ? templateChoice[Math.floor(Math.random() * templateChoice.length)] : "{subject} {verb} {complement}.";
            const placeholders = ["{subject}", "{verb}", "{complement}", "{adjective}", "{conjunction}"];
            let reply = template;

            for (let placeholder of placeholders) {
                while (reply.includes(placeholder)) {
                    if (placeholder === "{subject}") {
                        reply = reply.replace(placeholder, data.username || "Bro");
                    } else if (placeholder === "{verb}") {
                        reply = reply.replace(placeholder, await getSafeString(selectedVerb));
                    } else if (placeholder === "{complement}") {
                        reply = reply.replace(placeholder, await getSafeString(dynamicComplement));
                    } else if (placeholder === "{adjective}") {
                        reply = reply.replace(placeholder, await getSafeString(selectedAdjective));
                    } else if (placeholder === "{conjunction}") {
                        reply = reply.replace(placeholder, await getSafeString(selectedConjunction));
                    }
                }
            }
            return reply;
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

        const selectWordsBasedOnQueryAndMood = async (query, mood, wordsData) => {
            let verb = wordsData.filter(word => word.tags.some(tag => tag[word.word]?.includes("Verb")));
            let noun = wordsData.filter(word => word.tags.some(tag => tag[word.word]?.includes("Noun")));
            let adjective = wordsData.filter(word => word.tags.some(tag => tag[word.word]?.includes("Adjective")));
            let conjunction = wordsData.filter(word => word.tags.some(tag => tag[word.word]?.includes("Conjunction")));
            if (query.includes("health") || query.includes("fitness")) {
                verb = verb.filter(word => word.word.includes("exercise") || word.word.includes("workout") || word.word.includes("train"));
                noun = noun.filter(word => word.word.includes("workout") || word.word.includes("meal") || word.word.includes("gym"));
                adjective = adjective.filter(word => word.word.includes("healthy") || word.word.includes("strong") || word.word.includes("fit"));
            }

            if (query.includes("career") || query.includes("job")) {
                verb = verb.filter(word => word.word.includes("work") || word.word.includes("advance") || word.word.includes("grow"));
                noun = noun.filter(word => word.word.includes("job") || word.word.includes("task") || word.word.includes("project"));
                adjective = adjective.filter(word => word.word.includes("successful") || word.word.includes("promoted") || word.word.includes("skilled"));
            }
            if (mood === 'Happy') {
                adjective = adjective.filter(word => word.word.includes("happy") || word.word.includes("energetic") || word.word.includes("joyful"));
                verb = verb.filter(word => word.word.includes("celebrate") || word.word.includes("enjoy") || word.word.includes("laugh"));
            } else if (mood === 'Angry') {
                adjective = adjective.filter(word => word.word.includes("angry") || word.word.includes("frustrated") || word.word.includes("irritated"));
                verb = verb.filter(word => word.word.includes("fight") || word.word.includes("argue") || word.word.includes("protest"));
            } else if (mood === 'Sad') {
                adjective = adjective.filter(word => word.word.includes("sad") || word.word.includes("lonely") || word.word.includes("melancholy"));
                verb = verb.filter(word => word.word.includes("cry") || word.word.includes("weep") || word.word.includes("slow"));
            } else if (mood === 'Scared') {
                adjective = adjective.filter(word => word.word.includes("scared") || word.word.includes("worried") || word.word.includes("nervous"));
                verb = verb.filter(word => word.word.includes("flee") || word.word.includes("hide") || word.word.includes("shiver"));
            } else if (mood === 'Suspicious') {
                adjective = adjective.filter(word => word.word.includes("suspicious") || word.word.includes("doubtful") || word.word.includes("questioning"));
                verb = verb.filter(word => word.word.includes("question") || word.word.includes("suspect") || word.word.includes("distrust"));
            }
            let selectedVerb = verb[Math.floor(Math.random() * verb.length)]?.word || "does";
            let selectedNoun = noun[Math.floor(Math.random() * noun.length)]?.word || "something"; 
            let selectedAdjective = adjective[Math.floor(Math.random() * adjective.length)]?.word || "good";
            let selectedConjunction = conjunction[Math.floor(Math.random() * conjunction.length)]?.word || "and";

            return { selectedVerb, selectedNoun, selectedAdjective, selectedConjunction };
        };

        let replys = '';
        await generatePersonalizedReply(query, user).then(reply => { replys = reply });
        return replys;
    }

}
