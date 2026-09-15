"use client";

import { ReactNode, useState } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  title: string;
  large?: boolean;
}

export default function Modal({ children, onClose, title, large = false }: ModalProps) {
  const [closing, setClosing] = useState(false);
  /** Plays the exit animation, then lets the parent unmount us. */
  const close = () => {
    setClosing(true);
    window.setTimeout(onClose, 180);
  };
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`${closing ? "overlay-out" : "overlay-in"} fixed inset-0 bg-black/50 backdrop-blur-sm`}
          onClick={close}
          aria-hidden="true"
        />
        <div
          className={`${closing ? "panel-out" : "panel-in"} relative w-full ${large ? "max-w-2xl" : "max-w-md"} bg-white rounded-2xl shadow-2xl`}
        >
          <div className="flex items-center justify-between p-4 border-b border-att-gray-200">
            <h3 id="modal-title" className="text-lg font-semibold text-att-gray-900">{title}</h3>
            <button
              onClick={close}
              className="p-1 text-att-gray-400 hover:text-att-gray-600 rounded-lg hover:bg-att-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-att-cyan"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4 max-h-[70vh] overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}