"use client";

import Modal from "./Modal";
import AddressCheckFlow from "./AddressCheckFlow";
import { AddressFormLabels, defaultAddressFormLabels } from "./AddressForm";

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
      />
    </Modal>
  );
}
