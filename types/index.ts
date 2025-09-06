import { z } from 'zod'

export const PersonaSchema = z.enum([
  'student',
  'silver-surfer',
  'non-tech',
  'artist',
  'wannabe-hacker',
  'spreadsheet-samurai'
])

export type Persona = z.infer<typeof PersonaSchema>

export const ToolCategorySchema = z.enum([
  'writing',
  'productivity', 
  'data',
  'design',
  'video',
  'voice',
  'meeting',
  'automation',
  'research'
])

export type ToolCategory = z.infer<typeof ToolCategorySchema>

export const CourseSchema = z.object({
  title: z.string(),
  platform: z.enum(['YouTube', 'Coursera', 'Udemy', 'edX', 'LinkedIn Learning', 'Skillshare', 'Pluralsight']),
  url: z.string().url(),
  rating: z.number().min(0).max(5),
  duration: z.string()
})

export type Course = z.infer<typeof CourseSchema>

export const ToolSchema = z.object({
  name: z.string(),
  category: ToolCategorySchema,
  why: z.string().max(200),
  quick_start_url: z.string().url(),
  learn_tasks: z.array(z.string()).min(3).max(5),
  courses: z.array(CourseSchema).optional() // Make courses optional for initial load
})

export type Tool = z.infer<typeof ToolSchema>

export const ToolsResponseSchema = z.object({
  persona: z.string(),
  role: z.string(),
  tools: z.array(ToolSchema).min(8).max(15)
})

export type ToolsResponse = z.infer<typeof ToolsResponseSchema>

export const NewsItemSchema = z.object({
  source: z.enum(['OpenAI', 'Anthropic', 'GoogleAI', 'ProductHunt', 'HackerNews']),
  title: z.string(),
  url: z.string().url(),
  publishedAt: z.string(),
  summary: z.string().max(200)
})

export type NewsItem = z.infer<typeof NewsItemSchema>

export const NewsResponseSchema = z.object({
  items: z.array(NewsItemSchema)
})

export type NewsResponse = z.infer<typeof NewsResponseSchema>

export const TimeEntrySchema = z.object({
  id: z.string(),
  tool: z.string(),
  minutes: z.number().min(1),
  date: z.string()
})

export type TimeEntry = z.infer<typeof TimeEntrySchema>

export interface PersonaData {
  id: Persona
  emoji: string
  title: string
  subtitle: string
}

export interface RoleData {
  id: string
  name: string
}

// Forum Types
export const PostVoteSchema = z.enum(['up', 'down'])
export type PostVote = z.infer<typeof PostVoteSchema>

export const CommunitySchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(50),
  displayName: z.string().min(1).max(100),
  description: z.string().max(500),
  createdAt: z.string(),
  createdBy: z.string(),
  memberCount: z.number().int().min(0).default(0),
  isOfficial: z.boolean().default(false),
  category: z.enum(['AI Models', 'Tools', 'Discussion', 'News', 'Help', 'Other']).default('Other')
})

export type Community = z.infer<typeof CommunitySchema>

export const PostSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(300),
  content: z.string().max(10000),
  authorId: z.string(),
  authorName: z.string(),
  communityId: z.string(),
  communityName: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  upvotes: z.number().int().min(0).default(0),
  downvotes: z.number().int().min(0).default(0),
  commentCount: z.number().int().min(0).default(0),
  isEdited: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  modelRating: z.number().min(0).max(5).optional() // For AI model rating posts
})

export type Post = z.infer<typeof PostSchema>

export const CommentSchema = z.object({
  id: z.string(),
  content: z.string().min(1).max(1000),
  authorId: z.string(),
  authorName: z.string(),
  postId: z.string(),
  parentId: z.string().optional(), // For nested comments
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  upvotes: z.number().int().min(0).default(0),
  downvotes: z.number().int().min(0).default(0),
  isEdited: z.boolean().default(false)
})

export type Comment = z.infer<typeof CommentSchema>

export const CreateCommunitySchema = z.object({
  name: z.string().min(1).max(50).regex(/^[a-zA-Z0-9]+$/, 'Community name can only contain letters and numbers'),
  displayName: z.string().min(1).max(100),
  description: z.string().max(500),
  category: z.enum(['AI Models', 'Tools', 'Discussion', 'News', 'Help', 'Other'])
})

export type CreateCommunity = z.infer<typeof CreateCommunitySchema>

export const CreatePostSchema = z.object({
  title: z.string().min(1).max(300),
  content: z.string().min(1).max(10000),
  communityId: z.string(),
  tags: z.array(z.string()).max(10).default([]),
  modelRating: z.number().min(0).max(5).optional()
})

export type CreatePost = z.infer<typeof CreatePostSchema>

export const CreateCommentSchema = z.object({
  content: z.string().min(1).max(1000),
  postId: z.string(),
  parentId: z.string().optional()
})

export type CreateComment = z.infer<typeof CreateCommentSchema>

// Advice Types
export const AdviceItemSchema = z.object({
  category: z.string(),
  title: z.string(),
  steps: z.array(z.string()).min(3).max(5),
  tools: z.array(z.string()),
  timeEstimate: z.string()
})

export type AdviceItem = z.infer<typeof AdviceItemSchema>

export const AdviceResponseSchema = z.object({
  advice: z.array(AdviceItemSchema).min(4).max(6)
})

export type AdviceResponse = z.infer<typeof AdviceResponseSchema>

// Auth Types
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  persona: z.string(),
  role: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
})

export type User = z.infer<typeof UserSchema>

export const SignupFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  persona: z.string().min(1, 'Please select a persona'),
  role: z.string().min(1, 'Please enter your role')
})

export type SignupForm = z.infer<typeof SignupFormSchema>

export const SigninFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

export type SigninForm = z.infer<typeof SigninFormSchema>