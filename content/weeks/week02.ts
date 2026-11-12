import type { ModuleSeed } from "../../src/lib/content-types";

function dedent(input: string): string {
  const lines = input.replace(/^\n/, "").replace(/\s+$/, "").split("\n");
  const indents = lines
    .filter((line) => line.trim().length > 0)
    .map((line) => line.match(/^ */)?.[0].length ?? 0);
  const trimBy = indents.length > 0 ? Math.min(...indents) : 0;
  return lines.map((line) => line.slice(trimBy)).join("\n");
}

const firstPage = dedent(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Jordan Lee — first page</title>
  </head>
  <body>
    <p>I am learning how a browser reads a page.</p>
    <p>Last week I saved a note. This week the note has tags.</p>
  </body>
  </html>
`);

const introductionPage = dedent(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Jordan Lee — introduction</title>
  </head>
  <body>
    <h1>Jordan Lee</h1>
    <p>I live near a busy market and I am learning to build web pages.</p>
    <p>I already know how to save a file in <strong>learning/week-02</strong> and open it in a browser.</p>
    <h2>A hobby</h2>
    <p>I <em>practise</em> pencil drawing in the evening, after the heat drops.</p>
    <h2>What I keep in the pencil case</h2>
    <ul>
      <li>A soft pencil</li>
      <li>A sharpener</li>
      <li>A small eraser</li>
    </ul>
    <h2>How I start a sketch</h2>
    <ol>
      <li>Look at the object for a full minute</li>
      <li>Draw the outer shape</li>
      <li>Add shade only after the shape is right</li>
    </ol>
    <p>A short public page about examples lives at <a href="https://example.com">example.com</a>.</p>
    <img src="sketch.jpg" alt="A pencil sketch of a wooden chair">
    <div>
      <p>Class note: this group is only a box. The heading tags nearby carry the meaning.</p>
    </div>
  </body>
  </html>
`);

