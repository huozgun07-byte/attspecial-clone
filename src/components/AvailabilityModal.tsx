"use client";

import Modal from "./Modal";
import AddressCheckFlow from "./AddressCheckFlow";
import { AddressFormData, AddressFormLabels, defaultAddressFormLabels } from "./AddressForm";
import { AvailabilityResponse } from "@/lib/api";

interface AvailabilityModalProps {
  onClose: () => void;
  /** Identifies which page/modal this submission came from, for the lead record. */
  source: string;
  title?: string;
  submitLabel?: string;
  labels?: AddressFormLabels;
  showUnit?: boolean;
  showMoving?: boolean;
  showHelpText?: boolean;
  /** If the visitor already checked an address elsewhere on this page, skip straight to that result instead of asking again. */
  initialData?: AddressFormData;
  initialResult?: AvailabilityResponse;
  onResult?: (data: AddressFormData, result: AvailabilityResponse) => void;
}

export default function AvailabilityModal({
  onClose,
  source,
  title = "Check For Deals",
  submitLabel = "Shop Plans",
  labels = defaultAddressFormLabels,
  showUnit = true,
  showMoving = true,
  showHelpText = false,
  initialData,
  initialResult,
  onResult,
}: AvailabilityModalProps) {
  return (
    <Modal onClose={onClose} title={title}>
      <AddressCheckFlow
        idPrefix="modal"
        source={source}
        submitLabel={submitLabel}
        labels={labels}
        showUnit={showUnit}
        showMoving={showMoving}
        showHelpText={showHelpText}
        initialData={initialData}
        initialResult={initialResult}
        onResult={onResult}
      />
    </Modal>
  );
}
