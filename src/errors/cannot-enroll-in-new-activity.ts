import { ApplicationError } from '@/protocols';

export function cannotEnrollInNewActivity(): ApplicationError {
  return {
    name: 'CannotEnrollInNewActivity',
    message: 'Você já está inscrito em outra atividade no mesmo horário.',
  };
}
