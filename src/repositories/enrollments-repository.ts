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

/* async function upsert(
  userId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
) {
  return prisma.enrollment.upsert({
    where: {
      userId,
    },
    create: createdEnrollment,
    update: updatedEnrollment,
  });
} */

async function upsertEnrollmentAndAddress(
  userId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
  createdAddress: CreateAddressParams,
  updatedAddress: UpdateAddressParams
) {
  return prisma.$transaction(async (prisma) => {
    const enrollment = await prisma.enrollment.upsert({
      where: {
        userId,
      },
      create: createdEnrollment,
      update: updatedEnrollment,
    });

    await prisma.address.upsert({
      where: {
        enrollmentId: enrollment.id,
      },
      create: {
        ...createdAddress,
        Enrollment: { connect: { id: enrollment.id } },
      },
      update: updatedAddress,
    });
  });
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