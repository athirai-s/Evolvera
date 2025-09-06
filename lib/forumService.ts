import { Community, Post, Comment, CreateCommunity, CreatePost, CreateComment, PostVote } from '@/types'

// In-memory data store (replace with database in production)
class ForumDataStore {
  private communities: Map<string, Community> = new Map()
  private posts: Map<string, Post> = new Map()
  private comments: Map<string, Comment> = new Map()
  private userVotes: Map<string, { postId: string; vote: PostVote }[]> = new Map()
  
  constructor() {
    this.initializeDefaultCommunities()
    this.initializeSampleData()
  }

  private initializeDefaultCommunities() {
    const defaultCommunities: Community[] = [
      {
        id: 'gpt4',
        name: 'gpt4',
        displayName: 'GPT-4',
        description: 'Discussions, reviews, and experiences with GPT-4',
        createdAt: new Date().toISOString(),
        createdBy: 'system',
        memberCount: 1250,
        isOfficial: true,
        category: 'AI Models'
      },
      {
        id: 'gpt5',
        name: 'gpt5',
        displayName: 'GPT-5',
        description: 'Early discussions and speculations about GPT-5',
        createdAt: new Date().toISOString(),
        createdBy: 'system',
        memberCount: 890,
        isOfficial: true,
        category: 'AI Models'
      },
      {
        id: 'nanobana',
        name: 'nanobana',
        displayName: 'Nano Bana',
        description: 'Reviews and discussions about the new Nano Bana AI model',
        createdAt: new Date().toISOString(),
        createdBy: 'system',
        memberCount: 45,
        isOfficial: false,
        category: 'AI Models'
      },
      {
        id: 'claude',
        name: 'claude',
        displayName: 'Claude',
        description: 'Anthropic Claude AI discussions and use cases',
        createdAt: new Date().toISOString(),
        createdBy: 'system',
        memberCount: 820,
        isOfficial: true,
        category: 'AI Models'
      },
      {
        id: 'aitools',
        name: 'aitools',
        displayName: 'AI Tools',
        description: 'General AI tools discussion and recommendations',
        createdAt: new Date().toISOString(),
        createdBy: 'system',
        memberCount: 2150,
        isOfficial: false,
        category: 'Tools'
      },
      {
        id: 'prompteng',
        name: 'prompteng',
        displayName: 'Prompt Engineering',
        description: 'Share and discuss effective prompting techniques',
        createdAt: new Date().toISOString(),
        createdBy: 'system',
        memberCount: 1680,
        isOfficial: false,
        category: 'Discussion'
      }
    ]

    defaultCommunities.forEach(community => {
      this.communities.set(community.id, community)
    })
  }

