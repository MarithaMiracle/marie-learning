import type { ModuleSeed } from "../../src/lib/content-types";

export const week01: ModuleSeed = {
  slug: "week-01-computers",
  number: 1,
  weekNumber: 1,
  monthLabel: "Month 1 — Computer fundamentals, HTML and CSS",
  title: "Introduction to computers and software development",
  description:
    "Learn what a computer is, how hardware differs from software, and how websites and mobile applications fit into ordinary life. Then use a browser, folders, and a text editor to save your first course file.",
  lessons: [
    {
      slug: "understanding-computers",
      sessionNumber: 1,
      title: "Understanding computers and software",
      estimatedMinutes: 90,
      difficulty: "Gentle introduction",
      requiresOs: true,
      content: {
        overview: {
          about:
            "This lesson explains what a computer is and how the physical machine differs from the instructions that make it useful. You will meet applications, websites, and mobile applications, then look at what frontend, backend, and full-stack developers actually work on.",
          why: "Every later lesson is about building software. You need clear names for the machine, the instructions, and the people who write those instructions.",
          alreadyKnow:
            "No earlier lesson is required. You only need a computer you can switch on and a memory of software you already use.",
        },
        objectives: [
          "Explain what a computer does in plain language.",
          "Separate hardware from software using examples from your own life.",
          "Tell a website, a mobile application, and an installed application apart.",
          "Describe what frontend, backend, and full-stack developers work on.",
          "Trace one action a person takes in an application through to the result on the screen.",
        ],
        prerequisites: [
          {
            label:
              "No earlier lesson is required. Curiosity and a computer you can look at are enough for this session.",
          },
        ],
        teachingNotes: [
          {
            heading: "What a computer is",
            markdown: `
A computer is a machine that stores information and follows instructions. People write those instructions. The computer does not choose the goal. It carries out the steps it is given, very quickly, and it can repeat them without getting bored or tired.

You already use computers, even if you have never studied them. A laptop is a computer. A phone is a computer. A tablet is a computer. The till in a shop, the screen that shows the next bus, and the box that plays a film on a television are computers too. They look different because they were built for different jobs.

Think of a computer as a very fast clerk. The clerk has a desk, a filing cabinet, and a written list of tasks. The desk holds the work that is open right now. The filing cabinet keeps older work safe. The list of tasks is the software. If the list says "add these two prices", the clerk adds them. If the list says "show this photo", the clerk shows it. The clerk does not invent a new list halfway through.

The problem a computer solves is scale and memory. A person can add a few numbers, sort a few papers, and send a few messages. A computer can do those jobs many times, for many people, and it can keep a copy of the work. That is why a clinic, a school, a shop, and a family group chat all depend on computers.

Two words will follow you through the whole course. Hardware is the part you can touch. Software is the instructions and the information. This lesson stays with those two ideas. The tools you will use to write your own pages arrive in the next session. You do not need to install anything today.

:::misunderstanding A computer understands you
A computer does not understand meaning the way a person does. It follows exact instructions. If a step is missing or mistyped, the computer still tries to follow what it was given, or it stops and shows an error.
:::

:::example The clerk
When you tap a camera icon, you are handing the clerk a task: open the camera, show the scene, and keep the picture if I press the button. The phone does not decide that you wanted a photo. The application already contains that task.
:::
`,
          },
          {
            heading: "Hardware you can touch",
            markdown: `
Hardware is the physical equipment. The screen, the keyboard, the mouse, the touch surface, the camera, the battery, the speakers, and the chips inside the case are hardware. If you dropped it on a table, it would make a sound. That is a rough test, and it works for this lesson.

A few parts inside a laptop or phone are worth naming now. You will not take the machine apart. You only need a picture of where work sits.

The processor, often called the CPU, does the calculating. It is the clerk at the desk. It handles one small step, then the next, millions of times a second. A phone has a processor too. It is smaller, and it is built to save battery, but the job is the same.

Memory, often called RAM, is the desk space. It holds the applications and documents that are open right now. When you turn the computer off, or when an application closes, that desk is cleared. That is why a note you typed but never saved can disappear. The words were on the desk, not yet in the cabinet.

Storage is the filing cabinet. It may be a drive inside the laptop or a chip inside the phone. Files stay there after you shut down, as long as they were saved. Photos, applications, and the webpages you will write later live in storage until someone deletes them.

Input devices bring information in. A keyboard, a mouse, a touch screen, a camera, and a microphone are input devices. Output devices send information out to a person. A screen, speakers, and a printer are output devices. Some parts do both. A touch screen takes a tap in and shows a picture out.

Why does this matter if you want to build software rather than repair machines? You will write instructions that run on someone else's hardware. A page that is comfortable on your laptop can be cramped on a small phone, because the screen is different hardware. A button that needs a precise mouse click can be hard to press with a thumb. Remembering that people hold different machines will make your later pages kinder.

:::example The kitchen
Hardware is the cooker, the pans, and the spoons. Software is the recipe. A careful recipe still needs a working cooker. A working cooker does nothing useful until someone follows a recipe.
:::

:::warning The picture is not the panel
The words and photos on a screen are output from software. The glass and the panel you can tap are hardware. When a page looks wrong, the fault is often in the instructions, not in a cracked screen.
:::
`,
          },
          {
            heading: "Software and applications",
            markdown: `
Software is the set of instructions, and the data those instructions use, that tell the hardware what to do. You cannot hold software in your hand. You see the result on the screen, hear it from a speaker, or notice it because a file changed.

An application, often shortened to app, is a piece of software made for a particular job. A notes application keeps writing. A maps application gives directions. A bank application lets a person move money. The same phone can hold many applications because each one is a different set of instructions in storage.

This course also uses the word programme for that same idea. Application, app, and programme all mean software with a job to do. When a sentence needs to be precise, application is the clearest word.

Software exists because hardware is general. The same phone can play music, show a bus time, or call a friend. The hardware stays in your pocket. The software changes the job. Without software, the processor and the screen have nothing useful to say.

A common mix-up is to think that software is only the icon. The icon is a small picture that starts the software. The software itself is stored as files. While the application is open, parts of it are copied into memory so the processor can follow them quickly. When you close it, the copy on the desk can be cleared. The copy in storage remains, which is why the icon is still there tomorrow.

There is also software you rarely choose from a shop window. An operating system is the main software that starts when the computer turns on. Windows, macOS, and Linux are operating systems used on laptops and desktops. Android and iOS are operating systems used on many phones. The operating system looks after files, the screen, the sound, the wifi, and the opening and closing of other applications. Your applications sit on top of it. They ask the operating system to save a file or draw a button. They do not talk to every chip themselves.

Updates are part of this picture. Hardware usually stays the same until a part is replaced. Software can be replaced in pieces. An update changes some of the instructions. That is why an application can gain a new button after you install an update, and why an update can also introduce a new problem. Developers spend a lot of time changing software that already exists.

:::misunderstanding I did not install it, so it is not software
Installing is one way to put software onto a device. A website is still software. Your browser fetches it when you visit. The instructions were written by people and stored on another computer.
:::
`,
          },
          {
            heading: "Websites and mobile applications",
            markdown: `
A website is software that you reach through a browser. A browser is an application whose job is to ask for a page and show what comes back. Chrome, Firefox, Safari, and Edge are browsers. The page may be words, pictures, and forms. Later in this course you will write those pages.

A website is still software. People designed it and wrote it. It is stored on a computer that stays switched on so others can reach it. You will learn the name for that computer, a server, in the next lesson. For today, it is enough to know that the shop's website is the shop's software, seen through your browser.

A mobile application is software built to be installed on a phone or tablet. You often get it from an app store. It has an icon on the home screen. It may fill the screen without a browser address bar. Some mobile applications talk to the internet. Some can do a small job with no connection, such as a calculator or a camera.

The same service can exist in more than one form. A bank might offer a website and a mobile application. Both are software. They can share a purpose and still look different, because one is built for a browser and one is built for a phone screen and a thumb.

Use these tests while you are learning. They will not cover every modern product, and that is all right. Sort the clear cases first.

- If you open it by typing or tapping an address in a browser, treat it as a website.
- If you install it and open it from an icon on a phone or tablet, treat it as a mobile application.
- If you install it on a laptop or desktop and open it from the application menu, treat it as a desktop application.

Some products blur the line. A music service might have a website, a phone application, and a desktop application. Call each one by the form you are looking at. The purpose can be the same while the form changes.

:::example Three ways to read the news
You can open a news website in a browser, tap a news application on your phone, or open a news application you installed on a laptop. Three pieces of software can serve one habit. Each was built, tested, and updated by developers.
:::

:::tip Start with the clear cases
If a product is confusing, write down where you opened it. The place you opened it is the clue. Browser address, phone icon, or computer application menu.
:::
`,
          },
          {
            heading: "What developers do",
            markdown: `
A software developer designs, writes, tests, and improves software. The writing is called coding, or programming. The instructions are written in a programming language, which is a strict way of telling a computer what to do. In week 2 you will write your first webpages in HTML. HTML is a way to mark up a page so a browser knows what is a heading, a paragraph, or a link. You do not need that skill today. You need the picture of the work.

Developers also do work that is not typing. They read what a person needs. They break a large job into small steps. They check that the result matches the need. They fix mistakes, which everyone makes. They change the software when the need changes. A developer is not a different kind of person. The work is careful reading, small changes, and checking.

You will hear a few types of developer in this course. There are more types in the industry, such as people who build mobile applications or games. This course follows the web path.

A frontend developer works on what a person sees and uses. On the web, that means the page in the browser: the words, the pictures, the buttons, and what happens when someone clicks or types. Frontend work is close to the person. If a label is unclear, the frontend is where that label lives.

A backend developer works on parts a person does not see directly. That includes saving information, checking who someone is, and applying rules such as "this seat is already taken" or "this password does not match". When you submit a form on a real site, a backend often receives the information and decides what to store.

A full-stack developer works on both the frontend and the backend. Full-stack does not mean "knows every tool on earth". It means the person can follow one feature from the screen through to the saved information. This course moves in that direction slowly: pages, then appearance, then behaviour, then a server and stored data. You are not expected to do all of that now.

Other developers specialise. A mobile developer builds applications for phones. A game developer builds games. The names change. The habit does not: understand the job, write careful instructions, and check the result.

:::example Ordering food
The frontend is the menu you tap: the pictures, the prices, and the button that says order. The backend is the ticket in the kitchen, the check that the card payment succeeded, and the record of what you ordered. A full-stack developer can work on the menu and on the record. A team may still split the work.
:::

:::misunderstanding Frontend means the front of the case
Frontend does not mean the front panel of the computer. It means the part of the software a person sees and uses. The plastic case is hardware, whoever built the software.
:::
`,
          },
          {
            heading: "Software in everyday life",
            markdown: `
Software sits in the middle of ordinary days. People use it to talk to family, pay a bill, read a notice from school, find a room, and check when the next bus leaves. A nurse uses software to see notes about a patient. A driver follows a route drawn by software. A student submits work through software. You do not need a technical job to be affected by how software is built.

That reach is why the details matter. A confusing button can make a person miss a payment. A form that does not say what it wants can lock someone out. A page that only works on a large screen can shut out a person who only has a phone. You will not fix those problems this week. You will start noticing them. Noticing is the first professional habit in this course.

When you use an application, ask four questions. They work for a website, a phone application, and a programme on a laptop.

1. What job is this application for?
2. What did the person do: tap, type, scroll, or speak?
3. What did the software do in response?
4. Where might the information have gone: only onto this device, or also to another computer?

Walk through a familiar case. A person opens a messaging application and types "I am outside". The job of the application is to carry short messages. The person typed and then pressed send. The software showed the message in the conversation and passed a copy to another computer so the other phone could receive it. The words did not stay only on one screen. That fourth question is how you start to see frontend and backend without writing any code. The bubble on the screen is frontend. The delivery and the saved conversation are backend work, even if one company built both.

Here is a second case that stays on the device. A person opens the camera, presses the shutter, and looks at the picture. The job is to capture a photo. The tap is the action. The software talks to the camera hardware, shows the scene, and stores a file. If the photo is not uploaded, the information may stay on that phone. The same four questions still work. The answers are quieter because no second computer was required.

Use these questions in the practice and in the homework. Write in ordinary sentences. You are not being marked on fancy words. You are being marked on whether another beginner could read your note and know what the software is for and what happens when a person uses it.

:::tip Your evidence is already in your day
You do not need a past course to start. The software you used before class is the evidence. Naming it clearly is the skill this session asks for.
:::

:::warning Do not collect private details
When you describe an application, do not write passwords, full card numbers, or someone else's private messages. Describe the job and the steps. Use a made-up example if the real one is personal.
:::
`,
          },
        ],
        vocabulary: [
          {
            term: "Computer",
            definition:
              "A machine that stores information and follows instructions people have written, quickly and repeatedly.",
          },
          {
            term: "Hardware",
            definition:
              "The physical parts of a computer, such as the screen, keyboard, processor, memory, and storage.",
          },
          {
            term: "Software",
            definition:
              "The instructions and data that tell hardware what job to do. You see the result, not the instructions themselves.",
          },
          {
            term: "Application",
            definition:
              "A piece of software built for a particular job, such as notes, maps, mail, or a camera. App means the same thing.",
          },
          {
            term: "Operating system",
            definition:
              "The main software that starts when a computer turns on and looks after files, the screen, and other applications.",
          },
          {
            term: "Frontend",
            definition:
              "The part of a software product that a person sees and uses, such as the page, buttons, and messages on screen.",
          },
          {
            term: "Backend",
            definition:
              "The part of a software product that works behind the screen, such as saving information and applying rules.",
          },
          {
            term: "Full-stack",
            definition:
              "Work that covers both the frontend and the backend, so one feature can be followed from the screen to the saved data.",
          },
        ],
        demonstrations: [
          {
            title: "Find the software you already use",
            intro:
              "You will open the application menu on your own computer, start three applications you already know, and sort each one. The steps below the list explain Windows, macOS, Linux, and what to do if you are not sure which system you have.",
            steps: [
              "Sit at the computer you will use for this course and sign in so you can see the desktop.",
              "Use the operating-system steps to open the menu that lists applications. Do not install anything in this demonstration.",
              "Open three applications you already know, one at a time. Close each one before you open the next.",
              "For each application, say the job it does in one sentence, such as keeping notes or showing a map.",
              "Mark each one as a website, a mobile application, or an application installed on this computer. Use the tests from the lesson.",
              "Open a browser from the same menu and look at one website you already trust, such as a news page or https://example.com.",
              "Write the three application names, their jobs, and the website name on paper or in a notes application.",
              "Pick one action inside one application and answer the four questions: the job, what you did, what the software did, and where the information went.",
            ],
            expected:
              "You have a short written list of three applications and one website, each with a job, plus one action described in ordinary words.",
            verify:
              "Read the list aloud. Another person should be able to tell what each item is for and whether you opened it from the application menu or from a browser.",
            ifItFails:
              "If the menu search finds nothing, check the spelling of the application name and try the word Files, Finder, or Explorer. If the computer is not yours to change, look only. Do not install or delete anything.",
            os: {
              sameOnAllPlatforms:
                "You are only looking and opening applications you already have. Do not install Visual Studio Code in this session. The next session introduces that editor, with install steps for each system.",
              windows: [
                "Click the Start button on the taskbar. It usually shows the Windows logo. Type the name of an application, such as Edge, Photos, or Notepad, and press Enter.",
                "To see the system name, open Start, then Settings, then System, then About. The Windows edition is written on that page.",
                "Edge is a browser that comes with Windows. You can also use Chrome or Firefox if one of those is already installed.",
              ],
              macos: [
                "Click Launchpad in the Dock, or open Finder and choose Applications from the sidebar. Click an application to open it, and quit it from its menu.",
                "Click the Apple menu at the top left and choose About This Mac. The window names the macOS version and the kind of chip.",
                "Safari is the browser that comes with macOS. It is usually in the Dock. Chrome or Firefox is fine if you already use one.",
              ],
              linux: [
                "Open the application menu. It may be labelled Activities, Show Applications, or a logo in the corner. Type Firefox, Files, or Text Editor and press Enter.",
                "Open Settings and look for an About page, or read the distribution name on the menu, such as Ubuntu or Fedora.",
                "Firefox is a common browser on Linux. The file manager may be called Files, Nautilus, or Dolphin depending on the distribution.",
              ],
              identify: [
                "Look at the edges of the screen. A Windows logo on the taskbar means Windows. An Apple menu at the top left means macOS.",
                "If you see Activities, a distribution name such as Ubuntu, or a penguin logo, you are likely using Linux.",
                "If you still cannot tell, ask the instructor before you follow any later install steps. Looking at applications is safe on all three systems.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "A note that names five pieces of software",
            filename: "learning/week-01/everyday-software.txt",
            language: "text",
            code: `Five pieces of software I use

1. Messaging application on my phone
Job: carry short messages to another person.
Form: mobile application.
One action: I type a sentence and press send. The application shows the sentence and passes a copy onward.

2. Browser on this computer
Job: open websites.
Form: installed application.
One action: I type an address and press Enter. The browser shows the page it receives.

3. https://example.com
Job: show a short example page.
Form: website.
One action: I visit the address. The page appears in the browser.

4. Camera on my phone
Job: take and keep a photo.
Form: mobile application.
One action: I press the shutter. The application stores a picture on the phone.

5. Settings on this computer
Job: change how the computer behaves.
Form: installed application.
One action: I open the display settings. The application shows choices for the screen.
`,
            explanation:
              "This is a plain text note, not a webpage. It shows the shape of the homework: five pieces of software, the job of each, the form it takes, and one action a person takes. Your five names should come from your own week. You may save the file later, in the next session, when you create the learning folder. Reading it now is enough.",
            lineNotes: [
              {
                focus: "The title line",
                note: "A plain first line tells a reader what the note is about. There is no special syntax yet.",
              },
              {
                focus: "Job",
                note: "The job is the purpose, not a list of every button. One sentence is enough.",
              },
              {
                focus: "Form",
                note: "Form means website, mobile application, or installed application. The same purpose can have more than one form.",
              },
              {
                focus: "One action",
                note: "The action names what the person did and what the software did next. That is the four-question habit in a short paragraph.",
              },
            ],
            expectedOutput:
              "Opened in a text editor, the note shows a title and five numbered entries. Nothing is coloured or laid out as a webpage, because this file is only text.",
            level: "basic",
          },
        ],
        exercises: [
          {
            title: "Sort software you used this week",
            difficulty: "warm-up",
            prompt:
              "Make a list of six things you used in the last week that involved a computer or a phone. Sort each one. Do not look up a definition while you write the first draft. Correct it afterwards with the tests from the lesson.",
            steps: [
              "Write six names. Include at least one website and at least one thing you open from an icon.",
              "Next to each name, write hardware, website, mobile application, or installed application. Hardware can be a device you touched, such as a keyboard.",
              "If one name is really two things, split it. A phone is hardware. The application on it is software.",
              "Check the website test and the icon test. Change any line that used the wrong word.",
            ],
            expectedOutcome:
              "You have six labelled lines, including at least one website and one application opened from an icon, and you can explain one correction you made.",
          },
          {
            title: "Narrate a single action",
            difficulty: "practice",
            prompt:
              "Choose an application you did not describe in the demonstration. Tell the story of one action a person takes. Stay with a single tap, type, or press. Do not describe the whole application.",
            steps: [
              "Name the application and the job it is for.",
              "Write what the person does with their hand or voice.",
              "Write what appears, changes, or is stored because of that action.",
              "Say whether the information stays on that device or also has to reach another computer. If you are not sure, write what you would need to see in order to decide.",
            ],
            expectedOutcome:
              "A short paragraph answers the four lesson questions for one action, in language another beginner can follow.",
          },
          {
            title: "Frontend and backend of one feature",
            difficulty: "stretch",
            prompt:
              "Pick a website you know that lets a person search, book, or buy. Describe one feature twice: once as the person sees it, and once as work that must happen out of sight.",
            steps: [
              "Name the feature in a few words, such as searching for a book or choosing a seat.",
              "Describe the frontend: what the person looks at and what they click or type.",
              "Describe the backend: what must be checked or saved so the feature can be trusted.",
              "Stop after one feature. Do not try to explain the whole company.",
            ],
            expectedOutcome:
              "Two short paragraphs for one feature, one about the screen and one about the hidden check or saved record.",
          },
        ],
        troubleshooting: [
          {
            problem: "I cannot tell whether the screen is hardware or software.",
            why: "The panel and the picture are easy to mix up because you see them in the same place. The glass is equipment. The words on it are output.",
            solution:
              "Touch the frame of the screen. That object is hardware. Then name one application that is producing the words or photos. That application is software. Write both names in your notes.",
          },
          {
            problem: "I think a website is not software because I never installed it.",
            why: "Phones teach us to equate software with an icon from an app store. A website takes a different route onto your screen.",
            solution:
              "Write two names. The browser is the application installed on your computer. The website is software stored on another computer and shown by the browser. Both are software.",
          },
          {
            problem: "I used frontend to mean the front of the computer.",
            why: "The word sounds like a place on the case. In this course it is a place in the software: the part a person sees and uses.",
            solution:
              "Point to a button or a heading and call that the frontend. Then name one rule the person does not see, such as a saved booking, and call that backend. Leave the plastic case in the hardware list.",
          },
          {
            problem: "My list of applications is really a list of brand names with no jobs.",
            why: "Brand names are familiar, so they hide the question the lesson is asking. A name alone does not say what the software does.",
            solution:
              "After each name, force one sentence that starts with a verb: send, store, show, pay, edit, or navigate. If you cannot find the verb, open the application and watch one action.",
          },
        ],
        knowledgeChecks: [
          {
            id: "w1s1-hardware",
            question: "Which of these is hardware?",
            format: "Multiple choice",
            options: [
              "A calendar website",
              "The laptop keyboard",
              "An email application",
              "A saved text file",
            ],
          },
          {
            id: "w1s1-mobile",
            question: "A mobile application is not software, because it lives on a phone.",
            format: "True or false",
            options: ["True", "False"],
          },
          {
            id: "w1s1-fullstack",
            question: "In one or two sentences, what is the difference between frontend and backend?",
            format: "Short answer",
          },
          {
            id: "w1s1-action",
            question: "Which question belongs in the story of someone using an application?",
            format: "Multiple choice",
            options: [
              "What colour is the company logo paint on the office wall?",
              "What did the person do, and what did the software do next?",
              "How many screws are in the laptop case?",
              "What is the brand of the desk?",
            ],
          },
        ],
        homework: {
          description:
            "Write a short document that explains five applications or websites you actually use. This is your own writing for this session. The week assignment in the next session will ask you to keep this explanation and add the folder work.",
          requirements: [
            "Name five pieces of software. Include at least one website and at least one mobile application or installed application.",
            "For each one, write the job it does, the form it takes, and one action a person takes, including what the software does in response.",
            "Use the words hardware and software correctly at least once in the document.",
            "Leave out passwords, card numbers, and other people's private messages.",
          ],
          deliverables: [
            "A written document of about half a page to a page, submitted in the lesson response box.",
          ],
          submission:
            "Type or paste your document into the homework box at the bottom of this lesson and save it. You do not need a separate file upload for this session.",
          criteria: [
            "Each of the five items has a job, a form, and a real action, not only a brand name.",
            "A reader who missed class could tell websites and installed or mobile applications apart from your writing.",
            "Hardware and software are not swapped, and private secrets are not included.",
          ],
          submissionKind: "lesson_response",
        },
        summary: [
          "A computer stores information and follows instructions. Hardware is the machine. Software is the instructions and data.",
          "Applications, websites, and mobile applications are all software. The place you open them helps you tell them apart.",
          "Frontend is what a person sees and uses. Backend is the hidden saving and rule-checking. Full-stack means following a feature across both.",
          "Watching one action, and asking where the information goes, is the start of thinking about how software is built.",
        ],
        nextLesson: {
          title: "The internet, files, and Visual Studio Code",
          why: "You can name software. Next you will visit a website on purpose and save your own file in a folder you can find again.",
          lessonSlug: "internet-and-tools",
        },
      },
      guide: {
        sessionNumber: 1,
        week: 1,
        title: "Understanding computers and software",
        durationMinutes: 90,
        objectives: [
          "Students can point to hardware and name the software that is using it.",
          "Students can sort websites, mobile applications, and installed applications.",
          "Students can describe frontend and backend with one everyday feature.",
          "Students leave with a started draft of the five-application document.",
        ],
        tools: [
          "A computer that can show the desktop to the room",
          "A browser already installed",
          "Paper or a shared notes application for student lists",
          "The lesson page open for the knowledge checks",
        ],
        preparation: [
          "Sign in to the classroom computer and confirm you can open the application menu, a browser, and https://example.com.",
          "Prepare a list of eight familiar products to sort aloud: a phone, a keyboard, a maps application, a bank website, a calculator, a messaging application, a browser, and the Settings application.",
          "Write the four action questions on the board before students arrive, so the practice does not depend on scrolling.",
          "Read the homework requirements and decide where students will type the lesson response if they do not have accounts yet.",
        ],
        flow: [
          {
            minutes: 5,
            title: "Name one object and one application",
            detail:
              "Welcome the group and say that this session does not install tools. Point to the keyboard and ask what it is made of. Then ask one student to name an application they used before class. Write Computer, Hardware, and Software on the board and leave them visible.",
          },
          {
            minutes: 15,
            title: "Hardware, memory, and the recipe",
            detail:
              "Hold or point to the keyboard, the screen, and the case. Call them hardware. Open any simple application and call it software. Tell the kitchen analogy in your own words: the cooker is hardware and the recipe is software. Explain memory as the desk and storage as the filing cabinet, using an unsaved note as the story of work that vanishes.",
          },
          {
            minutes: 20,
            title: "Sort websites and mobile applications",
            detail:
              "Show a phone icon if you have a phone, then show a browser visiting https://example.com. Say that both are software reached in different ways. Read your list of eight products and have the room call out the category. Correct frontend-as-the-case if it appears. Send pairs to write six items from their own week.",
          },
          {
            minutes: 30,
            title: "Developers and one action",
            detail:
              "Draw two boxes labelled Screen and Hidden rules. Use ordering food: the menu is frontend and the saved order is backend. Define full-stack as following one feature across both boxes, not as knowing every tool. Then pairs write the story of one action with the four questions. Walk the room and ask where the information went.",
          },
          {
            minutes: 10,
            title: "Knowledge checks",
            detail:
              "Read the four knowledge checks aloud. Students answer on paper without notes for three minutes. Then give the answer and the reason for each one, especially the false statement about mobile applications and the frontend question. Invite one correction from a student list.",
          },
          {
            minutes: 10,
            title: "Start the five-application document",
            detail:
              "Open the homework section on the lesson page. Read the requirements slowly. Ask students to complete the first two applications before they leave, in the response box if they can sign in, or on paper to type later. Remind them not to include passwords. Preview that the next session saves files and introduces Visual Studio Code.",
          },
        ],
        explain: [
          "A computer follows instructions. It does not understand goals the way a person does.",
          "Hardware is physical. Software is instructions and data. The icon is only a way to start software.",
          "Websites, mobile applications, and desktop applications are forms of software.",
          "Frontend, backend, and full-stack describe parts of the work, not personality types.",
          "One user action has a visible result and sometimes a hidden save on another computer.",
        ],
        questions: [
          "What is on the desk of the computer, and what is in the filing cabinet, when you type a note and then shut the machine down without saving?",
          "Is the bus timetable on a website software? What did you open it with?",
          "When you send a message, which part could a frontend developer change, and which part has to stay correct even if the screen changes?",
          "Which of today's applications would still have a job if the internet stopped, and which would not?",
        ],
        demonstration:
          "On the classroom computer, open the application menu the way the lesson describes for that operating system. Open a browser and visit https://example.com, then open a simple installed application such as a text editor or settings. Narrate the job of each one. Do not install software. If a student cannot find the menu, stand with them and use the identify steps before any other instruction.",
        practice:
          "Pairs produce a six-line sort from their own week and a paragraph about one action. Circulate with the four questions written on a card. If a pair only lists brand names, ask them to start the next sentence with a verb. Collect one strong action story to read aloud, with permission, and remove any private detail before you read it.",
        expectedOutcomes: [
          "Each student can point to hardware and name a piece of software on the same machine.",
          "Each pair has a written sort that includes a website and an application opened from an icon.",
          "Students can say frontend and backend in the context of one feature without describing the computer case.",
        ],
        difficulties: [
          {
            issue: "A student is sure they have never used software because they do not code.",
            help: "Ask what they used to get to class: a map, a message, a call, or a ticket. Name that product as software someone else wrote. Separate using software from writing it.",
          },
          {
            issue: "A student calls every website an app and every app a website.",
            help: "Stand next to their screen. If there is an address bar, write website. If they tapped an installed icon and there is no address bar, write mobile or installed application. Do the test on two examples only, then let them continue.",
          },
          {
            issue: "The frontend and backend explanation turns into a lecture about servers.",
            help: "Stop at the food-order picture. Say that the server has a name they will learn next session. Today the hidden box only needs the words save and check.",
          },
        ],
        homework:
          "The session 1 homework is a lesson response, not the full week assignment. Students explain five applications in the homework box. Remind them the next session's assignment will reuse this writing and add proof that they can create a folder and save a file.",
        assessment:
          "Use the knowledge checks as the live check. Listen for hardware and software being swapped, and for frontend meaning the case. The written homework is complete enough to mark when all five items have a job, a form, and an action.",
        recap:
          "End by reading one student action story and labelling the job, the action, the response, and where the information went. Tell the group the next session is about the internet, folders, and the editor. They still do not need Visual Studio Code installed tonight unless they want a head start.",
        knowledgeCheckAnswers: [
          {
            id: "w1s1-hardware",
            answer: "The laptop keyboard",
            explanation:
              "A keyboard is physical equipment, so it is hardware. The website, the email application, and the text file are software or data.",
          },
          {
            id: "w1s1-mobile",
            answer: "False",
            explanation:
              "A phone is a computer, and an application installed on it is software. Where it lives does not stop it being instructions and data.",
          },
          {
            id: "w1s1-fullstack",
            answer:
              "Frontend is the part a person sees and uses. Backend is the hidden part that checks rules and stores information.",
            explanation:
              "Accept wording that contrasts the screen with saving or rule-checking. Do not require the phrase full-stack in this answer.",
          },
          {
            id: "w1s1-action",
            answer: "What did the person do, and what did the software do next?",
            explanation:
              "The lesson studies the action and the software's response. Screws, desks, and painted logos are not part of that story.",
          },
        ],
      },
    },
    {
      slug: "internet-and-tools",
      sessionNumber: 2,
      title: "The internet, files, and Visual Studio Code",
      estimatedMinutes: 90,
      difficulty: "Guided practice",
      requiresOs: true,
      content: {
        overview: {
          about:
            "This lesson follows a webpage from your browser to the computer that stores it, then brings you back to your own machine. You will learn what a domain name and a web address are, and you will create a folder and save a file in Visual Studio Code.",
          why: "The rest of the course is files you can find again and pages you open in a browser. Those habits start with a folder, a saved file, and a clear picture of a request and a response.",
          alreadyKnow:
            "You can tell hardware from software and you can tell a website from an installed application.",
        },
        objectives: [
          "Describe the internet as computers passing information to each other.",
          "Name the browser, the address, the domain, and the server in one visit.",
          "Explain the client and server roles in a single page request.",
          "Create a folder, save a plain text file, and open that folder in an editor.",
          "Choose a file name you can find again on Windows, macOS, or Linux.",
        ],
        prerequisites: [
          {
            label: "You can separate hardware from software and name a website you have used.",
            lessonSlug: "understanding-computers",
          },
        ],
        teachingNotes: [
          {
            heading: "The internet is connected computers",
            markdown: `
The internet is a worldwide collection of computers that can pass information to each other. It is not a single website, and it is not a cloud in the sky. Cables, radio links, and smaller networks join those computers so a message can travel from one machine to another.

You already saw the need for this in the last lesson. When a message leaves your phone, a copy has to reach another computer. The internet is the set of connections that makes that trip possible. Your home router, the wifi in a classroom, and a mobile network are doors onto those connections.

A helpful picture is the postal system. Each computer can send and receive parcels of information. The parcels are much faster than paper, and they are copied rather than carried as one physical object, but the idea of an address and a destination still helps. Without an address, the parcel cannot find the right machine.

The internet is bigger than the web. The web, short for the World Wide Web, is one way of using the internet: pages and links you open with a browser. Mail, video calls, and many mobile applications also use the internet, sometimes without showing you a page. When someone says "the internet is down", they often mean "this device cannot reach other computers right now". The websites themselves may still be fine on their own machines.

:::misunderstanding The internet is a website
The internet is the network. A website is one destination on that network. You can have a connection and still type an address that does not exist. You can also have a website stored on a computer while your own connection is switched off.
:::

:::example A phone call and a page
A voice call and a news page can both travel across the internet. They are different kinds of software. They share the idea that two computers exchange information.
:::
`,
          },
          {
            heading: "Browsers, websites, and addresses",
            markdown: `
A website is a collection of pages and files that belong together, such as a library site with a catalogue, an events page, and a contact page. You look at a website with a browser. The browser is an application on your computer. Its job is to ask for a page, receive the answer, and draw it.

A web address is the text you type or tap to say which page you want. People also call it a URL, which stands for Uniform Resource Locator. You do not need to memorise that long name. You do need to read an address in pieces. Take this one:

https://example.com/help

The first piece, https, names the way the browser should talk to the other computer. You will see http as well. The s means a more private connection. For this course, prefer addresses that begin with https when you have a choice. You will not study the encryption itself.

The middle piece, example.com, is the domain name. It is the name of the site on the network. People buy and renew domain names so that a readable name points to the right computer. example.com is a real name kept for examples and documents. It is a safe page to open in class.

The last piece, /help, is the path. It points at one page or file inside that site. The domain is the building. The path is the room. If there is no path, you are asking for the front door, which people call the home page.

A browser usually has an address bar at the top. That is the place to type https://example.com. A separate search box, or the same bar used as a search, will try to guess if you type ordinary words. If you want a specific site, click the address bar, type the full address, and press Enter.

:::warning Search is not the same as an address
If you type example com with a space, the browser may search for those words instead of opening the site. Click the address bar and type https://example.com with the dot and no spaces.
:::

:::tip Read the address before you trust the page
The domain name tells you whose site you are on. A page can look familiar while the domain is a different name. In this course you will use example.com and files from your own computer, so the habit can start gently.
:::
`,
          },
          {
            heading: "Servers and domain names",
            markdown: `
A server is a computer that waits for requests and sends back answers. The word does not mean a person and it does not mean a programme you install for fun. A server is often a computer in a data centre, switched on all the time, connected to the internet. Your laptop can act like a server too, but this week you are a visitor, not a host.

When you visit a website, the pages live on a server. The company or person who runs the site keeps those files there. Your browser does not already contain the whole web. It asks for one page at a time and shows what the server sends.

A domain name is the human-readable name for a place on the internet, such as example.com. Computers on the network also use numeric addresses. A system in the middle translates the domain name into a number the network can route. You do not need to perform that translation yourself. You need to know why the name matters: it is the stable public name of the site, even if the equipment behind it changes.

People mix up the domain and the whole address. In https://example.com/help the domain is example.com. The https:// part is the scheme, the way of connecting. The /help part is the path. If a form later adds a question mark and more text, that extra text is information sent along with the request. You will see that when you build forms. Ignore it for this visit.

There can be a name in front of the domain, such as www. Sometimes www.example.com and example.com open the same site. Sometimes a name like maps.example.com points at a different part of the same organisation. Read the whole name, not only the first word.

:::misunderstanding The server is the browser
The browser is on your computer. It makes the request. The server is the computer that stores the site and sends the page back. They are two machines, even though you only touch one of them.
:::

:::example The library building
The domain name is like the library's street address. The server is the building that holds the books. The path is the shelf. Your browser is you, walking in and asking for one book.
:::
`,
          },
          {
            heading: "Client and server",
            markdown: `
In this conversation, the client is the computer, and usually the programme, that asks for something. When you browse, the client is your browser. The server is the computer that answers. This pattern is called client-server communication. It will return many times in the course. Learn it with one page before it becomes abstract.

Here is the trip for https://example.com, told without extra machinery.

1. You type the address into the browser and press Enter.
2. The browser uses the domain name to find the server on the internet.
3. The browser sends a request: please give me this page.
4. The server reads the request and sends a response. The response includes the page, and also a status that says whether it worked.
5. The browser reads the response and draws the page. If the page asks for images or other files, the browser may make more requests.

You do not see the request itself. You see the result: a page, an error, or a long wait. A common error page means the server answered but did not have that path, or the browser could not reach a server at all. Those are different problems. "I cannot reach anyone" is a connection problem. "This room does not exist" is a path or site problem. You will not diagnose networks in this lesson. You will notice that a request can fail and that the failure is not always your typing.

The same pattern sits behind many applications that are not open pages. A weather application on a phone can be the client. A computer run by the weather service can be the server. The phone asks for today's forecast. The server answers with data. The application then draws the sun or the rain. Frontend work often lives in the client. Backend work often lives on the server. That connects this lesson to the last one.

:::tip One request at a time
You do not download the entire internet when you open a browser. You ask for one address. The server replies with that page. Another link makes another request.
:::

:::warning Your practice files are not on a server yet
A file saved on your laptop is not automatically a website other people can visit. Opening it in a browser shows it to you. Publishing it would need a server. That comes much later. Do not put private notes in a public place.
:::
`,
          },
          {
            heading: "Files, folders, and finding your way",
            markdown: `
A file is a named collection of data in storage. A photo, a letter, and the note you will write today are all files. A folder, also called a directory, is a named place that holds files and other folders. Folders exist so you are not facing one enormous pile.

The course keeps its files in a shape you can say out loud. Inside your documents area, create a folder called learning. Inside learning, create week-01. You will add week-02 and later folders the same way. The path is written with slashes like this: learning/week-01/visit-note.txt. That style is the course style on every operating system. Windows often displays backslashes in its own address bar. You may read them there. When you write a path for this course, use the forward slash.

File names in this course stay short and use lowercase letters, numbers, and hyphens. visit-note.txt is a good name. My Final NOTE (1).txt is a hard name because of the spaces, the capitals, and the parentheses. The .txt ending tells you and the computer that the file is plain text. Later, .html will mean a webpage and .css will mean a style file. Type the ending on purpose.

Navigation means moving to the right folder and knowing you are there. Use the file manager for your system: File Explorer on Windows, Finder on macOS, and the Files application on many Linux desktops. The address or the title of the window should show the folder you are in. Click learning, then week-01, before you decide a file is missing. A file saved to the desktop is not missing. It is in a different folder.

Saving writes the file from memory into storage. Until you save, the words can exist only in the open application. Save at the start, once the file has a name and a folder, and save again after you change it. Closing an application often asks if you want to save. Read that question. Cancel means "go back". Do not click a delete button when you meant to close a window.

:::misunderstanding The file is inside the editor
The editor shows the file. The file lives in a folder in storage. If you cannot find it in the file manager, saving it inside the editor did not put it where you think. Check the folder name in the editor title or in the save window.
:::

:::example A filing cabinet
learning is the drawer. week-01 is a folder in that drawer. visit-note.txt is one sheet in that folder. You would not store week 2's sheet in a random pocket and still expect to find it during class.
:::
`,
          },
          {
            heading: "Text editors and Visual Studio Code",
            markdown: `
A text editor is an application for writing and changing plain text. Plain text is letters, numbers, and symbols with no hidden formatting. It is the right material for the files in this course. A word processor, by contrast, cares about fonts and margins and may hide extra information in the file. That extra information confuses a browser. Use a text editor for course files.

Visual Studio Code, often called VS Code, is the text editor this course uses. It is free, it runs on Windows, macOS, and Linux, and it can open a whole folder at once. Opening a folder matters because a webpage is soon more than one file. You want the editor to know that the page and, later, the style file live together.

This session is when you install it, if you are allowed to install software on the computer. The demonstration has the steps for each system. If the classroom computer blocks installation, do the file work in a plain text editor that is already there, and install VS Code before the next class on a computer you are allowed to change. The skill this week is the folder and the saved file. The editor is the tool you will keep using.

On Windows, Notepad is a plain text editor. On macOS, TextEdit can do the job only after you switch it to plain text. On Linux, Text Editor, gedit, or Kate is usually already installed. Those are acceptable for today if VS Code will not install. They are a bridge, not a change of plan.

When VS Code is open, use File, then Open Folder, and choose the learning folder. You should see week-01 in the side bar. Create the note inside that folder, not in a random location VS Code picked. The save window must show week-01 before you confirm. Name the file visit-note.txt.

The first note can be short. Write your name or a made-up student name, the browser you used, the address you visited, the domain, and one sentence about the server. You are practising the save. You are also gathering material for the week assignment.

:::tip Install can wait until the file is safe
If the installer is slow or blocked, save the note with the editor you already have. Come back to the VS Code steps when you have permission and time. Do not lose the note while wrestling with the installer.
:::

:::warning Formatted text is the wrong container
A file from a word processor can look like text and still not be plain text. If the save choice offers rich text or a word-processing document, stop and choose plain text or .txt instead.
:::
`,
          },
        ],
        vocabulary: [
          {
            term: "Internet",
            definition:
              "The worldwide network of computers that can send information to each other. It is bigger than any one website.",
          },
          {
            term: "Browser",
            definition:
              "An application that requests a webpage from a server and shows the result. Chrome, Firefox, Safari, and Edge are browsers.",
          },
          {
            term: "Web address",
            definition:
              "The text that tells a browser which page to request, such as https://example.com/help. People also call it a URL.",
          },
          {
            term: "Domain name",
            definition:
              "The readable name of a site on the internet, such as example.com. It is the middle part of a typical web address.",
          },
          {
            term: "Server",
            definition:
              "A computer that waits for requests and sends responses, such as the machine that stores a website's pages.",
          },
          {
            term: "Client",
            definition:
              "The computer or programme that starts a request. When you visit a page, your browser is the client.",
          },
          {
            term: "File",
            definition:
              "A named collection of data saved in storage, such as a text note, a photo, or a webpage you will write later.",
          },
          {
            term: "Folder",
            definition:
              "A named container for files and other folders. The course folder for this week is learning/week-01.",
          },
        ],
        demonstrations: [
          {
            title: "Visit a page, then save a note beside your other work",
            intro:
              "You will open a known address, read the domain, create learning/week-01, and save visit-note.txt. Then you will open that folder in Visual Studio Code if installation is allowed. The system steps cover Windows, macOS, Linux, and how to tell which one you have.",
            steps: [
              "Open a browser using the steps for your system. Click the address bar, not a search box in the middle of a page.",
              "Type https://example.com and press Enter. Wait until a page appears.",
              "Write down the browser name, the full address, and the domain name. The domain is example.com.",
              "In one sentence, name the client and the server for this visit. The browser is the client. The computer that stored the page is the server.",
              "Open the file manager and create a folder named learning. Inside it, create week-01. Use the system steps if the menu is unfamiliar.",
              "Open a text editor. Create a file in learning/week-01 and save it as visit-note.txt before you write much.",
              "In the file, write the browser, the address, the domain, and your client and server sentence. Save again.",
              "If you can install or already have Visual Studio Code, open the learning folder with File, then Open Folder, and confirm visit-note.txt appears in the side bar.",
            ],
            expected:
              "The browser shows the example page, and learning/week-01/visit-note.txt exists in the file manager and contains your four facts.",
            verify:
              "Close the editor, open the file again from the file manager, and check that the words are still there. In VS Code, the side bar should list week-01 and the note inside it.",
            ifItFails:
              "If the page does not load, check the spelling of https://example.com in the address bar. If the file disappears, you closed without saving or you saved into a different folder. Open the save window and look at the folder name before you try again.",
            os: {
              sameOnAllPlatforms:
                "Once Visual Studio Code is open, the course path is learning/week-01/visit-note.txt on every system. Use File, then Open Folder, and choose the learning folder. Use File, then Save, after the note has a real name.",
              windows: [
                "Open File Explorer from the taskbar. Go to Documents. On the Home tab or with a right-click, choose New, then Folder. Name it learning, open it, and make week-01 the same way.",
                "Download the Windows User Installer from the Visual Studio Code website, run it, and accept the usual prompts. Open Visual Studio Code from the Start menu.",
                "If you cannot install yet, open Notepad from Start, then use Save and choose the week-01 folder. Show file name extensions under the View menu so the file is not named visit-note.txt.txt.",
              ],
              macos: [
                "Open Finder, go to Documents, and choose File, then New Folder. Name it learning. Open it and make week-01. You can also press Shift+Command+N for a new folder.",
                "Download the Mac version from the Visual Studio Code website. Open the downloaded file and drag Visual Studio Code to Applications. If the system warns you, right-click the application, choose Open, and confirm.",
                "If you cannot install yet, open TextEdit, choose Format, then Make Plain Text, and save into week-01 as visit-note.txt. Stay in plain text.",
              ],
              linux: [
                "Open the Files application, go to your home folder or Documents, right-click, and choose New Folder. Name it learning, then make week-01 inside it.",
                "Download the .deb package for Debian or Ubuntu, or the .rpm package for Fedora, from the Visual Studio Code website. Install it with the software installer, or from a terminal in the downloads folder with sudo apt install ./code*.deb or sudo dnf install ./code*.rpm.",
                "If you cannot install, open Text Editor, gedit, or Kate, and save the note into week-01. You do not need administrator rights for that save.",
              ],
              identify: [
                "Windows shows a taskbar and a Start button with the Windows logo. macOS shows an Apple menu at the top left. Linux often shows Activities or a distribution name.",
                "About pages confirm it: Windows Settings, System, About; the Apple menu, About This Mac; or Linux Settings, About.",
                "If an install step mentions apt, that step is for Debian or Ubuntu Linux. A step that mentions dnf is for Fedora Linux. Do not run those commands on Windows or macOS.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "A visit note you can save and reopen",
            filename: "learning/week-01/visit-note.txt",
            language: "text",
            code: `Visit note

Browser: Firefox
Address: https://example.com
Domain: example.com
Client: the browser on my computer
Server: the computer that stores example.com and sent the page back

I opened the address myself. I did not search for the words example com.
The file is saved in learning/week-01.
`,
            explanation:
              "Save this as a plain text file at learning/week-01/visit-note.txt. Change the browser line to the browser you actually used. The rest of the address lines can stay, if you visited example.com. The point of the file is that you can close it, find it in the folder, and read the same words again.",
            lineNotes: [
              {
                focus: "Browser",
                note: "Write the application you opened, such as Firefox, Chrome, Safari, or Edge. That application is the client.",
              },
              {
                focus: "Address",
                note: "The full address includes https, the domain, and any path. This visit has no extra path.",
              },
              {
                focus: "Domain",
                note: "The domain is example.com only. Do not include https:// and do not include a path.",
              },
              {
                focus: "Client and Server",
                note: "These two lines keep the two computers apart. You touched the client. You did not touch the server.",
              },
              {
                focus: "Last line",
                note: "The path uses forward slashes. That is how the course writes locations, including when you work on Windows.",
              },
            ],
            expectedOutput:
              "After you save and reopen the file from the file manager, you see the same labels and sentences. The browser is not needed to read this note. It is text in your folder.",
            level: "basic",
          },
        ],
        exercises: [
          {
            title: "Read one address in pieces",
            difficulty: "warm-up",
            prompt:
              "Visit https://example.com in your browser, then write the address as three labelled pieces. Use a second site you already know only if example.com will not load, and say that you switched.",
            steps: [
              "Click the address bar and type the address. Press Enter.",
              "Copy the address you see after the page loads into your note.",
              "Label the scheme, the domain, and the path. If there is no path after the domain, write path: none.",
              "Name the browser in the same note.",
            ],
            expectedOutcome:
              "Your note shows the browser, the full address, and three labels. The domain line does not include https://.",
          },
          {
            title: "Create the course folder and prove the save",
            difficulty: "practice",
            prompt:
              "Create learning/week-01 and save a new plain text file there. The file should prove you can find it again without help from an open save window.",
            steps: [
              "Create the two folders in the file manager, not only inside a word processor.",
              "Save visit-proof.txt in week-01 with one sentence about the server that answered example.com.",
              "Quit the editor completely.",
              "Starting from the file manager, open week-01 and open the file. Read the sentence.",
            ],
            expectedOutcome:
              "The file is visible in learning/week-01 after the editor has been closed, and the sentence is still there.",
          },
        ],
        troubleshooting: [
          {
            problem: "The browser searched for words instead of opening example.com.",
            why: "The address was typed into a search field, or it was typed with a space, so the browser treated it as a question rather than an address.",
            solution:
              "Click the address bar at the top, delete whatever is there, type https://example.com with a dot and no spaces, and press Enter. Check that the domain in the bar is example.com before you write your note.",
          },
          {
            problem: "On macOS, TextEdit produced a formatted document instead of a plain note.",
            why: "TextEdit opens in rich text unless you change it. Rich text is for posters and letters, not for course files.",
            solution:
              "In TextEdit, choose Format, then Make Plain Text. Save again into learning/week-01 with the name ending in .txt. If the old formatted file is still there, leave it and work in the new plain file so you do not mix them up.",
          },
          {
            problem: "Windows saved visit-note.txt.txt, or the file is missing the ending you typed.",
            why: "File Explorer hides known endings, so typing .txt onto a name that already has a hidden ending produces a doubled ending. Hiding also makes a wrong ending hard to see.",
            solution:
              "In File Explorer, open the View menu and turn on file name extensions. Rename the file so it ends in .txt once. Confirm the week-01 folder is selected in the save window before you save again.",
          },
          {
            problem: "Visual Studio Code will not install, or the Linux install command says permission is denied.",
            why: "The account is not allowed to install software, or the download does not match the system. A classroom image often blocks installers.",
            solution:
              "Save the note with Notepad, plain TextEdit, or the Linux text editor, inside learning/week-01. Tell the instructor. Install Visual Studio Code later on a computer where you have permission. Do not run the Linux install commands on Windows or macOS.",
          },
        ],
        knowledgeChecks: [
          {
            id: "w1s2-domain",
            question: "In the address https://example.com/help, which part is the domain name?",
            format: "Multiple choice",
            options: ["https", "example.com", "help", "https://example.com/help"],
          },
          {
            id: "w1s2-client",
            question: "When you visit a page, the browser is the client.",
            format: "True or false",
            options: ["True", "False"],
          },
          {
            id: "w1s2-save",
            question: "Why do you save a file before you rely on closing the editor?",
            format: "Short answer",
          },
          {
            id: "w1s2-server",
            question: "Which sentence describes the server in a normal website visit?",
            format: "Multiple choice",
            options: [
              "It is the browser button you click to go back.",
              "It is the folder on your desktop.",
              "It is the computer that stores the page and sends it back.",
              "It is another word for the keyboard.",
            ],
          },
        ],
        homework: {
          description:
            "The graded work for this session is the week assignment. It brings together the five-application writing from session 1 and the navigation skills from this session: a folder you created, a file you saved, and a short account of one website visit.",
          requirements: [
            "Complete the week assignment, including the five-software explanation and the saved-file evidence.",
            "Describe one visit with the browser name, the full address, the domain, and a client and server sentence.",
            "Keep course files in a clear folder and use a plain text file name you can find again.",
          ],
          deliverables: [
            "The week assignment submission, including your writing and the path of the saved file.",
          ],
          submission:
            "Open the week assignment from the link on this lesson and submit there. This session does not use the short lesson response box.",
          criteria: [
            "The assignment's rubric is the mark scheme. Follow each requirement rather than inventing a second homework.",
            "The visit description names a browser, an address, a domain, and the two roles.",
          ],
          submissionKind: "module_assignment",
        },
        summary: [
          "The internet connects computers. A website is one kind of destination. A browser is the client that asks for a page.",
          "A web address has a scheme, a domain name, and often a path. The domain names the site. The server stores the page and answers.",
          "Files live in folders in storage. Saving writes the file down. The course path for this week is learning/week-01.",
          "Visual Studio Code is the editor we will keep using. If it cannot be installed today, a plain text editor still lets you save the note.",
        ],
        nextLesson: {
          title: "Introduction to HTML",
          why: "You can save a file and open a page someone else made. Next you will write a small webpage the browser can read.",
          lessonSlug: "introduction-to-html",
        },
      },
      guide: {
        sessionNumber: 2,
        week: 1,
        title: "The internet, files, and Visual Studio Code",
        durationMinutes: 90,
        objectives: [
          "Students can split a web address into scheme, domain, and path.",
          "Students can narrate one client-server request without extra jargon.",
          "Students leave with learning/week-01 and a saved plain text file.",
          "Students know whether VS Code is installed or what they will use until it is.",
        ],
        tools: [
          "A browser on the instructor machine",
          "File manager visible on the projector",
          "Visual Studio Code installer already downloaded for the classroom system",
          "A backup plain text editor if the installer fails",
          "The week assignment page open at the end",
        ],
        preparation: [
          "Visit https://example.com from the classroom network before students arrive. If it is blocked, choose another public page and write that address on the board.",
          "Create a private practice folder, then delete it, so you remember the exact clicks for this operating system.",
          "Download the matching Visual Studio Code installer and confirm it opens. Keep the plain-text fallback ready: Notepad, TextEdit set to plain text, or a Linux text editor.",
          "Read the week assignment rubric so the last ten minutes point at real requirements, not a vague instruction to finish up.",
        ],
        flow: [
          {
            minutes: 5,
            title: "From last session's message to a network",
            detail:
              "Ask someone to retell the messaging action from last time, especially where the information went. Say that today's first job is to name the network and the two computers. Write Internet, Browser, and Server on the board. Tell them the file work comes in the second half.",
          },
          {
            minutes: 15,
            title: "Live visit to example.com",
            detail:
              "Open the browser on the projector, click the address bar, and type https://example.com slowly. When the page loads, underline the domain with your voice. Draw two boxes, Client and Server, and an arrow each way labelled request and response. Ask the room which box they are touching.",
          },
          {
            minutes: 20,
            title: "Folders in the file manager",
            detail:
              "Create learning and then week-01 in Documents or the home folder, narrating every click for the classroom operating system. Write the course path learning/week-01/visit-note.txt on the board with forward slashes. Mention how Windows may display backslashes, and tell students to write the course form anyway. Students create the same folders before anyone installs an editor.",
          },
          {
            minutes: 30,
            title: "Save the note and open it in VS Code",
            detail:
              "Install or open Visual Studio Code using the steps for this system. Open the learning folder, create visit-note.txt, and type the four facts from the live visit. Students repeat on their machines. If an install fails, switch that student to the plain text editor and still require the same folder and file name. Walk past every screen once.",
          },
          {
            minutes: 10,
            title: "Fix the failures that actually happened",
            detail:
              "Pause the room and handle the errors you saw: search instead of address, rich text on a Mac, a doubled .txt on Windows, or a Linux permission refusal. Demonstrate one fix on the projector. Do not invent problems nobody had if the room is already saved and calm. Use the spare minute to reopen a file from the file manager.",
          },
          {
            minutes: 10,
            title: "Point at the week assignment",
            detail:
              "Open the week assignment and read the requirements about five pieces of software, the visit, and the saved file. Tell students the lesson box on this page is not the place to submit. Show the path they should write in the assignment. Ask who still needs VS Code installed and note the names.",
          },
        ],
        explain: [
          "The internet is a network. The web is pages on that network. A website is not the whole internet.",
          "The browser is the client. The server stores the page. A domain name is how people name the server's site.",
          "Scheme, domain, and path are the three pieces to read in a simple address.",
          "A file is saved into a folder. The editor is only a window onto that file.",
          "VS Code is the course editor. A blocked install does not block the folder skill.",
        ],
        questions: [
          "If the browser is on your desk, where is the server for example.com?",
          "Which letters in https://example.com/help would you give someone who asked only for the domain?",
          "What is the difference between closing a window and saving a file?",
          "Why does this course write learning/week-01/visit-note.txt even on a Windows computer?",
        ],
        demonstration:
          "Perform the visit and the folder creation live. Type the address in the address bar. Create learning/week-01 in the file manager before you open the editor. Save visit-note.txt, close the editor, and open the file again from the folder so students see that the words live in storage. Then show File, Open Folder in VS Code.",
        practice:
          "Each student creates the same folder structure and their own visit note, with their real browser name. Circulate. Look at the save location, not only at the screen of the editor. A student who saved to the desktop should move or save a new copy into week-01 and say which copy they will keep.",
        expectedOutcomes: [
          "Students can point to the domain in an address on the projector.",
          "learning/week-01 exists on each machine and contains a plain text note that still exists after the editor closes.",
          "Each student can say whether they are on VS Code or on the temporary plain text editor.",
        ],
        difficulties: [
          {
            issue: "A student cannot tell File Explorer, Finder, and the browser apart.",
            help: "Put both windows side by side. Say the browser shows other people's pages and has an address starting with https. The file manager shows folders on this computer. Ask them to click week-01 in the file manager before they return to the browser.",
          },
          {
            issue: "TextEdit or a word processor keeps making a formatted file.",
            help: "Switch on plain text with them watching. On a Mac that is Format, Make Plain Text. If the application has no such command, move them to Notepad, a Linux text editor, or VS Code rather than fighting the word processor.",
          },
          {
            issue: "The installer wants an administrator password the student does not have.",
            help: "Stop the install. Save the note in the editor that is already installed. Write their name on the follow-up list. Do not ask them to guess a password or use someone else's account.",
          },
        ],
        homework:
          "Direct everyone to the module assignment. Say aloud that session 1's five-application writing should be included or rewritten there, and that this session adds the folder path and the visit description. Do not set a second, competing written task.",
        assessment:
          "The live check is the knowledge checks plus a glance at the saved file. The graded piece is the week assignment. A file that only exists inside an unsaved editor window is not evidence yet.",
        recap:
          "Draw the request and response arrows one more time. Ask a student to read their domain line. Ask another to say the folder path using forward slashes. Close by naming next week: they will write a file the browser can show as a page, saved in a new week folder the same way.",
        knowledgeCheckAnswers: [
          {
            id: "w1s2-domain",
            answer: "example.com",
            explanation:
              "The domain is the site's name. https is the scheme, help is the path, and the full line is the whole address.",
          },
          {
            id: "w1s2-client",
            answer: "True",
            explanation:
              "The browser starts the request, so it is the client. The server is the other computer, the one that returns the page.",
          },
          {
            id: "w1s2-save",
            answer:
              "Until you save, the words may only be in memory. Closing the editor can discard them. Saving writes them into the folder.",
            explanation:
              "Accept an answer that contrasts an open unsaved document with a file that remains after the editor closes.",
          },
          {
            id: "w1s2-server",
            answer: "It is the computer that stores the page and sends it back.",
            explanation:
              "The server answers the browser. The back button, a desktop folder, and the keyboard are not the server in this visit.",
          },
        ],
      },
    },
  ],
  assignment: {
    slug: "week-01-assignment",
    title: "Identify software and practise computer navigation",
    summary:
      "Explain five pieces of software from your own life, describe one website visit, and show that you can create a folder and save a file.",
    instructions: `
Write this assignment in plain sentences. You are proving two skills: you can look at software and say what it is, and you can find your way around your own computer.

Part 1. Five pieces of software. Choose five applications or websites you really use. For each one, give its name, the job it does, and whether it is a website, a mobile application, or an application installed on a computer. Then describe one action a person takes and what the software does in response. Say whether the information stays on the device or also has to reach another computer. If you are unsure, say what you are unsure about. Include at least one website and at least one application that is not a website. Use the words hardware and software correctly somewhere in this part.

Part 2. One visit. Open a browser, go to https://example.com or another site your instructor names, and record the browser name, the full address, the domain name, and two sentences about the client and the server.

Part 3. Navigation. Create a folder path learning/week-01 on your computer. Save a plain text file there named visit-note.txt that contains your Part 2 notes. In the assignment, write the path of that file using forward slashes, and say which editor you used. Visual Studio Code is the goal. If you could not install it, name the plain text editor you used instead and why.

Do not include passwords, payment numbers, or another person's private messages. You may use a made-up sentence when you describe a messaging application.
`,
    objectives: [
      "Identify software in everyday life and describe what happens when a person uses it.",
      "Read a web address well enough to name the domain and the two computers involved.",
      "Create a folder and save a plain text file you can find again.",
    ],
    requirements: [
      "Five pieces of software are named, each with a job, a form, and one user action.",
      "At least one item is a website and at least one is a mobile or installed application.",
      "The visit records the browser, the full address, the domain, the client, and the server.",
      "The path learning/week-01/visit-note.txt is stated, and the note is actually saved as plain text.",
      "No secrets or another person's private content appear in the writing.",
    ],
    deliverables: [
      "The written assignment covering all three parts.",
      "The path to visit-note.txt and the name of the editor used to save it.",
    ],
    rubric: [
      {
        criterion: "Five pieces of software",
        points: 30,
        description:
          "Five real items each have a job, a form, and an action with a response. Brand names alone do not score.",
      },
      {
        criterion: "Websites and applications",
        points: 15,
        description:
          "The writing distinguishes a website from a mobile or installed application and uses hardware and software correctly.",
      },
      {
        criterion: "The visit",
        points: 25,
        description:
          "Browser, full address, domain, client, and server are all present and not mixed up.",
      },
      {
        criterion: "Folder and file",
        points: 20,
        description:
          "The course path is written with forward slashes and the student names a real editor and a saved plain text file.",
      },
      {
        criterion: "Care and clarity",
        points: 10,
        description:
          "Another beginner could follow the writing. Private secrets are absent.",
      },
    ],
    points: 100,
    instructorSolution: `
Part 1 can score full marks with five ordinary items. Example shape for one item: "The city bus website. Job: show upcoming buses. Form: website. Action: I choose a stop and the page lists times. The request goes to the bus company's server, so the information does not live only on my phone. The phone itself is hardware. The website and the browser are software." Repeat that shape for a messaging app, a camera app, a browser, and Settings.

Part 2: "Browser: Firefox. Address: https://example.com. Domain: example.com. The client is Firefox on my laptop. The server is the computer that stores example.com and sent the page back."

Part 3: "I saved that note at learning/week-01/visit-note.txt using Visual Studio Code after opening the learning folder. The words were still there when I quit the editor and opened the file from the file manager."

Award the folder points if a blocked install forced Notepad, plain TextEdit, or a Linux text editor, as long as the path and the plain text file are real. Do not award the visit points if the student calls the browser the server.
`,
  },
  quiz: {
    slug: "week-01-quiz",
    title: "Week 1 quiz: computers, the web, and files",
    passingScore: 70,
    allowRetakes: true,
    questions: [
      {
        slug: "w1-q1-hardware",
        type: "multiple_choice",
        prompt: "Which of these is hardware?",
        options: [
          { id: "a", text: "A web browser" },
          { id: "b", text: "The keyboard" },
          { id: "c", text: "A website" },
          { id: "d", text: "A text file of instructions" },
        ],
        correct: { optionId: "b" },
        explanation:
          "The keyboard is a physical part of the computer. The browser, the website, and a file of instructions are software or data.",
        points: 1,
      },
      {
        slug: "w1-q2-software",
        type: "multiple_choice",
        prompt: "What is software?",
        options: [
          { id: "a", text: "The metal case around a laptop" },
          { id: "b", text: "Instructions and data that tell the hardware what to do" },
          { id: "c", text: "Only the games installed from a phone shop" },
          { id: "d", text: "The electricity stored in the battery" },
        ],
        correct: { optionId: "b" },
        explanation:
          "Software is the instructions and the data. Games are one kind of software, not the whole meaning. The case and the battery are hardware.",
        points: 1,
      },
      {
        slug: "w1-q3-frontend",
        type: "multiple_choice",
        prompt: "A frontend developer on a website mainly works on which part?",
        options: [
          { id: "a", text: "The pages, buttons, and other things a person sees and uses" },
          { id: "b", text: "Replacing the laptop battery" },
          { id: "c", text: "The cables in the classroom wall" },
          { id: "d", text: "Only the hidden rules that save an order, with no work on the screen" },
        ],
        correct: { optionId: "a" },
        explanation:
          "Frontend work is the part a person sees and uses. Hidden saving is backend work. Batteries and cables are hardware, not frontend development.",
        points: 1,
      },
      {
        slug: "w1-q4-website-software",
        type: "true_false",
        prompt: "A website is software, even when you open it in a browser instead of installing it.",
        correct: { value: true },
        explanation:
          "A website is written by people and stored on a server. The browser fetches it and shows it. Install is not required for something to be software.",
        points: 1,
      },
      {
        slug: "w1-q5-fullstack",
        type: "true_false",
        prompt: "Full-stack means a developer has memorised every programming tool.",
        correct: { value: false },
        explanation:
          "Full-stack means the person can work on both the frontend and the backend of a feature. It does not mean they know every tool.",
        points: 1,
      },
      {
        slug: "w1-q6-domain",
        type: "multiple_choice",
        prompt: "In https://example.com/help, which part is the domain name?",
        options: [
          { id: "a", text: "https" },
          { id: "b", text: "example.com" },
          { id: "c", text: "help" },
          { id: "d", text: "The whole line, including https and the path" },
        ],
        correct: { optionId: "b" },
        explanation:
          "example.com is the domain. https is the scheme, and help is the path. The whole line is the web address, not only the domain.",
        points: 1,
      },
      {
        slug: "w1-q7-browser",
        type: "multiple_choice",
        prompt: "Which of these is a browser's job when you visit a page?",
        options: [
          { id: "a", text: "To store every website permanently inside the keyboard" },
          { id: "b", text: "To request a page and show the response" },
          { id: "c", text: "To replace the operating system" },
          { id: "d", text: "To act as the server that owns example.com" },
        ],
        correct: { optionId: "b" },
        explanation:
          "The browser is the client. It asks the server for a page and draws what comes back. It is not the server and it is not the operating system.",
        points: 1,
      },
      {
        slug: "w1-q8-note",
        type: "code_reading",
        prompt: "A student saved this note. Which line names the client?",
        codeSnippet: `Browser: Firefox
Address: https://example.com
Domain: example.com
Client: the browser on my laptop
Server: the computer that stores the page`,
        options: [
          { id: "a", text: "The browser on my laptop" },
          { id: "b", text: "The computer that stores the page" },
          { id: "c", text: "example.com" },
          { id: "d", text: "https://example.com" },
        ],
        correct: { optionId: "a" },
        explanation:
          "The note labels the client as the browser on the laptop. The computer that stores the page is the server. The other lines are the address and the domain.",
        points: 2,
      },
      {
        slug: "w1-q9-request",
        type: "short_answer",
        prompt:
          "In two or three sentences, explain what happens when you type a web address and press Enter. Mention the browser and the server.",
        correct: {
          rubric:
            "Award full points if the answer says the browser requests the page and the server sends the page back. Award partial points if only one of those two roles is described. Do not require the words client, HTTP, or DNS.",
        },
        explanation:
          "Typing an address makes the browser send a request. The server that stores the site sends a response, and the browser shows the page. That is the whole story this week needs.",
        points: 2,
      },
    ],
  },
};
