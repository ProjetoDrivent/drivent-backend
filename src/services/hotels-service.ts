import { Room, TicketStatus } from '@prisma/client';
import { invalidDataError, notFoundError } from '@/errors';
import { cannotListHotelsError } from '@/errors/cannot-list-hotels-error';
import { bookingRepository, enrollmentRepository, hotelRepository, ticketsRepository } from '@/repositories';

async function validateUserBooking(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  const type = ticket.TicketType;

  if (ticket.status === TicketStatus.RESERVED || type.isRemote || !type.includesHotel) {
    throw cannotListHotelsError();
  }
}

async function getHotels(userId: number) {
  await validateUserBooking(userId);

  const hotels = await hotelRepository.findHotels();
  if (hotels.length === 0) throw notFoundError();

  return hotels;
}

async function getHotelsWithRooms(userId: number, hotelId: number) {
  await validateUserBooking(userId);

  if (!hotelId || isNaN(hotelId)) throw invalidDataError('hotelId');

  const hotelWithRooms = await hotelRepository.findRoomsByHotelId(hotelId);
  if (!hotelWithRooms) throw notFoundError();

  const withBookings: Array<Room & { bookings?: number }> = [...hotelWithRooms.Rooms];

  for (let i = 0; i < withBookings.length; i++) {
    const bookingsList = await bookingRepository.findByRoomId(withBookings[i].id);
    withBookings[i] = { ...withBookings[i], bookings: bookingsList.length };
  }

  return { ...hotelWithRooms, Rooms: withBookings };
}

export const hotelsService = {
  getHotels,
  getHotelsWithRooms,
};
