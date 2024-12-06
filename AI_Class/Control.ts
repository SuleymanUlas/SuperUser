import { Train } from "./Train";
import { Code_Edit_Used } from "./Code_Edit_Used";

interface ProperTy {
    user: string,
    q: string
}

interface Feel {
    Hqx?: Number,
    Aqx?: Number,
    Sqx?: Number,
    Saqx?: Number,
    Suqx?: Number,
    Default?: Number
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
async Status(code: string, property: ProperTy) {
        let feel:Feel = { Hqx: 0, Aqx: 0, Sqx: 0, Saqx: 0, Suqx: 0, Default: 0 };
        let message:string = '';
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
                    message =await train.Remove(property.q);
                    break;
                default:
                    message = 'Invalid code!';
                    break;
            }
        } catch (err) {
            message = `Error: ${(err as Error).message}`;
        }
        return message;
    }
}