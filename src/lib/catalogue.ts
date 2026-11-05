export const programme = {
  slug: "full-stack-beginners",
  title: "Full-Stack Software Development for Beginners",
  description:
    "A 16-week, instructor-led introduction to computers, the web, and full-stack development. The programme is for absolute beginners and builds one idea at a time.",
  durationWeeks: 16,
};

export const months = [
  {
    label: "Month 1",
    title: "Computer fundamentals, HTML and CSS",
    weeks: [1, 2, 3, 4],
  },
  {
    label: "Month 2",
    title: "CSS layout, JavaScript and problem solving",
    weeks: [5, 6, 7, 8],
  },
  {
    label: "Month 3",
    title: "Web interactivity, Git and React",
    weeks: [9, 10, 11, 12],
  },
  {
    label: "Month 4",
    title: "Backend, databases and full-stack development",
    weeks: [13, 14, 15, 16],
  },
] as const;

export const weekCatalogue = [
  ["Computers and software development", "Learn what computers, software, websites, and developers actually are."],
  ["HTML fundamentals", "Create your first webpages with headings, text, links, images, and lists."],
  ["Forms and semantic HTML", "Collect information with forms and structure a page so people and browsers can follow it."],
  ["CSS fundamentals", "Change colours, type, spacing, and the box around every element."],
  ["Layout and responsive design", "Arrange pages with Flexbox and Grid, then make them work on small and large screens."],
  ["JavaScript fundamentals", "Write your first programmes: output, variables, data, and operators."],
  ["Conditions, loops, and functions", "Teach a programme how to make decisions, repeat work, and reuse steps."],
  ["Arrays, objects, and problem solving", "Group data and break a problem into small pieces you can test."],
  ["The DOM and events", "Make a webpage respond when someone clicks, types, or submits a form."],
  ["Git and GitHub", "Save versions of your work and publish a project repository."],
  ["TypeScript and React components", "Add types to JavaScript and build a page from reusable components."],
  ["React state, lists, and forms", "Remember information in a component and build an interactive task list."],
  ["Backend and Node.js", "Run JavaScript outside the browser and start a small server."],
  ["REST APIs and integration", "Let a React page talk to a server using clear requests and responses."],
  ["PostgreSQL and SQL", "Store information in tables and read it back with SQL."],
  ["Full-stack project and review", "Build a guided task manager and review how the pieces fit together."],
] as const;
