"use client";

import { useState } from "react";
import AddressForm, { AddressFormData, AddressFormLabels, defaultAddressFormLabels } from "./AddressForm";
import { checkAvailability, submitLead, AvailabilityResponse, ApiError } from "@/lib/api";

type FlowState =
  | { status: "form" }
  | { status: "submitting" }
  | { status: "result"; result: AvailabilityResponse }
  | { status: "error"; message: string };

interface AddressCheckFlowProps {
  /** Identifies which page/form this submission came from, for the lead record. */
  source: string;
  idPrefix?: string;
  submitLabel?: string;
  labels?: AddressFormLabels;
  showUnit?: boolean;
  showMoving?: boolean;
  showHelpText?: boolean;
  /** If the visitor already checked an address elsewhere on this page, skip straight to that result instead of asking again. */
  initialData?: AddressFormData;
  initialResult?: AvailabilityResponse;
  /** Called after a successful check so a parent page can reuse the address/result in other forms on the same page. */
  onResult?: (data: AddressFormData, result: AvailabilityResponse) => void;
}

export default function AddressCheckFlow({
  source,
  idPrefix = "address",
  submitLabel = "Shop internet",
  labels = defaultAddressFormLabels,
  showUnit = true,
  showMoving = true,
  showHelpText = true,
  initialData,
  initialResult,
  onResult,
}: AddressCheckFlowProps) {
  const [state, setState] = useState<FlowState>(() =>
    initialResult ? { status: "result", result: initialResult } : { status: "form" }
  );
  const [checkedAddress, setCheckedAddress] = useState<AddressFormData | undefined>(initialData);

  const handleSubmit = async (data: AddressFormData) => {
    setState({ status: "submitting" });
    try {
      const result = await checkAvailability(data);
      try {
        await submitLead({ ...data, source, available: result.available });
      } catch (leadError) {
        // The visitor already has their availability answer; don't block on lead delivery issues.
        console.error("Lead submission failed:", leadError);
      }
      setCheckedAddress(data);
      setState({ status: "result", result });
      onResult?.(data, result);
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof ApiError ? err.message : "Something went wrong. Please try again or call us.",
      });
    }
  };

  if (state.status === "result") {
    const { result } = state;
    return (
      <div className="space-y-4">
        {checkedAddress?.street && (
          <p className="text-xs text-att-gray-500">
            Showing results for <span className="font-medium text-att-gray-700">{checkedAddress.street}{checkedAddress.zip ? `, ${checkedAddress.zip}` : ""}</span>.
          </p>
        )}
        <div
          className={`rounded-lg p-4 text-sm border ${
            result.available
              ? "bg-white text-att-ink border-att-gray-300"
              : "bg-white text-att-ink border-att-gray-300"
          }`}
          role="status"
        >
          {result.message}
        </div>
        {result.available && result.plans.length > 0 && (
          <ul className="space-y-2 text-sm text-att-gray-700" role="list">
            {result.plans.map((plan) => (
              <li key={plan.name} className="flex justify-between border-b border-att-gray-200 pb-2">
                <span>
                  {plan.name} — {plan.speed}
                </span>
                <span className="font-bold">${plan.price}/mo*</span>
              </li>
            ))}
          </ul>
        )}
        <button
          type="button"
          onClick={() => setState({ status: "form" })}
          className="text-att-navy text-sm font-bold underline underline-offset-2 hover:text-att-navy-dark focus:outline-none focus:ring-2 focus:ring-att-cyan rounded"
        >
          Check a different address
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AddressForm
        idPrefix={idPrefix}
        submitLabel={state.status === "submitting" ? "Checking availability…" : submitLabel}
        labels={labels}
        showUnit={showUnit}
        showMoving={showMoving}
        showHelpText={showHelpText}
        disabled={state.status === "submitting"}
        onSubmit={handleSubmit}
      />
      {state.status === "error" && (
        <p className="text-sm text-red-700" role="alert">
          {state.message}
        </p>
      )}
    </div>
  );
}
