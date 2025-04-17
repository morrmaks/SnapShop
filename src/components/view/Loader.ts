import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

export class Loader extends Component<null> {
  protected _spinner: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this._spinner = ensureElement('.loader__spinner', container);
  }

  show() {
    this.container.classList.add('loader_active');
    this._spinner.classList.add('loader__spinner_animation-active');
  }

  hide() {
    this.container.classList.remove('loader_active');
    this._spinner.classList.remove('loader__spinner_animation-active');
  }
}