export const week02: ModuleSeed = {
  slug: "week-02-html",
  number: 2,
  weekNumber: 2,
  monthLabel: "Month 1 — Computer fundamentals, HTML and CSS",
  title: "HTML fundamentals",
  description:
    "Write your first webpages. You will mark up a document with HTML, then add headings, text, links, images, and lists that a browser can show.",
  lessons: [
    {
      slug: "introduction-to-html",
      sessionNumber: 3,
      title: "Introduction to HTML",
      estimatedMinutes: 90,
      difficulty: "Gentle introduction",
      requiresOs: true,
      content: {
        overview: {
          about:
            "This lesson explains HTML, the markup language browsers read. You will write a complete small page with a document type, a head, a title, and a body, then open that file in a browser on your own computer.",
          why: "Every page in the rest of this course starts as HTML. Without a sound document, later colours and scripts have nothing reliable to attach to.",
          alreadyKnow:
            "You can create a folder, save a plain text file, and open a website in a browser.",
        },
        objectives: [
          "Explain what HTML is for, in ordinary language.",
          "Point to an element, its opening tag, and its closing tag.",
          "Add one attribute and say what fact it stores.",
          "Write a complete page with a DOCTYPE, html, head, title, and body.",
          "Save the page as an HTML file and open it in a browser.",
        ],
        prerequisites: [
          {
            label: "Session 2, the internet, files, and Visual Studio Code",
            lessonSlug: "internet-and-tools",
          },
        ],
        teachingNotes: [
          {
            heading: "What HTML means and why it exists",
            markdown: `
HTML stands for HyperText Markup Language. Hypertext means writing that can point at other writing. Markup means labels added to that writing so a program can tell the parts apart. HTML is not a language for adding up prices or making decisions. It describes a document.

You already saved a plain text note in learning/week-01. A browser can open that note, and it will show the characters. It cannot tell a title from a reminder, because the file never said which line had which job. HTML exists so you can say those jobs in a way every major browser has agreed to read.

The problem it solves is a shared agreement. You write the labels once. Chrome, Firefox, Safari, and Edge know the same basic labels. That is why one file can be opened on Windows, macOS, and Linux and still be read as a page. You do not maintain three copies for three operating systems.

Think of a paper form. The printed words "Full name" are not themselves the person's name. They tell a reader what the blank is for. An HTML label does that job for a browser. The words a visitor reads are the content. The labels are the markup around the content.

A common mix-up is to think HTML is the colour, the columns, and the decoration. Those belong to CSS, which arrives in week 4. HTML is the structure: this part is the document title, this part is a paragraph, this part is a link. If the structure is muddled, a coat of colour will not make the page clear.

The browser also does not know your topic. It does not know that a page is about buses, cooking, or a hobby. It only knows the labels you wrote. If a recipe title is marked as an ordinary sentence, the browser treats it as an ordinary sentence. Meaning, in HTML, is the meaning of the labels.

Last week you drew a client and a server. Keep that picture. When a response arrives, the browser still has to read the HTML and build the page. Today there is a simpler case: you will open a file that lives on your own computer. No remote server is required for this exercise. The reading step is the same.

:::example The labelled form
A blank line on a form is useless until a label says what belongs there. A page of bare sentences is the same. HTML is the set of labels.
:::

:::misunderstanding HTML is the look of the page
If two pages share the same headings and paragraphs, they can look very different once CSS is added. The HTML can stay still while the look changes. Structure and paint are different jobs.
:::
`,
          },
          {
            heading: "Elements, tags, and closing tags",
            markdown: `
An element is one piece of the document. A paragraph is an element. Later, a heading will be an element. The whole body is an element too. When you talk about a piece of the page, "element" is the word.

Most elements you write today have three parts. The opening tag names the element and turns it on. The content sits in the middle. The closing tag turns it off. A paragraph of one sentence is an opening p tag, the sentence, and a closing p tag.

The opening tag is the letter p wrapped in angle brackets: <p>. The closing tag is the same letter with a slash before it: </p>. The slash is the whole difference. The brackets do not appear on the page when the browser understands the file. They are instructions, not content.

People mix up tag and element. The tag is the mark in brackets. The element is the marks plus the content they wrap. If you are pointing at brackets, say tag. If you are pointing at a whole paragraph, say element. The habit matters later, when an element contains other elements and you need a precise word.

Closing tags exist because elements nest. A paragraph sits inside the body. The body sits inside the html element. The browser matches a closing tag to the element that is still open, in the way brackets match in arithmetic. If you forget a closing tag, later content can be swallowed by the element you left open.

Write tag names in lowercase. Browsers will often accept uppercase, but a file is easier to read when every tag looks the same. This course uses lowercase.

Indent the lines that live inside another element. Two spaces are enough. The browser does not need the indent. You do. Indenting shows that a paragraph belongs to the body and that the title belongs to the head. When a page breaks, the indent is often how you find the mismatch.

Some elements are empty. They do not wrap content, so they have no closing tag. You will use one today, the charset mark in the head. Do not invent empty versions of p. A paragraph has content, so it gets a closing tag.

:::misunderstanding The brackets should show on the page
If angle brackets appear in the browser, the file is being treated as plain text. The usual causes are a name ending in .txt, a hidden extra extension, or a word processor that did not save HTML.
:::

:::warning The browser may guess
If a closing tag is missing, a browser often guesses where the element ended. The guess can look fine until you add the next element. Close what you open, and do not treat a lucky display as proof.
:::
`,
          },
          {
            heading: "Attributes",
            markdown: `
An attribute adds a fact about an element. It lives inside the opening tag, after the tag name. It has a name, an equals sign, and a value in quotes. It never goes on the closing tag. A closing tag only ends the element.

The html element can carry lang="en". That fact says the page is written in English. It does not translate the page. It tells tools, including screen readers, which language the words are in. If you write the page in another language, use that language's short code and mention it to your instructor so the class can read your work with you.

A link will later carry an address. An image will later carry a file name and a description. Those are attributes too. The tag name stays the same while the attribute values change. Two links can both be anchor elements and still lead to different places, because their attributes differ.

Attributes exist because the tag name is not enough information. Every paragraph uses p. An attribute is how two elements of the same kind can carry different facts. The fact is often something the visitor does not read as a sentence. The language of the page is not a sentence in the body. The address of a link is not always the words between the tags.

Use straight double quotes around every value. Word processors sometimes replace those quotes with curled marks. Curled quotes can break the attribute, and the browser then misreads the tag. Write the file in Visual Studio Code, or in the plain text editor you used last week, not in a program built for letters and posters.

Do not invent attribute names and expect a special result. The browser treats known names in known ways. A homemade name will not turn a paragraph into a title. You will learn the names you need as each element arrives. Today, lang on html is the one to practise.

A common mistake is to put the attribute on the closing tag, or to leave out the quotes, or to leave out the equals sign. Read the opening tag from left to right: name, then each attribute as name, equals, quoted value.

:::example A sticker on a jar
The element name is the kind of jar. The attribute is a sticker, such as "English". The content is what is inside. The sticker is not a second jar, and it is not the contents.
:::

:::misunderstanding An attribute is a second element
lang="en" does not create a new paragraph or a new heading. It only adds a fact to the element whose opening tag holds it.
:::
`,
          },
          {
            heading: "DOCTYPE, html, head, body, and title",
            markdown: `
A complete HTML document has a shape you will repeat for the rest of the course. Learn the shape before you try to make a long page.

The first line is the DOCTYPE. In modern HTML it is written <!DOCTYPE html>. It tells the browser to use current rules. It is not an element. It has no closing tag, and it is not a parent of anything. Put it on line 1, before the html element. Without it, some browsers fall back to older behaviour, and spacing or layout can surprise you later. You do not need the history of those old rules. You need the line.

Next is the html element. It wraps the rest of the document. There is one html element on the page. Put lang on its opening tag. Everything you write after the DOCTYPE, until the closing html tag, belongs to this element.

Inside html, write two children, in this order: head, then body. They are siblings. The body is not inside the head. The head is not inside the body.

The head holds information about the document. Visitors usually do not see the head as the main column of writing. Put the title element in the head. The title is the name of the document. Browsers show it on the tab and use it when someone bookmarks the page. Search tools also read it. It is not the large heading in the page itself. You will add a visible heading in the next session. If you want a sentence on the page today, that sentence goes in the body, inside a p element.

Also put this empty element in the head: <meta charset="utf-8">. Charset names the character encoding, which is the way letters are stored as data. utf-8 covers the letters and punctuation you are likely to type, including names with accents. The element is empty, so it has no closing tag. It is still an element. It belongs in the head, high up, so the browser knows the encoding before it reads the title.

The body holds what the person came to read. Today that is one or two paragraphs. If you place a paragraph in the head, it is in the wrong room. The page can look blank, because the head is not the visible column. If you place the title in the body, the tab may show a file name instead of the name you chose.

Use the title for a name a stranger could understand. "Jordan Lee — first page" is clear. "Page 1" is weaker. "asdf" is useless. Your own page should carry your name, or a public name you are willing to show in class, plus a few words that say it is your first page.

:::misunderstanding The title is the big text on the page
The title element names the tab. It does not, by itself, print a heading in the body. Students often type the title, open the file, and think the page failed because the body is empty. Check the tab first.
:::

:::tip One document, one shape
DOCTYPE, then html, then head and body. Title and charset live in the head. Paragraphs live in the body. Repeat this until you can write it without looking.
:::
`,
          },
          {
            heading: "How a browser reads your file",
            markdown: `
The browser reads from the top of the file toward the bottom. It sees the DOCTYPE and selects current rules. It opens the html element. It reads the head and stores the title and the charset. It reads the body and builds what you see. Order in the file is order in that reading.

Whitespace rules surprise people who are used to paper. In a paragraph, a run of spaces usually becomes a single space on the page. A new line in the file does not start a new line for the visitor. A new paragraph starts when you write another p element. That is why the tags exist. Line breaks in the file are for the author.

You can lay the tags out so each element has its own line. The browser still builds the same page. Choose the layout that makes the nesting obvious. Do not put the whole document on one line. You will not be able to find a missing bracket.

The browser is generous, and generosity hides mistakes. A forgotten closing tag may still produce a readable page. Add another paragraph later and the generosity can attach the new paragraph to the wrong parent. Write the closing tags yourself. Then you are not borrowing a guess.

Saving is part of reading, because the browser reads the saved file, not the unsaved text in the editor. Last week you learned that an unsaved note can vanish. The same is true here, with an extra twist: if you edit, forget to save, and refresh, the browser shows the older saved file. It looks as if your edit did nothing. Save, then refresh.

Refresh means "read this file again". The browser does not watch your editor. It does not know you typed. The refresh control is in the browser toolbar, and the keyboard shortcut is usually Ctrl and R on Windows and Linux, or Command and R on macOS.

This page is opened as a local file. The address in the browser may start with file:// rather than https://. That is expected. You are not contacting the server from last week's diagram. You are asking the browser to read storage on your own machine. When you later publish a page, a server will send the file and the browser will read it in the same way.

:::example Two rooms
The head is the information on the door: the name of the room. The body is the furniture inside. A visitor looks at the door label, then walks into the body. Putting the furniture in the doorway label will not furnish the room.
:::

:::warning Which file did you refresh?
Save As can create a second copy in Downloads or on the Desktop. You then edit one file and refresh the other. Keep a single copy in learning/week-02 and open that copy.
:::
`,
          },
          {
            heading: "Write the first page and check it",
            markdown: `
Create a folder week-02 inside the learning folder from last week. If your learning folder lives in Documents, Home, or your user folder, keep using that same place. Do not start a second learning folder on the Desktop while the first one sits somewhere else.

Create a file named index.html inside week-02. The name index is a habit on the web: it is the usual name of a folder's front page. The extension html tells the computer and the browser what kind of file this is. A file named index.txt is still the plain note from week 1, even if the inside looks like tags.

Type a complete document. Use the DOCTYPE. Use html with lang. In the head, set the charset and a title that includes your name. In the body, write one paragraph in your own words about why you are learning this. Then add a second paragraph that names the browser you are using. Do not copy the sample page word for word. The sample shows the shape. Your sentences should be yours.

Save. Then open the file from the file manager, not by guessing. Use the steps for your system so you can see the real name, including the extension. Open it with a browser. Look at the tab before you judge the page. The tab should show your title. The page should show your paragraphs, without angle brackets.

Change one word in a paragraph. Save. Refresh. If the word does not change, you are looking at a different file, or you did not save. Do not keep typing in the hope that the browser will notice.

Five checks finish the session.

1. The file name ends in .html, and there is no extra .txt.
2. The title is inside the head, and it appears on the tab.
3. Each paragraph is inside the body, with an opening tag and a closing tag.
4. The brackets do not appear as text on the page.
5. A small edit survives a save and a refresh.

If the tab shows index.html or a long file path, the title is missing, misspelled as titel, or not inside the head. If the page is blank, the paragraphs may be in the head, or you opened an empty file. If you can see the tags, the browser is not reading HTML.

The page is small on purpose. The next lesson adds headings, links, images, and lists. A small page in the right folder, opened in a browser, is the success today.

:::tip The folder habit did not change
You already created learning/week-01. The new skills are the markup and the html extension. The saving habit is the same.
:::

:::misunderstanding I must publish before I can look
You do not need an account, a server, or a domain name to read your own file. Open it locally. Publishing comes much later in the course.
:::
`,
          },
        ],
        vocabulary: [
          {
            term: "HTML",
            definition:
              "HyperText Markup Language, the labels that tell a browser how a document is structured and which parts link elsewhere.",
          },
          {
            term: "Element",
            definition:
              "One piece of a document, such as a paragraph or the body, including its tags and any content they wrap.",
          },
          {
            term: "Tag",
            definition:
              "The written mark in angle brackets that starts or ends an element, such as the opening and closing marks of a paragraph.",
          },
          {
            term: "Attribute",
            definition:
              "A named fact inside an opening tag, written as a name, an equals sign, and a value in quotes.",
          },
          {
            term: "DOCTYPE",
            definition:
              "The first line of a modern HTML file. It tells the browser to use current HTML rules. It is not an element.",
          },
          {
            term: "Head",
            definition:
              "The element that holds information about the document, including the title and the character encoding. It is not the visible column of the page.",
          },
          {
            term: "Body",
            definition:
              "The element that holds the content a person came to read, such as paragraphs. It sits after the head.",
          },
          {
            term: "Title",
            definition:
              "The element in the head that names the document. Browsers show it on the tab and in bookmarks, not as the main heading in the body.",
          },
        ],
        demonstrations: [
          {
            title: "Save a first HTML page and open it in a browser",
            intro:
              "You will create learning/week-02/index.html, type a complete small document, and open that exact file in a browser. The HTML is the same on every system. The clicks that reveal the file name and start the browser are not.",
            steps: [
              "Find the learning folder you created in week 1. Inside it, create week-02. Do not put this file in week-01.",
              "Open the week-02 folder in Visual Studio Code, or in the plain text editor you used if the install is still waiting.",
              "Create a new file named index.html. Watch the name so it does not become index.html.txt.",
              "Type the DOCTYPE, the html element with lang, the head, the charset, a title that includes your name, and a body with one paragraph in your own words.",
              "Save the file. Use the file-manager steps for your system and confirm you can see index.html in week-02.",
              "Open that file in a browser. Read the tab, then read the page.",
              "Change one word in the paragraph, save, and refresh the browser. The new word should appear.",
              "If the brackets show as text, or the tab ignores your title, stop and use the recovery notes before you add more tags.",
            ],
            expected:
              "The browser tab shows your title, the page shows your paragraph without tags, and a saved edit appears after you refresh.",
            verify:
              "Close the browser tab, open index.html again from week-02, and confirm the edited sentence is still there. The file in the folder is the proof, not the unsaved editor.",
            ifItFails:
              "If you see tags as text, show file extensions and rename a doubled .txt name to .html. If the page is blank, move the paragraph into the body. If refresh does nothing, save and confirm you opened the copy inside week-02.",
            os: {
              sameOnAllPlatforms:
                "The document you type is identical on Windows, macOS, and Linux. Save it as learning/week-02/index.html and open that file in a browser. Use the steps below to open the file manager, show the real file name, and find a terminal if you want one. No terminal command is required to finish the page.",
              windows: [
                "Open File Explorer with the folder icon on the taskbar, or press the Windows key and E together. Go to the learning folder, then week-02.",
                "Turn on extensions: View, Show, File name extensions. The file must be named index.html, not index.html.txt.",
                "Right-click index.html, choose Open with, and pick Edge, Chrome, or Firefox.",
                "If you want a terminal later, open Start, type PowerShell, and press Enter. You do not need to run a command for this demonstration.",
              ],
              macos: [
                "Open Finder from the Dock. Open the learning folder, then week-02. Create the folders if you cannot see them yet.",
                "Show extensions: Finder menu, Settings or Preferences, Advanced, then turn on Show all filename extensions.",
                "Right-click or Control-click index.html, choose Open With, then Safari, Chrome, or Firefox.",
                "The Terminal application lives in Applications, then Utilities. You do not need it to open this HTML file.",
              ],
              linux: [
                "Open Files from the application menu. It may be called Files, Nautilus, or Dolphin. Open the learning folder, then week-02.",
                "Check the full name in the file manager and on the editor tab. It should end in .html. If the manager hides extensions, trust the editor tab and the properties window for the file.",
                "Right-click index.html, choose Open With, and pick Firefox or Chrome.",
                "Open a terminal from the application menu, or press Ctrl+Alt+T on many desktops. Leave it unused unless an instructor asks you to run a command.",
              ],
              identify: [
                "A Windows logo on the taskbar means Windows. An Apple menu at the top left means macOS. Activities, or a name such as Ubuntu, usually means Linux.",
                "Use the same computer as week 1 so you do not create a second learning folder by accident.",
                "If you still cannot tell the system, ask before you change filename settings. Creating the folder and the file is safe on all three.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "A complete first page",
            filename: "learning/week-02/index.html",
            language: "html",
            code: firstPage,
            explanation:
              "Jordan Lee is a fictional sample, not a person in the class. The page shows the required shape: DOCTYPE, html with a language, head with charset and title, and a body with two paragraphs. Your sentences and your title should be your own. The sample is the shape to follow, not the text to submit.",
            lineNotes: [
              {
                focus: "<!DOCTYPE html>",
                note: "This line selects current HTML rules. It stays on line 1 and has no closing tag.",
              },
              {
                focus: "lang=\"en\"",
                note: "This attribute says the sample is in English. It sits on the opening html tag only.",
              },
              {
                focus: "<title>",
                note: "The title is inside the head. The browser puts this text on the tab, not in the body.",
              },
              {
                focus: "<p>",
                note: "Each paragraph has its own opening tag, content, and closing tag, and both live in the body.",
              },
            ],
            expectedOutput:
              "The browser tab reads Jordan Lee — first page. The page shows two sentences and no angle brackets. Nothing is coloured, because this file has no CSS.",
            level: "basic",
          },
        ],
        exercises: [
          {
            title: "Name the parts of your own file",
            difficulty: "warm-up",
            prompt:
              "Open the index.html you just saved. On paper or in a separate note, name four things you can see in the file. Do not paste the sample page over your work.",
            steps: [
              "Write the exact title text that appears between the title tags.",
              "Write the value of the lang attribute.",
              "Copy one opening tag and its matching closing tag onto the note.",
              "Say whether the paragraph text is in the head or in the body, and say where the tab gets its label.",
            ],
            expectedOutcome:
              "A short note that correctly places the title in the head, the paragraph in the body, and names one matching pair of tags.",
          },
          {
            title: "Add a second sentence of your own",
            difficulty: "practice",
            prompt:
              "Add another paragraph to your body. Use a sentence about the browser or the editor you are using. Keep the rest of the document shape intact.",
            steps: [
              "Put the new paragraph after the existing one, still inside the body.",
              "Give it an opening p tag and a closing p tag.",
              "Save, refresh, and check that both paragraphs show.",
              "Confirm the tab title did not move into the page as a heading. You have not written a heading yet.",
            ],
            expectedOutcome:
              "The refreshed page shows two paragraphs of your own writing, the tab still shows the title, and the tags stay hidden.",
          },
        ],
        troubleshooting: [
          {
            problem: "The browser shows the angle brackets and the tag names as ordinary text.",
            why: "The file is being opened as plain text. The name often ends in .txt, or in .html.txt when extensions were hidden at save time.",
            solution:
              "Show filename extensions with the steps for your system. Rename the file so the only extension is .html. Open that renamed file in the browser again.",
          },
          {
            problem: "The page is blank, but the tab shows a file name instead of my title.",
            why: "The title is missing or outside the head, and the paragraph may be inside the head, which is not the visible column.",
            solution:
              "Put the title element inside the head. Put each p element inside the body, after the head has been closed. Save and refresh.",
          },
          {
            problem: "I edited the paragraph and refresh still shows the old sentence.",
            why: "The browser reads the saved file. An unsaved editor tab, or a second copy from Save As, leaves the browser on the old version.",
            solution:
              "Save in the editor. In the file manager, open the index.html that sits in learning/week-02. Refresh that tab. Delete or ignore any extra copy in Downloads or on the Desktop.",
          },
        ],
        knowledgeChecks: [
          {
            id: "w2s1-html",
            question: "What is HTML mainly for?",
            format: "Multiple choice",
            options: [
              "Describing the structure of a document so a browser can tell the parts apart",
              "Painting colours and columns on a page",
              "Replacing the operating system",
              "Storing the page inside the keyboard",
            ],
          },
          {
            id: "w2s1-close",
            question: "A paragraph element needs a closing tag as well as an opening tag.",
            format: "True or false",
            options: ["True", "False"],
          },
          {
            id: "w2s1-title",
            question: "Where does the title element belong, and what does the visitor usually see from it?",
            format: "Short answer",
          },
          {
            id: "w2s1-attr",
            question: "Which line correctly adds a language fact to the html element?",
            format: "Multiple choice",
            options: [
              "<html lang=\"en\">",
              "<html></lang>",
              "<lang>en</lang>",
              "<html lang=en> with curled quotes from a word processor",
            ],
          },
        ],
        homework: {
          description:
            "Submit your first HTML file as text, plus two sentences that explain the head and the body in your own words. This is a lesson response. The graded introduction page comes with the week assignment after the next session.",
          requirements: [
            "Include a complete document: DOCTYPE, html with lang, head, charset, title, and body.",
            "Use your own title and at least one paragraph you wrote. Do not submit the sample sentences.",
            "Add two sentences of explanation: what the head is for, and what the body is for.",
          ],
          deliverables: [
            "The lesson response containing your HTML and the two explanatory sentences.",
          ],
          submission:
            "Paste the HTML and the two sentences into the lesson response box on this page and save it.",
          criteria: [
            "The document shape is complete and the paragraph is in the body.",
            "The explanation does not call the title the large heading on the page.",
          ],
          submissionKind: "lesson_response",
        },
        summary: [
          "HTML labels a document so a browser can tell a title from a paragraph. It is not the paint or the layout.",
          "An element usually has an opening tag, content, and a closing tag. An attribute adds a fact on the opening tag.",
          "A page starts with a DOCTYPE, then html, then a head and a body. The title lives in the head and shows on the tab.",
          "Save as .html, open that file in a browser, and refresh only after you save.",
        ],
        nextLesson: {
          title: "Text, links, images, and lists",
          why: "The next lesson, html-text-links-images-lists, puts headings, links, images, and lists into the page you just opened.",
          lessonSlug: "html-text-links-images-lists",
        },
      },
      guide: {
        sessionNumber: 3,
        week: 2,
        title: "Introduction to HTML",
        durationMinutes: 90,
        objectives: [
          "Students can say why a plain text note is not yet a webpage.",
          "Students can write DOCTYPE, html, head, title, and body without swapping the rooms.",
          "Students open their own index.html in a browser and refresh after a save.",
        ],
        tools: [
          "Visual Studio Code or the plain text editor from week 1",
          "A browser on the projector",
          "The file manager, with filename extensions visible",
          "A prepared broken file that is really index.html.txt, kept aside for the recovery minute",
        ],
        preparation: [
          "Create learning/week-02 on the classroom computer and confirm you can open a blank index.html in the browser.",
          "Turn filename extensions on before class, then practise turning them on again slowly so you can narrate the clicks.",
          "Prepare a one-paragraph page with the title in the body by mistake, so you can show the blank-looking result and then repair it.",
          "Read the lesson response instructions so the last minutes point at pasting HTML, not at the week assignment.",
        ],
        flow: [
          {
            minutes: 5,
            title: "From the text note to a labelled page",
            detail:
              "Open last week's visit-note.txt in the browser and ask what the browser failed to understand. Say that today you will add labels, not colours. Write HTML, tag, and element on the board. Tell the room there is no install step if VS Code already opens.",
          },
          {
            minutes: 15,
            title: "Tags, closing slashes, and one attribute",
            detail:
              "Type a single paragraph on the projector, first as bare text and then wrapped in p tags. Point at the slash in the closing tag. Add lang=\"en\" to a handwritten html tag and call it an attribute: a fact on the opening tag, quotes included. Ask someone to say which mark is the tag and which words are the content.",
          },
          {
            minutes: 20,
            title: "Build the document live",
            detail:
              "Create learning/week-02/index.html in front of the class. Type the DOCTYPE, html, head, charset, title, and one body paragraph, saying the room name as you enter it. Save, open from the file manager, and point at the tab. Move the title into the body on purpose, refresh, then put it back so they see the tab change.",
          },
          {
            minutes: 30,
            title: "Students write and open their page",
            detail:
              "Students create their own index.html with their name in the title and two sentences in the body. Walk to every screen once. Look at the file name in the file manager, not only at the editor. Help people whose extensions are hidden. Do not start links or images in this half hour.",
          },
          {
            minutes: 10,
            title: "Repair one real failure",
            detail:
              "Pick the failure you actually saw: doubled .txt, a paragraph trapped in the head, or a refresh of the wrong copy. Fix it on the projector with the student's symptom, not with a rehearsed bug they do not have. Then ask the four knowledge-check questions aloud and collect a spoken answer for each.",
          },
          {
            minutes: 10,
            title: "Lesson response, then stop",
            detail:
              "Show the lesson response box and ask them to paste their HTML plus two sentences about head and body. Say clearly that the graded introduction page is the week assignment after the next session. Preview headings only by naming them. Do not demonstrate a link today.",
          },
        ],
        explain: [
          "HTML labels structure. It does not paint the page.",
          "Closing tags end elements. Attributes sit on opening tags.",
          "The title names the tab. The body holds the visible paragraphs.",
          "The browser reads the saved file. Refresh after save.",
          "file:// means the page is local. That is correct for this session.",
        ],
        questions: [
          "Why was last week's .txt file not enough for a browser that needs a title and a paragraph?",
          "What does the slash in a closing tag tell the browser?",
          "If the tab shows the right title and the page is blank, which element is probably empty?",
          "What should the file name end with, once extensions are visible?",
        ],
        demonstration:
          "Type a full index.html on the projector, open it from the file manager so the class sees the extension, then change one word, save, and refresh. Briefly break the title by moving it, then repair it.",
        practice:
          "Each student writes a personal title and two original sentences, saves learning/week-02/index.html, and shows the refreshed browser. A neighbour may look, but may not dictate the sentences.",
        expectedOutcomes: [
          "Every student has index.html open in a browser with their title on the tab.",
          "Students can point to head and body in their own file.",
          "At least one edit has been saved and seen after a refresh.",
        ],
        difficulties: [
          {
            issue: "The file is named index.html.txt and the browser prints the tags.",
            help: "Turn on filename extensions with them watching. Rename the file so it ends in .html only. Open the renamed file. Do not keep editing the .txt copy.",
          },
          {
            issue: "The student pasted the paragraph inside the head and thinks HTML failed.",
            help: "Sit beside them and point to the two rooms. Move the p element so it is between the body tags. Refresh and let them see the sentence appear. Ask them to say which room the title stays in.",
          },
          {
            issue: "Smart quotes from a word processor broke lang or the tags.",
            help: "Copy the text into VS Code or a plain text editor. Retype the quotes as straight double quotes. Ask them not to save HTML from a poster or essay program.",
          },
        ],
        homework:
          "The response is the HTML they wrote plus two sentences about head and body. Remind them not to paste the fictional sample. The week assignment is not due from this session's box.",
        assessment:
          "Use the spoken knowledge checks and a glance at the open browser tab. The pasted lesson response is the written record. Do not grade the introduction page today.",
        recap:
          "Ask one student to read their tab title and another to say which element supplied it. Close by saying the next session keeps this file's shape and adds the parts a visitor actually scans: headings, links, pictures, and lists.",
        knowledgeCheckAnswers: [
          {
            id: "w2s1-html",
            answer: "Describing the structure of a document so a browser can tell the parts apart",
            explanation:
              "HTML is markup for structure and links. Colour and layout are CSS. The keyboard and the operating system are not HTML.",
          },
          {
            id: "w2s1-close",
            answer: "True",
            explanation:
              "A paragraph has content, so it needs a closing tag. Empty elements such as the charset meta tag are the exception, and p is not one of them.",
          },
          {
            id: "w2s1-title",
            answer:
              "The title belongs in the head. The visitor usually sees it on the browser tab or in a bookmark, not as the main text in the page.",
            explanation:
              "Accept an answer that places title inside head and names the tab. Do not accept an answer that says the title is the large heading in the body.",
          },
          {
            id: "w2s1-attr",
            answer: "<html lang=\"en\">",
            explanation:
              "The attribute sits on the opening tag as a name, an equals sign, and a quoted value. A closing tag cannot hold it, and a separate lang element is not the pattern.",
          },
        ],
      },
    },
    {
      slug: "html-text-links-images-lists",
      sessionNumber: 4,
      title: "Text, links, images, and lists",
      estimatedMinutes: 90,
      difficulty: "Guided practice",
      requiresOs: true,
      content: {
        overview: {
          about:
            "This lesson turns the small HTML page into a short introduction. You will add headings, paragraphs, emphasis, a link, an image with alternative text, lists, and a plain division, and you will hear what semantic markup means.",
          why: "People scan headings, follow links, and rely on text when an image fails. Those pieces are the everyday material of a page.",
          alreadyKnow:
            "You can write a complete HTML document and open the saved file in a browser.",
        },
        objectives: [
          "Choose heading ranks and paragraphs for a short page.",
          "Use strong and em for meaning, not for decoration.",
          "Write a link with a real address and readable link text.",
          "Add an image with alternative text that still helps if the picture is missing.",
          "Mark up an ordered list, an unordered list, and one division.",
          "Explain the difference between a meaningful tag and a plain div.",
        ],
        prerequisites: [
          {
            label: "Session 3, introduction to HTML",
            lessonSlug: "introduction-to-html",
          },
        ],
        teachingNotes: [
          {
            heading: "Headings and paragraphs",
            markdown: `
A heading is a title for a section of the page. HTML has six ranks, from h1 to h6. This course uses the first three. h1 is the main heading of the page. Use one h1. h2 is a section inside that page. h3 is a smaller part inside an h2. The number is a rank, like chapters and sections in a book. It is not a font size you pick because you want louder letters.

Put the h1 in the body. A person's name is a good h1 for an introduction. "A hobby" can be an h2 under that name. Do not put headings in the head. The head already has the title element, which still names the tab. The h1 and the title may use similar words. They remain different elements. The title can say "Jordan Lee — introduction" while the h1 says "Jordan Lee".

Do not skip ranks to make text look smaller. An h1 followed immediately by an h4, with no h2 or h3, tells a confused story about the outline. A screen reader can list headings so a person can jump. A skipped rank makes that list harder to trust. If you want smaller letters later, CSS will change size without lying about rank.

A paragraph is a p element. It holds prose: one idea, a few sentences at most. Do not put a heading inside a paragraph. Do not put a whole page inside one paragraph with line breaks forced in. Start a new p when you start a new thought.

The file's line breaks still do not create visual line breaks. If you write two sentences inside one p, they stay in one paragraph. If you want two blocks, write two p elements. There is a br element that forces a line break. It is for rare cases such as a postal address. It is not a substitute for paragraphs. If you find yourself stacking br tags, you wanted another p or another heading.

Write headings as an outline before you decorate anything. Say the h1 aloud, then each h2. If the outline sounds like a table of contents, the ranks are doing their job.

:::misunderstanding I pick h1 when I want big text
The browser's default size follows the rank, so h1 looks large. That default is not the purpose. The purpose is to say "this is the main heading". Appearance moves to CSS in week 4. The rank should already be honest.
:::

:::example A book
The book title is the h1. Chapter titles are h2 elements. A subsection inside a chapter is an h3. You would not call every line a chapter because you wanted it in bold.
:::
`,
          },
          {
            heading: "Bold and emphasis",
            markdown: `
Pages need a way to stress a few words inside a sentence. HTML gives you two elements with meaning. strong says the words are important. em says the words are stressed, the way a voice leans on a word in speech. Browsers usually draw strong in bold and em in italic. The look is the usual result. The meaning is the reason you chose the tag.

Use strong around a short phrase that a reader must not miss, such as the folder name they have to type, or the word that changes a warning. Use em when the stress would change the sentence if it moved. "I practise in the evening" with em on evening says the time of day matters. The same em on practise would stress the activity instead. Choose on purpose.

Do not wrap a whole paragraph in strong because you want it louder. If everything is important, nothing is. Do not use either element to fake a heading. A heading has a rank. A stressed phrase does not.

You may see b and i in other people's pages. b asks for bold letters and i asks for italic letters, without the importance or the stress. This course uses strong and em because a page should say why the words stand out. A person who cannot see the bold still gets the importance if the tool knows the element is strong.

Nesting is allowed and easy to mess up. A paragraph may contain strong. Strong may contain a few words, not a heading. Close the inner element before you close the paragraph. If the marks cross, the browser has to guess. Write the inner closing tag first.

Read the sentence without the tags. It should still be grammatical. The tags add meaning. They should not be the only reason the sentence exists.

:::tip Say it aloud
If you would not hit the word with your voice, you probably do not need em. If losing the phrase would hide a warning or a required step, strong is a fair choice.
:::

:::misunderstanding Bold and italic are the elements
Bold and italic describe paint. strong and em describe meaning. Week 4 can change the paint. The meaning should still be in the HTML.
:::
`,
          },
          {
            heading: "Links",
            markdown: `
A link is how hypertext earns its name. The element is a, often called an anchor. The address goes in an attribute named href, which means hypertext reference. The words between the opening and closing tags are the link text, the words the person sees and can activate.

A link to a public page looks like this in the file: an opening a tag with href="https://example.com", then honest link text, then </a>. The scheme https:// should be included for a site on the web. If you leave it off, the browser may look for a file named example.com inside your folder.

The link text should say where the person is going or what they will get. "Pencil drawing notes" is useful. "Click here" is weak, because a list of links would read "click here, click here" and tell nobody anything. The href can be long. The visible words can be short and clear. They do not have to repeat the whole address.

You can link to another file in the same folder by using only that file's name as the href. That is a relative address. This session's main practice uses one absolute https address, so you practise the full form. Keep relative names for the image file in the next section.

The browser does not check your intentions. If the href is wrong, the link still looks clickable, and then it fails. Open your own link before you submit the page. If it does not load, read the address character by character.

A link is inline. It sits inside a paragraph or another block. Do not put a block heading inside a link in this session. Wrap the words that should be activated, not the entire page.

Do not invent a button by using a link with an empty href. An empty href does not mean "nowhere yet". It often reloads the current page, which confuses people. If you do not have an address, do not add the link until you do. A public page about the hobby is enough. example.com is acceptable in class if you say it is a stand-in, but a real public page you would send to a friend is better.

:::warning The address is not the sentence
Visitors read the words between the tags. They do not have to read the href. Write those words for a human. Put the address only in the attribute.
:::

:::misunderstanding The link text replaces the need for href
Words that look blue in your hopes are not a link. Without href, the a element has nowhere to go. The attribute is the destination. The text is the label.
:::
`,
          },
          {
            heading: "Images and alternative text",
            markdown: `
An image element pulls a picture into the page. The tag is img. It is empty. There is no closing tag and no words inside it. Two attributes do the work. src says where the file is. alt holds the alternative text, the words used when the picture cannot be seen.

If the image file sits in the same folder as the HTML, src can be the file name: src="sketch.jpg". That is a relative address, like a note that says "the picture beside this page". If the picture is still in Downloads or on the Desktop, the page in week-02 will not find it. Move or copy the file into week-02, then use the name alone.

Alternative text is not a caption under the picture, and it is not the file name. A caption would be a paragraph near the image, if you need one. Alt text replaces the image for someone who cannot see it, and it appears when the file fails to load. Describe the picture's useful content. "A pencil sketch of a wooden chair" helps. "sketch.jpg" does not. "Image" does not. Empty alt is for decoration that adds nothing, and this session does not ask for decorative images. Your one picture should inform, so give it a real description.

Choose a picture you are allowed to use. A photo you took, or a sketch you made, is the safe choice. Do not grab a picture from a search result and pretend it is yours. The technical step is the same either way, and the honest step is to use your own.

When src is wrong, the browser shows a broken-image marker and, on many browsers, the alt text. Treat that as a clue. Check the spelling, the extension, and the folder. jpg, jpeg, png, gif, and webp are common types a browser can show. A word-processor document is not an image, even if it contains a drawing.

The image does not know its size yet. It may appear huge. That is normal. CSS will constrain boxes in week 4. Do not fight the size with extra copies of the file today. Get the src and the alt right.

Write the alt from the visitor's point of view. If the image failed and only the text remained, would the introduction still make sense? If the alt says nothing the page needs, rewrite it.

:::example The picture failed
A classmate opens your page and the chair sketch does not load. The alt text "A pencil sketch of a wooden chair" still tells them what you meant. The alt text "IMG_2044" tells them nothing.
:::

:::misunderstanding Alt text is a tooltip and nothing more
Some browsers may show alt in a small hover label. That is not its job. Its job is to stand in for the image. Write it for someone who will never see the picture.
:::
`,
          },
          {
            heading: "Ordered lists, unordered lists, and divisions",
            markdown: `
A list is a group of items. HTML has two parent elements for the lists you need now. ul is an unordered list. Use it when the order does not matter, such as objects in a pencil case. The browser usually marks the items with bullets. ol is an ordered list. Use it when the sequence matters, such as steps in a sketch. The browser usually numbers the items.

Each item is an li element inside the ul or the ol. Do not put li tags loose in the body with no parent list. Do not put the parent's text directly in the ul without an li. The pattern is parent, then items.

Do not type your own bullets or numbers inside an ol. The browser supplies them. If you write "1. Look" as the content, the page may show a number twice. Let the element do the numbering, and write the words only.

A list can sit under a heading that introduces it. An h2 that says "How I start a sketch" followed by an ol is a clear outline. A list without any introduction can still be valid, but the heading helps a person who is scanning.

A division is a div element. It groups other elements when you need a box and you do not have a more precise tag yet. A div has no meaning of its own. It does not say "this is a heading" or "this is a navigation menu". It says "these pieces are together". Browsers show the contents and nothing more. You cannot see a div. You see what was inside it.

That is the start of semantic HTML. Semantic means the tag matches the meaning. h1, p, ul, ol, a, strong, and em are semantic. They tell a browser, and a person using a tool, what the content is. div is a generic container. Use it when you truly have no better name. Do not wrap every paragraph in a div out of habit. The paragraph is already an element.

Later, a lesson named semantic-html will add tags for a header, a navigation region, a main column, and a footer. You do not need those tags to finish this week's page. You do need to notice that a div is not a substitute for a heading. If the words are a heading, use a heading element.

You may put a paragraph inside a div for the class note at the bottom of the sample. One div on the page is enough practice. More boxes will not make the introduction clearer.

:::misunderstanding A div is a heading you have not styled yet
A div does not enter the heading list. A person jumping by headings will skip it. If the words name a section, use h2 or h3.
:::

:::tip Order is the question
Ask whether swapping two items would change the meaning. If yes, use ol. If no, use ul. The bullets and numbers follow from that choice.
:::
`,
          },
          {
            heading: "Build the introduction page",
            markdown: `
Copy your working document shape into a new file, learning/week-02/introduction.html. Leave index.html as the first page. The new file is the one you will grow into the week assignment.

Start with the outline. One h1, your name or the public name you use in class. One paragraph that says something true and non-secret about you. One h2 for a hobby. One paragraph about that hobby, with a single em or strong that you can justify. Then a ul or an ol with at least three items. Then a link inside a paragraph, with an href you have opened. Then an image whose file sits in week-02, with alt text you wrote while looking at the picture. A single div may wrap a short class note. It must not replace any heading.

Keep the DOCTYPE, the language, the charset, and the title. Update the title so a tab can be told apart from index.html. "Your name — introduction" is enough.

Place the image file yourself, using the file manager. Do not only remember where the photo used to be. After you move it, the src value should be the file name, not a long path into Downloads. Spaces in file names make typos easier. sketch.jpg or hobby.png is kinder than a camera name full of numbers, as long as you rename a copy and not the only original if you still need that original.

Open the page in the browser. Check the heading outline with your eyes: one main heading, section headings under it, no skipped ranks. Click the link. If the image is broken, read the alt text and then fix the src. Resize the window. The page may look plain. Plain is correct. CSS is a later week.

The week assignment is this introduction, including the hobby section. The homework for this session points at that assignment. Your lesson file can be the assignment file. Do not keep a secret second version with the picture still missing.

Before you submit, read the page as if the image failed. Then read only the headings. Then click the link. Those three checks catch the mistakes this session is about.

:::warning Secrets do not belong on the page
Do not publish a home address, a password, a bank detail, or someone else's private story. A city, a hobby, and a first name or public name are enough.
:::

:::example A finished outline
Name as h1, a short bio paragraph, a hobby heading, a hobby paragraph, a list, a link, an image with alt text. That outline is the assignment. The sentences must be yours.
:::
`,
          },
        ],
        vocabulary: [
          {
            term: "Heading",
            definition:
              "An element from h1 to h6 that marks a title in the outline of the page. The number is a rank, not a colour or a font.",
          },
          {
            term: "Paragraph",
            definition:
              "A p element that holds a block of prose. A new line in the file does not by itself start a new paragraph.",
          },
          {
            term: "Strong",
            definition:
              "An element for words that are important. Browsers usually show it in bold. The importance is the reason to use it.",
          },
          {
            term: "Emphasis",
            definition:
              "The em element, used for stress in a sentence, the way a voice leans on a word. Browsers usually show it in italic.",
          },
          {
            term: "Link",
            definition:
              "An a element whose href attribute holds an address. The words between the tags are what a person reads and activates.",
          },
          {
            term: "Alternative text",
            definition:
              "The alt attribute on an image. It is the text that stands in for the picture when the picture cannot be seen.",
          },
          {
            term: "Unordered list",
            definition:
              "A ul element whose items do not depend on order. Each item is an li. Browsers usually show bullets.",
          },
          {
            term: "Ordered list",
            definition:
              "An ol element whose items have a sequence. Each item is an li. Browsers usually number them for you.",
          },
          {
            term: "Division",
            definition:
              "A div element that groups other elements without adding a meaning of its own. It is not a heading or a list.",
          },
        ],
        demonstrations: [
          {
            title: "Build an introduction with a list, a link, and a picture",
            intro:
              "You will add an image file to week-02 and build introduction.html beside it. The markup is the same on every operating system. Copying the image and refreshing the browser depend on your file manager.",
            steps: [
              "Copy introduction.html from the document shape you already trust, or create it beside index.html in learning/week-02.",
              "Add one h1 and at least one h2 in the body. Keep the title element in the head.",
              "Write a hobby paragraph that uses either strong or em around a short phrase you can explain.",
              "Add one ul or one ol with three li items. Do not type the numbers yourself if you chose ol.",
              "Add a paragraph with one link. Include https:// in the href. Open the link and check the destination.",
              "Copy a picture you may use into the week-02 folder. Set src to the file name and write alt text while looking at the picture.",
              "Save, open the file in the browser using your system's file manager, and refresh after every fix.",
              "Read the page once with the image covered. If the alt text is useless, rewrite it before you stop.",
            ],
            expected:
              "introduction.html shows a heading outline, a list, a working link, and an image or its alternative text, all from the week-02 folder.",
            verify:
              "Click the link, confirm the image file sits beside the HTML in the file manager, and refresh after a one-word edit so you know which file the browser is reading.",
            ifItFails:
              "If the image is broken, compare src with the file name character by character, including the extension. If the link does nothing useful, add a full https address. If headings appear as ordinary text, check that you used h1 or h2 and not a div.",
            os: {
              sameOnAllPlatforms:
                "Put the image in the same folder as introduction.html and refer to it by file name. Then open the HTML file in a browser and refresh after you save. The markup does not change between systems. The file manager and the terminal launcher do.",
              windows: [
                "In File Explorer, copy the image into learning/week-02. Use Copy and Paste, not a shortcut, so the file itself moves into the folder.",
                "Confirm extensions are still visible. Match sketch.jpg or your real name exactly in the src attribute, including the extension.",
                "Right-click introduction.html, choose Open with, and select your browser. After a save in the editor, refresh with Ctrl and R.",
                "PowerShell is optional: open it from Start if an instructor asks. The file manager path is enough to finish.",
              ],
              macos: [
                "In Finder, drag a copy of the image into week-02, or use Option and drag so you copy rather than only moving a single original you still need.",
                "Check the extension in Finder. The src value must use that exact name.",
                "Open introduction.html with Safari, Chrome, or Firefox from Open With. Refresh with Command and R after each save.",
                "Terminal remains in Applications, Utilities, if you need it later. Do not use it to place the image unless you already prefer it.",
              ],
              linux: [
                "In Files, copy the image into week-02. Open the folder and confirm the HTML file and the image are both visible.",
                "Read the image name from the properties window if the view hides extensions, and use that exact name in src.",
                "Open introduction.html with Firefox or Chrome. Refresh after saving. On many browsers the shortcut is Ctrl and R.",
                "A terminal can be opened with Ctrl+Alt+T on many desktops. You can finish this demonstration entirely in the file manager.",
              ],
              identify: [
                "Use the system you identified in week 1. The learning folder should already be on that computer.",
                "If the browser is not the program that opens when you double-click, use Open With rather than changing the default for every file on the machine.",
                "Ask for help before you delete a photo. Copy it into week-02 so the original can stay where it was.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "A personal introduction with a hobby",
            filename: "learning/week-02/introduction.html",
            language: "html",
            code: introductionPage,
            explanation:
              "This fictional sample belongs to Jordan Lee, who is not a classmate. It shows the pieces the assignment requires: a document skeleton, h1 and h2, paragraphs, strong, em, a bullet list, a numbered list, a link with href, an image with alt, and one div that does not pretend to be a heading. Replace every personal detail. Put your own image in the folder and change src and alt to match it.",
            lineNotes: [
              {
                focus: "<h1>",
                note: "One main heading in the body. The title element in the head is separate and still feeds the tab.",
              },
              {
                focus: "<strong> and <em>",
                note: "strong marks importance. em marks spoken stress. They wrap short phrases inside paragraphs.",
              },
              {
                focus: "<ul> and <ol>",
                note: "The pencil case has no order, so it is a ul. The sketch steps have an order, so they are an ol. Items are li elements.",
              },
              {
                focus: "href and alt",
                note: "href is the destination of the link. alt replaces the image if sketch.jpg is missing. The visible link text is not the address.",
              },
              {
                focus: "<div>",
                note: "The division only groups a note. It has no heading meaning. The h2 elements carry the sections.",
              },
            ],
            expectedOutput:
              "The tab shows the sample title. The page shows the name as a heading, hobby sections, two lists, a link to example.com, and either the chair sketch or the alternative text if sketch.jpg is absent.",
            level: "practical",
          },
        ],
        exercises: [
          {
            title: "Write the outline before the picture",
            difficulty: "warm-up",
            prompt:
              "In introduction.html, add only the outline and the prose. Leave the image and the link for the next exercise so you can see the document without them.",
            steps: [
              "Set the h1 to your public name and add one biographical paragraph with no secrets.",
              "Add an h2 for your hobby and a paragraph that uses strong or em on a short phrase.",
              "Add one list of three items. Decide ul or ol by asking whether order matters.",
              "Save and refresh. You should see headings and text, and you should not see the tags.",
            ],
            expectedOutcome:
              "The page has one h1, at least one h2, two paragraphs, and one list, and the tab title is still coming from the head.",
          },
          {
            title: "Add the link and the image yourself",
            difficulty: "practice",
            prompt:
              "Finish the introduction with one link and one image. Use your own address text, your own picture, and your own alternative text. Do not copy Jordan Lee's hobby or the chair description.",
            steps: [
              "Put a link inside a paragraph. The href must include https:// and you must open it once.",
              "Copy your image into week-02 and set src to the file name only.",
              "Write alt text that describes the picture, not the file name.",
              "Refresh. If the image is broken, fix the name before you add any more elements.",
            ],
            expectedOutcome:
              "The link opens the page you named, and the image either displays or fails with alternative text that still describes it.",
          },
        ],
        troubleshooting: [
          {
            problem: "The image icon is broken and I only see a marker where the picture should be.",
            why: "src does not match a file in the same folder. The picture may still be in Downloads, or the extension in the attribute does not match the file.",
            solution:
              "Move a copy into learning/week-02. Set src to the exact file name, including .jpg or .png. Save and refresh. Keep the alt text, because it is what remains when the file is wrong.",
          },
          {
            problem: "The link looks like text, or it opens the wrong place.",
            why: "The href is missing, has no https:// scheme, or contains a typo. Link text alone does not create a destination.",
            solution:
              "Put a full https address in href on the opening a tag. Make the words between the tags describe the destination. Click the link from your page before you submit.",
          },
          {
            problem: "I used several h1 elements and a div because I wanted larger words.",
            why: "Default sizes tempt people to choose ranks as decoration. A div does not become a heading, and extra h1 elements flatten the outline.",
            solution:
              "Keep a single h1 for your name. Use h2 for the hobby and any other section. Leave the div only if you still need a group with no better tag. Wait for CSS before you chase font size.",
          },
        ],
        knowledgeChecks: [
          {
            id: "w2s2-rank",
            question: "Why does this course ask for one h1 on the introduction page?",
            format: "Multiple choice",
            options: [
              "Because h1 is the main heading rank, not a way to shout several titles",
              "Because a page may contain only one element in total",
              "Because h1 must live in the head beside the title",
              "Because h1 inserts the image",
            ],
          },
          {
            id: "w2s2-alt",
            question: "Good alternative text repeats the file name, such as photo.jpg.",
            format: "True or false",
            options: ["True", "False"],
          },
          {
            id: "w2s2-list",
            question: "You are writing steps that must happen in order. Which parent element fits?",
            format: "Multiple choice",
            options: ["ul", "ol", "div", "title"],
          },
          {
            id: "w2s2-link",
            question: "In a sentence or two, what do href and the link text each do?",
            format: "Short answer",
          },
        ],
        homework: {
          description:
            "The graded work is the week assignment: a personal introduction webpage that includes a hobby. Use introduction.html in learning/week-02. This session does not ask for a second, separate essay.",
          requirements: [
            "Submit the week assignment, not a note in this lesson's short response box.",
            "Include the hobby section, a list, a real link, and an image with alternative text.",
            "Keep the file at learning/week-02/introduction.html and say that path in the submission.",
          ],
          deliverables: [
            "The week assignment submission, with the HTML and the path to the image file.",
          ],
          submission:
            "Open the week assignment and submit there. Paste the HTML or upload the files as that assignment asks.",
          criteria: [
            "The assignment rubric is the mark scheme. Meet each requirement there.",
            "The page still has a complete document shape from the previous session.",
          ],
          submissionKind: "module_assignment",
        },
        summary: [
          "Headings form an outline. h1 is the main rank. Paragraphs hold prose. Rank is not a font picker.",
          "strong marks importance and em marks stress. A link needs href and honest link text.",
          "An image needs a source file beside the page and alternative text that can stand in for the picture.",
          "ul and ol hold list items. A div groups elements without claiming a meaning. Prefer a meaningful tag when one exists.",
        ],
        nextLesson: {
          title: "HTML forms",
          why: "The next lesson, html-forms, collects a name, an email address, and a message with labels, fields, and a button.",
          lessonSlug: "html-forms",
        },
      },
      guide: {
        sessionNumber: 4,
        week: 2,
        title: "Text, links, images, and lists",
        durationMinutes: 90,
        objectives: [
          "Students produce a heading outline that is not a stack of h1 elements.",
          "Students add one working link and one image whose alt text they can defend.",
          "Students leave ready to submit the introduction as the week assignment.",
        ],
        tools: [
          "The projector browser and file manager",
          "A small image already copied into the classroom week-02 folder",
          "introduction.html started from a valid document skeleton",
          "The week assignment rubric open for the final ten minutes",
        ],
        preparation: [
          "Copy a photo you took, or a simple sketch, into the classroom learning/week-02 folder and name it sketch.jpg.",
          "Open https://example.com once on the classroom network so the live link does not fail for an unrelated reason.",
          "Prepare a bad alt value, the file name itself, so you can reject it and replace it in front of the class.",
          "Read the assignment rubric and mark which requirement you will point to when you stop the practice.",
        ],
        flow: [
          {
            minutes: 5,
            title: "Read last session's page as an outline",
            detail:
              "Open a student's shape, or your index.html, and ask what a visitor cannot yet scan. There is no section title and nowhere to go. Say that today adds the outline, a link, a picture, and a list. Write h1, href, and alt on the board.",
          },
          {
            minutes: 15,
            title: "Ranks, strong, and em",
            detail:
              "Add an h1 and an h2 under a kept title element. Stress that the tab and the visible heading are different. Wrap two words in strong and two in em and ask the room which choice is importance and which is spoken stress. Reject a whole paragraph wrapped in strong.",
          },
          {
            minutes: 20,
            title: "List, link, and image on the projector",
            detail:
              "Build one ul and one ol and show the double numbers that appear if you type the numerals yourself. Add a link to https://example.com with link text that is not 'click here', and click it. Add the image with a weak alt, refresh, rename the file on purpose so it breaks, then repair both the src and the alt while narrating.",
          },
          {
            minutes: 30,
            title: "Students build their own introduction",
            detail:
              "Each student creates introduction.html with their name, a hobby, one list, one link they have opened, and their own image in week-02. Circulate and look at alt text and href values. Stop people who paste the sample hobby. Help move images out of Downloads.",
          },
          {
            minutes: 10,
            title: "Broken pictures and empty links",
            detail:
              "Invite one broken image and one dead link onto the projector if they happened. Compare the src string with the file name, including the extension. If the room had no failures, break your own src for thirty seconds and repair it. Do not skip the comparison.",
          },
          {
            minutes: 10,
            title: "Hand them the assignment",
            detail:
              "Open the week assignment and read the requirements about the hobby, the list, the link, the image, and the path. Tell them this lesson's response box is not the submission. Ask who still has the image outside week-02 and pause until that file is copied.",
          },
        ],
        explain: [
          "Heading numbers are ranks. One h1 names the page.",
          "strong and em carry meaning. The bold and italic looks are the usual display.",
          "href is the destination. The text between the a tags is the label.",
          "alt replaces the image. The file must sit beside the HTML if src is only a name.",
          "ul is for an unordered set. ol is for a sequence. div does not mean heading.",
        ],
        questions: [
          "If you cover the picture, does the alt text still tell the truth?",
          "Why is 'click here' a poor label even when the href is correct?",
          "When would you choose ol instead of ul for the same three items?",
          "What is the div doing in the sample that an h2 is not doing?",
        ],
        demonstration:
          "Build the introduction live from a valid skeleton. Click the link. Break the image file name, observe the alt text, then restore src. Show the image and the HTML side by side in the file manager.",
        practice:
          "Students write their own hobby page in learning/week-02/introduction.html and prove the link and the image. You look at folders as well as browsers, because a picture that only exists in Downloads is not finished.",
        expectedOutcomes: [
          "Each page has one h1, a hobby section, a list, a clicked link, and an image with considered alt text.",
          "The image file is in week-02, not only on the Desktop.",
          "Students know the week assignment is this file, submitted on the assignment page.",
        ],
        difficulties: [
          {
            issue: "The picture stays broken after several refreshes.",
            help: "Stand at the file manager. Read the file name aloud, including the extension, and compare it with src. Copy the file into week-02 if it is elsewhere. Watch out for spaces and for jpg versus jpeg.",
          },
          {
            issue: "The student uses h1 for every line they want to emphasise.",
            help: "Ask them to read only the h1 text as a table of contents. When it sounds like a pile of slogans, change the extras to h2 or to strong inside a paragraph. Keep a single h1.",
          },
          {
            issue: "They do not have a photo and want to stop.",
            help: "Let them photograph a pencil, a cup, or the classroom desk, or draw a small sketch and photograph that. The subject can be ordinary. The alt text still has to describe what they captured. Do not send them to copy a stranger's picture.",
          },
        ],
        homework:
          "Point everyone at the module assignment. Say the hobby section is part of the introduction, not a second project. Repeat the path learning/week-02/introduction.html and the rule about secrets.",
        assessment:
          "The knowledge checks plus a quick look at href, alt, and heading rank are the live check. The assignment rubric scores the page. A missing image file is not rescued by a confident src.",
        recap:
          "Ask a student to read their heading outline aloud, another to read their alt text with the picture hidden, and a third to say what a div does not mean. Name the next lesson: forms, where the page starts collecting answers instead of only presenting them.",
        knowledgeCheckAnswers: [
          {
            id: "w2s2-rank",
            answer: "Because h1 is the main heading rank, not a way to shout several titles",
            explanation:
              "One h1 marks the page's main heading. Extra h1 elements are not how you enlarge text, and the title element in the head is a different job.",
          },
          {
            id: "w2s2-alt",
            answer: "False",
            explanation:
              "Alternative text describes the image for someone who cannot see it. The file name is not a description.",
          },
          {
            id: "w2s2-list",
            answer: "ol",
            explanation:
              "An ordered list is for steps in sequence. ul is for items whose order does not matter. div and title do not number steps.",
          },
          {
            id: "w2s2-link",
            answer:
              "href holds the address the browser should open. The link text is the label a person reads and activates.",
            explanation:
              "Award the point when both roles are present. Wording can vary. Do not require the phrase hypertext reference.",
          },
        ],
      },
    },
  ],
  assignment: {
    slug: "week-02-assignment",
    title: "Personal introduction webpage",
    summary:
      "Build a small HTML page that introduces you and a hobby, with headings, text, a list, a link, and an image.",
    instructions: `
Create learning/week-02/introduction.html and open it in a browser before you submit. The page must be a complete HTML document: a DOCTYPE, an html element with a language, a head with a charset and a title, and a body.

In the body, write one h1 with your name or a public name you use in class. Add a short paragraph about you. Add an h2 for a hobby and a paragraph about that hobby. Use strong or em once, around a short phrase, for a reason you could explain aloud. Add either a ul or an ol with at least three items. The list should match the hobby: supplies if order does not matter, or steps if it does.

Include one link inside a paragraph. The href must be a full https address you have opened. The words between the tags must say where the link goes. Do not write "click here" as the only label.

Include one image. Put the image file in learning/week-02 and set src to the file name. Write alt text that describes the picture. Use a photo or sketch you have the right to use.

You may wrap a short note in one div. Do not use a div instead of a heading. Do not include a home address, a password, or another person's private information.

Submit the HTML. In the written part of the submission, give the path learning/week-02/introduction.html and the image file name. Say whether you used a ul or an ol and why.
`,
    objectives: [
      "Produce a complete HTML document a browser can open from your computer.",
      "Mark up an introduction and a hobby with headings, paragraphs, emphasis, a list, a link, and an image.",
      "Write alternative text and link text that still make sense without extra explanation.",
    ],
    requirements: [
      "The file is a complete document with DOCTYPE, html, head, title, charset, and body.",
      "The body has one h1, at least one h2, and at least two paragraphs.",
      "strong or em appears around a short phrase, not around a whole section.",
      "One list has at least three items and uses ul or ol on purpose.",
      "One link has an https href and meaningful link text.",
      "One image in the same folder has src set to its file name and a useful alt.",
    ],
    deliverables: [
      "introduction.html, pasted or uploaded.",
      "The path and the image file name, plus one sentence on why the list is ordered or unordered.",
    ],
    rubric: [
      {
        criterion: "Document structure",
        points: 20,
        description:
          "DOCTYPE, html, head, title, charset, and body are present and in a sensible order. The page opens as HTML.",
      },
      {
        criterion: "Headings and paragraphs",
        points: 20,
        description:
          "One h1 and at least one h2 form a readable outline. Prose is in paragraphs, in the student's own words.",
      },
      {
        criterion: "Emphasis",
        points: 10,
        description:
          "strong or em is used on a short phrase in a way that matches importance or stress.",
      },
      {
        criterion: "List",
        points: 15,
        description:
          "A ul or ol contains at least three li items, and the choice fits ordered steps or an unordered set.",
      },
      {
        criterion: "Link",
        points: 15,
        description:
          "The anchor has a full https href and link text that says what the destination is.",
      },
      {
        criterion: "Image and alternative text",
        points: 20,
        description:
          "The image file is named in src and the alt text describes the picture rather than repeating a file name.",
      },
    ],
    points: 100,
    instructorSolution: `
A full-mark page uses the same skeleton as the fictional Jordan Lee sample and then replaces every personal fact. The reference file learning/week-02/introduction.html contains a DOCTYPE, html lang="en", a utf-8 charset, and a title in the head. The body has one h1, two h2 sections, paragraphs, strong around the folder path, em on the stressed word, a ul for supplies, an ol for steps, a link to https://example.com with the link text "example.com", an img with src="sketch.jpg" and alt="A pencil sketch of a wooden chair", and one div that only groups a class note.

Mark the student's own subjects, not the sample hobby. Award the image points when their file name and alt match a picture they placed in week-02, even if the subject is a cup or a pencil. Do not award the link points for "click here" or for an href with no scheme. Do not award heading points if every line is an h1. The div is optional and scores nothing extra. Missing alt text loses the image points even if the picture displays on your machine.

${introductionPage}
`,
  },
  quiz: {
    slug: "week-02-quiz",
    title: "Week 2 quiz: HTML documents, text, links, and images",
    passingScore: 70,
    allowRetakes: true,
    questions: [
      {
        slug: "w2-q1-html",
        type: "multiple_choice",
        prompt: "What is HTML for?",
        options: [
          { id: "a", text: "Labelling the structure of a document, including links" },
          { id: "b", text: "Choosing the paint and the columns of a page" },
          { id: "c", text: "Replacing the browser" },
          { id: "d", text: "Naming a folder on the desktop" },
        ],
        correct: { optionId: "a" },
        explanation:
          "HTML marks structure and links. Colours and columns belong to CSS. The browser reads HTML. It is not replaced by it.",
        points: 1,
      },
      {
        slug: "w2-q2-closing",
        type: "multiple_choice",
        prompt: "Which of these is a closing tag for a paragraph?",
        options: [
          { id: "a", text: "<p>" },
          { id: "b", text: "</p>" },
          { id: "c", text: "<paragraph>" },
          { id: "d", text: "<p class>" },
        ],
        correct: { optionId: "b" },
        explanation:
          "A closing tag repeats the name and puts a slash after the opening bracket. <p> opens the paragraph. The others are not a closing p tag.",
        points: 1,
      },
      {
        slug: "w2-q3-title",
        type: "true_false",
        prompt: "The title element is the large heading printed in the body of the page.",
        correct: { value: false },
        explanation:
          "The title lives in the head and is shown on the tab. A visible heading in the body is an h1 or another heading element.",
        points: 1,
      },
      {
        slug: "w2-q4-attribute",
        type: "multiple_choice",
        prompt: "Where does an attribute belong?",
        options: [
          { id: "a", text: "Inside the opening tag" },
          { id: "b", text: "Inside the closing tag" },
          { id: "c", text: "After the closing html tag, outside the document" },
          { id: "d", text: "Only in the file name" },
        ],
        correct: { optionId: "a" },
        explanation:
          "An attribute is a fact on the opening tag, written as a name, an equals sign, and a quoted value. Closing tags only end the element.",
        points: 1,
      },
      {
        slug: "w2-q5-tab",
        type: "code_reading",
        prompt: "What text does the browser show on the tab for this document?",
        codeSnippet: dedent(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="utf-8">
            <title>Bus notes</title>
          </head>
          <body>
            <h1>My route</h1>
            <p>I take the number 4.</p>
          </body>
          </html>
        `),
        options: [
          { id: "a", text: "Bus notes" },
          { id: "b", text: "My route" },
          { id: "c", text: "I take the number 4." },
          { id: "d", text: "html" },
        ],
        correct: { optionId: "a" },
        explanation:
          "The tab reads the title element. My route is the h1 in the body. The paragraph is the sentence on the page, not the tab label.",
        points: 2,
      },
      {
        slug: "w2-q6-alt",
        type: "true_false",
        prompt: "Alternative text should repeat the file name, for example alt=\"photo.jpg\".",
        correct: { value: false },
        explanation:
          "Alt text describes the picture so the page still communicates when the image cannot be seen. A file name is not that description.",
        points: 1,
      },
      {
        slug: "w2-q7-ol",
        type: "multiple_choice",
        prompt: "Which element fits a sequence of steps that must stay in order?",
        options: [
          { id: "a", text: "ul" },
          { id: "b", text: "ol" },
          { id: "c", text: "div" },
          { id: "d", text: "head" },
        ],
        correct: { optionId: "b" },
        explanation:
          "ol is an ordered list. ul is for items without a required order. A div has no list meaning, and the head is not a list of steps.",
        points: 1,
      },
      {
        slug: "w2-q8-div",
        type: "true_false",
        prompt: "A div element, by itself, means the contents are a heading.",
        correct: { value: false },
        explanation:
          "A div is a generic group. It does not join the heading outline. A heading rank needs an h1, h2, or similar element.",
        points: 1,
      },
      {
        slug: "w2-q9-strong",
        type: "multiple_choice",
        prompt: "Why does this course use the strong element instead of only telling you to make words bold?",
        options: [
          { id: "a", text: "Because bold text is illegal in HTML" },
          { id: "b", text: "Because strong marks importance; bold is only the usual look" },
          { id: "c", text: "Because strong is shorter to type than CSS" },
          { id: "d", text: "Because browsers ignore bold styles" },
        ],
        correct: { optionId: "b" },
        explanation:
          "strong records importance in the document. Browsers often use bold letters for that meaning. Later, CSS can change the look without removing the importance.",
        points: 2,
      },
    ],
  },
};
