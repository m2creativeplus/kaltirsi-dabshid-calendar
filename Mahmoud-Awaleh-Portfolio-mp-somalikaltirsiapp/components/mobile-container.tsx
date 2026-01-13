import type React from "react"

export default function MobileContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950 dark:via-orange-950 dark:to-red-950">
      <div className="max-w-md mx-auto min-h-screen bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-x border-amber-200/50 dark:border-amber-800/50">
        {children}
      </div>
    </div>
  )
}
