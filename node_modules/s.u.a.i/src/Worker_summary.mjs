import { parentPort } from 'worker_threads';
import { summarize } from 'node-summary';
parentPort.on('message', ({ s, res }) => {
  summarize(s, res, (err, result) => {
    if (err) {
      parentPort.postMessage({ error: err });
    } else {
      let ratio = (100 - (100 * (result.length / (s.length + res.length))));
      parentPort.postMessage({ ratio, result });
    }
  });
});
/**
 * Todo code fix USE ==> Pretier, Minifyjs,Code lang detector,highlight js
 * 
 */