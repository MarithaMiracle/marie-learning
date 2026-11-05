import type { ModuleSeed } from "../../src/lib/content-types";

export const week04: ModuleSeed = {
  slug: "week-04-css",
  number: 4,
  weekNumber: 4,
  monthLabel: "Month 1 — Computer fundamentals, HTML and CSS",
  title: "CSS fundamentals",
  description:
    "Give a webpage its appearance. You will write CSS rules for colour, type, and backgrounds, then control size and spacing with the box model.",
  lessons: [
    {
      slug: "introduction-to-css",
      sessionNumber: 7,
      title: "Introduction to CSS",
      estimatedMinutes: 90,
      difficulty: "Gentle introduction",
      requiresOs: true,
      content: {
        overview: {
          about:
            "This lesson teaches CSS, the language that sets the appearance of a webpage. You will write selectors, properties, and values, connect a stylesheet to HTML, and change colour, background, and text.",
          why: "HTML names the parts of a page. It does not carry a colour scheme or a chosen typeface. CSS is how you describe that appearance without throwing away the structure.",
          alreadyKnow:
            "You can build a complete HTML page with headings, paragraphs, links, and semantic regions, and you can reload it in a browser.",
        },
        objectives: [
          "Explain what CSS changes and what HTML still owns.",
          "Read a rule as a selector, a property, and a value.",
          "Write an element selector and a class selector that match real markup.",
          "Connect an external stylesheet with a link element and confirm it loaded.",
          "Set text colour, background colour, a font stack, and basic text properties.",
        ],
        prerequisites: [
          {
            label: "You can write a complete HTML document and open it in a browser.",
            lessonSlug: "introduction-to-html",
          },
          {
            label: "You can mark a page with headings, regions, and links.",
            lessonSlug: "semantic-html",
          },
        ],
        teachingNotes: [
          {
            heading: "What CSS is and why pages need it",
            markdown: `
CSS means Cascading Style Sheets. A style sheet is a list of appearance rules. Cascading describes what happens when two rules speak about the same thing: they combine, and one of them wins for each detail. You will see that choice later in this lesson. The first idea is simpler to hold: HTML says what a piece is, and CSS says how it should look.

A heading is still a heading if it is navy, green, or black. A form is still a form if the page background is warm white. Last week the semantic page looked plain because we refused to fake meaning with decoration. That plainness was correct. It was also incomplete for a reader who needs a comfortable size, a clear difference between heading and text, and a page that does not look like an unformatted note. CSS solves the appearance problem without moving the words into a picture.

Think of a printed script for a play. The script names the speaker and the line. A separate note says the programme is set in a serif type and the title is printed in dark blue. If you change the colour note, you do not rewrite the play. If you change a line, you do not reprint the colour note. HTML is the script. CSS is the appearance note. Keeping them apart means you can restyle a page, or style two pages the same way, without touching every paragraph.

The browser already applies a few default styles. Headings are large and bold. Links are underlined and usually blue. The body has a small margin, which you will measure properly in the next lesson. Those defaults are a stylesheet the browser carries. Your CSS adds rules on top of that. You are not painting on a blank wall. You are replacing decisions you do not want and leaving the rest.

CSS does not enrol anyone, calculate a total, or fix a missing heading. If the HTML outline is wrong, a pleasant colour will not make the outline true. Write the document first. Then point CSS at the elements you already have: \`header\`, \`h1\`, \`p\`, \`a\`, and the classes you add for appearance that HTML has no element for.

:::misunderstanding CSS replaces HTML
CSS does not store the paragraph. If you delete the HTML, the stylesheet has nothing to show. If the stylesheet fails to load, the HTML should still be readable. That last test is a good one: a page with no CSS should still make sense.
:::

:::example The same note, two appearances
A workshop page can be dark type on a warm background in class, and the same headings can later move to a different palette. The h1 does not change jobs when the colour changes.
:::
`,
          },
          {
            heading: "Selectors, properties, and values",
            markdown: `
A CSS rule has a selector and a declaration block. The selector says which elements the rule is about. The block, inside curly braces, holds declarations. Each declaration is a property, a colon, a value, and a semicolon.

\`\`\`css
p {
  color: #1a1a1a;
  font-size: 18px;
}
\`\`\`

Here the selector is \`p\`, so the rule talks about paragraphs. \`color\` is the property for text colour. \`#1a1a1a\` is the value, a dark colour written as hex. \`font-size\` is another property. \`18px\` means 18 pixels. The semicolon ends a declaration. The braces hold the list. Indent the declarations so you can see the block. The browser does not need the indent. You do.

An element selector uses the tag name: \`h1\`, \`p\`, \`a\`, \`header\`, \`main\`. It matches every element of that kind on the page. \`header { background-color: #1f3a5f; }\` paints every header. That is useful when you mean every header. It is too broad when you mean one special paragraph.

A class selector starts with a dot in CSS and matches an HTML \`class\` attribute without the dot. In the stylesheet, \`.intro\` selects any element whose class is intro. In the HTML, you write \`class="intro"\` on the element. The dot lives only in the CSS. If you write \`class=".intro"\` in the HTML, the names do not match and the rule does nothing.

\`\`\`html
<p class="intro">These notes stay on my computer while I learn CSS.</p>
\`\`\`

\`\`\`css
.intro {
  font-size: 20px;
}
\`\`\`

You can group selectors with commas when they should share declarations. \`h1, h2 { font-family: Arial, Helvetica, sans-serif; }\` sets the same font stack on both heading levels. A descendant selector is a space between two selectors. \`nav a\` matches anchors that sit inside navigation, not every anchor on the page. That is how you colour the menu without colouring the email link in a paragraph.

Property names must be spelled as CSS spells them. \`font-size\` uses a hyphen. \`fontsize\` is not a property, so the browser ignores that line. Values must fit the property. \`color\` wants a colour. \`font-size\` wants a size. A missing semicolon can make the browser treat the next property as part of the previous value, so both lines appear to fail. When a rule does nothing, check the selector, the spelling, and the semicolon before you rewrite the HTML.

Comments in a stylesheet are written \`/* like this */\`. They are notes for people. An HTML comment does not belong in the CSS file. The browser ignores the CSS comment. It does not ignore a typo outside the comment.

:::misunderstanding The dot in .intro is part of the HTML class
The dot marks a class selector in CSS. The HTML class value is the name alone. Mixing them up is the most common reason a carefully written rule never appears.
:::

:::warning One missed semicolon can hide the next line
If the size changes and the colour does not, look at the line above the colour. A missing semicolon there can swallow the declaration you are staring at.
:::
`,
          },
          {
            heading: "Which rule wins",
            markdown: `
The cascade is the set of decisions the browser uses when more than one rule sets the same property on the same element. You do not need the full ranking this week. You need the part that explains ordinary surprises.

For normal rules in your stylesheet, a more specific selector wins over a more general one. An element selector such as \`p\` is general. A class selector such as \`.intro\` is more specific, so \`.intro\` can set a size even when \`p\` also sets a size. An id selector such as \`#contact\` is more specific than a class. You already use ids for labels and for in-page links. You may style an id, and you should do it rarely, because an id can only identify one element. A class can be reused on purpose.

If two rules are equally specific, the one that comes later in the stylesheet wins for that property. Order is not moral. It is a tie-breaker. This is why a rule at the bottom of the file can quietly replace a rule at the top. When you are hunting a bug, look below the rule you trust, not only at it.

A style attribute on the element itself, called an inline style, beats the stylesheet for the property it sets. \`<p style="color: red;">\` will stay red even if \`.intro\` says the colour is navy. That power is real, and it is why inline styles become hard to live with. The appearance is scattered through the HTML. You cannot see the whole palette in one file. Prefer the stylesheet. Use an inline style only as a short experiment, then move the decision into CSS and delete the attribute.

\`\`\`css
p {
  color: #1a1a1a;
}

.intro {
  color: #1f3a5f;
}
\`\`\`

A paragraph with \`class="intro"\` gets the navy colour from \`.intro\`, because the class wins over the element rule. Its font size still comes from \`p\` if \`.intro\` does not set \`font-size\`. The cascade works property by property. One winning colour does not throw away an unrelated size.

Beginners often add a second rule instead of editing the first, then cannot tell which one is active. Keep one declaration for a property in the selector you actually mean. Delete the loser. A short stylesheet you understand is better than a long one that argues with itself.

:::example A menu link and a paragraph link
\`nav a { color: #1f3a5f; }\` changes anchors inside nav. An email link in a paragraph keeps the browser's link colour unless another rule targets it. The space in \`nav a\` is the descendant relationship. It is not a class name.
:::
`,
          },
          {
            heading: "Inline, internal, and external CSS",
            markdown: `
There are three places to write CSS. All three can change a colour. They are not equally kind to a project.

Inline CSS is the \`style\` attribute on one element. It affects that element only. It is quick to type and awkward to repeat. If five paragraphs need the same size, you would copy the attribute five times and then edit five places later. Inline CSS also mixes the appearance note into the script. We avoid it for work you will keep.

Internal CSS is a \`style\` element in the head of the HTML file. The rules apply to that page. This is reasonable for a single experiment you will throw away. It becomes awkward when two pages should share a look, because you then have two copies of the rules. It also makes the HTML file longer with decisions that are not document structure.

External CSS is a separate file, usually named with \`.css\`, linked from the head. The HTML stays a document. The stylesheet stays a list of appearance rules. Two pages can share one file. This is the habit for the course and for the profile card assignment.

\`\`\`html
<head>
  <meta charset="utf-8">
  <title>Desk notes</title>
  <link rel="stylesheet" href="notes.css">
</head>
\`\`\`

The \`link\` element goes in the head. It is one tag, like \`meta\`. \`rel="stylesheet"\` says what the relationship is: this file is a stylesheet, not a navigation link. \`href\` is the path, the same idea as \`href\` on an anchor and \`src\` on an image. If \`notes.css\` sits in the same folder as the HTML file, the path is the file name. A path to the wrong folder loads nothing. The page still appears, unstyled, which is easy to mistake for "CSS does not work".

Save both files. Open the HTML file in the browser, not the CSS file. The CSS file is source. It will look like text rules. The HTML file is the page. After each change to the stylesheet, save and reload the page. The browser does not share a live view with the editor. That was true for HTML. It stays true here.

If the link fails, check four things in order. The \`link\` is inside the head. \`rel\` is stylesheet. \`href\` matches the file name exactly, including capital letters. The browser was reloaded after the save. On Linux, \`notes.css\` and \`Notes.css\` are different files. On Windows, a hidden \`.txt\` ending can make the name \`notes.css.txt\` while the href asks for \`notes.css\`.

:::tip Open the HTML file to see the design
Opening the stylesheet in the browser shows your rules as text. That can be useful when you want to read them. It is not the styled page. Keep the page and the editor side by side.
:::

:::misunderstanding The link element is the same thing as an anchor
Both use href. An anchor in the body is a control a person activates. A link element in the head tells the browser to load a related file. Swapping them does not style the page.
:::
`,
          },
          {
            heading: "Colours and backgrounds",
            markdown: `
\`color\` sets the foreground, which for text is the colour of the letters. \`background-color\` sets the fill behind the content. They are different properties. Setting only \`color\` does not paint the page. Setting only \`background-color\` leaves the letters at the browser default, which is usually black.

A colour value can be a name or a hex code. Names such as \`navy\`, \`white\`, and \`wheat\` are readable and limited. Hex is more precise. A hex colour starts with \`#\` and, in the form you will use, has six digits. Two digits are red, two are green, and two are blue. Each pair runs from \`00\` to \`ff\`, which is 0 to 255 in ordinary counting. \`#000000\` is black. \`#ffffff\` is white. \`#1a1a1a\` is near-black. \`#1f3a5f\` is a dark blue. \`#f4f1ea\` is a warm light background. You do not need to invent a palette from the numbers yet. You need to read a value you copied and know which property it belongs to.

\`\`\`css
body {
  color: #1a1a1a;
  background-color: #f4f1ea;
}

header {
  color: #ffffff;
  background-color: #1f3a5f;
}
\`\`\`

Text colour is inherited. If you set \`color\` on \`body\`, paragraphs and lists inside the body use it unless one of those elements has its own \`color\` rule. Background colour is not inherited. A header with its own \`background-color\` paints the header only. Ordinary paragraphs and headings are transparent, so a parent's fill shows through them until you give that child its own background. Set the page fill on \`body\`. Set a special fill on the region that needs it, such as \`header\` or a class.

Contrast means the difference between the letters and the surface behind them. Pale gray on white can look elegant for a second and then become hard to read. Dark letters on a light page, or light letters on a dark header, keep the words visible. A practical check: lean back and read a sentence. If the words dissolve, change the pair. Do not use colour as the only signal that a link is a link. Keep the underline on links this week so the colour is not doing the job alone.

The header example uses white text on dark blue. Both declarations are required. White text on the default white page would vanish. If you set a dark background, set a light \`color\` in the same rule so the pair stays together.

:::warning A dark background needs a light text colour in the same rule
If you paint the header navy and leave the text black, the heading can become difficult to see. Set color and background-color as a pair whenever you leave the usual dark-on-light page.
:::
`,
          },
          {
            heading: "Fonts and text",
            markdown: `
\`font-family\` chooses the typeface. Computers do not all have the same fonts installed. A font stack is a list. The browser uses the first family that is actually available, then the next. End the list with a generic family: \`serif\` (small strokes at the ends of letters), \`sans-serif\` (without those strokes), or \`monospace\` (even width, useful for code). 

\`\`\`css
body {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 18px;
  line-height: 1.5;
}

h1 {
  font-family: Arial, Helvetica, sans-serif;
}
\`\`\`

Quote a family name that contains a space, as in \`"Times New Roman"\`. Names without a space, such as Georgia or Arial, do not need quotes. The generic family at the end is a safety net. If neither Georgia nor Times New Roman is installed, the browser still uses some serif face it does have.

\`font-size: 18px\` sets the size in pixels. Pixels are a fixed unit on the screen. They are a clear place to start. Avoid sizes so small that a paragraph becomes a test of eyesight. Headings can be larger than the body. You do not change an \`h2\` into an \`h4\` to get a smaller size. You keep the HTML level and set \`font-size\` on the heading you mean.

\`line-height: 1.5\` sets the space between lines as a multiple of the font size. A unitless number is the value to prefer here. It gives paragraphs room to read. A cramped line height makes a correct page feel like a wall of text.

\`font-weight: bold\` and \`font-weight: normal\` control weight. You already have \`strong\` for words that are important. Use \`strong\` when the importance is part of the sentence. Use \`font-weight\` when a whole heading or label should look heavier as a style. \`text-align\` can be \`left\`, \`center\`, or \`right\`. Centering a short heading can suit a card. Centering a long paragraph makes the eye hunt for the start of each line. Leave body paragraphs on the left for this course unless you have a short line and a reason.

\`text-decoration: underline\` is the usual look of a link. \`text-decoration: none\` removes it. Leave link underlines in place this week. A colour change alone is a weak cue, and you have not yet built a second cue such as a button shape. The next lesson's box can make a control look distinct. Until then, do not strip the underline.

Set the body font rules once. Let inheritance carry them into paragraphs. Override them on headings when you want a different family. That is the same economy as the cascade: one general rule, then a specific exception you can point to.

:::misunderstanding The font name in the stylesheet installs that font
\`font-family\` asks for a face. It does not download one and it does not install one. If the computer lacks the face, the browser moves to the next name in the stack. That is why the generic family belongs at the end.
:::
`,
          },
        ],
        vocabulary: [
          {
            term: "CSS",
            definition:
              "Cascading Style Sheets, the language of appearance rules for a document. It does not replace the HTML structure.",
          },
          {
            term: "Selector",
            definition:
              "The part of a rule that chooses elements, such as p for paragraphs or .intro for a class named intro.",
          },
          {
            term: "Property",
            definition:
              "The named aspect a declaration sets, such as color, background-color, or font-size. The name must be spelled as CSS spells it.",
          },
          {
            term: "Value",
            definition:
              "The setting after the colon, such as a hex colour or 18px. It has to be a kind of value that property accepts.",
          },
          {
            term: "Class selector",
            definition:
              "A selector that starts with a dot and matches an HTML class of the same name, without the dot in the HTML.",
          },
          {
            term: "External stylesheet",
            definition:
              "A separate .css file loaded from the head with a link element, so appearance stays out of the document body.",
          },
          {
            term: "Font stack",
            definition:
              "A font-family list. The browser uses the first installed face and should end on a generic family such as serif.",
          },
          {
            term: "Cascade",
            definition:
              "The way competing rules combine. A more specific selector wins, and a later equal rule wins for that property.",
          },
        ],
        demonstrations: [
          {
            title: "Link a stylesheet and change the page",
            intro:
              "You will create learning/week-04/notes.html and notes.css, connect them, and change a colour until the browser proves the link works. The HTML is the page you open. The system steps differ when you create the folder and reload.",
            steps: [
              "Create the folder learning/week-04. Add notes.html as a complete document with a header, an h1, a main, and two paragraphs. Give one paragraph class intro.",
              "In the head, add a link element with rel stylesheet and href notes.css.",
              "Create notes.css in the same folder. Set the body font stack, a font size, a dark text colour, and a light background colour.",
              "Set the h1 to a sans-serif stack and a dark blue colour. Set .intro to a larger font size.",
              "Save both files. Open notes.html from the week-04 folder in a browser. Confirm the background and the heading colour are yours, not the plain browser look.",
              "Change the body background to a different hex colour, save the CSS only, and reload the page until the new colour appears.",
              "Temporarily change href to note.css, reload, and watch the styles disappear. Restore notes.css and reload again.",
              "Open the CSS file in the editor and confirm you did not need to open it as the page. The styled result stays in the browser window that shows the HTML.",
            ],
            expected:
              "notes.html shows your background, your heading colour, and a larger intro paragraph. A wrong href removes those styles. Restoring the href and reloading brings them back.",
            verify:
              "Use the browser's view-source command and find the link element. Then change one word in a paragraph, save the HTML, reload, and confirm the word updates while the colours stay.",
            ifItFails:
              "If the page is unstyled, compare href with the file name character by character and confirm the link is in the head. If only one declaration fails, check the semicolon on the line above and the property spelling. If you see CSS source as the page, you opened the .css file instead of the .html file.",
            os: {
              sameOnAllPlatforms:
                "Keep notes.html and notes.css in the same folder. Open the HTML file to see the design. Save the CSS file and reload the page after every change. The href is the file name when they share a folder.",
              windows: [
                "In File Explorer, create learning/week-04 and turn on file name extensions. notes.css must not be notes.css.txt.",
                "Right-click notes.html, choose Open with, and pick Edge, Chrome, or Firefox. Reload with Ctrl+R or F5 after you save the stylesheet.",
                "If the editor and the browser disagree, check that both are using the week-04 folder and not a copy on the desktop.",
              ],
              macos: [
                "In Finder, create learning/week-04. If TextEdit is involved, choose Format then Make Plain Text before you save either file.",
                "Control-click notes.html, choose Open With, and pick Safari, Chrome, or Firefox. Reload with Command+R.",
                "Use Get Info on notes.css if the extension is hidden, and make sure href uses that exact name.",
              ],
              linux: [
                "In Files, create learning/week-04. Save both names in lowercase. notes.css and Notes.css are different files here.",
                "Right-click notes.html, choose Open With, and pick Firefox or another browser. Reload with Ctrl+R or F5.",
                "If a classmate's page works and yours does not, compare capital letters in href and in the file name before you rewrite the rules.",
              ],
              identify: [
                "Windows uses File Explorer and Ctrl+R or F5. macOS uses Finder and Command+R. Many Linux desktops use Files and Ctrl+R or F5.",
                "The Apple menu means macOS. The Windows logo means Windows. If you have neither, do not follow those click paths.",
                "You do not install a new programme to apply a colour. The browser you already use can load a stylesheet.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "A notes page that links to CSS",
            filename: "learning/week-04/notes.html",
            language: "html",
            code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Desk notes</title>
  <link rel="stylesheet" href="notes.css">
</head>
<body>
  <header>
    <h1>Desk notes</h1>
  </header>
  <main>
    <p class="intro">These notes stay on my computer while I learn CSS.</p>
    <p>I change the stylesheet, save, and reload this page.</p>
  </main>
</body>
</html>
`,
            explanation:
              "Save this beside notes.css. The link element is in the head. class intro has no dot. Open this HTML file in the browser after both files are saved. If you only create this file, the page is still valid HTML and will look like the browser defaults.",
            lineNotes: [
              {
                focus: "link",
                note: "rel stylesheet and href notes.css load the external file from the same folder.",
              },
              {
                focus: "class",
                note: "The HTML says intro. The stylesheet will say .intro. The dot is not written here.",
              },
              {
                focus: "structure",
                note: "Header and main stay semantic. CSS will target them. It does not replace them.",
              },
            ],
            expectedOutput:
              "With notes.css present, the page shows a warm background, dark body text, a sans-serif blue heading, and a slightly larger first paragraph. Without the CSS file, the same words appear in the browser default look.",
            level: "practical",
          },
          {
            title: "The notes stylesheet",
            filename: "learning/week-04/notes.css",
            language: "css",
            code: `body {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 18px;
  line-height: 1.5;
  color: #1a1a1a;
  background-color: #f4f1ea;
}

h1 {
  font-family: Arial, Helvetica, sans-serif;
  color: #1f3a5f;
}

.intro {
  font-size: 20px;
}
`,
            explanation:
              "This file holds the appearance rules for notes.html. The body sets the page type, the text colour, and the page background. The heading replaces the type and colour for h1 only. The class changes the size of one paragraph. Inheritance carries the body font into the second paragraph, which has no class.",
            lineNotes: [
              {
                focus: "body",
                note: "The font stack ends with serif. color and background-color are a dark-on-light pair.",
              },
              {
                focus: "h1",
                note: "A more specific element than the inherited body colour. The heading stays an h1 in the HTML.",
              },
              {
                focus: ".intro",
                note: "The dot is the class selector. It only changes font-size, so the paragraph still inherits the body colour.",
              },
            ],
            expectedOutput:
              "The page background is warm and light, the heading is dark blue in a sans-serif face, and the intro paragraph is 20 pixels. Reload after a saved edit to see a new value.",
            level: "basic",
          },
        ],
        exercises: [
          {
            title: "Make one rule fail, then restore it",
            difficulty: "warm-up",
            prompt:
              "Use a copy of the notes page. Cause the stylesheet to stop working, observe the HTML alone, then restore the link. Do not delete your only copy of the CSS rules.",
            steps: [
              "Save a backup of the working href by leaving the correct link in a comment in your notes, or by copying the file first.",
              "Change href to a file name that does not exist. Reload and write down what disappeared.",
              "Restore the href. Reload and confirm the colours return.",
              "Add the dot into the HTML class value, reload, and see the intro size fail. Remove the dot from the HTML and reload.",
            ],
            expectedOutcome:
              "You can describe the unstyled page and the styled page, and you can repair both a bad path and a dot in the class value.",
          },
          {
            title: "Style a page you already wrote",
            difficulty: "practice",
            prompt:
              "Choose one HTML page from week 2 or week 3 and give it an external stylesheet. Keep the words. Change the appearance only.",
            steps: [
              "Copy the HTML into learning/week-04/practice.html. Add a link to practice.css in the head.",
              "Set a readable text colour, a background colour, and a font stack on body.",
              "Style the h1 with a different family or colour. Add one class to a paragraph that should stand out, and style that class.",
              "Reload, then change one hex value and reload again so you know which file you edited.",
            ],
            expectedOutcome:
              "The old page keeps its headings and regions, and the new stylesheet controls colour, background, and type. A wrong class dot is not left in the HTML.",
          },
        ],
        troubleshooting: [
          {
            problem: "The HTML looks the same as before I wrote any CSS.",
            why: "The stylesheet did not load, or you opened the wrong file. Typical causes are an href that does not match the file name, a link element left in the body, a missing rel, or a reload that never happened.",
            solution:
              "Put the link in the head with rel stylesheet and an href that matches the file in the same folder, including capital letters. Save both files. Open the HTML file and reload. Turn on file extensions so a hidden .txt is visible.",
          },
          {
            problem: "The class rule does nothing, but the body colours work.",
            why: "The selector and the attribute do not name the same class. The usual slip is a dot in the HTML, a missing dot in the CSS, or a different spelling.",
            solution:
              "Write class=\"intro\" in the HTML and .intro in the CSS. Save both, reload, and test by changing only the class font size so you can see that one rule move.",
          },
          {
            problem: "I set a background on the header and the heading text became hard to see.",
            why: "color and background-color were not chosen as a pair. A dark fill with dark text, or a light fill with white text, fails the contrast check.",
            solution:
              "In the same rule as the dark background, set color to a light value such as #ffffff. Reload and read the heading from a step back. If it dissolves, change the pair again.",
          },
          {
            problem: "A later rule seems to ignore the colour I wrote first.",
            why: "Another rule is more specific, or an equally specific rule comes later, or a style attribute on the element is winning.",
            solution:
              "Search the stylesheet for the same property. Keep the declaration on the selector you mean and remove the competing one. Delete any style attribute once the stylesheet holds the decision. Reload.",
          },
        ],
        knowledgeChecks: [
          {
            id: "w4s7-job",
            question: "What is CSS mainly for?",
            format: "Multiple choice",
            options: [
              "Describing how the page should look",
              "Replacing the headings and paragraphs",
              "Sending a form to a server",
              "Naming the regions of the document",
            ],
          },
          {
            id: "w4s7-dot",
            question: "Where does the dot of a class selector belong?",
            format: "Multiple choice",
            options: [
              "In the HTML class value and also in the CSS",
              "Only in the CSS selector, not in the HTML class value",
              "Only in the HTML, so the stylesheet can stay plain",
              "In the title element",
            ],
          },
          {
            id: "w4s7-inherit",
            question: "A font-family set on body is inherited by a paragraph that does not mention a font.",
            format: "True or false",
            options: ["True", "False"],
          },
          {
            id: "w4s7-link",
            question: "Why do we open the HTML file, rather than the CSS file, to check a colour?",
            format: "Short answer",
          },
        ],
        homework: {
          description:
            "Submit a small HTML page and its external stylesheet, plus a short note about one change you reloaded. Use your own sentence in the page. The profile card is the week assignment after the next session.",
          requirements: [
            "Save learning/week-04/notes.html and notes.css, or your practice files, and link the stylesheet from the head.",
            "Set a text colour, a background colour, a font stack, and at least one class rule that changes a size or a colour.",
            "In a few sentences, name one value you changed and what the browser showed after you reloaded.",
          ],
          deliverables: [
            "Both sources pasted into the lesson response, the file path, and the reload note.",
          ],
          submission:
            "Paste the HTML, the CSS, and your note into the homework box on this lesson. Say the folder learning/week-04. Do not submit only a screenshot of the colours.",
          criteria: [
            "The link element points at the stylesheet, and the class selector matches the HTML without a stray dot.",
            "The note shows that a saved CSS change was checked by reloading the HTML page.",
          ],
          submissionKind: "lesson_response",
        },
        summary: [
          "CSS describes appearance. HTML still describes the document. A page should remain understandable if the stylesheet does not load.",
          "A rule is a selector plus declarations. Each declaration is a property, a colon, a value, and a semicolon.",
          "Element selectors match tags. Class selectors match class names. The dot belongs only in the CSS. A more specific rule wins, and a later tie goes to the later rule.",
          "Prefer an external stylesheet linked from the head. Use color, background-color, a font stack, font-size, and line-height with enough contrast to read.",
        ],
        nextLesson: {
          title: "The CSS box model",
          why: "You can set colour and type. Next you will control width, space inside and outside a box, borders, and whether a box sits on its own line.",
          lessonSlug: "css-box-model",
        },
      },
      guide: {
        sessionNumber: 7,
        week: 4,
        title: "Introduction to CSS",
        durationMinutes: 90,
        objectives: [
          "Students can point to a selector, a property, and a value in one rule.",
          "Students link an external stylesheet and prove it by changing one colour and reloading.",
          "Students can repair a class dot placed in the HTML.",
          "Students keep link underlines and choose a readable colour pair.",
        ],
        tools: [
          "Editor with notes.html and notes.css in learning/week-04",
          "A browser beside the editor, address bar showing the HTML file",
          "A second href ready to break, note.css, so the unstyled page is a planned moment",
          "The week 3 contact page available for students who want to style their own words",
        ],
        preparation: [
          "Create the week-04 folder and confirm notes.css loads in the classroom browser before class. Then break the href once and restore it so the failure is familiar.",
          "Prepare a paragraph with class=\".intro\" so you can show the dot in the wrong file without hunting during the session.",
          "Check the projector contrast for #1a1a1a on #f4f1ea and for white on #1f3a5f. Change the hex if the room lighting washes a pair out.",
          "Decide which student page from week 3 you may copy into week-04 if someone has no file to style.",
        ],
        flow: [
          {
            minutes: 5,
            title: "The script and the appearance note",
            detail:
              "Open an unstyled contact page from last week and ask what the browser decided on its own: blue links, large headings, a white page. Say those are default styles. Today they will write the appearance note in a separate file and leave the regions in the HTML.",
          },
          {
            minutes: 15,
            title: "One rule, pulled apart",
            detail:
              "Type the body rule slowly. Ask the room to name the selector, the property, the value, and the semicolon. Miss a semicolon on purpose and show a following declaration fail, then repair it. Add .intro and show the dot. Do not open layout talk yet. Width waits until the next session.",
          },
          {
            minutes: 20,
            title: "Live link, including a failed href",
            detail:
              "Create both files in learning/week-04. Load the page styled. Change href to a missing name, reload, and let the room see the HTML survive. Restore the name. Then put the dot in the HTML class, reload, and restore that too. Change one hex value last so the reload habit is about the CSS file.",
          },
          {
            minutes: 30,
            title: "Students style a page they already have",
            detail:
              "Each student links practice.css to a copied page or to notes.html and sets body colour, background, and a font stack, plus one class. Walk the room and look at the link element before you debate colours. If text sits on a similar background, have them change the pair while you watch. Leave underlines on anchors.",
          },
          {
            minutes: 10,
            title: "Knowledge checks on the open files",
            detail:
              "Ask what CSS is for, where the dot goes, whether body font-family reaches a paragraph, and why the CSS file is the wrong window for judging colour. Take at least one answer from a student file that failed and was repaired, so the check is about their source.",
          },
          {
            minutes: 10,
            title: "Lesson response, then a preview of boxes",
            detail:
              "Show the lesson response: paste both sources and name one reloaded change. Remind them the profile card is the assignment next session, after width and spacing. Point at the small default gap around the page and say the next hour names it as margin.",
          },
        ],
        explain: [
          "HTML holds the document. CSS holds the appearance. The page should still read if the link breaks.",
          "Selectors choose elements. Declarations set properties. The class dot stays in the CSS.",
          "Specificity and source order explain competing colours. Inline style attributes are a last resort you remove.",
          "External stylesheets are linked from the head. Colour pairs need contrast. Font stacks need a generic ending.",
        ],
        questions: [
          "What still works on the page when href points at a missing file?",
          "Why did .intro fail when the body colours succeeded?",
          "Which declaration would you edit to change every paragraph, and which would you edit for one paragraph?",
          "What happens if the header background is dark and you do not set color?",
        ],
        demonstration:
          "Build notes.html and notes.css live. Break the href and the class dot as separate, repaired mistakes. Change one background value and reload so the save loop is visible. Keep both files in learning/week-04.",
        practice:
          "Students style their own copied page or the notes page. Look for a head link, a matching class, a readable pair, and a reload they did themselves. Do not let a finished colour scheme skip the broken-href experiment if they have not seen an unstyled fallback.",
        expectedOutcomes: [
          "Each student has an HTML file whose colours come from a CSS file in the same folder.",
          "Students can repair a bad href and a dot in the class attribute.",
          "Students can name color and background-color as different properties.",
        ],
        difficulties: [
          {
            issue: "A student keeps opening the CSS file in the browser and thinks the design failed.",
            help: "Put the two windows side by side and ask which address ends in .html. Reload that one. Leave the CSS file in the editor only.",
          },
          {
            issue: "A student piles new rules under old ones and cannot tell which colour is active.",
            help: "Pick one property and delete the extra declarations until a single rule remains. Change its value, reload, and only then add a second selector if they still need an exception.",
          },
          {
            issue: "The font they named does not appear.",
            help: "Read the stack aloud and ask which faces this computer has. Keep the generic family. Do not send them to install a font during the session. Show that Georgia falling through to serif is the stack working.",
          },
        ],
        homework:
          "Students paste the HTML and the CSS into the lesson response and describe one reloaded change. A screenshot without source is not enough, because the link and the selectors are the work.",
        assessment:
          "Use the reload test and the four knowledge checks. An unstyled page is incomplete only if they cannot explain a broken link. A styled page with unreadable contrast is not finished either.",
        recap:
          "Leave one rule on the board and have a student name selector, property, and value. Say the next session treats every element as a box with width, padding, border, and margin.",
        knowledgeCheckAnswers: [
          {
            id: "w4s7-job",
            answer: "Describing how the page should look",
            explanation:
              "CSS is presentation. Headings, regions, and form submits stay in HTML. A stylesheet does not store the paragraph text.",
          },
          {
            id: "w4s7-dot",
            answer: "Only in the CSS selector, not in the HTML class value",
            explanation:
              "The dot tells CSS that intro is a class. The HTML attribute is class=\"intro\" with the bare name.",
          },
          {
            id: "w4s7-inherit",
            answer: "True",
            explanation:
              "font-family and color inherit from body into descendants that do not set their own value. background-color is the property that does not behave this way.",
          },
          {
            id: "w4s7-link",
            answer:
              "The HTML file is the page the browser styles. Opening the CSS file shows the rules as text, not the coloured page.",
            explanation:
              "Accept an answer that separates the stylesheet source from the rendered document. They should mention reload on the HTML page.",
          },
        ],
      },
    },
    {
      slug: "css-box-model",
      sessionNumber: 8,
      title: "The CSS box model",
      estimatedMinutes: 90,
      difficulty: "Guided practice",
      requiresOs: true,
      content: {
        overview: {
          about:
            "This lesson teaches the CSS box model. You will set width and height, padding, borders, radius, and margin, choose border-box, and use block, inline, and inline-block on a profile card.",
          why: "Colour and type do not create space. Without the box model, elements sit in the browser's default stack and you cannot say how wide a card is or where the gap comes from.",
          alreadyKnow:
            "You can link an external stylesheet and set colour, background, and font rules that match your HTML.",
        },
        objectives: [
          "Name the four parts of the box: content, padding, border, and margin.",
          "Set width and height and predict the extra size that padding and border add.",
          "Use padding for space inside a box and margin for space outside it.",
          "Apply a visible border, a radius, and border-box sizing.",
          "Choose block, inline, or inline-block for a reason you can say aloud.",
        ],
        prerequisites: [
          {
            label: "You can connect a stylesheet and write selectors, colours, and font rules.",
            lessonSlug: "introduction-to-css",
          },
        ],
        teachingNotes: [
          {
            heading: "Every element is a box",
            markdown: `
In CSS, every element generates a box. The paragraph is a box. The heading is a box. The link is a box, even when it sits in the middle of a sentence. The profile card you build today is a box that contains smaller boxes. This model is how the browser turns elements into rectangles it can size and separate.

From the inside outward, the parts are the content, the padding, the border, and the margin. The content is the text or the image. The padding is space inside the border, around the content. The border is the line, which may be invisible. The margin is space outside the border, between this box and its neighbours. Padding is the cushion inside the frame. Margin is the gap between frames. They are not two words for the same space.

People mix them up because both create empty areas. The test is the background and the border. Padding is inside the border, so the element's background paints the padding. Margin is outside the border, so the parent's background shows in the margin, not the element's own fill. If you give a card a white background and a dark border, extra white inside the line is padding. Extra warm page colour outside the line is margin.

The browser already gives some elements a margin. The body usually has a margin of about 8 pixels, which is the slim gap you saw around last session's page. Headings and paragraphs also have default margins, which is why two paragraphs are not glued together even before you write a spacing rule. Your rules replace those defaults when you set the property yourself. \`body { margin: 0; }\` removes the page gap so a bar can reach the edge. Do that on purpose, not by accident.

You already chose semantic elements. Those names stay. The box model does not turn a \`header\` into a \`div\`. It only describes the rectangle the header occupies. Class selectors such as \`.card\` are how you style one article as a card without styling every article on the internet the same way.

:::misunderstanding Margin is padding with a different name
Padding sits inside the border and inherits the element's background. Margin sits outside the border and separates this box from others. If the border moves when you add space, you added padding. If the border stays the same size and the gap outside grows, you added margin.
:::

:::example A framed photograph
The photo is the content. The mount board around the photo, inside the frame, is the padding. The frame is the border. The space on the wall between two frames is the margin.
:::
`,
          },
          {
            heading: "Width, height, and the content box",
            markdown: `
\`width\` and \`height\` set the size of the content box, unless you change the box sizing. The default sizing is called \`content-box\`. Under that default, \`width: 300px\` means the content is 300 pixels wide. Padding and border are added outside that number. Margin is added further outside and is never part of \`width\`.

Here is a concrete sum. Suppose a card has \`width: 300px\`, \`padding: 20px\` on the left and right, and a border of 2 pixels on the left and right. Under content-box, the border-to-border size is 300 plus 40 plus 4, which is 344 pixels. The margin, if it is 16 pixels on each side, adds more space beyond that, but it is not inside the 344. People expect the card to be 300 pixels wide because that is the number they typed. The default model disagrees.

\`height\` works the same way. A height of 100 pixels plus padding and border becomes taller than 100 under content-box. You often do not need a fixed height on a card. If the text is the content, leave the height alone and let the content, the padding, and the border determine it. A fixed height that is too small spills the text or clips it, depending on other properties you have not learned. Prefer width plus padding for this assignment, and add height only when you have a reason.

Pixels are still the unit. \`width: 320px\` is a clear card width for a practice page on a laptop. It will not rearrange itself for a phone. That problem has a later lesson. Today the goal is to predict one box.

\`max-width\` can wait. Do not set a width on the body unless you mean to. Set the width on the card. A paragraph inside the card does not need its own width if it should use the card's content area.

:::warning The number in width is not always the size you see
Under the default content-box, padding and border are extra. If the card is wider than you planned, add the left and right padding and the left and right border to the width before you blame the browser.
:::
`,
          },
          {
            heading: "Padding and margin",
            markdown: `
\`padding\` is the inner space. One value sets all four sides. \`padding: 20px\` gives 20 pixels on the top, right, bottom, and left. Two values set the vertical space and then the horizontal space. \`padding: 16px 24px\` means 16 pixels on the top and bottom, and 24 pixels on the left and right. You can also set one side with \`padding-left\`, \`padding-right\`, \`padding-top\`, or \`padding-bottom\`.

\`margin\` uses the same one-value and two-value pattern. \`margin: 32px\` puts 32 pixels of outer gap on every side. \`margin: 32px auto\` sets the top and bottom to 32 pixels and the left and right to \`auto\`. For a block with a set width, \`auto\` on the left and right takes the leftover horizontal space and splits it, which centers the box in its parent. It does not center the words inside the box. \`text-align: center\` centers inline text. \`margin-left: auto\` and \`margin-right: auto\` center the box. Using the wrong one is a normal early mistake. The card can be centered while its paragraph stays left-aligned, and that is often what you want.

\`\`\`css
.card {
  width: 320px;
  margin: 32px auto;
  padding: 20px;
}
\`\`\`

Vertical margins between block boxes can collapse. If two paragraphs each ask for 16 pixels of margin where they meet, the gap may be 16 pixels rather than 32. The larger of the two touching vertical margins wins, instead of the two adding. If a gap looks smaller than your arithmetic, collapsing margins are a possible reason. Horizontal margins do not collapse in that way. You do not need to fight the behaviour today. You need to know the page is not ignoring you.

A common layout for this lesson is a page background on \`body\`, a card with a white background, padding inside the card, and margin outside it. The white padding makes the text sit away from the border. The margin lets the page colour show around the card. If you only add margin, the text can touch the border. If you only add padding, neighbouring cards can touch each other.

Zero a margin you do not want. \`.role { margin: 0 0 12px; }\` is a three-value form: top, horizontal, bottom. It removes the default top margin of a paragraph used as a label and keeps a small bottom gap. You will see that on the profile card. Read it as top 0, left and right 0, bottom 12 pixels.

:::example Inside the frame, outside the frame
Add padding and the words move away from the border while the border grows outward under content-box. Add margin and the whole framed card moves away from the edge of the page or from the next card.
:::
`,
          },
          {
            heading: "Borders and radius",
            markdown: `
A border needs a width, a style, and a colour to be visible. The style you want this week is \`solid\`. The shorthand is \`border: 2px solid #1f3a5f;\`. Width, then style, then colour. If the style is missing, the border's style is \`none\` and you will not see a line, even if you set a width elsewhere and then overwrite it. Write the shorthand with the word \`solid\` every time until the habit is dull.

You can set one side, such as \`border-bottom: 2px solid #1f3a5f\`, when you want a rule under a heading rather than a box around a card. A card usually wants the full border. A heading usually does not.

\`border-radius\` rounds the corners. \`border-radius: 12px\` takes a little off each corner of the card. Larger numbers make a stronger curve. You do not need a circle. A modest radius is enough to show that you can see the difference between a sharp rectangle and a softened one. Radius rounds the border and the background together. It does not round the margin, because the margin is empty space outside.

\`\`\`css
.card {
  border: 2px solid #1f3a5f;
  border-radius: 12px;
  background-color: #ffffff;
}
\`\`\`

The background should meet the border cleanly. If the text crowds the line, add padding. Do not use the border width as a substitute for padding. A 20-pixel border would look like a heavy frame and would still leave the letters against the inner edge of that frame.

The body's default margin and the card's border are different edges. When you set \`body { margin: 0; }\`, the page colour can run to the window edge, and the card's own margin creates the gap you actually chose. That is easier to reason about than a mixture of the browser's 8 pixels and your 32 pixels.

:::misunderstanding A border property always draws a line
The line appears when the style is solid or another visible style. A width and a colour without a style can still leave you with no line. Put solid in the shorthand.
:::
`,
          },
          {
            heading: "border-box",
            markdown: `
\`box-sizing\` chooses which parts \`width\` and \`height\` include. \`content-box\` is the default: width is the content only. \`border-box\` includes the content, the padding, and the border inside the width you set. Margin stays outside in both models. It is never part of width.

Return to the numbers. A card with \`width: 320px\`, \`padding: 20px\`, and a 2-pixel border is 320 pixels from border edge to border edge when \`box-sizing: border-box\` is in force. The content area is what remains after the padding and the border are subtracted. You asked for a 320-pixel card and you got one. That is the model to use on the profile card.

Set it on the elements you size. A practical pattern for a small page is to set it on every element so you do not have to remember which box is which.

\`\`\`css
* {
  box-sizing: border-box;
}
\`\`\`

The star is the universal selector. It matches every element. Here it does one job: make width mean the border-to-border size. It does not reset colours or fonts. Keep it at the top of the stylesheet so you see it first.

You can still reason about content-box, because other pages and examples use the default. If a box is mysteriously wide, ask which sizing is active before you change the width number. Adding padding under content-box grows the outer size. Adding padding under border-box shrinks the content area and keeps the outer width. Both are consistent. They are not the same.

Do not include margin in that mental sum. A centered card with \`width: 320px\` and \`margin: 32px auto\` occupies 320 pixels plus the side margins. The auto margins are the gaps, not part of the 320.

:::tip Say the sentence aloud
With border-box, this width includes the padding and the border. The margin is still extra. If you can say that while pointing at the card, you have the model you need for the assignment.
:::
`,
          },
          {
            heading: "Block, inline, and inline-block",
            markdown: `
\`display\` sets the kind of box. The three values for this lesson are \`block\`, \`inline\`, and \`inline-block\`.

A block box starts on a new line and, unless you set a width, stretches across the containing area. Paragraphs, headings, sections, headers, and articles are blocks by default. Your card should stay a block so \`width\` and \`margin: auto\` can size it and center it. \`text-align\` is not what centers that card.

An inline box stays in the line of text. It does not start a new line. Anchors, \`strong\`, \`em\`, and \`span\` are inline by default. \`span\` is a generic inline element, the way \`div\` is a generic block. It has no meaning of its own. Width and height do not apply to a non-replaced inline box. Vertical margin does not apply either. Horizontal margin and padding do. That is why a width on a plain link seems to do nothing. The element is inline. The declaration is ignored for that purpose, not mistyped.

\`inline-block\` keeps the box in the line if there is room, and it honours width, height, padding, and margin. Use it for a small label that should size to its words and still take padding, such as a role sitting under the person's name. The label can have a dark background and light text without forcing a full new row the way a block would, though it will wrap to the next line if you also make it wide.

\`\`\`css
.role {
  display: inline-block;
  margin: 0 0 12px;
  padding: 4px 8px;
  background-color: #1f3a5f;
  color: #ffffff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
}
\`\`\`

Choose display from the behaviour you need. If the region should be a stack of full lines, leave it as a block. If it should stay inside a sentence, leave it inline and do not expect a width to work. If it should sit in the flow and still accept padding and a height, use inline-block. Say the reason in your assignment note. "I used inline-block on the role so the padding wraps the words and the card stays a block" is a complete reason.

A later lesson introduces Flexbox for laying out a whole row or column of boxes. You do not need it to finish one card. Resist copying layout recipes you cannot yet explain. Width, margin, padding, border, radius, border-box, and one display value are the tools for this session.

:::misunderstanding display: block centers text, and text-align centers the card
Block is about the box starting on a new line and accepting width. Centering the card is margin left and right set to auto, after a width is set. Centering the words is text-align. They solve different problems.
:::
`,
          },
        ],
        vocabulary: [
          {
            term: "Box model",
            definition:
              "The rectangle around an element: content, then padding, then border, then margin outside the border.",
          },
          {
            term: "Padding",
            definition:
              "Space inside the border, around the content. The element's background paints the padding.",
          },
          {
            term: "Margin",
            definition:
              "Space outside the border that separates this box from others. It is not included in width.",
          },
          {
            term: "Border",
            definition:
              "The line around the padding. A visible shorthand sets width, a style such as solid, and a colour.",
          },
          {
            term: "Border radius",
            definition:
              "A curve on the corners of the border and background. It does not curve the margin outside the box.",
          },
          {
            term: "border-box",
            definition:
              "A box-sizing value where width and height include the content, the padding, and the border, and still exclude margin.",
          },
          {
            term: "Block",
            definition:
              "A display value that starts on a new line and can use width, height, and vertical margin. Paragraphs and headings are blocks.",
          },
          {
            term: "Inline-block",
            definition:
              "A display value that stays in the line and still honours width, height, padding, and margin. Useful for a small padded label.",
          },
        ],
        demonstrations: [
          {
            title: "Build a profile card and compare two sizings",
            intro:
              "You will create learning/week-04/profile.html and profile.css, size a card with border-box, and then briefly switch to content-box so you can see the width change. Opening the HTML file depends on your system.",
            steps: [
              "Create learning/week-04/profile.html as a complete document. In the head, link profile.css from the same folder.",
              "In main, add an article with class card. Inside it, put an h1 with a person's name, a paragraph with class role, a sentence paragraph, and a short list.",
              "In the CSS, set box-sizing to border-box on every element with the star selector. Set the body margin to 0, a font stack, a page background, and a text colour.",
              "Give .card a width of 320 pixels, margin 32 pixels auto, padding 20 pixels, a 2-pixel solid border, a 12-pixel radius, and a white background.",
              "Give .role display inline-block, a small padding, a dark background, and a light text colour. Remove its top margin.",
              "Save both files and open profile.html in a browser. Confirm the card is centered, the text does not touch the border, and the role label fits its words.",
              "Change the card's box-sizing to content-box, reload, and notice the card grow. Switch it back to border-box and reload.",
              "Set a width on the role while it is inline, if you try a variant, and notice the width do nothing until display is inline-block. Finish with the role as inline-block and the card as a block.",
            ],
            expected:
              "The card is a bordered, rounded rectangle with inner space, separated from the page edge. The role is a small padded label. Switching to content-box makes the same width number occupy more horizontal space.",
            verify:
              "Reload after the box-sizing change and compare the card to the browser window. Then set the role display to block and back to inline-block so you can see the label take a full line and then shrink to its words.",
            ifItFails:
              "If the card is not centered, set a width and use margin with auto on the left and right. If there is no line, add solid to the border. If the text touches the line, add padding. If nothing is styled, fix the stylesheet link before you adjust numbers.",
            os: {
              sameOnAllPlatforms:
                "Keep profile.html and profile.css in learning/week-04. Open the HTML file, not the CSS file. Reload after each save. border-box belongs in the stylesheet, not in the HTML class value.",
              windows: [
                "In File Explorer, show extensions and confirm both files are in week-04. profile.css.txt will not match href profile.css.",
                "Right-click profile.html, choose Open with, and pick Edge, Chrome, or Firefox. Reload with Ctrl+R or F5 when you switch between content-box and border-box.",
                "If you cannot see the radius, zoom the browser back to 100 percent and reload before you increase the pixel value.",
              ],
              macos: [
                "In Finder, open learning/week-04. Control-click profile.html, choose Open With, and pick a browser. Reload with Command+R.",
                "If TextEdit saved rich text, the tags will show. Start the HTML again as plain text and keep the CSS as plain text too.",
                "After a reload, scroll so the whole card is visible before you judge the auto margin. A cropped window hides the centering.",
              ],
              linux: [
                "In Files, match lowercase names exactly: profile.html and profile.css. Right-click the HTML file, choose Open With, and pick Firefox or another browser.",
                "Reload with Ctrl+R or F5. If the stylesheet loads on another machine and not on yours, compare capital letters in href first.",
                "Keep the editor and the browser on the same folder path. A second copy in Downloads will ignore the edits you make in week-04.",
              ],
              identify: [
                "File Explorer and Ctrl+R or F5 means the Windows steps. Finder and Command+R means the macOS steps. Files and Ctrl+R or F5 often means Linux.",
                "Use the Apple menu or the Windows logo if you are unsure which reload shortcut to trust.",
                "No extra install is required to set a border. Use the browser and editor you used for the colour lesson.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "A profile card document",
            filename: "learning/week-04/profile.html",
            language: "html",
            code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Jordan Lee</title>
  <link rel="stylesheet" href="profile.css">
</head>
<body>
  <main>
    <article class="card">
      <h1>Jordan Lee</h1>
      <p class="role">Workshop student</p>
      <p>I am learning to describe a page with HTML and then give it a calm appearance with CSS.</p>
      <ul>
        <li>HTML documents</li>
        <li>Forms</li>
        <li>Stylesheets</li>
      </ul>
    </article>
  </main>
</body>
</html>
`,
            explanation:
              "The card is an article because the profile can be read alone. The class card is for appearance. The role paragraph is a separate class so it can be inline-block without changing the sentence under it. Replace the name, the role, and the sentence with your own for the assignment.",
            lineNotes: [
              {
                focus: "link",
                note: "profile.css must sit in the same folder. The design will not appear if this href is wrong.",
              },
              {
                focus: "article",
                note: "The HTML meaning stays article. CSS class card does not rename the element.",
              },
              {
                focus: "role",
                note: "A second class lets the label take padding and inline-block without restyling the biography paragraph.",
              },
            ],
            expectedOutput:
              "With profile.css applied, a centered card shows the name, a small contrasting role label, a sentence, and a list. The corners are slightly rounded and the text does not touch the border.",
            level: "practical",
          },
          {
            title: "The profile card stylesheet",
            filename: "learning/week-04/profile.css",
            language: "css",
            code: `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 18px;
  line-height: 1.5;
  color: #1a1a1a;
  background-color: #f4f1ea;
}

.card {
  width: 320px;
  margin: 32px auto;
  padding: 20px;
  border: 2px solid #1f3a5f;
  border-radius: 12px;
  background-color: #ffffff;
}

.role {
  display: inline-block;
  margin: 0 0 12px;
  padding: 4px 8px;
  background-color: #1f3a5f;
  color: #ffffff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
}

h1 {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 28px;
}
`,
            explanation:
              "The star sets border-box so the card's 320 pixels include its padding and border. Body margin 0 clears the browser's default gap, and the card's auto side margins center the block. The role is inline-block so its padding wraps the words. White text on the dark role background keeps that small label readable.",
            lineNotes: [
              {
                focus: "border-box",
                note: "Width includes content, padding, and border. Margin is still outside the 320 pixels.",
              },
              {
                focus: "margin auto",
                note: "32px auto sets vertical margin and centers a block that has a width. It does not center the text.",
              },
              {
                focus: "border",
                note: "solid is required in this shorthand or the line will not show.",
              },
              {
                focus: "inline-block",
                note: "The role accepts padding and still shrinks to its words. The card itself stays a block.",
              },
            ],
            expectedOutput:
              "A 320-pixel card sits away from the top of a warm page, with a white interior, a navy line, rounded corners, and a navy role label in white type. Changing box-sizing to content-box makes this same card wider.",
            level: "practical",
          },
        ],
        exercises: [
          {
            title: "Separate the inner space from the outer gap",
            difficulty: "warm-up",
            prompt:
              "On a copy of the card, change only padding, then only margin, and watch the border. Do not change the width during this exercise.",
            steps: [
              "Set the card padding to 4 pixels and reload. Notice how close the words are to the line.",
              "Set the padding to 32 pixels and reload. Notice the white area inside the line grow.",
              "Put the padding back to 20 pixels. Change the top margin from 32 pixels to 80 pixels and reload.",
              "Write one sentence about which change moved the border outward from the text and which change moved the whole card down.",
            ],
            expectedOutcome:
              "You can point to padding as the space inside the border and margin as the space outside it, using your own reloaded page as the evidence.",
          },
          {
            title: "A card with one display choice",
            difficulty: "practice",
            prompt:
              "Build a profile card about yourself or a fictional classmate you invent for class. Use a name you are willing to show. Do not use private contact details.",
            steps: [
              "Create learning/week-04/my-card.html and my-card.css and link them.",
              "Include a heading, a short role or interest, and one sentence or list in your own words.",
              "Use border-box, a width, padding, margin, a solid border, and a radius on the card.",
              "Use inline-block on the role, or set another element to block or inline for a reason you can say. Reload and read the card from a step back to check contrast.",
            ],
            expectedOutcome:
              "A local page shows one readable card whose spacing matches the box model, with a display value you can justify.",
          },
        ],
        troubleshooting: [
          {
            problem: "The card is wider than the width I typed.",
            why: "box-sizing is still content-box, so the left and right padding and the left and right border are being added to the width.",
            solution:
              "Set box-sizing to border-box on the card, or on every element with the star selector. Reload. The border-to-border width should match the width value. Leave margin out of that sum.",
          },
          {
            problem: "I added space and the text still touches the border, or the cards still collide.",
            why: "Margin and padding were swapped. Margin never pads the inside of the line. Padding never separates two borders from each other.",
            solution:
              "Put padding on the card until the words sit inside the border. Put margin on the card until the page colour shows around it. Reload after each property so you can see which one moved.",
          },
          {
            problem: "I set a width on the role and nothing changed, or margin auto did not center the words.",
            why: "Width does not apply to a plain inline box. Auto margins center a block that has a width. They do not center inline text. text-align centers text.",
            solution:
              "Set the role to inline-block if it needs a width or padding as a label. To center the card, keep the card as a block, set its width, and use margin with auto for the horizontal sides. Use text-align only if you mean the words.",
          },
          {
            problem: "The border does not appear, or the corners stay sharp when I expected a curve.",
            why: "The border shorthand is missing solid, so the style is none. Or border-radius was set on a different selector than the element that has the background and border.",
            solution:
              "Write border as a width, the word solid, and a colour on .card. Put border-radius on that same selector. Save the CSS and reload the HTML. Confirm you are not editing a second stylesheet that the page does not link.",
          },
        ],
        knowledgeChecks: [
          {
            id: "w4s8-padding",
            question: "Where is padding?",
            format: "Multiple choice",
            options: [
              "Outside the border, between this box and the next",
              "Inside the border, around the content",
              "Inside the font file",
              "Only on inline text, as a kind of bold",
            ],
          },
          {
            id: "w4s8-box",
            question: "With border-box, the width includes the padding and the border, and it also includes the margin.",
            format: "True or false",
            options: ["True", "False"],
          },
          {
            id: "w4s8-inline",
            question: "Why can a width on a normal link appear to do nothing?",
            format: "Multiple choice",
            options: [
              "Anchors cannot be styled",
              "A non-replaced inline box does not use width",
              "Width always includes the margin",
              "The semicolon is optional on the last width",
            ],
          },
          {
            id: "w4s8-center",
            question: "How do you center a block card horizontally without centering all of its text?",
            format: "Short answer",
          },
        ],
        homework: {
          description:
            "The graded work is the week assignment: a styled profile card in your own words, with an external stylesheet and a box you can explain. Submit it through the assignment. This lesson box is not the submission.",
          requirements: [
            "Build the assignment as learning/week-04/profile.html and profile.css, or the filenames the assignment names.",
            "Use colour, type, width, padding, margin, a border, a radius, and border-box.",
            "Check the page in a browser after a reload, including one deliberate display value.",
          ],
          deliverables: [
            "The week assignment submission, with both file paths and a sentence about how you checked the spacing.",
          ],
          submission:
            "Open the week assignment from this lesson and submit there. Follow its requirements and rubric. Paste both sources if the assignment asks for them, not only a picture of the card.",
          criteria: [
            "The assignment rubric is the mark scheme.",
            "The HTML links to the CSS, and the card shows the spacing properties from this session.",
          ],
          submissionKind: "module_assignment",
        },
        summary: [
          "Every element is a box: content, padding, border, and margin. Padding is inside the border. Margin is outside it.",
          "Under content-box, width is only the content. Padding and border add to the size you see. Under border-box, width includes padding and border. Margin is outside either way.",
          "A visible border needs a style such as solid. border-radius rounds the corners. Auto side margins center a block that has a width.",
          "Block starts on a new line and accepts width. Inline stays in the line and ignores width. Inline-block stays in the line and accepts width and padding.",
        ],
        nextLesson: {
          title: "Flexbox",
          why: "You can size and space one box. Next you will line up a whole group of boxes in a row or a column that can wrap.",
          lessonSlug: "flexbox",
        },
      },
      guide: {
        sessionNumber: 8,
        week: 4,
        title: "The CSS box model",
        durationMinutes: 90,
        objectives: [
          "Students can point to content, padding, border, and margin on one card.",
          "Students can show the width change between content-box and border-box.",
          "Students center a block with auto margins and keep paragraph text left-aligned.",
          "Students leave with a profile card ready to submit as the assignment.",
        ],
        tools: [
          "Editor and browser with learning/week-04 open",
          "A profile card stylesheet that you can toggle between content-box and border-box",
          "A ruler on the slide or a spoken pixel sum: 320, plus padding, plus border",
          "The assignment brief for the last ten minutes",
        ],
        preparation: [
          "Build profile.html and profile.css before class, then delete the padding so you can add it live and show the text leave the border.",
          "Practise the content-box switch so you know how wide the card grows with 20 pixels of padding and a 2-pixel border.",
          "Confirm margin 32px auto actually centers in the classroom browser at 100 percent zoom.",
          "Prepare a failing border with the word solid removed, so you can show an invisible border without pretending the file failed to save.",
        ],
        flow: [
          {
            minutes: 5,
            title: "Name the gap from last session",
            detail:
              "Open the notes page and point at the slim gap around the edge and the gap between paragraphs. Say those are default margins. Draw four nested rectangles and label content, padding, border, and margin. Tell the room the card will stay one column. Rows of cards come later.",
          },
          {
            minutes: 15,
            title: "Padding, then margin, on one border",
            detail:
              "Add a solid border first so there is a line to judge. Add padding and show the words move inside the line. Add margin and show the whole card move. Say the background test: white inside the line is padding, page colour outside the line is margin. Do the 300-plus-padding sum on the board before you introduce border-box.",
          },
          {
            minutes: 20,
            title: "border-box, radius, and inline-block",
            detail:
              "Set the star selector to border-box and reload so the card snaps to the stated width. Round the corners. Build the role as inline-block with a dark fill and white text. Flip it to block so it takes a full line, then put it back. Try to center the card with text-align, watch it fail to move the box, and switch to margin auto.",
          },
          {
            minutes: 30,
            title: "Students build their own card",
            detail:
              "Each student creates a card in week-04 with their own name or an invented public name, a role, and a sentence. Require border-box, width, padding, margin, a solid border, a radius, and one display they can explain. Circulate and ask: is this space inside or outside the line? If the border is missing, look for solid before you look for a broken link.",
          },
          {
            minutes: 10,
            title: "Checks on width and display",
            detail:
              "Ask where padding sits, whether border-box includes margin, why a link ignores width, and how to center the card without centering the biography. Have a student toggle content-box one last time on the projector while the room predicts the direction of the change.",
          },
          {
            minutes: 10,
            title: "Assignment submission",
            detail:
              "Open the week assignment and read the file names, the box properties, and the need for both sources. A picture of a card does not show box-sizing. Remind them the lesson response from the colour session is separate. Preview Flexbox as the way to line up several boxes, which they should not bolt on tonight.",
          },
        ],
        explain: [
          "Padding is inside the border. Margin is outside. The background test tells them apart.",
          "content-box adds padding and border to width. border-box includes them in width. Margin is extra in both.",
          "A visible border needs solid. Radius rounds that box. Auto margins center a sized block.",
          "Block, inline, and inline-block differ in line breaks and in whether width applies.",
        ],
        questions: [
          "If the words are touching the line, which property is too small?",
          "Why did the card get wider when box-sizing went back to content-box?",
          "What is the difference between centering the card and centering the sentence?",
          "Why does the role use inline-block instead of leaving it as an ordinary paragraph?",
        ],
        demonstration:
          "Build the card live from a border with no padding, then add padding, margin, border-box, radius, and an inline-block role. Toggle content-box once so the width sum is visible. Keep the files in learning/week-04.",
        practice:
          "Students make their own card and reload after each spacing change. Ask every student which space is padding. A copied Jordan Lee biography is not finished until the sentences are theirs.",
        expectedOutcomes: [
          "Each student has a local card with a linked stylesheet, a border, inner padding, and outer margin.",
          "Students can predict what border-box does to the stated width.",
          "Students can name the display value on the role or another element they chose.",
        ],
        difficulties: [
          {
            issue: "A student sets a height and the sentence is cut off or spills in a way they cannot explain.",
            help: "Remove the height and let the content and padding size the card. Tell them a fixed height is optional and is the wrong tool when the text is the content.",
          },
          {
            issue: "Auto margins do nothing.",
            help: "Check that the card has a width and is a block. An inline-block card will not center with margin auto the way they expect. Put inline-block on the role, not on the card. Then reload.",
          },
          {
            issue: "A student adds Flexbox snippets they cannot read.",
            help: "Delete the unfamiliar rules and restore width, margin, padding, and display. Say the next lesson teaches that system. Tonight the card should be explainable with the box model only.",
          },
        ],
        homework:
          "The submission is the module assignment: a styled profile card with HTML and CSS saved in learning/week-04. Both sources matter. Last session's colour page can stay as practice.",
        assessment:
          "Knowledge checks plus a glance at padding versus margin on their border. The grade is the assignment rubric. Do not award points for effects they cannot connect to a property.",
        recap:
          "Point at one card and name the four box parts in order from the inside. Ask which display the role uses. Name Flexbox as the next session, for groups of boxes rather than a new way to colour one card.",
        knowledgeCheckAnswers: [
          {
            id: "w4s8-padding",
            answer: "Inside the border, around the content",
            explanation:
              "Padding is inner space and is painted by the element's background. Margin is the outer separation.",
          },
          {
            id: "w4s8-box",
            answer: "False",
            explanation:
              "border-box includes content, padding, and border in the width. Margin stays outside the width in both sizing models.",
          },
          {
            id: "w4s8-inline",
            answer: "A non-replaced inline box does not use width",
            explanation:
              "Anchors are inline by default. Width applies when the display is block or inline-block. The declaration can be valid and still have no effect on an inline box.",
          },
          {
            id: "w4s8-center",
            answer:
              "Give the card a width, keep it as a block, and set the left and right margins to auto. Leave text-align alone if the sentences should stay left-aligned.",
            explanation:
              "Accept width plus horizontal auto margins. A strong answer also says text-align is for the words, not for moving the box.",
          },
        ],
      },
    },
  ],
  assignment: {
    slug: "week-04-assignment",
    title: "Styled profile card",
    summary:
      "Build a one-card profile page with your own words, an external stylesheet, and spacing you can explain with the box model.",
    instructions: `
Create two files in the same folder: learning/week-04/profile.html and learning/week-04/profile.css. The HTML file must be a complete document with a language, a charset, a title, and a link element in the head that loads profile.css. Open the HTML file in a browser to check the work. Opening the CSS file only shows the rules.

The page is a profile card about you, or about a fictional person you invent for class. Use a name you are willing to show. Do not publish a home address, a private phone number, or a real password. Include a heading with the name, a short role or interest, and at least one sentence or list in your own words. An article with a class is a good container. The class name in the HTML must not include the CSS dot.

In the stylesheet, set a readable text colour, a page background colour, and a font stack that ends with a generic family such as serif or sans-serif. On the card, set a width in pixels, padding, margin, a solid border, and a border radius. Use box-sizing: border-box so the width includes the padding and the border. Give at least one element a display value you understand, such as inline-block on the role label. You may center the card with horizontal auto margins. Do not remove link underlines if you add a link, unless another visible cue remains.

Reload after you save. In your submission, include both sources or the paths to both files, and two or three sentences that say how you checked the spacing: what is padding, what is margin, and which display value you used. We are marking the stylesheet connection and the box, not a copied gallery of effects.
`,
    objectives: [
      "Connect a complete HTML profile to an external stylesheet.",
      "Choose readable colours, a background, and a font stack.",
      "Size one card with the box model, border-box, and a deliberate display value.",
    ],
    requirements: [
      "profile.html is a complete document and links to profile.css in the same folder.",
      "The card shows an original name, a short role or interest, and a sentence or list.",
      "The stylesheet sets color, background-color, and a font-family stack.",
      "The card sets width, padding, margin, a solid border, and border-radius.",
      "box-sizing is border-box for the card or for the page, and one element uses block, inline, or inline-block for a reason you state.",
      "The page was reloaded in a browser, the text is readable against its background, and private contact details are absent.",
    ],
    deliverables: [
      "learning/week-04/profile.html and learning/week-04/profile.css.",
      "A short note that identifies the padding, the margin, and the display value you used.",
    ],
    rubric: [
      {
        criterion: "Linked files",
        points: 15,
        description:
          "The HTML is a complete document and the head link loads the stylesheet that was submitted.",
      },
      {
        criterion: "Writing",
        points: 15,
        description:
          "The card has an original name, a role or interest, and a sentence or list the student wrote.",
      },
      {
        criterion: "Colour and type",
        points: 20,
        description:
          "Text colour, background, and a font stack are set, and the text can be read against the surfaces behind it.",
      },
      {
        criterion: "Box model",
        points: 25,
        description:
          "Width, padding, margin, a visible border, and a radius are present and match the note about inside versus outside space.",
      },
      {
        criterion: "border-box and display",
        points: 15,
        description:
          "border-box is used so the stated width includes padding and border, and a display value is chosen for a reason.",
      },
      {
        criterion: "Care",
        points: 10,
        description:
          "Both paths are named, the page was checked in a browser, and private data is absent.",
      },
    ],
    points: 100,
    instructorSolution: `HTML file, learning/week-04/profile.html:

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Amaka Okafor</title>
  <link rel="stylesheet" href="profile.css">
</head>
<body>
  <main>
    <article class="card">
      <h1>Amaka Okafor</h1>
      <p class="role">Evening class</p>
      <p>I take notes by hand, then rebuild one small page before I add anything new.</p>
      <ul>
        <li>Complete HTML documents</li>
        <li>Labelled forms</li>
        <li>A single stylesheet</li>
      </ul>
    </article>
  </main>
</body>
</html>

CSS file, learning/week-04/profile.css:

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 18px;
  line-height: 1.5;
  color: #1a1a1a;
  background-color: #f4f1ea;
}

.card {
  width: 320px;
  margin: 32px auto;
  padding: 20px;
  border: 2px solid #1f3a5f;
  border-radius: 12px;
  background-color: #ffffff;
}

.role {
  display: inline-block;
  margin: 0 0 12px;
  padding: 4px 8px;
  background-color: #1f3a5f;
  color: #ffffff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
}

h1 {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 28px;
}

The card's 320px width includes the 20px padding and the 2px border because of border-box. The side margins are auto, so the block is centered, while the biography stays left-aligned. The role is inline-block so its padding wraps the words. Do not award the box points if the border style is missing, if the link href does not match the CSS file, or if the student cannot say whether a gap is padding or margin. Plain, readable contrast should pass. Unreadable pale-on-pale text should not.
`,
  },
  quiz: {
    slug: "week-04-quiz",
    title: "Week 4 quiz: CSS rules and the box model",
    passingScore: 70,
    allowRetakes: true,
    questions: [
      {
        slug: "w4-q1-job",
        type: "multiple_choice",
        prompt: "What stays true when a stylesheet fails to load?",
        options: [
          { id: "a", text: "The HTML document can still show its headings and text" },
          { id: "b", text: "The browser deletes the body" },
          { id: "c", text: "The class attribute becomes a heading" },
          { id: "d", text: "The form submits itself" },
        ],
        correct: { optionId: "a" },
        explanation:
          "CSS is the appearance layer. A missing stylesheet should leave the HTML readable. That is one reason the words stay in the document.",
        points: 1,
      },
      {
        slug: "w4-q2-dot",
        type: "multiple_choice",
        prompt: "Which pair will make a class rule apply?",
        options: [
          { id: "a", text: "HTML class=\".card\" and CSS selector card" },
          { id: "b", text: "HTML class=\"card\" and CSS selector .card" },
          { id: "c", text: "HTML id=\"card\" and CSS selector .card" },
          { id: "d", text: "HTML class=\"card\" and a style element with no selector" },
        ],
        correct: { optionId: "b" },
        explanation:
          "The HTML class value is the bare name. The CSS class selector adds the dot. An id does not match a class selector, and a dot in the attribute breaks the name.",
        points: 1,
      },
      {
        slug: "w4-q3-link",
        type: "true_false",
        prompt: "An external stylesheet is connected by a link element in the head, and the page you open in the browser is the HTML file.",
        correct: { value: true },
        explanation:
          "rel stylesheet and href point at the CSS file. The browser applies those rules when it loads the HTML page. Opening the CSS file shows the source, not the design.",
        points: 1,
      },
      {
        slug: "w4-q4-color",
        type: "multiple_choice",
        prompt: "You painted a header dark blue and the heading became hard to read. Which change belongs in the same rule?",
        options: [
          { id: "a", text: "Set color to a light value such as white" },
          { id: "b", text: "Remove the h1 and keep the colour" },
          { id: "c", text: "Set margin to auto and leave the text black" },
          { id: "d", text: "Change the doctype" },
        ],
        correct: { optionId: "a" },
        explanation:
          "color and background-color work as a pair. Light text on a dark header keeps the heading visible. Margin and the doctype do not fix a dark-on-dark pair.",
        points: 1,
      },
      {
        slug: "w4-q5-read",
        type: "code_reading",
        prompt: "The card has box-sizing: border-box, width 320px, padding 20px on every side, and a 2px solid border. How wide is the card from the left border edge to the right border edge?",
        codeSnippet: `.card {
  box-sizing: border-box;
  width: 320px;
  padding: 20px;
  border: 2px solid #1f3a5f;
}`,
        options: [
          { id: "a", text: "320 pixels, because border-box includes the padding and the border" },
          { id: "b", text: "364 pixels, because padding and border are always added to width" },
          { id: "c", text: "20 pixels" },
          { id: "d", text: "The margin decides, and there is no width" },
        ],
        correct: { optionId: "a" },
        explanation:
          "Under border-box, the stated width includes the content, the padding, and the border. The outer border edges are 320 pixels apart. Margin would add space beyond that, and this rule sets no margin.",
        points: 2,
      },
      {
        slug: "w4-q6-padding",
        type: "multiple_choice",
        prompt: "The words in a card are touching the border. The gap around the outside of the card is already large enough. Which property should increase?",
        options: [
          { id: "a", text: "padding" },
          { id: "b", text: "margin" },
          { id: "c", text: "font-family" },
          { id: "d", text: "the HTML doctype" },
        ],
        correct: { optionId: "a" },
        explanation:
          "Padding is the space inside the border, around the content. Margin would only increase the outer gap, which is already large enough in this question.",
        points: 1,
      },
      {
        slug: "w4-q7-margin-width",
        type: "true_false",
        prompt: "Margin is included in the width whether you use content-box or border-box.",
        correct: { value: false },
        explanation:
          "Margin is always outside the border. content-box and border-box disagree about padding and border, not about margin.",
        points: 1,
      },
      {
        slug: "w4-q8-display",
        type: "multiple_choice",
        prompt: "You want a short role label to keep padding and sit only as wide as its words, not stretch across the card. Which display value fits?",
        options: [
          { id: "a", text: "inline, because width is required" },
          { id: "b", text: "block, because blocks shrink to their words by default" },
          { id: "c", text: "inline-block" },
          { id: "d", text: "none of these, because padding only works on body" },
        ],
        correct: { optionId: "c" },
        explanation:
          "inline-block stays in the line and honours padding while sizing to the content when no width is set. A block stretches across the card. A plain inline box is a poor place to expect a sized padded label.",
        points: 1,
      },
      {
        slug: "w4-q9-center",
        type: "short_answer",
        prompt:
          "In two or three sentences, explain how to center a profile card horizontally while leaving the paragraph text left-aligned.",
        correct: {
          rubric:
            "Award full points if the answer sets a width on the card, keeps it as a block, and uses auto for the left and right margins, and if it does not claim that text-align: center is required for the box. Partial points if they mention auto margins but omit the width. No points for only changing the HTML heading.",
        },
        explanation:
          "A block with a width and left and right margins of auto centers in its parent. text-align centers inline text, so leaving it unset keeps the biography left-aligned.",
        points: 2,
      },
    ],
  },
};
