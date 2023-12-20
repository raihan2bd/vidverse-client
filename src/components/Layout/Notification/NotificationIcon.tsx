"use client"

import Button from "@/components/UI/Button"
import { useGlobalState } from "@/context/store"
import { useState } from "react"
import { IoMdNotifications } from "react-icons/io";

const API_URL = process.env.NEXT_PUBLIC_SOCKET_API
const NotificationIcon = () => {
  const {notifications} = useGlobalState()
  const [showNotification, setShowNotification] = useState(false)
  

  const spinner = <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>

  return (
    <div className="relative p-2 flex justify-center items-center">
      {notifications ? <Button
      type="button"
        className="block rounded-full overflow-hidden focus:outline-none text-2xl"
        onClick={() => setShowNotification(!showNotification)}>
          <IoMdNotifications />
        </Button>: spinner}
      </div>
  )
}

export default NotificationIcon