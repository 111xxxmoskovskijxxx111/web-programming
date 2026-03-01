const persons = [
    { name: "John", age: 23, city: "Boston" },
    { name: "Anna", age: 19, city: "Chicago" },
    { name: "Mike", age: 30, city: "New York" },
    { name: "Sara", age: 21, city: "Miami" },
    { name: "Tom", age: 18, city: "Dallas" }
  ];
  
persons.groupName = "A";
persons.teacher = "Joan Doe";
persons.year = "2023";
  
  // цикл for
for (let i = 0; i < persons.length; i++) {
    console.log(persons[i]);
  }
  
  // for...of
for (const person of persons) {
    console.log(person.name, person.age, person.city);
  }
  
  // властивості масиву
for (const key in persons) {
    if (isNaN(key)) {
      console.log(key + ":", persons[key]);
    }
  }

const defaults = {
    mode: "test",
    debugLevel: "error",
    logFolder: "root"
  };
  
const userSetting = {
    mode: "production",
    debugLevel: "trace"
  };
  
  // Спосіб 1
const result1 = Object.assign({}, defaults, userSetting);
console.log(result1);
  
  // Спосіб 2
const result2 = { ...defaults, ...userSetting };
console.log(result2);
  
  // Спосіб 3
function mergeObjects(a, b) {
    const result = {};
    for (const key in a) result[key] = a[key];
    for (const key in b) result[key] = b[key];
    return result;
  }
console.log(mergeObjects(defaults, userSetting));

Object.defineProperty(persons[0], "birthYear", {
    get() {
      return new Date().getFullYear() - this.age;
    }
  });
  
console.log(persons[0].birthYear);

const arr1 = [1, 2];
const arr2 = [3, 4];

console.log(arr1.concat(arr2));
console.log([...arr1, ...arr2]);

const textArray = persons.map(p =>
    `${p.name} from ${p.city} born in ${new Date().getFullYear() - p.age}`
  );
  
console.log(textArray);
  
const adults = persons.filter(p => p.age > 20);
console.log(adults);


const { name, city } = persons[0];
console.log(name, city);
  
const [firstPerson] = persons;
console.log(firstPerson);


function getUserData(userName) {
    const user = persons.find(p => p.name === userName);
    if (!user) {
      throw new Error("Unable to find user");
    }
    return user;
  }
  
function showUserInfo(name) {
    console.log("Loading");
    try {
      const user = getUserData(name);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    } finally {
      console.log("Loading finished");
    }
  }
  
showUserInfo("John");
showUserInfo("Unknown");


function textToLetters(text) {
    return text.split("");
  }
  
console.log(textToLetters("hello"));


function reverseWord(word) {
    return word.split("").reverse().join("");
  }
  
console.log(reverseWord("hello"));


function isJsFile(fileName) {
    return fileName.endsWith(".js");
  }
  
console.log(isJsFile("script.js"));
console.log(isJsFile("style.css"));


function sentenceToWords(sentence) {
    return sentence.split(" ");
  }
  
console.log(sentenceToWords("JavaScript is awesome"));


function replaceWord(text, oldWord, newWord) {
    return text.replace(oldWord, newWord);
  }
  
console.log(replaceWord("I like JavaScript", "JavaScript", "Node.js"));