// 1
import { PrismaClient } from "@prisma/client";

// 2
const prisma = new PrismaClient();

// 3
async function main() {
    const newUser = await prisma.user.create({
        data: {
          firstname: 'Fullstack tutorial for GraphQL',
          lastname: 'www.howtographql.com',
          email:"asd@asd",
          password:"1234",
          birthday:"",
          country:"",
          city:"",
          phonenumber:""
        },
      })

    await prisma.$connect()
    const allUsers = await prisma.user.findMany();
    console.log(allUsers);
}

// 4
main()
    .catch((e) => {
        throw e;
    })
    // 5
    .finally(async () => {
        await prisma.$disconnect();
    });