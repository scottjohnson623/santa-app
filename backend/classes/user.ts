export class User {
  id: string;
  username: string;
  address: string;
  birthday: Date;

  constructor(
    id: string,
    username: string,
    address: string,
    birthday: Date | string
  ) {
    this.id = id;
    this.username = username;
    this.address = address;
    this.birthday = new Date(birthday);
  }

  public getAge(): number {
    var ageDifInMs = Date.now() - this.birthday.getTime();
    var ageDate = new Date(ageDifInMs);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
