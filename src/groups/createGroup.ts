import type { AuthorizationPayload } from "../models";
import { buildRequestUrl } from "../utils/buildRequestUrl";
import { GROUP_BASE_URL } from "./GROUP_BASE_URL";

export const createGroup = async (
  authorization: AuthorizationPayload,
  users: string[]
) => {
  const url = buildRequestUrl(GROUP_BASE_URL, "/groups");

  interface Invitee {
    accountId: string;
  }

  const inviteesList: Invitee[] = [];
  users.map((user) => {
    inviteesList.push({ accountId: user });
  });

  console.log("list");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authorization.accessToken,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      invitees: inviteesList
    })
  });

  return await response.json();
};
