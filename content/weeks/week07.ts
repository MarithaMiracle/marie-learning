import type { ModuleSeed } from "../../src/lib/content-types";

function c(text: string) {
  return "`" + text + "`";
}

function fence(language: string, code: string) {
  return "```" + language + "\n" + code.trim() + "\n```";
}

const gradeCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Grade checker</title>
</head>
<body>
  <h1>Grade checker</h1>
  <p>Open the console to see each decision.</p>
  <script>
    function letterGrade(score) {
      if (score >= 90) {
        return "A";
      } else if (score >= 80) {
        return "B";
      } else if (score >= 70) {
        return "C";
      } else if (score >= 60) {
        return "D";
      } else {
        return "F";
      }
    }

    console.log(letterGrade(92));
    console.log(letterGrade(80));
    console.log(letterGrade(74));
    console.log(letterGrade(61));
    console.log(letterGrade(59));
  </script>
</body>
</html>`;

const functionsCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Reusable totals</title>
</head>
<body>
  <h1>Reusable totals</h1>
  <script>
    function lineTotal(price, count) {
      const total = price * count;
      return total;
    }

    console.log(lineTotal(3, 2));
    console.log(lineTotal(1.5, 4));

    let stepsLeft = 3;
    while (stepsLeft > 0) {
      console.log(stepsLeft);
      stepsLeft -= 1;
    }

    for (let number = 1; number <= 3; number++) {
      console.log("for loop: " + number);
    }
  </script>
</body>
</html>`;

