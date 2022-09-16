import type { MDXInstance, Page } from 'astro'

type Theme = 'light' | 'dark'

interface IElement {
  readonly as?: keyof HTMLElementTagNameMap
}

type SiteMeta = {
  title: string
  description?: string
  image?: string
}

type PaginationLink = {
  url: string
  text?: string
  srLabel?: string
}

interface Post {
  title: string
  description: string
  publishDate?: Date
  tags?: string[]
}

export type {
  MDXInstance,
  Page,
  Theme,
  IElement,
  SiteMeta,
  PaginationLink,
  Post,
}

interface ImportMetaEnv {
  readonly MIHOYO_COOKIE: string
  readonly PUBLIC_GANALYTICS_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
