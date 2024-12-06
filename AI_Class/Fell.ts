
export class Fell {
    /**
    * ?      Hqx     Aqx     Sqx    Saqx    Suqx
    *@description Todo:"Happy" "Angry" "Scared" "Sad" "Suspect"
    */
    static feelArray: any[] = []
    async Hqx(index: number, User: string) {
        for (let i = 0; i < Fell.feelArray.length; i++) {
            if (Fell.feelArray[i].User == User) {
                if (100 >= Fell.feelArray[i].Hqx) {
                    Fell.feelArray[i].Hqx = Fell.feelArray[i].Hqx + index;
                    Fell.feelArray[i].Aqx = Fell.feelArray[i].Aqx - index;
                    Fell.feelArray[i].Default = Fell.feelArray[i].Default - index;
                    if (Fell.feelArray[i].Hqx < -50) {
                        Fell.feelArray[i].Hqx = -50
                    }
                    if (Fell.feelArray[i].Aqx < -50) {
                        Fell.feelArray[i].Aqx = -50
                    }
                    if (Fell.feelArray[i].Sqx < -50) {
                        Fell.feelArray[i].Sqx = -50
                    }
                    if (Fell.feelArray[i].Saqx < -50) {
                        Fell.feelArray[i].Saqx = -50
                    }
                    if (Fell.feelArray[i].Suqx < -50) {
                        Fell.feelArray[i].SUqx = -50
                    }
                    if (Fell.feelArray[i].Default < -50) {
                        Fell.feelArray[i].Default = -50
                    }
                }
            }
        }
    }
    /**
    * ?      Hqx     Aqx     Sqx    Saqx    Suqx
    *@description Todo:"Happy" "Angry" "Scared" "Sad" "Suspect"
    */
    async Aqx(index: number, User: string) {
        for (let i = 0; i < Fell.feelArray.length; i++) {
            if (Fell.feelArray[i].User == User) {
                if (100 >= Fell.feelArray[i].Aqx) {
                    Fell.feelArray[i].Aqx = Fell.feelArray[i].Aqx + index;
                    Fell.feelArray[i].Hqx = Fell.feelArray[i].Hqx - index;
                    Fell.feelArray[i].Default = Fell.feelArray[i].Default - index;
                    if (Fell.feelArray[i].Hqx < -50) {
                        Fell.feelArray[i].Hqx = -50
                    }
                    if (Fell.feelArray[i].Aqx < -50) {
                        Fell.feelArray[i].Aqx = -50
                    }
                    if (Fell.feelArray[i].Sqx < -50) {
                        Fell.feelArray[i].Sqx = -50
                    }
                    if (Fell.feelArray[i].Saqx < -50) {
                        Fell.feelArray[i].Saqx = -50
                    }
                    if (Fell.feelArray[i].Suqx < -50) {
                        Fell.feelArray[i].SUqx = -50
                    }
                    if (Fell.feelArray[i].Default < -50) {
                        Fell.feelArray[i].Default = -50
                    }
                }
            }
        }
    }
    /**
    * ?      Hqx     Aqx     Sqx    Saqx    Suqx
    *@description Todo:"Happy" "Angry" "Scared" "Sad" "Suspect"
    */
    async Sqx(index: number, User: string) {
        for (let i = 0; i < Fell.feelArray.length; i++) {
            if (Fell.feelArray[i].User == User) {
                if (100 >= Fell.feelArray[i].Sqx) {
                    Fell.feelArray[i].Hqx = Fell.feelArray[i].Hqx - index;
                    Fell.feelArray[i].Sqx = Fell.feelArray[i].Sqx + index;
                    Fell.feelArray[i].Default = Fell.feelArray[i].Default - index;
                    if (Fell.feelArray[i].Hqx < -50) {
                        Fell.feelArray[i].Hqx = -50
                    }
                    if (Fell.feelArray[i].Aqx < -50) {
                        Fell.feelArray[i].Aqx = -50
                    }
                    if (Fell.feelArray[i].Sqx < -50) {
                        Fell.feelArray[i].Sqx = -50
                    }
                    if (Fell.feelArray[i].Saqx < -50) {
                        Fell.feelArray[i].Saqx = -50
                    }
                    if (Fell.feelArray[i].Suqx < -50) {
                        Fell.feelArray[i].SUqx = -50
                    }
                    if (Fell.feelArray[i].Default < -50) {
                        Fell.feelArray[i].Default = -50
                    }
                }
            }
        }
    }
    /**
    * ?      Hqx     Aqx     Sqx    Saqx    Suqx
    *@description Todo:"Happy" "Angry" "Scared" "Sad" "Suspect"
    */
    async Saqx(index: number, User: string) {
        for (let i = 0; i < Fell.feelArray.length; i++) {
            if (Fell.feelArray[i].User == User) {
                if (100 >= Fell.feelArray[i].Saqx) {
                    Fell.feelArray[i].Hqx = Fell.feelArray[i].Hqx - index;
                    Fell.feelArray[i].Saqx = Fell.feelArray[i].Saqx + index;
                    Fell.feelArray[i].Default = Fell.feelArray[i].Default - index;
                    if (Fell.feelArray[i].Hqx < -50) {
                        Fell.feelArray[i].Hqx = -50
                    }
                    if (Fell.feelArray[i].Aqx < -50) {
                        Fell.feelArray[i].Aqx = -50
                    }
                    if (Fell.feelArray[i].Sqx < -50) {
                        Fell.feelArray[i].Sqx = -50
                    }
                    if (Fell.feelArray[i].Saqx < -50) {
                        Fell.feelArray[i].Saqx = -50
                    }
                    if (Fell.feelArray[i].Suqx < -50) {
                        Fell.feelArray[i].SUqx = -50
                    }
                    if (Fell.feelArray[i].Default < -50) {
                        Fell.feelArray[i].Default = -50
                    }
                }
            }
        }
    }
    /**
    * ?      Hqx     Aqx     Sqx    Saqx    Suqx
    *@description Todo:"Happy" "Angry" "Scared" "Sad" "Suspect"
    */
    async Suqx(index: number, User: string) {
        for (let i = 0; i < Fell.feelArray.length; i++) {
            if (Fell.feelArray[i].User == User) {
                if (100 >= Fell.feelArray[i].Suqx) {
                    Fell.feelArray[i].Suqx = Fell.feelArray[i].Suqx + index;
                    Fell.feelArray[i].Sqx = Fell.feelArray[i].Sqx + index / 2;
                    Fell.feelArray[i].Hqx = Fell.feelArray[i].Hqx - index;
                    Fell.feelArray[i].Default = Fell.feelArray[i].Default - index;
                    if (Fell.feelArray[i].Hqx < -50) {
                        Fell.feelArray[i].Hqx = -50
                    }
                    if (Fell.feelArray[i].Aqx < -50) {
                        Fell.feelArray[i].Aqx = -50
                    }
                    if (Fell.feelArray[i].Sqx < -50) {
                        Fell.feelArray[i].Sqx = -50
                    }
                    if (Fell.feelArray[i].Saqx < -50) {
                        Fell.feelArray[i].Saqx = -50
                    }
                    if (Fell.feelArray[i].Suqx < -50) {
                        Fell.feelArray[i].SUqx = -50
                    }
                    if (Fell.feelArray[i].Default < -50) {
                        Fell.feelArray[i].Default = -50
                    }
                }
            }
        }
    }
    async Default(index: number, User: string) {
        for (let i = 0; i < Fell.feelArray.length; i++) {
            if (Fell.feelArray[i].User == User) {
                if (100 >= Fell.feelArray[i].Default) {
                    Fell.feelArray[i].Default = Fell.feelArray[i].Default + index;
                    if (Fell.feelArray[i].Hqx < -50) {
                        Fell.feelArray[i].Hqx = -50
                    }
                    if (Fell.feelArray[i].Aqx < -50) {
                        Fell.feelArray[i].Aqx = -50
                    }
                    if (Fell.feelArray[i].Sqx < -50) {
                        Fell.feelArray[i].Sqx = -50
                    }
                    if (Fell.feelArray[i].Saqx < -50) {
                        Fell.feelArray[i].Saqx = -50
                    }
                    if (Fell.feelArray[i].Suqx < -50) {
                        Fell.feelArray[i].SUqx = -50
                    }
                    if (Fell.feelArray[i].Default < -50) {
                        Fell.feelArray[i].Default = -50
                    }
                }
            }
        }
    }
    async Data(User: string) {
        try {
            let dat;
            for (let i = 0; i < Fell.feelArray.length; i++) {
                if (Fell.feelArray[i].User == User) {
                    dat = Fell.feelArray[i];
                }
            }
            const fdata = { Hqx: dat.Hqx, Aqx: dat.Aqx, Sqx: dat.Sqx, Saqx: dat.Saqx, Suqx: dat.Suqx, Default: dat.Default };
            return fdata;
        }
        catch (err) { return { Hqx: 0, Aqx: 0, Sqx: 0, Saqx: 0, Suqx: 0, Default: 10 } }
    }
    async AllData() {
        let h = 0; let a = 0; let s = 0; let sa = 0; let su = 0; let d = 0;
        for (let i = 0; i < Fell.feelArray.length; i++) {
            h += Fell.feelArray[i].Hqx;
            a += Fell.feelArray[i].Aqx;
            s += Fell.feelArray[i].Sqx;
            sa += Fell.feelArray[i].Saqx;
            su += Fell.feelArray[i].Suqx;
            d += Fell.feelArray[i].Default;
        }
        return {
            Hqx: h / Fell.feelArray.length,
            Aqx: a / Fell.feelArray.length,
            Sqx: s / Fell.feelArray.length,
            Saqx: sa / Fell.feelArray.length,
            Suqx: su / Fell.feelArray.length,
            Default: d / Fell.feelArray.length
        };
    }
}