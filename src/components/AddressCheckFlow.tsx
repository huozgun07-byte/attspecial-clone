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
}

export default function AddressCheckFlow({
  source,
  idPrefix = "address",
  submitLabel = "Shop internet",
  labels = defaultAddressFormLabels,
  showUnit = true,
  showMoving = true,
  showHelpText = true,
}: AddressCheckFlowProps) {
  const [state, setState] = useState<FlowState>({ status: "form" });

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
      setState({ status: "result", result });
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
        <div
          className={`rounded-lg p-4 text-sm border ${
            result.available
              ? "bg-green-50 text-green-800 border-green-200"
              : "bg-amber-50 text-amber-800 border-amber-200"
          }`}
          role="status"
        >
          {result.message}
        </div>
        {result.available && result.plans.length > 0 && (
          <ul className="space-y-2 text-sm text-gray-700" role="list">
            {result.plans.map((plan) => (
              <li key={plan.name} className="flex justify-between border-b border-gray-100 pb-2">
                <span>
                  {plan.name} — {plan.speed}
                </span>
                <span className="font-semibold">${plan.price}/mo*</span>
              </li>
            ))}
          </ul>
        )}
        <button
          type="button"
          onClick={() => setState({ status: "form" })}
          className="text-blue-700 text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
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
        <p className="text-sm text-red-600" role="alert">
          {state.message}
        </p>
      )}
    </div>
  );
}
