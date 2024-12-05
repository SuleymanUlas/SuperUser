import { SUPER_USER_AI } from "s.u.a.i";
import inquirer from "inquirer";
const AI = new SUPER_USER_AI;
const query = async function Query() {
const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'question',
      message: 'Question:'
    },
  ]);
  const AllData = await AI.AI(await answers.question);
  console.log(`\x1b[92m${(JSON.stringify(AllData, null, 2).replaceAll(/\n\n/g, '\n'))}\x1b[0m`);
  /*** @example For example ***/
  console.log(`\x1b[93m${AllData.AI}\x1b[0m`);
  await query(); 
};await query();
