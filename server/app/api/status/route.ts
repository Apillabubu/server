import { f, g, m } from "../z"

export const runtime = "nodejs"

export async function GET() {
  return m({
    ok: true,
    h: f,
    v: g,
  })
}
