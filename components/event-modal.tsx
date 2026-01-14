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

interface EventModalProps {
  date: Date
  event?: {
    _id: Id<"customEvents">
    title: string
    description?: string
    gregorianDate: string
    eventType: string
    // Add other fields if needed
  }
  onClose: () => void
}

export function EventModal({ date, event, onClose }: EventModalProps) {
  const { t } = useCultural()
  const [eventType, setEventType] = useState(event?.eventType || "cultural")
  const [title, setTitle] = useState(event?.title || "")
  const [description, setDescription] = useState(event?.description || "")
  const [time, setTime] = useState("")
  const [location, setLocation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const createEvent = useMutation(api.events.createEvent)
  const updateEvent = useMutation(api.events.updateEvent)
  const deleteEvent = useMutation(api.events.deleteEvent)

  useEffect(() => {
    if (event) {
      setTitle(event.title)
      setDescription(event.description || "")
      setEventType(event.eventType)
    }
  }, [event])

  const handleSave = async () => {
    if (!title) return
    
    setIsLoading(true)
    try {
      if (event) {
        await updateEvent({
          id: event._id,
          title,
          description,
          gregorianDate: date.toISOString().split('T')[0],
          eventType,
        })
      } else {
        await createEvent({
          title,
          description,
          gregorianDate: date.toISOString().split('T')[0], // YYYY-MM-DD
          eventType,
          // We could calculate Kaltirsi date here or let backend/engine handle it
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
      await deleteEvent({ id: event._id })
      onClose()
    } catch (error) {
      console.error("Failed to delete event:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">{event ? "Edit Event" : "Create Event"}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Form */}
        <div className="p-4 space-y-4">
          <div>
            <Input 
              placeholder="Event title" 
              className="text-lg font-medium"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              {date.toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-600" />
              <Input 
                type="time" 
                className="text-sm"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger>
                <SelectValue placeholder="Event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cultural">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded"></div>
                    Cultural Event
                  </div>
                </SelectItem>
                <SelectItem value="agricultural">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    Agricultural Activity
                  </div>
                </SelectItem>
                <SelectItem value="astronomical">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded"></div>
                    Astronomical Event
                  </div>
                </SelectItem>
                <SelectItem value="holiday">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    Holiday
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Textarea 
              placeholder="Description" 
              rows={3} 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-600" />
            <Input 
              placeholder="Location" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {eventType === "cultural" && (
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">Cultural Context</span>
              </div>
              <p className="text-xs text-orange-700">
                This event will be added to the traditional Somali cultural calendar and may include oral traditions,
                proverbs, and seasonal significance.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200">
          <div>
            {event && (
              <Button 
                variant="ghost" 
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={handleDelete}
                disabled={isDeleting || isLoading}
              >
                {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} disabled={isLoading || isDeleting}>
              Cancel
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700" 
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
