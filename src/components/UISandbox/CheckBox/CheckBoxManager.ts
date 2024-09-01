export default class CheckBoxManager {
  /**
   * Handles click events on CheckBox buttons.
   * @param event - The mouse event triggered by clicking a CheckBox button.
   * @returns A boolean indicating whether the click event target is a CheckBox button.
   */
  handleClick(event: React.ChangeEvent<HTMLInputElement>): string | null {
    // Check if the event target is an instance of HTMLInputElement with type 'CheckBox'
    const isCheckBoxButton =
      event.target instanceof HTMLInputElement &&
      event.target.type === "checkbox"

    // If it is a checkBox button, return its value; otherwise, return null
    return isCheckBoxButton ? (event.target as HTMLInputElement).value : null
  }
}
