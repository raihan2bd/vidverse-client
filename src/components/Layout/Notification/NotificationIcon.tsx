"use client"

import { useEffect, useState } from "react"
import ReconnectingWebSocket from "reconnecting-websocket"

const API_URL = process.env.NEXT_PUBLIC_SOCKET_API
const NotificationIcon = () => {
  const [showNotification, setShowNotification] = useState(false)
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState<[]>([])
  const [err, setErr] = useState<null | string>(null)

  useEffect(() => {

    const socket = new ReconnectingWebSocket(`ws://${API_URL}/api/v1/ws`, [], {
      debug: true,
      connectionTimeout: 3000,
      maxRetries: 5,
    })

    socket.onopen = () => {
      console.log("[open] Connection established")
    }
    socket.onmessage = (msg:any) => {
      console.log("Incoming message:")
      const event = JSON.parse(msg.data)
      console.log(event.data)
    }

  }, [])

  const spinner = <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>

  return <div>{spinner}</div>
}

export default NotificationIcon