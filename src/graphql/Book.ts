import { extendType, nonNull, objectType, stringArg } from "nexus";   
import { NexusGenObjects } from "../../nexus-typegen";  

export const Book = objectType({
    name: "Book",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("title");
        t.nonNull.string("author");
        t.string("translator");
        t.list.field("users", {    // 1
            type: "User",
            resolve(parent, args, context) {   // 2
                return context.prisma.book  // 3
                    .findUnique({ where: { id: parent.id } })
                    .users();
            },
        }); 
    },
});



export const BookMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("newBook", {
            type: "Book",
            args: {
                title: nonNull(stringArg()),
                author: nonNull(stringArg()),
                translator: stringArg(),
            },
            resolve(parent, args, context) {   
                const { title, author,translator } = args;
                const { userId } = context;

                if (!userId) {  // 1
                    throw new Error("Cannot post without logging in.");
                }

                const newBook = context.prisma.book.create({
                    data: {
                        title,
                        author,
                        translator,
                        users: { connect: { id: userId } },  // 2
                    },
                });

                return newBook;
            },
        });
    },
});