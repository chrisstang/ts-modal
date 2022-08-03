type arrayType = string | HTMLElement | NodeList | Element[] | undefined | null
// type elementType = string | HTMLElement | undefined | null

interface OptionsInterface {
    triggerElement: string | HTMLElement | NodeList | Element[]
    openClass: string
    closeClass: string
    preventDefault: boolean
    onShow: (modal: Element, trigger?: EventTarget, event?: Event) => void
    onClose: (modal: Element, trigger?: EventTarget, event?: Event) => void
}

const DEFAULT_OPEN_CLASS = 'is-open'
class TsModal {
    static defaultOptions: OptionsInterface = {
        triggerElement: '.ts-modal-toggle',
        openClass: DEFAULT_OPEN_CLASS,
        closeClass: 'ts-close',
        preventDefault: true,
        onShow: () => {},
        onClose: () => {}
    }

    options: Partial<OptionsInterface>
    elements?: Element[]
    modal?: Element | null
    modals: Element[]
    activeModal?: boolean

    constructor(options: Partial<OptionsInterface> = {}) {
        this.options = {
            ...TsModal.defaultOptions,
            ...options
        }

        this.elements = this._toElementArray(this.options.triggerElement)
        this.modals = []
        this.activeModal = false

        this.attachHandler()
        this.attachCloseHandler()
        this.attachKeydown()
    }

    attachHandler() {
        this.elements?.forEach( element => {
            const targetId = element.getAttribute('href')
            if (!targetId || targetId === '#')
            return console.error(`Please provide a valid ID or class`)

            const modal = document.querySelector(targetId)
            if (!modal)
            return console.error(`Could not find find element with '${targetId}'`)

            if (modal.getAttribute('aria-hidden') === null)
            modal.setAttribute('aria-hidden', 'true')
            
            if (!this.modals.includes(modal))
            this.modals.push(modal)

            element.addEventListener('click', event => this.showModal((modal as HTMLElement), event))
        })

        if (this.modals.length === 0)
        throw new Error(`Could not find any modal`)
    }

    attachCloseHandler() {
        this.modals.forEach( modal => {
            modal.addEventListener('click', event => {
                if (event.target === null 
                    || this.options.closeClass === undefined
                    || !(event.target as Element).classList.contains(this.options.closeClass)
                ) return
    
                this.closeModal((modal as HTMLElement), event)
            })
        })
    }

    attachKeydown() {
        document.addEventListener('keydown', event => {
            const keyCode = this._getKeyCode(event)

            // Close Modal
            if (this.activeModal && keyCode === 'Escape' || keyCode === 27 ) {
                if (this.modal)
                this.closeModal((this.modal as HTMLElement), event)
            }
        })
    }

    /**
     * Show Modal
     * @param {HTMLElement} modal individual modal for trigger
     * @param {Event} event inherit click event
     */
    showModal(modal: HTMLElement, event?: Event) {
        this.modal = modal ? modal : document.querySelector(modal)

        if (this.modal && this.options.openClass) {
            this.modal.setAttribute('aria-hidden', 'false')
            this.modal.classList.add(this.options.openClass)
            this.activeModal = true
        } else if (this.modal && this.options.openClass === undefined) {
            this.modal.setAttribute('aria-hidden', 'true')
            this.modal.classList.remove(DEFAULT_OPEN_CLASS)
            this.activeModal = false
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
     * @param {HTMLElement} modal individual modal for trigger
     * @param {Event} event inherit click/keyboard event
     */
    closeModal(modal: HTMLElement,event?: Event) {
        this.modal = modal ? modal : document.querySelector(modal)

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
    private _toElementArray(element: arrayType): any[] {
        if (typeof element === 'string' ) {
            return [...document.querySelectorAll(element)]
        }
        if (Array.isArray(element)) {
            return element
        }
        if (element && (element as NodeList).length !== (0 || undefined)) {
            return Array.prototype.slice.call(element)
        }
        if (element) {
            return [element]
        }
        throw new Error(`value cannot be undefined or null, expected string, HTMLElement or array`)
    }
    
    /**
     * Helper to return HTMLElement
     * @returns Returns HTMLElement
     * @private
     */
    // private _toElement(element: elementType) {
    //     if (typeof element === 'string' ) {
    //         return document.querySelector(element)
    //     }
    //     if (element) {
    //         return element
    //     }
    //     if (element === undefined) {
    //         throw new Error('value cannot be undefined')
    //     }
    //     throw new Error('value cannot be null')
    // }

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

(window as any).TsModal = TsModal

export default TsModal