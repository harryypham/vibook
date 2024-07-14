import supabase from "./supabaseClient"

export const searchTitle = async (query) => {
  const { data, error } = await supabase
    .from("books")
    .select()
    .textSearch("title", query)
  if (error) {
    throw error
  }
  return data
}

export const queryRandomBooks = async (type) => {
  const { data, error } = await supabase
    .from("books")
    .select()
    .eq("type", type)
    .order("random")
    .range(0, 10)
  if (error) {
    throw error
  }
  return data
}
