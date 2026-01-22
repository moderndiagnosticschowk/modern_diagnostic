const MODE = (import.meta.env.VITE_DATA_MODE ?? "local") as "local" | "remote"

export type RateItem = {
  id: string
  test_name: string
  price: number
  category: string
  description: string | null
  is_active: boolean
}

export type WebSectionContent = {
  title?: string
  content?: string
  image_url?: string
  button_text?: string
  button_link?: string
}

export type WebContent = {
  id: string
  section: string
  content: WebSectionContent
  updated_by: string | null
  updated_at: string
}

const local = () => import("./local")
const remote = () => import("./supabase")

export const getRatesAdmin = async (): Promise<RateItem[]> => {
  const mod = MODE === "local" ? await local() : await remote()
  return mod.getRatesAdmin()
}

export const fetchActiveRates = async (): Promise<RateItem[]> => {
  const mod = MODE === "local" ? await local() : await remote()
  return mod.fetchActiveRates()
}

export const addRate = async (payload: {
  test_name: string
  price: number
  category: string
  description: string
  is_active: boolean
}): Promise<void> => {
  const mod = MODE === "local" ? await local() : await remote()
  return mod.addRate(payload)
}

export const updateRate = async (
  id: string,
  payload: Partial<{
    test_name: string
    price: number
    category: string
    description: string
    is_active: boolean
  }>
): Promise<void> => {
  const mod = MODE === "local" ? await local() : await remote()
  return mod.updateRate(id, payload)
}

export const deleteRate = async (id: string): Promise<void> => {
  const mod = MODE === "local" ? await local() : await remote()
  return mod.deleteRate(id)
}

export const getWebContent = async (): Promise<WebContent[]> => {
  const mod = MODE === "local" ? await local() : await remote()
  return mod.getWebContent()
}

export const addContent = async (payload: {
  section: string
  content: WebSectionContent
}): Promise<void> => {
  const mod = MODE === "local" ? await local() : await remote()
  return mod.addContent(payload)
}

export const updateContent = async (
  id: string,
  payload: {
    section: string
    content: WebSectionContent
  }
): Promise<void> => {
  const mod = MODE === "local" ? await local() : await remote()
  return mod.updateContent(id, payload)
}

export const deleteContent = async (id: string): Promise<void> => {
  const mod = MODE === "local" ? await local() : await remote()
  return mod.deleteContent(id)
}
