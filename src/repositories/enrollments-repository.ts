import { Enrollment } from '@prisma/client';
import { prisma } from '@/config';

async function findWithAddressByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Address: true,
    },
  });
}

async function upsert(
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
}

export type CreateEnrollmentParams = Omit<Enrollment, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEnrollmentParams = Omit<CreateEnrollmentParams, 'userId'>;

export const enrollmentRepository = {
  findWithAddressByUserId,
  upsert,
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