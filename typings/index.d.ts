import "./style.scss";
interface OptionsInterface {
    triggerElement: string | Element[];
    targetModal: string | HTMLElement;
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
    activeModal?: boolean;
    constructor(options?: Partial<OptionsInterface>);
    attachHandler(): void;
    attachCloseHandler(): void;
    attachKeydown(): void;
    /**
     * Show Modal
     * @param {Event} event inherit click event
     */
    showModal(event?: Event): this;
    /**
     * Close Modal
     * @param {Event} event inherit click/keyboard event
     */
    closeModal(event?: Event): this;
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
    private _toElement;
    /**
     * Helper to return key code value from keyboard
     * @param event keyboard event
     * @returns key code value
     * @private
     */
    private _getKeyCode;
}
export default TsModal;
