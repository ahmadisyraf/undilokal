import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Image,
  Box,
  Skeleton,
  AspectRatio,
} from "@chakra-ui/react";

export default function ImageModal({ open, setOpen, image }) {
  return (
    <Modal onClose={() => setOpen(false)} size={"full"} isOpen={open}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box borderRadius={15} overflow={"hidden"} position={"fit-content"}>
            <Image
              src={image}
              fit={"contain"}
              fallback={<Skeleton height={450 * (2 / 3)} width="100%" />}
              loading="lazy"
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
