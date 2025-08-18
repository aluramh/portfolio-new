"use server"

export async function contactAction(formData: FormData): Promise<{ ok: boolean }> {
  // Minimal validation
  const name = String(formData.get("name") || "").trim()
  const email = String(formData.get("email") || "").trim()
  const message = String(formData.get("message") || "").trim()

  if (!name || !email || !message) {
    return { ok: false }
  }

  // In a real app, send to an email service or persist to a DB here.
  // For this demo, we just simulate some async work.
  await new Promise((r) => setTimeout(r, 600))

  console.log("[Contact Message]", { name, email, message, receivedAt: new Date().toISOString() })
  return { ok: true }
}
