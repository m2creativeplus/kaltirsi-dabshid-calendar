"use client"

import { useState, useEffect } from "react"
import { X, Calendar, Clock, MapPin, Star, Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCultural } from "@/components/cultural-provider"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

import { useAuth } from "@/components/auth-provider"
import { cn } from "@/lib/utils"

interface EventModalProps {
  date: Date
  event?: {
    _id: Id<"events">
    title: string
    description?: string
    startDate: string
    type: string
  }
  onClose: () => void
}

export function EventModal({ date, event, onClose }: EventModalProps) {
  const { t } = useCultural()
  const { token } = useAuth()
  const [eventType, setEventType] = useState(event?.type || "cultural")
  const [title, setTitle] = useState(event?.title || "")
  const [description, setDescription] = useState(event?.description || "")
  const [time, setTime] = useState("")
  const [location, setLocation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [recurrenceRule, setRecurrenceRule] = useState("none")

  const createEvent = useMutation(api.events.createEvent)
  const updateEvent = useMutation(api.events.updateEvent)
  const deleteEvent = useMutation(api.events.deleteEvent)

  useEffect(() => {
    if (event) {
      setTitle(event.title)
      setDescription(event.description || "")
      setEventType(event.type)
    }
  }, [event])

  const handleSave = async () => {
    if (!title) return
    setIsLoading(true)
    try {
      if (event) {
        await updateEvent({
          id: event._id,
          token: token || undefined,
          title,
          description,
          startDate: date.toISOString().split("T")[0],
          type: eventType,
          recurrenceRule: recurrenceRule !== "none" ? recurrenceRule : undefined,
        })
      } else {
        await createEvent({
          token: token || undefined,
          title,
          description,
          startDate: date.toISOString().split("T")[0],
          type: eventType,
          recurrenceRule: recurrenceRule !== "none" ? recurrenceRule : undefined,
        })
      }
      onClose()
    } catch (error) {
      console.error("Failed to save event:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!event) return
    if (!confirm("Are you sure you want to delete this event?")) return

    setIsDeleting(true)
    try {
      await deleteEvent({ id: event._id, token: token || undefined })
      onClose()
    } catch (error) {
      console.error("Failed to delete event:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="glass rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 duration-200 overflow-hidden border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border/20 bg-muted/20">
          <div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
              {event ? "Edit Event" : "Create Event"}
            </h2>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Kaltirsi Registry</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Form */}
        <div className="p-5 space-y-5">
          <div>
            <Input
              placeholder="Event title"
              className="text-lg font-medium bg-white/5 border-white/10 focus-visible:ring-primary h-12"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm text-foreground/80 glass-subtle px-3 rounded-lg h-10 border border-white/5">
              <Calendar className="h-4 w-4 text-primary" />
              {date.toLocaleDateString()}
            </div>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="time"
                className="pl-9 text-sm bg-white/5 border-white/10 h-10"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue placeholder="Event type" />
              </SelectTrigger>
              <SelectContent className="glass">
                <SelectItem value="cultural">
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-sm" />Cultural Event</div>
                </SelectItem>
                <SelectItem value="agricultural">
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-gradient-to-br from-emerald-400 to-green-600 rounded-sm" />Agricultural</div>
                </SelectItem>
                <SelectItem value="astronomical">
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-gradient-to-br from-violet-400 to-purple-600 rounded-sm" />Astronomical</div>
                </SelectItem>
                <SelectItem value="holiday">
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-gradient-to-br from-red-400 to-rose-600 rounded-sm" />Holiday</div>
                </SelectItem>
                <SelectItem value="national">
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-[#1EB53A] rounded-sm" />National</div>
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={recurrenceRule} onValueChange={setRecurrenceRule}>
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue placeholder="Recurrence" />
              </SelectTrigger>
              <SelectContent className="glass">
                <SelectItem value="none">Does not repeat</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Location"
              className="pl-9 bg-white/5 border-white/10"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div>
            <Textarea
              placeholder="Description"
              rows={3}
              className="bg-white/5 border-white/10 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {eventType === "cultural" && (
            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500/30" />
                <span className="text-sm font-semibold text-amber-500">Cultural Context</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                This event will be added to the traditional Somali cultural calendar and may include oral traditions, proverbs, and seasonal significance.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-5 border-t border-border/20 bg-muted/20">
          <div>
            {event && (
              <Button
                variant="ghost"
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-10 w-10 p-0 rounded-full"
                onClick={handleDelete}
                disabled={isDeleting || isLoading}
              >
                {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={onClose} disabled={isLoading || isDeleting} className="hover:bg-white/10 text-muted-foreground">
              Cancel
            </Button>
            <Button
              className={cn(
                "font-semibold text-white shadow-lg border-0 transition-all",
                !title ? "bg-muted text-muted-foreground" : "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-amber-500/25"
              )}
              onClick={handleSave}
              disabled={isLoading || isDeleting || !title}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {event ? "Update Event" : "Save Event"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
