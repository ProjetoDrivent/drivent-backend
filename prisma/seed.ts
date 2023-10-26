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
  }

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

  let hotel = await prisma.hotel.findFirst();
  if (!hotel) {
    hotel = await prisma.hotel.create({
      data: {
        name: 'Driven Hotel',
        image:
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/94/9c/ec/grand-hyatt-baha-mar.jpg?w=1200&h=-1&s=1',
      },
    });
  }

  let room = await prisma.room.findMany();
  if (room.length === 0) {
    await prisma.room.createMany({
      data: [
        {
          name: 'Quarto 001',
          capacity: 2,
          hotelId: 1,
        },
        {
          name: 'Quarto 002',
          capacity: 2,
          hotelId: 1,
        },
        {
          name: 'Quarto 003',
          capacity: 2,
          hotelId: 1,
        },
        {
          name: 'Quarto 004',
          capacity: 2,
          hotelId: 1,
        },
        {
          name: 'Quarto 005',
          capacity: 2,
          hotelId: 1,
        },
        {
          name: 'Quarto 006',
          capacity: 2,
          hotelId: 1,
        },
        {
          name: 'Quarto 007',
          capacity: 2,
          hotelId: 1,
        },
        {
          name: 'Quarto 008',
          capacity: 2,
          hotelId: 1,
        },
        {
          name: 'Quarto 009',
          capacity: 2,
          hotelId: 1,
        },
        {
          name: 'Quarto 010',
          capacity: 2,
          hotelId: 1,
        },
        {
          name: 'Quarto 011',
          capacity: 3,
          hotelId: 1,
        },
        {
          name: 'Quarto 012',
          capacity: 3,
          hotelId: 1,
        },
        {
          name: 'Quarto 013',
          capacity: 3,
          hotelId: 1,
        },
        {
          name: 'Quarto 014',
          capacity: 3,
          hotelId: 1,
        },
        {
          name: 'Quarto 015',
          capacity: 3,
          hotelId: 1,
        },
        {
          name: 'Quarto 016',
          capacity: 3,
          hotelId: 1,
        },
        {
          name: 'Quarto 017',
          capacity: 3,
          hotelId: 1,
        },
        {
          name: 'Quarto 018',
          capacity: 3,
          hotelId: 1,
        },
        {
          name: 'Quarto 019',
          capacity: 3,
          hotelId: 1,
        },
        {
          name: 'Quarto 020',
          capacity: 3,
          hotelId: 1,
        },
      ],
    });
  }

  let days = await prisma.day.findMany();
  if (days.length === 0) {
    await prisma.day.createMany({
      data: [
        {
          eventId: 1,
          date: dayjs().toDate(),
        },
        {
          eventId: 1,
          date: dayjs().add(1, 'day').toDate(),
        },
        {
          eventId: 1,
          date: dayjs().add(2, 'day').toDate(),
        },
      ],
    });
  }

  let place = await prisma.place.findMany();
  if (place.length === 0) {
    await prisma.place.createMany({
      data: [
        {
          name: 'Auditório Principal',
        },
        {
          name: 'Auditório Lateral',
        },
        {
          name: 'Sala de Workshop',
        },
      ],
    });
  }

  let activity = await prisma.activity.findMany();
  if (activity.length === 0) {
    await prisma.activity.createMany({
      data: [
        //! Dia 1
        {
          eventName: 'Minecraft: montando o PC ideal',
          availableSlots: 30,
          startTime: dayjs().set('hour', 9).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 9).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          placeId: 1,
          dayId: 1,
        },
        {
          eventName: 'LoL: montando o PC ideal',
          availableSlots: 30,
          startTime: dayjs().set('hour', 10).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 10).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          placeId: 1,
          dayId: 1,
        },
        {
          eventName: 'Elden Ring: Matando a Malennia',
          availableSlots: 10,
          startTime: dayjs().set('hour', 11).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 11).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          placeId: 1,
          dayId: 1,
        },
        {
          eventName: 'Elden Ring: Matando a Malennia',
          availableSlots: 30,
          startTime: dayjs().set('hour', 9).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 9).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          placeId: 2,
          dayId: 1,
        },
        {
          eventName: 'Minecraft: montando o PC ideal',
          availableSlots: 30,
          startTime: dayjs().set('hour', 10).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 10).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          placeId: 2,
          dayId: 1,
        },
        {
          eventName: 'LoL: montando o PC ideal',
          availableSlots: 10,
          startTime: dayjs().set('hour', 11).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 11).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          placeId: 2,
          dayId: 1,
        },
        {
          eventName: 'LoL: montando o PC ideal',
          availableSlots: 30,
          startTime: dayjs().set('hour', 9).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 9).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          placeId: 3,
          dayId: 1,
        },
        {
          eventName: 'Elden Ring: Matando a Malennia',
          availableSlots: 30,
          startTime: dayjs().set('hour', 10).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 10).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          placeId: 3,
          dayId: 1,
        },
        {
          eventName: 'Minecraft: montando o PC ideal',
          availableSlots: 10,
          startTime: dayjs().set('hour', 11).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 11).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          dayId: 1,
          placeId: 3,
        },
        //! Dia 2
        {
          eventName: 'Minecraft: montando o PC ideal',
          availableSlots: 30,
          startTime: dayjs().set('hour', 9).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 9).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          placeId: 1,
          dayId: 2,
        },
        {
          eventName: 'LoL: montando o PC ideal',
          availableSlots: 30,
          startTime: dayjs().set('hour', 10).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 10).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          placeId: 1,
          dayId: 2,
        },
        {
          eventName: 'Elden Ring: Matando a Malennia',
          availableSlots: 10,
          startTime: dayjs().set('hour', 11).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 11).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          placeId: 1,
          dayId: 2,
        },
        {
          eventName: 'Elden Ring: Matando a Malennia',
          availableSlots: 30,
          startTime: dayjs().set('hour', 9).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 9).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          placeId: 2,
          dayId: 2,
        },
        {
          eventName: 'Minecraft: montando o PC ideal',
          availableSlots: 30,
          startTime: dayjs().set('hour', 10).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 10).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          placeId: 2,
          dayId: 2,
        },
        {
          eventName: 'LoL: montando o PC ideal',
          availableSlots: 10,
          startTime: dayjs().set('hour', 11).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 11).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          placeId: 2,
          dayId: 2,
        },
        {
          eventName: 'LoL: montando o PC ideal',
          availableSlots: 30,
          startTime: dayjs().set('hour', 9).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 9).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          placeId: 3,
          dayId: 2,
        },
        {
          eventName: 'Elden Ring: Matando a Malennia',
          availableSlots: 30,
          startTime: dayjs().set('hour', 10).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 10).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          placeId: 3,
          dayId: 2,
        },
        {
          eventName: 'Minecraft: montando o PC ideal',
          availableSlots: 10,
          startTime: dayjs().set('hour', 11).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 11).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          dayId: 2,
          placeId: 3,
        },
        //! Dia 3
        {
          eventName: 'Minecraft: montando o PC ideal',
          availableSlots: 30,
          startTime: dayjs().set('hour', 9).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 9).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          placeId: 1,
          dayId: 3,
        },
        {
          eventName: 'LoL: montando o PC ideal',
          availableSlots: 30,
          startTime: dayjs().set('hour', 10).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 10).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          placeId: 1,
          dayId: 3,
        },
        {
          eventName: 'Elden Ring: Matando a Malennia',
          availableSlots: 10,
          startTime: dayjs().set('hour', 11).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 11).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          placeId: 1,
          dayId: 3,
        },
        {
          eventName: 'Elden Ring: Matando a Malennia',
          availableSlots: 30,
          startTime: dayjs().set('hour', 9).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 9).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          placeId: 2,
          dayId: 3,
        },
        {
          eventName: 'Minecraft: montando o PC ideal',
          availableSlots: 30,
          startTime: dayjs().set('hour', 10).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 10).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          placeId: 2,
          dayId: 3,
        },
        {
          eventName: 'LoL: montando o PC ideal',
          availableSlots: 10,
          startTime: dayjs().set('hour', 11).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 11).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          placeId: 2,
          dayId: 3,
        },
        {
          eventName: 'LoL: montando o PC ideal',
          availableSlots: 30,
          startTime: dayjs().set('hour', 9).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 9).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          placeId: 3,
          dayId: 3,
        },
        {
          eventName: 'Elden Ring: Matando a Malennia',
          availableSlots: 30,
          startTime: dayjs().set('hour', 10).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 10).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          placeId: 3,
          dayId: 3,
        },
        {
          eventName: 'Minecraft: montando o PC ideal',
          availableSlots: 10,
          startTime: dayjs().set('hour', 11).set('minute', 0).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          endTime: dayjs().set('hour', 11).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.000') + 'Z',
          dayId: 3,
          placeId: 3,
        },
      ],
    });
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
