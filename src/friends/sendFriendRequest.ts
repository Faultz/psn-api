import type { AuthorizationPayload } from "../models";
import { getProfileFromUserName } from "../user";
import { call } from "../utils/call";
import { FRIEND_BASE_URL } from "./FRIEND_BASE_URL";

export const sendFriendRequest = async (
  authorization: AuthorizationPayload,
  username: string
) => {
  const userProfile = await getProfileFromUserName(authorization, "me");

  const url = `${FRIEND_BASE_URL}/v1/users/${userProfile.profile.onlineId}/friendList/${username}`;

  console.log(url);

  const response = await call(
    { url: url.toString(), method: "POST" },
    authorization,
    {
      ["requestMessage"]: "if you read this you're gay"
    }
  );

  const error = (response as any)?.error;
  if (error?.message == "Already friend-requested") {
    return { message: "Request already sent to " + username };
  }

  return { message: "Request sent to " + username };
};
