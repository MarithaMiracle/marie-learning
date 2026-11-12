import type { ModuleSeed } from "../../src/lib/content-types";

function md(text: string): string {
  const cleaned = text.replaceAll("¬", "`");
  const lines = cleaned.replace(/^\n/, "").replace(/\n\s*$/, "").split("\n");
  const indents = lines.filter((line) => line.trim().length > 0).map((line) => line.match(/^ */)?.[0].length ?? 0);
  const margin = indents.length === 0 ? 0 : Math.min(...indents);
  return lines.map((line) => (line.length >= margin ? line.slice(margin) : line.trim())).join("\n").trim();
}

export const week16: ModuleSeed = {
  slug: "week-16-capstone",
  number: 16,
  weekNumber: 16,
  monthLabel: "Month 4 — Backend, databases and full-stack development",
  title: "Full-stack project and review",
  description: "Build a guided task manager with React, Express, and PostgreSQL, then review how to test it, explain it, and keep practising.",
  lessons: [
    {
      slug: "guided-fullstack-task-app",
      sessionNumber: 31,
      title: "Guided full-stack task app",
      estimatedMinutes: 90,
      difficulty: "Bringing ideas together",
      requiresOs: true,
      content: {
        overview: {
          about: "This lesson connects the pieces you already practised into one beginner task manager. React shows the list, Express checks the requests, and PostgreSQL stores each task. You will view, add, edit, delete, and complete tasks, and the rows will still be there after a refresh.",
          why: "Separate lessons can feel like separate subjects. One small app shows the path a click takes, from the button, through the API, into a table, and back onto the page.",
          alreadyKnow: "You can build a React task list, an Express API, and a PostgreSQL table with SELECT, INSERT, UPDATE, and DELETE.",
        },
        objectives: [
          "Describe the path from a React click to a PostgreSQL row and back.",
          "Create the single tasks table this project uses.",
          "Implement GET, POST, PATCH, and DELETE with Express and the pg package.",
          "Show, add, edit, complete, and delete tasks from a few React components.",
          "Show a clear error when the title is blank, the id is missing, or the database cannot be reached.",
        ],
        prerequisites: [
          {
            label: "SQL that can insert, read, update, delete, filter, and sort task rows",
            lessonSlug: "sql-operations",
          },
        ],
        teachingNotes: [
          {
            heading: "Three programmes, one task manager",
            markdown: md(`
              The task manager is three programmes working as a line, not one giant file. The React page is what the person sees. Express is the API that receives HTTP requests. PostgreSQL stores the rows. Each one can be restarted without the others being the same programme. That separation is the whole design you need. You do not need a second API, a library that hides the SQL, or a deployment pipeline to finish this project.

              Each layer already has work you understand. The page renders, the API checks and routes, and the database remembers. The problem a full-stack exercise solves is the gap between those skills. Until they are connected, a finished-looking list can still forget everything, which is what the week 12 page and the week 14 array both did.

              Picture a counter, a clerk, and a filing cabinet, which you have met in pieces. The person speaks to the counter. The clerk writes a slip and files it. The cabinet keeps the card when the counter closes. Refreshing the page asks the clerk to read the cabinet again.

              ### What success looks like

              You can add a task, refresh the browser, and see it. You can change the title, mark it complete, and delete it, and a SELECT in psql agrees with the page. A blank title is refused. If you stop Express, the page says it cannot connect instead of pretending the list is empty.

              The students table from last week is not required here. That table taught the foreign key and the join. This project keeps one tasks table so the page stays small enough to finish. You are not throwing the join away. You are choosing a smaller cabinet for the product.

              :::misunderstanding Full stack means a new framework
              It means using the frontend and the backend together, with a database behind the API. You already have React, Express, and PostgreSQL. This lesson is the wiring.
              :::
            `),
          },
          {
            heading: "The tasks table",
            markdown: md(`
              Create a database named tasks, then one table with the columns the page needs. id is a SERIAL primary key. title is TEXT and required. details is TEXT, required, and defaults to empty text so a missing detail becomes '' rather than NULL. completed is a BOOLEAN and defaults to FALSE. created_at is a TIMESTAMP and defaults to CURRENT_TIMESTAMP.

              ¬¬¬sql
              CREATE TABLE tasks (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                details TEXT NOT NULL DEFAULT '',
                completed BOOLEAN NOT NULL DEFAULT FALSE,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
              );
              ¬¬¬

              These columns match the JSON the API will send: id, title, details, completed, and created_at. Keeping the names the same means React does not translate one spelling into another.

              Run this statement in psql, using the client for your system. On Windows that is SQL Shell from the EDB install. On macOS it is Open psql in Postgres.app, or psql from the official Mac installer. On Ubuntu it is sudo -u postgres psql after the apt packages are installed. If the database tasks does not exist yet, create it before you create the table, and connect to it.

              On Ubuntu, a Node programme usually cannot log in as the peer postgres user. Create a database user with a password and let that user own the database:

              ¬¬¬sql
              CREATE USER task_user WITH PASSWORD 'local-password';
              CREATE DATABASE tasks OWNER task_user;
              ¬¬¬

              Use a different password on your machine. Do not commit it. On Windows, the postgres user and the EDB password are enough, and you can create the database as that user. On Postgres.app, your Mac user can create the database and often needs no password for local connections. Write down the user, whether a password is required, and the database name. The API will need the same three facts.

              :::warning One table, created before the API starts
              The server in this lesson does not create the table for you. If the table is missing, every query fails. Create it in psql first, then start Express.
              :::
            `),
          },
          {
            heading: "Express asks PostgreSQL",
            markdown: md(`
              The pg package is a client library: Node code that opens a connection to PostgreSQL. Install it in the API folder with express and cors: ¬npm install express cors pg¬. A pool is a small set of connections the API reuses, so each request does not have to introduce itself from scratch.

              ¬¬¬js
              const { Pool } = require("pg");

              const pool = new Pool({
                host: process.env.PGHOST || "localhost",
                port: Number(process.env.PGPORT || 5432),
                user: process.env.PGUSER,
                password: process.env.PGPASSWORD,
                database: process.env.PGDATABASE || "tasks"
              });
              ¬¬¬

              process.env reads environment variables, which are names and values given to the process from outside the file. PGUSER and PGPASSWORD are the usual names. The next lesson shows how to set them in each operating system's terminal. For this lesson, set them before ¬node server.js¬, and do not write the password into the file you will submit.

              host localhost and port 5432 mean the Postgres on this computer. That is correct while you practise. A hosted database later would change the host. The SQL can stay.

              ### A query returns rows

              ¬pool.query¬ sends one SQL string and returns a result. ¬result.rows¬ is an array of objects. The column names become the keys. ¬RETURNING *¬ on an INSERT or UPDATE puts the saved row into that array so the API can send it to React, including the id Postgres chose.

              Use parameter markers such as $1 and $2 rather than gluing a title into the SQL string. The array after the SQL supplies the values. This keeps a title like "O'Brien" from breaking the quotes, and it keeps user text from being treated as SQL.

              ¬¬¬js
              const result = await pool.query(
                "INSERT INTO tasks (title, details) VALUES ($1, $2) RETURNING *",
                [title, details]
              );
              ¬¬¬

              The functions that call the pool are async. Wrap the body in try and catch. If Postgres is down or the password is wrong, the catch should send status 500 and a short JSON error. The page can show that sentence. A password error and a missing table are both connection or query failures. Read the terminal for the Postgres message, and read the browser for the sentence you chose to show.

              :::misunderstanding The pool replaces SQL
              The pool delivers SQL. You still write SELECT, INSERT, UPDATE, and DELETE. There is no second language hiding in this project.
              :::
            `),
          },
          {
            heading: "Four endpoints for one resource",
            markdown: md(`
              The API is the REST task resource you already designed, with the array replaced by SQL.

              GET /api/tasks runs SELECT id, title, details, completed, created_at FROM tasks ORDER BY created_at and returns result.rows. Order the rows in SQL so the page does not depend on chance.

              POST /api/tasks reads title and details from the JSON body. If the title is not a non-empty string, respond 400 with { "error": "Title is required" } and do not insert. Otherwise insert, default completed to false, and respond 201 with the row from RETURNING.

              PATCH /api/tasks/:id updates only the fields that were sent. A complete button sends { "completed": true }. An edit form may send title and details. Check types the same way as last time. If no row matches the id, respond 404. UPDATE ... WHERE id = $1 RETURNING * makes the row count obvious: zero rows means 404.

              DELETE /api/tasks/:id deletes that id and returns { "deleted": true }. If no row was deleted, return 404. Do not delete without a WHERE id.

              express.json() still has to run before the routes. cors still has to allow the Vite page on another port. Invalid JSON should become a 400 JSON error from the four-argument error handler you wrote in week 14, so the page can show it.

              :::example The id is a string in the path and an integer in SQL
              request.params.id is text. Pass it as $1 and let Postgres compare it with the integer id, or convert it with Number and reject NaN with 400. Pick one way and use it in both PATCH and DELETE.
              :::

              :::tip Restart Express after a code change
              The running process keeps the old file. Ctrl+C and node server.js again. Postgres keeps the rows across that restart. That contrast is the point of the database.
              :::
            `),
          },
          {
            heading: "A few React components",
            markdown: md(`
              Split the page into a handful of components so each file has one responsibility. TaskApp holds the list, the loading flag, and the error message. It fetches GET /api/tasks when it mounts. TaskForm holds the title and details inputs and calls a function it received as a prop when the person submits. TaskList renders the tasks, or a sentence when the array is empty and there is no error. TaskItem shows one task and buttons for complete, edit, and delete.

              Props carry the data down and the actions up, which you practised in week 12. TaskApp owns the fetch calls so the URL and the error handling live in one place. TaskItem does not need to know the port number if it receives onComplete, onEdit, and onDelete.

              A load sets loading to true, then false when the response arrives. If fetch throws, set an error such as "The page could not connect to the server." If the response is not ok, show the JSON error when it has one. An empty array after a successful GET means there are no tasks yet. Say that. Do not reuse the connection sentence.

              ### Add, edit, complete, delete

              Add posts JSON and, on 201, appends the returned task. Edit can reuse the form or a second pair of inputs on the item. It sends PATCH with the new title and details. Complete sends PATCH with the opposite of the current completed flag. Delete sends DELETE and then removes that id from state only after the response is ok.

              Always trust the server's JSON for the saved task. If you update state before the response, a failed request leaves the page lying. If you wait for the response, a refresh and the page agree.

              TypeScript types help the props stay honest. A Task type with id, title, details, completed, and a created_at string matches the JSON. created_at arrives as text in JSON even though the column is a timestamp. You can show it as text. You do not need to build a calendar.

              :::misunderstanding Each button should keep its own copy of the list
              One list in TaskApp is enough. The children receive the task they display and the functions that change it. Two copies drift apart as soon as one request fails.
              :::
            `),
          },
          {
            heading: "Errors a person can read",
            markdown: md(`
              Basic error handling means the person can tell what failed, and you can tell which programme said so. There are three places to look. The browser shows the page message and, in the network tools, the status code. The Express terminal shows a log if you print one, and it shows a stack if a bug escaped your try/catch. psql shows whether the row exists.

              Map the common cases on purpose. Blank title: 400, no insert, the form shows "Title is required". Unknown id: 404, the page can say the task is gone. Database unreachable, wrong password, or missing table: 500 from your catch, and the page shows a connection or database sentence. Express not running: fetch throws, and the page shows the connection sentence. Those are different causes. A single word "error" is not enough when you are debugging, even if the page stays polite.

              When a query fails, log the database message on the server and send the person a general sentence. The database message can contain details you do not want on the page. You still need it in the terminal so you can fix the password, the port, or the table name.

              :::example A refresh is a test
              Add a task. Refresh. If it vanishes, the page updated React state and the INSERT did not happen, or you are looking at a different database than the API. Check psql in the same database name the pool uses.
              :::

              :::warning Do not start a second Postgres to escape a connection error
              A refused connection or a password failure is fixed by starting the service you installed, or by matching PGUSER and PGPASSWORD to that service. Another install on the same port makes the clash worse.
              :::
            `),
          },
          {
            heading: "Walk one click all the way through",
            markdown: md(`
              Take the add button and name every hop. The person types a title and submits. React calls preventDefault so the browser does not throw the page away. fetch sends POST http://localhost:3000/api/tasks with a JSON body and the JSON content type. Express matches POST /api/tasks. express.json builds request.body. The title check either returns 400 or continues. The pool runs INSERT ... RETURNING *. Postgres stores the row and returns it with a new id and a created_at. Express sends that object with status 201. React appends it and clears the inputs. A later GET, including a refresh, runs SELECT and the row is still there.

              Edit is the same path with PATCH and an id in the URL. Complete is a PATCH that changes one boolean. Delete is a DELETE that removes the row. View is the GET that runs when the page loads. If you can narrate those five without reading the files, you understand the project. If a hop is fuzzy, that hop is what to reread, not the entire course.

              The design stays on one computer. The browser uses localhost:5173. The API uses localhost:3000. Postgres uses localhost:5432. Three doors, one machine. The next lesson talks about what it would mean for those doors to live on computers that stay on for other people. You do not have to move them today.

              :::tip Narrate it once before you add features
              Say the path aloud with the server terminal and the page both visible. Then mark one task complete and point at the row in psql. The story and the row should match.
              :::
            `),
          },
        ],
        vocabulary: [
          {
            term: "Full stack",
            definition: "A project that uses the page, the API, and the database together, each doing its own part of the work.",
          },
          {
            term: "Pool",
            definition: "A pg object that keeps connections to PostgreSQL and runs your SQL strings for the API.",
          },
          {
            term: "SQL parameter",
            definition: "A marker such as $1 in SQL. The value is passed separately so the title is treated as data, not as SQL.",
          },
          {
            term: "RETURNING",
            definition: "A PostgreSQL clause that gives back the row an INSERT, UPDATE, or DELETE just changed.",
          },
          {
            term: "Environment variable",
            definition: "A name and value supplied to a process from outside the source file, such as PGUSER or PGPASSWORD.",
          },
          {
            term: "Component",
            definition: "A React function that renders one part of the page. This project uses TaskApp, TaskForm, TaskList, and TaskItem.",
          },
        ],
        demonstrations: [
          {
            title: "Save a task in PostgreSQL and show it in React",
            intro: "You will create the tasks table, start an Express API that uses pg, and add a task from React so a refresh still shows it.",
            steps: [
              "Open a terminal for your system. If node or psql is missing, install it with that system's steps before you continue.",
              "Open psql and create the tasks database and the tasks table with id, title, details, completed, and created_at.",
              "In the API folder, run npm install express cors pg. Set PGUSER, PGDATABASE, and PGPASSWORD if your database user has a password.",
              "Write GET /api/tasks and POST /api/tasks using pool.query and $1 parameters. Start the API with node server.js and leave it running.",
              "POST a valid task and then a blank title. Confirm 201 and 400. Refresh GET and confirm only the valid task remains.",
              "Start the React app in a second terminal with npm run dev. Load the list through TaskApp.",
              "Add, complete, edit, and delete from the page. After each one, refresh and compare with SELECT in psql.",
              "Stop the API and reload the page. Confirm the connection error appears, then start the API again.",
            ],
            expected: "Tasks survive a browser refresh and an API restart. psql shows the same titles the page shows. A blank title is not stored.",
            verify: "SELECT title, completed FROM tasks ORDER BY created_at matches the page after a refresh. The 400 response does not add a row.",
            ifItFails: "If Node cannot find pg, run npm install in the API folder. If Postgres refuses the connection, match the user, password, port, and database to the server you installed. If port 3000 is busy, stop the old API.",
            os: {
              sameOnAllPlatforms: "npm install express cors pg, node server.js, and npm run dev are the same after a terminal is open. The CREATE TABLE statement is the same inside psql. Open the tools in the way your system expects. On Windows, open Windows Terminal from the Start menu and SQL Shell (psql) for the database. On macOS, open Terminal with Spotlight and psql from Postgres.app. On Ubuntu, open Terminal with Ctrl+Alt+T. Set PGUSER and PGPASSWORD in that API terminal before node server.js. The next lesson lists the exact set and export commands.",
              windows: [
                "Open Windows Terminal from the Start menu. If node is not recognized, install the Windows .msi from https://nodejs.org and open a new terminal.",
                "Open SQL Shell (psql) from the EDB PostgreSQL install. Connect as postgres with the installer password, create the tasks database, and run the CREATE TABLE statement.",
                "In the API terminal, set PGUSER to postgres, set PGPASSWORD to your local database password, set PGDATABASE to tasks, and then run node server.js.",
              ],
              macos: [
                "Open Terminal with Spotlight. If node is missing, install the macOS pkg from https://nodejs.org. Do not install Homebrew.",
                "Open Postgres.app, use Initialize if needed, and choose Open psql. Create the tasks database and table there. The official Mac installer is an acceptable alternative if Postgres.app is not what you installed.",
                "In the API terminal, set PGUSER to your Mac user name and PGDATABASE to tasks. Leave the password unset if Postgres.app does not use one, then run node server.js.",
              ],
              linux: [
                "Open Terminal with Ctrl+Alt+T. If node is missing, run sudo apt update and sudo apt install -y nodejs npm.",
                "If PostgreSQL is missing, run sudo apt install -y postgresql postgresql-contrib. Start it with sudo service postgresql start and connect with sudo -u postgres psql.",
                "Create task_user with a password and a tasks database owned by that user. In the API terminal export PGUSER, PGPASSWORD, and PGDATABASE, then run node server.js.",
              ],
              identify: [
                "Windows uses the EDB SQL Shell and the nodejs.org installer. macOS uses Postgres.app or the official Mac installer, plus the nodejs.org pkg. Ubuntu uses apt for both postgresql and nodejs.",
                "Do not mix those installers. The SQL and the npm commands come after the right tools are open.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "Tasks API backed by PostgreSQL",
            filename: "server.js",
            language: "javascript",
            code: "const express = require(\"express\");\nconst cors = require(\"cors\");\nconst { Pool } = require(\"pg\");\n\nconst app = express();\napp.use(cors());\napp.use(express.json());\n\nconst pool = new Pool({\n  host: process.env.PGHOST || \"localhost\",\n  port: Number(process.env.PGPORT || 5432),\n  user: process.env.PGUSER,\n  password: process.env.PGPASSWORD,\n  database: process.env.PGDATABASE || \"tasks\"\n});\n\napp.get(\"/api/tasks\", async (request, response) => {\n  try {\n    const result = await pool.query(\n      \"SELECT id, title, details, completed, created_at FROM tasks ORDER BY created_at\"\n    );\n    response.json(result.rows);\n  } catch (error) {\n    console.log(error.message);\n    response.status(500).json({ error: \"The database could not be read\" });\n  }\n});\n\napp.post(\"/api/tasks\", async (request, response) => {\n  const title = request.body && request.body.title;\n  const details = request.body && request.body.details;\n  if (typeof title !== \"string\" || title.trim() === \"\") {\n    response.status(400).json({ error: \"Title is required\" });\n    return;\n  }\n  try {\n    const result = await pool.query(\n      \"INSERT INTO tasks (title, details) VALUES ($1, $2) RETURNING *\",\n      [title.trim(), typeof details === \"string\" ? details : \"\"]\n    );\n    response.status(201).json(result.rows[0]);\n  } catch (error) {\n    console.log(error.message);\n    response.status(500).json({ error: \"The task could not be saved\" });\n  }\n});\n\napp.patch(\"/api/tasks/:id\", async (request, response) => {\n  const completed = request.body && request.body.completed;\n  if (completed !== undefined && typeof completed !== \"boolean\") {\n    response.status(400).json({ error: \"Completed must be true or false\" });\n    return;\n  }\n  try {\n    const result = await pool.query(\n      \"UPDATE tasks SET completed = COALESCE($2, completed) WHERE id = $1 RETURNING *\",\n      [request.params.id, completed === undefined ? null : completed]\n    );\n    if (result.rows.length === 0) {\n      response.status(404).json({ error: \"Task not found\" });\n      return;\n    }\n    response.json(result.rows[0]);\n  } catch (error) {\n    console.log(error.message);\n    response.status(500).json({ error: \"The task could not be updated\" });\n  }\n});\n\napp.delete(\"/api/tasks/:id\", async (request, response) => {\n  try {\n    const result = await pool.query(\"DELETE FROM tasks WHERE id = $1 RETURNING id\", [request.params.id]);\n    if (result.rows.length === 0) {\n      response.status(404).json({ error: \"Task not found\" });\n      return;\n    }\n    response.json({ deleted: true });\n  } catch (error) {\n    console.log(error.message);\n    response.status(500).json({ error: \"The task could not be deleted\" });\n  }\n});\n\napp.listen(3000, () => {\n  console.log(\"API on http://localhost:3000\");\n});\n",
            explanation: "GET lists rows in created_at order. POST rejects a blank title and inserts a valid one with RETURNING. PATCH can set completed and returns 404 when the id is missing. DELETE removes one id. The pool reads the connection from environment variables. Database failures are logged on the server and returned as a short 500 JSON message. This PATCH example updates the completed flag. An edit of title uses the same WHERE id pattern with extra parameters.",
            lineNotes: [
              { focus: "new Pool", note: "Connects to local Postgres using PGUSER, PGPASSWORD, and PGDATABASE. The password stays out of the source file." },
              { focus: "$1, $2", note: "$1 and $2 keep the title as data. The values travel in the array, not inside the SQL string." },
              { focus: "RETURNING *", note: "Gives the inserted or updated row, including the id Postgres assigned, so React can render it." },
              { focus: "result.rows.length === 0", note: "An id that matches nothing is a 404, not a 500. The database did its work and found zero rows." },
            ],
            expectedOutput: "A valid POST returns 201 and a row. GET includes that row after an API restart. A blank title returns 400 and adds nothing.",
            level: "practical",
          },
          {
            title: "TaskApp loading the list",
            filename: "TaskApp.tsx",
            language: "tsx",
            code: "import { useEffect, useState, type FormEvent } from \"react\";\n\nconst api = \"http://localhost:3000/api/tasks\";\ntype Task = { id: number; title: string; details: string; completed: boolean };\n\nexport function TaskApp() {\n  const [tasks, setTasks] = useState<Task[]>([]);\n  const [title, setTitle] = useState(\"\");\n  const [details, setDetails] = useState(\"\");\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState<string | null>(null);\n\n  useEffect(() => {\n    fetch(api)\n      .then((response) => {\n        if (!response.ok) throw new Error(\"Could not load tasks\");\n        return response.json();\n      })\n      .then((data: Task[]) => {\n        setTasks(data);\n        setLoading(false);\n      })\n      .catch(() => {\n        setError(\"The page could not connect to the server.\");\n        setLoading(false);\n      });\n  }, []);\n\n  async function addTask(event: FormEvent) {\n    event.preventDefault();\n    setError(null);\n    try {\n      const response = await fetch(api, {\n        method: \"POST\",\n        headers: { \"Content-Type\": \"application/json\" },\n        body: JSON.stringify({ title, details })\n      });\n      const body = await response.json();\n      if (!response.ok) {\n        setError(typeof body.error === \"string\" ? body.error : \"The task was not saved.\");\n        return;\n      }\n      setTasks((current) => [...current, body as Task]);\n      setTitle(\"\");\n      setDetails(\"\");\n    } catch {\n      setError(\"The page could not connect to the server.\");\n    }\n  }\n\n  if (loading) return <p>Loading tasks.</p>;\n  return (\n    <section>\n      {error ? <p>{error}</p> : null}\n      <form onSubmit={addTask}>\n        <input value={title} onChange={(event) => setTitle(event.target.value)} />\n        <input value={details} onChange={(event) => setDetails(event.target.value)} />\n        <button type=\"submit\">Add task</button>\n      </form>\n      {tasks.length === 0 ? <p>No tasks yet.</p> : null}\n      <ul>\n        {tasks.map((task) => (\n          <li key={task.id}>{task.completed ? \"Done: \" : \"\"}{task.title}</li>\n        ))}\n      </ul>\n    </section>\n  );\n}\n",
            explanation: "TaskApp is the parent. It loads tasks, shows loading, and shows a connection error if the API is down. The form posts JSON and appends the row the server returned. TaskForm, TaskList, and TaskItem can take these pieces apart later. The list on screen comes from the response, not from a private array that never reaches PostgreSQL.",
            lineNotes: [
              { focus: "useEffect", note: "Runs the GET once when the component mounts, which is the view action." },
              { focus: "response.ok", note: "A 400 or 500 does not get added to the list. The error sentence comes from the JSON when it is present." },
              { focus: "body as Task", note: "The 201 body is the row from RETURNING, including the database id." },
            ],
            expectedOutput: "With the API and database running, the page lists stored tasks and a new valid task remains after refresh.",
            level: "practical",
          },
        ],
        exercises: [
          {
            title: "Narrate an add, then prove the row",
            difficulty: "practice",
            prompt: "Add one task from the page and show that PostgreSQL, not only React state, has the row.",
            steps: [
              "Start Postgres, the API, and the React page.",
              "Submit a task with a title you have not used before.",
              "Refresh the page and confirm the title is still there.",
              "In psql, select that title from the tasks table and note the id.",
            ],
            expectedOutcome: "The same title and id appear on the page after refresh and in the SELECT result.",
          },
          {
            title: "Refuse a blank title and a missing id",
            difficulty: "stretch",
            prompt: "Show that 400 and 404 are different, and that neither one inserts or deletes the wrong row.",
            steps: [
              "Submit the form with an empty title and record the message on the page.",
              "Select the row count in psql and confirm it did not grow.",
              "Send a PATCH or DELETE for an id that does not exist and record the 404.",
              "Select the remaining titles and confirm they are unchanged.",
            ],
            expectedOutcome: "The blank title is rejected, the missing id returns not found, and the stored titles stay as they were.",
          },
        ],
        troubleshooting: [
          {
            problem: "Cannot find module 'pg', 'express', or 'cors'.",
            why: "The package is not installed in the API folder you are running, or the terminal is in the React folder instead.",
            solution: "In the API folder run npm install express cors pg. Start node server.js from that same folder so Node uses its node_modules.",
          },
          {
            problem: "The API terminal says EADDRINUSE for port 3000, or Vite says its port is in use.",
            why: "An older API or dev server is still running and holding the port.",
            solution: "Press Ctrl+C in the old terminal and start that one programme again. Keep the API port and the fetch URL on the same number.",
          },
          {
            problem: "POST returns invalid JSON or the route never sees the title.",
            why: "The body is not valid JSON, the content type is missing, or express.json() is not installed before the route.",
            solution: "Send JSON.stringify output with Content-Type application/json. Fix quotes and commas. Keep express.json() above the routes and return 400 JSON from the syntax error handler.",
          },
          {
            problem: "The page or the API says it cannot connect to the database, or password authentication failed.",
            why: "Postgres is stopped, the port is wrong, or PGUSER, PGPASSWORD, or PGDATABASE does not match the server you installed.",
            solution: "Start the EDB service, Postgres.app, or the Ubuntu postgresql service. Set the environment variables in the API terminal to the user and database you created, then restart node server.js. Read the server log for the database message.",
          },
        ],
        knowledgeChecks: [
          {
            id: "who-stores",
            question: "After a successful add, where is the task stored so a refresh can show it?",
            format: "multiple_choice",
            options: [
              "In a PostgreSQL row",
              "Only in a React useState value",
              "Only in a CSS file",
              "In the browser address bar",
            ],
          },
          {
            id: "sql-values",
            question: "Why does the INSERT use $1 and $2 instead of pasting the title into the SQL text?",
            format: "multiple_choice",
            options: [
              "So the title is sent as data and not mixed into the SQL language",
              "So PostgreSQL can skip the table",
              "So React can avoid props",
              "So the port can be 3000 and 5432 at once",
            ],
          },
          {
            id: "refresh-proof",
            question: "If a task disappears on refresh, the database insert definitely succeeded.",
            format: "true_false",
            options: ["True", "False"],
          },
          {
            id: "four-routes",
            question: "Which method updates part of an existing task, such as the completed flag?",
            format: "multiple_choice",
            options: ["GET", "POST", "PATCH", "a second React app"],
          },
        ],
        homework: {
          description: "Write a lesson response that follows one successful add from the button to the database and back to the page. Name the React event, the HTTP method and path, the SQL idea (insert and returning), and what a refresh proves. Mention one error you tried, such as a blank title or a stopped API.",
          requirements: [
            "Name each hop: page, API, database, and the response.",
            "Include one error you actually triggered and what the page showed.",
          ],
          deliverables: ["A written response on this lesson page"],
          submission: "Submit the written response in the lesson practice area for this session.",
          criteria: [
            "The path includes React, Express, and PostgreSQL, not the page alone.",
            "The error example matches a real status or a connection failure.",
          ],
          submissionKind: "lesson_response",
        },
        summary: [
          "The page, the Express API, and PostgreSQL are three programmes. The project is the wiring between them.",
          "One tasks table holds id, title, details, completed, and created_at. The API uses SQL with $1 style values and RETURNING.",
          "GET views, POST adds, PATCH edits or completes, and DELETE removes. React updates state from the server's JSON.",
          "400, 404, and a down server should look different. A refresh plus a SELECT is how you prove a row was stored.",
        ],
        nextLesson: {
          title: "Testing, deployment, and review",
          why: "The task manager runs on your computer. Next you will test it on purpose, see what deployment means, and review the course without rushing past the loose ends.",
          lessonSlug: "testing-deployment-review",
        },
      },
      guide: {
        sessionNumber: 31,
        week: 16,
        title: "Guided full-stack task app",
        durationMinutes: 90,
        objectives: [
          "Students can narrate one click through React, Express, and PostgreSQL.",
          "The tasks table exists before the API is judged.",
          "GET, POST, PATCH, and DELETE read and write that table.",
          "The page shows loading, a saved task, and at least one honest error.",
        ],
        tools: ["Node.js", "Express", "pg", "PostgreSQL", "psql", "A Vite React app", "Two terminals"],
        preparation: [
          "Create a clean tasks database on the instructor machine and confirm a SELECT returns rows after an API restart.",
          "Prepare the Windows EDB connection, the Postgres.app connection, and the Ubuntu task_user connection on a card. Do not use Homebrew.",
          "Free ports 3000, 5173, and 5432. Know which terminal will show SQL errors.",
          "Have a blank-title request ready so 400 is demonstrated, not only described.",
        ],
        flow: [
          {
            minutes: 5,
            title: "Name the three doors",
            detail: "Write localhost ports 5173, 3000, and 5432 on the board and ask which programme listens on each. Say the project is those three programmes plus the requests between them. The students table stays in last week's notes. This app uses one tasks table.",
          },
          {
            minutes: 15,
            title: "Table, then the click path",
            detail: "Create the tasks table live in psql. Then narrate an add with no code yet: submit, POST, validate, INSERT RETURNING, 201, append, refresh, SELECT. Ask students where the row would be missing if refresh forgot it. That question is the test you will repeat all session.",
          },
          {
            minutes: 20,
            title: "Pool and the four routes",
            detail: "Install pg, show the Pool reading PGUSER and PGPASSWORD, and set them for the projector's operating system without leaving the password in the file. Implement GET and POST first. Demonstrate 201 and 400. Then add PATCH for completed and DELETE by id, including a 404 for a missing id.",
          },
          {
            minutes: 30,
            title: "React components on the API",
            detail: "Start Vite in a second terminal. Build TaskApp so the list comes from GET. Add the form. Then split out TaskItem buttons for complete and delete, and a small edit of the title. After each button, refresh and run a SELECT. Students repeat one add on their own machines and compare psql.",
          },
          {
            minutes: 10,
            title: "Connection failures",
            detail: "Stop Postgres or use a wrong PGDATABASE on purpose and read the server log, then the page message. Distinguish that from a blank title and from a stopped Express process. Point at missing module, port in use, invalid JSON, and authentication failed as four different sentences.",
          },
          {
            minutes: 10,
            title: "Written path and the assignment",
            detail: "Set the lesson response: narrate one successful add and one real error. Open the week 16 assignment and show that the project guide lists the table, the routes, the components, and the manual checks. They will use that list properly in the next session's testing lesson. Today the goal is one true saved row.",
          },
        ],
        explain: [
          "The page does not store the lasting copy. PostgreSQL does.",
          "$1 passes data into SQL. The title is not concatenated into the statement.",
          "RETURNING gives React the id the database chose.",
          "One list of state in TaskApp, with props for the child components.",
        ],
        questions: [
          "Which programme should still have the task after you stop and start Express?",
          "What status should a blank title receive, and what SQL should not run?",
          "Why are 5173, 3000, and 5432 different doors?",
          "What does a 404 on DELETE mean about the table?",
        ],
        demonstration: "Create the table, start the API with environment variables set for the projector's system, add a task from React, refresh, and SELECT the same title in psql. Then reject a blank title.",
        practice: "Each student adds one original task and shows the matching SELECT. If the row is missing, they check the database name in the pool before they rewrite the component.",
        expectedOutcomes: [
          "A refreshed page shows a task that SELECT can also see.",
          "A blank title returns 400 and does not add a row.",
          "Students can name GET, POST, PATCH, and DELETE for view, add, edit or complete, and delete.",
        ],
        difficulties: [
          {
            issue: "The page shows the new task, but psql in another database shows an empty table.",
            help: "Compare PGDATABASE with the database name in the psql prompt. Connect psql to the same database the pool uses, then select again.",
          },
          {
            issue: "password authentication failed on Ubuntu or Windows.",
            help: "Set PGPASSWORD in that API terminal to the password of PGUSER, restart node, and do not paste the password into server.js. On Postgres.app, try with the Mac user and no password before inventing a new one.",
          },
        ],
        homework: "Students submit a written path of one add, including the method, the insert, and a refresh, plus one error they triggered.",
        assessment: "The evidence is a row that survives refresh and matches psql. Knowledge checks cover where data lives, SQL parameters, the refresh test, and PATCH. The graded project is the module assignment, finished with the testing lesson.",
        recap: "A click becomes HTTP, HTTP becomes a checked SQL statement, and the row comes back as JSON. Tomorrow you will test that path on purpose and talk about what it would mean to run it somewhere other than your laptop.",
        knowledgeCheckAnswers: [
          {
            id: "who-stores",
            answer: "In a PostgreSQL row",
            explanation: "React state is only the current view. The refresh works because GET reads the row PostgreSQL kept.",
          },
          {
            id: "sql-values",
            answer: "So the title is sent as data and not mixed into the SQL language",
            explanation: "$1 and $2 keep values out of the SQL text. The database binds them as data for the insert.",
          },
          {
            id: "refresh-proof",
            answer: "False",
            explanation: "If the task disappears on refresh, the lasting store did not get the row. The page may have updated state alone.",
          },
          {
            id: "four-routes",
            answer: "PATCH",
            explanation: "PATCH changes part of an existing task, including the completed flag. POST creates. GET reads.",
          },
        ],
      },
    },
    {
      slug: "testing-deployment-review",
      sessionNumber: 32,
      title: "Testing, deployment, and review",
      estimatedMinutes: 90,
      difficulty: "Bringing ideas together",
      requiresOs: true,
      content: {
        overview: {
          about: "This lesson is about trusting the task manager you built. You will test it by hand, debug a failure across the page, the API, and the database, and move passwords into environment variables. You will also learn what deployment and hosting mean, write a README, and review the course.",
          why: "A feature that works once in front of you can fail on the next click. A short test list and an honest README make the project something another person can run and you can explain.",
          alreadyKnow: "You have a task manager that uses React, Express, and PostgreSQL on your computer.",
        },
        objectives: [
          "Explain why manual testing is part of building the task manager.",
          "Run a checklist that covers view, add, edit, complete, delete, a blank title, and a stopped API.",
          "Debug by deciding whether the browser, the API, or the database failed.",
          "Set database environment variables in the terminal for your operating system.",
          "Describe deployment, hosting, a README, and safe handling of passwords without putting the app on the public internet.",
        ],
        prerequisites: [
          {
            label: "A task manager that stores rows in PostgreSQL",
            lessonSlug: "guided-fullstack-task-app",
          },
        ],
        teachingNotes: [
          {
            heading: "Why testing matters",
            markdown: md(`
              Testing is how you find out what the programme does, as opposed to what you hope it does. A manual test is a person following steps: open the page, click, type, refresh, and compare the result with what you expected. This course stops at manual tests. Automated test runners exist, and you do not need one to finish.

              Testing matters because the task manager has three programmes and several buttons. Complete might update the page and forget the database. Delete might remove the wrong id. A blank title might slip through if the check is only in React and the API is called another way. Hope does not catch those. A written list does, because you do not have to remember every case while you are also nervous.

              Think of checking a room before a guest arrives. You try the light, the door, and the tap. You are not claiming the building is finished for every future guest. You are saying these switches work today. That is the right size of claim for this project.

              :::misunderstanding A test is only for finding embarrassment
              A failed test is information. It names the hop that broke. The page, the API, or the database will usually tell you which one, if you look at all three.
              :::

              Write the expected result beside each step before you click. "Refresh shows the new title" is a test. "It works" is a wish.
            `),
          },
          {
            heading: "A manual checklist for the task manager",
            markdown: md(`
              Use this list in order. Start Postgres, the API, and the React page. Note the database name.

              View: the tasks already in PostgreSQL appear on the page. If the table is empty, the page says so, and it is not an error colour or an error sentence.

              Add: submit a title and details. The new task appears. Refresh the browser. It is still there. SELECT in psql shows that title.

              Edit: change the title. Refresh. The new title remains. The old title is gone from that id, not copied into a second row.

              Complete: mark the task complete. Refresh. It still looks complete. The completed column in psql is true.

              Delete: remove the task. It leaves the page. Refresh does not bring it back. SELECT does not show that id.

              Blank title: submit an empty title. The page shows an error. The row count in the database does not grow.

              Stopped API: press Ctrl+C in the API terminal and reload the page. You see a connection error, not a fake empty list. Start the API again and reload. The real list returns.

              ### What to write down

              For each step, write pass or the exact thing you saw instead. A screenshot of one success and one refusal is enough evidence if the words are specific. "Error" alone is not. "400 Title is required, and SELECT count stayed at 3" is.

              :::example Two empties
              An empty table with the API running should say there are no tasks. A stopped API should say the page could not connect. If those screens match, the test found a real bug in the conditions.
              :::

              Run the list once after the last code change, not only at the start. A fix for delete can break add. The list is short so you can run it again.
            `),
          },
          {
            heading: "Debugging across three programmes",
            markdown: md(`
              Debugging is the work of moving from a surprise to a cause by changing one thing at a time. When the task manager misbehaves, ask which room spoke. The browser, the Express terminal, and psql are the three rooms.

              If the browser cannot reach the API, the network message has no status, or it says failed to fetch. Check that node server.js is running and that the URL port matches. If the browser receives 400 or 404, the API did answer. Read the JSON. Do not reinstall Node for a validation message.

              If the API logs a database error, the request arrived and SQL failed. Connection refused means Postgres is stopped or the port is wrong. Password authentication failed means PGUSER or PGPASSWORD does not match. Relation "tasks" does not exist means you are connected, and the table was never created in that database. Open psql to the same database and look.

              If the page and the API look happy and psql does not show the row, you are querying a different database, or the page updated state without a successful response. Believe the SELECT and the status code over your memory of the click.

              ### One change, then retest

              Change a single setting, restart the process that reads that setting, and run the one checklist step that failed. A pile of changes makes the next result unreadable. console.log on the server can print the title you received and the id you queried. Do not log the password. In the browser network tools, the status and the response body are enough. You used those tools earlier in the course. You do not need every panel.

              :::warning Restart the process that read the old value
              Express reads environment variables when it starts. Changing them in another window does nothing to the process that is already running. Ctrl+C and start it again, then retest.
              :::

              :::misunderstanding The longest error is the first place to edit
              Read the first meaningful line. A missing table, a wrong password, and a blank title are three short causes. The lines under them often repeat the same failure.
              :::
            `),
          },
          {
            heading: "Environment variables on each system",
            markdown: md(`
              An environment variable is a value handed to a programme when it starts, instead of being written in the source. This project uses PGHOST, PGPORT, PGUSER, PGPASSWORD, and PGDATABASE. The API reads them with process.env. They exist so the password and the database name can change between your laptop and any later host without editing the SQL.

              The commands that set them for one terminal session differ. They last until you close that terminal, and they are not written into server.js.

              On Windows Command Prompt, set them with set. For example, set PGUSER=postgres and set PGPASSWORD=local-password and set PGDATABASE=tasks. Then, in that same window, run node server.js.

              On Windows PowerShell, the spelling changes. $env:PGUSER = "postgres" and $env:PGPASSWORD = "local-password" and $env:PGDATABASE = "tasks". PowerShell and Command Prompt are not interchangeable for these lines. Use the shell you actually opened.

              On macOS and Linux, use export. export PGUSER=postgres and export PGPASSWORD=local-password and export PGDATABASE=tasks. On Postgres.app the user is often your Mac name and the password may be unnecessary. Export PGUSER and PGDATABASE, and leave PGPASSWORD unset if the local server does not want one.

              ### A file of names, not of secrets in Git

              Many projects keep a local file named .env that lists the names. Tools can load it. If you use one, do not commit the real password. Commit an example that shows the names with blank values, and say in the README which names are required. The next section's security note is the same idea: the password is a key, and the repository is a noticeboard.

              Open the terminal first in the way your system expects, then type the set or export lines, then start the API in that same terminal. A variable exported in a different window is invisible here.

              :::tip Check the names without printing the password
              You can log whether PGPASSWORD is set, as a yes or no. Logging the password itself puts it in the terminal scrollback and in any screenshot of the error.
              :::
            `),
          },
          {
            heading: "What deployment and hosting mean",
            markdown: md(`
              Deployment means putting a programme on a computer that other people can reach, and leaving it running when your laptop is closed. Hosting is the service, or the computer, that provides that place. You are not required to deploy this project or to buy hosting. You should be able to say what would move, and what would change.

              Today, three programmes share your computer. The React dev server, Express, and PostgreSQL all use localhost. Localhost is a loop inside one machine. A friend on another network cannot open it. That limit is useful while you practise. It is also why "it works on my machine" is not the same sentence as "it is deployed".

              A conceptual split looks like this. The frontend becomes the built React files, which are static files a host can serve. Static means they do not need the Vite dev server. The backend becomes a Node process that a host keeps running, still speaking the same Express routes. The database becomes a PostgreSQL service with its own address, user, and password. Sometimes one company offers all three. Sometimes they are separate. The domain name you met in the first weeks can point at the frontend. The API has its own address. The database is usually not open to the whole internet. The API is what talks to it.

              ### What would change in the configuration

              The SQL and the React components can stay. The environment variables change. PGHOST would no longer be localhost. PGPASSWORD would be a new secret for that hosted database, not the one from your laptop. The fetch URL in the page would use the public API address instead of http://localhost:3000. Those are configuration changes. They are not a rewrite of the task rules.

              :::misunderstanding Deployment is a button that uploads hope
              Something specific is copied or built: the page's files, the API's files, and a database that already has the tasks table. Each one needs a start command or a service. The README is where those commands are written down.
              :::

              You have practised the shape that deployment copies. Doing the copy is a later project with accounts, billing, and host-specific steps. Leaving it explained is the goal for this lesson.
            `),
          },
          {
            heading: "Basic security awareness",
            markdown: md(`
              Security awareness here means habits that keep obvious doors shut. It is not a catalogue of attacks, and it is not a claim that the task manager is ready for strangers' private data.

              Do not put the database password in source code, in a screenshot, or in the Git repository. Use an environment variable. If a password was committed by mistake, change the password. Deleting the line in a later commit does not remove it from old history. Ask your instructor before you try to rewrite history.

              Keep the checks on the server. A React check is a courtesy. The API must still reject a blank title, because a client can send JSON without using your form. The $1 markers are part of this habit. They tell Postgres that the title is a value.

              localhost is private to your computer. A public URL is not private just because you have not told many people. This project has no accounts and no login. Do not collect real passwords, payment details, or another person's private notes in it. Practice titles are enough.

              On a public site, HTTPS encrypts the trip between the browser and the server so the JSON is not sent as open text on the network. You do not set that up today. You should know the word, and you should keep using http for localhost.

              :::warning Do not run instructions that you cannot read
              If a message tells you to paste a long command or a long SQL script that you did not write, stop and ask. A local practice database is still your machine. Curiosity is good. Unread commands are not required by this course.
              :::

              :::misunderstanding A hidden page is a lock
              Obscurity is not a check. The checks you have are validation, a password that is not published, and a database that is not exposed without the API. They fit a beginner project. They are not a complete security programme, and this lesson does not pretend they are.
              :::
            `),
          },
          {
            heading: "README, demonstration, and where to go next",
            markdown: md(`
              A README is the front page of the project. It should let another classmate run the task manager without asking you in person. Include what the app does, in two or three sentences. Include how to install dependencies for the API and for the React app. Include how to create the tasks table, with the SQL or a pointer to the file that holds it. Include the environment variable names, not your real password. Include the commands to start Postgres if it is not a service yet, to start the API, and to start the React page. Include the manual test list, or a shorter version of it.

              A demonstration is you running that list in front of someone and narrating one request. Open the page, add a task, refresh, edit it, complete it, delete it, and show one refusal. Have psql ready for one SELECT so you can show the row and not only the pixels. If something fails, use the debugging steps. A calm failure you can explain is more honest than a script you cannot leave.

              ### The course, as a map

              You started with computers, files, and the web, then HTML and CSS, including layout. JavaScript gave you values, decisions, loops, functions, and collections. The browser document and events made pages respond. Git recorded versions. TypeScript and React built interfaces from components, props, and state. Node and Express answered HTTP with JSON. PostgreSQL stored rows, and SQL read and changed them. This project is those layers in one line.

              That is a first pass. It is not a claim that every tool is familiar, or that you are finished. The next useful work is small and repeated: add a filter for completed tasks, write the README for a classmate, or rebuild the same app from a blank folder without looking, one hop at a time.

              When you want a reference, use the official notes this course already pointed at: MDN for HTML, CSS, JavaScript, and HTTP; the React learn guide; the Node.js learn section; the PostgreSQL manual for the SQL you actually use. Read them after you have a question from your own project, not as a second course you must complete tonight.

              :::example A finished sentence
              "The page sends PATCH /api/tasks/4, Express updates the completed column, Postgres keeps it, and a refresh shows it." If you can say that about your own id, you can keep practising from a solid place.
              :::
            `),
          },
        ],
        vocabulary: [
          {
            term: "Manual testing",
            definition: "A person following written steps and comparing what the programme does with what they expected.",
          },
          {
            term: "Debugging",
            definition: "Finding the cause of a surprise by reading the first useful error and changing one thing at a time.",
          },
          {
            term: "Environment variable",
            definition: "A value given to a programme at startup, such as PGPASSWORD, so the secret is not stored in the source file.",
          },
          {
            term: "Deployment",
            definition: "Running the project on a computer other people can reach, with the page, the API, and the database still playing their parts.",
          },
          {
            term: "Hosting",
            definition: "The computer or service that keeps a deployed piece running, such as the static page, the Node process, or PostgreSQL.",
          },
          {
            term: "README",
            definition: "The project's front page: what it does, how to create the table, which variables to set, and how to start and test it.",
          },
          {
            term: "HTTPS",
            definition: "HTTP with encryption for the trip between a browser and a public server. Localhost practice in this course stays on http.",
          },
        ],
        demonstrations: [
          {
            title: "Test the task manager and set the variables",
            intro: "You will set the database variables in your system's terminal, start the API, and walk the manual checklist, including one deliberate failure.",
            steps: [
              "Open a terminal the way your operating system expects. Confirm node and psql still run. Install only with your system's steps if a command is missing.",
              "In that terminal, set PGUSER, PGDATABASE, and PGPASSWORD if your database user has a password. Use set on Command Prompt, $env: names on PowerShell, or export on macOS and Linux.",
              "Start the API in the same terminal. In a second terminal, start the React page.",
              "Run the view step. Confirm existing rows appear, or that a truly empty table shows the empty sentence.",
              "Add a task, refresh, and confirm the title with SELECT.",
              "Edit the title, mark the task complete, and delete it, refreshing after each action.",
              "Submit a blank title and confirm the database row count does not change.",
              "Stop the API, reload, confirm the connection error, then start the API again and reload.",
            ],
            expected: "Each checklist step either matches the expected page and the database, or you have a specific note of what appeared instead.",
            verify: "A task you add is visible in psql and after refresh. The blank title is absent from the table. The stopped API shows a connection message.",
            ifItFails: "Decide which room failed before you edit. A missing module needs npm install in the API folder. A busy port needs Ctrl+C on the old process. A database connection error needs the service started and the variables set in this terminal.",
            os: {
              sameOnAllPlatforms: "The checklist clicks are the same on every system. The terminal commands that set variables are not. Open the terminal first. On Windows, use the Start menu and choose either Command Prompt or PowerShell, then use only that shell's syntax. On macOS, open Terminal with Spotlight. On Ubuntu, open Terminal with the application menu or Ctrl+Alt+T. After the variables are set, node server.js and npm run dev are the same. Do not put the password in server.js.",
              windows: [
                "Open Command Prompt from the Start menu and set variables with set PGUSER=postgres, set PGDATABASE=tasks, and set PGPASSWORD to the EDB password. Then run node server.js in that window.",
                "If you opened PowerShell instead, use $env:PGUSER = \"postgres\" and the same pattern for PGDATABASE and PGPASSWORD. Do not paste the Command Prompt set lines into PowerShell.",
                "If node is not recognized, install the Windows installer from https://nodejs.org and open a new terminal. If Postgres is stopped, start the service from the EDB install.",
              ],
              macos: [
                "Open Terminal with Spotlight. Export PGUSER as your Mac user and PGDATABASE as tasks. Export PGPASSWORD only if your server asks for one. Postgres.app often does not.",
                "Start the API in that same Terminal window. If node is missing, install the macOS pkg from https://nodejs.org. Do not install Homebrew.",
                "If psql cannot connect, open Postgres.app and Initialize or start the server, then use Open psql. The official Mac installer is the other accepted path.",
              ],
              linux: [
                "Open Terminal with Ctrl+Alt+T. If node is missing, run sudo apt update and sudo apt install -y nodejs npm. If PostgreSQL is missing, run sudo apt install -y postgresql postgresql-contrib.",
                "Start the service with sudo service postgresql start if a connection is refused. Export PGUSER, PGPASSWORD, and PGDATABASE for the task_user you created, then run node server.js in that same terminal.",
                "Open a second terminal for npm run dev so the API window stays visible while you test.",
              ],
              identify: [
                "Choose the Start menu, the Apple menu, or Ubuntu's terminal shortcut before you type set or export. The wrong shell makes the variable look unset.",
                "Node installs from nodejs.org on Windows and macOS, and from apt on Ubuntu. PostgreSQL installs from the EDB installer, Postgres.app or the official Mac installer, or apt. Keep those paired with the system you wrote down.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "See whether the variables are set",
            filename: "check-env.js",
            language: "javascript",
            code: "const names = [\"PGUSER\", \"PGDATABASE\"];\n\nfor (const name of names) {\n  if (!process.env[name]) {\n    console.log(\"Missing \" + name);\n  } else {\n    console.log(name + \" is set\");\n  }\n}\n\nif (process.env.PGPASSWORD) {\n  console.log(\"PGPASSWORD is set\");\n} else {\n  console.log(\"PGPASSWORD is not set\");\n}\n",
            explanation: "Run this with node check-env.js in the same terminal where you set the variables. It reports names, not values, so a screenshot does not reveal the password. Start the API only after the required names are set. Postgres.app users may correctly see that PGPASSWORD is not set.",
            lineNotes: [
              { focus: "process.env[name]", note: "Reads one variable that was set in this terminal before Node started." },
              { focus: "PGPASSWORD is set", note: "Confirms presence without printing the secret. Do not change this line to log the value." },
            ],
            expectedOutput: "The terminal prints that PGUSER and PGDATABASE are set, and it says whether PGPASSWORD is set, without showing the password.",
            level: "basic",
          },
          {
            title: "A README another person can follow",
            filename: "README.md",
            language: "text",
            code: "Task manager\n\nA small page to view, add, edit, complete, and delete tasks. The rows are stored in PostgreSQL.\n\nAPI\n- Install Node.js for your system.\n- In the api folder run: npm install\n- Create the tasks table in the tasks database.\n- Set PGUSER, PGDATABASE, and PGPASSWORD if your database user has a password.\n- Run: node server.js\n\nPage\n- In the web folder run: npm install\n- Run: npm run dev\n\nTests to try\n- Add a task and refresh.\n- Edit, complete, and delete it.\n- Submit a blank title.\n- Stop the API and reload the page.\n",
            explanation: "This README names the feature, the two start commands, the variables, and the manual tests. It does not contain a real password. A classmate should be able to supply their own user and password and reach the checklist.",
            lineNotes: [
              { focus: "npm install", note: "Restores packages from package.json. The README should say which folder, because the API and the page each have one." },
              { focus: "Set PGUSER", note: "Names the variables. The values stay in that person's terminal or local uncommitted file." },
              { focus: "Tests to try", note: "A short manual list so a demonstration and a classmate follow the same checks." },
            ],
            expectedOutput: "A reader can tell how to start both programmes and which clicks to try, without asking for a password hidden in the code.",
            level: "practical",
          },
        ],
        exercises: [
          {
            title: "Run the checklist and mark the gaps",
            difficulty: "practice",
            prompt: "Execute the manual tests against your own task manager and write a pass or a specific failure for each one.",
            steps: [
              "Start the database, the API, and the page using environment variables set in the API terminal.",
              "Walk view, add, edit, complete, delete, blank title, and stopped API.",
              "For any failure, write the status code or the sentence you saw, and which of the three programmes you checked first.",
              "Fix one failure if you can do it with a single change, then rerun only that step and the step most likely to break beside it.",
            ],
            expectedOutcome: "You have a written result for every checklist step, and any failure names the room you inspected.",
          },
          {
            title: "Draft the README from a classmate's point of view",
            difficulty: "stretch",
            prompt: "Write a README that someone else could follow on their own operating system, without your password.",
            steps: [
              "State what the task manager can do.",
              "Say how to create the tasks table and which environment variable names the API reads.",
              "Give the start commands for the API and the page.",
              "List the manual checks. Ask a classmate which line they would not know how to do, and adjust that line.",
            ],
            expectedOutcome: "The README contains the start steps, the variable names, and the tests, and it does not contain a database password.",
          },
        ],
        troubleshooting: [
          {
            problem: "The API says it cannot connect, or password authentication failed, after you thought the variables were set.",
            why: "The variables were set in a different terminal, the names were spelled with the other shell's syntax, or Postgres is not running.",
            solution: "In the same window you use for node server.js, set the variables again with set, $env:, or export for that shell. Start the EDB service, Postgres.app, or sudo service postgresql start. Run the check-env script, then start the API.",
          },
          {
            problem: "Port 3000 or the Vite port is already in use when you begin the demonstration.",
            why: "A previous API or page server is still running from the last session.",
            solution: "Stop it with Ctrl+C in its terminal. Start only one API and one page. Keep the fetch URL on the port the API just printed.",
          },
          {
            problem: "A checklist POST fails because the JSON is invalid, or the title never arrives.",
            why: "The request body has a trailing comma, single quotes, or the wrong content type, so Express cannot build request.body.",
            solution: "Use the form, which calls JSON.stringify, or fix the hand-written JSON. Confirm express.json() is enabled and that a syntax error returns 400 JSON.",
          },
          {
            problem: "Cannot find module 'pg' when you start the API on a classmate's computer or a fresh folder.",
            why: "node_modules was not installed in that folder. The README's npm install step was skipped.",
            solution: "In the API folder run npm install so express, cors, and pg are present. Then set the variables and run node server.js again.",
          },
        ],
        knowledgeChecks: [
          {
            id: "manual-why",
            question: "What is a manual test in this lesson?",
            format: "multiple_choice",
            options: [
              "A person following steps and comparing the result with what they expected",
              "A promise that the project is finished for every future change",
              "A replacement for the database",
              "A way to hide a password in the README",
            ],
          },
          {
            id: "which-room",
            question: "The browser says failed to fetch and shows no status code. What should you check first?",
            format: "multiple_choice",
            options: [
              "Whether the API process is running and the URL port matches",
              "Whether the title column should become a boolean",
              "Whether to delete the tasks table",
              "Whether HTML needs a new doctype",
            ],
          },
          {
            id: "deploy-means",
            question: "Deployment in this lesson means you must buy hosting before the checklist counts.",
            format: "true_false",
            options: ["True", "False"],
          },
          {
            id: "secret-place",
            question: "Where should the database password live for this project?",
            format: "multiple_choice",
            options: [
              "In an environment variable set outside the committed source",
              "Inside server.js so every classmate gets the same password",
              "In the React button label",
              "In a public comment on the home page",
            ],
          },
        ],
        homework: {
          description: "Submit the week 16 assignment: the guided task manager, a README, and a short record of the manual checklist. The assignment page includes the table, the routes, the components, and the tests the instructor will look for.",
          requirements: [
            "The app can view, add, edit, complete, and delete tasks stored in PostgreSQL.",
            "The README explains how to start the project and names the environment variables without revealing a real password.",
          ],
          deliverables: ["The week 16 module assignment submission"],
          submission: "Submit the week 16 assignment from the assignment page. That submission is the homework for this session.",
          criteria: [
            "A refreshed page matches a SELECT for a task you added.",
            "The checklist notes include a blank title and a stopped API.",
          ],
          submissionKind: "module_assignment",
        },
        summary: [
          "Manual tests are written steps with expected results. They cover the task buttons, a blank title, and a stopped API.",
          "Debugging starts by asking whether the browser, Express, or PostgreSQL failed, then changes one thing.",
          "Environment variables keep the database password out of the source. Command Prompt, PowerShell, and macOS or Linux use different commands to set them.",
          "Deployment means running the page, the API, and the database where other people can reach them. You can explain that without doing it. A README and a short demonstration make the project understandable.",
        ],
        nextLesson: {
          title: "Continued practice",
          why: "Keep a small full-stack exercise going. Repeat the path from a click, through Express, to a PostgreSQL row, and back to the page until you can explain it from memory.",
        },
      },
      guide: {
        sessionNumber: 32,
        week: 16,
        title: "Testing, deployment, and review",
        durationMinutes: 90,
        objectives: [
          "Students run the manual checklist and record specific results.",
          "Students can point at the browser, the API, or Postgres as the source of a failure.",
          "Students set environment variables with the command their shell actually uses.",
          "Students describe deployment and write a README without promising a workplace or a hosted account.",
        ],
        tools: ["The task manager from the previous session", "psql", "Two terminals", "The README draft"],
        preparation: [
          "Have a finished task manager that passes the checklist, plus one bug you can turn on, such as a wrong PGDATABASE, so debugging is real.",
          "Write the three variable syntaxes on a card: set, $env:, and export. Know which shell the projector will use.",
          "Prepare a README that omits the password and a bad README that hard-codes one, so the contrast is visible.",
          "Plan the course map in four sentences so the review stays concrete and does not drift into promises about work.",
        ],
        flow: [
          {
            minutes: 5,
            title: "A feature is a claim",
            detail: "Ask what the add button claims to do, including after a refresh. Say that today those claims get a written test. Testing is how you look; it is not a performance review of the student.",
          },
          {
            minutes: 15,
            title: "Walk the checklist together",
            detail: "Run view, add, refresh, and SELECT on the projector. Then edit, complete, and delete. Do the blank title and the stopped API last so the error screens are fresh. Students tick their own copy and write the actual sentence they see when something differs.",
          },
          {
            minutes: 20,
            title: "Debug one planted failure",
            detail: "Break one thing only, such as an unset PGUSER or a stopped database service. Ask the class which room to open first. Read the first useful line, fix that one cause, restart the process that cached the old environment, and rerun the single failed step. Repeat the question for a 400 so they do not reinstall software for a blank title.",
          },
          {
            minutes: 20,
            title: "Variables on the three shells",
            detail: "Show Command Prompt set, and say PowerShell uses $env: instead. Show export for macOS and Linux. Run the check script that reports whether PGPASSWORD is set without printing it. Windows users who need Node or Postgres again use the nodejs.org installer and the EDB service. macOS uses the pkg and Postgres.app, not Homebrew. Ubuntu uses apt.",
          },
          {
            minutes: 15,
            title: "Deployment, hosting, and secrets",
            detail: "Draw three boxes that are no longer one laptop: static page, Node process, PostgreSQL. Say what localhost cannot do, and what would change in the variables and the fetch URL. State clearly that nobody must buy hosting today. Cover passwords out of Git, server-side checks, and the warning against unread commands. HTTPS is a definition, not a setup task.",
          },
          {
            minutes: 15,
            title: "README, demonstration, and the map",
            detail: "Students outline a README a classmate could follow. One or two people demonstrate add, refresh, and one refusal if time allows. Close with the course map from pages, to JavaScript, to React, to this API and database. Point at official docs for later questions. Invite continued practice on the same task manager. Do not describe the room as finished people or as people headed to a particular workplace.",
          },
        ],
        explain: [
          "Expected result first, then the click, then pass or a specific observation.",
          "No status code usually means the API process or the URL. A status code means the API answered.",
          "Environment variables are per terminal session and are read when Node starts.",
          "Deployment is a description of three hosted pieces. Doing it is outside this session.",
        ],
        questions: [
          "What should the page show for an empty table, and what should it show for a stopped API?",
          "Why is a password in server.js a problem even on localhost?",
          "Which variable would change if the database moved off your laptop?",
          "What belongs in the README that does not belong in a screenshot of your password?",
        ],
        demonstration: "Run the checklist on a working project, including SELECT after add and the connection error after Ctrl+C. Then set variables in the projector's real shell and show the check script hiding the password value.",
        practice: "Students complete the checklist on their machines and draft the README sections: what it does, how to start it, variable names, and the tests.",
        expectedOutcomes: [
          "Each student has a written pass or a specific failure for the main checklist steps.",
          "A student can set variables without putting the password in server.js.",
          "A student can explain deployment as moving the page, the API, and the database, and can say they are not required to buy hosting.",
        ],
        difficulties: [
          {
            issue: "PowerShell rejects the set PGUSER=postgres line.",
            help: "They are in PowerShell, so switch to $env:PGUSER = \"postgres\" or open Command Prompt and use set. Do not keep retrying the other shell's syntax.",
          },
          {
            issue: "A student treats a 400 blank title as a broken install and starts downloading Node again.",
            help: "Open the response body together. The API answered. Return to the validation check and the form. Reinstalling does not change an empty string.",
          },
        ],
        homework: "Students submit the module assignment: the task manager, the README, and checklist notes. The instructor uses the project guide for the table, routes, components, and tests.",
        assessment: "Watch one refresh that matches psql and one blank-title refusal. The knowledge checks cover manual tests, failed-to-fetch, deployment, and where the password lives. Grade the assignment with the rubric, not with a speech about futures.",
        recap: "You can test the task manager, explain a failure by room, keep a password out of the file, and say what deployment would move. The next practice is the same path, taken again until the narration is yours.",
        knowledgeCheckAnswers: [
          {
            id: "manual-why",
            answer: "A person following steps and comparing the result with what they expected",
            explanation: "Manual testing is deliberate use of the app against a written expectation. It does not claim the project will never change.",
          },
          {
            id: "which-room",
            answer: "Whether the API process is running and the URL port matches",
            explanation: "Failed to fetch with no status means the browser did not get an HTTP response. The API process and the URL are the first place to look.",
          },
          {
            id: "deploy-means",
            answer: "False",
            explanation: "The checklist is about the local app. Deployment is a separate idea. This lesson explains it and does not require a hosting purchase.",
          },
          {
            id: "secret-place",
            answer: "In an environment variable set outside the committed source",
            explanation: "PGPASSWORD belongs in the terminal or a local uncommitted file. The repository and the React page should not contain it.",
          },
        ],
      },
    },
  ],
  assignment: {
    slug: "week-16-assignment",
    title: "Guided task manager",
    summary: "Build a beginner task manager that views, adds, edits, completes, and deletes tasks stored in PostgreSQL.",
    instructions: "Build a small task manager and show that the rows survive a refresh.\n\nUse one PostgreSQL table named tasks. The columns are id, title, details, completed, and created_at. id is a serial primary key. title is required text. details is text and may be empty. completed is a boolean that starts false. created_at is a timestamp that defaults to the current time. You do not need accounts, a second table, or a framework that writes SQL for you.\n\nThe API is Express. GET /api/tasks lists the rows. POST /api/tasks creates a task from JSON and returns 400 if the title is blank. PATCH /api/tasks/:id updates the title, the details, or the completed flag. DELETE /api/tasks/:id removes that task. Use the pg package and SQL with $1 style values. Read the database user, password, and database name from environment variables. Do not commit a real password.\n\nThe page is React with TypeScript. A sensible split is TaskApp for loading and errors, TaskForm for new tasks, TaskList for the collection, and TaskItem for complete, edit, and delete. Show a loading sentence, an empty-list sentence, and a different sentence when the API cannot be reached.\n\nOn Windows, Node comes from the nodejs.org installer and PostgreSQL from the EDB installer. On macOS, Node comes from the nodejs.org pkg and PostgreSQL from Postgres.app or the official Mac installer. Do not require Homebrew. On Ubuntu, use apt for nodejs and for postgresql.\n\nWrite a README that says how to create the table, which variable names to set, how to start the API and the page, and how to test the main actions. Submit the code, the README, and a short checklist note. The note should say what happened for a saved task after refresh, for a blank title, and for a stopped API.\n\nYou are not required to deploy the project or to buy hosting. In a few sentences, say what deployment would move: the page, the API, and the database.",
    objectives: [
      "Store tasks in one PostgreSQL table and read them back after a refresh.",
      "Expose list, create, update, and delete through an Express API.",
      "Drive those actions from a small set of React components.",
      "Document setup, environment variables, and a manual test without publishing a password.",
    ],
    requirements: [
      "The tasks table has id, title, details, completed, and created_at with the types and defaults described above.",
      "GET, POST, PATCH, and DELETE behave as specified, including 400 for a blank title and 404 for a missing id.",
      "The page can view, add, edit, complete, and delete tasks, and a refresh matches the database.",
      "Loading, an empty list, and a connection error are visibly different.",
      "The README names the environment variables and the start commands and does not contain a real database password.",
    ],
    deliverables: [
      "The API and React source, including package.json files",
      "The SQL that creates the tasks table",
      "A README and a short manual-test note",
    ],
    rubric: [
      {
        criterion: "Database",
        points: 4,
        description: "The tasks table matches the column list and a row remains after the API restarts.",
      },
      {
        criterion: "API",
        points: 4,
        description: "GET, POST, PATCH, and DELETE use SQL, reject a blank title, and report a missing id.",
      },
      {
        criterion: "Page",
        points: 4,
        description: "The React components can view, add, edit, complete, and delete, using the server response.",
      },
      {
        criterion: "Errors and tests",
        points: 4,
        description: "Loading, empty, and connection states differ, and the note records the checklist honestly.",
      },
      {
        criterion: "README and secrets",
        points: 4,
        description: "Another person could start the project from the README, and no real password is committed.",
      },
    ],
    points: 20,
    instructorSolution: `const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const app = express();
app.use(cors());
app.use(express.json());
const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  port: Number(process.env.PGPORT || 5432),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE || "tasks"
});

app.get("/api/tasks", async (request, response) => {
  const result = await pool.query("SELECT id, title, details, completed, created_at FROM tasks ORDER BY created_at");
  response.json(result.rows);
});

app.post("/api/tasks", async (request, response) => {
  const title = request.body && request.body.title;
  const details = request.body && request.body.details;
  if (typeof title !== "string" || title.trim() === "") {
    response.status(400).json({ error: "Title is required" });
    return;
  }
  const result = await pool.query(
    "INSERT INTO tasks (title, details) VALUES ($1, $2) RETURNING *",
    [title.trim(), typeof details === "string" ? details : ""]
  );
  response.status(201).json(result.rows[0]);
});

app.patch("/api/tasks/:id", async (request, response) => {
  const current = await pool.query("SELECT * FROM tasks WHERE id = $1", [request.params.id]);
  if (current.rows.length === 0) {
    response.status(404).json({ error: "Task not found" });
    return;
  }
  const row = current.rows[0];
  const title = typeof request.body.title === "string" ? request.body.title.trim() : row.title;
  const details = typeof request.body.details === "string" ? request.body.details : row.details;
  const completed = typeof request.body.completed === "boolean" ? request.body.completed : row.completed;
  if (title === "") {
    response.status(400).json({ error: "Title is required" });
    return;
  }
  const updated = await pool.query(
    "UPDATE tasks SET title = $2, details = $3, completed = $4 WHERE id = $1 RETURNING *",
    [request.params.id, title, details, completed]
  );
  response.json(updated.rows[0]);
});

app.delete("/api/tasks/:id", async (request, response) => {
  const result = await pool.query("DELETE FROM tasks WHERE id = $1 RETURNING id", [request.params.id]);
  if (result.rows.length === 0) {
    response.status(404).json({ error: "Task not found" });
    return;
  }
  response.json({ deleted: true });
});

app.listen(3000, () => console.log("API on http://localhost:3000"));
`,
    projectGuide: {
      databaseStructure:
        "Use one beginner table named tasks in a database named tasks. Columns: id as SERIAL PRIMARY KEY, title as TEXT NOT NULL, details as TEXT NOT NULL DEFAULT '', completed as BOOLEAN NOT NULL DEFAULT FALSE, and created_at as TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP. One table is enough. Students do not need accounts, a join, or a migration tool for this project.",
      apiGuidance:
        "Build the API with Express and the pg package. GET /api/tasks returns the rows as JSON ordered by created_at. POST /api/tasks creates a task from a JSON body with title and details, responds 400 when the title is blank, and responds 201 with the inserted row. PATCH /api/tasks/:id updates title, details, or completed and returns the row, or 404 when the id is missing. DELETE /api/tasks/:id removes that task and returns JSON confirming the delete, or 404 when nothing was deleted. Pass values with $1 parameters. Read the connection from environment variables.",
      componentGuidance:
        "Use a few React components. TaskApp loads the tasks and keeps the loading and error state. TaskForm collects title and details and submits them. TaskList shows the tasks or an empty sentence. TaskItem shows one task and buttons to complete, edit, and delete. Pass the task and the action functions down as props. A global state library and a router are not needed.",
      testingChecklist: [
        "Open the page and confirm tasks already stored in PostgreSQL appear.",
        "Add a task with a title and details, refresh, and confirm it is still listed.",
        "Edit a title, refresh, and confirm the new title replaced the old one.",
        "Mark a task complete, refresh, and confirm it stays complete.",
        "Delete a task and confirm it is gone from the page and from a SELECT.",
        "Submit a blank title and confirm the page shows an error and the table gains no row.",
        "Stop the API and confirm the page shows a connection error rather than a false empty list.",
      ],
    },
  },
  quiz: {
    slug: "week-16-quiz",
    title: "Week 16 quiz",
    passingScore: 70,
    allowRetakes: true,
    questions: [
      {
        slug: "where-row",
        type: "multiple_choice",
        prompt: "A task is still on the page after a refresh. Where did the lasting copy come from?",
        options: [
          { id: "a", text: "A row in PostgreSQL, read again by GET" },
          { id: "b", text: "A CSS rule" },
          { id: "c", text: "The browser's back button only" },
          { id: "d", text: "An HTML comment" },
        ],
        correct: { optionId: "a" },
        explanation: "Refresh runs the page again. The list returns because the API reads the row PostgreSQL stored, not because React remembered the old state.",
        points: 1,
      },
      {
        slug: "which-method",
        type: "multiple_choice",
        prompt: "Which request marks an existing task complete in this project?",
        options: [
          { id: "a", text: "PATCH /api/tasks/:id with completed set to true" },
          { id: "b", text: "GET /api/tasks with a new title" },
          { id: "c", text: "A second database named complete" },
          { id: "d", text: "Deleting package.json" },
        ],
        correct: { optionId: "a" },
        explanation: "PATCH updates part of one task. The completed flag is one field. GET only reads, and a new database is not required.",
        points: 1,
      },
      {
        slug: "read-query",
        type: "code_reading",
        prompt: "What does this API call return to the page when the query succeeds?",
        codeSnippet: "const result = await pool.query(\n  \"SELECT id, title, details, completed, created_at FROM tasks ORDER BY created_at\"\n);\nresponse.json(result.rows);",
        options: [
          { id: "a", text: "A JSON array of task rows, oldest first" },
          { id: "b", text: "The database password" },
          { id: "c", text: "A new HTML document with no data" },
          { id: "d", text: "Only the tasks that failed validation" },
        ],
        correct: { optionId: "a" },
        explanation: "result.rows is the list of matching records. ORDER BY created_at without DESC lists them from earliest to latest, and response.json sends that array.",
        points: 1,
      },
      {
        slug: "dollar-values",
        type: "true_false",
        prompt: "Using $1 in an INSERT lets the title travel as data instead of being pasted into the SQL string.",
        correct: { value: true },
        explanation: "The $1 marker and the values array keep the title out of the SQL text. Postgres binds it as the parameter value.",
        points: 1,
      },
      {
        slug: "blank-status",
        type: "multiple_choice",
        prompt: "The form submits a blank title. What should the API do?",
        options: [
          { id: "a", text: "Return 400 and insert nothing" },
          { id: "b", text: "Return 201 and store an empty title" },
          { id: "c", text: "Drop the tasks table" },
          { id: "d", text: "Switch the page to HTTPS automatically" },
        ],
        correct: { optionId: "a" },
        explanation: "A blank title is invalid input. Status 400 reports that, and the INSERT should not run. 201 would claim a task was created.",
        points: 1,
      },
      {
        slug: "env-why",
        type: "multiple_choice",
        prompt: "Why does the API read PGPASSWORD from the environment?",
        options: [
          { id: "a", text: "So the password is not written into the committed source" },
          { id: "b", text: "So SQL no longer needs a WHERE clause" },
          { id: "c", text: "So the browser can skip fetch" },
          { id: "d", text: "So port 5432 becomes port 80" },
        ],
        correct: { optionId: "a" },
        explanation: "Environment variables supply configuration at startup. The password can stay out of server.js and out of the repository.",
        points: 1,
      },
      {
        slug: "shell-syntax",
        type: "multiple_choice",
        prompt: "You are in Windows PowerShell. Which line sets the database user for that window?",
        options: [
          { id: "a", text: "$env:PGUSER = \"postgres\"" },
          { id: "b", text: "export PGUSER=postgres" },
          { id: "c", text: "sudo apt install postgresql" },
          { id: "d", text: "SELECT * FROM tasks" },
        ],
        correct: { optionId: "a" },
        explanation: "PowerShell uses $env: names. export is the macOS and Linux shell syntax. apt installs packages and does not set the variable.",
        points: 1,
      },
      {
        slug: "deploy-false",
        type: "true_false",
        prompt: "This lesson requires every student to buy hosting and deploy the task manager before the work is complete.",
        correct: { value: false },
        explanation: "Deployment is explained as moving the page, the API, and the database to a reachable host. The local project and the checklist do not require a purchase.",
        points: 1,
      },
      {
        slug: "w16-q9-host",
        type: "multiple_choice",
        prompt: "What needs hosting for others to use this task manager when your laptop is off, and what is one setting that would change?",
        options: [
          { id: "a", text: "Only the README; no settings change" },
          { id: "b", text: "The page, API, and database; e.g. host or API URL leave localhost" },
          { id: "c", text: "Only the browser bookmark bar" },
          { id: "d", text: "Only npm; the database can stay on your closed laptop" },
        ],
        correct: { optionId: "b" },
        explanation: "The static page, the Node API, and PostgreSQL are the three hosted pieces. A typical change is PGHOST or the page's API address, which would no longer be localhost.",
        points: 2,
      },
    ],
  },
};
