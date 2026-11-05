import type { ModuleSeed } from "../../src/lib/content-types";

export const week03: ModuleSeed = {
  slug: "week-03-html-structure",
  number: 3,
  weekNumber: 3,
  monthLabel: "Month 1 — Computer fundamentals, HTML and CSS",
  title: "HTML forms and semantic structure",
  description:
    "Collect answers with a form, then organise a page into named regions such as header, main, and footer so people and software can follow the structure.",
  lessons: [
    {
      slug: "html-forms",
      sessionNumber: 5,
      title: "HTML forms",
      estimatedMinutes: 90,
      difficulty: "Guided practice",
      requiresOs: true,
      content: {
        overview: {
          about:
            "This lesson teaches HTML forms, the part of a page that collects answers. You will connect labels to fields, choose the right control for each fact, and use the browser's own checks before a form is submitted.",
          why: "A page of headings and paragraphs can inform someone. It cannot take a structured reply. Forms are how a webpage asks for a name, an email, or a choice.",
          alreadyKnow:
            "You can write a complete HTML document with headings, paragraphs, links, and lists, and you can reload it in a browser.",
        },
        objectives: [
          "Explain what a form collects and what it does not store yet.",
          "Connect each control to a label with matching for and id values.",
          "Choose text, email, password, number, radio, checkbox, select, and textarea for the right kind of answer.",
          "Use required and field types so the browser can catch empty or badly shaped answers.",
          "Build a registration form, submit it with method get, and read the result in the address bar.",
        ],
        prerequisites: [
          {
            label: "You can write a complete HTML document and open it in a browser.",
            lessonSlug: "introduction-to-html",
          },
          {
            label: "You can use headings, paragraphs, links, and lists in the body.",
            lessonSlug: "html-text-links-images-lists",
          },
        ],
        teachingNotes: [
          {
            heading: "What a form is and why it exists",
            markdown: `
A form is the part of a webpage that collects information from a person. A paragraph can tell someone that a workshop starts at ten. A form lets them answer: their name, an email address, the session they want, and a short note. HTML includes forms because a page that only displays text has no agreed way to take a structured reply.

Think of a paper card at a library desk. Printed labels sit beside blank lines. The person fills the lines. The clerk can file the card because every line has a name. A form on a webpage is that card. You write the labels and the lines. The browser presents them. The person fills them in.

You already know how to show headings, paragraphs, links, images, and lists. Those elements speak to the reader. A form listens. The problem it solves is a messy reply. If you only publish an email address, people write back in any shape they like. A form asks for one fact in each field, in an order you chose, with a name on every answer.

This week the form stays on your computer. There is no server programme yet to store the answers in a database. That is expected, and it is not a broken page. You will still see the browser check the fields. When you use \`method="get"\`, you will also see the answers appear in the address bar after you submit. A later part of the course sends answers to a programme. The HTML you practise now is the same kind of markup that programme will receive.

The form element wraps the fields that belong together. Two attributes on the opening tag matter today. \`method\` says how the answers travel. \`action\` says where the browser should go. For this lesson, use \`method="get"\` and set \`action\` to the same file name, such as \`register.html\`. A successful submit then reloads your page, and the address gains a question mark followed by the answers.

\`get\` puts the answers in the address. That is useful in class because you can see them. It is a poor way to send a real password or a private story, because the address can be stored in the browser history. \`post\` sends answers in the body of the request instead of the address. Real registration pages usually use \`post\` once a server exists. Opening a local file and posting to it does not give you a useful result in class, so we practise with \`get\` and we do not type real secrets.

:::misunderstanding A form is just a link that looks like boxes
A link goes somewhere. A form gathers named answers and then submits them. The boxes are controls. Without names, labels, and a submit button inside the form, you have a drawing of a form, not a working one.
:::

:::example A library card
Name, email, and a choice of morning or afternoon are three different facts. Three fields keep them separate. One long paragraph from the visitor would force you to guess which word is the name.
:::
`,
          },
          {
            heading: "Labels, names, and the submit button",
            markdown: `
A label is the visible name of a field. People need to know whether a box wants a name or an email address. The \`label\` element connects that text to the control. The pattern to practise is a \`for\` attribute on the label and an \`id\` attribute on the control. The two values must match exactly, including capital letters.

\`\`\`html
<label for="full-name">Full name</label>
<input id="full-name" name="full-name" type="text">
\`\`\`

\`id\` identifies this element on the page. It must be unique. You already relied on unique structure when you gave a page one \`h1\`. \`name\` is different. \`name\` is the key that travels with the answer when the form is submitted. In the address bar you will see \`full-name=\` because of the \`name\` attribute, not because of the \`id\`. The two attributes often look alike on purpose, so you can read your own file. They still do different jobs.

Clicking the label text should focus the matching control, which means the cursor moves into that box. That click is a test. If the click does nothing, \`for\` and \`id\` do not match, or the control is missing. A screen reader also uses this connection to speak the label when the person reaches the field. A paragraph that merely sits above the box does not create the connection, even if it looks close.

You can also wrap the control inside the label. That pattern connects them without \`for\` and \`id\`. It is valid. In this course, practise the \`for\` and \`id\` pair, because it stays clear when the label and the control are not tucked together, and because a mismatch is easier to see.

A button sends the form. Use a \`button\` element with \`type="submit"\` and put it inside the form. The words between the tags should say what will happen. Register is clearer than a vague label, because the person can see the action. \`type="button"\` does not submit. A button left outside the closing form tag does not submit that form either. An \`input\` with \`type="submit"\` also works. We use the button element so the label is written as text between tags, which is easier to read in the file.

\`\`\`html
<button type="submit">Register</button>
\`\`\`

Keep the page heading outside the button. The heading introduces the form. The button performs it. Do not put a heading inside the button to make the words large.

:::warning Do not type a real password into a class file
The password control hides characters while you type. With \`method="get"\`, a submitted value still appears in the address. Use a practice word such as the word class, never a password you use for email or banking.
:::

:::misunderstanding The words above the box are already a label
Nearby text is only nearby. The connection is the \`for\` and \`id\` pair, or a control wrapped inside the label element. The browser does not guess which paragraph belongs to which box.
:::
`,
          },
          {
            heading: "Text, email, password, and number",
            markdown: `
The \`input\` element is one tag. It does not wrap a sentence, so you do not write a closing input tag. The \`type\` attribute chooses what kind of answer the box expects. \`type\`, \`id\`, \`name\`, \`min\`, and \`required\` are attributes: a name, an equals sign, and a value in quotes, which is the same shape you learned for links and images.

\`type="text"\` is one line of ordinary writing, such as a person's name. \`type="email"\` asks for an email address. The browser can reject a value with no \`@\` sign. It does not check that the mailbox exists. It only checks the shape. \`type="password"\` hides the characters as they are typed. Hiding is not the same as keeping a secret. The HTML file does not lock the value, and a \`get\` submit still puts it in the address.

\`type="number"\` asks for a number, such as how many seats a household needs. \`min\` and \`max\` set a range. \`min="1"\` and \`max="4"\` tell the browser to refuse 0 and 8 when the person submits. The arrows some browsers show are a convenience. The attributes are the rule.

\`\`\`html
<input id="email" name="email" type="email" required>
<input id="seats" name="seats" type="number" min="1" max="4" required>
\`\`\`

These checks are basic HTML validation. Validation means testing a value against a rule before you accept it. The browser can run these rules with no server. They catch empty fields and obvious shape mistakes. They do not know whether a name is real, whether an email belongs to the person, or whether four seats are fair. A determined person can also edit the page and skip the checks. Use them as a help for honest mistakes, not as a lock.

A beginner often gives every box \`type="text"\` because the boxes look similar on a wide screen. The type still matters. An email type brings a keyboard that includes \`@\` on many phones. A number type refuses many letters. The meaning of the field is partly in the type, in the same way the meaning of a list is partly in whether you chose \`ol\` or \`ul\`.

Write \`required\` on the opening tag when the field must not be empty. You may also write \`required="required"\`. In this course, write the shorter form. Required email fields need both the attribute and \`type="email"\`: the field must be filled, and the filled value must look like an address.

:::misunderstanding The type only changes the decoration of the box
The type chooses the rule and, on many phones, the keyboard. Two boxes can look alike on a laptop and still accept different answers. Read the type in the file when the browser accepts a value you wanted it to refuse.
:::
`,
          },
          {
            heading: "Radio buttons, checkboxes, and select",
            markdown: `
A radio button is for one choice from a small group. Each choice is an \`input\` with \`type="radio"\`. Every radio in the group shares one \`name\`. Each choice has its own \`value\` and its own \`id\`, because each still needs its own label. The browser then allows only one radio with that name to stay selected. Morning or afternoon is a radio decision. The person cannot attend both under that question.

\`\`\`html
<input id="time-morning" name="session-time" type="radio" value="morning" required>
<label for="time-morning">Morning</label>
<input id="time-afternoon" name="session-time" type="radio" value="afternoon">
<label for="time-afternoon">Afternoon</label>
\`\`\`

If you give each radio a different \`name\`, they are not a group. The person can select all of them, and the address will contain several unrelated answers. That is the usual reason a radio group "does not work". Put \`required\` on one radio in the group, not as a substitute for the shared name. The shared name creates the group. \`required\` says the person must pick one of them.

A checkbox is a yes-or-no control, or one choice that may sit beside other choices. \`type="checkbox"\`. Checking it means yes. A reminder email can be one checkbox. Several interests can be several checkboxes, and more than one may be checked. That is the difference from radio. Use a checkbox when the honest answer can include more than one option. Use radio when the honest answer is exactly one.

\`value\` is the answer that gets submitted. The label text is what the person reads. They often match, and clear writing helps, but they are different slots. This is like a link. \`href\` is the destination, and the words between the tags are the label. Here, \`value\` is the stored answer, and the label is the human wording. If a checkbox has no \`value\`, browsers send a default of on when it is checked. Set \`value="yes"\` so the address is readable.

A \`select\` element is a dropdown list. It wraps \`option\` elements and it needs a closing tag. Each option has a \`value\` and visible text. The \`select\` has one \`name\`. Use a select when the list is longer than two or three items, such as a set of topics. Use radios when every choice should stay visible at once.

\`\`\`html
<label for="topic">Topic</label>
<select id="topic" name="topic" required>
  <option value="">Choose a topic</option>
  <option value="html">HTML documents</option>
  <option value="forms">Forms</option>
</select>
\`\`\`

The first option has an empty value on purpose. A select always displays some option, so \`required\` does nothing if every option already has a real value. The empty first option gives the browser a missing answer to refuse. The person then has to choose.

Group a radio set in a \`fieldset\` with a \`legend\` when you can. The legend is the question, such as Session time. The labels are the choices. The legend gives the group a name, which matters when someone cannot see that the two radios belong together.

:::misunderstanding A select is the same as a ul
An unordered list displays items. A select asks the person to pick one option and submit that option's value. They can both look like a vertical set of words. Only the select is a form control.
:::
`,
          },
          {
            heading: "Textarea and the checks you should try",
            markdown: `
A \`textarea\` is a multi-line box for a longer answer, such as a note about why someone wants a seat. Unlike \`input\`, it has an opening tag and a closing tag. If you forget the closing tag, the rest of the page can disappear into the box. \`rows\` and \`cols\` suggest the size. You do not need CSS to make a note box taller than a name box.

\`\`\`html
<label for="note">Note</label>
<textarea id="note" name="note" rows="4" cols="40"></textarea>
\`\`\`

Leave the textarea empty between the tags when the person should start from a blank box. Words you place between the tags become the starting text. Do not put an instruction there if you also have a label. The label already says what the box is for. Starting text that repeats the label is noise, and the person may submit that text by accident.

Now try the checks on purpose. Save the file, open it in a browser, and press Register with the required fields empty. The browser should stop the submit and point at the first problem. Then type a name and an email with no \`@\`, and press the button again. The email rule should stop you. Then fill the fields with practice values, choose a session and a topic, and submit. The page reloads. The address contains a question mark and pairs such as \`full-name=\` and \`email=\`.

Spaces in answers often appear as plus signs. An \`@\` sign may appear as \`%40\`. Those codes are the browser packing the address so it stays one line. You are not expected to decode every code. You are expected to find your practice name in that address and know the form sent the fields.

If nothing stops an empty submit, look for three causes. The \`required\` attribute is missing. The button is outside the form or is not \`type="submit"\`. You are looking at an old file in the browser because you did not save and reload. Fix the cause you can see in the source, then test the empty submit again before you test the successful one.

:::tip Test the failure before the success
The empty submit is part of the work. A form that only works when every field is already perfect has not shown you its checks. Leave a required field blank once, on purpose, and read the browser message.
:::

:::warning The browser check is not a review of the truth
A required email field can accept a shape that looks right and still belong to nobody you know. The check is mechanical. Reading the label and the answer is still your job when you are the person building the form.
:::
`,
          },
          {
            heading: "A registration form, field by field",
            markdown: `
Build one registration form for a workshop seat. Put an \`h1\` in the body first, then a short paragraph that says what the form is for, then the form. Inside the form, ask for a full name as text, an email, a practice password, a number of seats, a session time with two radios, one checkbox, a topic select, a note in a textarea, and a submit button. That list matches the controls in this lesson. You do not need more.

Wrap each label and its control in a paragraph if you want space between them. You already know that a paragraph is one block. The paragraph does not connect the label. The \`for\` and \`id\` pair does. The paragraph only keeps the pair together visually until CSS exists.

Use readable \`name\` and \`id\` values in lowercase, with a hyphen if you need two words: \`full-name\`, \`session-time\`, \`topic\`. Names such as \`x\` or \`input1\` still work, and they make the address bar and your own file harder to read next week. Choose words you would recognise if you saw only the address.

Keep the file at \`learning/week-03/register.html\`. Open that file from the folder. A second copy on the desktop will not show your edits. The save and reload habit from the HTML lessons is the same habit here. After you change a label, save, reload, and click the label before you trust the form.

Before you call the page finished, check four things. Every control has a label, and a click on the words focuses the control. Radios that belong to one question share one name. At least the name, email, seats, session, and topic are required, and an empty submit is blocked. A successful submit with practice data puts those names in the address. Then change one label, save, and reload, so you know you are looking at the file you edited.

Write the visible sentences yourself. A form that asks for a workshop seat should say so in the heading and in the button. Register for the workshop is a clear button. The note label should say what the note is about, such as Anything we should know, if that is the question you mean.

:::example What a finished address proves
After a get submit you might see \`register.html?full-name=Jordan+Lee&email=jordan%40example.com&seats=1\` and more pairs. The pairs prove the names travelled. They do not prove a person was enrolled. There is no enrolment programme yet.
:::
`,
          },
        ],
        vocabulary: [
          {
            term: "Form",
            definition:
              "The form element that wraps controls which belong together, plus the method and action that describe the submit.",
          },
          {
            term: "Label",
            definition:
              "The label element that names a control. Matching for and id, or wrapping the control, connects the words to the field.",
          },
          {
            term: "Control",
            definition:
              "A form field a person can use, such as an input, a select, or a textarea. Each control should have a name and a label.",
          },
          {
            term: "Input",
            definition:
              "A single-tag control. The type attribute chooses text, email, password, number, radio, checkbox, and other kinds of answer.",
          },
          {
            term: "Name attribute",
            definition:
              "The key sent with the answer on submit. It is not the same job as id, even when you spell them alike.",
          },
          {
            term: "Required",
            definition:
              "An attribute that tells the browser to refuse an empty field, or an unchosen radio group, when the form is submitted.",
          },
          {
            term: "Validation",
            definition:
              "A check against a rule, such as required or type email. The browser can run basic HTML validation before any server exists.",
          },
          {
            term: "Textarea",
            definition:
              "A multi-line text control with an opening tag and a closing tag, used for a note rather than a single short fact.",
          },
        ],
        demonstrations: [
          {
            title: "Build a registration form and submit it",
            intro:
              "You will create learning/week-03/register.html, add a labelled form, and submit it with method get so the answers appear in the address bar. Opening the file differs by system. The HTML does not.",
            steps: [
              "Create the folder learning/week-03 and a complete document named register.html with a doctype, a language, a head, a title, and a body.",
              "Add an h1, Workshop registration, and a form whose action is register.html and whose method is get.",
              "Add a full name text input, an email input, and a number input for seats. Give each a label, a unique id, a name, and required. Set min and max on the number.",
              "Add two radio inputs that share the name session-time, with different values and different ids. Put required on one of them. Add one checkbox with its own label.",
              "Add a select named topic with an empty first option and at least two real options, and a textarea named note with a closing tag.",
              "Add a button with type submit and the text Register, inside the form. Save the file.",
              "Open register.html from the week-03 folder in a browser. Submit it empty and read the message. Then submit practice values, not a real password.",
              "Find your practice name in the address after the question mark. Click one label and confirm the matching field focuses.",
            ],
            expected:
              "An empty submit is blocked. A finished submit reloads register.html and shows named answers in the address bar. Clicking a label focuses its field.",
            verify:
              "Click Full name and watch the cursor enter that box. Submit once with the email written as hello and confirm the browser refuses it. Then submit a practice email that contains an @ sign.",
            ifItFails:
              "If every radio can be selected, give them the same name. If the label click does nothing, make for and id match. If an empty form submits, add required and keep the button inside the form, then save and reload.",
            os: {
              sameOnAllPlatforms:
                "Save the file as learning/week-03/register.html before you test. Reload after every save. Submit with the button, then read the address bar. Do not type a real password.",
              windows: [
                "In File Explorer, open learning, create week-03 if it is missing, and confirm register.html ends in .html. Turn on file name extensions if you are not sure.",
                "Right-click register.html, choose Open with, and pick Edge, Chrome, or Firefox. Reload with Ctrl+R or F5 after you save in the editor.",
                "After a successful submit, click the address bar. You should see register.html followed by a question mark and your field names.",
              ],
              macos: [
                "In Finder, open the learning folder and create week-03. Save register.html there. If you are in TextEdit, use Format, Make Plain Text, so the file does not become a rich-text document.",
                "Control-click register.html, choose Open With, and pick Safari, Chrome, or Firefox. Reload with Command+R.",
                "After submit, click the address bar and look for the question mark. If the brackets show as text, the file was not saved as plain HTML.",
              ],
              linux: [
                "In the Files application, create learning/week-03 and save register.html with that exact lowercase name. Linux treats Register.html as a different file.",
                "Right-click register.html, choose Open With, and pick Firefox or another browser. Reload with Ctrl+R or F5.",
                "If the browser opens a different file than the one in your editor, compare the folder path and the capital letters before you change the form.",
              ],
              identify: [
                "Windows uses File Explorer and Ctrl+R or F5. macOS uses Finder and Command+R. Linux desktops often use an application named Files and Ctrl+R or F5.",
                "The system check from the first weeks still applies: the Apple menu means macOS, the Windows logo means Windows, and neither means you are on Linux.",
                "You do not need a new install to open an HTML form. Use the browser you already have.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "A workshop registration form",
            filename: "learning/week-03/register.html",
            language: "html",
            code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Workshop registration</title>
</head>
<body>
  <h1>Workshop registration</h1>
  <p>Reserve a seat. This practice form stays on your computer.</p>
  <form action="register.html" method="get">
    <p>
      <label for="full-name">Full name</label>
      <input id="full-name" name="full-name" type="text" required>
    </p>
    <p>
      <label for="email">Email</label>
      <input id="email" name="email" type="email" required>
    </p>
    <p>
      <label for="password">Practice password</label>
      <input id="password" name="password" type="password" required>
    </p>
    <p>
      <label for="seats">Seats for your household</label>
      <input id="seats" name="seats" type="number" min="1" max="4" required>
    </p>
    <fieldset>
      <legend>Session time</legend>
      <p>
        <input id="time-morning" name="session-time" type="radio" value="morning" required>
        <label for="time-morning">Morning</label>
      </p>
      <p>
        <input id="time-afternoon" name="session-time" type="radio" value="afternoon">
        <label for="time-afternoon">Afternoon</label>
      </p>
    </fieldset>
    <p>
      <input id="reminder" name="reminder" type="checkbox" value="yes">
      <label for="reminder">Send a reminder email</label>
    </p>
    <p>
      <label for="topic">Topic</label>
      <select id="topic" name="topic" required>
        <option value="">Choose a topic</option>
        <option value="html">HTML documents</option>
        <option value="forms">Forms</option>
      </select>
    </p>
    <p>
      <label for="note">Anything we should know</label>
      <textarea id="note" name="note" rows="4" cols="40"></textarea>
    </p>
    <p>
      <button type="submit">Register</button>
    </p>
  </form>
</body>
</html>
`,
            explanation:
              "Save this document as learning/week-03/register.html and open it in a browser. Replace the heading's workshop wording with your own class or club if you want the page to be yours. Submit it empty first, then submit practice values. The password field is for a practice word only. The get method will show that word in the address, which is why it must not be a real password.",
            lineNotes: [
              {
                focus: "form",
                note: "action reloads this same file. method get puts the answers in the address so you can see them without a server.",
              },
              {
                focus: "for and id",
                note: "Each label's for matches one control's id. The name attributes are what appear after the question mark.",
              },
              {
                focus: "email and number",
                note: "type email checks the shape. type number with min and max checks the range when you submit.",
              },
              {
                focus: "radios",
                note: "Both radios use name session-time, so only one can stay selected. Their ids differ so each label has a match.",
              },
              {
                focus: "select",
                note: "The first option has an empty value so required can refuse a topic that was never chosen.",
              },
              {
                focus: "textarea and button",
                note: "The textarea is closed. The button is inside the form and its type is submit, so it sends the fields.",
              },
            ],
            expectedOutput:
              "The browser shows the heading, the fields, and Register. An empty submit is blocked. A complete practice submit reloads the file and shows names such as full-name and email in the address bar.",
            level: "practical",
          },
        ],
        exercises: [
          {
            title: "Repair three broken connections",
            difficulty: "warm-up",
            prompt:
              "Create learning/week-03/repair-form.html as a complete page. Put in a small form that has the three problems below, then repair them. Do not copy the registration example unchanged.",
            steps: [
              "Add a label that says Email with for set to mail, and an email input whose id is email. Click the label and notice the miss.",
              "Add two radios for Yes and No that use different name attributes. Select both and notice that you can.",
              "Put the submit button after the form's closing tag. Try to submit, then move the button inside the form.",
              "Repair the for and id pair, give the radios one shared name, and submit a practice email so the address bar shows it.",
            ],
            expectedOutcome:
              "The label click focuses the email field, only one of Yes or No stays selected, and the button submits the form.",
          },
          {
            title: "A short class signup",
            difficulty: "practice",
            prompt:
              "Build a signup form for a class, club, or workshop you can describe in public. Use your own sentences. Keep secrets out of it.",
            steps: [
              "Create learning/week-03/signup.html with a heading and a form that uses method get and an action of signup.html.",
              "Include text, email, number, one radio group, one checkbox, a select, and a textarea. Label each control.",
              "Mark the name, the email, and the radio group required. Include a practice password field only if you are willing to see a fake word in the address.",
              "Open the file, fail an empty submit on purpose, then succeed with practice data and read the address.",
            ],
            expectedOutcome:
              "signup.html blocks an empty required field, accepts a shaped email, and shows your field names in the address after a real submit.",
          },
        ],
        troubleshooting: [
          {
            problem: "Clicking the label does not move the cursor into the box.",
            why: "The label's for value and the control's id value are different, or the control has no id. A paragraph sitting above the box does not make that connection.",
            solution:
              "Make the two values identical, character for character. Save, reload, and click the label text again. If you wrapped the input inside the label instead, you do not also need a mismatched for.",
          },
          {
            problem: "I can select every radio button at once.",
            why: "Each radio has a different name, so the browser treats them as separate questions instead of one group.",
            solution:
              "Give every radio in that question the same name. Keep their ids different so each label still matches one control. Reload and try to select two. Only one should stay on.",
          },
          {
            problem: "The form submits even when the required fields are empty.",
            why: "required is missing, the button is outside the form, the button type is button rather than submit, or the browser is showing an old saved file.",
            solution:
              "Put required on the opening tag of each field that must be filled, and put required on one radio in a required group. Move the submit button inside the form. Save, reload, and try the empty submit again.",
          },
          {
            problem: "The email field accepts the word hello, or the whole page after the note disappears.",
            why: "The email control is type text, so there is no email rule. If the page vanishes into the note box, the textarea was opened and not closed.",
            solution:
              "Set type to email and reload before you test hello again. Close the textarea with its closing tag before the button. Save and reload. The button should sit outside the note box.",
          },
        ],
        knowledgeChecks: [
          {
            id: "w3s5-label",
            question: "What must match so that clicking a label focuses the correct control?",
            format: "Multiple choice",
            options: [
              "The label's for value and the control's id",
              "The heading text and the button text",
              "The file name and the paragraph",
              "The method and the page title",
            ],
          },
          {
            id: "w3s5-radio",
            question: "Two radio buttons belong to one question. What do they share?",
            format: "Multiple choice",
            options: [
              "One id, so the page stays short",
              "One name, with a different value on each",
              "One textarea",
              "Nothing. Each radio must use a different name",
            ],
          },
          {
            id: "w3s5-required",
            question: "The required attribute proves that an email address belongs to a real person.",
            format: "True or false",
            options: ["True", "False"],
          },
          {
            id: "w3s5-get",
            question: "Why does this lesson submit practice forms with method get?",
            format: "Short answer",
          },
        ],
        homework: {
          description:
            "Submit your registration form source and a short note about one check you saw the browser make. Use practice data only. The contact page with semantic sections is the week assignment after the next session, so do not wait for it to finish this response.",
          requirements: [
            "Include a complete HTML document saved as learning/week-03/register.html or signup.html, with a form that uses method get.",
            "Label a text field, an email field, a number field, a radio group, a checkbox, a select, and a textarea, and include a submit button inside the form.",
            "In a few sentences, describe what happened when you submitted the form empty, and what you saw in the address bar after a practice submit.",
          ],
          deliverables: [
            "The full HTML source in the lesson response, the file path, and the short testing note.",
          ],
          submission:
            "Paste the source and your testing note into the homework box on this lesson. Say which file you opened in the browser. Do not include a real password.",
          criteria: [
            "Labels match controls, the requested field types are present, and the button is inside the form.",
            "The note shows that you tried an empty submit and that you can point to field names in the address after a get submit.",
          ],
          submissionKind: "lesson_response",
        },
        summary: [
          "A form collects named answers. method and action describe the submit. In class, get shows the answers in the address because there is no server yet.",
          "A label must be connected to its control. name travels with the answer. id must be unique and matches the label's for.",
          "Choose the input type for the fact you want: text, email, password, number, radio, or checkbox. Use select for a longer single choice and textarea for a note.",
          "required and the email and number types are basic browser checks. They catch empty and badly shaped answers. They do not prove the answer is true, and they are not a place for a real password.",
        ],
        nextLesson: {
          title: "Semantic HTML",
          why: "You can collect answers. Next you will name the regions of a whole page so the form sits in a structure people can follow.",
          lessonSlug: "semantic-html",
        },
      },
      guide: {
        sessionNumber: 5,
        week: 3,
        title: "HTML forms",
        durationMinutes: 90,
        objectives: [
          "Students can point to for, id, and name on one projected form and say which value appears in the address.",
          "Students build a labelled registration form in learning/week-03 and block an empty submit.",
          "Students see a get submit put practice answers in the address bar.",
          "Students leave knowing a password field in this exercise is for a fake word only.",
        ],
        tools: [
          "Editor and browser side by side, with the address bar visible",
          "A starter file that is a complete HTML document with an empty body",
          "The worked registration form, kept off the student screen until after the first repair",
          "A paper card with three lines, used as the desk analogy, optional",
        ],
        preparation: [
          "Create learning/week-03 on the projector machine and confirm register.html submits to itself with method get in the browser you will use.",
          "Prepare a broken copy where the email for and id differ, the two radios have different names, and the button sits outside the form. You will repair that copy live.",
          "Decide the practice password word the room will use, such as class, and say aloud that real passwords are forbidden in this file.",
          "Check what the classroom browser says on an empty required field so the message is familiar before students hit it.",
        ],
        flow: [
          {
            minutes: 5,
            title: "From a page that talks to a page that asks",
            detail:
              "Open a week 2 introduction page and ask what a stranger can do besides read. The answer is follow a link. Say that today the page will take a structured reply. Hold up three labelled lines, or draw them, and name the form as that card. Promise that nothing is stored on a server today.",
          },
          {
            minutes: 15,
            title: "Label, name, and a button that submits",
            detail:
              "Type one label and one text input. Click the label and show the cursor moving. Break the id on purpose and click again. Restore it. Then point at name and say it is the word that will appear in the address. Add the button inside the form and mention that type button would not send anything.",
          },
          {
            minutes: 20,
            title: "Types, radios, and one failed submit",
            detail:
              "Add email, number, two radios that share a name, a checkbox, a select with an empty first option, and a textarea. Submit the form empty and read the browser message without apologising for it. Then give the radios different names, select both, and repair the name. Submit practice data and read full-name in the address bar. Show %40 only long enough to say the browser encoded the @ sign.",
          },
          {
            minutes: 30,
            title: "Students build a signup",
            detail:
              "Each student creates learning/week-03/signup.html for a class or club they can describe in public. Walk the room with four checks: label click, shared radio name, required empty submit, button inside the form. Stop anyone who starts to type a real password. Students who finish early add a fieldset and legend around the radios and test the legend's question by reading it aloud.",
          },
          {
            minutes: 10,
            title: "Clinic on the errors that happened",
            detail:
              "Repair one real student problem on a copy, not by silently editing their only file. Typical cases are a select that never fails required, a textarea that swallowed the button, and a file:// page that was never reloaded. Ask the knowledge checks while the repaired form is on screen so the answers point at the markup.",
          },
          {
            minutes: 10,
            title: "Lesson response and a look ahead",
            detail:
              "Show the homework box for this lesson. They paste the source and write what the empty submit did and what the address showed. Remind them the week assignment is a contact page next session, and this response is still due for this session. Preview header, main, and footer as the regions that will hold a form later.",
          },
        ],
        explain: [
          "A form collects named answers. get shows them in the address during this lesson. post is for a later server, not for a local file test.",
          "for matches id. name is the submitted key. A label click is the test of the connection.",
          "Radio groups share a name. Checkboxes may be combined. A select needs a real empty option if required should matter.",
          "Browser checks catch empty and badly shaped values. They do not prove identity, and a password box is not a safe place for a real password.",
        ],
        questions: [
          "Which attribute shows up in the address after submit, name or id?",
          "Why can you select both radios when the form looks finished?",
          "What is the difference between hiding a password as you type and keeping it out of the address bar?",
          "Why does the first option in a required select have an empty value?",
        ],
        demonstration:
          "Build register.html live from a valid skeleton. Break and restore the label connection, submit empty, then submit practice data and read the address aloud. Keep the file in learning/week-03 and refuse any real password that a student offers.",
        practice:
          "Students each make signup.html with their own sentences and the full set of controls. Watch one empty submit and one successful submit on their machine. A copied registration page with the example's heading still in place is not finished until the words are theirs.",
        expectedOutcomes: [
          "Each student has a form that blocks an empty required field and shows field names in the address after submit.",
          "Students can click a label and land in the matching control.",
          "Students can say why the practice password must be fake.",
        ],
        difficulties: [
          {
            issue: "A student is stuck because the browser warning on an empty field looks like a failure.",
            help: "Call the warning the success test for required. Read it together, fill only that field, and let the next warning appear. Tell them the messages differ slightly between browsers and the rule is still the attribute.",
          },
          {
            issue: "A student uses method post and the local page seems to do nothing or offers to download.",
            help: "Change method to get and set action to the file name. Explain that post needs a server you do not have yet. Repeat the submit and show the address.",
          },
          {
            issue: "A student wants the form to send a real email.",
            help: "Say the HTML only describes the card. Nothing in this file delivers mail. Show the address-bar result as the evidence available today, and point to a later month for programmes that receive data.",
          },
        ],
        homework:
          "Students paste the full source into the lesson response and describe the empty submit and the address bar. The week assignment is not a substitute for this response. Reject any submission that contains a real password and ask them to change the value and resubmit.",
        assessment:
          "Use the label click, the empty submit, and the four knowledge checks. A form that looks tidy but submits empty required fields is not complete. Do not grade visual design.",
        recap:
          "Point at one label, one name, and the button. Ask what each does. Leave the room with the rule that get is how we see answers today, and that the next session gives the page named regions around this kind of form.",
        knowledgeCheckAnswers: [
          {
            id: "w3s5-label",
            answer: "The label's for value and the control's id",
            explanation:
              "for and id connect the words to the field. The button text, the file name, and the method do not focus a control.",
          },
          {
            id: "w3s5-radio",
            answer: "One name, with a different value on each",
            explanation:
              "The shared name makes a single-choice group. Each radio still needs its own id and its own value.",
          },
          {
            id: "w3s5-required",
            answer: "False",
            explanation:
              "required only blocks an empty value or an unchosen group. It cannot prove that a person or an inbox is real.",
          },
          {
            id: "w3s5-get",
            answer:
              "method get puts the answers in the address bar, so we can see them without a server. It is not the right method for a real password.",
            explanation:
              "Accept an answer about seeing the result locally. Strong answers also warn that the address is a bad place for secrets.",
          },
        ],
      },
    },
    {
      slug: "semantic-html",
      sessionNumber: 6,
      title: "Semantic HTML",
      estimatedMinutes: 90,
      difficulty: "Bringing ideas together",
      requiresOs: true,
      content: {
        overview: {
          about:
            "This lesson names the regions of a page. You will use header, nav, main, section, article, aside, and footer so the structure carries meaning, and you will place a form inside that structure.",
          why: "A pile of divisions can look like a page and still hide its outline. Named regions help people, keyboards, and screen readers move through the same document.",
          alreadyKnow:
            "You can build a complete HTML page with headings, links, lists, and a labelled form.",
        },
        objectives: [
          "Explain what semantic HTML means and what a div does not say.",
          "Mark a page with header, nav, main, and footer in the right places.",
          "Choose section, article, and aside for the right kind of content.",
          "Add in-page links that jump to unique ids.",
          "Apply basic accessibility habits: language, heading order, labels, link text, and landmarks.",
        ],
        prerequisites: [
          {
            label: "You can write headings, paragraphs, lists, and links in a complete document.",
            lessonSlug: "html-text-links-images-lists",
          },
          {
            label: "You can build a labelled form with a submit button.",
            lessonSlug: "html-forms",
          },
        ],
        teachingNotes: [
          {
            heading: "What semantic HTML means",
            markdown: `
Semantic HTML means choosing an element because of what the content is, not because of how you hope it will look. You already started this when you used \`h1\` for the main heading and \`ol\` for steps. The heading level was the outline. The list type was the meaning. A \`div\` was the leftover: a group with no meaning of its own and no built-in colour or border.

The elements in this lesson are the named regions of a page. \`header\`, \`nav\`, \`main\`, \`section\`, \`article\`, \`aside\`, and \`footer\` tell the browser what role a block plays. They exist because a long page of divisions all looks the same to software. A person who can see the page may guess that the top block is the title area. A screen reader should not have to guess. Search tools and your own future CSS also read these names.

The problem they solve is a flat document. If every block is a \`div\`, you can still write sentences, and the browser will show them. Nobody can ask the page for its main content, its navigation, or its footer without reading every line. Landmarks are the named regions assistive tools can list. Header, nav, main, and footer are landmarks when you use them as the regions of the page.

These elements do not, by themselves, create a banner colour, a sidebar column, or a sticky bar. The page will still look plain. That is the same lesson as last week: meaning first. CSS, which starts next week, can target these elements because they have stable names. If you had used only divisions, you would have to invent class names for jobs HTML already has words for.

A beginner misunderstanding is to pick the element that sounds impressive. \`article\` is not a reward for important text. It has a definition. So does \`aside\`. Using the wrong meaningful element is a different mistake from using a \`div\`, and it is still a mistake. When no region name fits, a \`div\` remains honest.

:::misunderstanding Semantic tags will redesign the page
They rarely change the look beyond normal heading sizes you already know. If the page looks plain, the HTML can still be right. Judge the structure by the element names, then by the outline, not by colour.
:::

:::example A newspaper, not a poster
A newspaper has a masthead, a contents list, a main story, a short related note, and a footer line. Those are jobs. A poster may only shout one sentence. Your pages are closer to the newspaper: several jobs on one page.
:::
`,
          },
          {
            heading: "Header, navigation, and main",
            markdown: `
The \`header\` element holds introductory content. For a whole page, that is usually the \`h1\` and often the navigation. The header introduces the page. It is not a bar that paints itself a dark colour. You still write the heading yourself.

The \`nav\` element wraps the main navigation: the links a person uses to move around this page or to other pages you actually have. Put the links in a list so they stay a list. A list inside \`nav\` is a normal pattern. Do not wrap every single link on the page in its own \`nav\`. One navigation region for the page is enough today. A link in a paragraph can stay a link in a paragraph.

\`\`\`html
<header>
  <h1>North Library Workshop</h1>
  <nav>
    <ul>
      <li><a href="#about">About</a></li>
      <li><a href="#visit">Visit</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</header>
\`\`\`

The \`href\` values start with \`#\` because they point at ids on this page. \`href="#about"\` jumps to the element with \`id="about"\`. The hash character is required. Without it, the browser looks for a file named about. The id must be unique. You already used unique ids on form controls. The same rule applies to sections. If two elements share an id, the browser does not have one clear target.

The \`main\` element wraps the primary content of the page. Use one \`main\`. Do not put \`main\` inside \`header\`, \`nav\`, \`footer\`, \`article\`, or \`aside\`. It belongs as a region of the body, beside the header and the footer. The form you built last session belongs in \`main\` when the form is the point of the page, or in a section inside \`main\` when the page also has other parts.

Repeat the outline test from the headings lesson. The \`h1\` is the page. Each big part inside \`main\` gets an \`h2\`. Smaller parts get an \`h3\`. Do not jump to \`h4\` because you want smaller letters. Landmark elements do not replace headings. A \`section\` without a heading is a weaker section. Give it an \`h2\` that says what that part is about.

:::warning One main, and not inside the header
If you wrap the whole body in main, the header and footer stop being separate landmarks. Keep header, main, and footer as neighbours inside the body.
:::

:::misunderstanding The nav is the list of every link you might ever add
Navigation is the set of moves you are offering as the page's menu. A link in the contact paragraph can stay there. Extra nav regions make the landmark list noisy.
:::
`,
          },
          {
            heading: "Section, article, and aside",
            markdown: `
A \`section\` is a thematic group, a part of the page with its own topic. About the workshop, Visit, and Contact are sections when each has a heading and content that belongs together. A section is not a synonym for \`div\`. If you cannot name the topic in a heading, you may not have a section yet.

An \`article\` is a self-contained piece. Someone could lift it out and it would still make sense: a news item, a session description, a notice with its own heading and paragraphs. A Saturday session with a time and a description can be an article inside the Visit section. The section is the broader topic. The article is one complete piece inside it.

The difference is the test of independence. If the block needs the surrounding page to mean anything, it is probably a section or a paragraph, not an article. If you can read the block alone and know what it is offering, article fits. Beginners often wrap every paragraph in an article. That inflates the word. Use it when the independence test passes.

An \`aside\` is related content that is not the main thread. A short note such as Bring a notebook can sit beside the visit information. The aside is not a junk drawer and it is not required to look like a sidebar. The name describes the relationship. If the note is essential to the steps, put it in the section as a paragraph instead of pretending it is optional.

\`\`\`html
<section id="visit">
  <h2>Visit</h2>
  <article>
    <h3>Saturday session</h3>
    <p>The Saturday session meets in the reading room at ten.</p>
  </article>
      <aside>
        <h3>Bring a notebook</h3>
        <p>The room has tables and no spare paper.</p>
      </aside>
    </section>
\`\`\`

The section heading is an \`h2\`. The article and the aside sit inside that section, so their headings are \`h3\`. That keeps the outline in order: page, then topic, then pieces inside the topic. Do not jump to \`h4\` to make the note look smaller. If the aside were a separate topic beside Visit, rather than a note inside it, it would be its own section with an \`h2\`. Inside Visit, \`h3\` is the honest rank.

Divisions still have a use. A cluster of elements that has no better name, and that you will later style as one box, can be a \`div\`. Do not use a division for the page header, the primary content, or the footer when those names fit.

:::misunderstanding Article means important and aside means unimportant
Article means self-contained. Aside means related but off the main thread. A safety note can be an aside and still matter. A short article can be ordinary.
:::
`,
          },
          {
            heading: "Footer and the shape of a whole page",
            markdown: `
The \`footer\` element holds closing information for the page: who published it, a short note about the practice work, or a way back to the contact section. It sits after \`main\`, as a sibling of \`header\` and \`main\`. A footer is not a dumping ground for the form unless the form truly is only a closing extra. On a contact page, the form belongs in a contact section inside \`main\`, because contacting you is primary content. The footer can then hold one sentence such as North Library Workshop. A practice page for class.

A complete shape for this week looks like this. The body contains a header, then main, then a footer. The header contains the \`h1\` and a \`nav\`. The main contains two or more sections. One section contains an article. One section contains an aside. One section contains the form from the previous lesson, retitled for contact. The footer contains a short closing line. Each menu link points at a section id.

That shape is the week assignment's skeleton. The words must be yours. Do not copy a library example if your page is about a football club or a family recipe class. The elements stay. The facts change. Avoid private details you would not say aloud in the room: no home address, no phone number you do not want shared, no one else's personal data. A city and a public building are enough.

In-page links need a target that exists. Click About and the page should move to the About heading. If it does not, compare the href, including the \`#\`, with the id. Saving is not enough if the browser still has an older copy. Reload, then click.

\`\`\`html
<body>
  <header>...</header>
  <main>...</main>
  <footer>
    <p>North Library Workshop. A practice page for class.</p>
  </footer>
</body>
\`\`\`

You may add a header inside an article later, when a piece needs its own title group. This week, one page header is the goal. Extra headers are valid HTML and they also add landmarks. Too many landmarks become a second navigation problem. Learn the page-level pattern cleanly first.

:::example A contact page in one sentence
The header names the place and lists the parts, the main explains and then asks for a message, and the footer closes. The form is the ask. It is not the whole document.
:::
`,
          },
          {
            heading: "Basic accessibility",
            markdown: `
Accessibility means people with different bodies, senses, and tools can use the page. You will not finish that work in one session. You can do the HTML parts that are already in reach. They are the same habits as correct structure, not a separate coat of paint.

Keep \`lang="en"\` on the html element when the page is in English. A screen reader uses that hint for pronunciation. If your page is in another language, use the matching language code. Set the language you actually wrote. A wrong code points the pronunciation hint at the wrong language.

Keep one \`h1\`. Do not skip heading levels to change the size. People who navigate by headings get a list. Gaps and fake headings break that list. The title in the head still names the tab. The \`h1\` still names the page in the window. You learned that split in the first HTML session. It remains true inside landmarks.

Every control in the contact form keeps its label. The semantic page does not replace the form lesson. A field without a label is still a field without a name, even if it sits inside a beautiful section. Button text still says the action, such as Send message. Link text still says where the link goes. About, Visit, and Contact are acceptable when they match the headings they target. Click here is still weak.

Images, if you include one, still need alternative text that describes the picture. The region names do not describe the image for you. If you have no image, do not add a decorative one to look finished. The assignment can be complete without a photograph.

Landmarks help someone jump to the header, the navigation, the main content, or the footer without reading every paragraph. That is why the elements exist. They help you too, when you return to the file next week and need to find the form. Do not claim the page is accessible for everyone because the landmarks are present. Colour contrast, keyboard focus, and captions are further work. Say what you did: language, headings, labels, link text, and landmarks.

:::tip Read the page as a list of headings
Collapse the idea of the page to its headings and landmarks. If that list tells the truth, the structure is close. If it only says Division, Division, Division, the reader has to open every box.
:::

:::warning Do not remove the outline to make a poster
Skipping from h1 to h4, or using a heading for a sentence you only want in bold, fights the accessibility habit you just learned. Size is a CSS question. Next week can change size without lying about the outline.
:::
`,
          },
          {
            heading: "HTML habits that keep a page trustworthy",
            markdown: `
Best practice here means habits that keep the meaning intact. Write element names in lowercase. Quote attribute values with straight quotes. Close every element that has a closing tag. Indent nested elements so you can see that the form is inside the contact section and the section is inside main. Indentation is for people. The browser ignores it. You will not.

Use the element that matches the job. Do not use a \`div\` for the header, the main content, or the footer. Do not use a table, a heading, or a list as a costume for something else. You have not been asked to build layout tables, and you should not. Rows and columns of appearance are a CSS job. The HTML job is the outline and the controls.

Keep ids unique and file names predictable. Save the contact page as \`learning/week-03/contact.html\`. Use lowercase and hyphens if you add another file. Avoid spaces in file names so the path is easy to read and easy to type. Open the file from that folder on your system, the same way you opened pages in week 2.

Before you submit, run a short human check. Click every nav link. Click every form label. Submit the form empty and then with practice data. Read the headings in order and ask whether a stranger could tell what the page is about. View the source if you are unsure which file the browser used. The source should show header, main, and footer as real elements, not as class names on divisions.

A class attribute can wait until CSS. This week the element name is the class of meaning. Adding \`class="header"\` on a \`div\` copies the word and misses the point. The header element already is that word, and assistive tools already know it. Next week you will style \`header\`, \`main\`, and \`form\` directly, and you will add classes only when several elements of the same kind need different looks.

:::misunderstanding Best practice means more elements
A good page is as small as the meaning allows. Extra articles, empty sections, and repeated nav blocks do not raise the quality. Each element should answer what this part is.
:::
`,
          },
        ],
        vocabulary: [
          {
            term: "Semantic HTML",
            definition:
              "Markup that uses an element because of what the content is, such as a real header or list, not because of a hoped-for look.",
          },
          {
            term: "Landmark",
            definition:
              "A named region, such as header, nav, main, or footer, that assistive tools can list so a person can jump to it.",
          },
          {
            term: "Header",
            definition:
              "The header element for introductory content. On a page, it usually holds the main heading and the navigation.",
          },
          {
            term: "Navigation",
            definition:
              "The nav element for the main set of links that move around the page or to other real pages.",
          },
          {
            term: "Main",
            definition:
              "The main element for the primary content. Use one, and do not place it inside the header, nav, or footer.",
          },
          {
            term: "Section",
            definition:
              "A thematic group with its own topic, usually introduced by a heading. It is not a synonym for a division.",
          },
          {
            term: "Article",
            definition:
              "A self-contained piece, such as a notice or a session description, that still makes sense if it is read alone.",
          },
          {
            term: "Aside",
            definition:
              "Content that is related but not the main thread, such as a short note beside a section. It is not a junk drawer.",
          },
          {
            term: "Footer",
            definition:
              "The footer element for closing information about the page, placed after main, not as a substitute for the contact form.",
          },
        ],
        demonstrations: [
          {
            title: "Build a multi-section page and jump between parts",
            intro:
              "You will create learning/week-03/library.html with a header, navigation, main, sections, an article, an aside, and a footer. Then you will click the menu and confirm each link lands on the matching heading.",
            steps: [
              "Create a complete HTML document at learning/week-03/library.html with a title in the head and lang on the html element.",
              "Add a header that contains one h1 and a nav. Inside the nav, add a list of three links whose href values are #about, #visit, and #contact.",
              "Add one main after the header. Inside it, add a section with id about and an h2.",
              "Add a section with id visit, an h2, an article with an h3 and a paragraph, and an aside with an h3 and a short note.",
              "Add a section with id contact and an h2. Inside it, add a short labelled form that uses method get, one email field, a textarea, and a submit button.",
              "Add a footer after main with one sentence that names the page as practice work. Do not put main inside the footer.",
              "Save and open the file from the week-03 folder. Click About, Visit, and Contact. Each click should bring that heading to the top area of the window.",
              "Click the email label, submit the form empty if the field is required, then submit a practice email and find email= in the address.",
            ],
            expected:
              "The page shows a heading, a menu, three parts, a note, a small form, and a closing line. Menu clicks jump to the matching sections. The form still has a working label.",
            verify:
              "View the page source and search for header, nav, main, article, aside, and footer. Each menu href should match an id, including the hash only on the href. Confirm there is one main.",
            ifItFails:
              "If a menu click opens a missing file, add the # before the id. If the click does nothing, make the id unique and identical to the href without the hash. If the whole page is inside main, move the header and footer out.",
            os: {
              sameOnAllPlatforms:
                "Keep library.html in learning/week-03. In-page links need the hash and a matching id. Reload after you edit an id. The form still submits to this file if action is library.html.",
              windows: [
                "In File Explorer, open learning/week-03 and confirm the file name is library.html, not library.html.txt. Show file name extensions if the type is unclear.",
                "Right-click the file, choose Open with, and pick Edge, Chrome, or Firefox. Reload with Ctrl+R or F5, then click the menu links.",
                "If a click opens a search page or a download, look at the href in the editor. It should be #visit and not a web search phrase.",
              ],
              macos: [
                "In Finder, open learning/week-03. Control-click library.html, choose Open With, and pick Safari, Chrome, or Firefox. Reload with Command+R.",
                "If TextEdit made a rich-text file, start again from plain text. The browser should show headings, not angle brackets.",
                "After a jump, use Command+Down or scroll to confirm you landed near the heading, then try the other two links.",
              ],
              linux: [
                "In Files, open learning/week-03. Match the lowercase name library.html. Right-click, choose Open With, and pick Firefox or another browser.",
                "Reload with Ctrl+R or F5. If a link fails only on your machine, compare capital letters in the id and the href. Linux file names are case-sensitive, and ids are case-sensitive everywhere.",
                "If you opened the file from the editor's preview and the menu seems stale, open the same path from the file manager and test there.",
              ],
              identify: [
                "Use File Explorer on Windows, Finder on macOS, and Files on many Linux desktops to open the HTML file in a browser.",
                "Reload is Ctrl+R or F5 on Windows and Linux, and Command+R on macOS.",
                "If the menus do not look familiar, use the system check you learned in week 1 before you follow a click path for the wrong system.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "A small multi-section practice page",
            filename: "learning/week-03/library.html",
            language: "html",
            code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>North Library Workshop</title>
</head>
<body>
  <header>
    <h1>North Library Workshop</h1>
    <nav>
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#visit">Visit</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <section id="about">
      <h2>About</h2>
      <p>The workshop is a quiet room for people learning to build a webpage.</p>
    </section>
    <section id="visit">
      <h2>Visit</h2>
      <article>
        <h3>Saturday session</h3>
        <p>The Saturday session meets in the reading room at ten.</p>
      </article>
      <aside>
        <h3>Bring a notebook</h3>
        <p>The room has tables and no spare paper.</p>
      </aside>
    </section>
    <section id="contact">
      <h2>Contact</h2>
      <form action="library.html" method="get">
        <p>
          <label for="email">Email</label>
          <input id="email" name="email" type="email" required>
        </p>
        <p>
          <label for="note">Message</label>
          <textarea id="note" name="note" rows="4" cols="40"></textarea>
        </p>
        <p>
          <button type="submit">Send message</button>
        </p>
      </form>
    </section>
  </main>
  <footer>
    <p>North Library Workshop. A practice page for class.</p>
  </footer>
</body>
</html>
`,
            explanation:
              "This is a complete practice page, not a styled design. The header introduces the workshop, the nav jumps to three ids, and main holds the three topics. The article can be read alone. The aside is a related note. The form stays inside the contact section, and the footer only closes the page. Use it as a shape. Write your own facts for the assignment.",
            lineNotes: [
              {
                focus: "header and nav",
                note: "The h1 and the menu live in the header. The href values include # so they stay on this page.",
              },
              {
                focus: "main",
                note: "There is one main. It is not wrapped around the header or the footer.",
              },
              {
                focus: "article and aside",
                note: "The Saturday session stands alone, so it is an article. The notebook note is related, so it is an aside. Both use h3 under the Visit h2.",
              },
              {
                focus: "ids",
                note: "about, visit, and contact each appear once. They match the menu links without the hash.",
              },
              {
                focus: "form",
                note: "The contact form still has labels, names, a required email, and a submit button inside the form.",
              },
              {
                focus: "footer",
                note: "The footer is a sibling of main. It does not contain the form.",
              },
            ],
            expectedOutput:
              "The browser shows the workshop name, three menu links, the about and visit text, a small form, and a closing line. Clicking Visit moves to the Visit heading. The page has no colour scheme and no sidebar column yet.",
            level: "practical",
          },
        ],
        exercises: [
          {
            title: "Rename the boxes",
            difficulty: "warm-up",
            prompt:
              "Start from a complete page that uses only div elements for the top block, the menu, the content, and the closing line. Replace the divisions with semantic elements without changing the sentences.",
            steps: [
              "Create learning/week-03/rename.html with four div elements and a little real text: a title, two links, two short parts, and a closing sentence.",
              "Change the outer content div to main, the top div to header, the link group to nav, and the closing div to footer.",
              "Give each content part a section and a heading. Add one article only if a part still makes sense alone.",
              "Reload and confirm the visible words did not need a new coat of colour to become a clearer document. View the source and read the element names aloud.",
            ],
            expectedOutcome:
              "The source uses header, nav, main, section, and footer for those jobs, and the visible sentences are unchanged.",
          },
          {
            title: "A three-part page with working jumps",
            difficulty: "practice",
            prompt:
              "Build a page about a public place you are willing to describe: a library, a park, a class, or a club. Keep private details out.",
            steps: [
              "Use one h1, a nav with three in-page links, and matching section ids.",
              "Include one article and one aside in sensible places, with headings that do not skip a level.",
              "Put a labelled form in the last section. Use method get and at least an email field and a textarea.",
              "Open the file, click each nav link, and submit the form with a practice email.",
            ],
            expectedOutcome:
              "Each menu link lands on its section, the outline reads in order, and the form still shows a connected label and a get result.",
          },
        ],
        troubleshooting: [
          {
            problem: "A menu link opens a missing page, or it does not move at all.",
            why: "The href is missing the #, so the browser looks for a file. Or the id does not match the href exactly, including capital letters. Or two elements share that id.",
            solution:
              "Set the href to #contact and the target id to contact, with the same spelling. Make sure the id appears once. Save, reload, and click the menu item again.",
          },
          {
            problem: "I used header, main, and footer, and the page looks the same as my div version.",
            why: "These elements carry meaning, not a theme. The browser's default look for them is plain. The change is in the structure and in tools that read structure.",
            solution:
              "View the source and read the landmarks. Click the in-page links. If those work and the outline is honest, the page is doing the HTML job. Colour and columns begin with CSS next week.",
          },
          {
            problem: "The footer, the menu, and the form all ended up inside main, or I have two mains.",
            why: "The wrapper was placed around the whole body, or main was copied into a section. The landmark list then no longer matches the page regions.",
            solution:
              "Keep one main. Move the header above it and the footer below it so the three are siblings inside the body. Put the form in a section inside main. Reload and search the source for the main tag. It should appear once.",
          },
          {
            problem: "A screen-reader user, or the heading list, shows a confusing outline.",
            why: "Heading levels were chosen for size, a section has no heading, or an article was wrapped around every paragraph.",
            solution:
              "Give the page one h1. Use h2 for sections and h3 inside them. Remove article from ordinary paragraphs. Keep article for a piece that stands alone. Read the headings from top to bottom before you add more tags.",
          },
        ],
        knowledgeChecks: [
          {
            id: "w3s6-main",
            question: "Where should the page's single main element sit?",
            format: "Multiple choice",
            options: [
              "Inside the header, so the title and the content share one box",
              "As a sibling of header and footer, wrapping the primary content",
              "Inside the footer, so it is always last",
              "Around the whole body, including the header and the footer",
            ],
          },
          {
            id: "w3s6-article",
            question: "An article is any block of text you consider important.",
            format: "True or false",
            options: ["True", "False"],
          },
          {
            id: "w3s6-div",
            question: "When is a div still a reasonable choice?",
            format: "Multiple choice",
            options: [
              "When you need the page header and do not want to type header",
              "When no meaningful element names the group",
              "When you want a footer colour",
              "When you need a form label",
            ],
          },
          {
            id: "w3s6-hash",
            question: "Why does an in-page menu link need a # before the id?",
            format: "Short answer",
          },
        ],
        homework: {
          description:
            "The graded work is the week assignment: a contact page with semantic regions and a working form. Build it in your own words and submit it through the assignment. This lesson box is not the submission.",
          requirements: [
            "Build the assignment page as a complete HTML document in learning/week-03.",
            "Include header, nav, main, sections, an article, an aside, a footer, and a labelled form.",
            "Check the in-page links and the form in a browser before you submit.",
          ],
          deliverables: [
            "The week assignment submission, with the path to your HTML file and a sentence about how you checked the links and the form.",
          ],
          submission:
            "Open the week assignment from this lesson and submit there. Follow its requirements and rubric. Do not paste only a screenshot into this lesson box.",
          criteria: [
            "The assignment rubric is the mark scheme.",
            "The page opens from your week-03 folder, the menu jumps work, and the form controls are labelled.",
          ],
          submissionKind: "module_assignment",
        },
        summary: [
          "Semantic HTML names what a region is. header, nav, main, section, article, aside, and footer are those names. A div remains the group with no special meaning.",
          "Use one main between the header and the footer. Navigation links on the same page use a # and a matching unique id.",
          "A section is a topic. An article can stand alone. An aside is related but off the main thread. The contact form belongs in main, not in the footer, when contact is the point.",
          "Language, heading order, labels, honest link text, and landmarks are the accessibility habits you can practise now. These elements do not paint the page. CSS is next.",
        ],
        nextLesson: {
          title: "Introduction to CSS",
          why: "The page structure is in place. Next you will change colour, type, and background without throwing away the meaning of the elements.",
          lessonSlug: "introduction-to-css",
        },
      },
      guide: {
        sessionNumber: 6,
        week: 3,
        title: "Semantic HTML",
        durationMinutes: 90,
        objectives: [
          "Students can replace a div outline with header, nav, main, and footer and say what each region is for.",
          "Students can justify one article and one aside on their page.",
          "Students' menu links jump to unique ids.",
          "Students know the week assignment is a contact page that includes a form.",
        ],
        tools: [
          "Editor and browser, with a week-03 folder already created",
          "A short div-only page ready to convert on the projector",
          "The assignment brief open for the last part of the session",
          "A student's form from the previous session, or the registration example, to drop into a contact section",
        ],
        preparation: [
          "Prepare library.html up to the header only, so the live build continues a valid document.",
          "Prepare a second file made only of div elements with the same sentences, so you can show that the look barely changes when the tags change.",
          "Click through #about, #visit, and #contact on the projector once before class. Break one id on a copy so you can repair a failed jump.",
          "Read the assignment rubric and decide what counts as a public topic if a student starts to type a home address.",
        ],
        flow: [
          {
            minutes: 5,
            title: "The div page and the newspaper",
            detail:
              "Show the div-only page and ask a student to find the menu without reading every word. Then say HTML has names for the masthead, the contents, the story, a related note, and the closing line. Tell the room the page will stay plain on purpose and that plain is not a failed design.",
          },
          {
            minutes: 15,
            title: "Header, nav, main, and a broken jump",
            detail:
              "Convert the top div to header, add nav with three links, and add main. Click a link before the id exists so the room sees the failure. Add the matching id and click again. State the rule: one main, not wrapped around the header. Keep the h1 in the header and use h2 inside main.",
          },
          {
            minutes: 20,
            title: "Article, aside, footer, and the form",
            detail:
              "Add one article that can be read aloud alone, and one aside that is clearly a side note. Ask the room which test you used. Add the footer after main. Move last session's form into the contact section and click its label so nobody thinks landmarks replace labels. Submit once with a practice email.",
          },
          {
            minutes: 30,
            title: "Students build a three-part page",
            detail:
              "Each student builds a page about a public place or club in learning/week-03. Require one h1, working jumps, one article, one aside, and a labelled form. Circulate with a card that says: one main, heading order, hash plus id, label click. If someone nests the footer inside main, fix the siblings on their screen and have them click the menu again.",
          },
          {
            minutes: 10,
            title: "Knowledge checks on structure",
            detail:
              "Ask where main sits, what article means, when a div is still honest, and why the hash exists. Take the answers from the projected source, not from memory alone. If a heading list skips from h1 to h4, repair that page before you talk about CSS.",
          },
          {
            minutes: 10,
            title: "Assignment: contact page",
            detail:
              "Open the week assignment and read the requirements for regions, form fields, original words, and the path learning/week-03/contact.html. Say the lesson response from last session is a different submission. Show that a screenshot without source cannot prove the landmarks. Preview CSS as colour and type, not as a replacement for this structure.",
          },
        ],
        explain: [
          "Semantic elements name roles. They do not theme the page.",
          "One main sits between one header and one footer. Nav is for the menu, not for every link on the internet.",
          "Section is a topic, article stands alone, aside is related but off to the side.",
          "Accessibility habits you can finish today are language, headings, labels, link text, and landmarks.",
        ],
        questions: [
          "What changed on screen when the div became a header, and what changed in the source?",
          "Why is the Saturday blurb an article and the notebook line an aside?",
          "What does the browser look for when href has no #?",
          "Why is the contact form inside main rather than inside the footer?",
        ],
        demonstration:
          "Convert a div page live, break one in-page link, and repair it. Then place a small form inside the contact section and prove the label still works. Keep both files in learning/week-03 and say the path when you save.",
        practice:
          "Students build their own three-part page and test every menu link. Look for one main, honest headings, and a form with connected labels. Do not let a finished-looking plain page skip the click test.",
        expectedOutcomes: [
          "Each student has a local page whose menu jumps to three sections.",
          "Students can defend one article and one aside in a sentence each.",
          "Students can find the assignment and name contact.html as the file they will submit.",
        ],
        difficulties: [
          {
            issue: "A student wraps everything in article because the word sounds important.",
            help: "Read one block aloud and ask if it needs the rest of the page. If it does, change it to a section or a paragraph. Leave a single article that survives the test.",
          },
          {
            issue: "A student is discouraged because the semantic page looks plain.",
            help: "Agree that it looks plain. Open the source and the div version side by side. The win is the element names and the working jumps. Tell them colour starts next week and will target these elements.",
          },
          {
            issue: "A student puts a home address or phone number in the contact section.",
            help: "Stop and replace it with a public place and the practice form. Explain that the form collects a message. It does not need to publish their private contact details to the class.",
          },
        ],
        homework:
          "Point to the module assignment as the only submission for this session. It is a contact page with semantic regions and a form, saved under learning/week-03. Last session's lesson response stays a separate piece of work.",
        assessment:
          "Knowledge checks plus a click-through of the three menu links and one label. The grade lives in the assignment rubric. Do not mark the page on decoration.",
        recap:
          "Ask three students for one element and its job: nav, article, and footer. End by saying a div is still allowed when no job name fits, and that the next session will style this structure with CSS.",
        knowledgeCheckAnswers: [
          {
            id: "w3s6-main",
            answer: "As a sibling of header and footer, wrapping the primary content",
            explanation:
              "One main holds the primary content. It should not swallow the header and footer or sit inside them.",
          },
          {
            id: "w3s6-article",
            answer: "False",
            explanation:
              "Article means the piece can stand alone. Importance is not the definition. A short ordinary notice can be an article, and an important paragraph might not be.",
          },
          {
            id: "w3s6-div",
            answer: "When no meaningful element names the group",
            explanation:
              "A division is honest when header, main, section, and the other named elements do not fit. It is not a stand-in for those elements, and it does not colour the footer.",
          },
          {
            id: "w3s6-hash",
            answer:
              "The # tells the browser to find an id on this page. Without it, the browser looks for a file or address with that name.",
            explanation:
              "Accept an answer that distinguishes an in-page id from a new file. They should mention that the id itself does not include the hash.",
          },
        ],
      },
    },
  ],
  assignment: {
    slug: "week-03-assignment",
    title: "Contact page with a form",
    summary:
      "Build a contact page that uses semantic regions and a labelled form a classmate can fill in with practice information.",
    instructions: `
Create a contact page and save it as learning/week-03/contact.html. It must be a complete HTML document: a doctype, an html element with a language, a head with a character set and a title, and a body.

Choose a public topic you can describe in class, such as a library workshop, a club, a park group, or a class. Write the sentences yourself. Do not publish a home address, a private phone number, or anyone else's personal data.

The body must include a header, one main, and a footer as separate regions. The header contains one h1 and a nav. The nav is a list of links to at least three sections on the same page. Each link uses a # and matches a unique id. Inside main, include at least three sections with headings in order. Include one article for a piece that still makes sense alone, and one aside for a related note. The footer closes the page and does not contain the form.

One section is the contact section. It contains a form with method get and an action that reloads contact.html. Include a text field for a name, an email field, one choice control (a radio group, a checkbox, or a select), a textarea, and a submit button inside the form. Connect every control to a label. Use required on the name and the email. Use your own button text, such as Send message.

Open the file in a browser. Click each menu link. Click each label. Submit the form empty, then submit it with practice data and confirm the field names appear in the address. In your submission, write the path learning/week-03/contact.html and two or three sentences about those checks. Do not spend this assignment on colours or layout. We are marking the HTML structure and the form.
`,
    objectives: [
      "Structure a page with header, nav, main, sections, an article, an aside, and a footer.",
      "Connect in-page navigation to unique section ids.",
      "Collect a practice message with a labelled, checked form.",
    ],
    requirements: [
      "The file is a complete HTML document saved at learning/week-03/contact.html.",
      "Header, nav, one main, and footer are present, and main is not wrapped around the header or footer.",
      "At least three sections have an honest heading order, and the page includes one article and one aside.",
      "Menu links use a # and land on matching unique ids.",
      "The contact form has connected labels, a name field, an email field, a choice control, a textarea, required on the name and email, and a submit button inside the form.",
      "The writing is original, the checks were done in a browser, and private personal data is absent.",
    ],
    deliverables: [
      "learning/week-03/contact.html.",
      "A short note naming the path and how you checked the menu links and the form.",
    ],
    rubric: [
      {
        criterion: "Document and landmarks",
        points: 20,
        description:
          "The file opens as a page and uses one header, one nav, one main, and a footer in a sensible order.",
      },
      {
        criterion: "Sections, article, and aside",
        points: 20,
        description:
          "Main contains real sections with headings in order, one self-contained article, and one related aside.",
      },
      {
        criterion: "In-page navigation",
        points: 15,
        description:
          "Each menu link includes a hash and moves to a unique matching id.",
      },
      {
        criterion: "Form controls and labels",
        points: 25,
        description:
          "Name, email, a choice, and a textarea are labelled, the button submits, and required is present on the name and email.",
      },
      {
        criterion: "Checks and care",
        points: 20,
        description:
          "The note shows a browser check, the words are the student's, and private data is absent.",
      },
    ],
    points: 100,
    instructorSolution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Contact North Library Workshop</title>
</head>
<body>
  <header>
    <h1>North Library Workshop</h1>
    <nav>
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#sessions">Sessions</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <section id="about">
      <h2>About</h2>
      <p>The workshop helps beginners practise a single webpage in the reading room.</p>
    </section>
    <section id="sessions">
      <h2>Sessions</h2>
      <article>
        <h3>Saturday introduction</h3>
        <p>The Saturday session starts at ten and works through a small contact page.</p>
      </article>
      <aside>
        <h3>What to carry</h3>
        <p>Bring a notebook. The room has power sockets and no spare paper.</p>
      </aside>
    </section>
    <section id="contact">
      <h2>Contact</h2>
      <form action="contact.html" method="get">
        <p>
          <label for="full-name">Full name</label>
          <input id="full-name" name="full-name" type="text" required>
        </p>
        <p>
          <label for="email">Email</label>
          <input id="email" name="email" type="email" required>
        </p>
        <fieldset>
          <legend>Preferred session</legend>
          <p>
            <input id="day-saturday" name="session-day" type="radio" value="saturday" required>
            <label for="day-saturday">Saturday</label>
          </p>
          <p>
            <input id="day-sunday" name="session-day" type="radio" value="sunday">
            <label for="day-sunday">Sunday</label>
          </p>
        </fieldset>
        <p>
          <label for="note">Message</label>
          <textarea id="note" name="note" rows="4" cols="40"></textarea>
        </p>
        <p>
          <button type="submit">Send message</button>
        </p>
      </form>
    </section>
  </main>
  <footer>
    <p>North Library Workshop. A practice page for class.</p>
  </footer>
</body>
</html>

This solution is a full-mark shape: landmarks are siblings, three sections use h2, the article and aside use h3, the menu hashes match the ids, and the form labels match the controls. A get submit shows full-name, email, and session-day in the address. Do not award the form points if the button is outside the form or if for and id differ. Do not award landmark points for div elements that only have class names. Plain appearance should not lose marks. Private phone numbers or home addresses should be removed before marking, not rewarded.
`,
  },
  quiz: {
    slug: "week-03-quiz",
    title: "Week 3 quiz: forms and semantic HTML",
    passingScore: 70,
    allowRetakes: true,
    questions: [
      {
        slug: "w3-q1-label",
        type: "multiple_choice",
        prompt: "What connects a label to a specific control when they are separate elements?",
        options: [
          { id: "a", text: "The label's for value matches the control's id" },
          { id: "b", text: "The control sits somewhere below the heading" },
          { id: "c", text: "The button text repeats the label" },
          { id: "d", text: "The footer comes after main" },
        ],
        correct: { optionId: "a" },
        explanation:
          "for and id are the connection. Position, button text, and the footer do not tell the browser which field the label names.",
        points: 1,
      },
      {
        slug: "w3-q2-radio",
        type: "multiple_choice",
        prompt: "You want the person to pick only one session time. What should the radio inputs share?",
        options: [
          { id: "a", text: "A different name on each radio" },
          { id: "b", text: "The same name, with a different value on each" },
          { id: "c", text: "One textarea" },
          { id: "d", text: "The footer element" },
        ],
        correct: { optionId: "b" },
        explanation:
          "A shared name makes the radios one group so only one stays selected. Different values keep the answers distinct.",
        points: 1,
      },
      {
        slug: "w3-q3-password",
        type: "true_false",
        prompt: "A password input in a method get form hides the value so it never appears in the address bar.",
        correct: { value: false },
        explanation:
          "The password type hides characters while typing. A get submit still places the value in the address, so a real password does not belong in this class exercise.",
        points: 1,
      },
      {
        slug: "w3-q4-select",
        type: "multiple_choice",
        prompt: "Why does a required select in this course start with an option whose value is empty?",
        options: [
          { id: "a", text: "So the list looks shorter" },
          { id: "b", text: "So a person can submit without choosing, which required will accept" },
          { id: "c", text: "So there is a missing value for required to refuse" },
          { id: "d", text: "So the select becomes a textarea" },
        ],
        correct: { optionId: "c" },
        explanation:
          "A select always shows some option. An empty first value gives the browser a not-yet-chosen state that required can block.",
        points: 1,
      },
      {
        slug: "w3-q5-main",
        type: "true_false",
        prompt: "A page should use one main element, and that element should not wrap the header and the footer.",
        correct: { value: true },
        explanation:
          "Main is the primary content. Header and footer are separate landmarks. Wrapping the whole body in main removes that separation.",
        points: 1,
      },
      {
        slug: "w3-q6-article",
        type: "multiple_choice",
        prompt: "Which block is the best use of an article element?",
        options: [
          { id: "a", text: "Every paragraph on the page, because all of the words matter" },
          { id: "b", text: "A session description that still makes sense if it is read by itself" },
          { id: "c", text: "The page's main navigation list" },
          { id: "d", text: "The html element" },
        ],
        correct: { optionId: "b" },
        explanation:
          "Article is for a self-contained piece. Navigation belongs in nav, and ordinary paragraphs do not each need their own article.",
        points: 1,
      },
      {
        slug: "w3-q7-read",
        type: "code_reading",
        prompt: "What happens when someone clicks the word Email in this fragment?",
        codeSnippet: `<label for="mail">Email</label>
<input id="email" name="email" type="email" required>`,
        options: [
          { id: "a", text: "The email field is focused, because the label is above the input" },
          { id: "b", text: "The field is not focused by the label, because for and id do not match" },
          { id: "c", text: "The browser sends the form immediately" },
          { id: "d", text: "The word Email becomes the page's h1" },
        ],
        correct: { optionId: "b" },
        explanation:
          "The label points at mail and the input's id is email. Those strings differ, so the click connection fails even though the elements are neighbours.",
        points: 2,
      },
      {
        slug: "w3-q8-hash",
        type: "multiple_choice",
        prompt: "A navigation link should jump to the contact section on the same page. Which href is correct if the section id is contact?",
        options: [
          { id: "a", text: "contact" },
          { id: "b", text: "#contact" },
          { id: "c", text: "id=contact" },
          { id: "d", text: "mailto:contact" },
        ],
        correct: { optionId: "b" },
        explanation:
          "The hash says the target is an id on this page. Without it, the browser looks for a file named contact. mailto would start an email link instead.",
        points: 1,
      },
      {
        slug: "w3-q9-why",
        type: "short_answer",
        prompt:
          "In two or three sentences, explain why a contact page should use a header, a main, and a footer instead of three div elements with the same text.",
        correct: {
          rubric:
            "Award full points if the answer says the named elements describe the regions so people and assistive tools can tell the introduction, the primary content, and the closing apart. Partial points if they only say the page looks better or that div is illegal. A div is allowed when no named element fits.",
        },
        explanation:
          "Header, main, and footer are landmarks with meaning. Divisions would show the same words and would not name those jobs for assistive tools or for the next person editing the file.",
        points: 2,
      },
    ],
  },
};
