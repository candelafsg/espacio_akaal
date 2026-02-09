import {
  Dialog,
  DialogPanel
} from '@headlessui/react'

export function OverlayModal({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onClose={onClose} className="overlay-elegante">
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel 
          className="overlay-content"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  )
}
