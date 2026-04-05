export type Post = {
  id: string
  created_at: string
  source_url: string
  article_title: string
  teaser: string
  summary: string
  tags: string
  image_prompt: string
  source_site: string
  status: 'new' | 'published'
}