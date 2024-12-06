declare module 's.u.a.i' {
    export class SUPER_USER_AI {
        AI(query: string): Promise<string>;
        Train(Query: string, Reply: string, Feel: string): Promise<string>;
        Remove(Query: string): Promise<string>;
        ALLTRAİN(filename: string): Promise<string>;
        Update(): Promise<string>;
        readData(read: string): Promise<string>;
        writeData(param: string, inf: string):Promise<string>;
        allData(): Promise<unknown>;
    }
    export class Code_Edit_Used {
        PushArrayFeel(): Promise<void>;
    }
    export class UI_SU {
        AI(query: string, user: string): Promise<boolean>;
    }
    export class Memory {
        Memory(options: { process: string }, user: string): Promise<string[]>;
    }
    export class CreateQuery {
        Query(user: string, data: string): Promise<string>;
    }
    export function SU_QUERY(DataSU: string, usall: string, Query: string, value: string, filename: string): Promise<string>;
    export const train: {
        Train(Query: string, Reply: string, Feel: string, unused: string, filename: string): Promise<string>;
        Remove(Query: string): Promise<string>;
        ALLTRAIN(filename: string): Promise<string>;
    };
    export const ceuupdate: {
        Update(): Promise<string>;
    };
}
  