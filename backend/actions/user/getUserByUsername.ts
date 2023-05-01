import axios from "axios";
import { User } from "../../classes/user";
import { GetUserProfile } from "./getUserProfile";

export class GetUserByUsername {
  _userName: string;

  constructor(userName: string) {
    this._userName = userName;
  }

  static make(userName: string): GetUserByUsername {
    return new GetUserByUsername(userName);
  }

  async execute(): Promise<User | null> {
    const allUserIds = await axios.get(
      "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json"
    );
    const userId = allUserIds.data?.find(
      (user: any) => user.username === this._userName
    )?.uid;
    if (userId) {
      const userProfile = await GetUserProfile.makeWithId(userId).execute();

      if (userProfile) {
        return new User(
          userProfile.userUid,
          this._userName,
          userProfile.address,
          userProfile.birthdate
        );
      }
    }

    return null;
  }
}
