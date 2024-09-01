/* eslint-disable react/jsx-no-useless-fragment */
import React from "react"

import { Modal, ModalContent } from "@nextui-org/react"

interface Props extends React.HTMLProps<HTMLDivElement> {
  isModalOpen: boolean
  onOpenChange: (open: boolean) => void
}

const CustomDrawer: React.FC<Props> = ({ isModalOpen, ...props }) => {
  return (
    <Modal
      scrollBehavior="inside"
      isOpen={isModalOpen}
      onOpenChange={props.onOpenChange}
      placement="center"
      backdrop="opaque"
      size="full"
      classNames={{
        wrapper: "flex justify-end",
      }}
      motionProps={{
        variants: {
          enter: {
            x: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            x: 50,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
      className="h-[calc(100dvh)] max-h-screen w-full  max-w-sm rounded-md p-5 lg:max-w-[600px]"
    >
      <ModalContent>{(onClose) => <>{props.children}</>}</ModalContent>
    </Modal>
  )
}

export default CustomDrawer
