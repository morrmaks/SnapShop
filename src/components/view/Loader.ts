import { Component } from '../base/Component';

export class Loader extends Component<null> {
	constructor(container: HTMLElement) {
		super(container);
	}

	show() {
		this.container.classList.add('loader_active');
	}

	hide() {
		this.container.classList.remove('loader_active');
	}
}
