"use client"

import React, { useEffect, useState } from "react"

import { Modal, ModalContent, ModalBody, ModalFooter } from "@nextui-org/react"

import { type ModalWithTwoButtonProps } from "../../../model/IModalBehavior"
import ButtonManger from "../Button/ButtonManager"
import ButtonUI from "../Button/ButtonUI"

const ModalWithTwoButton: React.FC<ModalWithTwoButtonProps> = ({
  classNames = {},
  size,
  shadow,
  backdrop,
  scrollBehavior,
  placement,
  isModalOpen = true,
  defaultOpen,
  isDismissable,
  hideCloseButton = false,
  modalBodyText = "Default Text",
  radiusModal,
  children,
  closeButtonProps = {
    size: "md",
    variant: "solid",
    color: "danger",
    children: "Close",
    onClick: undefined,
  },
  actionButtonProps = {
    size: "lg",
    color: "success",
    children: "Done",
    onClick: undefined,
  },
  onModalClose,
}) => {
  const [open, setOpen] = useState(isModalOpen)

  const buttonManager = new ButtonManger()

  const buttonCloseHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    buttonManager.handleCloseButtonClick()
    setOpen(false)
    if (onModalClose !== undefined) onModalClose(false)
    if (closeButtonProps.onClick != null) void closeButtonProps.onClick(event)
  }

  const buttonActionHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    buttonManager.handleActionButtonClick()
    setOpen(false)
    if (onModalClose !== undefined) onModalClose(false)
    if (actionButtonProps.onClick != null) void actionButtonProps.onClick(event)
  }

  const handleModalClose = (): void => {
    setOpen(false)
    if (onModalClose !== undefined) onModalClose(false)
  }

  useEffect(() => {
    setOpen(isModalOpen)
  }, [isModalOpen])

  const combinedClassNames = [
    "min-h-48",
    "pt-10",
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
      onClose={handleModalClose}
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
        {(onClose) => (
          <>
            <ModalBody className="items-center pb-0">{children}</ModalBody>
            <ModalFooter className="justify-center">
              <ButtonUI
                color={closeButtonProps.color}
                onClick={buttonCloseHandler}
                {...closeButtonProps}
                size={closeButtonProps.size}
                variant={closeButtonProps.variant}
              >
                {closeButtonProps.children}
              </ButtonUI>
              <ButtonUI
                color={actionButtonProps.color}
                onClick={buttonActionHandler}
                {...actionButtonProps}
                size={actionButtonProps.size}
                variant={actionButtonProps.variant}
              >
                {actionButtonProps.children}
              </ButtonUI>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
export default ModalWithTwoButton
