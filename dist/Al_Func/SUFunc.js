import { Worker } from 'worker_threads';
export class SUFunc {
    /**
     * @description .rc => summary ratio [number], .res => result [string]
     * @param {*} s
     * @param {*} res
     * @returns
     */
    async SummaryRatio(s, res) {
        return new Promise((resolve, reject) => {
            const worker = new Worker('../../src/Worker_summary.mjs');
            worker.postMessage({ s, res });
            worker.on('message', ({ ratio, result, error }) => {
                if (error) {
                    resolve({ rc: 0, res: res });
                }
                else {
                    resolve({ rc: ratio, res: result });
                }
            });
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                }
            });
        });
    }
    /**
     * @description Fix the Query
     * @param {*} sentence
     * @returns
     */
    async Similitary(sentence) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(new URL('../../src/Worker_similitary.mjs', import.meta.url));
            worker.postMessage(sentence);
            worker.on('message', (result) => {
                resolve(result);
            });
            worker.on('error', (error) => {
                reject(error);
            });
            worker.on('exit', (code) => {
                if (code !== 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                }
            });
        });
    }
}
//# sourceMappingURL=SUFunc.js.map