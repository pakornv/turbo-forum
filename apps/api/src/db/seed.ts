import { db } from "./drizzle";
import { communities } from "./schema/communities";
import { users } from "./schema/users";

async function seed() {
  await db.insert(users).values([
    {
      id: "yadUwiWdUK96K4XW6l0zi",
      name: "John Doe",
      username: "johndoe",
      picture:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: "EdF7VCzM3vJKBfxPe5MyR",
      name: "Jane Doe",
      username: "janedoe",
      picture:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ]);

  console.log("Initial users created.");

  await db.insert(communities).values([
    { id: "MTjQbh7BF0MKQogLUMNLF", name: "History" },
    { id: "_Xbjex1Kf3MS6ddx10La9", name: "Food" },
    { id: "4RZKsm9fmbT6RWB7jjP79", name: "Pets" },
    { id: "ckExtdPUOXToZwX0gzC6X", name: "Health" },
    { id: "Fi3Q4nQbms08QGZCoqKu2", name: "Fashion" },
    { id: "9-ywHVWi7hGvmY4z6jkTB", name: "Exercise" },
    { id: "GBZ3z1WN149oyg4r-Zu-M", name: "Others" },
  ]);

  console.log("Initial communities created.");
}

seed()
  .catch((error) => {
    console.error("Seed process failed:", error);
    process.exit(1);
  })
  .finally(() => {
    console.log("Seed process finished. Exiting...");
    process.exit(0);
  });
