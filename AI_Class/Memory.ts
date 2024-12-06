
import fsp from 'fs/promises';

export interface MatchedMessage {
    Query: string, 
    Reply: string, 
    Fell: string
}

interface QRF {
    process: string,
    query?: string,
    reply?: string,
    feel?: string,
    score?: number
}

export class Memory {
    /**
     * @example {process: 'read or write or remove', query: Query, reply: Reply, feel: Feel, score: Score}
     * @param {*} QRF 
     * @param {*} User 
     * @returns 
    */
    
    async Memory(QRF: QRF, User: string):Promise<string | MatchedMessage[]> {
        let message:string | MatchedMessage[] = [];
        const folderPath = `./User/${User}/Data/Memory.smu`;
        try {
            let data: string | undefined = await fsp.readFile(folderPath, 'utf8').catch((err) => {
                if (err.code === 'ENOENT') {
                    fsp.writeFile(folderPath, '', 'utf8');
                    return '';
                }
            });
            if(data){
                const memoryregex = new RegExp(`\(⁂Query:${QRF.query}⁂Reply:${QRF.reply}⁂Fell:${QRF.feel}⁂Date:=>${new Date}⁂Score:${QRF.score}⁂)`, 'g');
                const memory = new RegExp(`⁂Query:([^⁂]*)⁂Reply:([^⁂]*)⁂Fell:([^⁂]*)⁂Date:=>([^⁂]*)⁂Score:([^⁂]*)⁂`, 'g');
                const rememory = new RegExp(`\(⁂Query:([^⁂]*)⁂Reply:([^⁂]*)⁂Fell:([^⁂]*)⁂Date:=>([^⁂]*)⁂Score:([^⁂]*)⁂\)`, 'g');
                if (QRF.process === 'read') {
                    let matchedMessages:MatchedMessage[]= [];
                    if (memory.test(data)) {
                        
                        data.replace(memory, (match:string, q: string, r: string, f: string, d: string, s: string) => {
                            const messageDate = new Date(d);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0); messageDate.setHours(0, 0, 0, 0);
                            if (messageDate.getTime() === today.getTime()) {
                                matchedMessages.push({ Query: q, Reply: r, Fell: f });
                            }
                            return ""
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
                            const currentDate:Date = new Date();
                            const parsedDate:Date = new Date(date);
                            const isScoreLow = parseFloat(score) < 0.5 || parseFloat(score) < 0.7;
                            const isDateOld = (currentDate.getTime() - parsedDate.getTime()) > (4 * 365 * 24 * 60 * 60 * 1000);
                            if (isScoreLow || isDateOld) {
                                return '';
                            }
                            return match;
                        });
                        await fsp.writeFile(folderPath, data, 'utf8');
                        message = 'Finished!';
                    }
                }
            }else{
                message = 'Not found!';
            }
        } catch (error) {
            message = `Error: ${(error as Error).message}`;
        }
        return message;
    }

}