import type { ModuleSeed } from "../../src/lib/content-types";

export const week11: ModuleSeed = {
  slug: "week-11-typescript-react",
  number: 11,
  weekNumber: 11,
  monthLabel: "Month 3 — Web interactivity, Git and React",
  title: "TypeScript and React introduction",
  description:
    "Add types to JavaScript with TypeScript, then build a small React page from header, profile, and footer components using Vite.",
  lessons: [
    {
      slug: "introduction-to-typescript",
      sessionNumber: 21,
      title: "Introduction to TypeScript",
      estimatedMinutes: 90,
      difficulty: "Gentle introduction",
      requiresOs: true,
      content: {
        overview: {
          about:
            "This lesson introduces TypeScript as JavaScript plus types. You will annotate strings, numbers, booleans, arrays, and objects, give functions parameter and return types, let inference fill in obvious types, and describe object shapes with interfaces and type aliases. A compiler turns the TypeScript into JavaScript.",
          why: "JavaScript waits until the program runs to complain about many mismatches. TypeScript checks those mismatches in the editor, while you are still looking at the line that caused them.",
          alreadyKnow:
            "You can use let and const, strings, numbers, booleans, functions, arrays, and objects in JavaScript.",
        },
        objectives: [
          "Explain TypeScript as JavaScript plus types that compile to JavaScript.",
          "Annotate string, number, boolean, array, and object values.",
          "Write a function with parameter types and a return type.",
          "Say when inference already knows a type and when an annotation still helps.",
          "Describe an object shape with an interface and with a type alias.",
        ],
        prerequisites: [
          {
            label: "JavaScript variables, functions, arrays, and objects.",
            lessonSlug: "variables-types-operators",
          },
          {
            label: "Saving a project folder and running a command in the terminal.",
            lessonSlug: "github-and-sharing",
          },
        ],
        teachingNotes: [
          {
            heading: "What TypeScript is",
            markdown: `TypeScript is JavaScript plus a type system. A type is a label for the kind of value a name may hold: a string, a number, a boolean, a list of strings, or an object with particular fields. You write those labels in the source file. A program called the TypeScript compiler reads them and checks that your code agrees with them.

The file extension is \`.ts\` for TypeScript that has no HTML-like syntax, and \`.tsx\` when the file also contains JSX. JSX arrives in the next lesson with React. This lesson uses \`.ts\` only.

TypeScript exists because JavaScript is deliberately flexible. A variable that held a number can later hold a string, and the language will not stop you at edit time. That flexibility is useful, and it is also how a stall count becomes the word "twelve" halfway down a file and then breaks a calculation. The problem TypeScript solves is not "JavaScript cannot run". The problem is "the mistake is easier to see before the browser runs".

How it works: you write \`.ts\` files. You run the compiler, \`tsc\`. It reports errors in the terminal and in Visual Studio Code. If the file checks, the compiler emits ordinary JavaScript. The types are not in that output. They were a check, and then they were removed. Node or the browser runs the JavaScript. Neither of them runs TypeScript directly.

This connects to the values you already know. A string in quotes, a number without quotes, and a boolean \`true\` or \`false\` are the same values as in the JavaScript lessons. TypeScript does not replace them. It lets you write the kind next to the name.

You do not need to have studied TypeScript before this session. If the word is new, start from this definition only: TypeScript is JavaScript plus types, and it compiles to JavaScript.

:::misunderstanding The browser runs TypeScript instead of JavaScript
The browser runs the JavaScript that the compiler produced. If you open a .ts file directly in the browser, the browser does not understand the type labels. The next lesson uses Vite so that compile step happens while you work. Today you will run the compiler yourself and look at the JavaScript it writes.
:::

:::example Labels on boxes
A market storeroom is calmer when each box says "bread" or "knives". You can still put the wrong thing in a box, but a checker at the door can refuse a box of knives labelled bread. TypeScript is that checker for values. It does not bake the bread. It stops a mismatch you can still choose to fix.
:::`,
          },
          {
            heading: "Why types are used",
            markdown: `A type checker answers questions while you edit. Can this function receive a number? Does this object have a \`name\` field? Did you pass the arguments in an order the function can use? JavaScript will often wait until that line runs, and only if a test happens to reach it. TypeScript asks earlier.

Why that matters in this course: your pages already pass text and numbers through functions. A counter uses a number. A heading uses a string. Mixing them is a small slip with a confusing result. \`"3" + 1\` is the string \`"31"\` in JavaScript, because \`+\` joins strings. A type on the count makes the slip visible when you write the line, not after you click the button twenty times.

The problem it does not solve is every bug. TypeScript does not know whether 8:00 is the correct opening time. It does not know whether the heading is kind. It knows whether the opening time is a string or a number, if you said which one you meant. Types are a net for a certain family of mistakes. Logic mistakes can still pass the compiler and fail in the browser.

How you feel the check in the editor: Visual Studio Code, with the TypeScript support it already includes, underlines a mismatch. The terminal command \`npx tsc\` prints the same family of errors. \`npx\` runs a program that came with the project, without a global install of the compiler beyond Node. You will install Node once in this session. Node is the JavaScript runtime outside the browser. npm is the tool that installs packages such as the TypeScript compiler. They arrive together.

A beginner misunderstanding is to treat a red underline as a moral judgment or as a broken computer. It is a sentence from the compiler: these two types do not fit. Read the sentence. It names the type it expected and the type it found.

Another misunderstanding is to delete the annotation until the underline goes away, without deciding what the value really is. The underline is the lesson. Change the value or change the annotation so they tell the same truth.

:::tip Errors are part of the example
You will cause one type error on purpose later, read it, and then repair it. A clean file at the end is the goal. A clean file that you never broke will not teach you what the compiler is for.
:::`,
          },
          {
            heading: "JavaScript and TypeScript side by side",
            markdown: `A lot of JavaScript is already valid TypeScript. \`const stallCount = 12;\` is legal in both. The TypeScript version can add a label: \`const stallCount: number = 12;\`. The colon and the word \`number\` are the annotation. They are not a second value. They do not appear in the JavaScript the compiler emits.

Here is the same idea as JavaScript you could have written in week 6:

\`\`\`js
const stallName = "Saturday market";
const stallCount = 12;
function label(name, count) {
  return name + " has " + count + " stalls";
}
\`\`\`

And the TypeScript this lesson will compile:

\`\`\`ts
const stallName: string = "Saturday market";
const stallCount: number = 12;
function label(name: string, count: number): string {
  return name + " has " + count + " stalls";
}
\`\`\`

The body of the function is still JavaScript. The parameters say what may be passed. The \`: string\` after the parentheses says what comes back. If you call \`label(12, "Saturday market")\`, the compiler rejects the call because the arguments are in the wrong kinds. JavaScript would have run it and produced a nonsense sentence.

The compiler output looks much more like the first snippet than the second. The annotations are gone. That is what "compiles to JavaScript" means. Compile here is a translation and a check, not a special browser mode.

You can run the emitted file with Node: \`node notes.js\`. You can also keep using JavaScript files beside TypeScript while you learn. This course will not ask you to convert every old page today. The new file is the practice.

\`any\` is a TypeScript type that means "do not check this". It turns the checker off for that value. This course does not use it. If a tool inserts it to silence an error, delete it and read the error instead. Silencing the checker is not the same as understanding the mismatch.

:::misunderstanding TypeScript is a different programming language you must start from zero
The statements, loops, functions, arrays, and objects you already learned are still here. You are adding labels and a compiler. When a line looks like JavaScript, that is because it is JavaScript.
:::`,
          },
          {
            heading: "Annotations for string, number, and boolean",
            markdown: `An annotation sits after a name and before the equals sign when you are giving a variable its first value:

\`\`\`ts
const stallName: string = "Saturday market";
const stallCount: number = 12;
const isOpen: boolean = true;
\`\`\`

\`string\` means text. The value is in quotes. \`number\` means a numeric value such as \`12\` or \`8.5\`. Do not put quotes around a number if you want the type \`number\`. \`"12"\` is a string, even though a person might read it as twelve. \`boolean\` means \`true\` or \`false\` only. The words \`yes\` and \`no\` are strings, not booleans.

Why write the type when the value is sitting right there? On these three lines, the compiler could guess. You write them today so the shape of an annotation becomes familiar before functions hide the value in another place. The annotation is also documentation a person can read without executing the file.

The problem a wrong annotation solves is a lie in the source. \`const stallCount: string = 12;\` does not convert 12 into text. The compiler rejects it. The type and the value disagree, so there is no honest JavaScript to emit until you pick a side. Either write \`: number\`, or write \`"12"\` if you truly want text.

How the three types behave in combinations you already know:

- \`stallName + " is open"\` is a string. Plus joins text when either side is a string.
- \`stallCount + 1\` is a number, arithmetic, when both sides are numbers.
- \`isOpen\` can be the condition of an \`if\`. A non-empty string is also truthy in JavaScript, which is a separate idea. A boolean annotation does not change that older rule. It tells you the name was meant to be a real true or false.

\`null\` is still the "nothing was found" value from the DOM lessons. If a variable might be a string or null, the type is \`string | null\`. The vertical bar means "or". You will see that when a search can fail. For the market notes in this lesson, the values are present, so the plain types are enough.

:::example The quoted number
A price written as \`"12"\` sorts and adds like text. A price written as \`12\` adds like a number. The annotation forces you to choose before a total is quietly wrong. The shopping-total work from the JavaScript weeks was the same choice, made by how you wrote the value. The annotation records the choice.
:::

:::warning Quotes change the type
\`"false"\` is a string. \`false\` is a boolean. \`0\` is a number. \`"0"\` is a string. The checker treats them as different. Your eyes may group them together. Trust the quotes.
:::`,
          },
          {
            heading: "Arrays and objects",
            markdown: `An array type names the element and then uses square brackets. \`string[]\` is an array of strings. \`number[]\` is an array of numbers. You already used indexes and \`.length\`. Those still work. The new information is that every element should match the element type.

\`\`\`ts
const goods: string[] = ["bread", "flowers", "cheese"];
const prices: number[] = [2, 4, 6];
\`\`\`

\`goods.push("jam")\` is allowed. \`goods.push(4)\` is not, because \`4\` is a number. The array method is the same method you used in JavaScript. The checker adds a rule about what may go in.

An object type lists fields and the type of each field. You can write it inline:

\`\`\`ts
const stall: { name: string; open: boolean } = {
  name: "Bread",
  open: true,
};
\`\`\`

The semicolon between fields is the usual style inside a type. The object value itself still uses commas, as in JavaScript. Mixing those up is a normal first-day error. Type position uses semicolons. Value position uses commas.

Why these labels exist: an array of stall names should not quietly gain a number. An object that is supposed to have \`open\` should not be passed to a function that will read \`stall.open\` if the field was forgotten. The compiler treats a missing field as an error. JavaScript would hand you \`undefined\` later, when the line runs.

The problem this catches is the misspelled field. \`stall.isOpen\` is an error if the type only has \`open\`. You fix the spelling at the keyboard. That is the same care you used when an id in HTML did not match a \`querySelector\`, only earlier.

How to read a longer value: look at the type as a form, and the object as the filled-in form. Every required line on the form needs an answer of the right kind. Extra fields are also rejected when the type is closed, which is the default for a fresh object literal. If the form does not ask for \`note\`, do not scribble \`note\` on a value you claim is exactly that form.

Arrays of objects combine the two:

\`\`\`ts
const board: { name: string; open: boolean }[] = [
  { name: "Bread", open: true },
  { name: "Flowers", open: false },
];
\`\`\`

The brackets after the object type mean "an array of those objects". The next section gives this shape a name so you do not repeat it.

:::misunderstanding The type writes the array for you
\`string[]\` does not create \`["bread", "flowers"]\`. You still write the values. The type only checks them. An empty array \`const goods: string[] = [];\` is honest: it is a list of strings that currently has no strings.
:::`,
          },
          {
            heading: "Parameters, return types, and inference",
            markdown: `A parameter annotation sits next to the parameter name. A return annotation sits after the parameter list. Both use the same colon syntax as a variable.

\`\`\`ts
function labelStall(name: string, open: boolean): string {
  if (open) {
    return name + " is open";
  }
  return name + " is closed";
}
\`\`\`

The function must return a string on every path. If one branch returned a number, the compiler would complain. If you forget a return, the compiler complains that a path returns \`undefined\`, which is not a string. That is a useful catch. JavaScript would return \`undefined\` and the caller might print the word "undefined" on the page.

Call sites are checked too. \`labelStall("Bread", true)\` fits. \`labelStall(true, "Bread")\` does not. The order in the type is part of the contract.

Inference means the compiler can often see the type without an annotation. \`const openingHour = 8;\` is a number because \`8\` is a number. \`const heading = "Stalls";\` is a string. You do not have to write \`: number\` on every obvious constant. Inference is not guesswork about your hopes. It follows the expression on the right-hand side.

Why annotate parameters even when inference exists? A parameter has no right-hand side inside the function. The caller supplies the value later. Without an annotation, TypeScript treats an unannotated parameter as an implicit \`any\` in loose settings, or it refuses the file in strict settings. This course uses strict checking. Write the parameter types. Write the return type on functions you create for practice, even when the compiler could infer the return. The return type is a promise you can read at the top of the function: this function gives back a string, not a boolean.

A good place to let inference work is a local constant whose value is obvious:

\`\`\`ts
const message = labelStall("Bread", true);
\`\`\`

\`message\` is a string because \`labelStall\` returns a string. You may write \`: string\` as well. Either is acceptable on a local name. Prefer to write types on parameters, return values, and object shapes. Let inference handle the obvious locals.

The problem inference does not solve is a value that starts life as a wide kind. \`let note = null;\` does not give you a string later without a type. If you need a string that is not ready yet, say so: \`let note: string | null = null;\`. Then \`note = "Open"\` is legal, and \`note = 4\` is not.

:::misunderstanding Inference means you should never write a type
Inference is a convenience for obvious expressions. Public shapes, function parameters, and return types are where a reader looks first. Write those labels. Let the obvious local variables stay short.
:::

:::example The door label
The parameter list is the label on a door: a string and a boolean go in, a string comes out. Inference is recognising that a loaf on the table is bread without printing a new sticker. You still label the door.
:::`,
          },
          {
            heading: "Interfaces and type aliases",
            markdown: `Repeating \`{ name: string; open: boolean }\` on every variable is noisy, and the copies can drift apart. A name for that shape fixes the drift. TypeScript has two beginner tools for the name: a type alias and an interface.

A type alias uses \`type\`:

\`\`\`ts
type Stall = {
  name: string;
  open: boolean;
};

const today: Stall = {
  name: "Saturday market",
  open: true,
};
\`\`\`

An interface uses \`interface\`:

\`\`\`ts
interface Notice {
  title: string;
  body: string;
}

const notice: Notice = {
  title: "Opening",
  body: "The bread stall is open",
};
\`\`\`

For the object shapes in this course, you may use either. An interface is a common choice for an object with named fields. A type alias can name an object too, and it can also name a union such as \`string | null\`. You will see both in React code later, because component props are often a named object type.

Why name the shape at all? A function can take a \`Stall\` instead of a loose collection of separate arguments. The fields travel together. \`function labelStall(stall: Stall): string\` says the caller must pass an object with \`name\` and \`open\`. Missing either field is a compile error. A typo in the field name is a compile error. That is the same protection as separate parameters, grouped into one value.

How the check feels: you fill the object, and the editor offers the field names. If you write \`isOpen\` where the interface says \`open\`, the extra field is rejected and the missing field is reported. Fix the object. Do not weaken the interface to match a typo unless the typo was actually the better name. Then change the interface and every value together.

A beginner misunderstanding is that an interface creates a class or a database table. It does not. There is no runtime object called \`Stall\` unless you create values yourself. The interface disappears in the compiled JavaScript, just like the other annotations. It is a compile-time form, not a value you can log.

Another misunderstanding is that interface and type are enemies. In this lesson they are two ways to name an object shape. Pick one per shape and stay with it inside a file so a reader is not translating between styles for no reason.

\`\`\`ts
function describe(stall: Stall): string {
  if (stall.open) {
    return stall.name + " is open";
  }
  return stall.name + " is closed";
}
\`\`\`

\`Stall[]\` is then an array of those objects, and a function can take \`Stall[]\` and return a \`number\` of open stalls. The name \`Stall\` keeps that function signature readable.

:::tip One shape, one name
If two functions both talk about a stall, they should share \`Stall\`. Copying the fields into two anonymous object types lets one of them grow a field the other does not have. The bug returns in a new costume.
:::`,
          },
        ],
        vocabulary: [
          {
            term: "TypeScript",
            definition:
              "JavaScript plus types. A compiler checks the types and emits ordinary JavaScript with the type labels removed.",
          },
          {
            term: "type annotation",
            definition:
              "The colon and type name you write after a variable, parameter, or function, such as name: string.",
          },
          {
            term: "compiler",
            definition:
              "The tsc program that reads TypeScript, reports mismatches, and writes JavaScript when the file checks.",
          },
          {
            term: "inference",
            definition:
              "The compiler deciding a type from the expression you wrote, such as treating 8 as a number without an annotation.",
          },
          {
            term: "interface",
            definition:
              "A named list of fields and their types. It describes an object shape and is removed when the file compiles.",
          },
          {
            term: "type alias",
            definition:
              "A name you give a type with the type keyword, often an object shape or a union such as string or null.",
          },
          {
            term: "Node",
            definition:
              "A program that runs JavaScript outside the browser. It includes npm, which installs the TypeScript compiler for a project.",
          },
        ],
        demonstrations: [
          {
            title: "Install Node.js for your system",
            intro:
              "Install the current long-term support build of Node.js using the method for your operating system. Then open a new terminal and run the same two checks.",
            steps: [
              "Identify Windows, macOS, or Linux before you download anything.",
              "Follow only that system's install steps. Do not run a macOS installer on Windows or an apt command on macOS.",
              "Finish the installer or package command and read any error it prints.",
              "Close terminals that were already open.",
              "Open a new terminal with the steps for your system.",
              "Run node -v and then npm -v.",
              "Confirm the Node version line starts with v20, v22, or a newer long-term support number. Vite in the next lesson needs a current Node.",
            ],
            expected:
              "The new terminal prints a Node version and an npm version. node -v looks like v22.14.0 or another current number. npm -v prints a number of its own.",
            verify:
              "Run node -v a second time. The same version appears. You have not compiled TypeScript yet. The checks only prove that Node and npm start.",
            ifItFails:
              "If the command is not found, you are in a terminal that was opened before the install, or the installer did not add Node to the PATH. Open a brand-new terminal. On Linux, if node is missing but nodejs exists, the distro package split the name. Prefer the NodeSource install in the Linux steps so the command is node.",
            os: {
              identify: [
                "An Apple menu means macOS. A Windows logo on the start button means Windows. Ubuntu or another distribution without those logos is Linux.",
                "Read the about page in the system settings if you are unsure. Download or install only for that system.",
              ],
              windows: [
                "Open https://nodejs.org in the browser and download the LTS Windows Installer (.msi).",
                "Run the installer and leave the option that adds Node to PATH selected. Close old PowerShell windows.",
                "Press the Windows key, type PowerShell, open Windows PowerShell, and run node -v and then npm -v.",
              ],
              macos: [
                "Open https://nodejs.org and download the LTS macOS Installer (.pkg). Run the package installer.",
                "Quit Terminal if it was already open. Press Command-Space, type Terminal, and press Return.",
                "Run node -v and then npm -v. You do not need Homebrew for this install.",
              ],
              linux: [
                "On Ubuntu or Debian, open Terminal and run sudo apt update, then sudo apt install -y ca-certificates curl. Install a current Node with: curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - and then sudo apt install -y nodejs. The password will not appear as you type.",
                "On Fedora, run sudo dnf install -y nodejs. Then run node -v. If the version is older than 20, use the Linux instructions on https://nodejs.org for a current LTS instead of staying on that package.",
                "Open a new terminal and run node -v and npm -v. Do not use the Windows .msi or the macOS .pkg on Linux.",
              ],
            },
          },
          {
            title: "Compile a TypeScript file to JavaScript",
            intro:
              "Create learning/week-11/types, install the TypeScript compiler into that project, and compile notes.ts. The npm commands are the same on every system once Node is installed.",
            steps: [
              "Create the folder learning/week-11/types inside your learning folder.",
              "Open a terminal and cd into that folder. Run pwd and confirm the path ends with types.",
              "Run npm init -y to create package.json.",
              "Run npm install typescript --save-dev to install the compiler for this project only.",
              "Add notes.ts from the worked example and save it.",
              "Run npx tsc --init and then npx tsc. Look for notes.js in the same folder.",
              "Run node notes.js and read the four lines. Open notes.js in the editor and notice the type annotations are gone.",
              "Change stallCount to a string on purpose, run npx tsc, read the error, then put the number back and compile again.",
            ],
            expected:
              "node notes.js prints Opening, then Saturday market is open, then 3, then 12. The deliberate type error names a number and a string. The repaired file compiles again.",
            verify:
              "notes.js contains stallName and the function, and it does not contain the colon annotations. git status is optional today. The compile is the check.",
            ifItFails:
              "If npx says tsc is missing, you are not in the folder where npm install ran. If tsc prints an error about strict mode and an untyped parameter, add the parameter type instead of turning strict off. If notes.js does not appear, open tsconfig.json and make sure noEmit is not true, then run npx tsc again.",
            os: {
              sameOnAllPlatforms:
                "From learning/week-11/types, run npm init -y, npm install typescript --save-dev, npx tsc --init, npx tsc, and node notes.js. Those commands match on Windows PowerShell, macOS, and Linux.",
              identify: [
                "Use the Apple menu, Windows logo, or Linux about page if you are choosing how to open the terminal.",
                "The install you already did differs by system. The compile commands do not.",
              ],
              windows: [
                "Open Windows PowerShell from the Start menu. Use cd to enter learning/week-11/types and run pwd.",
                "Run the npm and npx commands from this folder. Do not type the PowerShell prompt text.",
              ],
              macos: [
                "Open Terminal with Command-Space. Use cd to enter learning/week-11/types and run pwd.",
                "Run the same npm and npx commands. Finder can create the folder, but the compiler runs in Terminal.",
              ],
              linux: [
                "Open Terminal. On Ubuntu, Ctrl+Alt+T opens it. cd into learning/week-11/types and run pwd.",
                "Run the same npm and npx commands. sudo is not required for a project install inside your home folder.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "A typed market note",
            filename: "notes.ts",
            language: "typescript",
            level: "practical",
            code: `const stallName: string = "Saturday market";
const stallCount: number = 12;
const isOpen: boolean = true;
const goods: string[] = ["bread", "flowers", "cheese"];

type Stall = {
  name: string;
  open: boolean;
};

interface Notice {
  title: string;
  body: string;
}

function labelStall(stall: Stall): string {
  if (stall.open) {
    return stall.name + " is open";
  }
  return stall.name + " is closed";
}

const today: Stall = {
  name: stallName,
  open: isOpen,
};

const notice: Notice = {
  title: "Opening",
  body: labelStall(today),
};

console.log(notice.title);
console.log(notice.body);
console.log(goods.length);
console.log(stallCount);
`,
            explanation:
              "This file is valid TypeScript. The annotations and the Stall and Notice names are checks. After tsc, the emitted JavaScript keeps the values and the function, without the type labels.",
            lineNotes: [
              {
                focus: "string, number, and boolean",
                note: "Three annotations for the three value kinds from the JavaScript lessons. The quotes around a number would make it a string and fail the number annotation.",
              },
              {
                focus: "string array",
                note: "goods may only hold strings. length is still the count of elements, which is why the program prints 3.",
              },
              {
                focus: "type and interface",
                note: "Stall and Notice are two ways to name an object shape. Both disappear in the compiled JavaScript.",
              },
              {
                focus: "labelStall",
                note: "The parameter is a Stall and the return type is string. Both branches return a string.",
              },
            ],
            expectedOutput:
              "node notes.js prints four lines: Opening, Saturday market is open, 3, and 12.",
          },
          {
            title: "JavaScript after the types are erased",
            filename: "notes.js",
            language: "javascript",
            level: "basic",
            code: `const stallName = "Saturday market";
const stallCount = 12;
const isOpen = true;
const goods = ["bread", "flowers", "cheese"];
function labelStall(stall) {
    if (stall.open) {
        return stall.name + " is open";
    }
    return stall.name + " is closed";
}
const today = {
    name: stallName,
    open: isOpen,
};
const notice = {
    title: "Opening",
    body: labelStall(today),
};
console.log(notice.title);
console.log(notice.body);
console.log(goods.length);
console.log(stallCount);
`,
            explanation:
              "This is the sort of JavaScript tsc emits. Your spacing may differ. The point to notice is what is absent: no : string, no Stall, and no Notice. Node runs this file.",
            lineNotes: [
              {
                focus: "function labelStall(stall)",
                note: "The parameter type and the return type are gone. The if statement remains because it is runtime behaviour.",
              },
              {
                focus: "const notice",
                note: "The object is still built. The interface did not become a class or a function call.",
              },
            ],
            expectedOutput:
              "The same four console lines as the TypeScript file. The browser is not involved.",
          },
          {
            title: "A function that counts open stalls",
            filename: "count-open.ts",
            language: "typescript",
            level: "improved",
            code: `type Stall = {
  name: string;
  open: boolean;
};

function countOpen(stalls: Stall[]): number {
  let total = 0;
  for (let index = 0; index < stalls.length; index = index + 1) {
    const stall = stalls[index];
    if (stall !== undefined && stall.open) {
      total = total + 1;
    }
  }
  return total;
}

const board: Stall[] = [
  { name: "Bread", open: true },
  { name: "Flowers", open: false },
  { name: "Cheese", open: true },
];

console.log(countOpen(board));
`,
            explanation:
              "countOpen takes an array of Stall and returns a number. The loop is the same index loop you have used before. The undefined check keeps the file calm if a hole ever appears in the array.",
            lineNotes: [
              {
                focus: "Stall[]",
                note: "The parameter is a list of the named shape, not a single stall and not a list of strings.",
              },
              {
                focus: "return type number",
                note: "total is a count. Returning a sentence here would violate the return type.",
              },
            ],
            expectedOutput:
              "After compiling and running, the console prints 2, because bread and cheese are open and flowers are not.",
          },
        ],
        exercises: [
          {
            title: "Three annotations",
            difficulty: "warm-up",
            prompt:
              "In learning/week-11/types, add a new file that declares a market name, a stall count, and whether the gate is open. Give each one an annotation.",
            steps: [
              "Choose string, number, and boolean so each annotation matches the value.",
              "Compile with npx tsc.",
              "Write down one line the compiler accepted.",
            ],
            expectedOutcome:
              "The file compiles, and your notes show three annotations that agree with three values.",
          },
          {
            title: "A typed function",
            difficulty: "practice",
            prompt:
              "Write a function that takes a stall name and a price and returns one sentence. Annotate both parameters and the return type.",
            steps: [
              "Use string for the name, number for the price, and string for the return.",
              "Call the function with a real name and a real number.",
              "Compile. Then try swapping the arguments, read the error, and put them back.",
            ],
            expectedOutcome:
              "The repaired file compiles, and you have a copy of the error sentence from the swapped call.",
          },
          {
            title: "Name the object",
            difficulty: "stretch",
            prompt:
              "Replace an inline object type with either an interface or a type alias, and use that name on a variable and on a function parameter.",
            steps: [
              "Pick the fields name and open, or two fields of your own.",
              "Use the name in two places so the shape is not copied by hand.",
              "Compile and run the file.",
            ],
            expectedOutcome:
              "The compiler accepts the named shape, and the program prints a sentence that includes a field from the object.",
          },
        ],
        troubleshooting: [
          {
            problem: "node or npm is not recognised, or the shell says command not found.",
            why: "The terminal cannot see the Node install. It was opened before the installer finished, or the install did not add Node to the PATH.",
            solution:
              "Close the terminal, open a new one for your system, and run node -v. If it still fails, repeat only your system's install steps. Do not copy an apt command onto PowerShell.",
          },
          {
            problem: "tsc reports that a type is not assignable to another type.",
            why: "An annotation and a value disagree, or an argument does not match a parameter. The compiler is refusing to emit a lie.",
            solution:
              "Read the expected type and the found type in the error. Change the value or the annotation so they match. Do not insert the any type to hide the line.",
          },
          {
            problem: "npx tsc cannot find a config or the notes.js file never appears.",
            why: "The terminal is in the wrong folder, typescript is not installed there, or tsconfig.json has noEmit set.",
            solution:
              "pwd should end in learning/week-11/types. Run npm install typescript --save-dev in that folder. Run npx tsc --init if tsconfig.json is missing. If noEmit is true, set it to false for this exercise and run npx tsc again.",
          },
          {
            problem: "The compiled JavaScript prints undefined or joins a number onto a word in a surprising way.",
            why: "The types compiled, and the JavaScript ran. A logic slip can still be valid TypeScript. For example, adding a string and a number joins text.",
            solution:
              "Look at the expression that produced the line. Confirm quotes are only around text. Run node notes.js after the repair and compare the four expected lines from the worked example if you are using that file.",
          },
        ],
        knowledgeChecks: [
          {
            id: "w11-ts-what",
            format: "Multiple choice",
            question: "What is TypeScript, for this course?",
            options: [
              "A browser that replaces JavaScript.",
              "JavaScript plus types. A compiler checks the types and emits JavaScript.",
              "A Git host for repositories.",
              "A CSS layout mode.",
            ],
          },
          {
            id: "w11-ts-erased",
            format: "True or false",
            question: "Type annotations remain in the JavaScript file that tsc emits and are read by the browser as types.",
          },
          {
            id: "w11-ts-infer",
            format: "Multiple choice",
            question: "const openingHour = 8; What does inference decide?",
            options: [
              "openingHour is a string because variable names are text.",
              "openingHour is a number because the value 8 is a number.",
              "openingHour is a boolean.",
              "Inference refuses every variable that has no colon.",
            ],
          },
          {
            id: "w11-ts-shape",
            format: "Short answer",
            question:
              "Why give an object shape a name with an interface or a type alias instead of repeating the fields on every function?",
          },
        ],
        homework: {
          description:
            "Write a small TypeScript file in learning/week-11/types that compiles, then submit a lesson response with the function and one error you caused and fixed.",
          requirements: [
            "The file uses string, number, and boolean, plus either an array or an object.",
            "A function has parameter types and a return type, and npx tsc completes without errors after your repair.",
            "The response quotes one compiler error you produced on purpose and the change that removed it.",
          ],
          deliverables: [
            "A lesson response that includes the function source and the before-and-after of the error.",
          ],
          submission:
            "Paste the response into the lesson homework box. The React app belongs to the week assignment after the next session.",
          criteria: [
            "The function's types match the values it uses.",
            "The quoted error is a real type mismatch, and the repair agrees with that message.",
          ],
          submissionKind: "lesson_response",
        },
        summary: [
          "TypeScript is JavaScript plus types. tsc checks the file and emits JavaScript with the types removed.",
          "Annotations name string, number, boolean, arrays, and objects. Parameter and return types name what a function accepts and gives back.",
          "Inference fills in obvious types. Parameters and shared object shapes still deserve written types.",
          "An interface and a type alias are two ways to name an object shape. The name is a compile-time check, not a runtime object.",
        ],
        nextLesson: {
          title: "React components",
          lessonSlug: "react-components",
          why: "You can label values and compile them. Next you will use TypeScript inside React components and let Vite compile while a page is open.",
        },
      },
      guide: {
        sessionNumber: 21,
        week: 11,
        title: "Introduction to TypeScript",
        durationMinutes: 90,
        objectives: [
          "Students can say that TypeScript compiles to JavaScript and does not run in the browser by itself.",
          "Each student can show node -v on their own system.",
          "Each student compiles a file that uses a named object shape and a typed function.",
        ],
        tools: [
          "Node.js LTS and npm",
          "Visual Studio Code",
          "The folder learning/week-11/types",
        ],
        preparation: [
          "Install Node on the instructor machine and compile notes.ts once so you know the four console lines.",
          "Keep separate install notes for the Windows msi, the macOS pkg, and the Linux package commands. Do not project one install command for the whole room.",
          "Prepare a broken copy of notes.ts that assigns a string to stallCount so the class can read a real tsc error before you repair it.",
        ],
        flow: [
          {
            minutes: 5,
            title: "Boxes and labels",
            detail:
              "Start from JavaScript they trust: a string, a number, a boolean. Say the new tool is a checker, not a new browser. Write the sentence TypeScript is JavaScript plus types, and it compiles to JavaScript. Tell them the browser will not run the .ts file directly.",
          },
          {
            minutes: 15,
            title: "Annotations on the board",
            detail:
              "Write stallName, stallCount, and isOpen with annotations. Contrast \"12\" and 12. Add a string array and a Stall type. Show labelStall and circle the parameter type and the return type. Mention inference on const openingHour = 8 without letting the class skip parameter types.",
          },
          {
            minutes: 20,
            title: "Install Node by system",
            detail:
              "Walk Windows through the nodejs.org LTS msi and PATH checkbox, macOS through the pkg, and Linux through the distro-appropriate command. Everyone opens a new terminal and reads node -v and npm -v. Reject version numbers below 20 before the next lesson's Vite step.",
          },
          {
            minutes: 30,
            title: "Compile notes.ts",
            detail:
              "Students create learning/week-11/types, run npm init -y and npm install typescript --save-dev, then compile the worked file. They open notes.js and find a missing annotation. Then they break stallCount, read the error aloud, and repair it. Visit anyone who ran npm install in the wrong folder.",
          },
          {
            minutes: 10,
            title: "Name one shape",
            detail:
              "Ask the class why copying an object type into three functions is fragile. Students add either an interface or a type alias and use the name twice. Do not introduce React in this block.",
          },
          {
            minutes: 10,
            title: "Checks and the response",
            detail:
              "Ask the four knowledge checks. The short answer should be about a shared shape, not about uploading to GitHub. Homework is the lesson response: the function, a deliberate error, and the repair. Preview that Vite will compile TypeScript for a page next time.",
          },
        ],
        explain: [
          "Types are checked, then erased. Node runs the JavaScript.",
          "Quotes make strings. A number annotation will not accept a quoted number.",
          "Write types on parameters, returns, and shared shapes. Inference is for obvious locals.",
          "any switches the checker off. This class does not use it.",
        ],
        questions: [
          "What is left of an interface after tsc writes the JavaScript file?",
          "Why can const openingHour = 8 omit an annotation while a function parameter should not?",
          "What does the compiler say if you pass a boolean where a Stall is required?",
        ],
        demonstration:
          "Compile the market note, show notes.js without annotations, run node notes.js, then assign a string to stallCount and let the class read the error before you restore the number.",
        practice:
          "Students write their own three annotations and a function, force one argument-order error, and repair it. Stretch students name a Stall shape and use it in two places.",
        expectedOutcomes: [
          "node -v and npm -v succeed in a new terminal.",
          "A project in learning/week-11/types compiles with tsc.",
          "Students can point to a type that exists in the .ts file and not in the .js file.",
        ],
        difficulties: [
          {
            issue: "The student turns strict off or adds any so the error disappears.",
            help:
              "Put strict back on and delete any. Read the expected and found types with them. Change the value or the annotation. The homework requires the error text, so hiding it also hurts the submission.",
          },
          {
            issue: "npm install ran in the home folder and created a package.json there.",
            help:
              "Do not delete the home folder. Move the student into learning/week-11/types, run npm install there, and show them pwd. If a package.json appeared in the home directory, remove that stray file and the matching node_modules only after you confirm the path.",
          },
        ],
        homework:
          "Lesson response with a compiling function, one quoted tsc error, and the repair. The React components are not required until the next session's assignment.",
        assessment:
          "The checks cover the definition, erasure, inference of 8 as a number, and why a shape has a name. Look at one notes.js beside its notes.ts before students leave.",
        recap:
          "Ask one student to explain the storeroom labels without claiming the checker understands the market. End on the emitted JavaScript: the browser and Node still speak JavaScript.",
        knowledgeCheckAnswers: [
          {
            id: "w11-ts-what",
            answer: "JavaScript plus types. A compiler checks the types and emits JavaScript.",
            explanation:
              "TypeScript is not a browser, a Git host, or a CSS mode. The types are a check on top of JavaScript.",
          },
          {
            id: "w11-ts-erased",
            answer: "False",
            explanation:
              "The compiler removes annotations and interfaces from the emitted JavaScript. The browser does not read TypeScript types.",
          },
          {
            id: "w11-ts-infer",
            answer: "openingHour is a number because the value 8 is a number.",
            explanation:
              "Inference follows the expression. A name is not a string type. The absence of a colon does not make the line illegal.",
          },
          {
            id: "w11-ts-shape",
            answer:
              "One named shape keeps the fields the same everywhere. Repeating the fields lets two copies drift apart.",
            explanation:
              "Accept answers about reuse, readability, or a single place to change a field. The name is compile-time only.",
          },
        ],
      },
    },
    {
      slug: "react-components",
      sessionNumber: 22,
      title: "React components",
      estimatedMinutes: 90,
      difficulty: "Guided practice",
      requiresOs: true,
      content: {
        overview: {
          about:
            "This lesson introduces React as a library for user interfaces made of components. You will read JSX, start a React and TypeScript project with Vite, and build a header, a profile, and a footer. Vite compiles the TypeScript while the page is open.",
          why: "A page made only of querySelector calls gets harder as each click changes a different element. Components give each region of the page a function and a file.",
          alreadyKnow:
            "You can compile a TypeScript file, and you can change the DOM from a small JavaScript file.",
        },
        objectives: [
          "Describe a user interface and a React component in plain language.",
          "Read JSX as a description of elements that compiles to JavaScript.",
          "Create a Vite project with the React and TypeScript template.",
          "Find the files Vite generated and say what main.tsx and App.tsx are for.",
          "Show a header, a profile, and a footer on one page by composing components.",
        ],
        prerequisites: [
          {
            label: "TypeScript annotations and a successful tsc compile.",
            lessonSlug: "introduction-to-typescript",
          },
        ],
        teachingNotes: [
          {
            heading: "What React is and why it is used",
            markdown: `React is a JavaScript library for building user interfaces. A library is code someone else wrote that your project calls. You did this when you installed TypeScript with npm. React is another package. It is not a new language, and it is not a replacement for HTML in the browser. The browser still ends up with DOM elements.

A user interface is the part of a program a person sees and uses: headings, paragraphs, buttons, and forms. The market page, the counter, and the forms you already built are user interfaces. You built them by writing HTML and then finding elements with JavaScript.

Why does React exist if that already worked? Small scripts stay clear. A larger page, where many regions update, pushes you into a long list of \`querySelector\` calls and manual replacements. It is easy to forget one element, or to update a copy of the data and leave the page stale. React's approach is: describe the interface as a function of the current data. When the data changes, React calls your components again and updates the DOM it is responsible for. The next lesson is where that changing data, called state, becomes the focus. This lesson builds the pieces and gets them on the screen.

The problem React solves today is organisation. Header, profile, and footer are three regions. Each one can live in a function, in a file, with a name. The page is those functions composed together. You are not asked to stop knowing the DOM. React is a layer that creates and updates DOM elements for you.

A beginner misunderstanding is that React means you never write HTML again. You will write something that looks like HTML, inside JavaScript files. The browser still shows HTML elements. Another misunderstanding is that installing React uploads the site. \`npm run dev\` starts a local server on your computer. The page is for you, in this room, until you deliberately host it somewhere else. This lesson does not host it.

:::example Market stalls as functions
Think of the page as a row of stalls. The header stall always paints the sign. The profile stall paints the description. The footer stall paints the closing line. React is the market manager who asks each stall what it should show and then puts that on the board. Today the signs do not change after they are painted. Next time, a counter will change.
:::`,
          },
          {
            heading: "Components and reuse",
            markdown: `A component, in this course, is a function whose name starts with a capital letter and that returns the elements for one region of the page. \`Header\`, \`Profile\`, and \`Footer\` are components. \`header\` in lowercase would mean the HTML element, not your function. The capital letter is how JSX tells them apart.

Why a function? You already trust functions. They have a name, they can be called, and the body is the work. A component's work is to return the description of its region. Calling \`<Header />\` in another component is the call. The slash before the closing angle bracket means this component has no children nested inside the tag. You will see that form for Header, Profile, and Footer.

Reuse means one description can appear in more than one place, and one file is the place you edit. Even before a component takes input, \`Footer\` is reusable in this sense: every page that renders \`<Footer />\` gets the same footer, and a wording change happens in \`Footer.tsx\` only. You do not hunt through copies. The next lesson passes different names into a profile. Today the profile text can be fixed inside \`Profile\`. That is enough to learn the shape.

The problem a component solves is the copied chunk. If the footer sentence is pasted into three HTML files, three files can drift. A component is the single stall sign. Compose it where you need it.

How the tree fits together: \`App\` is the root component Vite renders. \`App\` returns a parent element that contains \`Header\`, a \`main\` area with \`Profile\`, and \`Footer\`. React starts at \`App\`, calls it, and calls each child component. The result is a tree of elements, related to the DOM tree you drew in the market lesson, but described by functions instead of only by a static HTML file.

A beginner misunderstanding is to call the component as \`Header()\` inside JSX instead of writing \`<Header />\`. You will sometimes call functions normally in event code later. In the returned description, components are written as tags. Another misunderstanding is a file that exports \`Header\` and a page that never mentions it. A component that is not rendered does not appear. Exporting is not the same as placing it on the page.

:::misunderstanding A component is a class you must extend
React once leaned on classes. The style in this course is functions. A function component is a function that returns elements. You do not need a class keyword for Header, Profile, or Footer.
:::`,
          },
          {
            heading: "JSX",
            markdown: `JSX is a syntax that lets you write element tags inside a JavaScript file. It is not HTML, even though it borrows the look. A build tool compiles JSX into ordinary JavaScript function calls. You do not write those calls by hand. You write the tags, and Vite compiles them.

Why JSX exists: describing a tree with nested function calls is hard to read. Tags show the nesting the way HTML did. The problem it solves is readability of the interface inside the same file as the TypeScript around it.

Rules that surprise people who know HTML:

1. A component returns one parent element. Wrap siblings in a \`div\` or a \`main\`. A fragment is allowed later. This week, use a \`div\` when you need a wrapper.
2. Close every tag. \`<p>Hello</p>\` is fine. An image is \`<img alt="Stall sign" />\` with the slash, because JSX does not allow a tag to stay open the way some HTML parsers do.
3. Use \`className\` for CSS classes. \`class\` is a reserved word in JavaScript. \`htmlFor\` is the JSX spelling of the HTML \`for\` attribute on a label.
4. Put JavaScript expressions in curly braces. \`<p>{stallCount}</p>\` prints the number. Quotes are for fixed text attributes. Braces are for values.
5. The component file uses the extension \`.tsx\` because it is TypeScript plus JSX. A \`.ts\` file will not accept the tags.

\`App.tsx\` can look like this:

\`\`\`tsx
export default function App() {
  return (
    <div>
      <Header />
      <main>
        <Profile />
      </main>
      <Footer />
    </div>
  );
}
\`\`\`

The parentheses after \`return\` let the tag start on the next line. Without them, JavaScript can return \`undefined\` and ignore the following lines. That bug looks like a blank page.

A beginner misunderstanding is to write a quoted string of HTML into \`innerHTML\`. JSX is not a string. It is syntax in the file. Another misunderstanding is to use \`class\` and then wonder why the stylesheet missed the element. In JSX, the prop is \`className\`.

:::warning Curly braces are JavaScript
Inside braces you can write an expression, such as a variable or a call. You do not write a second return, and you do not paste a whole second component definition there. Keep the expression small.
:::`,
          },
          {
            heading: "Vite, TypeScript, and the running app",
            markdown: `Vite is the tool that creates the project, serves it in development, and compiles TypeScript and JSX while you edit. Vite is not React. React is the library you render. Vite is the workshop around it. You can use Vite with other libraries. This course uses it with React and TypeScript because one template includes both.

Why a tool instead of opening an HTML file directly? JSX and TypeScript are not what the browser runs. Something must compile them, watch the files, and refresh the page. Vite's development server does that. You run \`npm run dev\`. It prints a local address, usually \`http://localhost:5173\`. You open that address in a browser. Leave the terminal running. If you close it, the server stops and the address stops responding.

The create command is the same on Windows PowerShell, macOS, and Linux. How you open the terminal is not. From \`learning/week-11\`:

\`\`\`text
npm create vite@latest profile-app -- --template react-ts
cd profile-app
npm install
npm run dev
\`\`\`

\`npm create vite@latest\` asks the Vite starter to build a project. \`profile-app\` is the folder name. \`--template react-ts\` selects React with TypeScript so you are not prompted to choose. If a prompt still appears, choose React, then TypeScript. \`npm install\` downloads React, Vite, and the TypeScript tooling into \`node_modules\`. \`npm run dev\` starts the server.

Node must already work. \`node -v\` should show v20 or newer before you create the app. If it does not, repeat the install from the previous lesson for your operating system. Do not use a different system's installer.

The first page Vite shows is a sample. You will replace the sample \`App\` contents with your header, profile, and footer. You usually leave \`index.html\` and \`src/main.tsx\` alone until you know why you are changing them.

A beginner misunderstanding is that \`npm install\` must be repeated before every edit. Run it after you create the project or when dependencies change. Saving a component does not require a new install. Another misunderstanding is to open \`index.html\` as a file in the browser and expect JSX to work. Use the localhost address the dev server printed.

:::tip One server, one folder
Run npm run dev inside profile-app, the folder that contains package.json for the app. A second dev server in another folder may take the next port, such as 5174. Read the URL in the terminal you actually started.
:::`,
          },
          {
            heading: "Project structure",
            markdown: `After create and install, \`learning/week-11/profile-app\` contains more files than a single HTML page. You do not memorise every config file. You need to know where your code goes.

\`package.json\` names the project and lists dependencies, including \`react\` and \`react-dom\`. The scripts section includes \`dev\`. \`npm run dev\` runs that script. \`package-lock.json\` records exact versions. You did not write it by hand.

\`index.html\` is the shell Vite serves. It contains an element with \`id="root"\` and a script tag that points at \`/src/main.tsx\`. The root element is the mount point. React will render the app inside it. This is the HTML file. It stays small on purpose.

\`tsconfig.json\` holds TypeScript settings for the app. Vite's template already enables the strictness you want. You do not turn checks off to hide a component error.

\`vite.config.ts\` configures Vite. Leave it as generated unless an instructor asks for a change.

\`src/main.tsx\` finds the root element and renders \`App\`. The template may use a non-null assertion, the \`!\` after \`getElementById("root")\`. That tells TypeScript you believe the element exists. A null check is the style from the DOM lessons and is also correct. Do not delete \`main.tsx\`.

\`src/App.tsx\` is the root component. This is the file you will edit most today. \`src/index.css\` and \`src/App.css\` are styles. Class names in JSX use \`className\`, and the CSS files still use the selectors you already know.

\`src/components/\` is a folder you create. Put \`Header.tsx\`, \`Profile.tsx\`, and \`Footer.tsx\` there. Imports use a relative path such as \`./components/Header\`. The filename and the import must agree, including capital letters, especially on Linux and macOS where the filesystem is case-sensitive.

\`node_modules\` is the downloaded packages. Do not edit files inside it, and do not commit it in a later Git exercise if a \`.gitignore\` already excludes it. If you delete it, \`npm install\` can recreate it.

:::misunderstanding Every file Vite generated is a component
Most of the files are configuration, the HTML shell, or the entry script. The components you write are App and the three regions. If a file does not return JSX, it is not one of today's components.
:::`,
          },
          {
            heading: "Header, profile, and footer",
            markdown: `Create three files and render them from \`App\`. Each file exports a function. \`App\` imports those functions and places them in the tree. The text can describe the Saturday market so the page belongs to the work you already know.

\`Header.tsx\` returns a \`header\` element with a small line and a heading. \`Profile.tsx\` returns a \`section\` with the stall description. \`Footer.tsx\` returns a \`footer\` with a short credit. None of these functions takes a parameter today. Fixed text is a complete component. The next lesson will pass the name in from outside.

Keep the markup boring and valid. Use headings in an order a page can defend: one \`h1\` in the header, an \`h2\` in the profile. Write real sentences. A region with only the word "header" does not show you whether the component rendered. A sentence you can read aloud does.

In \`App.tsx\`, import the three components and return them in order inside a \`div\`. Put \`Profile\` inside \`main\`. Import \`./App.css\` if the template does not already. Add a little CSS so header and footer have a background and padding. The colour is not the lesson. The visible separation proves three components rendered, not one blob of text.

Save, and look at the browser that is open to the dev server. Vite reloads. If the page is blank, look at the terminal that is running \`npm run dev\` and at the browser console. A missing import, a component that returns nothing, or a syntax error in JSX will show there. Fix the first error it names before you clean up wording.

A beginner misunderstanding is to edit the sample marketing page Vite generated and also create \`Header\`, then wonder which text is theirs. Replace the sample content. Your \`App\` should return your three components and not the template's logos and links. Another misunderstanding is to put all three regions in \`App.tsx\` and skip the files. The practice is the split. \`App\` composes. It does not contain every sentence.

When the three regions show, change only the footer sentence and save. The header and profile should stay put. That is the reuse point for this lesson: one file owns that sentence.

:::example What success looks like
The local page shows a sign, a stall description, and a closing line. View source is not the way to find your JSX. The DOM inspector shows header, main, and footer elements that React created. Your source of truth is the tsx files.
:::`,
          },
        ],
        vocabulary: [
          {
            term: "React",
            definition:
              "A JavaScript library for building user interfaces out of components. The browser still shows DOM elements.",
          },
          {
            term: "user interface",
            definition:
              "The part of a program a person sees and uses, such as headings, buttons, and forms.",
          },
          {
            term: "component",
            definition:
              "A function whose name starts with a capital letter and that returns the elements for one region of the page.",
          },
          {
            term: "JSX",
            definition:
              "Syntax that looks like HTML inside a TypeScript file. A tool compiles it to JavaScript. It is not a string of HTML.",
          },
          {
            term: "Vite",
            definition:
              "The tool that creates the project and serves it locally, compiling TypeScript and JSX while you edit.",
          },
          {
            term: "development server",
            definition:
              "The local process started by npm run dev. It serves the app at an address such as http://localhost:5173.",
          },
          {
            term: "compose",
            definition:
              "To build a page by rendering components inside other components, such as App rendering Header, Profile, and Footer.",
          },
        ],
        demonstrations: [
          {
            title: "Create the Vite project",
            intro:
              "From learning/week-11, create profile-app with the React TypeScript template, install dependencies, and open the dev server. The npm commands are the same. Opening the terminal is not.",
            steps: [
              "Run node -v. If Node is missing or older than v20, repeat the previous lesson's install for your system before you continue.",
              "Create or enter the folder learning/week-11. Run pwd.",
              "Run npm create vite@latest profile-app -- --template react-ts.",
              "cd profile-app and run npm install.",
              "Run npm run dev and leave that terminal open.",
              "Open the http://localhost address the terminal prints. Confirm the sample Vite page loads.",
              "Stop only if you need to rerun a command. Ctrl+C stops the server. Start it again with npm run dev.",
            ],
            expected:
              "The browser shows Vite's sample React page at a localhost address. The terminal stays busy serving the app and does not return to a normal prompt.",
            verify:
              "The address bar starts with http://localhost. package.json in profile-app lists react and a dev script. Closing the tab does not stop the server. Ctrl+C in the terminal does.",
            ifItFails:
              "If npm is not found, open a new terminal after installing Node. If create asks questions, choose React and TypeScript. If the port is in use, read the next URL Vite prints. If install ends with an error, confirm you are online and that pwd is learning/week-11 before the create command.",
            os: {
              sameOnAllPlatforms:
                "In learning/week-11, run npm create vite@latest profile-app -- --template react-ts, then cd profile-app, npm install, and npm run dev. Open the localhost URL from the terminal. Those commands match across systems.",
              identify: [
                "Check the Apple menu, the Windows logo, or the Linux about page before you open a terminal.",
                "Node's installer differed by system. The four npm commands do not.",
              ],
              windows: [
                "Open Windows PowerShell, cd into learning/week-11, and run pwd before the create command.",
                "After npm run dev prints a URL, open it in your browser. Use Ctrl+C in PowerShell when you need to stop the server.",
              ],
              macos: [
                "Open Terminal with Command-Space, cd into learning/week-11, and run pwd.",
                "Run the same npm commands. Open the printed URL in the browser. Ctrl+C stops the server in Terminal.",
              ],
              linux: [
                "Open Terminal, or press Ctrl+Alt+T on Ubuntu. cd into learning/week-11 and run pwd.",
                "Run the same npm commands. Open the printed URL. Ctrl+C stops the server. Do not prefix npm run dev with sudo.",
              ],
            },
          },
          {
            title: "Replace the sample with three components",
            intro:
              "Add Header, Profile, and Footer under src/components and render them from App. The files are the same on every system. Use your editor and the already running dev server.",
            steps: [
              "In profile-app/src, create a folder named components.",
              "Add Header.tsx, Profile.tsx, and Footer.tsx using the worked examples as the shape, with your own sentences.",
              "Replace the sample body of App.tsx so it imports the three components and returns them in order.",
              "Save all files. Watch the browser that is open to the dev server.",
              "In the DOM inspector, confirm a header, a main section, and a footer.",
              "Change only the footer sentence, save, and confirm the header text stayed the same.",
              "If the page is blank, read the first error in the terminal or the browser console and fix that line.",
            ],
            expected:
              "The sample logos and links are gone. The page shows your heading, your profile sentence, and your footer sentence, with styles separating the header and footer if you added them.",
            verify:
              "Search the page for a sentence that exists only in Profile.tsx. Then search App.tsx and confirm the sentence is not copied there. The import lines are what place the components.",
            ifItFails:
              "A cannot-find-module error means the import path or the filename does not match, including capital letters. A blank page often means App returns nothing or the dev server stopped. An error about class means you wrote class instead of className.",
            os: {
              sameOnAllPlatforms:
                "Component files and imports do not change between systems. Keep npm run dev running in profile-app while you edit. The browser talks to localhost, not to a different URL per system.",
              identify: [
                "If you are opening the project folder in the file manager, use the same system check as the earlier lessons.",
                "Case-sensitive filenames matter most on macOS and Linux. Match the import to the filename exactly on every system.",
              ],
              windows: [
                "Open the profile-app folder in Visual Studio Code from File Explorer or with File, then Open Folder.",
                "Use the PowerShell window that is already running npm run dev. Do not start a second copy unless the first one stopped.",
              ],
              macos: [
                "Open profile-app from Finder into Visual Studio Code. Edit the tsx files there.",
                "Leave the Terminal that ran npm run dev open. The browser refresh is triggered by saves, not by retyping the command.",
              ],
              linux: [
                "Open profile-app in Visual Studio Code from the Files app or the editor's open dialog.",
                "Keep the original Terminal session running the dev server. Read errors there before you start another npm run dev.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "Header component",
            filename: "src/components/Header.tsx",
            language: "tsx",
            level: "basic",
            code: `export function Header() {
  return (
    <header className="site-header">
      <p>Learning journal</p>
      <h1>Saturday market</h1>
    </header>
  );
}
`,
            explanation:
              "Header is a function component. It returns JSX. className is the JSX name for a CSS class. The function takes no parameters in this lesson.",
            lineNotes: [
              {
                focus: "export function Header",
                note: "The capital H makes this a component. The export lets App import it.",
              },
              {
                focus: "className",
                note: "The CSS file can target .site-header. The attribute class would be the wrong name in JSX.",
              },
            ],
            expectedOutput:
              "When App renders Header, the page shows the line Learning journal and the heading Saturday market inside a header element.",
          },
          {
            title: "Profile and footer",
            filename: "src/components/Profile.tsx",
            language: "tsx",
            level: "improved",
            code: `export function Profile() {
  return (
    <section className="profile">
      <h2>Stall profile</h2>
      <p>Bread, flowers, and cheese. The gate opens at 8:00.</p>
    </section>
  );
}
`,
            explanation:
              "Profile owns the description. Footer lives in its own file with the same pattern: a capitalised function, an export, and a returned element. The footer file is Footer.tsx and returns a footer element with one short sentence.",
            lineNotes: [
              {
                focus: "section and h2",
                note: "One region, one heading level under the page h1. The sentence is specific so you can tell this component rendered.",
              },
              {
                focus: "no parameters",
                note: "The text is inside the function. The next lesson will pass a name in from the parent instead of writing it here.",
              },
            ],
            expectedOutput:
              "The profile region shows the heading Stall profile and the sentence about bread, flowers, and cheese.",
          },
          {
            title: "App composes the page",
            filename: "src/App.tsx",
            language: "tsx",
            level: "practical",
            code: `import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Profile } from "./components/Profile";
import "./App.css";

export default function App() {
  return (
    <div>
      <Header />
      <main>
        <Profile />
      </main>
      <Footer />
    </div>
  );
}
`,
            explanation:
              "App is the root component. The default export matches the import in the Vite template's main.tsx. The three named imports match the named exports in the component files.",
            lineNotes: [
              {
                focus: "import lines",
                note: "The names in braces must match the exported function names. The paths start at src because App.tsx is in src.",
              },
              {
                focus: "return parentheses",
                note: "The parentheses keep the div attached to return. A line break without them can return undefined and render a blank page.",
              },
              {
                focus: "Header, Profile, Footer",
                note: "Each tag renders one component. The order here is the order on the page.",
              },
            ],
            expectedOutput:
              "The dev server shows the header, the profile inside main, and the footer. The Vite sample content is no longer the page.",
          },
        ],
        exercises: [
          {
            title: "Render only the header",
            difficulty: "warm-up",
            prompt:
              "Put Header on the page before you add the other two components, so you can see one import work.",
            steps: [
              "Create Header.tsx and export the function.",
              "Import it from App and render it.",
              "Save and read the heading in the browser.",
            ],
            expectedOutcome:
              "The browser shows the heading from Header.tsx, and the dev server has no error about a missing module.",
          },
          {
            title: "Three regions",
            difficulty: "practice",
            prompt:
              "Add Profile and Footer as separate files and compose them in App under the header.",
            steps: [
              "Give each region a sentence that appears only in that file.",
              "Put Profile inside main.",
              "Confirm all three sentences are visible and the sample Vite content is gone.",
            ],
            expectedOutcome:
              "The page shows three distinct sentences, and each sentence lives in its own component file.",
          },
          {
            title: "One-file edit",
            difficulty: "stretch",
            prompt:
              "Change the footer sentence without editing App.tsx or Header.tsx.",
            steps: [
              "Edit only Footer.tsx.",
              "Save and look at the browser.",
              "Write down which regions stayed the same.",
            ],
            expectedOutcome:
              "The footer text changes and the header and profile sentences stay as they were.",
          },
        ],
        troubleshooting: [
          {
            problem: "The browser says the localhost address refused to connect.",
            why: "The development server is not running. npm run dev was never started, or Ctrl+C stopped it.",
            solution:
              "In profile-app, run npm run dev again and open the URL that this run prints. Do not open index.html as a file and expect the same result.",
          },
          {
            problem: "Vite or TypeScript says it cannot find the module ./components/Header.",
            why: "The path, filename, or export name does not match the import. Capital letters count on macOS and Linux.",
            solution:
              "Compare the filename, the exported function name, and the import path. Header.tsx should export Header, and App should import that name from ./components/Header.",
          },
          {
            problem: "The page is blank and the terminal shows a syntax or JSX error.",
            why: "The component file does not parse, so React did not render App. A common cause is an unclosed tag, a missing parenthesis after return, or class instead of className.",
            solution:
              "Read the file and line in the first error. Close the tag, restore the parentheses around the returned div, and replace class with className. Save and let the dev server reload.",
          },
          {
            problem: "npm create vite fails because node is too old or npm is missing.",
            why: "Vite's current template expects a current Node. An old distro package can put a very old Node on the PATH.",
            solution:
              "Run node -v in a new terminal. If the command fails or the major version is below 20, repeat your operating system's Node install from the previous lesson and do not continue with the old binary.",
          },
        ],
        knowledgeChecks: [
          {
            id: "w11-react-what",
            format: "Multiple choice",
            question: "What is a component in this lesson?",
            options: [
              "A CSS file that replaces HTML.",
              "A capitalised function that returns elements for one region of the page.",
              "A Git commit that contains JSX.",
              "The node_modules folder.",
            ],
          },
          {
            id: "w11-react-jsx",
            format: "True or false",
            question: "In JSX, a CSS class is set with the class attribute, the same spelling as in an HTML file.",
          },
          {
            id: "w11-react-vite",
            format: "Multiple choice",
            question: "What does npm run dev do in the Vite project?",
            options: [
              "It uploads the site to GitHub.",
              "It starts a local development server that compiles TypeScript and JSX.",
              "It deletes the components folder.",
              "It runs git commit.",
            ],
          },
          {
            id: "w11-react-tree",
            format: "Short answer",
            question:
              "Why can a footer sentence change when you edit only Footer.tsx, and what would be wrong with pasting that sentence into App as well?",
          },
        ],
        homework: {
          description:
            "Finish the week assignment: the TypeScript exercises from the previous session, plus a React and TypeScript app that shows header, profile, and footer components.",
          requirements: [
            "The TypeScript file from learning/week-11/types compiles with tsc.",
            "learning/week-11/profile-app runs with npm run dev and shows Header, Profile, and Footer from separate files.",
            "App composes those components and does not duplicate their sentences.",
          ],
          deliverables: [
            "The module assignment: both folders, or a Git link if you pushed them, plus a note of the dev server URL you used.",
          ],
          submission:
            "Submit the week assignment. The short TypeScript response from the previous lesson can be copied into the assignment note. This session is the module assignment, not a second unrelated essay.",
          criteria: [
            "The three regions are visible in the running app and come from three component files.",
            "The TypeScript exercise uses annotations the compiler accepts.",
          ],
          submissionKind: "module_assignment",
        },
        summary: [
          "React builds a user interface from components. A component is a capitalised function that returns elements.",
          "JSX looks like HTML and compiles to JavaScript. Use className, close every tag, and return one parent.",
          "Vite's react-ts template installs the tools. npm run dev serves the app locally.",
          "App composes Header, Profile, and Footer. Each region's words live in that component's file.",
        ],
        nextLesson: {
          title: "Props, state, and events",
          lessonSlug: "props-state-events",
          why: "The header and profile are fixed sentences. Next you will pass information into a component and update a counter with state and a click.",
        },
      },
      guide: {
        sessionNumber: 22,
        week: 11,
        title: "React components",
        durationMinutes: 90,
        objectives: [
          "Students can separate React, JSX, and Vite in one sentence each.",
          "Each student has a react-ts app served on localhost.",
          "Header, Profile, and Footer are three files composed by App.",
        ],
        tools: [
          "Node.js from the previous session",
          "The Vite dev server",
          "Visual Studio Code and a browser",
        ],
        preparation: [
          "Create a finished profile-app on the instructor machine and run it once so the three regions are visible before class.",
          "Know the Ctrl+C stop and the exact create command, including the template flag, so you are not clicking through prompts under time pressure.",
          "Prepare a broken App that uses class and a missing import, so those two errors are ready if the class does not hit them naturally.",
        ],
        flow: [
          {
            minutes: 5,
            title: "Stalls on one board",
            detail:
              "Recall the DOM tree in one minute. Say React will describe regions as functions. Write three names: Header, Profile, Footer. Promise a localhost page, not a deployed site. Do not open useState today.",
          },
          {
            minutes: 15,
            title: "JSX rules on the board",
            detail:
              "Show one component with className, a closed tag, and a return wrapped in parentheses. Contrast Header the component with header the element. Show a bad class attribute and the kind of message it causes. Keep props as a teaser only.",
          },
          {
            minutes: 20,
            title: "Vite by terminal",
            detail:
              "Students check node -v, then run the shared create, install, and dev commands from learning/week-11. Walk the room for terminals opened in the wrong folder. Windows, macOS, and Linux use the same npm words. Help each person open the printed localhost URL.",
          },
          {
            minutes: 30,
            title: "Three files",
            detail:
              "Students add src/components and replace the sample App. Visit blank pages and read the first compiler line with the student. Require one unique sentence per file so copied sample text does not count. End this block with a footer-only edit.",
          },
          {
            minutes: 10,
            title: "Point at the folders",
            detail:
              "On a projector, name package.json, index.html, main.tsx, App.tsx, and node_modules in one pass. Students point at the mount id root. They do not rewrite vite.config.ts.",
          },
          {
            minutes: 10,
            title: "Checks and the assignment",
            detail:
              "Ask the four knowledge checks. The short answer must mention one owner file for the footer sentence. Homework is the module assignment: the compiling TypeScript file and this three-part app. Preview props as information passed in, not as new files.",
          },
        ],
        explain: [
          "React is the library. Vite is the local workshop. JSX is the syntax.",
          "A component that is not rendered in App will not appear.",
          "className, closed tags, and parentheses after return prevent the common blank pages.",
          "npm install is for dependencies. Saves after that reload through the running dev server.",
        ],
        questions: [
          "Why does the browser not open a .tsx file the way it opened a saved HTML file in week 9?",
          "What is the difference between exporting Footer and rendering Footer?",
          "Which file should change if only the closing sentence is wrong?",
        ],
        demonstration:
          "Start the dev server, show the sample page, replace App with the three components, and change only the footer so the class sees a single-file update.",
        practice:
          "Students build Header first, then Profile and Footer, then perform the one-file footer edit. Stretch students add a CSS class that makes the three regions visually separate.",
        expectedOutcomes: [
          "npm run dev is serving profile-app for each student.",
          "The page shows three student-written sentences from three files.",
          "Students can name the localhost URL and the App import that places Profile.",
        ],
        difficulties: [
          {
            issue: "The student opened index.html from the file manager and sees a blank page or raw script error.",
            help:
              "Close that tab. Return to the terminal, confirm npm run dev is running, and open the http://localhost URL. Explain that JSX needs the dev server.",
          },
          {
            issue: "Two components render and the third is missing, with no obvious error.",
            help:
              "Open App.tsx and check the tag, not only the import. Then open the component and check that it returns an element. A function that returns nothing renders nothing and may not throw.",
          },
        ],
        homework:
          "Module assignment combining the typed TypeScript file and the Vite app. The note should include the localhost URL they used and the three component filenames.",
        assessment:
          "Checks cover the definition of a component, className, the dev server, and why the footer has one owner file. Spot-check one running app before the room leaves.",
        recap:
          "Ask a student to point to the sign, the description, and the closing line and name the file for each. Say the sentences are still fixed inside the functions. Next session lets a parent pass a name in and lets a click change a number.",
        knowledgeCheckAnswers: [
          {
            id: "w11-react-what",
            answer: "A capitalised function that returns elements for one region of the page.",
            explanation:
              "Components are functions that return JSX. They are not CSS files, commits, or the dependencies folder.",
          },
          {
            id: "w11-react-jsx",
            answer: "False",
            explanation:
              "JSX uses className because class is reserved in JavaScript. The CSS file still uses a dot and the class name.",
          },
          {
            id: "w11-react-vite",
            answer: "It starts a local development server that compiles TypeScript and JSX.",
            explanation:
              "The server is local. It does not push to GitHub or commit. It does not delete source files.",
          },
          {
            id: "w11-react-tree",
            answer:
              "Footer.tsx is the only owner of that sentence, and App only renders the component. Pasting the sentence into App creates a second copy that can drift.",
            explanation:
              "Accept answers that say the component file is the single place to edit and that a pasted copy would get out of date.",
          },
        ],
      },
    },
  ],
  assignment: {
    slug: "week-11-assignment",
    title: "Typed notes and a three-part React page",
    summary:
      "Compile a small TypeScript exercise and ship a Vite React app with header, profile, and footer components.",
    instructions:
      "This assignment has two parts in learning/week-11. Part one is a TypeScript file in learning/week-11/types. It must declare a string, a number, and a boolean with annotations, plus an array or an object. It must include a function with parameter types and a return type, and a named shape using either an interface or a type alias. npx tsc must finish with no errors. In a short note, quote one type error you produced and the change that fixed it. Part two is a Vite project at learning/week-11/profile-app created with the react-ts template. Replace the sample screen with three components in separate files: Header, Profile, and Footer. App must import them and render Header, then Profile inside main, then Footer. Each component owns its own sentence. Use className if you add a class. npm run dev must show those three regions in the browser at the localhost address Vite prints. Do not turn TypeScript checks off to hide an error. Do not submit node_modules. Write the note with the folder paths, the function signature, the three component filenames, and the localhost URL you opened.",
    objectives: [
      "Use TypeScript annotations, a function signature, and a named object shape.",
      "Create a React and TypeScript app with Vite.",
      "Compose a page from header, profile, and footer components.",
    ],
    requirements: [
      "The TypeScript file compiles with npx tsc and uses string, number, boolean, a function, and a named shape.",
      "The note includes a real compiler error and the repair.",
      "profile-app was created with the React TypeScript template and starts with npm run dev.",
      "Header, Profile, and Footer are separate files rendered by App in that order.",
      "The visible sentences are not the Vite sample text.",
    ],
    deliverables: [
      "learning/week-11/types and learning/week-11/profile-app, without node_modules.",
      "A note with paths, the type error and repair, the component filenames, and the dev server URL.",
    ],
    rubric: [
      {
        criterion: "TypeScript file",
        points: 30,
        description: "Annotations, a typed function, and a named shape compile under tsc.",
      },
      {
        criterion: "Error note",
        points: 15,
        description: "The quoted compiler message matches a real mismatch and a real repair.",
      },
      {
        criterion: "Running app",
        points: 25,
        description: "The Vite dev server shows the student's page rather than the untouched sample.",
      },
      {
        criterion: "Three components",
        points: 30,
        description: "Header, Profile, and Footer are separate, composed by App, and each owns its sentence.",
      },
    ],
    points: 100,
    instructorSolution: `// learning/week-11/types/notes.ts
const stallName: string = "Saturday market";
const stallCount: number = 12;
const isOpen: boolean = true;
const goods: string[] = ["bread", "flowers", "cheese"];

type Stall = {
  name: string;
  open: boolean;
};

function labelStall(stall: Stall): string {
  if (stall.open) {
    return stall.name + " is open";
  }
  return stall.name + " is closed";
}

const today: Stall = { name: stallName, open: isOpen };
console.log(labelStall(today));
console.log(goods.length);
console.log(stallCount);

// A deliberate error is const stallCount: number = "12";
// tsc says a string is not assignable to a number. The repair removes the quotes.

// src/components/Header.tsx
export function Header() {
  return (
    <header className="site-header">
      <p>Learning journal</p>
      <h1>Saturday market</h1>
    </header>
  );
}

// src/components/Profile.tsx
export function Profile() {
  return (
    <section>
      <h2>Stall profile</h2>
      <p>Bread, flowers, and cheese.</p>
    </section>
  );
}

// src/components/Footer.tsx
export function Footer() {
  return (
    <footer>
      <p>Course practice page.</p>
    </footer>
  );
}

// src/App.tsx
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Profile } from "./components/Profile";

export default function App() {
  return (
    <div>
      <Header />
      <main>
        <Profile />
      </main>
      <Footer />
    </div>
  );
}
`,
  },
  quiz: {
    slug: "week-11-quiz",
    title: "TypeScript and React quiz",
    passingScore: 70,
    allowRetakes: true,
    questions: [
      {
        slug: "week-11-q1",
        type: "multiple_choice",
        prompt: "What does the TypeScript compiler do with a valid .ts file?",
        options: [
          { id: "a", text: "It runs the file in the browser with the type annotations still attached." },
          { id: "b", text: "It checks the types and emits JavaScript with the type annotations removed." },
          { id: "c", text: "It uploads the file to GitHub." },
          { id: "d", text: "It converts the file into a CSS stylesheet." },
        ],
        correct: { optionId: "b" },
        explanation:
          "tsc checks the labels and writes JavaScript. Node or the browser runs that JavaScript. The annotations are not kept as runtime types.",
        points: 2,
      },
      {
        slug: "week-11-q2",
        type: "true_false",
        prompt: "const price: number = \"12\"; is valid TypeScript because the digits are numeric.",
        correct: { value: false },
        explanation:
          "Quotes make a string. A number annotation requires a numeric value such as 12. The compiler rejects the quoted form.",
        points: 2,
      },
      {
        slug: "week-11-q3",
        type: "multiple_choice",
        prompt: "Why annotate a function parameter even when inference exists?",
        options: [
          { id: "a", text: "Parameters have no value inside the function for inference to read, and the caller must be checked." },
          { id: "b", text: "Inference was removed from TypeScript." },
          { id: "c", text: "A parameter annotation is copied into the HTML file." },
          { id: "d", text: "Annotations make git commit run." },
        ],
        correct: { optionId: "a" },
        explanation:
          "Inference works from an expression, such as the 8 on the right of a const. A parameter's value arrives later from the caller, so you write the type.",
        points: 2,
      },
      {
        slug: "week-11-q4",
        type: "code_reading",
        prompt: "What does this component render?",
        codeSnippet: `export function Footer() {
  return (
    <footer>
      <p>See you next market day.</p>
    </footer>
  );
}`,
        options: [
          { id: "a", text: "A footer element whose paragraph says See you next market day." },
          { id: "b", text: "A Git commit message." },
          { id: "c", text: "A type alias named footer." },
          { id: "d", text: "Nothing, because the function is not a class." },
        ],
        correct: { optionId: "a" },
        explanation:
          "Footer is a function component. The returned JSX describes a footer element and a paragraph. It still has to be rendered by another component to show on the page.",
        points: 2,
      },
      {
        slug: "week-11-q5",
        type: "true_false",
        prompt: "An interface creates a runtime object you can log, similar to calling a function.",
        correct: { value: false },
        explanation:
          "An interface names a shape for the checker. It is erased when TypeScript compiles. Logging works on values you create, not on the interface itself.",
        points: 2,
      },
      {
        slug: "week-11-q6",
        type: "multiple_choice",
        prompt: "Which command starts the local React development server in a Vite project?",
        options: [
          { id: "a", text: "git push" },
          { id: "b", text: "npm run dev" },
          { id: "c", text: "git init" },
          { id: "d", text: "Opening index.html with a double-click, with no server." },
        ],
        correct: { optionId: "b" },
        explanation:
          "npm run dev starts Vite's local server and compiles JSX and TypeScript. A double-clicked index.html does not provide that compile step.",
        points: 2,
      },
      {
        slug: "week-11-q7",
        type: "short_answer",
        prompt:
          "A page shows the Vite sample instead of the student's footer. What is a likely cause, and which file should they change so Footer appears?",
        correct: {
          rubric:
            "Award full points if the answer says App still renders the sample or does not render Footer, and that App.tsx should import and render the Footer component. Award partial points for only naming the file or only naming the missing render.",
        },
        explanation:
          "Creating Footer.tsx does not place it on the page. App, the root component, has to import it and include the Footer tag, replacing the template sample.",
        points: 3,
      },
      {
        slug: "week-11-q8",
        type: "multiple_choice",
        prompt: "Which JSX is the one this course uses for a CSS class?",
        options: [
          { id: "a", text: "<p class=\"notice\">Open</p>" },
          { id: "b", text: "<p className=\"notice\">Open</p>" },
          { id: "c", text: "<p css=\"notice\">Open</p>" },
          { id: "d", text: "<p type=\"notice\">Open</p>" },
        ],
        correct: { optionId: "b" },
        explanation:
          "JSX uses className. The stylesheet still contains .notice. The HTML spelling class is not the prop name in a component file.",
        points: 2,
      },
      {
        slug: "week-11-q9",
        type: "multiple_choice",
        prompt: "Where should Header.tsx, Profile.tsx, and Footer.tsx live in the Vite app from this lesson?",
        options: [
          { id: "a", text: "Inside node_modules, so npm can serve them." },
          { id: "b", text: "In src/components, imported by App.tsx." },
          { id: "c", text: "In the .git folder." },
          { id: "d", text: "Only on GitHub, not in the local project." },
        ],
        correct: { optionId: "b" },
        explanation:
          "Course components belong in source files under src. node_modules is for installed packages. App imports the components so they render.",
        points: 2,
      },
    ],
  },
};
