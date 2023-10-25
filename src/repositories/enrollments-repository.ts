import { Enrollment, Address } from '@prisma/client';
import { prisma } from '@/config';

async function findWithAddressByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Address: true,
    },
  });
}

async function upsertEnrollmentAndAddress(
  userId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
  createdAddress: CreateAddressParams,
  updatedAddress: UpdateAddressParams
) {

  const enrollmentQuery = prisma.enrollment.upsert({
    where: {
      userId,
    },
    create: createdEnrollment,
    update: updatedEnrollment,
  });

  const addressQuery = prisma.address.upsert({
    where: {
      enrollmentId: (await enrollmentQuery).id,
    },
    create: {
      ...createdAddress,
      enrollmentId: (await enrollmentQuery).id,
    },
    update: {
      ...updatedAddress,
      enrollmentId: (await enrollmentQuery).id,
    },
  });

  await prisma.$transaction([enrollmentQuery, addressQuery]);
}

export type CreateEnrollmentParams = Omit<Enrollment, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEnrollmentParams = Omit<CreateEnrollmentParams, 'userId'>;
export type CreateAddressParams = Omit<Address, 'id' | 'createdAt' | 'updatedAt' | 'enrollmentId'>;
export type UpdateAddressParams = CreateAddressParams;

export const enrollmentRepository = {
  findWithAddressByUserId,
  upsertEnrollmentAndAddress
};

/* async function upsert(
  userId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
) {
  const transactionResult = await prisma.$transaction(async (prisma) => {
    const enrollment = await prisma.enrollment.upsert({
      where: {
        userId,
      },
      create: createdEnrollment,
      update: updatedEnrollment,
    });

    const address = await prisma.address.upsert({
      where: {
        enrollmentId: enrollment.id,
      },
      create: {
        ...createdEnrollment.Address,
        enrollmentId: enrollment.id,
      },
      update: {
        ...updatedEnrollment.Address,
        enrollmentId: enrollment.id,
      },
    });

    return { enrollment, address };
  });

  return transactionResult;
} */