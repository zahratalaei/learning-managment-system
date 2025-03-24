import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { UserTable } from "./user";
import { CourseTable } from "./course";
import { createdAt, updatedAt } from "../schemaHelper";
import { relations } from "drizzle-orm";

export const UserCourseAccessesTable = pgTable("user_course_accesses", {
    userId: uuid().notNull().references(() => UserTable.id,{onDelete: "cascade"}),
    courseId: uuid().notNull().references(() => CourseTable.id,{onDelete: "cascade"}),
    createdAt,
    updatedAt
},
t=> [primaryKey({columns: [t.userId, t.courseId]})]
)

export const UserCourseAccessesRelationShips = relations(UserCourseAccessesTable,({one  })=>({
    user: one(UserTable,{
        fields: [UserCourseAccessesTable.userId],
        references: [UserTable.id]
    }),
    course: one(CourseTable,{
        fields: [UserCourseAccessesTable.courseId],
        references: [CourseTable.id]
    })
}))