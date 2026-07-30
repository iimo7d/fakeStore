import { Component, computed, input } from '@angular/core';

type ButtonVariant = 'primary' | 'destructive' | 'secondary' | 'ghost' | 'icon' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 shadow-sm focus-visible:ring-indigo-500',
  destructive:
    'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-sm focus-visible:ring-rose-500',
  secondary:
    'bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-300 focus-visible:ring-slate-400',
  ghost:
    'text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200 focus-visible:ring-slate-400',
  icon:
    'text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200 focus-visible:ring-slate-400 rounded-full',
  link:
    'text-indigo-600 underline-offset-4 hover:underline focus-visible:ring-indigo-500 p-0 h-auto',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2.5',
};

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 w-8 text-xs p-0',
  md: 'h-10 w-10 text-sm p-0',
  lg: 'h-12 w-12 text-base p-0',
};

@Component({
  selector: 'button[appButton], a[appButton]',
  template: `<ng-content />`,
  host: {
    '[class]': 'hostClasses()',
    '[attr.disabled]': 'disabled() ? true : null',
    '[attr.aria-disabled]': 'disabled() ? true : null',
  },
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input<boolean>(false);

  protected readonly hostClasses = computed(() => {
    const base =
      'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none shrink-0 cursor-pointer';

    const isIcon = this.variant() === 'icon';
    const isLink = this.variant() === 'link';

    const variantClass = variantClasses[this.variant()];

    let sizeClass = isIcon ? iconSizeClasses[this.size()] : sizeClasses[this.size()];
    if (isLink) {
      sizeClass = this.size() === 'sm' ? 'text-xs' : this.size() === 'lg' ? 'text-base' : 'text-sm';
    }

    return `${base} ${variantClass} ${sizeClass}`;
  });
}
