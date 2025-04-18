export abstract class Component<T> {
  constructor(protected readonly container: HTMLElement) {}

  toggleClass(element: HTMLElement, className: string, force: boolean) {
    element.classList.toggle(className, force);
  }

  protected setText(element: HTMLElement, value: unknown) {
    element.textContent = String(value);
  }

  protected setImage(element: HTMLImageElement, src: string, alt?: string) {
    if (element) {
      element.src = src;
      if (alt) {
        element.alt = alt;
      }
    }
  }

  switchButton(button: HTMLButtonElement, text: string, val: boolean) {
    this.setText(button, text);
    button.disabled = val;
  }

  protected hide(): void {
    this.container.style.display = 'none';
  }

  protected show(): void {
    this.container.style.removeProperty('display');
  }

  render(data?: Partial<T>): HTMLElement {
    Object.assign(this, data ?? {});
    return this.container;
  }
}
