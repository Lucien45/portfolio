"use client"
import React from "react"
import { GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import * as ResizablePrimitive from "react-resizable-panels"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const P = ResizablePrimitive as unknown as Record<string, any>

const PanelGroupComp =
  P["PanelGroup"] ?? P["Group"] ?? null

const PanelResizeHandleComp =
  P["PanelResizeHandle"] ?? P["ResizeHandle"] ?? null

const ResizablePanelGroup: React.FC<{
  className?: string
  direction?: "horizontal" | "vertical"
  id?: string
  autoSaveId?: string
  onLayout?: (sizes: number[]) => void
  children?: React.ReactNode
  [key: string]: unknown
}> = ({ className, ...props }) => {
  if (!PanelGroupComp) throw new Error("PanelGroup not found in react-resizable-panels")
  return (
    <PanelGroupComp
      className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
      {...props}
    />
  )
}

const ResizablePanel = P["Panel"] ?? P["default"]?.Panel

const ResizableHandle: React.FC<{
  className?: string
  withHandle?: boolean
  id?: string
  disabled?: boolean
  onDragging?: (isDragging: boolean) => void
  children?: React.ReactNode
  [key: string]: unknown
}> = ({ withHandle, className, ...props }) => {
  if (!PanelResizeHandleComp) throw new Error("PanelResizeHandle not found in react-resizable-panels")
  return (
    <PanelResizeHandleComp
      className={cn(
        "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
          <GripVertical className="h-2.5 w-2.5" />
        </div>
      )}
    </PanelResizeHandleComp>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }