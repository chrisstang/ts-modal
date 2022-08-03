interface OptionsInterface {
    triggerElement: string | HTMLElement | NodeList | Element[];
    openClass: string;
    closeClass: string;
    preventDefault: boolean;
    onShow: (modal: Element, trigger?: EventTarget, event?: Event) => void;
    onClose: (modal: Element, trigger?: EventTarget, event?: Event) => void;
}
declare class TsModal {
    static defaultOptions: OptionsInterface;
    options: Partial<OptionsInterface>;
    elements?: Element[];
    modal?: Element | null;
    modals: Element[];
    activeModal?: boolean;
    constructor(options?: Partial<OptionsInterface>);
    attachHandler(): void;
    attachCloseHandler(): void;
    attachKeydown(): void;
    /**
     * Show Modal
     * @param {HTMLElement} modal individual modal for trigger
     * @param {Event} event inherit click event
     */
    showModal(modal: HTMLElement, event?: Event): this;
    /**
     * Close Modal
     * @param {HTMLElement} modal individual modal for trigger
     * @param {Event} event inherit click/keyboard event
     */
    closeModal(modal: HTMLElement, event?: Event): this;
    /**
     * Helper to return pure array
     * @returns Returns array for elements
     * @private
     */
    private _toElementArray;
    /**
     * Helper to return HTMLElement
     * @returns Returns HTMLElement
     * @private
     */
    /**
     * Helper to return key code value from keyboard
     * @param event keyboard event
     * @returns key code value
     * @private
     */
    private _getKeyCode;
}
export default TsModal;
