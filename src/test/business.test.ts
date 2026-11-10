import { describe, expect, it } from "vitest";
import { business } from "@/lib/business";

describe("Business details", () => {
  it("uses the owner's contact email", () => {
    expect(business.email).toBe("contact@saumonerie-jarcy.fr");
  });
  it("announces delivery within 72 hours", () => {
    expect(business.deliveryHours).toBe(72);
  });
});