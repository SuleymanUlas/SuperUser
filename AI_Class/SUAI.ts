import nerdamer from 'nerdamer/all.js';

interface complex{
    real:number,
    imag:number
}

export class SUAI {
    async EvalSU(query:string) {
        function keepOnlySpecificLetter(inputString:string, letterToKeep:string) {
            const letterToKeepLower = letterToKeep.toLowerCase();
            let result = '';
            for (let i = 0; i < inputString.length; i++) {
                let char = inputString[i];
                if (/[a-zA-Z]/.test(char)) {
                    if (char.toLowerCase() === letterToKeepLower) {
                        result += char;
                    }
                } else {
                    result += char;
                }
            }
            return result;
        }
        let math = {
            abs: (x:number) => Math.abs(x),
            add: (x:number, y:number) => x + y,
            subtract: (x:number, y:number) => x - y,
            multiply: (x:number, y:number) => x * y,
            divide: (x:number, y:number) => x / y,
            sqrt: (x:number) => Math.sqrt(x),
            pow: (x:number, y:number) => Math.pow(x, y),
            mod: (x:number, y:number) => x % y,
            log: (x:number) => Math.log(x),
            exp: (x:number) => Math.exp(x),
            factorial: (x:number) => {
                if (x === 0 || x === 1) return 1;
                let result = 1;
                for (let i = 2; i <= x; i++) {
                    result *= i;
                }
                return result;
            },
            max: (arr:number[]) => Math.max(...arr),
            min: (arr:number[]) => Math.min(...arr),
            mean: (arr:number[]) => arr.reduce((a:number, b:number) => a + b, 0) / arr.length,
            gcd: (a:number, b:number) => {
                while (b) {
                    let temp = b;
                    b = a % b;
                    a = temp;
                }
                return a;
            },
            lcm: (a:number, b:number) => (a * b) / math.gcd(a, b),
            transpose: (matrix:number[][]) => matrix[0].map((_:number, colIndex:number) => matrix.map((row:number[]) => row[colIndex])),
            inverse: (matrix:number[][]) => {
                let n = matrix.length;
                let m = matrix[0].length;
                if (n !== m) return null;
                let augmented = matrix.map((row, i) => [...row, ...Array(n).fill(i === n - 1 ? 1 : 0)]);

                for (let i = 0; i < n; i++) {
                    let pivot = augmented[i][i];
                    if (pivot === 0) return null;
                    for (let j = 0; j < 2 * n; j++) augmented[i][j] /= pivot;
                    for (let j = 0; j < n; j++) {
                        if (j === i) continue;
                        let ratio = augmented[j][i];
                        for (let k = 0; k < 2 * n; k++) augmented[j][k] -= ratio * augmented[i][k];
                    }
                }
                return augmented.map(row => row.slice(n));
            },
            determinant: (matrix:number[][]) => {
                let n = matrix.length;
                if (n === 1) return matrix[0][0];
                if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

                let det = 0;
                for (let i = 0; i < n; i++) {
                    let subMatrix = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
                    det += Math.pow(-1, i) * matrix[0][i] * math.determinant(subMatrix);
                }
                return det;
            },
            rank: (matrix:number[][]) => {
                let n = matrix.length;
                let m = matrix[0].length;
                let augmented = matrix.map(row => row.slice());

                let rank = 0;
                for (let i = 0; i < n; i++) {
                    if (augmented[i][i] !== 0) {
                        rank++;
                    }
                }
                return rank;
            },
            sin: (x:number) => Math.sin(x),
            cos: (x:number) => Math.cos(x),
            tan: (x:number) => Math.tan(x),
            asin: (x:number) => Math.asin(x),
            acos: (x:number) => Math.acos(x),
            atan: (x:number) => Math.atan(x),
            derivative: (f:any, x:number, h:number = 1e-5) => (f(x + h) - f(x - h)) / (2 * h),
            integral: (f:any, a:number, b:number, n = 1000) => {
                let h = (b - a) / n;
                let sum = 0;
                for (let i = 0; i < n; i++) {
                    let x0 = a + i * h;
                    let x1 = a + (i + 1) * h;
                    sum += 0.5 * h * (f(x0) + f(x1));
                }
                return sum;
            },
            solve: (b:string) => { 
                try { 
                const solution = nerdamer(keepOnlySpecificLetter(query.replace('solve', ''), b)).solveFor(b); 
                return solution.toString(); 
            } catch { 
                return 'nfe' } 
        },
            solveSystem: (A:number[][], b:number[]) => {
                let inverseA = math.inverse(A);
                if (!inverseA) throw new Error('Matrix A is not invertible');
                return inverseA.map(row => row.reduce((sum, val, i) => sum + val * b[i], 0));
            },
            polynomial: (coeffs:number[], x:number) => coeffs.reduce((sum, coeff, i) => sum + coeff * Math.pow(x, i), 0),
            parabola: (a:number, b:number, c:number) => {
                let vertexX = -b / (2 * a);
                let vertexY = a * Math.pow(vertexX, 2) + b * vertexX + c;
                return `Vertex: (${vertexX}, ${vertexY})`;
            },
            binomial: (n:number, k:number) => math.factorial(n) / (math.factorial(k) * math.factorial(n - k)),
            normalDistribution: (x:number, mean:number, stdDev:number) => {
                let exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
                return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
            },
            complexAdd: (a:complex, b:complex) => ({ real: a.real + b.real, imag: a.imag + b.imag }),
            complexMultiply: (a:complex, b:complex) => ({
                real: a.real * b.real - a.imag * b.imag,
                imag: a.real * b.imag + a.imag * b.real
            }),
            complexConjugate: (a:complex) => ({ real: a.real, imag: -a.imag }),
            complexMagnitude: (a:complex) => Math.sqrt(a.real * a.real + a.imag * a.imag)
        };
        let queryfixed = '';
        const operatorRegex = /(plus|minus|multiply|divide|sqrt|power|mod|log|exp|factorial|max|min|gcd|lcm|transpose|inverse|determinant|rank|derivative|integral|solve|solveSystem|polynomial|parabola|sin|cos|tan|asin|acos|atan|log10|log2|floor|ceil|round|random|matrix|binomial|normalDistribution|complexAdd|complexMultiply|complexConjugate|complexMagnitude)/g;
        function solveMathExpression(sentence:string) {
            queryfixed = sentence;
            let words = sentence.toLowerCase().split(/\s+/);
            const numberRegex = /\b\d+(\.\d+)?\b/g;
            let result = 0;
            let numbers = words.filter(word => numberRegex.test(word)).map(word => parseFloat(word));
            let operators = words.filter(word => operatorRegex.test(word));
            if (numbers.length === 0) { return '' }
            result = numbers[0]; 
            let currentResult:any = result;
            for (let i = 1; i < numbers.length; i++) {
                let operator = operators[i - 1];
                let number = numbers[i];
                try {
                    switch (operator) {
                        case 'plus':
                            currentResult = math.add(currentResult, number);
                            break;
                        case 'minus':
                            currentResult = math.subtract(currentResult, number);
                            break;
                        case 'multiply':
                            currentResult = math.multiply(currentResult, number);
                            break;
                        case 'divide':
                            if (number === 0) {
                                throw new Error('Division by zero');
                            }
                            currentResult = math.divide(currentResult, number);
                            break;
                        case 'sqrt':
                            currentResult = math.sqrt(currentResult);
                            break;
                        case 'power':
                            currentResult = math.pow(currentResult, number);
                            break;
                        case 'mod':
                            currentResult = math.mod(currentResult, number);
                            break;
                        case 'log':
                            currentResult = math.log(currentResult);
                            break;
                        case 'exp':
                            currentResult = math.exp(currentResult);
                            break;
                        case 'factorial':
                            if (Number.isInteger(currentResult) && currentResult >= 0) {
                                currentResult = math.factorial(currentResult);
                            } else {
                                throw new Error('Factorial requires a non-negative integer');
                            }
                            break;
                        case 'sin':
                            currentResult = math.sin(currentResult);
                            break;
                        case 'cos':
                            currentResult = math.cos(currentResult);
                            break;
                        case 'tan':
                            currentResult = math.tan(currentResult);
                            break;
                        case 'asin':
                            currentResult = math.asin(currentResult);
                            break;
                        case 'acos':
                            currentResult = math.acos(currentResult);
                            break;
                        case 'atan':
                            currentResult = math.atan(currentResult);
                            break;
                        case 'derivative':
                            currentResult = math.derivative((x:number) => math.polynomial([1, 2, 3], x), currentResult);
                            break;
                        case 'integral':
                            currentResult = math.integral((x:number) => math.polynomial([1, 2, 3], x), 0, currentResult);
                            break;
                        case 'solve':
                            const alphabetLower:string[] = [
                                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                                'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                                'u', 'v', 'w', 'x', 'y', 'z'
                            ];
                            let solved = []
                            for (let a = 0; a < alphabetLower.length; a++) {
                                if (math.solve(alphabetLower[a]) !== 'nfe') {
                                    solved.push(alphabetLower[a] + ':' + math.solve(alphabetLower[a]));
                                }
                            }
                            currentResult = solved.toString();
                            break;
                        case 'solveSystem':
                            currentResult = math.solveSystem(currentResult, numbers.slice(i + 1));
                            break;
                        case 'polynomial':
                            currentResult = math.polynomial([1, 2, 3], currentResult);
                            break;
                        case 'parabola':
                            currentResult = math.parabola(number, numbers[i + 1], numbers[i + 2]);
                            break;
                        case 'binomial':
                            currentResult = math.binomial(number, numbers[i + 1]);
                            break;
                        case 'normaldistribution':
                            currentResult = math.normalDistribution(number, numbers[i + 1], numbers[i + 2]);
                            break;
                        case 'complexadd':
                            currentResult = math.complexAdd(currentResult, { real: number, imag: 0 });
                            break;
                        case 'complexmultiply':
                            currentResult = math.complexMultiply(currentResult, { real: number, imag: 0 });
                            break;
                        case 'complexconjugate':
                            currentResult = math.complexConjugate(currentResult);
                            break;
                        case 'complexmagnitude':
                            currentResult = math.complexMagnitude(currentResult);
                            break;
                        case 'floor':
                            currentResult = Math.floor(currentResult);
                            break;
                        case 'ceil':
                            currentResult = Math.ceil(currentResult);
                            break;
                        case 'round':
                            currentResult = Math.round(currentResult);
                            break;
                        case 'random':
                            currentResult = Math.random();
                            break;
                        default:
                            throw new Error(`Unsupported operator: ${operator}`);
                    }
                } catch (error) {
                    return `Error: ${(error as Error).message}`;
                }
            }
            return ' ' + currentResult.toString();
        }
        let result = solveMathExpression(query.replaceAll("!", " factorial").replaceAll("+", " plus").replaceAll("-", " minus").replaceAll("*", " multiply").replaceAll("/", " divide").replaceAll("%", " mod").replaceAll("^", " power"));
        if (operatorRegex.test(queryfixed)) { return result.toString() }
        else { return '' }
    }
}