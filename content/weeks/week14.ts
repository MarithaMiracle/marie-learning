import type { ModuleSeed } from "../../src/lib/content-types";

function md(text: string): string {
  const cleaned = text.replaceAll("¬", "`");
  const lines = cleaned.replace(/^\n/, "").replace(/\n\s*$/, "").split("\n");
  const indents = lines.filter((line) => line.trim().length > 0).map((line) => line.match(/^ */)?.[0].length ?? 0);
  const margin = indents.length === 0 ? 0 : Math.min(...indents);
  return lines.map((line) => (line.length >= margin ? line.slice(margin) : line.trim())).join("\n").trim();
}

export const week14: ModuleSeed = {
  slug: "week-14-apis",
  number: 14,
  weekNumber: 14,
  monthLabel: "Month 4 — Backend, databases and full-stack development",
  title: "REST APIs and integration",
  description: "Let a React page talk to an Express server using clear requests, JSON, and basic checks on the data.",
  lessons: [
    {
      slug: "rest-apis",
      sessionNumber: 27,
      title: "REST APIs",
      estimatedMinutes: 90,
      difficulty: "Guided practice",
      requiresOs: true,
      content: {
        overview: {
          about: "This lesson explains what an API is and how two programmes communicate through it. You will learn REST, resources, and endpoints, then use GET, POST, PUT, PATCH, and DELETE with JSON and status codes. You will build a small task API in Express and test it from the browser without buying a tool.",
          why: "One greeting endpoint showed that a server can answer. A task list needs an agreed set of requests so a page can read and add tasks without opening the server's files.",
          alreadyKnow: "You can run an Express server and return JSON from a GET route.",
        },
        objectives: [
          "Explain what an API is and why programmes use one instead of sharing files.",
          "Describe a REST resource and the endpoint that names it.",
          "Choose GET, POST, PUT, PATCH, or DELETE for a task-list action.",
          "Return JSON with a suitable status code from an Express route.",
          "Test a GET route in the browser and describe how to send a POST without a paid product.",
        ],
        prerequisites: [
          {
            label: "An Express server with one JSON endpoint",
            lessonSlug: "http-and-a-simple-server",
          },
        ],
        teachingNotes: [
          {
            heading: "What an API is",
            markdown: md(`
              An API is a published set of requests that one programme accepts from another. API stands for application programming interface. In this course the programmes are your React page and your Express server. The API is the list of paths, methods, and JSON shapes they both agree to use.

              An API exists because the page should not reach into the server's variables. If the React code opened server.js and edited the array, the two halves would be tangled, and a second client would have no safe way in. The problem an API solves is a stable door: callers ask for named actions, and the server can change how it stores data later without changing the door's name.

              Picture a library desk. You do not walk into the storeroom and pull a book off a shelf. You ask at the desk. The desk has a short list of requests it understands: look up a title, borrow a book, return a book. That list is the API. The storeroom can be rearranged, and the desk requests stay the same.

              ### How applications communicate

              The browser sends an HTTP request to a path such as /api/tasks. The server checks the method and the path, runs the matching function, and sends a response. The response is usually JSON plus a status code. Neither side needs to know the other's variable names. They need to know the path, the method, and the shape of the JSON.

              Your greeting server was already a tiny API with one request on the menu. A task API puts more than one request on that menu, all about the same kind of thing.

              :::misunderstanding An API is a website page
              A page is what a person reads. An API is what a programme calls. The browser can show JSON when you visit a GET path, and that view is a convenient test, not the final interface.
              :::

              :::example One agreement
              Both sides agree that a task has an id, a title, details, and a completed flag. The React page does not invent a different shape on Tuesdays. The server does not reply with a paragraph of HTML when the page expected JSON.
              :::
            `),
          },
          {
            heading: "REST, resources, and endpoints",
            markdown: md(`
              REST is a style for organising an API around resources and a small set of methods. REST stands for Representational State Transfer. You can use the idea without memorising the expansion. A resource is one kind of thing the API manages. In this lesson the resource is a task.

              REST exists because teams were inventing a new path name for every action, and callers could not guess them. The problem it solves is predictability. Once you know the resource is called tasks, you can guess that the collection lives at /api/tasks and that one task lives at /api/tasks/3.

              ### Nouns in the path, verbs in the method

              The path names the thing. The method names the action. /api/tasks is the collection. /api/tasks/3 is the task whose id is 3. You do not create /api/addTask, /api/removeTask, and /api/finishTask as three unrelated spells. You use the same resource path and change the method.

              An endpoint is one method plus one path, with the JSON it accepts and the JSON it returns. GET /api/tasks is a different endpoint from POST /api/tasks, even though the path text is the same. The method is part of the name.

              Think of a set of pigeonholes labelled tasks. GET opens a hole and reads the card. POST slides a new card in. PATCH changes a line on a card. DELETE removes the card. PUT would replace the whole card with a new one. The label on the hole stays "tasks".

              :::misunderstanding REST means you must use every method on day one
              REST is a way of naming. A first version can offer GET and POST, then add PATCH and DELETE when the page needs them. The names should stay consistent when you add them.
              :::

              The /api prefix is a habit, not a law of physics. It tells a reader that this path returns data for a programme rather than an HTML page. This course keeps that prefix so your React routes and your data routes are easy to tell apart.
            `),
          },
          {
            heading: "GET, POST, PUT, PATCH, and DELETE",
            markdown: md(`
              Each method asks for a different kind of change. Choosing the wrong one confuses the next person who reads the API, including you next week.

              GET reads. It should not create or delete a task. GET /api/tasks returns the list. GET /api/tasks/3 returns one task. A browser address bar can send GET, which is why it is the easiest method to test.

              POST creates. POST /api/tasks sends a JSON body describing the new task and expects the server to store it and return the saved task, including the id the server chose. You will use status 201 for a successful create. 201 means created, which is more specific than a plain 200.

              PUT replaces the whole resource. The client sends every field, and the server stores that version in place of the old one. If the client forgets a field, a strict PUT can wipe it. PATCH changes only the fields included in the body. For a beginner task list, PATCH is the kinder edit: the page can send { "completed": true } without resending the title.

              DELETE removes the resource named in the path. DELETE /api/tasks/3 removes that task and no other. This course returns JSON such as { "deleted": true } so you can see a body. Some APIs return 204 and an empty body. 204 means success with nothing to read. Either is honest. Pick one and keep it.

              ### Status codes for these actions

              200 means the read or update succeeded. 201 means a new task was created. 400 means the client sent something the server refuses, such as a title that is missing. 404 means the id is not in the list. 500 means the server broke while handling a request that looked acceptable. You will build 400 and 404 carefully in the next lesson. Today, return 200 for a list and 201 for a create, and leave a wrong id as a later exercise if you already feel steady.

              :::example Matching words to methods
              "Show my tasks" is GET. "Add buy milk" is POST. "Mark buy milk complete" is PATCH. "Replace the whole buy milk card" is PUT. "Remove buy milk" is DELETE.
              :::

              :::misunderstanding POST and GET are interchangeable if the URL is right
              A browser visit is a GET. It will not run your POST function. If the new task never appears, check the method before you rewrite the storage.
              :::
            `),
          },
          {
            heading: "JSON lists and the in-memory task store",
            markdown: md(`
              The task API speaks JSON in both directions. A list response is a JSON array of objects. A create request is one JSON object. Express turns a JavaScript array into a JSON array when you pass it to ¬response.json¬.

              For this week the tasks live in an array inside the server process. That is enough to practise routes. It is also temporary. When you stop Node, the array disappears. The next week introduces a database so the rows survive a restart. Say that limitation out loud now, so a blank list after a restart does not look like a broken route.

              ¬¬¬js
              const tasks = [
                { id: 1, title: "Read the API lesson", details: "Methods and paths", completed: false }
              ];
              ¬¬¬

              The server, not the browser, chooses the id. A counter that increases by one is enough. If the client invented ids, two pages could pick the same number. The response to POST includes the id so the page can show it.

              ### Reading the body

              POST needs ¬app.use(express.json())¬ before the routes. That line reads a JSON body and puts an object on ¬request.body¬. Without it, ¬request.body¬ is empty and the title looks missing even when the client sent one. The header Content-Type should be application/json so Express knows the text is JSON.

              If the body is not valid JSON, a missing comma or a single quote, Express cannot build the object. You will see an error instead of a new task. Fix the text and send it again. Do not keep clicking a button that sends the same broken text.

              :::warning The array is not a database
              Restarting the server clears the tasks you added. That is expected this week. Write down one example task in the source file if you want it to appear every time the server starts.
              :::

              :::misunderstanding The React state from week 12 is the API
              The API is the Express routes. React state is still the page's memory. This week the page will ask the API, and the API's array is a second copy. They can drift apart if you update only one side. The next lesson connects them on purpose.
              :::
            `),
          },
          {
            heading: "A first pair of task endpoints",
            markdown: md(`
              Start with two endpoints. GET /api/tasks returns the array. POST /api/tasks reads title and details, builds a task, pushes it into the array, and returns the task with status 201.

              Keep the functions small. A route that both reads and writes is harder to test. GET only reads the array. POST only adds. Later, PATCH will change one item and DELETE will remove one item. PUT can wait as a concept you can explain even if your file does not implement a replace-everything route yet.

              ¬¬¬js
              app.get("/api/tasks", (request, response) => {
                response.json(tasks);
              });

              app.post("/api/tasks", (request, response) => {
                const title = request.body.title;
                const task = { id: nextId, title, details: request.body.details || "", completed: false };
                nextId += 1;
                tasks.push(task);
                response.status(201).json(task);
              });
              ¬¬¬

              This POST trusts the body. The next lesson adds the checks that reject a blank title. It is still useful today because you can see a created task appear in the following GET.

              ### Paths are exact

              /api/tasks and /api/task are different paths. /api/tasks/ is close, and Express may still match it, but train yourself to copy the path you wrote in ¬app.get¬. A 404 on a running server usually means the path or the method does not match a route.

              Port 3000 stays the practice port unless it is already taken. If Node reports EADDRINUSE, the previous server is still running. Stop it with Ctrl+C in its terminal, or pick 3001 in both ¬app.listen¬ and the browser address.

              :::tip Leave the server running
              Start node server.js, then test. Editing the file does not change the running process. Stop and start again after you save a route change.
              :::
            `),
          },
          {
            heading: "Test GET in the browser and POST without a paid tool",
            markdown: md(`
              A GET endpoint can be tested by visiting it. Open http://localhost:3000/api/tasks while the server is running. You should see a JSON array. If you seeded one task in the source file, that object is in the array. This test needs no extra product.

              A POST is harder from the address bar, because the address bar sends GET. You have two free options. The first is the browser console on that same localhost page. The page and the API share an origin, so the browser allows the call. Origin here means the scheme, the host, and the port together. http://localhost:3000 is one origin.

              ¬¬¬js
              fetch("http://localhost:3000/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: "Buy milk", details: "Two litres" })
              }).then((response) => response.json()).then((data) => console.log(data));
              ¬¬¬

              JSON.stringify builds valid JSON text from an object. After the log appears, reload /api/tasks. The new task should be in the list until you restart the server.

              ### A request file, explained

              The second option is a plain text request, the idea behind the free REST Client extension for Visual Studio Code. You do not have to install it, and you do not need a paid product. The text looks like this:

              ¬¬¬text
              POST http://localhost:3000/api/tasks
              Content-Type: application/json

              {"title":"Buy milk","details":"Two litres"}
              ¬¬¬

              A REST client sends exactly that method, URL, header, and body. If you install the free extension, a Send link appears above the text. If you do not, the console fetch above is enough for this lesson. Both are describing the same HTTP request.

              :::misunderstanding A paid API tool is required to continue
              The browser can test GET. The console on that same localhost origin can test POST. A free text-based client is optional. Nothing in this week depends on a subscription.
              :::

              :::warning Do not paste secrets into a random website's console
              Run the fetch snippet only in the console of your own localhost page. A console on an unrelated site is that site's page, not yours.
              :::

              When the reload shows the new task, you have seen the API communicate: a client sent JSON, the server stored it in the array, and a later GET returned it. The next lesson checks the body, names one task by id, and lets React send these requests from a form.
            `),
          },
        ],
        vocabulary: [
          {
            term: "API",
            definition: "A published set of requests one programme accepts from another, including the paths and the JSON shapes.",
          },
          {
            term: "REST",
            definition: "A style that names resources in the path and uses HTTP methods for the actions on those resources.",
          },
          {
            term: "Resource",
            definition: "One kind of thing an API manages. In this lesson the resource is a task.",
          },
          {
            term: "Endpoint",
            definition: "One method combined with one path, plus the JSON that request and response use.",
          },
          {
            term: "Collection",
            definition: "The group of resources at a path such as /api/tasks, as opposed to one task at /api/tasks/3.",
          },
          {
            term: "Status 201",
            definition: "The status code that means a new resource was created. This course uses it for a successful POST.",
          },
          {
            term: "Origin",
            definition: "The scheme, host, and port of a page, such as http://localhost:3000. The browser compares origins when a page calls an API.",
          },
        ],
        demonstrations: [
          {
            title: "Create two task endpoints and test them",
            intro: "You will build an Express API that lists tasks and adds a task, test the list in the browser, and send one POST from the browser console on that same localhost page.",
            steps: [
              "Open a terminal for your operating system. If node -v fails, install Node with the steps for your system before you continue.",
              "Create a folder named task-api, move into it, and run npm init -y.",
              "Run npm install express. Confirm that package.json lists express and that node_modules exists.",
              "Write server.js with an in-memory tasks array, GET /api/tasks, and POST /api/tasks that returns status 201.",
              "Include app.use(express.json()) before the routes so a JSON body becomes request.body.",
              "Run node server.js and leave it running. Open http://localhost:3000/api/tasks and read the JSON array.",
              "On that page, open the browser console and send a POST with fetch and JSON.stringify, using a title you invent.",
              "Reload http://localhost:3000/api/tasks and find the new task. Then stop the server with Ctrl+C and start it again to see the array reset.",
            ],
            expected: "The browser shows a JSON array. After the POST and a reload, your new task is in the array. A restart clears tasks that were not written in the source file.",
            verify: "The POST response includes an id, a title, details, and completed set to false, and the following GET contains that same id.",
            ifItFails: "If express is missing, run npm install express in this folder. If the port is in use, stop the other Node process. If the body is empty, confirm express.json() is above the routes and the console fetch sends Content-Type application/json.",
            os: {
              sameOnAllPlatforms: "After the terminal is open, npm init -y, npm install express, and node server.js work the same way. Open the terminal for your system first. On Windows, open the Start menu and launch Windows Terminal or Command Prompt. On macOS, press Command and Space, type Terminal, and press Return. On Ubuntu, open Terminal from the application menu or press Ctrl+Alt+T. The browser address http://localhost:3000/api/tasks is also the same once the server is running.",
              windows: [
                "Open the Start menu, type Terminal, and open Windows Terminal or Command Prompt.",
                "If node is not recognized, install the Windows .msi from https://nodejs.org, allow the PATH update, and open a new terminal.",
                "Move into the task-api folder, then run the shared npm and node commands from that folder.",
              ],
              macos: [
                "Open Terminal with Spotlight: Command and Space, then type Terminal.",
                "If node -v fails, install the macOS pkg from https://nodejs.org. Do not install Homebrew for this lesson.",
                "Move into the task-api folder, then run the shared npm and node commands from that folder.",
              ],
              linux: [
                "Open Terminal from the application menu, or press Ctrl+Alt+T on Ubuntu.",
                "If node -v fails, run sudo apt update and sudo apt install -y nodejs npm, then open a new terminal.",
                "Move into the task-api folder, then run the shared npm and node commands from that folder.",
              ],
              identify: [
                "Windows has a Start menu. macOS has an Apple menu. Ubuntu often opens the terminal with Ctrl+Alt+T.",
                "Use only that system's install steps if node is missing. The API commands come afterwards.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "List and create tasks",
            filename: "server.js",
            language: "javascript",
            code: "const express = require(\"express\");\n\nconst app = express();\napp.use(express.json());\n\nconst tasks = [\n  { id: 1, title: \"Read the API lesson\", details: \"Methods and paths\", completed: false }\n];\nlet nextId = 2;\n\napp.get(\"/api/tasks\", (request, response) => {\n  response.json(tasks);\n});\n\napp.post(\"/api/tasks\", (request, response) => {\n  const title = request.body && request.body.title;\n  const details = request.body && request.body.details;\n  const task = {\n    id: nextId,\n    title: typeof title === \"string\" ? title : \"\",\n    details: typeof details === \"string\" ? details : \"\",\n    completed: false\n  };\n  nextId += 1;\n  tasks.push(task);\n  response.status(201).json(task);\n});\n\napp.listen(3000, () => {\n  console.log(\"Listening on http://localhost:3000/api/tasks\");\n});\n",
            explanation: "GET returns the array as JSON. POST reads the body, assigns the next id, stores the task in memory, and answers with status 201. express.json() must run before the routes. Restarting Node clears tasks that were added through POST. The next lesson adds a refusal when the title is blank.",
            lineNotes: [
              { focus: "express.json()", note: "Parses a JSON request body onto request.body. Without it, POST cannot see the title." },
              { focus: "app.get", note: "Reads the collection. It does not change the array." },
              { focus: "status(201)", note: "Tells the client that a new task was created, then sends the task as JSON." },
              { focus: "nextId", note: "The server chooses ids. The client does not send an id in this example." },
            ],
            expectedOutput: "GET /api/tasks shows the seeded task. A valid POST adds another object and returns it with status 201.",
            level: "practical",
          },
          {
            title: "A POST described as text",
            filename: "create-task.http",
            language: "text",
            code: "POST http://localhost:3000/api/tasks\nContent-Type: application/json\n\n{\"title\":\"Buy milk\",\"details\":\"Two litres\"}\n",
            explanation: "This is the same POST written as a plain request. A free REST Client-style tool can send it. The blank line before the JSON matters in that file format because it separates headers from the body. The browser console fetch from the lesson sends this same method, header, and body.",
            lineNotes: [
              { focus: "POST line", note: "Names the method and the full URL, including the port." },
              { focus: "Content-Type", note: "Tells the server the body is JSON so express.json() will parse it." },
              { focus: "JSON body", note: "Double quotes and no trailing comma. This text is the body, not JavaScript." },
            ],
            expectedOutput: "When this request is sent to a running server, the response is the new task as JSON and the next GET includes it.",
            level: "basic",
          },
        ],
        exercises: [
          {
            title: "Name the method",
            difficulty: "warm-up",
            prompt: "Match everyday task-list sentences to HTTP methods without writing a new route yet.",
            steps: [
              "Write five sentences: list the tasks, add a task, replace an entire task, change only the completed flag, and remove a task.",
              "Beside each sentence, write GET, POST, PUT, PATCH, or DELETE.",
              "Write the path you would use for the list, and the path you would use for the task with id 4.",
              "Add one sentence that says which of those requests a browser address bar can send on its own.",
            ],
            expectedOutcome: "Your note pairs each sentence with a method and shows /api/tasks for the collection and /api/tasks/4 for one task.",
          },
          {
            title: "Add a task and see it on the next GET",
            difficulty: "practice",
            prompt: "Use the task API pattern to store one task you invent, then prove the GET response changed.",
            steps: [
              "Start from a server with GET /api/tasks and POST /api/tasks. Seed one task in the source so the first GET is not empty.",
              "Open the list in the browser and copy the JSON you see.",
              "Send a POST whose title is a chore from your own week, using the console fetch or a text request.",
              "Reload the list and underline the new object. Restart the server and write down whether that chore is still there.",
            ],
            expectedOutcome: "The reloaded JSON contains your chore and an id from the server. After a restart, only tasks written in the source file remain.",
          },
        ],
        troubleshooting: [
          {
            problem: "Cannot find module 'express' when you run node server.js.",
            why: "Express is not installed in this folder, or the terminal is not in the folder that contains package.json.",
            solution: "From the project folder, run npm install express. Check that node_modules exists beside server.js, then start the server again.",
          },
          {
            problem: "EADDRINUSE, or Node says port 3000 is already in use.",
            why: "A previous server is still listening on port 3000. The new process cannot take the same port.",
            solution: "Press Ctrl+C in the terminal that is still running the old server, then start again. If you cannot find it, change the port in app.listen and in every test URL together.",
          },
          {
            problem: "POST does nothing useful, or the server reports invalid JSON.",
            why: "The body has single quotes, a trailing comma, or no Content-Type, or express.json() is missing, so the server cannot read a title.",
            solution: "Send a JavaScript object through JSON.stringify, or write JSON with double quotes and no trailing comma. Put app.use(express.json()) above the routes and restart Node.",
          },
          {
            problem: "The browser says the site cannot be reached.",
            why: "The server is not running, or the address uses the wrong port or https.",
            solution: "Run node server.js, leave that terminal open, and visit http://localhost plus the port from the listening message, then /api/tasks.",
          },
        ],
        knowledgeChecks: [
          {
            id: "api-door",
            question: "What is an API, in the library-desk picture?",
            format: "multiple_choice",
            options: [
              "The published requests a programme accepts, like asking at the desk instead of entering the storeroom",
              "A CSS file that hides the page",
              "The node_modules folder",
              "A status code of 404",
            ],
          },
          {
            id: "post-create",
            question: "Which method creates a new task at /api/tasks?",
            format: "multiple_choice",
            options: ["GET", "POST", "DELETE", "PATCH"],
          },
          {
            id: "put-patch",
            question: "PATCH is a better beginner choice than PUT when the page wants to change only the completed flag.",
            format: "true_false",
            options: ["True", "False"],
          },
          {
            id: "memory-limit",
            question: "What happens to tasks added only through POST when you stop Node and start it again?",
            format: "multiple_choice",
            options: [
              "They disappear, because this week's store is an array in memory",
              "They are written to PostgreSQL automatically",
              "The browser saves them as HTML",
              "npm copies them into package.json",
            ],
          },
        ],
        homework: {
          description: "Write a short lesson response about the task API you practised. Name one endpoint using its method and path, say what JSON it returns, and explain GET and POST in your own words. Mention what the browser showed for the list, and what happened to a POSTed task after you restarted the server.",
          requirements: [
            "Include one real method and path, and describe the JSON.",
            "Explain the difference between GET and POST, plus what a restart did to memory.",
          ],
          deliverables: ["A written response on this lesson page"],
          submission: "Submit the written response in the lesson practice area for this session.",
          criteria: [
            "The endpoint is named with both a method and a path.",
            "The response shows that the in-memory list is temporary.",
          ],
          submissionKind: "lesson_response",
        },
        summary: [
          "An API is the agreed set of requests between programmes. REST names resources in the path and actions in the method.",
          "GET reads, POST creates, PUT replaces a whole resource, PATCH changes part of it, and DELETE removes it.",
          "JSON lists and objects are the bodies. Status 201 marks a successful create. express.json() makes the body readable.",
          "The browser tests GET. A console fetch on the same localhost origin, or a plain text request, tests POST without a paid tool.",
        ],
        nextLesson: {
          title: "Validation and frontend integration",
          why: "The routes exist. Next you will reject bad input, address one task by id, and let a React page call the API.",
          lessonSlug: "validation-and-frontend-integration",
        },
      },
      guide: {
        sessionNumber: 27,
        week: 14,
        title: "REST APIs",
        durationMinutes: 90,
        objectives: [
          "Students can define an API and a resource without reading a slide.",
          "Students can assign GET, POST, PUT, PATCH, and DELETE to task-list actions.",
          "Students run an in-memory task API and watch POST change the next GET.",
          "Students can test GET in the browser and POST from the localhost console.",
        ],
        tools: ["Node.js", "A terminal", "A browser with a console", "Express", "Visual Studio Code"],
        preparation: [
          "Free port 3000 and prepare a working task-api server plus a copy that forgets express.json() so the body arrives empty.",
          "Prepare a create-task.http file and decide whether the free REST Client extension is installed. The console fetch must work even if it is not.",
          "Have Windows .msi, macOS pkg, and Ubuntu apt notes ready for anyone whose node command failed last week. Do not require Homebrew.",
          "Seed one task in the source file so the first GET is obviously JSON and not a blank page.",
        ],
        flow: [
          {
            minutes: 5,
            title: "From one greeting to a menu",
            detail: "Ask what GET /api/greeting returned last week and what happened when the terminal closed. Say that today the menu grows from one greeting to a resource called tasks. Write the five methods on the board with a blank beside each for a plain-language action.",
          },
          {
            minutes: 15,
            title: "API, REST, and resources",
            detail: "Use the library desk to define an API. Then show /api/tasks and /api/tasks/3 and name them collection and one resource. Explain that the path is the noun and the method is the verb. Ask students to reject a design that uses /api/addTask and /api/deleteTask, and to say what they would write instead.",
          },
          {
            minutes: 20,
            title: "Methods, status codes, and memory",
            detail: "Fill the board: GET reads, POST creates with 201, PUT replaces the whole card, PATCH changes one field, DELETE removes. State that this week stores tasks in an array that dies when Node stops. Show express.json() and a valid JSON body beside a body with a trailing comma so invalid JSON is visible before they type it.",
          },
          {
            minutes: 30,
            title: "Build and test the two routes",
            detail: "Create the project, install Express, and write GET and POST live. Visit /api/tasks. Then open the console on that same page and send a POST with JSON.stringify. Reload and point at the new id. Restart the server and show that the posted task is gone while the seeded task remains. Students then do the practice chore with their own title.",
          },
          {
            minutes: 10,
            title: "Failures that look like mystery",
            detail: "Demonstrate Cannot find module express from the wrong folder, EADDRINUSE by starting the server twice, and a POST with single quotes. Match each one to a sentence a student could write in a bug note. Run the knowledge checks after those three failures.",
          },
          {
            minutes: 10,
            title: "Response and preview",
            detail: "Set the lesson response: one endpoint written as method plus path, GET versus POST, and what a restart did. Preview the next session as validation, ids in the path, query strings, and a React page that calls this API. Do not start the React app today.",
          },
        ],
        explain: [
          "An endpoint is method plus path, not the path alone.",
          "The server assigns ids. The in-memory array is not a database.",
          "201 is the create success code used in this course.",
          "The address bar sends GET. POST needs a client that can set the method and the body.",
        ],
        questions: [
          "Why is /api/tasks/3 better than /api/deleteTask/3 for a REST API?",
          "What is the difference between 201 and 200?",
          "Why must express.json() appear before the POST route?",
          "What will the GET show after you restart Node?",
        ],
        demonstration: "Build the task API from an empty folder, show the seeded GET, post a task from the browser console on that localhost origin, reload, and restart to prove memory was temporary. Keep the server terminal visible.",
        practice: "Students post a chore from their own week and point to it in the reloaded JSON. They write one sentence about what remains after a restart.",
        expectedOutcomes: [
          "GET /api/tasks returns a JSON array from a running server.",
          "A POST from the console adds a task that the next GET includes.",
          "Students can name PUT and PATCH even if only POST and GET are implemented today.",
        ],
        difficulties: [
          {
            issue: "The student visits /api/tasks with the POST body typed into the address bar.",
            help: "Explain that the address bar is GET. Move them to the console on that page and resend with method POST and JSON.stringify. Then reload the list.",
          },
          {
            issue: "request.body is undefined and the new task title is blank.",
            help: "Check that app.use(express.json()) is above the routes and that the fetch header is Content-Type application/json. Restart Node after adding the middleware.",
          },
        ],
        homework: "Students submit a lesson response that names one endpoint, contrasts GET and POST, and reports what a server restart did to a task they had posted.",
        assessment: "Look at the running list before and after POST. The knowledge checks cover the API definition, POST, PATCH versus PUT, and the memory limit. The graded product is next session's assignment, not this written response.",
        recap: "The API is a desk with a small menu. Tasks are the resource. GET and POST work in memory. Next session checks the slip before the kitchen accepts it, and the React page becomes the client.",
        knowledgeCheckAnswers: [
          {
            id: "api-door",
            answer: "The published requests a programme accepts, like asking at the desk instead of entering the storeroom",
            explanation: "An API is the agreed door. Callers do not edit the server's files directly. They send the published requests.",
          },
          {
            id: "post-create",
            answer: "POST",
            explanation: "POST creates a task in the collection. GET would only read, and DELETE or PATCH would change an existing one.",
          },
          {
            id: "put-patch",
            answer: "True",
            explanation: "PATCH can send only the completed flag. PUT is for replacing the whole resource, so a partial body is a poor fit.",
          },
          {
            id: "memory-limit",
            answer: "They disappear, because this week's store is an array in memory",
            explanation: "The array lives in the Node process. Stopping that process drops posted tasks. A database comes in the next week.",
          },
        ],
      },
    },
    {
      slug: "validation-and-frontend-integration",
      sessionNumber: 28,
      title: "Validation and frontend integration",
      estimatedMinutes: 90,
      difficulty: "Bringing ideas together",
      requiresOs: true,
      content: {
        overview: {
          about: "This lesson tightens the task API and connects it to React. You will read a request body, a route parameter, and a query parameter, reject invalid input, and return HTTP errors as JSON. Then you will call the API with fetch and show loading and error states on the page.",
          why: "A route that trusts every body will store blank titles. A page that calls an API needs a visible waiting state and a visible failure, or the person thinks the list is honestly empty.",
          alreadyKnow: "You can build GET and POST task routes and test them from the browser.",
        },
        objectives: [
          "Read a JSON body, a route parameter, and a query parameter in Express.",
          "Validate a task and return 400 or 404 with a JSON error.",
          "Update and delete one task with PATCH and DELETE.",
          "Load and create tasks from React using fetch.",
          "Show a loading state and an error state when the request is slow or the server is down.",
        ],
        prerequisites: [
          {
            label: "A task API with GET and POST routes",
            lessonSlug: "rest-apis",
          },
        ],
        teachingNotes: [
          {
            heading: "The request body",
            markdown: md(`
              The request body is the main content of a message, separate from the path. For POST and PATCH in this course, the body is a JSON object. Express places that object on ¬request.body¬ after ¬express.json()¬ runs.

              The body exists because some information does not belong in the path. A new title can contain spaces and punctuation. Putting it in JSON keeps the path stable: the path says "the task collection" and the body says "here are the fields".

              A client builds that JSON with ¬JSON.stringify¬. The matching header is Content-Type: application/json. If the header is missing, Express may ignore the text. If the text is invalid JSON, the parse fails before your route runs.

              ### What the server should trust

              Treat the body as untrusted input. The page might send a title, or it might send a number, or it might send nothing. Check the type before you call string methods. ¬typeof title !== "string"¬ catches a number or a missing value. ¬title.trim() === ""¬ catches a title made only of spaces.

              :::example A body that means one edit
              PATCH can send { "completed": true } and leave the title out. Your route should change completed and keep the old title. That is different from a body that tries to set the title to a blank string, which you should reject.
              :::

              :::misunderstanding request.body is always an object
              It is an object when express.json() succeeded. It is undefined if that middleware is missing. It never appears if the JSON text was invalid, because parsing stopped first.
              :::

              This check is the same kind of thinking you used on forms in the browser. The difference is the place. A browser check can be skipped by a client that calls the API directly. The server check is the one that protects the list.
            `),
          },
          {
            heading: "Route parameters and query parameters",
            markdown: md(`
              A route parameter is a named piece of the path. In ¬/api/tasks/:id¬ the colon means "this segment varies". A request to /api/tasks/3 sets ¬request.params.id¬ to the string "3". It is a string even though it looks like a number. Convert it with ¬Number¬ before you compare it with a numeric id.

              Route parameters exist so one function can serve many tasks. Without them you would write a separate route for every id. The path still names one resource. The parameter fills in which one.

              A query parameter sits after a question mark and does not identify a different resource. /api/tasks?completed=false still means the collection. It asks for a filtered view. Express puts the text after the question mark on ¬request.query¬. ¬request.query.completed¬ is the string "false", not the boolean false. Compare it to the strings "true" and "false" on purpose.

              ### Which one to choose

              Use a route parameter when you mean one task: get it, patch it, or delete it. Use a query parameter when you mean the collection with a condition: only incomplete tasks, for example. Mixing them up leads to paths like /api/tasks/false, which looks like an id.

              Think of a route parameter as the locker number painted on the door. A query parameter is a note on the request: "only the lockers that are still in use". The building wing is the same.

              :::misunderstanding :id in the source file is the number 1
              The characters :id are a pattern. The actual value arrives later, in request.params.id, and only for that one request. The next request can carry a different id.
              :::

              If ¬Number(request.params.id)¬ is NaN, the caller did not send a number. Respond with 400 and a short JSON error. If the number is valid and no task has it, respond with 404. Those are different problems: a badly formed id, and a well formed id that is absent.
            `),
          },
          {
            heading: "Validation and HTTP errors",
            markdown: md(`
              Validation is a set of checks that decide whether the server will accept the input. For a task, this course uses four checks. The title on create must be a non-empty string. Details, when present, must be a string. The completed flag, when present, must be a boolean. An id in the path must point at a real task before PATCH or DELETE changes anything.

              Validation exists because a list of blank titles is hard to use and because a wrong type can throw later, turning a small mistake into a 500. The problem it solves is a clear refusal at the door. The client gets a chance to show a message instead of storing rubbish.

              Return errors as JSON, not as a mysterious empty page. Status 400 means the client should change the request. A useful body is { "error": "Title is required" }. Status 404 means the id was not found. Status 500 is for a fault you did not expect. Do not use 500 for a blank title. That was the client's input, and 400 tells the truth.

              ### A pattern you can repeat

              Check, and if the check fails, send the error and return immediately so the rest of the function does not run. Then do the work. Then send the success JSON.

              ¬¬¬js
              if (typeof title !== "string" || title.trim() === "") {
                response.status(400).json({ error: "Title is required" });
                return;
              }
              ¬¬¬

              For invalid JSON, add an error handler with four parameters after the routes. Express only treats it as an error handler when all four are present. If the error is a SyntaxError, respond with 400 and { "error": "The request body is not valid JSON" }.

              :::warning Do not hide a 400 inside a 200
              A JSON body that says error while the status is 200 teaches the page to treat failure as success. Set the status and the body together.
              :::

              :::misunderstanding Validation belongs only in the React form
              Keep a check in the form so the person gets fast feedback. Keep the same rule on the server because other clients can call the API. The server rule is the one that runs every time.
              :::
            `),
          },
          {
            heading: "PATCH and DELETE one task",
            markdown: md(`
              PATCH /api/tasks/:id updates the task that matches the id. Read only the fields that arrived. If title is present, validate it and replace the title. If details is present, validate it and replace the details. If completed is present, accept only a boolean. Then return the updated task with status 200.

              DELETE /api/tasks/:id removes that task. Find the index, respond 404 if it is missing, otherwise remove it and return { "deleted": true }. Practise this on a task you created in the same session, not on the only seeded example, so you can still see a list afterwards.

              PUT would send a full replacement object. You can explain it with one sentence in your notes: the client must include every field it wants kept. This course implements PATCH so a complete button can send one flag. You are not expected to maintain two update styles.

              ### Finding the task

              Write a small function that converts the param to a number and uses ¬find¬. Routes then share that function instead of repeating the conversion. If two tasks could share an id, the bug is in the counter, not in the finder. Keep nextId increasing and do not reuse ids after delete in this beginner version. Reuse makes logs harder to read.

              :::example Complete is a boolean patch
              The page sends { "completed": true }. The title and details stay as they were. The response contains the full task so the page can replace that one object in state.
              :::

              The in-memory array still forgets everything on restart. Validation does not change that. It only stops bad writes while the process is alive. Say so when you demonstrate, so students do not think 400 and 404 are database errors. Database errors come next week.
            `),
          },
          {
            heading: "Connect React with fetch",
            markdown: md(`
              fetch is the browser function that sends an HTTP request from JavaScript and returns a promise. A promise is a value that will arrive later. You already waited for clicks. Now you also wait for the network. The React page from week 12 becomes the client of the API you just built.

              A typical load looks like this. Call fetch with the tasks URL. Check ¬response.ok¬. That flag is false for 400 and 404. Parse JSON only when you still want the body. Put the array into state. The page re-renders because state changed, which you practised with useState.

              Creating a task uses the same function with extra options: method POST, the JSON header, and a stringified body. PATCH and DELETE are the same pattern with a URL that includes the id and a different method.

              ### Two origins and permission

              The React dev server usually runs at http://localhost:5173. The API runs at http://localhost:3000. Those are different origins because the ports differ. The browser blocks a page from reading another origin unless the server allows it. That rule is called CORS, which stands for cross-origin resource sharing.

              The permission has to come from the server. Install the cors package and call ¬app.use(cors())¬ before your routes. For this local practice, allowing the browser's requests is appropriate. You are not publishing the API to the world today. You are letting your own page talk to your own server.

              :::misunderstanding Failed to fetch always means the route is wrong
              A wrong path often returns 404 JSON, which is a response you can read. Failed to fetch, with no status, usually means the server is down, the URL is unreachable, or the browser blocked the response. Check that Node is running, then check CORS.
              :::

              :::tip Start both programmes
              One terminal runs node server.js and stays there. A second terminal, in the React project, runs npm run dev. Stopping either one changes what the page can do.
              :::

              Keep the API base URL in one constant at the top of the component file so you do not type the port differently in every function.
            `),
          },
          {
            heading: "Loading states and error states",
            markdown: md(`
              A loading state means the page has asked and has not received an answer yet. Start it as true for the first load. Render a sentence such as "Loading tasks." while it is true. When the request finishes, set it to false. Without this, the first paint looks like an empty list, and an empty list already means something else in your week 12 app: there are no tasks.

              An error state is a message you can show. Set it when fetch throws, which covers a server that is not running, and when ¬response.ok¬ is false, which covers 400 and 404. Read the JSON error field when it exists, and fall back to a general sentence when it does not. Clear the error when the person submits a new attempt that might succeed.

              ### A form that talks to the API

              Keep the controlled inputs from week 12. On submit, call ¬preventDefault¬ so the browser does not reload the page. POST the title and details. If the response is 400, show the server's error and leave the typed title in the input so the person can fix it. If the response is 201, append the returned task to state and clear the inputs. Do not invent a second id on the client. Use the id from the JSON.

              For complete and delete, update state from the response too. After PATCH, replace the matching task. After DELETE, remove that id from state. If you change state and forget the request, a refresh brings the old server data back. If you change the server and forget state, the page looks stale until reload. Do both.

              :::example What the person should see
              While the server is off, the page shows a connection error, not a blank white area. While the server is on and the list is empty, the page says there are no tasks yet. Those two sentences are different facts.
              :::

              :::misunderstanding An empty array and a network error are the same screen
              An empty array is a successful response with nothing to list. A network error is no trustworthy response. Your conditions should test the error flag before they test the length of the list.
              :::

              This is the assignment's shape: an API that validates, and a React page that loads, adds, and tells the truth when it cannot reach the server. The list still lives in memory. Next week you will put the same fields in a database and the API will talk to that instead of an array.
            `),
          },
        ],
        vocabulary: [
          {
            term: "Request body",
            definition: "The main JSON content of a POST or PATCH, available on request.body after express.json() runs.",
          },
          {
            term: "Route parameter",
            definition: "A varying segment of the path, such as :id, read later from request.params as text.",
          },
          {
            term: "Query parameter",
            definition: "A filter after the question mark, such as ?completed=false, read from request.query as text.",
          },
          {
            term: "Validation",
            definition: "Checks that decide whether input is acceptable, such as requiring a non-empty title string.",
          },
          {
            term: "fetch",
            definition: "The browser function that sends an HTTP request from JavaScript and gives you a response to read.",
          },
          {
            term: "CORS",
            definition: "The browser rule that blocks a page on one origin from reading another origin unless the server allows it.",
          },
          {
            term: "Loading state",
            definition: "A piece of React state that is true while a request has not finished, so the page can say it is waiting.",
          },
        ],
        demonstrations: [
          {
            title: "Validate a task and load it in React",
            intro: "You will reject a blank title, update one task by id, then start a React app that loads the list and shows an error when the API is stopped.",
            steps: [
              "Open two terminals using the steps for your operating system. Use the first one for the API folder.",
              "Add validation so POST returns 400 JSON when the title is missing or blank. Restart the API and send a bad POST to see the 400.",
              "Add PATCH /api/tasks/:id and DELETE /api/tasks/:id. Change one task's completed flag and confirm GET shows the change.",
              "Install the cors package in the API folder and allow browser calls before the routes.",
              "In the second terminal, start the React app with npm run dev from the Vite project.",
              "On load, fetch http://localhost:3000/api/tasks and store the array in state. Show a loading sentence until the response arrives.",
              "Submit the form with fetch POST. A 201 adds the returned task to state. A 400 shows the error text.",
              "Stop the API with Ctrl+C, reload the React page, and confirm the page shows a connection error rather than a false empty list.",
            ],
            expected: "A blank title gets 400 JSON. The React page lists tasks from the API, can add one, and shows an error when the API process is stopped.",
            verify: "The task that appears on the page is the object returned by the API, including the server's id. Refreshing the page shows it again until the API process restarts.",
            ifItFails: "If the page says it failed to fetch while the API is running, confirm cors is installed and the ports in the URL match. If the body is ignored, check express.json() and the Content-Type header.",
            os: {
              sameOnAllPlatforms: "The commands npm install cors, node server.js, and npm run dev are the same once a terminal is open. You need two terminals. On Windows, open Windows Terminal from the Start menu and open a second tab or window. On macOS, open Terminal with Spotlight and press Command and N for a second window. On Ubuntu, open Terminal and press Ctrl+Alt+T again, or open a new tab. Use http://localhost:3000 for the API and the Vite address, usually http://localhost:5173, for the page.",
              windows: [
                "Open Windows Terminal from the Start menu. If node is not recognized, install the Windows .msi from https://nodejs.org and open a new terminal.",
                "Run the API in the first terminal. Open a second terminal tab for the React project and run npm run dev there.",
              ],
              macos: [
                "Open Terminal with Spotlight. If node is missing, install the macOS pkg from https://nodejs.org. Do not install Homebrew for this lesson.",
                "Run the API in the first window. Open a second Terminal window for the React project and run npm run dev there.",
              ],
              linux: [
                "Open Terminal with Ctrl+Alt+T. If node is missing, run sudo apt update and sudo apt install -y nodejs npm.",
                "Run the API in the first terminal. Open another terminal for the React project and run npm run dev there.",
              ],
              identify: [
                "Pick Windows, macOS, or Ubuntu from the Start menu, the Apple menu, or the Activities view before you open two terminals.",
                "The install fix differs by system. The two-terminal workflow is the same idea after that.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "Validation, patch, and delete",
            filename: "server.js",
            language: "javascript",
            code: "const express = require(\"express\");\nconst cors = require(\"cors\");\n\nconst app = express();\napp.use(cors());\napp.use(express.json());\n\nconst tasks = [];\nlet nextId = 1;\n\nfunction findTask(idText) {\n  const id = Number(idText);\n  if (!Number.isInteger(id)) return null;\n  return tasks.find((task) => task.id === id) || null;\n}\n\napp.get(\"/api/tasks\", (request, response) => {\n  if (request.query.completed === \"true\") {\n    response.json(tasks.filter((task) => task.completed));\n    return;\n  }\n  if (request.query.completed === \"false\") {\n    response.json(tasks.filter((task) => !task.completed));\n    return;\n  }\n  response.json(tasks);\n});\n\napp.post(\"/api/tasks\", (request, response) => {\n  const title = request.body && request.body.title;\n  const details = request.body && request.body.details;\n  if (typeof title !== \"string\" || title.trim() === \"\") {\n    response.status(400).json({ error: \"Title is required\" });\n    return;\n  }\n  if (details !== undefined && typeof details !== \"string\") {\n    response.status(400).json({ error: \"Details must be text\" });\n    return;\n  }\n  const task = { id: nextId, title: title.trim(), details: typeof details === \"string\" ? details : \"\", completed: false };\n  nextId += 1;\n  tasks.push(task);\n  response.status(201).json(task);\n});\n\napp.patch(\"/api/tasks/:id\", (request, response) => {\n  const task = findTask(request.params.id);\n  if (!task) {\n    response.status(404).json({ error: \"Task not found\" });\n    return;\n  }\n  if (request.body.completed !== undefined && typeof request.body.completed !== \"boolean\") {\n    response.status(400).json({ error: \"Completed must be true or false\" });\n    return;\n  }\n  if (typeof request.body.completed === \"boolean\") task.completed = request.body.completed;\n  response.json(task);\n});\n\napp.delete(\"/api/tasks/:id\", (request, response) => {\n  const id = Number(request.params.id);\n  const index = tasks.findIndex((task) => task.id === id);\n  if (index === -1) {\n    response.status(404).json({ error: \"Task not found\" });\n    return;\n  }\n  tasks.splice(index, 1);\n  response.json({ deleted: true });\n});\n\napp.use((error, request, response, next) => {\n  if (error instanceof SyntaxError) {\n    response.status(400).json({ error: \"The request body is not valid JSON\" });\n    return;\n  }\n  next(error);\n});\n\napp.listen(3000, () => {\n  console.log(\"Listening on http://localhost:3000\");\n});\n",
            explanation: "This API filters with a query string, rejects a blank title, patches the completed flag, and deletes by id. The four-argument function at the end turns invalid JSON into a 400 JSON error. cors allows the React page on another port to read the responses during local practice. The array still resets when Node stops.",
            lineNotes: [
              { focus: "request.query.completed", note: "Query values arrive as strings. Compare them to \"true\" and \"false\", not to boolean literals." },
              { focus: "status(400)", note: "A blank title is a client mistake. Return JSON and stop the function with return." },
              { focus: "request.params.id", note: "The path segment is text. findTask converts it and returns null when the task is absent." },
              { focus: "cors()", note: "Lets the Vite origin read this API in development. Install the cors package in this project first." },
            ],
            expectedOutput: "POST with an empty title returns status 400 and an error message. PATCH of a real id returns the task. DELETE of a missing id returns 404.",
            level: "practical",
          },
          {
            title: "A React list that calls the API",
            filename: "TaskApp.tsx",
            language: "tsx",
            code: "import { useEffect, useState, type FormEvent } from \"react\";\n\nconst api = \"http://localhost:3000/api/tasks\";\n\ntype Task = { id: number; title: string; details: string; completed: boolean };\n\nexport function TaskApp() {\n  const [tasks, setTasks] = useState<Task[]>([]);\n  const [title, setTitle] = useState(\"\");\n  const [details, setDetails] = useState(\"\");\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState<string | null>(null);\n\n  useEffect(() => {\n    fetch(api)\n      .then((response) => {\n        if (!response.ok) throw new Error(\"Could not load tasks\");\n        return response.json();\n      })\n      .then((data: Task[]) => {\n        setTasks(data);\n        setLoading(false);\n      })\n      .catch(() => {\n        setError(\"The page could not connect to the server.\");\n        setLoading(false);\n      });\n  }, []);\n\n  async function addTask(event: FormEvent) {\n    event.preventDefault();\n    setError(null);\n    try {\n      const response = await fetch(api, {\n        method: \"POST\",\n        headers: { \"Content-Type\": \"application/json\" },\n        body: JSON.stringify({ title, details })\n      });\n      const body = await response.json();\n      if (!response.ok) {\n        setError(typeof body.error === \"string\" ? body.error : \"The task was not saved.\");\n        return;\n      }\n      setTasks((current) => [...current, body as Task]);\n      setTitle(\"\");\n      setDetails(\"\");\n    } catch {\n      setError(\"The page could not connect to the server.\");\n    }\n  }\n\n  if (loading) return <p>Loading tasks.</p>;\n\n  return (\n    <section>\n      {error ? <p>{error}</p> : null}\n      <form onSubmit={addTask}>\n        <input value={title} onChange={(event) => setTitle(event.target.value)} />\n        <input value={details} onChange={(event) => setDetails(event.target.value)} />\n        <button type=\"submit\">Add task</button>\n      </form>\n      {tasks.length === 0 ? <p>No tasks yet.</p> : null}\n      <ul>\n        {tasks.map((task) => (\n          <li key={task.id}>{task.title}</li>\n        ))}\n      </ul>\n    </section>\n  );\n}\n",
            explanation: "The component loads tasks when it mounts, shows a loading sentence first, and shows a connection error if fetch fails. The form posts JSON. A 400 from the server becomes visible text. A 201 appends the task the server returned, including the server's id. An empty list and an error are separate messages.",
            lineNotes: [
              { focus: "useState(true)", note: "Loading starts true so the first paint does not pretend the list is empty." },
              { focus: "response.ok", note: "False for 400 and 404. The page then reads the error field instead of adding a task." },
              { focus: "JSON.stringify", note: "Turns the input values into a JSON body and pairs it with the JSON content type." },
              { focus: "catch", note: "Runs when the server cannot be reached. That is different from a JSON error with a status code." },
            ],
            expectedOutput: "With the API running, the page leaves the loading sentence and shows tasks. With the API stopped, it shows the connection sentence.",
            level: "practical",
          },
        ],
        exercises: [
          {
            title: "Reject a blank title in two places",
            difficulty: "practice",
            prompt: "Make a blank title fail on the server and appear as text on the page, without storing a task.",
            steps: [
              "In the POST route, return 400 JSON when the title is missing or only spaces.",
              "Send a POST with an empty title and record the status and the error sentence.",
              "In the React form, show body.error when response.ok is false.",
              "Submit the form with an empty title and confirm the list length does not change.",
            ],
            expectedOutcome: "The API answers 400, the page shows the error sentence, and GET /api/tasks does not gain a blank task.",
          },
          {
            title: "Show connection failure on purpose",
            difficulty: "stretch",
            prompt: "Prove that a stopped server and an empty task list look different on the page.",
            steps: [
              "With the API running and no tasks stored, load the page and read the empty-list sentence.",
              "Stop the API and reload the page.",
              "Write down the error sentence you see, and note that it is not the empty-list sentence.",
              "Start the API again and reload. The error should clear and the list or the empty sentence should return.",
            ],
            expectedOutcome: "You can point to two different messages: one for a successful empty list, and one for a server that cannot be reached.",
          },
        ],
        troubleshooting: [
          {
            problem: "The React page says Failed to fetch, or it cannot connect, while you believe the API is running.",
            why: "The API process is stopped, the port in the fetch URL is wrong, or the browser blocked a cross-origin response because cors is missing.",
            solution: "Check the API terminal is still on the listening line. Match the URL to that port. In the API project run npm install cors, add app.use(cors()) before the routes, and restart Node.",
          },
          {
            problem: "A POST with a deliberately broken body returns an HTML error or a 500 instead of a clear JSON message.",
            why: "The JSON is invalid, so express.json() throws before your route. Without a JSON error handler, the default error page is hard to read from React.",
            solution: "Fix quotes and commas in the body. Add the four-argument error handler that returns 400 and { error: \"The request body is not valid JSON\" } when the error is a SyntaxError.",
          },
          {
            problem: "npm run dev or node server.js reports that the port is already in use.",
            why: "Vite's port 5173 or the API port 3000 is held by a previous process you did not stop.",
            solution: "Stop the old terminal with Ctrl+C. Start that one programme again. Do not change only one side of the URL if you move the API port.",
          },
          {
            problem: "Cannot find module 'cors' or 'express'.",
            why: "The package was installed in a different folder from the file you are running, or it was never installed.",
            solution: "In the API folder, run npm install express cors. Start node server.js from that same folder so Node looks at the local node_modules.",
          },
        ],
        knowledgeChecks: [
          {
            id: "param-type",
            question: "In a request to /api/tasks/3, what is the type of request.params.id before you convert it?",
            format: "multiple_choice",
            options: [
              "A string",
              "A boolean",
              "A PostgreSQL row",
              "An array of tasks",
            ],
          },
          {
            id: "blank-title",
            question: "Which status should answer a POST whose title is an empty string?",
            format: "multiple_choice",
            options: ["200", "201", "400", "404"],
          },
          {
            id: "query-filter",
            question: "The query ?completed=false selects a different task id from the path.",
            format: "true_false",
            options: ["True", "False"],
          },
          {
            id: "loading-empty",
            question: "Why should the page show a loading sentence before the first response?",
            format: "multiple_choice",
            options: [
              "So a slow request is not mistaken for an empty list",
              "So the server assigns ids",
              "So package.json stays valid",
              "So DELETE does not need a path",
            ],
          },
        ],
        homework: {
          description: "Complete the week 14 assignment: a small task API consumed by a React page. The assignment page lists the routes, the validation rule, the loading and error states, and where to submit.",
          requirements: [
            "The API validates a task title and returns JSON errors.",
            "The React page loads and creates tasks through fetch.",
          ],
          deliverables: ["The week 14 module assignment submission"],
          submission: "Submit the week 14 assignment from the assignment page. That submission is the homework for this session.",
          criteria: [
            "A blank title does not get stored.",
            "The page shows loading and a connection error in different situations.",
          ],
          submissionKind: "module_assignment",
        },
        summary: [
          "request.body holds JSON fields, request.params holds path pieces such as id, and request.query holds filters after the question mark.",
          "Validation rejects a bad title with 400. A missing id is 404. Invalid JSON should also come back as JSON the page can read.",
          "PATCH changes part of one task. DELETE removes one task. PUT would replace the whole resource, and this course does not require a second update route.",
          "fetch connects React to the API. A loading sentence and an error sentence keep an empty list from being confused with a server that is down.",
        ],
        nextLesson: {
          title: "Databases and PostgreSQL",
          why: "The task list still disappears when Node stops. Next you will install PostgreSQL and see how tables keep rows after the programme ends.",
          lessonSlug: "databases-and-postgresql",
        },
      },
      guide: {
        sessionNumber: 28,
        week: 14,
        title: "Validation and frontend integration",
        durationMinutes: 90,
        objectives: [
          "Students can point to body, route param, and query param in one API.",
          "Students return 400 and 404 as JSON, not as unexplained failures.",
          "Students load the API from React and render loading and error states.",
          "Students can say why CORS appears when the page and the API use different ports.",
        ],
        tools: ["Node.js", "Express", "The cors package", "A Vite React project", "Two terminals", "A browser"],
        preparation: [
          "Start from a working GET and POST API so class time can go to validation and React, not to recreating last session from nothing.",
          "Install nothing global. Plan to npm install cors inside the API folder on Windows, macOS, and Ubuntu the same way, after opening the terminal differently.",
          "Know the Vite URL your room uses, usually http://localhost:5173, and free both 3000 and 5173 before class.",
          "Prepare a blank-title POST and a stopped-server reload so both error messages have been seen by you first.",
        ],
        flow: [
          {
            minutes: 5,
            title: "What memory could not protect",
            detail: "Ask what happened to posted tasks after a restart, then ask what a blank title would do to the list if the route trusts the body. Say this session adds a door check and connects the React page. The database is next week, so do not pretend the array is permanent.",
          },
          {
            minutes: 15,
            title: "Body, params, and query",
            detail: "Write three requests on the board: a JSON body, /api/tasks/3, and /api/tasks?completed=false. Name request.body, request.params.id, and request.query.completed. Stress that params and query values arrive as strings. Ask which one should mean a single task and which one should only filter the list.",
          },
          {
            minutes: 20,
            title: "400, 404, PATCH, and DELETE",
            detail: "Live-code the blank-title check and send a bad POST so the class sees status 400 and the error sentence. Add PATCH for completed and DELETE by id. Show one 404 with a missing id. Mention PUT as full replacement and say the exercise uses PATCH so the page can send one field. Add the JSON syntax error handler if a student hits invalid JSON.",
          },
          {
            minutes: 30,
            title: "React fetch, loading, and errors",
            detail: "Open a second terminal and start Vite. Add cors and explain the two ports. Fetch the list, with loading true until the response. Submit a valid task and a blank title. Stop the API and reload so the connection sentence appears. Students then complete the blank-title exercise on their own machines while you circulate.",
          },
          {
            minutes: 10,
            title: "Knowledge checks and stuck ports",
            detail: "Run the four checks. If time remains, ask one student to narrate a Failed to fetch: is the terminal listening, does the URL match, is cors loaded? Fix one real port clash if it happened, using Ctrl+C rather than a pile of new ports.",
          },
          {
            minutes: 10,
            title: "Assignment handoff",
            detail: "Open the week 14 assignment and read the required GET, POST, validation, loading state, and error state. Tell students the in-memory limit is acceptable for this assignment and will be replaced by PostgreSQL next week. Show the submission page before you dismiss the class.",
          },
        ],
        explain: [
          "Return immediately after an error response so the route does not also send success.",
          "request.params.id and request.query values are strings.",
          "response.ok is false for 400 and 404, while a down server rejects the fetch promise.",
          "cors is what allows the Vite origin to read the API during this local practice.",
        ],
        questions: [
          "Why is a blank title a 400 and a missing id a 404?",
          "What is the difference between /api/tasks/3 and /api/tasks?completed=false?",
          "What should the page show before the first response arrives?",
          "Why does the browser care that the page is on port 5173 and the API is on port 3000?",
        ],
        demonstration: "Reject a blank title with 400 JSON, patch a task's completed flag, then load the list in React. Stop the API and show the page's connection error beside the different sentence used for a real empty list.",
        practice: "Students trigger a 400 from the form and confirm the list does not grow. They also stop the API once and capture the connection message in their own words.",
        expectedOutcomes: [
          "POST of a blank title returns 400 and stores nothing.",
          "The React page renders tasks returned by the API.",
          "A stopped API produces an error state, not a fake empty success.",
        ],
        difficulties: [
          {
            issue: "The form reloads the whole browser and the error message flashes away.",
            help: "Check the submit handler calls preventDefault. Confirm the handler is passed to the form's submit event, not only to a button click that still submits.",
          },
          {
            issue: "The list on screen updates, but a refresh shows the old data.",
            help: "The student changed React state and skipped the request, or the request failed and they updated state anyway. Update state only after response.ok, using the JSON the server returned.",
          },
        ],
        homework: "Students submit the module assignment: a validated task API and a React page that loads and creates tasks, with loading and error states.",
        assessment: "Watch a blank title get rejected and a good title survive a page refresh while the API stays running. The knowledge checks cover params, status 400, query strings, and loading. Grade the files on the assignment page.",
        recap: "The server checks the body, the path id, and optional filters. React waits, then shows data or an honest error. The stored tasks are still temporary, which is the reason for the database week.",
        knowledgeCheckAnswers: [
          {
            id: "param-type",
            answer: "A string",
            explanation: "Route parameters arrive as text. Number converts \"3\" before you compare it with a numeric id.",
          },
          {
            id: "blank-title",
            answer: "400",
            explanation: "400 means the client should fix the request. 201 would claim the task was created, and 404 would mean the id was missing.",
          },
          {
            id: "query-filter",
            answer: "False",
            explanation: "A query parameter filters the collection. It does not choose a task id. The id belongs in the path.",
          },
          {
            id: "loading-empty",
            answer: "So a slow request is not mistaken for an empty list",
            explanation: "Until the response arrives, the page does not know whether the list is empty. A loading sentence tells the truth about waiting.",
          },
        ],
      },
    },
  ],
  assignment: {
    slug: "week-14-assignment",
    title: "A task API used by a React page",
    summary: "Build an Express task API that validates a title, and a React page that loads and adds tasks with loading and error states.",
    instructions: "Build a small task API and a React page that uses it.\n\nThe API is an Express server. Keep tasks in an array for this assignment. It is acceptable that a restart clears them. You will replace that store with a database next week.\n\nInclude GET /api/tasks, which returns a JSON array. Include POST /api/tasks, which reads a JSON body with title and details. If the title is missing or blank, respond with status 400 and JSON such as { \"error\": \"Title is required\" }. If the title is present, store a task with an id chosen by the server, completed set to false, and respond with status 201 and the task.\n\nCall app.use(express.json()) before the routes. Install and use the cors package so a React page on another port can read the API during local practice.\n\nThe React page uses fetch. While the first load is unfinished, show a loading sentence. If the server cannot be reached, show an error sentence that is different from the sentence you use when the list is truly empty. The form sends a POST with Content-Type application/json. Show the server's error when the status is 400, and add the returned task to the list when the status is 201.\n\nYou may also include PATCH and DELETE. They are not required if GET, POST, validation, loading, and the error state work.\n\nOpen the API terminal and the Vite terminal in the way your system expects. On Windows use the nodejs.org installer if Node is missing. On macOS use the official pkg and do not require Homebrew. On Ubuntu use sudo apt install -y nodejs npm.\n\nSubmit the API folder and the React page, or a repository that contains both, plus a short note that says how to start each one and what you see for a blank title.",
    objectives: [
      "Expose a task collection through GET and POST.",
      "Reject an invalid title with status 400 and JSON.",
      "Call the API from React with fetch.",
      "Distinguish a loading state, an empty list, and a connection error.",
    ],
    requirements: [
      "GET /api/tasks returns a JSON array while the server is running.",
      "POST /api/tasks returns 201 and a task when the title is valid.",
      "POST /api/tasks returns 400 JSON and stores nothing when the title is blank.",
      "The React page shows a loading sentence before the first response, and a different error sentence when the API is stopped.",
      "The form sends JSON using fetch and Content-Type application/json.",
    ],
    deliverables: [
      "The Express server and its package.json",
      "The React component that loads and creates tasks",
      "A short note explaining how to start both programmes",
    ],
    rubric: [
      {
        criterion: "API routes",
        points: 5,
        description: "GET returns the task array and a valid POST returns 201 with a server-assigned id.",
      },
      {
        criterion: "Validation",
        points: 5,
        description: "A blank title gets status 400 and a JSON error, and it is not added to the list.",
      },
      {
        criterion: "React integration",
        points: 5,
        description: "The page loads tasks with fetch and adds a created task from the response body.",
      },
      {
        criterion: "Honest states",
        points: 5,
        description: "Loading, an empty list, and a stopped API are visibly different.",
      },
    ],
    points: 20,
    instructorSolution: `const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const tasks = [];
let nextId = 1;

app.get("/api/tasks", (request, response) => {
  response.json(tasks);
});

app.post("/api/tasks", (request, response) => {
  const title = request.body && request.body.title;
  const details = request.body && request.body.details;
  if (typeof title !== "string" || title.trim() === "") {
    response.status(400).json({ error: "Title is required" });
    return;
  }
  const task = {
    id: nextId,
    title: title.trim(),
    details: typeof details === "string" ? details : "",
    completed: false
  };
  nextId += 1;
  tasks.push(task);
  response.status(201).json(task);
});

app.listen(3000, () => {
  console.log("API on http://localhost:3000");
});

// React submit:
// const response = await fetch("http://localhost:3000/api/tasks", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ title, details })
// });
// if (!response.ok) { const body = await response.json(); setError(body.error); return; }
// const created = await response.json();
// setTasks((current) => [...current, created]);
`,
  },
  quiz: {
    slug: "week-14-quiz",
    title: "Week 14 quiz",
    passingScore: 70,
    allowRetakes: true,
    questions: [
      {
        slug: "what-api",
        type: "multiple_choice",
        prompt: "Which description matches an API in this week?",
        options: [
          { id: "a", text: "An agreed set of requests and JSON shapes between two programmes" },
          { id: "b", text: "A CSS file that colours a form" },
          { id: "c", text: "A PostgreSQL installer" },
          { id: "d", text: "The browser's back button" },
        ],
        correct: { optionId: "a" },
        explanation: "The API is the contract: paths, methods, and JSON. The page and the server can change internally as long as that contract stays clear.",
        points: 1,
      },
      {
        slug: "rest-path",
        type: "multiple_choice",
        prompt: "In a REST style, what does the path /api/tasks/3 name?",
        options: [
          { id: "a", text: "The task resource whose id is 3" },
          { id: "b", text: "Every task that is incomplete" },
          { id: "c", text: "A command to install Express" },
          { id: "d", text: "The React component file" },
        ],
        correct: { optionId: "a" },
        explanation: "The path names the resource. The id segment picks one task. A filter such as completed belongs in the query string, not in a fake id.",
        points: 1,
      },
      {
        slug: "method-choice",
        type: "multiple_choice",
        prompt: "You want to change only the completed flag of an existing task. Which method fits this course?",
        options: [
          { id: "a", text: "PATCH" },
          { id: "b", text: "GET" },
          { id: "c", text: "POST to create a second copy every time" },
          { id: "d", text: "A new path called /api/magic" },
        ],
        correct: { optionId: "a" },
        explanation: "PATCH updates part of a resource. GET only reads. POST would create. A one-off path name throws away the REST pattern.",
        points: 1,
      },
      {
        slug: "status-create",
        type: "true_false",
        prompt: "This course uses status 201 when POST successfully creates a task.",
        correct: { value: true },
        explanation: "201 means created. It is more specific than 200. A blank title should not receive 201, because nothing was stored.",
        points: 1,
      },
      {
        slug: "read-validation",
        type: "code_reading",
        prompt: "What should this route do when the title is an empty string?",
        codeSnippet: "if (typeof title !== \"string\" || title.trim() === \"\") {\n  response.status(400).json({ error: \"Title is required\" });\n  return;\n}",
        options: [
          { id: "a", text: "Respond with 400 and skip storing a task" },
          { id: "b", text: "Respond with 201 and store a blank title" },
          { id: "c", text: "Delete every task" },
          { id: "d", text: "Install a new npm package" },
        ],
        correct: { optionId: "a" },
        explanation: "The condition catches a blank title, sends 400 JSON, and returns so the rest of the route cannot store the task.",
        points: 1,
      },
      {
        slug: "query-meaning",
        type: "multiple_choice",
        prompt: "What does GET /api/tasks?completed=false mean in this week's API?",
        options: [
          { id: "a", text: "Read the collection, filtered to tasks that are not complete" },
          { id: "b", text: "Delete the task whose id is false" },
          { id: "c", text: "Create a task called completed" },
          { id: "d", text: "Shut down PostgreSQL" },
        ],
        correct: { optionId: "a" },
        explanation: "The question mark starts a query parameter. It filters the list. It is not a route id and it is not a delete.",
        points: 1,
      },
      {
        slug: "cors-reason",
        type: "true_false",
        prompt: "A React page on port 5173 can be blocked from reading an API on port 3000 until the API allows that cross-origin request.",
        correct: { value: true },
        explanation: "Different ports are different origins. The browser enforces CORS. The cors package on the API is how this course allows the local page to read responses.",
        points: 1,
      },
      {
        slug: "loading-reason",
        type: "multiple_choice",
        prompt: "Why does the page track a loading state?",
        options: [
          { id: "a", text: "So the wait for the first response is not shown as an empty list" },
          { id: "b", text: "So npm can edit package.json" },
          { id: "c", text: "So HTTP can avoid status codes" },
          { id: "d", text: "So the server can skip validation" },
        ],
        correct: { optionId: "a" },
        explanation: "Until fetch finishes, the page does not know the list. A loading sentence is different from a successful response that happens to contain no tasks.",
        points: 1,
      },
      {
        slug: "param-versus-query",
        type: "short_answer",
        prompt: "Explain the difference between a route parameter and a query parameter, using a task API as the example.",
        correct: {
          rubric: "A complete answer says a route parameter is part of the path and identifies one resource, such as the id in /api/tasks/3, while a query parameter comes after a question mark and filters or adjusts a request, such as completed=false on the collection. The words can differ. Do not require the student to define CORS.",
        },
        explanation: "The path id picks one task. The query string asks for a subset of the collection. Both arrive as text and they answer different questions.",
        points: 2,
      },
    ],
  },
};
