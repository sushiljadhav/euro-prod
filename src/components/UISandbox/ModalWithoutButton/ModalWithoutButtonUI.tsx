"use client"

import React, { useEffect, useState } from "react"

import { Modal, ModalContent, ModalBody } from "@nextui-org/react"

import { type IModal } from "@/src/model/IModalBehavior"

const ModalWithoutButtonUI: React.FC<IModal> = ({
  children,
  classNames = {
    backdrop: "",
    base: "",
    body: "",
    footer: "",
    header: "",
    wrapper: "",
    closeButton: "",
  },
  size,
  radiusModal,
  shadow,
  backdrop,
  scrollBehavior,
  placement,
  isModalOpen = true,
  defaultOpen,
  isDismissable,
  hideCloseButton = true,
  onModalClose,
  modalBodyText = "Default Text",
}) => {
  const [open, setOpen] = useState(isModalOpen)

  useEffect(() => {
    setOpen(isModalOpen)
  }, [isModalOpen])

  const modalCloseHandler = (): void => {
    setOpen(false)
    if (onModalClose !== undefined) {
      onModalClose(false)
    }
  }

  const combinedClassNames = [
    "min-h-48",
    "pb-[10px]",
    "pt-10px]",
    "shadow-combined",
    classNames.backdrop,
    classNames.base,
    classNames.body,
    classNames.footer,
    classNames.header,
    classNames.wrapper,
    classNames.closeButton,
  ]
    .filter(Boolean) // Remove any undefined or empty values
    .join(" ")

  return (
    <Modal
      isOpen={open}
      onClose={modalCloseHandler}
      hideCloseButton={hideCloseButton}
      defaultOpen={defaultOpen}
      isDismissable={isDismissable}
      placement={placement}
      scrollBehavior={scrollBehavior}
      backdrop={backdrop}
      shadow={shadow}
      radius={radiusModal}
      size={size}
      className={combinedClassNames}
    >
      <ModalContent>
        <ModalBody className="items-center">{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalWithoutButtonUI
