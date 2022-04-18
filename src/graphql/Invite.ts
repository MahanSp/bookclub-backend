import { extendType, nonNull, objectType, stringArg } from "nexus";   
import { NexusGenObjects } from "../../nexus-typegen";  

export const Invite = objectType({
    name: "Invite",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("email");
        t.field("inviter", {    // 1
            type: "User",
            resolve(parent, args, context) {   // 2
                return context.prisma.invite  // 3
                    .findUnique({ where: { id: parent.id } })
                    .inviter();
            },
        }); 
    },
});
export const InviteQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("inviteSearch", {
            type: "Invite",
            resolve(parent, args, context) {  
                return context.prisma.invite.findMany();  // 1
            },
        });
    },
});

export const InviteMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("newInvite", {
            type: "Invite",
            args: {
                email: nonNull(stringArg()),
            },
            resolve(parent, args, context) {   
                const { email } = args;
                const { userId } = context;

                if (!userId) {  // 1
                    throw new Error("Cannot post without logging in.");
                }

                const newInvite = context.prisma.invite.create({
                    data: {
                        email,
                        inviter: { connect: { id: userId } },  // 2
                    },
                });

                return newInvite;
            },
        });
    },
});