import type { ModuleSeed } from "../../src/lib/content-types";

function c(text: string) {
  return "`" + text + "`";
}

function fence(language: string, code: string) {
  return "```" + language + "\n" + code.trim() + "\n```";
}

const marketBarCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Market day</title>
  <style>
    body {
      margin: 0;
      font-family: Georgia, serif;
      color: #1c1917;
      background: #f7f4ef;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      padding: 16px;
      background: #16324f;
      color: #ffffff;
    }

    nav {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    nav a {
      color: #ffffff;
    }

    main {
      max-width: 960px;
      margin: 0 auto;
      padding: 16px;
    }

    .stalls {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }

    .stall {
      flex: 1 1 220px;
      padding: 16px;
      border: 1px solid #d0d5dd;
      border-radius: 8px;
      background: #ffffff;
    }
  </style>
</head>
<body>
  <header>
    <strong>Market day</strong>
    <nav>
      <a href="#stalls">Stalls</a>
      <a href="#hours">Hours</a>
      <a href="#visit">Visit</a>
    </nav>
  </header>
  <main>
    <h1>Saturday stalls</h1>
    <div class="stalls" id="stalls">
      <article class="stall">
        <h2>Bread</h2>
        <p>Loaves from the brick oven, sold until noon.</p>
      </article>
      <article class="stall">
        <h2>Fruit</h2>
        <p>Apples, oranges, and pears from nearby farms.</p>
      </article>
      <article class="stall">
        <h2>Tea</h2>
        <p>Hot cups and leaves to take home.</p>
      </article>
    </div>
    <section id="hours">
      <h2>Hours</h2>
      <p>The market opens at eight and closes at one.</p>
    </section>
    <section id="visit">
      <h2>Visit</h2>
      <p>Look for the green gates beside the bus stop.</p>
    </section>
  </main>
</body>
</html>`;

const libraryCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Neighbour library</title>
  <style>
    body {
      margin: 0;
      font-family: Georgia, serif;
      font-size: 1.125rem;
      line-height: 1.5;
      color: #1c1917;
      background: #f7f4ef;
    }

    header,
    main,
    footer {
      padding: 1rem;
    }

    main {
      max-width: 60rem;
      margin: 0 auto;
    }

    nav {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
    }

    .welcome,
    .features {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .feature {
      padding: 1rem;
      border: 1px solid #d0d5dd;
      border-radius: 8px;
      background: #ffffff;
    }

    @media (min-width: 40rem) {
      .welcome {
        grid-template-columns: 1fr 1fr;
        align-items: center;
      }

      .features {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (min-width: 60rem) {
      .features {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
  </style>
</head>
<body>
  <header>
    <p>Neighbour library</p>
    <nav>
      <a href="#visit">Visit</a>
      <a href="#offer">What we offer</a>
    </nav>
  </header>
  <main>
    <section class="welcome" id="visit">
      <img src="reading-chair.jpg" alt="A wooden chair beside a tall library window" width="800" height="500">
      <div>
        <h1>A quiet chair and a book to take home</h1>
        <p>Borrow for three weeks, read by the window, or come to story hour on Thursday.</p>
      </div>
    </section>
    <section class="features" id="offer">
      <article class="feature">
        <h2>Borrow</h2>
        <p>Take a book, an audiobook, or a magazine home.</p>
      </article>
      <article class="feature">
        <h2>Read</h2>
        <p>Use a chair near the window. No purchase is required.</p>
      </article>
      <article class="feature">
        <h2>Meet</h2>
        <p>Story hour is at four on Thursday. Children and adults are welcome.</p>
      </article>
    </section>
  </main>
  <footer>
    <p>Open Tuesday to Saturday, from nine until five.</p>
  </footer>
</body>
</html>`;

export const week05: ModuleSeed = {
  slug: "week-05-layout",
  number: 5,
  weekNumber: 5,
  monthLabel: "Month 2 — CSS layout, JavaScript and problem solving",
  title: "CSS layout and responsive design",
  description:
    "This week you decide where boxes sit. Flexbox arranges a navigation bar and a wrapping row of cards. CSS Grid, relative units, and media queries then keep a landing page readable on a narrow phone, a tablet, and a wide window.",
  lessons: [
    {
      slug: "flexbox",
      sessionNumber: 9,
      title: "Arrange boxes with Flexbox",
      estimatedMinutes: 90,
      difficulty: "Guided practice",
      requiresOs: true,
      content: {
        overview: {
          about:
            "This lesson is about layout: the plan for where boxes sit together on a page. You already know how to size one box with width, margin, padding, and a border. Here you will turn a parent element into a flex container so its children can share a row or a column. You will build a navigation bar and a row of cards that wrap when the window gets narrow.",
          why:
            "People open pages on phones, tablets, and wide monitors. A layout that depends on one large margin breaks as soon as the window width changes. Flexbox lets you describe the relationship you want, and the browser measures the boxes again when the space changes.",
          alreadyKnow:
            "You can write a CSS rule with a selector, a property, and a value. You can explain content, padding, border, and margin. You can open an HTML file in a browser.",
        },
        objectives: [
          "Explain what layout means and why a layout system is safer than pushing boxes around with large margins.",
          "Turn a parent into a flex container with display: flex and name which elements become the flex items.",
          "Use justify-content and align-items, and say which axis each property follows.",
          "Set flex-direction, flex-wrap, and gap so a navigation bar and a card row behave on a narrow window.",
          "Resize the browser, observe the result, and correct a row that overflows or fails to wrap.",
        ],
        prerequisites: [
          {
            label:
              "You can explain the box model, including content, padding, border, margin, and the difference between block and inline display.",
            lessonSlug: "css-box-model",
          },
          {
            label:
              "You can connect CSS to a page and write rules that set colour, background, font, and text.",
            lessonSlug: "introduction-to-css",
          },
        ],
        teachingNotes: [
          {
            heading: "What layout means",
            markdown: [
              `A web page is a collection of boxes. In the box model lesson, each element had content, padding, a border, and a margin. That lesson answered a question about one box: how big is it, and how much air sits around it? Layout answers the next question: where do these boxes sit in relation to each other, and what should happen when the window gets wider or narrower?`,
              `The browser already has a default plan. A heading, a paragraph, and a division each start on a new line. People call that block layout. Words, links, and images can sit beside one another inside a line. People call that inline layout. The default plan is a good plan for a letter, a recipe, or a short story, because the reader expects one block under another. It is a weak plan for a navigation bar. A bar wants the place name at one side and the links at the other side, on the same line. It is also a weak plan for a set of matching cards. Those cards should share a row while there is room, then move onto a second row when the row is full.`,
              `Think about a kitchen shelf. The shelf is the parent element. The jars are the child elements. Layout is the decision you make about the jars. Do they stand in one row? Do they stack from the counter upward? How much space sits between two jars? What happens on the day you buy another jar and the shelf is already full? You can shove one jar with your hand by giving one box a huge margin. The shove looks fine until a jar gets taller, the label gets longer, or the shelf gets shorter. Then the jar hangs off the edge. A layout system lets you describe the rule. The browser moves the jars when the shelf changes size.`,
              `:::example A Saturday market poster
The poster has a title band across the top, three stall notices in a row, and a small hours note at the bottom. The title, each stall, and the note are boxes you already know how to paint with colour and padding. Layout is the extra decision that keeps the three stalls side by side on a wide sheet and stacked on a narrow sheet.
:::`,
              `Layout is not the same thing as colour, font size, or bold text. Those change the look inside a box or on its surface. Layout changes the relationship between boxes. A page can use a comfortable font and still feel broken if the links cover the heading, or if a card is cut off at the right edge. When you hunt a problem, name the kind of problem. If the words are hard to read, look at colour and type. If the regions are in the wrong places, look at layout. Saying "it looks wrong" is a start. Saying "the three cards will not share a row" tells you which tool to pick up.`,
              `You will hear the word layout used for the whole page and also for one group of boxes. Both uses are fair. Today the group matters most: one header, and one row of cards. The next lesson zooms back out and plans a whole landing page, including what happens on a phone. Today, learn to describe one row or one column with confidence.`,
            ].join("\n\n"),
          },
          {
            heading: "Why layout systems exist",
            markdown: [
              `Before Flexbox and Grid were reliable, people pushed boxes around with margins, floats, and absolute positioning. You may still see those tricks in old pages. A large left margin can shove a box toward the right. A float can let text wrap around a picture. Absolute positioning can pin a box to a corner of the page. Each trick solves one picture of the page. Each trick fights you when the text gets longer, when another card is added, or when the screen is a different width.`,
              `Imagine addressing envelopes for a family reunion. If you measure one envelope with a ruler and then copy those exact centimetre gaps onto every envelope, a longer name spills into the stamp. A better method is a rule: the name starts after a fixed padding, and a long name wraps onto a second line. CSS layout systems are that kind of rule. You say what relationship you want. The browser does the measuring every time the window, the font size, or the text changes.`,
              `Flexbox is a one-dimensional system. One dimension means a row or a column, not both at once. A navigation bar is one row. A stack of form fields is one column. A line of cards that wraps onto further lines is still Flexbox: each line is a row, and wrapping adds another row when it must. CSS Grid is two-dimensional. It thinks about rows and columns at the same time, like a calendar. Grid is the next lesson. Staying with Flexbox today is a choice, not a limitation you have to apologise for. A bar of links does not need a full grid. Using the smaller tool makes the CSS easier to read next week.`,
              `:::misunderstanding Flexbox replaces the box model
Flexbox does not delete width, height, margin, padding, or borders. Those still belong to each box. Flexbox decides how a group of boxes share the space inside their parent. You will keep using the box model on the items while Flexbox arranges the group.
:::`,
              `There is a second misunderstanding worth retiring now. Flexbox is not a prize you earn after you memorise every property. It is a small set of decisions. Which element is the shelf? Which direction does the shelf run? Should items pack to one end, spread apart, or wrap? How much space sits between them? If you can answer those questions in ordinary words, you can look up the property name. The names are short once the questions are clear.`,
              `Layout systems also protect the reader. A page that only fits your laptop can force a sideways scroll on a phone. Sideways scroll hides headings and makes forms hard to use. You will test that properly in the next lesson. Even in this lesson, you should drag the window narrower before you decide a row is finished. A row you have never narrowed is an untested row.`,
            ].join("\n\n"),
          },
          {
            heading: "Flex containers and flex items",
            markdown: [
              `An element becomes a flex container when you set ${c("display: flex")} on it. Its direct children then become flex items. Direct children means the elements one level inside, not the grandchildren. This is the rule people miss most often. If a card contains a heading and a paragraph, and you set ${c("display: flex")} on the parent of the cards, the cards line up. The heading and the paragraph stay stacked inside each card, because they are not children of that parent. They are children of the card.`,
              fence(
                "css",
                `
.stalls {
  display: flex;
}
`,
              ),
              `In that rule, the element with the class stalls is the container. It is the shelf. Each article inside it is an item. It is a jar. The class name is your label. The browser does not care that you called it stalls. It cares that the parent has ${c("display: flex")} and that the articles are direct children.`,
              `If you set ${c("display: flex")} on the body, only the direct children of the body join that flex layout. A header, a main area, and a footer would sit in a row. That is rarely what a whole page wants. A page usually wants those regions stacked. Leave the body as a normal block. Put ${c("display: flex")} on the smaller parent that should own one row, such as the header or the card group.`,
              `:::warning The property belongs on the parent
If the cards refuse to sit in a row, check which element carries display: flex. The property has to be on the parent of the cards. Setting it on each card arranges the heading and the paragraph inside the card, which is a different layout.
:::`,
              `Two directions come with every container. The main axis is the direction the items follow first. With the default row, the main axis runs horizontally, from the start of the line to the end. In English, that is left to right. The cross axis runs across the main axis, so in a row it is vertical, from top to bottom. When you later change the direction to column, the axes swap. The main axis runs down the page. The cross axis runs from side to side. You do not need to memorise a diagram before you try it. You do need the names, because ${c("justify-content")} always works on the main axis, and ${c("align-items")} always works on the cross axis. The properties do not mean "horizontal" and "vertical" forever. They follow the direction you chose.`,
              `A container can sit inside another container. A header can be a flex row whose children are the place name and a nav element. The nav element can be a second flex row whose children are the links. Each container only controls its own children. Nested shelves are normal. The header shelf does not reach inside the nav and rearrange the links. The nav shelf does that. When a layout surprises you, draw a box in the HTML around the parent you think is in charge, then check that the property is on that parent.`,
            ].join("\n\n"),
          },
          {
            heading: "Packing items and aligning them",
            markdown: [
              `${c("justify-content")} distributes free space along the main axis. Free space is the room left after the items take their own size. If three short links sit in a wide header, a lot of free space remains. If three wide cards already fill the row, little or no free space remains, and justify-content has almost nothing to distribute. That is not a broken property. It is a full shelf.`,
              `These values cover the choices you need this week:`,
              `- ${c("flex-start")} packs items at the start. This is the default for justify-content. In a row, the group sits at the left in English.`,
              `- ${c("flex-end")} packs items at the end. In a row, the group sits at the right.`,
              `- ${c("center")} groups items in the middle of the main axis.`,
              `- ${c("space-between")} puts the first item at the start, the last item at the end, and equal space between the items. A header with a title and a nav often wants this.`,
              `- ${c("space-around")} gives space on both sides of each item. The outer edges receive a smaller share, because the inner gaps are two halves meeting.`,
              `- ${c("space-evenly")} makes the gap between items equal to the gap at the outer edges.`,
              `A navigation bar is the clearest practice. The header is the container. The title is the first item. The nav is the second item. ${c("justify-content: space-between")} pushes those two items apart. The free space lives between them, not inside the letters of the title. If you later add flex-grow to both items, they expand and eat the free space, so space-between seems to stop working. Leave grow at its default of 0 for a bar of short items. The items stay as wide as their content, and the free space remains available.`,
              `${c("align-items")} positions items on the cross axis. In a row, that is vertical alignment. The values you will use are ${c("stretch")}, ${c("flex-start")}, ${c("flex-end")}, and ${c("center")}. Stretch is the default. If the items do not have a fixed height, they stretch to the height of the line. That is why cards in a row often become equal height even though you never set a height. It can look pleasant. It can also stretch a short card in a way you did not want. ${c("align-items: flex-start")} lets each card stay as short as its own text. ${c("center")} is the usual choice for a header, so a title and a row of links meet in the vertical middle instead of clinging to the top.`,
              `:::example The shelf, said with property names
justify-content slides the jars along the shelf: left, right, centre, or spread apart. align-items decides whether the jars stand on the bottom edge, hang from the top, or sit in the vertical middle. Turn the shelf so it runs up the wall, which is a column, and those two jobs swap. The property names stay the same. The physical direction changes.
:::`,
              `:::misunderstanding Center always means the middle of the page
align-items: center in a row centres items vertically, inside the line. It does not slide the whole group to the horizontal middle. Horizontal grouping is justify-content while the direction is row. If the group is still at the left, you changed the cross axis when you meant to change the main axis.
:::`,
              `You can see the difference in the browser without any extra tool. Give the header a fixed padding and a background colour. Change only justify-content, save, and reload. Then put justify-content back, and change only align-items. Change one property at a time. If you change both, and also the HTML, you will not know which edit moved the links.`,
            ].join("\n\n"),
          },
          {
            heading: "Direction, wrapping, and gap",
            markdown: [
              `${c("flex-direction")} chooses the main axis. ${c("row")} is the default, so items sit in a line from left to right in a language such as English. You can write it anyway when you want the file to show your intention. ${c("row-reverse")} flips that line. ${c("column")} stacks items from top to bottom. ${c("column-reverse")} stacks them from the bottom upward. Use column when a menu should stack, or when a card's image, title, and text should follow one another downward. You do not need column-reverse for the practice today. Knowing it exists stops you from inventing a margin trick to flip a stack later.`,
              `${c("flex-wrap")} decides what happens when the items do not fit on one line. ${c("nowrap")} is the default. The items stay on a single line. They may shrink, or they may spill past the edge of the window. ${c("wrap")} moves the extra items onto the next line. ${c("wrap-reverse")} wraps in the opposite direction. A card row on a wide screen can sit on one line. On a narrow screen those same cards should wrap. Set wrap on the container, not on each card.`,
              `A concrete measurement helps. Suppose the container is 600 pixels wide, the gap is 16 pixels, and each card starts at 220 pixels. Three cards on one line would need 220 plus 220 plus 220, and two gaps of 16. That is 692 pixels, which is more than 600. With wrap turned on, the third card moves to the next line. Two cards need 220 plus 16 plus 220, which is 456, so they fit on the first line. Your numbers will shift once padding and borders join in. The idea does not shift: basis plus gaps must fit, or the next item wraps.`,
              `The usual way to give a card that starting size, and also let it share extra room, is the ${c("flex")} shorthand. ${c("flex: 1 1 220px")} means three decisions, in this order. The first number is flex-grow. A value of 1 lets the card take a share of extra space. The second number is flex-shrink. A value of 1 lets the card get narrower when the line is tight. The third value is flex-basis. It is the starting size, here 220 pixels, before growing or shrinking. Default grow is 0, which is what you want on a title in a header. Grow of 1 is what you want on cards that should share a row evenly.`,
              fence(
                "css",
                `
.stalls {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.stall {
  flex: 1 1 220px;
}
`,
              ),
              `${c("gap")} sets the space between items. It does not add space before the first item or after the last item. A right margin on every card looks similar until you notice the doubled gap where two margins meet, plus an extra margin after the last card. Gap avoids that doubling. One value sets both the row gap and the column gap. Two values set the row gap first, then the column gap, for example ${c("gap: 16px 24px")}. Sixteen pixels is a comfortable gap for the exercises in this lesson. Pixels are a fine unit while you learn the idea. The next lesson adds rem, so spacing can follow the reader's font size.`,
              `:::tip Change one thing, then reload
Save, reload, and drag the window after each new property. A layout you have not narrowed is unfinished. If you type wrap, gap, and the flex shorthand before the first reload, a typo hides inside the pile.
:::`,
              `If your earlier pages set ${c("box-sizing: border-box")} on every element, leave that rule in place. The flex basis then includes the card's padding and border, which matches the box model you already practised. If the basis only covered the content, the padding would make the card wider than you expected, and the wrap would happen sooner. You do not need a new mental model. You need to remember that the box model is still operating inside the flex item.`,
            ].join("\n\n"),
          },
          {
            heading: "A navigation bar and a row of cards",
            markdown: [
              `Build the navigation bar first, because it uses fewer decisions than the cards. The header is the flex container. Give it ${c("display: flex")}, ${c("justify-content: space-between")}, ${c("align-items: center")}, ${c("flex-wrap: wrap")}, and a gap. The two children are a short name, such as a strong element, and a nav element. The name stays at the start. The nav sits at the end. If the window becomes very narrow, wrap lets the nav drop below the name instead of spilling off the screen.`,
              `Inside the nav, make a second flex container. The links are its items. A gap of about 12 pixels keeps the links from touching. You usually do not want space-between on the links themselves, because that flings the first and last link to opposite ends of the nav. A simple row with a gap is enough. Set the link colour so it stays visible on the header background. A white link on a dark header is a reading decision you already know how to make from the CSS lesson. Layout did not replace it.`,
              `The card row is a different container. A division or a section holds three article elements. That parent gets ${c("display: flex")}, ${c("flex-wrap: wrap")}, and a gap. Each article gets padding, a border, a radius, a background, and ${c("flex: 1 1 220px")}. The heading and the paragraph inside the article should stack. They will stack if you do not put ${c("display: flex")} on the article. Resist the urge to flex everything. Flex the parents that own a row. Leave the writing inside a card in normal block flow.`,
              `A reliable order of work keeps the bugs small:`,
              `1. Write the HTML first, with real sentences, not empty regions.`,
              `2. Open the page in the browser before the layout CSS, so you can see the default stack.`,
              `3. Add display: flex to one parent and reload.`,
              `4. Add alignment, wrap, and gap.`,
              `5. Style the items with the box model: padding, border, and radius.`,
              `6. Narrow the window until something wraps, then widen it until the row returns.`,
              `People sometimes style the borders first and decide the layout is a failure when the cards still stack. The cards stack because the parent is not a flex container yet. The border is doing its job. The shelf rule is missing. Another common stumble is a single card alone on the last line, stuck at the start. That is normal for space-between and for flex-start. The last line has one item, so there is no second item to push to the far end. If you need the last line to stretch in a more even way, you are near the edge of what Flexbox wants to do. The next lesson's Grid is often the calmer tool for a strict set of columns. For today, a last line with one card is an acceptable result.`,
              `:::misunderstanding One flex container arranges the whole page
A flex container arranges its direct children only. A header row and a card row are two containers. Nested navigation links are a third. When only part of the page moves, find the parent of the elements that should move, and put the display property there.
:::`,
              `When the bar and the cards both behave, write one sentence in your own words for each property you used. For example: "space-between keeps the market name and the links apart" and "wrap moves the tea card under the others when I narrow the window." If you cannot point to a visible result, the property is still a definition, not a skill. The exercises ask for that kind of observation.`,
            ].join("\n\n"),
          },
        ],
        vocabulary: [
          {
            term: "Layout",
            definition:
              "The plan for where boxes sit together on a page, including what happens when the window gets narrower or wider.",
          },
          {
            term: "Flex container",
            definition:
              "The parent element whose display is flex. It arranges its direct children along a row or a column.",
          },
          {
            term: "Flex item",
            definition:
              "A direct child of a flex container. Grandchildren inside that child are not items of the outer container.",
          },
          {
            term: "Main axis",
            definition:
              "The direction flex items follow first. It runs along a row, or down a column if you change the direction.",
          },
          {
            term: "Cross axis",
            definition:
              "The direction that crosses the main axis. In a row it is vertical. In a column it runs from side to side.",
          },
          {
            term: "justify-content",
            definition:
              "The property that distributes free space along the main axis, such as packing items at the start or pushing them apart.",
          },
          {
            term: "align-items",
            definition:
              "The property that aligns items on the cross axis, such as stretching them or centring them within the line.",
          },
          {
            term: "flex-wrap",
            definition:
              "The property that decides whether extra items stay on one line or move onto the next line when they do not fit.",
          },
          {
            term: "Gap",
            definition:
              "Space between items inside a flex or grid container. It does not add space outside the whole group.",
          },
        ],
        demonstrations: [
          {
            title: "Build a market-day bar and a wrapping card row",
            intro:
              "You will create a small HTML page, turn the header into a flex row, turn three stall cards into a wrapping flex row, and narrow the browser until a card moves to the next line. The CSS is the same on every operating system. The steps for opening the terminal and the file manager are not.",
            steps: [
              "Create a folder at the portable path learning/week-05, using the terminal steps for your system, and open that folder in Visual Studio Code.",
              "Create the file learning/week-05/market-bar.html. Add a header with the name Market day and a nav with three links: Stalls, Hours, and Visit.",
              "Under the header, add a main area with three article elements. Give each article a heading and one real sentence, such as Bread, Fruit, and Tea.",
              "In the head, add a style element. Set the header to display: flex, with justify-content set to space-between, align-items set to center, flex-wrap set to wrap, and a gap.",
              "Put a class on the parent of the three articles. Set that parent to display: flex, flex-wrap: wrap, and a gap. Give each article padding, a border, and flex: 1 1 220px.",
              "Make the nav its own flex container with a smaller gap, and set the link colour so the links can be read on the header background.",
              "Save the file. Open it from the file manager in your browser, using the steps for your system.",
              "Narrow the window until the cards wrap, then widen it until they share one row again. Change justify-content to center, reload, observe the header, and set it back to space-between.",
            ],
            expected:
              "The market name sits at the start of a coloured header and the links sit at the end, vertically centred, with space between the two groups. The three stalls appear as separate cards with space between them. On a narrow window the cards wrap onto more than one line instead of running off the edge.",
            verify:
              "Reload after every save. Use the browser zoom menu and set zoom to 100 percent so you are seeing CSS, not a zoomed page. Drag only the window width. The last card should move down when the row runs out of room, and return when you widen the window.",
            ifItFails:
              "If the cards still stack, display: flex is missing on their parent or it was placed on each card. If the header items sit together at the left, check the spelling of space-between. If nothing updates, you reloaded a different file than the one you saved, or the browser cached an old copy. Use the file manager to open the file you just edited.",
            os: {
              sameOnAllPlatforms:
                "The HTML and CSS you type are the same on Windows, macOS, and Linux. Saving the file and reloading the browser are the same actions everywhere. There is no layout program to install. The steps that differ are how you open the terminal, how you create the folder, how you open the file manager, and how you start Visual Studio Code.",
              identify: [
                "Windows usually shows a Start button and a taskbar along one edge. macOS shows an Apple menu at the top left and a Dock of application icons. Linux desktops vary. Many show an Activities control or a menu named for the distribution, such as Ubuntu.",
                "If those clues are missing, ask the instructor to look at your screen before you create the folder. The HTML and CSS will be the same either way. The folder should be created with the steps for the system you are actually using.",
              ],
              windows: [
                "Press the Windows key, type Command Prompt, and press Enter. Windows PowerShell is also fine if that is the app that opens.",
                "In the terminal, run mkdir learning\\week-05 and then cd learning\\week-05. The mkdir command creates the week-05 folder and the learning folder if you do not already have it.",
                "Press the Windows key, type File Explorer, and open it. Go to the learning\\week-05 folder. After you save market-bar.html, double-click it to open it in your browser. If an editor opens instead, right-click the file, choose Open with, and choose the browser.",
                "Press the Windows key, type Visual Studio Code, and press Enter. Choose File, then Open Folder, and select the week-05 folder so the editor and the terminal are looking at the same place.",
              ],
              macos: [
                "Press Command and Space together, type Terminal, and press Return.",
                "In Terminal, run mkdir -p learning/week-05 and then cd learning/week-05. The -p flag creates a missing parent folder and is safe to run again if the folder is already there.",
                "Open Finder. Choose Go, then Go to Folder, and enter the path to learning/week-05. After you save the HTML file, Control-click it, choose Open With, and choose your browser.",
                "Open Visual Studio Code from Spotlight the same way you opened Terminal. Choose File, then Open, and select the week-05 folder.",
              ],
              linux: [
                "Open the application menu and search for Terminal. On many desktops, Ctrl+Alt+T also opens a terminal. Use the menu if that shortcut does nothing on your machine.",
                "In the terminal, run mkdir -p learning/week-05 and then cd learning/week-05. Then run ls and confirm you are inside the new folder before you create the file.",
                "Open the file manager from the application menu. It is often named Files. Go to learning/week-05 and open market-bar.html with your browser after you save it.",
                "Open Visual Studio Code from the application menu. Choose File, then Open Folder, and select week-05.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "A market header and three wrapping stalls",
            filename: "learning/week-05/market-bar.html",
            language: "html",
            code: marketBarCode,
            explanation:
              "The header is one flex container. Its children are the market name and the nav, pushed apart with space-between and centred on the cross axis. The nav is a second flex container, so the links share a row with their own gap. The stalls division is a third flex container. Each article can grow, shrink, and wrap from a basis of 220 pixels. The heading and paragraph inside a stall are not flex items of the stalls row, so they stack like ordinary text. Padding, border, and radius are still the box model.",
            lineNotes: [
              {
                focus: "header display",
                note: "display: flex on the header makes the name and the nav into flex items. It does not flex the links inside the nav.",
              },
              {
                focus: "space-between and center",
                note: "space-between uses free space on the main axis. center aligns the name and the nav on the cross axis, which is vertical in a row.",
              },
              {
                focus: "nested nav",
                note: "The nav is its own flex container with wrap and a 12 pixel gap, so the links stay separated and can drop to a new line on a narrow window.",
              },
              {
                focus: "stalls wrap",
                note: "flex-wrap: wrap on the parent is what allows a card to move to the next line. The default would keep every card on one line.",
              },
              {
                focus: "flex shorthand",
                note: "flex: 1 1 220px sets grow, shrink, and basis. The basis is the starting width used when the browser decides whether the next card fits.",
              },
            ],
            expectedOutput:
              "A dark header shows Market day at the start and three white links at the end. Below, three white cards with borders show Bread, Fruit, and Tea. Narrowing the window wraps the cards onto extra lines. The Hours and Visit links jump to those sections.",
            level: "practical",
          },
        ],
        exercises: [
          {
            title: "A choir name and its links",
            difficulty: "warm-up",
            prompt:
              "Make a header for a community choir. Use your own choir name and four link names, such as Rehearsals, Music, Concerts, and Join. The name and the link group should sit on one row, at opposite ends, and meet in the vertical middle.",
            steps: [
              "Create learning/week-05/choir-bar.html with a header, a short name, and a nav of four links.",
              "Make the header a flex container and choose the packing and alignment values that match the prompt.",
              "Add a gap and allow the link group to wrap if the window is very narrow.",
              "Set a header background and a link colour you can read. Reload and narrow the window.",
            ],
            expectedOutcome:
              "On a wide window the choir name is at the start and the links are at the end, in the vertical middle of the bar. On a very narrow window the links wrap instead of leaving the screen. You can point to the property that caused each of those results.",
          },
          {
            title: "Three event cards that wrap",
            difficulty: "practice",
            prompt:
              "Under a heading, lay out three event cards for the choir: a rehearsal, a concert, and a new-singer night. Each card needs a heading and one sentence. The cards share a row when they fit and move onto extra lines when they do not.",
            steps: [
              "Add a parent element that contains three articles. Do not put display: flex on the articles.",
              "Give the parent a row direction, wrapping, and a gap you choose on purpose.",
              "Give each article a flex basis so a narrow window cannot hold all three, plus padding and a border from the box model.",
              "Add a second, smaller container somewhere on the page and set its direction to column. Write one sentence, in an HTML comment or in your notes, that says which way justify-content moves items inside that column.",
            ],
            expectedOutcome:
              "The three events sit side by side on a wide window and wrap on a narrow one, with visible space between cards that does not double up. The column container stacks its children. Your sentence says that the main axis in that container is vertical.",
          },
        ],
        troubleshooting: [
          {
            problem: "justify-content seems to do nothing.",
            why: "There is no free space left to distribute, or display: flex is missing, or the property was set on a child instead of the parent. Items with flex-grow greater than 0 can also eat the free space before justify-content has a chance to show.",
            solution:
              "Confirm display: flex is on the parent. Temporarily remove a flex shorthand that includes grow. If the items then pack together at the start, the property is working and the row was already full. Put grow back only on the items that should expand, such as cards, and leave it off a title and a nav.",
          },
          {
            problem: "The cards stay on one line and spill past the window.",
            why: "The default for flex-wrap is nowrap, so items are not allowed to move to the next line. A wide image or a long unbroken word can also refuse to shrink below its content size.",
            solution:
              "Set flex-wrap to wrap on the card parent. Give each card a basis, such as the flex shorthand with 220px. If an image is inside the card, set its max-width to 100 percent and its height to auto. Reload, then drag the window narrower than the three bases plus the gaps.",
          },
          {
            problem: "The heading and the paragraph inside a card sit side by side.",
            why: "display: flex was set on the card. The heading and the paragraph are the card's direct children, so they became flex items in a row.",
            solution:
              "Move display: flex to the parent that should own the row of cards. Leave the card itself as a normal block so the heading and the paragraph stack. Nested flex is for a group you truly want in a row, such as the links inside a nav.",
          },
          {
            problem: "space-between is spelled correctly and the items still sit together.",
            why: "A typo in the property name, a second rule later in the file that sets flex-start, or a parent that is not wide enough will all look like a failed value. The browser also ignores a value it does not recognise, and the default remains in force.",
            solution:
              "Check the spelling space-between, with a hyphen and no extra words. In the browser, right-click the header, choose Inspect, and look at the computed justify-content. If a later rule wins, delete or correct that later rule. Widen the window so free space exists, then reload the file you saved.",
          },
        ],
        knowledgeChecks: [
          {
            id: "flex-where-property",
            question: "You want three cards in a row. Where do you set display: flex?",
            format: "Multiple choice",
            options: [
              "On each card, so every card flexes itself into the row.",
              "On the parent of the cards. The cards, which are the direct children, become the flex items.",
              "On the h1 inside the first card, because the first text starts the row.",
              "On the body in every case, even when the cards are nested inside a main element.",
            ],
          },
          {
            id: "flex-axis-swap",
            question:
              "You set flex-direction to column and justify-content to flex-end. What should you expect?",
            format: "Multiple choice",
            options: [
              "The items pack toward the bottom, along the vertical main axis.",
              "The items pack toward the right, because justify-content is always horizontal.",
              "The items wrap onto extra columns, because flex-end turns wrapping on.",
              "The container disappears, because column and flex-end cancel each other.",
            ],
          },
          {
            id: "flex-gap-reason",
            question:
              "Why can gap be easier to predict than a right margin on every card?",
            format: "Short answer",
          },
        ],
        homework: {
          description:
            "Write a lesson response about the navigation bar and card row you built. Name the flex container and the flex items, and describe what changed when you narrowed the window.",
          requirements: [
            "Name the flex container and the direct children for your navigation bar, and do the same for your card row.",
            "Say which values you used for justify-content, align-items, flex-wrap, and gap, and what each value changed on the page.",
            "Describe one problem you hit, such as a row that would not wrap, and the exact change that fixed it.",
          ],
          deliverables: [
            "A written response of about 150 to 250 words in this lesson's response area.",
            "The portable path of your HTML file, such as learning/week-05/market-bar.html, plus the CSS rules you want the instructor to read, pasted into the response.",
          ],
          submission:
            "Submit this as the lesson response for Arrange boxes with Flexbox before the next session. Keep the HTML file in your learning folder. The full landing page is a later assignment, not this response.",
          criteria: [
            "The response names a real parent and its direct children, and the pasted CSS matches that structure.",
            "The response describes a result you saw while resizing, including wrap or gap, rather than only a definition copied from notes.",
          ],
          submissionKind: "lesson_response",
        },
        summary: [
          "Layout is the plan for where boxes sit together. Flexbox handles that plan in one direction: a row or a column.",
          "display: flex belongs on the parent. Only the direct children become flex items. justify-content follows the main axis, and align-items follows the cross axis.",
          "flex-wrap lets extra items move to the next line. gap spaces items without doubling margins. A card often needs a flex basis so the browser knows when to wrap.",
          "A navigation bar and a card row are separate flex containers. Narrow the window before you decide either one is finished.",
        ],
        nextLesson: {
          title: "Grid and responsive design",
          why: "Flexbox handles a row or a column. A landing page also needs rows and columns at the same time, and it needs a plan for phones, tablets, and wide windows.",
          lessonSlug: "grid-and-responsive-design",
        },
      },
      guide: {
        sessionNumber: 9,
        week: 5,
        title: "Arrange boxes with Flexbox",
        durationMinutes: 90,
        objectives: [
          "Students can say what layout adds beyond the box model.",
          "Students can put display: flex on the correct parent and predict the main axis.",
          "Students leave with a navigation bar and a wrapping card row in learning/week-05.",
        ],
        tools: [
          "Visual Studio Code, or another text editor if that is all a student has today",
          "A current browser with zoom set to 100 percent",
          "The learning folder created in earlier weeks",
        ],
        preparation: [
          "Open a starter file that has a header and three articles and no flex rules, so you can add one property at a time on the projector.",
          "Prepare a second file where display: flex is wrongly placed on each card, so the heading and paragraph sit side by side.",
          "Check that File Explorer, Finder, or the Linux file manager on the teaching machine can open an HTML file in the browser the students will use.",
          "Write the shelf analogy and the six justify-content values on a slide or a board before the room arrives, so the live demo is not also a spelling lesson.",
        ],
        flow: [
          {
            minutes: 5,
            title: "Paper shelves",
            detail:
              "Ask each person to sketch a market header and three stall cards on paper, once wide and once narrow. Say that today CSS will describe those positions, and that colour and fonts are already their tools from last week. Collect one sketch to return to in the recap.",
          },
          {
            minutes: 15,
            title: "Shelf, container, and axes",
            detail:
              "On the board, draw one shelf and three jars. Name the parent as the flex container and the jars as flex items. Show display: flex on the parent only. Mark the main axis and the cross axis, then rotate the drawing into a column and ask which property still follows the long direction.",
          },
          {
            minutes: 20,
            title: "Live navigation bar",
            detail:
              "Build the header on the projector from the starter file. Add justify-content values one at a time and reload. Narrate free space. Then set align-items to center and flex-wrap to wrap. Open the broken file and ask the room why the heading and paragraph jumped into a row.",
          },
          {
            minutes: 30,
            title: "Card row practice",
            detail:
              "Students create learning/week-05/market-bar.html and the choir exercise if they finish. Walk the room. When someone is stuck, ask them to point to the parent in the HTML before you touch the keyboard. End this block by having two people narrow their windows on the projector.",
          },
          {
            minutes: 10,
            title: "Three real failures",
            detail:
              "Demonstrate the three failures you are most likely to have seen while circulating: flex on the child, nowrap overflow, and justify-content with no free space. For each one, say the cause in a single sentence and make the smallest edit that shows the fix.",
          },
          {
            minutes: 10,
            title: "Checks and the next tool",
            detail:
              "Ask the three knowledge checks out loud and take one answer for each before you confirm it. Explain the lesson response: container, items, four properties, and one bug. Preview Grid as the tool for rows and columns together, using a calendar sketch. Assign the response before they leave.",
          },
        ],
        explain: [
          "Layout is where boxes sit, not how they are coloured.",
          "display: flex on a parent. Direct children only.",
          "Main axis versus cross axis, and how flex-direction swaps them.",
          "justify-content needs free space. flex-grow can consume that space.",
          "flex-wrap, gap, and the flex shorthand for cards.",
          "A header row and a card row are two containers, and a nav can be a third.",
        ],
        questions: [
          "If I add display: flex to one card, which elements move, and which elements stay where they are?",
          "Why can space-between look the same as flex-start when the row has only one item, or when the items already fill the width?",
          "After we set flex-direction to column, which way does justify-content: center move the items?",
        ],
        demonstration:
          "Build the market header live, changing only justify-content between reloads, then add the wrapping stalls. Keep the starter HTML visible beside the CSS so students can see that the parent selector matches the element that wraps the cards.",
        practice:
          "Students create learning/week-05/market-bar.html with a flex header and three wrapping stall cards, then start the choir header if time remains. They must narrow the browser themselves before they call you over.",
        expectedOutcomes: [
          "Each student has a flex navigation bar and a wrapping card row saved under learning/week-05.",
          "Students can point to the parent that carries display: flex.",
          "Students can say what wrap and gap changed when the window got narrow.",
        ],
        difficulties: [
          {
            issue: "The student puts flex properties on the article and cannot see a row of cards.",
            help: "Ask them to draw a box around the parent in the HTML with their finger. Move display, wrap, and gap onto that parent. Leave padding and border on the article. Reload before adding any new property.",
          },
          {
            issue: "The cards overflow the narrow window, or a long word holds a card open.",
            help: "Add flex-wrap: wrap and a basis through the flex shorthand. If an image is the cause, add max-width: 100% and height: auto on the image. Then drag the window until the arithmetic of basis plus gap no longer fits.",
          },
          {
            issue: "The student changes five properties and the browser still shows the old page.",
            help: "Confirm the open tab is the saved file, using the file manager rather than an old bookmark. Set zoom to 100 percent. Then undo back to the last working rule and add one line at a time.",
          },
        ],
        homework:
          "The lesson response names both flex containers, lists justify-content, align-items, flex-wrap, and gap with a visible result for each, and describes one bug they fixed. It is not the landing-page assignment.",
        assessment:
          "Use the three knowledge checks in the last block. Listen for 'parent and direct children' and for the main axis changing with column. The written response is the take-home check. Do not grade the choir exercise unless you offered it as extra practice.",
        recap:
          "Return to the paper sketch from the first five minutes and label the shelf, the main axis, and one wrap. Tell the room that Grid next session is for rows and columns together, and that today's bar can stay a flex bar inside that later page.",
        knowledgeCheckAnswers: [
          {
            id: "flex-where-property",
            answer:
              "On the parent of the cards. The cards, the direct children, become the flex items.",
            explanation:
              "display: flex arranges direct children only. Putting it on each card arranges the heading and paragraph instead of the cards.",
          },
          {
            id: "flex-axis-swap",
            answer: "The items pack toward the bottom, along the vertical main axis.",
            explanation:
              "flex-direction: column makes the main axis vertical. justify-content follows that axis, so flex-end packs items at the bottom.",
          },
          {
            id: "flex-gap-reason",
            answer:
              "Gap adds space only between items. A margin on every card doubles where two margins meet and also adds space after the last card.",
            explanation:
              "Gap does not pad the outer edge of the group. Outer air comes from padding on the container, which is why the result is easier to predict.",
          },
        ],
      },
    },
    {
      slug: "grid-and-responsive-design",
      sessionNumber: 10,
      title: "Grid and responsive design",
      estimatedMinutes: 90,
      difficulty: "Bringing ideas together",
      requiresOs: true,
      content: {
        overview: {
          about:
            "This lesson builds pages that stay readable when the window changes size. You will use CSS Grid to place regions in rows and columns, write the narrow layout first, and add media queries for wider screens. You will also meet relative units, make images shrink with their column, and test a page at phone, tablet, and desktop widths.",
          why:
            "A layout that only fits the computer in front of you hides text on a phone and leaves awkward empty bands on a wide monitor. Responsive design is the habit of writing rules for more than one width, then looking at those widths on purpose.",
          alreadyKnow:
            "You can make a flex container, use justify-content, align-items, flex-wrap, and gap, and you can narrow a browser window to see a row wrap.",
        },
        objectives: [
          "Explain how CSS Grid differs from Flexbox and where a page can use both.",
          "Create columns and rows with grid-template-columns and separate the cells with gap.",
          "Write mobile-first CSS and add min-width media queries at breakpoints you chose.",
          "Use relative units such as rem and fr, and a percent limit, for type, spacing, and columns.",
          "Make an image shrink inside its column and test the page at three screen widths.",
        ],
        prerequisites: [
          {
            label:
              "You can build a row with display: flex, justify-content, align-items, flex-wrap, and gap.",
            lessonSlug: "flexbox",
          },
          {
            label:
              "You can space a box with margin, padding, and borders, and you know what border-box changes.",
            lessonSlug: "css-box-model",
          },
        ],
        teachingNotes: [
          {
            heading: "CSS Grid, rows, and columns",
            markdown: [
              `Flexbox is a single shelf. It runs in a row, or it runs in a column. CSS Grid is the whole bookcase. It has shelves and it has vertical dividers at the same time. A calendar is the everyday picture. The days run across in columns. The weeks run down in rows. A landing page is often the same kind of shape: a welcome area, then a set of feature cards that should line up both across and down.`,
              `You turn an element into a grid container with ${c("display: grid")}. The direct children become grid items. That part will feel familiar from Flexbox. The new part is the tracks. A column track is a vertical slice. A row track is a horizontal slice. The items flow into the cells, one after another, unless you later place a particular item by hand. If you set ${c("display: grid")} and define no columns, the default is a single column. The items stack. Beginners think Grid is broken when they see that stack. The display property is working. The column list is missing.`,
              fence(
                "css",
                `
.features {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
`,
              ),
              `${c("grid-template-columns")} is the list of column tracks. ${c("1fr")} means one fraction of the free space. Three tracks written as ${c("1fr 1fr 1fr")} share the width in three equal parts. ${c("grid-template-rows")} is the matching list for rows. For cards of text, you often leave the rows undefined. The browser then creates a new row when a row is full, and the row grows with the content. A fixed row height, such as 100 pixels, can slice a sentence in half. Let content set the row height until you have a strong reason not to.`,
              `${c("gap")} on a grid is the space between cells. It works like flex gap. It does not add padding around the outside of the grid. You can still set padding on the container when you want air between the grid and the edge of the page. One value applies to both directions. The row gap and the column gap can differ if you pass two values.`,
              `:::misunderstanding Grid is only for data tables
A table is for information that truly has rows and columns of data, such as a price list with headings. Grid is for visual layout. A welcome message beside a photo is not a data table, but it can still be a grid of two columns. Use a table when the relationships are data. Use Grid when the relationships are regions of a page.
:::`,
              `Flexbox does not retire when Grid arrives. A navigation bar is still a good flex row. A feature area is a good grid. They can live in the same file. The header does not need ${c("display: grid")} unless its children truly form two dimensions. Choosing a tool is part of the work. If you can describe the region as one line of items, Flexbox is enough. If you can describe it as columns and rows together, Grid is the clearer description.`,
              `You can also let one item span more than one column. ${c("grid-column: 1 / -1")} stretches an item from the first line to the last line, which is a formal way to say "use the full width." You do not need spanning for the three feature cards. It is useful for a heading that should sit above all the columns. If spanning feels like too many symbols today, skip it and keep the heading outside the grid. The columns still teach the lesson.`,
            ].join("\n\n"),
          },
          {
            heading: "Responsive design and mobile-first CSS",
            markdown: [
              `Responsive design means the page responds to the space it is given. The words reflow. The columns change. The image shrinks. The reader does not have to slide the page sideways to find the heading. This is a design habit, not a single property. The habit has three parts: a sensible narrow layout, rules that add complexity only when there is room, and a test at more than one width.`,
              `Mobile-first is the order we will use. You write the CSS for a narrow window as the normal rules, outside any query. A phone, and a desktop window dragged narrow, both get that plan: one column, readable type, a navigation bar that can wrap, an image that cannot escape its column. After that, you add rules for wider windows. Those extra rules live inside media queries. If a very old browser ignored the queries, it would still get the one-column page. That page is usable. A desktop-only page that never learned how to stack is not.`,
              `Think of packing a bag. You put in the items you need for the small bag first: medicine, keys, a phone. If you are given a larger bag, you add a book. You do not pack the large bag first and then hope the small bag can swallow the book. Desktop-first CSS packs the large bag first. People then write a query that tries to undo columns, undo floats, and undo fixed widths. The undo list gets long and brittle. Mobile-first CSS packs the small bag first. Wider queries add the book.`,
              `:::example One column, then two, then three
On a phone the library features stack: Borrow, then Read, then Meet. At a medium width, Borrow and Read share a row and Meet sits on the next row. On a wide window all three share one row. The HTML did not change. The column list changed when the window earned enough room.
:::`,
              `A responsive page still needs the writing to be real. Three empty boxes that stack are not a landing page. A landing page tells a person what the place is, what they can do there, and how to take a next step. Layout serves that message. When you test, read the sentences at the narrow width. If a heading is cut off, the layout failed the message, even if the columns match a diagram.`,
              `You will hear people treat responsive design as a phone problem only. A very wide window is a problem too. A line of text that stretches across a television is hard to read. ${c("max-width")} on the main area, with ${c("margin: 0 auto")} to centre it, keeps the line length comfortable while the background can still fill the screen. That is the same box-model skill you used on a profile card, now in service of a whole page. Flexbox, Grid, and max-width are allowed to work in the same stylesheet.`,
            ].join("\n\n"),
          },
          {
            heading: "Media queries and breakpoints",
            markdown: [
              `A media query is a condition wrapped around some CSS. When the condition is true, those rules apply. When it is false, the browser ignores them and keeps the rules outside the query. The condition we will use is the width of the viewport. The viewport is the visible area of the page in the browser window, not the whole monitor, and not the width of a single div.`,
              fence(
                "css",
                `
.features {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 40rem) {
  .features {
    grid-template-columns: 1fr 1fr;
  }
}
`,
              ),
              `Read the query as a sentence. "When the viewport is at least 40 rem wide, use two columns." Below that width, the earlier rule remains: one column. ${c("min-width")} means "this wide or wider." ${c("max-width")} means "this wide or narrower." This course uses min-width because it matches mobile-first. Mixing a pile of min and max queries in your first page makes the order of rules hard to trace. Two min-width queries are enough.`,
              `A breakpoint is the width where you allow the layout to change. It is a decision, not a law of nature. Phones, tablets, and laptops do not share one magic number. For this course, use two breakpoints. Something near ${c("40rem")} is a reasonable place to stop stacking everything, because the window is wide enough for two cards. Something near ${c("60rem")} is a reasonable place to offer three columns. You may move those numbers if your content needs it. A card with a long heading may need a wider breakpoint than a card with one word. Choose the breakpoint by looking at the content, then write the number down so you can test it.`,
              `The braces matter. The query has its own braces, and each rule inside it has braces too. A missing brace does not always produce a loud error. The browser may ignore the rest of the stylesheet. When a query seems dead, count the braces before you invent a new theory. Also keep queries in a style element or in a CSS file. A style attribute on a single tag cannot hold a media query.`,
              `:::warning The query does not run itself
Typing a media query into the file does not change the page at every width. The viewport has to match the condition. If you test only on a narrow window, a min-width query will look broken because it is correctly staying off. Widen the window past the breakpoint and reload.
:::`,
              `Order in the file matters when two rules set the same property. Put the one-column rule first. Put the 40rem query next. Put the 60rem query after that. At a wide width, both queries match, because a 70rem window is at least 40rem and at least 60rem. The later rule wins if both set grid-template-columns. That is why the three-column rule should come last. You are not turning the two-column rule off by hand. You are replacing the column list with a later list.`,
              `There is also a meta element that must be in the HTML head, or a phone may lie to you:`,
              fence(
                "html",
                `
<meta name="viewport" content="width=device-width, initial-scale=1">
`,
              ),
              `Without that element, many phones lay the page out as if it were a wide desktop, around 980 pixels, and then shrink the result to fit. Your careful one-column CSS never gets the narrow viewport it was written for. The person sees tiny text. Adding the viewport element tells the phone to use its real width. After you add it, test again. This element is HTML, not CSS, but responsive design fails without it.`,
            ].join("\n\n"),
          },
          {
            heading: "Relative units",
            markdown: [
              `A pixel is a fixed CSS length. It is useful for a hairline border, and it was useful for the flex basis while you learned wrapping. A page made only of pixels ignores a reader who increases the browser's default font size. Relative units tie a length to something else, so the layout can move with the reader or with the parent.`,
              `${c("rem")} is relative to the root font size, which is the font size of the html element. If the root is 16 pixels, ${c("1rem")} is 16 pixels, ${c("1.125rem")} is a slightly larger body size, and ${c("40rem")} is 40 times the root font size. Padding, gaps, and breakpoints written in rem grow when the reader asks for larger text. That is a kindness, and it is also practical: a breakpoint in rem switches columns when the text needs more room, not only when the pixel count hits a number you copied from a phone advertisement.`,
              `${c("em")} is relative to the font size of the element you are styling. It is valid, and it can surprise you, because a child with ${c("1.2em")} inside a parent with ${c("1.2em")} compounds. While you are learning, prefer rem for font size, padding, and breakpoints. Use em later, when you want a component's inner spacing to follow that component's own font size.`,
              `A percent is relative to the parent. ${c("width: 100%")} means as wide as the parent's content area. ${c("max-width: 100%")} means the element may be smaller than the parent, but it may not be wider. Percents are the right idea for images and for regions that should follow a column. They are a poor idea for font size in this course, because a percent font size is easy to lose track of.`,
              `${c("fr")} exists inside Grid. It is a fraction of the free space in the grid, after gaps and any fixed tracks are accounted for. ${c("1fr 1fr 1fr")} means three equal shares. ${c("2fr 1fr")} means the first column gets twice the free space of the second. fr does nothing in a normal block. If you write it on a paragraph's width, the browser ignores it. Keep fr on grid tracks.`,
              `${c("vw")} is a percent of the viewport width. A heading set to a large vw value becomes huge on a wide screen and tiny on a phone. That looks dramatic in a demo and often fails a real page. You do not need vw this week. If you see it in an example online, you now know why a heading might be overflowing: the size is tied to the window, not to the reader's font.`,
              `:::tip Pick a unit for a reason
Use rem for type, padding, gap, and breakpoints. Use fr for grid columns. Use percent, through max-width, to stop an image or a region from escaping its parent. Use pixels for a thin border. Mixing them on purpose is skill. Mixing them at random makes the page hard to change.
:::`,
              `A short translation helps when you inspect a page. If the root font size is 16 pixels, a 40rem breakpoint is 640 pixels, and a 60rem breakpoint is 960 pixels. Device tools often show pixels. Your CSS can still say rem. When the layout flips at a different pixel width than you expected, check whether the root font size is larger than 16 pixels. The rem breakpoint moved with it. That is the unit doing what you asked.`,
            ].join("\n\n"),
          },
          {
            heading: "Responsive images",
            markdown: [
              `An image is a file with its own pixel size. A photo from a phone might be 3000 pixels wide. The img element wants to show that width unless CSS says otherwise. The page then grows a sideways scrollbar so the photo can stick out past the column. The text may be perfectly responsive while the photo drags the layout open. People blame Grid. The grid is fine. The image refused to shrink.`,
              `The rule to learn is small and worth memorising:`,
              fence(
                "css",
                `
img {
  max-width: 100%;
  height: auto;
  display: block;
}
`,
              ),
              `${c("max-width: 100%")} says the image may use its natural size when that size fits, and it must shrink when the parent is narrower. ${c("height: auto")} keeps the proportions, so a photo does not get squashed into a pancake when the width changes. ${c("display: block")} removes a small gap some browsers leave under an image that is still inline, sitting on the text line like a tall letter. The gap is not part of your padding. Making the image a block removes it.`,
              `In the HTML, keep the alt attribute. You learned it with your first images. A layout lesson does not cancel it. Alt text is what a reader hears if the image does not load, and what a person using a screen reader hears instead of seeing the photo. Also set width and height attributes to the image's real pixel size when you know them, for example width="800" and height="500". Those attributes let the browser reserve a box before the file arrives, so the page does not jump downward when the photo appears. CSS can still shrink the box. The attributes describe the file. The CSS describes how it may scale.`,
              `CSS that shrinks a display does not shrink the download. A 3000 pixel file is still a 3000 pixel file on the wire, even if it appears 300 pixels wide. For this lesson, choose a reasonably sized file, perhaps under 200 kilobytes if you can, and crop it before you put it in the folder. You may later meet srcset, which offers the browser a smaller file. You will not be asked to write srcset this week. The required skill is the CSS limit, true alt text, and a check that the image does not cause sideways scrolling.`,
              `Put the image in the same folder as the HTML file and use a relative src, such as ${c('src="reading-chair.jpg"')}. A relative path travels with the project. A path that starts with a single computer's user folder will break when the page moves to another machine. If the photo is missing, the browser shows the broken-image icon and the alt text. The grid can still be judged. Bring the file in, reload, and confirm the photo stays inside the column at a narrow width.`,
              `:::misunderstanding The image is responsive because it is inside a grid
A grid column can be narrow while the image stays wide and overflows that column. The column does not automatically tame the image. The img rule has to limit the image. Inspect a sideways scroll by looking for the element that sticks out. Often it is the photo.
:::`,
            ].join("\n\n"),
          },
          {
            heading: "Testing phone, tablet, and desktop widths",
            markdown: [
              `A responsive page is a claim: this layout works at more than one size. A claim needs a test. Looking once, on the laptop where you wrote the CSS, tests one width. You will test three. Use a narrow width around 360 pixels, which is a small phone in portrait. Use a medium width around 768 pixels, which is near a tablet or a large phone turned sideways. Use a wide width, the full laptop window, and confirm it is past your 60rem breakpoint. Write the three widths down. Memory tidies up failures.`,
              `You can drag the window for a rough test. For a precise width, use the browser's device toolbar inside developer tools. It is often an icon shaped like a phone or a tablet. You type a width, or pick a device name, and the viewport changes without you resizing the whole application. The way you open developer tools depends on the operating system. The widths you type do not. Test the same three numbers on Windows, macOS, and Linux so the class can compare results.`,
              `At each width, look for four things. First, sideways scrolling. If the page moves left and right, something is wider than the viewport. Second, overlapping regions. A header that covers a heading is a failure even if there is no scrollbar. Third, text cut off or squeezed into a single word per line. Fourth, columns that never change. If the three-card row looks identical at 360 pixels and at a full desktop, the media query is not matching, or it is matching and a later rule puts the one-column layout back.`,
              `A useful test log is three lines:`,
              `1. At 360 pixels I saw one column. The image fit. I fixed a link that hung out of the header by allowing the nav to wrap.`,
              `2. At 768 pixels I saw two feature columns. The welcome photo and the paragraph sat side by side.`,
              `3. At 1200 pixels I saw three feature columns. The main text stopped growing because of max-width, and the empty margins on either side were intentional.`,
              `That log is evidence. "It works on my screen" is not evidence. The week assignment asks for this kind of note because the CSS and the observation belong together. If you fix a problem, test all three widths again. A change that repairs the phone can crowd the desktop, and the reverse is just as common.`,
              `:::tip Zoom is not a width test
Set browser zoom to 100 percent before you judge a layout. Zoom scales the whole page and can hide or invent overflow. Change the viewport width with the window edge or the device toolbar. Put zoom back only after the width test is written down.
:::`,
              `When a phone you can hold is available, use it too. Developer tools are a good stand-in, and a real phone is a better final check, because it uses the viewport meta element for real. Open the HTML file the way your instructor recommends for the classroom machines. If the file cannot be sent to your phone during class, the device toolbar is the required check, and a real phone is a bonus. Either way, you are looking for the same four failures: sideways scroll, overlap, unreadable lines, and columns that refuse to change.`,
              `You now have a full path from the Flexbox lesson to a page. Keep the navigation on Flexbox. Place the welcome area and the features with Grid. Write one column first. Add two min-width queries. Limit the image. Test three widths and write what you saw. That is responsive design at the level this course needs. The next week leaves layout for a while and starts JavaScript, which can calculate and respond after the page has loaded. A clear layout makes that later work easier to see, because you will know whether a problem is a column or a script.`,
            ].join("\n\n"),
          },
        ],
        vocabulary: [
          {
            term: "CSS Grid",
            definition:
              "A layout system that places direct children in rows and columns at the same time, unlike Flexbox which works in one direction.",
          },
          {
            term: "Track",
            definition:
              "One column or one row in a grid. grid-template-columns lists the column tracks and their sizes.",
          },
          {
            term: "fr",
            definition:
              "A fraction of the free space inside a grid. 1fr 1fr means two columns that share the available width equally.",
          },
          {
            term: "Responsive design",
            definition:
              "Writing and testing a page so the layout stays readable when the viewport is narrow, medium, or wide.",
          },
          {
            term: "Mobile-first",
            definition:
              "Writing the narrow layout as the normal CSS, then adding min-width queries that enhance the page when there is more room.",
          },
          {
            term: "Media query",
            definition:
              "A CSS condition, such as min-width, that applies the rules inside it only when the viewport matches.",
          },
          {
            term: "Breakpoint",
            definition:
              "A viewport width you choose, where the layout is allowed to change, such as 40rem for two columns.",
          },
          {
            term: "Viewport",
            definition:
              "The visible area of the page in the browser. The viewport meta element tells phones to use their real width.",
          },
        ],
        demonstrations: [
          {
            title: "Turn a library page into a responsive grid",
            intro:
              "You will build a one-page library introduction with a wrapping flex navigation bar, a grid welcome area, three feature cards, and an image that shrinks. The narrow layout comes first. Two min-width queries add columns. Then you test three viewport widths. The CSS is the same on every system. Opening the terminal, the file manager, and the developer tools is not.",
            steps: [
              "Use the terminal steps for your system to enter learning/week-05, and open that folder in Visual Studio Code.",
              "Create learning/week-05/library.html with a header, a main area, and a footer. Include a nav, one image with alt text, and three articles with real sentences.",
              "In the head, add the viewport meta element with width=device-width and initial-scale=1, plus a style element.",
              "Write the base CSS: a flex nav that can wrap, an img rule with max-width 100 percent and height auto, and a one-column grid for the features with a rem gap.",
              "Add a min-width query at 40rem that sets two columns on the feature grid. Add a later min-width query at 60rem that sets three columns.",
              "Put reading-chair.jpg beside the HTML file if you have a photo. If you do not, keep the alt text so the region is still understandable.",
              "Save and open the file in the browser from the file manager. Set zoom to 100 percent.",
              "Open developer tools with the steps for your system. Test about 360 pixels, about 768 pixels, and a wide window. Write three lines about what you see, then fix one problem and test those widths again.",
            ],
            expected:
              "At a narrow width the features stack in one column and the image stays inside the window. Around 40rem the features share two columns. Around 60rem they share three. The navigation remains readable and does not force sideways scrolling.",
            verify:
              "Use the device toolbar's width readout, not your memory of the window. Confirm the viewport meta element is in the head. At the wide width, inspect a feature card and check that grid-template-columns shows three tracks. At 360 pixels it should show one.",
            ifItFails:
              "If you still see one column on a wide window, the query is narrower than the window you think you have, a brace is missing, or a later rule resets the columns. If the phone view looks like a tiny desktop, the viewport meta element is missing. If the page scrolls sideways, inspect the image rule before you rewrite the grid.",
            os: {
              sameOnAllPlatforms:
                "The HTML, the CSS, the viewport meta element, and the three test widths are the same on Windows, macOS, and Linux. Save the file and reload the browser the same way everywhere. You are not starting a server and you are not installing a layout tool. The different steps are how you open the terminal, how you find the file, and how you open developer tools.",
              identify: [
                "Use the same clues as in the Flexbox lesson. Windows has a Start button and a taskbar. macOS has an Apple menu and a Dock. Linux often has Activities or a menu named for the distribution.",
                "Developer tools live in the browser, so the browser menu works even when a keyboard shortcut does not. If you cannot tell which shortcut to trust, open the browser menu and look for Developer tools or More tools, then ask the instructor to confirm.",
              ],
              windows: [
                "Press the Windows key, type Command Prompt or PowerShell, and press Enter. Run cd learning\\week-05. If the folder is missing, run mkdir learning\\week-05 first and then cd into it. Run dir to see library.html after you save.",
                "Open File Explorer, go to learning\\week-05, and open library.html in your browser. Edge, Chrome, and Firefox all have device tools.",
                "Press F12 to open developer tools. If that key does nothing, press Ctrl+Shift+I. Choose the device toolbar, the icon shaped like a phone or a tablet, and enter 360, then 768, then a wide width.",
                "Open Visual Studio Code from the Start menu with File, then Open Folder, pointed at week-05, so you edit the same file the browser has open.",
              ],
              macos: [
                "Press Command and Space, type Terminal, and press Return. Run cd learning/week-05. If the folder is missing, run mkdir -p learning/week-05 first. Run ls to confirm library.html is there after you save.",
                "In Finder, choose Go, then Go to Folder, open learning/week-05, and open the HTML file in Safari, Chrome, or Firefox.",
                "Open developer tools with Command+Option+I. If the function keys change brightness instead, hold fn as well, or use the browser's Develop or More tools menu. Turn on responsive design mode and test 360, 768, and a wide width.",
                "Open Visual Studio Code from Spotlight. Choose File, then Open, and select the week-05 folder.",
              ],
              linux: [
                "Open Terminal from the application menu, or press Ctrl+Alt+T if that shortcut is enabled. Run cd learning/week-05, or mkdir -p learning/week-05 if you still need the folder. Run ls and look for library.html.",
                "Open the file manager, often named Files, go to learning/week-05, and open the HTML file in Firefox or Chrome.",
                "Press F12 or Ctrl+Shift+I for developer tools. If the desktop takes that shortcut, use the browser menu and choose Developer tools. Turn on the device toolbar and test a narrow, a medium, and a wide viewport.",
                "Open Visual Studio Code from the application menu and use File, then Open Folder, on week-05.",
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "A mobile-first library landing page",
            filename: "learning/week-05/library.html",
            language: "html",
            code: libraryCode,
            explanation:
              "The base CSS is the narrow layout: the nav can wrap, the image cannot outgrow its column, and both grids use one fraction column. At 40rem the welcome area becomes two columns and the features become two columns. At 60rem a later query gives the features three columns. The wide window matches both queries, and the later column list wins. rem is used for type, padding, gap, and breakpoints. fr is used only for tracks. The navigation stays on Flexbox because it is one row that may wrap.",
            lineNotes: [
              {
                focus: "viewport",
                note: "width=device-width tells a phone to lay the page out at the phone's width instead of a pretend desktop width.",
              },
              {
                focus: "img rule",
                note: "max-width: 100% and height: auto let the photo shrink with the column and keep its proportions.",
              },
              {
                focus: "one fraction",
                note: "grid-template-columns: 1fr outside any query is the mobile-first column. Display grid alone would also stack, and writing 1fr makes the intention obvious.",
              },
              {
                focus: "40rem query",
                note: "min-width: 40rem applies when the viewport is at least that wide. Inside it, the welcome and feature grids move to two tracks.",
              },
              {
                focus: "60rem query",
                note: "This later query replaces the feature columns with three tracks. It must come after the 40rem query so the wide layout wins when both match.",
              },
              {
                focus: "flex nav",
                note: "The nav remains a flex row with wrap and gap. Grid is reserved for the regions that need columns and rows together.",
              },
            ],
            expectedOutput:
              "Narrow view: one column, the chair image inside the window, three features stacked, nav links that wrap if needed. Medium view: two feature columns. Wide view: three feature columns and a main area that stops stretching forever. If reading-chair.jpg is missing, the alt text still shows and the columns can still be checked.",
            level: "practical",
          },
        ],
        exercises: [
          {
            title: "Two columns only when there is room",
            difficulty: "warm-up",
            prompt:
              "Take three short notices from your own life, such as bin day, a class, and a birthday. Stack them in one column by default. From 40rem upward, show them in two columns. Do not start from a desktop layout and try to undo it.",
            steps: [
              "Create learning/week-05/notices.html with three articles inside one parent, plus the viewport meta element.",
              "Set the parent to display: grid with one fraction column and a rem gap.",
              "Add one min-width query at 40rem that changes only the column list.",
              "Open the file, test below 40rem and above it, and write one line on what changed.",
            ],
            expectedOutcome:
              "Below the breakpoint the notices stack. Above it they share two columns, with a gap that does not appear as extra outer margin. Your note names the width where the change happened.",
          },
          {
            title: "Add a third step and a scaling image",
            difficulty: "practice",
            prompt:
              "Extend the notices page, or a copy of it, into a tiny landing page. Add a flex navigation bar, one image, a 60rem query that creates three columns, and a three-width test note.",
            steps: [
              "Add a header with two or more links laid out with Flexbox, including wrap and gap.",
              "Add an img with alt text and the responsive image rule. Keep the image file beside the HTML file.",
              "Add a second min-width query after the 40rem query. Choose a desktop breakpoint near 60rem and write the three-column rule yourself.",
              "Test near 360 pixels, near 768 pixels, and a wide window. Record one observation for each width, including any sideways scroll you removed.",
            ],
            expectedOutcome:
              "The page has a wrapping nav, an image that stays inside the window, one column when narrow, and more columns only after your breakpoints. The test note mentions three widths and one fix or one result at each width.",
          },
        ],
        troubleshooting: [
          {
            problem: "display: grid still shows a single column on a wide screen.",
            why: "The column list was never set, the media query's condition does not match the current viewport, or a missing brace caused the browser to ignore the query. A later rule can also set the columns back to 1fr.",
            solution:
              "Put grid-template-columns in the rule you think is active. Widen the window past the breakpoint or set that width in the device toolbar. Count the braces in the query. In developer tools, inspect the parent and read the winning grid-template-columns value, including which file line it came from.",
          },
          {
            problem: "A phone, or the device toolbar's phone setting, shows a tiny zoomed-out desktop page.",
            why: "The viewport meta element is missing or mistyped, so the browser lays the page out at a wide default width and shrinks it to fit.",
            solution:
              "Add meta name viewport with content width=device-width, initial-scale=1 inside the head. Reload. Test 360 pixels again. Also set browser zoom to 100 percent so zoom is not stacked on top of the viewport.",
          },
          {
            problem: "The image causes sideways scrolling even though the grid is one column.",
            why: "The image's natural width is larger than the column, and no max-width rule limits it. Grid does not automatically shrink replaced content such as an image.",
            solution:
              "Set img to max-width: 100%, height: auto, and display: block. Confirm the src path loads the file you expect. Reload at 360 pixels and check that the scrollbar is gone. If a long unbreakable word is the cause instead, look at that element in the inspector before you change the grid.",
          },
          {
            problem: "The two-column layout appears, and the three-column layout never does.",
            why: "The 60rem query is above the 40rem query, so the earlier two-column rule wins at wide widths. Or the second query has a typo in min-width, or it was nested inside the first query by a misplaced brace.",
            solution:
              "Place the wider breakpoint after the narrower one. Close the first query fully before the second begins. Inspect a feature card on a viewport wider than 60rem and confirm three tracks. If the computed value is still two, the three-column rule is not the one winning.",
          },
        ],
        knowledgeChecks: [
          {
            id: "grid-needs-columns",
            question:
              "You set display: grid and the items still stack in one column on a wide window. What is the most likely missing piece?",
            format: "Multiple choice",
            options: [
              "A grid-template-columns list, or a media query that sets one and currently matches.",
              "justify-content: space-between on the body, which is required before Grid can run.",
              "A second HTML file for the wide layout.",
              "flex-direction: row on each grid item.",
            ],
          },
          {
            id: "query-min-width",
            question:
              "A query uses min-width: 60rem. The viewport is about 400 pixels wide, and the root font size is 16 pixels. Does this query apply?",
            format: "Multiple choice",
            options: [
              "No. 400 pixels is narrower than 60rem, so the rules inside the query stay inactive.",
              "Yes. min-width queries apply to every viewport once they are written in the file.",
              "Yes, but only on macOS. Other systems ignore rem inside queries.",
              "No, because Grid disables media queries until you add flex-wrap.",
            ],
          },
          {
            id: "three-width-check",
            question:
              "Name two things you look for when a narrow viewport shows a tiny shrunken page or a sideways scrollbar.",
            format: "Short answer",
          },
        ],
        homework: {
          description:
            "Build the week 5 landing page so an existing subject stays readable on a phone, a tablet, and a desktop. Use your own topic and sentences. Test three widths and write down what you see. This homework is the module assignment.",
          requirements: [
            "Start from a one-column layout, then add min-width media queries for a tablet width and a desktop width.",
            "Use Flexbox for the navigation and Grid for a region with at least three features, plus one image that scales down.",
          ],
          deliverables: [
            "The module assignment for week 5: your HTML, your CSS, and a short test note covering three widths.",
          ],
          submission:
            "Submit the work as the week 5 module assignment, not only as a note on this lesson. Keep the files at a portable path such as learning/week-05/landing.html.",
          criteria: [
            "The page is usable at a narrow, a medium, and a wide viewport, with columns that change on purpose.",
            "Text and the image stay on screen without sideways scrolling, and the test note reports what you actually saw.",
          ],
          submissionKind: "module_assignment",
        },
        summary: [
          "CSS Grid lays out direct children in rows and columns. You define column tracks, and gap spaces the cells without outer doubles.",
          "Mobile-first CSS writes the narrow layout as the default. min-width media queries add columns at breakpoints you choose, such as 40rem and 60rem.",
          "rem follows the root font size, fr shares free space in a grid, and max-width: 100% with height: auto lets an image shrink. The viewport meta element lets a phone use its real width.",
          "Test three widths and write down sideways scroll, overlap, and whether the columns changed. Flexbox can still own the navigation while Grid owns the features.",
        ],
        nextLesson: {
          title: "Programming and JavaScript",
          why: "Layout can place content on the page. JavaScript is the next step because it lets a page calculate, decide, and change after it has loaded.",
          lessonSlug: "programming-and-javascript",
        },
      },
      guide: {
        sessionNumber: 10,
        week: 5,
        title: "Grid and responsive design",
        durationMinutes: 90,
        objectives: [
          "Students can explain Grid as rows and columns, and keep Flexbox on a navigation bar.",
          "Students can write a mobile-first column list and two min-width queries.",
          "Students test 360, 768, and a wide viewport and can say what the image rule and the viewport meta element prevent.",
        ],
        tools: [
          "Visual Studio Code and a browser with developer tools",
          "A sample photo saved beside the HTML file, plus a copy with the viewport meta element removed for the failure demo",
          "The market-bar file from the Flexbox session, so students see the nav survive into a larger page",
        ],
        preparation: [
          "Prepare library.html with the image missing on purpose, then a fixed copy, so you can show alt text first and the scaling rule second.",
          "Prepare a stylesheet that uses three desktop columns as the base and no query, so you can contrast it with the mobile-first file.",
          "Confirm F12 or the browser menu opens the device toolbar on the teaching machine, and note the macOS shortcut if the room has Macs.",
          "Have a 360 pixel, 768 pixel, and wide preset written on the board before class so the test widths are shared.",
        ],
        flow: [
          {
            minutes: 5,
            title: "Three paper widths",
            detail:
              "Give each student a narrow strip, a medium sheet, and a full sheet. Ask them to mark where three library services would sit on each. Say that the HTML will stay one copy and the CSS will change the arrangement. Do not open an editor yet.",
          },
          {
            minutes: 15,
            title: "Tracks, fractions, and gap",
            detail:
              "Draw a bookcase. Set display: grid with no columns and show the single-column default. Add 1fr 1fr 1fr and a gap. Explain fr as a share of free space. State out loud that the nav from last session should stay a flex row. Ask which region is one-dimensional and which is two.",
          },
          {
            minutes: 20,
            title: "Live mobile-first page",
            detail:
              "Start from one column and the viewport meta element. Reload at 360 pixels in the device toolbar. Add the 40rem query, widen to 768, and narrate the condition. Add the 60rem query last. Then turn the viewport meta element off for ten seconds so the room sees the tiny desktop shrink, and put it back.",
          },
          {
            minutes: 30,
            title: "Student landing practice",
            detail:
              "Students build library.html or their own notices page with a flex nav, one image rule, and two min-width queries. Circulate with a card that says parent, columns, query, image. Refuse to debug a query until they have read the width in the device toolbar aloud.",
          },
          {
            minutes: 10,
            title: "Device-toolbar clinic",
            detail:
              "Project one student page at 360, 768, and a wide width. For each width, ask the room which rule is winning. Fix one sideways scroll by adding the image rule, or one dead query by moving the wider breakpoint later. Students write the three-line test note before they leave the editor.",
          },
          {
            minutes: 10,
            title: "Assignment and recap",
            detail:
              "Read the knowledge checks and hear one answer each. Walk through the module assignment: own topic, flex nav, grid features, two breakpoints, scaling image, three-width note. Point ahead to JavaScript as behaviour after layout, not as a replacement for this page. Collect the path each student will submit.",
          },
        ],
        explain: [
          "Grid tracks, fr, and gap, and the single-column default.",
          "Why the narrow CSS lives outside the query.",
          "min-width queries, two breakpoints, and later-rule order.",
          "rem versus fr versus percent, with vw mentioned only as a caution.",
          "The image rule and the viewport meta element.",
          "A three-width test with notes the instructor can mark.",
        ],
        questions: [
          "Why is the one-column layout written outside the media query instead of inside a max-width query?",
          "What does 1fr mean when three of them share a row, and what does gap take out before those shares are calculated?",
          "At 360 pixels, which two failures will you look for first, and which HTML or CSS line would you check?",
        ],
        demonstration:
          "Build the library grid from a one-column base, add the 40rem and 60rem queries in that order, and use the device toolbar at 360, 768, and a wide width. Briefly remove the viewport meta element so students see the shrunken desktop, then restore it.",
        practice:
          "Students publish learning/week-05/library.html or their notices page with a flex nav, a responsive image, and two min-width queries. They must write a three-line width log before they ask for a final check.",
        expectedOutcomes: [
          "A page whose columns change at the student's breakpoints and whose image stays inside the viewport.",
          "A test note with three widths.",
          "Students can say why the wider query comes later in the file.",
        ],
        difficulties: [
          {
            issue: "The student wrote the three-column layout as the base and is now trying to undo it for phones.",
            help: "Move the multi-column lists into min-width queries. Leave a single 1fr column outside any query. Retest 360 pixels before you add anything new. Praise the content they already wrote so the rewrite feels like a move, not a rejection.",
          },
          {
            issue: "The image or a missing viewport element makes the phone width look wrong.",
            help: "Check the head for the viewport meta element first. Then add the img rule: max-width 100 percent, height auto, display block. Reload at 360 pixels. If scroll remains, use the inspector to find the element whose width exceeds the viewport.",
          },
          {
            issue: "The student nests the second media query inside the first and cannot see three columns.",
            help: "Re-indent the file so each query's closing brace is visible. Close the 40rem query completely. Start the 60rem query after it. Inspect the computed grid-template-columns at a width past 60rem and show them the winning line.",
          },
        ],
        homework:
          "The module assignment is a responsive landing page on the student's own topic, with a flex nav, a grid of at least three features, two min-width queries, a scaling image, the viewport meta element, and a three-width test note.",
        assessment:
          "Knowledge checks cover the missing column list, when a min-width query is inactive, and two narrow-screen failures. The assignment rubric grades the page and the test note. The in-class library file can be the draft if the topic and sentences become their own.",
        recap:
          "Stand beside the three paper widths from the opening and map them to 360 pixels, 768 pixels, and a wide window. Name the one CSS idea that did the changing: the column list inside min-width queries. Tell them JavaScript starts next week, after this page can stand on its own.",
        knowledgeCheckAnswers: [
          {
            id: "grid-needs-columns",
            answer:
              "A grid-template-columns list, or a matching media query that sets the columns.",
            explanation:
              "display: grid without column tracks uses one column. The items stack until a column list says otherwise and the viewport matches that rule.",
          },
          {
            id: "query-min-width",
            answer:
              "No. About 400 pixels is narrower than 60rem, so the query does not apply.",
            explanation:
              "min-width applies at that width and wider. At a 16 pixel root, 60rem is 960 pixels. A 400 pixel viewport keeps the base CSS.",
          },
          {
            id: "three-width-check",
            answer:
              "A missing or wrong viewport meta element, and an image without max-width: 100% and height: auto. Sideways scroll and a tiny zoomed-out page are the symptoms.",
            explanation:
              "The meta element stops phones from laying out a pretend desktop. The image rule stops a wide file from forcing a horizontal scrollbar. Naming either check with its symptom is a complete answer.",
          },
        ],
      },
    },
  ],
  assignment: {
    slug: "week-05-assignment",
    title: "Responsive landing page",
    summary:
      "Build a one-page landing page that stays readable on a narrow phone, a tablet width, and a wide window, using Flexbox, Grid, and mobile-first media queries.",
    instructions:
      "Build a one-page landing page for a real everyday place or event. A library, a Saturday market, a community choir, a clinic noticeboard, or a family reunion all work. Use your own sentences. The page should say what the place is, give the reader a way to move around the page, show at least three features or stalls or sessions, include one image, and stay readable when the window is narrow, medium, and wide.\n\nStart with the narrow layout. A phone-sized viewport should see one column of content, a navigation area that can wrap, text that stays inside the window, and an image that scales down. Then add two min-width media queries. One query, around 40rem, should give the feature area more room, such as two columns. A second query, around 60rem, should use the wider space, such as three columns. Keep the navigation on Flexbox. Keep the feature area on CSS Grid.\n\nInclude a viewport meta element so a phone does not pretend the page is a wide desktop. Use at least one relative unit for type or spacing, such as rem, and use fr for the grid tracks. Set the image to a max width of 100 percent and an automatic height, and give it alternative text. Check the page near 360 pixels, near 768 pixels, and at a wide window. Write a few lines about what you saw at each width, including one problem you fixed.\n\nYou may study the library example from class. The subject, the sentences, and the measurements you choose should be your own. Keep the work at a portable path such as learning/week-05/landing.html.",
    objectives: [
      "Combine a Flexbox navigation bar with a Grid feature area on one page.",
      "Apply a mobile-first plan with two min-width breakpoints.",
      "Test an image and the text at three viewport widths and report what changed.",
    ],
    requirements: [
      "One HTML page with a header, a main area, and a footer, using your own sentences about one everyday place or event.",
      "A navigation area laid out with Flexbox, including gap and wrapping so the links can move to another line.",
      "A section of at least three features laid out with CSS Grid, with one column as the base layout.",
      "Two min-width media queries that change the grid for a wider tablet width and a desktop width, written after the base rule.",
      "A viewport meta element, one image with alternative text and a CSS rule that lets it shrink, and at least one rem measurement.",
      "A short test note that names three widths and what you observed at each, including one fix.",
    ],
    deliverables: [
      "learning/week-05/landing.html, or a clearly named HTML file inside learning/week-05.",
      "The CSS, either inside that HTML file or in learning/week-05/landing.css linked from the page.",
      "A test note of roughly 80 to 150 words, submitted with the files, listing three viewport widths and the result at each.",
    ],
    rubric: [
      {
        criterion: "Readable page and real content",
        points: 15,
        description:
          "The page has a header, main content, and a footer. The sentences are the student's own and say what the place offers.",
      },
      {
        criterion: "Flexbox navigation",
        points: 20,
        description:
          "The navigation uses display: flex with alignment or packing, gap, and wrapping so items do not fall off a narrow viewport.",
      },
      {
        criterion: "Grid feature area",
        points: 20,
        description:
          "At least three features are grid items. Column tracks are defined, and gap separates the cells without relying on doubled margins.",
      },
      {
        criterion: "Mobile-first queries",
        points: 25,
        description:
          "The base layout is one column. Two min-width queries add a wider layout, and the wider breakpoint is written so it can win on a large viewport.",
      },
      {
        criterion: "Image, units, and three-width test",
        points: 20,
        description:
          "The viewport meta element is present, the image scales with max-width and height auto, rem or fr is used on purpose, and the note reports three widths.",
      },
    ],
    points: 100,
    instructorSolution: `/* learning/week-05/landing.css
   HTML outline: header > p.brand + nav; main > section.welcome (img + div) + section.features (three articles); footer.
   Viewport meta: width=device-width, initial-scale=1. Image alt text required. */
body {
  margin: 0;
  font-family: Georgia, serif;
  font-size: 1.125rem;
  line-height: 1.5;
  color: #1c1917;
  background: #f4f7f5;
}

header,
footer {
  padding: 1rem;
  background: #16324f;
  color: #ffffff;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

nav a {
  color: #ffffff;
}

main {
  max-width: 60rem;
  margin: 0 auto;
  padding: 1rem;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

.welcome,
.features {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.feature {
  padding: 1rem;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
}

@media (min-width: 40rem) {
  .welcome {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }

  .features {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 60rem) {
  .features {
    grid-template-columns: 1fr 1fr 1fr;
  }
}`,
  },
  quiz: {
    slug: "week-05-quiz",
    title: "Week 5 quiz: layout and responsive design",
    passingScore: 70,
    allowRetakes: true,
    questions: [
      {
        slug: "week-05-flex-container",
        type: "multiple_choice",
        prompt: "What does display: flex do to the element you set it on?",
        options: [
          { id: "a", text: "It changes that element's text colour and nothing else." },
          {
            id: "b",
            text: "It makes that element a flex container and lays out its direct children as flex items.",
          },
          {
            id: "c",
            text: "It makes every element on the page, including grandchildren, share one row.",
          },
          { id: "d", text: "It is a media query that runs only on phones." },
        ],
        correct: { optionId: "b" },
        explanation:
          "display: flex affects the element you set it on. Only the direct children become flex items. Grandchildren stay under their own parent. The property is not a colour, and it is not a media query.",
        points: 10,
      },
      {
        slug: "week-05-space-between",
        type: "multiple_choice",
        prompt:
          "A header has two children: a title and a nav. The header is a flex row with justify-content set to space-between. Where do the children sit when there is free space?",
        options: [
          { id: "a", text: "Both sit in the centre of the header, touching each other." },
          {
            id: "b",
            text: "The title sits at the start, the nav sits at the end, and the free space sits between them.",
          },
          { id: "c", text: "They stack vertically, because space-between always creates a column." },
          { id: "d", text: "They wrap onto many lines, because space-between turns wrapping on." },
        ],
        correct: { optionId: "b" },
        explanation:
          "space-between uses free space on the main axis. In a row, the first item stays at the start and the last item stays at the end. It does not change flex-direction, and it does not turn wrapping on. Wrapping is flex-wrap.",
        points: 10,
      },
      {
        slug: "week-05-gap-outer",
        type: "true_false",
        prompt:
          "The gap property adds space between flex or grid items, and it also adds that same space outside the group, before the first item and after the last item.",
        correct: { value: false },
        explanation:
          "Gap is only the space between items. It does not pad the outer edge of the container. If you want air between the group and the edge of the page, set padding on the container. That is why gap is easier to predict than a margin on every item.",
        points: 10,
      },
      {
        slug: "week-05-column-axis",
        type: "true_false",
        prompt:
          "When flex-direction is column, justify-content moves items up and down, because the main axis follows the direction.",
        correct: { value: true },
        explanation:
          "justify-content always follows the main axis, and flex-direction decides that axis. In a column, the main axis runs from top to bottom. align-items then works across the column. The names do not mean horizontal and vertical forever.",
        points: 10,
      },
      {
        slug: "week-05-read-column-center",
        type: "code_reading",
        prompt: "The menu has several links. Which sentence matches this CSS?",
        codeSnippet: `.menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
}`,
        options: [
          { id: "a", text: "The links sit in a horizontal row and the group is centred across the page." },
          {
            id: "b",
            text: "The links stack from top to bottom, the stack is centred on the vertical main axis, and each link sits at the start of the cross axis.",
          },
          { id: "c", text: "The links wrap onto new rows because gap turns wrapping on." },
          { id: "d", text: "The links are removed from the page because column layout hides them." },
        ],
        correct: { optionId: "b" },
        explanation:
          "flex-direction: column stacks the links. justify-content: center places that stack on the main axis, which is vertical. align-items: flex-start places each link at the start of the cross axis. gap adds 8 pixels between links. It does not wrap them and it does not hide them.",
        points: 10,
      },
      {
        slug: "week-05-read-media-query",
        type: "code_reading",
        prompt: "The browser window is 30rem wide. How many columns does .features use?",
        codeSnippet: `.features {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 40rem) {
  .features {
    grid-template-columns: 1fr 1fr;
  }
}`,
        options: [
          { id: "a", text: "Two columns, because the media query is present in the file." },
          {
            id: "b",
            text: "One column, because 30rem is narrower than 40rem, so the query does not apply.",
          },
          { id: "c", text: "Zero columns, because 1fr only works inside a media query." },
          { id: "d", text: "As many columns as there are children, at every window size." },
        ],
        correct: { optionId: "b" },
        explanation:
          "The rule outside the query sets one column. The query uses min-width, so it applies only when the window is at least 40rem wide. A 30rem window keeps the base rule. Writing a query in the file does not turn it on. The viewport has to match.",
        points: 10,
      },
      {
        slug: "week-05-mobile-first",
        type: "multiple_choice",
        prompt: "Which choice matches the mobile-first approach taught in this week?",
        options: [
          {
            id: "a",
            text: "Write the wide layout as the default, then use a max-width query to repair the phone.",
          },
          { id: "b", text: "Write a separate HTML file for each screen size." },
          {
            id: "c",
            text: "Write the narrow layout as the default, then use min-width queries to add columns when there is room.",
          },
          { id: "d", text: "Avoid media queries and ask the reader to zoom with their fingers." },
        ],
        correct: { optionId: "c" },
        explanation:
          "Mobile-first means the base CSS is the small-screen layout. Min-width queries add changes when the window is wide enough. The page still makes sense if a query does not run. A separate HTML file for each screen is hard to keep in step, and zoom is not a layout plan.",
        points: 10,
      },
      {
        slug: "week-05-responsive-image",
        type: "multiple_choice",
        prompt:
          "A photo is 2000 pixels wide and makes the page scroll sideways on a phone. Which CSS pair is the fix taught this week?",
        options: [
          { id: "a", text: "max-width: 100%; height: auto;" },
          { id: "b", text: "width: 2000px; height: 2000px;" },
          { id: "c", text: "display: flex on the image, with no size rule." },
          { id: "d", text: "justify-content: space-between on the image." },
        ],
        correct: { optionId: "a" },
        explanation:
          "max-width: 100% stops the image from growing wider than its parent. height: auto keeps the picture's proportions. A fixed 2000 pixel size is the problem, not the cure. Flex alignment on the image does not limit its natural width.",
        points: 10,
      },
      {
        slug: "w5-q9-widths",
        type: "multiple_choice",
        prompt: "Why test a responsive page at phone, tablet, and wide widths instead of only your own screen?",
        options: [
          { id: "a", text: "Because browsers only render three widths" },
          { id: "b", text: "Because a layout can look fine at one width and fail at another" },
          { id: "c", text: "Because CSS ignores media queries on your laptop" },
          { id: "d", text: "Because images never resize unless you test three times" },
        ],
        correct: { optionId: "b" },
        explanation:
          "Your own window is one sample. A wrap rule, a media query, and an image limit can each succeed at one width and fail at another. Three widths catch a missing viewport meta element, a query that never runs, and a row that refuses to wrap.",
        points: 10,
      },
    ],
  },
};
