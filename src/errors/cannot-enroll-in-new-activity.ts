import { ApplicationError } from '@/protocols';

export function cannotEnrollInNewActivity(): ApplicationError {
  return {
    name: 'CannotEnrollInNewActivity',
    message: 'User is already enrolled in an activity at this time!',
  };
}
