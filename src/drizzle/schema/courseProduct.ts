import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { CourseTable } from "./course";
import { createdAt, updatedAt } from "../schemaHelper";
import { relations } from "drizzle-orm";
import { ProductTable } from "./product";

export const CourseProductTable = pgTable("course_products", {
    courseId : uuid().notNull().references(() => CourseTable.id,{onDelete: "restrict"}),
    productId : uuid().notNull().references(() => CourseTable.id,{onDelete: "cascade"}),
    createdAt,
    updatedAt
},
t=> [primaryKey({columns: [t.courseId, t.productId]})]
)

export const CourseProductRelationShips = relations(CourseProductTable,({one  })=>({
    course: one(CourseTable,{
        fields: [CourseProductTable.courseId],
        references: [CourseTable.id]
    }),
    product: one(ProductTable,{
        fields: [CourseProductTable.productId],
        references: [ProductTable.id]
    })
    
}))