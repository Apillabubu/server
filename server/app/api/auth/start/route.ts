import { f, h, m, o, p, q, r, s, t, u, v, w, x } from "../../z"

type A = {
  p: string
  v: string
  e: string
  j: string
  l: number
  g: string
  c: string
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

  if (!q(b) || typeof b.a !== "string" || typeof b.r !== "string") {
    return m({ ok: false, m: "bad" }, 400)
  }

  if (!(await s(`s:${b.p}`, 40, 60))) {
    return m({ ok: false, m: "rate" }, 429)
  }

  const c = r(b)
  if (c) {
    return m({ ok: false, m: c }, c === "conf" ? 500 : 400)
  }

  if (!(await t(String(b.p), String(b.n)))) {
    return m({ ok: false, m: "replay" }, 400)
  }

  const d = await v<A>(`i:${b.a}`)
  if (!d) {
    return m({ ok: false, m: "step" }, 400)
  }

  if (!x(b, d) || typeof d.c !== "string" || d.c === "") {
    return m({ ok: false, m: "ctx" }, 400)
  }

  const e = p(`${d.c}|${h}`)
  if (String(b.r).toLowerCase() !== e.toLowerCase()) {
    return m({ ok: false, m: "key" }, 401)
  }

  const g = o()

  await u(`u:${g}`, {
    p: String(b.p),
    v: String(b.v),
    e: String(b.e),
    j: String(b.j),
    l: Number(b.l),
    g: String(b.g),
    t: Date.now(),
  })

  await w(`i:${b.a}`)

  return m({
    ok: true,
    u: g,
    h: f,
  })
}
