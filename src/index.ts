import "./style.scss";

type arrayType = string | Element[] | undefined
type elementType = string | HTMLElement | undefined | null

interface OptionsInterface {
    triggerElement: string | Element[]
    targetModal: string | HTMLElement
    openClass: string
    closeClass: string
    preventDefault: boolean
    onShow: (modal: Element, trigger?: EventTarget, event?: Event) => void
    onClose: (modal: Element, trigger?: EventTarget, event?: Event) => void
}

class TsModal {
    static defaultOptions: OptionsInterface = {
        triggerElement: '.ts-modal-toggle',
        targetModal: '.modal',
        openClass: 'is-open',
        closeClass: 'ts-close',
        preventDefault: true,
        onShow: () => {},
        onClose: () => {}
    }

    options: Partial<OptionsInterface>
    elements?: Element[]
    modal?: Element | null
    activeModal?: boolean

    constructor(options: Partial<OptionsInterface> = {}) {
        this.options = {
            ...TsModal.defaultOptions,
            ...options
        }

        this.elements = this._toElementArray(this.options.triggerElement)
        this.modal = this._toElement(this.options.targetModal)
        this.activeModal = false

        this.attachHandler()
        this.attachCloseHandler()
        this.attachKeydown()
    }

    attachHandler() {
        this.elements?.forEach( el => {
            el.addEventListener('click', event => this.showModal(event))
        })
    }

    attachCloseHandler() {
        this.modal?.addEventListener('click', event => {
            if (event.target === null 
                || this.options.closeClass === undefined
                || !(event.target as Element).classList.contains(this.options.closeClass)
            ) return

            this.closeModal(event)
        })
    }

    attachKeydown() {
        document.addEventListener('keydown', event => {
            const keyCode = this._getKeyCode(event)

            // Close Modal
            if (this.activeModal && keyCode === ('Escape' || 27) ) {
                this.closeModal(event)
            }
        })
    }

    /**
     * Show Modal
     * @param {Event} event inherit click event
     */
    showModal(event?: Event) {
        if (this.options.openClass) {
            this.modal?.setAttribute('aria-hidden', 'false')
            this.modal?.classList.add(this.options.openClass)
            this.activeModal = true
        }

        if (this.options.preventDefault)
        event?.preventDefault()

        // onShow callback
        if (this.options.onShow
            && this.modal !== undefined
            && this.modal !== null
        ) {
            event?.target !== undefined && event?.target !== null
            ? this.options.onShow(this.modal, event?.target, event)
            : this.options.onShow(this.modal)
        }

        return this
    }
    
    /**
     * Close Modal
     * @param {Event} event inherit click/keyboard event
     */
    closeModal(event?: Event) {
        if (this.options.openClass) {
            const openClass = this.options.openClass
            this.modal?.setAttribute('aria-hidden', 'true')

            const handler = () => {
                this.modal?.classList.remove(openClass)
                this.activeModal = false
                this.modal?.removeEventListener('animationend', handler, false)
            }
            this.modal?.addEventListener('animationend', handler, false)
        }

        if (this.options.preventDefault)
        event?.preventDefault()

        // onClose callback
        if (this.options.onClose
            && this.modal !== undefined
            && this.modal !== null
        ) {
            event?.target !== undefined && event?.target !== null
            ? this.options.onClose(this.modal, event?.target, event)
            : this.options.onClose(this.modal)
        }

        return this
    }

    /**
     * Helper to return pure array
     * @returns Returns array for elements
     * @private
     */
    private _toElementArray(element: arrayType) {
        if (typeof element === 'string' ) {
            return [...document.querySelectorAll(element)]
        }
        if (element) {
            return [...element]
        }
        throw new Error(`Value cannot be undefined, expected string or array`)
    }
    
    /**
     * Helper to return HTMLElement
     * @returns Returns HTMLElement
     * @private
     */
    private _toElement(element: elementType) {
        if (typeof element === 'string' ) {
            return document.querySelector(element)
        }
        if (element) {
            return element
        }
        if (element === undefined) {
            throw new Error('value cannot be undefined')
        }
        throw new Error('value cannot be null')
    }

    /**
     * Helper to return key code value from keyboard
     * @param event keyboard event
     * @returns key code value
     * @private
     */
    private _getKeyCode = (event: KeyboardEvent) => {
        let code
      
        if (event.key !== undefined) {
          code = event.key
        } else if (event.keyCode !== undefined) {
          code = event.keyCode;
        }
      
        return code
    }
}

export default TsModal

new TsModal()