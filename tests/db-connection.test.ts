import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { connectionNeedsSsl } from "../scripts/env";

describe("connectionNeedsSsl", () => {
  it("skips SSL for localhost", () => {
    assert.equal(connectionNeedsSsl("postgresql://marie_app:x@localhost:5432/marie_learning"), false);
    assert.equal(connectionNeedsSsl("postgresql://marie_app:x@127.0.0.1:5432/marie_learning"), false);
  });

  it("requires SSL for Supabase hosts", () => {
    assert.equal(
      connectionNeedsSsl("postgresql://postgres:x@db.abcd.supabase.co:5432/postgres"),
      true,
    );
    assert.equal(
      connectionNeedsSsl(
        "postgresql://marie_app.ref:x@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?sslmode=require",
      ),
      true,
    );
  });

  it("honours sslmode=require on any host", () => {
    assert.equal(
      connectionNeedsSsl("postgresql://postgres:x@localhost:5432/postgres?sslmode=require"),
      true,
    );
  });
});
