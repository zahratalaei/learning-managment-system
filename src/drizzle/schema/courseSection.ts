import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt } from "../schemaHelper";
import { CourseTable } from "./course";
import { relations } from "drizzle-orm";

export const courseSectionStatuses = ["public", "private"] as const
export type CourseSectionStatus = (typeof courseSectionStatuses)[number]
export const courseSectionStatusEnum = pgEnum("course_section_status", courseSectionStatuses)

export const CourseSectionTable = pgTable("course-sections", {
    id: id,
    name: text().notNull(),
    courseId: uuid().notNull().references(() => CourseTable.id,{onDelete: "cascade"}),
    description: text().notNull(),
    status: courseSectionStatusEnum().notNull().default("private"),
    createdAt: createdAt,
    updatedAt: updatedAt,
});

export const CourseSectionRelationShips = relations(CourseSectionTable,({ one })=>({
    course: one(CourseTable,{
        fields: [CourseSectionTable.courseId],
        references: [CourseTable.id]
    })
    
}))