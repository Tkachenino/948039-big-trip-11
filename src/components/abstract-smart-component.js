import AbstractComponent from "@/components/abstract-component.js";

export default class AbstractSmartComponent extends AbstractComponent {
  recoveryListener() {
    throw new Error(`Abstract method not implemented: recoveryListener`);
  }

  _applyFlatpickr() {
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this.recoveryListener();
    this._applyFlatpickr();
  }
}
