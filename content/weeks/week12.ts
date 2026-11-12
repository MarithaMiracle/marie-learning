import type { ModuleSeed } from "../../src/lib/content-types";

function md(text: string): string {
  const cleaned = text.replaceAll("¬", "`");
  const lines = cleaned.replace(/^\n/, "").replace(/\n\s*$/, "").split("\n");
  const indents = lines
    .filter((line) => line.trim().length > 0)
    .map((line) => line.match(/^ */)?.[0].length ?? 0);
  const margin = indents.length === 0 ? 0 : Math.min(...indents);
  return lines
    .map((line) => (line.length >= margin ? line.slice(margin) : line.trim()))
    .join("\n")
    .trim();
}

export const week12: ModuleSeed = {
  slug: "week-12-react-state",
  number: 12,
  weekNumber: 12,
  monthLabel: "Month 3 — Web interactivity, Git and React",
  title: "React fundamentals",
  description:
    "Pass information into components with props, remember clicks with state, and build a task list that can add, complete, and delete tasks from a form.",
  lessons: [
    {
      slug: "props-state-events",
      sessionNumber: 23,
      title: "Props, state, and events",
      estimatedMinutes: 90,
      difficulty: "Guided practice",
      requiresOs: true,
      content: {
        overview: {
          about:
            "This lesson shows how a React component receives information through props, remembers a changing value with useState, and responds to a click. You will render one profile twice with different details, and you will build a counter that updates the screen when a button is clicked.",
          why: "A component that can only show words baked into its file has to be copied for every new person or every new click. Props and state let one component show different information and react when that information changes.",
          alreadyKnow:
            "You can create a Vite React TypeScript app, return JSX from a component, and use curly braces to show a variable.",
        },
        objectives: [
          "Explain a prop as information a parent component passes into a child component.",
          "Pass a name and a city into one profile component and render that component twice.",
          "Store a number with useState and change it when a button is clicked.",
          "Describe a re-render as React calling the component again after state changes.",
          "Tell a click handler that is passed to onClick from a call that runs during render.",
        ],
        prerequisites: [
          {
            label: "React components, JSX, and a Vite project started with npm.",
            lessonSlug: "react-components",
          },
        ],
        teachingNotes: [
          {
            heading: "Props pass information in",
            markdown: md(`
              A prop is a piece of information a parent component passes into a child component. The parent is the component that uses the other one. The child is the component that gets used. When App contains a Profile tag, App is the parent and Profile is the child. The words written on that tag are the props.

              Props exist so one component can be used more than once. Last week the profile stored a name inside its own function. A second person meant a second copy of that function. The layout was the same. Only the information changed. Copying the function solves the second person today and becomes a mess by the fourth person. Props keep the layout in one place and let the parent supply the information.

              Picture a blank name badge at a library desk. The badge shape is printed once. The person at the desk writes a different name on each badge. The badge is the component. The writing is the prop. You do not design a new badge for every visitor. You pass a new name into the same badge.

              ### From the tag to the function

              In JSX, a prop looks like an HTML attribute. Quotes pass text. Curly braces pass a JavaScript value. ¬name="Ada"¬ passes the string Ada. ¬name={personName}¬ passes whatever string is stored in personName. Those braces are the same door you used to show a variable in JSX. Here they hand a value to another component.

              Profile receives the props as one argument. You can call that argument props and read ¬props.name¬. You can also pull the fields out by name, which is called destructuring. Destructuring means taking named fields out of an object. The props object is the object.

              ¬¬¬tsx
              type ProfileProps = {
                name: string;
                city: string;
              };

              function Profile({ name, city }: ProfileProps) {
                return (
                  <section>
                    <h2>{name}</h2>
                    <p>{city}</p>
                  </section>
                );
              }
              ¬¬¬

              ProfileProps is a type alias, the same kind of label you wrote for an object last week. TypeScript checks every Profile tag against it. A missing city, or a number passed where a string is required, is reported in the editor. The page is not the first place you hear about the mistake.

              :::misunderstanding The child owns the words on the screen
              The child displays the words. The parent chooses which words to send. A new string in the Profile tag is what changes the badge. Writing a fixed name inside Profile, and never reading the props, returns you to a component that can show only one person.
              :::

              A child reads props for the current render. It does not keep a private copy that ignores the parent. When the parent renders again and passes a new city, the child shows that city. Later, when a list lives in a parent, this is how each row hears about the task it should show.
            `),
          },
          {
            heading: "One profile, two people",
            markdown: md(`
              Passing information means the parent writes the values at the point of use. The child stays general. App can render Profile twice. Each tag carries its own name and city. React calls Profile once for the first tag and again for the second tag. Each call receives its own props.

              ¬¬¬tsx
              function App() {
                return (
                  <main>
                    <h1>Saturday desk</h1>
                    <Profile name="Ada" city="Lagos" />
                    <Profile name="Chidi" city="Enugu" />
                  </main>
                );
              }
              ¬¬¬

              The first call has name Ada and city Lagos. The second call has name Chidi and city Enugu. Nothing inside Profile says which person is which. That is the point. Profile is a pattern. App fills it in.

              You can also pass a variable. ¬const city = "Lagos"¬ and then ¬city={city}¬ uses the variable. The quotes form is enough when the words are fixed in App. The braces form is what you will need when the value comes from state.

              ### What the child is allowed to do with a prop

              The child may read a prop and show it. The child should leave the prop itself alone. Writing ¬name = "Someone else"¬ inside Profile does not change the tag in App, and it does not ask React to paint a new screen. Props are the input for this render. A value that must change because of a click belongs in state, which is the next idea.

              If Profile needs a heading, a paragraph, and a small note, return them inside one parent element such as section. That rule from the component lesson still holds. Props do not remove it.

              Export the component and import it in App with a path that starts with ¬./¬ when the file sits in the same folder. The filename in this course matches the component: ¬src/Profile.tsx¬. The project path is ¬learning/week-12¬.

              :::example Two badges, one printer
              App is the printer. Profile is the badge design. Ada from Lagos and Chidi from Enugu are two passes through the same design. Refresh the browser after you save. You should see both people, in that order, under the heading.
              :::

              :::warning A missing prop is a type error
              If the Profile tag has a name and no city, TypeScript can mark the tag before you open the browser. Read the message. It names the prop that was not passed. Add the prop. Do not silence the message by deleting the type.
              :::
            `),
          },
          {
            heading: "State remembers a change",
            markdown: md(`
              State is information a component remembers between renders. A render is one run of the component function. React calls that function to learn what the screen should show. After the function returns, the local variables inside it are gone. The next click cannot see them unless the information was stored as state.

              Imagine a scoreboard at a match. The number the crowd can see is on the board. A note in your pocket is private. If you write "4" in the pocket and never change the board, the crowd still sees the old number. A normal variable is the pocket note. State is the board. The setter is the action of changing the board.

              useState is the React function that creates one piece of state. A function from React whose name starts with "use" is called a hook. useState is the hook for memory. Import it from React, then call it at the top of the component:

              ¬¬¬tsx
              import { useState } from "react";

              function Counter() {
                const [count, setCount] = useState(0);
                return <p>Count: {count}</p>;
              }
              ¬¬¬

              The call returns a pair. The square brackets pull the pair apart. The first item, count, is the current value. The second item, setCount, is the setter, the function that asks React to store a new value. The names are yours. The usual pattern is the value name, then "set" plus that name.

              The 0 in useState(0) is the initial value. React uses it on the first render only. After that, React keeps whatever the setter stored. A common mix-up is to think useState(0) resets the counter every time the function runs. It does not. The function runs again on every update, and useState returns the remembered number, not a fresh 0.

              ### Where to call useState

              Call useState at the top level of the component, in the same order, on every run. Do not put it inside an if or a loop. React matches each useState call to a memory slot by the order of the calls. If a call is skipped on some renders, the slots can attach to the wrong values. Keep the calls unconditional and in a steady order.

              State belongs to that component instance. Two Counter tags on one page each have their own count. They do not share a pocket. Props can still pass a starting idea in, but the remembered number lives with the component that called useState.

              :::misunderstanding A let variable is enough for a counter
              let count = 0 creates a new 0 every time Counter runs. Adding 1 changes that local number and then the function ends. The next run starts at 0 again. The screen has no memory of the click. useState is what keeps the number after the function returns.
              :::

              You already know that a function's local variables disappear when the function finishes. Components are functions. State is the extra memory React keeps for them, because the screen needs to remember a click after the function has returned.
            `),
          },
          {
            heading: "Updating state causes a re-render",
            markdown: md(`
              Updating state means asking React to remember a new value and to run the component again. You do that by calling the setter. ¬setCount(count + 1)¬ computes the next number from the current one and hands it to React. Assigning ¬count = count + 1¬ changes the local binding for this run only. React was not told, so the screen stays as it was.

              A re-render is React calling your component function again after state changes. The function reads the new count, returns new JSX, and React updates the parts of the page that changed. You describe the screen. React applies the description. You do not search the document for a paragraph and edit its text, which is what earlier JavaScript lessons did with the DOM by hand.

              The path of one click looks like this:

              1. The person clicks the button.
              2. The handler calls setCount with the next number.
              3. React stores that number and schedules an update.
              4. React calls Counter again.
              5. useState returns the new count, and the initial 0 is not applied again.
              6. The returned JSX includes the new number.
              7. React updates the text in the page.

              The setter does not change the count you are holding in this run. That count stays as it was when the function began. The new number arrives on the next run. If you log count immediately after setCount, you still see the old number. The paragraph on the screen updates after the re-render. That delay surprises people who expect the variable to change in place, the way a let binding does.

              ### Replace values, including later lists

              For a number, the update is a new number. For an object or an array, the same idea means handing React a new object or a new array. This lesson's counter only needs the number. The next lesson will copy an array when a task is added or removed. Practise the habit now: the setter receives the next value. It is not a request to edit the old value quietly.

              There is a form of the setter that receives a function, ¬setCount(function (current) { return current + 1; })¬. It is useful when several updates are stacked. One click that adds one can use ¬setCount(count + 1)¬. You will see the function form in later reading. You do not need it to finish this counter.

              :::warning Refresh starts the memory again
              State lives in the open page. Refresh the browser, or close the tab, and the component starts again from useState(0). The clicks were real. They were not written to a file. That limit matters. The task list in the next lesson has the same limit.
              :::

              :::misunderstanding setCount changes the number before the next line
              setCount schedules the update. The count in the current run stays at the old value. The new value appears when Counter runs again and the paragraph reads count. Look at the page after the click, not at a log on the same line as the setter.
              :::
            `),
          },
          {
            heading: "Click events call a function",
            markdown: md(`
              An event is a signal that something happened, such as a click. An event handler is the function that should run when that signal arrives. In React you pass the handler to a prop whose name starts with "on", such as onClick.

              ¬onClick={handleAdd}¬ passes the function. React keeps it and calls it when the button is clicked. ¬onClick={handleAdd()}¬ calls the function while the component is rendering, and then passes whatever the function returns. A handler that returns nothing passes undefined. The click later has no function to call. If the handler also calls setCount, that update happens during render, which React rejects.

              The parentheses are the whole difference. No parentheses means "here is the function". Parentheses mean "call it now".

              ¬¬¬tsx
              function handleAdd() {
                setCount(count + 1);
              }

              <button type="button" onClick={handleAdd}>
                Add one
              </button>
              ¬¬¬

              type="button" means this button does not submit a form. A button without a type, inside a form, can submit the form. The counter is not inside a form yet. Setting the type keeps the habit clear before the next lesson adds a form.

              ### When the handler needs an argument

              Sometimes the click must carry a value, such as which item was chosen. An arrow function is a function written at the place it is used. ¬onClick={() => setCount(0)}¬ creates a function that the click will call. That inner call can then run setCount(0). The arrow waits. The call inside it does not run during render.

              You already wrote functions with parameters. This is the same idea, with the function created in the JSX because it needs to close over a value from this render. A named function is easier to read when it needs no extra argument. Use a name for Add one. Use an arrow when you must pass an id, which the task list will do.

              The handler can be a function declared inside the component, so it can see count and setCount. It can also be written inline. Keep the body short. If the steps grow, move them into a named function.

              :::example One click, one new number
              Start at 0. Click Add one. The paragraph should show 1. Click again. It should show 2. Each click runs handleAdd, and each run of handleAdd asks for a re-render with a number that is one higher.
              :::

              :::misunderstanding The button label is the handler
              The words Add one are what the person reads. They do not run code. The onClick prop is what connects the click to handleAdd. A button with no onClick is a picture of a button. It can still look correct.
              :::
            `),
          },
          {
            heading: "Build the counter and open the terminal",
            markdown: md(`
              The practice for this session is a profile component and a counter, in a Vite React TypeScript app at ¬learning/week-12¬. Profile receives name and city. App renders it twice. Counter starts at 0 and adds one on each click. The dev server has to be running or the browser has nothing to show.

              If ¬learning/week-12¬ does not exist yet, create it from the parent folder of ¬learning¬:

              ¬¬¬bash
              npm create vite@latest week-12 -- --template react-ts
              cd week-12
              npm install
              npm run dev
              ¬¬¬

              Read the pieces. ¬npm create vite@latest¬ runs the Vite starter. ¬week-12¬ is the new folder name. The standalone ¬--¬ sends the later flags to the starter. ¬--template react-ts¬ chooses React and TypeScript. If the tool still asks, choose React and TypeScript. ¬npm install¬ downloads the packages listed in package.json into node_modules. ¬npm run dev¬ starts the local server and prints an address, often http://localhost:5173. Open the address it prints. Leave that terminal running. Stop the server later with Control-C. On a Mac, Control-C is the Control key. Command-C copies text and leaves the server running.

              ### Open a terminal, then run npm

              On Windows, press the Windows key, type PowerShell, and open Windows PowerShell. You can also open the Start menu and click Windows PowerShell. In that window, run ¬npm --version¬. If PowerShell does not recognise npm, install the Node.js LTS installer from nodejs.org, close the window, open a new PowerShell, and try again. Then use cd to reach the parent of learning and run the npm commands above.

              On macOS, press Command-Space, type Terminal, and press Return. You can also open Finder, go to Applications, open Utilities, and open Terminal. Run ¬npm --version¬. If the command is missing, install the macOS LTS package from nodejs.org, open a new Terminal window, and try again. Then run the same npm create, npm install, and npm run dev commands.

              On Linux, open Terminal. On Ubuntu, Ctrl-Alt-T opens it, and Activities can search for Terminal. On other distributions, start Terminal from the application menu. Run ¬npm --version¬. If npm is missing, install Node.js LTS. On Ubuntu, ¬sudo apt update¬ and ¬sudo apt install nodejs npm¬ are a common start. If that Node is too old for Vite, use the Linux steps on nodejs.org, then open a new terminal. After Node works, the npm commands match the other systems.

              If you are unsure of the system, use the signs on the screen. A Start menu and a taskbar mean Windows and PowerShell. An Apple menu means macOS and Terminal. An Ubuntu or other Linux desktop means the programme named Terminal.

              ### Wire the two components

              Replace the sample in ¬src/App.tsx¬. Remove unused sample imports, including a CSS import you no longer use. Keep ¬export default¬. Leave ¬src/main.tsx¬ in place, including StrictMode. StrictMode is a development helper. It may run a component twice in development, so a log can appear twice. The button should still add one per click. Do not delete StrictMode to chase a double log.

              Save the files. Vite reloads the page. The browser should show two profiles and a counter. The Vite sample logos should be gone. If the terminal prints an error, read the file name and the line. A missing export, a file named .ts while it contains JSX, or an onClick that calls the handler immediately are the usual stops.

              :::tip One terminal stays busy
              The window that ran npm run dev will not show a fresh prompt. That is the server working. Open a second PowerShell, Terminal, or Linux terminal if you need to type another command. Closing the server window stops the page.
              :::
            `),
          },
        ],
        vocabulary: [
          {
            term: "Prop",
            definition:
              "Information a parent component passes into a child component through the JSX tag, such as a name or a city.",
          },
          {
            term: "Parent component",
            definition:
              "The component that renders another component and decides which props to pass into it.",
          },
          {
            term: "State",
            definition:
              "Information a component remembers between renders, kept by React rather than by an ordinary local variable.",
          },
          {
            term: "useState",
            definition:
              "The React hook that creates one piece of state and returns the current value together with a function that updates it.",
          },
          {
            term: "Re-render",
            definition:
              "React calling a component function again after state changes, so the returned JSX can describe the new screen.",
          },
          {
            term: "Event handler",
            definition:
              "A function React calls when an event happens, such as a click. It is passed to a prop such as onClick.",
          },
          {
            term: "Setter",
            definition:
              "The function from useState that asks React to store a new value and render the component again.",
          },
        ],
        demonstrations: [
          {
            title: "Open a terminal and start the Vite app",
            intro:
              "You will open a terminal on your system, confirm that npm runs, and create learning/week-12 with the React TypeScript template. If that folder already exists, skip the create command and start the server.",
            steps: [
              "Look at the desktop and decide whether you are on Windows, macOS, or Linux.",
              "Open a terminal using the steps for that system: PowerShell, Terminal, or the Linux terminal.",
              "Run npm --version. If npm is missing, install Node.js LTS and open a new terminal before you try again.",
              "Move into the parent folder of learning. Create the learning folder first if it is not there.",
              "Run npm create vite@latest week-12 -- --template react-ts.",
              "Change into learning/week-12 and run npm install. Wait until it finishes.",
              "Run npm run dev and read the local address the terminal prints.",
              "Open that address in a browser. Leave this terminal running.",
            ],
            expected:
              "npm --version prints a version. The browser shows the Vite React sample at a localhost address, and the terminal stays busy with the dev server.",
            verify:
              "package.json in learning/week-12 lists react and typescript. Refreshing the browser still loads the page while npm run dev is running.",
            ifItFails:
              "If npm is not recognised, open a new terminal after installing Node. If week-12 already exists and is not empty, use that folder and run npm install and npm run dev inside it. If the template is plain React, create the folder again with react-ts.",
            os: {
              sameOnAllPlatforms:
                "After npm --version works, the project commands are the same: npm create vite@latest week-12 -- --template react-ts, then cd week-12, npm install, and npm run dev.",
              identify: [
                "A Start menu and a taskbar mean Windows. Open Windows PowerShell.",
                "An Apple menu at the top left means macOS. Open Terminal.",
                "An Ubuntu or other Linux desktop means the programme named Terminal. On Ubuntu, Ctrl-Alt-T opens it.",
              ],
              windows: [
                "Press the Windows key, type PowerShell, and open Windows PowerShell. You can also open the Start menu and click Windows PowerShell.",
                "In that window, run npm --version. If PowerShell does not recognise npm, install the Node.js LTS installer from nodejs.org, close PowerShell, open a new one, and run npm --version again.",
                "Use cd to reach the parent of learning, then run npm create, npm install, and npm run dev for learning/week-12. Get-Location should end in week-12 before npm install.",
              ],
              macos: [
                "Press Command-Space, type Terminal, and press Return. You can also open Finder, choose Applications, open Utilities, and double-click Terminal.",
                "Run npm --version. If the command is missing, install the Node.js LTS package for macOS from nodejs.org, quit Terminal, open a new window, and run npm --version again.",
                "cd to the parent of learning and run npm create, npm install, and npm run dev. Stop the server later with Control-C. Command-C copies text and leaves the server running.",
              ],
              linux: [
                "On Ubuntu, press Ctrl-Alt-T to open Terminal, or search for Terminal in Activities. On other distributions, open the application menu and start Terminal.",
                "Run npm --version. If npm is missing, install Node.js LTS. On Ubuntu you can run sudo apt update and sudo apt install nodejs npm. If that Node is too old for Vite, use the Linux steps on nodejs.org and open a new terminal.",
                "From the parent of learning, run the same npm create, npm install, and npm run dev commands as on the other systems.",
              ],
            },
          },
          {
            title: "Add a profile and a counter",
            intro:
              "With the dev server still running, you will replace the sample page with two Profile components and a Counter that adds one on each click.",
            steps: [
              "Open learning/week-12 in the editor. Keep the first terminal on npm run dev.",
              "Add src/Profile.tsx with a typed name and city, and show both values in JSX.",
              "Add src/Counter.tsx that calls useState(0) and adds one in a click handler.",
              "Pass the handler to onClick without calling it during render. Set the button type to button.",
              "Render two Profile tags, with different names and cities, and one Counter inside App.",
              "Remove unused sample imports from App.tsx and save every file.",
              "Read the browser. Confirm both people and a count that grows when you click.",
              "Click three times and confirm the paragraph shows 3.",
            ],
            expected:
              "The localhost page shows two profiles and a counter. Three clicks change the count from 0 to 3. The Vite sample content is gone.",
            verify:
              "The Elements panel contains both names and the current count. The terminal running npm run dev shows no new compile error after the save.",
            ifItFails:
              "If the count changes as soon as the page loads, the handler is being called during render. Pass the function without parentheses. If the page is blank, start npm run dev again from learning/week-12.",
            os: {
              sameOnAllPlatforms:
                "The component code is the same on every system. Keep npm run dev running, and open a second terminal if you need a free prompt.",
              windows: [
                "If the first Windows PowerShell is busy with the server, open a second PowerShell from the Start menu.",
                "Open learning/week-12 from File Explorer in the editor. The path uses learning/week-12, not a machine-specific folder name.",
              ],
              macos: [
                "If the first Terminal is busy, open another Terminal window. Use Control-C, not Command-C, only when you mean to stop the server.",
                "Open learning/week-12 from Finder. The component files go in src inside that project.",
              ],
              linux: [
                "If the first terminal is busy with npm run dev, open another terminal window or tab from the application menu.",
                "On Ubuntu and on other distributions, the editor still points at learning/week-12 and npm run dev is the command that serves the page.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "A profile that receives props",
            filename: "src/Profile.tsx",
            language: "tsx",
            level: "basic",
            code: md(`
              type ProfileProps = {
                name: string;
                city: string;
              };

              function Profile({ name, city }: ProfileProps) {
                return (
                  <section>
                    <h2>{name}</h2>
                    <p>{city}</p>
                  </section>
                );
              }

              export default Profile;
            `),
            explanation:
              "Profile is reusable because the name and the city arrive as props. App can render the component twice and pass different strings each time. The type alias tells TypeScript both props are strings.",
            lineNotes: [
              {
                focus: "ProfileProps",
                note: "The type alias lists the props. A tag that omits city does not type-check.",
              },
              {
                focus: "Destructuring",
                note: "The parameter pulls name and city out of the props object so the JSX can read them directly.",
              },
              {
                focus: "Curly braces",
                note: "{name} inserts the prop. The word name without braces would show the letters n-a-m-e.",
              },
            ],
            expectedOutput:
              "When App renders Profile twice, the page shows each person's name and city in order.",
          },
          {
            title: "A counter that updates on click",
            filename: "src/Counter.tsx",
            language: "tsx",
            level: "practical",
            code: md(`
              import { useState } from "react";

              function Counter() {
                const [count, setCount] = useState(0);

                function handleAdd() {
                  setCount(count + 1);
                }

                return (
                  <section>
                    <p>Count: {count}</p>
                    <button type="button" onClick={handleAdd}>
                      Add one
                    </button>
                  </section>
                );
              }

              export default Counter;
            `),
            explanation:
              "useState remembers the number. handleAdd asks React to store a number that is one higher. onClick receives the function, so the addition waits for the click. The re-render shows the new count.",
            lineNotes: [
              {
                focus: "useState(0)",
                note: "0 is the starting value on the first render. Later renders receive the remembered count.",
              },
              {
                focus: "setCount(count + 1)",
                note: "The setter schedules a re-render. Assigning to count would not update the page.",
              },
              {
                focus: "onClick={handleAdd}",
                note: "There are no parentheses, so React calls handleAdd on the click rather than during render.",
              },
            ],
            expectedOutput:
              "The page shows Count: 0. Each click on Add one increases the visible number by one.",
          },
        ],
        exercises: [
          {
            title: "Pass two different profiles",
            difficulty: "warm-up",
            prompt:
              "Render Profile twice from App. Pass a different name and city on each tag, using people other than the sample if you wish.",
            steps: [
              "Import Profile into src/App.tsx.",
              "Add two Profile tags inside the returned parent element.",
              "Give each tag its own name and city strings.",
              "Save and read both sections in the browser.",
            ],
            expectedOutcome:
              "The page shows two people. Changing one string in App changes only that profile after you save.",
          },
          {
            title: "Add and remove one",
            difficulty: "practice",
            prompt:
              "Keep Add one, and add a second button that lowers the count by one. Keep the count from going below 0.",
            steps: [
              "Add a named handler beside handleAdd.",
              "In that handler, decide the next number from the current count so it is never less than 0.",
              "Pass the new handler to a second button with type button.",
              "Click Add one twice, then the new button three times, and watch the paragraph.",
            ],
            expectedOutcome:
              "The count rises and falls with the buttons, and it stays at 0 instead of becoming negative.",
          },
          {
            title: "Reset and a third fact",
            difficulty: "stretch",
            prompt:
              "Add a Reset button that returns the count to 0, and add a hobby prop to Profile so each person can show one more fact.",
            steps: [
              "Add a button whose handler calls the setter with 0.",
              "Add hobby to the props type and show it in the profile section.",
              "Pass a hobby string on each Profile tag in App.",
              "Save, reset the counter, and confirm both hobbies are visible.",
            ],
            expectedOutcome:
              "Reset shows 0 again. Each profile shows a name, a city, and a hobby that came in through props.",
          },
        ],
        troubleshooting: [
          {
            problem: "npm is not recognised, or the terminal says npm: command not found.",
            why: "Node.js is missing, or this terminal was opened before the installer updated the command list.",
            solution:
              "Install the LTS build from nodejs.org. On Ubuntu, apt can install nodejs and npm, and a build that is too old for Vite should be replaced from the Linux steps on nodejs.org. Then open a new PowerShell, Terminal, or Linux terminal and run npm --version.",
          },
          {
            problem: "The count jumps as soon as the page loads, or React reports an update during render.",
            why: "onClick={handleAdd()} calls the handler while Counter is rendering. The click prop never receives the function.",
            solution:
              "Write onClick={handleAdd} with no parentheses. If the handler must receive an argument, wrap the call in an arrow function so the call waits for the click.",
          },
          {
            problem: "Clicking Add one leaves the paragraph at 0.",
            why: "The handler is changing a local variable, or the JSX shows a fixed 0 instead of the count from useState.",
            solution:
              "Call setCount(count + 1) inside the handler. In the paragraph, render {count}. Save the file and watch the browser while npm run dev is still running.",
          },
          {
            problem: "The browser cannot open the page, or it still shows the Vite sample.",
            why: "The dev server is stopped, the address is not the one Vite printed, or App still returns the starter content.",
            solution:
              "From learning/week-12, run npm run dev and open the printed address. Replace the sample markup, remove unused imports, and save. Use Control-C when you mean to stop the server.",
          },
        ],
        knowledgeChecks: [
          {
            id: "w12-what-prop",
            format: "Multiple choice",
            question: "What is a prop in this lesson?",
            options: [
              "Information a parent component passes into a child component.",
              "The folder npm creates for downloaded packages.",
              "A CSS file that must be named prop.css.",
              "The command that starts the Vite server.",
            ],
          },
          {
            id: "w12-assign-count",
            format: "True or false",
            question:
              "Writing count = count + 1 inside the click handler updates the number shown on the screen.",
          },
          {
            id: "w12-onclick-call",
            format: "Short answer",
            question: "Why do we write onClick={handleAdd} instead of onClick={handleAdd()}?",
          },
          {
            id: "w12-initial-state",
            format: "Multiple choice",
            question: "When does React use the 0 in useState(0)?",
            options: [
              "As the starting value on the first render.",
              "On every render, which resets the counter.",
              "Only after npm install finishes.",
              "Only when the CSS file is refreshed.",
            ],
          },
        ],
        homework: {
          description:
            "Write a short response about the profile and the counter you built in learning/week-12. Name the props you passed, say what the counter showed after three clicks on Add one, and explain why the setter is required for the number on the screen to change.",
          requirements: [
            "Name the Profile props and the two different pairs of values you passed from App.",
            "Explain what useState stores in the counter and what the setter does when Add one is clicked.",
          ],
          deliverables: [
            "A written response of a few sentences, with the path learning/week-12 and the component file names.",
          ],
          submission:
            "Submit the response on this lesson page. Say whether npm run dev showed both profiles and a count that reached 3.",
          criteria: [
            "The response describes props as information passed from App into Profile.",
            "The click explanation says the setter asks React to render again with the next number.",
          ],
          submissionKind: "lesson_response",
        },
        summary: [
          "A prop is information a parent passes into a child. One Profile component can show two people when App passes different props.",
          "useState remembers a value between renders. The initial value is used on the first render, and the setter stores the next value.",
          "A re-render is React calling the component again so the JSX can show the new state. Assigning a local variable does not do that.",
          "onClick receives a function. Parentheses call the function during render, so a click handler is passed without calling it.",
        ],
        nextLesson: {
          title: "Lists, forms, and tasks",
          lessonSlug: "lists-forms-and-tasks",
          why: "The counter remembers one number. Next you will remember a list, render it, and change it from a form.",
        },
      },
      guide: {
        sessionNumber: 23,
        week: 12,
        title: "Props, state, and events",
        durationMinutes: 90,
        objectives: [
          "Students can point at a Profile tag and name the props it passes.",
          "Students can explain why setCount is required for the screen to change.",
          "Each running app shows two profiles and a counter that adds one on click.",
        ],
        tools: [
          "Node.js LTS and npm",
          "A terminal: Windows PowerShell, macOS Terminal, or a Linux terminal",
          "Visual Studio Code",
          "A browser for the localhost address",
        ],
        preparation: [
          "Create a Vite react-ts app at learning/week-12 before class so you know whether the current starter asks extra questions. Delete it and create it live if the room network is reliable.",
          "Prepare two profile examples, Ada in Lagos and Chidi in Enugu, and a counter that starts at 0 and adds one.",
          "Keep the Node.js LTS install pages ready for Windows and macOS, and the apt commands ready for Ubuntu, including the note that other Linux distributions use their own package manager.",
        ],
        flow: [
          {
            minutes: 5,
            title: "Two badges",
            detail:
              "Hold up the idea of two library badges with different names and cities. Say both badges can come from one Profile function if App passes the name and the city. Remind the class that last week's profile stored those words inside the file, and today the parent will hand the words in.",
          },
          {
            minutes: 15,
            title: "Props in the tag",
            detail:
              "Live-code ProfileProps, destructure name and city, and render two Profile tags from App. Ask which file owns the city string. Show a missing city so TypeScript marks the tag, then put the prop back. Say the child displays the value and does not replace the parent's string by assigning to the prop.",
          },
          {
            minutes: 20,
            title: "useState and a click",
            detail:
              "Contrast a local count that dies when the function returns with useState. Write handleAdd with setCount(count + 1) and pass it as onClick={handleAdd}. Then write the parentheses version on a slide or a comment, explain that it runs during render, and switch back to the version that waits for the click. Click three times on the projected page.",
          },
          {
            minutes: 30,
            title: "Student counter and profile",
            detail:
              "Students open a terminal for their system, run npm in learning/week-12, and build Profile and Counter. Walk the room. Check capital component names, export default, braces around the values, and that onClick does not call the handler immediately. Each browser should show two people and a count that changes.",
          },
          {
            minutes: 10,
            title: "Re-render questions",
            detail:
              "Ask what the paragraph shows if the handler assigns to count and never calls setCount. Ask when the 0 in useState is used. Say a refresh starts the memory again from 0, because this state lives in the open page. Preview the task list as the same memory, holding many items instead of one number.",
          },
          {
            minutes: 10,
            title: "Checks and the response",
            detail:
              "Give the knowledge checks. The homework is a lesson response, not the module assignment. Students name the props they passed, the count after three clicks, and why the setter causes a re-render. Collect the path learning/week-12. The form and the task list are the next session.",
          },
        ],
        explain: [
          "A prop is an input passed from parent to child for this render.",
          "useState keeps a value after the component function returns.",
          "The setter schedules a re-render. The current count does not change on the same line.",
          "onClick needs a function, not the result of calling that function during render.",
        ],
        questions: [
          "Which file decides the city: Profile.tsx or the Profile tag in App.tsx?",
          "What does the screen do if the handler writes count = count + 1 and does not call setCount?",
          "What is the difference between onClick={handleAdd} and onClick={handleAdd()}?",
        ],
        demonstration:
          "From a new terminal, show npm --version, create or start learning/week-12, then replace the sample with two Profile tags and a Counter. Click Add one and narrate the re-render.",
        practice:
          "Students build a profile component that receives a name and a city, render it twice, and build a counter that starts at 0 and adds one on each click.",
        expectedOutcomes: [
          "learning/week-12 runs with npm run dev.",
          "Two profiles show different props.",
          "The counter changes only through the setter, once per click.",
        ],
        difficulties: [
          {
            issue: "The page errors, or the count races, because setCount runs while the component renders.",
            help:
              "Look at onClick. If the handler name is followed by parentheses, remove them. Save and reload. Then click once and confirm the number grows by one, not by itself.",
          },
          {
            issue: "npm is not found, or the student edits files and the browser never changes.",
            help:
              "Open a new PowerShell, Terminal, or Linux terminal after installing Node and run npm --version. Confirm the prompt is inside learning/week-12, then run npm run dev and use the address that command prints. A server that has exited will not reload the page.",
          },
        ],
        homework:
          "Lesson response: the props passed into two profiles, the count after three clicks, and a sentence on why setCount is what updates the screen. Files live in learning/week-12.",
        assessment:
          "Checks cover the meaning of a prop, assignment versus the setter, the parentheses on onClick, and when the initial state is used. During practice, watch one counter click from 0 to 1.",
        recap:
          "Ask a student to point at one Profile tag and say which component owns the name. Ask another what React does after setCount. Tell them the next session stores a list the same way and edits it from a form.",
        knowledgeCheckAnswers: [
          {
            id: "w12-what-prop",
            answer: "Information a parent component passes into a child component.",
            explanation:
              "Props travel from the parent tag into the child function. node_modules, a CSS file, and the dev script are not props.",
          },
          {
            id: "w12-assign-count",
            answer: "False",
            explanation:
              "Assigning to count changes a local binding for this run. The screen updates when the setter from useState is called and React renders again.",
          },
          {
            id: "w12-onclick-call",
            answer:
              "handleAdd passes the function so React can call it on a click. handleAdd() runs the function while the component is rendering.",
            explanation:
              "Accept answers that say the parentheses call the function immediately, and the version without parentheses hands the function to the click.",
          },
          {
            id: "w12-initial-state",
            answer: "As the starting value on the first render.",
            explanation:
              "React applies the initial value when the component starts. Later renders receive the stored value. A browser refresh starts the component again, so the initial value is used once more.",
          },
        ],
      },
    },
    {
      slug: "lists-forms-and-tasks",
      sessionNumber: 24,
      title: "Lists, forms, and tasks",
      estimatedMinutes: 90,
      difficulty: "Bringing ideas together",
      requiresOs: true,
      content: {
        overview: {
          about:
            "This lesson turns an array of tasks into a list on the page. You will use map and keys, show an empty state, control a text field with state, check the title on submit, and split the work across components. The practice list can add a task, mark it complete, and delete it.",
          why: "A counter proves that state can change. A task list is the same idea with many items, a form for new input, and buttons that update one item at a time. That is the shape of a lot of interfaces.",
          alreadyKnow:
            "You can pass props, call useState, update state with a setter, and handle a click without calling the handler during render.",
        },
        objectives: [
          "Render an array of tasks with map and a stable key.",
          "Show a different message when the task array is empty.",
          "Keep a text field in sync with state and submit it without reloading the page.",
          "Reject a blank title and add, complete, or delete a task by replacing state.",
          "Split the form, the row, and the list into components, with the task array in the parent.",
        ],
        prerequisites: [
          {
            label: "Props, useState, re-rendering, and click handlers.",
            lessonSlug: "props-state-events",
          },
        ],
        teachingNotes: [
          {
            heading: "Turn an array into a list with map",
            markdown: md(`
              A list on the page starts as an array in memory. You already stored tasks as objects with a title and a done flag, and you used map to build a new array from an old one. In React, map's new array is an array of elements. Each task becomes one row.

              map exists here for the same reason it existed in JavaScript. A loop that copies markup by hand has to be edited every time the array grows. map walks the array once and returns one element per item. React then shows that array inside a ul.

              The state that holds the tasks is an array. It starts empty, because the person has not added anything yet.

              ¬¬¬tsx
              type Task = {
                id: number;
                title: string;
                done: boolean;
              };

              const [tasks, setTasks] = useState<Task[]>([]);
              ¬¬¬

              Task is the shape: a numeric id, a title string, and a boolean done flag. The id is new compared with the earlier array lesson. A title can be repeated. An id should not. The empty array is the initial value, used on the first render, just like 0 was the initial count.

              ### What map returns

              Inside the JSX, map returns a list item for each task. You can write the callback as a function, the form you used before, or as an arrow function. Both are functions. The arrow form is common in JSX because it stays next to the element.

              ¬¬¬tsx
              <ul>
                {tasks.map(function (task) {
                  return <li key={task.id}>{task.title}</li>;
                })}
              </ul>
              ¬¬¬

              The curly braces around tasks.map switch from markup back to JavaScript. map does not change the old tasks array. It builds a new array of elements. setTasks is still what changes the remembered list. Painting the list and changing the list are two steps.

              :::example Three paper cards
              Suppose tasks holds Read the notes and Write the function. map makes two li elements, in that order. Add a third object to the array through the setter, and the next render makes three li elements. You do not copy the ul by hand.
              :::

              :::misunderstanding The array on the screen is a different array from state
              The ul is the picture. The tasks array is the memory. If you edit the picture in the browser tools, the next render draws whatever is in state again. Change state when you want the list to change.
              :::
            `),
          },
          {
            heading: "Keys tell items apart",
            markdown: md(`
              A key is a stable identity React uses to tell list items apart when the list changes. You put it on the outermost element returned from map. In this list, that value is task.id. The key is not a prop your component reads. It is an instruction to React, written on the tag.

              Keys exist because a list is not only drawn once. People add a row, mark one complete, and delete another. React wants to know which previous row matches which next row, so it can keep the right checkbox with the right title. Without a key, React falls back to position. Position changes when a row disappears.

              Picture a coat check that numbers coats by the order they hang: first, second, third. Someone collects the first coat. If you keep calling the remaining coats by their new positions, you can hand over the wrong coat. A ticket number that stays on the coat survives the gap. The task id is that ticket. The array index is the position on the rail.

              Use the id. Do not use the title. Two tasks can share a title, and a title can be edited later. Do not plan on the index for a list that deletes or reorders items. The index describes where the item sits this render. After a delete, the indexes move, and React can reuse the wrong row.

              ¬¬¬tsx
              {tasks.map(function (task) {
                return (
                  <li key={task.id}>
                    {task.title}
                  </li>
                );
              })}
              ¬¬¬

              Put the key on the element that map returns directly. If map returns TaskItem, the key goes on TaskItem, not on a tag hidden inside TaskItem. React reads the key on the array's own elements.

              The id has to be chosen when the task is created, and it has to stay with that task. A counter in state supplies that number:

              ¬¬¬tsx
              const [nextId, setNextId] = useState(1);

              function addTask(title: string) {
                const task: Task = { id: nextId, title: title, done: false };
                setTasks([...tasks, task]);
                setNextId(nextId + 1);
              }
              ¬¬¬

              nextId starts at 1. Each added task takes the current number, and the setter stores the following number. Deleting a task does not reuse its id. The spread ¬[...tasks, task]¬ copies the old tasks into a new array and puts the new task at the end. That new array is what setTasks receives.

              :::warning Pushing then setting the same array
              tasks.push(task) edits the array you already have. If you then call setTasks(tasks), you handed React the same array. React can miss the change. Build a new array with the spread, or with filter when you remove a task, and pass that new array to the setter.
              :::

              :::misunderstanding The key is another piece of text on the screen
              The key does not appear as a label unless you also render the id. Its audience is React. The person sees the title. React uses the key to match rows across renders.
              :::
            `),
          },
          {
            heading: "Conditional rendering and the empty state",
            markdown: md(`
              Conditional rendering means choosing what to return based on a condition. You already branch with if in JavaScript. In a component, that branch decides which elements exist. The empty state is the branch for an array with no tasks: a sentence that says the list is empty, instead of a blank ul that looks like a broken page.

              The empty state exists because silence is ambiguous. A blank region can mean "no tasks yet" or "the list failed to draw". A sentence removes the doubt and points at the form. When the array has items, the sentence steps aside and the ul appears.

              Two patterns cover this lesson. Use if before the return when the two branches are large. Use a ternary inside JSX when the choice is short. A ternary has the form condition ? when true : when false.

              ¬¬¬tsx
              function TaskList({ tasks }: { tasks: Task[] }) {
                if (tasks.length === 0) {
                  return <p>No tasks yet. Add one with the form.</p>;
                }

                return (
                  <ul>
                    {tasks.map(function (task) {
                      return <li key={task.id}>{task.title}</li>;
                    })}
                  </ul>
                );
              }
              ¬¬¬

              length === 0 is the empty check. It uses the array you already know. When someone adds the first task, tasks is no longer empty, the component renders again, and the ul replaces the paragraph. Delete the last task, and the paragraph comes back. You do not hide the paragraph with a separate system. The condition reads the same state as the list.

              A message about a bad title is the same idea in a smaller space. If message is an empty string, render nothing. If it holds text, render a paragraph.

              ¬¬¬tsx
              {message ? <p>{message}</p> : null}
              ¬¬¬

              null means "no element here". It is how JSX skips a spot. The condition is the message string. An empty string is treated as false in that test. A sentence is treated as true.

              :::example The desk before the first card
              Open the page before you add a task. You should read a sentence such as No tasks yet. Add a task. The sentence leaves and the row appears. Delete that only row. The sentence returns. That round trip is the empty state working.
              :::

              :::misunderstanding map on an empty array is an error
              map on an empty array returns an empty array. It does not throw. The page would show an empty ul, which is valid and unhelpful. The length check is a choice about what the person should read, not a repair for a crash.
              :::
            `),
          },
          {
            heading: "Controlled inputs",
            markdown: md(`
              A controlled input is a form field whose displayed text is React state. The input shows that state. Typing calls a handler that stores the new text. The field does not keep a private copy that React cannot see.

              This pattern exists because the title has two lives if you leave it only in the DOM: the letters on the screen, and the value you hope to read later. Those lives can drift. Validation needs the title. Clearing the field after a successful add needs the title. One piece of state can do both. The input becomes a view of that state.

              Picture a notebook that is the official copy, and a window that shows the current page. When someone types, you write in the notebook and the window shows the notebook again. If the window kept a secret scribble, clearing the notebook would leave the scribble in the glass. value is the window showing the notebook. onChange is the writing in the notebook.

              ¬¬¬tsx
              const [title, setTitle] = useState("");

              <input
                id="task-title"
                value={title}
                onChange={function (event) {
                  setTitle(event.target.value);
                }}
              />
              ¬¬¬

              value={title} displays the state. onChange runs on each change. event.target.value is the text currently in the field. setTitle stores it, React renders again, and the input shows the stored text. The pair belongs together. value without onChange freezes the field, because React keeps putting the old state back. onChange without value leaves the field uncontrolled, with the text living in the element.

              An uncontrolled field can be given a start value and later read from the DOM. This course uses the controlled form so the same state that checks the title can also clear it. You will not mix the two styles in one field.

              Give the input an id and point a label at it with htmlFor. JSX uses htmlFor because for is reserved in JavaScript. The label's text, such as Task title, tells the person what to type. Clicking the label focuses the field.

              The draft title can live in the form component. The task array can live in App. The form does not need to store every saved task, and App does not need every keystroke. That split is component organisation, and it still uses props: App passes a function, onAdd, and the form calls it with the finished title.

              :::misunderstanding The input remembers the title, so state is optional
              The input can show letters by itself. Those letters are not the tasks array, and they disappear from your program's hands if you never store them. Controlled state is how the submit handler receives a title it can trim, reject, or save.
              :::
            `),
          },
          {
            heading: "Submit the form and check the title",
            markdown: md(`
              Form submission is the event that fires when the person submits the form, by clicking a submit button or by pressing Enter in the field. The handler receives an event object. The browser's default action for a form is to navigate, which reloads the page. A reload throws away React state. preventDefault stops that navigation so the list can stay.

              Call preventDefault at the start of the handler. Then read the title. Then decide whether to add a task.

              Basic validation means a small rule checked before you change the list. The rule in this lesson: after trimming, the title must contain something. trim removes spaces at the start and end. A field full of spaces becomes an empty string. An empty string is not a task.

              ¬¬¬tsx
              import { useState, type FormEvent } from "react";

              function handleSubmit(event: FormEvent<HTMLFormElement>) {
                event.preventDefault();
                const cleaned = title.trim();
                if (cleaned.length === 0) {
                  setMessage("Write a task title before adding it.");
                  return;
                }
                onAdd(cleaned);
                setTitle("");
                setMessage("");
              }
              ¬¬¬

              The if stops the function before onAdd. The list does not change. The message is state, so the paragraph appears on the re-render. When the title is usable, onAdd receives the trimmed text, the field is cleared by setting title to an empty string, and the message is cleared the same way. Clearing works because the input is controlled. Set the state, and the field shows the empty string.

              The submit button uses type="submit" and sits inside the form. A Delete button that also sits inside the form must use type="button". Otherwise the browser treats it as a submit button, the form handler runs, and the page may reload or add a task when the person meant to delete one.

              Completing a task replaces that one object. Copy the other tasks unchanged. Spread the chosen task and flip done:

              ¬¬¬tsx
              function toggleTask(id: number) {
                setTasks(
                  tasks.map(function (task) {
                    if (task.id === id) {
                      return { ...task, done: !task.done };
                    }
                    return task;
                  }),
                );
              }
              ¬¬¬

              Deleting builds a new array that omits that id. filter keeps the tasks whose id does not match. You used filter on arrays before. The setter receives the shorter array.

              ¬¬¬tsx
              function deleteTask(id: number) {
                setTasks(
                  tasks.filter(function (task) {
                    return task.id !== id;
                  }),
                );
              }
              ¬¬¬

              Do not set task.done = true on the old object and then set the same array. That edits the previous state in place. Build a new object and a new array, then pass them to the setter.

              :::warning A reload looks like a vanished list
              If the new task flashes and disappears, the form probably navigated. Check that the handler calls preventDefault, and that the button you clicked is not submitting by accident. The list in this lesson lives in memory. A reload starts from the empty array again, even when the handler was correct.
              :::

              :::example A blank field
              Submit with an empty box. The list stays empty, or stays as it was, and a sentence asks for a title. Type Read the notes, submit, and that title appears as a task with done set to false. The box is empty again, ready for the next title.
              :::
            `),
          },
          {
            heading: "Organise the task list into components",
            markdown: md(`
              Component organisation means giving each component one role and a file of its own. The form collects a title. The row shows one task and offers complete and delete. The list decides between the empty state and the mapped rows. App remembers the tasks and the next id. The files in ¬learning/week-12/src¬ can be types.ts, TaskForm.tsx, TaskItem.tsx, TaskList.tsx, and App.tsx.

              This split exists so a change has a home. A new validation sentence belongs in the form. A change to the delete button belongs in the row. The empty sentence belongs in the list. The array update belongs in App, because the form, the list, and the row all depend on that array or on ways to change it.

              Information still moves with props. App passes onAdd to the form. The form calls onAdd with a clean title. App passes tasks, onToggle, and onDelete to the list. The list passes one task and those two functions to each row. A click in the row calls the function it received. That is the click lesson, with the handler created in the parent and passed down like any other prop.

              Data goes down. Events come up through functions the parent provided. The row does not reach into App and edit the array. It does not know how ids are chosen. It knows the task it was given and the functions it may call.

              The practice is a task list that can add, complete, and delete. Start the app, confirm the empty sentence, add two tasks, mark one complete, and delete the other. The remaining task should keep its own title and done flag. Then refresh the browser. The list returns to empty. Nothing in this lesson writes the array to a file or to another programme. The memory belongs to this open page. Knowing that limit is part of finishing the list. A later week will give the same add, complete, and delete actions a home outside the page.

              ### Open the terminal and run npm again

              The project is still ¬learning/week-12¬. Open a terminal the same way as last session. On Windows, press the Windows key, type PowerShell, and open Windows PowerShell, then run ¬npm --version¬. On macOS, press Command-Space, type Terminal, and press Return, then run ¬npm --version¬. On Ubuntu, press Ctrl-Alt-T, or search Activities for Terminal. On other Linux systems, open Terminal from the application menu, then run ¬npm --version¬.

              cd into ¬learning/week-12¬. If node_modules is missing, run ¬npm install¬. Then run ¬npm run dev¬ and open the address Vite prints. If a previous server is still running in another window, use that window or stop it with Control-C before you start a second one. On a Mac, Control-C is not Command-C.

              :::tip Keep the profile if you want it
              The counter and the profile from the previous session may stay on the page. The task list is the new work. App can render those components above the form. The assignment is judged on the form, the empty state, and add, complete, and delete.
              :::

              Before you call the list done, check four things. A blank title does not add a row. The empty sentence shows when no tasks remain. Each row has a key that is the task id. Complete and delete change the list without reloading the page.
            `),
          },
        ],
        vocabulary: [
          {
            term: "map",
            definition:
              "An array method that builds a new array by running a function on each item. In React it builds an element for each task.",
          },
          {
            term: "Key",
            definition:
              "A stable identity on a list element, usually the task id, that helps React match rows when the list changes.",
          },
          {
            term: "Conditional rendering",
            definition:
              "Choosing which elements to return based on a condition, such as showing a sentence when the task array is empty.",
          },
          {
            term: "Empty state",
            definition:
              "The message shown when there is nothing to list yet, so a blank region is explained instead of looking broken.",
          },
          {
            term: "Controlled input",
            definition:
              "A form field that displays React state and writes each edit back into that state through onChange.",
          },
          {
            term: "Validation",
            definition:
              "A check before changing the list. This lesson trims the title and refuses to add a task when nothing remains.",
          },
          {
            term: "Component organisation",
            definition:
              "Putting each role in its own component and file, with the shared task array kept in the parent and passed down as props.",
          },
        ],
        demonstrations: [
          {
            title: "Open a terminal and run the app again",
            intro:
              "You will open a terminal on your system, run npm, and start the dev server for the existing project at learning/week-12.",
            steps: [
              "Decide whether you are using Windows, macOS, or Linux.",
              "Open a terminal with the steps for that system.",
              "Run npm --version to confirm npm still runs in this new window.",
              "Change directory into learning/week-12.",
              "If node_modules is missing, run npm install and wait for it to finish.",
              "Run npm run dev and read the address Vite prints.",
              "Open that address. Confirm the page from the previous session still loads.",
              "Leave this terminal busy with the server. Open a second terminal only if you need another prompt.",
            ],
            expected:
              "npm --version prints a version, npm run dev prints a localhost address, and the browser shows the React app from learning/week-12.",
            verify:
              "The terminal stays on the dev server. Refreshing the browser loads the page. The prompt you used is inside learning/week-12, which you can confirm with the folder command for your system.",
            ifItFails:
              "If npm is not found, open a new terminal after Node is installed. If the address refuses to connect, the server is not running: from learning/week-12 run npm run dev again. If port 5173 is taken, use the address Vite actually printed.",
            os: {
              sameOnAllPlatforms:
                "After the terminal is open, cd into learning/week-12, run npm install if node_modules is missing, then run npm run dev and open the printed address.",
              identify: [
                "Windows shows a Start menu. Open Windows PowerShell and run npm there.",
                "macOS shows an Apple menu. Open Terminal and run npm there.",
                "Linux, including Ubuntu, uses the programme named Terminal. Ubuntu can open it with Ctrl-Alt-T.",
              ],
              windows: [
                "Press the Windows key, type PowerShell, and open Windows PowerShell from the Start menu result.",
                "Run npm --version, then cd into learning/week-12. Run npm install if needed, then npm run dev.",
                "If that window is already serving the app and will not take a command, open a second PowerShell from the Start menu.",
              ],
              macos: [
                "Press Command-Space, type Terminal, and press Return. You can also open Terminal from Applications, then Utilities.",
                "Run npm --version, cd into learning/week-12, and run npm run dev. Stop a server with Control-C, not Command-C.",
                "If the first Terminal is busy, open a second window from the Shell menu before you type another command.",
              ],
              linux: [
                "On Ubuntu, press Ctrl-Alt-T or search Activities for Terminal. On other distributions, open Terminal from the application menu.",
                "Run npm --version, cd into learning/week-12, and run npm run dev. Install Node.js LTS first if npm is missing, then open a new terminal.",
                "If the server occupies the terminal, open another terminal window or tab. The npm commands match Windows and macOS.",
              ],
            },
          },
          {
            title: "Add, complete, and delete a task",
            intro:
              "You will build a controlled form, reject a blank title, and update a task list with add, complete, and delete. The dev server stays running.",
            steps: [
              "Add a Task type with id, title, and done, and store an empty task array with useState.",
              "Add a form whose input value is state and whose onChange stores event.target.value.",
              "On submit, call preventDefault, trim the title, and set a message when the result is empty.",
              "When the title remains, append a new task with a fresh id and clear the field.",
              "Render an empty-state sentence when the array length is 0. Otherwise map the tasks and set key to the id.",
              "Add a complete control that replaces the matching task with a copy whose done flag is flipped.",
              "Add a delete button with type button that keeps every task except the one with that id.",
              "Add two tasks, complete one, delete the other, and refresh to see the list start empty again.",
            ],
            expected:
              "A blank submit shows a message and does not add a row. Two real titles appear as rows. Complete and delete update those rows. A refresh clears the list.",
            verify:
              "The empty sentence is visible before the first successful add and after the last delete. The browser address does not change when the form is submitted. Each li or row component has a key.",
            ifItFails:
              "If the page reloads, add preventDefault and check the delete button's type. If a warning says each child needs a key, put key={task.id} on the element returned from map. If the field will not change, connect both value and onChange to the title state.",
            os: {
              sameOnAllPlatforms:
                "Editing the components is the same on every system. Save files while npm run dev is running in a terminal so Vite can reload the page.",
              windows: [
                "Use a second Windows PowerShell if you need a prompt, because the first may be running npm.",
                "Confirm in PowerShell that the current folder is learning/week-12 before you run npm install or npm run dev.",
              ],
              macos: [
                "Use a second Terminal window if the first is running the server. Control-C stops it. Command-C does not.",
                "From Terminal, cd into learning/week-12 and run npm run dev if the browser cannot connect.",
              ],
              linux: [
                "Open another terminal tab if npm run dev is occupying the first one.",
                "On Ubuntu or another distribution, run npm commands from learning/week-12, then reload the printed localhost address.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "A form that checks the title",
            filename: "src/TaskForm.tsx",
            language: "tsx",
            level: "practical",
            code: md(`
              import { useState, type FormEvent } from "react";

              type TaskFormProps = {
                onAdd: (title: string) => void;
              };

              function TaskForm({ onAdd }: TaskFormProps) {
                const [title, setTitle] = useState("");
                const [message, setMessage] = useState("");

                function handleSubmit(event: FormEvent<HTMLFormElement>) {
                  event.preventDefault();
                  const cleaned = title.trim();
                  if (cleaned.length === 0) {
                    setMessage("Write a task title before adding it.");
                    return;
                  }
                  onAdd(cleaned);
                  setTitle("");
                  setMessage("");
                }

                return (
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="task-title">Task title</label>
                    <input
                      id="task-title"
                      value={title}
                      onChange={function (event) {
                        setTitle(event.target.value);
                      }}
                    />
                    <button type="submit">Add task</button>
                    {message ? <p>{message}</p> : null}
                  </form>
                );
              }

              export default TaskForm;
            `),
            explanation:
              "The input is controlled by title. Submit does not reload the page. A trimmed empty title sets a message and returns before onAdd. A usable title is passed to the parent, and the field is cleared.",
            lineNotes: [
              {
                focus: "preventDefault",
                note: "This stops the browser from navigating and wiping the task list that lives in state.",
              },
              {
                focus: "trim and length",
                note: "Spaces alone become an empty string, so they fail the same check as a blank field.",
              },
              {
                focus: "value and onChange",
                note: "The input shows title and writes every edit back with setTitle. That pair makes the field controlled.",
              },
            ],
            expectedOutput:
              "Submitting an empty field shows the message. Submitting Read the notes calls onAdd with that string and clears the field.",
          },
          {
            title: "A parent list with an empty state",
            filename: "src/App.tsx",
            language: "tsx",
            level: "practical",
            code: md(`
              import { useState } from "react";
              import TaskForm from "./TaskForm";
              import type { Task } from "./types";

              function App() {
                const [tasks, setTasks] = useState<Task[]>([]);
                const [nextId, setNextId] = useState(1);

                function addTask(title: string) {
                  const task: Task = { id: nextId, title: title, done: false };
                  setTasks([...tasks, task]);
                  setNextId(nextId + 1);
                }

                function toggleTask(id: number) {
                  setTasks(
                    tasks.map(function (task) {
                      if (task.id === id) {
                        return { ...task, done: !task.done };
                      }
                      return task;
                    }),
                  );
                }

                function deleteTask(id: number) {
                  setTasks(
                    tasks.filter(function (task) {
                      return task.id !== id;
                    }),
                  );
                }

                return (
                  <main>
                    <h1>Saturday tasks</h1>
                    <TaskForm onAdd={addTask} />
                    {tasks.length === 0 ? (
                      <p>No tasks yet. Add one with the form.</p>
                    ) : (
                      <ul>
                        {tasks.map(function (task) {
                          return (
                            <li key={task.id}>
                              <label>
                                <input
                                  type="checkbox"
                                  checked={task.done}
                                  onChange={function () {
                                    toggleTask(task.id);
                                  }}
                                />
                                {task.title}
                              </label>
                              <button
                                type="button"
                                onClick={function () {
                                  deleteTask(task.id);
                                }}
                              >
                                Delete
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </main>
                );
              }

              export default App;
            `),
            explanation:
              "App owns the task array. The form only receives onAdd. The empty state and the mapped rows read the same array. Complete and delete pass new arrays to setTasks. types.ts exports the Task alias used here.",
            lineNotes: [
              {
                focus: "Empty check",
                note: "length === 0 renders the sentence. Any later length renders the ul instead.",
              },
              {
                focus: "key={task.id}",
                note: "The key is the id chosen when the task was added, not the position in the array.",
              },
              {
                focus: "filter and map",
                note: "Both return a new array. The old tasks array is not edited with push or with an assignment to done.",
              },
            ],
            expectedOutput:
              "The page shows the empty sentence first. Added tasks appear with a checkbox and Delete. Refreshing the browser clears them.",
          },
        ],
        exercises: [
          {
            title: "Change the empty sentence",
            difficulty: "warm-up",
            prompt:
              "Write your own empty-state sentence and confirm it is the thing you see before any task is added.",
            steps: [
              "Find the branch that runs when the task array length is 0.",
              "Change the sentence. Keep it as text the person can read.",
              "Save, with npm run dev running, and look at the page before you add a task.",
              "Add a task and confirm the sentence is replaced by the list.",
            ],
            expectedOutcome:
              "The new sentence shows for an empty list and does not remain beside a list that already has tasks.",
          },
          {
            title: "Count the tasks that are not done",
            difficulty: "practice",
            prompt:
              "Above the list, show how many tasks have done set to false. Use the array you already have in state.",
            steps: [
              "Derive a count from tasks by keeping the objects whose done flag is false.",
              "Show that count in a paragraph that renders both when the list is empty and when it is not.",
              "Mark a task complete and confirm the count falls by one.",
              "Delete a task that is not complete and confirm the count falls by one.",
            ],
            expectedOutcome:
              "The paragraph matches the number of incomplete tasks after add, complete, and delete.",
          },
          {
            title: "Refuse a one-letter title",
            difficulty: "stretch",
            prompt:
              "Keep the blank-title check, and also refuse a trimmed title that is shorter than two characters, with a message that says the title is too short.",
            steps: [
              "After trim, keep the length === 0 branch and its message.",
              "Add another branch for a remaining length of one.",
              "Submit a, then submit a title of only spaces, then submit a title of two or more characters.",
              "Confirm only the last submit adds a row.",
            ],
            expectedOutcome:
              "A blank title and a one-character title show messages and do not change the list. A longer title is added and the field clears.",
          },
        ],
        troubleshooting: [
          {
            problem: "Submitting the form reloads the page and the new task disappears.",
            why: "The browser followed the form's default navigation. The React state from this page visit was discarded.",
            solution:
              "Call event.preventDefault() at the start of the submit handler. Keep the dev server running and submit again. The address in the browser should stay on the Vite page.",
          },
          {
            problem: "React warns that each child in a list should have a key.",
            why: "map returned elements without a key, so React cannot identify the rows.",
            solution:
              "Put key={task.id} on the outermost element returned from map, such as the li or TaskItem. Do not put the key only on a tag inside that child.",
          },
          {
            problem: "The text field does not update when you type, or it will not clear after an add.",
            why: "The input is missing value, missing onChange, or the clear step never calls setTitle with an empty string.",
            solution:
              "Set value to the title state and onChange to a function that calls setTitle(event.target.value). After a successful add, call setTitle with an empty string.",
          },
          {
            problem: "Delete reloads the page or adds a blank task.",
            why: "The delete button is inside the form and its type is submit, so the browser treats the click as a form submit.",
            solution:
              "Set type=\"button\" on Delete. Leave type=\"submit\" on the Add button. Call preventDefault in the submit handler as well.",
          },
        ],
        knowledgeChecks: [
          {
            id: "w12-list-key",
            format: "Multiple choice",
            question: "Which value should be the key when tasks can be deleted?",
            options: [
              "The task id that stays with that task.",
              "The array index, because it is always the position.",
              "The word task, repeated on every row.",
              "The npm version printed in the terminal.",
            ],
          },
          {
            id: "w12-controlled",
            format: "True or false",
            question:
              "A controlled input shows the text stored in React state, and typing updates that state.",
          },
          {
            id: "w12-prevent-default",
            format: "Short answer",
            question:
              "What goes wrong if a form submit handler does not call preventDefault?",
          },
          {
            id: "w12-empty-state",
            format: "Multiple choice",
            question: "What should the page show when the task array is empty?",
            options: [
              "A sentence that says there are no tasks yet.",
              "An exception thrown from map.",
              "The Vite sample counter.",
              "A copy of the node_modules folder.",
            ],
          },
        ],
        homework: {
          description:
            "Submit the week assignment: a React task list in learning/week-12 with a controlled form, a check that rejects a blank title, an empty state, and actions to complete and delete a task.",
          requirements: [
            "The form adds a task only when the trimmed title is not empty, and submitting does not reload the page.",
            "The list shows an empty state when there are no tasks, renders items with stable keys, and can complete and delete a task.",
          ],
          deliverables: [
            "The module assignment, including the start commands and the short note about state, keys, and refresh.",
          ],
          submission:
            "Submit on the module assignment page for week 12. Include the path learning/week-12 and the npm commands a reviewer runs.",
          criteria: [
            "A reviewer can add a task, mark it complete, and delete it in the running app.",
            "The empty state is visible before the first task, and a blank title does not create a row.",
          ],
          submissionKind: "module_assignment",
        },
        summary: [
          "map turns a task array into elements. A key, usually the task id, lets React keep track of rows when the list changes.",
          "Conditional rendering chooses the empty-state sentence or the list. The same idea shows a validation message only when there is one.",
          "A controlled input stores its text in state. preventDefault stops a submit from reloading the page and wiping that state.",
          "Add, complete, and delete pass new arrays to the setter. Splitting the form, row, and list keeps each role in its own file. A refresh starts from the empty array again.",
        ],
        nextLesson: {
          title: "Backend and Node.js",
          lessonSlug: "backend-and-nodejs",
          why: "This task list disappears on refresh because it lives in React state. Next you will look at a programme that can keep work outside that one page.",
        },
      },
      guide: {
        sessionNumber: 24,
        week: 12,
        title: "Lists, forms, and tasks",
        durationMinutes: 90,
        objectives: [
          "Students can render tasks with map and explain why the key is the id.",
          "Students can submit a controlled form that rejects a blank title.",
          "The practice list can add, complete, and delete a task, and it shows an empty state.",
        ],
        tools: [
          "The learning/week-12 Vite app from the previous session",
          "A terminal with npm",
          "Visual Studio Code",
          "A browser on the Vite address",
        ],
        preparation: [
          "Start from a lesson 1 project in which Profile and Counter already render, so the class can add the task list in the same learning/week-12 app.",
          "Prepare a blank submit, a title made only of spaces, and two real titles. You will delete the first added task and show that the remaining row keeps its own id.",
          "Confirm package.json has a dev script, and open a second terminal once so you remember the steps while the server occupies the first.",
        ],
        flow: [
          {
            minutes: 5,
            title: "Paper tasks",
            detail:
              "Put two paper tasks on the desk and one blank space labelled for a third. Ask where a React page would keep those objects. Connect the answer to the counter: one piece of state grew into an array. Say the screen is a drawing of that array, produced with map.",
          },
          {
            minutes: 15,
            title: "map, keys, and nothing to show",
            detail:
              "Live-code a Task type with id, title, and done. Map two hard-coded tasks first so the list appears, then move the array into useState. Add key={task.id} and say why the index fails after a delete. Show the length === 0 branch with the sentence No tasks yet.",
          },
          {
            minutes: 20,
            title: "The form and the blank title",
            detail:
              "Build a controlled input with value and onChange. Submit without preventDefault once, on purpose, and point at the reload. Add preventDefault, trim the title, and show the message for an empty result. Then add a real task and clear the field by setting state to an empty string.",
          },
          {
            minutes: 30,
            title: "Add, complete, and delete",
            detail:
              "Students build the practice list in learning/week-12. Walk and check preventDefault, the empty state, the key, and that complete and delete call the setter with a new array. Ask one student to delete the first of two tasks and say which title remains. The components may be split during this block.",
          },
          {
            minutes: 10,
            title: "Files and a refresh",
            detail:
              "Sketch App, TaskForm, TaskList, and TaskItem on the board. Say the array lives in App, the draft title lives in the form, and the row receives a task plus two functions. Refresh the projected browser and say the empty list is expected, because this state is not stored outside the page.",
          },
          {
            minutes: 10,
            title: "Assignment",
            detail:
              "Knowledge checks, then the module assignment. Repeat the reviewer steps: open a terminal, cd into learning/week-12, npm install, npm run dev, open the printed address. The note must say where the array lives, why the key is the id, and what a refresh does. Do not ask students to save tasks anywhere else yet.",
          },
        ],
        explain: [
          "map builds elements. The key is the task id, written on the element map returns.",
          "The empty state is a branch on tasks.length === 0.",
          "A controlled input pairs value with onChange. preventDefault keeps the page from reloading.",
          "New arrays go to setTasks. The form, the row, and the list are separate components.",
        ],
        questions: [
          "What happens to identity if the key is the array index and the first task is deleted?",
          "Why does the input need both value and onChange?",
          "What should a person read when tasks is an empty array?",
        ],
        demonstration:
          "Start npm run dev in learning/week-12, submit a blank title, add two tasks, mark one complete, delete the other, and refresh so the class sees the empty state return.",
        practice:
          "Students build a React task list with a form that adds a task, a control that marks a task complete, and a button that deletes a task. The empty list shows a sentence.",
        expectedOutcomes: [
          "A blank title does not create a row, and the form does not reload the page.",
          "Tasks render with keys, and complete and delete update the right row.",
          "Students can say that a refresh clears the list because it lives in React state.",
        ],
        difficulties: [
          {
            issue: "The list flashes and the browser reloads on submit or on delete.",
            help:
              "Open the submit handler and add event.preventDefault() as the first line. Set the delete button to type button. Submit a title again and confirm the Vite address does not change.",
          },
          {
            issue: "Deleting or completing seems to affect the wrong row, or React warns about keys.",
            help:
              "Put key={task.id} on the mapped element. Create the id once in addTask and do not use the index. Then delete the first of two tasks and read the title that remains.",
          },
        ],
        homework:
          "Module assignment: the task list in learning/week-12 with a form, validation, an empty state, complete, and delete, plus a short note on state, keys, and refresh.",
        assessment:
          "Checks cover keys, controlled inputs, preventDefault, and the empty state. During practice, watch one blank submit and one successful add.",
        recap:
          "Ask which component holds the array and which component holds the draft title. Ask what the page shows after a refresh. Say the next session looks at a programme outside the page, because this list cannot leave the browser tab.",
        knowledgeCheckAnswers: [
          {
            id: "w12-list-key",
            answer: "The task id that stays with that task.",
            explanation:
              "The id does not change when a row is deleted. The index is only a position, so it shifts. A repeated word is not unique.",
          },
          {
            id: "w12-controlled",
            answer: "True",
            explanation:
              "value shows the state and onChange writes the field back into state. That is the controlled input used by the task form.",
          },
          {
            id: "w12-prevent-default",
            answer:
              "The browser reloads the page, and the React state for the list is lost.",
            explanation:
              "Accept answers that mention a reload, a navigation, or the new task disappearing because the page starts again.",
          },
          {
            id: "w12-empty-state",
            answer: "A sentence that says there are no tasks yet.",
            explanation:
              "map on an empty array does not throw. The lesson still renders a sentence so the person can see that the list is empty on purpose.",
          },
        ],
      },
    },
  ],
  assignment: {
    slug: "week-12-assignment",
    title: "React task list",
    summary:
      "Build a React TypeScript task list with a form, a blank-title check, an empty state, and buttons to complete or delete a task.",
    instructions:
      "Build a React TypeScript task list in the folder learning/week-12. Use the Vite React TypeScript template if that folder does not exist yet. The page needs a form with a labelled text field and a submit button. The field is controlled: React state holds the title, and the input shows that state. On submit, call preventDefault so the browser does not reload the page. Trim the title. If nothing remains, show a short message and leave the list unchanged. If the title is usable, add a task with a numeric id, that title, and done set to false, then clear the field. When the task array is empty, show a sentence that says there are no tasks yet. When the array has tasks, render them with map and a key set to the task id. Each task can be marked complete and can be deleted. Completing a task stores a new array whose matching object has done flipped. Deleting stores a new array that omits that id. Put the form, the row, and the list in separate components, and keep the task array in the parent. In a short note, say which component holds the list, why the key is the id rather than the position in the array, and what happens to the tasks when the browser is refreshed. A reviewer will open a terminal, change into learning/week-12, run npm install, run npm run dev, and open the localhost address Vite prints. Do not submit node_modules.",
    objectives: [
      "Store a task list in React state and update it when a person adds, completes, or deletes a task.",
      "Build a controlled form that checks the title before a task is added.",
      "Render the list with keys and an empty state, with the form, row, and list in separate components.",
    ],
    requirements: [
      "The app lives at learning/week-12, uses the Vite React TypeScript template, and starts with npm install and npm run dev.",
      "The form is a controlled input, calls preventDefault on submit, and rejects a blank or spaces-only title with a visible message.",
      "An empty task array shows an empty-state sentence. Tasks are rendered with map and a key set to the task id.",
      "Each task can be marked complete and deleted, and those actions update state without reloading the page.",
      "The form, the row, and the list are separate components. A short note explains where the array lives, why the key is the id, and what a refresh does.",
    ],
    deliverables: [
      "The React project source, or a repository link, without node_modules.",
      "The commands a reviewer runs from learning/week-12.",
      "A short written note about state, keys, and refresh.",
    ],
    rubric: [
      {
        criterion: "Project starts",
        points: 15,
        description:
          "A reviewer can install dependencies and start the Vite app with the documented npm commands from learning/week-12.",
      },
      {
        criterion: "Form and validation",
        points: 25,
        description:
          "The input is controlled, submit does not reload the page, and a blank title shows a message without adding a task.",
      },
      {
        criterion: "List, keys, and empty state",
        points: 20,
        description:
          "The empty sentence shows when there are no tasks. Rows are produced with map and a stable task id key.",
      },
      {
        criterion: "Complete and delete",
        points: 25,
        description:
          "Complete flips that task's done flag, and delete removes that task, both by storing a new array.",
      },
      {
        criterion: "Components and note",
        points: 15,
        description:
          "The form, row, and list are split sensibly, and the note explains state, the key, and refresh.",
      },
    ],
    points: 100,
    instructorSolution: md(`
      Place these files in learning/week-12/src, keep the Vite React TypeScript template around them, and run npm install then npm run dev from learning/week-12.

      src/types.ts
      ¬¬¬tsx
      export type Task = {
        id: number;
        title: string;
        done: boolean;
      };
      ¬¬¬

      src/TaskForm.tsx
      ¬¬¬tsx
      import { useState, type FormEvent } from "react";

      type TaskFormProps = {
        onAdd: (title: string) => void;
      };

      export default function TaskForm({ onAdd }: TaskFormProps) {
        const [title, setTitle] = useState("");
        const [message, setMessage] = useState("");

        function handleSubmit(event: FormEvent<HTMLFormElement>) {
          event.preventDefault();
          const cleaned = title.trim();
          if (cleaned.length === 0) {
            setMessage("Write a task title before adding it.");
            return;
          }
          onAdd(cleaned);
          setTitle("");
          setMessage("");
        }

        return (
          <form onSubmit={handleSubmit}>
            <label htmlFor="task-title">Task title</label>
            <input
              id="task-title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <button type="submit">Add task</button>
            {message ? <p>{message}</p> : null}
          </form>
        );
      }
      ¬¬¬

      src/TaskItem.tsx
      ¬¬¬tsx
      import type { Task } from "./types";

      type TaskItemProps = {
        task: Task;
        onToggle: (id: number) => void;
        onDelete: (id: number) => void;
      };

      export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
        return (
          <li>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => {
                  onToggle(task.id);
                }}
              />
              {task.title}
            </label>
            <button
              type="button"
              onClick={() => {
                onDelete(task.id);
              }}
            >
              Delete
            </button>
          </li>
        );
      }
      ¬¬¬

      src/TaskList.tsx
      ¬¬¬tsx
      import type { Task } from "./types";
      import TaskItem from "./TaskItem";

      type TaskListProps = {
        tasks: Task[];
        onToggle: (id: number) => void;
        onDelete: (id: number) => void;
      };

      export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
        if (tasks.length === 0) {
          return <p>No tasks yet. Add one with the form.</p>;
        }

        return (
          <ul>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </ul>
        );
      }
      ¬¬¬

      src/App.tsx
      ¬¬¬tsx
      import { useState } from "react";
      import TaskForm from "./TaskForm";
      import TaskList from "./TaskList";
      import type { Task } from "./types";

      export default function App() {
        const [tasks, setTasks] = useState<Task[]>([]);
        const [nextId, setNextId] = useState(1);

        function addTask(title: string) {
          const task: Task = { id: nextId, title, done: false };
          setTasks([...tasks, task]);
          setNextId(nextId + 1);
        }

        function toggleTask(id: number) {
          setTasks(
            tasks.map((task) => {
              if (task.id === id) {
                return { ...task, done: !task.done };
              }
              return task;
            }),
          );
        }

        function deleteTask(id: number) {
          setTasks(tasks.filter((task) => task.id !== id));
        }

        return (
          <main>
            <h1>Saturday tasks</h1>
            <TaskForm onAdd={addTask} />
            <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
          </main>
        );
      }
      ¬¬¬
    `),
  },
  quiz: {
    slug: "week-12-quiz",
    title: "React fundamentals quiz",
    passingScore: 70,
    allowRetakes: true,
    questions: [
      {
        slug: "week-12-q1",
        type: "multiple_choice",
        prompt: "What does <Profile name=\"Ada\" city=\"Lagos\" /> pass into Profile?",
        options: [
          { id: "a", text: "Props named name and city, with those two strings." },
          { id: "b", text: "A new copy of the React package." },
          { id: "c", text: "A Git commit message." },
          { id: "d", text: "The contents of node_modules." },
        ],
        correct: { optionId: "a" },
        explanation:
          "The attributes on a component tag are props. Profile receives the strings Ada and Lagos for that render. Another Profile tag can pass different strings into the same component.",
        points: 2,
      },
      {
        slug: "week-12-q2",
        type: "true_false",
        prompt:
          "Writing count = count + 1 inside a click handler updates the number shown on the screen.",
        correct: { value: false },
        explanation:
          "That assignment changes a local binding for the current run of the function. The paragraph updates when the setter from useState is called and React renders the component again.",
        points: 2,
      },
      {
        slug: "week-12-q3",
        type: "code_reading",
        prompt: "What is wrong with this button if the count should change only when someone clicks?",
        codeSnippet: md(`
          function Counter() {
            const [count, setCount] = useState(0);
            return (
              <button type="button" onClick={setCount(count + 1)}>
                {count}
              </button>
            );
          }
        `),
        options: [
          {
            id: "a",
            text: "setCount runs while the button is rendering, so onClick does not receive a function waiting for the click.",
          },
          { id: "b", text: "useState cannot store a number." },
          { id: "c", text: "A button is not allowed to show a number." },
          { id: "d", text: "type=\"button\" starts the Vite server." },
        ],
        correct: { optionId: "a" },
        explanation:
          "The parentheses call setCount during render. Pass a function instead, such as onClick={() => setCount(count + 1)}, so the update waits for the click.",
        points: 2,
      },
      {
        slug: "w12-q9-refresh",
        type: "multiple_choice",
        prompt: "Why does a task added in this week's list disappear after the browser is refreshed?",
        options: [
          { id: "a", text: "React deletes every array on purpose each night" },
          { id: "b", text: "The list lives in component state, and a refresh starts again from the initial empty array" },
          { id: "c", text: "The browser cannot store text at all" },
          { id: "d", text: "useState writes to a database that this lesson clears" },
        ],
        correct: { optionId: "b" },
        explanation:
          "useState keeps the tasks while the page stays open. Refreshing runs the app again, and the initial value is an empty array. This lesson does not write the list to a file or to another programme.",
        points: 3,
      },
      {
        slug: "week-12-q5",
        type: "multiple_choice",
        prompt: "Which update adds a task by giving React a new array?",
        options: [
          { id: "a", text: "setTasks([...tasks, nextTask])" },
          { id: "b", text: "tasks.push(nextTask)" },
          { id: "c", text: "tasks.length = 0" },
          { id: "d", text: "delete tasks" },
        ],
        correct: { optionId: "a" },
        explanation:
          "The spread builds a new array that contains the previous tasks and the new one. push edits the existing array and does not, by itself, hand React a new value.",
        points: 2,
      },
      {
        slug: "week-12-q6",
        type: "true_false",
        prompt: "The array index is a stable key for a task list that lets people delete tasks.",
        correct: { value: false },
        explanation:
          "An index describes a position. After a delete, the positions change, and React can reuse the wrong row. A task id stays with that task, so it is the key this lesson uses.",
        points: 2,
      },
      {
        slug: "week-12-q7",
        type: "multiple_choice",
        prompt: "What should the submit handler do when the trimmed title is empty?",
        options: [
          { id: "a", text: "Show a message and leave the task list unchanged." },
          { id: "b", text: "Add a task whose title is a single space." },
          { id: "c", text: "Run npm install." },
          { id: "d", text: "Delete every task in the list." },
        ],
        correct: { optionId: "a" },
        explanation:
          "trim turns a field of spaces into an empty string. The handler stores a message and returns before adding. The list changes only when a usable title remains.",
        points: 2,
      },
      {
        slug: "week-12-q8",
        type: "code_reading",
        prompt: "What is missing so React can track each row when this list changes?",
        codeSnippet: md(`
          function TaskList({ tasks }: { tasks: { id: number; title: string }[] }) {
            return (
              <ul>
                {tasks.map(function (task) {
                  return <li>{task.title}</li>;
                })}
              </ul>
            );
          }
        `),
        options: [
          { id: "a", text: "Each li needs a stable key, such as key={task.id}." },
          { id: "b", text: "map cannot read a title." },
          { id: "c", text: "The ul must be stored in node_modules." },
          { id: "d", text: "The function must call preventDefault before it returns." },
        ],
        correct: { optionId: "a" },
        explanation:
          "Elements returned from map need a key so React can match rows across updates. task.id is stable for that task. preventDefault belongs on a form submit, not on this list.",
        points: 2,
      },
      {
        slug: "week-12-q9",
        type: "true_false",
        prompt:
          "A controlled input displays the text kept in state, and onChange writes the typed text back into that state.",
        correct: { value: true },
        explanation:
          "value shows the state and onChange updates it. The task form uses that pair so the submit handler can trim, check, and clear the same title.",
        points: 2,
      },
    ],
  },
};
