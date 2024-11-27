import { SUPER_USER_AI } from "s.u.a.i";
import inquirer from "inquirer";
const AI = new SUPER_USER_AI;
const query = async function Query() {
const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'question',
      message: 'Question:',
    },
  ]);
  console.log(`\x1b[92m${await AI.AI(await answers.question)}\x1b[0m`);
  await query(); 
};await query();
 