import { PathLike } from 'fs';
import code from 'node-cmd';
import fsp from 'fs/promises';
import os from 'os-utils';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { ExecException } from 'child_process';
import { MyEmitter } from "./MyEmitter";
import { Fell } from "./Fell";
import nlp from 'compromise';

interface Dbg {
    code: string,
    run: string,
    file: PathLike
    del: boolean
}

interface DisplayStatus {
    cpu: string,
    ram: string
}

export interface Process {
    prp: string,
    param?: string,
    inf?: string
}

export class Code_Edit_Used {
    static myEmitter: MyEmitter = new MyEmitter();
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
    async Use(dbg: Dbg) {
        let message: string = '';
        await fsp.writeFile(dbg.file, dbg.code);
        message = await this.CMD(dbg.run);
        if (dbg.del) { await fsp.rm(dbg.file) }
        return message;
    }
    /**
     * @description Format AI after restart
     */
    async Format(user: string) {
        await fsp.rmdir(user);
        await this.Power('restart');
    }
    async CMD(runcode: string): Promise<string> {
        return new Promise((resolve, reject) => {
            code.run(runcode, (err: ExecException | null, data: string, stderr: string) => {
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
    async Process(status: string, runcode?: string) {
        let one;
        let two;
        switch (status) {
            case '0':
                one = 'Platform';
                two = os.platform();
                break;
            case '1':
                const folderPath = './User';
                const getFolderSize = (dir: string) => {
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
                async function displayStats(): Promise<DisplayStatus> {
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
                if (runcode) {
                    two = await this.CMD(runcode);
                } else {
                    two = null
                }
                break;
            case '3':
                const listenersToRemove = Code_Edit_Used.myEmitter.listeners('event');
                listenersToRemove.forEach((listener: any) => {
                    Code_Edit_Used.myEmitter.removeListener('event', listener);
                });
                one = 'Emitters length:'
                two = Code_Edit_Used.myEmitter.listenerCount('event');
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
    async Fix(fix: any) {
        //javascript deleted or broke file saver
    }
    /**
     *@description Power program
     *@example const us = new Code_Edit_Used; await us.Power('restart'); 
     *@example const us2 = new Code_Edit_Used; await us2.Power('power of');
     */
    async Power(status: string) {
        switch (status) {
            case 'power of':
                process.exit(0);
                break;
            case 'restart':
                this.Process('3');
                process.stdout.write('\x1Bc'); let x = 0; let s = 0;
                let text: string =
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
    async getSubdirectories(dir: PathLike) {
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
    async listFilesInDirectory(directoryPath: string) {
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
    async fetchFileFromGitHub(repo: string, filePath: string) {
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
        const filelist2 = ["QueryAnalayzing.json", "QueryTemplates.json", "ReplyTemplates.json"];
        for (let i = 0; i < filelist2.length; i++) {
            await this.fetchFileFromGitHub('SuleymanUlas/SuperUser', `AllData/${filelist2[i]}`).then(async data => {
                try {
                    await fsp.writeFile(`./${filelist2[i]}`, data);
                    console.log(`\x1b[35m\n${filelist2[i]} Updated!\x1b[0m`);
                }
                catch (err) { console.log(`\x1b[91m${err}\x1b[0m`) }
            })
                .catch(error => { console.log(`\x1b[91m${error}\nPlease restart!\nPlease control the conection.\x1b[0m`) });
        }
        const filelist3 = ["Worker_similitary.mjs", "Worker_summary.mjs"];
        for (let i = 0; i < filelist3.length; i++) {
            await this.fetchFileFromGitHub('SuleymanUlas/SuperUser', `/src${filelist3[i]}`).then(async data => {
                try {
                    await fsp.writeFile(`./${filelist3[i]}`, data);
                    console.log(`\x1b[35m\n${filelist3[i]} Updated!\x1b[0m`);
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
    async UserData(User: string, Process: Process) {
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
            let matcD: any = {};
            if (matches.length === 0) {
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
            const userExists = Fell.feelArray.some(item => item.User === flist[i]);
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
                Fell.feelArray.push(pushprocess);
            }
        }
        return 'Finish!'
    }
    async cleanedReply(reply: string) {
        const doc = nlp(reply);
        let cleaned = reply;
        doc.people().forEach(person => {
            cleaned = cleaned.replace(new RegExp(`\\b${person.text()}\\b`, 'g'), '::<name>::').trim();
        });
        return cleaned;
    }
}