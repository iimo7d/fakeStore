import { Component, computed, input } from '@angular/core';
import { FieldState } from '@angular/forms/signals';

@Component({
  selector: 'app-form-errors',
  template: `@if (showError()) {
    <div class="space-y-1 mt-1">
      @for (error of control().errors(); track error.kind) {
        <p class="text-xs text-rose-500 font-medium">{{ error.message }}</p>
      }
    </div>
  }`,
})
export class FormErrors {
  readonly control = input.required<FieldState<unknown>>();
  readonly submitted = input<boolean>(false);

  protected readonly showError = computed(() => {
    const field = this.control();
    return field.invalid() && (field.touched() || this.submitted());
  });
}
