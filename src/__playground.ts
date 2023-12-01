/* eslint-disable unicorn/prefer-top-level-await */

/**
 * PLEASE ONLY COMMIT CHANGES TO THIS FILE IF YOU WANT THEM
 * TO DIRECTLY IMPACT EVERY DEV WORKING ON THE PROJECT.
 *
 * Use this file to test and experiment with changes to the project.
 * If changes to this file land in a PR, you probably did something wrong.
 */

// ---

/**
 * "./index" is the library's single public-facing export.
 * In other words, if you're not able to import what you want
 * to use from "./index", no one who uses the package will be
 * able to either.
 */
import {
  exchangeCodeForAccessToken,
  exchangeNpssoForCode,
  getFriendsList,
  getProfileFromAccountId,
  getRecentlyPlayedGames,
  getUserTitles,
  makeUniversalSearch
} from "./index";

// MODIFY THIS VALUE.
const myNpsso =
  "kFAjlFcpsDahmu9psgzOGsbKqdQXE7IPHI3tcp8aRdidS8QxjMeFDSfOVP1cqmiX";

async function main() {
  console.log("🚀  psn-api playground is running.\n");

  // --- Start testing stuff here ---

  if (myNpsso === "myNpsso") {
    console.error(
      "⛔️  ERROR: In __playground.ts, modify the myNpsso variable to match your PSN NPSSO.\n"
    );
  }

  const accessCode = await exchangeNpssoForCode(myNpsso);
  const authorization = await exchangeCodeForAccessToken(accessCode);

  const friends = await getFriendsList({
    accessToken: authorization.accessToken
  });
}

main();
