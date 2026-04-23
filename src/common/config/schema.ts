import { integer, pgTable, varchar, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 200 }).notNull(),
  email: varchar({ length: 322 }).notNull().unique(),
  accessToken: varchar('access_token', { length: 322 }),

  provider: varchar({ length: 50 }).notNull(),
  providerUserId: varchar("provider_user_id", { length: 255 }).notNull(),

  createdAt: timestamp("created_at", {withTimezone: true}).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", {withTimezone: true})
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
}, (pgTable) => [
    uniqueIndex('provider_user_idx').on(pgTable.provider, pgTable.providerUserId)
])
