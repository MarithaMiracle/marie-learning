import type { ModuleSeed } from "../../src/lib/content-types";

function c(text: string) {
  return "`" + text + "`";
}

function fence(language: string, code: string) {
  return "```" + language + "\n" + code.trim() + "\n```";
}

const recordsCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Student records</title>
</head>
<body>
  <h1>Student records</h1>
  <script>
    const students = [
      { name: "Amina", score: 88 },
      { name: "Leo", score: 72 },
      { name: "Priya", score: 95 }
    ];

    console.log(students.length);
    console.log(students[0].name);
    students[1].score = 76;
    students.push({ name: "Sam", score: 81 });

    for (let index = 0; index < students.length; index++) {
      const student = students[index];
      console.log(student.name + ": " + student.score);
    }
  </script>
</body>
</html>`;

const tasksCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Task list</title>
</head>
<body>
  <h1>Task list</h1>
  <script>
    const tasks = [
      { title: "Buy milk", done: false },
      { title: "Email tutor", done: true },
      { title: "Read chapter 4", done: false }
    ];

    const titles = tasks.map(function (task) {
      return task.title;
    });

    const stillOpen = tasks.filter(function (task) {
      return task.done === false;
    });

    const email = tasks.find(function (task) {
      return task.title === "Email tutor";
    });

    console.log(titles);
    console.log(stillOpen.length);
    console.log(email.done);

    const ranked = tasks.slice().sort(function (left, right) {
      if (left.title < right.title) {
        return -1;
      }
      if (left.title > right.title) {
        return 1;
      }
      return 0;
    });
    console.log(ranked[0].title);
  </script>
</body>
</html>`;

