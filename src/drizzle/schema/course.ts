import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";

export const CourseTable = pgTable("courses", {
    id: id,
    name: text().notNull(),
    description: text().notNull(),
    createdAt: createdAt,
    updatedAt: updatedAt,
});

export const CourseRelationShips = relations(CourseTable,({one , many })=>({
    test: one()
}))