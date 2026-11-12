import type { ModuleSeed } from "../../src/lib/content-types";

function c(text: string) {
  return "`" + text + "`";
}

function fence(language: string, code: string) {
  return "```" + language + "\n" + code.trim() + "\n```";
}

const firstScriptCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>First script</title>
</head>
<body>
  <h1>Saturday market</h1>
  <p>The useful messages from this lesson appear in the console, not in this paragraph.</p>
  <script>
    // A comment is a note for a person. The browser skips it.
    console.log("The page script ran.");
    console.log("Bread stall opens at eight.");
  </script>
</body>
</html>`;

const calculatorCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Shopping total</title>
</head>
<body>
  <h1>Corner shop</h1>
  <p>Open the console to read the totals.</p>
  <script>
    const breadPrice = 3;
    const breadCount = 2;
    const milkPrice = 1.5;
    const milkCount = 2;
    const breadTotal = breadPrice * breadCount;
    const milkTotal = milkPrice * milkCount;
    const shoppingTotal = breadTotal + milkTotal;

    console.log("Bread line: " + breadTotal);
    console.log("Milk line: " + milkTotal);
    console.log(\`Shopping total: \${shoppingTotal}\`);
    console.log(typeof shoppingTotal);
  </script>
</body>
</html>`;

export const week06: ModuleSeed = {
  slug: "week-06-javascript",
  number: 6,
  weekNumber: 6,
  monthLabel: "Month 2 — CSS layout, JavaScript and problem solving",
  title: "Introduction to JavaScript",
  description:
    "This week you write instructions a browser can follow. You learn what programming is, how JavaScript sits beside HTML and CSS, and how to print values in the console. Then you store text, numbers, and true-or-false values, and you calculate a shopping total.",
  lessons: [
    {
      slug: "programming-and-javascript",
      sessionNumber: 11,
      title: "Programming and JavaScript",
      estimatedMinutes: 90,
      difficulty: "Gentle introduction",
      requiresOs: true,
      content: {
        overview: {
          about:
            "This lesson introduces programming and the language JavaScript. You will learn what a program is, how JavaScript works with the HTML and CSS you already write, and how to run a first statement. You will use the browser console to see messages and errors, and you will save a small script in an HTML file.",
          why:
            "Layout can place words on a page, but it cannot add prices or choose a message. JavaScript is how this course will ask the browser to calculate and to report a result you can check.",
          alreadyKnow:
            "You can build a page with HTML regions and style it with CSS. You can open a file in a browser and find developer tools.",
        },
        objectives: [
          "Explain what programming means and what a programming language is for.",
          "Describe what JavaScript adds beside HTML structure and CSS presentation.",
          "Write a statement, a console.log call, and a comment with valid syntax.",
          "Open the browser console on your system and read a message your script printed.",
          "Recognise a syntax error in the console and correct the line that caused it.",
        ],
        prerequisites: [
          {
            label:
              "You can structure a page with HTML elements such as headings, paragraphs, and sections.",
            lessonSlug: "semantic-html",
          },
          {
            label:
              "You can connect CSS so the page has colour, type, and layout that you control.",
            lessonSlug: "introduction-to-css",
          },
        ],
        teachingNotes: [
          {
            heading: "What programming means",
            markdown: [
              `Programming means writing instructions that a computer can follow. A program is those instructions saved so they can run again, with the same steps, without you retyping them. People already give instructions all day. A recipe says to heat the pan, then add the onions, then wait until they soften. A bus timetable says which stop comes next. The difference with a computer is how little it will guess. If the recipe says "salt" and does not say how much, a cook may decide. If a program is missing a piece it needs, it stops, or it does something you did not intend. That strictness feels rude at first. It is also what makes a result repeatable. Two plus two should not depend on the computer's mood.`,
              `Think of texting a friend who will follow your directions to a market and will not fill in gaps. "Turn left after the bakery" works if there is one bakery. "Turn left after the bakery" fails if the friend is already past it, or if there are two bakeries. You would rewrite the message to be exact: "From the bus stop, walk one block, then turn left." A program is that kind of message. The computer is the friend who follows it literally. When the result is wrong, the useful question is not "why is the computer being difficult?" The useful question is "which instruction was unclear, missing, or out of order?"`,
              `A single instruction inside a program is often called a statement. ${c('console.log("The page script ran.");')} is one statement. It asks the browser to write a message to the console. You will meet the console later in this lesson. For now, notice the shape: a name, a pair of parentheses, a value inside them, and a semicolon at the end. That whole line is one action. A program for this week is a short list of such actions. Later weeks add decisions and repetition. The idea stays the same: each line is an instruction, and the order is part of the meaning.`,
              `:::example A shopping note as instructions
"Remember the bread" is a wish. "Write down bread, then write down the number 2, then multiply 2 by 3" is a procedure. Programming starts when you can list the procedure so a machine can carry it out the same way tomorrow morning.
:::`,
              `You do not need to enjoy puzzles to do this work. You need patience with exact writing, the same patience you used when a missing CSS brace made a whole layout disappear. Programming rewards people who read an error, change one thing, and try again. It does not require you to memorise the entire language before you type the first line. This lesson is that first line, plus enough surrounding sense that the line is not magic.`,
            ].join("\n\n"),
          },
          {
            heading: "Programming languages",
            markdown: [
              `People and computers do not share a native language. A programming language is a set of rules for writing instructions so a computer can carry them out. The rules cover vocabulary and grammar. In JavaScript the vocabulary includes words such as ${c("const")}, ${c("let")}, and ${c("if")}. The grammar says a text value needs quotes, a function call needs parentheses, and a statement in this course ends with a semicolon. Break the grammar and the computer does not "mostly understand." It reports a syntax error and refuses to run that script.`,
              `There are many programming languages because there are many kinds of work. Python is common in data and teaching. Java and C# are common in large applications. SQL, which you may meet much later in this course, is for asking questions of a database. JavaScript began as a language for web pages in the browser. It is still the language browsers run. That is the practical reason this course uses it. You already build pages with HTML and CSS. JavaScript can live in those pages and use the same files. You are not being asked to pick a language for a career. You are learning one language well enough to make a page calculate.`,
              `Languages look different and share ideas. A name that stores a value, a yes-or-no question, a repeated action, and a reusable block of instructions appear in almost every language. If you learn those ideas in JavaScript, you are learning programming, not only a list of JavaScript spellings. When a later example shows another language, you will still recognise "this line stores a number" even when the punctuation changes. Do not try to learn a second language this week. Use the comparison only to see that JavaScript is one member of a family, not a private trick of one browser company.`,
              `:::misunderstanding There is a single best language
A language is a tool matched to a place. JavaScript is the right tool here because the browser already speaks it. Another course, another task, might choose a different language for a clear reason. Switching languages every week would hide the ideas under new spellings.
:::`,
              `You will also hear the words code, source, and script. Code and source mean the text you write. A script, in the browser, usually means JavaScript connected to a page. "Coding" is an informal word for programming. This course will say programming when we mean the activity, and JavaScript when we mean the language. The file you save is plain text. It is not a special binary you cannot read. That is why a normal editor such as Visual Studio Code is enough.`,
            ].join("\n\n"),
          },
          {
            heading: "How JavaScript works with HTML and CSS",
            markdown: [
              `A page you have built so far has two layers. HTML is the structure: headings, paragraphs, links, images, and regions such as header and main. CSS is the presentation: colour, type, spacing, Flexbox, and Grid. JavaScript is a third layer. It is behaviour. Behaviour means actions in time: calculate a total, decide which message to show, react when someone clicks. This week the behaviour is modest on purpose. The script will write messages to the console. The page can stay almost still. You are learning the language before you learn to rebuild the page with it. Changing the page itself comes in a later week, after you can trust a value.`,
              `The browser reads the HTML, builds the page, applies the CSS, and runs JavaScript when it reaches a script. You connect JavaScript with a script element. For this course, put the script element at the end of the body, after the content.`,
              fence(
                "html",
                `
<body>
  <h1>Saturday market</h1>
  <script>
    console.log("The page script ran.");
  </script>
</body>
`,
              ),
              `The script element is HTML. The text inside it is JavaScript. Mixing up those two grammars is a common early stumble. An HTML comment uses \`<!-- -->\`. A JavaScript comment does not. A CSS rule does not belong inside the script, and a JavaScript statement does not belong inside a style element. Three languages, three places. When a page is wrong, first ask which language you meant to write.`,
              `Why the end of the body? The browser reads from the top. If a later lesson asks the script to find a heading, the heading must already have been read. A console message does not need the heading, so a script in the head would still print. Putting the script at the end is a habit that stays valid when you do need the page. We will use that habit now so you do not have to unlearn it.`,
              `HTML and CSS still matter. A calculator page with no heading is legal and unkind. Use a heading that says what the page is. You do not need a new layout system this week. A simple document is easier to debug than a page that is also fighting a grid. If the console is empty, the problem is probably the script, not the Flexbox. If the heading is the wrong colour, the problem is still CSS. Keep the layers separate in your mind while they share one file.`,
              `:::warning The console is not the page
console.log writes to the developer tools console. It does not type text into the paragraph on the page. If the page looks unchanged, that can be success. Open the console before you decide the script failed.
:::`,
            ].join("\n\n"),
          },
          {
            heading: "Statements, syntax, and comments",
            markdown: [
              `Syntax means the grammar of the language: which symbols must appear, and in what order. ${c('console.log("Bread");')} follows the grammar. ${c("console.log(")} does not, because the quote and the parentheses never close. The browser's response to bad grammar is a syntax error. It names a line. That line is the first place to look, though the real mistake is sometimes the line above, where a quote was opened and never finished. Read the message. It is not decoration. It is the computer showing you where it got lost.`,
              `A statement is one instruction. This course puts one statement on a line and ends it with a semicolon. JavaScript can sometimes guess where a statement ends, at a line break. Guessing is a poor partner while you are new. A semicolon is visible. It says "this instruction is finished." Two statements on one line without a semicolon between them can be read as one broken instruction. Keep the habit: one action, one line, one semicolon.`,
              fence(
                "js",
                `
console.log("The page script ran.");
console.log("Bread stall opens at eight.");
`,
              ),
              `Call ${c("console.log")} a function call. ${c("console")} is an object the browser provides. ${c("log")} is an action on it. The parentheses hold the value you want to print. The quotes make that value a string, which means text. Without quotes, the browser would look for a name, not print the word. ${c("console.log(Bread)")} looks for a variable named Bread. ${c('console.log("Bread")')} prints the word Bread. You will study variables in the next lesson. The quote rule matters today.`,
              `Comments are notes the language skips. They are for you, for a classmate, and for your future self on Thursday. A line comment starts with ${c("//")} and runs to the end of the line. A block comment starts with ${c("/*")} and ends with ${c("*/")}. Use line comments for this week. Write why, not a repeat of the obvious action.`,
              fence(
                "js",
                `
// Show that the script element was reached.
console.log("The page script ran.");
`,
              ),
              `A comment that says ${c('// log hello')} next to a log of hello adds nothing. A comment that says ${c("// Prices are in whole currency units.")} tells a reader a decision they cannot see from the numbers alone. Comments are not a place to store code you hope might run. If the text is inside a comment, it will not run. When a script is silent, check that you did not comment out the call.`,
              `Case matters. ${c("console.log")} is not ${c("Console.Log")}. The language is case-sensitive. Spaces matter in the wrong places. ${c("console . log")} may still run, but a space inside a name, such as ${c("console log")}, will not. Type the names as they are given. Autocomplete in the editor helps. It is not a substitute for reading the red error if you ignore it.`,
              `:::misunderstanding The computer understands what I meant
A missing parenthesis is not a style nit. The script stops. Fix the grammar the message points at, reload, and see the next message. Do not add three new lines before the first line runs.
:::`,
            ].join("\n\n"),
          },
          {
            heading: "Developer tools and the console",
            markdown: [
              `Developer tools are a panel built into the browser for people writing pages. You already used a device toolbar to test widths. The console is another tab in that panel. It does two jobs for us this week. It shows what ${c("console.log")} prints. It shows errors in red, with a file name and a line number. It can also accept a statement you type by hand. You press Enter, and the browser runs that one line. That is a fast way to ask "what does this do?" before you save it in a file.`,
              `Opening the tools depends on your system. On Windows and on many Linux desktops, F12 opens them, and Ctrl+Shift+I is a second path. On macOS, Command+Option+I is the usual shortcut. If a shortcut does nothing, use the browser menu. Look for More tools, Developer tools, or a Develop menu. Then choose the Console tab. A blinking cursor means you can type. If you only see a list of old warnings from another site, look at the top of the console for a clear control, or open your own HTML file first so you are not debugging someone else's page.`,
              `Type ${c("2 + 2")} and press Enter. You should see ${c("4")}. Type ${c('console.log("Hello")')} and press Enter. You should see Hello. Typing in the console does not save the instruction. Reload the page and that typed line is gone. That is useful for experiments and useless for homework. Homework belongs in the script element, in a file, so it exists tomorrow. Use the console to experiment, then copy the statement that worked into the file.`,
              `The console also shows the difference between a value and a printed line. When you type ${c("2 + 2")}, the console displays the result of the expression. When your file runs ${c("console.log")}, you see the logged message. Some browsers also show a small note that the result of ${c("console.log")} is ${c("undefined")}, because log's action is to print, and it does not hand back a sentence. Do not chase that undefined yet. If you saw your message, the call worked. The next lesson explains undefined as a value.`,
              `:::tip One change, then reload
Edit one statement, save, and reload the page. A console that still shows yesterday's message may be a tab on the wrong file. Look at the address bar. It should be your learning/week-06 file, not a search page.
:::`,
              `Errors are part of the tool, not a verdict on you. A red SyntaxError means the grammar failed before the script could run. Click the line number if the browser offers it. It often jumps to the editor only if the tools are linked to your editor; otherwise it still tells you the line in the file. Fix that line. Reload. If a second error appears, that is progress. The first error was hiding it. Read the top error first. Later errors are often echoes.`,
              `You can filter the console noise. Browser extensions sometimes print their own warnings on every page. Those warnings are not your assignment. A message that names your file, such as first-script.html, is yours. A message about a missing favicon is the browser wishing you had a tiny icon. It is not the reason your log failed. Learn to read the line that mentions your script. Ignore the rest until the script is quiet and correct.`,
            ].join("\n\n"),
          },
          {
            heading: "A first script you can keep",
            markdown: [
              `The practice for this lesson is output in the console, from a file you can reopen. Create the folder learning/week-06. Create learning/week-06/first-script.html. Give the page a heading so a person can see they opened the right file. Put a script at the end of the body. Inside it, write a comment that says what the page is for, then two console.log statements with different messages. Save. Open the file in the browser. Open the console. You should see both messages, in the same order as the file. Order is part of the program. The browser runs the first statement, then the second.`,
              `Then break it on purpose, once, so the error becomes familiar while the stakes are low. Delete the closing quote on one string. Save and reload. Read the red message. Put the quote back. Reload. The messages should return. That loop — break, read, repair — is the whole rhythm of programming. You are not expected to type perfectly. You are expected to notice the console and respond to it.`,
              `A second experiment belongs in the console, not in the file. Type ${c('"Market"')} with quotes and press Enter. Type ${c("2 + 2")}. Type a name with no quotes, such as ${c("breadPrice")}. The last one should produce a ReferenceError if you have not created that name. The error means "I do not know that name." It is not a syntax error. The grammar was fine. The name had no meaning yet. The next lesson creates names. Seeing the error today makes that lesson feel like a solution rather than a new vocabulary list.`,
              `Keep HTML, CSS, and JavaScript in their places even in this small file. You may add a style element if you want a colour you can recognise, but do not spend the session on layout. The success test is the console, not the paint. When both logs appear, write down the exact messages and the path learning/week-06/first-script.html. That note is the start of your lesson response.`,
              `:::example What success looks like
The page shows a heading. The console shows two lines from your script, in order, with no red SyntaxError. A typed 2 + 2 shows 4. You can point to the script element and to the console and say which one stores the program and which one shows the result.
:::`,
              `If you feel unsteady, that matches the size of the jump. You moved from describing a page to instructing a machine. The instructions are still tiny. The next lesson fills the script with named values and arithmetic, and the week assignment turns that into a shopping total. Nothing in that assignment requires a click or a changing page. It requires clear statements, and a console you know how to open on your own computer.`,
            ].join("\n\n"),
          },
        ],
        vocabulary: [
          {
            term: "Program",
            definition:
              "A saved list of instructions a computer can follow again, in order, without someone retyping the steps.",
          },
          {
            term: "Programming language",
            definition:
              "A set of vocabulary and grammar rules for writing those instructions so a computer can carry them out.",
          },
          {
            term: "JavaScript",
            definition:
              "The programming language browsers run. In this course it adds behaviour beside HTML structure and CSS presentation.",
          },
          {
            term: "Statement",
            definition:
              "One instruction in a program. In this course, a statement usually sits on its own line and ends with a semicolon.",
          },
          {
            term: "Syntax",
            definition:
              "The grammar of a language: quotes, parentheses, names, and punctuation in the order the language requires.",
          },
          {
            term: "Comment",
            definition:
              "A note inside the program that the computer skips. Line comments in JavaScript start with two slashes.",
          },
          {
            term: "Console",
            definition:
              "The panel in the browser's developer tools where log messages and errors appear, and where you can run one line by hand.",
          },
        ],
        demonstrations: [
          {
            title: "Print two messages from a saved script",
            intro:
              "You will create an HTML file with a script element, print two lines to the console, read them, then trigger one syntax error and repair it. The JavaScript is the same on every operating system. Opening the terminal, the file, and the developer tools is not.",
            steps: [
              "Create the folder learning/week-06 with the terminal steps for your system, and open that folder in Visual Studio Code.",
              "Create learning/week-06/first-script.html with a heading that says Saturday market and a short paragraph.",
              "At the end of the body, add a script element. Inside it, write a line comment, then console.log of the sentence The page script ran.",
              "Add a second console.log with a different sentence, such as Bread stall opens at eight. End each statement with a semicolon.",
              "Save the file. Open it in your browser using the file-manager or terminal command for your system.",
              "Open developer tools with the steps for your system and select the Console tab. Confirm both messages appear in order.",
              "In the console, type 2 + 2 and press Enter. You should see 4. That line is an experiment. It is not saved in the file.",
              "Delete the closing quote on the second log, save, and reload. Read the red syntax error and the line number. Restore the quote, reload, and confirm the red error is gone.",
            ],
            expected:
              "The page shows the Saturday market heading. The console shows the two logged sentences in the same order as the file, then 4 from your typed sum. After the quote is restored, reload leaves no syntax error from your script.",
            verify:
              "The address bar should point at your first-script.html file. Each log line should mention that file, not an extension shop. Zoom and layout do not matter here. The test is the console text and the absence of a red SyntaxError after the repair.",
            ifItFails:
              "If the console is blank, the script may be above a broken HTML tag, commented out, or you may be looking at the Elements tab instead of Console. If you see a ReferenceError, you left the quotes off and the browser treated your words as a name. If the tools will not open, use the browser menu path for your system rather than repeating the same key.",
            os: {
              sameOnAllPlatforms:
                "The HTML, the script, console.log, and the sum 2 + 2 are the same on Windows, macOS, and Linux. Save and reload the same way everywhere. You are not installing a programming language for this lesson. The browser already runs JavaScript. The steps that differ are how you open the terminal, how you open the HTML file, and how you open developer tools.",
              identify: [
                "Windows usually shows a Start button and a taskbar. macOS shows an Apple menu at the top left and a Dock. Linux often shows Activities or a menu named for the distribution, such as Ubuntu.",
                "If you cannot tell which system you have, ask the instructor before you follow a shortcut. The script does not change. The keys that open the console do.",
              ],
              windows: [
                "Press the Windows key, type Command Prompt, and press Enter. Run mkdir learning\\week-06 and then cd learning\\week-06.",
                "After you save first-script.html, run start first-script.html from that folder to open it in the default browser. File Explorer can open the same file if you prefer the mouse.",
                "Press F12. If nothing happens, press Ctrl+Shift+I. Select Console. The prompt at the bottom is where you type 2 + 2.",
                "Open Visual Studio Code from the Start menu, then File, Open Folder, and choose week-06 so the editor matches the terminal folder.",
              ],
              macos: [
                "Press Command and Space, type Terminal, and press Return. Run mkdir -p learning/week-06 and then cd learning/week-06.",
                "After you save the file, run open first-script.html. Finder can open it too: Go, Go to Folder, then the week-06 path.",
                "Press Command+Option+I to open developer tools. If function keys change the volume, hold fn, or use the browser menu: Develop or More tools, then Show JavaScript Console.",
                "Open Visual Studio Code from Spotlight. Use File, then Open, and select the week-06 folder.",
              ],
              linux: [
                "Open Terminal from the application menu, or press Ctrl+Alt+T if your desktop supports it. Run mkdir -p learning/week-06 and cd learning/week-06.",
                "After you save, run xdg-open first-script.html. If that command is missing, open the file manager, often named Files, and double-click the HTML file.",
                "Press F12 or Ctrl+Shift+I for developer tools. If the desktop captures the shortcut, use the browser menu and choose Developer tools, then the Console tab.",
                "Open Visual Studio Code from the application menu. Use File, then Open Folder, on week-06.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "Two console messages from a page",
            filename: "learning/week-06/first-script.html",
            language: "html",
            code: firstScriptCode,
            explanation:
              "The heading and paragraph are HTML, so a person can see that the right file is open. The script element holds JavaScript. The comment is skipped. Each console.log is one statement that prints a string to the console. The paragraph on the page does not change, and that is expected. The useful output is in developer tools.",
            lineNotes: [
              {
                focus: "script at the end",
                note: "The script sits after the heading and paragraph, at the end of the body, which is the habit this course will keep.",
              },
              {
                focus: "line comment",
                note: "The // comment explains the file for a person. The browser does not run that line.",
              },
              {
                focus: "quoted text",
                note: "The quotes make the message a string. Without them, the browser would look for a variable name.",
              },
              {
                focus: "two statements",
                note: "The logs run from top to bottom. The console should show the page-script line before the bread-stall line.",
              },
            ],
            expectedOutput:
              "The page shows the heading Saturday market. The console shows The page script ran. and then Bread stall opens at eight. There is no red SyntaxError.",
            level: "basic",
          },
        ],
        exercises: [
          {
            title: "Three lines from this morning",
            difficulty: "warm-up",
            prompt:
              "Create a page that logs three separate messages about your actual morning, such as a bus, a drink, and a class. The messages must come from a saved script, not only from lines you type in the console.",
            steps: [
              "Create learning/week-06/morning.html with a heading and a script at the end of the body.",
              "Write one comment that says the messages are a morning note.",
              "Add three console.log statements, each with its own string and a semicolon.",
              "Open the file, open the console, and check the order against the file.",
            ],
            expectedOutcome:
              "The console shows your three messages in the same order as the source, with your file name attached, and the page heading is visible. The comment does not appear as a fourth message.",
          },
          {
            title: "Read one red error and clear it",
            difficulty: "practice",
            prompt:
              "Make a copy of your morning page. Introduce one syntax mistake, read the console, and repair only what the message requires. Then add a typed experiment in the console that is not saved.",
            steps: [
              "Remove one closing parenthesis or one closing quote. Save and reload.",
              "Write down the error name and the line number the console shows.",
              "Restore the missing character. Reload and confirm the three messages are back.",
              "In the console, type a sum such as 10 - 4. Leave that sum out of the file, and be ready to explain why it disappeared after a reload.",
            ],
            expectedOutcome:
              "You have a note of one real error message and a repaired file whose three logs return. You can say that a line typed in the console is not saved in the HTML file.",
          },
        ],
        troubleshooting: [
          {
            problem: "The page reloads and the console stays empty.",
            why: "The script element is missing, the calls sit inside a comment, you are on the Elements or Network tab, or the browser opened a different file than the one you saved.",
            solution:
              "Confirm a script element is at the end of the body and that console.log is not behind //. Click the Console tab. Check the address bar for learning/week-06 and your file name. Save, then reload with the browser focused.",
          },
          {
            problem: "A red SyntaxError names a line in your file.",
            why: "The grammar is unfinished: a quote, parenthesis, or brace has no partner, or two statements were jammed together so the second looks like part of the first.",
            solution:
              "Open the named line and the line above it. Close every quote and parenthesis you opened. Put one statement on each line with a semicolon. Save and reload. Deal with the first red message before you edit anything else.",
          },
          {
            problem: "You see ReferenceError: Bread is not defined, or a similar name.",
            why: "The word was not in quotes, so JavaScript treated it as a variable name. You have not created that name. This is different from a syntax error. The punctuation was acceptable. The meaning was missing.",
            solution:
              'Put quotes around text you want to print, as in console.log("Bread"). Save and reload. If you meant a calculation, type numbers, such as 2 + 2, which do not need quotes.',
          },
          {
            problem: "The console shows Hello, but the paragraph on the page does not.",
            why: "console.log writes to the console. It does not change HTML text. The script did the thing you asked. The ask was not to change the page.",
            solution:
              "Read the result in the Console tab. Leave the paragraph as a label for humans. Changing page text is a later lesson. For this week, a visible log is the finished output.",
          },
        ],
        knowledgeChecks: [
          {
            id: "prog-three-layers",
            question: "In this course, what is JavaScript's layer beside HTML and CSS?",
            format: "Multiple choice",
            options: [
              "It replaces the HTML so the page no longer needs elements.",
              "It is the behaviour layer: instructions the browser runs, such as printing a message or calculating.",
              "It is another name for the Flexbox layout you used last week.",
              "It is a comment syntax for CSS colours.",
            ],
          },
          {
            id: "prog-console-saved",
            question: "You type console.log(\"Hi\") in the console and see Hi. You reload the page and Hi is gone. Why?",
            format: "Multiple choice",
            options: [
              "Reload clears experiments typed in the console. Saved instructions live in the file.",
              "Hi is a syntax error, so the browser deletes it on purpose.",
              "console.log only works on Windows, and the reload switched systems.",
              "A heading on the page erases the console after every reload.",
            ],
          },
          {
            id: "prog-comment-why",
            question: "What does a // comment do in a JavaScript file, and what is it for?",
            format: "Short answer",
          },
        ],
        homework: {
          description:
            "Write a lesson response about your first saved script. Include the path, the messages you saw in the console, and one error you caused and fixed.",
          requirements: [
            "Give the portable path of the HTML file and say where the script element sits in the page.",
            "Quote the console messages in order, and explain why they did not appear as paragraphs on the page.",
            "Describe one syntax error or reference error you saw, including what you changed to clear it.",
          ],
          deliverables: [
            "A written lesson response of about 150 to 250 words.",
            "The two or three console.log statements, pasted from the file, plus the comment you wrote.",
          ],
          submission:
            "Submit this as the lesson response for Programming and JavaScript. Keep learning/week-06/first-script.html on your computer. The shopping calculator is the next session's assignment, not this response.",
          criteria: [
            "The response shows real console output that matches the pasted statements, in order.",
            "The response distinguishes a saved script from a line typed only in the console, and describes one genuine error message.",
          ],
          submissionKind: "lesson_response",
        },
        summary: [
          "Programming is writing exact instructions a computer can follow again. A programming language supplies the vocabulary and the grammar.",
          "HTML structures a page, CSS presents it, and JavaScript adds behaviour. This week that behaviour prints to the console.",
          "A statement is one instruction. Quotes mark text. A semicolon ends a statement in this course. Comments are notes the browser skips.",
          "The console shows logs and errors. Lines you type there are experiments. Lines in the script element are the program you keep.",
        ],
        nextLesson: {
          title: "Variables, types, and operators",
          why: "A log can print a fixed sentence. Variables let you name prices and counts, and operators let you calculate a total instead of typing the answer by hand.",
          lessonSlug: "variables-types-operators",
        },
      },
      guide: {
        sessionNumber: 11,
        week: 6,
        title: "Programming and JavaScript",
        durationMinutes: 90,
        objectives: [
          "Students can explain a program as exact, repeatable instructions.",
          "Students can place a script in HTML and read console.log output.",
          "Students can open the console on their own system and repair one syntax error.",
        ],
        tools: [
          "A browser with developer tools",
          "Visual Studio Code",
          "A new folder at learning/week-06",
        ],
        preparation: [
          "Open developer tools on the teaching machine and find the Console tab before students arrive. Note the macOS shortcut separately if the room has Macs.",
          "Prepare first-script.html with a missing quote so the projector can show a SyntaxError and the line number.",
          "Prepare a second file where the log sits inside a JavaScript comment, so the console is empty for a reason you can reveal.",
          "Close extra browser extensions on the projector profile if they flood the console with warnings.",
        ],
        flow: [
          {
            minutes: 5,
            title: "Directions to the market",
            detail:
              "Ask one student to give walking directions to a nearby shop. When a step is vague, ask the room what a literal-minded friend would do. Say that a program is directions for a machine that will not guess. Do not open the editor yet.",
          },
          {
            minutes: 15,
            title: "Three layers and one statement",
            detail:
              "On the board, label HTML, CSS, and JavaScript with structure, presentation, and behaviour. Show one console.log inside a script at the end of the body. Point at the quotes, the parentheses, and the semicolon. Contrast Console.Log as a different name the language will not accept.",
          },
          {
            minutes: 20,
            title: "Live console",
            detail:
              "Create learning/week-06 on the projector using the terminal, then the HTML file. Reload and show both logs. Type 2 + 2 in the console and explain that it is not saved. Remove a quote, read the red message aloud, restore it, and reload. Students should see the line number with you.",
          },
          {
            minutes: 30,
            title: "Their own first script",
            detail:
              "Students create first-script.html and the morning exercise. Walk the room and ask each person to show the Console tab, not the page. If someone is stuck, check the address bar before you rewrite their script. The error-reading exercise starts only after two logs succeed.",
          },
          {
            minutes: 10,
            title: "Error clinic",
            detail:
              "Collect two real errors from the room, or use your prepared files: a syntax error and a commented-out log. For each, ask students which layer is wrong. Repair one character at a time. Mention ReferenceError only as a preview of names, and do not start the variables lecture.",
          },
          {
            minutes: 10,
            title: "Response and preview",
            detail:
              "Ask the three knowledge checks. Explain the lesson response: path, ordered messages, one error. Preview variables as labelled jars for prices. Tell them the shopping total is the next session, so tonight's work is the written response, not the calculator.",
          },
        ],
        explain: [
          "A program is exact instructions, and a statement is one of them.",
          "Languages differ in spelling and share ideas. JavaScript runs in the browser.",
          "HTML, CSS, and JavaScript stay in their own elements.",
          "console.log, quotes, semicolons, and comments.",
          "The console shows output and errors. Typed lines are not saved.",
        ],
        questions: [
          "If the heading is on the page and the console is empty, which part of the file will you inspect first?",
          "Why does console.log(\"Bread\") print a word, while console.log(Bread) looks for a name?",
          "What is the difference between a line you type in the console and a line you save in the script element?",
        ],
        demonstration:
          "Create learning/week-06/first-script.html from an empty folder, log two strings, show them in the console, then remove one quote and read the SyntaxError before you fix it. Type 2 + 2 only in the console so students see an unsaved experiment.",
        practice:
          "Students save their own two or three logs in an HTML file, open the console on their system, and repair one deliberate syntax error. They write down the error name and line number.",
        expectedOutcomes: [
          "Each student can open the console and point to messages from their file.",
          "Students can say that JavaScript did not replace the HTML heading.",
          "Students have seen one red error and cleared it by editing the file.",
        ],
        difficulties: [
          {
            issue: "The student is looking at the page and thinks the script failed because the paragraph did not change.",
            help: "Sit beside them and open the Console tab together. Read the log aloud. Say the paragraph is HTML and the log is the output for this week. Ask them to point to the script element that produced the line.",
          },
          {
            issue: "Developer tools will not open with the shortcut they copied from a classmate on another system.",
            help: "Identify the operating system from the screen. Use the menu path: More tools or Develop, then the console. After it is open once, show the shortcut that matches their machine and have them close and reopen it themselves.",
          },
          {
            issue: "The console is full of extension warnings and the student cannot see their own line.",
            help: "Ask them to read only lines that name their HTML file. Clear the console, reload once, and watch what appears. If needed, open the file in a private window so extensions stay quieter.",
          },
        ],
        homework:
          "The lesson response includes the file path, the ordered console messages, an explanation that logs are not page text, and one error they caused and fixed. It is not the shopping-total assignment.",
        assessment:
          "Use the three knowledge checks in the final block. A pass in the room means they can show a saved log on their screen. Grade the written response later for the error description, not for layout polish.",
        recap:
          "Return to the walking directions. One vague step was enough to get someone lost. One missing quote was enough to stop a script. Name variables as the next need: a place to keep a price so the script can multiply it.",
        knowledgeCheckAnswers: [
          {
            id: "prog-three-layers",
            answer:
              "JavaScript is the behaviour layer: instructions the browser runs, such as printing or calculating.",
            explanation:
              "HTML still holds the structure and CSS still holds the presentation. JavaScript does not replace either one when it logs a message.",
          },
          {
            id: "prog-console-saved",
            answer:
              "Reload clears experiments typed in the console. Saved instructions live in the file.",
            explanation:
              "The console prompt is a scratch area. Only the script element in the HTML file is loaded again when the page reloads.",
          },
          {
            id: "prog-comment-why",
            answer:
              "A // comment is skipped by the browser. It is a note for a person, such as why a value was chosen.",
            explanation:
              "Comments do not print and do not run. They exist so a reader of the file can understand a decision the code itself does not state.",
          },
        ],
      },
    },
    {
      slug: "variables-types-operators",
      sessionNumber: 12,
      title: "Variables, types, and operators",
      estimatedMinutes: 90,
      difficulty: "Guided practice",
      requiresOs: true,
      content: {
        overview: {
          about:
            "This lesson gives your scripts a memory. You will name values with let and const, tell text from numbers and true-or-false values, and use operators to calculate and compare. You will build shopping-total expressions and print them with concatenation and template literals.",
          why:
            "A fixed sentence cannot add today's prices. Named numbers can. The week assignment is a shopping total, and it depends on types and operators you can trust in the console.",
          alreadyKnow:
            "You can put a script in an HTML file, open the console, and read a console.log message or a syntax error.",
        },
        objectives: [
          "Declare names with let and const, and choose names that say what the value is.",
          "Tell strings, numbers, booleans, null, and undefined apart, including with typeof.",
          "Use arithmetic and assignment operators to update a total without retyping the answer.",
          "Use comparison and logical operators and read their true or false results.",
          "Build a message with concatenation and with a template literal.",
        ],
        prerequisites: [
          {
            label:
              "You can write a console.log statement, a comment, and a script element, and you can open the console.",
            lessonSlug: "programming-and-javascript",
          },
        ],
        teachingNotes: [
          {
            heading: "Names for values",
            markdown: [
              `A variable is a name attached to a value. The name is for you and for the program. The value is what the name currently stands for. Think of a jar in a kitchen. The label says rice. The contents are the rice. When a recipe says rice, you go to that jar. You do not write the word rice in the bowl and hope it becomes food. In JavaScript, when you write a name, the language looks up the value. ${c('console.log("breadPrice")')} prints the letters b-r-e-a-d-P-r-i-c-e. ${c("console.log(breadPrice)")} prints whatever value you stored under that name.`,
              `You create a name with ${c("let")} or ${c("const")}, then an equal sign, then a value. The equal sign here is assignment. It stores the value on the right into the name on the left. It does not ask whether two things are equal. That question uses a different operator, later in this lesson.`,
              fence(
                "js",
                `
const breadPrice = 3;
let loaves = 2;
`,
              ),
              `${c("const")} means you will not assign a new value to that name later. ${c("let")} means you might. A price on the sign can be const if this script treats it as fixed. A running total should be let if you plan to add another item onto the same name. If you try to assign again to a const, the console shows a TypeError and that assignment does not happen. The error is useful. It tells you that you broke your own promise.`,
              `Choose names you could read aloud. ${c("breadPrice")} is better than ${c("b")} or ${c("x")}. Use camelCase: start with a lowercase letter, and capitalise each new word, with no spaces. Names may include letters, digits, underscore, and a dollar sign, but they cannot start with a digit. ${c("price1")} is allowed. ${c("1price")} is not. Names are case-sensitive, so ${c("Total")} and ${c("total")} are two different jars. Avoid words the language already uses, such as ${c("let")}, ${c("const")}, ${c("if")}, ${c("return")}, ${c("true")}, ${c("false")}, and ${c("null")}.`,
              `:::misunderstanding The equal sign compares
In JavaScript, a single = stores a value. It is not the equals sign from a maths worksheet. Comparison uses ===. If a condition looks wrong next week, the first check is whether you stored by accident instead of comparing.
:::`,
              `Declare a name before you use it. If you log breadPrice on the line above the const, you get a ReferenceError, the same family of error you saw when a word had no quotes and no meaning. Order in the file is order in time. The browser does not scan ahead to tidy up.`,
            ].join("\n\n"),
          },
          {
            heading: "let, const, and what may change",
            markdown: [
              `Use ${c("const")} by default in this course. Change to ${c("let")} when you can point at a later line that assigns a new value. This keeps accidental overwrites visible. A shopping script might look like this in spirit: each unit price is const, each count is const if the shopper already decided, and a running total is let because it grows.`,
              fence(
                "js",
                `
const milkPrice = 1.5;
let runningTotal = 0;
runningTotal = runningTotal + milkPrice;
`,
              ),
              `The last line reads the current runningTotal, adds milkPrice, and stores the result back into runningTotal. That is a reassignment. It is legal for let. The same line with const runningTotal would fail at the moment you try to store the new number. People sometimes think const makes the number immortal inside the computer. The plain meaning is enough: you cannot stick that name onto a different value.`,
              `There is a shorthand for "take the old value and add." ${c("runningTotal += milkPrice")} means the same as ${c("runningTotal = runningTotal + milkPrice")}. The symbol ${c("+=")} is an assignment operator. ${c("-=")}, ${c("*=")}, and ${c("/=")} exist too. They update a let. They are not comparisons. Read ${c("+=")} aloud as "add and store."`,
              `A name exists only in its scope. For this week, scope means the script you are writing. A const inside the script is available on later lines of that script. It is not available in another HTML file unless you declare it there too. It is not a CSS class and it is not an HTML id. The same spelling in CSS does nothing for JavaScript. When a name is not defined, check the script, not the stylesheet.`,
              `You can declare two names in two statements. Do not reuse a name for a different idea in the same script. Two consts both called price will not make two prices. The second declaration is an error. If you need bread and milk, they need two names. The extra letters are cheaper than a mixed-up total.`,
              `:::tip Read the name at the call site
When a log shows a surprising number, do not stare at console.log first. Find the const or let that name came from. The log is only repeating what the name currently stores.
:::`,
            ].join("\n\n"),
          },
          {
            heading: "Strings, numbers, and booleans",
            markdown: [
              `A type is a kind of value. The three types you will use constantly are string, number, and boolean. A string is text. It is written in quotes. ${c('"Tea"')} is a string. A number is a numeric value written without quotes. ${c("3")} is a number. ${c('"3"')} is a string that happens to contain the digit character 3. They look similar to a person and they behave differently to the language. A boolean is only ${c("true")} or ${c("false")}, with no quotes. Quotes would make the string ${c('"true"')}, which is not the boolean true.`,
              `JavaScript uses numbers for both whole values and decimals. ${c("2")} and ${c("1.5")} are both the number type. The decimal point is a dot, not a comma. A thousands separator is not part of the syntax. Write ${c("1500")}, not ${c("1,500")}. The comma would look like two values. Money in a beginner script can be a number of currency units. Be aware of one quirk: ${c("0.1 + 0.2")} is not stored as neat 0.3. It is a tiny binary fraction off, and the console may show a long decimal. For this week's shop, prefer values that multiply cleanly, such as 3 and 1.5, or work in whole pence and divide only when you print. You are not building a bank. You are learning the operators.`,
              `A boolean is the answer to a yes-or-no question you will ask next week with ${c("if")}. You can create one directly: ${c("const hasCoupon = false")}. You also get booleans from comparisons. ${c("breadCount > 1")} is either true or false. Log it. Seeing true in the console makes the type concrete. Booleans are not the strings "yes" and "no" unless you decide to print those words yourself.`,
              `${c("typeof")} reports a type as a string. ${c("typeof 3")} is ${c('"number"')}. ${c('typeof "3"')} is ${c('"string"')}. ${c("typeof true")} is ${c('"boolean"')}. Use it when a total explodes into a long digit string. Often a price was quoted by mistake, so the type is string, and addition joined text instead of doing arithmetic.`,
              `:::example The label on the jar
If the jar is labelled breadPrice and you put the string "3" inside, every later multiply is at risk. Put the number 3 in a price jar. Put the word Bread in a name jar. The label should match the kind of thing inside.
:::`,
            ].join("\n\n"),
          },
          {
            heading: "null, undefined, and mistakes between types",
            markdown: [
              `${c("undefined")} means a value was never provided. Declare ${c("let note")} and log it before any assignment. The console shows undefined. A function that does not hand a value back also produces undefined. You saw a hint of that with console.log. Undefined usually means "not set yet" or "nothing was returned." It is a signal to finish the declaration, not a value you should store on purpose.`,
              `${c("null")} means you are explicitly saying "there is no value." ${c("const discount = null")} can mean this shopper has no discount, and you chose that answer on purpose. null is not the number 0. Zero is a real price of nothing to pay. null is the absence of a discount object or a missing optional note. Use null when emptiness is a decision. Leave undefined for "I have not written the value."`,
              `There is a famous quirk: ${c("typeof null")} is ${c('"object"')}, not ${c('"null"')}. It is an old mistake in the language that has never been removed, because too much existing code depends on it. Do not use typeof to test for null. Use ${c("discount === null")}. The triple equals compares value and type, and it does not lie about null.`,
              `The painful mix-up is string and number under the plus sign. ${c('"3" + 2')} is the string ${c('"32"')}, because plus concatenates when either side is a string. ${c('"3" * 2')} becomes the number 6, because multiply coerces the string. That second result looks helpful and will betray you later. Do not rely on coercion. Store prices as numbers. If you receive text from a person, you will later convert it on purpose. This week, you type the numbers yourself, so you can type them without quotes.`,
              `:::warning A quoted price is not a price
const breadPrice = "3" looks almost right and then glues digits together. const breadPrice = 3 can be multiplied. When a total looks like 322 instead of 8, check quotes before you rewrite the formula.
:::`,
              `Empty string ${c('""')} is still a string. It is text with no characters. It is not null and not undefined. ${c("typeof \"\"")} is ${c('"string"')}. You rarely need an empty string for the calculator. You do need to know that quotes with nothing between them are a value, so a log can look blank while the statement still ran.`,
            ].join("\n\n"),
          },
          {
            heading: "Arithmetic and assignment",
            markdown: [
              `Arithmetic operators calculate numbers. ${c("+")} adds. ${c("-")} subtracts. ${c("*")} multiplies. ${c("/")} divides. ${c("%")} is the remainder operator. ${c("7 % 3")} is 1, because 3 goes into 7 twice with 1 left over. You will not need remainder for a basic till, and you will meet it again with loops. Knowing the symbol now stops you from inventing the word "remainder" as code.`,
              `Multiplication and division happen before addition and subtraction. ${c("2 + 3 * 4")} is 14, not 20. Parentheses change the order. ${c("(2 + 3) * 4")} is 20. When a shopping total is wrong, add parentheses around the part you want to happen first, then log the inner part alone. A line total is price times count. A grand total is the line totals added. Write those as separate consts so you can log each line. One giant expression is hard to read and hard to forgive.`,
              fence(
                "js",
                `
const breadPrice = 3;
const breadCount = 2;
const breadTotal = breadPrice * breadCount;
`,
              ),
              `Assignment operators store. ${c("=")} stores a new value. ${c("+=")} adds and stores. A script that builds a basket can start ${c("let shoppingTotal = 0")} and then ${c("shoppingTotal += breadTotal")}. The 0 matters. If you never assign a starting number, there is nothing to add to. Adding to undefined does not give you a polite zero. It gives you NaN, which means not a number. NaN spreads: once it appears, further arithmetic stays NaN. If you see NaN, find the first name that was undefined or not a number.`,
              `Division by zero produces ${c("Infinity")}, not a syntax error. You are unlikely to divide in the till. If you compute a price per item and the count is 0, Infinity is the clue. Check the count. Do not print Infinity to a shopper.`,
              `Log intermediate names. Bread line, milk line, then total. When the total is wrong, the line logs show which jar is wrong. This is debugging, and it is ordinary work, not a special talent. The console is the place those logs appear. The page can still say only "Corner shop."`,
            ].join("\n\n"),
          },
          {
            heading: "Comparison, logic, and building messages",
            markdown: [
              `Comparison operators ask a question and answer with a boolean. ${c("===")} means equal value and equal type. ${c("!==")} means not equal under that strict test. ${c(">")} , ${c("<")} , ${c(">=")} , and ${c("<=")} compare order. ${c("3 === \"3\"")} is false, because a number is not a string. ${c("3 == \"3\"")} is true, because the double-equals operator converts types first. This course uses ${c("===")} and ${c("!==")}. Double equals hides bugs inside shopping totals. If you see ${c("==")} in an old example, treat it as a warning, not as the house style.`,
              `Logical operators combine booleans. ${c("&&")} means and. Both sides must be true. ${c("||")} means or. One true side is enough. ${c("!")} means not. It flips true and false. A shop might ask ${c("hasCoupon && shoppingTotal >= 10")}. Log that expression. If it is false, you can see whether the coupon is missing or the total is too small by logging each part. Next week, ${c("if")} will use these answers to choose a message. This week, stop when you can produce the boolean on purpose.`,
              `Concatenation joins strings with ${c("+")}. ${c('"Bread line: " + breadTotal')} turns the number into text and glues it after the label. The space before the closing quote matters. Without it, you get Bread line:6. Concatenation is fine for one short label. It gets clumsy when you mix many pieces, because the plus signs and the quotes crowd the line.`,
              `A template literal is a string in backticks that can contain holes. The holes are written ${c("${name}")}. The language inserts the current value of that name.`,
              fence(
                "js",
                "const shoppingTotal = 9;\nconsole.log(`Shopping total: ${shoppingTotal}`);",
              ),
              `That log prints Shopping total: 9. The backticks are required. If you use ordinary quotes, the characters dollar, brace, and the name are printed as plain text, because ordinary strings do not fill holes. The hole can be an expression, not only a name: ${c("${breadPrice * breadCount}")}. Prefer a named line total when the expression gets long, and put the name in the hole. You can read it aloud more easily.`,
              `The week practice is a calculator made of expressions, not a button. Three items are enough for the assignment. Two are enough to learn the shape: const prices, const counts, const line totals, a grand total, a concatenated line, and a template literal for the final sentence. Open the console and check the arithmetic by hand once. If the hand total and the logged total disagree, believe neither until you find which price was a string or which operator was a plus that should have been a multiply.`,
              `:::example A till in names
breadPrice and breadCount stay const. breadTotal is their product. milkTotal is another product. shoppingTotal adds the line totals. The template literal only speaks the result. It does not do the whole till inside the sentence.
:::`,
            ].join("\n\n"),
          },
        ],
        vocabulary: [
          {
            term: "Variable",
            definition:
              "A name bound to a value. The program uses the name later, and the language looks up whatever value is stored there.",
          },
          {
            term: "const",
            definition:
              "A way to declare a name whose value you will not assign again. Use it for prices and counts that stay fixed in the script.",
          },
          {
            term: "let",
            definition:
              "A way to declare a name you may assign again later, such as a running total that grows as you add line totals.",
          },
          {
            term: "String",
            definition:
              "A text value written in quotes. The string \"3\" is text, not the number 3, even though it looks numeric.",
          },
          {
            term: "Boolean",
            definition:
              "A value that is only true or false. Comparisons such as total > 10 produce a boolean.",
          },
          {
            term: "null",
            definition:
              "An explicit empty value you chose, such as no discount. It is not the same as zero or as a missing declaration.",
          },
          {
            term: "undefined",
            definition:
              "The value of a name that was declared and not yet assigned, or of a result that was never provided.",
          },
          {
            term: "Template literal",
            definition:
              "A string written in backticks that inserts values written as ${name}. Ordinary quotes do not insert those holes.",
          },
        ],
        demonstrations: [
          {
            title: "Calculate a two-item shopping total",
            intro:
              "You will save a script that multiplies price by count for bread and milk, adds a grand total, and prints it with a template literal. You will also try one bad quoted price so you can see concatenation happen by accident. The JavaScript does not change between operating systems.",
            steps: [
              "Open a terminal with the steps for your system and go to learning/week-06. Create the folder if it is not there.",
              "Create learning/week-06/calculator.html with a heading and a script at the end of the body.",
              "Declare const breadPrice as the number 3 and const breadCount as the number 2. Declare milkPrice as 1.5 and milkCount as 2.",
              "Declare breadTotal as breadPrice times breadCount, and milkTotal the same way. Declare shoppingTotal as the sum of the two line totals.",
              "Log each line total with concatenation, such as the label Bread line: joined to the number. Log the grand total with a template literal in backticks.",
              "Save, open the file in the browser, and open the console. Check that the total is 9. Bread is 6 and milk is 3.",
              "Change breadPrice to the string \"3\" for one reload. Notice the broken total. Change it back to the number 3 and reload again.",
              "In the console, type typeof 9 and typeof \"9\". Leave those experiments unsaved. Confirm the file still logs 9 after a reload.",
            ],
            expected:
              "The console shows a bread line of 6, a milk line of 3, and a shopping total of 9. typeof on a bare 9 says number, and typeof on a quoted 9 says string. After you restore the numeric price, the total is 9 again.",
            verify:
              "Compute 3 times 2 plus 1.5 times 2 by hand. It is 9. The console total should match. The template line should contain the digits 9, not the characters dollar-brace. The address bar should be your calculator.html.",
            ifItFails:
              "If you see Bread line:32 or a similar glueing of digits, a price is still a string. If you see the text ${shoppingTotal} on screen in the console, you used ordinary quotes instead of backticks. If you see a syntax error near the word const, you declared the same name twice or left off a semicolon between two statements on one line.",
            os: {
              sameOnAllPlatforms:
                "The variable names, the arithmetic, concatenation, and template literals are the same on Windows, macOS, and Linux. A number is a number on every system. The steps that differ are how you open the terminal, how you launch the HTML file, and how you open the console.",
              identify: [
                "Use the system clues you used last session: Start and a taskbar for Windows, the Apple menu and Dock for macOS, Activities or a distribution menu for many Linux desktops.",
                "If a classmate's shortcut fails, do not keep pressing it. Open developer tools from the browser menu, then ask which key matches your system.",
              ],
              windows: [
                "Open Command Prompt or PowerShell from the Start menu. Run cd learning\\week-06. If the folder is missing, mkdir learning\\week-06 first.",
                "After saving calculator.html, run start calculator.html or open the file from File Explorer.",
                "Press F12 or Ctrl+Shift+I, choose Console, and read the totals. Type typeof 9 at the prompt.",
                "Open the week-06 folder in Visual Studio Code with File, then Open Folder, so saves land in the folder the browser opened.",
              ],
              macos: [
                "Open Terminal from Spotlight with Command and Space. Run cd learning/week-06, or mkdir -p learning/week-06 if you still need it.",
                "Run open calculator.html, or use Finder's Go to Folder on the week-06 path.",
                "Open the console with Command+Option+I, or from the Develop menu. Select Console and check the total against the hand sum of 9.",
                "Open Visual Studio Code from Spotlight and use File, Open, on the week-06 folder.",
              ],
              linux: [
                "Open Terminal from the application menu. Run cd learning/week-06. Create it with mkdir -p if needed, then cd into it.",
                "Run xdg-open calculator.html, or open the file from the file manager named Files.",
                "Open developer tools with F12 or Ctrl+Shift+I, or from the browser menu if the desktop steals those keys. Select Console.",
                "Open Visual Studio Code from the application menu and open the week-06 folder.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "A two-item till in the console",
            filename: "learning/week-06/calculator.html",
            language: "html",
            code: calculatorCode,
            explanation:
              "Prices and counts are numeric consts. Each line total is a product, stored under its own name so it can be checked. The shopping total adds those lines. Concatenation builds the bread and milk messages. A template literal builds the final sentence, inserting the number into the backticks string. typeof confirms the total is a number, not text glued together.",
            lineNotes: [
              {
                focus: "numeric consts",
                note: "breadPrice is 3 without quotes, and milkPrice is 1.5. They stay const because this script never assigns a new price.",
              },
              {
                focus: "line totals",
                note: "Multiplying into breadTotal and milkTotal keeps the grand total readable. You can log either line when the sum looks wrong.",
              },
              {
                focus: "concatenation",
                note: "The plus sign joins the label string to the number. The space inside the quotes is what stops the label and the digits from touching.",
              },
              {
                focus: "template literal",
                note: "Backticks and ${shoppingTotal} insert the value. Ordinary double quotes would print the hole as plain characters.",
              },
              {
                focus: "typeof",
                note: "typeof shoppingTotal should log the word number. If it ever logs string, a quote slipped onto a price.",
              },
            ],
            expectedOutput:
              "The console shows Bread line: 6, then Milk line: 3, then Shopping total: 9, then number. The page itself only needs the heading. The arithmetic lives in the console.",
            level: "practical",
          },
        ],
        exercises: [
          {
            title: "One product, checked by hand",
            difficulty: "warm-up",
            prompt:
              "Pick one real item you might buy. Store its price and count as numbers, multiply them, and log a sentence. Check the product with a calculator or by hand before you call it done.",
            steps: [
              "In a new file learning/week-06/one-item.html, declare two consts with names that mention the item.",
              "Declare a third const for the line total using the multiply operator.",
              "Log a template literal that includes the item name and the line total.",
              "Open the console and compare the logged number with your hand calculation.",
            ],
            expectedOutcome:
              "The console shows one sentence with the correct product. typeof on the line total is number. The price in the file is not inside quotes.",
          },
          {
            title: "Comparisons beside the till",
            difficulty: "practice",
            prompt:
              "Extend a two-item total with two boolean questions: whether the total is at least 10, and whether a coupon flag is true at the same time as that total check. Print the booleans. Do not write an if statement yet.",
            steps: [
              "Create the two line totals and a shoppingTotal using numbers.",
              "Declare const hasCoupon as true or false on purpose.",
              "Log shoppingTotal >= 10. Log hasCoupon && shoppingTotal >= 10.",
              "Change the coupon or a count, reload, and write one sentence about which log flipped.",
            ],
            expectedOutcome:
              "You can show two boolean logs and explain one reload that changed one of them. The grand total still matches a hand calculation. No if keyword is required.",
          },
        ],
        troubleshooting: [
          {
            problem: "The total prints as 322 or some other glued digits.",
            why: "A price or a count is a string. The + operator concatenates when either side is text, so \"3\" + 2 becomes \"32\". A later plus continues the gluing.",
            solution:
              "Remove quotes from numeric prices and counts. Log typeof on each price. Reload and compare with a hand calculation. Keep plus for adding numbers or for joining a label you wrote as a separate string.",
          },
          {
            problem: "The console shows TypeError: Assignment to constant variable.",
            why: "The name was declared with const, and a later line tried to assign a new value with = or +=.",
            solution:
              "If the value should change, declare it with let. If it should not change, delete the second assignment and use a new const for the new idea. Do not change every const to let to silence the message.",
          },
          {
            problem: "The log shows ${shoppingTotal} instead of a number.",
            why: "The message used single or double quotes. Only backticks turn ${ } into an insertion hole. In ordinary quotes those characters are just text.",
            solution:
              "Retype the final message with backticks around the whole string. Keep the ${shoppingTotal} hole. Reload. The other logs may stay on concatenation. Both styles can exist in one script.",
          },
          {
            problem: "The console shows NaN.",
            why: "Arithmetic met a value that is not a number, often a name that is still undefined, or a typo in a name so the script added undefined.",
            solution:
              "Log each input name on its own line. Find the one that prints undefined or a word. Fix the spelling or give the let a starting number such as 0 before you use +=. Reload after each single fix.",
          },
        ],
        knowledgeChecks: [
          {
            id: "var-const-or-let",
            question:
              "A unit price must not be reassigned later in the script. A running total will be updated with +=. Which declarations fit?",
            format: "Multiple choice",
            options: [
              "const for the price and let for the running total.",
              "let for both, because const is only for strings.",
              "const for both, then += on the total anyway.",
              "A comment for the price and a string for the total.",
            ],
          },
          {
            id: "var-quoted-three",
            question: "What is the result of the expression \"3\" + 2, and why?",
            format: "Multiple choice",
            options: [
              "The number 5, because plus always does arithmetic.",
              "The string \"32\", because plus concatenates when one side is a string.",
              "A syntax error, because a string cannot sit beside a number.",
              "null, because the types disagree.",
            ],
          },
          {
            id: "var-template-need",
            question: "What do backticks and ${name} do that ordinary quotes do not?",
            format: "Short answer",
          },
        ],
        homework: {
          description:
            "Build the week 6 shopping total calculator. Use at least three items, numeric prices and counts, line totals, a grand total, and console output that includes a template literal. This is the module assignment.",
          requirements: [
            "Use const for prices and counts, and compute each line with an arithmetic operator rather than typing the line total as a bare number.",
            "Print every line and the grand total to the console, with the grand total in a template literal, and include one comment about the currency unit.",
          ],
          deliverables: [
            "The week 6 module assignment: an HTML file such as learning/week-06/shopping-total.html and the console results it produces.",
          ],
          submission:
            "Submit the calculator as the week 6 module assignment. Include the portable path and paste the script. A screenshot of the console is useful if the submission box allows a file, and the script itself is required either way.",
          criteria: [
            "The logged grand total matches a hand calculation of the numeric prices and counts.",
            "Names are readable, strings and numbers are not mixed up, and the final line uses a template literal.",
          ],
          submissionKind: "module_assignment",
        },
        summary: [
          "let and const name values. Assignment with = stores. const is for names you will not reassign. let is for names you will update.",
          "Strings are quoted text, numbers are unquoted numeric values, and booleans are true or false. null is a chosen empty value. undefined means nothing was set.",
          "Arithmetic uses + - * / and parentheses. Comparison uses === and the inequality signs. &&, ||, and ! combine booleans.",
          "Concatenation joins text with +. Template literals use backticks and ${name} to insert values. Quoted prices break totals by gluing digits.",
        ],
        nextLesson: {
          title: "Conditions",
          why: "Comparisons already produce true or false. Conditions use those answers so a script can choose one message or another instead of always printing the same lines.",
          lessonSlug: "conditions",
        },
      },
      guide: {
        sessionNumber: 12,
        week: 6,
        title: "Variables, types, and operators",
        durationMinutes: 90,
        objectives: [
          "Students declare const and let with names that match the values.",
          "Students can show that a quoted price breaks addition and a numeric price does not.",
          "Students leave with a two-item total that matches a hand calculation.",
        ],
        tools: [
          "The same browser console as session 11",
          "Visual Studio Code",
          "A hand calculator or phone calculator for checking products",
        ],
        preparation: [
          "Load a script where breadPrice is the string \"3\" so the first projector total is wrong in an obvious, teachable way.",
          "Have the repaired numeric version ready, with line totals logged separately.",
          "Write 3 * 2 + 1.5 * 2 on the board as 9 so the room has a target before anyone codes.",
          "Confirm you can type backticks on the teaching keyboard. If the layout hides them, know the key before class.",
        ],
        flow: [
          {
            minutes: 5,
            title: "Jars on the counter",
            detail:
              "Hold up or draw two jars labelled breadPrice and breadCount. Ask what should be inside each: a number, not the word number. Say today the script gets a memory. Do not review the entire previous lecture. One reminder of console.log is enough.",
          },
          {
            minutes: 15,
            title: "Types before operators",
            detail:
              "Declare const examples of a string, a number, and a boolean. Log typeof for each. Show let note with no assignment and the word undefined. Show const discount = null and compare it with === null. Then show \"3\" + 2 beside 3 + 2. Stop and let the room say which till they trust.",
          },
          {
            minutes: 20,
            title: "Live two-item till",
            detail:
              "Write bread and milk consts, multiply into line totals, add a grand total, and log it. Use concatenation for one line and a template literal for the final line. Intentionally use quotes once, reload, then remove them. Type a comparison such as shoppingTotal >= 10 in the console and read the boolean.",
          },
          {
            minutes: 30,
            title: "Student calculators",
            detail:
              "Students build calculator.html with two items, then add a third if they are steady. They must show a hand calculation beside the console. Circulate and ask typeof on any total that looks like glued digits. The comparison exercise starts after the sum matches.",
          },
          {
            minutes: 10,
            title: "NaN and backticks clinic",
            detail:
              "If the room produced NaN or a literal ${total}, project that file. Trace the undefined name or swap in backticks. If nobody hit those bugs, use a prepared file. Do not introduce if statements. Point at the boolean and say next week will branch on it.",
          },
          {
            minutes: 10,
            title: "Assignment brief",
            detail:
              "Read the knowledge checks aloud. Set the module assignment: at least three items, consts for prices and counts, line totals, a grand total, a comment on currency, and a template literal. Tell them to paste the script and the path learning/week-06/shopping-total.html. Preview conditions as choosing a message from a boolean they can already log.",
          },
        ],
        explain: [
          "Assignment with = versus comparison with ===.",
          "const by default, let when the name is updated.",
          "string, number, boolean, null, undefined, and typeof.",
          "Arithmetic order and parentheses, plus += on a let.",
          "&& and || on booleans they can already log.",
          "Concatenation versus template literals.",
        ],
        questions: [
          "Why is breadPrice = \"3\" a type problem even though the character looks like a number?",
          "Which name in a till should be let, and which names should stay const?",
          "What will the console show if the final message uses double quotes around ${shoppingTotal}?",
        ],
        demonstration:
          "Build a bread and milk total live, from consts through a template literal, and show the broken string price before the repaired number. Keep a hand total of 9 visible on the board and make the console match it.",
        practice:
          "Students save learning/week-06/calculator.html with at least two numeric items, line totals, and a template literal. They check the arithmetic by hand and log one comparison that produces a boolean.",
        expectedOutcomes: [
          "A console total that matches a hand calculation.",
          "Students can point to one const and one reason it is not let.",
          "Students can tell a template literal from a quoted string that prints ${ } as text.",
        ],
        difficulties: [
          {
            issue: "The student reassigns a const and freezes when the TypeError appears.",
            help: "Read the error with them: assignment to constant variable. Ask whether that name should change. If yes, change the declaration to let and reload. If no, remove the second assignment. Do not convert the whole file to let.",
          },
          {
            issue: "The total is a long string of digits because every value was quoted.",
            help: "Log typeof on each price. Remove quotes from numbers only. Leave quotes on labels. Reload and redo the hand calculation. Show \"3\" + 2 on the console prompt as a one-line explanation.",
          },
          {
            issue: "The student cannot find the backtick key and gives up on template literals.",
            help: "Help them type one backtick pair around a message that already works with concatenation. Keep their concatenated logs. The assignment needs one template literal, not a conversion of every line. On many keyboards the backtick is on the key left of 1.",
          },
        ],
        homework:
          "The module assignment is a three-item shopping total in an HTML file, with numeric consts, line totals, a grand total, a currency comment, concatenation or clear labels, and a final template literal. The console result must match a hand total.",
        assessment:
          "Knowledge checks cover const versus let, \"3\" + 2, and backticks. Mark the assignment by recomputing the total from the source, not by the heading text. A string price that happens to look right is still a miss on the type criterion.",
        recap:
          "Point at one boolean on the projector and say the script can ask a question now, but it still cannot choose a path. Next session uses if so the answer can change which message runs. Ask them to bring a saved calculator file.",
        knowledgeCheckAnswers: [
          {
            id: "var-const-or-let",
            answer: "const for the price and let for the running total.",
            explanation:
              "const blocks a later assignment, which fits a fixed unit price. += assigns a new value, so the running total needs let.",
          },
          {
            id: "var-quoted-three",
            answer: "The string \"32\", because plus concatenates when one side is a string.",
            explanation:
              "The quotes make 3 text. Plus then joins characters instead of adding quantities. Multiplication would coerce, which is another reason not to quote prices.",
          },
          {
            id: "var-template-need",
            answer:
              "Backticks create a template literal, and ${name} inserts the current value. Ordinary quotes print those characters as text.",
            explanation:
              "Insertion is the whole point of the template form. If the console shows the dollar and braces, the quotes are the wrong kind.",
          },
        ],
      },
    },
  ],
  assignment: {
    slug: "week-06-assignment",
    title: "Shopping total calculator",
    summary:
      "Write a saved JavaScript program that prices at least three shopping items, computes line totals and a grand total, and prints the result in the console.",
    instructions:
      "Build a shopping total calculator as one HTML page with a script. Choose a real shop or market and at least three items you might actually buy. For each item, store the unit price and the count as numbers with const. Compute a line total by multiplying. Add the line totals into a grand total. Do not type the grand total in by hand as a single number you already calculated on paper. The script must do the arithmetic.\n\nPrint every line total and the grand total with console.log. At least one message must be a template literal that inserts the grand total. A comment near the prices should say what currency unit you are using, such as whole pounds or dollars. Keep prices numeric. A price in quotes will glue digits together and will not pass the type check.\n\nOpen the page in a browser, open the console, and compare the logged total with a hand calculation. If they disagree, fix the script and check again. The page heading can name the shop. The totals themselves belong in the console for this assignment. Save the file at a portable path such as learning/week-06/shopping-total.html.\n\nYou may start from the two-item example in class and add a third item of your own. The item names, prices, and counts should be yours. Include the path and paste the script when you submit.",
    objectives: [
      "Store prices and counts in clearly named constants.",
      "Compute line totals and a grand total with arithmetic operators.",
      "Print a readable result that includes a template literal and matches a hand calculation.",
    ],
    requirements: [
      "An HTML file with a script element at the end of the body and a heading that names the shop.",
      "At least three items, each with a numeric unit price and a numeric count declared with const.",
      "A named line total for each item, produced by multiplication, and a grand total produced by addition.",
      "console.log output for each line and for the grand total, including one template literal, plus a comment that names the currency unit.",
      "A hand calculation, written in the submission, that matches the logged grand total.",
    ],
    deliverables: [
      "learning/week-06/shopping-total.html, or the same program under a clear name in learning/week-06.",
      "The pasted script and the console lines it prints.",
      "Three or four lines of hand arithmetic showing how the grand total was checked.",
    ],
    rubric: [
      {
        criterion: "Page runs and output is visible",
        points: 15,
        description:
          "The HTML file opens in a browser and the console shows the script's messages without a syntax error.",
      },
      {
        criterion: "Names, const, and a currency comment",
        points: 20,
        description:
          "Prices and counts use readable const names. A comment states the currency unit. let is used only if a value is actually reassigned.",
      },
      {
        criterion: "Arithmetic line totals and grand total",
        points: 25,
        description:
          "Each line total is a product of price and count. The grand total adds those lines. The logged number matches the hand calculation.",
      },
      {
        criterion: "Numeric types",
        points: 20,
        description:
          "Prices and counts are numbers, not quoted digits. The total is not string concatenation of the prices.",
      },
      {
        criterion: "Messages and a template literal",
        points: 20,
        description:
          "Each line is labelled in the console, and the grand total message is a template literal that inserts the computed value.",
      },
    ],
    points: 100,
    instructorSolution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Shopping total</title>
</head>
<body>
  <h1>Corner shop</h1>
  <script>
    // Currency unit: whole pounds and decimal pounds, typed as numbers.
    const breadPrice = 3;
    const breadCount = 2;
    const milkPrice = 1.5;
    const milkCount = 2;
    const applePrice = 0.5;
    const appleCount = 4;

    const breadTotal = breadPrice * breadCount;
    const milkTotal = milkPrice * milkCount;
    const appleTotal = applePrice * appleCount;
    const shoppingTotal = breadTotal + milkTotal + appleTotal;

    console.log("Bread line: " + breadTotal);
    console.log("Milk line: " + milkTotal);
    console.log("Apple line: " + appleTotal);
    console.log(\`Shopping total: \${shoppingTotal}\`);
  </script>
</body>
</html>`,
  },
  quiz: {
    slug: "week-06-quiz",
    title: "Week 6 quiz: JavaScript values and the console",
    passingScore: 70,
    allowRetakes: true,
    questions: [
      {
        slug: "week-06-three-layers",
        type: "multiple_choice",
        prompt: "What does JavaScript add to a page that already has HTML and CSS?",
        options: [
          { id: "a", text: "It replaces HTML elements so headings are no longer needed." },
          {
            id: "b",
            text: "It adds behaviour the browser can run, such as calculations and console messages.",
          },
          { id: "c", text: "It is only a way to write CSS colours inside a comment." },
          { id: "d", text: "It lays out grid columns instead of CSS." },
        ],
        correct: { optionId: "b" },
        explanation:
          "HTML still describes structure and CSS still describes presentation. JavaScript is the behaviour layer. A console.log is a small example of behaviour. It does not remove the heading from the page.",
        points: 10,
      },
      {
        slug: "week-06-console-not-page",
        type: "true_false",
        prompt:
          "console.log writes its message into the HTML paragraph automatically, so you do not need the developer tools to see it.",
        correct: { value: false },
        explanation:
          "console.log writes to the console in developer tools. The paragraph stays whatever HTML you wrote. If the page looks unchanged, the script may still have succeeded. Open the Console tab before you judge it.",
        points: 10,
      },
      {
        slug: "week-06-comment-skipped",
        type: "true_false",
        prompt: "A line that starts with // is run as JavaScript, and it also prints to the console.",
        correct: { value: false },
        explanation:
          "A // comment is skipped. It is a note for a person reading the file. It does not print, and it does not calculate. If a console.log sits after // on the same line, that call will not run either.",
        points: 10,
      },
      {
        slug: "week-06-const-reassign",
        type: "multiple_choice",
        prompt: "Which declaration fits a unit price that the script must not assign again?",
        options: [
          { id: "a", text: "const breadPrice = 3;" },
          { id: "b", text: "let breadPrice = 3; followed later by breadPrice = breadPrice + 1; as the normal pattern for a fixed price." },
          { id: "c", text: "A CSS class named breadPrice." },
          { id: "d", text: "An HTML comment that contains the number 3." },
        ],
        correct: { optionId: "a" },
        explanation:
          "const names a value you do not assign again. A fixed unit price fits const. let is for a name you will update, such as a running total. CSS and HTML comments do not create JavaScript variables.",
        points: 10,
      },
      {
        slug: "week-06-string-plus",
        type: "multiple_choice",
        prompt: "What does console.log(\"3\" + 2) print, and what type mistake caused it?",
        options: [
          { id: "a", text: "5, because + always adds numbers." },
          { id: "b", text: "The string 32, because + concatenates when one side is a string." },
          { id: "c", text: "undefined, because mixed types delete the value." },
          { id: "d", text: "A syntax error, because quotes are illegal." },
        ],
        correct: { optionId: "b" },
        explanation:
          "The quotes make 3 a string. Plus then joins text, so the digits appear side by side as 32. A real price should be the number 3 without quotes, so later arithmetic adds or multiplies instead of gluing characters.",
        points: 10,
      },
      {
        slug: "week-06-read-total",
        type: "code_reading",
        prompt: "What does this script print as the shopping total line?",
        codeSnippet: `const price = 4;
const count = 2;
const lineTotal = price * count;
console.log(\`Shopping total: \${lineTotal}\`);`,
        options: [
          { id: "a", text: "Shopping total: ${lineTotal}" },
          { id: "b", text: "Shopping total: 8" },
          { id: "c", text: "Shopping total: 42" },
          { id: "d", text: "Nothing, because const cannot be multiplied." },
        ],
        correct: { optionId: "b" },
        explanation:
          "price times count is 8, stored in lineTotal. The backticks insert that value into the message, so the console shows Shopping total: 8. The hole is not printed as source text. const values can be used in arithmetic. They cannot be reassigned.",
        points: 10,
      },
      {
        slug: "week-06-read-compare",
        type: "code_reading",
        prompt: "What is logged, and what does the operator ask?",
        codeSnippet: `const shoppingTotal = 8;
console.log(shoppingTotal >= 10);
console.log(shoppingTotal === "8");`,
        options: [
          { id: "a", text: "true, then true, because 8 and \"8\" are always the same." },
          { id: "b", text: "false, then false. The total is not at least 10, and a number is not strictly equal to a string." },
          { id: "c", text: "8 and 10, because comparisons print the numbers they were given." },
          { id: "d", text: "A syntax error, because === is not a JavaScript operator." },
        ],
        correct: { optionId: "b" },
        explanation:
          "shoppingTotal >= 10 is false because 8 is less than 10. shoppingTotal === \"8\" is false because === checks type as well as value. A number and a string are not strictly equal. Both logs are booleans, not the original numbers.",
        points: 10,
      },
      {
        slug: "week-06-assignment-symbol",
        type: "multiple_choice",
        prompt: "In the statement let total = 0; what does the single = do?",
        options: [
          { id: "a", text: "It stores 0 in the name total." },
          { id: "b", text: "It checks whether total and 0 are already equal." },
          { id: "c", text: "It writes a CSS rule for a class called total." },
          { id: "d", text: "It comments out the rest of the line." },
        ],
        correct: { optionId: "a" },
        explanation:
          "A single = is assignment. It stores the right-hand value under the left-hand name. Comparison uses ===. Mixing them up stores a value when you meant to ask a question, or the reverse.",
        points: 10,
      },
      {
        slug: "w6-q9-consts",
        type: "multiple_choice",
        prompt: "Why store each shopping line total in its own const instead of one long grand-total expression?",
        options: [
          { id: "a", text: "Because JavaScript forbids long expressions" },
          { id: "b", text: "Because separate line totals are easier to log and check when the total is wrong" },
          { id: "c", text: "Because const values cannot be added together" },
          { id: "d", text: "Because shorter code always runs faster" },
        ],
        correct: { optionId: "b" },
        explanation:
          "When a total is wrong, a line const lets you log bread and milk separately and see which one disagrees with your hand maths. One crowded expression forces you to reread every operator at once.",
        points: 10,
      },
    ],
  },
};
