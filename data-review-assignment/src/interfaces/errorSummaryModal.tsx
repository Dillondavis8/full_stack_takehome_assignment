export default interface ErrorSummaryModalProps {
  isOpen: boolean;
  errors: unknown;
  toggleModal: () => void;
}