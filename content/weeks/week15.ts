import type { ModuleSeed } from "../../src/lib/content-types";

function md(text: string): string {
  const cleaned = text.replaceAll("¬", "`");
  const lines = cleaned.replace(/^\n/, "").replace(/\n\s*$/, "").split("\n");
  const indents = lines.filter((line) => line.trim().length > 0).map((line) => line.match(/^ */)?.[0].length ?? 0);
  const margin = indents.length === 0 ? 0 : Math.min(...indents);
  return lines.map((line) => (line.length >= margin ? line.slice(margin) : line.trim())).join("\n").trim();
}

export const week15: ModuleSeed = {
  slug: "week-15-databases",
  number: 15,
  weekNumber: 15,
  monthLabel: "Month 4 — Backend, databases and full-stack development",
  title: "PostgreSQL and SQL",
  description: "Store tasks in PostgreSQL tables and read them back with SQL that can filter, sort, change, and combine rows.",
  lessons: [
    {
      slug: "databases-and-postgresql",
      sessionNumber: 29,
      title: "Databases and PostgreSQL",
      estimatedMinutes: 90,
      difficulty: "Gentle introduction",
      requiresOs: true,
      content: {
        overview: {
          about: "This lesson explains what a database is and why the task API needs one. You will learn tables, rows, columns, data types, primary keys, foreign keys, and relationships, then install PostgreSQL and open a database client on Windows, macOS, or Linux.",
          why: "The task array inside Node disappears when the server stops. A database keeps rows on disk so the next start can read them again.",
          alreadyKnow: "You have an Express task API that stores tasks in an array and a React page that calls it.",
        },
        objectives: [
          "Explain what a database stores and why an in-memory array is not enough.",
          "Describe tables, rows, columns, and common data types in plain language.",
          "Explain a primary key, a foreign key, and a one-to-many relationship.",
          "Install PostgreSQL with the method for Windows, macOS, or Linux.",
          "Open a database client and run a one-line check that the server answers.",
        ],
        prerequisites: [
          {
            label: "A task API whose list disappears when Node restarts",
            lessonSlug: "validation-and-frontend-integration",
          },
        ],
        teachingNotes: [
          {
            heading: "What a database is",
            markdown: md(`
              A database is an organised store of data that a programme can query and update. The database programme keeps the data on disk, checks the rules you set, and answers questions written in a query language. PostgreSQL is the database programme this course uses.

              A database exists because application memory is short-lived. Your week 14 API kept tasks in an array. That was the right way to learn routes. It failed the moment you stopped Node: the array was gone, and the next start knew only the tasks baked into the source file. People expect a task list to still be there tomorrow. The database is the tool that remembers.

              Picture a filing cabinet of ruled notebooks in a back office. The web page is the front counter. The Express server is the person at the counter. The cabinet is the database. When the shop closes, the notebooks stay in the cabinet. A note stuck to the counter does not.

              ### What lives where

              The React page remembers what it has just rendered. The Express process remembers variables until it exits. The database remembers rows until an SQL statement changes or deletes them, or until someone removes the database files on purpose. Those are three different lifetimes. Mixing them up is how a refresh looks like data loss.

              :::misunderstanding The database is another JavaScript array
              An array is a value inside one running programme. A database is a separate programme. Express will talk to it with queries. Stopping Node does not, by itself, erase the rows.
              :::

              :::example The restart test
              Add a task through the API, stop Node, and start it again. With an array, the task is gone. After you connect the same API to PostgreSQL, the task should still be returned by GET. That test is the reason this week exists.
              :::

              You do not need a large number of tables to feel this difference. One tasks table is enough for the final project. This lesson also prepares a second table so you can see how rows point at each other.
            `),
          },
          {
            heading: "Tables, rows, columns, and records",
            markdown: md(`
              A relational database stores data in tables that can be related. Relational means the tables can refer to each other instead of copying the same facts into one wide pile. A table is a named grid. It looks a little like a spreadsheet, and the database is stricter about what each column may hold.

              A column is one field with a name and a type, such as title or completed. A row is one entry across those columns. People also say record for a row. In this course, row and record mean the same thing: one task, or one student, depending on the table.

              The table exists so that every task has the same fields. If each task were a free note, one might forget the title and another might spell completed in three ways. A table makes the shape obvious.

              ### A sketch of two tables

              A students table might have id and name. A tasks table might have id, title, details, completed, created_at, and student_id. Each row in tasks is one task. Each row in students is one person. student_id on a task is how the task points at a student without pasting the student's name into every task. If the student changes the spelling of their name, you change one student row, not every task.

              Think of two notebooks. The student notebook has a locker number and a name. The task notebook has its own locker number, the task text, and the student locker number written in the margin. You can lay the notebooks side by side and match the numbers. That match is the relationship.

              :::misunderstanding A column is a single task
              A column is the vertical field, such as every title. A row is the horizontal entry, one whole task. Reading down the title column gives you many titles. Reading across a row gives you one task's fields.
              :::

              Empty tables are allowed. A new database often has tables with definitions and zero rows. That is different from a missing table. A missing table makes queries fail. An empty table returns no rows and is a successful answer.
            `),
          },
          {
            heading: "Data types, keys, and relationships",
            markdown: md(`
              A data type is the kind of value a column accepts. This course uses four. ¬INTEGER¬ or the special ¬SERIAL¬ form is a whole number. ¬TEXT¬ is words. ¬BOOLEAN¬ is true or false. ¬TIMESTAMP¬ is a date and time. Types exist so the database can reject a paragraph stored in a true-or-false column, and so it can sort times in time order rather than as lucky strings.

              SERIAL is an integer column where PostgreSQL fills in the next number when you omit it. It is a comfortable way to build an id. You will see it on primary keys.

              A primary key is the column that identifies one row in its table. It must be unique, and it must not be empty. The id column is the usual primary key. It is the locker number. Two tasks must not share it. You do not use the title as the primary key, because two tasks can share a title and a title can change.

              A foreign key is a column that stores the primary key of a row in another table. tasks.student_id is a foreign key pointing at students.id. PostgreSQL checks that the student exists when you insert the task. A made-up student id is rejected. That check is the point of the foreign key: the pointer has to land on a real row.

              ### One-to-many

              One student can have many tasks. One task in this beginner model belongs to one student. That is a one-to-many relationship. The "many" side holds the foreign key. You do not copy a list of task titles into the student row. You let several task rows carry the same student_id.

              NULL means absent, and it is not the same as an empty string or as false. This course avoids NULL in the beginner task columns by marking them NOT NULL and giving details a default of empty text. You may still meet NULL in error messages. Read it as "no value was stored", not as zero.

              :::misunderstanding A foreign key copies the whole related row
              It stores the id only. The name stays in the students table. A query can show the name beside the task when you ask for both tables together. That request is the join in the next lesson.
              :::

              :::example A refused delete
              If a student still has tasks, deleting that student can fail because the tasks would point at a missing id. The database is protecting the relationship. Move or delete those tasks first. You do not need a more complicated rule this week.
              :::
            `),
          },
          {
            heading: "PostgreSQL, the programme that keeps the tables",
            markdown: md(`
              PostgreSQL is a relational database programme. You install it, it runs as a server on your computer, and clients send it SQL text. It is often nicknamed Postgres. Other database programmes exist. This course uses PostgreSQL so everyone shares one set of steps and one SQL dialect. Dialect means the exact spelling a particular database expects. The statements you learn here are the ones Postgres accepts.

              Postgres runs in the background, a little like the Express server waited in a terminal, except Postgres is installed to keep running as a service. A service is a programme the operating system starts and leaves available. Your Express app will connect to that service in the final project. This week you talk to it yourself through a client, so you can see the tables before Node is involved.

              The default port is 5432. A port is the numbered door you met with port 3000. Express can keep 3000. Postgres uses 5432. They are different doors and can be open at the same time. If something else already holds 5432, Postgres cannot start. That is the same kind of clash as EADDRINUSE, on a different number.

              ### Users and databases

              Postgres has its own users, separate from the login you use for your computer, except on Postgres.app where the first user often matches your Mac name. A database user can own a database. A database is a named container of tables. You will create one named tasks for the project. Inside it, the tables tasks and students can both exist. The database name and the table name may match. That is allowed and a little confusing, so say "the tasks database" and "the tasks table" on purpose.

              On Windows, the installer asks you to choose a password for the postgres user. Write it in a private note. On Ubuntu, the first connections often go through the postgres operating-system account rather than a password you type. On macOS with Postgres.app, the local connection often needs no password. Those differences matter when a connection fails. Use the steps for your system, not a screenshot from a different system.

              :::warning Passwords do not belong in a chat message
              The database password unlocks your local data. Keep it out of the repository and out of a message to the class channel. Your instructor can look at an error code without needing the password pasted in public.
              :::
            `),
          },
          {
            heading: "Install PostgreSQL on Windows, macOS, and Linux",
            markdown: md(`
              The install is different on each system. Do not use a Windows installer on a Mac, and do not install Homebrew for this lesson.

              On Windows, open https://www.postgresql.org/download/windows/ and download the installer published by EnterpriseDB, usually called the EDB installer. Run it. Keep the port at 5432. When it asks for a password for the database superuser postgres, choose one and write it down privately. Leave the command line tools selected. pgAdmin can stay selected. It is a windowed client you may use later. Stack Builder is optional and you can skip it. When the installer finishes, PostgreSQL's service should be running.

              On macOS, the path in this course is Postgres.app. Download it from https://postgresapp.com, open the file, and drag Postgres.app into Applications. Open it and choose Initialize so it creates a local server. An elephant icon in the menu bar means it is running. You do not need Homebrew. If you would rather use an installer window, the official macOS installer linked from https://www.postgresql.org/download/macos/ is also acceptable. It is the EDB installer for Mac. Either path is enough. Do not do both on top of each other in the same hour.

              On Ubuntu, open a terminal and run ¬sudo apt update¬, then ¬sudo apt install postgresql¬. Ubuntu starts the PostgreSQL service for you. Check it with ¬sudo service postgresql status¬. If it is stopped, ¬sudo service postgresql start¬ runs it. The package provides the server and the psql client together. Other Linux distributions use their own package manager. Do not paste the Ubuntu apt commands onto Fedora, Arch, or another distribution.

              ### After the installer

              Installing is not the same as connecting. The next section opens a client. If the service is not running, the client will say it cannot connect. Start the service, or open Postgres.app and initialize it, before you type SQL.

              :::misunderstanding One download works for every computer
              Windows uses the EDB installer. macOS uses Postgres.app or the official Mac installer. Ubuntu uses apt. The SQL you type later can match. The install commands cannot.
              :::

              :::tip Write down three facts
              Write your system name, the database user you will connect as, and whether a password was required. Week 16's Node programme needs those same facts.
              :::
            `),
          },
          {
            heading: "A database client and a first answer",
            markdown: md(`
              A database client is a programme you use to send SQL and read the answer. The client is not the database. Postgres is the server that stores the rows. psql is a text client that ships with PostgreSQL. pgAdmin is a graphical client included with the EDB installers. Postgres.app opens psql from its menu. This course uses psql so the commands you type are visible and the same once you are connected.

              On Windows, open SQL Shell (psql) from the Start menu. Press Enter to accept the default server, database, port, and username. The username should be postgres. Then type the password you chose. Nothing appears as you type the password. Press Enter.

              On macOS with Postgres.app, click the elephant menu and choose Open psql. A window opens already connected. If you used the official Mac installer instead, open Terminal from Spotlight and start psql the way that installer documented, usually as your user against localhost.

              On Ubuntu, open a terminal and run ¬sudo -u postgres psql¬. That command opens psql as the postgres database user. You land at a prompt.

              ### Prompts and a one-line check

              A psql prompt often ends in ¬=#¬ for a superuser or ¬=>¬ for a normal user. SQL statements end with a semicolon. If you forget it, psql waits, and the prompt changes slightly, because it thinks you have not finished. Type the semicolon and press Enter.

              ¬¬¬sql
              SELECT 1 AS ready;
              ¬¬¬

              You should see a small table with a column named ready and a value of 1. That result means the client reached a running Postgres and the server executed a statement. It does not create your tasks table yet. Creating tables is the next lesson.

              Some commands begin with a backslash. Those are psql commands, not SQL. ¬\\l¬ lists databases. ¬\\q¬ quits. They do not work as SQL inside every graphical tool. When you use pgAdmin, type the SQL, not the backslash commands.

              :::misunderstanding The password characters are broken because you cannot see them
              psql hides the password. No dots and no stars is normal. Type it carefully and press Enter. If authentication fails, try again rather than changing the server first.
              :::

              When SELECT 1 works, you have a database server and a client. The next lesson fills a database with students and tasks and teaches the statements that read and change rows.
            `),
          },
        ],
        vocabulary: [
          {
            term: "Database",
            definition: "An organised store of data kept by a separate programme, so the rows remain after your Node server stops.",
          },
          {
            term: "Relational database",
            definition: "A database that stores data in tables which can refer to each other through keys.",
          },
          {
            term: "PostgreSQL",
            definition: "The relational database programme this course installs and queries. People often shorten the name to Postgres.",
          },
          {
            term: "Table",
            definition: "A named grid of columns and rows, such as a tasks table where each row is one task.",
          },
          {
            term: "Row",
            definition: "One record in a table, across all of its columns. A single task is one row of the tasks table.",
          },
          {
            term: "Column",
            definition: "One named field in a table, with a data type, such as title as text or completed as a boolean.",
          },
          {
            term: "Primary key",
            definition: "The column that identifies one row, usually id. Values are unique and not empty.",
          },
          {
            term: "Foreign key",
            definition: "A column that stores the primary key of a row in another table, such as a task pointing at a student id.",
          },
        ],
        demonstrations: [
          {
            title: "Install PostgreSQL and run SELECT 1",
            intro: "You will install PostgreSQL for your operating system, open psql the way that system expects, and run a one-line statement that proves the server answers.",
            steps: [
              "Write down whether you are on Windows, macOS, or Linux before you download anything.",
              "Install PostgreSQL using only the steps for that system: the EDB installer, Postgres.app or the official Mac installer, or apt.",
              "Start the database service if it is not already running. On macOS with Postgres.app, use Initialize and leave the elephant menu active.",
              "Open the psql client using the Windows SQL Shell, the Postgres.app menu, or sudo -u postgres psql on Ubuntu.",
              "If your system asks for a password, type the one you set during install. The cursor will not show the characters.",
              "Run SELECT 1 AS ready; including the semicolon.",
              "Read the one-row result. Then run \\l to list databases if you are in psql.",
              "Quit with \\q when you are finished, and write down the user name you connected as.",
            ],
            expected: "psql shows a result table with ready equal to 1, which means PostgreSQL accepted a statement.",
            verify: "The prompt returned after the result, and a wrong password or a stopped service was not still on screen.",
            ifItFails: "If the client cannot connect, start the Postgres service or Postgres.app and check port 5432. If the command psql is missing, finish the installer or the apt packages for your system and open a new terminal.",
            os: {
              sameOnAllPlatforms: "SELECT 1 AS ready; is the same after you are inside psql. Opening the client is not the same. On Windows, open the Start menu and launch SQL Shell (psql). On macOS, open Postgres.app from Applications and choose Open psql from the elephant menu, or open Terminal with Spotlight if you used the official installer. On Ubuntu, open Terminal from the application menu or press Ctrl+Alt+T, then run sudo -u postgres psql. Type SQL only after you see a prompt ending in =# or =>.",
              windows: [
                "Open https://www.postgresql.org/download/windows/ and run the EnterpriseDB (EDB) PostgreSQL installer. Keep port 5432 and set a password for the postgres user.",
                "Leave the command line tools selected so SQL Shell (psql) is installed. You can keep pgAdmin as well.",
                "From the Start menu, open SQL Shell (psql). Press Enter for server, database, port, and user, then type the postgres password.",
                "Run SELECT 1 AS ready; and confirm a single row comes back before you quit with \\q.",
              ],
              macos: [
                "Download Postgres.app from https://postgresapp.com, move it to Applications, open it, and click Initialize. Do not install Homebrew.",
                "If you prefer an installer, use the official macOS PostgreSQL installer from https://www.postgresql.org/download/macos/ instead of Postgres.app, not in addition to a half-finished Homebrew setup.",
                "With Postgres.app, click the elephant menu and choose Open psql. You should get a prompt without a Windows-style postgres password.",
                "Run SELECT 1 AS ready; and confirm a single row comes back.",
              ],
              linux: [
                "Open Terminal and run sudo apt update. Enter your Linux password if asked. It will not be displayed.",
                "Install the database and the client with sudo apt install postgresql.",
                "Check the service with sudo service postgresql status. If it is not running, start it with sudo service postgresql start.",
                "Connect with sudo -u postgres psql, then run SELECT 1 AS ready;.",
                "These apt commands are for Ubuntu. Other Linux distributions use their own package manager. Do not paste the Ubuntu commands there.",
              ],
              identify: [
                "Windows shows a Start menu and will use the EDB installer. macOS shows an Apple menu and will use Postgres.app or the official Mac installer. Ubuntu shows Activities and will use apt.",
                "Write the system name down and follow only that list. A connection command from another system will fail even when Postgres could run.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "A connection check",
            filename: "ready.sql",
            language: "sql",
            code: "SELECT 1 AS ready;\n",
            explanation: "This statement asks PostgreSQL to return a one-row table. The column is named ready and the value is the number 1. It does not create a table and it does not need your tasks yet. Run it inside psql after the prompt appears. The semicolon completes the statement.",
            lineNotes: [
              { focus: "SELECT 1", note: "SELECT asks for data. Here the data is a constant, so no table name is required." },
              { focus: "AS ready", note: "Names the output column. Without it, Postgres still returns 1 under a generated heading." },
              { focus: "semicolon", note: "psql waits until it sees the semicolon. A new line by itself does not send the statement." },
            ],
            expectedOutput: "psql prints a small result with the column ready and the value 1, then shows the prompt again.",
            level: "basic",
          },
          {
            title: "Names you will create next",
            filename: "planned-tables.sql",
            language: "sql",
            code: "CREATE TABLE students (\n  id SERIAL PRIMARY KEY,\n  name TEXT NOT NULL\n);\n\nCREATE TABLE tasks (\n  id SERIAL PRIMARY KEY,\n  title TEXT NOT NULL,\n  details TEXT NOT NULL DEFAULT '',\n  completed BOOLEAN NOT NULL DEFAULT FALSE,\n  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  student_id INTEGER REFERENCES students (id)\n);\n",
            explanation: "This is the shape of the two tables the next lesson creates. students must be created first because tasks.student_id refers to it. SERIAL primary keys are filled by Postgres. The foreign key stops a task from pointing at a student id that does not exist. You can read it now and run it in the next session after you have chosen a database.",
            lineNotes: [
              { focus: "SERIAL PRIMARY KEY", note: "Creates an integer id that Postgres can fill, and marks it as the unique identity of the row." },
              { focus: "REFERENCES students (id)", note: "Makes student_id a foreign key. The student row has to exist first." },
              { focus: "DEFAULT FALSE", note: "A new task is not completed unless an INSERT says otherwise." },
            ],
            expectedOutput: "When this script is run in an empty database, psql reports CREATE TABLE twice. Running it before the next lesson is optional.",
            level: "improved",
          },
        ],
        exercises: [
          {
            title: "Name the parts of a task row",
            difficulty: "warm-up",
            prompt: "Use the planned tasks table to practise the words column, row, primary key, and foreign key before you install anything else.",
            steps: [
              "List the columns of the tasks table and write the data type beside each one.",
              "Circle or underline the primary key.",
              "Write one sentence that says which column is the foreign key and which table it points at.",
              "Describe one example row in words, without needing the database to be running yet.",
            ],
            expectedOutcome: "Your note identifies id as the primary key, student_id as the foreign key to students, and describes one task as a single row.",
          },
          {
            title: "Prove your client can talk to Postgres",
            difficulty: "practice",
            prompt: "Install PostgreSQL for your system if you have not already, open psql, and keep a record of the connection check.",
            steps: [
              "Follow the install steps for your operating system only.",
              "Open psql the way that system expects and connect.",
              "Run the one-line readiness statement from the worked example.",
              "Write down your system, the user name you used, and whether a password was required. Do not include the password itself.",
            ],
            expectedOutcome: "You have a result of 1 from Postgres and a note of how you connected, with the password left out.",
          },
        ],
        troubleshooting: [
          {
            problem: "psql is not recognised, or the terminal says psql: command not found.",
            why: "The client was not installed, the installer did not add it to PATH, or this terminal was opened before the install finished.",
            solution: "On Windows, rerun the EDB installer options so the command line tools are included, then open SQL Shell from the Start menu. On Ubuntu, run sudo apt install postgresql and open a new terminal. On macOS, open psql from the Postgres.app menu rather than typing psql in an old terminal.",
          },
          {
            problem: "The client says connection refused, or it cannot connect to the server on port 5432.",
            why: "PostgreSQL is not running, it is listening on a different port, or a firewall blocked the local connection.",
            solution: "Start the service. On Ubuntu use sudo service postgresql start. On Windows, start the PostgreSQL service from Services or restart the computer after the EDB install. On macOS, open Postgres.app and use Initialize if the server was never created. Then try psql again.",
          },
          {
            problem: "Password authentication failed for user postgres, or the installer says port 5432 is already in use.",
            why: "The password does not match the one set for that database user, or another programme is already using 5432 so a second Postgres cannot start.",
            solution: "Retype the install password in SQL Shell. Characters will not appear. If the port is busy, stop the other Postgres, or choose the port the running server already uses and connect to that port instead of starting a second copy.",
          },
        ],
        knowledgeChecks: [
          {
            id: "why-database",
            question: "Why does the task API need a database after week 14?",
            format: "multiple_choice",
            options: [
              "So rows can remain after the Node process stops",
              "So CSS can store colours",
              "So the browser can stop using HTTP",
              "So package.json can replace tables",
            ],
          },
          {
            id: "primary-key",
            question: "What does a primary key do?",
            format: "multiple_choice",
            options: [
              "It identifies one row and must be unique",
              "It stores a whole second table inside the cell",
              "It is the password for Postgres",
              "It always contains the task title",
            ],
          },
          {
            id: "foreign-key",
            question: "A foreign key copies the student's name into every task so the tables never need to meet.",
            format: "true_false",
            options: ["True", "False"],
          },
          {
            id: "client-server-db",
            question: "Which pair matches this lesson?",
            format: "multiple_choice",
            options: [
              "PostgreSQL stores the data, and psql is a client that sends SQL",
              "psql stores the data, and the browser is the database",
              "npm stores the rows inside package.json",
              "React state is the same thing as a PostgreSQL table",
            ],
          },
        ],
        homework: {
          description: "Submit a short lesson response after you connect to PostgreSQL. Name your operating system, say how you opened the client, and report what SELECT 1 returned. Explain, in your own words, why the week 14 array was not enough for a task list you want to keep. Do not include your database password.",
          requirements: [
            "Name the operating system and the client you opened, without the password.",
            "Explain the difference between the in-memory array and a database.",
          ],
          deliverables: ["A written response on this lesson page"],
          submission: "Submit the written response in the lesson practice area for this session.",
          criteria: [
            "The response shows a real connection attempt and the result of the readiness statement.",
            "The explanation says that rows can outlive the Node process.",
          ],
          submissionKind: "lesson_response",
        },
        summary: [
          "A database is a separate programme that keeps rows after your API stops. PostgreSQL is the one this course uses.",
          "Tables hold columns and rows. A primary key identifies a row. A foreign key points at a primary key in another table.",
          "One student to many tasks is a one-to-many relationship. The task row stores the student id, not a second copy of the whole student.",
          "Windows uses the EDB installer, macOS uses Postgres.app or the official Mac installer, and Ubuntu uses apt. psql is the client that sends SQL.",
        ],
        nextLesson: {
          title: "SQL operations",
          why: "Postgres answers a connection check now. Next you will create tables and insert, read, update, delete, and join real task rows.",
          lessonSlug: "sql-operations",
        },
      },
      guide: {
        sessionNumber: 29,
        week: 15,
        title: "Databases and PostgreSQL",
        durationMinutes: 90,
        objectives: [
          "Students can say why the in-memory task list fails a restart test.",
          "Students can point to a primary key and a foreign key in the planned tables.",
          "Each student installs PostgreSQL for their own system and opens psql.",
          "SELECT 1 returns a row on each machine that completed the install.",
        ],
        tools: ["PostgreSQL", "psql", "A browser for the download pages", "A terminal", "A private note for passwords"],
        preparation: [
          "Install Postgres on the instructor machine before class and confirm SELECT 1 AS ready; works. Note which client you will project.",
          "Have three install paths written out: EDB for Windows, Postgres.app for macOS with the official Mac installer as the alternative, and apt for Ubuntu. Do not demonstrate Homebrew.",
          "Prepare a board sketch of students and tasks with one foreign key, plus a wrong sketch that copies the student name into every task.",
          "Plan a pairing seat for anyone who cannot install. They still name keys and watch SELECT 1, and they must not be given someone else's password to keep.",
        ],
        flow: [
          {
            minutes: 5,
            title: "The restart that forgot the tasks",
            detail: "Ask someone to describe what the week 14 API did after Node stopped. Say that today the rows need a home outside the process. Write the words table, row, and column on the board before any installer is opened.",
          },
          {
            minutes: 15,
            title: "Tables, keys, and one-to-many",
            detail: "Draw students and tasks. Mark id as the primary key on each. Draw student_id as a foreign key and trace two tasks to one student. Ask what should happen if a task names a student id that does not exist. Explain INTEGER, TEXT, BOOLEAN, and TIMESTAMP with the columns that will use them. Mention NULL only as a value you are avoiding with NOT NULL.",
          },
          {
            minutes: 20,
            title: "Install by operating system",
            detail: "Split the room by system if you can. Windows runs the EDB installer, sets a private postgres password, and keeps port 5432. macOS uses Postgres.app and Initialize, with the official installer as the other allowed path, and you say Homebrew is not required. Ubuntu runs sudo apt update and sudo apt install postgresql, then checks the service.",
          },
          {
            minutes: 30,
            title: "Open psql and SELECT 1",
            detail: "Show SQL Shell on Windows, including the hidden password. Show Open psql on Postgres.app. Show sudo -u postgres psql on Ubuntu. Everyone runs SELECT 1 AS ready; and reads the one-row result. Show a missing semicolon so they see psql waiting. Show \\q and say backslash commands are for psql, not for SQL in general.",
          },
          {
            minutes: 10,
            title: "Connection failures",
            detail: "If the room had a real failure, debug that one on the projector: service stopped, wrong password, or port 5432 already used. If not, describe each in one sentence and point at the troubleshooting list. Run the knowledge checks while the successful prompt is still visible.",
          },
          {
            minutes: 10,
            title: "Notes for next time",
            detail: "Students write system, database user, and whether a password was required. They leave the password out of the lesson response. Preview CREATE TABLE, INSERT, SELECT, UPDATE, DELETE, WHERE, ORDER BY, and one join. Dismiss only after each person knows where the written response goes.",
          },
        ],
        explain: [
          "Postgres is a server. psql and pgAdmin are clients.",
          "A primary key identifies a row. A foreign key points at another table's primary key.",
          "Port 5432 is the database door. Port 3000 remains the API door.",
          "Install steps are not interchangeable across Windows, macOS, and Ubuntu.",
        ],
        questions: [
          "What disappeared in week 14 when you pressed Ctrl+C, and what should a database change about that?",
          "Why is the title a poor primary key?",
          "What is stored in student_id: a name, or another row's id?",
          "Which programme is still running after you quit psql?",
        ],
        demonstration: "Install or connect with the path that matches the projector machine, open psql, run SELECT 1 AS ready;, forget a semicolon on purpose, then quit with \\q and say the database service is still running.",
        practice: "Students complete the install for their own system, run the readiness statement, and write the connection facts without the password.",
        expectedOutcomes: [
          "Students can define table, row, primary key, and foreign key.",
          "psql returns a row for SELECT 1 on machines that installed successfully.",
          "Each student can say which user they connected as.",
        ],
        difficulties: [
          {
            issue: "A Windows student types the password and thinks the keyboard has failed because no characters appear.",
            help: "Tell them hidden input is normal in SQL Shell. Let them finish the password and press Enter. If authentication fails, they retype it once before you reinstall.",
          },
          {
            issue: "A Mac student starts searching for a brew command because an old article told them to.",
            help: "Stop that path. Open Postgres.app, use Initialize, and open psql from the elephant menu. The official pkg is the only alternative you accept today.",
          },
        ],
        homework: "The lesson response names the system and client, reports SELECT 1, and explains why a database outlives the Node array. Passwords stay out of the response.",
        assessment: "The connection result is the practical evidence. Knowledge checks cover the reason for a database, primary keys, foreign keys, and the client versus the server. The module assignment is the SQL script next session.",
        recap: "Rows need a cabinet that stays closed when the API process ends. Postgres is installed, psql can talk to it, and the next session writes the notebooks.",
        knowledgeCheckAnswers: [
          {
            id: "why-database",
            answer: "So rows can remain after the Node process stops",
            explanation: "The week 14 array lived in the process. PostgreSQL stores rows separately, which is what lets a restart keep the tasks.",
          },
          {
            id: "primary-key",
            answer: "It identifies one row and must be unique",
            explanation: "The primary key is the row's identity. Titles can repeat and can change, so they are not the key.",
          },
          {
            id: "foreign-key",
            answer: "False",
            explanation: "A foreign key stores the other row's id. The related name stays in its own table and can be shown with a join.",
          },
          {
            id: "client-server-db",
            answer: "PostgreSQL stores the data, and psql is a client that sends SQL",
            explanation: "The server stores and checks the data. The client is how you send statements. Quitting psql does not shut down the server.",
          },
        ],
      },
    },
    {
      slug: "sql-operations",
      sessionNumber: 30,
      title: "SQL operations",
      estimatedMinutes: 90,
      difficulty: "Guided practice",
      requiresOs: true,
      content: {
        overview: {
          about: "This lesson teaches SQL for a beginner task database. You will create a database and tables, then insert, read, update, and delete rows using SELECT, INSERT, UPDATE, DELETE, WHERE, and ORDER BY, plus one small join between tasks and students.",
          why: "PostgreSQL only helps the API if you can say exactly which rows you want. SQL is that request language, and the task table is the practice ground.",
          alreadyKnow: "You can open psql and you know what tables, primary keys, and foreign keys are.",
        },
        objectives: [
          "Create a database and the students and tasks tables.",
          "Insert rows and read them back with SELECT.",
          "Filter with WHERE and sort with ORDER BY.",
          "Update and delete specific rows without changing the whole table.",
          "Write one join that shows a task title beside a student name.",
        ],
        prerequisites: [
          {
            label: "PostgreSQL installed and a working psql connection",
            lessonSlug: "databases-and-postgresql",
          },
        ],
        teachingNotes: [
          {
            heading: "SQL is a request language",
            markdown: md(`
              SQL is the language you use to ask a relational database to create structures and to read or change rows. The letters stand for Structured Query Language. You write a statement, end it with a semicolon in psql, and Postgres either does the work and replies, or refuses and explains.

              SQL exists because pointing at a file and hoping is not precise enough. The problem it solves is selection. You can ask for unfinished tasks only, in the order they were created, without bringing the whole cabinet to the counter and sorting it by hand.

              Read a statement from the middle outward. SELECT names the columns you want to see. FROM names the table. WHERE keeps only some rows. ORDER BY sorts the rows that remain. The database, not your eye, does that filtering.

              ### Capital letters and names

              Examples in this course write SQL keywords in capitals: SELECT, FROM, WHERE. Postgres also accepts lowercase keywords. Capitals make the shape easier to see. Table and column names in these lessons stay lowercase. Text values use single quotes. 'Buy milk' is a text value. Double quotes are not the usual way to write a text value in SQL. That is different from JSON, which required double quotes. Keep the two languages apart.

              Numbers are written without quotes. TRUE and FALSE are booleans without quotes. A string 'TRUE' would be text, not a boolean.

              :::misunderstanding SQL is a programming language with loops like JavaScript
              SQL statements describe the result or the change you want. You do not write a for loop to walk the rows in this course. Postgres finds the rows that match.
              :::

              :::tip One statement at a time
              Run a statement, read the reply, then run the next. A long paste hides the line that failed. The first error is the one to fix.
              :::
            `),
          },
          {
            heading: "Create a database and the tables",
            markdown: md(`
              A database is the container. A table is the grid inside it. Create the container first, connect to it, then create the tables. In psql, this switches you into a new database:

              ¬¬¬sql
              CREATE DATABASE tasks_app;
              ¬¬¬

              Then type ¬\\c tasks_app¬ and press Enter. That backslash command is psql reconnecting. It is not SQL. The prompt should mention tasks_app. Tables you create now land in that database, not in the default one you happened to open.

              Create students before tasks, because the foreign key has to point at a table that already exists.

              ¬¬¬sql
              CREATE TABLE students (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL
              );
              ¬¬¬

              ¬¬¬sql
              CREATE TABLE tasks (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                details TEXT NOT NULL DEFAULT '',
                completed BOOLEAN NOT NULL DEFAULT FALSE,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                student_id INTEGER REFERENCES students (id)
              );
              ¬¬¬

              Postgres replies CREATE TABLE when the statement is accepted. ¬\\dt¬ lists the tables in psql. If you run CREATE TABLE twice, the second attempt fails because the name is taken. That failure means the first one worked. Do not keep changing the statement until you know whether the table is already there.

              ### What the defaults do

              SERIAL fills id when you leave it out of an INSERT. DEFAULT FALSE means a new task is incomplete. DEFAULT '' means details can be omitted and stored as empty text. CURRENT_TIMESTAMP stores the time of the insert. You do not have to send those values from a client unless you want to override them.

              :::warning Create students first
              If you create tasks first, the REFERENCES line fails because students does not exist yet. Order matters on the first run.
              :::
            `),
          },
          {
            heading: "INSERT and SELECT",
            markdown: md(`
              INSERT adds rows. Name the columns you are filling, then list the values in the same order. Leave id out and let SERIAL assign it.

              ¬¬¬sql
              INSERT INTO students (name) VALUES ('Ada'), ('Sam');
              ¬¬¬

              Two parenthesised groups make two rows. Then add tasks that point at those students. If Ada received id 1 and Sam received id 2, the tasks use those numbers. Check with SELECT before you guess.

              ¬¬¬sql
              INSERT INTO tasks (title, details, student_id)
              VALUES ('Buy milk', 'Two litres', 1);
              ¬¬¬

              SELECT reads rows. SELECT * asks for every column. Naming columns is clearer once you know which ones you need.

              ¬¬¬sql
              SELECT id, title, completed FROM tasks;
              ¬¬¬

              The reply is a result grid in the client. Zero rows is a valid reply when the table is empty or the filter matches nothing. It is not a connection failure. A connection failure never shows a grid.

              ### The id came from the database

              After INSERT, select the ids so later statements do not invent numbers. In the final project, the API will read the id Postgres returns. Practising that habit now stops you from updating the wrong row.

              :::misunderstanding INSERT without a column list is fine if you remember the order
              Listing the columns keeps the statement honest when the table gains a column later. This course always names the columns in INSERT.
              :::

              :::example See what you stored
              Every INSERT in class is followed by a SELECT. You are teaching yourself to trust the result grid, not your memory of what you meant to type.
              :::
            `),
          },
          {
            heading: "WHERE and ORDER BY",
            markdown: md(`
              WHERE keeps rows that match a condition and leaves the others out of the result. It does not delete them. SELECT id, title FROM tasks WHERE completed = FALSE returns unfinished tasks and leaves completed ones stored.

              Comparisons you can use now include = and <> . Text comparisons are case-sensitive in Postgres: 'Ada' does not equal 'ada'. Booleans compare to TRUE or FALSE. Combine conditions with AND when both must be true, and OR when either is enough. A title filter and a student filter together use AND.

              ORDER BY sorts the rows that survived the filter. ORDER BY created_at lists older tasks first. ORDER BY created_at DESC lists the newest first. DESC means descending. Without ORDER BY, Postgres may return rows in an order that changes. If you care about order, say so.

              ¬¬¬sql
              SELECT title, created_at
              FROM tasks
              WHERE completed = FALSE
              ORDER BY created_at;
              ¬¬¬

              Read it as: from tasks, keep the incomplete ones, show title and time, oldest first.

              ### WHERE is not only for SELECT

              UPDATE and DELETE also take WHERE. A statement without WHERE changes every row. That is rarely what you want. In class, say the target out loud before you run an update or a delete: "the task with id 3", not "the tasks".

              :::warning A missing WHERE is a whole-table change
              UPDATE tasks SET completed = TRUE; marks every task complete. The safe form names an id. Select that id first so you can see the row you are about to change.
              :::

              :::misunderstanding WHERE deletes the other rows
              WHERE filters a read, or limits an update or delete. Rows that do not match a SELECT are still in the table. You only remove rows with DELETE.
              :::
            `),
          },
          {
            heading: "UPDATE and DELETE",
            markdown: md(`
              UPDATE changes columns on existing rows. SET names the new values. WHERE names which rows. This marks one task complete:

              ¬¬¬sql
              UPDATE tasks
              SET completed = TRUE
              WHERE id = 1;
              ¬¬¬

              psql reports how many rows were updated. Zero means the id did not match. The statement succeeded and changed nothing. Check the id with SELECT rather than running the update again with a guessed number.

              You can set more than one column. SET title = 'Buy oat milk', details = 'One litre' changes both, still only on the row the WHERE clause names.

              DELETE removes rows. It does not remove the table. The columns remain, ready for new inserts.

              ¬¬¬sql
              DELETE FROM tasks
              WHERE id = 1;
              ¬¬¬

              Follow a delete with SELECT so you can see the gap. The SERIAL counter does not go backwards. The next insert gets a new id. Gaps are normal. Do not renumber rows by hand.

              ### Foreign keys bite on purpose

              If you DELETE a student who still has tasks, Postgres refuses and talks about a foreign key constraint. The tasks would point at a missing student. Delete or reassign those tasks first, then delete the student. That refusal is the relationship working.

              Inserting a task with a student_id that does not exist fails for the same reason. Select the student ids, then insert.

              :::example Change, then read
              Run the UPDATE, read the row count, then SELECT that id. The three steps tell you whether you changed the row you think you changed.
              :::
            `),
          },
          {
            heading: "One small join",
            markdown: md(`
              A join builds a result from two tables by matching a condition. The beginner join in this course matches tasks.student_id to students.id and shows the task title beside the student name.

              ¬¬¬sql
              SELECT tasks.title, students.name
              FROM tasks
              JOIN students ON tasks.student_id = students.id
              WHERE tasks.completed = FALSE
              ORDER BY tasks.created_at;
              ¬¬¬

              FROM tasks says you start with tasks. JOIN students adds the student table. ON states the match. Each result row is one task plus the student whose id equals that task's student_id. WHERE and ORDER BY still mean what they meant on one table. Qualify the column names with the table when both tables have an id, so Postgres knows which id you mean.

              This join leaves out a task whose student_id is NULL, and it leaves out a student who has no tasks, because a plain JOIN keeps only matches. That is the right size for this week. You may see the words LEFT JOIN in other people's notes. A left join can keep rows that do not match. You do not need to write one now.

              ### Why the API will care

              The page often wants "Buy milk, belonging to Ada" in one response. The join asks the database for that combined result. The alternative is to copy Ada's name into every task and hope you remember to edit all the copies. The foreign key plus the join is the tidier notebook trick from the previous lesson, now written as SQL.

              :::misunderstanding A join changes the stored tables
              This SELECT join only builds a result for you to read. The tasks table and the students table stay as they were. INSERT, UPDATE, and DELETE change stored rows. SELECT does not.
              :::

              If the join returns no rows, check that student_id values really equal some students.id. A task stored with the wrong number is still a stored task. The join is strict about the match, which is what you want.
            `),
          },
          {
            heading: "Read the reply and fix the statement",
            markdown: md(`
              Postgres error text usually names the problem and a position. A syntax error means the statement broke a rule of spelling or order: a missing comma, a keyword in the wrong place, or a quote left open. Read the word it points at before you rewrite the whole statement.

              A message about a missing column or relation means the name does not match. Relation is the word Postgres often uses for a table. Check the spelling against ¬\\dt¬ and against the CREATE TABLE you ran. createdat and created_at are different names.

              A foreign key message means the relationship check failed. Look at the id you sent. A connection message, such as server closed the connection or could not connect, means you are no longer talking to a running server. That is not a SQL spelling problem. Reopen psql using the same system steps as last lesson.

              ### A practice sequence

              Use this order when you practise. Create the database and connect. Create students, then tasks. Insert two students and at least three tasks. Select everything. Select unfinished tasks ordered by time. Update one task to completed. Delete one task by id. Join the remaining unfinished tasks to student names. If a step fails, fix that step before the next one. Later statements assume the earlier rows exist.

              :::tip Keep the script
              Save the statements that worked in a file named tasks.sql. The assignment asks for a script you can run again. A history that only lives in a closed psql window is easy to lose.
              :::

              The final project uses one tasks table with id, title, details, completed, and created_at. The student table is here so the join and the foreign key are real. You will not be required to keep the student table in the React project next week. You will be required to understand the SQL you are about to hide behind the API.
            `),
          },
        ],
        vocabulary: [
          {
            term: "SQL",
            definition: "The language used to create tables and to read or change rows in a relational database.",
          },
          {
            term: "SELECT",
            definition: "The statement that reads rows and columns. It does not change the stored table.",
          },
          {
            term: "INSERT",
            definition: "The statement that adds new rows. SERIAL can fill the id when you leave it out.",
          },
          {
            term: "UPDATE",
            definition: "The statement that changes columns on existing rows. Pair it with WHERE so you do not change every row.",
          },
          {
            term: "DELETE",
            definition: "The statement that removes rows. The table definition stays. Use WHERE to limit which rows go.",
          },
          {
            term: "WHERE",
            definition: "The clause that keeps only rows matching a condition, in a read or in a change.",
          },
          {
            term: "ORDER BY",
            definition: "The clause that sorts the result, such as by created_at. DESC reverses the order.",
          },
          {
            term: "JOIN",
            definition: "A way to build one result from two tables by matching related keys, such as a task's student id to a student.",
          },
        ],
        demonstrations: [
          {
            title: "Create task rows and query them",
            intro: "You will open psql for your system, create the two tables, insert sample rows, and run select, update, delete, and one join.",
            steps: [
              "Open psql using the client steps for your operating system. Reconnect if last week's window was closed.",
              "Create a database named tasks_app and connect to it with the psql command \\c tasks_app.",
              "Create the students table, then the tasks table with a foreign key to students.",
              "Insert two students and three tasks. Select the ids before you rely on them.",
              "Select unfinished tasks with WHERE completed = FALSE and ORDER BY created_at.",
              "Update one task so completed is TRUE, then select that id to confirm the change.",
              "Delete a different task by id and select the table again to see that only that row is gone.",
              "Join tasks to students so the result shows a title and a student name, ordered by created_at.",
            ],
            expected: "The join result lists task titles beside student names, and the updated task no longer appears in an unfinished filter.",
            verify: "Each INSERT, UPDATE, and DELETE reports a row count greater than zero for the id you intended, and a following SELECT agrees.",
            ifItFails: "If Postgres reports a foreign key error, select student ids and use one that exists. If the connection closed, reopen psql for your system. If a column is missing, compare the spelling with CREATE TABLE.",
            os: {
              sameOnAllPlatforms: "After psql shows a prompt, the SQL in this lesson is the same on every system. CREATE DATABASE, CREATE TABLE, INSERT, SELECT, UPDATE, DELETE, and the join do not change between Windows, macOS, and Ubuntu. Open the client first. On Windows, use the Start menu and SQL Shell (psql), pressing Enter through the defaults and then typing the postgres password. On macOS, use the Postgres.app elephant menu and Open psql, or Terminal from Spotlight if you installed the official pkg. On Ubuntu, open Terminal with the application menu or Ctrl+Alt+T and run sudo -u postgres psql.",
              windows: [
                "Open SQL Shell (psql) from the Start menu. Press Enter for server, database, and port. Use the user postgres and the password from the EDB installer.",
                "If SQL Shell cannot connect, start the PostgreSQL service that the EDB installer registered, then open SQL Shell again.",
                "Run the shared SQL once the prompt ending in =# is visible. Save working statements in a file you can reopen in your editor.",
              ],
              macos: [
                "Open Postgres.app. If the server is not running, click Initialize. Do not install Homebrew to get a client.",
                "Choose Open psql from the elephant menu. You should see a prompt without the Windows password sequence.",
                "Run the shared SQL at that prompt. If you used the official Mac installer instead, open Terminal from Spotlight and start psql the way that installer set it up.",
              ],
              linux: [
                "On Ubuntu, open Terminal with Ctrl+Alt+T or the application menu. If psql is missing, run sudo apt update and then sudo apt install postgresql. Other Linux distributions use their own package manager.",
                "If the service is stopped, run sudo service postgresql start, then connect with sudo -u postgres psql.",
                "Run the shared SQL at the postgres prompt. Use \\c tasks_app after you create that database.",
              ],
              identify: [
                "Use SQL Shell only on Windows, the Postgres.app menu on macOS, and sudo -u postgres psql on Ubuntu.",
                "The statements after the prompt match. The way you reach the prompt has to match your system.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "Tables, rows, and a join",
            filename: "tasks.sql",
            language: "sql",
            code: "CREATE TABLE students (\n  id SERIAL PRIMARY KEY,\n  name TEXT NOT NULL\n);\n\nCREATE TABLE tasks (\n  id SERIAL PRIMARY KEY,\n  title TEXT NOT NULL,\n  details TEXT NOT NULL DEFAULT '',\n  completed BOOLEAN NOT NULL DEFAULT FALSE,\n  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  student_id INTEGER REFERENCES students (id)\n);\n\nINSERT INTO students (name) VALUES ('Ada'), ('Sam');\n\nINSERT INTO tasks (title, details, student_id)\nVALUES\n  ('Buy milk', 'Two litres', 1),\n  ('Read SQL', 'WHERE and ORDER BY', 1),\n  ('Review notes', 'Ten minutes', 2);\n\nSELECT title, created_at\nFROM tasks\nWHERE completed = FALSE\nORDER BY created_at;\n\nUPDATE tasks\nSET completed = TRUE\nWHERE id = 1;\n\nDELETE FROM tasks\nWHERE id = 3;\n\nSELECT tasks.title, students.name\nFROM tasks\nJOIN students ON tasks.student_id = students.id\nWHERE tasks.completed = FALSE\nORDER BY tasks.created_at;\n",
            explanation: "The script creates students first, then tasks with a foreign key. It inserts two students and three tasks, reads the unfinished ones in time order, marks id 1 complete, deletes id 3, and joins the remaining unfinished tasks to student names. Run it in an empty tasks_app database. If the tables already exist, do not paste the CREATE statements again.",
            lineNotes: [
              { focus: "INSERT INTO students", note: "Two values create two rows. Their ids are chosen by SERIAL, often 1 and 2 in an empty table." },
              { focus: "WHERE completed = FALSE", note: "Filters the read. Completed rows stay stored and drop out of this result." },
              { focus: "UPDATE ... WHERE id = 1", note: "Changes one row. Without the WHERE clause every task would be marked complete." },
              { focus: "JOIN students", note: "Matches each task's student_id to students.id and adds the student name to the result." },
            ],
            expectedOutput: "Creates succeed, inserts report row counts, the first select lists three titles, and the join lists the unfinished remaining tasks with Ada or Sam.",
            level: "practical",
          },
          {
            title: "A careful update",
            filename: "complete-one.sql",
            language: "sql",
            code: "SELECT id, title, completed\nFROM tasks\nWHERE id = 2;\n\nUPDATE tasks\nSET completed = TRUE\nWHERE id = 2;\n\nSELECT id, title, completed\nFROM tasks\nWHERE id = 2;\n",
            explanation: "This pattern reads a row, changes that id only, and reads it again. The first select confirms the id exists. The update should report one row. The last select shows completed as true. Use it whenever you are about to UPDATE or DELETE.",
            lineNotes: [
              { focus: "first SELECT", note: "Proves which row id 2 is before anything changes." },
              { focus: "SET completed = TRUE", note: "TRUE is a boolean. Quoted text would be the wrong type for this column." },
              { focus: "second SELECT", note: "Confirms the stored value. Do not trust the update message alone if you are unsure which id you typed." },
            ],
            expectedOutput: "The first result shows the old completed value. The update reports one row. The last result shows completed as true for that same id.",
            level: "basic",
          },
        ],
        exercises: [
          {
            title: "Filter and sort your own tasks",
            difficulty: "practice",
            prompt: "After the sample rows exist, write two reads that answer questions about those rows. Do not change the rows in this exercise.",
            steps: [
              "Select the titles of tasks that are not complete, oldest first.",
              "Select the titles that belong to one student id you have confirmed with a select on students.",
              "Compare the two results and write one sentence about which rows appear in both.",
              "Leave DELETE and UPDATE for the next exercise so these results stay stable while you compare them.",
            ],
            expectedOutcome: "You have two result grids and a sentence that says which unfinished titles belong to the student you chose.",
          },
          {
            title: "Change one row on purpose",
            difficulty: "stretch",
            prompt: "Update one task and delete another, proving the rest of the table survived.",
            steps: [
              "Select all task ids and titles and copy that list into your notes.",
              "Mark one id complete with an update that names that id in WHERE.",
              "Delete a different id. If the database refuses, read whether a foreign key is involved before you try a broader delete.",
              "Select all tasks again and account for every original id: changed, removed, or untouched.",
            ],
            expectedOutcome: "One chosen row is complete, one chosen row is gone, and every other original row is still present and unchanged.",
          },
        ],
        troubleshooting: [
          {
            problem: "Postgres reports a syntax error at or near a word in your statement.",
            why: "The statement breaks SQL spelling or order. A missing comma, an open quote, a JSON-style double quoted string, or a semicolon in the wrong place are common causes.",
            solution: "Read the word the error points at. Compare the statement with the worked example. Text values use single quotes. Run the corrected statement on its own.",
          },
          {
            problem: "An insert or a student delete mentions a foreign key constraint.",
            why: "A task's student_id does not match a real student, or you tried to delete a student who still has tasks. The relationship check is refusing a dangling pointer.",
            solution: "Select the student ids and use one of those numbers in the task insert. Before deleting a student, delete or reassign that student's tasks, then delete the student.",
          },
          {
            problem: "psql says the connection was closed, or it cannot connect to the server.",
            why: "The database service stopped, the client was quit, or you are using another system's connection command.",
            solution: "Start PostgreSQL again. On Ubuntu use sudo service postgresql start and sudo -u postgres psql. On Windows reopen SQL Shell from the EDB install. On macOS reopen psql from Postgres.app.",
          },
          {
            problem: "The error says a column or relation does not exist, or psql is not installed on this computer.",
            why: "The name is misspelled, you are connected to a different database, or the client package was never installed.",
            solution: "Run \\dt and \\c tasks_app in psql and compare names with CREATE TABLE. If psql itself is missing, use the EDB installer on Windows, Postgres.app or the official installer on macOS, or sudo apt update and then sudo apt install -y postgresql postgresql-contrib on Ubuntu.",
          },
        ],
        knowledgeChecks: [
          {
            id: "where-safe",
            question: "What does WHERE id = 2 do on an UPDATE?",
            format: "multiple_choice",
            options: [
              "It limits the change to the row with that id",
              "It deletes every other table",
              "It creates the students table",
              "It turns off the foreign key forever",
            ],
          },
          {
            id: "select-effect",
            question: "SELECT with a WHERE clause removes non-matching rows from the stored table.",
            format: "true_false",
            options: ["True", "False"],
          },
          {
            id: "join-match",
            question: "What does JOIN students ON tasks.student_id = students.id do in the example?",
            format: "multiple_choice",
            options: [
              "It builds a result that pairs each matching task with the student name",
              "It copies every task into the students table",
              "It uninstalls PostgreSQL",
              "It changes JSON into HTML",
            ],
          },
          {
            id: "order-by",
            question: "Why add ORDER BY created_at to a SELECT of tasks?",
            format: "multiple_choice",
            options: [
              "So the result order is defined instead of left to chance",
              "So the rows are deleted after being shown",
              "So SERIAL stops increasing",
              "So WHERE is no longer needed",
            ],
          },
        ],
        homework: {
          description: "Complete the week 15 assignment: a small database for students and tasks. The assignment page asks for the tables, the inserts, the filtered select, an update, a delete, and one join. Submit the SQL script and a short note of the join result.",
          requirements: [
            "The script creates the tables and inserts sample rows.",
            "The script includes WHERE, ORDER BY, UPDATE, DELETE, and one join.",
          ],
          deliverables: ["The week 15 module assignment submission"],
          submission: "Submit the week 15 assignment from the assignment page. That submission is the homework for this session.",
          criteria: [
            "The script runs against a clean database without a foreign key error.",
            "The join output includes a task title and a student name.",
          ],
          submissionKind: "module_assignment",
        },
        summary: [
          "SQL statements ask Postgres to create, read, update, or delete. A semicolon finishes a statement in psql.",
          "SELECT reads. INSERT adds. UPDATE changes. DELETE removes. WHERE limits which rows are read or changed.",
          "ORDER BY makes the order part of the request. A missing WHERE on an update or delete hits every row.",
          "A join matches tasks.student_id to students.id so one result can show a title and a student name.",
        ],
        nextLesson: {
          title: "Guided full-stack task app",
          why: "You can change rows in psql. Next you will let the React page send those same changes through Express into PostgreSQL.",
          lessonSlug: "guided-fullstack-task-app",
        },
      },
      guide: {
        sessionNumber: 30,
        week: 15,
        title: "SQL operations",
        durationMinutes: 90,
        objectives: [
          "Students create the students and tasks tables in the right order.",
          "Students insert rows and read them with WHERE and ORDER BY.",
          "Students update and delete one id after selecting it first.",
          "Students explain one join without claiming it rewrote the tables.",
        ],
        tools: ["PostgreSQL", "psql", "A text file for the SQL script", "The connection notes from last session"],
        preparation: [
          "Open psql before class and confirm you can create a throwaway database. Drop it so the live demo starts clean.",
          "Keep the Windows SQL Shell sequence, the Postgres.app menu, and the Ubuntu sudo -u postgres psql command on a card. Students whose service stopped will need them.",
          "Prepare one dangerous statement, UPDATE tasks SET completed = TRUE with no WHERE, on paper only, so you can show it and not run it against data you need.",
          "Know the foreign key failure you will trigger once, by inserting a task with student_id 99, so the class sees the refusal before the assignment.",
        ],
        flow: [
          {
            minutes: 5,
            title: "From a prompt to a statement",
            detail: "Ask what SELECT 1 proved last session and what it did not create. Say that today every statement either builds the cabinet or moves cards in it. Remind the room that text uses single quotes and that the semicolon matters in psql.",
          },
          {
            minutes: 15,
            title: "Create database and tables",
            detail: "Create tasks_app, connect with \\c, and create students before tasks. Pause on SERIAL, NOT NULL, DEFAULT, and REFERENCES. Ask a student to predict the error if tasks is created first. Show \\dt after both tables exist.",
          },
          {
            minutes: 20,
            title: "Insert, select, filter, sort",
            detail: "Insert Ada and Sam, select their ids, then insert three tasks using those ids. Run a SELECT with WHERE completed = FALSE and ORDER BY created_at. Change one title's capitalisation and show that 'Ada' and 'ada' do not match. Keep the successful statements in a file as you go.",
          },
          {
            minutes: 25,
            title: "Update, delete, and join",
            detail: "Select an id, update only that id, and select it again. Delete a different id and show the row count. Then run the join and point at title and name in one result. Say clearly that the join did not edit the stored tables. Trigger one foreign key error with a bad student id and read the message calmly.",
          },
          {
            minutes: 15,
            title: "Students practise one change",
            detail: "Students write the unfinished-task select and then update one id of their own. Circulate and look for a missing WHERE before they press Enter. The stretch exercise, a careful delete, is for anyone who has the select and update already checked.",
          },
          {
            minutes: 10,
            title: "Assignment and checks",
            detail: "Run the knowledge checks. Open the week 15 assignment and read the required script pieces: tables, inserts, WHERE, ORDER BY, update, delete, and the join. Tell them the React project next week can use a single tasks table. This assignment keeps students so the join is real. Show where to submit the .sql file.",
          },
        ],
        explain: [
          "CREATE students before tasks because of the foreign key.",
          "SELECT does not delete. DELETE deletes. UPDATE without WHERE updates every row.",
          "ORDER BY belongs on the query when the order matters.",
          "A join result is not a third stored table unless you create one, which you are not doing.",
        ],
        questions: [
          "What will UPDATE tasks SET completed = TRUE do if you forget WHERE?",
          "Why select the student ids before inserting tasks?",
          "Does the join change the tasks table?",
          "What does a row count of 0 after an update tell you?",
        ],
        demonstration: "Build tasks_app from an empty prompt, insert students and tasks, filter and sort, update one id, delete another, and run the join. Cause one foreign key error and repair it with a real id.",
        practice: "Students run a filtered select of their own and an update that names one id. The instructor checks the WHERE clause before the update runs.",
        expectedOutcomes: [
          "A student script creates both tables and inserts rows.",
          "A filtered, ordered select returns only the intended tasks.",
          "A join result shows at least one title and one student name.",
        ],
        difficulties: [
          {
            issue: "A student pastes the whole script twice and the second CREATE TABLE fails.",
            help: "Explain that the table already exists, so the first run worked. Have them start at INSERT, or drop the practice database and run once from the top if they want a clean replay.",
          },
          {
            issue: "The join returns zero rows even though both tables have data.",
            help: "Select tasks.student_id and students.id side by side. The numbers do not overlap. Update the task to a real student id or insert a matching student, then run the join again.",
          },
        ],
        homework: "Students submit the module assignment as a SQL script that creates the tables, inserts rows, filters, sorts, updates, deletes, and joins, plus a short note of the join result.",
        assessment: "Watch one live select and one update with WHERE. The knowledge checks cover WHERE, SELECT versus delete, the join, and ORDER BY. Grade the script on the assignment, including a rerun on a clean database if time allows.",
        recap: "SQL can build the tables and move individual rows. The join answers a question that spans two notebooks. Next week Express asks these questions so the React page does not have to open psql.",
        knowledgeCheckAnswers: [
          {
            id: "where-safe",
            answer: "It limits the change to the row with that id",
            explanation: "WHERE decides which rows the update touches. The id comparison is how you keep the change on one task.",
          },
          {
            id: "select-effect",
            answer: "False",
            explanation: "SELECT only builds a result. Non-matching rows remain stored. DELETE is the statement that removes rows.",
          },
          {
            id: "join-match",
            answer: "It builds a result that pairs each matching task with the student name",
            explanation: "The join matches the foreign key to the primary key and returns combined columns. It does not copy the tasks into students.",
          },
          {
            id: "order-by",
            answer: "So the result order is defined instead of left to chance",
            explanation: "Without ORDER BY, Postgres may return rows in any order. ORDER BY created_at makes the order part of the request.",
          },
        ],
      },
    },
  ],
  assignment: {
    slug: "week-15-assignment",
    title: "A small database for students and tasks",
    summary: "Create a PostgreSQL database with students and tasks, then insert, filter, update, delete, and join the rows.",
    instructions: "Create a small database you can explain row by row.\n\nUse the psql client for your system. On Windows, open SQL Shell from the EDB PostgreSQL install. On macOS, open psql from Postgres.app, or use the official PostgreSQL Mac installer if that is what you installed. Do not require Homebrew. On Ubuntu, connect with sudo -u postgres psql after postgresql is installed with apt.\n\nCreate a database named tasks_app and connect to it. Create a students table with an id serial primary key and a name that must be present. Create a tasks table with id, title, details, completed, created_at, and student_id. student_id must be a foreign key to students.id. completed should default to false. created_at should default to the current time.\n\nInsert at least two students and three tasks. Use the student ids that Postgres assigned. Then include these statements in the script: a SELECT that uses WHERE and ORDER BY, an UPDATE that changes one task by id, a DELETE that removes one task by id, and one JOIN that returns a task title and the matching student name.\n\nRun the script against a clean database before you submit it. If you need to rerun it, drop the practice tables or use a new database so old rows do not make the inserts look duplicated.\n\nSubmit the .sql file and a short note that pastes the join result and says, in your own words, what the foreign key stopped you from doing. Do not include a database password in the note.",
    objectives: [
      "Create related tables with a primary key and a foreign key.",
      "Insert and read rows with WHERE and ORDER BY.",
      "Update and delete a single row by id.",
      "Join tasks to students to show a title and a name together.",
    ],
    requirements: [
      "The script creates students before tasks and defines student_id as a foreign key.",
      "At least two students and three tasks are inserted.",
      "A SELECT uses WHERE and ORDER BY.",
      "An UPDATE and a DELETE each limit their effect with WHERE id.",
      "A JOIN returns task titles with the matching student name.",
    ],
    deliverables: [
      "A .sql script that can be run in psql",
      "A short note showing the join result and explaining the foreign key",
    ],
    rubric: [
      {
        criterion: "Tables and keys",
        points: 5,
        description: "Both tables exist, each id is a primary key, and tasks.student_id references students.",
      },
      {
        criterion: "Rows",
        points: 5,
        description: "The inserts succeed and use real student ids, with at least two students and three tasks.",
      },
      {
        criterion: "Read and change",
        points: 5,
        description: "WHERE, ORDER BY, a single-row update, and a single-row delete are all present and correct.",
      },
      {
        criterion: "Join and explanation",
        points: 5,
        description: "The join lists a title with a student name, and the note explains the foreign key without including a password.",
      },
    ],
    points: 20,
    instructorSolution: `-- Run in an empty database named tasks_app.
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  details TEXT NOT NULL DEFAULT '',
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  student_id INTEGER REFERENCES students (id)
);

INSERT INTO students (name) VALUES ('Ada'), ('Sam');

INSERT INTO tasks (title, details, student_id) VALUES
  ('Buy milk', 'Two litres', 1),
  ('Read SQL', 'Filter and sort', 1),
  ('Review notes', 'Ten minutes', 2);

SELECT title FROM tasks WHERE completed = FALSE ORDER BY created_at;

UPDATE tasks SET completed = TRUE WHERE id = 1;

DELETE FROM tasks WHERE id = 3;

SELECT tasks.title, students.name
FROM tasks
JOIN students ON tasks.student_id = students.id
WHERE tasks.completed = FALSE
ORDER BY tasks.created_at;
`,
  },
  quiz: {
    slug: "week-15-quiz",
    title: "Week 15 quiz",
    passingScore: 70,
    allowRetakes: true,
    questions: [
      {
        slug: "why-disk",
        type: "multiple_choice",
        prompt: "What problem does PostgreSQL solve for the task API?",
        options: [
          { id: "a", text: "It keeps rows after the Node process stops" },
          { id: "b", text: "It replaces HTML" },
          { id: "c", text: "It removes the need for any query" },
          { id: "d", text: "It stores data only inside one browser tab" },
        ],
        correct: { optionId: "a" },
        explanation: "The week 14 array lived in memory. PostgreSQL stores rows separately, so a restart of Node does not throw them away.",
        points: 1,
      },
      {
        slug: "install-mac",
        type: "multiple_choice",
        prompt: "Which install path is acceptable for macOS in this course?",
        options: [
          { id: "a", text: "Postgres.app, or the official PostgreSQL macOS installer, without Homebrew" },
          { id: "b", text: "The Windows EDB installer run on a Mac" },
          { id: "c", text: "sudo apt install on macOS" },
          { id: "d", text: "Renaming a text file to psql" },
        ],
        correct: { optionId: "a" },
        explanation: "macOS uses Postgres.app or the official Mac installer. Windows uses EDB. Ubuntu uses apt. Homebrew is not required.",
        points: 1,
      },
      {
        slug: "key-role",
        type: "multiple_choice",
        prompt: "What is student_id on the tasks table?",
        options: [
          { id: "a", text: "A foreign key pointing at a student row" },
          { id: "b", text: "A second primary key that can repeat" },
          { id: "c", text: "The student's full biography" },
          { id: "d", text: "A CSS class" },
        ],
        correct: { optionId: "a" },
        explanation: "student_id stores students.id. That foreign key is what makes the one-to-many relationship checkable.",
        points: 1,
      },
      {
        slug: "select-harmless",
        type: "true_false",
        prompt: "A SELECT statement changes the stored rows when it includes a WHERE clause.",
        correct: { value: false },
        explanation: "SELECT reads. WHERE only filters the result. UPDATE and DELETE are the statements that change or remove stored rows.",
        points: 1,
      },
      {
        slug: "read-where",
        type: "code_reading",
        prompt: "Which rows does this statement return, and in what order?",
        codeSnippet: "SELECT title\nFROM tasks\nWHERE completed = FALSE\nORDER BY created_at;",
        options: [
          { id: "a", text: "Unfinished tasks, oldest first" },
          { id: "b", text: "Every task, newest first, and then it deletes them" },
          { id: "c", text: "Only student names" },
          { id: "d", text: "The PostgreSQL password" },
        ],
        correct: { optionId: "a" },
        explanation: "WHERE completed = FALSE keeps unfinished tasks. ORDER BY created_at without DESC lists them from earliest to latest. Nothing is deleted.",
        points: 1,
      },
      {
        slug: "missing-where",
        type: "multiple_choice",
        prompt: "What does UPDATE tasks SET completed = TRUE do when WHERE is omitted?",
        options: [
          { id: "a", text: "It marks every task complete" },
          { id: "b", text: "It updates only the first row" },
          { id: "c", text: "It refuses to run because SQL always implies an id" },
          { id: "d", text: "It drops the students table" },
        ],
        correct: { optionId: "a" },
        explanation: "Without WHERE, the update applies to every row in tasks. Name an id when you mean one task.",
        points: 1,
      },
      {
        slug: "join-read",
        type: "true_false",
        prompt: "The course join matches tasks.student_id to students.id so a result can show a title and a name together.",
        correct: { value: true },
        explanation: "That ON clause is the match between the foreign key and the student primary key. The result is combined. The stored tables are not merged.",
        points: 1,
      },
      {
        slug: "client-which",
        type: "multiple_choice",
        prompt: "You quit psql with \\q. What is still true?",
        options: [
          { id: "a", text: "The PostgreSQL server can still be running with your tables stored" },
          { id: "b", text: "All tables are deleted because the client closed" },
          { id: "c", text: "Node automatically creates a new database" },
          { id: "d", text: "Port 3000 becomes the database port" },
        ],
        correct: { optionId: "a" },
        explanation: "psql is the client. Quitting it ends the session, not the stored data. The server keeps the tables until SQL or an uninstall removes them.",
        points: 1,
      },
      {
        slug: "key-words",
        type: "short_answer",
        prompt: "Explain a primary key and a foreign key using the students and tasks tables.",
        correct: {
          rubric: "A complete answer says the primary key identifies one row, such as students.id or tasks.id, and must be unique. The foreign key is tasks.student_id, which stores a student id so the task points at a real student. Wording can vary. A kitchen or notebook comparison is fine if the two ideas stay distinct.",
        },
        explanation: "The primary key is a row's own id. The foreign key is another table's id stored on the task so the relationship can be checked and joined.",
        points: 2,
      },
    ],
  },
};
