import type { ModuleSeed } from "../../src/lib/content-types";

export const week10: ModuleSeed = {
  slug: "week-10-git",
  number: 10,
  weekNumber: 10,
  monthLabel: "Month 3 — Web interactivity, Git and React",
  title: "Git and GitHub",
  description:
    "Keep a history of your project files with Git, then put a copy on GitHub with a README so the work can move between computers.",
  lessons: [
    {
      slug: "version-control-and-git",
      sessionNumber: 19,
      title: "Version control and Git",
      estimatedMinutes: 90,
      difficulty: "Gentle introduction",
      requiresOs: true,
      content: {
        overview: {
          about:
            "This lesson explains why a project needs versions, what version control is, and how Git records snapshots of a folder. You will install Git on your own system, move around in a terminal, and use init, status, add, commit, and log with messages you can read later.",
          why: "Save replaces a file. It does not keep the earlier file beside the new one. Git keeps those earlier states so you can see what changed and return to a moment you named.",
          alreadyKnow:
            "You can create a folder, save an HTML or text file, and change a page with JavaScript.",
        },
        objectives: [
          "Explain the difference between saving a file and recording a version.",
          "Describe a Git repository as a project folder plus its history.",
          "Install Git and show a version line in a new terminal window.",
          "Move into a project folder and read git status before you commit.",
          "Create two commits with messages that say what changed.",
        ],
        prerequisites: [
          {
            label: "Saving HTML, CSS, and JavaScript files in a project folder.",
            lessonSlug: "events-and-interaction",
          },
          {
            label: "Creating folders and opening files from earlier computer practice.",
            lessonSlug: "internet-and-tools",
          },
        ],
        teachingNotes: [
          {
            heading: "Why versions matter",
            markdown: `An essay you write by hand has a problem the moment you cross out a sentence. The new sentence is there, and the old one is a smudge. If the old sentence was better, you cannot get it back cleanly. A computer file has the same problem when you use Save. Save means "this is the file now". It does not keep yesterday's wording beside today's, unless you made a separate copy yourself.

People invent informal versions all the time. A folder fills up with names such as page-old, page-old2, and page-really-final. Those names are a kind of history, but they are easy to mix up. Which file still has the working button? Which one did you show in class? The names do not say what changed. They only say that someone was nervous about losing work.

This lesson gives you a calmer habit. You keep one folder of real files, and a separate history of snapshots. A snapshot is a recorded copy of the files at a moment you choose. You can read an older snapshot without throwing away the current files. That is the problem versions solve: change the work, and still be able to look back.

You already met a related idea in the browser. Refreshing a page throws away DOM changes that were never written into a file. Git is about the files on disk. It does not record the live DOM, and it does not watch the page in the browser. It records the HTML, CSS, and JavaScript you saved. The order is: edit, save in the editor, then ask Git to remember that saved state.

A common mix-up is to treat Save and "make a version" as the same click. They are two steps. Save updates the file in the folder. A version is an extra record, with a message, taken after the save. If you only save, you have the latest file. If you also record a version, you have the latest file and a trail of earlier ones.

:::misunderstanding Versions mean keeping dozens of copied folders
Copying a whole folder by hand does keep an old copy, and people do it when they have no other tool. It wastes space, the names get confusing, and there is no sentence that says what changed. Version control keeps the history with the project instead of as a pile of duplicate folders.
:::

:::example The letter drafts
A letter asking for a market stall might exist as three drafts. Draft one makes the request. Draft two adds the day of the week. Draft three shortens the opening. Each draft has a sentence on it: "Ask for a stall", "Add Saturday", "Shorten the opening". Version control is that stack of drafts, kept for a folder of code instead of for one sheet of paper.
:::`,
          },
          {
            heading: "What version control is",
            markdown: `Version control is a way of storing a project so that the history of changes is part of the project. The current files stay easy to open in your editor. The history stays available when you need it. You choose the moments that matter. The tool does not need a snapshot of every keystroke.

Why does this exist? Software is text, and text is rewritten. A heading changes. A colour changes. A function grows a new check. Weeks later you need to know what the page contained when the counter worked, or what sentence you had before you tried a new one. Memory is a poor record. A named snapshot is a better one.

The problem it solves is shared memory for a project. Even when you work alone, you last Tuesday and you today cannot have a conversation. Version control lets today-you read a note from Tuesday-you, attached to the files as they were. The note is not a chat message that can drift away from the code. It belongs to that snapshot.

How it works, before any command names: you edit files in the usual way. When the project is in a state you want to remember, you take a snapshot and write a short message. Later you can list those messages in order, newest first. Each message is a bookmark in the story of the folder. The tool that will take those snapshots in this course is Git. Other tools exist. This course uses Git because it is widely used with the project folders you already know how to create.

This connects to the way you already hunt bugs. In the JavaScript lessons you compared what you expected with what the page did, and you read the error. History adds another comparison: the files from a moment that worked, against the files you have now. You will not need that comparison on every exercise. You will want it the first time a small edit breaks a button that used to work.

:::tip Snapshots are selective
You decide when a snapshot is worth taking. A useful moment is "the page opens and the heading is correct" or "the counter resets". A less useful moment is "I typed one letter and I am not ready to look at it again". The history should be readable by a tired person, including future you.
:::`,
          },
          {
            heading: "What Git is",
            markdown: `Git is a program that keeps version history for a folder. The folder is still a normal folder. You can open it in Visual Studio Code, double-click an HTML file, and edit text as before. Git adds a hidden directory named \`.git\` inside that folder. The hidden directory is the history book. The files you edit are the current pages lying on the desk.

A repository is the project Git is tracking: the files you see, plus the \`.git\` history. People shorten repository to repo. Creating a repository does not upload anything. It does not need an account. It means this folder now has a history book, and that book starts empty until you record the first snapshot.

Git was built so many people could work on the same project without mailing zip files. You can use it alone, and that is how this session starts. Working alone is not a lesser use. The history is already valuable when the only two people are you today and you next week.

Three areas help the commands make sense.

The working tree is the folder you can see: the HTML, the CSS, the JavaScript, and any notes. This is where you type.

The staging area is a packing box for the next snapshot. Putting a file in the box does not seal the snapshot yet. It says "include this file, as it looks right now, in the next snapshot". Files you leave out of the box stay in the folder, but they are not part of that snapshot.

A commit is the sealed snapshot. It contains the staged files, a message, the time, and the name you configured. After the commit, the packing box is empty again. The working tree still holds the files. Nothing is deleted by a normal commit.

Git identifies each commit with a long code called a hash. You do not invent it and you do not memorise it. \`git log\` shows the start of the hash beside your message. The hash lets Git tell two snapshots apart even if someone reused a sentence.

\`HEAD\` is Git's name for where you are standing in the history. At the start of this course, you stand on the latest commit of a branch named \`main\`. A branch here is a line of commits with a name. You will stay on \`main\`. Renaming lines and merging them can wait.

:::misunderstanding The .git folder is clutter you should delete
If you delete \`.git\`, you delete the history. The HTML files remain, but the commits are gone. Leave \`.git\` in the project. You rarely open it by hand. Git reads and writes it when you run commands.
:::

:::warning Do not store passwords in the files you commit
A commit keeps a copy of the file as it was. If a password or a private key is in that file, the secret becomes part of the history. This week, commit course pages and notes only. Do not commit a file of personal passwords.
:::`,
          },
          {
            heading: "Installing Git on your system",
            markdown: `Git is a separate program from the browser and from Visual Studio Code. You install it once on the computer, then you call it from a terminal. The check is the same everywhere: open a new terminal and run \`git --version\`. The install is not the same. Windows uses an installer. macOS often installs Git as part of the command line developer tools. Linux installs it with the distribution's package manager. Follow the demonstration for your system, and do not type another system's command.

## Windows

On Windows, download Git for Windows from the official site git-scm.com. The download page for Windows offers an installer. Run it. On the screen about your PATH, keep the recommended option that makes Git available from the command line and from other programs. PATH is the list of folders Windows searches when you type a command. If Git is not on that list, PowerShell says the command is not recognised even though the installer ran.

When the installer asks for a default editor, choose Visual Studio Code if it appears in the list. This session uses \`git commit -m\` so an editor usually stays closed. Choosing a familiar editor matters the day a command opens one. If you leave the default Vim and later see a full screen of tildes, that is Vim waiting for commands. Troubleshooting later in this lesson shows how to leave it.

Finish the installer, then close every terminal that was already open. A terminal that was open during the install does not yet know about the new program. Open a new Windows PowerShell and run \`git --version\`. A version line means the install is visible. The number will not match a classmate's number, and that is fine.

## macOS

On macOS, open Terminal and run \`git --version\` before you download anything. If Git is already installed, you see a version and you can stop. If it is not, macOS offers to install the command line developer tools. Those tools include Git. Choose Install and wait. The download can take several minutes. When it finishes, run \`git --version\` again in the same or a new Terminal window.

You do not need Homebrew for this lesson. Homebrew is another way to install Git, and it is fine if you already use it. An absolute beginner can stop after the developer tools install. Do not mix instructions from three websites in one sitting.

## Linux

On Linux, the command depends on the distribution, which is the particular Linux system you installed. Ubuntu and Debian use \`apt\`. Fedora uses \`dnf\`. Arch Linux uses \`pacman\`. You need the administrator password because installing software for the whole computer is a protected action. \`sudo\` runs one command with that authority. When the terminal asks for a password, the cursor does not move as you type. Type the password and press Enter.

After the install command finishes, run \`git --version\`. If the shell says the command is not found, the install did not complete or you are in a different machine session than you think. Read the last lines of the install output before you search for a new guide.

## What a successful install proves

A version line proves the \`git\` command starts. It does not prove you have a repository yet. Installation puts the tool on the computer. \`git init\`, in the next sections, starts history in one folder. Those are different events, the way installing a camera is different from taking a photograph.

:::misunderstanding One install command works on every computer
The words \`git --version\` match. The install does not. An \`apt\` command fails on Windows. A Windows installer is not a file macOS can run. Use the steps for the system you identified.
:::`,
          },
          {
            heading: "The terminal and moving between folders",
            markdown: `The terminal is a text door to the same files you see in the file manager. You type a command, press Enter, and the program prints a result above a new prompt. The prompt is the line that waits for the next command. On Windows, open Windows PowerShell for this course, not the older Command Prompt. PowerShell understands \`cd\`, \`pwd\`, and \`ls\`. On macOS the app is named Terminal. On Linux the app is also named Terminal, and Ubuntu opens it with Ctrl+Alt+T.

A command is a program name plus extra words. \`git --version\` means "run the git program, and pass it the option --version". Spaces separate the words. Spelling and order matter. The terminal does not infer that you meant a nearby command.

\`pwd\` prints the folder you are in. The letters stand for print working directory. A directory is a folder. Run \`pwd\` whenever you feel lost. \`ls\` lists the names in the current folder. On PowerShell, \`pwd\` and \`ls\` are aliases of longer Windows commands, so the short names work there too if you opened PowerShell.

\`cd\` means change directory. \`cd learning/week-10\` walks into that folder, if it exists inside the current one. \`cd ..\` walks up to the parent folder. The two dots are the name of the parent. Paths in this course are written with forward slashes, such as \`learning/week-10\`. PowerShell accepts that form.

Create the folder from the terminal or from the file manager. Both are valid. From a terminal that is already inside \`learning\`, the command \`mkdir week-10\` creates the folder, and \`cd week-10\` enters it. \`mkdir\` means make directory. After you enter, \`pwd\` should end in \`week-10\`.

## Why the folder matters

Git commands apply to the current folder and its parents. If you run \`git init\` in your home folder, you start a history book over every file you own. That is a painful mistake. Before \`git init\`, \`git status\`, \`git add\`, or \`git commit\`, run \`pwd\` and read the path. It should be the project, \`learning/week-10\`, not your user folder and not the whole disk.

The file manager and the terminal can show the same folder at the same time. Create \`market-note.txt\` in the editor, save it into \`learning/week-10\`, then run \`ls\` in a terminal that has \`cd\`'d into that folder. If \`ls\` does not show the file, the editor saved somewhere else, or the terminal is somewhere else. Do not commit until those two views agree.

:::example Rooms in a house
\`pwd\` is asking "which room am I in?" \`ls\` is looking at the furniture in that room. \`cd learning/week-10\` is walking into the room labelled week-10. You would not pack a suitcase in the hallway and hope it belongs to the bedroom. Do not commit from the hallway either.
:::

:::tip Prompt shape
PowerShell often starts its prompt with \`PS\`. macOS and Linux prompts often end with a dollar sign. The prompt is not part of the command. Do not type the dollar sign or the \`PS\`.
:::`,
          },
          {
            heading: "init, status, add, commit, and log",
            markdown: `Work in \`learning/week-10\` only. The commands in this section are the same on Windows PowerShell, macOS, and Linux. How you open the terminal is not the same, and the demonstration says so.

Before the first commit on a computer, tell Git the name and email to store on snapshots. This is not a GitHub account. It is a signature written into commits on this machine.

\`\`\`text
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
\`\`\`

Replace the name and email with your own. \`--global\` means the setting applies to your user account on this computer, not only to one folder. The third line asks new repositories to start on a branch named \`main\`. Run these once, not before every commit.

\`git init\` creates the \`.git\` directory in the current folder. Run it once per project. Running it again in the same folder is harmless if the repository already exists, but running it in the wrong folder is how history ends up in the wrong place. Read \`pwd\` first.

Create a text file named \`market-note.txt\` in that folder. One sentence is enough: the Saturday market page will live here. Save the file.

\`git status\` is the command you run when you are unsure. It reports the branch, and it lists files Git notices. A new file is untracked: it is in the folder, and it is not yet in any commit. A changed file that was committed before is modified. A clean message, "nothing to commit, working tree clean", means the latest commit matches the saved files.

\`git add market-note.txt\` puts that file into the staging area. A second \`git status\` should now list it under changes to be committed. That list is the packing box. \`git add .\` stages everything new or changed in the current folder. The dot means "here". Prefer the named form while you are learning, so you see each file enter the box. Use the dot only when you have looked at \`git status\` and you want every listed file.

\`git commit -m "Add Saturday market note"\` seals the snapshot. The \`-m\` flag means the next quoted text is the message, so Git does not open an editor. After a successful commit, status is clean, unless you changed something else in the meantime.

\`git log\` prints the history, newest first. You should see your message, the date, the name you configured, and a hash. Press \`q\` if the log opens in a pager and waits. \`git log --oneline\` prints one short line per commit. Make a second edit to the note, save, and repeat status, add, and commit. A second \`git log --oneline\` shows two lines. The folder still has one note file, not two copies. The history has two snapshots.

\`git diff\` shows unstaged edits as lines removed and lines added. Read it before you write the message if you have forgotten what you changed. You do not commit the diff itself. You commit the files. The diff is a view.

:::misunderstanding git add saves the file, and git commit uploads it
The editor saves the file. \`git add\` only chooses the saved file for the next snapshot. \`git commit\` writes the snapshot into \`.git\` on this computer. Nothing is sent to a website by these commands. Sharing is the next lesson.
:::`,
          },
          {
            heading: "Commit messages",
            markdown: `A commit message is a label on a snapshot. It exists so a person can scan \`git log\` and recognise the moment. Git does not understand the sentence. A careless message and a careful one store the files equally well. The careful one is for humans, including you after a week of other work.

The problem a message solves is anonymous history. A log full of "update", "stuff", and "asdf" is a row of locked boxes with no labels. You would have to open each box to learn anything. A message such as "Add Saturday market note" tells you whether the box is worth opening.

How to write one in this course:

1. Use the present tense and start with a verb. "Add the reset button." "Correct the heading text." "Link the stylesheet."
2. Name the change, not your feelings about it. "Finally done" does not say what changed.
3. Keep it to one sentence. Details can live in the code and in later commits.
4. Match the snapshot. If the commit only adds a note, do not claim that it finishes the whole website.

Look at \`git status\` and, when you need it, \`git diff\`, before you write the sentence. The message should agree with the files in the box. If the box contains an unrelated deletion, take it out of this commit or mention it. You will learn finer ways to split work later. This week, commit small, related changes.

A beginner misunderstanding is to write the message as if GitHub were reading your diary. The message is stored even if you never create an account. Another misunderstanding is to commit once at the end of the month. Small commits are easier to read and easier to reason about when something breaks. "Add the counter buttons" and "Describe negative counts in the status sentence" are two stories. One commit called "everything" is a locked trunk.

This connects to the comments you already write in JavaScript. A comment explains a line for a reader. A commit message explains a moment for a reader. Neither one changes what the computer does with the code. Both are part of taking care of the work.

:::example Two messages for the same file
First commit: "Add Saturday market note." You created the file. Second commit, after you add the opening time: "Record the market opening time." Someone reading the log can tell those snapshots apart without opening the file.
:::

:::warning The message is not a substitute for saving
If the editor shows a dot on the file tab, the latest typing is not on disk yet. Git commits the saved file, not the unsaved buffer. Save, then status, then add, then commit.
:::`,
          },
        ],
        vocabulary: [
          {
            term: "version control",
            definition:
              "A way of keeping named snapshots of a project so you can see what changed and look back at an earlier state.",
          },
          {
            term: "Git",
            definition:
              "The program this course uses to store those snapshots in a hidden .git directory inside the project folder.",
          },
          {
            term: "repository",
            definition:
              "A project folder that Git is tracking, including the visible files and the history stored beside them.",
          },
          {
            term: "commit",
            definition:
              "One sealed snapshot of the staged files, together with a message, a time, and the name configured on this computer.",
          },
          {
            term: "staging area",
            definition:
              "The packing box for the next commit. git add puts the current saved file into that box. The commit seals it.",
          },
          {
            term: "working tree",
            definition:
              "The ordinary files in the project folder, the ones you edit and save. Git status compares them with the last commit.",
          },
          {
            term: "terminal",
            definition:
              "A text window where you run commands such as pwd, ls, and git status. It sees the same folders as the file manager.",
          },
        ],
        demonstrations: [
          {
            title: "Install Git and show the version",
            intro:
              "Install Git for the operating system you actually have, then open a new terminal and run the version check. Do not use another system's install command.",
            steps: [
              "Identify Windows, macOS, or Linux with the notes below before you install anything.",
              "Follow only the install steps for that system.",
              "Wait until the installer or package command finishes. Read any error text before you retry.",
              "Close terminals that were open during the install.",
              "Open a new terminal using the steps for your system.",
              "Run git --version and read the line it prints.",
              "Leave the installer files alone after a successful version line. You do not run the installer before every commit.",
            ],
            expected:
              "The new terminal prints a line that includes the word git and a version number, such as git version 2.45.1 or another current number.",
            verify:
              "Run git --version a second time. The same version line appears. You have not created a repository yet, so there is no commit history to show.",
            ifItFails:
              "If the terminal says the command is not found or is not recognised, the install did not land on the PATH of this terminal. Open a brand-new terminal window. On Windows, confirm you opened PowerShell after the installer, not a window that was already running. On Linux, read the end of the install output for a failed password or a missing package name.",
            os: {
              identify: [
                "An Apple menu at the top corner means macOS. A Windows logo on the start button means Windows. A system such as Ubuntu, with neither of those logos, is Linux.",
                "If you are unsure, open the system settings and read the about page. It names the operating system. Install for that name only.",
              ],
              windows: [
                "Open https://git-scm.com/download/win in your browser and run the Git for Windows installer that downloads.",
                "Keep the recommended PATH option so Git can be started from PowerShell. If a default editor list includes Visual Studio Code, you may select it.",
                "Close old terminals. Press the Windows key, type PowerShell, and open Windows PowerShell. Run git --version.",
              ],
              macos: [
                "Press Command-Space, type Terminal, and press Return. Run git --version.",
                "If macOS asks to install the command line developer tools, choose Install and wait until the tools finish. Then run git --version again.",
                "A version line means you can stop. You do not need a separate Git website download when the developer tools already provided Git.",
              ],
              linux: [
                "Open Terminal from the application menu. On Ubuntu, Ctrl+Alt+T opens it. On Ubuntu or Debian, run sudo apt update and then sudo apt install -y git. The password will not show as you type.",
                "On Fedora, run sudo dnf install -y git. On Arch Linux, run sudo pacman -S git.",
                "When the package command finishes, run git --version. Do not run the apt command on Fedora or the dnf command on Ubuntu.",
              ],
            },
          },
          {
            title: "Two commits in learning/week-10",
            intro:
              "Create a repository in a project folder, record a new note, then change the note and record a second snapshot. The Git commands match on every system. Opening the terminal does not.",
            steps: [
              "Create the folders so the project path is learning/week-10, inside the learning folder you already use for this course.",
              "Open a terminal and move into that folder. Run pwd and confirm the path ends with learning/week-10.",
              "If this computer has never signed a commit, set your name, email, and default branch with the three git config commands from the lesson.",
              "Run git init. Confirm that status runs, even though there is nothing to commit yet.",
              "Create market-note.txt in that folder with one sentence about the Saturday market, and save it from the editor.",
              "Run git status and check that the note is untracked. Run git add market-note.txt and check status again.",
              "Run git commit -m \"Add Saturday market note\" and then git log --oneline.",
              "Add a second sentence to the note, save, and use status, diff, add, and commit with a new message. Run git log --oneline and confirm two lines.",
            ],
            expected:
              "git log --oneline prints two commits. The top message describes the second edit. The folder still contains one market-note.txt, and git status says the working tree is clean.",
            verify:
              "From learning/week-10, run pwd, then git status, then git log --oneline. Status is clean. The log lists your two messages and no one else's.",
            ifItFails:
              "If Git says you are not in a repository, you are in the wrong folder or init did not run there. If it says you must tell it who you are, run the git config name and email commands, then commit again. If a text editor opens and you did not mean it, you left off the -m message. Leave the editor with the steps in troubleshooting, then commit with -m.",
            os: {
              sameOnAllPlatforms:
                "After you are in learning/week-10, the commands are the same: git init, git status, git add market-note.txt, git commit -m \"Add Saturday market note\", and git log --oneline. Do not type a dollar sign in front of them.",
              identify: [
                "Use the Apple menu, the Windows logo, or the Linux about page if you are not sure which terminal instructions to follow.",
                "The Git words match across systems. The way you open a terminal and the way you installed Git do not.",
              ],
              windows: [
                "Press the Windows key, type PowerShell, and open Windows PowerShell. Use cd to enter learning/week-10, then run pwd.",
                "Run ls to see market-note.txt. If your learning folder is on the Desktop, start with cd Desktop before cd learning/week-10. Do not use the older Command Prompt for this session.",
              ],
              macos: [
                "Press Command-Space, type Terminal, and press Return. Use cd to enter learning/week-10, then run pwd.",
                "Run ls and confirm the note is listed. Finder can create the folder, but the git commands still run in Terminal.",
              ],
              linux: [
                "Open Terminal. On Ubuntu, Ctrl+Alt+T opens it. Use cd to enter learning/week-10, then run pwd.",
                "Run ls and confirm the note is listed. The git commands are the same on Ubuntu, Fedora, and other distributions once Git is installed.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "The note that goes into the first commit",
            filename: "market-note.txt",
            language: "text",
            level: "basic",
            code: `Saturday market notes
The page for this project will list the stall opening time.
`,
            explanation:
              "This is an ordinary text file in learning/week-10. Git does not need special syntax inside it. The file must be saved before git add, because Git reads the copy on disk.",
            lineNotes: [
              {
                focus: "First line",
                note: "A short title makes the file recognisable in ls and in a later log message.",
              },
              {
                focus: "Second line",
                note: "One fact is enough for the first snapshot. The second commit can add the opening time.",
              },
            ],
            expectedOutput:
              "After you add and commit this file, git status no longer lists it as untracked, and git log shows the commit message you wrote.",
          },
          {
            title: "A page you can commit beside the note",
            filename: "index.html",
            language: "html",
            level: "improved",
            code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Saturday market</title>
</head>
<body>
  <h1>Saturday market</h1>
  <p>Opening time: 8:00.</p>
</body>
</html>
`,
            explanation:
              "The HTML is the same kind of page you wrote earlier. Putting it in the repository does not change how the browser opens it. It does mean a commit can remember this heading and this opening time.",
            lineNotes: [
              {
                focus: "title and h1",
                note: "Both say Saturday market, so a later reader can connect the browser tab to the visible heading.",
              },
              {
                focus: "paragraph",
                note: "The opening time is the sort of small fact a second commit can change, with a message that says so.",
              },
            ],
            expectedOutput:
              "The browser shows the heading Saturday market and the sentence Opening time: 8:00. git status lists index.html until you add and commit it.",
          },
          {
            title: "Commands for the first two snapshots",
            filename: "commands.txt",
            language: "text",
            level: "practical",
            code: `git init
git status
git add market-note.txt
git commit -m "Add Saturday market note"
git log --oneline
git add index.html
git commit -m "Add the market page with an opening time"
git log --oneline
`,
            explanation:
              "Keep this list in your notes if you want a reminder. You type the commands in the terminal. You do not need to commit commands.txt itself. Each commit message matches only the files staged just above it.",
            lineNotes: [
              {
                focus: "git status before add",
                note: "Status tells you whether the note is untracked. Add comes after that reading, not instead of it.",
              },
              {
                focus: "separate commits",
                note: "The note and the page are two snapshots so the log can tell the stories apart.",
              },
              {
                focus: "git log --oneline",
                note: "One line per commit is enough to check that both messages exist.",
              },
            ],
            expectedOutput:
              "The second log prints two lines. The top line is the market page message. The line under it is the market note message.",
          },
        ],
        exercises: [
          {
            title: "Read one status",
            difficulty: "warm-up",
            prompt:
              "Create learning/week-10, initialise the repository if you have not already, and save a new file named stall.txt. Do not add it yet.",
            steps: [
              "Run pwd and write down the folder.",
              "Run git status.",
              "In your notes, say whether stall.txt is untracked, staged, or already committed, using the words status printed.",
            ],
            expectedOutcome:
              "Your notes name the folder and describe stall.txt as untracked, or with the equivalent wording from git status.",
          },
          {
            title: "Two labelled snapshots",
            difficulty: "practice",
            prompt:
              "Record stall.txt, then change it, and record the change as a second commit. Write both messages yourself.",
            steps: [
              "Stage only stall.txt and commit it with a message that says you added the stall list.",
              "Add one stall name to the file, save, and look at git diff.",
              "Stage and commit that change with a message that mentions the stall name you added.",
              "Run git log --oneline.",
            ],
            expectedOutcome:
              "The log shows two commits. The messages are different, and a person can tell which snapshot added the stall name.",
          },
          {
            title: "A message you reject",
            difficulty: "stretch",
            prompt:
              "Look at a commit you already made and decide whether the message would still make sense next week.",
            steps: [
              "Copy one message from git log into your notes.",
              "Write a replacement message if the original does not name the change.",
              "Do not rewrite history. Leave the old commit as it is, and use the clearer style on the next commit only.",
            ],
            expectedOutcome:
              "Your notes contain the original message and either an approval or a clearer sentence you will use next time.",
          },
        ],
        troubleshooting: [
          {
            problem: "The terminal says git is not recognised, or git: command not found.",
            why: "This terminal cannot see the Git program. The install did not finish, or this window was opened before the install and still has the old PATH.",
            solution:
              "Close the terminal. Open a new PowerShell, Terminal, or Linux terminal and run git --version. If it still fails, repeat only your system's install steps and watch for an error. Do not paste another operating system's install command.",
          },
          {
            problem: "Git says you must set user.name and user.email before a commit.",
            why: "A commit stores a name and an email. This computer does not have those settings yet. This is separate from having a GitHub account.",
            solution:
              "Run git config --global user.name \"Your Name\" and git config --global user.email \"you@example.com\" with your own details, then run the commit command again.",
          },
          {
            problem: "A screen of tildes opens and normal typing does not return you to the prompt.",
            why: "Git opened the editor Vim because the commit had no -m message, or another command asked for an editor. Vim waits for its own commands.",
            solution:
              "Type :q! and press Enter to leave Vim without saving that editor session. Then run the commit again with -m and a quoted message. On a later install you can choose Visual Studio Code as Git's editor.",
          },
          {
            problem: "git status says this directory is not a Git repository, or the commit included files from your whole user folder.",
            why: "The terminal was not inside learning/week-10, so init and commit ran in the wrong place.",
            solution:
              "Run pwd. Use cd to enter learning/week-10 and run git status there. If you ran git init in your home folder, ask your instructor before you delete any .git directory, so you do not remove the wrong history.",
          },
        ],
        knowledgeChecks: [
          {
            id: "w10-git-save",
            format: "Multiple choice",
            question: "You save market-note.txt in the editor. What is true?",
            options: [
              "Git has already stored a commit with a message.",
              "The file on disk is updated, and a commit happens only if you add and commit.",
              "The file is uploaded to GitHub by Save.",
              "The .git folder is deleted so the file can stay small.",
            ],
          },
          {
            id: "w10-git-status",
            format: "True or false",
            question: "A new saved file that has never been added is described as untracked.",
          },
          {
            id: "w10-git-order",
            format: "Multiple choice",
            question: "Which order matches the packing-box story for one file?",
            options: [
              "commit, then add, then save",
              "save, then add, then commit",
              "push, then init, then save",
              "log, then delete .git, then add",
            ],
          },
          {
            id: "w10-git-message",
            format: "Short answer",
            question:
              "You only added the opening time to the market note. Write a one-sentence commit message for that snapshot, and say why \"update\" is a weak message.",
          },
        ],
        homework: {
          description:
            "In learning/week-10, make two commits of your own and write a lesson response that shows the log and explains one message.",
          requirements: [
            "The repository was created with git init inside learning/week-10, not in your home folder.",
            "git log --oneline shows at least two commits, and the messages name what changed.",
            "The written response includes the pwd path, the two messages, and one sentence on why save and commit are different.",
          ],
          deliverables: [
            "A lesson response with the path, the log messages, and your explanation. Keep the files in learning/week-10.",
          ],
          submission:
            "Paste the response into the lesson homework box. This is a lesson response. The GitHub repository is the week assignment after the next session.",
          criteria: [
            "Both messages are specific enough that a classmate could guess what changed.",
            "The explanation correctly keeps Save on the file and commit on the local history.",
          ],
          submissionKind: "lesson_response",
        },
        summary: [
          "Save updates a file. A commit records a snapshot of staged files with a message, on this computer.",
          "A repository is the project folder plus the hidden .git history. git init creates that history in the current folder.",
          "Git is installed differently on Windows, macOS, and Linux. git --version in a new terminal is the shared check.",
          "status, add, commit, and log are the working loop. The message should name the change.",
        ],
        nextLesson: {
          title: "GitHub and sharing",
          lessonSlug: "github-and-sharing",
          why: "The commits you made stay on this computer. Next you will put a copy on GitHub and bring that copy back with clone and pull.",
        },
      },
      guide: {
        sessionNumber: 19,
        week: 10,
        title: "Version control and Git",
        durationMinutes: 90,
        objectives: [
          "Students can separate Save from commit without using a website.",
          "Each student installs Git on the system they brought and can show git --version.",
          "Each student has two commits in learning/week-10 with readable messages.",
        ],
        tools: [
          "Git, installed during the session if needed",
          "Windows PowerShell, macOS Terminal, or a Linux terminal",
          "Visual Studio Code and the learning/week-10 folder",
        ],
        preparation: [
          "Install Git on the instructor machine and prepare a learning/week-10 folder with two commits so the log is ready to show.",
          "Keep the Windows installer, the macOS developer-tools prompt, and a Linux package command written on a slide or paper. Do not show one install command as if it were universal.",
          "Know how to leave Vim with :q! in case a student commits without -m.",
        ],
        flow: [
          {
            minutes: 5,
            title: "The smudged letter",
            detail:
              "Hold up the letter-draft story. Ask what page-final-final usually means in a shared folder. Tell the class that today stays on this computer: no accounts and no upload. The aim is two labelled snapshots in learning/week-10.",
          },
          {
            minutes: 15,
            title: "Desk, box, and sealed snapshot",
            detail:
              "Draw the working tree, the staging area, and a commit. Point at .git as the history book, not as junk. Say that git init in the home folder is the mistake to avoid. Have students say pwd before any init.",
          },
          {
            minutes: 20,
            title: "Install by system",
            detail:
              "Split the room by operating system if you can. Walk Windows through the Git for Windows PATH screen, macOS through git --version and the developer tools prompt, and Linux through the matching package command. Everyone opens a new terminal and reads a version line aloud.",
          },
          {
            minutes: 30,
            title: "Two commits",
            detail:
              "Students create learning/week-10, run git init, save market-note.txt, and cycle through status, add, and commit. Then they edit the note and commit again. Visit anyone whose pwd is not the project folder before they commit. Ask each person to read both log lines.",
          },
          {
            minutes: 10,
            title: "Messages worth keeping",
            detail:
              "Put the messages update, stuff, and Add Saturday market note on the board. Ask which one a person could use next month. Students rewrite a weak message in their notes. They do not amend the commit.",
          },
          {
            minutes: 10,
            title: "Checks and the local history",
            detail:
              "Ask the four knowledge checks. Collect the short message in writing. Point homework at the lesson response: path, two messages, and the save-versus-commit sentence. Preview that GitHub is a shelf for a copy, not a different kind of commit.",
          },
        ],
        explain: [
          "Save writes the file. add stages it. commit records it locally. Nothing in that loop uploads.",
          "pwd before init. The repository should be learning/week-10.",
          "Install steps differ. The version check is git --version in a new terminal.",
          "A message names the change in one sentence.",
        ],
        questions: [
          "If you save three times and never commit, what will git log show after the first commit of the final file?",
          "Why is a file listed as untracked rather than modified?",
          "What is wrong with running git init in the folder that contains all of your personal documents?",
        ],
        demonstration:
          "Show a failed story first: save a file, refresh nothing, and show that git log cannot run until init. Then commit once, edit one line, and commit again so the class sees two lines in git log --oneline.",
        practice:
          "Students write stall.txt, leave it untracked long enough to read status, then make two commits with their own messages. The stretch task critiques a message without rewriting history.",
        expectedOutcomes: [
          "git --version works in a newly opened terminal on each student's computer.",
          "learning/week-10 has a .git directory and at least two commits.",
          "Students can say that GitHub has not been involved yet.",
        ],
        difficulties: [
          {
            issue: "The student ran git init in the home folder and is afraid to touch anything.",
            help:
              "Do not delete folders in a hurry. Run pwd and ls. If .git is in the home directory and they have no commits they need, remove only that .git with the instructor watching, then cd into learning/week-10 and init there. If they already committed personal files, stop and inspect git log before any deletion.",
          },
          {
            issue: "The student is inside Vim and thinks the terminal is broken.",
            help:
              "Stand with them and type :q! then Enter. Explain that this editor is not the lesson. Repeat the commit with -m and quotes. Offer the Windows installer editor option only if they have not finished setup.",
          },
        ],
        homework:
          "Lesson response from learning/week-10: pwd, two log messages, and a sentence that separates Save from commit. Do not require a GitHub link today.",
        assessment:
          "The four checks cover save versus commit, the word untracked, the order save-add-commit, and a specific message. A student who inits the home folder needs a path correction before they leave.",
        recap:
          "Ask one student to retell the desk, the box, and the sealed snapshot using their market note. End by saying the history book is still on this desk. Next session carries a copy to a shared shelf.",
        knowledgeCheckAnswers: [
          {
            id: "w10-git-save",
            answer: "The file on disk is updated, and a commit happens only if you add and commit.",
            explanation:
              "Save writes the working tree. Git records a snapshot only after add and commit. Save does not upload and does not delete .git.",
          },
          {
            id: "w10-git-status",
            answer: "True",
            explanation:
              "Untracked means Git sees a file that is not yet in the repository history. Modified is for a tracked file that changed after a commit.",
          },
          {
            id: "w10-git-order",
            answer: "save, then add, then commit",
            explanation:
              "The editor saves, git add fills the staging area, and git commit seals the snapshot. Push is not part of this session.",
          },
          {
            id: "w10-git-message",
            answer:
              "Record the market opening time. The word update does not say which fact changed, so the log cannot be scanned later.",
            explanation:
              "Accept any one-sentence message that names the opening time or the note. It should reject a bare update because the label would fit every commit.",
          },
        ],
      },
    },
    {
      slug: "github-and-sharing",
      sessionNumber: 20,
      title: "GitHub and sharing",
      estimatedMinutes: 90,
      difficulty: "Guided practice",
      requiresOs: true,
      content: {
        overview: {
          about:
            "This lesson explains GitHub as a place that stores a copy of a Git repository. You will create an account and a repository, connect the local folder, push commits, pull new commits, clone a repository onto a computer, and write a README that tells another person what the files are.",
          why: "A history that exists on only one computer is lost if that computer is unavailable. A remote copy also lets you show the HTML, CSS, and JavaScript you have already built.",
          alreadyKnow:
            "You can init a folder, read git status, and make a commit with a message on your own computer.",
        },
        objectives: [
          "Explain how Git on your computer differs from GitHub on the web.",
          "Create a GitHub repository and connect it to a local repository with a remote named origin.",
          "Push commits to GitHub and pull commits that were made on the website.",
          "Clone a repository into a new folder and name what clone copies.",
          "Write a README that lists the projects in the repository and how to open them.",
        ],
        prerequisites: [
          {
            label: "A local repository with at least one commit, created with Git.",
            lessonSlug: "version-control-and-git",
          },
        ],
        teachingNotes: [
          {
            heading: "What GitHub is",
            markdown: `GitHub is a website that stores Git repositories and shows them in a browser. Your repository on GitHub is a remote copy. Remote means "not the folder on this desk". The local repository remains the folder you have been committing in, such as \`learning/week-10\`.

GitHub exists because sending project folders by hand does not scale. Emailing a zip file loses the commit messages, or it sends a pile of copies nobody can line up. A host such as GitHub keeps the history and gives each repository an address. You can open that address, read the files, and download the history onto another machine.

The problem it solves for this course is practical. You have HTML, CSS, and JavaScript from earlier weeks. They live in a learning folder on one computer. GitHub lets you keep a named copy, with the README and the commits, that you can reach from a lab computer or show to an instructor. It also prepares you for the day two people work on one project.

How it works at beginner scale: you create an account, you create an empty repository on the site, you connect your local repository to that address, and you push your commits. Push uploads commits. It does not mean "upload whatever is unsaved in the editor". Uncommitted edits stay local until you commit them and push again.

GitHub is not the only host that can store a Git remote. It is the one this course uses so the class shares one set of screens. The Git commands you learn also appear, with the same ideas, when a remote lives somewhere else.

:::misunderstanding GitHub is a different Git that only runs in the browser
The website is a place to store and browse a repository. The commits are still Git commits. You create them locally with the commands you already used. The browser is where you create the empty remote and where you read the result after a push.
:::

:::example The library shelf
Git is the notebook of snapshots on your desk. GitHub is a shelf in a library where a copy of the notebook can sit. Commit writes a page in the notebook. Push carries the new pages to the shelf. The desk notebook does not vanish when the shelf has a copy.
:::`,
          },
          {
            heading: "Git and GitHub are not the same thing",
            markdown: `Git is the program on your computer. You already ran it. It does not require an account. \`git commit\` talks to the \`.git\` folder beside your files. You can commit on a train with no network, and the history grows.

GitHub is a company and a website. An account is an identity on that website. A GitHub repository is a remote stored under that account. Creating an account does not install Git. Installing Git does not create an account. Students often blur these because people say "put it on Git" when they mean "push it to GitHub".

Why keep the words apart? When something fails, the fix depends on which half failed. If \`git status\` says you are not in a repository, that is a local Git problem. If \`git push\` asks you to sign in and then rejects the password, Git is running, and the remote account is the problem. One confused word makes people reinstall Git when they needed a sign-in.

The connection between them is the remote. A remote is a named address of a repository that is somewhere else. The usual name is \`origin\`. The name is local. It is a bookmark in your \`.git\` folder pointing at a URL. \`git remote -v\` prints the bookmark. If it prints nothing, you have local commits only, which was the correct state at the end of the previous lesson.

A beginner misunderstanding is to think every commit is public the moment it is created. A commit becomes visible on your GitHub repository when you push it, and only if that repository is public. This course uses a public repository for the assignment so an instructor can open the link. Do not put private information in it.

:::warning Public means readable
A public GitHub repository can be opened by other people. Commit course projects and a README. Do not commit passwords, identity numbers, or private notes.
:::`,
          },
          {
            heading: "Accounts, repositories, and remotes",
            markdown: `Create a GitHub account in the browser with an email you can open. Choose a password you can remember. GitHub will ask you to verify the email. The free account is enough for this lesson. The account is yours. The instructor does not need your password.

A repository on GitHub has a name and an owner. For the assignment, use the name \`learning-portfolio\`. The full name looks like your account name, a slash, and \`learning-portfolio\`. The site then offers an HTTPS address ending in \`.git\`. HTTPS is the web address Git will use. Copy that address from the page GitHub shows you. Do not invent one by guessing the spelling.

When the local folder already contains commits, create the GitHub repository without adding a README, a license, or a gitignore on the website. Those ticks create a first commit on GitHub. Your laptop already has a first commit. Two unrelated first commits are harder to join on day one. Leave the ticks off, then push your existing history.

If you would rather start from the website, there is a second valid path. Create the repository with a README, clone it to a new folder, and copy your project files into that clone. You will practise clone either way. Pick one path for the first push so you do not follow both at once.

Connecting is one command, run inside the local repository:

\`\`\`text
git remote add origin https://github.com/ACCOUNT/learning-portfolio.git
\`\`\`

Use the address GitHub copied for you, not the word ACCOUNT. \`origin\` is only the nickname. \`git remote -v\` should then show that address for fetch and for push. Fetch is the idea of downloading. Push is the upload. You will use pull, which fetches and then joins the downloaded commits to your current branch.

\`git branch -M main\` renames the current branch to \`main\` if an older Git created \`master\` instead. The \`-M\` flag renames even if the name already exists. After this, you and GitHub are both talking about \`main\`.

:::misunderstanding origin is a special server
origin is a nickname stored on your computer. You could call the remote something else. This course uses origin because GitHub's instructions and most examples use it. The important part is the HTTPS address beside the nickname.
:::`,
          },
          {
            heading: "Push, pull, and clone",
            markdown: `\`git push -u origin main\` sends your local \`main\` commits to the remote named origin, and \`-u\` remembers that this branch tracks origin's \`main\`. Next time, \`git push\` is enough while you stay on \`main\`. After a successful push, refresh the repository page in the browser. You should see your files and your commit messages.

Push sends commits, not uncommitted edits. If the browser does not show a new sentence, check \`git status\`. A modified file has not been committed. Commit it, then push again. If the browser still shows the old file, you may be looking at a different repository or a different branch. Read the account name and the repository name in the address bar.

\`git pull\` brings commits from the remote into the current branch. You need it when the remote has something you do not have. That happens if you edit a file on the GitHub website, or if you pushed from a different computer. The safe habit in this course is: pull at the start of a work session, then edit, commit, and push.

A pull can stop if the same lines were changed in both copies. That stop is a merge conflict. Git refuses to guess which sentence should win. This session does not practise repairing conflicts. You can avoid most of them this week by pulling first and by editing each file in one place at a time. If a conflict appears, stop and ask the instructor rather than deleting the repository.

\`git clone\` copies a remote repository onto this computer. The copy includes the files, the commits, and a remote already named origin. You use clone when the project starts on GitHub, or when you want the work on a second computer. Run clone in the parent folder, not inside a folder that is already that repository.

\`\`\`text
cd learning
git clone https://github.com/ACCOUNT/learning-portfolio.git week-10-clone
\`\`\`

That creates \`learning/week-10-clone\` as a second copy. It does not delete \`learning/week-10\`. Two folders can hold the same project. Be careful about editing both without pulling. For the assignment, choose one folder as the copy you will keep using, and say which one in the README.

Signing in is the part that differs by system. Git for Windows includes a credential manager that can open a browser window. macOS often opens a browser or a keychain prompt. On many Linux setups, Git asks for a username and a password in the terminal. GitHub does not accept your account password in that password slot. You create a personal access token on the GitHub website and paste the token when the terminal asks for a password. The demonstration splits those steps. The words \`git push -u origin main\` stay the same.

:::example A second desk
Clone is a photocopier for the notebook. The shelf copy stays. A new desk gets a full notebook with the same page history. Push from either desk updates the shelf. Pull updates the desk you are sitting at. Neither action edits a file for you. You still do that in the editor.
:::`,
          },
          {
            heading: "A README people can use",
            markdown: `A README is a file named \`README.md\` in the project folder. GitHub renders it on the repository home page. The \`.md\` extension means Markdown, a small set of writing marks. A line that starts with \`#\` is a heading. A line that starts with \`- \` is a bullet. You already read Markdown-like structure in lesson notes. This file is the one a visitor sees first.

Why does it exist? A repository full of files does not explain itself. Someone opening \`learning-portfolio\` needs to know what the work is, which folders are earlier course pages, and how to open a page in a browser. The README answers that without making them read every file.

The problem it solves is the blank first screen. GitHub shows the README above the file list when the file is on the default branch. If there is no README, the visitor sees filenames only. \`index.html\` might be obvious to you and opaque to someone else.

How to write the one for this week:

1. A heading with the repository name.
2. Two or three sentences on what the repository contains.
3. A list of folders, each with what is inside, such as a market page or a counter.
4. The steps to open a page: go into the folder and open the HTML file in a browser. Mention that Windows, macOS, and Linux all open a local HTML file from the file manager.
5. The command \`git pull\` as the way to update a clone later.

Keep it true. Do not describe projects you did not add. Write it locally, commit it with a message such as "Add a README for the course projects", and push. Then refresh GitHub and read it as if you were a stranger.

\`\`\`md
# Learning portfolio

Course pages from the first half of the year, with their Git history.

## Projects

- projects/market stores the Saturday market HTML page.
- projects/counter stores the interactive counter.

Open index.html in a browser from the project folder.
\`\`\`

:::misunderstanding The README is a special Git database
It is a normal file. It is committed and pushed like \`market-note.txt\`. GitHub only displays it in a friendly way because of the filename. If you do not commit it, the website cannot show it.
:::`,
          },
          {
            heading: "Basic collaboration and earlier projects",
            markdown: `Collaboration, at this stage, means more than one copy of the same repository can exchange commits. You might be both people: the laptop and the lab computer. Or you and a classmate might look at the same public repository. The exchange is push and pull. There is no separate "share" button inside \`git commit\`.

A careful beginner pattern is:

1. \`git pull\` so your desk matches the shelf.
2. Edit different files, or take turns on one file.
3. Save, status, add, commit, and push.
4. The other copy pulls before it edits again.

If both copies change the same lines and both try to push, the second push is rejected because the remote has commits you do not have. Pull first. If Git then reports a conflict, stop and get help. The conflict markers are lines Git inserts into the file. They are not part of your page. This course does not grade conflict repair.

The practice for the assignment is to gather earlier work into the repository. Create a \`projects\` folder. Copy, do not move unless you mean to, a small HTML page, a stylesheet, and a JavaScript file from previous weeks. The week 9 counter is a strong choice if you have it. Copying leaves the original folder alone so you do not lose the path you used in class.

Use portable paths inside the README, such as \`projects/counter/counter.html\`. Do not write a path that starts with one computer's user folder. A path that starts at the repository will still make sense after a clone onto another machine.

Commit the copied projects in a readable way. One commit for "Add the market page" and another for "Add the interactive counter" is clearer than one commit called "old work". Push at the end, open the GitHub page, and click through the folders. If the browser can show the file text, the push worked. Opening the HTML as a rendered page from GitHub is a separate topic. For this week, success is the files and the README on the repository, plus a local clone or pull that matches.

:::tip Copy, then commit from the portfolio folder
After you copy files in, run pwd. You want the repository root, the folder that contains .git, or you want to know that Git can see the nested files. git status from the root should list the new project files before you add them.
:::

:::example What a classmate can do
A classmate clones your public repository, reads the README, and opens the counter HTML in a browser. They can commit in their clone only if you give them write access. Reading a public repository does not let them push to your account. That boundary is useful. They can study the files without being able to rewrite your history.
:::`,
          },
        ],
        vocabulary: [
          {
            term: "GitHub",
            definition:
              "A website that stores Git repositories so a project can be browsed and copied from more than one computer.",
          },
          {
            term: "remote",
            definition:
              "A named address of a repository that is not the folder you are standing in. This course nicknames that address origin.",
          },
          {
            term: "origin",
            definition:
              "The usual local nickname for the GitHub address of your repository. git remote -v prints the nickname and the URL.",
          },
          {
            term: "push",
            definition:
              "The command that sends your committed snapshots to the remote. It does not upload unsaved editor text.",
          },
          {
            term: "pull",
            definition:
              "The command that downloads new commits from the remote and joins them into the branch you have checked out.",
          },
          {
            term: "clone",
            definition:
              "A command that copies a remote repository onto this computer, including history and an origin remote already set.",
          },
          {
            term: "README",
            definition:
              "A README.md file that explains the repository. GitHub shows it on the project page after it has been pushed.",
          },
        ],
        demonstrations: [
          {
            title: "Create the remote and push main",
            intro:
              "Create an empty GitHub repository, point origin at it, and push the commits from learning/week-10. The Git commands match. The sign-in step follows your operating system.",
            steps: [
              "Sign in to GitHub in a browser. Create a new repository named learning-portfolio.",
              "Leave README, license, and gitignore unticked so GitHub does not create a competing first commit.",
              "Copy the HTTPS address ending in .git from the new repository page.",
              "In a terminal, cd into the local repository you committed in last session. Run pwd.",
              "Run git remote add origin and paste the HTTPS address. Run git remote -v and read it back.",
              "Run git branch -M main, then git push -u origin main, and complete the sign-in steps for your system.",
              "Refresh the GitHub repository page and confirm the files and commit messages are visible.",
            ],
            expected:
              "The browser shows the files from the local repository and the commit messages from git log. git status on the computer still reports a clean working tree.",
            verify:
              "Run git remote -v and confirm the address contains your account and learning-portfolio. On the website, open market-note.txt or index.html and compare a sentence with the local file.",
            ifItFails:
              "If Git says origin already exists, run git remote -v before you add it again. If the push is rejected because the remote has commits you do not have, you ticked README on GitHub. Create a fresh empty repository or follow the clone path in the next demonstration. If sign-in fails, use the operating-system steps rather than reinstalling Git.",
            os: {
              sameOnAllPlatforms:
                "Inside the local repository, run git remote add origin followed by the HTTPS address, then git branch -M main and git push -u origin main. The sign-in that follows is not the same on every system.",
              identify: [
                "Check the Apple menu, the Windows start logo, or the Linux about page before you follow a sign-in step.",
                "A browser login and a terminal password prompt are different. Read which one your system opened.",
              ],
              windows: [
                "Open PowerShell with the Windows key, cd into the repository, and run the remote and push commands.",
                "When Git Credential Manager opens a window, sign in to GitHub in that window and approve access. You should not need to paste an account password into PowerShell.",
              ],
              macos: [
                "Open Terminal with Command-Space, cd into the repository, and run the remote and push commands.",
                "Complete the browser or keychain prompt that macOS opens. Approve Git to store the GitHub sign-in if the system asks.",
              ],
              linux: [
                "Open Terminal, cd into the repository, and run the same remote and push commands.",
                "If Git asks for a username and password in the terminal, the password slot needs a GitHub personal access token. Create one under GitHub settings, Developer settings, Personal access tokens, with access to the repository. Paste the token when Git asks for a password. The account password will be rejected.",
              ],
            },
          },
          {
            title: "Clone, add a README, and pull",
            intro:
              "Clone the repository into a new folder, add a README and one earlier project, push, then pull that change into the original folder. Commands match. Opening the terminal does not.",
            steps: [
              "Change to the learning folder, not into the existing repository, and run git clone with the HTTPS address and the folder name week-10-clone.",
              "Copy one earlier HTML, CSS, or JavaScript project into week-10-clone/projects. Use a copy so the original class folder stays put.",
              "Add README.md at the root of the clone. List the project and say to open its HTML file from the file manager.",
              "Run git status, add the new files, and commit with a message that mentions the README.",
              "Push using the sign-in method you already used. Refresh GitHub and read the README on the repository home page.",
              "In the original learning/week-10 folder, run git pull. Confirm the README arrived there too.",
            ],
            expected:
              "GitHub renders the README. Both local folders contain that file after the pull. The projects folder is visible on the website.",
            verify:
              "In each folder, run git log --oneline and compare the top message. They match after the pull. The website shows the same message at the top of the commit list.",
            ifItFails:
              "If clone says the folder already exists and is not empty, choose a new folder name. If pull reports unrelated histories, the two folders were not copies of the same repository. Stop and compare git remote -v in both places with the instructor. If the README does not render, confirm the filename is exactly README.md and that the commit was pushed.",
            os: {
              sameOnAllPlatforms:
                "git clone, git add, git commit, git push, and git pull are the same commands on every system once you are in the right folder. Replace nothing in the command except the HTTPS address you copy from your own repository.",
              identify: [
                "Use the same system check as the install lesson if you are about to open a terminal.",
                "File managers differ, but the relative path projects/your-page/index.html means the same after a clone.",
              ],
              windows: [
                "Open PowerShell, cd into the learning folder, and run git clone with your HTTPS address and the destination folder week-10-clone.",
                "Use File Explorer to copy an older project into week-10-clone\\projects. Then return to PowerShell inside week-10-clone for status, commit, and push.",
              ],
              macos: [
                "Open Terminal, cd into the learning folder, and run the same git clone command with your HTTPS address.",
                "Use Finder to copy an older project into the projects folder inside the clone. Commit and push from Terminal, not from Finder.",
              ],
              linux: [
                "Open Terminal, cd into the learning folder, and run the same git clone command.",
                "Use the Files app to copy an older project into the clone, or use cp if you already know the source path. Commit and push from the terminal. Use a personal access token if Git asks for a password again.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "README for the portfolio",
            filename: "README.md",
            language: "markdown",
            level: "basic",
            code: `# Learning portfolio

This repository keeps course pages and their commit history.

## Projects

- projects/market is an HTML page for the Saturday market.
- projects/counter is the interactive counter with increase, decrease, and reset.

## Open a page

Go into the project folder and open its HTML file in a browser. That works on Windows, macOS, and Linux.

## Update a copy

In a clone of this repository, run git pull before you edit.
`,
            explanation:
              "The README is ordinary Markdown committed at the root of the repository. The paths start at the repository, so they still make sense after someone else clones the project.",
            lineNotes: [
              {
                focus: "Heading",
                note: "The single hash becomes the title GitHub shows for the file.",
              },
              {
                focus: "Project bullets",
                note: "Each bullet names a folder and what a visitor will find. Do not list folders you did not add.",
              },
              {
                focus: "git pull sentence",
                note: "Tells a second computer how to catch up. It assumes they already cloned.",
              },
            ],
            expectedOutput:
              "After this file is pushed, the GitHub repository home page shows the heading Learning portfolio and the project list without requiring the visitor to open the file first.",
          },
          {
            title: "A project page inside the portfolio",
            filename: "projects/market/index.html",
            language: "html",
            level: "improved",
            code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Saturday market</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Saturday market</h1>
  <p>Opening time: 8:00.</p>
</body>
</html>
`,
            explanation:
              "This is a normal HTML file in a subfolder. The stylesheet link is a filename in that same folder, so the page still works after a clone. It does not point at a private user directory.",
            lineNotes: [
              {
                focus: "link href",
                note: "styles.css sits beside index.html inside projects/market. A path that starts with a disk name would break on another computer.",
              },
              {
                focus: "heading",
                note: "Matches the project the README calls projects/market, so the document and the page agree.",
              },
            ],
            expectedOutput:
              "Opened from the file manager, the browser shows Saturday market and the opening time. On GitHub, the file is visible under the projects/market folder.",
          },
          {
            title: "Stylesheet beside the market page",
            filename: "projects/market/styles.css",
            language: "css",
            level: "practical",
            code: `body {
  font-family: Georgia, serif;
  margin: 24px;
}

h1 {
  color: #1f4b3a;
}
`,
            explanation:
              "The CSS is the same kind of file you wrote in the layout weeks. Committing it next to the HTML means a classmate who clones the repository gets the colour as well as the words.",
            lineNotes: [
              {
                focus: "font-family",
                note: "Georgia is a common font. The serif backup is there if Georgia is missing on a computer.",
              },
              {
                focus: "h1 colour",
                note: "A small, visible rule lets you confirm that the stylesheet, not only the HTML, was pushed.",
              },
            ],
            expectedOutput:
              "The market heading is green when index.html is opened in a browser and styles.css is in the same folder.",
          },
        ],
        exercises: [
          {
            title: "Read the remote",
            difficulty: "warm-up",
            prompt:
              "After you add origin, prove to yourself which repository it points at before you push.",
            steps: [
              "Run git remote -v in the local repository.",
              "Copy the HTTPS address into your notes.",
              "Open that repository in the browser and check that the account name is yours.",
            ],
            expectedOutcome:
              "Your notes contain an HTTPS address whose path ends with the repository you created, and you have seen that page in the browser.",
          },
          {
            title: "Push one project",
            difficulty: "practice",
            prompt:
              "Add one earlier course page to the repository and make it visible on GitHub.",
            steps: [
              "Copy the page into a projects folder inside the repository you will push.",
              "Commit with a message that names the page.",
              "Push, then refresh GitHub and open the file there.",
            ],
            expectedOutcome:
              "The file is visible on GitHub, and the newest commit message on the website matches your local git log.",
          },
          {
            title: "Update the other copy",
            difficulty: "stretch",
            prompt:
              "Change the README on GitHub in the browser, then bring that change into a local folder without retyping it.",
            steps: [
              "Edit the README on the website and save the commit there with GitHub's editor.",
              "In your local clone or original folder, run git pull.",
              "Open README.md locally and find the sentence you added on the website.",
            ],
            expectedOutcome:
              "The local README contains the website edit, and git log shows the commit that was created on GitHub.",
          },
        ],
        troubleshooting: [
          {
            problem: "git push is rejected and mentions non-fast-forward or fetch first.",
            why: "The remote has a commit your local branch does not have. That often happens when the GitHub repository was created with a README tick.",
            solution:
              "Run git pull and read the result. If Git talks about unrelated histories, stop. Create a new empty repository without a README, or clone the existing one into a fresh folder and copy your files in. Do not delete your local project folder.",
          },
          {
            problem: "The terminal says authentication failed, or the password was rejected.",
            why: "Git reached GitHub, and the sign-in was refused. On Linux this is often because the account password was used where a personal access token is required.",
            solution:
              "On Windows or macOS, reopen the credential prompt and sign in through the browser window. On Linux, create a personal access token on GitHub and paste it when Git asks for a password. Do not reinstall Git for a rejected password.",
          },
          {
            problem: "The README does not appear on the repository home page.",
            why: "The file is missing, misnamed, not committed, or not pushed. GitHub looks for README.md on the default branch.",
            solution:
              "From the repository root, run ls and git status. The name must be README.md. Commit it if it is untracked or modified, push, and refresh the browser. Confirm you are looking at the same account and repository as git remote -v.",
          },
          {
            problem: "A cloned page looks unstyled, or a link points at a missing file.",
            why: "The HTML uses a path from the old computer, or the CSS file was not copied into the repository.",
            solution:
              "Open the link in the HTML. Use a relative path such as styles.css or projects/market/styles.css. Copy the missing file in, commit, and push. Avoid paths that start with a single user's home folder.",
          },
        ],
        knowledgeChecks: [
          {
            id: "w10-hub-diff",
            format: "Multiple choice",
            question: "Which statement keeps Git and GitHub apart?",
            options: [
              "Git is the program that commits on your computer. GitHub is a website that can store a copy of the repository.",
              "GitHub is the install file for Git on Windows.",
              "A commit is public as soon as you run git commit.",
              "git init creates a GitHub account.",
            ],
          },
          {
            id: "w10-hub-push",
            format: "True or false",
            question: "git push uploads edits that are still unsaved in the editor.",
          },
          {
            id: "w10-hub-clone",
            format: "Multiple choice",
            question: "What does git clone give you?",
            options: [
              "Only a zip of the newest files, with no commits and no remote.",
              "A new local repository that includes the history and an origin remote.",
              "A GitHub account password.",
              "A replacement for git add.",
            ],
          },
          {
            id: "w10-hub-readme",
            format: "Short answer",
            question:
              "Name two things a classmate should be able to learn from your README without opening every file, and say why a path that starts with your user folder is a poor link.",
          },
        ],
        homework: {
          description:
            "Complete the week assignment: a GitHub repository that contains earlier course projects and a README. Use the repository you started in this session if it already matches the requirements.",
          requirements: [
            "The repository is on GitHub and the instructor can open the link.",
            "Earlier HTML, CSS, and JavaScript work is in the repository, with a README that lists it.",
            "The newest work is committed and pushed, so the website and git log agree.",
          ],
          deliverables: [
            "The GitHub link and the local folder path, submitted with the module assignment.",
          ],
          submission:
            "Submit the assignment for this week. The lesson response from the Git session stays in that lesson. This session's homework is the module assignment.",
          criteria: [
            "The README is visible on GitHub and names real folders in the repository.",
            "At least one page, one stylesheet, and one script are present, or a note explains which earlier project already combined them.",
          ],
          submissionKind: "module_assignment",
        },
        summary: [
          "Git commits on your computer. GitHub stores a remote copy you reach with a repository address.",
          "origin is the local nickname for that address. Push sends commits. Pull brings remote commits back.",
          "Clone copies a remote repository onto a computer, history included.",
          "A README.md file explains the projects in portable paths and is itself a committed file.",
        ],
        nextLesson: {
          title: "Introduction to TypeScript",
          lessonSlug: "introduction-to-typescript",
          why: "Your pages now have a history you can share. Next you will add types to JavaScript so values and function inputs are named before the code runs.",
        },
      },
      guide: {
        sessionNumber: 20,
        week: 10,
        title: "GitHub and sharing",
        durationMinutes: 90,
        objectives: [
          "Students can say what stays local at commit time and what push adds.",
          "Each student pushes a repository they can open in a browser.",
          "A README lists real project paths that survive a clone.",
        ],
        tools: [
          "The Git install from the previous session",
          "A browser signed in to GitHub",
          "A local repository in the learning folder",
        ],
        preparation: [
          "Create a throwaway empty GitHub repository and practise the push once, including the sign-in method on the classroom operating system.",
          "Prepare a one-page reminder that Linux terminal passwords need a personal access token, while Windows and macOS can use the browser credential prompt.",
          "Have a small HTML, CSS, and JavaScript sample ready to copy, in case a student cannot find an earlier week folder.",
        ],
        flow: [
          {
            minutes: 5,
            title: "Desk and shelf",
            detail:
              "Ask someone to explain their two local commits without mentioning a website. Then introduce the shelf. Write Git and GitHub as two headings and refuse to let them collapse into one word. State that today's result is a public link and a README.",
          },
          {
            minutes: 15,
            title: "Empty remote on purpose",
            detail:
              "Show the new-repository screen and point at the README tick. Explain that ticking it creates a commit you do not have locally. Leave it off for the path that pushes an existing folder. Mention clone as the other legal path, and tell students to pick one.",
          },
          {
            minutes: 20,
            title: "Push with the right sign-in",
            detail:
              "Students add origin and push main. Walk Windows and macOS through the browser credential window, and Linux through creating a token if the terminal asks for a password. Do not have the class paste account passwords into the terminal. Check git remote -v against the browser address bar.",
          },
          {
            minutes: 30,
            title: "Projects and README",
            detail:
              "Students copy one or more earlier pages into projects, write README.md with relative paths, commit, and push. Then they pull in the other folder or clone fresh and show the README on GitHub. Visit paths that contain a username or a drive letter and have the student replace them.",
          },
          {
            minutes: 10,
            title: "Pull before you edit",
            detail:
              "Change one README word on GitHub and have the class pull. Say, briefly, that a conflict means both copies edited the same lines, and that repair is not the task today. The habit is pull, then edit, then commit, then push.",
          },
          {
            minutes: 10,
            title: "Checks and the assignment",
            detail:
              "Ask the four knowledge checks. The short answer must name two README facts and reject a user-folder path. Point homework at the module assignment: the GitHub link, the projects, and the README. Preview TypeScript as labels on values, not as a new history tool.",
          },
        ],
        explain: [
          "Commit is local. Push publishes commits that already exist.",
          "An empty GitHub repository avoids a second first commit.",
          "Clone copies history and sets origin.",
          "README.md is a normal committed file with portable paths.",
        ],
        questions: [
          "Why can git commit succeed while the GitHub page stays unchanged?",
          "What does git remote -v prove that the browser address bar should match?",
          "Why would a link that starts with one student's home folder fail after a classmate clones the repository?",
        ],
        demonstration:
          "Push a repository that has two local commits, refresh GitHub, then edit the README on the website and pull that commit back into the original folder so both directions are visible.",
        practice:
          "Students place an earlier HTML, CSS, and JavaScript project into the portfolio, describe it in the README, push, and open the file on GitHub. Stretch students pull a website edit into the other local copy.",
        expectedOutcomes: [
          "Each student can open their repository URL and see a commit they made.",
          "README.md renders on that page and lists a real folder.",
          "Students can say whether a rejected password is a sign-in problem rather than a missing Git install.",
        ],
        difficulties: [
          {
            issue: "The student ticked Add a README and the push was rejected.",
            help:
              "Do not tell them to force the push. Either delete that unused GitHub repository and create it again with the ticks off, or clone it and copy their local files into the clone, then commit and push from the clone. Confirm which folder they will use afterwards.",
          },
          {
            issue: "The student pasted their GitHub password into a Linux terminal and it was rejected.",
            help:
              "Explain that the password prompt is asking for a personal access token. Help them create a token with repository access and paste the token once. Clear the rejected secret from the screen if it is still visible. They do not need a new Git install.",
          },
        ],
        homework:
          "Module assignment: public learning-portfolio repository with earlier projects and a README of relative paths. The link is the submission, plus a note of the local folder they push from.",
        assessment:
          "Checks cover the Git versus GitHub split, what push does not upload, what clone includes, and what a README is for. Look at one real repository link before the session ends if time allows.",
        recap:
          "Ask a student to walk the class from a saved file to a commit to a push to a classmate's clone, using the desk and shelf words. Name TypeScript as the next labelling tool, not as another remote.",
        knowledgeCheckAnswers: [
          {
            id: "w10-hub-diff",
            answer:
              "Git is the program that commits on your computer. GitHub is a website that can store a copy of the repository.",
            explanation:
              "An account and a website are not the Git program. A commit stays local until a push. git init does not create an account.",
          },
          {
            id: "w10-hub-push",
            answer: "False",
            explanation:
              "Push sends commits. Unsaved editor text is not a commit, and even a saved file waits until add and commit.",
          },
          {
            id: "w10-hub-clone",
            answer: "A new local repository that includes the history and an origin remote.",
            explanation:
              "Clone is a full copy of the Git repository plus the remote bookmark. It is not an account password and it does not stage files for you.",
          },
          {
            id: "w10-hub-readme",
            answer:
              "What the repository contains and how to open a page. A user-folder path exists only on one computer, so a clone on another machine cannot follow it.",
            explanation:
              "Accept any two useful facts, such as the project list and the update command. The path point should say the location is specific to one computer.",
          },
        ],
      },
    },
  ],
  assignment: {
    slug: "week-10-assignment",
    title: "GitHub portfolio of earlier projects",
    summary:
      "Publish a GitHub repository that contains earlier HTML, CSS, and JavaScript projects and a README another person can follow.",
    instructions:
      "Create a public GitHub repository named learning-portfolio. The commits must come from Git on your computer, not only from uploads made in the browser. Include at least one HTML page, one CSS file, and one JavaScript file from earlier weeks. The week 9 counter is a good JavaScript piece if you have it. Put them in a projects folder using relative paths, such as projects/counter/counter.html. Do not use a path that starts with your user folder or a drive letter. Write README.md at the root. It should say what the repository is, list each project, and explain how to open a page in a browser on Windows, macOS, or Linux. Commit the README and the projects with messages that name the change, then push to main. The instructor will open the link, read the README, and compare one file with the commit history. In your submission, include the repository URL, the local folder you push from, and the output of git log --oneline for the latest few commits. If a sign-in step failed on the way, say which operating system you used and how you completed it.",
    objectives: [
      "Record course files as Git commits with readable messages.",
      "Push those commits to a GitHub repository you can link to.",
      "Describe the work in a README that still makes sense after a clone.",
    ],
    requirements: [
      "The repository is public and the URL opens without a password.",
      "README.md is visible on the repository home page.",
      "The file list includes HTML, CSS, and JavaScript from earlier course work, in relative paths.",
      "git log on main shows at least two commits whose messages name real changes.",
      "The submission states the local folder and the operating system used for the push.",
    ],
    deliverables: [
      "The GitHub repository URL.",
      "A short note with the local path, the operating system, and the latest git log --oneline lines.",
    ],
    rubric: [
      {
        criterion: "Repository and history",
        points: 25,
        description: "The link opens a Git repository whose commit messages describe the work.",
      },
      {
        criterion: "Earlier projects",
        points: 30,
        description: "HTML, CSS, and JavaScript files are present and use paths that do not depend on one computer's user folder.",
      },
      {
        criterion: "README",
        points: 25,
        description: "The README lists the real projects and says how to open a page.",
      },
      {
        criterion: "Push evidence",
        points: 20,
        description: "The note shows a local folder and a log that matches commits visible on GitHub.",
      },
    ],
    points: 100,
    instructorSolution: `# README.md
# Learning portfolio

Course pages kept with Git. Clone this repository, then open an HTML file from its folder.

## Projects

- projects/market/index.html is the Saturday market page.
- projects/market/styles.css colours the heading.
- projects/counter/counter.html is the interactive counter.

Open the HTML file from the file manager on Windows, macOS, or Linux. In a clone, run git pull before editing.

# projects/market/index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Saturday market</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Saturday market</h1>
  <p>Opening time: 8:00.</p>
  <script src="market.js"></script>
</body>
</html>

# projects/market/market.js
const title = document.querySelector("#stall-count");
if (title !== null) {
  title.textContent = "12 stalls open";
}

# projects/counter/counter.js
let count = 0;
const output = document.querySelector("#count");
const increase = document.querySelector("#increase");
function render() {
  if (output !== null) {
    output.textContent = String(count);
  }
}
if (increase !== null) {
  increase.addEventListener("click", function () {
    count = count + 1;
    render();
  });
}

The matching commands, run inside the repository after origin is set, are:
git add README.md projects
git commit -m "Add the market page, counter, and README"
git push -u origin main
`,
  },
  quiz: {
    slug: "week-10-quiz",
    title: "Git and GitHub quiz",
    passingScore: 70,
    allowRetakes: true,
    questions: [
      {
        slug: "week-10-q1",
        type: "multiple_choice",
        prompt: "What does git commit do?",
        options: [
          { id: "a", text: "It uploads every open editor tab to GitHub." },
          { id: "b", text: "It stores a snapshot of the staged files in the local repository, with a message." },
          { id: "c", text: "It installs Git on Linux only." },
          { id: "d", text: "It deletes the working tree so only .git remains." },
        ],
        correct: { optionId: "b" },
        explanation:
          "A commit writes the staged snapshot into the local .git history. Push is a later step. The files you edit stay in the working tree.",
        points: 2,
      },
      {
        slug: "week-10-q2",
        type: "true_false",
        prompt: "The command that installs Git is the same on Windows, macOS, and Linux.",
        correct: { value: false },
        explanation:
          "Windows uses the Git for Windows installer, macOS often uses the command line developer tools, and Linux uses its package manager. git --version is the shared check, not the shared installer.",
        points: 2,
      },
      {
        slug: "week-10-q3",
        type: "multiple_choice",
        prompt: "A saved file appears in git status as untracked. What does that mean?",
        options: [
          { id: "a", text: "The file is staged and will be in the next commit automatically." },
          { id: "b", text: "Git sees the file in the folder and it is not yet in a commit." },
          { id: "c", text: "The file has been pushed to origin." },
          { id: "d", text: "The file is inside .git and should be edited there." },
        ],
        correct: { optionId: "b" },
        explanation:
          "Untracked means the working tree has a file that history does not contain yet. git add stages it. A push cannot include it until it is committed.",
        points: 2,
      },
      {
        slug: "week-10-q4",
        type: "code_reading",
        prompt: "What is true after these commands succeed inside a new project folder?",
        codeSnippet: `git init
git add market-note.txt
git commit -m "Add Saturday market note"
git log --oneline`,
        options: [
          { id: "a", text: "The folder is a local repository with one commit, and GitHub may still be unchanged." },
          { id: "b", text: "GitHub now has a public repository even if no remote was added." },
          { id: "c", text: "market-note.txt is deleted from the working tree." },
          { id: "d", text: "The command git status can no longer be used." },
        ],
        correct: { optionId: "a" },
        explanation:
          "init, add, and commit are local. log shows that local commit. A remote and a push are required before GitHub shows the file.",
        points: 2,
      },
      {
        slug: "week-10-q5",
        type: "true_false",
        prompt: "origin is a nickname stored in your local repository for a remote address.",
        correct: { value: true },
        explanation:
          "git remote add origin URL saves that bookmark in the local .git data. The nickname is not a separate server, and GitHub does not require the name origin, though this course uses it.",
        points: 2,
      },
      {
        slug: "week-10-q6",
        type: "multiple_choice",
        prompt: "Why might git push be rejected on a brand-new GitHub repository?",
        options: [
          { id: "a", text: "Because git commit always requires a personal access token on macOS." },
          { id: "b", text: "Because the GitHub repository already has a commit, such as a README created on the website, that the local branch does not have." },
          { id: "c", text: "Because README.md files cannot be pushed." },
          { id: "d", text: "Because pwd was run before git status." },
        ],
        correct: { optionId: "b" },
        explanation:
          "Push updates a remote branch only when your history can sit on top of the remote history. A README tick creates a remote commit your local repository may not share.",
        points: 2,
      },
      {
        slug: "week-10-q7",
        type: "short_answer",
        prompt:
          "A classmate will clone your repository onto their own computer. What should the README tell them, and why should the instructions avoid your personal home-folder path?",
        correct: {
          rubric:
            "Award full points if the answer says the README should name the projects and how to open them, and that a home-folder path exists only on one computer so it fails after clone. Award partial points for only one of those two ideas.",
        },
        explanation:
          "The README is the front door. Relative paths such as projects/counter/counter.html still work after clone. A path that includes one user's home folder does not.",
        points: 3,
      },
      {
        slug: "week-10-q8",
        type: "multiple_choice",
        prompt: "Which action updates your laptop with a commit that was created on the GitHub website?",
        options: [
          { id: "a", text: "git init" },
          { id: "b", text: "git pull" },
          { id: "c", text: "git add ." },
          { id: "d", text: "Deleting the local folder and editing .git by hand." },
        ],
        correct: { optionId: "b" },
        explanation:
          "git pull downloads remote commits and joins them to the current branch. add stages local files. init creates a repository. The .git directory should not be edited by hand.",
        points: 2,
      },
      {
        slug: "week-10-q9",
        type: "true_false",
        prompt: "On Linux, if Git asks for a password during push, GitHub will accept the account password in that prompt.",
        correct: { value: false },
        explanation:
          "GitHub rejects the account password in Git's terminal prompt. A personal access token is used in that slot. Windows and macOS often avoid the issue with a browser sign-in.",
        points: 2,
      },
    ],
  },
};
