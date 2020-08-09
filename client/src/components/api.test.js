import { Works } from "./works";
import fetchMock from "fetch-mock";

fetchMock.enableMocks();

//check if api is running
it("Tests whether api is working correctly", async () => {
  const result = await Works();
  expect(result).toEqual(1);
});
