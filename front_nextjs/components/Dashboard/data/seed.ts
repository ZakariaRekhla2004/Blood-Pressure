// import fs from "fs"
// import path from "path"
// import { faker } from "@faker-js/faker"
// import { labels, priorities, statuses } from "./data"

// const tasks = Array.from({ length: 100 }, () => ({
  
//   // title: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
//   name: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
//   email: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
//   age: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
//   status: faker.helpers.arrayElement(statuses).value,
//   // label: faker.helpers.arrayElement(labels).value,
//   priority: faker.helpers.arrayElement(priorities).value,
// }))

// fs.writeFileSync(
//   path.join(__dirname, "tasks.json"),
//   JSON.stringify(tasks, null, 2)
// )

// console.log("✅ Tasks data generated.")