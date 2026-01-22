import { z } from "zod"
import ratesSeed from "@/data/rates.json"
import contentSeed from "@/data/content.json"
import type { RateItem, WebContent, WebSectionContent } from "./index"

const RATES_KEY = "md_rate_list"
const CONTENT_KEY = "md_website_content"

const RateItemSchema = z.object({
  id: z.string(),
  test_name: z.string().min(1),
  price: z.number().nonnegative(),
  category: z.string().min(1),
  description: z.string().nullable().optional().default(null),
  is_active: z.boolean().optional().default(true),
})

const WebSectionContentSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  image_url: z.string().optional(),
  button_text: z.string().optional(),
  button_link: z.string().optional(),
})

const WebContentSchema = z.object({
  id: z.string(),
  section: z.string().min(1),
  content: WebSectionContentSchema,
  updated_by: z.string().nullable(),
  updated_at: z.string(),
})

const ensureValidRates = (data: RateItem[]): RateItem[] => {
  const res = z.array(RateItemSchema).safeParse(data)
  if (res.success) return res.data as RateItem[]
  const arr = Array.isArray(data) ? data : []
  const cleaned = arr.map((d) => {
    try {
      return RateItemSchema.parse(d)
    } catch {
      return null
    }
  }).filter(Boolean) as RateItem[]
  if (cleaned.length === 0) {
    const seed = z.array(RateItemSchema).parse(ratesSeed as RateItem[])
    localStorage.setItem(RATES_KEY, JSON.stringify(seed))
    return seed
  }
  localStorage.setItem(RATES_KEY, JSON.stringify(cleaned))
  return cleaned
}

const ensureValidContent = (data: WebContent[]): WebContent[] => {
  const res = z.array(WebContentSchema).safeParse(data)
  if (res.success) return res.data as WebContent[]
  const arr = Array.isArray(data) ? data : []
  const cleaned = arr.map((d) => {
    try {
      return WebContentSchema.parse(d)
    } catch {
      return null
    }
  }).filter(Boolean) as WebContent[]
  if (cleaned.length === 0) {
    const seed = z.array(WebContentSchema).parse(contentSeed as WebContent[])
    localStorage.setItem(CONTENT_KEY, JSON.stringify(seed))
    return seed
  }
  localStorage.setItem(CONTENT_KEY, JSON.stringify(cleaned))
  return cleaned
}

const readRates = (): RateItem[] => {
  const raw = localStorage.getItem(RATES_KEY)
  if (raw) {
    try {
      const parsed = JSON.parse(raw)
      return ensureValidRates(parsed)
    } catch {
      const seed = ensureValidRates(ratesSeed as RateItem[])
      localStorage.setItem(RATES_KEY, JSON.stringify(seed))
      return seed
    }
  }
  const seed = ensureValidRates(ratesSeed as RateItem[])
  localStorage.setItem(RATES_KEY, JSON.stringify(seed))
  return seed
}

const writeRates = (data: RateItem[]) => {
  localStorage.setItem(RATES_KEY, JSON.stringify(ensureValidRates(data)))
}

const readContent = (): WebContent[] => {
  const raw = localStorage.getItem(CONTENT_KEY)
  if (raw) {
    try {
      const parsed = JSON.parse(raw)
      return ensureValidContent(parsed)
    } catch {
      const seed = ensureValidContent(contentSeed as WebContent[])
      localStorage.setItem(CONTENT_KEY, JSON.stringify(seed))
      return seed
    }
  }
  const seed = ensureValidContent(contentSeed as WebContent[])
  localStorage.setItem(CONTENT_KEY, JSON.stringify(seed))
  return seed
}

const writeContent = (data: WebContent[]) => {
  localStorage.setItem(CONTENT_KEY, JSON.stringify(ensureValidContent(data)))
}

export const getRatesAdmin = async (): Promise<RateItem[]> => {
  return readRates()
}

export const fetchActiveRates = async (): Promise<RateItem[]> => {
  return readRates().filter((r) => r.is_active)
}

export const addRate = async (payload: {
  test_name: string
  price: number
  category: string
  description: string
  is_active: boolean
}): Promise<void> => {
  const list = readRates()
  const item: RateItem = {
    id: crypto.randomUUID(),
    test_name: payload.test_name,
    price: payload.price,
    category: payload.category,
    description: payload.description,
    is_active: payload.is_active,
  }
  writeRates(ensureValidRates([{ ...item }, ...list]))
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
  const list = readRates()
  const next = list.map((r) => (r.id === id ? { ...r, ...payload } : r))
  writeRates(ensureValidRates(next))
}

export const deleteRate = async (id: string): Promise<void> => {
  const list = readRates()
  writeRates(ensureValidRates(list.filter((r) => r.id !== id)))
}

export const getWebContent = async (): Promise<WebContent[]> => {
  return readContent()
}

export const addContent = async (payload: {
  section: string
  content: WebSectionContent
}): Promise<void> => {
  const list = readContent()
  const item: WebContent = {
    id: crypto.randomUUID(),
    section: payload.section,
    content: payload.content,
    updated_by: "local",
    updated_at: new Date().toISOString(),
  }
  writeContent(ensureValidContent([item, ...list]))
}

export const updateContent = async (
  id: string,
  payload: {
    section: string
    content: WebSectionContent
  }
): Promise<void> => {
  const list = readContent()
  const next = list.map((c) =>
    c.id === id
      ? {
          ...c,
          section: payload.section,
          content: payload.content,
          updated_at: new Date().toISOString(),
        }
      : c
  )
  writeContent(ensureValidContent(next))
}

export const deleteContent = async (id: string): Promise<void> => {
  const list = readContent()
  writeContent(ensureValidContent(list.filter((c) => c.id !== id)))
}