export const week07: ModuleSeed = {
  slug: "week-07-control-flow",
  number: 7,
  weekNumber: 7,
  monthLabel: "Month 2 — CSS layout, JavaScript and problem solving",
  title: "Conditions, loops, and functions",
  description:
    "This week a script can choose and repeat. Conditions use true or false answers to pick a message, such as a ticket group or a letter grade. Loops repeat work. Functions package a calculation so you can call it with new numbers instead of copying the whole block.",
  lessons: [
    {
      slug: "conditions",
      sessionNumber: 13,
      title: "Conditions",
      estimatedMinutes: 90,
      difficulty: "Guided practice",
      requiresOs: true,
      content: {
        overview: {
          about:
            "This lesson teaches a script to choose. You already know how to produce true or false with comparisons. Here you will use if, else, and else if so only one path runs. You will nest a decision inside another, combine questions with AND, OR, and NOT, and take a first look at the ternary operator. The practice is an age checker and a grading calculator.",
          why:
            "A shopping total that always prints the same shape of message cannot say pass or fail, youth ticket or adult ticket. Decisions are how a program reacts to the value it just calculated.",
          alreadyKnow:
            "You can store numbers and booleans, compare them with === and >=, and print results with console.log.",
        },
        objectives: [
          "Write an if statement that runs a block only when a condition is true.",
          "Chain else and else if so later bands are checked only after earlier ones fail.",
          "Nest one condition inside another and say which question is asked second.",
          "Use &&, ||, and ! inside a condition, and read a simple ternary that chooses one of two values.",
          "Build an age checker and a grade calculator whose console output matches the rules you wrote.",
        ],
        prerequisites: [
          {
            label:
              "You can declare const and let, compare numbers with ===, !==, and >=, and combine booleans with &&, ||, and !.",
            lessonSlug: "variables-types-operators",
          },
        ],
        teachingNotes: [
          {
            heading: "Decisions and Boolean logic",
            markdown: [
              `A condition is a question with a yes-or-no answer. You already know how to ask. ${c("score >= 60")} is true or false. Boolean logic is the set of rules for those answers: a comparison makes one, and AND, OR, and NOT combine them. Until now the script logged the answer and continued in a straight line. A decision uses the answer to choose which statements run.`,
              `Picture a cinema door. The person at the door looks at an age. Under 18, the note says youth ticket. From 18 up to 64, adult ticket. From 65, concession ticket. They do not shout all three labels. They pick one. A program should do the same. If every console.log in a file runs, you did not write a decision. You wrote a list. The point of this lesson is that some lines stay quiet on purpose.`,
              `The grammar starts with ${c("if")}, a condition in parentheses, and a block in braces. The block runs only when the condition is true. When it is false, the browser skips the block and continues after the closing brace.`,
              fence(
                "js",
                `
const score = 74;
if (score >= 60) {
  console.log("Pass");
}
`,
              ),
              `Read it aloud: if score is at least 60, log Pass. With 74, you see Pass. Change score to 50, reload, and the console stays quiet. That silence is correct. Nothing after the if was waiting, so the script ends. The braces matter. They mark the statements that belong to the decision. A missing brace is a syntax error, the same family you met last week. One statement per line inside the block keeps the choice readable.`,
              `:::misunderstanding if(score >= 60); logs the message anyway
A semicolon immediately after the parentheses ends the if before the block. The log then sits outside the decision and runs every time. Put the opening brace before any semicolon. The condition's closing parenthesis should be followed by a brace, not by a semicolon.
:::`,
              `Use an explicit comparison inside if. ${c("if (score >= 60)")} says what you mean. JavaScript also treats some other values as roughly true or false, and that shortcut hides mistakes while you are learning. This course writes the question in full.`,
            ].join("\n\n"),
          },
          {
            heading: "else and else if",
            markdown: [
              `${c("else")} is the path for when the if question was false. It does not have its own condition. It means "otherwise."`,
              fence(
                "js",
                `
const score = 50;
if (score >= 60) {
  console.log("Pass");
} else {
  console.log("Not yet");
}
`,
              ),
              `Exactly one of those two logs runs. Pass and Not yet are not both possible for a single score. That is the difference between a decision and two independent if statements. Two separate if statements can both be true. An if/else pair cannot.`,
              `Grade bands need more than two paths. ${c("else if")} asks another question only when every earlier question was false. Order is the whole trick. Put the high band first.`,
              fence(
                "js",
                `
function letterGrade(score) {
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}
`,
              ),
              `Walk 92 through it. 92 is at least 90, so the function returns A and does not look at B, C, D, or F. Walk 74. 74 is not at least 90. It is not at least 80. It is at least 70, so the result is C. Walk 59. Every numbered band fails, so else returns F. The return word sends the letter back to the caller. You will study functions properly in the next lesson. Here, return also stops the function, which makes the "only one path" rule easy to see.`,
              `A common bug is to test the low band first. ${c("if (score >= 60)")} is true for 92 as well as for 61. If that test comes first and returns D, a score of 92 never reaches the A test. The later else if lines are skipped because an earlier condition already succeeded. Write bands from the strict end to the loose end, and say the order out loud before you trust the output.`,
              `:::example Door labels in order
The door person who asks "65 or over?" first, then "18 or over?", then everyone else, never calls a 70-year-old an adult by mistake. The same person who asks "18 or over?" first will hand the adult ticket to almost everyone, including people who should have received the concession. The questions can be fair one by one and still be wrong in the wrong order.
:::`,
            ].join("\n\n"),
          },
          {
            heading: "Nested conditions",
            markdown: [
              `A nested condition is a decision inside a decision. The outer question must be true before the inner question is even asked. Use nesting when the second question does not make sense unless the first answer is yes.`,
              fence(
                "js",
                `
const age = 16;
const withAdult = true;
if (age < 18) {
  if (withAdult) {
    console.log("Youth ticket, adult present");
  } else {
    console.log("Youth ticket, ask for an adult");
  }
} else {
  console.log("Adult ticket");
}
`,
              ),
              `At age 30 the inner if never runs. The script does not ask whether an adult is present, because that question belonged only to the under-18 path. At age 16 with withAdult false, both levels run and you see the ask-for-an-adult message. Nesting matches rules that are genuinely stacked. It becomes hard to read when you nest three or four levels for a rule that was really a list of bands. Grade bands are a chain of else if, not a nest. The age-plus-companion rule is a nest. Choose the shape that matches the rule.`,
              `You can trace a nest with a finger on the screen. Start at the outer if. If it is false, jump to its else and ignore the inner braces. If it is true, enter the block and meet the next if as a fresh question. Indent the inner block so the braces line up. The editor will help. A brace that closes too early attaches the inner else to the wrong if. When the message seems to come from the wrong rule, count braces before you rewrite the questions.`,
              `:::warning The inner else belongs to the nearest open if
An else pairs with the closest if that does not yet have an else. Indentation does not decide the pairing. The braces do. If an else seems to fire for the wrong question, put braces around every branch so the pair is visible.
:::`,
              `Nested decisions still use the comparisons you know. There is no new operator inside the inner if. The new skill is knowing which question is allowed to wait. If both questions always matter, you might not need a nest. You might need AND, which asks both at once. The next section is that choice.`,
            ].join("\n\n"),
          },
          {
            heading: "AND, OR, and NOT in a decision",
            markdown: [
              `${c("&&")} means both sides must be true. ${c("||")} means at least one side must be true. ${c("!")} flips a boolean. You logged these operators last week. Now they sit inside the parentheses of if, so they choose a path.`,
              fence(
                "js",
                `
const age = 70;
const member = false;
if (age >= 65 || member) {
  console.log("Reduced fare");
} else {
  console.log("Standard fare");
}
`,
              ),
              `70 with member false still gets the reduced fare, because OR succeeds when the age test succeeds. Change age to 40 and member to false, and both sides are false, so the else runs. Change member to true at age 40, and OR succeeds because of the membership. Say the sentence in English before you type the symbols. "Reduced fare if they are 65 or over, or they are a member." If the English uses "or", the operator is ||. If the English uses "both" or "and", the operator is &&.`,
              `NOT is for a rule that is easier to say in the negative. ${c("if (!member)")} means the person is not a member. It is the same answer as ${c("member === false")} when member is a real boolean. Prefer the explicit comparison when you are tired, and use ! when the name already reads as a question, such as ${c("!hasTicket")}. Do not pile several NOTs onto one line. ${c("if (!hasTicket === false)")} is a tangle. Split it into a named boolean you can log.`,
              `AND is stricter than a nest that you meant as "both", and it is shorter. ${c("if (age >= 18 && hasTicket)")} asks both questions. If either fails, the block does not run. There is a detail worth knowing: with &&, if the left side is false, the right side is not evaluated. With ||, if the left side is true, the right side is not evaluated. For this course the values are simple numbers and booleans, so you will not notice the skip. Do not put an assignment inside a condition and hope it always runs. Keep assignments on their own lines. Keep conditions as questions.`,
              `:::misunderstanding OR means both, because both words appeared in the sentence
Students sometimes translate "65 or over, and also members" into the wrong symbol because the sentence was long. Write two short sentences. Circle the word and or the word or. Then type && or ||. Log each side on its own line if the branch surprises you.
:::`,
              `A grade calculator rarely needs AND. A score is one number. An age checker sometimes does: under 18 and accompanied, or 65 or over, or a member. When you finish a rule, list the cases that should see each message. Include a case that should miss it. One positive example and one negative example catch more bugs than five similar scores.`,
            ].join("\n\n"),
          },
          {
            heading: "A first look at the ternary operator",
            markdown: [
              `The ternary operator chooses one of two values. It is a compact if/else for a value, not a place to store a long story. The shape is condition, question mark, value if true, colon, value if false.`,
              fence(
                "js",
                `
const score = 74;
const result = score >= 60 ? "Pass" : "Not yet";
console.log(result);
`,
              ),
              `Read the symbols as a sentence: if score is at least 60, result is Pass, otherwise result is Not yet. The question mark and the colon are both required. It produces a value, so you can assign it or pass it to console.log. It does not need braces.`,
              `This is a first look, not a new law that you must use. If/else is clearer when there are three or more bands, when each branch contains several statements, or when you are still tracing the rule. A nested ternary, with another question mark inside the false side, is hard to read and easy to mis-order. Do not write one this week. Use else if for grades. Use a ternary only when you are naming one of two short values.`,
              `The operator does not change Boolean logic. The condition is still a boolean question. The two results can be strings, numbers, or other values. They should be the same kind of thing if a later line will treat them alike. A ternary that sometimes returns a number and sometimes returns a sentence will confuse the next calculation. Pick one kind.`,
              `:::tip Reach for if when you hesitate
If you cannot read the ternary aloud in one breath, write if and else. The result is the same. Clarity is the goal. The short form is there for a two-way label, such as pass or not yet, once the if version already makes sense to you.
:::`,
            ].join("\n\n"),
          },
          {
            heading: "An age checker and a grading calculator",
            markdown: [
              `The age checker is a chain, plus one guard at the top for impossible input. A negative age should not receive a youth ticket. Zero can be a real age for this exercise. A very large age, such as 200, can fall through to concession unless you add an upper guard. For class, reject scores and ages outside a stated range with a first if, then handle the bands.`,
              fence(
                "js",
                `
function ticketGroup(age) {
  if (age < 0) {
    return "Enter an age of zero or more.";
  } else if (age < 18) {
    return "Youth ticket";
  } else if (age < 65) {
    return "Adult ticket";
  } else {
    return "Concession ticket";
  }
}
`,
              ),
              `Trace 16, 18, 64, 65, and -1. The boundary values matter more than a comfortable middle. 18 should be an adult if the rule is under 18 for youth. ${c("age < 18")} leaves 18 for the next test. ${c("age <= 18")} would keep 18 in the youth band. The symbol at the boundary is a decision about the rule, not a decoration. Write the rule in a comment above the function in ordinary words, then make the operators match the comment.`,
              `The grading calculator uses the same shape with different numbers. Agree the bands before you type: 90 and above is A, 80 and above is B, 70 and above is C, 60 and above is D, and anything lower that is still a real score is F. Call the function at least five times: one score in each band, including a score that sits on a boundary such as 80. 80 should be B if B starts at 80. If your log says C, the B test is missing or it is below the C test.`,
              `Practice order: write the English rule, type the chain from the top band downward, log one score per band, and fix the first disagreement before you add nesting or a ternary. Then, if you want a second decision, add the accompanied-youth nest or a member OR to the ticket function. Do not start with the most complicated rule. A straight chain that traces cleanly is the success of this lesson.`,
              `:::example Boundary on purpose
80 is the first score of the B band in the rule above. Test 80 and 79. They should differ. If they do not, the conditions overlap or stand in the wrong order. Boundaries teach more than a score of 95, which only the first test can catch.
:::`,
            ].join("\n\n"),
          },
        ],
        vocabulary: [
          {
            term: "Condition",
            definition:
              "A question that is true or false, written in parentheses after if, such as score >= 60.",
          },
          {
            term: "if",
            definition:
              "A statement that runs the following block only when its condition is true, and skips that block when the condition is false.",
          },
          {
            term: "else",
            definition:
              "The branch that runs when the matching if, and any else if tests before it, were all false.",
          },
          {
            term: "else if",
            definition:
              "A further question asked only when earlier conditions in the same chain were false. Order changes which band wins.",
          },
          {
            term: "Nested condition",
            definition:
              "An if inside another if. The inner question is asked only when the outer condition is true.",
          },
          {
            term: "Ternary operator",
            definition:
              "A compact form, condition ? valueIfTrue : valueIfFalse, that chooses one of two values. It is a short if/else for a value.",
          },
        ],
        demonstrations: [
          {
            title: "Trace an age checker and a grade chain",
            intro:
              "You will save a script that returns a ticket group from an age and a letter from a score. You will test boundary values in the console. The JavaScript is the same on every operating system. Opening the terminal and the console is not.",
            steps: [
              "Open a terminal for your system, enter learning/week-07, and create the folder if it does not exist yet.",
              "Create learning/week-07/decisions.html with a heading and a script at the end of the body.",
              "Add a ticketGroup function with a guard for negative ages, then youth under 18, adult under 65, and concession otherwise. Return a short string from each branch.",
              "Add a letterGrade function with A from 90, B from 80, C from 70, D from 60, and F otherwise. Put the highest band first.",
              "Log ticketGroup for -1, 16, 18, 64, and 65. Log letterGrade for 92, 80, 79, 60, and 59.",
              "Save, open the file in the browser, and open the console. Compare each line with the English rule before you change any operator.",
              "Swap two grade bands on purpose, reload, and watch a high score receive the wrong letter. Put the bands back in high-to-low order and reload.",
              "Add one ternary that sets a pass label from a score of your choice, log it, and leave the grade bands in if and else if form.",
            ],
            expected:
              "Negative age returns the guard message. 16 is a youth ticket, 18 and 64 are adult tickets, and 65 is a concession. Grades read A, B, C or the band you intended for 79, D, and F. The ternary prints one of two short labels and does not replace the five-band function.",
            verify:
              "Read the console from top to bottom against a written list of inputs. Each boundary, 18, 65, 80, and 60, should sit in the band your comment describes. There should be no syntax error, and only one message per call.",
            ifItFails:
              "If every grade is D, the lowest passing test is probably first. If the console shows nothing, the functions return values but you never logged the calls. If you see a syntax error near else, an earlier brace closed the if too soon. If a semicolon sits right after if ( ... ), the block is not attached to the decision.",
            os: {
              sameOnAllPlatforms:
                "The if statements, the ticket rules, and the grade bands are the same on Windows, macOS, and Linux. Save and reload the same way everywhere. The steps that differ are how you open the terminal, how you open the HTML file, and how you open the console.",
              identify: [
                "Windows shows a Start button and a taskbar. macOS shows an Apple menu and a Dock. Many Linux desktops show Activities or a menu named for the distribution.",
                "If the console shortcut from a classmate does nothing, use the browser menu named More tools, Develop, or Developer tools. The script does not depend on the operating system.",
              ],
              windows: [
                "Open Command Prompt from the Start menu. Run cd learning\\week-07. If that fails, run mkdir learning\\week-07 and then cd into it.",
                "After you save decisions.html, run start decisions.html or open the file from File Explorer.",
                "Press F12 or Ctrl+Shift+I and select Console. Reload after each change to the band order.",
                "Open Visual Studio Code from the Start menu and use File, Open Folder on week-07.",
              ],
              macos: [
                "Open Terminal with Command and Space. Run cd learning/week-07, or mkdir -p learning/week-07 first if the folder is new.",
                "Run open decisions.html, or use Finder via Go, Go to Folder.",
                "Open the console with Command+Option+I, holding fn if the function keys are used for brightness. The Develop menu works as well.",
                "Open Visual Studio Code from Spotlight and open the week-07 folder.",
              ],
              linux: [
                "Open Terminal from the application menu. Run cd learning/week-07 or mkdir -p learning/week-07 and then cd into it.",
                "Run xdg-open decisions.html, or open the file from the file manager.",
                "Press F12 or Ctrl+Shift+I for the console. If the desktop uses those keys, choose Developer tools from the browser menu.",
                "Open Visual Studio Code from the application menu and open the week-07 folder.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "Letter grades from the top band downward",
            filename: "learning/week-07/grade-checker.html",
            language: "html",
            code: gradeCode,
            explanation:
              "letterGrade asks the strictest question first. A score of 92 returns A immediately. A score of 80 fails the A test and passes the B test, so it returns B and never reaches C. A score of 59 fails every numbered test and returns F from else. Each call logs one letter. The function is a preview of the next lesson: the name, the parameter score, and return.",
            lineNotes: [
              {
                focus: "highest band first",
                note: "score >= 90 is the first test. If a lower band came first, high scores would be caught too early.",
              },
              {
                focus: "else if chain",
                note: "Each else if runs only when every test above it was false. The bands do not all run.",
              },
              {
                focus: "final else",
                note: "The else has no condition. It handles every remaining number, including low scores.",
              },
              {
                focus: "five calls",
                note: "The logs cover A, the B boundary at 80, a C, a D, and an F. Boundaries are the scores worth tracing.",
              },
            ],
            expectedOutput:
              "The console shows A, then B, then C, then D, then F, one letter per line. The page shows the heading Grade checker. No score prints two letters.",
            level: "practical",
          },
        ],
        exercises: [
          {
            title: "Five ages, including the boundaries",
            difficulty: "warm-up",
            prompt:
              "Write ticketGroup for youth under 18, adult from 18 to 64, and concession from 65. Reject a negative age. Log five ages you chose so that each message appears at least once.",
            steps: [
              "Create learning/week-07/ages.html with the function and a comment that states the three bands in English.",
              "Put the negative-age test first, then the youth test, then the adult test, then else.",
              "Log at least five calls, including 17, 18, 64, and 65 if those are your boundaries.",
              "Reload and mark each log as matching or not matching the comment. Fix the first mismatch.",
            ],
            expectedOutcome:
              "Each console line is one ticket message. 17 and 18 differ. 64 and 65 differ. A negative age does not receive a youth ticket.",
          },
          {
            title: "Grades plus one nested rule",
            difficulty: "practice",
            prompt:
              "Write letterGrade with the five bands from the demonstration, tested on a boundary. Then add a second function that nests a question: under 18 and accompanied by an adult, versus under 18 and not accompanied.",
            steps: [
              "Implement letterGrade from 90, 80, 70, and 60 downward, and log 90 and 89.",
              "Implement a second function that takes age and withAdult.",
              "Nest the withAdult test inside the under-18 branch. The 18-and-over branch should not mention the companion.",
              "Log one under-18 call for each companion value, and one adult call. Add a ternary only if you still want a two-word pass label beside the grades.",
            ],
            expectedOutcome:
              "90 and 89 produce different letters. The adult call does not print the companion message. The two youth calls differ from each other. You can point to the outer condition and the inner condition.",
          },
        ],
        troubleshooting: [
          {
            problem: "Every score prints the same letter, usually the lowest passing band.",
            why: "A wide test such as score >= 60 is above the stricter tests. Once it succeeds, later else if branches are skipped. High scores are included in the low band.",
            solution:
              "Reorder the chain from the highest band to the lowest. Reload and test one score on each boundary, such as 90, 80, 70, and 60. The first test that should fail for a B is the A test, not the D test.",
          },
          {
            problem: "Both the if message and the else message appear for one score.",
            why: "They are two separate if statements, or a semicolon after the if parentheses ended the decision so the following log always runs.",
            solution:
              "Use else between the two paths so they share one decision. Delete any semicolon that sits between the closing parenthesis and the opening brace. Reload and confirm one line per call.",
          },
          {
            problem: "The inner else seems to run for an adult age.",
            why: "The else is paired with the outer if, or a missing brace closed the outer block too soon, so the companion test is not actually nested.",
            solution:
              "Put braces around every branch. Indent the inner if inside the under-18 block. Trace age 30 with your finger: it should land in the outer else and never enter the companion test. Reload after the braces match.",
          },
          {
            problem: "The ternary line shows a syntax error near the colon or the question mark.",
            why: "One of the three parts is missing, or a second question mark was added for a third band. The ternary form only chooses between two values.",
            solution:
              "Rewrite that one line as if and else if you need more than two outcomes. If you keep it, use exactly one question mark and one colon. Log the condition on the previous line so you know which value you expected.",
          },
        ],
        knowledgeChecks: [
          {
            id: "cond-order",
            question:
              "A grade function tests score >= 60 before score >= 90, and both branches return. What happens to a score of 95?",
            format: "Multiple choice",
            options: [
              "It returns the 60 band, because that test succeeds first and later tests are skipped.",
              "It returns the 90 band, because JavaScript always prefers the larger number.",
              "It returns both letters, because both comparisons are mathematically true.",
              "It throws a syntax error, because bands must be written in random order.",
            ],
          },
          {
            id: "cond-nest-vs-else",
            question: "When is a nested if a better fit than another else if?",
            format: "Multiple choice",
            options: [
              "When the second question should be asked only if the first answer was yes.",
              "When you have five grade bands that all look at the same score.",
              "When you want every branch to run no matter what.",
              "When you need a for loop.",
            ],
          },
          {
            id: "cond-ternary-limit",
            question: "What does a ternary operator choose, and when should you stay with if and else if instead?",
            format: "Short answer",
          },
        ],
        homework: {
          description:
            "Write a lesson response that traces one age and one score through your conditions. Include the English rule, the branch that ran, and one boundary you tested.",
          requirements: [
            "Paste ticketGroup or your age function and say what 17 and 18 return, and why those two ages are a boundary.",
            "Paste letterGrade and say what 80 returns. Explain what would go wrong if the 60 band were tested first.",
          ],
          deliverables: [
            "A lesson response of about 150 to 250 words with the two functions pasted in.",
            "The portable path of your HTML file, such as learning/week-07/decisions.html.",
          ],
          submission:
            "Submit this as the lesson response for Conditions. The graded grade-calculator or guessing program is the module assignment after the next session, when functions and loops are in place.",
          criteria: [
            "The response shows a real boundary with two different results, matching the operators in the pasted code.",
            "The response explains chain order: a later else if runs only when earlier tests fail.",
          ],
          submissionKind: "lesson_response",
        },
        summary: [
          "if runs a block only when a condition is true. else is the otherwise path. else if asks another question only after earlier ones fail.",
          "Order matters. Test a high grade band before a low one, or the low test will catch the high scores.",
          "Nest a condition when the inner question depends on the outer answer. Use &&, ||, and ! when you want both, either, or the opposite inside one test.",
          "A ternary chooses one of two values. Grade bands and other multi-step rules stay clearer as if and else if.",
        ],
        nextLesson: {
          title: "Loops and functions",
          why: "You can choose a grade once. Functions let you reuse that choice, and loops let you repeat work without copying the same lines again and again.",
          lessonSlug: "loops-and-functions",
        },
      },
      guide: {
        sessionNumber: 13,
        week: 7,
        title: "Conditions",
        durationMinutes: 90,
        objectives: [
          "Students trace one score through an else if chain from the top.",
          "Students can say when a nested if is doing different work from else if.",
          "Students leave with boundary tests for an age rule and a grade rule.",
        ],
        tools: [
          "Browser console",
          "Visual Studio Code",
          "A written band table on the board before any code",
        ],
        preparation: [
          "Write the grade bands on the board, highest first, with the boundary scores 90, 80, 70, and 60 circled.",
          "Prepare a file where score >= 60 is first, so 95 returns the wrong letter, and a repaired file beside it.",
          "Prepare an age function with a semicolon after if so the else seems to run as well. You will reveal that bug in the clinic.",
          "Confirm the console shortcut on the teaching machine, including the macOS menu path.",
        ],
        flow: [
          {
            minutes: 5,
            title: "One door, one ticket",
            detail:
              "Ask the room how a cinema should label ages 16, 18, and 70. When someone lists all three labels for one person, stop and say a decision picks one. Write the three bands in order on the board. Do not open the editor.",
          },
          {
            minutes: 15,
            title: "if, else, and order",
            detail:
              "Show a single if that stays silent for a failing score. Add else. Then show the broken grade chain with the 60 test first and walk 95 through it aloud. Repair the order from 90 downward. Mark that return leaves the function immediately.",
          },
          {
            minutes: 20,
            title: "Live boundaries",
            detail:
              "Type ticketGroup and log -1, 17, 18, 64, and 65. Narrate which test fails and which succeeds. Add a nested withAdult branch only for under 18. Then add one ternary for Pass or Not yet and say you will not use it for five bands.",
          },
          {
            minutes: 30,
            title: "Student checkers",
            detail:
              "Students create decisions.html and run the boundary exercise. Walk the room with the question: which test ran, and which tests were skipped? Do not accept a demo that only tries 95 and 40. Ask for a boundary score.",
          },
          {
            minutes: 10,
            title: "Wrong-pair clinic",
            detail:
              "Project the semicolon-after-if bug or a nest whose else belongs to the outer if. Have the room predict the message for age 30 before you reload. Fix braces only. Do not add new bands during the clinic.",
          },
          {
            minutes: 10,
            title: "Response and the next reuse",
            detail:
              "Ask the knowledge checks. Explain the lesson response: 17 versus 18, and what 80 returns, plus the danger of testing 60 first. Preview functions as the way to call letterGrade without pasting it twice, and loops as repetition. The module assignment waits until the next session.",
          },
        ],
        explain: [
          "A condition chooses a block. Silence can be the correct result.",
          "else if order, from strict bands to loose bands.",
          "Nesting versus a flat chain.",
          "&&, ||, and ! inside the parentheses.",
          "A ternary as a two-value shortcut, not as a replacement for grade bands.",
          "Boundary tests: the number where the letter should change.",
        ],
        questions: [
          "If score >= 60 is the first test and it returns, why does 95 never reach the A test?",
          "For an under-18 companion rule, why is the companion question inside the youth branch instead of beside it as another else if?",
          "What will a semicolon between if (score >= 60) and the brace do to the log inside the brace?",
        ],
        demonstration:
          "Build ticketGroup and letterGrade live, log the boundary ages and scores, and briefly show the broken low-band-first chain before you restore high-to-low order. Add one ternary only after the if chain works.",
        practice:
          "Students save learning/week-07/decisions.html, test 17 and 18 plus a negative age, and test a grade boundary such as 80 and 79. They mark mismatches against an English comment.",
        expectedOutcomes: [
          "Each student can show one boundary that changes the message.",
          "Students can point to the first test that succeeded for a given score.",
          "Students can say why a ternary is a poor place for five grade bands.",
        ],
        difficulties: [
          {
            issue: "The student tests only 95 and thinks the chain is finished.",
            help: "Ask them to log 90 and 89, then 60 and 59. Sit with them while they say which test failed. If 90 and 89 match, the A operator is wrong or the bands are ordered badly. Fix that pair before adding scores.",
          },
          {
            issue: "else runs even when the if condition is true.",
            help: "Look for a semicolon after the if parentheses, or for two separate if statements. Delete the semicolon or add else so the second block is attached. Reload with one score. Only one message should remain.",
          },
          {
            issue: "The nested companion message appears for an adult.",
            help: "Have them point to the brace that closes the under-18 block. Move the inner if inside those braces. Trace age 40 with a finger on the source, then reload to confirm the outer else is the only adult path.",
          },
        ],
        homework:
          "The lesson response traces 17 and 18, states what 80 returns, and explains the failure mode of testing the 60 band first. It includes the pasted functions and the file path. It is not yet the module assignment.",
        assessment:
          "Listen for skipped branches in the knowledge checks. During practice, look at boundary logs rather than the heading. The written response is the take-home evidence. Grade bands copied in the wrong order should be returned for a rewrite of the trace, not praised for having five returns.",
        recap:
          "Point at one score on the board and cross out the tests that did not run. Tell them the function wrapper becomes the main topic next time, so letterGrade can be called for many scores without being rewritten. Loops will remove the temptation to paste console.log twenty times.",
        knowledgeCheckAnswers: [
          {
            id: "cond-order",
            answer:
              "It returns the 60 band, because that test succeeds first and later tests are skipped.",
            explanation:
              "else if is not a search for the best match. It is a sequence. The first true test wins, so a wide low band placed first captures high scores.",
          },
          {
            id: "cond-nest-vs-else",
            answer:
              "When the second question should be asked only if the first answer was yes.",
            explanation:
              "A nest keeps the inner question inside the outer success path. Five bands on one score are a chain of else if, not a nest.",
          },
          {
            id: "cond-ternary-limit",
            answer:
              "A ternary chooses one of two values. Stay with if and else if when there are more than two paths or several statements in a branch.",
            explanation:
              "The form condition ? a : b is a two-way value. Grade bands have more than two outcomes, so a chain is clearer and less error-prone.",
          },
        ],
      },
    },
    {
      slug: "loops-and-functions",
      sessionNumber: 14,
      title: "Loops and functions",
      estimatedMinutes: 90,
      difficulty: "Bringing ideas together",
      requiresOs: true,
      content: {
        overview: {
          about:
            "This lesson is about repetition and reuse. A loop runs a block while a condition stays true, using for or while, and it changes a counter with increment or decrement. A function packages statements under a name, with parameters, arguments, and a return value. You will also see scope: names declared inside a function stay inside it. The practice is a calculation you can call more than once.",
          why:
            "Copying the same grade rules five times creates five places to fix a mistake. A function is one place. A loop is how you repeat a step a counted number of times without a novel of duplicated lines.",
          alreadyKnow:
            "You can write if, else, and else if, and you can calculate a line total from a price and a count.",
        },
        objectives: [
          "Explain why a loop is safer than pasting the same statements many times.",
          "Write a for loop and a while loop whose condition stops, using increment and decrement.",
          "Declare a function, call it with arguments, and return a value the caller can log.",
          "Tell a parameter from an argument, and name one limit of scope.",
          "Use one calculation function for at least two different inputs.",
        ],
        prerequisites: [
          {
            label:
              "You can choose a path with if, else, and else if, and you can trace a boundary value through the chain.",
            lessonSlug: "conditions",
          },
        ],
        teachingNotes: [
          {
            heading: "Why loops exist",
            markdown: [
              `A loop repeats a block. You use one when the same kind of step must happen more than once, and you can say when it should stop. Printing the numbers 1, 2, and 3 by writing three console.log lines works. Printing 1 through 100 that way is a copying exercise, and a dangerous one. If the message needs a small change, you have to edit every copy. People miss a copy. The copies drift apart. A loop keeps one copy of the step and a rule for repeating it.`,
              `Think of stirring a pot. The instruction is not "stir, stir, stir" written thirty times. The instruction is "stir until the sauce coats the spoon" or "stir ten times." The action is one action. The stop rule is separate. In JavaScript the action is the loop body, the block in braces. The stop rule is a condition, the same kind of true-or-false question you used with if. The difference: if asks once. A loop asks again after each pass, until the answer says stop.`,
              `Every loop you write this week needs three things you can point at. A starting state, such as a counter at 1. A condition that is true while the loop should continue. An update inside the body, or in the for-loop header, that moves the state toward the condition becoming false. If the update is missing, the condition never becomes false. The loop runs until you close the tab. That is called an infinite loop. It is not a moral failure. It is a missing update. You will meet it once, on purpose or by accident, and the fix is to close the tab, put the update back, and reload.`,
              `:::warning Save before you run a while loop
A condition that stays true will keep the page busy. The console may stop responding. Close that browser tab, fix the file, and open it again. Do not keep clicking reload on a frozen tab and hope the loop notices.
:::`,
              `Loops do not replace conditions. A grade decision is still an if chain. A loop might call that decision several times. The loop is the repetition. The if is the choice inside one repetition. Keeping those jobs separate makes both easier to test.`,
            ].join("\n\n"),
          },
          {
            heading: "The for loop",
            markdown: [
              `A for loop is the usual tool when you know how many times to repeat, or you can count from a start to a stop. It has three parts in parentheses, separated by semicolons: start, condition, update.`,
              fence(
                "js",
                `
for (let number = 1; number <= 3; number++) {
  console.log(number);
}
`,
              ),
              `Read the header from left to right, then understand the rhythm. ${c("let number = 1")} runs once, at the start. ${c("number <= 3")} is checked before every pass. If it is true, the body runs, then ${c("number++")} runs, then the condition is checked again. If it is false, the loop stops and the script continues after the closing brace. For this loop the console shows 1, then 2, then 3. After the body prints 3, number becomes 4, 4 <= 3 is false, and the loop ends.`,
              `${c("number++")} is an increment. As its own step, it means add 1 to number. It is the same idea as ${c("number = number + 1")} or ${c("number += 1")}. ${c("number--")} is a decrement. It subtracts 1. You will see ++ in almost every for loop that counts upward. Use it in the update slot or as its own statement. Do not also add 1 inside the body unless you mean to skip numbers. Two increments make the loop count by twos, which looks like a broken condition.`,
              `The condition is where off-by-one errors live. ${c("number < 3")} with a start of 1 prints 1 and 2, not 3. ${c("number <= 3")} includes 3. People remember this by saying the stop test aloud: "while number is less than or equal to 3." If you wanted three passes starting at 0, ${c("number < 3")} gives 0, 1, and 2. Both patterns are valid. Mixing them, starting at 1 and using < when you meant <=, drops the last value. Log the counter. The log is the evidence.`,
              `:::example Three stirs
Start at 1. Continue while the count is less than or equal to 3. After each stir, add 1. You stir for 1, 2, and 3. You do not stir for 4, because the condition fails before the body runs again. The update happens after the body, not before the first pass.
:::`,
              `The counter declared with let in the parentheses belongs to the loop. That is a small scope rule you will meet again with functions. Do not expect number to be available in a useful way after the loop for this course. If you need the final total, store it in a let declared before the loop, and update that let inside the body.`,
            ].join("\n\n"),
          },
          {
            heading: "The while loop",
            markdown: [
              `A while loop is only a condition and a body. You write the start before the loop. You write the update inside the body. Use while when the repetition is "as long as this is still true" and a counted for header feels forced.`,
              fence(
                "js",
                `
let stepsLeft = 3;
while (stepsLeft > 0) {
  console.log(stepsLeft);
  stepsLeft -= 1;
}
console.log("Done");
`,
              ),
              `stepsLeft starts at 3. The condition 3 > 0 is true, so the body logs 3 and then subtracts 1. The condition is asked again with 2, then with 1. When stepsLeft is 0, 0 > 0 is false, so the body does not run and Done prints. The decrement is ${c("stepsLeft -= 1")}, which is the same change as ${c("stepsLeft--")}. If you delete that line, stepsLeft stays 3 forever. The condition never fails. That is the infinite loop. The for loop hides the update in the header, which is why it is harder to forget. The while loop makes you place the update yourself, which is why it is easier to forget. Both are worth knowing.`,
              `The condition is still Boolean logic. You may write ${c("while (stepsLeft > 0 && stepsLeft < 100)")} if you want a safety ceiling while you learn. A ceiling is a belt and braces against a bad update. It is not required when you can see the decrement. Do not write ${c("while (true)")} this week. It is a loop that admits it will not stop, and beginners use it by accident when they meant a real question.`,
              `Choose for when you are counting a known series. Choose while when you are waiting for a state to change and the count is not the main idea. A countdown of steps is a fair while. Printing 1 through 3 is a fair for. Do not rewrite one as the other to prove you can. Pick the form whose header matches the English sentence.`,
              `:::misunderstanding The while condition is checked only once
It is checked before every pass, including the first. If it starts false, the body never runs. That is different from a bug. A countdown that starts at 0 should print Done immediately. Log the starting value if the body is silent.
:::`,
            ].join("\n\n"),
          },
          {
            heading: "Functions, parameters, and arguments",
            markdown: [
              `A function is a named block you can run later, more than once, with different values. You have already called functions: console.log is one, and letterGrade was a function in the conditions lesson. Now you will write your own and be precise about the vocabulary.`,
              `A function declaration starts with the word function, then a name, then parentheses, then a block.`,
              fence(
                "js",
                `
function lineTotal(price, count) {
  const total = price * count;
  return total;
}
`,
              ),
              `${c("price")} and ${c("count")} are parameters. They are names that stand for the values the caller will supply. They exist inside the function. A call supplies arguments, the actual values. ${c("lineTotal(3, 2)")} calls the function. 3 is the argument for price. 2 is the argument for count. The words parameter and argument are a pair: parameter is the slot in the declaration, argument is the value at the call. People mix them in conversation. In this course, if it is in the function header, call it a parameter. If it is in the call, call it an argument.`,
              `Order matters. ${c("lineTotal(3, 2)")} is not ${c("lineTotal(2, 3)")} if the first parameter is price and the second is count. The names at the call do not have to match. The positions do. You may pass a variable: ${c("lineTotal(breadPrice, breadCount)")} if those consts exist outside. You may pass a literal number. Both are arguments.`,
              `A call is an expression. You can log it. You can assign it once you are returning a value, which is the next section. You can call the same function twice with different arguments and trust that each call has its own parameters. The first call's price does not leak into the second call. That isolation is the reason to make a function instead of reusing one global price for every item.`,
              `:::example One recipe card, many meals
lineTotal is a recipe card. price and count are blank lines on the card. Each call fills the blanks with that meal's numbers. You do not photocopy the card and hard-code 3 and 2 into the instructions. You fill the blanks at cook time.
:::`,
            ].join("\n\n"),
          },
          {
            heading: "Return values",
            markdown: [
              `${c("return")} sends a value back to the caller and stops the function. The call ${c("lineTotal(3, 2)")} becomes 6, because the function returns price times count. The caller decides what to do with that 6. Logging inside the function is a different action. It shows a message and does not hand the number back.`,
              fence(
                "js",
                `
function lineTotal(price, count) {
  return price * count;
}

const bread = lineTotal(3, 2);
const milk = lineTotal(1.5, 4);
console.log(bread + milk);
`,
              ),
              `bread is 6. milk is 6. The log shows 12. The function did not print those words. It returned numbers, and the caller added them. If you delete return and only console.log inside lineTotal, bread becomes undefined. undefined plus a number is NaN. The console may still show 6 from the inner log, so it looks half-successful. Check the caller's variable. If the caller needed a number and got undefined, the function informed the console and forgot to return.`,
              `You can return early from a decision. The grade function did this. The first true band returns a letter and the rest of the function does not run. A guard works the same way: if the count is less than 0, return a message or return null, and do not multiply. Pick one policy and comment it. Returning a string from a function that usually returns a number will poison the addition. For this lesson, return numbers from lineTotal, and return strings from letterGrade. Do not mix them in one function.`,
              `A function without a return hands back undefined. console.log is like that. Your calculation functions should return. Use console.log at the caller, where you can see the final story: the bread line, the milk line, and the sum. That split keeps the function reusable. A function that always prints "Bread line" cannot be used for milk without lying.`,
              `:::misunderstanding Logging is returning
A message in the console is not a value in the caller. return is the value. If the next line needs the number, return it. You may log and return while debugging, then remove the log when the caller prints the story.
:::`,
            ].join("\n\n"),
          },
          {
            heading: "Scope and reusable calculations",
            markdown: [
              `Scope is the region where a name is visible. A const or let declared inside a function is local to that function. The caller cannot log that name. Parameters are local too. A name declared outside the function, in the script, is visible inside the function. This is an introduction, not the whole story of closures. The practical rule for this week is enough: put the names a function needs in its parameter list, and return the result. Do not reach up to change a global total unless you have a clear reason.`,
              fence(
                "js",
                `
function lineTotal(price, count) {
  const total = price * count;
  return total;
}

console.log(lineTotal(3, 2));
console.log(total);
`,
              ),
              `The second log throws ReferenceError: total is not defined. total lived only inside the call. That error is healthy. It means the function's scratch paper was thrown away, and the returned 6 is what survived, if you logged the call. If you needed total outside, you should have stored the return value: ${c("const bread = lineTotal(3, 2)")}.`,
              `Reusable calculation is the practice. Write lineTotal once. Call it for bread and for milk. Write letterGrade once. Call it for three scores. If you also want repetition, a for loop can log a countdown or call a function with a counter, without you pasting the call by hand. You do not need a list of scores yet. Lists are the next week. A loop that counts, and a function that calculates, are enough to see them cooperate: the loop decides how many times, the function decides what one calculation means.`,
              `A small guessing helper is the other shape you might use in the assignment. ${c("judgeGuess(secret, guess)")} returns ${c('"match"')}, ${c('"low"')}, or ${c('"high"')} using if and else if. Each call is one guess. You are not required to build a full game with random numbers. Random numbers are a later convenience. A function that judges one guess is already the lesson: parameters in, a decision, a returned word.`,
              `Before you submit, check three things. The function returns a value the caller uses. Two different argument pairs produce two results you can verify by hand. A loop you added actually stops: the condition becomes false, and you can see the last line in the console. If the tab freezes, close it and look for a missing increment or decrement.`,
              `:::tip One function, two calls, one hand check
Call lineTotal(3, 2) and expect 6. Call lineTotal(1.5, 4) and expect 6. If either call disagrees with the multiplication, fix the function once. Both calls benefit. That is the point of the name.
:::`,
            ].join("\n\n"),
          },
        ],
        vocabulary: [
          {
            term: "Loop",
            definition:
              "A block that repeats while a condition stays true. The script must update something so the condition can eventually become false.",
          },
          {
            term: "for loop",
            definition:
              "A loop with start, condition, and update in its header. It fits a count from a first number through a last number.",
          },
          {
            term: "while loop",
            definition:
              "A loop that checks a condition before each pass. You write the starting value before it and the update inside the body.",
          },
          {
            term: "Increment",
            definition:
              "Adding 1 to a counter. number++ is the usual spelling when that addition is its own step.",
          },
          {
            term: "Function",
            definition:
              "A named block you call on purpose, with parameters for input and return for the value handed back to the caller.",
          },
          {
            term: "Parameter",
            definition:
              "A name in the function parentheses that receives a value. It is the slot, not the value itself.",
          },
          {
            term: "Argument",
            definition:
              "The value you pass in a call. In lineTotal(3, 2), the numbers 3 and 2 are arguments.",
          },
          {
            term: "Scope",
            definition:
              "The region where a name can be used. A const declared inside a function is not visible to the caller.",
          },
        ],
        demonstrations: [
          {
            title: "Count, then reuse a line-total function",
            intro:
              "You will run a for loop and a while countdown, then declare lineTotal and call it twice with different arguments. You will also log a name that exists only inside the function and read the ReferenceError. The JavaScript is the same on every system.",
            steps: [
              "In a terminal, enter learning/week-07, creating it if needed, and open the folder in Visual Studio Code.",
              "Create learning/week-07/reuse.html with a heading and a script at the end of the body.",
              "Add a for loop that logs the numbers 1, 2, and 3 using number <= 3 and number++ in the header.",
              "Add a while loop that starts stepsLeft at 3, logs it, and decrements until the condition fails, then logs Done.",
              "Declare function lineTotal(price, count) so it returns price times count and does not print a product name.",
              "Log lineTotal(3, 2) and lineTotal(1.5, 4). Check both products by hand. They should each be 6.",
              "Temporarily log a const that is declared inside the function, from outside the function. Read the ReferenceError, then delete that outside log.",
              "Save, reload, and confirm the loops finish and the two totals are 6 and 6. If a tab freezes, close it and look for a missing decrement.",
            ],
            expected:
              "The console shows 1, 2, 3 from the for loop, then 3, 2, 1 and Done from the while loop, then 6 and 6 from the two calls. After you remove the illegal log, there is no ReferenceError. The page heading stays a simple label.",
            verify:
              "Count the for-loop lines. There should be three, ending at 3, not four. The while loop should stop. 3 times 2 is 6 and 1.5 times 4 is 6. If a call logs undefined, return is missing.",
            ifItFails:
              "A frozen tab means the while condition never became false. Close the tab and put the decrement back. A total of NaN means the caller used a log-only function and then did arithmetic with undefined. Add return. A loop that prints 1 and 2 only used < where you wanted <=.",
            os: {
              sameOnAllPlatforms:
                "for, while, function, return, increment, and decrement are the same on Windows, macOS, and Linux. Closing a frozen tab is also the same idea everywhere: close that tab, edit the file, and open it again. The different steps are the terminal, the file manager, and the console shortcut.",
              identify: [
                "Look for the Start button on Windows, the Apple menu on macOS, or Activities on many Linux desktops before you follow a shortcut from someone else.",
                "If you are unsure, open the console from the browser menu. Do not keep a frozen loop running while you hunt for the right key.",
              ],
              windows: [
                "Open Command Prompt and run cd learning\\week-07. Create the folder with mkdir if cd says it cannot find the path.",
                "Run start reuse.html after you save, or open the file from File Explorer.",
                "Press F12 or Ctrl+Shift+I and select Console. If the tab stops responding, close the tab from the tab strip, fix the script, and open the file again.",
                "Use Visual Studio Code via the Start menu and Open Folder on week-07.",
              ],
              macos: [
                "Open Terminal from Spotlight. Run cd learning/week-07 or mkdir -p learning/week-07 and then cd.",
                "Run open reuse.html or use Finder's Go to Folder.",
                "Open the console with Command+Option+I or the Develop menu. Close a frozen tab with the tab's close control, then reopen the file after the fix.",
                "Open the week-07 folder in Visual Studio Code from Spotlight.",
              ],
              linux: [
                "Open Terminal and cd into learning/week-07, creating it with mkdir -p if needed.",
                "Run xdg-open reuse.html or use the file manager.",
                "Open the console with F12, Ctrl+Shift+I, or the browser menu. Close a frozen tab before you try to type in it.",
                "Open Visual Studio Code from the application menu on the week-07 folder.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "A countdown, a count-up, and two totals",
            filename: "learning/week-07/reuse.html",
            language: "html",
            code: functionsCode,
            explanation:
              "lineTotal takes a price and a count and returns their product. The two calls pass different arguments and each returns 6. The while loop counts down because the body decrements stepsLeft. The for loop counts up because the header increments number and the condition includes 3. Neither loop prints a product name. The function stays reusable because the labels, if you add them, belong at the caller.",
            lineNotes: [
              {
                focus: "return total",
                note: "return hands the product back. The calls can be logged or added. A console.log inside the function would not replace the return.",
              },
              {
                focus: "two calls",
                note: "lineTotal(3, 2) and lineTotal(1.5, 4) do not share parameter values. Each call starts fresh.",
              },
              {
                focus: "while update",
                note: "stepsLeft -= 1 is what lets the condition stepsLeft > 0 become false. Without it the loop would not stop.",
              },
              {
                focus: "for header",
                note: "number starts at 1, the body runs while number <= 3, and number++ happens after each body. The log shows 1, 2, and 3.",
              },
            ],
            expectedOutput:
              "The console shows 6, then 6, then 3, 2, 1, Done, then for loop: 1, for loop: 2, and for loop: 3. The script finishes. The heading on the page does not list the numbers.",
            level: "practical",
          },
        ],
        exercises: [
          {
            title: "Include the last number on purpose",
            difficulty: "warm-up",
            prompt:
              "Write a for loop that prints the numbers 1 through 5, including 5. Then change only the condition so 5 disappears, observe it, and change it back.",
            steps: [
              "Create learning/week-07/count.html with a for loop. Start at 1.",
              "Use a condition that includes 5, and increment in the header.",
              "Reload and count the lines. You want five lines, ending at 5.",
              "Switch the condition to stop before 5, reload, then restore the inclusive condition.",
            ],
            expectedOutcome:
              "The restored loop prints 1, 2, 3, 4, and 5. You can say whether < or <= caused the shorter run. The loop ends by itself.",
          },
          {
            title: "One function, two shops",
            difficulty: "practice",
            prompt:
              "Write lineTotal so it returns price times count. Use it for two items with different prices. Add a while countdown from 3 that stops. Do not paste the multiplication twice.",
            steps: [
              "Declare the function with two parameters and a return.",
              "Call it twice with your own numbers and log both results. Check each product by hand.",
              "Add a while loop with a starting number, a true-or-false condition, and a decrement.",
              "Reload. If the tab freezes, close it and add the missing update before you reopen the file.",
            ],
            expectedOutcome:
              "Both logged totals match your hand multiplication, and they came from one function. The countdown prints its numbers and then stops so later logs, if any, can appear.",
          },
        ],
        troubleshooting: [
          {
            problem: "The browser tab freezes after you add a while loop.",
            why: "The condition stays true because the body never changes the value the condition checks. Reloading the same tab may not give you a responsive page.",
            solution:
              "Close the tab. Open the file in the editor and add an increment or decrement that moves toward the stop. Save. Open the HTML file in a new tab and confirm the loop prints a last line and finishes.",
          },
          {
            problem: "The for loop stops one number early, or prints one extra number.",
            why: "The condition uses < when you meant <=, or the reverse. The start value also counts. Starting at 0 and continuing while number <= 3 prints four numbers, not three.",
            solution:
              "Write the intended list on paper. Make the start the first number in that list. Choose < or <= by testing the last number in the condition by hand. Reload and count the logged lines.",
          },
          {
            problem: "The caller gets undefined or NaN from a calculation function.",
            why: "The function logs the product but does not return it. The caller then adds undefined, which becomes NaN. A log inside the function can make this look as if the number exists.",
            solution:
              "Add return of the number. Log at the caller instead. Reload and check that the returned value matches a hand calculation before you add anything else to it.",
          },
          {
            problem: "ReferenceError says a name inside the function is not defined.",
            why: "That const or parameter is in the function's scope. The caller is outside that region. Scope is working. The log is in the wrong place.",
            solution:
              "Store the call's return value in a const in the caller and log that const. Keep scratch names inside the function. Pass in everything the function needs as arguments.",
          },
        ],
        knowledgeChecks: [
          {
            id: "loop-stop",
            question: "What must change inside a while loop so it does not run forever?",
            format: "Multiple choice",
            options: [
              "Something the condition depends on, so the condition can become false.",
              "A second HTML file, because one file can only loop once.",
              "A CSS animation, which is what actually repeats the body.",
              "Nothing. while always stops after three passes.",
            ],
          },
          {
            id: "fn-return-vs-log",
            question: "A function console.logs a total and does not return it. The caller adds the call to another number. What goes wrong?",
            format: "Multiple choice",
            options: [
              "The caller receives undefined, and the addition becomes NaN, even if the console showed the total.",
              "The caller receives the logged text as a number automatically.",
              "JavaScript copies the log into the return value after reload.",
              "The function cannot contain console.log if it has parameters.",
            ],
          },
          {
            id: "fn-parameter-argument",
            question: "In function lineTotal(price, count) and the call lineTotal(3, 2), which names are parameters and which values are arguments?",
            format: "Short answer",
          },
        ],
        homework: {
          description:
            "Submit the week 7 module assignment: a grade calculator or a number-guessing helper, built with functions. Use conditions inside the function and show several calls in the console.",
          requirements: [
            "Declare at least one function with parameters and a return value. The caller must use the returned value.",
            "Include if and else or else if inside that function, and log at least three different calls.",
          ],
          deliverables: [
            "The week 7 module assignment file, such as learning/week-07/grade-calculator.html, plus the console output.",
          ],
          submission:
            "Submit the program as the week 7 module assignment. Paste the script and write the hand check for each returned value. A lesson note alone does not replace the assignment.",
          criteria: [
            "The function returns the value the caller prints, and three calls show three results you can justify from the code.",
            "Conditions choose among real cases, such as grade bands or low, match, and high, and a loop in the file stops if you included one.",
          ],
          submissionKind: "module_assignment",
        },
        summary: [
          "A loop repeats one block while a condition is true. The script must update that condition or the loop will not stop.",
          "A for loop puts start, condition, and update in the header. A while loop needs the start before it and the update in the body. ++ adds 1 and -- subtracts 1.",
          "A function names a reusable block. Parameters are the slots. Arguments are the values in the call. return sends a value back and stops the function.",
          "Names declared inside a function stay there. Call the function twice with different arguments instead of copying the calculation.",
        ],
        nextLesson: {
          title: "Arrays and objects",
          why: "Separate variables work for two items. An array holds a list under one name, and an object groups a price together with the item it belongs to.",
          lessonSlug: "arrays-and-objects",
        },
      },
      guide: {
        sessionNumber: 14,
        week: 7,
        title: "Loops and functions",
        durationMinutes: 90,
        objectives: [
          "Students can point to the start, condition, and update of a loop.",
          "Students return a number from a function and use it in the caller.",
          "Students call one function with two different argument pairs.",
        ],
        tools: [
          "Browser console",
          "Visual Studio Code",
          "The grade function from the previous session, if students saved it",
        ],
        preparation: [
          "Prepare a while loop with the decrement commented out, and be ready to close the frozen tab without panic.",
          "Prepare lineTotal that only logs, so the caller addition becomes NaN, and a fixed version that returns.",
          "Write 3 * 2 and 1.5 * 4 on the board as the two hand checks, both equal to 6.",
          "Know how to close a tab on the teaching machine with the mouse in case the keyboard seems busy.",
        ],
        flow: [
          {
            minutes: 5,
            title: "Thirty stirs",
            detail:
              "Ask someone to write a stir instruction for a sauce, thirty times, on paper. Stop them after the third copy. Say a loop is one stir plus a stop rule. Open nothing yet. Promise that a frozen page means a missing stop, not a broken computer.",
          },
          {
            minutes: 15,
            title: "for, while, and a missing update",
            detail:
              "Live-code the for loop for 1, 2, 3 and say when number++ happens. Show number < 3 dropping the last value. Then run the broken while, close the tab, add the decrement, and reopen. Students should see the recovery, not only the success.",
          },
          {
            minutes: 20,
            title: "Extract lineTotal",
            detail:
              "Start from two copied multiplications. Replace them with a function that returns the product. Log both calls. Remove return and show NaN when the caller adds the results. Put return back. Then log an inner const from outside and read the ReferenceError.",
          },
          {
            minutes: 30,
            title: "Reuse practice",
            detail:
              "Students build reuse.html or count.html with a stopping loop and a function called twice. They hand-check both products. If a tab freezes, they close it before calling you. You ask: where is the update, and where is the return?",
          },
          {
            minutes: 10,
            title: "Scope and NaN clinic",
            detail:
              "Project one NaN file and one scope error from the room or from your prepared files. Fix only the return or the log location. Do not introduce arrays. Mention that a list of scores is next week, so three separate calls are enough today.",
          },
          {
            minutes: 10,
            title: "Assignment choice",
            detail:
              "Ask the knowledge checks. Explain the module assignment: a letterGrade function or a judgeGuess function, parameters, return, if or else if, and at least three logged calls. Show a one-line sketch of judgeGuess returning low, match, or high. Collect paths under learning/week-07.",
          },
        ],
        explain: [
          "One body, a condition, and an update that can end the loop.",
          "for header order: start, condition, update. ++ and --.",
          "while with the update in the body, and how to recover a frozen tab.",
          "Declaration, call, parameters, and arguments.",
          "return versus console.log.",
          "Local names and the ReferenceError when the caller reaches inside.",
        ],
        questions: [
          "In for (let number = 1; number <= 3; number++), when does number++ run relative to the log?",
          "What does the caller receive if lineTotal logs the product and does not return it?",
          "Why can two calls to lineTotal use different prices without the first price sticking?",
        ],
        demonstration:
          "Show a for loop including 3, a while loop that freezes until the decrement returns, and lineTotal called as lineTotal(3, 2) and lineTotal(1.5, 4). Remove return once so NaN appears, then restore it.",
        practice:
          "Students write a loop that stops and a function they call with two argument pairs. They check both return values by hand and can close a frozen tab without help if they omit an update.",
        expectedOutcomes: [
          "A finished countdown or count-up in the console.",
          "Two correct products from one function.",
          "Students can define parameter, argument, and return in their own words.",
        ],
        difficulties: [
          {
            issue: "The page freezes as soon as the student reloads a while loop.",
            help: "Tell them to close the tab, not to keep clicking inside it. Open the file and find the condition. Ask which line changes that value. Add the decrement, save, and open a new tab. Have them point at the update before they reload again.",
          },
          {
            issue: "The function prints the right number but the caller gets NaN.",
            help: "Cover the console with your hand and ask what value the call produced. Add return of the number. Move the friendly label to the caller's console.log. Reload and add the two returned numbers on paper.",
          },
          {
            issue: "The student copies the whole function to change the price.",
            help: "Delete the second copy. Call the original twice with different arguments. Change one word in the comment and show that both calls pick it up. Parameters are the blank lines. Arguments fill them.",
          },
        ],
        homework:
          "The module assignment is a grade calculator or a guess judge. Either way it is a function with parameters, a returned result, conditions, and at least three logged calls whose results match a short hand check. Files live under learning/week-07.",
        assessment:
          "Knowledge checks cover the loop update, return versus log, and parameter versus argument. Mark the assignment by calling the function in your head for the three inputs. A printed letter that was not returned still fails the reuse criterion if the caller cannot use it.",
        recap:
          "Return to the sauce instruction: one stir, a count, a stop. Then point at lineTotal and say the recipe card stayed one card. Next week the two calls can become a list. Ask them to submit the function file, not only the console screenshot.",
        knowledgeCheckAnswers: [
          {
            id: "loop-stop",
            answer:
              "Something the condition depends on must change, so the condition can become false.",
            explanation:
              "A while loop asks its question before every pass. If the body never changes the values in that question, the answer stays true and the loop does not end.",
          },
          {
            id: "fn-return-vs-log",
            answer:
              "The caller receives undefined, and the addition becomes NaN, even if the console showed the total.",
            explanation:
              "console.log displays a message. return is what the caller receives. Using undefined in arithmetic produces NaN.",
          },
          {
            id: "fn-parameter-argument",
            answer:
              "price and count are parameters. The call's 3 and 2 are arguments, matched by position.",
            explanation:
              "Parameters are the names in the declaration. Arguments are the values supplied at the call. 3 binds to price and 2 binds to count because of order.",
          },
        ],
      },
    },
  ],
  assignment: {
    slug: "week-07-assignment",
    title: "Grade calculator or guess judge",
    summary:
      "Write a function that grades a score or judges a guess, using conditions and return values, and show at least three calls in the console.",
    instructions:
      "Build one small decision program and put the decision in a function. You may choose either project. The grade calculator takes a numeric score and returns a letter or a short label. Use if and else if, with the highest band first. Include an else for the lowest band. Call the function at least three times with different scores, including one boundary such as 80 or 60, and log each returned value.\n\nThe other project is a guess judge, not a full arcade game. Write judgeGuess(secret, guess) so it returns match when the numbers are equal, low when the guess is below the secret, and high when the guess is above it. Call it at least three times with the same secret and different guesses so all three words can appear. You do not need random numbers or a text box.\n\nIn both projects the function must return the result. The caller logs it. A function that only console.logs inside, and returns nothing, does not meet the brief, because the caller cannot reuse the result. Add a comment that states the rule in English, such as the grade bands or the meaning of low and high. If you include a loop, it must stop. A countdown or a for loop that calls the function is welcome. A frozen infinite loop is not.\n\nSave the file at a portable path such as learning/week-07/grade-calculator.html. Paste the script and a hand check for each call when you submit.",
    objectives: [
      "Package a decision in a function with parameters and a return value.",
      "Use if and else if so each input follows one path.",
      "Show at least three calls whose logged results match the rule.",
    ],
    requirements: [
      "An HTML file with a script at the end of the body and a heading that names the program.",
      "A function with at least one parameter. Grade scores or judge a guess. Do not paste the decision three times without a function.",
      "if, else if, and else, or an equivalent chain, so different inputs return different results. Highest grade band first if you chose grades.",
      "return of a string or number the caller actually logs. At least three calls with different arguments.",
      "A short comment that states the rule, plus a hand check in the submission for each logged result. Any loop must include an update that lets it stop.",
    ],
    deliverables: [
      "learning/week-07/grade-calculator.html or learning/week-07/guess-judge.html.",
      "The pasted script and the console lines from the three or more calls.",
      "A hand check that lists each argument and the result you expected.",
    ],
    rubric: [
      {
        criterion: "Script runs",
        points: 15,
        description:
          "The file opens and the console shows the calls without a syntax error or a loop that never ends.",
      },
      {
        criterion: "Function shape",
        points: 25,
        description:
          "There is a declared function with parameters. The caller uses the returned value. Names match the job, such as score or guess.",
      },
      {
        criterion: "Decisions",
        points: 25,
        description:
          "Conditions cover the cases in the comment. Grade bands run from high to low, or the guess function distinguishes low, match, and high.",
      },
      {
        criterion: "Three checked calls",
        points: 20,
        description:
          "At least three calls use different arguments, and the hand check agrees with the console for each one.",
      },
      {
        criterion: "Reuse and clarity",
        points: 15,
        description:
          "The rule lives in one function rather than copied blocks. A comment states the rule. Logs are readable.",
      },
    ],
    points: 100,
    instructorSolution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Grade calculator</title>
</head>
<body>
  <h1>Grade calculator</h1>
  <script>
    // 90+ A, 80+ B, 70+ C, 60+ D, otherwise F. Highest test first.
    function letterGrade(score) {
      if (score >= 90) {
        return "A";
      } else if (score >= 80) {
        return "B";
      } else if (score >= 70) {
        return "C";
      } else if (score >= 60) {
        return "D";
      } else {
        return "F";
      }
    }

    console.log(letterGrade(92));
    console.log(letterGrade(80));
    console.log(letterGrade(74));
    console.log(letterGrade(60));
    console.log(letterGrade(59));
  </script>
</body>
</html>`,
  },
  quiz: {
    slug: "week-07-quiz",
    title: "Week 7 quiz: decisions, loops, and functions",
    passingScore: 70,
    allowRetakes: true,
    questions: [
      {
        slug: "week-07-band-order",
        type: "multiple_choice",
        prompt: "A function returns \"D\" as soon as score >= 60, and that test is written before score >= 90. What does 95 return?",
        options: [
          { id: "a", text: "D, because the first true test wins and later tests are skipped." },
          { id: "b", text: "A, because JavaScript reorders numeric tests from high to low." },
          { id: "c", text: "Both A and D, because both comparisons are true." },
          { id: "d", text: "undefined, because a score cannot pass two mathematical tests." },
        ],
        correct: { optionId: "a" },
        explanation:
          "else if does not hunt for the most specific band. The first condition that is true runs, and a return leaves the function. A wide test placed first captures scores that should have hit a later, stricter band.",
        points: 10,
      },
      {
        slug: "week-07-else-once",
        type: "true_false",
        prompt: "In one if/else pair, both the if block and the else block can run for the same score.",
        correct: { value: false },
        explanation:
          "else runs only when the if condition was false. The two blocks are alternatives. If you see both messages, they are probably two separate if statements, or a semicolon detached the block from the if.",
        points: 10,
      },
      {
        slug: "week-07-ternary-two",
        type: "true_false",
        prompt: "A ternary of the form condition ? a : b chooses among five grade bands in one tidy step.",
        correct: { value: false },
        explanation:
          "That form chooses one of two values. Five grade bands are a chain of if and else if. Nesting ternaries to fake the chain is harder to read and easier to order wrongly.",
        points: 10,
      },
      {
        slug: "week-07-read-grade",
        type: "code_reading",
        prompt: "What does letterGrade(80) return?",
        codeSnippet: `function letterGrade(score) {
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else {
    return "C";
  }
}`,
        options: [
          { id: "a", text: "A" },
          { id: "b", text: "B" },
          { id: "c", text: "C" },
          { id: "d", text: "80" },
        ],
        correct: { optionId: "b" },
        explanation:
          "80 is not >= 90, so the A branch is skipped. 80 is >= 80, so the function returns B and never reaches else. The returned value is the letter, not the original score.",
        points: 10,
      },
      {
        slug: "week-07-read-for",
        type: "code_reading",
        prompt: "Which numbers are logged?",
        codeSnippet: `for (let number = 1; number < 4; number++) {
  console.log(number);
}`,
        options: [
          { id: "a", text: "1, 2, 3, and 4" },
          { id: "b", text: "1, 2, and 3" },
          { id: "c", text: "1 and 2 only" },
          { id: "d", text: "Nothing, because number++ runs before the first log." },
        ],
        correct: { optionId: "b" },
        explanation:
          "number starts at 1. The body runs while number < 4, so 1, 2, and 3 are logged. Then number becomes 4 and the condition fails. number++ happens after each body, not before the first one. 4 is not logged.",
        points: 10,
      },
      {
        slug: "week-07-while-update",
        type: "multiple_choice",
        prompt: "A while loop logs stepsLeft and never changes stepsLeft. stepsLeft starts at 3 and the condition is stepsLeft > 0. What happens?",
        options: [
          { id: "a", text: "The body runs forever, because the condition stays true." },
          { id: "b", text: "The body runs exactly three times, because while counts automatically." },
          { id: "c", text: "The body is skipped, because while checks the condition only once at the end." },
          { id: "d", text: "JavaScript inserts stepsLeft-- for you." },
        ],
        correct: { optionId: "a" },
        explanation:
          "while repeats while the condition is true. If the body never changes stepsLeft, 3 > 0 stays true. Close the tab, add a decrement, and open the file again. The language does not invent the update.",
        points: 10,
      },
      {
        slug: "week-07-return",
        type: "multiple_choice",
        prompt: "lineTotal logs price * count and has no return. The caller does console.log(lineTotal(3, 2) + 1). What is the caller's result based on?",
        options: [
          { id: "a", text: "undefined from the function, so the addition is NaN, even though 6 may have been logged inside." },
          { id: "b", text: "The number 7, because log and return are the same." },
          { id: "c", text: "The string \"61\", because log turns numbers into text." },
          { id: "d", text: "A syntax error, because a function must not contain console.log." },
        ],
        correct: { optionId: "a" },
        explanation:
          "Without return, the caller receives undefined. undefined plus 1 is NaN. The inner log can still show 6, which is why the bug looks confusing. Return the product if the caller needs the number.",
        points: 10,
      },
      {
        slug: "week-07-scope",
        type: "true_false",
        prompt: "A const declared inside a function can be logged by the caller after the function returns, using that same name.",
        correct: { value: false },
        explanation:
          "A const inside a function is local to that function. The caller is outside its scope, so the name is not defined there. Store the returned value in a new const if the caller needs it.",
        points: 10,
      },
      {
        slug: "w7-q9-reuse",
        type: "multiple_choice",
        prompt: "Why call one lineTotal function twice with different arguments instead of copying the multiplication?",
        options: [
          { id: "a", text: "Because functions cannot return numbers" },
          { id: "b", text: "Because one shared formula can be fixed once and reused with different inputs" },
          { id: "c", text: "Because arguments are only allowed once per file" },
          { id: "d", text: "Because copying code always scores higher" },
        ],
        correct: { optionId: "b" },
        explanation:
          "The formula lives once. Bread and milk pass different arguments into the same parameters, and each call returns its own product. If the formula is wrong, you repair the function rather than hunting through copies.",
        points: 10,
      },
    ],
  },
};
