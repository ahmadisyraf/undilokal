import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  ModalFooter,
} from "@chakra-ui/react";

export default function ReportModal({ isOpen, handleClose }) {

  const handleSubmitReport = async () => {
    const addReport = await fetch("/api/path", {
      method: "POST"
    })
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Laporkan siaran?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <b>Perhatian!</b> Sistem ini secara automatik akan memadam siaran apabila menerima lebih dari 20 laporan siaran.
        </ModalBody>
        <ModalFooter>
          <Button variant={"outline"} onClick={handleClose} size={"sm"} mr={2}>
            Batal
          </Button>
          <Button colorScheme="blue" size={"sm"}>
            Teruskan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
