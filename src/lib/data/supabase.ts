import { supabase } from "@/integrations/supabase/client"
import type { RateItem, WebContent, WebSectionContent } from "./index"

export const getRatesAdmin = async (): Promise<RateItem[]> => {
  const { data, error } = await supabase.from("rate_list").select("*").order("category", { ascending: true })
  if (error) throw error
  return (data || []) as RateItem[]
}

export const fetchActiveRates = async (): Promise<RateItem[]> => {
  const { data, error } = await supabase
    .from("rate_list")
    .select("*")
    .eq("is_active", true)
    .order("category", { ascending: true })
  if (error) throw error
  return (data || []) as RateItem[]
}

export const addRate = async (payload: {
  test_name: string
  price: number
  category: string
  description: string
  is_active: boolean
}): Promise<void> => {
  const { error } = await supabase.from("rate_list").insert([payload])
  if (error) throw error
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
  const { error } = await supabase.from("rate_list").update(payload).eq("id", id)
  if (error) throw error
}

export const deleteRate = async (id: string): Promise<void> => {
  const { error } = await supabase.from("rate_list").delete().eq("id", id)
  if (error) throw error
}

export const getWebContent = async (): Promise<WebContent[]> => {
  const { data, error } = await supabase.from("website_content").select("*").order("section", { ascending: true })
  if (error) throw error
  return (data || []) as WebContent[]
}

export const addContent = async (payload: {
  section: string
  content: WebSectionContent
}): Promise<void> => {
  const { error } = await supabase.from("website_content").insert([payload])
  if (error) throw error
}

export const updateContent = async (
  id: string,
  payload: {
    section: string
    content: WebSectionContent
  }
): Promise<void> => {
  const { error } = await supabase.from("website_content").update(payload).eq("id", id)
  if (error) throw error
}

export const deleteContent = async (id: string): Promise<void> => {
  const { error } = await supabase.from("website_content").delete().eq("id", id)
  if (error) throw error
}
