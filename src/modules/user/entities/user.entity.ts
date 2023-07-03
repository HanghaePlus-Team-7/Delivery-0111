export class UserEntity {
  id: bigint; // uuid
  email: string;
  password: string;
  nickname: string;
  phone: string; // 하이픈 없이 11자리
  address: string;

  constructor(params: Partial<UserEntity>) {
    Object.assign(this, params);
  }

  static forCreateUser() {
    return new UserEntity({ email: "", password: "", nickname: "", phone: "", address: "" });
  }
  static forGetAllUsers() {
    return new UserEntity({});
  }
}
