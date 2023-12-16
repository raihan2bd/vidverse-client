"use client"

import { useGlobalState } from "@/context/store"
import { useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_SOCKET_API
const NotificationIcon = () => {
  const notifications = useGlobalState().notifications
  const [showNotification, setShowNotification] = useState(false)
  const [loading, setLoading] = useState(true)

  if (notifications.length > 0) {
    console.log(notifications)
  }

  const spinner = <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>

  return <div>{spinner}</div>
}

export default NotificationIcon