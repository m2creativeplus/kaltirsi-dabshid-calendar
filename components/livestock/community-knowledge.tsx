"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Archive, MessageSquare, ThumbsUp, Share2 } from "lucide-react"

export function CommunityKnowledge() {
  const posts = [
    {
      author: "Oday Xasan",
      title: "Reading the stars for Gu' rains",
      content: "The appearance of 'Cirir' suggests we might have early rains this season. Prepare the water catchments.",
      likes: 24,
      comments: 5
    },
    {
      author: "Amina Gedi",
      title: "Treating camel tick fever (Kud)",
      content: "I have found that traditional herbal mixture X works better than the new medicine for preventing Kud in calves.",
      likes: 42,
      comments: 12
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {posts.map((post, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{post.title}</CardTitle>
                <CardDescription>Posted by {post.author}</CardDescription>
              </div>
              <Archive className="h-5 w-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <div className="flex gap-4 text-sm text-gray-500">
              <button className="flex items-center gap-1 hover:text-blue-600">
                <ThumbsUp className="h-4 w-4" /> {post.likes}
              </button>
              <button className="flex items-center gap-1 hover:text-blue-600">
                <MessageSquare className="h-4 w-4" /> {post.comments}
              </button>
              <button className="flex items-center gap-1 hover:text-blue-600">
                <Share2 className="h-4 w-4" /> Share
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
