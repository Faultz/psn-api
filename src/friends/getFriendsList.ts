import type { AuthorizationPayload, UserFriendsResponse } from "../models";
import { getProfileFromUserName } from "../user/getProfileFromUserName";
import { call } from "../utils/call";
import { FRIEND_BASE_URL } from "./FRIEND_BASE_URL";

export const getFriendsList = async (
  authorization: AuthorizationPayload
): Promise<UserFriendsResponse> => {
  const userProfile = await getProfileFromUserName(authorization, "me");

  const url = `${FRIEND_BASE_URL}/v1/users/${userProfile.profile.onlineId}/friends/profiles2?fields=npId,onlineId,accountId,avatarUrls,plus,aboutMe,languagesUsed,trophySummary(@default,level,progress,earnedTrophies),isOfficiallyVerified,personalDetail(@default,profilePictureUrls),personalDetailSharing,personalDetailSharingRequestMessageFlag,primaryOnlineStatus,presences(@default,@titleInfo,platform,lastOnlineDate,hasBroadcastData),requestMessageFlag,blocking,friendRelation,following,consoleAvailability`;

  const response = await call<UserFriendsResponse>({ url }, authorization);

  if ((response as any)?.error) {
    throw new Error((response as any)?.error?.message ?? "Unexpected Error");
  }

  return response;
};
