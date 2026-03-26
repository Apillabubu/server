import { f, m, o, q, r, s, t, u } from "../../z"

export const runtime = "nodejs"

export async function POST(a: Request) {
  let b: any

  try {
    b = await a.json()
  } catch {
    return m({ ok: false, m: "bad" }, 400)
  }

  if (!q(b)) {
    return m({ ok: false, m: "bad" }, 400)
  }

  if (!(await s(`i:${b.p}`, 40, 60))) {
    return m({ ok: false, m: "rate" }, 429)
  }

  const c = r(b)
  if (c) {
    return m({ ok: false, m: c }, c === "conf" ? 500 : 400)
  }

  if (!(await t(String(b.p), String(b.n)))) {
    return m({ ok: false, m: "replay" }, 400)
  }

  const d = o()
  const e = o()

  await u(`i:${d}`, {
    p: String(b.p),
    v: String(b.v),
    e: String(b.e),
    j: String(b.j),
    l: Number(b.l),
    g: String(b.g),
    c: e,
    t: Date.now(),
  }, 60)

  return m({
    ok: true,
    a: d,
    c: e,
    h: f,
  })
}
