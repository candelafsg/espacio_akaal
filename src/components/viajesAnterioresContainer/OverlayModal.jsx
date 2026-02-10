export function OverlayModal({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return (
    <div className="overlay-elegante" onClick={onClose}>
      <div
        className="overlay-content"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
