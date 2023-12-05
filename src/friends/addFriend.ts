import type { AuthorizationPayload } from "../models";
import { getProfileFromUserName } from "../user/getProfileFromUserName";
import { call } from "../utils/call";
import { FRIEND_BASE_URL } from "./FRIEND_BASE_URL";

export const addFriend = async (
  authorization: AuthorizationPayload,
  username: string
) => {
  const userProfile = await getProfileFromUserName(authorization, "me");

  const url = `${FRIEND_BASE_URL}/v1/users/${userProfile.profile.onlineId}/friendList/${username}`;

  const response = await call(
    { url: url.toString(), method: "PUT" },
    authorization
  );

  const errorMessage = (response as any)?.error;

  if (
    (response as any)?.error &&
    (errorMessage?.message === "Already friend" ||
      errorMessage?.message === "Friend request not found")
  ) {
    throw new Error((response as any)?.error?.message ?? "Unexpected Error");
  }

  return { message: "Added " + username };
};