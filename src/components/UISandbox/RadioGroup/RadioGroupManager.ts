export default class RadioGroupManager {
  /**
   * Handles click events on radio buttons.
   * @param event - The mouse event triggered by clicking a radio button.
   * @returns A boolean indicating whether the click event target is a radio button.
   */
  handleClick(event: React.ChangeEvent<HTMLInputElement>): string | null {
    // Check if the event target is an instance of HTMLInputElement with type 'radio'
    const isRadioButton =
      event.target instanceof HTMLInputElement && event.target.type === "radio"

    // If it is a radio button, return its value; otherwise, return null
    return isRadioButton ? (event.target as HTMLInputElement).value : null
  }
}
