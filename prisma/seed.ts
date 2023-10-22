import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driven.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });

    let ticketType = await prisma.ticketType.findMany();
    if (ticketType.length === 0) {
      await prisma.ticketType.createMany({
        data: [
          {
            name: 'Online',
            price: 100,
            isRemote: true,
            includesHotel: false,
          },
          {
            name: 'Presencial',
            price: 250,
            isRemote: false,
            includesHotel: false,
          },
          {
            name: 'Presencial+Hotel',
            price: 600,
            isRemote: false,
            includesHotel: true,
          },
        ],
      });
    }
  }

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
