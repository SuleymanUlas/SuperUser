import fs from 'fs';
import fsp from 'fs/promises';
import { Code_Edit_Used, Memory, CreateQuery } from '../AI_Class/index.js';
import { SU_QUERY } from '../AI/index.js';
import { UI_SU } from "./UI_SU.js";

export class SUPER_USER_AI {
    async AI(query: string) {
        const feelarray = new Code_Edit_Used;
        await feelarray.PushArrayFeel(); let us;
        const qy = query;
        UI_SU.USER = 'Default';
        const query_user = qy;
        if (!fs.existsSync(`./User/${UI_SU.USER}/Data`)) { fs.mkdirSync(`./User/${UI_SU.USER}/Data`, { recursive: true }) }
        await fsp.readFile(`./User/${UI_SU.USER}/Data/data.su`, 'utf8').catch((err) => {
            if (err) {
                fsp.writeFile(`./User/${UI_SU.USER}/Data/data.su`,
                    `
          ⁂username=>⁂SuperUser⁂
          `, 'utf8');
            }
        });
        await fsp.readFile(`./User/${UI_SU.USER}/Data/Memory.smu`, 'utf8').catch((err) => {
            if (err) {
                fsp.writeFile(`./User/${UI_SU.USER}/Data/Memory.smu`, '', 'utf8');
            }
        }); us = UI_SU.USER; UI_SU.usall = UI_SU.USER
        if (!fs.existsSync(`./${UI_SU.DefaultUser}/${us}`)) { fs.mkdirSync(`./${UI_SU.DefaultUser}/${us}`) }
        const q = new UI_SU;
        const okstatus = await q.AI(query_user, us);
        if (okstatus) { return await this.ReplyFunc(UI_SU.dataAI.o, UI_SU.dataAI.t, UI_SU.dataAI.th, UI_SU.dataAI.f, UI_SU.dataAI.fi) }
    }
    async ReplyFunc(value: string, DataSU: string, Query: string, filename: string, Status: number) {
        let retunmessage = ''; let question = '';
        if (Status != 0) {
            const mems = new Memory; const sq = new CreateQuery;
            if (/:([^:]+):/.test(value)) { retunmessage = value.replaceAll('(:[n]:)', '\n') }
            else {
                const message = await SU_QUERY(DataSU, UI_SU.usall, Query, value, filename);
                retunmessage = (message as string).replaceAll('(:[n]:)', '\n');
            }
            question = await sq.Query(UI_SU.USER);
        }
        else { retunmessage = value }
        if (Status === 2) {
            let prnum = Math.floor(Math.random() * 2);
            if (prnum === 1) { question = '' }
        }
        const Data =
        {
            "Train":
                [value],
            "AI":
                [retunmessage],
            "Question":
                [question]
        }
        return Data;
    }
    /**
     * 
     * @param {*} Query 
     * @param {*} Reply 
     * @param {*} Feel 
     * @returns 
     */
    async Train(Query: string, Reply: string, Feel: string) {
        return await UI_SU.train.Train(Query, Reply, Feel, '', './AllData/memory.sup');
    }
    /**
     * 
     * @param {*} Query 
     * @returns 
     */
    async Remove(Query: string) {
        return await UI_SU.train.Remove(Query);
    }
    /**
     * @description json file content example
     * @example {"id": 0, "context": ["Are you looking for an apartment?", "Yes, I am interested in finding a one-bedroom apartment near Washington Square.", "I think I have just a right apartment for you."], "positive_responses": ["Well! That is really good news.", "Are you serious! Where is it?", "Could you please tell me something more about it?", "That is awesome! Could you please show it to me?", "Really! What is the rent they are asking for? Do you know it?"], "adversarial_negative_responses": ["I think, most of the people wanted to travel to holy place to get a right path in their life.", "Anger rusts intellect so I think that it cannot discern right from wrong", "There is a huge temple recognized near to the building which is familiar with those localities.", "In my the bed room the things which is spread over is so rediculous. I couldnt acquiste.", "Yes, I am fond of having an ice cream with strawberry flavour in my new apartment."], "random_negative_responses": ["Because, my friends wants to meet you.", "See everything comes with some or the other disadvantages. People should be smart enough to tackle it.", "I eat a lot of fresh herbs.", "After lunch you should be back at the workshop.", "Yes. How is everyone at home?"]}
     * @param {*} filename 
     */
    async ALLTRAİN(filename: string) {
        return await UI_SU.train.ALLTRAIN(filename);
    }
    async Update() {
        return UI_SU.ceuupdate.Update();
    }
    async readData(read: string) {
        return await UI_SU.ceuupdate.UserData('Default', { prp: 'read', param: read });
    }
    async writeData(param: string, inf: string) {
        return await UI_SU.ceuupdate.UserData('Default', { prp: 'write', param: param, inf: inf })
    }
    async allData() {
        return await UI_SU.ceuupdate.UserData('Default', { prp: 'all' });
    }
}