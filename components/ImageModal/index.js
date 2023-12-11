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
          <Box pb={5} borderRadius={15} overflow={"hidden"}>
            <AspectRatio ratio={3 / 2} borderRadius={15} overflow={"hidden"}>
              <Image
                src={image}
                fit={"contain"}
                fallback={<Skeleton height={450 * (2 / 3)} width="100%" />}
                loading="lazy"
              />
            </AspectRatio>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
