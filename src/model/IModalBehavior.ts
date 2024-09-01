import { type ModalProps, type ButtonProps } from "@nextui-org/react"

import { type IButtonBehavior } from "./IButtonBehavior"

export { type ModalProps } from "@nextui-org/react"

type ModalClassNames = ModalProps["classNames"]
type ModalSize = ModalProps["size"]
export type ModalRadius = ModalProps["radius"]
type ModalShadow = ModalProps["shadow"]
type ModalBackdrop = ModalProps["backdrop"]
type ModalScrollBehavior = ModalProps["scrollBehavior"]
type ModalPlacement = ModalProps["placement"]
type ModalIsOpen = ModalProps["isOpen"]
type ModalDefaultOpen = ModalProps["defaultOpen"]
type ModalIsDismissable = ModalProps["isDismissable"]
type ModalHideCloseButton = ModalProps["hideCloseButton"]
type ModalChildren = ModalProps["children"]

export interface IModal {
  classNames?: ModalClassNames
  size?: ModalSize
  radiusModal?: ModalRadius
  shadow?: ModalShadow
  backdrop?: ModalBackdrop
  scrollBehavior?: ModalScrollBehavior
  placement?: ModalPlacement
  isModalOpen?: ModalIsOpen
  defaultOpen?: ModalDefaultOpen
  isDismissable?: ModalIsDismissable
  hideCloseButton?: ModalHideCloseButton
  children?: ModalChildren
  modalBodyText?: string
  onModalClose?: (boolean) => void
}

export interface ModalWithTwoButtonProps extends IModal {
  closeButtonProps?: IButtonBehavior
  actionButtonProps?: IButtonBehavior
  modalSize?: ModalSize // Use modalSize for the modal
  buttonSize?: ButtonProps["size"] // Use buttonSize for buttons
}

export interface ModalWithSingleButtonProps extends IModal {
  actionButtonProps?: IButtonBehavior
}
