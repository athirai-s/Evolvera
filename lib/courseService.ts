import { Course } from '@/types'

export interface CourseQuery {
  topic: string
  role: string
  platform?: string
  maxResults?: number
  minRating?: number
}

export interface PlatformCourseData {
  title: string
  platform: Course['platform']
  url: string
  rating: number
  duration: string
  description?: string
  instructor?: string
  price?: string
  level?: 'Beginner' | 'Intermediate' | 'Advanced'
  tags?: string[]
}

export class CourseService {
  private static readonly COURSE_DATABASE: Record<string, PlatformCourseData[]> = {
    // ChatGPT + Accounting courses
    'chatgpt-accounting': [
      {
        title: 'AI for Accounting Professionals: ChatGPT & Automation',
        platform: 'Udemy',
        url: 'https://www.udemy.com/course/ai-accounting-chatgpt/',
        rating: 4.6,
        duration: '3.5 hours',
        description: 'Master ChatGPT for accounting workflows, journal entries, and financial reporting',
        instructor: 'ExpertEase Education',
        level: 'Intermediate',
        tags: ['ChatGPT', 'Accounting', 'Automation', 'Financial Reporting']
      },
      {
        title: 'Generative AI for Accountants: Complete Guide',
        platform: 'Udemy',
        url: 'https://www.udemy.com/course/generative-ai-accountants/',
        rating: 4.7,
        duration: '4.2 hours',
        description: 'Comprehensive guide to using ChatGPT, Claude, and other AI tools for accounting',
        instructor: 'AI Finance Academy',
        level: 'Beginner',
        tags: ['AI', 'ChatGPT', 'Accounting', 'Bookkeeping']
      },
      {
        title: 'ChatGPT for Financial Analysis and Reporting',
        platform: 'Coursera',
        url: 'https://www.coursera.org/learn/chatgpt-financial-analysis',
        rating: 4.5,
        duration: '6 weeks',
        description: 'Learn to leverage AI for financial statement analysis and reporting',
        instructor: 'University of Pennsylvania',
        level: 'Intermediate',
        tags: ['Financial Analysis', 'AI', 'Reporting']
      },
      {
        title: 'AI-Powered Accounting: From Basics to Advanced',
        platform: 'LinkedIn Learning',
        url: 'https://www.linkedin.com/learning/ai-powered-accounting',
        rating: 4.4,
        duration: '2.5 hours',
        description: 'Transform your accounting practice with AI tools and automation',
        instructor: 'Sarah Chen',
        level: 'Beginner',
        tags: ['AI', 'Accounting', 'Automation']
      },
      {
        title: 'Prompt Engineering for Finance Professionals',
        platform: 'Skillshare',
        url: 'https://www.skillshare.com/classes/prompt-engineering-finance',
        rating: 4.3,
        duration: '1.8 hours',
        description: 'Master prompt engineering techniques for financial and accounting tasks',
        instructor: 'Finance Tech Studio',
        level: 'Intermediate',
        tags: ['Prompt Engineering', 'Finance', 'AI']
      }
    ],

    // ChatGPT + Marketing courses
    'chatgpt-marketing': [
      {
        title: 'ChatGPT for Digital Marketing Mastery',
        platform: 'Udemy',
        url: 'https://www.udemy.com/course/chatgpt-digital-marketing/',
        rating: 4.8,
        duration: '5.5 hours',
        description: 'Create compelling marketing content, campaigns, and strategies using ChatGPT',
        instructor: 'Marketing AI Pro',
        level: 'Beginner',
        tags: ['ChatGPT', 'Digital Marketing', 'Content Creation']
      },
      {
        title: 'AI Marketing Automation with ChatGPT',
        platform: 'Coursera',
        url: 'https://www.coursera.org/learn/ai-marketing-automation',
        rating: 4.6,
        duration: '4 weeks',
        description: 'Automate your marketing workflows with AI tools and ChatGPT',
        instructor: 'Northwestern University',
        level: 'Intermediate',
        tags: ['Marketing Automation', 'AI', 'ChatGPT']
      },
      {
        title: 'Content Marketing with AI: ChatGPT Strategies',
        platform: 'LinkedIn Learning',
        url: 'https://www.linkedin.com/learning/content-marketing-ai-chatgpt',
        rating: 4.5,
        duration: '3.2 hours',
        description: 'Scale your content marketing using ChatGPT and AI writing tools',
        instructor: 'Jennifer Kim',
        level: 'Beginner',
        tags: ['Content Marketing', 'AI Writing', 'ChatGPT']
      },
      {
        title: 'Social Media Marketing with ChatGPT',
        platform: 'Skillshare',
        url: 'https://www.skillshare.com/classes/social-media-chatgpt',
        rating: 4.4,
        duration: '2.1 hours',
        description: 'Create engaging social media content and campaigns with AI assistance',
        instructor: 'Social Media Academy',
        level: 'Beginner',
        tags: ['Social Media', 'ChatGPT', 'Content Creation']
      }
    ],

    // ChatGPT + Design courses
    'chatgpt-design': [
      {
        title: 'AI-Assisted Design with ChatGPT and Midjourney',
        platform: 'Udemy',
        url: 'https://www.udemy.com/course/ai-design-chatgpt-midjourney/',
        rating: 4.7,
        duration: '4.8 hours',
        description: 'Combine ChatGPT prompting with visual AI tools for creative design workflows',
        instructor: 'Creative AI Studio',
        level: 'Intermediate',
        tags: ['AI Design', 'ChatGPT', 'Midjourney', 'Creative Process']
      },
      {
        title: 'UX Writing with ChatGPT',
        platform: 'Coursera',
        url: 'https://www.coursera.org/learn/ux-writing-chatgpt',
        rating: 4.5,
        duration: '3 weeks',
        description: 'Enhance your UX writing skills using AI tools and ChatGPT',
        instructor: 'Google',
        level: 'Beginner',
        tags: ['UX Writing', 'ChatGPT', 'User Experience']
      },
      {
        title: 'Design Systems with AI Assistance',
        platform: 'LinkedIn Learning',
        url: 'https://www.linkedin.com/learning/design-systems-ai',
        rating: 4.3,
        duration: '2.7 hours',
        description: 'Build and maintain design systems with ChatGPT and AI tools',
        instructor: 'Alex Rivera',
        level: 'Intermediate',
        tags: ['Design Systems', 'AI', 'ChatGPT']
      }
    ],

    // ChatGPT + Development courses
    'chatgpt-developer': [
      {
        title: 'ChatGPT for Developers: Code Generation & Review',
        platform: 'Udemy',
        url: 'https://www.udemy.com/course/chatgpt-developers-coding/',
        rating: 4.9,
        duration: '6.2 hours',
        description: 'Master code generation, debugging, and review using ChatGPT',
        instructor: 'CodeAI Academy',
        level: 'Intermediate',
        tags: ['ChatGPT', 'Programming', 'Code Generation', 'Debugging']
      },
      {
        title: 'AI-Powered Software Development',
        platform: 'Coursera',
        url: 'https://www.coursera.org/learn/ai-software-development',
        rating: 4.7,
        duration: '8 weeks',
        description: 'Integrate AI tools into your development workflow for increased productivity',
        instructor: 'Stanford University',
        level: 'Advanced',
        tags: ['AI Development', 'Software Engineering', 'Productivity']
      },
      {
        title: 'GitHub Copilot and ChatGPT for Coding',
        platform: 'Pluralsight',
        url: 'https://www.pluralsight.com/courses/github-copilot-chatgpt-coding',
        rating: 4.6,
        duration: '4.5 hours',
        description: 'Combine GitHub Copilot and ChatGPT for efficient code development',
        instructor: 'Tech Learning Path',
        level: 'Intermediate',
        tags: ['GitHub Copilot', 'ChatGPT', 'Coding Efficiency']
      }
    ],

    // General AI courses for different roles
    'ai-general': [
      {
        title: 'Introduction to Artificial Intelligence for Everyone',
        platform: 'Coursera',
        url: 'https://www.coursera.org/learn/introduction-to-ai',
        rating: 4.8,
        duration: '4 weeks',
        description: 'Comprehensive introduction to AI concepts and applications across industries',
        instructor: 'Andrew Ng',
        level: 'Beginner',
        tags: ['AI Fundamentals', 'Machine Learning', 'Applications']
      },
      {
        title: 'AI for Business Professionals',
        platform: 'edX',
        url: 'https://www.edx.org/course/ai-business-professionals',
        rating: 4.5,
        duration: '6 weeks',
        description: 'Strategic implementation of AI in business contexts',
        instructor: 'MIT',
        level: 'Intermediate',
        tags: ['AI Strategy', 'Business Applications', 'Implementation']
      }
    ]
  }

