
import fs from 'fs';
import fsp from 'fs/promises';
import { Process } from "./Code_Edit_Used";

export class Job {
    /**
     * ? Job program advanced class
     * TODO Add Time func
     * @example { prp: 'write or read', param: 'job1', inf: 'job details' }
     */
    async Job(User:string, Process:Process) {
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