# NCE

## What the app does:
Update the form and see the changes in the live site.


## Checkbox Input Handling Improvement

### Problem:
Initially, there was an issue with the checkbox input not responding when clicked.

### Solution:
In the `handleInputChange` function within the `Form` component, we improved the checkbox input handling. We're now checking both the input's type and name to determine whether it's the "truncateDescription" checkbox. This ensures that the checkbox is properly handled and its value changes as expected.

## Error Display for Checkbox Input

### Problem:
The goal was to not show errors when the "Truncate Description" checkbox is checked.

### Solution:
In the `FieldRenderer` component, we adjusted the rendering of error messages for checkbox inputs. Now, the error message is displayed only when the checkbox is not checked (`!truncateDescription`). If the checkbox is checked, the error message won't show, even if there's an error. This provides a more appropriate display of errors based on the checkbox's state.

## Truncating Description and Submission

### Problem:
The project required truncating the description to 100 characters if the "Truncate Description" checkbox is checked before submitting the form.

### Solution:
In the `handleSubmit` function of the `Form` component, we implemented the logic to truncate the description before submitting. If the checkbox is checked and the description is longer than 100 characters, we truncate it to 100 characters and add "...". Then, the form data is updated with the truncated description. After successful submission, the checkbox's state (`truncateDescription`) is reset to `false`.

## Code Review for Better Clarity

### Solution:
While making these changes, we also organized the code for better readability. This included cleaning up code comments, structuring the `handleInputChange` function for better clarity, and providing meaningful variable names.
