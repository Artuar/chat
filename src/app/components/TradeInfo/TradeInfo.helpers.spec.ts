import { getTimeDiff } from "./TradeInfo.helpers";

describe("TradeInfo helper", () => {
  describe("getTimeDiff", () => {
    it("should count minutes", () => {
      const now = new Date();
      now.setMinutes(new Date().getMinutes() - 2);
      const twoMinutesAgo = now.getTime();

      const result = getTimeDiff(twoMinutesAgo);
      expect(result).toStrictEqual("2 minutes ago");
    });

    it("should count hours", () => {
      const now = new Date();
      now.setHours(new Date().getHours() - 2);
      const twoHoursAgo = now.getTime();

      const result = getTimeDiff(twoHoursAgo);
      expect(result).toStrictEqual("2 hours ago");
    });

    it("should count days", () => {
      const now = new Date();
      now.setDate(new Date().getDate() - 2);
      const twoDaysAgo = now.getTime();

      const result = getTimeDiff(twoDaysAgo);
      expect(result).toStrictEqual("2 days ago");
    });
  });
});