  private initializeSampleData() {
    const samplePosts: Post[] = [
      {
        id: '1',
        title: 'GPT-4 vs Claude 3.5 Sonnet - My comparison after 3 months',
        content: 'After using both models extensively for coding, writing, and analysis, here are my thoughts...\n\n**GPT-4 Pros:**\n- Excellent at creative writing\n- Better at mathematical reasoning\n- More consistent responses\n\n**Claude Pros:**\n- Better at coding tasks\n- More helpful and honest\n- Better at following instructions\n\nOverall, I\'d rate GPT-4: 4.2/5 and Claude: 4.5/5 for my use cases.',
        authorId: 'user1',
        authorName: 'AIExplorer2024',
        communityId: 'gpt4',
        communityName: 'GPT-4',
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        upvotes: 47,
        downvotes: 3,
        commentCount: 12,
        tags: ['comparison', 'review', 'claude'],
        modelRating: 4.2
      },
      {
        id: '2',
        title: 'First impressions of Nano Bana - surprisingly good!',
        content: 'Just got access to Nano Bana and I\'m impressed! It\'s much faster than expected and handles coding tasks really well. The responses feel more natural than some larger models.\n\nTested it on:\n- Python coding (8/10)\n- Creative writing (7/10)  \n- Data analysis (9/10)\n- General Q&A (8/10)\n\nAnyone else tried it? What are your thoughts?',
        authorId: 'user2',
        authorName: 'TechReviewer',
        communityId: 'nanobana',
        communityName: 'Nano Bana',
        createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        upvotes: 23,
        downvotes: 1,
        commentCount: 8,
        tags: ['review', 'first-impressions'],
        modelRating: 4.0
      },
      {
        id: '3',
        title: 'Best prompting techniques for GPT-5 speculation',
        content: 'With all the rumors about GPT-5, I\'ve been experimenting with advanced prompting techniques that might work well with more capable models:\n\n1. **Chain of Verification** - Ask the model to verify its own answers\n2. **Multi-perspective analysis** - Request analysis from different viewpoints\n3. **Structured reasoning** - Use step-by-step breakdowns\n\nWhat techniques are you all preparing for next-gen models?',
        authorId: 'user3',
        authorName: 'PromptMaster',
        communityId: 'gpt5',
        communityName: 'GPT-5',
        createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
        upvotes: 31,
        downvotes: 2,
        commentCount: 15,
        tags: ['prompting', 'techniques', 'speculation']
      },
      {
        id: '4',
        title: 'Top 10 AI Tools Every Professional Should Know in 2024',
        content: 'Here\'s my curated list of must-have AI tools:\n\n1. **ChatGPT/GPT-4** - General purpose AI\n2. **Claude** - Coding and analysis\n3. **Midjourney** - Image generation\n4. **GitHub Copilot** - Code assistance\n5. **Notion AI** - Writing and organization\n6. **Grammarly** - Writing enhancement\n7. **Jasper** - Marketing content\n8. **Loom AI** - Video summaries\n9. **Zapier AI** - Automation\n10. **Perplexity** - Research\n\nWhat would you add or change?',
        authorId: 'user4',
        authorName: 'ProductivityGuru',
        communityId: 'aitools',
        communityName: 'AI Tools',
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        upvotes: 89,
        downvotes: 7,
        commentCount: 34,
        tags: ['tools', 'productivity', 'recommendations']
      }
    ]

    const sampleComments: Comment[] = [
      {
        id: 'c1',
        content: 'Great comparison! I\'ve had similar experiences. Claude definitely feels more reliable for code review.',
        authorId: 'user5',
        authorName: 'CodeReviewer',
        postId: '1',
        createdAt: new Date(Date.now() - 82800000).toISOString(),
        upvotes: 12,
        downvotes: 0
      },
      {
        id: 'c2',
        content: 'Interesting! How did you get access to Nano Bana? Is it publicly available now?',
        authorId: 'user6',
        authorName: 'CuriousDev',
        postId: '2',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        upvotes: 5,
        downvotes: 0
      },
      {
        id: 'c3',
        content: 'I\'d add Cursor to the coding tools list. It\'s been game-changing for my development workflow.',
        authorId: 'user7',
        authorName: 'DevToolsExpert',
        postId: '4',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        upvotes: 18,
        downvotes: 1
      }
    ]

    samplePosts.forEach(post => this.posts.set(post.id, post))
    sampleComments.forEach(comment => this.comments.set(comment.id, comment))
  }

  // Community methods
  getCommunities(): Community[] {
    return Array.from(this.communities.values()).sort((a, b) => b.memberCount - a.memberCount)
  }

  getCommunity(id: string): Community | null {
    return this.communities.get(id) || null
  }

  createCommunity(data: CreateCommunity, userId: string, userName: string): Community {
    const id = data.name.toLowerCase()
    
    if (this.communities.has(id)) {
      throw new Error('Community already exists')
    }

    const community: Community = {
      id,
      name: data.name.toLowerCase(),
      displayName: data.displayName,
      description: data.description,
      createdAt: new Date().toISOString(),
      createdBy: userId,
      memberCount: 1,
      isOfficial: false,
      category: data.category
    }

    this.communities.set(id, community)
    return community
  }

