import { UUID } from '@common/types';

export interface AdminInterface {
  id: UUID;
  username: string;
  password: string;
}
