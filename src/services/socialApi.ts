import type { EngagementMetrics, PostAnalytics, SocialPost } from '@/types/social'

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export async function simulatePost(
  post: SocialPost,
): Promise<{ success: boolean; facebookPostId?: string; instagramPostId?: string }> {
  return new Promise((resolve) => {
    const delay = randomInt(800, 2500)
    setTimeout(() => {
      const success = Math.random() > 0.08
      if (!success) {
        resolve({ success: false })
        return
      }
      const result: { success: boolean; facebookPostId?: string; instagramPostId?: string } = {
        success: true,
      }
      if (post.platform === 'facebook' || post.platform === 'both') {
        result.facebookPostId = `fb_${Date.now()}_${randomInt(10000, 99999)}`
      }
      if (post.platform === 'instagram' || post.platform === 'both') {
        result.instagramPostId = `ig_${Date.now()}_${randomInt(10000, 99999)}`
      }
      resolve(result)
    }, delay)
  })
}

export async function simulateMetrics(postId: string, days: number = 7): Promise<PostAnalytics> {
  return new Promise((resolve) => {
    const delay = randomInt(300, 1000)
    setTimeout(() => {
      const metrics: EngagementMetrics[] = []
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        metrics.push({
          reach: randomInt(50, 500),
          impressions: randomInt(100, 1200),
          likes: randomInt(5, 80),
          comments: randomInt(0, 25),
          shares: randomInt(0, 30),
          date: date.toISOString().split('T')[0] ?? '',
        })
      }
      resolve({ postId, metrics })
    }, delay)
  })
}

export async function simulateOAuth(): Promise<{
  success: boolean
  pageId?: string
  pageName?: string
  accessToken?: string
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        pageId: `page_${randomInt(100000, 999999)}`,
        pageName: 'NEKO Store',
        accessToken: `mock_token_${Date.now()}`,
      })
    }, 1500)
  })
}

export function computeEngagementSummary(allAnalytics: PostAnalytics[]): {
  totalReach: number
  totalImpressions: number
  totalInteractions: number
  engagementRate: string
  bestTime: string
  topPosts: { postId: string; reach: number }[]
} {
  let totalReach = 0
  let totalImpressions = 0
  let totalInteractions = 0
  const postSummaries: { postId: string; reach: number }[] = []

  for (const pa of allAnalytics) {
    for (const m of pa.metrics) {
      totalReach += m.reach
      totalImpressions += m.impressions
      totalInteractions += m.likes + m.comments + m.shares
    }
    const lastMetrics = pa.metrics[pa.metrics.length - 1]
    if (lastMetrics) {
      postSummaries.push({ postId: pa.postId, reach: lastMetrics.reach })
    }
  }

  const rate =
    totalImpressions > 0 ? ((totalInteractions / totalImpressions) * 100).toFixed(1) : '0.0'

  postSummaries.sort((a, b) => b.reach - a.reach)

  return {
    totalReach,
    totalImpressions,
    totalInteractions,
    engagementRate: rate,
    bestTime: '6PM - 8PM CST',
    topPosts: postSummaries.slice(0, 5),
  }
}
