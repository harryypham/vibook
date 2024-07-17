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

export const searchAuthor = async (query) => {
  const { data, error } = await supabase
    .from("books")
    .select()
    .textSearch("author", query)
  if (error) {
    throw error
  }
  return data
}

export const searchContent = async (query) => {
  const { data, error } = await supabase
    .from("books")
    .select()
    .textSearch("text", query)
    .limit(10)
  if (error) {
    throw error
  }
  return data
}

export const getAllTypes = async () => {
  //   const { data, error } = await supabase
  //     .from("books")
  //     .select("type")
  //     .distinct()
  const { data, error } = await supabase.rpc("get_distinct_types")
  if (error) {
    throw error
  }
  return data
}

export const queryRandomBooks = async (type) => {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("type", type)
    .range(0, 9)
  if (error) {
    throw error
  }
  return data
}
