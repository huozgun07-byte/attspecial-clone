import { test } from "node:test";
import assert from "node:assert/strict";
import { wizardCopyEn, wizardCopyEs, contactQuestion } from "../src/lib/wizard-copy.ts";

test("timeline wins over customerType", () => {
  const q = contactQuestion(wizardCopyEn, { timeline: "asap", customerType: "existing" });
  assert.equal(q, wizardCopyEn.contact.personalized.timeline.asap);
});

test("falls back to customerType, then default", () => {
  assert.equal(
    contactQuestion(wizardCopyEn, { timeline: "researching", customerType: "existing" }),
    wizardCopyEn.contact.personalized.customerType.existing
  );
  assert.equal(
    contactQuestion(wizardCopyEn, { timeline: "", customerType: "" }),
    wizardCopyEn.contact.question
  );
});

test("no copy claims availability at the address", () => {
  for (const copy of [wizardCopyEn, wizardCopyEs]) {
    const text = JSON.stringify(copy, (_k, v) => (typeof v === "function" ? v("30301", "$50") : v)).toLowerCase();
    assert.doesNotMatch(text, /b(is|are)( now)? available at your address|est[aá] disponible en tu direcci/);
  }
});
