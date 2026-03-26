import { Redis } from "@upstash/redis"
import { createHash, randomBytes } from "crypto"

type A = {
  p: string
  v: string
  e: string
  j: string
  l: number
  g: string
  c?: string
  t: number
}

type B = {
  p: string
  v: string
  e: string
  j: string
  l: number
  g: string
  t: number
}

const a = process.env.UPSTASH_REDIS_REST_URL || ""
const b = process.env.UPSTASH_REDIS_REST_TOKEN || ""

export const c = new Redis({
  url: a,
  token: b,
})

export const d = Number(process.env.A_DRIFT || 90)
export const e = Number(process.env.A_TTL || 120)
export const f = Number(process.env.A_BEAT || 20)
export const g = process.env.A_NOW || process.env.A_VERS || "1.0.0"
export const h = String(process.env.A_KEY || "")

const i = new Set(
  String(process.env.A_VERS || g)
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean),
)

const j = new Set(
  (() => {
    try {
      return JSON.parse(process.env.A_BLOCK_FINGERS || "[]")
    } catch {
      return []
    }
  })().map((v: unknown) => String(v)),
)

const k = new Set(
  (() => {
    try {
      return JSON.parse(process.env.A_ALLOW_FINGERS || "[]")
    } catch {
      return []
    }
  })().map((v: unknown) => String(v)),
)

const l = new Set(
  (() => {
    try {
      return JSON.parse(process.env.A_ALLOW_PLACES || "[]")
    } catch {
      return []
    }
  })().map((v: unknown) => String(v)),
)

export function m(v: unknown, s = 200) {
  return new Response(JSON.stringify(v), {
    status: s,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  })
}

export function n() {
  return Math.floor(Date.now() / 1000)
}

export function o() {
  return randomBytes(32).toString("hex")
}

export function p(v: string) {
  return createHash("sha256").update(v).digest("hex")
}

export function q(v: any) {
  return !!(
    v &&
    typeof v === "object" &&
    typeof v.p === "string" &&
    typeof v.n === "string" &&
    typeof v.t === "number" &&
    typeof v.q === "number" &&
    typeof v.v === "string" &&
    typeof v.e === "string" &&
    typeof v.j === "string" &&
    (typeof v.l === "number" || typeof v.l === "string") &&
    typeof v.g === "string"
  )
}

export function r(v: any) {
  if (!q(v)) return "bad"
  if (!a || !b) return "conf"
  if (!h) return "conf"
  if (Math.abs(n() - Number(v.t || 0)) > d) return "skew"
  if (!i.has(String(v.v || ""))) return "ver"
  if (j.has(String(v.p || ""))) return "ban"
  if (k.size > 0 && !k.has(String(v.p || ""))) return "deny"
  if (l.size > 0 && !l.has(String(v.l || ""))) return "place"
  return ""
}

export async function s(v: string, x = 40, y = 60) {
  const z = `r:${v}`
  const aa = Number(await c.incr(z))
  if (aa === 1) {
    await c.expire(z, y)
  }
  return aa <= x
}

export async function t(v: string, w: string) {
  const x = await c.set(`n:${v}:${w}`, 1, {
    nx: true,
    ex: Math.max(60, d * 2),
  })
  return !!x
}

export async function u(v: string, w: A | B, x = e) {
  await c.set(v, w, { ex: x })
}

export async function v<T = A | B>(w: string): Promise<T | null> {
  const x = await c.get<any>(w)

  if (!x) return null

  if (typeof x === "string") {
    try {
      return JSON.parse(x) as T
    } catch {
      return null
    }
  }

  if (typeof x === "object") {
    return x as T
  }

  return null
}

export async function w(v: string) {
  await c.del(v)
}

export function x(y: any, z: A | B) {
  return (
    String(z.p) === String(y.p) &&
    String(z.v) === String(y.v) &&
    String(z.e) === String(y.e) &&
    String(z.j) === String(y.j) &&
    Number(z.l) === Number(y.l) &&
    String(z.g) === String(y.g)
  )
}
