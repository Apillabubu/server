import { f, m, q, r, s, t, u, v, x } from "../../z"

type A = {
  p: string
  v: string
  e: string
  j: string
  l: number
  g: string
  t: number
}

export const runtime = "nodejs"

export async function POST(a: Request) {
  let b: any

  try {
    b = await a.json()
  } catch {
    return m({ ok: false, m: "bad" }, 400)
  }

  if (!q(b) || typeof b.u !== "string") {
    return m({ ok: false, m: "bad" }, 400)
  }

  if (!(await s(`h:${b.p}`, 80, 60))) {
    return m({ ok: false, m: "rate" }, 429)
  }

  const c = r(b)
  if (c) {
    return m({ ok: false, m: c }, c === "conf" ? 500 : 400)
  }

  if (!(await t(String(b.p), String(b.n)))) {
    return m({ ok: false, m: "replay" }, 400)
  }

  const d = await v<A>(`u:${b.u}`)
  if (!d) {
    return m({ ok: false, m: "sess" }, 401)
  }

  if (!x(b, d)) {
    return m({ ok: false, m: "ctx" }, 401)
  }

  await u(`u:${b.u}`, {
    p: String(b.p),
    v: String(b.v),
    e: String(b.e),
    j: String(b.j),
    l: Number(b.l),
    g: String(b.g),
    t: Date.now(),
  })

  return m({
    ok: true,
    h: f,
  })
}
