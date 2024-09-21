import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface TransferConfirmationModalProps {
  show: boolean;
  handleClose: () => void;
  amount: string;
  recipient: string;
  fromAccount: string;
  frequency?: string;
  startDate?: string;
  endDate?: string;
  onConfirm: () => void; // Add the onConfirm prop to handle transfer logic
}

function TransferConfirmationModal({
  show,
  handleClose,
  amount,
  recipient,
  fromAccount,
  frequency,
  startDate,
  endDate,
  onConfirm,
}: TransferConfirmationModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm transfer details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to transfer <strong>${amount}</strong> from{" "}
          <strong>{fromAccount}</strong> to <strong>{recipient}</strong>?
        </p>

        {frequency && (
          <p>
            Recurring Frequency: <strong>{frequency}</strong>
          </p>
        )}

        {startDate && (
          <p>
            Start Date: <strong>{startDate}</strong>
          </p>
        )}
        {endDate && (
          <p>
            End Date: <strong>{endDate}</strong>
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          style={{
            backgroundColor: "#5E9C96",
            borderColor: "#5E9C96",
            color: "white",
          }}
          onClick={() => {
            // Handle transfer logic here
            onConfirm();
            handleClose();
          }}
        >
          Confirm Transfer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TransferConfirmationModal;
