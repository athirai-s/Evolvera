import { Course } from '@/types'

export interface CourseDatabase {
  [toolName: string]: Course[]
}

export const courseDatabase: CourseDatabase = {
  'ChatGPT': [
    {
      title: 'ChatGPT Complete Guide - Zero to Hero',
      platform: 'Udemy',
      url: 'https://www.udemy.com/course/chatgpt-complete-guide/',
      rating: 4.5,
      duration: '4.5 hours'
    },
    {
      title: 'ChatGPT Tutorial for Beginners',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=JTxsNm9IdYU',
      rating: 4.6,
      duration: '45 mins'
    },
    {
      title: 'Introduction to Generative AI',
      platform: 'Coursera',
      url: 'https://www.coursera.org/learn/introduction-generative-ai',
      rating: 4.7,
      duration: '1 week'
    },
    {
      title: 'Prompt Engineering for ChatGPT',
      platform: 'LinkedIn Learning',
      url: 'https://www.linkedin.com/learning/prompt-engineering-how-to-talk-to-the-ais',
      rating: 4.4,
      duration: '1.5 hours'
    }
  ],
  'Claude AI': [
    {
      title: 'Claude AI Complete Tutorial',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=Gaf_jCnA6mc',
      rating: 4.4,
      duration: '25 mins'
    },
    {
      title: 'AI Conversation Design',
      platform: 'Skillshare',
      url: 'https://www.skillshare.com/classes/AI-Conversation-Design-with-Claude/1827394810',
      rating: 4.3,
      duration: '2 hours'
    },
    {
      title: 'Advanced AI Prompting Techniques',
      platform: 'Udemy',
      url: 'https://www.udemy.com/course/advanced-ai-prompting/',
      rating: 4.5,
      duration: '3 hours'
    }
  ],
  'Midjourney': [
    {
      title: 'Midjourney AI Art Generation Complete Course',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=35RQKLhIhgU',
      rating: 4.6,
      duration: '32 mins'
    },
    {
      title: 'Midjourney Mastery Course',
      platform: 'Udemy',
      url: 'https://www.udemy.com/course/midjourney-mastery/',
      rating: 4.7,
      duration: '3.5 hours'
    },
    {
      title: 'AI Art Creation with Midjourney',
      platform: 'Skillshare',
      url: 'https://www.skillshare.com/classes/AI-Art-Creation-with-Midjourney/1827394811',
      rating: 4.5,
      duration: '2 hours'
    }
  ],
  'GitHub Copilot': [
    {
      title: 'GitHub Copilot Complete Tutorial',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=Fi3AJZZregI',
      rating: 4.5,
      duration: '18 mins'
    },
    {
      title: 'AI-Powered Development with GitHub Copilot',
      platform: 'Pluralsight',
      url: 'https://www.pluralsight.com/courses/github-copilot-ai-powered-development',
      rating: 4.6,
      duration: '2 hours'
    },
    {
      title: 'Getting Started with GitHub Copilot',
      platform: 'LinkedIn Learning',
      url: 'https://www.linkedin.com/learning/github-copilot-first-look',
      rating: 4.4,
      duration: '1 hour'
    }
  ],
  'Runway ML': [
    {
      title: 'Runway ML Complete Guide for Beginners',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=mvdlAtUt9pQ',
      rating: 4.4,
      duration: '28 mins'
    },
    {
      title: 'AI Video Creation Masterclass',
      platform: 'Udemy',
      url: 'https://www.udemy.com/course/ai-video-creation-masterclass/',
      rating: 4.5,
      duration: '4 hours'
    },
    {
      title: 'Creative AI Video Production',
      platform: 'Skillshare',
      url: 'https://www.skillshare.com/classes/Creative-AI-Video-Production/1827394812',
      rating: 4.3,
      duration: '2.5 hours'
    }
  ],
  'Gemini AI': [
    {
      title: 'Google Gemini AI Tutorial',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=UIZAiXYceBI',
      rating: 4.4,
      duration: '15 mins'
    },
    {
      title: 'Google AI Essentials',
      platform: 'Coursera',
      url: 'https://www.coursera.org/learn/google-ai-essentials',
      rating: 4.6,
      duration: '6 weeks'
    },
    {
      title: 'Multimodal AI with Gemini',
      platform: 'edX',
      url: 'https://www.edx.org/course/multimodal-ai',
      rating: 4.5,
      duration: '4 weeks'
    }
  ],
  'Perplexity AI': [
    {
      title: 'Perplexity AI Complete Guide',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=3lD9BZVrpKM',
      rating: 4.3,
      duration: '12 mins'
    },
    {
      title: 'AI Research Tools Masterclass',
      platform: 'Udemy',
      url: 'https://www.udemy.com/course/ai-research-tools/',
      rating: 4.4,
      duration: '2 hours'
    },
    {
      title: 'Advanced Search with AI',
      platform: 'Skillshare',
      url: 'https://www.skillshare.com/classes/Advanced-Search-with-AI/1827394813',
      rating: 4.2,
      duration: '1 hour'
    }
  ],
  'Notion AI': [
    {
      title: 'Notion AI Tutorial for Beginners',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=hmpz6oLWLyU',
      rating: 4.4,
      duration: '24 mins'
    },
    {
      title: 'Notion Complete Course',
      platform: 'Udemy',
      url: 'https://www.udemy.com/course/notion/',
      rating: 4.6,
      duration: '3 hours'
    },
    {
      title: 'Productivity with Notion AI',
      platform: 'Skillshare',
      url: 'https://www.skillshare.com/classes/Productivity-with-Notion-AI/1827394814',
      rating: 4.5,
      duration: '2 hours'
    }
  ],
  'Stable Diffusion': [
    {
      title: 'Stable Diffusion Complete Tutorial',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=1ImUCGM_BWg',
      rating: 4.5,
      duration: '45 mins'
    },
    {
      title: 'AI Image Generation Mastery',
      platform: 'Udemy',
      url: 'https://www.udemy.com/course/stable-diffusion-course/',
      rating: 4.7,
      duration: '5 hours'
    },
    {
      title: 'Creative AI Art with Stable Diffusion',
      platform: 'Skillshare',
      url: 'https://www.skillshare.com/classes/Creative-AI-Art/1827394815',
      rating: 4.4,
      duration: '3 hours'
    }
  ],
  'Copy AI': [
    {
      title: 'Copy.ai Complete Tutorial',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=K8iMI0l1WNs',
      rating: 4.2,
      duration: '20 mins'
    },
    {
      title: 'AI Copywriting Masterclass',
      platform: 'Udemy',
      url: 'https://www.udemy.com/course/ai-copywriting-masterclass/',
      rating: 4.4,
      duration: '3 hours'
    },
    {
      title: 'Marketing Copy with AI',
      platform: 'LinkedIn Learning',
      url: 'https://www.linkedin.com/learning/marketing-copy-with-ai',
      rating: 4.3,
      duration: '1.5 hours'
    }
  ],
  'Jasper AI': [
    {
      title: 'Jasper AI Complete Guide',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=TLbWvYrF0lQ',
      rating: 4.3,
      duration: '35 mins'
    },
    {
      title: 'Content Marketing with Jasper AI',
      platform: 'Udemy',
      url: 'https://www.udemy.com/course/jasper-ai-content-marketing/',
      rating: 4.5,
      duration: '4 hours'
    },
    {
      title: 'AI Content Creation Workshop',
      platform: 'Skillshare',
      url: 'https://www.skillshare.com/classes/AI-Content-Creation/1827394816',
      rating: 4.2,
      duration: '2.5 hours'
    }
  ],
  'Loom AI': [
    {
      title: 'Loom AI Features Tutorial',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=9YzDaIe5QMw',
      rating: 4.1,
      duration: '15 mins'
    },
    {
      title: 'Video Communication with AI',
      platform: 'LinkedIn Learning',
      url: 'https://www.linkedin.com/learning/video-communication-ai',
      rating: 4.3,
      duration: '1 hour'
    },
    {
      title: 'Screen Recording Mastery',
      platform: 'Skillshare',
      url: 'https://www.skillshare.com/classes/Screen-Recording-Mastery/1827394817',
      rating: 4.2,
      duration: '1.5 hours'
    }
  ]
}

// Function to get courses for a specific tool
export function getCoursesForTool(toolName: string): Course[] {
  // Try exact match first
  if (courseDatabase[toolName]) {
    return courseDatabase[toolName]
  }

  // Try case-insensitive match
  const lowerToolName = toolName.toLowerCase()
  for (const [key, courses] of Object.entries(courseDatabase)) {
    if (key.toLowerCase() === lowerToolName) {
      return courses
    }
  }

  // Try partial match
  for (const [key, courses] of Object.entries(courseDatabase)) {
    if (key.toLowerCase().includes(lowerToolName) || lowerToolName.includes(key.toLowerCase())) {
      return courses
    }
  }

  // Return empty array if no match found
  return []
}