  searchCommunities(query: string): Community[] {
    const searchTerm = query.toLowerCase()
    return Array.from(this.communities.values())
      .filter(community => 
        community.name.includes(searchTerm) || 
        community.displayName.toLowerCase().includes(searchTerm) ||
        community.description.toLowerCase().includes(searchTerm)
      )
      .sort((a, b) => b.memberCount - a.memberCount)
  }

  // Post methods
  getPosts(communityId?: string, limit: number = 20, offset: number = 0): Post[] {
    let posts = Array.from(this.posts.values())
    
    if (communityId) {
      posts = posts.filter(post => post.communityId === communityId)
    }
    
    return posts
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(offset, offset + limit)
  }

  getPost(id: string): Post | null {
    return this.posts.get(id) || null
  }

  createPost(data: CreatePost, userId: string, userName: string): Post {
    const community = this.communities.get(data.communityId)
    if (!community) {
      throw new Error('Community not found')
    }

    const id = Date.now().toString()
    const post: Post = {
      id,
      title: data.title,
      content: data.content,
      authorId: userId,
      authorName: userName,
      communityId: data.communityId,
      communityName: community.displayName,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      commentCount: 0,
      isEdited: false,
      tags: data.tags || [],
      modelRating: data.modelRating
    }

    this.posts.set(id, post)
    return post
  }

  votePost(postId: string, userId: string, vote: PostVote): Post {
    const post = this.posts.get(postId)
    if (!post) {
      throw new Error('Post not found')
    }

    // Simple voting logic (in production, you'd want more sophisticated vote tracking)
    if (vote === 'up') {
      post.upvotes += 1
    } else {
      post.downvotes += 1
    }

    this.posts.set(postId, post)
    return post
  }

  // Comment methods
  getComments(postId: string): Comment[] {
    return Array.from(this.comments.values())
      .filter(comment => comment.postId === postId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  }

  createComment(data: CreateComment, userId: string, userName: string): Comment {
    const post = this.posts.get(data.postId)
    if (!post) {
      throw new Error('Post not found')
    }

    const id = Date.now().toString()
    const comment: Comment = {
      id,
      content: data.content,
      authorId: userId,
      authorName: userName,
      postId: data.postId,
      parentId: data.parentId,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      isEdited: false
    }

    this.comments.set(id, comment)
    
    // Update post comment count
    post.commentCount += 1
    this.posts.set(data.postId, post)

    return comment
  }
}

// Singleton instance
const forumDataStore = new ForumDataStore()

// Service methods
export class ForumService {
  static getCommunities(): Community[] {
    return forumDataStore.getCommunities()
  }

  static getCommunity(id: string): Community | null {
    return forumDataStore.getCommunity(id)
  }

  static createCommunity(data: CreateCommunity, userId: string = 'anonymous', userName: string = 'Anonymous'): Community {
    return forumDataStore.createCommunity(data, userId, userName)
  }

  static searchCommunities(query: string): Community[] {
    return forumDataStore.searchCommunities(query)
  }

  static getPosts(communityId?: string, limit?: number, offset?: number): Post[] {
    return forumDataStore.getPosts(communityId, limit, offset)
  }

  static getPost(id: string): Post | null {
    return forumDataStore.getPost(id)
  }

  static createPost(data: CreatePost, userId: string = 'anonymous', userName: string = 'Anonymous'): Post {
    return forumDataStore.createPost(data, userId, userName)
  }

  static votePost(postId: string, userId: string, vote: PostVote): Post {
    return forumDataStore.votePost(postId, userId, vote)
  }

  static getComments(postId: string): Comment[] {
    return forumDataStore.getComments(postId)
  }

  static createComment(data: CreateComment, userId: string = 'anonymous', userName: string = 'Anonymous'): Comment {
    return forumDataStore.createComment(data, userId, userName)
  }

  static getPopularCommunities(limit: number = 10): Community[] {
    return forumDataStore.getCommunities().slice(0, limit)
  }

  static getTrendingPosts(limit: number = 10): Post[] {
    return forumDataStore.getPosts()
      .sort((a, b) => (b.upvotes - b.downvotes + b.commentCount) - (a.upvotes - a.downvotes + a.commentCount))
      .slice(0, limit)
  }
}