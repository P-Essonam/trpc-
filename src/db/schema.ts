import { pgTable, serial, varchar } from "drizzle-orm/pg-core"

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull().unique(),
});
