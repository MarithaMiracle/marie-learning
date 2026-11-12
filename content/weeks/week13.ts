import type { ModuleSeed } from "../../src/lib/content-types";

function md(text: string): string {
  const cleaned = text.replaceAll("¬", "`");
  const lines = cleaned.replace(/^\n/, "").replace(/\n\s*$/, "").split("\n");
  const indents = lines.filter((line) => line.trim().length > 0).map((line) => line.match(/^ */)?.[0].length ?? 0);
  const margin = indents.length === 0 ? 0 : Math.min(...indents);
  return lines.map((line) => (line.length >= margin ? line.slice(margin) : line.trim())).join("\n").trim();
}

export const week13: ModuleSeed = {
  slug: "week-13-backend",
  number: 13,
  weekNumber: 13,
  monthLabel: "Month 4 — Backend, databases and full-stack development",
  title: "Backend and Node.js",
  description: "Run JavaScript outside the browser, install Node.js on your own computer, and answer one web request with JSON.",
  lessons: [
    {
      slug: "backend-and-nodejs",
      sessionNumber: 25,
      title: "Backend and Node.js",
      estimatedMinutes: 90,
      difficulty: "Gentle introduction",
      requiresOs: true,
      content: {
        overview: {
          about: "This lesson introduces the backend: the programme that works behind a page. You will compare it with the frontend you already built, see how a client and a server exchange messages, and run JavaScript outside the browser with Node.js. You will install Node.js for your operating system, then create a project with npm and package.json.",
          why: "A React page can forget its data when you refresh it. A backend is the programme that can receive work and, later, keep it. You need Node.js on your computer before any server lesson will run.",
          alreadyKnow: "You have built pages with HTML, CSS, and JavaScript, and a React task list that updates on the screen.",
        },
        objectives: [
          "Explain what a backend is and how it differs from the frontend.",
          "Describe a client and a server in an everyday comparison.",
          "Explain what Node.js adds so JavaScript can run outside the browser.",
          "Install Node.js and npm using the steps for Windows, macOS, or Linux.",
          "Create a project with package.json and run a JavaScript file from the terminal.",
        ],
        prerequisites: [
          {
            label: "A React task list that can add, complete, and delete tasks in the browser",
            lessonSlug: "lists-forms-and-tasks",
          },
        ],
        teachingNotes: [
          {
            heading: "What a backend is",
            markdown: md(`
              A backend is a programme that works behind the page a person sees. It waits for a request, follows rules, and sends a response. A request is a message that asks for something, such as a list of tasks. A response is the reply, such as that list or a clear refusal.

              The backend exists because the browser is a weak place to keep the only copy of important records. In week 12 your React task list remembered tasks in the page. Refresh the page, or open the same address on another computer, and those tasks can disappear. The problem is not that you clicked the wrong button. The problem is that the memory belonged to that one open page. A backend gives the application a separate programme whose work is to receive requests in one place.

              Picture a restaurant. The dining room is what the guest sees: menus, tables, and plates. The kitchen is out of sight. The guest does not walk in and cook. The guest sends an order, and the kitchen sends food back, or refuses an order that does not make sense, such as a blank title. Your backend is the kitchen. The page is the dining room. They cooperate, and they are not the same room.

              ### How a backend spends its time

              A small backend does a short loop of work. It starts and then waits. A message arrives. The programme reads what was asked. It checks the message against its rules. It prepares a reply. It sends the reply and waits again. There is no heading and no button inside that loop. The page, which you already know how to build, is what turns the reply into something a person can read.

              :::misunderstanding A backend is not a hidden component
              A backend is its own programme. It is not a React function that you forgot to put on the screen, and it is not a CSS file with the display turned off.
              :::

              You already know the dining room. HTML states what is on the page, CSS sets how it looks, and JavaScript in the browser reacts to clicks. The backend is the next room in the same building. This lesson gets that room ready on your own computer. The next lesson teaches it to answer a web request.
            `),
          },
          {
            heading: "Frontend and backend do different work",
            markdown: md(`
              The frontend is the part a person sees and uses. In this course that has meant HTML, CSS, and React components. Buttons, forms, colours, and lists live there. The frontend runs in the browser. Its strength is response to a person: a click, a typed title, a task marked complete on the screen.

              The backend is the part that applies rules away from that screen. It can check that a title is not blank, prepare data to send back, and later talk to a database. It does not paint pixels. If nobody sends it a message, it has nothing to show, because showing was never its work.

              ### Why the split exists

              Putting every rule only in the browser creates a practical problem. A person can change the page on their own computer. They can also close the tab. Another person opening your project does not receive the tasks that lived in your tab. Splitting the work gives the interface one responsibility and the shared rules another. The two sides then talk by messages instead of sharing one pile of variables.

              A page can look finished and still have no backend. Your week 12 task list was a real frontend. It taught props, state, and events. It did not save tasks anywhere except the browser. That was the right size for that week. It is also the reason this week exists.

              :::example Two halves of one task list
              The React form is the frontend. A later programme that receives the new task and stores it is the backend. The form can be pleasant and still lose the task on refresh until the second half exists.
              :::

              :::misunderstanding A polished page means the data is saved
              Looking complete is a frontend achievement. Saving records is a backend concern. A careful design does not, by itself, keep a row after the browser closes.
              :::

              When you describe your own projects, name both halves. Say what the person clicks, and say what happens to the information after the click. If the second sentence is "it stays in React state", you have a frontend only. That sentence is honest, and it tells you what to learn next.
            `),
          },
          {
            heading: "The client asks and the server answers",
            markdown: md(`
              A client is a programme that asks for something. A server is a programme that waits for those requests and sends responses. The browser is a client when it asks for a page or for data. The backend you will write is a server when it answers.

              This pair exists because the two programmes may be far apart, or they may be on one laptop during practice. They still need a polite way to talk. The client does not reach into the server's memory and take a variable. It sends a request. The server decides what to send back. That boundary is the problem client-server design solves: two programmes can cooperate without becoming one tangled file.

              ### Localhost is still a server

              During this course your own computer often plays both roles. The browser is the client. A Node programme you start in the terminal is the server. The address localhost means "this computer". It is a loop inside one machine, like posting a note from the dining room to the kitchen in the same building. A server on the internet is another computer that stays on and has a public address. You do not need a public address to practise. You do need to remember that localhost will not answer from a friend's house.

              You met a first version of this idea when you learned how a browser asks for a website. Then, the server belonged to someone else and sent HTML. Now you will own a tiny server and, in the next lesson, choose the reply yourself.

              :::misunderstanding Client and frontend are two words for one thing
              They often travel together, and they are not identical. Frontend names the interface a person uses. Client names the programme that sends the request. A browser is both when it shows your React app and asks a server for data. A small test tool can be a client without being a polished frontend.
              :::

              Keep the restaurant picture, and add the door between the rooms. The order slip is the request. The plate is the response. The door stops the guest from rearranging the kitchen, and it stops the kitchen from guessing which guest is hungry. The slip has to say what is wanted.
            `),
          },
          {
            heading: "Node.js runs JavaScript outside the browser",
            markdown: md(`
              Node.js is a programme that runs JavaScript on your computer, outside the browser. You already know the language: variables, functions, arrays, objects, and ¬console.log¬. Node lets that language do work the browser does not offer to a page, such as reading a file, printing to a terminal, and later listening for requests.

              Node exists because JavaScript grew up in the browser, tied to a document. Servers needed a language too. Node took JavaScript and gave it a new set of tools aimed at the computer, not at a page. The problem it solves for you is practical: you can keep the language you have been practising and still write the kitchen.

              ### Same language, different room

              Think of two rooms in one building. In the browser room, JavaScript can find a heading, listen for a click, and change the page. There is a document. In the Node room, there is no document, no window, and no button. JavaScript can still store a value and call a function. The furniture is different. Calling ¬document.querySelector¬ in Node fails because that tool belongs to the browser room.

              You start Node by asking it to read a file. The command ¬node hello.js¬ means "Node, run the file named hello.js". Node reads the file from top to bottom, runs each statement, and then stops when the file ends, unless the file starts something that keeps waiting. A server keeps waiting. A file that only prints a sentence does not.

              :::misunderstanding Node replaces the browser or replaces JavaScript
              Node does not delete the browser, and it is not a new language. React still runs in the browser. Node runs other JavaScript files in a terminal. You will use both, for different rooms.
              :::

              :::tip What you should see
              When a Node file runs, the result appears in the terminal, not on a web page. If the terminal is quiet, the file may have run and printed nothing, or it may not have been started.
              :::

              Your week 6 work with the console is the closest relative. ¬console.log¬ still prints a value. The destination is the terminal you opened, not the browser's developer tools. When you see text there, Node is doing the work you asked.
            `),
          },
          {
            heading: "Install Node.js on Windows, macOS, and Linux",
            markdown: md(`
              Installing Node.js puts the ¬node¬ and ¬npm¬ commands on your computer. Until those commands exist, you cannot run a backend file. The install steps are different for each operating system. A Windows installer does not run on a Mac, and a Mac installer does not run on Ubuntu. Choose the path that matches the computer in front of you.

              On Windows, download the Windows Installer, a file whose name ends in .msi, from the official site https://nodejs.org. Run that installer. Keep the option that adds Node.js to PATH. PATH is the list of folders Windows searches when you type a command. If Node's folder is missing from that list, Windows replies that node is not recognized, even if the files were copied onto the disk. When the installer finishes, close every terminal and open a new one. An old window can remember the old PATH.

              On macOS, download the macOS Installer, a .pkg file, from https://nodejs.org. Open it and follow the screens. You may be asked for your Mac password. You do not need Homebrew for this lesson. Homebrew is another way some people install tools. This course uses the official pkg so everyone follows one documented path.

              On Ubuntu and many other Linux systems, use the apt package tool in the terminal. Run ¬sudo apt update¬ so the computer refreshes its list of packages. Then run ¬sudo apt install -y nodejs npm¬. sudo asks for permission to change the system. The password does not appear as you type. That is normal. Press Enter after it. The apt copies of Node and npm can be older than the website installers. If ¬node -v¬ prints a version number, you can continue this course.

              ### What LTS means, and what a version number is for

              The Node website offers an LTS download. LTS means Long Term Support: the line the Node project recommends for most people. You do not need the download marked Current. After installation, ¬node -v¬ prints a version such as v20 or v22 followed by smaller numbers. ¬npm -v¬ prints the version of npm that arrived with it. Write both down. Classmates may see different numbers. A visible version is the goal, not one exact number.

              :::warning Use the official source for your system
              Download Node from nodejs.org on Windows and macOS, or install it with apt on Ubuntu. Do not run an installer sent by a stranger in a message. The wrong file can be for the wrong system, or it can be something else entirely.
              :::

              :::misunderstanding A download is the same thing as an install
              A file sitting in Downloads has not changed the terminal yet. You still need to run the installer, or finish the apt command, and then open a new terminal before ¬node -v¬ can succeed.
              :::

              If you are not sure which system you have, use the clues in the demonstration. Windows has a Start menu. macOS has an Apple menu at the top left. Ubuntu shows Activities or an application grid. Write the name down before you install anything.
            `),
          },
          {
            heading: "npm, packages, and package.json",
            markdown: md(`
              A package is a folder of code, written by you or by someone else, that a project can use. Express, which you will meet at the end of this lesson and use properly in the next one, is a package. npm is the tool that downloads packages and writes down what your project needs. The name npm is the package manager that ships with Node.

              npm exists because copying other people's files by hand is fragile. You would not know which version you took, and a classmate could not repeat your steps. The problem npm solves is bookkeeping. It fetches a package into your project and records the name in a file you can share.

              ### package.json is the project card

              package.json is a text file in a format called JSON. It holds the project name, the version, and later the list of packages you installed. That list is called dependencies. Running ¬npm init -y¬ creates a starter package.json in the current folder. The ¬-y¬ answers the setup questions with defaults so the command finishes in one step. You can edit the name afterwards.

              When you install a package, npm creates a folder named node_modules and adds the package under dependencies. node_modules is the storage cupboard. You do not type your programme in there, and you do not tidy it by hand. If it is deleted, ¬npm install¬ can rebuild it from package.json. package-lock.json is a detailed receipt npm writes so installs can be repeated. Leave it in the project.

              ¬¬¬json
              {
                "name": "backend-practice",
                "version": "1.0.0",
                "description": "A first Node project"
              }
              ¬¬¬

              JSON is strict. Keys and strings use double quotes. Commas sit between items, not after the last item. A single quote, or a comma left at the end, makes the file invalid. Node and npm will refuse to read it. That strictness is useful: a machine can share the file without guessing what you meant.

              :::misunderstanding You should email node_modules to move a project
              Share package.json, and the files you wrote. A classmate runs npm install to fill node_modules again. The cupboard is large and can be rebuilt. The shopping list is the part that must travel.
              :::

              This is similar to the way an HTML page can point at a CSS file instead of pasting every style into the page. The project depends on something that lives beside it. npm is how a Node project fetches those extra parts.
            `),
          },
          {
            heading: "Create a project and run a file",
            markdown: md(`
              A Node project is a folder with at least one JavaScript file and, once you are ready for packages, a package.json. Create the folder somewhere you can find again, such as inside your learning folder from the early weeks. Open a terminal and move into that folder before you run commands. The terminal's current folder is the place it looks for files.

              Create package.json with ¬npm init -y¬. Then create a file named hello.js. Put a sentence in a variable and print it with ¬console.log¬. Run ¬node hello.js¬. The sentence should appear in the terminal. Change one word, save, and run the command again. The new word appears only after you run Node again. Node does not watch the file unless you start it again.

              ¬¬¬js
              const message = "Hello from Node";
              console.log(message);
              ¬¬¬

              ### When the command fails

              If the terminal says it cannot find the file, you are probably in the wrong folder, or the file name does not match. Names are case-sensitive on macOS and Linux. Hello.js and hello.js are different names there. If the terminal says node is not recognized, or command not found, the install is not visible in this terminal yet. Open a new terminal and try ¬node -v¬ before you blame the file.

              Read errors as information. The first line usually names the problem: a missing file, a missing command, or a broken package.json. You do not need to understand every word in a long stack of lines. Find the first clear sentence and match it to one change you made.

              :::tip Stay in one folder
              Run npm init, create the file, and run node from the same folder. A second terminal that is still sitting in your home folder will not see hello.js.
              :::

              You have now done the mechanical part of backend work: install a tool, make a project card, run a file, read the result in the terminal. The file still ends as soon as it finishes printing. A server, next lesson, is a file that stays running so a client can reach it.
            `),
          },
          {
            heading: "Express is the tool for your first server",
            markdown: md(`
              You could write a server using only Node's built-in tools. Those tools are powerful and verbose for a first week. Express is a package that gives a small, readable way to receive a request and send a response. This course uses Express for every beginner server. In the next lesson you will install it and answer one address with JSON.

              You may hear the name NestJS. NestJS is a more structured framework built around Node. It organises larger applications with more rules and more files. You do not need to learn NestJS now. Express is enough for a beginner server with a few routes.

              ### What to carry into the next lesson

              Remember four facts. The frontend is the page. The backend is a separate programme. Node runs JavaScript in the terminal. package.json records the project and its packages. With those facts, an Express server is a new use of the same project, not a pile of unrelated words.

              :::example A sentence you can say aloud
              "My React list is the frontend. Node will run a backend file. Express will help that file answer the browser. npm will install Express and package.json will remember it."
              :::
            `),
          },
        ],
        vocabulary: [
          {
            term: "Backend",
            definition: "The programme behind a page. It receives requests, applies rules, and sends responses.",
          },
          {
            term: "Frontend",
            definition: "The part a person sees and uses, such as HTML, CSS, and React components in the browser.",
          },
          {
            term: "Client",
            definition: "A programme that sends a request, such as a browser asking for a page or for data.",
          },
          {
            term: "Server",
            definition: "A programme that waits for requests and sends responses. Your Node backend will be a server.",
          },
          {
            term: "Node.js",
            definition: "A programme that runs JavaScript on your computer, outside the browser, from the terminal.",
          },
          {
            term: "npm",
            definition: "The tool that installs packages for a Node project and records them in package.json.",
          },
          {
            term: "Package",
            definition: "A bundle of code a project can install and use, such as Express in the next lesson.",
          },
          {
            term: "package.json",
            definition: "The project file that stores the name, version, and list of packages the project depends on.",
          },
        ],
        demonstrations: [
          {
            title: "Install Node.js and run a first file",
            intro: "You will install Node.js with the method for your operating system, check that node and npm answer, create package.json, and run a JavaScript file in the terminal.",
            steps: [
              "Identify your operating system and open its terminal, using the guide below.",
              "Install Node.js with the Windows installer, the macOS pkg, or the Ubuntu apt commands. Do not use a different system's file.",
              "Close the terminal completely and open a new one, so it can see the new commands.",
              "Type node -v and press Enter. Then type npm -v and press Enter. Write down both version numbers.",
              "Create a folder named backend-practice inside your learning folder, and move the terminal into that folder.",
              "Run npm init -y and open the new package.json file. Find the name and version fields.",
              "Create hello.js so that it prints one sentence you choose.",
              "Run node hello.js and confirm the sentence appears in the terminal, not in a browser.",
            ],
            expected: "node -v and npm -v each print a version number, and node hello.js prints your sentence in the terminal.",
            verify: "The sentence matches the file you saved, and a second run after a small edit shows the new text.",
            ifItFails: "If node is not found, reopen a new terminal after installing. If the file is not found, move into the folder that contains hello.js and run the command again.",
            os: {
              sameOnAllPlatforms: "After the terminal is open, node -v, npm -v, npm init -y, and node hello.js are the same on every system. Open the terminal in the way your computer expects. On Windows, open the Start menu, type Terminal, and choose Windows Terminal or Command Prompt. On macOS, press Command and Space, type Terminal, and press Return. On Ubuntu, open the application menu and choose Terminal, or press Ctrl+Alt+T. Install Node with the separate steps for your system before you trust those shared commands.",
              windows: [
                "Open the Start menu, type Terminal, and open Windows Terminal. If it is missing, open Command Prompt instead.",
                "In a browser, go to https://nodejs.org and download the Windows Installer (.msi) for the LTS version.",
                "Run the downloaded installer. Accept the terms, keep the default options, and leave the option selected that adds Node.js to PATH.",
                "Close the terminal, open a new one, then run node -v and npm -v. Each command should print a version number.",
              ],
              macos: [
                "Press Command and Space, type Terminal, and press Return to open Terminal.",
                "Go to https://nodejs.org and download the macOS Installer (.pkg) for the LTS version. Do not install Homebrew for this lesson.",
                "Open the pkg file and follow the installer screens. Enter your Mac password if the installer asks.",
                "Quit Terminal, open it again, then run node -v and npm -v. Each command should print a version number.",
              ],
              linux: [
                "Open the application menu, search for Terminal, and open it. On Ubuntu you can press Ctrl+Alt+T.",
                "Refresh the package list with sudo apt update. Type your password if asked. Characters will not appear as you type.",
                "Install Node.js and npm with sudo apt install -y nodejs npm.",
                "Run node -v and npm -v. If node is missing but nodejs -v prints a version, tell your instructor the exact text before you continue.",
              ],
              identify: [
                "Windows shows a Start button, often at the bottom of the screen. macOS shows an Apple menu at the top left. Ubuntu and many Linux desktops show Activities or a grid of applications.",
                "Write down the system name, then follow only that system's install steps. Using the wrong installer will not give you the node command.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "A first Node file",
            filename: "hello.js",
            language: "javascript",
            code: "const message = \"Hello from Node\";\nconsole.log(message);\nconsole.log(\"This line also appears in the terminal.\");\n",
            explanation: "Node reads this file from top to bottom when you run node hello.js. The variable holds one sentence. console.log sends text to the terminal. Nothing is drawn in a browser, because this file does not talk to a page.",
            lineNotes: [
              { focus: "const message", note: "const stores a value that this file does not reassign. The same keyword works in the browser and in Node." },
              { focus: "console.log(message)", note: "This prints the variable. In Node the text appears in the terminal that started the file." },
              { focus: "the second console.log", note: "A second call prints another line underneath. Node runs the lines in order." },
            ],
            expectedOutput: "The terminal prints Hello from Node and then prints This line also appears in the terminal.",
            level: "basic",
          },
          {
            title: "A starter package.json",
            filename: "package.json",
            language: "json",
            code: "{\n  \"name\": \"backend-practice\",\n  \"version\": \"1.0.0\",\n  \"description\": \"A first Node project\",\n  \"main\": \"hello.js\"\n}\n",
            explanation: "This is a valid package.json. npm init -y writes a similar file, sometimes with extra fields. The name identifies the project. The version starts at 1.0.0. main names the file Node should treat as the starting point. Double quotes and commas keep the JSON valid.",
            lineNotes: [
              { focus: "name", note: "A short project name. Use lowercase letters and hyphens so the name stays easy to type." },
              { focus: "version", note: "A version number for your project. 1.0.0 is a normal start. It is not the Node version." },
              { focus: "main", note: "Points at hello.js. This does not run the file by itself. You still use node hello.js." },
            ],
            expectedOutput: "The file opens as text. npm can read it. A trailing comma after the last field would make it invalid JSON.",
            level: "practical",
          },
        ],
        exercises: [
          {
            title: "Record your tools",
            difficulty: "warm-up",
            prompt: "Confirm that Node and npm are visible in a new terminal, and describe the two halves of an application in your own words.",
            steps: [
              "Open a new terminal the way your operating system expects.",
              "Run node -v and npm -v. Copy both lines into a note.",
              "Write two sentences: one about what the frontend does, and one about what the backend does.",
              "Add one everyday comparison, such as the dining room and the kitchen, in a third sentence.",
            ],
            expectedOutcome: "Your note shows two version numbers and a short explanation that treats the frontend and the backend as different programmes.",
          },
          {
            title: "Run a file that introduces you",
            difficulty: "practice",
            prompt: "Create a project folder and a Node file that prints two lines about you. Do not copy hello.js unchanged.",
            steps: [
              "Make a folder with a new name and move the terminal into it.",
              "Run npm init -y and check that package.json appeared.",
              "Create a JavaScript file that prints your first name on one line and a reason you are learning the backend on the next line.",
              "Run the file with node and the file name. Change one word, save, and run it again.",
            ],
            expectedOutcome: "The terminal shows both lines, and the second run shows your edited word. package.json is in the same folder.",
          },
        ],
        troubleshooting: [
          {
            problem: "The terminal says node is not recognized, or node: command not found.",
            why: "Node is not installed, the installer was for another operating system, or this terminal was opened before the install finished and still has the old PATH.",
            solution: "Install Node again with the steps for your system: the Windows .msi from nodejs.org, the macOS .pkg from nodejs.org, or sudo apt install -y nodejs npm on Ubuntu. Close every terminal, open a new one, and run node -v.",
          },
          {
            problem: "npm cannot find a package, or npm is not recognized after Node seemed to install.",
            why: "The npm command was not installed, the terminal is offline, or the package name is misspelled. On Ubuntu, node and npm are installed by the apt command in this lesson, and one of them may be missing if the command was cut short.",
            solution: "Check the spelling of the package name. On Ubuntu, run sudo apt install -y nodejs npm again and read the end of the output. Then open a new terminal and run npm -v before you retry the install.",
          },
          {
            problem: "npm says package.json is invalid, or Unexpected token appears while reading it.",
            why: "package.json is JSON. A single quote, a missing comma, or a comma after the last item makes the file invalid, so npm refuses to read the project card.",
            solution: "Open package.json and compare it with the worked example. Use double quotes around every key and string. Remove any comma after the final field. Save and run the command again.",
          },
        ],
        knowledgeChecks: [
          {
            id: "backend-place",
            question: "While you practise in this lesson, where does a backend programme run?",
            format: "multiple_choice",
            options: [
              "Inside a hidden part of an HTML file",
              "On a server, which is your own computer during this lesson",
              "Only inside a CSS rule",
              "Only on a phone, never on a laptop",
            ],
          },
          {
            id: "npm-role",
            question: "What does npm do for a Node project?",
            format: "multiple_choice",
            options: [
              "It paints colours onto a web page",
              "It installs packages and records them for the project",
              "It replaces the browser",
              "It writes database tables",
            ],
          },
          {
            id: "node-room",
            question: "Node.js runs JavaScript inside the browser window, in the same place as a React page.",
            format: "true_false",
            options: ["True", "False"],
          },
          {
            id: "package-card",
            question: "What is package.json for?",
            format: "multiple_choice",
            options: [
              "It stores the project name and the packages the project depends on",
              "It is the web page people visit",
              "It is a list of Git commits",
              "It holds the rows of a database",
            ],
          },
        ],
        homework: {
          description: "After you install Node and run a file, submit a short written response. Include your operating system, the output of node -v and npm -v, and the sentence your file printed. Explain why a React task list can lose its tasks on refresh, and how a backend is a different programme from the page.",
          requirements: [
            "Include both version numbers and the sentence your Node file printed.",
            "Explain frontend and backend in your own words, with one everyday comparison.",
          ],
          deliverables: ["A written response on this lesson page"],
          submission: "Submit the written response in the lesson practice area for this session.",
          criteria: [
            "The response includes the version numbers and the printed sentence.",
            "The explanation shows that the backend is a separate programme from the page.",
          ],
          submissionKind: "lesson_response",
        },
        summary: [
          "The frontend is the page a person uses. The backend is a separate programme that receives requests and sends responses.",
          "A client asks and a server answers. During practice, your browser and your Node programme can share one computer through localhost.",
          "Node.js runs JavaScript in the terminal. npm and package.json keep track of the project's packages.",
          "Windows uses the nodejs.org installer, macOS uses the official pkg, and Ubuntu uses apt. The commands node -v and npm -v come after that install.",
        ],
        nextLesson: {
          title: "HTTP and a simple server",
          why: "You can run JavaScript on your computer. Next you will keep a programme running and answer one browser request with JSON.",
          lessonSlug: "http-and-a-simple-server",
        },
      },
      guide: {
        sessionNumber: 25,
        week: 13,
        title: "Backend and Node.js",
        durationMinutes: 90,
        objectives: [
          "Students can contrast the frontend they built with a backend programme.",
          "Students can explain client, server, and localhost with a concrete comparison.",
          "Every student installs Node.js for their own operating system and can run node -v.",
          "Students create package.json and run a JavaScript file from the correct folder.",
        ],
        tools: ["A computer with permission to install software", "A web browser", "The terminal", "Visual Studio Code", "The Node.js installer or apt"],
        preparation: [
          "Install Node on the instructor machine and confirm that node -v and npm -v print versions in a newly opened terminal.",
          "Open https://nodejs.org so you can point to the Windows .msi and the macOS .pkg. Have the Ubuntu apt commands written beside you. Do not demonstrate Homebrew.",
          "Prepare a sample hello.js and a valid package.json, plus a second package.json with a trailing comma so you can show the invalid JSON error on purpose.",
          "Plan a pairing option for a student whose workplace computer blocks installs. They still write the explanation and watch a successful node -v.",
        ],
        flow: [
          {
            minutes: 5,
            title: "Recall the task list",
            detail: "Welcome the class and ask one student to describe the week 12 task list. Ask what happened to the tasks after a refresh. Say that today you leave the browser for a while and run JavaScript on the computer itself. Read the objectives and say that Windows, macOS, and Linux install Node in different ways.",
          },
          {
            minutes: 15,
            title: "Frontend, backend, client, server",
            detail: "Draw two boxes labelled dining room and kitchen. Explain frontend, backend, client, and server with that picture and with localhost. Use the React task list as data that lives only in the browser. Ask why a saved record needs a programme that still exists after the tab closes. Correct the idea that a backend is a hidden component.",
          },
          {
            minutes: 20,
            title: "Install Node by operating system",
            detail: "Show nodejs.org. Walk Windows students through the .msi installer and PATH. Walk macOS students through the official pkg and say Homebrew is not required. Walk Ubuntu students through sudo apt update and sudo apt install -y nodejs npm. Everyone closes the terminal, opens a new one, and runs node -v and npm -v.",
          },
          {
            minutes: 30,
            title: "package.json and a first file",
            detail: "Create a folder together, run npm init -y, and read name and version in package.json. Explain dependencies and node_modules before they exist, so the next lesson is not a surprise. Create hello.js, run node hello.js, edit one word, and run it again. Then start the practice exercise and circulate, checking the current folder first.",
          },
          {
            minutes: 10,
            title: "Errors and knowledge checks",
            detail: "Give the four knowledge checks. Then cause one failure on purpose by running node from the wrong folder, and another by showing a package.json with a trailing comma. Read the first line of each error aloud and match it to the fix before you repair it. Invite two students to restate the fix.",
          },
          {
            minutes: 10,
            title: "Recap and written homework",
            detail: "Ask three students to answer what a backend is, what Node.js is, and what package.json records. Point them at the teaching note that names Express as the server package for this course. Explain the written response: versions, the printed sentence, and the kitchen comparison. Show where the lesson response is submitted.",
          },
        ],
        explain: [
          "A backend is a separate programme, not a hidden React component.",
          "The browser is a client. A Node process can be a server. localhost means this computer.",
          "Node runs JavaScript with no document. console.log prints to the terminal.",
          "PATH and a new terminal explain most 'command not found' problems after a Windows install.",
          "package.json is the shopping list. node_modules can be rebuilt with npm install.",
        ],
        questions: [
          "What happened to your week 12 tasks when you refreshed the page?",
          "If the browser is the dining room, what decisions belong in the kitchen?",
          "Why do we close and reopen the terminal after installing Node?",
          "What is the difference between a file you wrote and a package npm installed?",
        ],
        demonstration: "Install or confirm Node live, using the installer or apt commands that match the machines in the room. Then create backend-practice, run npm init -y, write hello.js, and run it. Show the output in the terminal and contrast it with a browser tab that never changes.",
        practice: "Students write down node -v and npm -v, then create their own folder and a file that prints two original lines. The instructor checks that the terminal's current folder contains both package.json and the JavaScript file before the student runs node.",
        expectedOutcomes: [
          "Each student can say what the frontend and backend are for.",
          "node -v and npm -v succeed in a new terminal.",
          "A student-written file prints two lines when run with node.",
        ],
        difficulties: [
          {
            issue: "A student cannot find the terminal or types the command into the browser address bar.",
            help: "Stand with them and open the terminal using the Start menu, Spotlight, or Ctrl+Alt+T. Ask them to type node -v only after the prompt is visible. Leave the browser for the version check.",
          },
          {
            issue: "The workplace computer blocks the installer or apt.",
            help: "Pair them with a classmate for the live command. They still write the explanation and the version numbers they observed. Offer a time to try again on a computer where installs are allowed.",
          },
        ],
        homework: "Students submit a lesson response with their operating system, both version numbers, the sentence their file printed, and a short frontend versus backend explanation using an everyday comparison.",
        assessment: "Listen for students who still describe the backend as a hidden div. Use the knowledge checks and the printed sentence as evidence. The written response is the session homework, not the module assignment.",
        recap: "Restate the four tools they now have: a backend idea, Node in the terminal, npm, and package.json. Point to the next session, where the file stays running and answers the browser with JSON.",
        knowledgeCheckAnswers: [
          {
            id: "backend-place",
            answer: "On a server, which is your own computer during this lesson",
            explanation: "The backend is a programme you start on a computer. In class that computer is theirs, reached later as localhost.",
          },
          {
            id: "npm-role",
            answer: "It installs packages and records them for the project",
            explanation: "npm downloads packages and lists them in package.json. It does not paint the page or replace the browser.",
          },
          {
            id: "node-room",
            answer: "False",
            explanation: "Node runs JavaScript outside the browser. React still uses the browser. They are different rooms for the same language.",
          },
          {
            id: "package-card",
            answer: "It stores the project name and the packages the project depends on",
            explanation: "package.json is the project card and the dependency list. It is not the page, the commit history, or a database table.",
          },
        ],
      },
    },
    {
      slug: "http-and-a-simple-server",
      sessionNumber: 26,
      title: "HTTP and a simple server",
      estimatedMinutes: 90,
      difficulty: "Guided practice",
      requiresOs: true,
      content: {
        overview: {
          about: "This lesson explains how a server speaks HTTP. You will learn requests, responses, methods, status codes, headers, and JSON, then build one Express server with a single endpoint that returns JSON to the browser.",
          why: "A Node file that prints text is not yet a server. HTTP is the shared language a browser and a server use, and one JSON endpoint is the smallest complete conversation.",
          alreadyKnow: "You can install Node.js, create package.json, and run a JavaScript file in the terminal.",
        },
        objectives: [
          "Explain what a server does while it is running.",
          "Describe an HTTP request and response, including the method, status code, and headers.",
          "Read and write a small JSON object with double quotes and no trailing comma.",
          "Build an Express server with one GET endpoint that returns JSON.",
          "Start the server, test it in the browser, and stop it on purpose.",
        ],
        prerequisites: [
          {
            label: "Install Node.js and run a JavaScript file from the terminal",
            lessonSlug: "backend-and-nodejs",
          },
        ],
        teachingNotes: [
          {
            heading: "A server is a programme that keeps waiting",
            markdown: md(`
              A server is a programme that starts, then waits for clients. Your hello.js file did not do that. It printed a line and finished. A server stays running so that a request can arrive later. While it is running, the terminal looks busy or quiet, and it does not give you the prompt back. That waiting is the point.

              Servers exist because a page in one place needs answers from a programme that can keep rules and, later, data. The problem a server solves is availability: the client can ask at the moment the person clicks, not only at the moment you edited the file.

              ### What you will feel in the terminal

              You start the server with ¬node server.js¬. A short message such as "listening" means it is waiting. You leave that terminal alone. You use the browser, or a second terminal, for the next step. When you want the server to stop, you click the server's terminal and press Ctrl+C. The prompt returns. If you refresh the browser after that, the page cannot connect. The failure is useful. It proves the browser was talking to a programme you started, not to a file the browser opened by itself.

              :::misunderstanding The server is a file the browser opens
              The browser does not open server.js the way it opens an HTML file. Node runs server.js. The browser sends a request to the running programme. If Node is not running, the file sitting on disk does not answer.
              :::

              :::example The kitchen light
              A server that is running is a kitchen with the light on. A server you stopped is a dark kitchen. The dining room can still look fine, and the order slip has nowhere to go.
              :::

              Localhost and a port number tell the browser which waiting programme to call. A port is a numbered door on your computer. This lesson uses port 3000. The address http://localhost:3000 means "the programme on this computer that is listening at door 3000". Another programme using that door will cause an error when your server tries to start.
            `),
          },
          {
            heading: "HTTP is the language of the conversation",
            markdown: md(`
              HTTP is the set of rules a client and a server use to exchange messages on the web. The letters stand for HyperText Transfer Protocol. You do not need the history in order to use it. You do need the shape of a message, because every browser request and every API you build later follows that shape.

              HTTP exists so that many different programmes can talk without inventing a private format each time. A browser, your Express server, and tools you have not met can share one pattern. The problem it solves is agreement: both sides know where to look for the action, the path, and the body.

              ### The parts you will use this week

              A request has a method, a path, and sometimes headers and a body. The method is the kind of action, such as GET. The path is the address of the thing, such as /api/greeting. Headers are small labelled notes, such as the kind of text being sent. The body is the main content, when there is any.

              A response has a status code, headers, and sometimes a body. The status code is a short number that summarises the result. The body of your first response will be JSON.

              Think of a very strict postcard. The method is what you want done. The path is the addressee. Headers are notes in the margin. The body is the letter. The status code is the short reply printed on the card that comes back.

              :::misunderstanding HTTP is the same thing as HTML
              HTML describes a page. HTTP carries messages, and those messages might contain HTML, JSON, or an error. This lesson's message contains JSON, not a full HTML document.
              :::

              You already used HTTP without naming it, every time you typed an address into a browser. The browser built a request, a server answered, and the browser drew the page. Now you will see the reply as data you chose.
            `),
          },
          {
            heading: "Requests, responses, methods, and status codes",
            markdown: md(`
              A request is the client's message. A response is the server's message back. They travel as a pair. A response without a request is just a programme talking to itself. A request without a response leaves the browser waiting until it gives up.

              Methods name the action. GET asks to read something. POST asks to create something. PUT asks to replace something. PATCH asks to change part of something. DELETE asks to remove something. This lesson uses GET only, because reading is the smallest complete round trip. The other names matter so they are not mysterious when you meet them next week. You do not need five routes today.

              ### Status codes you can remember

              A status code is a three-digit summary. 200 means the request succeeded. 404 means the server is running, and it has no resource at that path. 500 means the server hit an error in its own code. There are many other codes. These three explain most of what beginners see.

              If the browser says it cannot connect, you may not get a status code at all. That is different from 404. No connection means no server answered. A 404 means a server answered and did not know that path. Read the failure before you change your JavaScript.

              Headers are the labelled notes. A header you will see is Content-Type. When the body is JSON, that header says so, often as application/json. Express sets it for you when you call ¬response.json¬. You can look at headers later in the browser's network tools. You do not need to type them by hand today.

              :::example 200 and 404 on the same server
              GET /api/greeting can return 200 and a JSON body. GET /api/missing, if you never wrote that path, returns 404. The server is fine in both cases. The path is what changed.
              :::

              :::misunderstanding A 404 means Node was not installed
              404 comes from a server that is already running. A missing Node install fails earlier, in the terminal, with a message that the command was not found.
              :::
            `),
          },
          {
            heading: "JSON is the packing list",
            markdown: md(`
              JSON is a text format for data. The name stands for JavaScript Object Notation. It looks a little like a JavaScript object, and it is stricter, because it must be readable by programmes that are not JavaScript.

              JSON exists so a browser and a server can exchange structured data without sending a whole HTML page. The problem it solves is packing: both sides can agree on names and values. A task list can travel as text and be unpacked into objects at the other end.

              ### Rules that keep JSON valid

              An object is wrapped in curly braces. A list is wrapped in square brackets. Keys are strings in double quotes. String values use double quotes too. Numbers and booleans, true and false, are written without quotes. Commas separate items. There is no comma after the last item. Single quotes are not allowed. Comments are not allowed.

              ¬¬¬json
              {
                "message": "Hello from the server",
                "ok": true
              }
              ¬¬¬

              In an Express file you usually write a JavaScript object and pass it to ¬response.json¬. Express turns that object into JSON text and sets the header. That is safer than typing the quotes yourself. If you instead send a hand-written string with bare keys, the receiver may say the JSON is invalid.

              :::misunderstanding A JavaScript object and a JSON text are the same typing
              In a JavaScript file, { ok: true } is an object, and the key does not need quotes. JSON text, the message on the wire, must say { "ok": true }. response.json accepts the JavaScript object and produces the stricter text.
              :::

              :::warning Trailing commas
              A trailing comma is legal in many JavaScript objects and illegal in JSON. package.json is JSON. A response body that a browser must parse is JSON. When a tool says the JSON is invalid, look for a comma after the last field first.
              :::

              You have already written objects in JavaScript lessons. JSON is that idea turned into a careful letter. The letter can leave your server and be read by the browser.
            `),
          },
          {
            heading: "One Express server and one endpoint",
            markdown: md(`
              Express is the package this course uses to build beginner servers. An endpoint is one path the server knows how to answer, together with the method it accepts. Your endpoint this lesson is GET /api/greeting.

              The pieces fit in a short file. You load Express with ¬require¬. You create an application. You describe one route: when a GET request arrives for /api/greeting, call a function. That function receives the request and the response. You send JSON with ¬response.json¬. You call ¬app.listen¬ with port 3000 so the programme keeps waiting.

              ¬¬¬js
              const express = require("express");
              const app = express();

              app.get("/api/greeting", (request, response) => {
                response.json({ message: "Hello from the server", ok: true });
              });

              app.listen(3000, () => {
                console.log("Listening on http://localhost:3000");
              });
              ¬¬¬

              ### Why require, and why the terminal must stay open

              ¬require("express")¬ loads the package npm installed into node_modules. This beginner server uses require, not the import syntax you used in React. A package.json created by ¬npm init -y¬ does not put the project into module mode, so require is the style that runs without extra settings. Mixing import into this file produces an error about being outside a module. Keep one style in server.js.

              ¬app.get¬ reads the method and the path. The function runs only when both match. ¬response.json¬ sets the JSON header and sends the body. ¬app.listen¬ opens port 3000 and does not let the file finish. That is why the prompt does not return.

              Install the package from the project folder with ¬npm install express¬. npm writes express into dependencies. If you skip that step, Node reports that it cannot find the module named express.

              :::tip Test the door you opened
              Visit http://localhost:3000/api/greeting while the server is running. The path must match the route, including the word api. The site root, http://localhost:3000 alone, is a different path. You did not write a route for it, so a 404 there can be correct.
              :::

              This file is the assignment's shape. One project, one package, one GET endpoint, one JSON object. Next week you will add more methods. Today, success is a browser that shows your JSON and a terminal that is still running the server.
            `),
          },
          {
            heading: "How to read the result and the common breaks",
            markdown: md(`
              Open the address only after you see the listening message. The browser should show the JSON, sometimes formatted, sometimes on one line. Both are the same data. Look for the keys you sent, message and ok, or whichever names you chose.

              If the browser says the site cannot be reached, treat it as a connection failure. Check that node server.js is still running, that you used http://localhost and the same port as app.listen, and that you did not type https by habit. https on a local practice server often fails because you have not set up a certificate. Use http for localhost this week.

              ### Port already in use

              If the terminal says EADDRINUSE, or that port 3000 is already in use, another programme is holding that door. Often it is a previous server you forgot to stop. Go to the terminal where it is running and press Ctrl+C. Start your server again. If you cannot find the other programme, change the port in app.listen to 3001 and visit http://localhost:3001/api/greeting. The number in the file and the number in the address have to match.

              ### Invalid JSON and missing packages

              If you send a hand-built string instead of using response.json, the browser may fail to parse it. Switch to response.json and pass a normal JavaScript object. If package.json itself is invalid, npm install fails before the server starts. Fix the JSON, then install again.

              If Node says it cannot find express, you are in the wrong folder or you have not run npm install express. The folder that contains server.js should also contain package.json and, after a successful install, node_modules.

              :::misunderstanding I can close the terminal and leave the server running
              Closing the terminal stops the programme it was running. The server is not installed into the browser. Start it again when you want the endpoint to answer.
              :::

              When the JSON appears, stop the server with Ctrl+C, refresh, and notice the connection failure. Start it once more. That loop is the whole lesson in one minute: a running programme, a request, a JSON response, and silence when the programme stops.
            `),
          },
        ],
        vocabulary: [
          {
            term: "HTTP",
            definition: "The set of rules a browser and a server use to send requests and responses on the web.",
          },
          {
            term: "Request",
            definition: "The client's message. It includes a method, a path, and sometimes headers and a body.",
          },
          {
            term: "Response",
            definition: "The server's reply. It includes a status code, headers, and sometimes a body such as JSON.",
          },
          {
            term: "Method",
            definition: "The action named on a request, such as GET to read. Other methods include POST, PUT, PATCH, and DELETE.",
          },
          {
            term: "Status code",
            definition: "A three-digit number on a response, such as 200 for success or 404 for a path the server does not have.",
          },
          {
            term: "Header",
            definition: "A labelled note attached to a request or response, such as Content-Type saying the body is JSON.",
          },
          {
            term: "JSON",
            definition: "A strict text format for data, using double quotes, that programmes can exchange and parse.",
          },
          {
            term: "Endpoint",
            definition: "One method and path a server knows how to answer, such as GET /api/greeting.",
          },
        ],
        demonstrations: [
          {
            title: "Build a greeting endpoint",
            intro: "You will create a project, install Express, write one GET route that returns JSON, open it in the browser, and stop the server to see the connection fail.",
            steps: [
              "Open a terminal for your operating system and create a folder named greeting-server. Move into that folder.",
              "If node -v fails, install Node with the steps for your system before you continue.",
              "Run npm init -y so the folder has a package.json file.",
              "Run npm install express and wait until it finishes. Confirm that node_modules appeared.",
              "Create server.js with a GET /api/greeting route that sends JSON through response.json, and listen on port 3000.",
              "Run node server.js and leave that terminal open. Read the listening line.",
              "In a browser, open http://localhost:3000/api/greeting and find your JSON fields.",
              "Press Ctrl+C in the server terminal, refresh the browser, then start the server again.",
            ],
            expected: "While node server.js is running, the browser shows a JSON object from /api/greeting. After Ctrl+C, a refresh cannot connect.",
            verify: "The keys on screen match the object in response.json, and the terminal shows a listening message before you open the browser.",
            ifItFails: "If the module express is missing, run npm install express in this folder. If port 3000 is in use, stop the other programme or switch the file and the address to 3001.",
            os: {
              sameOnAllPlatforms: "Once the terminal is open, the project commands are the same: npm init -y, npm install express, and node server.js. Open the terminal first in the way your system expects. On Windows, use the Start menu and open Windows Terminal or Command Prompt. On macOS, use Spotlight and open Terminal. On Ubuntu, use the application menu or press Ctrl+Alt+T. Then visit http://localhost:3000/api/greeting in a browser. Install Node only if node -v fails, and use the installer that matches your system.",
              windows: [
                "Press the Windows key, type Terminal, and open Windows Terminal or Command Prompt.",
                "If node -v is not recognized, download the Windows Installer (.msi) from https://nodejs.org, run it, allow PATH to be updated, and open a new terminal.",
                "Move into the project folder. In this course that path is written learning/week-13/greeting-server. Then run the shared npm and node commands.",
              ],
              macos: [
                "Press Command and Space, type Terminal, and press Return.",
                "If node -v fails, download the macOS Installer (.pkg) from https://nodejs.org and run it. Do not install Homebrew for this lesson.",
                "Move into the project folder under your home directory, then run the shared npm and node commands.",
              ],
              linux: [
                "Open Terminal from the application menu, or press Ctrl+Alt+T on Ubuntu.",
                "If node -v fails, run sudo apt update and then sudo apt install -y nodejs npm. Open a new terminal afterwards.",
                "Move into the project folder, then run the shared npm and node commands.",
              ],
              identify: [
                "Use the Start menu as the Windows clue, the Apple menu as the macOS clue, and Activities or Ctrl+Alt+T as the Ubuntu clue.",
                "Follow only that system's terminal and install steps. The npm commands come after the terminal is open.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "A one-endpoint Express server",
            filename: "server.js",
            language: "javascript",
            code: "const express = require(\"express\");\n\nconst app = express();\nconst port = 3000;\n\napp.get(\"/api/greeting\", (request, response) => {\n  response.json({\n    message: \"Hello from the server\",\n    ok: true\n  });\n});\n\napp.listen(port, () => {\n  console.log(\"Listening on http://localhost:\" + port);\n});\n",
            explanation: "This file loads Express, creates an application, and answers GET /api/greeting with a JavaScript object. response.json converts that object into JSON text. listen keeps the process waiting on port 3000. Run it with node server.js after npm install express.",
            lineNotes: [
              { focus: "require(\"express\")", note: "Loads the Express package from node_modules. The install step must have succeeded in this folder." },
              { focus: "app.get", note: "Registers one route. The function runs only for a GET request whose path is /api/greeting." },
              { focus: "response.json", note: "Sends the object as JSON and sets the JSON content type. You pass a JavaScript object, not a hand-typed JSON string." },
              { focus: "app.listen", note: "Opens port 3000 and keeps the programme running. Ctrl+C in this terminal stops it." },
            ],
            expectedOutput: "The terminal prints Listening on http://localhost:3000. The browser at /api/greeting shows the message and ok fields.",
            level: "practical",
          },
          {
            title: "The JSON text the browser receives",
            filename: "greeting.json",
            language: "json",
            code: "{\n  \"message\": \"Hello from the server\",\n  \"ok\": true\n}\n",
            explanation: "This is the text shape of the response body. Express creates it from the object in server.js. Keys and the string value use double quotes. The boolean true has no quotes. There is no comma after the last field.",
            lineNotes: [
              { focus: "message", note: "A JSON key must be in double quotes. A bare word would make this file invalid." },
              { focus: "ok", note: "true is a JSON boolean. Writing \"true\" with quotes would make it a string instead." },
            ],
            expectedOutput: "A JSON reader accepts the file. Adding a comma after true, or switching to single quotes, makes it invalid JSON.",
            level: "basic",
          },
        ],
        exercises: [
          {
            title: "Change the JSON and prove the server is live",
            difficulty: "practice",
            prompt: "Start from the greeting server and change the JSON so it could not be copied from the demonstration without thought.",
            steps: [
              "Add a third field to the object in response.json, such as a course name or your first name.",
              "Restart the server. A file change does not appear until you stop the old process and run node server.js again.",
              "Reload http://localhost:3000/api/greeting and find the new field.",
              "Stop the server, reload, and write down the browser message that shows the connection failed.",
            ],
            expectedOutcome: "The browser shows your third field while the server is running, and it cannot connect after you stop the process.",
          },
          {
            title: "Cause a 404 and explain it",
            difficulty: "stretch",
            prompt: "Use the running greeting server to see the difference between a known path and an unknown path.",
            steps: [
              "Start the server and open /api/greeting. Note the JSON.",
              "Change only the path in the address bar to /api/unknown and reload.",
              "Write one sentence that says whether the server was running, and what the status tells you.",
              "Do not add a new route unless you want to. The exercise is to read the 404, not to remove it.",
            ],
            expectedOutcome: "You can explain that /api/greeting returns your JSON and /api/unknown answers with a not-found result while the same server stays running.",
          },
        ],
        troubleshooting: [
          {
            problem: "Cannot find module 'express'.",
            why: "The express package is not installed in this project, or the terminal is in a different folder from server.js and package.json.",
            solution: "Move into the folder that contains server.js. Run npm install express. Check that node_modules exists, then run node server.js again.",
          },
          {
            problem: "The terminal reports EADDRINUSE or says port 3000 is already in use.",
            why: "Another programme, often an earlier Node server, is already listening on that port. Two programmes cannot hold the same door.",
            solution: "Find the terminal that is still running the old server and press Ctrl+C. Start yours again. If you cannot find it, change the port in app.listen and in the browser address to 3001.",
          },
          {
            problem: "The browser says it cannot reach the site, or the connection is refused.",
            why: "No server is accepting connections on that address. The process stopped, the port in the address does not match app.listen, or the address used https instead of http.",
            solution: "Start node server.js and leave it running. Use http://localhost and the same port number the listening line printed. Refresh only after you see that line.",
          },
          {
            problem: "The browser or a tool says the JSON is invalid.",
            why: "The body was hand-written text that breaks JSON rules, such as single quotes or a trailing comma. package.json can fail for the same reason before the server even starts.",
            solution: "Send objects with response.json instead of a hand-built string. If the error points at package.json, restore double quotes and remove the comma after the last field.",
          },
        ],
        knowledgeChecks: [
          {
            id: "get-meaning",
            question: "What does the GET method ask the server to do?",
            format: "multiple_choice",
            options: [
              "Read something and send it back",
              "Delete the server programme from the disk",
              "Install npm packages",
              "Close the browser",
            ],
          },
          {
            id: "status-200",
            question: "What does status code 200 mean?",
            format: "multiple_choice",
            options: [
              "The request succeeded",
              "The path was not found",
              "Node.js is not installed",
              "The JSON used single quotes",
            ],
          },
          {
            id: "json-quotes",
            question: "JSON text may use single quotes around keys, just like some JavaScript styles.",
            format: "true_false",
            options: ["True", "False"],
          },
          {
            id: "server-running",
            question: "You close the terminal that was running node server.js. What happens to the endpoint?",
            format: "multiple_choice",
            options: [
              "It keeps answering forever because the file is saved",
              "It stops answering because the programme stopped",
              "The browser saves the server inside a cookie",
              "Express restarts itself the next morning",
            ],
          },
        ],
        homework: {
          description: "Complete the week 13 assignment: a Node.js server with one JSON endpoint. The assignment page has the full instructions, the rubric, and the place to submit your files or repository link.",
          requirements: [
            "The server uses Express and starts with Node.",
            "One GET endpoint returns JSON with at least two fields.",
          ],
          deliverables: ["The week 13 module assignment submission"],
          submission: "Submit the week 13 assignment from the assignment page. That submission is the homework for this session.",
          criteria: [
            "The endpoint returns JSON while the server is running.",
            "package.json lists Express as a dependency.",
          ],
          submissionKind: "module_assignment",
        },
        summary: [
          "A server is a programme that stays running and answers requests. Stopping it with Ctrl+C makes the browser unable to connect.",
          "HTTP messages have a method, a path, headers, a status code, and sometimes a body. GET reads. 200 means success. 404 means that path is unknown.",
          "JSON is strict text: double quotes, no trailing comma. response.json turns a JavaScript object into that text.",
          "An Express endpoint such as GET /api/greeting is one method plus one path. npm install express has to succeed before require can load it.",
        ],
        nextLesson: {
          title: "REST APIs",
          why: "One greeting endpoint proves the conversation works. Next you will organise several task routes into a small API.",
          lessonSlug: "rest-apis",
        },
      },
      guide: {
        sessionNumber: 26,
        week: 13,
        title: "HTTP and a simple server",
        durationMinutes: 90,
        objectives: [
          "Students can point to method, path, status, and body in a real request.",
          "Students can explain 200, 404, and a refused connection as different failures.",
          "Students install Express and run one JSON endpoint on localhost.",
          "Students can stop the server and predict what the browser will do.",
        ],
        tools: ["Node.js and npm", "A terminal", "A browser", "Visual Studio Code", "Express installed in a practice folder"],
        preparation: [
          "Confirm node -v works on the instructor machine and that port 3000 is free. Stop any old demo server before class.",
          "Prepare a finished server.js and also a broken variant that sends a hand-written JSON string with single quotes.",
          "Have the Windows, macOS, and Ubuntu Node install steps ready for anyone whose node command still fails from last session. Do not use Homebrew.",
          "Open the browser network panel once so you can show a 200 status if a student asks where the number lives.",
        ],
        flow: [
          {
            minutes: 5,
            title: "From a file that ends to a file that waits",
            detail: "Ask a student to remind the class what node hello.js did and when the prompt came back. Say that today's file will not give the prompt back, because a server has to keep waiting. Write GET /api/greeting and port 3000 on the board before any theory.",
          },
          {
            minutes: 15,
            title: "HTTP with the postcard picture",
            detail: "Explain method, path, headers, body, and status code using a postcard. Give GET, POST, PUT, PATCH, and DELETE one sentence each, and say only GET will be built today. Contrast status 200, status 404, and a browser that cannot connect at all. Ask which of those three they would expect if the terminal is closed.",
          },
          {
            minutes: 20,
            title: "JSON rules beside a JavaScript object",
            detail: "Write a JavaScript object and the JSON text it becomes on two halves of the board. Mark double quotes, the unquoted boolean, and the ban on trailing commas. Show response.json as the function that does the conversion. Then show a single-quoted string that a parser rejects, so invalid JSON is a seen error, not a slogan.",
          },
          {
            minutes: 30,
            title: "Live Express endpoint",
            detail: "Create greeting-server, run npm init -y and npm install express, and write the GET route together. Start node server.js, visit the path, and only then try the bare localhost root so the class sees a 404 from a living server. Stop with Ctrl+C and refresh. Students then add a third JSON field in the practice exercise. Circulate and check the folder before you debug the code.",
          },
          {
            minutes: 10,
            title: "Port, module, and connection failures",
            detail: "If nobody hit a real error, cause port 3000 to be busy by starting the server twice, and show EADDRINUSE. Also rename the folder in a second terminal and show Cannot find module express. Match each message to the troubleshooting list. Run the knowledge checks after the errors, not before, so the questions sit on fresh experience.",
          },
          {
            minutes: 10,
            title: "Assignment briefing",
            detail: "Open the week 13 assignment and read the endpoint requirement, the two JSON fields, and the written note about request and response. Show how to submit. Preview next week as more than one route for tasks, without building those routes today. End by asking one student to say what Ctrl+C changes.",
          },
        ],
        explain: [
          "A listening server occupies a port and must be left running while you test.",
          "GET reads. 200 succeeded. 404 means the server is up and the path is unknown. A refused connection means nothing answered.",
          "response.json accepts a JavaScript object and writes JSON text.",
          "require('express') works after npm install express in the same project. This file uses require, not React's import style.",
        ],
        questions: [
          "What is different between hello.js finishing and server.js waiting?",
          "If you see 404, is Node missing, or is the path missing?",
          "Why does the browser address include both localhost and a port number?",
          "What changes on screen if you edit the object and forget to restart Node?",
        ],
        demonstration: "Build the greeting server from an empty folder, install Express, start it, load /api/greeting, load an unknown path, stop the process with Ctrl+C, and show the refused connection. Keep the server terminal visible the whole time.",
        practice: "Students add a third field to the JSON, restart the server, and prove the field appears. They then stop the server and write the browser's connection message in their own words.",
        expectedOutcomes: [
          "A student can load their own JSON endpoint while the terminal is still running Node.",
          "A student can tell 404 apart from a refused connection.",
          "package.json lists express after npm install.",
        ],
        difficulties: [
          {
            issue: "A student edits server.js and keeps refreshing, but the JSON never changes.",
            help: "Look at the terminal. If the old process is still running, the file on disk is not the file in memory. Stop it with Ctrl+C and run node server.js again, then refresh.",
          },
          {
            issue: "require is not defined, or the file uses import and Node says it is outside a module.",
            help: "This lesson's server uses require, matching a package.json from npm init -y. Replace import lines with const express = require('express'). Do not add a module setting during class.",
          },
        ],
        homework: "Students submit the module assignment: an Express server with one JSON GET endpoint, package.json, and a short note that explains request and response.",
        assessment: "The running endpoint is the evidence. Ask each student to show the listening terminal and the browser together. Use the knowledge checks to confirm 200, GET, and JSON quotes. Grade the files through the week assignment, not through the lesson response box.",
        recap: "A server waits, HTTP carries the postcard, JSON is the strict letter, and Express answered one path. Next week that pattern grows into several task routes.",
        knowledgeCheckAnswers: [
          {
            id: "get-meaning",
            answer: "Read something and send it back",
            explanation: "GET is the method for reading. Creating, replacing, partial updates, and deletion use other methods, which the next week covers.",
          },
          {
            id: "status-200",
            answer: "The request succeeded",
            explanation: "200 means the server handled the request successfully. A missing path is 404, and a missing Node install never produces this code.",
          },
          {
            id: "json-quotes",
            answer: "False",
            explanation: "JSON requires double quotes around keys and strings. Single quotes make the text invalid even if it looks like JavaScript.",
          },
          {
            id: "server-running",
            answer: "It stops answering because the programme stopped",
            explanation: "Closing the terminal stops node server.js. The saved file does not answer by itself. Start the command again to open the port.",
          },
        ],
      },
    },
  ],
  assignment: {
    slug: "week-13-assignment",
    title: "Node server with one JSON endpoint",
    summary: "Build a small Express server that answers one GET address with JSON, and explain the request and response in your own words.",
    instructions: "Build a small Node.js server with Express. The server answers one address with JSON.\n\nCreate a new folder. Open a terminal the way your operating system expects, move into that folder, and run npm init -y. That command creates package.json. Install Express with npm install express. Create a file named server.js.\n\nIn server.js, load Express with require, create an application, and listen on port 3000. Add one GET route for /api/greeting. GET means the caller wants to read something. When you open http://localhost:3000/api/greeting in a browser, the server must respond with JSON. Call response.json with an object that has at least two fields, such as a message and a value named ok.\n\nKeep the terminal open while you test. The server is a running programme. If you stop it with Ctrl+C, the browser cannot connect. You do not need a database, a React page, or a second route. Those come in later weeks.\n\nOn Windows, use the Node installer from nodejs.org if node is missing. On macOS, use the official pkg from nodejs.org. On Ubuntu, install with sudo apt install -y nodejs npm. Do not require Homebrew.\n\nWrite a short note in your own words. Say what a request is, what a response is, and what you saw in the browser. Submit server.js, package.json, and the note, or a repository link that contains those files. The instructor will run npm install and then node server.js.",
    objectives: [
      "Create a Node project with package.json.",
      "Install the Express package with npm.",
      "Answer one HTTP GET request with JSON.",
      "Describe a request and a response in plain language.",
    ],
    requirements: [
      "package.json is valid JSON and lists express under dependencies.",
      "The server listens on a port you name in the note.",
      "GET /api/greeting returns JSON with at least two fields.",
      "The written note explains a request and a response in your own words.",
      "After npm install, node server.js starts the server without an error.",
    ],
    deliverables: [
      "server.js",
      "package.json",
      "A short written note, or the same note in the repository",
    ],
    rubric: [
      {
        criterion: "Project setup",
        points: 5,
        description: "package.json is valid and express is listed in dependencies so npm install can rebuild the project.",
      },
      {
        criterion: "JSON endpoint",
        points: 5,
        description: "GET /api/greeting returns JSON with at least two fields while the server is running.",
      },
      {
        criterion: "Server runs",
        points: 5,
        description: "node server.js listens without an error after npm install, and the port in the note matches the file.",
      },
      {
        criterion: "Written explanation",
        points: 5,
        description: "The note describes a request and a response in the student's own words and mentions what the browser showed.",
      },
    ],
    points: 20,
    instructorSolution: `const express = require("express");

const app = express();
const port = 3000;

app.get("/api/greeting", (request, response) => {
  response.status(200).json({
    ok: true,
    message: "Hello from the week 13 server",
    course: "Backend and Node.js"
  });
});

app.listen(port, () => {
  console.log("Listening on http://localhost:" + port + "/api/greeting");
});

// package.json must include:
// { "name": "week-13-greeting", "version": "1.0.0", "main": "server.js", "dependencies": { "express": "^4.21.2" } }
// Student note: a request asks for /api/greeting. The response is status 200 and the JSON object above.
`,
  },
  quiz: {
    slug: "week-13-quiz",
    title: "Week 13 quiz",
    passingScore: 70,
    allowRetakes: true,
    questions: [
      {
        slug: "backend-role",
        type: "multiple_choice",
        prompt: "What is a backend in the picture used in this week?",
        options: [
          { id: "a", text: "The kitchen: a programme that receives requests and sends responses" },
          { id: "b", text: "A CSS file that hides a heading" },
          { id: "c", text: "The browser tab itself" },
          { id: "d", text: "A folder of photographs" },
        ],
        correct: { optionId: "a" },
        explanation: "The backend is the separate programme behind the page. The dining-room picture keeps it distinct from the frontend the person sees.",
        points: 1,
      },
      {
        slug: "node-place",
        type: "multiple_choice",
        prompt: "Where does Node.js run the JavaScript files you start from the terminal?",
        options: [
          { id: "a", text: "Outside the browser, on your computer" },
          { id: "b", text: "Only inside a React component" },
          { id: "c", text: "Only on a remote phone" },
          { id: "d", text: "Inside package.json as a style rule" },
        ],
        correct: { optionId: "a" },
        explanation: "Node.js runs JavaScript outside the browser. There is no page document unless your code creates a server that answers a client.",
        points: 1,
      },
      {
        slug: "install-path",
        type: "multiple_choice",
        prompt: "Which install path matches this course for a student on macOS?",
        options: [
          { id: "a", text: "The official macOS pkg from nodejs.org, without requiring Homebrew" },
          { id: "b", text: "The Windows .msi installer" },
          { id: "c", text: "sudo apt install on a Mac" },
          { id: "d", text: "Renaming a text file to node.exe" },
        ],
        correct: { optionId: "a" },
        explanation: "macOS uses the pkg installer from nodejs.org in this course. Windows uses the .msi, and Ubuntu uses apt. The installers are not interchangeable.",
        points: 1,
      },
      {
        slug: "package-json-true",
        type: "true_false",
        prompt: "package.json is a JSON file that can list the packages a Node project depends on.",
        correct: { value: true },
        explanation: "package.json records the project and its dependencies. npm reads it when it installs packages into node_modules.",
        points: 1,
      },
      {
        slug: "status-200",
        type: "multiple_choice",
        prompt: "A running server answers GET /api/greeting with status 200. What does that status mean?",
        options: [
          { id: "a", text: "The request succeeded" },
          { id: "b", text: "The server has no such path" },
          { id: "c", text: "The terminal was closed" },
          { id: "d", text: "npm is not installed" },
        ],
        correct: { optionId: "a" },
        explanation: "Status 200 means success. A missing path is usually 404. A closed terminal often means the browser cannot connect at all.",
        points: 1,
      },
      {
        slug: "get-vs-404",
        type: "multiple_choice",
        prompt: "Your server is running and the browser gets 404 for /api/unknown. What is the most accurate reading?",
        options: [
          { id: "a", text: "The server answered, and it does not have that path" },
          { id: "b", text: "Node.js was never installed" },
          { id: "c", text: "The JSON used too many double quotes" },
          { id: "d", text: "Port 3000 is free, so no programme can answer" },
        ],
        correct: { optionId: "a" },
        explanation: "A 404 is a real response from a living server. It means that path is not one of your routes. It is different from a refused connection.",
        points: 1,
      },
      {
        slug: "read-the-route",
        type: "code_reading",
        prompt: "What does the browser receive when it requests GET /api/greeting on this server?",
        codeSnippet: "app.get(\"/api/greeting\", (request, response) => {\n  response.json({ ok: true, message: \"Hello\" });\n});",
        options: [
          { id: "a", text: "A JSON object with ok set to true and a message" },
          { id: "b", text: "An HTML page with a heading" },
          { id: "c", text: "Nothing, because GET is not allowed to return data" },
          { id: "d", text: "The contents of node_modules" },
        ],
        correct: { optionId: "a" },
        explanation: "response.json sends the object as JSON. GET is allowed to return data. This route does not send an HTML document.",
        points: 1,
      },
      {
        slug: "single-quotes",
        type: "true_false",
        prompt: "This text is valid JSON: { 'ok': true }",
        correct: { value: false },
        explanation: "JSON requires double quotes around keys. Single quotes make the text invalid, even though a JavaScript file would accept a similar object.",
        points: 1,
      },
      {
        slug: "w13-q9-http",
        type: "multiple_choice",
        prompt: "Using the greeting server, what is a request and what is a response?",
        options: [
          { id: "a", text: "A request is the JSON body; a response is the browser tab title" },
          { id: "b", text: "A request is the client asking; a response is the server's reply" },
          { id: "c", text: "A request is only a password; a response is only a CSS file" },
          { id: "d", text: "They are two names for the same database row" },
        ],
        correct: { optionId: "b" },
        explanation: "A request is the message asking for the greeting. A response is what the server sends back, including the JSON. The pair is the whole HTTP conversation.",
        points: 2,
      },
    ],
  },
};
