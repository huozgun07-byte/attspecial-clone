"use client";

import { useState, FormEvent } from "react";

export interface AddressFormData {
  street: string;
  unit: string;
  zip: string;
  moving: boolean;
  /** Honeypot field — real visitors leave this blank. */
  website: string;
}

export interface AddressFormLabels {
  street: string;
  streetPlaceholder: string;
  streetHelp?: string;
  unit: string;
  unitPlaceholder: string;
  zip: string;
  zipPlaceholder: string;
  zipHelp?: string;
  moving: string;
}

export const defaultAddressFormLabels: AddressFormLabels = {
  street: "Street Address*",
  streetPlaceholder: "35 Magnolia RD",
  streetHelp: "Please provide a street address (e.g. 35 Magnolia RD).",
  unit: "Apt/Unit",
  unitPlaceholder: "Apt, Suite, Unit (optional)",
  zip: "Zip Code*",
  zipPlaceholder: "23225",
  zipHelp: "Please provide a valid zip code (e.g. 23225).",
  moving: "I'm moving to this address",
};

export const espanolAddressFormLabels: AddressFormLabels = {
  street: "Dirección*",
  streetPlaceholder: "Calle Principal 123",
  unit: "Apto/Unidad",
  unitPlaceholder: "Apto, Suite, Unidad (opcional)",
  zip: "Código Postal*",
  zipPlaceholder: "23225",
  moving: "Me estoy mudando a esta dirección",
};

interface AddressFormProps {
  idPrefix?: string;
  submitLabel?: string;
  onSubmit?: (data: AddressFormData) => void;
  labels?: AddressFormLabels;
  showUnit?: boolean;
  showMoving?: boolean;
  showHelpText?: boolean;
  /** Disables all fields and the submit button, e.g. while a request is in flight. */
  disabled?: boolean;
}

export default function AddressForm({
  idPrefix = "address",
  submitLabel = "Shop internet",
  onSubmit,
  labels = defaultAddressFormLabels,
  showUnit = true,
  showMoving = true,
  showHelpText = true,
  disabled = false,
}: AddressFormProps) {
  const [street, setStreet] = useState("");
  const [unit, setUnit] = useState("");
  const [zip, setZip] = useState("");
  const [moving, setMoving] = useState(true);
  const [website, setWebsite] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    onSubmit?.({ street, unit, zip, moving, website });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Honeypot: hidden from sighted users and screen readers, but visible to most bots. */}
      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${idPrefix}-website`}>Website</label>
        <input
          type="text"
          id={`${idPrefix}-website`}
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor={`${idPrefix}-street`} className="block text-sm font-medium text-gray-700 mb-1">
          {labels.street}
        </label>
        <input
          type="text"
          id={`${idPrefix}-street`}
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          placeholder={labels.streetPlaceholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-gray-100 disabled:text-gray-400"
          required
          autoComplete="street-address"
          disabled={disabled}
        />
        {showHelpText && labels.streetHelp && (
          <p className="text-xs text-gray-500 mt-1">{labels.streetHelp}</p>
        )}
      </div>

      {showUnit && (
        <div>
          <label htmlFor={`${idPrefix}-unit`} className="block text-sm font-medium text-gray-700 mb-1">
            {labels.unit}
          </label>
          <input
            type="text"
            id={`${idPrefix}-unit`}
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder={labels.unitPlaceholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-gray-100 disabled:text-gray-400"
            autoComplete="address-line2"
            disabled={disabled}
          />
        </div>
      )}

      <div>
        <label htmlFor={`${idPrefix}-zip`} className="block text-sm font-medium text-gray-700 mb-1">
          {labels.zip}
        </label>
        <input
          type="text"
          id={`${idPrefix}-zip`}
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder={labels.zipPlaceholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-gray-100 disabled:text-gray-400"
          required
          autoComplete="postal-code"
          disabled={disabled}
        />
        {showHelpText && labels.zipHelp && (
          <p className="text-xs text-gray-500 mt-1">{labels.zipHelp}</p>
        )}
      </div>

      {showMoving && (
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={moving}
            onChange={(e) => setMoving(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            disabled={disabled}
          />
          {labels.moving}
        </label>
      )}

      <button
        type="submit"
        disabled={disabled}
        className="w-full bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitLabel}
      </button>
    </form>
  );
}