export const week08: ModuleSeed = {
  slug: "week-08-collections",
  number: 8,
  weekNumber: 8,
  monthLabel: "Month 2 — CSS layout, JavaScript and problem solving",
  title: "Arrays, objects, and problem solving",
  description:
    "This week one name can hold many values. An array is an ordered list. An object groups fields that belong together, such as a student's name and score. You then use list methods, a written plan, and careful reading of errors to manage a shopping list or a small set of scores.",
  lessons: [
    {
      slug: "arrays-and-objects",
      sessionNumber: 15,
      title: "Arrays and objects",
      estimatedMinutes: 90,
      difficulty: "Guided practice",
      requiresOs: true,
      content: {
        overview: {
          about:
            "This lesson stores groups of values. An array is a list in order, with a length and indexes that start at zero. An object groups named properties, such as a name and a score. You will read items, change them, add them, and remove them, then keep an array of student objects. The practice is a small student-records program.",
          why:
            "Separate consts collapse once you have more than a few students or shopping items. A list under one name can grow, and a loop you already know can walk it.",
          alreadyKnow:
            "You can write a for loop, declare a function, and return a value. You can store a number or a string in a const.",
        },
        objectives: [
          "Create an array, read it with an index, and use length to know how many items it holds.",
          "Change an item, add one with push, and remove the last one with pop.",
          "Create an object with properties and read or update those properties by name.",
          "Store objects inside an array and reach one field with an index and a property name.",
          "Walk a student list with a for loop and log each name and score.",
        ],
        prerequisites: [
          {
            label:
              "You can write a for loop that stops, and you can call a function with arguments and use its return value.",
            lessonSlug: "loops-and-functions",
          },
        ],
        teachingNotes: [
          {
            heading: "What an array is",
            markdown: [
              `An array is an ordered list stored under one name. The order matters. The first item stays first until you move it. A paper shopping list is the picture: milk on the first line, bread on the second, apples on the third. You can point to a line. You can count the lines. You can replace bread with rolls without rewriting the whole page. An array gives a script that same list.`,
              `You write an array with square brackets. Items are separated by commas. A trailing comma after the last item is allowed and often helps when you add another line later. Strings stay in quotes. Numbers do not.`,
              fence(
                "js",
                `
const scores = [72, 88, 64];
console.log(scores);
`,
              ),
              `${c("scores")} is one const. It holds three numbers. Logging the name shows the whole list, which is a useful check before you touch a single item. The list is still ordered. 72 is first, 88 is second, 64 is third. If you need those three numbers to stay in that order for a reason, an array remembers the reason. Three separate consts also remember them, but only if you invent three names and then a fourth when a new student arrives. The array can grow without a new variable name.`,
              `An empty array is ${c("[]")}. It is a real list with nothing in it yet, not a missing variable. You will start some programs with an empty list and push items in. Do not confuse it with null. null means you chose no list at all. An empty array means the list exists and its length is zero.`,
              `:::example A numbered shopping slip
Line 1 is milk, line 2 is bread, line 3 is apples. The slip has a length of three. Replacing line 2 does not change the length. Adding a fourth line does. An array is that slip, with the awkward detail that the first line is numbered 0 in JavaScript.
:::`,
            ].join("\n\n"),
          },
          {
            heading: "Indexes and length",
            markdown: [
              `An index is the position of an item. Indexes start at 0, not 1. The first item is ${c("scores[0]")}. The second is ${c("scores[1]")}. The third is ${c("scores[2]")}. The square brackets are how you read or write one slot. ${c("scores.length")} is 3. The last index is ${c("length - 1")}, which is 2, not 3. Asking for ${c("scores[3]")} on a three-item list gives ${c("undefined")}. There is no fourth item. The language does not throw an error for a missing index. It hands back undefined, and a later line may fail when it tries to use that undefined as a student or a number.`,
              fence(
                "js",
                `
const scores = [72, 88, 64];
console.log(scores[0]);
console.log(scores.length);
console.log(scores[scores.length - 1]);
`,
              ),
              `That last log is 64, the final score, without you hard-coding the index 2. When the list grows, length - 1 still means the last item. Hard-coding 2 will quietly become the wrong slot. Prefer length when you mean "how many" or "the end."`,
              `A for loop walks every index. You already know the shape. The condition uses length, and the start is 0, because that is the first index.`,
              fence(
                "js",
                `
for (let index = 0; index < scores.length; index++) {
  console.log(scores[index]);
}
`,
              ),
              `Use ${c("index < scores.length")}, not ${c("index <= scores.length")}. If length is 3, the valid indexes are 0, 1, and 2. The test ${c("index <= 3")} or ${c("index <= scores.length")} steps one past the end and logs undefined. This is the same off-by-one idea as last week, now tied to a list. Say it aloud: start at zero, continue while the index is less than the length, then add 1.`,
              `:::misunderstanding The first item is index 1
People count from 1 in everyday life. Arrays in JavaScript count from 0. scores[1] is the second score. If a log shows the wrong student, subtract one from the position you were thinking of before you change the data.
:::`,
              `length is not a method. You do not write ${c("scores.length()")}. The parentheses would try to call a function. length is a property that the array keeps up to date when you add or remove items. Read it. Do not assign a smaller length unless you mean to cut the list, which is a sharp tool we will not use this week.`,
            ].join("\n\n"),
          },
          {
            heading: "Changing, adding, and removing items",
            markdown: [
              `Assignment changes one slot. ${c("scores[1] = 90")} replaces 88 with 90. The length stays 3. You are editing a line, not adding a line. The index must already exist, or you will create a hole. ${c("scores[5] = 10")} on a three-item list makes length 6 and leaves empty slots in between. Avoid that. Change indexes you know are in range, or add with a method that grows the list cleanly.`,
              `${c("push")} adds an item at the end. ${c("scores.push(77)")} makes the list one longer, and the new item's index is the new length minus 1. push returns the new length, not the item you added. If you write ${c("const added = scores.push(77)")} and expect added to be 77, you will be surprised. added is the length. Log the array, or log ${c("scores[scores.length - 1]")}, when you want to see the item.`,
              `${c("pop")} removes the last item and returns that item. The length shrinks by one. ${c("shift")} removes the first item and slides the others down, so every later index changes. ${c("unshift")} adds at the front and also changes later indexes. For a shopping list, push and pop match "add to the bottom" and "cross off the last line." shift and unshift match "deal with the top line." Prefer the end of the list unless the problem really is about the front. Moving every index is harder to trace.`,
              fence(
                "js",
                `
const items = ["milk", "bread"];
items.push("apples");
const removed = items.pop();
console.log(removed);
console.log(items);
`,
              ),
              `removed is apples. The list is milk, bread again. pop both changes the array and hands you the removed value. If you pop and do not store the return, the item is gone. That can be what you want. It can also be how a list loses a line you meant to inspect. Log before you pop when you are unsure.`,
              `:::warning push gives you the length
const last = items.push("tea") stores a number, the new length, in last. It does not store "tea". If a later line treats last as text, you stored the wrong kind of value. Look at the array itself.
:::`,
              `Arrays declared with const can still be changed. const stops you from assigning a brand-new array to the same name. It does not freeze the slots. ${c("items.push(\"tea\")")} is allowed. ${c("items = []")} is not, if items is const. That is the same const rule as last week, applied to a list: the label stays on this jar, and the contents of the jar can be updated.`,
            ].join("\n\n"),
          },
          {
            heading: "Objects, properties, and values",
            markdown: [
              `An object groups values that belong to one thing. A student is not just a score, and not just a name. An object holds both, each under a property name. You write it with braces, and each property is a name, a colon, and a value.`,
              fence(
                "js",
                `
const student = {
  name: "Amina",
  score: 88
};
console.log(student.name);
console.log(student["score"]);
`,
              ),
              `${c("student.name")} is dot notation. Use it when the property name is a plain word you know while you are writing. ${c('student["score"]')} is bracket notation. The quotes make score a string key. Bracket notation is useful when the key is in a variable. For this week, dot notation is the one to reach for. Both read the same property.`,
              `A property and a variable are different. ${c("name")} alone looks for a variable. ${c("student.name")} looks inside the object. A ReferenceError on name often means the dot was left off. A result of undefined often means the object exists but the property is spelled differently. ${c("student.Score")} is not ${c("student.score")}. Capital letters matter, as they did with console.log.`,
              `You can change a property: ${c("student.score = 91")}. You can add one that was not in the original braces: ${c("student.group = \"Tuesday\"")}. Adding fields ad hoc is easy to lose track of. Decide the shape first. For a student record this week, use name and score, and use the same spelling for every student. Inconsistent keys, score on one and points on another, make the next lesson's filters miss people.`,
              `:::misunderstanding The object is a list because it has several values
An object is not ordered like an array. You ask for a property by name, not by position zero. If the data is a sequence you count through, use an array. If the data is one thing with named parts, use an object. A class of students is an array of objects: a list, and each item has parts.
:::`,
            ].join("\n\n"),
          },
          {
            heading: "An array of objects",
            markdown: [
              `Real records combine the two ideas. The array is the class or the shopping basket. Each item is an object. You reach a field in two steps: index, then property.`,
              fence(
                "js",
                `
const students = [
  { name: "Amina", score: 88 },
  { name: "Leo", score: 72 }
];
console.log(students[0].name);
console.log(students[1].score);
`,
              ),
              `Read ${c("students[0].name")} from left to right. students is the list. [0] is the first object. .name is that object's name property. The log is Amina. ${c("students[1].score")} is 72. If you swap the steps and write ${c("students.name[0]")}, you ask an array for a name property it does not have. That is undefined, and then [0] on undefined throws a TypeError. The order of the dots and brackets is the meaning.`,
              `A loop uses the same two steps with a changing index.`,
              fence(
                "js",
                `
for (let index = 0; index < students.length; index++) {
  const student = students[index];
  console.log(student.name + ": " + student.score);
}
`,
              ),
              `Copying the object into ${c("student")} for the body is a kindness. You do not repeat ${c("students[index]")} on every line, and you can log student alone if something looks wrong. The loop condition stays ${c("index < students.length")}. When you push a new student before the loop, length includes them. When you push inside the loop without a plan, length grows while you walk, and the loop may never end. Add items before the loop this week, or after it. Do not push into the same array you are walking unless you have a reason you can explain.`,
              `Changing one record is an assignment to a property: ${c("students[1].score = 76")}. Leo's score changes. Amina's object is a different object. Arrays of objects do not clone a change across the list. If every score changed, you were assigning to the wrong thing, perhaps a single student object you reused when you meant to write two separate objects. Write each object as its own brace block in the array.`,
              `The practice program is small on purpose. Three or four students, a loop that prints name and score, one updated score, and one pushed record. Check the count with length before and after the push. That is a complete student-records exercise. You do not need a database, and you do not need to draw the list on the page yet. The console is still the output.`,
            ].join("\n\n"),
          },
          {
            heading: "A student records program",
            markdown: [
              `Build the program in a saved file, learning/week-08/students.html. Start with an array of three objects. Each object has name and score. Log length and the first student's name before any edits, so you have a before picture. Then change the second student's score. Push a fourth student. Loop and print every name and score. The after picture should show four lines and the edited score.`,
              `Keep a function if it helps, because you already know how. ${c("function formatStudent(student)")} can return the string name, colon, score. The loop calls it. The function does not need to know about the array. It only needs one object. That split is the same lesson as lineTotal: the list is the caller's problem, the shape of one record is the function's problem.`,
              `Test the empty case in your mind even if you do not submit it. A loop from 0 while index < 0 never runs. An empty class prints nothing. That is correct, not a broken loop. A missing array is different: logging students.length when students was never declared is a ReferenceError. An empty list and a missing name are different problems. The error text tells them apart.`,
              `When a line says Cannot read properties of undefined, look at the index or the property on the previous idea. Usually students[index] was undefined because the index walked off the end, or you wrote students[0].namme and then something else used that undefined. Log the index. Log the object. Then log the property. One log at a time.`,
              `:::tip Before and after
Log the array once before you push or edit, and once after. The two snapshots are your test. If the after snapshot is missing a student, the edit hit the wrong index or pop ran when you meant push.
:::`,
              `You now have the storage. The next lesson adds methods that build new lists from old ones: who passed, what the names are, which task is still open. Those methods assume you can already point at an index and a property. If students[0].name still feels like a puzzle, stay with the loop until it does not. The methods are shorter typing for ideas you can already describe.`,
            ].join("\n\n"),
          },
        ],
        vocabulary: [
          {
            term: "Array",
            definition:
              "An ordered list under one name, written with square brackets. Items keep their positions until you change the list.",
          },
          {
            term: "Index",
            definition:
              "The position of an item, starting at 0. scores[0] is the first score, and scores[1] is the second.",
          },
          {
            term: "length",
            definition:
              "The number of items in an array. The last index is length - 1. length is a property, not a function call.",
          },
          {
            term: "push",
            definition:
              "An array method that adds an item at the end and returns the new length, not the item itself.",
          },
          {
            term: "Object",
            definition:
              "A value that groups named properties, such as name and score, written with braces and colons.",
          },
          {
            term: "Property",
            definition:
              "A named field on an object. student.name reads the name property. The spelling and capital letters must match.",
          },
        ],
        demonstrations: [
          {
            title: "Build a four-student console roster",
            intro:
              "You will create an array of student objects, read the first name, update one score, push a fourth student, and print every record with a for loop. The JavaScript is the same on every operating system.",
            steps: [
              "Open a terminal for your system and enter learning/week-08, creating the folder if it is not there.",
              "Create learning/week-08/students.html with a heading and a script at the end of the body.",
              "Declare const students as an array of three objects. Each object needs name and score, with scores as numbers.",
              "Log students.length and students[0].name. Confirm the length is 3 and the name is the first object, not the second.",
              "Assign a new number to the second student's score using index 1. Log that student before and after the assignment.",
              "push a fourth object. Log length again. It should be 4. Remember that push returns the length if you store it.",
              "Write a for loop from index 0 while index < students.length, and log each name and score.",
              "Save, open the file, and read the console. If you see undefined, check whether the loop used <= length.",
            ],
            expected:
              "The console shows length 3, the first student's name, the updated second score, length 4, and four name-and-score lines. The last line is the student you pushed. No line says undefined.",
            verify:
              "Count the final lines. Match index 0 to the first object in the source, not the second. The edited score should appear once, on the second line of the roster. length after push should be one more than length before push.",
            ifItFails:
              "If the first log is the second student, you used index 1. If the loop prints an extra undefined, the condition used <=. If you see a TypeError about undefined, the index walked off the array or a property name is misspelled. If push seems to store a student in a const and that const logs a number, you stored the length.",
            os: {
              sameOnAllPlatforms:
                "Array indexes, length, push, and object properties behave the same on Windows, macOS, and Linux. Save and reload the same way. The different steps are how you open the terminal, how you open the HTML file, and how you open the console.",
              identify: [
                "Windows has a Start button and a taskbar. macOS has an Apple menu and a Dock. Many Linux desktops have Activities or a menu named for the distribution.",
                "If you are unsure which shortcut opens the console, use the browser menu. The roster script does not change between systems.",
              ],
              windows: [
                "Open Command Prompt. Run cd learning\\week-08, or mkdir learning\\week-08 and then cd into it.",
                "After saving students.html, run start students.html or open it from File Explorer.",
                "Press F12 or Ctrl+Shift+I, select Console, and reload after the push so you see the final length.",
                "Open Visual Studio Code from the Start menu and use Open Folder on week-08.",
              ],
              macos: [
                "Open Terminal with Command and Space. Run cd learning/week-08 or mkdir -p learning/week-08 first.",
                "Run open students.html, or use Finder's Go to Folder.",
                "Open the console with Command+Option+I or the Develop menu. Reload and count the roster lines.",
                "Open the week-08 folder in Visual Studio Code from Spotlight.",
              ],
              linux: [
                "Open Terminal and cd into learning/week-08, creating it with mkdir -p if needed.",
                "Run xdg-open students.html or open the file from the file manager.",
                "Use F12, Ctrl+Shift+I, or the browser's Developer tools menu, then the Console tab.",
                "Open Visual Studio Code from the application menu on the week-08 folder.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "A class list with one edit and one addition",
            filename: "learning/week-08/students.html",
            language: "html",
            code: recordsCode,
            explanation:
              "students is an array of objects. length starts at 3. Index 0 is Amina, not Leo. Assigning to students[1].score changes Leo only. push adds Sam at the end and length becomes 4. The for loop starts at 0 and stops before length, so it prints four lines and does not read a missing index. The string is built with + so the console shows a readable roster.",
            lineNotes: [
              {
                focus: "index zero",
                note: "students[0].name is Amina. The first object is index 0 even though people might call that row 1 on paper.",
              },
              {
                focus: "property update",
                note: "students[1].score = 76 changes a field inside the second object. It does not replace the whole array.",
              },
              {
                focus: "push",
                note: "push adds Sam at the end. If you stored the return value, you would store 4, the new length.",
              },
              {
                focus: "loop bound",
                note: "index < students.length visits 0, 1, 2, and 3 after the push. index <= length would log undefined once.",
              },
            ],
            expectedOutput:
              "The console shows 3, then Amina, then four lines: Amina: 88, Leo: 76, Priya: 95, and Sam: 81. Leo's score is 76, not the original 72.",
            level: "practical",
          },
        ],
        exercises: [
          {
            title: "Three scores and the last index",
            difficulty: "warm-up",
            prompt:
              "Store three numeric scores in an array. Log the first score, the length, and the last score using length - 1. Then change the middle score and log the whole array.",
            steps: [
              "Create learning/week-08/scores.html with const scores set to three numbers.",
              "Log scores[0], scores.length, and scores[scores.length - 1].",
              "Assign a new number to index 1 and log scores.",
              "Reload and check that length is still 3 and that index 0 did not change.",
            ],
            expectedOutcome:
              "The first log is the first number in the brackets, not the second. The last log uses length - 1 and matches the final number. After the edit, only the middle number is different.",
          },
          {
            title: "A tiny class roster",
            difficulty: "practice",
            prompt:
              "Make an array of three student objects with your own names and scores. Update one score, push one more student, and print each record from a for loop. Do not number the first student as index 1.",
            steps: [
              "Write the array with name and score on every object, spelled the same way.",
              "Log length, then change students[1] or whichever index is the second person.",
              "push one new object and log length again.",
              "Loop while index < students.length and log name and score. Include a before-and-after note in a comment.",
            ],
            expectedOutcome:
              "You can show a length that grew by one, a single changed score, and one console line per student with no undefined line. The first printed name matches the first object in the file.",
          },
        ],
        troubleshooting: [
          {
            problem: "The loop prints an extra line that says undefined.",
            why: "The condition used <= length, or it used <= length - 1 in a way that still steps past the end. The last valid index is length - 1, so the test should be index < length.",
            solution:
              "Change the header to index < students.length and start at 0. Reload. The number of roster lines should equal length. Log the index inside the loop if you are still unsure which pass fails.",
          },
          {
            problem: "TypeError: Cannot read properties of undefined (reading 'name').",
            why: "You asked for .name on a value that is undefined. The index is outside the array, or you wrote something like students.name instead of students[0].name, so the left side was already undefined.",
            solution:
              "Log students[index] before you read .name. If that log is undefined, fix the index. Read left to right: array, then brackets, then the property. Reload after one change.",
          },
          {
            problem: "push seemed to add a number instead of a student.",
            why: "You stored the return value of push. That return value is the new length. The student was added to the array, but the const you created holds a number.",
            solution:
              "Call push on its own line. Log the array, or log the item at length - 1. Do not treat the return value as the object you just wrote.",
          },
          {
            problem: "A property logs undefined even though the object is there.",
            why: "The key spelling does not match. score and Score are different properties. One student may use points while another uses score.",
            solution:
              "Log the whole object. Compare the keys you see with the spelling in the loop. Rename so every record uses the same property names, then reload.",
          },
        ],
        knowledgeChecks: [
          {
            id: "arr-first-index",
            question: "In const scores = [72, 88, 64], which expression is the number 72?",
            format: "Multiple choice",
            options: [
              "scores[0]",
              "scores[1]",
              "scores[3]",
              "scores.length",
            ],
          },
          {
            id: "arr-push-return",
            question: "What does items.push(\"tea\") return, and where is the string tea?",
            format: "Multiple choice",
            options: [
              "It returns the new length. The string tea is now the last item in the array.",
              "It returns the string tea, and the array stays unchanged.",
              "It returns undefined and deletes the first item.",
              "It returns a new object with a property called tea.",
            ],
          },
          {
            id: "obj-two-steps",
            question: "How do you read the name of the first object in an array called students?",
            format: "Short answer",
          },
        ],
        homework: {
          description:
            "Write a lesson response about your student array. Include the length before and after a push, the index you updated, and one mistake you made with 0 or with length.",
          requirements: [
            "Paste the array and say what students[0] contains, in contrast with what a paper list would call row 1.",
            "Give the length before and after push, and quote the console lines from the loop.",
          ],
          deliverables: [
            "A lesson response of about 150 to 250 words.",
            "The path learning/week-08/students.html or your roster file, plus the pasted script.",
          ],
          submission:
            "Submit this as the lesson response for Arrays and objects. The shopping list or score manager is the module assignment after the next session, when list methods are available.",
          criteria: [
            "The response shows a real before-and-after length and a property update at a named index.",
            "The response explains an index or length mistake with the console evidence, or explains a check that prevented one.",
          ],
          submissionKind: "lesson_response",
        },
        summary: [
          "An array is an ordered list. Indexes start at 0. length is the count, and the last index is length - 1.",
          "Assign to an index to replace an item. push adds at the end and returns the new length. pop removes the last item.",
          "An object stores named properties. Dot notation reads them. An array of objects needs an index and then a property name.",
          "A for loop from 0 while index < length visits every item once. Walking off the end logs undefined or throws when you read a property.",
        ],
        nextLesson: {
          title: "Array methods and problem solving",
          why: "You can walk a list yourself. Methods such as filter and map build a new list from a rule, which is how a task list or a score manager stays short and testable.",
          lessonSlug: "array-methods-and-problem-solving",
        },
      },
      guide: {
        sessionNumber: 15,
        week: 8,
        title: "Arrays and objects",
        durationMinutes: 90,
        objectives: [
          "Students read index 0 as the first item and length - 1 as the last.",
          "Students update one object property and push another object.",
          "Students loop with index < length and produce one line per student.",
        ],
        tools: [
          "Browser console",
          "Visual Studio Code",
          "A three-row paper list numbered 0, 1, and 2 on the board",
        ],
        preparation: [
          "Draw three boxes labelled 0, 1, and 2 before class, with names in them, so index 0 is visible from the doorway.",
          "Prepare a loop that uses <= length so the last console line is undefined.",
          "Prepare a push stored in a const so the const logs a number. Keep the array log beside it.",
          "Open the console on the teaching machine and clear extension noise if you can.",
        ],
        flow: [
          {
            minutes: 5,
            title: "A paper roster",
            detail:
              "Hand out or draw a three-line roster. Ask which line is first. Label that line 0, not 1. Say an array is this roster under one variable. Do not open the editor until the room has said zero out loud.",
          },
          {
            minutes: 15,
            title: "Indexes, then objects",
            detail:
              "Create a scores array and log [0], length, and length - 1. Show scores[3] as undefined without a throw. Then build one student object and contrast student.name with a bare name. Assign a new score on the object.",
          },
          {
            minutes: 20,
            title: "Live class list",
            detail:
              "Type three student objects, log students[0].name, change students[1].score, and push a fourth. Log the return value of push and the array so the length-versus-item distinction is visible. Then run a correct for loop and the <= bug.",
          },
          {
            minutes: 30,
            title: "Roster practice",
            detail:
              "Students create students.html with their own three people, one edit, one push, and a loop. Ask each person to point at index 0 in the file and in the console before you look at the loop. The warm-up scores file is only for anyone who is still mixing 0 and 1.",
          },
          {
            minutes: 10,
            title: "Undefined clinic",
            detail:
              "Project one off-by-one loop and one misspelled property. For each, log the object before the property. Fix only the condition or the spelling. Do not introduce filter. Say those methods need today's indexing to make sense.",
          },
          {
            minutes: 10,
            title: "Response and methods preview",
            detail:
              "Ask the knowledge checks. Set the lesson response: index 0, lengths before and after push, and one index mistake or the check that prevented it. Preview map and filter as ways to derive a new list without writing the loop header by hand.",
          },
        ],
        explain: [
          "Order, brackets, and index 0.",
          "length and length - 1, and why <= length walks off the end.",
          "Assigning to a slot versus push and pop.",
          "const on an array still allows push.",
          "Object properties and dot notation.",
          "Index then property on an array of objects.",
        ],
        questions: [
          "If a roster has length 3, what is the index of the last student, and what does students[3] give you?",
          "What does push return, and where should you look to see the object you added?",
          "How would you write the expression for the score of the first student?",
        ],
        demonstration:
          "Build the student array live from an empty file, edit index 1, push a fourth object, and print with a for loop. Show the undefined line from index <= length before you correct it to index < length.",
        practice:
          "Students save a roster of objects, log length before and after push, and print one line per student. They must be able to point to index 0 in both the source and the console.",
        expectedOutcomes: [
          "A four-line roster with one changed score.",
          "Students state that indexes start at 0.",
          "Students can read students[0].name from left to right.",
        ],
        difficulties: [
          {
            issue: "The student insists the first person is index 1 and their logs are shifted.",
            help: "Put the paper list next to the brackets. Cover index 0 with a finger and ask who disappeared. Change the log to [0] and reload once. Do not renumber their data to start at 1. The language will not follow that renumbering.",
          },
          {
            issue: "The loop prints undefined or throws on .name.",
            help: "Look only at the for header. If it says <=, change it to < and reload. If the header is already correct, log students[index] on the failing pass. A misspelled property is the next check, after the object itself prints.",
          },
          {
            issue: "The student thinks const forbids push and copies the whole array to add one person.",
            help: "Show that const blocks items = [] and still allows items.push. Add one object with push and log length. Explain the name still points at the same array. The slots inside it can change.",
          },
        ],
        homework:
          "The lesson response quotes index 0, the two lengths around push, and the loop output. It also names an index or length mistake, or the check that kept the loop inside the array. It is not the module assignment.",
        assessment:
          "Knowledge checks are the index of 72, the return value of push, and the expression for the first student's name. In the room, count console lines against length. A roster that starts with the second student is not finished.",
        recap:
          "Point at box 0 on the board and at the push return value you logged. Tell them the next session keeps this roster and asks questions of it: who passed, what are the names, which record matches a name. Ask them to bring the file.",
        knowledgeCheckAnswers: [
          {
            id: "arr-first-index",
            answer: "scores[0]",
            explanation:
              "Indexes start at 0, so the first number in the brackets is scores[0]. scores[1] is 88. length is 3, not one of the scores.",
          },
          {
            id: "arr-push-return",
            answer: "It returns the new length. The string tea is now the last item in the array.",
            explanation:
              "push changes the array and returns how many items it now holds. To see tea, log the array or the item at length - 1.",
          },
          {
            id: "obj-two-steps",
            answer: "students[0].name, reading the array, then index 0, then the name property.",
            explanation:
              "The first object is index 0. The property comes after that object is selected. students.name looks for a property on the array itself.",
          },
        ],
      },
    },
    {
      slug: "array-methods-and-problem-solving",
      sessionNumber: 16,
      title: "Array methods and problem solving",
      estimatedMinutes: 90,
      difficulty: "Bringing ideas together",
      requiresOs: true,
      content: {
        overview: {
          about:
            "This lesson turns a list into an answer. You will use forEach, map, filter, find, and findIndex, and you will sort with a compare function. You will also break a problem into steps, write those steps in plain language, test a tiny list, and read errors without guessing. The practice is a task list made of objects.",
          why:
            "A roster is storage. A program becomes useful when it can list unfinished tasks, collect names, or find one student. A written plan keeps that logic honest when the first run is wrong.",
          alreadyKnow:
            "You can store an array of objects, read a property with an index, loop with length, and return a value from a function.",
        },
        objectives: [
          "Use forEach to visit every item and map or filter to build a new array.",
          "Use find and findIndex, and explain what they return when nothing matches.",
          "Sort with a compare function and say that sort changes the array you call it on.",
          "Write pseudocode for a small list problem before coding it, then test with two or three items.",
          "Read a TypeError or a wrong length and change one thing before running again.",
        ],
        prerequisites: [
          {
            label:
              "You can create an array of objects, use index 0, update a property, and walk the list with a for loop.",
            lessonSlug: "arrays-and-objects",
          },
        ],
        teachingNotes: [
          {
            heading: "A plan before the methods",
            markdown: [
              `Array methods are short tools. They are not a substitute for knowing what you are asking. Problem solving here means four habits. Break the job into steps. Write those steps in plain language, which we will call pseudocode. Translate one step at a time into JavaScript. Test with a list small enough to check by hand. When something fails, read the error and the values, then change one thing.`,
              `Pseudocode is not a second programming language. It is English with numbered steps, precise enough that a classmate could follow it. For a task list you might write:`,
              `1. Start with three tasks. Each task has a title and a done flag that is true or false.`,
              `2. Make a new list of the titles only.`,
              `3. Make a new list of tasks that are not done.`,
              `4. Find the task whose title is Email tutor and print whether it is done.`,
              `5. Check the counts by hand before trusting the console.`,
              `That plan names the results. It does not yet say map or filter. If you cannot write the plan, a method will only hide the confusion under a shorter line. Write the plan in a comment at the top of the script. Keep it. The comment is part of the assignment evidence that you knew what the code was for.`,
              `:::example Hand check first
Three tasks, two of them not done. After the filter, the new list's length should be 2. If the console says 3, the test inside the filter is wrong or it is backwards. You do not need a larger list to see that. A larger list makes the mistake harder to count.
:::`,
              `Debugging is the same habit when the plan and the console disagree. Read the first red line and the line number in your file. Log the value just before the line that failed. If the log is undefined, the previous step did not find an object. Fix that step. Reload. Do not rewrite the whole file because one find missed. Testing is not a ceremony at the end. It is the hand count you do after each step.`,
            ].join("\n\n"),
          },
          {
            heading: "forEach and map",
            markdown: [
              `forEach runs a function once per item. The function receives the item. forEach is for actions, usually logging or updating, when you do not need a new array back. It returns undefined. You cannot assign its result and filter that result later.`,
              fence(
                "js",
                `
tasks.forEach(function (task) {
  console.log(task.title);
});
`,
              ),
              `The function in the parentheses is a callback: a function you hand to another function so it can call it for you. The parameter task is one object from the array, the same idea as the student variable inside last lesson's loop. forEach walks the indexes for you. You do not write index < length. You also do not control the loop header, so do not add or remove items from the same array inside forEach this week. Finish the visit, then change the list.`,
              `map builds a new array by returning a value from each item. The original array stays as it was. The new array has the same length. Use map when you want a parallel list, such as every title, or every score.`,
              fence(
                "js",
                `
const titles = tasks.map(function (task) {
  return task.title;
});
`,
              ),
              `If you forget return, titles is a list of undefined values, one per task. map does not guess that you meant task.title just because you mentioned it. The callback must return the value that should go into the new array. Log titles and log tasks. You should see titles as strings and tasks still as objects.`,
              `You will also see arrow functions in other people's code. ${c("(task) => task.title")} is a compact function. When there are no braces, the value after the arrow is returned automatically. ${c("(task) => { return task.title; }")} is the same idea with an explicit return. This course accepts either form. If you use braces, you must write return. Pick one form in a file and stay with it so a missing return is easier to spot.`,
              `:::misunderstanding map changes the original titles in place
map returns a new array. tasks is still a list of objects after you create titles. If the original looks unchanged, that is success. Look at the new const. forEach is the one that does not give you that new list.
:::`,
            ].join("\n\n"),
          },
          {
            heading: "filter, find, and findIndex",
            markdown: [
              `filter builds a new array of the items for which the callback returns true. Items that produce false are left out. The original array remains. The new length can be shorter. It can also be zero, which is a real result: nobody matched.`,
              fence(
                "js",
                `
const stillOpen = tasks.filter(function (task) {
  return task.done === false;
});
`,
              ),
              `Return a boolean. ${c("task.done === false")} is clear. ${c("!task.done")} is the same test when done is a real boolean. If you return the task itself, or the title string, those values are treated as roughly true and filter keeps everything. Return true or false on purpose. Then log stillOpen.length and compare it with a finger count of the source.`,
              `find returns the first item that passes the test, or undefined if none do. It does not return an array. findIndex returns the index of that first match, or -1 if none do. -1 is not a valid index. It is the signal for "not found." Do not use -1 inside brackets. You would be reading a property of undefined, or worse, wrapping around in a way you did not intend. Check the result.`,
              fence(
                "js",
                `
const email = tasks.find(function (task) {
  return task.title === "Email tutor";
});
if (email !== undefined) {
  console.log(email.done);
}

const index = tasks.findIndex(function (task) {
  return task.title === "Buy milk";
});
if (index !== -1) {
  console.log(tasks[index].title);
}
`,
              ),
              `find stops at the first match. A second task with the same title is ignored. If that matters, use filter and look at the length. findIndex pairs with an edit: once you have a valid index, you may assign a property or remove that slot. ${c("tasks.splice(index, 1)")} removes one item at that index. The first argument is where. The second is how many. splice changes the original array. Do it after you have checked for -1. Calling splice(-1, 1) does not mean "do nothing." Negative indexes count from the end. That is a painful surprise. The if (index !== -1) guard is part of the solution, not a decoration.`,
              `:::warning find can be undefined
email.done throws if find found nothing. The title might differ by a capital letter or an extra space. Log email first. Only read .done when the log shows an object. Compare strings with === so "Email tutor" does not match "email tutor" by accident.
:::`,
            ].join("\n\n"),
          },
          {
            heading: "Sorting without scrambling numbers",
            markdown: [
              `sort puts an array into an order. The basic trap is that the default order converts items to strings and compares those strings. For text titles, that is often what you want: Buy comes before Email because B comes before E. For numbers, string order is wrong. The scores 40, 100, and 8 become the strings "40", "100", and "8". "100" comes before "40" because the character 1 comes before the character 4. A numeric leaderboard sorted with the default sort looks shuffled.`,
              `Pass a compare function. It receives two items and returns a number. A negative number means the first item should come first. A positive number means the second item should come first. Zero means they are equal for this sort.`,
              fence(
                "js",
                `
function byScore(left, right) {
  return left.score - right.score;
}
const ranked = students.slice().sort(byScore);
`,
              ),
              `${c("left.score - right.score")} is negative when left is smaller, so smaller scores come first. Swap the subtraction if you want high scores first. slice() with no arguments copies the array. Sorting the copy leaves the original roster order alone. sort changes the array you call it on. If you sort students directly, the old order is gone. Copy first unless you mean to reorder the only list.`,
              `For titles, subtraction does not make sense. Compare the strings:`,
              fence(
                "js",
                `
function byTitle(left, right) {
  if (left.title < right.title) {
    return -1;
  }
  if (left.title > right.title) {
    return 1;
  }
  return 0;
}
`,
              ),
              `Test sort with three items whose correct order you can say aloud. Log the first item's title or score after sorting. If 100 appears before 40 in a low-to-high numeric sort, the compare function is missing and the default string sort ran. Sorting is basic this week: one compare function, one copy, one log of the first item. You do not need to sort by two fields.`,
              `:::tip Copy, then sort
students.slice().sort(byScore) ranks a copy. students stays in the order you typed, which is the order a for loop already printed. If a later bug appears, you can still see the original.
:::`,
            ].join("\n\n"),
          },
          {
            heading: "Testing, errors, and a task list",
            markdown: [
              `A task list is the practice because it uses objects, a boolean, and questions you can count. Start with three tasks. Map the titles. Filter to done === false. Find one title you know is present, and find one title you know is absent so you see undefined. Sort a copy by title and log the first title. Each of those is one step from the pseudocode. Reload after each step. A file that only runs at the end hides which step broke.`,
              `Read errors as sentences. ReferenceError means a name was never declared, or it is outside its scope. SyntaxError means the grammar failed before the script ran: a missing brace, a missing comma between objects, or a quote. TypeError: Cannot read properties of undefined means you used a property on undefined. The line number is the scene of the crash, and the cause is often the line above, where find returned undefined or the index was -1. A wrong answer with no error is still a bug. length 3 when you counted two open tasks is a failed test. The console is green and the program is still wrong. That is why the hand count exists.`,
              `Debugging procedure for this lesson:`,
              `1. Write the expected length or the expected first item on paper.`,
              `2. Log the actual value.`,
              `3. If they differ, log one item that should have been included or excluded.`,
              `4. Change the callback's return, or the spelling of a property, and reload once.`,
              `5. Stop when the paper and the console agree. Do not add a new feature in the same edit.`,
              `A shopping list is the same shape as the task list. Items might be { name, quantity, bought }. filter for bought === false. map the names. find a name. The week assignment lets you choose a shopping list or a student score manager. Both need an array of objects and at least two methods. The score manager might filter scores >= 60 and sort a copy by score. The shopping list might filter items still to buy. Use the plan, the tiny list, and the hand count either way.`,
              `The next part of the course leaves the console as the only output. You will meet the document, the page the browser built from your HTML, and you will change a heading from JavaScript. Lists still matter there. A task list on screen is this array, plus a way to show it. If the array is wrong, the screen will be wrong too. Finish this week by being able to say what is in the list and why.`,
              `:::tip One change, then the hand count
After you edit a callback, reload and compare one number: a length, an index, or the first sorted title. If that number is right, then look at the rest. If it is wrong, do not sort or splice on top of the mistake.
:::`,
            ].join("\n\n"),
          },
        ],
        vocabulary: [
          {
            term: "Callback",
            definition:
              "A function you pass into another function, such as the function forEach or filter calls once for each item.",
          },
          {
            term: "map",
            definition:
              "An array method that returns a new array of the same length, built from whatever the callback returns for each item.",
          },
          {
            term: "filter",
            definition:
              "An array method that returns a new array containing only the items for which the callback returns true.",
          },
          {
            term: "find",
            definition:
              "An array method that returns the first matching item, or undefined if no item passes the test.",
          },
          {
            term: "findIndex",
            definition:
              "An array method that returns the index of the first match, or -1 when nothing matches. -1 is not a slot you should read.",
          },
          {
            term: "Pseudocode",
            definition:
              "A numbered plan in plain language that says what the program should do before you translate the steps into JavaScript.",
          },
        ],
        demonstrations: [
          {
            title: "Answer three questions about a task list",
            intro:
              "You will write pseudocode, then use map, filter, and find on three tasks. You will also sort a copy by title and handle a missing find. The methods are the same on every operating system.",
            steps: [
              "Enter learning/week-08 in a terminal, using your system's steps, and open the folder in the editor.",
              "Create learning/week-08/tasks.html. In a comment, write five numbered steps for titles, open tasks, one find, and a check.",
              "Declare an array of three task objects with title and done. Make exactly two of them not done.",
              "map the titles into a new array and log it. The length of the new array should be 3. The original tasks should still be objects.",
              "filter where done === false. Log the new length and confirm it is 2 by counting the source.",
              "find the task titled Email tutor, or a title you actually used. Log the object before you log .done. Then find a title that is not in the list and log the undefined result without reading a property.",
              "slice and sort a copy by title with a compare function. Log the first title of the copy and the first title of the original. They may differ. The original order should remain.",
              "Save, reload, and compare the console with the comment. If a length is wrong, change only the callback and reload again.",
            ],
            expected:
              "titles has three strings. The open-task length is 2. The known title finds an object, and the missing title logs undefined without a TypeError. The sorted copy's first title is the alphabetically first one, and the original array order is unchanged.",
            verify:
              "Count open tasks with your finger. Compare that count to the filtered length. Compare titles.length to tasks.length. Read the comment and tick each step that the console supports. A green console with the wrong count is not finished.",
            ifItFails:
              "If every task remains after filter, the callback did not return a boolean. If map produced undefined, the callback did not return the title. If .done throws, find returned undefined and you skipped the check. If numbers or titles look alphabetically odd, the default sort ran because the compare function was missing.",
            os: {
              sameOnAllPlatforms:
                "map, filter, find, findIndex, and sort are the same on Windows, macOS, and Linux. Your pseudocode comment is plain text in the file on every system. The different steps are opening the terminal, opening the HTML file, and opening the console.",
              identify: [
                "Use Start and the taskbar, the Apple menu and Dock, or a Linux Activities menu to see which system you have before you follow a shortcut.",
                "The browser menu can open developer tools on every system if the keyboard shortcut is unfamiliar.",
              ],
              windows: [
                "Open Command Prompt, cd into learning\\week-08, and create the folder with mkdir if cd cannot find it.",
                "Start tasks.html with start tasks.html or from File Explorer after you save.",
                "Open the console with F12 or Ctrl+Shift+I. Reload after each method so a wrong length is caught early.",
                "Open week-08 in Visual Studio Code from the Start menu.",
              ],
              macos: [
                "Open Terminal from Spotlight, then cd learning/week-08 or mkdir -p learning/week-08.",
                "Run open tasks.html or use Finder.",
                "Open the console with Command+Option+I or the Develop menu and keep it open while you reload.",
                "Open the week-08 folder in Visual Studio Code.",
              ],
              linux: [
                "Open Terminal, cd into learning/week-08, and mkdir -p the folder if you are creating it now.",
                "Open tasks.html with xdg-open or the file manager.",
                "Use F12, Ctrl+Shift+I, or the browser menu to reach the Console tab.",
                "Open Visual Studio Code from the application menu on week-08.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "Titles, open tasks, one find, and a sorted copy",
            filename: "learning/week-08/tasks.html",
            language: "html",
            code: tasksCode,
            explanation:
              "map returns a new array of three titles and does not replace tasks. filter keeps the two objects whose done property is false, so the logged length is 2. find returns the Email tutor object, and only then is .done read. sort runs on a slice copy. The compare function orders titles with < and >, and the original tasks array is not sorted. The first title of the ranked copy is Buy milk, because B comes before E and R.",
            lineNotes: [
              {
                focus: "map return",
                note: "The callback returns task.title. Without return, titles would be an array of undefined with length 3.",
              },
              {
                focus: "filter boolean",
                note: "done === false is the test. The new length is the count of open tasks, which you can check by hand.",
              },
              {
                focus: "find then property",
                note: "email is an object because that title exists. Reading .done is safe only after you know find succeeded.",
              },
              {
                focus: "slice before sort",
                note: "slice copies the array. sort reorders that copy. tasks[0] stays Buy milk if that was how you wrote the original.",
              },
            ],
            expectedOutput:
              "The console shows an array of the three titles, then 2, then true for the email task's done flag, then Buy milk as the first title of the sorted copy. The script finishes without a TypeError.",
            level: "practical",
          },
        ],
        exercises: [
          {
            title: "Names of people who passed",
            difficulty: "warm-up",
            prompt:
              "From three student objects, build a new array of names for scores that are at least 60. Count the expected names before you reload.",
            steps: [
              "Write a three-line pseudocode comment: list, filter, map.",
              "filter students whose score is >= 60. Log that array's length.",
              "map the filtered array to names, or map first and filter scores if you can explain the order.",
              "Compare the logged names with your hand list. Fix the comparison if a failing score appears.",
            ],
            expectedOutcome:
              "The logged names match the students you counted as passing. A student below 60 is absent. The original students array still has all three objects.",
          },
          {
            title: "Find one task and survive a miss",
            difficulty: "practice",
            prompt:
              "Using a task list, find a title that exists and a title that does not. Print the found task's done value. When the title is missing, print a short not-found message instead of reading a property.",
            steps: [
              "Create three tasks and a find callback that compares title with ===.",
              "Log the found object, then its done property.",
              "Run find for a title that is not in the list. Test the result against undefined before any property read.",
              "In a comment, write the hand count of open tasks and make a filter agree with it.",
            ],
            expectedOutcome:
              "The existing title prints a boolean. The missing title prints your not-found message and does not throw. The filter length matches the comment.",
          },
        ],
        troubleshooting: [
          {
            problem: "map returns an array of undefined.",
            why: "The callback did not return the value you cared about. Mentioning a property inside the function does nothing unless return sends it back. Braces on an arrow function also require return.",
            solution:
              "Add return task.title, or remove the braces on an arrow so the title is the returned expression. Reload and log the new array. Its length should match the original, and its items should be strings.",
          },
          {
            problem: "filter keeps every item, or keeps none.",
            why: "The callback returned a string or an object, which is treated as true, or it returned the wrong comparison, such as done === true when you meant the open tasks.",
            solution:
              "Log the boolean for one known open task and one finished task. Make the callback return that boolean. Count with your finger and reload. Change only the comparison if the count is still off.",
          },
          {
            problem: "TypeError after find, reading 'done' or 'title'.",
            why: "find returned undefined because nothing matched. A spelling difference, a capital letter, or an extra space makes === fail. The property read then crashes.",
            solution:
              "Log the find result. If it is undefined, log the titles with forEach and compare them to the search string character by character. Guard with if (found !== undefined) before you read a property.",
          },
          {
            problem: "A numeric sort comes out in dictionary order, such as 100 before 40.",
            why: "sort with no compare function converts values to strings. The character 1 is before the character 4, so 100 sorts before 40.",
            solution:
              "Pass a function that returns left.score - right.score, or the swapped subtraction for high-to-low. Call it on a slice copy. Log the first score and check it against the smallest or largest by eye.",
          },
        ],
        knowledgeChecks: [
          {
            id: "method-map-vs-foreach",
            question: "You need a new array of titles and you still need the original task objects. Which method fits?",
            format: "Multiple choice",
            options: [
              "map, because it returns a new array and leaves the original array in place.",
              "forEach, because it returns the new array of titles.",
              "pop, because it copies the first item.",
              "A while loop is required and map cannot return anything.",
            ],
          },
          {
            id: "method-find-miss",
            question: "find returns undefined for a missing title. What should you do before reading .done?",
            format: "Multiple choice",
            options: [
              "Check that the result is not undefined, and only then read the property.",
              "Use index -1, which always points at the last real item.",
              "Call length() on undefined to see the missing task.",
              "Sort the array, which turns undefined into an object.",
            ],
          },
          {
            id: "method-pseudocode",
            question: "What belongs in pseudocode for a list problem, and how do you use it when the console disagrees?",
            format: "Short answer",
          },
        ],
        homework: {
          description:
            "Submit the week 8 module assignment: a shopping list or a student score manager. Use an array of objects, at least two list methods, a short pseudocode comment, and console checks you can count by hand.",
          requirements: [
            "Store at least three objects in one array, with the same property names on each object.",
            "Use at least two of forEach, map, filter, find, findIndex, or sort, and log a result you predicted before the run.",
          ],
          deliverables: [
            "The week 8 module assignment file, such as learning/week-08/score-manager.html or learning/week-08/shopping-list.html.",
          ],
          submission:
            "Submit the program as the week 8 module assignment. Include the pseudocode comment, the script, and the hand count that matches a logged length or a logged first item.",
          criteria: [
            "The logged length, name list, or sorted first item matches the hand check in the submission.",
            "Methods are used for the jobs they fit, and a missing find is guarded if the script searches for one item.",
          ],
          submissionKind: "module_assignment",
        },
        summary: [
          "Write the steps in plain language, then translate them. Test with a list small enough to count by hand.",
          "forEach visits items and returns undefined. map and filter return new arrays. map keeps the length. filter keeps the matches.",
          "find returns an item or undefined. findIndex returns an index or -1. Check those signals before you read a property or call splice.",
          "Default sort is string order. A compare function sorts numbers or objects. slice copies an array so sort does not erase the original order.",
        ],
        nextLesson: {
          title: "Understanding the DOM",
          why: "You can compute a list in the console. The next lesson connects JavaScript to the page itself, so a result can show up in a heading or a list a person can see.",
          lessonSlug: "understanding-the-dom",
        },
      },
      guide: {
        sessionNumber: 16,
        week: 8,
        title: "Array methods and problem solving",
        durationMinutes: 90,
        objectives: [
          "Students write a five-line plan before calling map or filter.",
          "Students produce a filtered length they counted by hand.",
          "Students guard a missing find and sort a copy with a compare function.",
        ],
        tools: [
          "The student roster from the previous session, if it is available",
          "Browser console",
          "A paper hand count of two open tasks",
        ],
        preparation: [
          "Prepare tasks with two done values false and one true, and write the expected filter length on a sticky note you do not show until after the demo.",
          "Prepare a map callback without return so the result is [undefined, undefined, undefined].",
          "Prepare a numeric array [40, 100, 8] sorted with the default sort, so 100 appears first.",
          "Have the TypeError from email.done ready, caused by a title that does not match the capital letters.",
        ],
        flow: [
          {
            minutes: 5,
            title: "Count before code",
            detail:
              "Show three tasks on paper and ask how many are not done. Write that number on the board. Say the console must land on that number or the callback is wrong. Do not open an editor until the number is agreed.",
          },
          {
            minutes: 15,
            title: "Plan, map, and filter",
            detail:
              "Write the five pseudocode lines as comments on the projector. Translate titles with map and show a version that forgot return. Then filter done === false and reveal the sticky-note count. Stress that the original array is still there.",
          },
          {
            minutes: 20,
            title: "find, sort, and a bad default",
            detail:
              "find a real title and log the object before .done. find a missing title and show the TypeError if you skip the guard, then add the guard. Sort [40, 100, 8] with no compare function, then with subtraction on a slice copy. Ask which first number they trust.",
          },
          {
            minutes: 30,
            title: "Task or score practice",
            detail:
              "Students build tasks.html or extend their roster with filter and map. They write the expected length in a comment before reload. You circulate and refuse to debug a method until they read that comment aloud and point at the callback's return.",
          },
          {
            minutes: 10,
            title: "One-bug clinic",
            detail:
              "Take one wrong length and one TypeError from the room or from your prepared files. Change a single return or add a single if. Reload and stop. Say that adding sort on top of a bad filter hides the first bug.",
          },
          {
            minutes: 10,
            title: "Assignment and the page ahead",
            detail:
              "Ask the knowledge checks. Set the module assignment: shopping list or score manager, three objects, two methods, pseudocode, and a hand count. Preview the DOM as the place those results will later appear on the page, not as a new list system.",
          },
        ],
        explain: [
          "Pseudocode, then one method, then a hand count.",
          "forEach versus map, and the missing return.",
          "filter callbacks that return real booleans.",
          "find versus undefined, findIndex versus -1.",
          "Default sort versus a compare function, and slice before sort.",
          "Reading the first error line and changing one thing.",
        ],
        questions: [
          "If map's callback forgets return, what is in the new array, and what is still in the old one?",
          "Why is -1 from findIndex unsafe to put straight into brackets?",
          "What paper number will you compare to stillOpen.length before you add another method?",
        ],
        demonstration:
          "From a written count of two open tasks, map titles, filter open tasks, guard a missing find, and sort a numeric copy with a compare function. Show the broken default sort and the missing return before the repaired versions.",
        practice:
          "Students save a task list or a score filter under learning/week-08, with pseudocode in a comment and a logged length that matches a hand count. They must show the original array still intact after map or filter.",
        expectedOutcomes: [
          "A filtered length that matches the comment.",
          "A guarded find for a missing title.",
          "Students can say that sort without a compare function orders numbers as text.",
        ],
        difficulties: [
          {
            issue: "The student nests four methods before the first length is right.",
            help: "Comment out everything after the filter. Log one length. Compare it with the paper count. Only then uncomment the next method. Sit with them for that one reload so the habit is the pause, not another method.",
          },
          {
            issue: "find throws, and the student changes the array data at random.",
            help: "Log the find result and the titles. Fix the search string to match one title exactly, including capitals. Add if (found !== undefined) before .done. Do not rewrite the objects until the string comparison is visible.",
          },
          {
            issue: "Sorting the only copy destroys the roster order and the student cannot get it back.",
            help: "Reload from the last save if the editor can undo. Then assign the sort to a new const built from slice. Show that students[0] returns to the typed order while ranked[0] is the sorted one. Make the undo with them so they see both names.",
          },
        ],
        homework:
          "The module assignment is a shopping list or a student score manager: at least three objects, two list methods, a pseudocode comment, and a hand count that matches a logged length or first item. Paths stay under learning/week-08.",
        assessment:
          "Knowledge checks cover map versus forEach, the find guard, and what pseudocode is for. Mark the assignment by recomputing the filtered count from the source. A sort that looks alphabetical for numbers is a miss on the compare-function idea if they claimed numeric order.",
        recap:
          "Return to the paper count from the first five minutes and to the console length. If they match, the method did the plan. Tell them the next lesson puts results into the page, and that a correct array is what the page will display. Collect the file path they will submit.",
        knowledgeCheckAnswers: [
          {
            id: "method-map-vs-foreach",
            answer: "map, because it returns a new array and leaves the original array in place.",
            explanation:
              "map builds a parallel list from returned values. forEach runs actions and returns undefined, so it cannot supply the new title array.",
          },
          {
            id: "method-find-miss",
            answer: "Check that the result is not undefined, and only then read the property.",
            explanation:
              "A missing match is undefined, not an object. Reading .done on undefined throws. -1 is the findIndex signal, and it is not a safe index either.",
          },
          {
            id: "method-pseudocode",
            answer:
              "Numbered steps in plain language, such as filter then map. When the console disagrees, compare one step's expected count with the log before rewriting later steps.",
            explanation:
              "Pseudocode is the plan you can check by hand. A mismatch tells you which step failed. Changing every method at once hides that step.",
          },
        ],
      },
    },
  ],
  assignment: {
    slug: "week-08-assignment",
    title: "Shopping list or score manager",
    summary:
      "Build an array of objects for a shopping list or for student scores, then use list methods and a hand count to answer one real question about that list.",
    instructions:
      "Choose one program. A shopping list stores at least three items as objects, with a name, a quantity, and a bought flag or a price. A student score manager stores at least three students as objects, with a name and a numeric score. Use the same property names on every object.\n\nBefore the methods, write a short pseudocode comment of at least four numbered steps. Then use at least two of these tools: forEach, map, filter, find, findIndex, and sort. A typical shopping list maps the names and filters the items still to buy. A typical score manager filters passing scores and sorts a copy from low to high or high to low with a compare function. find is welcome if you guard the missing case.\n\nLog a result you can check by hand: a length, a list of names, or the first item after a sort. Write that expectation in the submission and show that the console agrees. Do not sort the only copy of the data unless you mean to replace the original order. Prefer slice before sort.\n\nSave the file at a portable path such as learning/week-08/shopping-list.html or learning/week-08/score-manager.html. The console is the output for this assignment. You do not need to change the heading from JavaScript yet. Paste the script, the pseudocode, and the hand count.",
    objectives: [
      "Represent a list of records as an array of objects with a consistent shape.",
      "Use list methods to derive a new array or to find one record.",
      "Check one logged result against a count or order you worked out by hand.",
    ],
    requirements: [
      "An HTML file with a script and a heading that says whether it is a shopping list or a score manager.",
      "An array of at least three objects. Every object uses the same property names.",
      "A pseudocode comment of at least four numbered steps written before the method calls in the file.",
      "At least two of forEach, map, filter, find, findIndex, and sort. Numeric sort must use a compare function. A missing find must be checked before a property is read.",
      "A console log of a length, a name list, or a sorted first value, plus a hand check in the submission that matches it.",
    ],
    deliverables: [
      "learning/week-08/shopping-list.html or learning/week-08/score-manager.html.",
      "The pasted script, including the pseudocode comment.",
      "Three to six lines that show the hand count or the expected order beside the console result.",
    ],
    rubric: [
      {
        criterion: "Records",
        points: 20,
        description:
          "At least three objects share one shape. Names and scores or quantities are the right types, and the array logs without a syntax error.",
      },
      {
        criterion: "Plan",
        points: 15,
        description:
          "Pseudocode states the steps in order, and the code follows that order rather than a pile of unrelated calls.",
      },
      {
        criterion: "Methods",
        points: 25,
        description:
          "At least two methods are used for jobs they fit. map or filter returns are actually used. find is guarded if it is used.",
      },
      {
        criterion: "Checked result",
        points: 25,
        description:
          "A logged length, name list, or sorted value matches the hand check. A numeric sort does not rely on the default string order.",
      },
      {
        criterion: "Original list",
        points: 15,
        description:
          "The starting array is still available after map or filter. If the program sorts, it sorts a copy or it explains why the original order was replaced.",
      },
    ],
    points: 100,
    instructorSolution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Score manager</title>
</head>
<body>
  <h1>Score manager</h1>
  <script>
    // 1. Store three students with name and score.
    // 2. Filter scores that are at least 60.
    // 3. Map those records to names.
    // 4. Sort a copy of all students from low score to high score.
    // 5. Log the passing names and the lowest score on the copy.
    const students = [
      { name: "Amina", score: 88 },
      { name: "Leo", score: 54 },
      { name: "Priya", score: 72 }
    ];

    const passing = students.filter(function (student) {
      return student.score >= 60;
    });

    const passingNames = passing.map(function (student) {
      return student.name;
    });

    const ranked = students.slice().sort(function (left, right) {
      return left.score - right.score;
    });

    console.log(passingNames);
    console.log(ranked[0].name + ": " + ranked[0].score);
    console.log(students[0].name);
  </script>
</body>
</html>`,
  },
  quiz: {
    slug: "week-08-quiz",
    title: "Week 8 quiz: lists, records, and checking results",
    passingScore: 70,
    allowRetakes: true,
    questions: [
      {
        slug: "week-08-index-zero",
        type: "multiple_choice",
        prompt: "const items = [\"milk\", \"bread\", \"apples\"]. Which expression is \"milk\"?",
        options: [
          { id: "a", text: "items[0]" },
          { id: "b", text: "items[1]" },
          { id: "c", text: "items[3]" },
          { id: "d", text: "items.length" },
        ],
        correct: { optionId: "a" },
        explanation:
          "Indexes start at 0, so the first string is items[0]. items[1] is bread. length is 3, the count, not an item. items[3] is undefined because there is no fourth slot.",
        points: 10,
      },
      {
        slug: "week-08-push-length",
        type: "true_false",
        prompt: "items.push(\"tea\") returns the string tea, and you must use that return value to see the new item.",
        correct: { value: false },
        explanation:
          "push adds tea at the end and returns the new length, which is a number. To see the item, log the array or the value at length - 1. Storing the return value stores the length.",
        points: 10,
      },
      {
        slug: "week-08-object-field",
        type: "multiple_choice",
        prompt: "students is an array of objects with name and score. How do you read the first student's score?",
        options: [
          { id: "a", text: "students.score[0]" },
          { id: "b", text: "students[0].score" },
          { id: "c", text: "students.score" },
          { id: "d", text: "score[students]" },
        ],
        correct: { optionId: "b" },
        explanation:
          "Read left to right: the array, then index 0 to get the first object, then the score property. students.score looks for a score property on the array itself, which is not where the field lives.",
        points: 10,
      },
      {
        slug: "week-08-read-length",
        type: "code_reading",
        prompt: "What is logged?",
        codeSnippet: `const scores = [70, 80, 90];
console.log(scores[0]);
console.log(scores.length);`,
        options: [
          { id: "a", text: "70 and then 3" },
          { id: "b", text: "80 and then 2" },
          { id: "c", text: "90 and then 0" },
          { id: "d", text: "undefined and then undefined" },
        ],
        correct: { optionId: "a" },
        explanation:
          "scores[0] is the first number, 70. length is the count of items, which is 3. The last index would be 2, but this snippet does not log scores[2].",
        points: 10,
      },
      {
        slug: "week-08-read-filter",
        type: "code_reading",
        prompt: "How many objects are in openTasks, and does tasks lose an item?",
        codeSnippet: `const tasks = [
  { title: "Buy milk", done: false },
  { title: "Email tutor", done: true }
];
const openTasks = tasks.filter(function (task) {
  return task.done === false;
});`,
        options: [
          { id: "a", text: "openTasks has 1 object. tasks still has both objects." },
          { id: "b", text: "openTasks has 2 objects. tasks becomes empty." },
          { id: "c", text: "openTasks is undefined because filter returns nothing." },
          { id: "d", text: "openTasks has 0 objects because false cannot be stored." },
        ],
        correct: { optionId: "a" },
        explanation:
          "filter builds a new array of matches. Only Buy milk has done === false, so openTasks has one object. tasks is unchanged and still holds both tasks. filter does not delete from the original.",
        points: 10,
      },
      {
        slug: "week-08-map-return",
        type: "true_false",
        prompt: "If a map callback forgets to return task.title, the new array is still a list of the title strings.",
        correct: { value: false },
        explanation:
          "map puts the callback's return value into the new array. Without return, each slot is undefined. The original task objects stay in the old array. Look at the new array to see the damage.",
        points: 10,
      },
      {
        slug: "week-08-find-guard",
        type: "multiple_choice",
        prompt: "tasks.find does not match any title. What is a safe next step?",
        options: [
          { id: "a", text: "Test the result against undefined before reading a property." },
          { id: "b", text: "Read .title immediately, because find always returns an object." },
          { id: "c", text: "Use the index -1 to read the last task." },
          { id: "d", text: "Call push on the undefined result to create the missing task." },
        ],
        correct: { optionId: "a" },
        explanation:
          "find returns undefined when nothing matches. Reading a property then throws a TypeError. A guard skips that read. -1 belongs to findIndex, and it is not a safe index to put in brackets either.",
        points: 10,
      },
      {
        slug: "week-08-sort-strings",
        type: "multiple_choice",
        prompt: "Why can [40, 100, 8].sort() with no compare function put 100 before 40?",
        options: [
          { id: "a", text: "The default sort compares strings, and the character 1 comes before the character 4." },
          { id: "b", text: "sort always orders numbers from high to low." },
          { id: "c", text: "100 is shorter than 40, so it comes first." },
          { id: "d", text: "sort only works on arrays of objects, so numbers are reversed as an error signal." },
        ],
        correct: { optionId: "a" },
        explanation:
          "Without a compare function, sort turns values into strings. \"100\" is before \"40\" in dictionary order. A numeric order needs a function that returns a negative, zero, or positive number, such as left - right.",
        points: 10,
      },
      {
        slug: "w8-q9-plan",
        type: "multiple_choice",
        prompt: "Why write a hand count or pseudocode before trusting filter or sort on three records?",
        options: [
          { id: "a", text: "Because filter cannot run without pseudocode comments" },
          { id: "b", text: "Because a predicted result lets you spot a wrong callback even when nothing throws" },
          { id: "c", text: "Because arrays of three items are illegal" },
          { id: "d", text: "Because sort always fails on small lists" },
        ],
        correct: { optionId: "b" },
        explanation:
          "Three records are few enough to count. If you expect two open tasks and the log says three, the filter is wrong even though the script did not throw. The plan gives you that expected number first.",
        points: 10,
      },
    ],
  },
};
