"use client"

import Link from "next/link"
import { useEffect } from "react"
import { FiPrinter, FiX } from "react-icons/fi"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handlePrint = () => {
    onClose()
    window.print()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white z-50 md:hidden">
      <div className="flex flex-col h-full p-6">
        <div className="flex justify-end mb-8">
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100" aria-label="Close menu">
            <FiX size={24} />
          </button>
        </div>

        <nav className="flex flex-col space-y-6 text-center">
          <Link href="#summary" className="text-lg font-medium py-2 hover:text-gray-600" onClick={onClose}>
            Summary
          </Link>
          <Link href="#experience" className="text-lg font-medium py-2 hover:text-gray-600" onClick={onClose}>
            Experience
          </Link>
          <Link href="#skills" className="text-lg font-medium py-2 hover:text-gray-600" onClick={onClose}>
            Skills
          </Link>
          <Link href="#languages" className="text-lg font-medium py-2 hover:text-gray-600" onClick={onClose}>
            Languages
          </Link>
          <Link href="#education" className="text-lg font-medium py-2 hover:text-gray-600" onClick={onClose}>
            Education
          </Link>
          <Link href="#certifications" className="text-lg font-medium py-2 hover:text-gray-600" onClick={onClose}>
            Certifications
          </Link>
          <Link href="#contact" className="text-lg font-medium py-2 hover:text-gray-600" onClick={onClose}>
            Contact
          </Link>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center text-lg font-medium py-2 hover:text-gray-600 mt-4"
          >
            <FiPrinter size={18} className="mr-2" />
            Print CV
          </button>
        </nav>
      </div>
    </div>
  )
}
