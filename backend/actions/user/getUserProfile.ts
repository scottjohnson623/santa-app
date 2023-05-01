import axios from "axios";

interface UserProfile {
  userUid: string;
  address: string;
  birthdate: string;
}

export class GetUserProfile {
  _id: string;

  constructor(id: string) {
    this._id = id;
  }

  static makeWithId(id: string): GetUserProfile {
    return new GetUserProfile(id);
  }

  async execute(): Promise<UserProfile | null> {
    const allUsers = await (
      await axios.get(
        "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json"
      )
    ).data;

    return allUsers.find((user) => user.userUid === this._id);
  }
}
