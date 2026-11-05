import type { ModuleSeed } from "../../src/lib/content-types";

export const week09: ModuleSeed = {
  slug: "week-09-dom",
  number: 9,
  weekNumber: 9,
  monthLabel: "Month 3 — Web interactivity, Git and React",
  title: "DOM and browser interaction",
  description:
    "Make a webpage respond to a script. Find elements, change what the visitor sees, and listen for clicks, typing, and form submits.",
  lessons: [
    {
      slug: "understanding-the-dom",
      sessionNumber: 17,
      title: "Understanding the DOM",
      estimatedMinutes: 90,
      difficulty: "Gentle introduction",
      requiresOs: true,
      content: {
        overview: {
          about:
            "This lesson explains the Document Object Model, usually called the DOM. You will learn how a browser turns an HTML file into a live tree, how to find one element, and how to change its text, attributes, classes, and styles from JavaScript.",
          why: "A page that cannot change after it loads can only show what was saved in the file. The DOM is how a script updates the page a person is already looking at.",
          alreadyKnow:
            "You can write an HTML page, select elements with CSS, and store values in JavaScript variables.",
        },
        objectives: [
          "Explain the difference between a saved HTML file and the live DOM in the browser.",
          "Find one element with getElementById and querySelector.",
          "Read text from an element and replace it with textContent.",
          "Change an attribute, a class, and an inline style from JavaScript.",
          "Choose textContent for ordinary text and explain when innerHTML is risky.",
        ],
        prerequisites: [
          {
            label: "HTML elements, ids, classes, and a complete document.",
            lessonSlug: "semantic-html",
          },
          {
            label: "JavaScript variables, strings, and reading a simple error in the console.",
            lessonSlug: "array-methods-and-problem-solving",
          },
        ],
        teachingNotes: [
          {
            heading: "The file and the live page",
            markdown: `An HTML file is text stored on the computer. It describes a page. When a browser opens that file, it reads the tags and builds a living structure in memory. That structure is what you see in the window. JavaScript can change the structure after the page has loaded.

This solves a practical problem. A market notice that says "bread available" should be able to change when the bread sells out. Without a live structure, the only update would be a brand-new file and a full reload typed by a person. With the live structure, a script can replace one sentence and the visitor sees the new sentence immediately.

Picture a shop built from a blueprint. The HTML file is the blueprint. The open page is the shop. You can hang a new sign in the shop without redrawing the blueprint. The next person who builds from the blueprint still gets the original sign, unless the script hangs the new sign again after the shop is built.

You already know elements from HTML and rules from CSS. Those ids and classes still identify parts of the page. JavaScript uses the same names. You also know variables. A search method hands you an object, and you store that object in a variable so later lines can use it.

## What happens while the page loads

The browser reads the document from top to bottom. It creates one object for the document and one object for each element. It remembers which elements sit inside which parents. Then it paints pixels. A script that runs after the elements exist can ask for those objects. A script that runs too early asks for an object that has not been created yet and receives nothing.

:::example The market board
The saved heading says "Saturday market". After the script runs, the same heading on screen says "Saturday market is open". The file on disk still contains the first sentence until you edit and save it yourself.
:::

:::misunderstanding Saving the file updates every open tab
The open tab keeps the page it already built. After you save an edit, refresh the tab. Changing the open page from the console does not write those changes back into the file.
:::`,
          },
          {
            heading: "What the DOM is",
            markdown: `The DOM is the Document Object Model. Document means the page. Object means a bundle of data and actions that JavaScript can use. Model means a structured copy of the page, arranged as a tree.

The tree starts at \`document\`. Inside it is the \`html\` element. Inside that are \`head\` and \`body\`. Inside \`body\` are the heading, paragraphs, buttons, and whatever else you wrote. An element that sits inside another element is a child. The outer element is the parent. Text inside a tag is a node too, though this lesson focuses on elements.

The DOM exists so programs can talk about a page in a standard way. Different browsers can paint pixels differently, but they agree on this tree. Methods such as \`getElementById\` and properties such as \`textContent\` are part of that agreement. You are not inventing a private system for one brand of browser.

## How a change moves through the tree

You find an element object. You change a property on that object, such as its text. The browser notices the change and updates the pixels that belong to that element. The rest of the tree stays as it was. Reloading the page throws away the changed tree and builds a fresh one from the file, then your script can change it again.

\`document\` is the object that represents the whole page. It is already declared by the browser. You do not create it with \`let\`. From \`document\` you search downward into the tree.

:::misunderstanding The DOM is a second HTML file hidden in a folder
The DOM is memory inside the browser tab. It disappears when the tab closes. The HTML file remains on disk. Developer tools can show the current tree, which may differ from the file after a script has run.
:::

:::tip Refresh with the console open
On Windows and Linux, F12 opens developer tools. On macOS, press Command-Option-I. Choose the Console tab to try a line, and the Elements tab to inspect the tree the browser is using right now.
:::`,
          },
          {
            heading: "Finding one element",
            markdown: `Before you can change a heading, you need a reference to it. A reference is a JavaScript value that points at that element object. Two methods cover the searches in this course.

\`document.getElementById("page-title")\` looks for an element whose \`id\` attribute is exactly \`page-title\`. Ids are unique on a page, so this method returns one element or \`null\`. \`null\` means "nothing was found". The search does not use a hash character. The id in the HTML is \`id="page-title"\`, and the string you pass is \`"page-title"\`.

\`document.querySelector("#status")\` uses a CSS selector. The hash means id, the same way it does in CSS. A dot means class, so \`document.querySelector(".highlight")\` finds the first element with that class. \`querySelector\` always returns the first match in the tree, or \`null\` if nothing matches.

## Why both methods exist

\`getElementById\` is direct when you already know the id. \`querySelector\` is one method that can use any CSS selector you already learned: an id, a class, an element name, or a more specific selector such as \`"main p"\`. This course uses \`querySelector\` most of the time and \`getElementById\` when the target is a single known id.

Store the result:

\`\`\`js
const title = document.getElementById("page-title");
const status = document.querySelector("#status");
\`\`\`

Check for \`null\` before you use the value. If a method returns \`null\` and you immediately read \`textContent\`, the browser throws an error and the rest of the script stops.

\`\`\`js
if (title !== null && status !== null) {
  status.textContent = "Found both elements.";
}
\`\`\`

There is also \`querySelectorAll\`, which returns every match in a list. This lesson changes one element at a time. You will walk through lists in a later week when React renders many items.

:::misunderstanding querySelector finds every match
It finds the first match only. If two paragraphs share a class, the method returns the earlier one in the document. Give a target its own id when you need that exact element.
:::

:::warning The script must run after the element exists
Put \`<script src="market.js"></script>\` just before \`</body>\`. A script in the head runs before the body is built, so the search returns \`null\` even though the id is spelled correctly in the file.
:::`,
          },
          {
            heading: "Reading and changing text",
            markdown: `\`textContent\` is the text inside an element, without tags. Reading it gives you a string. Assigning a string replaces the text the visitor sees.

\`\`\`js
const earlier = title.textContent;
title.textContent = "Saturday market is open";
\`\`\`

The first line reads. The second line writes. \`earlier\` is an ordinary string variable, the same kind you have used since the JavaScript lessons. You can join it to another sentence:

\`\`\`js
status.textContent = "The heading used to say: " + earlier;
\`\`\`

The problem this solves is updating a page without rebuilding the whole document as a string. You leave the heading element in place and replace only its words. Screen readers and the browser still see a heading. You changed its contents, not its role.

## Empty text and missing text

If an element exists but has no words, \`textContent\` is an empty string, \`""\`. That is different from \`null\`. An empty string means the element was found and it has no text. \`null\` means the element was not found. Compare with \`===\` so you do not mix those two situations.

Numbers do not belong in the page as numbers. The page shows text. If you later keep a count in a number variable, convert it when you write it: \`output.textContent = String(count)\`. \`String\` turns the number into digits on screen. You already convert and join strings with the \`+\` operator.

:::example A notice that remembers the old heading
The heading starts as "Saturday market". The script stores that string, writes a new heading, and uses the stored string in the paragraph. Both changes are visible at once because both assignments run before the script finishes.
:::

:::misunderstanding textContent types the words into the HTML file
It changes the live element only. View the file in the editor and you still see the original words. View the Elements panel in developer tools and you see the updated words.
:::`,
          },
          {
            heading: "Attributes, classes, and styles",
            markdown: `Text is only one part of an element. HTML attributes, CSS classes, and styles also live on the element object.

An attribute is a name and value in the tag, such as \`data-state="open"\` or \`href\`. \`setAttribute("data-state", "open")\` sets that pair on the live element. \`getAttribute("data-state")\` reads it back. Attributes are useful for state that CSS or later JavaScript can see. A custom \`data-\` attribute is a normal way to store a small label such as "open" or "closed" without inventing a new HTML tag.

A class is a token in the \`class\` attribute. You could rewrite the whole attribute as a string, but that makes it easy to erase a class some other code still needs. \`classList\` is a small tool on the element for this job:

- \`classList.add("highlight")\` adds a class.
- \`classList.remove("quiet")\` removes a class.
- \`classList.toggle("highlight")\` adds it if it is missing and removes it if it is present.
- \`classList.contains("quiet")\` returns a boolean.

The CSS file still decides what \`.highlight\` looks like. JavaScript decides whether the element has that class. This is the same separation you already use: HTML for structure, CSS for appearance, JavaScript for behaviour that changes over time.

## The style property

\`title.style.color = "#1f4b2e"\` sets an inline style, the same as writing \`style="color: #1f4b2e"\` on the tag. Use a CSS property name written in camel case: \`backgroundColor\`, not \`background-color\`. The dash is subtraction in JavaScript, so the CSS name cannot be copied unchanged.

Inline styles beat class rules in the cascade because they sit on the element itself. That is useful for a one-off demo and awkward for a whole site. Prefer \`classList\` when the look is a design you might reuse. Use the \`style\` property when the value is calculated, such as a bar whose width depends on a number.

:::misunderstanding Setting style.color edits the CSS file
The CSS file is unchanged. The element carries an extra inline declaration. Remove it with \`title.style.color = ""\` if you want the stylesheet to control the colour again.
:::

:::tip Look at the class change
Give \`.highlight\` a background colour in the stylesheet. When the script adds the class, the background appears. If the background never appears, the class was added to the wrong element or the stylesheet is not linked.
:::`,
          },
          {
            heading: "textContent and innerHTML",
            markdown: `\`textContent\` writes plain text. If the string contains \`<strong>\`, the visitor sees those characters on the page. The browser does not treat them as a tag. That is the safe default for names, messages, counts, and anything a person typed.

\`innerHTML\` parses the string as HTML and builds real elements inside the target. \`notice.innerHTML = "<strong>Open</strong> until noon"\` makes a \`strong\` element. The method exists because sometimes you do need to insert markup you wrote yourself.

The risk appears when the string includes text you did not write. A visitor who types \`<img src=x onerror=alert(1)>\` into a box is sending characters. If you place that string into \`innerHTML\`, the browser builds the tag and can run the script. This is called cross-site scripting when it happens with untrusted text. You do not need to memorise the attack. You need the habit: text from a person goes through \`textContent\`.

## Replacing the inside of an element

\`innerHTML\` also throws away the previous children and any click behaviour attached to those children. A list rebuilt with \`innerHTML\` looks new and has lost the listeners you added earlier. Building with \`textContent\`, or creating elements and appending them, keeps you in control. This course uses \`textContent\` for the counter and the form messages.

A reasonable use of \`innerHTML\` in a beginner exercise is a fixed string in your own script, never a value copied from an input. If you are unsure, use \`textContent\`.

:::warning Do not assign input values to innerHTML
\`message.innerHTML = nameInput.value\` looks short and is the wrong tool. A stall name is text. \`message.textContent = nameInput.value\` shows the name and does not interpret tags inside it.
:::

:::example A fixed label you wrote
\`notice.innerHTML = "<strong>Open</strong> until noon"\` is markup from you, stored in the script. It is not a string that travelled through a form. Even here, \`textContent\` plus a real \`<strong>\` element in the HTML file is easier to read.
:::`,
          },
          {
            heading: "Putting the market board together",
            markdown: `The worked example uses one HTML file, one CSS file, and one JavaScript file in \`learning/week-09\`. The heading and the status paragraph exist in HTML so the page still means something if the script fails. The script then updates both elements, sets a \`data-state\` attribute, swaps classes, and colours the heading.

Read the script from top to bottom. It searches for two elements. If either search fails, it does nothing else, so it cannot crash on \`null\`. If both exist, it reads the old heading, writes the new heading, writes a sentence that includes the old heading, and updates attribute, class, and colour. Each of those lines is a separate skill from this lesson. Together they are one small programme.

## What you should notice when you refresh

The first paint may flash the original heading if you watch closely, then the script replaces it. That order is normal. HTML arrives first. The script runs second. The saved file still shows the original heading when you open it in the editor. The browser shows the edited DOM.

Keep this project in \`learning/week-09\`. Use that folder path on every system. The commands differ only in how you open a terminal or a file window. The files and the JavaScript are the same.

:::tip One change at a time
If the page does not update, comment out the later lines and refresh. When the heading changes, add the next line back. You already used this idea when you tested small pieces of a programme instead of the whole problem at once.
:::`,
          },
        ],
        vocabulary: [
          {
            term: "DOM",
            definition:
              "The live tree of a page in the browser, made of element objects that JavaScript can read and change.",
          },
          {
            term: "document",
            definition:
              "The JavaScript object that stands for the whole page and is the starting point for finding elements.",
          },
          {
            term: "getElementById",
            definition:
              "A method that finds the one element with a given id and returns that element or null.",
          },
          {
            term: "querySelector",
            definition:
              "A method that finds the first element matching a CSS selector, or null when nothing matches.",
          },
          {
            term: "textContent",
            definition:
              "The plain text inside an element. Assigning it replaces the visible words and does not interpret tags.",
          },
          {
            term: "null",
            definition:
              "A value that means no object was found. It is different from an empty string, which is text with no characters.",
          },
          {
            term: "classList",
            definition:
              "A tool on an element for adding, removing, toggling, and checking CSS classes without rewriting the whole class attribute.",
          },
          {
            term: "innerHTML",
            definition:
              "A property that reads or writes the inner markup of an element. It parses tags, so untrusted text does not belong there.",
          },
        ],
        demonstrations: [
          {
            title: "Change a heading from the console",
            intro:
              "You will open a saved page, find the heading from the console, and change only the live text. The HTML file stays the same until you edit it yourself.",
            steps: [
              "In your existing learning folder, create a folder named week-09 so the project path is learning/week-09.",
              "Create index.html with a heading whose id is page-title and whose text is Saturday market. Do not add a script yet.",
              "Open index.html in a browser using the steps for your system.",
              "Open developer tools and choose the Console tab, using the shortcut for your system.",
              "Type document.querySelector(\"#page-title\") and press Enter. The console should print the heading element.",
              "Type document.querySelector(\"#page-title\").textContent and press Enter. The console prints Saturday market.",
              "Assign a new string to textContent, press Enter, and look at the page heading rather than only the console.",
              "Open index.html in the editor and confirm the file still says Saturday market.",
            ],
            expected:
              "The heading in the browser changes to the new sentence. The file in the editor still shows Saturday market.",
            verify:
              "Refresh the page. The heading returns to Saturday market because the script was only typed in the console and was not saved in a file.",
            ifItFails:
              "If the console says the result is null, the id in the file does not match the selector. If the page text does not change, you are looking at a different tab than the one that owns this console.",
            os: {
              sameOnAllPlatforms:
                "The JavaScript you type in the console is the same on every system. Only the keys used to open tools change.",
              identify: [
                "An Apple menu in the corner means macOS. A Windows logo on the start button means Windows. A desktop such as Ubuntu, with neither logo, is Linux.",
                "If you are unsure, open the system settings. The about page names the operating system.",
              ],
              windows: [
                "Press the Windows key, type File Explorer, and open it. Go to your learning folder and create week-09.",
                "Double-click index.html to open it in your default browser. Press F12, then choose Console.",
              ],
              macos: [
                "Open Finder, go to your learning folder, and create week-09. Double-click index.html.",
                "In the browser, press Command-Option-I and choose Console. The Terminal app is not required for this console experiment.",
              ],
              linux: [
                "Open the Files app, go to your learning folder, and create week-09. Double-click index.html. If a text editor opens, choose Open With and pick your browser.",
                "Press F12 or Ctrl+Shift+I and choose Console. On Ubuntu, Ctrl+Alt+T opens Terminal if you later want to confirm the folder with pwd.",
              ],
            },
          },
          {
            title: "Save the change in a script",
            intro:
              "You will add market.js so the same kind of update happens on every load, and you will confirm the folder with a terminal command.",
            steps: [
              "Add styles.css and market.js from the worked examples into learning/week-09.",
              "Link the stylesheet from the head and the script from just before the closing body tag.",
              "Open a terminal with the steps for your system and move into learning/week-09.",
              "List the files and check that index.html, styles.css, and market.js are all in this folder.",
              "Refresh the browser. The heading and the status paragraph should change without any typing in the console.",
              "In the Elements panel, select the status paragraph and confirm it has the class highlight and the attribute data-state.",
              "Change one word in the new heading inside market.js, save, and refresh again.",
            ],
            expected:
              "Every refresh shows the text, colour, class, and data-state written by market.js. The status paragraph has a background from the highlight class.",
            verify:
              "In the console, document.querySelector(\"#status\").getAttribute(\"data-state\") prints open. The editor still shows the original heading text inside index.html.",
            ifItFails:
              "If the heading never changes, the script path is wrong or the script is above the heading in the file. If the background is missing, the stylesheet link points at the wrong filename.",
            os: {
              sameOnAllPlatforms:
                "From the folder that contains learning, run cd learning/week-09. The JavaScript files do not change between systems.",
              identify: [
                "Use the same system check as the previous demonstration if you are about to open a terminal and do not know which instructions to follow.",
                "The prompt looks different on each system. PowerShell often starts with PS. Terminal on macOS and Linux usually ends the prompt with a dollar sign.",
              ],
              windows: [
                "Press the Windows key, type PowerShell, and open Windows PowerShell. Run cd learning/week-09 from the folder that contains learning, then run Get-Location.",
                "Run Get-ChildItem and confirm the three project files are listed. Open the HTML file from File Explorer.",
              ],
              macos: [
                "Press Command-Space, type Terminal, and press Return. Run cd learning/week-09, then pwd.",
                "Run ls and confirm index.html, styles.css, and market.js are listed. You can also open the folder from Finder.",
              ],
              linux: [
                "Open Terminal from the application menu. On Ubuntu, Ctrl+Alt+T opens it. Run cd learning/week-09, then pwd.",
                "Run ls. Other Linux distributions use the same cd, pwd, and ls commands once you are in a terminal. Open the HTML file from the Files app.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "Market page before the script changes it",
            filename: "index.html",
            language: "html",
            level: "basic",
            code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Saturday market</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1 id="page-title">Saturday market</h1>
  <p id="status" class="quiet">The board is waiting.</p>
  <script src="market.js"></script>
</body>
</html>
`,
            explanation:
              "The page is useful before JavaScript runs. The ids match the searches in the script. The script tag is last so both elements exist when market.js starts.",
            lineNotes: [
              {
                focus: "id on the heading",
                note: "getElementById looks for page-title. The id appears once in the file.",
              },
              {
                focus: "class on the paragraph",
                note: "The quiet class is the starting look. The script removes it and adds highlight.",
              },
              {
                focus: "script tag",
                note: "A src path with only a filename looks in the same folder as the HTML file.",
              },
            ],
            expectedOutput:
              "Before the script, the page shows the heading Saturday market and the sentence The board is waiting. After a correct script load, those words are replaced.",
          },
          {
            title: "A class the script can turn on",
            filename: "styles.css",
            language: "css",
            level: "basic",
            code: `.quiet {
  color: #555555;
}

.highlight {
  background-color: #e7f6ec;
  padding: 8px;
}
`,
            explanation:
              "JavaScript does not need to know the colours. It only adds or removes class names. The stylesheet decides what those names look like.",
            lineNotes: [
              {
                focus: ".quiet",
                note: "This class is present in the HTML and removed by classList.remove.",
              },
              {
                focus: ".highlight",
                note: "This class is absent from the HTML and added by the script, which is why the background appears only after the script runs.",
              },
            ],
            expectedOutput:
              "The status paragraph gets a light green background and a little padding after the script adds highlight.",
          },
          {
            title: "Update text, attribute, class, and colour",
            filename: "market.js",
            language: "javascript",
            level: "practical",
            code: `const title = document.getElementById("page-title");
const status = document.querySelector("#status");

if (title !== null && status !== null) {
  const earlier = title.textContent;
  title.textContent = "Saturday market is open";
  status.textContent = "The heading used to say: " + earlier;
  status.setAttribute("data-state", "open");
  status.classList.remove("quiet");
  status.classList.add("highlight");
  title.style.color = "#1f4b2e";
}
`,
            explanation:
              "The script finds two elements, stops if either is missing, then updates text and presentation. Nothing here uses innerHTML.",
            lineNotes: [
              {
                focus: "getElementById and querySelector",
                note: "One search uses the id string alone. The other uses a CSS selector with a hash.",
              },
              {
                focus: "null check",
                note: "The block runs only when both searches returned an element.",
              },
              {
                focus: "textContent",
                note: "The old heading is read into earlier, then both elements receive new plain text.",
              },
              {
                focus: "setAttribute, classList, and style",
                note: "These three lines change the attribute, the classes, and one inline colour.",
              },
            ],
            expectedOutput:
              "The heading reads Saturday market is open in green. The paragraph reads The heading used to say: Saturday market, with a green background and data-state set to open.",
          },
        ],
        exercises: [
          {
            title: "Rename the shop",
            difficulty: "warm-up",
            prompt:
              "Change the live heading to the name of a shop or stall you like. Keep the original words in the HTML file so you can still see the difference between the file and the DOM.",
            steps: [
              "Open learning/week-09/market.js.",
              "Replace the new heading string with your shop name.",
              "Save the file and refresh the browser.",
              "Open index.html in the editor and read the h1 text that is still saved there.",
            ],
            expectedOutcome:
              "The browser heading shows your shop name. The h1 in the HTML file still shows the original words.",
          },
          {
            title: "Add a second message",
            difficulty: "practice",
            prompt:
              "Add another paragraph to the page and update it from JavaScript with textContent and a class. Do not use innerHTML.",
            steps: [
              "Add a paragraph with its own id and a starting sentence in index.html.",
              "Add a CSS class that changes the paragraph border or background.",
              "In market.js, find the paragraph with querySelector and skip the update if the result is null.",
              "Set textContent to a new sentence and add your class with classList.add.",
              "Refresh and confirm both the words and the class change.",
            ],
            expectedOutcome:
              "The new paragraph shows your sentence and the style from the class you added. The console has no error.",
          },
          {
            title: "Read an attribute",
            difficulty: "stretch",
            prompt:
              "After the script sets data-state, read that attribute back and include its value in the status sentence.",
            steps: [
              "Keep the setAttribute line that writes data-state.",
              "On the next line, store getAttribute(\"data-state\") in a const.",
              "Build the status sentence so it includes that stored value.",
              "Refresh and check the sentence. Then inspect the element and compare the attribute with the sentence.",
            ],
            expectedOutcome:
              "The visible sentence includes the same state word that appears in the Elements panel.",
          },
        ],
        troubleshooting: [
          {
            problem: "Uncaught TypeError: Cannot read properties of null",
            why: "The script used textContent, classList, or style on a search that returned null. The id or selector does not match, or the script ran before the element existed.",
            solution:
              "Compare the string in querySelector or getElementById with the HTML, including the hash only for querySelector. Move the script tag to just before </body> and refresh.",
          },
          {
            problem: "The page still shows the original heading after a refresh",
            why: "The browser loaded the HTML and never ran the new script, or it used a cached copy of an older empty file.",
            solution:
              "Check the script src filename and that market.js sits in the same folder. Open the Network or Sources panel and confirm market.js loads. Hard-refresh the page after saving.",
          },
          {
            problem: "The class is added but the colours never change",
            why: "The stylesheet is not linked, the class name in CSS does not match classList.add, or an inline style is overriding the class.",
            solution:
              "Open styles.css from the page and confirm the link href. Make the class names match exactly, including capital letters. Remove a conflicting title.style assignment if it covers the property you expected the class to control.",
          },
          {
            problem: "Tags appear as visible characters, or a typed name changes the layout",
            why: "textContent shows characters exactly. innerHTML turns a string from an input into real markup.",
            solution:
              "Use textContent for the stall name and for ordinary messages. Reserve innerHTML for a fixed snippet you wrote, or avoid it in this project.",
          },
        ],
        knowledgeChecks: [
          {
            id: "w09-dom-file",
            format: "Multiple choice",
            question: "You change a heading with textContent and then look at the HTML file in the editor. What is true?",
            options: [
              "The editor and the open page both show the new heading immediately, because they are the same object.",
              "The open page shows the new heading. The file changes only if you edit and save it.",
              "The file updates, and the open page updates only after you close the browser.",
              "textContent writes a new HTML file beside the old one.",
            ],
          },
          {
            id: "w09-dom-null",
            format: "True or false",
            question: "querySelector returns an empty string when no element matches the selector.",
          },
          {
            id: "w09-dom-text",
            format: "Short answer",
            question:
              "A form will later send a stall name onto the page. Why is textContent the right property for that name?",
          },
          {
            id: "w09-dom-selector",
            format: "Multiple choice",
            question: "Which search matches an element written as <p id=\"status\"></p>?",
            options: [
              "document.getElementById(\"#status\")",
              "document.querySelector(\"status\")",
              "document.getElementById(\"status\")",
              "document.querySelectorAll(\"#status\").textContent",
            ],
          },
        ],
        homework: {
          description:
            "Build a tiny page in learning/week-09 that changes a heading and a paragraph with JavaScript. Then write a lesson response that shows the before and after text and explains one choice you made.",
          requirements: [
            "The HTML file contains the original heading and paragraph, and the script changes both with textContent.",
            "The script checks for null before it changes an element, and it updates at least one class or attribute as well as the text.",
            "The written response quotes the original sentence, the sentence a visitor sees after refresh, and one reason you used textContent.",
          ],
          deliverables: [
            "A lesson response that includes your explanation and the JavaScript you wrote. Say that the files are in learning/week-09.",
          ],
          submission:
            "Paste the response into the lesson homework box for this session. This is a lesson response, not the graded week assignment.",
          criteria: [
            "The before and after text are both present and they differ.",
            "The script would find elements safely and change the live page without innerHTML for those sentences.",
          ],
          submissionKind: "lesson_response",
        },
        summary: [
          "The DOM is the browser's live tree. The HTML file is the saved description that the browser reads when it builds that tree.",
          "getElementById and querySelector find an element. A missing element is null, and null must be checked before use.",
          "textContent changes visible words as plain text. classList, setAttribute, and the style property change presentation.",
          "innerHTML parses markup. Text that a person typed should go through textContent instead.",
        ],
        nextLesson: {
          title: "Events and interaction",
          lessonSlug: "events-and-interaction",
          why: "The market script runs once at load. Next you will wait for a click, typing, or a submit, and update the DOM in response.",
        },
      },
      guide: {
        sessionNumber: 17,
        week: 9,
        title: "Understanding the DOM",
        durationMinutes: 90,
        objectives: [
          "Students can point to the file and to the live tree as two different things.",
          "Students can find an element and change its text from the console and from a saved script.",
          "Students can say why a stall name should not be written with innerHTML.",
        ],
        tools: [
          "A browser with developer tools",
          "Visual Studio Code",
          "The learning/week-09 folder",
        ],
        preparation: [
          "Create a finished learning/week-09 demo on your machine and load it once so you know the heading changes.",
          "Prepare a second copy of index.html with the script tag moved into the head, so you can show a null error and then repair it.",
          "Open developer tools before class on the computer you will share, and increase the console font if the room will read a projected screen.",
        ],
        flow: [
          {
            minutes: 5,
            title: "Blueprint and shop",
            detail:
              "Show the saved HTML on one side and the browser on the other. Say: this file is the blueprint, and this window is the shop. Tell students the goal is to change the shop without pretending the blueprint rewrote itself.",
          },
          {
            minutes: 15,
            title: "Draw the tree",
            detail:
              "Draw document, html, body, h1, and p for the market page. Ask which node is the parent of the heading. Introduce getElementById and querySelector with the hash difference written on the board. Do not open React or events yet.",
          },
          {
            minutes: 20,
            title: "Console change",
            detail:
              "Open the HTML file with no script. Ask a student to read the heading aloud. In the console, read textContent, then assign a new sentence. Ask the class to look at the page and then at the unsaved file. Refresh and show that the console edit is gone.",
          },
          {
            minutes: 30,
            title: "Save market.js",
            detail:
              "Students create learning/week-09 and add the three files. Walk the room and look for script tags in the head and for querySelector without a hash. When a page fails, ask the student to read the console line aloud before you touch the keyboard.",
          },
          {
            minutes: 10,
            title: "innerHTML pause",
            detail:
              "Type a fixed strong tag through innerHTML so they see real markup appear. Then type a made-up name that contains a tag-looking word and show textContent leaving it as text. Say that names and messages stay on textContent.",
          },
          {
            minutes: 10,
            title: "Knowledge checks and homework",
            detail:
              "Ask the four checks aloud. Collect one-sentence answers for the short question. Point at the lesson response: before text, after text, and the script, saved under learning/week-09. Preview that the next session waits for a click.",
          },
        ],
        explain: [
          "The DOM is memory in the tab, built from the file, and thrown away on refresh.",
          "null means the search failed. An empty string means the element exists and has no text.",
          "classList changes tokens. The stylesheet still owns the colours.",
          "textContent is the default for words a person will read or type.",
        ],
        questions: [
          "If you unplug the screen, does the HTML file disappear? What does that say about the file versus the painted page?",
          "Why does getElementById(\"status\") need no hash when the CSS selector does?",
          "What will the paragraph show if you assign a string that contains <strong>hello</strong> to textContent?",
        ],
        demonstration:
          "Start with a script-free page, change the heading only in the console, refresh to lose that change, then add market.js and refresh to show the change coming back from the file.",
        practice:
          "Students rename the heading from market.js, then add a second paragraph with its own id, textContent update, and class. The stretch students read data-state back into the sentence.",
        expectedOutcomes: [
          "Each student has a learning/week-09 page whose live heading differs from the saved h1 text.",
          "Students can show a null check in their script.",
          "Students can say where innerHTML would be the wrong assignment.",
        ],
        difficulties: [
          {
            issue: "The student is sure the id matches, but the console still reports null.",
            help:
              "Ask them to click the heading in the Elements panel and read the id attribute from the live tree. Often the file they edited is not the file the browser opened, or the script ran from the head. Open the file from learning/week-09 only.",
          },
          {
            issue: "The student pastes the new heading into index.html and also into the script, then cannot explain which one the browser used.",
            help:
              "Put the original sentence back in the HTML. Keep the new sentence only in JavaScript. Refresh and look at both. This restores the contrast the lesson is built on.",
          },
        ],
        homework:
          "Lesson response: original sentence, sentence after refresh, the script, and a reason for textContent. Files live in learning/week-09. The graded counter is the next session's assignment, so do not require decrease and reset today.",
        assessment:
          "Use the four knowledge checks. A passing picture is: file and DOM are different, a failed search is null, getElementById does not take a hash, and typed text uses textContent.",
        recap:
          "Ask one student to explain the blueprint analogy in their own shop or kitchen example. End by saying the script currently runs immediately, and next time the page will wait for the visitor.",
        knowledgeCheckAnswers: [
          {
            id: "w09-dom-file",
            answer: "The open page shows the new heading. The file changes only if you edit and save it.",
            explanation:
              "textContent writes to the live element. The editor shows the file on disk until the author saves a new version.",
          },
          {
            id: "w09-dom-null",
            answer: "False",
            explanation:
              "A failed querySelector or getElementById returns null. An empty string would mean the element was found and contains no text.",
          },
          {
            id: "w09-dom-text",
            answer:
              "textContent inserts the name as plain text, so tags in the name stay visible characters and are not built as HTML.",
            explanation:
              "Accept any answer that says the name is untrusted text and textContent does not parse it as markup. innerHTML would.",
          },
          {
            id: "w09-dom-selector",
            answer: "document.getElementById(\"status\")",
            explanation:
              "getElementById takes the id without a hash. querySelector would need \"#status\". querySelectorAll returns a list, which has no textContent of its own.",
          },
        ],
      },
    },
    {
      slug: "events-and-interaction",
      sessionNumber: 18,
      title: "Events and interaction",
      estimatedMinutes: 90,
      difficulty: "Guided practice",
      requiresOs: true,
      content: {
        overview: {
          about:
            "This lesson teaches events: signals the browser sends when someone clicks, types, or submits a form. You will connect a listener, read the event, stop a form from reloading the page, check the input, and update the DOM.",
          why: "Pages become useful when they react to a person. A click is how a counter moves. A submit is how a form can check a name before it claims to save it.",
          alreadyKnow:
            "You can find an element and change its textContent, classes, and attributes without crashing on null.",
        },
        objectives: [
          "Explain an event as a signal and a listener as the function that runs in response.",
          "Handle click, input, and submit with addEventListener.",
          "Use the event object and preventDefault on a form submit.",
          "Validate a text field and show a clear message in the page.",
          "Update a counter on screen from a number stored in a variable.",
        ],
        prerequisites: [
          {
            label: "Finding elements and updating textContent safely.",
            lessonSlug: "understanding-the-dom",
          },
        ],
        teachingNotes: [
          {
            heading: "Events are signals",
            markdown: `An event is a signal that something happened in the page. A click happened. A keystroke changed an input. A form was submitted. The browser creates an event object that describes what happened and which element it happened to.

The page does not need to ask "has there been a click yet?" over and over. That would waste work, the way calling a friend's phone every second wastes calls. Instead you register interest. You say: when this button is clicked, run this function. The function you register is a listener. The method that registers it is \`addEventListener\`.

This is the same DOM you used in the last lesson. The difference is timing. Last time the script changed the heading immediately. Now the script only sets up listeners, and the changes happen later, when the person acts.

## A doorbell

The button is the doorbell. \`addEventListener\` is you telling the household who will answer. The listener function is the person who gets up. The event object is the information you can check at the door, such as which bell rang. Nothing inside the listener runs at setup time. It runs when the bell rings.

:::misunderstanding The listener runs as soon as addEventListener is called
addEventListener stores the function. It does not run it. The function runs later, once for each matching event. If the heading changes the moment the script loads, the function was called during setup instead of being passed in.
:::

:::example Two different moments
When the script loads, the message can stay "No stall saved yet." When the person presses Save, the listener runs and the message changes. The load and the click are different events.
:::`,
          },
          {
            heading: "Click listeners",
            markdown: `A button needs \`type="button"\` when it is not submitting a form. Inside a form, a button without a type may submit and reload the page, which looks like your click handler failed.

\`\`\`js
const increase = document.querySelector("#increase");
const output = document.querySelector("#count");
let count = 0;

if (increase !== null && output !== null) {
  increase.addEventListener("click", function () {
    count = count + 1;
    output.textContent = String(count);
  });
}
\`\`\`

Read it in order. \`count\` lives outside the listener so it survives from one click to the next. If you declare \`let count = 0\` inside the function, every click starts again at zero and the screen looks stuck at 1. The string conversion matters because the page shows text.

The first argument to \`addEventListener\` is the event name, a string: \`"click"\`. The second argument is the function. You pass the function itself. You do not write \`function () { ... }()\` with an extra pair of parentheses after it. Parentheses would call it immediately.

## Several buttons, one count

Decrease subtracts 1. Reset assigns 0. Each button gets its own listener, and each listener closes over the same \`count\` variable. Closing over means the inner function can see \`count\` from the outer scope. You used scope when you learned functions. This is that idea, attached to a button.

After each change, write \`count\` into the element. Updating the variable without updating \`textContent\` changes memory and leaves the old number on screen. The person only sees the DOM.

:::warning A missing type on a button inside a form
If the number jumps and then the page reloads back to the start, the button submitted the form. Set type="button", or handle submit and call preventDefault. Reloading builds a new DOM and a new count at 0.
:::

:::tip Name the event out loud
When you write addEventListener, say the sentence: "When this button is clicked, add one and show the number." If you cannot say it, the listener is doing too many jobs at once.
:::`,
          },
          {
            heading: "Input events and the event object",
            markdown: `The \`"input"\` event fires when the value of a field changes. That includes typing, deleting, and some paste actions. It is the right event for a live preview. It is not the moment you save. Saving belongs with \`"submit"\` or with a deliberate click.

Every listener can take the event object as its parameter. A common name is \`event\`. The object has a \`target\`, the element where the event happened, and methods such as \`preventDefault\`. For an input listener, reading \`nameInput.value\` is often clearer than walking through the target, because you already stored the element.

\`\`\`js
nameInput.addEventListener("input", function () {
  message.textContent = "Typing: " + nameInput.value;
});
\`\`\`

\`value\` is the current string in the control. It is not \`textContent\`. Inputs keep what the person typed in \`value\`. Paragraphs keep their sentence in \`textContent\`. Mixing those up leaves the message empty or the input unchanged.

## What the event object is for

You need the event parameter when the browser's default action should be cancelled, or when one listener serves many elements and you must ask which element was used. For a single known button that only adds 1, the function can ignore the event. For a form, you need the event so you can call \`preventDefault\`.

\`event.target\` is the element that received the action. If you use it, remember it might not be the element you expect when events bubble from a child. Bubbling means a click on a child can also be heard by a parent. This course keeps listeners on the button or the form itself so the target is easier to understand.

:::misunderstanding input and submit are the same because both involve the form
input means the field is changing. submit means the person asked to send the form. A preview can update on input. A saved message and a validation check belong on submit.
:::`,
          },
          {
            heading: "Submit and preventDefault",
            markdown: `A form's default action is to navigate. Even a form with no \`action\` attribute reloads the current page and puts the fields into the address bar as a query string. That navigation destroys the DOM you just updated. The visitor may see a flash of the new message and then the original page.

\`preventDefault\` tells the browser to skip that default action for this event. The listener still runs. You call it on the event object, usually first, so a later error does not leave the reload in place.

\`\`\`js
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  if (name.length === 0) {
    message.textContent = "Add a stall name before saving.";
    return;
  }
  message.textContent = "Saved stall: " + name;
});
\`\`\`

The listener is on the form, and the event name is \`"submit"\`. Pressing Enter in the field and clicking the submit button both submit the form. You do not need a separate click listener on the button if the button's type is \`submit\`.

## trim and the empty check

\`trim\` returns a new string with spaces removed from both ends. A field full of spaces looks non-empty if you only check \`value === ""\`. After \`trim\`, those spaces become an empty string and the check works. \`trim\` does not change the input by itself. Assign it back if you want the box to show the trimmed text.

\`return\` after the error message skips the success sentence. Without it, both messages run and the second one replaces the error. The visitor would never see the warning.

:::misunderstanding preventDefault deletes the form
It cancels the browser's navigation for this submit. The form, the typed value, and your listener all remain. Remove the preventDefault line once, on purpose, and watch the page reload so the default action is visible.
:::

:::example A successful save
The person types "Honey" and chooses Save. The page does not reload. The message says Saved stall: Honey. The address bar does not gain a question mark.
:::`,
          },
          {
            heading: "Basic validation and the DOM message",
            markdown: `Validation means checking that a value is acceptable before you treat it as saved. HTML can do some of this with attributes you already used, such as \`required\`. JavaScript validation is still worth learning because the message can be a sentence you write, placed where you want it, and because the rules can be richer than a single attribute.

A clear pattern has three parts. Read the value. Decide. Write one message into the page. The decision is an \`if\` statement, which you already use. The writing step is \`textContent\`, which you used on the market board.

Rules that fit this lesson:

- The trimmed name must not be empty.
- The trimmed name must be at least three characters.
- The message for a failure tells the person what to do next.
- The message for success repeats the accepted name so they can see what was stored.

Do not clear the input on failure. The person needs the text in order to fix it. Clearing it on success is reasonable, because the name is now in the message. Either policy is fine if you can explain it.

## Where the message lives

Put an empty or waiting paragraph in the HTML. The script only replaces its text. If you create the paragraph from JavaScript, you have more moving parts on the first try. A paragraph that already exists is easier to find with \`querySelector\`.

Keep the message polite and specific. "Add a stall name before saving." says what was wrong. "Error" does not. You are practising the same care you used when you named variables so a reader could tell what they held.

:::tip required and JavaScript together
If the input has required, the browser may block submit before your listener runs. For this lesson, leave required off until your own message works. Then add required and see which message appears first.
:::

:::warning The success message can still be wrong
If you forget trim, "   " can be saved. If you join the name with innerHTML, a name that looks like a tag can change the page. Check the empty string and use textContent.
:::`,
          },
          {
            heading: "A counter you can explain",
            markdown: `The graded piece for this week is a counter with increase, decrease, and reset. The class example for listeners is the stall form, so you can build the counter yourself and still have a model for each skill.

The counter needs:

- A number variable starting at 0.
- An element that shows the number.
- Three buttons: increase, decrease, and reset.
- A listener for each button.
- \`textContent\` updated after every change.
- A short status sentence that depends on the number: negative, zero, or positive. That sentence is another \`if\` / \`else if\` / \`else\`, written into a second element.

Decrease is allowed to go below zero in the basic assignment unless you decide to stop at zero and show a message. Either rule is acceptable if the buttons do what your page claims. The reset button sets the number back to 0 and updates both the number and the sentence.

## Files and systems

Keep the counter in \`learning/week-09\`, for example \`learning/week-09/counter.html\` and \`learning/week-09/counter.js\`. Open the HTML file from the file manager after you save. Use the console if a button does nothing. The JavaScript is the same on Windows, macOS, and Linux.

A to-do list uses the same events: a form submit adds an item, a click on a delete button removes one. You can practise that after the counter if you want more. The assignment is the counter, with a visible number, three actions, and a sentence that follows the number.

:::example One click, two updates
Increase sets count to 1 and the sentence to "The count is positive." Reset sets count to 0 and the sentence to "The count is zero." Both strings are written with textContent.
:::`,
          },
        ],
        vocabulary: [
          {
            term: "Event",
            definition:
              "A signal from the browser that something happened, such as a click, a change in an input, or a form submit.",
          },
          {
            term: "Listener",
            definition:
              "A function registered to run when a particular event happens on a particular element.",
          },
          {
            term: "addEventListener",
            definition:
              "The method that connects an element, an event name, and a listener function without running that function immediately.",
          },
          {
            term: "Event object",
            definition:
              "The value passed to a listener, with information about the event and methods such as preventDefault.",
          },
          {
            term: "preventDefault",
            definition:
              "A method that cancels the browser's usual action for an event, such as reloading the page when a form submits.",
          },
          {
            term: "Validation",
            definition:
              "A check that a value is acceptable before the programme treats it as saved, plus a message when it is not.",
          },
          {
            term: "value",
            definition:
              "The current text in a form control. It is different from textContent, which is the text of an ordinary element.",
          },
        ],
        demonstrations: [
          {
            title: "Watch a form reload, then stop it",
            intro:
              "You will submit a form once with the browser's default action, then add preventDefault and a validation message so the page stays put and tells the truth about an empty name.",
            steps: [
              "Create learning/week-09/signup.html with a form, a text input, a submit button, and a message paragraph. Leave the script empty at first.",
              "Open the file in a browser, type a name, and submit. Watch the page reload and watch the address bar.",
              "Add signup.js and attach a submit listener that only writes Saved, with no preventDefault yet.",
              "Submit again and notice that the saved message does not stay.",
              "Add event.preventDefault() as the first line inside the listener and submit again.",
              "Add the trim and empty check from the worked example. Submit with an empty field, then with spaces only, then with a real name.",
              "Open the console and confirm there is no error after each of those three submits.",
            ],
            expected:
              "Without preventDefault the page reloads. With it, an empty name shows the warning and a real name shows Saved stall plus the name. The address bar stays clean.",
            verify:
              "The message paragraph text matches the case you tried. Reloading manually brings back the waiting sentence from the HTML file.",
            ifItFails:
              "If nothing runs, the script is not linked or the ids differ. If the page still reloads, preventDefault is not called on the submit event, or you listened for click on a submit button and the form navigated anyway.",
            os: {
              sameOnAllPlatforms:
                "Create the files in learning/week-09 and open signup.html in a browser. The form script is the same everywhere.",
              identify: [
                "Check the Apple menu or Windows logo, or the system about page, if you do not know which file-manager steps to use.",
                "Developer tools: F12 on Windows and Linux, Command-Option-I on macOS.",
              ],
              windows: [
                "In File Explorer, open the learning folder, then week-09. Create the HTML file in Visual Studio Code.",
                "Double-click signup.html. If you use PowerShell to confirm the folder, open it from the Start menu and run cd learning/week-09 and then Get-Location.",
              ],
              macos: [
                "In Finder, open learning/week-09 and create the file in Visual Studio Code.",
                "Double-click signup.html. Terminal is optional: Command-Space, Terminal, then cd learning/week-09 and pwd.",
              ],
              linux: [
                "In Files, open learning/week-09. On Ubuntu, open Terminal with Ctrl+Alt+T, run cd learning/week-09, then pwd, then ls.",
                "Open signup.html in the browser. Other distributions use their own file manager, and the same cd, pwd, and ls commands in the terminal.",
              ],
            },
          },
          {
            title: "Wire one counter button",
            intro:
              "You will connect a single increase button so the class can see a click update a number. Decrease and reset stay for your assignment.",
            steps: [
              "Add a paragraph with id count whose text is 0, and a button with id increase and type button.",
              "In the script, start let count at 0 and find both elements.",
              "Register a click listener that adds 1 to count and writes String(count) into the paragraph.",
              "Reload the page. The number should still be 0 before any click.",
              "Click Increase three times and read the number.",
              "Refresh and confirm the count returns to 0 because this page does not store it yet.",
              "Click once more and confirm the listener was registered again by the new page load.",
            ],
            expected:
              "The number starts at 0 on each load and increases by 1 on each click. There is no reload when you click, because the button type is button.",
            verify:
              "After three clicks the paragraph shows 3. The console does not show a null error. Refreshing shows 0.",
            ifItFails:
              "If the number jumps to 1 on load, the listener function was called immediately. If it stays at 1 forever, count is declared inside the listener. If the page reloads, the button is submitting a form.",
            os: {
              sameOnAllPlatforms:
                "Use the same learning/week-09 folder. A click listener does not depend on the operating system.",
              windows: [
                "Edit the files in Visual Studio Code. Open the page from File Explorer.",
                "Use F12 and the Console tab if a click does nothing. PowerShell is only needed if you want Get-Location to confirm you are in learning/week-09.",
              ],
              macos: [
                "Edit in Visual Studio Code and open the page from Finder.",
                "Use Command-Option-I for the console. Use Terminal, cd learning/week-09, and pwd only if you are unsure which folder the browser opened.",
              ],
              linux: [
                "Edit in Visual Studio Code. Open the page from Files. On Ubuntu, F12 opens developer tools.",
                "If the browser opened the wrong copy, use the terminal, cd learning/week-09, and ls to see the files you actually edited.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "Stall signup page",
            filename: "signup.html",
            language: "html",
            level: "basic",
            code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Stall signup</title>
</head>
<body>
  <h1>Stall signup</h1>
  <form id="signup-form">
    <label for="stall-name">Stall name</label>
    <input id="stall-name" name="stall-name" type="text">
    <button type="submit">Save stall</button>
  </form>
  <p id="message">No stall saved yet.</p>
  <script src="signup.js"></script>
</body>
</html>
`,
            explanation:
              "The form has a label tied to the input. The message paragraph exists before any script runs. The button submits the form, and the script will handle that submit.",
            lineNotes: [
              {
                focus: "label and input",
                note: "for and id match, so a click on the label focuses the field.",
              },
              {
                focus: "button type",
                note: "submit is correct here because the listener is on the form's submit event.",
              },
              {
                focus: "message paragraph",
                note: "The script replaces this text. It does not have to create the paragraph.",
              },
            ],
            expectedOutput:
              "The page shows a stall name field, a Save stall button, and the sentence No stall saved yet.",
          },
          {
            title: "Validate on submit",
            filename: "signup.js",
            language: "javascript",
            level: "practical",
            code: `const form = document.querySelector("#signup-form");
const nameInput = document.querySelector("#stall-name");
const message = document.querySelector("#message");

if (form !== null && nameInput !== null && message !== null) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = nameInput.value.trim();
    if (name.length === 0) {
      message.textContent = "Add a stall name before saving.";
      return;
    }
    message.textContent = "Saved stall: " + name;
  });

  nameInput.addEventListener("input", function () {
    message.textContent = "Typing: " + nameInput.value;
  });
}
`,
            explanation:
              "Submit checks the trimmed name and writes one message. Input updates a preview while the person types. Both listeners ignore innerHTML.",
            lineNotes: [
              {
                focus: "submit listener",
                note: "The function receives the event and cancels the reload before it reads the field.",
              },
              {
                focus: "trim and return",
                note: "Spaces do not count as a name. return stops the success line from replacing the warning.",
              },
              {
                focus: "input listener",
                note: "This preview runs on typing. It is separate from the save check.",
              },
            ],
            expectedOutput:
              "Typing shows Typing: and the current field text. Submitting an empty field shows the warning and keeps the page. Submitting Honey shows Saved stall: Honey.",
          },
          {
            title: "One increase button",
            filename: "counter-start.js",
            language: "javascript",
            level: "improved",
            code: `const output = document.querySelector("#count");
const increase = document.querySelector("#increase");
let count = 0;

if (output !== null && increase !== null) {
  increase.addEventListener("click", function () {
    count = count + 1;
    output.textContent = String(count);
  });
}
`,
            explanation:
              "This is the increase action only. The assignment asks you to add decrease, reset, and a sentence that describes the number. The count variable stays outside the listener.",
            lineNotes: [
              {
                focus: "let count",
                note: "The variable lives across clicks. Declaring it inside the function would reset the memory every time.",
              },
              {
                focus: "click function",
                note: "The function is passed into addEventListener. It is not called on the same line.",
              },
              {
                focus: "String(count)",
                note: "The paragraph needs text. String turns the number into digits.",
              },
            ],
            expectedOutput:
              "Each click on Increase changes the paragraph from 0 to 1, then 2, and so on, until the page is refreshed.",
          },
        ],
        exercises: [
          {
            title: "Preview the stall name",
            difficulty: "warm-up",
            prompt:
              "Make the message paragraph follow the input while the person types, then confirm submit still validates.",
            steps: [
              "Start from the stall signup files in learning/week-09.",
              "Add an input listener if you do not already have one.",
              "Type three letters and read the message after each letter.",
              "Clear the field and submit. You should see the empty-name warning, not only the preview.",
            ],
            expectedOutcome:
              "The message changes while typing, and a blank submit still shows the validation sentence without reloading.",
          },
          {
            title: "Require three characters",
            difficulty: "practice",
            prompt:
              "Reject a trimmed stall name shorter than three characters with a message that says what to fix. Keep names of three or more characters.",
            steps: [
              "After the empty check, add another condition that looks at name.length.",
              "Write a specific message for the short name and return so the success line does not run.",
              "Try one letter, two letters, and three letters.",
              "Try a name with spaces around a two-letter word and decide whether trim makes it fail. It should.",
            ],
            expectedOutcome:
              "Names shorter than three characters stay unsaved and show your warning. A name of three or more characters shows the saved sentence.",
          },
          {
            title: "Status sentence for a number",
            difficulty: "stretch",
            prompt:
              "Beside a counter, show a sentence that says whether the count is negative, zero, or positive. You do not need the full assignment styling.",
            steps: [
              "Add a second paragraph for the status sentence.",
              "Write a function that sets the sentence from the current number using if, else if, and else.",
              "Call that function after increase and after you add any other button.",
              "Click until the number is positive, refresh to see zero, and, if you already have decrease, click below zero.",
            ],
            expectedOutcome:
              "The sentence always matches the number on screen after each click and after a refresh.",
          },
        ],
        troubleshooting: [
          {
            problem: "The message changes as soon as the page loads",
            why: "The listener was called during setup. A trailing pair of parentheses after the function runs it and passes its return value, which is not a function.",
            solution:
              "Pass the function into addEventListener without calling it. The call belongs inside the browser's hands, later, when the event happens.",
          },
          {
            problem: "Submit flashes a message and then the form is empty again",
            why: "The browser followed the default submit action and loaded the page again. The updated DOM was discarded.",
            solution:
              "In the submit listener, call event.preventDefault() before you return. Listen on the form for submit, not only on a button click that still lets the form navigate.",
          },
          {
            problem: "Increase only ever shows 1",
            why: "count is created inside the listener, so each click starts from 0 and adds 1.",
            solution:
              "Declare let count = 0 beside the element searches, outside the function. The listener should update that same variable.",
          },
          {
            problem: "The input listener cannot read textContent of the field",
            why: "The words in a text field are stored in value. textContent does not track what the person typed into the control.",
            solution:
              "Read nameInput.value, trim it when you validate, and write messages into the paragraph with textContent.",
          },
        ],
        knowledgeChecks: [
          {
            id: "w09-event-when",
            format: "Multiple choice",
            question: "When does the function passed to addEventListener run?",
            options: [
              "Immediately, while addEventListener is running.",
              "Once, when the file is saved.",
              "Later, each time the named event happens on that element.",
              "Only when the console is open.",
            ],
          },
          {
            id: "w09-event-default",
            format: "True or false",
            question: "preventDefault on a submit event removes the form from the HTML file.",
          },
          {
            id: "w09-event-count",
            format: "Short answer",
            question: "Why should the counter's count variable be declared outside the click listener?",
          },
          {
            id: "w09-event-trim",
            format: "Multiple choice",
            question: "The input contains three spaces and the person submits. The listener trims the value and checks length === 0. What happens?",
            options: [
              "trim turns the spaces into an empty string, so the empty-name message runs.",
              "Spaces count as a valid stall name because they are characters.",
              "preventDefault restores the spaces after trim.",
              "The browser rejects spaces before the listener runs, even without the required attribute.",
            ],
          },
        ],
        homework: {
          description:
            "Build the interactive counter and submit it as this week's assignment. The page needs increase, decrease, and reset, and the number on screen must follow the variable.",
          requirements: [
            "Complete the week assignment: a counter page with increase, decrease, reset, and a sentence that depends on the number.",
            "Keep the project files in learning/week-09 and use textContent for the number and the sentence.",
          ],
          deliverables: [
            "The week assignment submission for the interactive counter, including how to open the page from learning/week-09.",
          ],
          submission:
            "Submit the counter through the module assignment for this week. Use the assignment page rather than the lesson response box.",
          criteria: [
            "All three buttons update the visible number correctly from a starting value of 0.",
            "The status sentence matches negative, zero, and positive counts, and a refresh starts back at zero.",
          ],
          submissionKind: "module_assignment",
        },
        summary: [
          "addEventListener stores a function to run later for a named event such as click, input, or submit.",
          "The event object describes what happened. preventDefault stops a form from reloading the page.",
          "Validate trimmed input and write one clear message with textContent.",
          "A counter keeps its number outside the listener and copies that number into the DOM after every click.",
        ],
        nextLesson: {
          title: "Version control and Git",
          lessonSlug: "version-control-and-git",
          why: "You now have HTML, CSS, and JavaScript files worth keeping. Next you will save versions of a project so you can see what changed and return to an earlier snapshot.",
        },
      },
      guide: {
        sessionNumber: 18,
        week: 9,
        title: "Events and interaction",
        durationMinutes: 90,
        objectives: [
          "Students can connect a click and a submit listener that updates the page.",
          "Students can show what reload does to a counter and why preventDefault exists.",
          "Students leave ready to build the three-button counter without a full solution on screen.",
        ],
        tools: [
          "Browser developer tools",
          "Visual Studio Code",
          "learning/week-09 from the previous session",
        ],
        preparation: [
          "Have two versions of the stall form ready: one without preventDefault and one with validation.",
          "Prepare a counter that only implements increase, so you do not leave decrease and reset on the screen during practice.",
          "Read the assignment rubric so the last ten minutes point at the real requirements: three buttons, a sentence, textContent, and a zero start.",
        ],
        flow: [
          {
            minutes: 5,
            title: "The page that waits",
            detail:
              "Open the market page from last session and say: this script acts immediately. Today the script will wait. Ask what a person might do on a signup page: type, and press save. Name those as input and submit.",
          },
          {
            minutes: 15,
            title: "Doorbell and default reload",
            detail:
              "Explain listener versus call with the doorbell analogy. Then submit the form with no script and point at the address bar after reload. Say that this navigation is the default, and it is why a counter inside a careless form seems to forget its number.",
          },
          {
            minutes: 20,
            title: "Live stall form",
            detail:
              "Add the submit listener without preventDefault and let the class watch the message disappear. Add preventDefault and repeat. Then add the empty check and ask a student to try spaces only. Narrate trim as a new string, not a change to the file.",
          },
          {
            minutes: 30,
            title: "Students build increase, then the rest",
            detail:
              "Students add one increase button in learning/week-09 and show you a count of 3. Only then do they add decrease, reset, and the status sentence. Refuse to paste the finished counter. Ask where count is declared if the number sticks at 1.",
          },
          {
            minutes: 10,
            title: "Validation stretch",
            detail:
              "Students who finished the three buttons add the three-character stall rule. Students still on the counter stay there. Walk and check button types. A reload on click means type is missing or the listener is on the wrong event.",
          },
          {
            minutes: 10,
            title: "Checks and the assignment",
            detail:
              "Ask the knowledge checks. Make the homework unmistakable: the graded work is the module assignment, a counter with increase, decrease, reset, and a sentence. Lesson response from last session does not replace it.",
          },
        ],
        explain: [
          "addEventListener registers a function. Parentheses after the function would call it now.",
          "count lives outside the listener so clicks share one number.",
          "preventDefault cancels navigation. It does not delete the form.",
          "value is the field. textContent is the message element.",
        ],
        questions: [
          "What does the visitor see if we update count and forget to set textContent?",
          "Why does a form reload throw away a counter that was working a moment earlier?",
          "Which event should preview typing, and which event should decide that a name is saved?",
        ],
        demonstration:
          "Submit the stall form three times in a row: browser default, listener without preventDefault, then listener with preventDefault and an empty check including a spaces-only name.",
        practice:
          "Each student makes Increase reach 3, then completes decrease, reset, and a negative/zero/positive sentence in learning/week-09. Faster students add the three-character name rule on the stall form.",
        expectedOutcomes: [
          "Students can prevent a form reload and show a validation message.",
          "Students can explain where the count variable lives.",
          "The assignment counter is started in class and finished as homework if time runs out.",
        ],
        difficulties: [
          {
            issue: "The student calls the handler immediately and the message changes on load.",
            help:
              "Look at the addEventListener line together. Cover the trailing parentheses with a finger if they are there. Reload and show that the message now waits. Then click or submit to prove the function still runs later.",
          },
          {
            issue: "Decrease and reset share one listener and the student is lost in branches.",
            help:
              "Give each button its own listener and its own small function. Three short functions are easier to read than one function that tries to discover which button was used.",
          },
        ],
        homework:
          "Module assignment: interactive counter in learning/week-09 with increase, decrease, reset, textContent updates, and a status sentence. Submit it on the assignment page.",
        assessment:
          "Knowledge checks plus a glance at one student counter: start at 0, increase twice, decrease once, reset, and read the sentence. Ask why the page reloads if their button is inside an unhandled form.",
        recap:
          "Have a student tell the doorbell story in one sentence, then say the next week saves versions of these files with Git so a working counter is not lost to a later edit.",
        knowledgeCheckAnswers: [
          {
            id: "w09-event-when",
            answer: "Later, each time the named event happens on that element.",
            explanation:
              "addEventListener stores the function. The browser calls it when the event occurs, and calls it again for the next event.",
          },
          {
            id: "w09-event-default",
            answer: "False",
            explanation:
              "preventDefault cancels the browser action for that event, such as navigation. The form remains in the file and in the live page.",
          },
          {
            id: "w09-event-count",
            answer:
              "So the same number survives from click to click. A variable declared inside the listener is created again on every click.",
            explanation:
              "Accept answers that mention memory across clicks or that a variable inside the function starts over. Mentioning scope is enough.",
          },
          {
            id: "w09-event-trim",
            answer: "trim turns the spaces into an empty string, so the empty-name message runs.",
            explanation:
              "trim removes whitespace from both ends. Three spaces become an empty string, and the length check treats that as no name.",
          },
        ],
      },
    },
  ],
  assignment: {
    slug: "week-09-assignment",
    title: "Interactive counter",
    summary:
      "Build a small page with increase, decrease, and reset buttons, a visible count, and a sentence that describes the count.",
    instructions:
      "Create a counter in learning/week-09. You can use counter.html, counter.css, and counter.js, or a similarly clear set of names in that folder. When the page opens, the count is 0 and a sentence says the count is zero. Increase adds 1, decrease subtracts 1, and reset returns the count to 0. Every button updates both the number and the sentence. Use a negative sentence when the count is below 0 and a positive sentence when it is above 0. Use textContent for those writes. Check for null after you find each element. Buttons that only change the number must not reload the page. If they sit inside a form, give them type button or call preventDefault. Do not put the number into the page with innerHTML. Include a short written note that says where the count variable is declared and why it is outside the listeners. The work you did on the market heading can stay in the same folder, but the graded page is the counter.",
    objectives: [
      "Use click listeners to update a page after it has loaded.",
      "Keep a number in a variable and reflect it in the DOM.",
      "Choose textContent and a safe button setup so the page does not reload or interpret markup.",
    ],
    requirements: [
      "The visible count starts at 0 on each fresh load.",
      "Increase, decrease, and reset each change the count in the correct direction or back to 0.",
      "A sentence on the page distinguishes negative, zero, and positive counts and updates with every button.",
      "The script uses addEventListener and textContent, and it does not throw when an id is missing.",
      "A short note explains where the count variable lives and how to open the page from learning/week-09.",
    ],
    deliverables: [
      "The counter HTML, CSS if you used any, and JavaScript in learning/week-09.",
      "A written note with the folder path, how you opened the file, and where count is declared.",
    ],
    rubric: [
      {
        criterion: "Starting page",
        points: 20,
        description: "The page shows 0 and a zero sentence before any click, using real HTML elements.",
      },
      {
        criterion: "Three actions",
        points: 30,
        description: "Increase, decrease, and reset update the same count correctly, including values below zero.",
      },
      {
        criterion: "Status sentence",
        points: 25,
        description: "The sentence matches the count after every action and after reset.",
      },
      {
        criterion: "Script quality",
        points: 25,
        description: "Listeners are registered rather than called immediately, textContent is used, and the note explains the variable.",
      },
    ],
    points: 100,
    instructorSolution:
      "A complete solution uses counter.html with a p#count, a p#status, and three buttons whose type is button and whose ids are increase, decrease, and reset. counter.js declares let count = 0 outside any function, finds the five elements, and returns early if any search is null. A function render writes String(count) into the count paragraph and writes one of three sentences into the status paragraph using if (count < 0), else if (count === 0), and else. Each button has its own click listener: count = count + 1, count = count - 1, or count = 0, then render(). The script never assigns innerHTML and never calls the handlers during setup. Opening counter.html from learning/week-09 shows 0 and The count is zero. Three increases show 3 and a positive sentence. One decrease from 0 shows -1 and a negative sentence. Reset returns both the number and the zero sentence. The written note says count is outside the listeners so the clicks share one variable.",
  },
  quiz: {
    slug: "week-09-quiz",
    title: "DOM and events quiz",
    passingScore: 70,
    allowRetakes: true,
    questions: [
      {
        slug: "week-09-q1",
        type: "multiple_choice",
        prompt: "What is the DOM?",
        options: [
          { id: "a", text: "A copy of the CSS file stored in the editor." },
          { id: "b", text: "The live tree of the page in the browser, which JavaScript can change." },
          { id: "c", text: "A folder that must be named dom before a script will run." },
          { id: "d", text: "The address bar of the browser." },
        ],
        correct: { optionId: "b" },
        explanation:
          "The browser builds the DOM from the document. Scripts read and change that live tree. The saved file changes only when you edit it.",
        points: 2,
      },
      {
        slug: "week-09-q2",
        type: "true_false",
        prompt: "getElementById(\"#title\") is the correct way to find an element whose id is title.",
        correct: { value: false },
        explanation:
          "getElementById takes the id text without a hash. The hash belongs in a CSS selector passed to querySelector, such as \"#title\".",
        points: 2,
      },
      {
        slug: "week-09-q3",
        type: "multiple_choice",
        prompt: "Why is textContent safer than innerHTML for a name typed into a form?",
        options: [
          { id: "a", text: "textContent translates the name into another language." },
          { id: "b", text: "textContent writes plain text and does not turn the name into HTML tags." },
          { id: "c", text: "innerHTML cannot change a paragraph at all." },
          { id: "d", text: "textContent also saves the HTML file to disk." },
        ],
        correct: { optionId: "b" },
        explanation:
          "A typed name is untrusted text. textContent shows the characters. innerHTML would parse tags inside the string and can change the page in ways you did not mean.",
        points: 2,
      },
      {
        slug: "week-09-q4",
        type: "code_reading",
        prompt: "What does this script print or change if the paragraph exists?",
        codeSnippet: `const status = document.querySelector("#status");
if (status !== null) {
  status.textContent = "Open";
  status.classList.add("highlight");
}`,
        options: [
          { id: "a", text: "It sets the paragraph text to Open and adds the highlight class on the live element." },
          { id: "b", text: "It rewrites styles.css to include a highlight rule." },
          { id: "c", text: "It returns null because classList is only available in CSS." },
          { id: "d", text: "It submits a form." },
        ],
        correct: { optionId: "a" },
        explanation:
          "textContent replaces the visible words. classList.add changes the class attribute of the live element. The CSS file is untouched, and no form is involved.",
        points: 2,
      },
      {
        slug: "week-09-q5",
        type: "true_false",
        prompt: "A function passed to addEventListener runs immediately, before any click.",
        correct: { value: false },
        explanation:
          "addEventListener registers the function for later. It runs when the named event happens. Calling the function yourself during setup is a different action.",
        points: 2,
      },
      {
        slug: "week-09-q6",
        type: "multiple_choice",
        prompt: "A form message appears and then the page returns to its original state. What is the most likely cause?",
        options: [
          { id: "a", text: "textContent cannot change a paragraph more than once." },
          { id: "b", text: "The form submitted and the browser loaded the page again, discarding the updated DOM." },
          { id: "c", text: "querySelector always waits one minute before updating text." },
          { id: "d", text: "classList cleared the body of the document." },
        ],
        correct: { optionId: "b" },
        explanation:
          "The default action of submit is navigation. A new load builds a new DOM from the file. preventDefault cancels that navigation so your message can remain.",
        points: 2,
      },
      {
        slug: "week-09-q7",
        type: "short_answer",
        prompt: "A counter shows 1 after every click, never 2 or 3. What is a likely mistake in where count is declared, and how should it be fixed?",
        correct: {
          rubric:
            "Award full points if the answer says count is probably declared inside the listener and should be declared outside so the same variable survives across clicks. Award partial points for mentioning reset without saying where the variable should live.",
        },
        explanation:
          "A let inside the listener creates a new zero on every click, and adding one always produces 1. The variable needs to live in an outer scope the listener can update.",
        points: 3,
      },
      {
        slug: "week-09-q8",
        type: "multiple_choice",
        prompt: "Which event is the best fit for a live preview while someone types in a text field?",
        options: [
          { id: "a", text: "submit" },
          { id: "b", text: "input" },
          { id: "c", text: "The CSS hover state, because it is also an event listener." },
          { id: "d", text: "getElementById" },
        ],
        correct: { optionId: "b" },
        explanation:
          "The input event fires as the field value changes. submit fires when the person sends the form. getElementById is a search, not an event.",
        points: 2,
      },
      {
        slug: "week-09-q9",
        type: "true_false",
        prompt: "After trim, a field that contains only spaces has length 0.",
        correct: { value: true },
        explanation:
          "trim removes whitespace from both ends. A string of spaces becomes an empty string, so a length check can treat it as a missing name.",
        points: 2,
      },
    ],
  },
};
