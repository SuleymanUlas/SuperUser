<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <p align="center"><img src="https://github.com/SuleymanUlas/SuperUser/blob/main/profil/logo.png?raw=true" alt="logo" border="0"></p>
    <p align="center"><strong>SUPER USER AI</strong></p>
    <hr>
    <pre align="center">

```javascript
const AI = new SUPER_USER_AI;
console.log(await AI.AI('How are you'));
```
This project is designed to create unique, context-based responses to user queries using AI. The AI generates personalized answers based on its trained data and can respond to a wide range of user inputs.

Example usage:

```javascript
import { SUPER_USER_AI } from "s.u.a.i";
const AI = new SUPER_USER_AI;
console.log(await AI.AI('My name is john! How are you')); 
```
Note:
English parameters and questions only.

The core functionality includes:

- **Training**: The system trains the AI based on user input and predefined responses, storing these in memory files.
- **Data Removal**: It allows for the removal of specific training data based on query parameters.
- **Batch Training**: The system can process and train the AI using bulk data, handling different types of responses (positive, adversarial, random).
- **Updating Files**: The system can fetch and update essential project files from a GitHub repository.

The code is structured to efficiently manage training data and ensure the AI continuously learns and improves.

Example usage of the Train class:

```javascript
import { SUPER_USER_AI } from "s.u.a.i";
const trainInstance = new SUPER_USER_AI;

// Example 1: Training the AI with a query and response
const result = await trainInstance.Train('How are you?', 'I am fine!', 'Happy');
/** 
 * functions,data and usage example 
 * Please read the note at the bottom.
 * @example await trainInstance.Train('what is a', 'I found match .:functions:. ::<userdata>::', 'Happy');
 * Useable function
 * .:search:. 
 * @description In-depth research from Google and summarized data for the question
 * .:weather:.
 * @description It gives location information of the user or weather data of the place mentioned in the sentence.
 * .:file:.
 * @description Returns the requested file links
 * .:summarize:.
 * @description summarize sentences
 * .:time:.
 * Returns the time data
 * ::<userdata>::
 * @description usable data 
 * @example const knownParams=["name","age","job","location","hobby","email","gender","education","phone","socialMedia","maritalStatus","languages","skills","favoriteFood","travelExperience","pets","goals","favoriteColor","diet","music","fitness"];
 **/
console.log(result); // Output: 'Trained!'

// Example 2: Removing a specific query's data from memory
const removalResult = await trainInstance.Remove('How are you?');
console.log(removalResult); // Output: 'OK!'

// Example 4: Performing batch training with data from a JSON file
await trainInstance.ALLTRAIN('memoryFile.json');
```

Example usage of the Update function:

```javascript
import { SUPER_USER_AI } from "s.u.a.i";
// Assuming Code_Edit_Used class is in the same directory
const codeEditor = new SUPER_USER_AI;

// Example: Updating files from the GitHub repository
await codeEditor.Update(); 
// This will fetch and update the listed files from GitHub
```
Other Functions

```javascript
import { SUPER_USER_AI } from "s.u.a.i";
const getData = new SUPER_USER_AI;
await getData.readData(username); //return example User name
//or...
await getData.writeData('username', 'john');//username => john
```
Note 
When getting data from the internet, you may need a search engine id with Google Search API. Write these values ​​with writeData.
```javascript
import { SUPER_USER_AI } from "s.u.a.i";
const getData = new SUPER_USER_AI;
await getData.writeData('apikey', 'apikey');
await getData.writeData('searchengineid', 'id');
```
The **`Update`** function is responsible for fetching the latest versions of project files from a GitHub repository and saving them locally. Here's a breakdown:

1. It defines a list of files to update.
2. For each file, it fetches the data from the GitHub repository using the `fetchFileFromGitHub` function.
3. If the file is successfully fetched, it writes the updated content to the local file system.
4. After all files are updated, it triggers a restart of the system with a short delay.

In this example:
- **`filelist`** contains a list of files that need to be updated from the GitHub repository.
- **`fetchFileFromGitHub`** is called to retrieve the latest content for each file.
- If the file is successfully fetched, it's written to the local system using `fsp.writeFile`.
- If all files are updated successfully, the system is restarted after a delay.
<a href="https://discord.gg/Yat4Nmgn">
    <img src="https://static.cdnlogo.com/logos/d/64/discord.png" width="10%" style="border: none; outline: none;">
</a>
</pre>
</body> </html> 

