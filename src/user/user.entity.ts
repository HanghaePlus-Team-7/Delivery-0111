export class UserEntity {
  id: string; // uuid
  email: string;
  password: string;
  name: string;
  phone: string; // 하이픈 없이 11자리
  address: string;
  bookmark: boolean;
}
