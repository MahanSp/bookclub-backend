import { extendType, nonNull, objectType, stringArg } from "nexus";   
import { NexusGenObjects } from "../../nexus-typegen";  

export const User = objectType({
    name: "User", // 1 
    definition(t) {  // 2
        t.nonNull.int("id"); // 3 
        t.nonNull.string("firstname"); // 4
        t.nonNull.string("lastname"); // 5
        t.nonNull.string("password");
        t.nonNull.string("email");
        t.string("phonenumber");
        t.string("birthday");
        t.string("country");
        t.string("city");
        t.list.field("invitation", {    // 1
            type: "Invite",
            resolve(parent, args, context) {   // 2
                return context.prisma.user  // 3
                    .findUnique({ where: { id: parent.id } })
                    .invitation();
            },
    });
    t.list.field("books", {    // 1
        type: "Book",
        resolve(parent, args, context) {   // 2
            return context.prisma.user  // 3
                .findUnique({ where: { id: parent.id } })
                .books();
        },
});
    }
});



