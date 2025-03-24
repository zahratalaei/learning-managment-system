import { pgEnum, pgTable, text } from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt } from "../schemaHelper";
import { timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { UserCourseAccessesTable } from "./userCourseAccess";

export const userRoles = ["admin", "user"] as const
export type UserRole = (typeof userRoles)[number] 
export const userRoleEnum = pgEnum("user_role", userRoles)

export const UserTable = pgTable("users", {
    id: id,
    clerkUserId: text().notNull().unique(),
    email: text().notNull(),
    name: text().notNull(),
    role: userRoleEnum().notNull().default("user"),
    imageUrl : text(),
    deletedAt: timestamp({withTimezone: true}),
    createdAt: createdAt,
    updatedAt: updatedAt,
});

export const UserRelationShips = relations(UserTable,({many})=>({
    userCourseAccesses : many(UserCourseAccessesTable)

}))