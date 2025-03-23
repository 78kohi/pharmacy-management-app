/* eslint-disable react/prop-types */
import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { DropdownMenuItem } from './ui/dropdown-menu'

const DialogItem = ({ children, triggerChildren, triggerClassName, triggerIcon }) => {
  console.log(triggerClassName)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem className={triggerClassName} onSelect={(e) => e.preventDefault()}>
          {triggerIcon}
          {triggerChildren}
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="w-fit">
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default DialogItem