  static async getCourses(query: CourseQuery): Promise<Course[]> {
    const { topic, role, platform, maxResults = 10, minRating = 3.0 } = query

    // Generate search keys based on topic and role
    const searchKeys = this.generateSearchKeys(topic, role)
    
    let allCourses: PlatformCourseData[] = []

    // Collect courses from relevant search keys
    for (const key of searchKeys) {
      if (this.COURSE_DATABASE[key]) {
        allCourses.push(...this.COURSE_DATABASE[key])
      }
    }

    // Add general AI courses if no specific matches found
    if (allCourses.length === 0) {
      allCourses.push(...this.COURSE_DATABASE['ai-general'])
    }

    // Filter by platform if specified
    if (platform) {
      allCourses = allCourses.filter(course => course.platform === platform)
    }

    // Filter by minimum rating
    allCourses = allCourses.filter(course => course.rating >= minRating)

    // Sort by rating (descending) and then by relevance
    allCourses.sort((a, b) => {
      // First sort by rating
      if (b.rating !== a.rating) {
        return b.rating - a.rating
      }
      // Then by relevance (courses matching both topic and role first)
      const aRelevance = this.calculateRelevance(a, topic, role)
      const bRelevance = this.calculateRelevance(b, topic, role)
      return bRelevance - aRelevance
    })

    // Limit results
    allCourses = allCourses.slice(0, maxResults)

    // Convert to Course type
    return allCourses.map(course => ({
      title: course.title,
      platform: course.platform,
      url: course.url,
      rating: course.rating,
      duration: course.duration
    }))
  }

  private static generateSearchKeys(topic: string, role: string): string[] {
    const topicLower = topic.toLowerCase()
    const roleLower = role.toLowerCase()
    
    const keys: string[] = []

    // Direct combination
    keys.push(`${topicLower}-${roleLower}`)
    
    // Role-specific variations
    if (roleLower.includes('account')) {
      keys.push(`${topicLower}-accounting`)
    }
    if (roleLower.includes('market')) {
      keys.push(`${topicLower}-marketing`)
    }
    if (roleLower.includes('design')) {
      keys.push(`${topicLower}-design`)
    }
    if (roleLower.includes('develop') || roleLower.includes('engineer') || roleLower.includes('programmer')) {
      keys.push(`${topicLower}-developer`)
    }
    
    // Add general categories
    keys.push(`${topicLower}-general`)
    keys.push('ai-general')

    return keys
  }

  private static calculateRelevance(course: PlatformCourseData, topic: string, role: string): number {
    let score = 0
    const titleLower = course.title.toLowerCase()
    const descriptionLower = course.description?.toLowerCase() || ''
    const tagsLower = course.tags?.join(' ').toLowerCase() || ''
    
    const topicLower = topic.toLowerCase()
    const roleLower = role.toLowerCase()

    // Title matches
    if (titleLower.includes(topicLower)) score += 3
    if (titleLower.includes(roleLower)) score += 3

    // Description matches
    if (descriptionLower.includes(topicLower)) score += 2
    if (descriptionLower.includes(roleLower)) score += 2

    // Tags matches
    if (tagsLower.includes(topicLower)) score += 1
    if (tagsLower.includes(roleLower)) score += 1

    return score
  }

  static async getPopularCourses(role: string, limit: number = 5): Promise<Course[]> {
    // Get courses for the most popular AI topics for this role
    const popularTopics = ['ChatGPT', 'AI', 'Automation', 'Machine Learning']
    
    let allCourses: Course[] = []
    
    for (const topic of popularTopics) {
      const courses = await this.getCourses({
        topic,
        role,
        maxResults: 3
      })
      allCourses.push(...courses)
    }

    // Remove duplicates and limit results
    const uniqueCourses = allCourses.filter((course, index, self) => 
      index === self.findIndex(c => c.url === course.url)
    )

    return uniqueCourses.slice(0, limit)
  }

  static getSupportedPlatforms(): Course['platform'][] {
    return ['YouTube', 'Coursera', 'Udemy', 'edX', 'LinkedIn Learning', 'Skillshare', 'Pluralsight']
  }
}