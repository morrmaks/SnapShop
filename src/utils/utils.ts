export function isSelector(x: any): x is string {
	return typeof x === 'string' && x.length > 1;
}

export function isEmpty(x: any): boolean {
	return x === null || x === undefined;
}

export type SelectorCollection<T> = string | NodeListOf<Element> | T[];

export function ensureAllElements<T extends HTMLElement>(
	selectorElement: SelectorCollection<T>,
	context: HTMLElement = document as unknown as HTMLElement
): T[] {
	if (isSelector(selectorElement)) {
		return Array.from(context.querySelectorAll(selectorElement)) as T[];
	}
	if (selectorElement instanceof NodeList) {
		return Array.from(selectorElement) as T[];
	}
	if (Array.isArray(selectorElement)) {
		return selectorElement;
	}
	throw new Error(`Не удалось распознать селектор: ${selectorElement}`);
}

export type SelectorElement<T> = T | string;

export function ensureElement<T extends HTMLElement>(
	selectorElement: SelectorElement<T>,
	context?: HTMLElement
): T {
	if (isSelector(selectorElement)) {
		const elements = ensureAllElements<T>(selectorElement, context);
		if (elements.length > 1) {
			console.warn(
				`Найдено более одного элемента по селектору: ${selectorElement}`
			);
		}
		if (elements.length === 0) {
			console.warn(
				`По селектору ${selectorElement} не найдено ни одного элемента`
			);
		}
		return elements.pop() as T;
	}
	if (selectorElement instanceof HTMLElement) {
		return selectorElement as T;
	}
	throw new Error(`Не удалось распознать селектор: ${selectorElement}`);
}

export function cloneTemplate<T extends HTMLElement>(
	query: string | HTMLTemplateElement
): T {
	const template = ensureElement(query) as HTMLTemplateElement;
	return template.content.firstElementChild.cloneNode(true) as T;
}

export function setElementData<T extends Record<string, unknown> | object>(
	element: HTMLElement,
	data: T
) {
	for (const key in data) {
		element.dataset[key] = String(data[key]);
	}
}

export function isPlainObject(obj: unknown): obj is object {
	const prototype = Object.getPrototypeOf(obj);
	return prototype === Object.getPrototypeOf({}) || prototype === null;
}

export function isBoolean(x: unknown): x is boolean {
	return typeof x === 'boolean';
}

export function createElement<T extends HTMLElement>(
	tagName: keyof HTMLElementTagNameMap,
	props?: Partial<Record<keyof T, string | boolean | object>>,
	children?: HTMLElement | HTMLElement[]
): T {
	const element = document.createElement(tagName) as T;
	if (props) {
		for (const key in props) {
			const value = props[key];
			if (isPlainObject(value) && key === 'dataset') {
				setElementData(element, value);
			} else {
				// @ts-expect-error fix indexing later
				element[key] = isBoolean(value) ? value : String(value);
			}
		}
	}
	if (children) {
		for (const child of Array.isArray(children) ? children : [children]) {
			element.append(child);
		}
	}
	return element;
}
