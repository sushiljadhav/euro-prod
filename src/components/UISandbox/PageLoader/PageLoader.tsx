import React, { useEffect, useState } from "react"

import { Modal, ModalContent, Spinner } from "@nextui-org/react"

// import ButtonManger from "../Button/ButtonManager"
// import ButtonUI from "../Button/ButtonUI"
import { type ModalWithSingleButtonProps } from "@/src/model/IModalBehavior"

const PageLoader: React.FC<ModalWithSingleButtonProps> = ({
  classNames = {
    backdrop: "",
    base: "",
    body: "",
    footer: "",
    header: "",
    wrapper: "",
    closeButton: "",
  },
  size = "full",
  radiusModal,
  shadow,
  backdrop,
  scrollBehavior,
  placement,
  isModalOpen = false,
  defaultOpen,
  isDismissable,
  hideCloseButton = false,
  modalBodyText = "Default Text",
  actionButtonProps = {
    type: "default",
    color: "primary",
    className: "bottom-0 mx-auto mt-[30px] w-full max-w-48 text-white",
  },
}) => {
  const [open, setOpen] = useState(isModalOpen)

  useEffect(() => {
    setOpen(isModalOpen)
  }, [isModalOpen])

  const combinedClassNames = [
    "min-h-48",
    "pb-[62px]",
    "pt-[72px]",
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
      onClose={() => {
        setOpen(false)
      }}
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
        {(onClose) => <Spinner size="lg" color="primary" label="loading..." />}
      </ModalContent>
    </Modal>
  )
}

export default PageLoader
