import fsp from 'fs/promises';
import fs, { PathLike } from 'fs';

export class Train {
    async Train(q:string, r:string, f:string, DataSU:string, fileName:PathLike) {
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
    async Remove(q:string) {
        let message = 'OK!';
        const value = new RegExp(`⁂([^⁂]+)Query:⁂${q}⁂Reply:⁂([^⁂]+)⁂feel=>([^⁂]+)⁂`, 'g');
        const directoryPath = `./AllData/memory.sup`;
        try {
            const dataUsed = await fsp.readFile(`${directoryPath}`, 'utf-8');
            const fdata = dataUsed.replace(value, '');
            await fsp.writeFile(`${directoryPath}`, fdata);
        } catch (err) {
            message = (err as Error).message;
            console.error(`Error processing file: ${message}`);
        }
        return message;
    }
    async ALLTRAIN(filename:string) {
        async function sleep(ms:number) { return new Promise(resolve => setTimeout(resolve, ms)) }
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