import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt } from "../schemaHelper"
import { CourseSectionTable } from "./courseSection"
import { relations } from "drizzle-orm"
import { UserLessonCompleteTable } from "./userLessonComplete"

export const lessonStatuses = ["public", "private", "preview"] as const
export type LessonStatus = (typeof lessonStatuses)[number]
export const lessonStatusEnum = pgEnum("lesson_status", lessonStatuses)

export const LessonTable = pgTable("lessons", {
    id: id,
    name: text().notNull(),
    description: text().notNull(),
    youtubeVideoId: text().notNull(),
    status: lessonStatusEnum().notNull().default("private"),
    sectionId: uuid().notNull().references(() => CourseSectionTable.id,{onDelete: "cascade"}),
    createdAt: createdAt,
    updatedAt: updatedAt,
});

export const lessonRelationShips = relations(LessonTable,({one, many })=>({
    section: one(CourseSectionTable,{
        fields: [LessonTable.sectionId],
        references: [CourseSectionTable.id]
    }),
    userLessonsComplete: many(UserLessonCompleteTable)
}))
    
