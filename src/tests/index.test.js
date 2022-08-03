import TsModal from '../index'

const fixtureClass = 'ts-modal-toggle'
const getFixture = (fixtureId = 'fixture') => {
    let fixtureEl = document.getElementById(fixtureId)
  
    if (!fixtureEl) {
      fixtureEl = document.createElement('a')
      fixtureEl.setAttribute('id', fixtureId)
      fixtureEl.setAttribute('href', '#modal-1')
      fixtureEl.classList.add(fixtureClass)
      fixtureEl.style.position = 'absolute'
      fixtureEl.style.top = '-10000px'
      fixtureEl.style.left = '-10000px'
      fixtureEl.style.width = '10000px'
      fixtureEl.style.height = '10000px'
      document.body.append(fixtureEl)
    }
  
    return fixtureEl
}

const getModal = () => {
    let modalEl = document.getElementById('modal-1')
  
    if (!modalEl) {
      modalEl = document.createElement('div')
      modalEl.setAttribute('id', 'modal-1')
      modalEl.setAttribute('aria-hidden', 'true')
      modalEl.classList.add('modal')
      modalEl.style.position = 'absolute'
      modalEl.style.top = '-10000px'
      modalEl.style.left = '-10000px'
      modalEl.style.width = '10000px'
      modalEl.style.height = '10000px'
      document.body.append(modalEl)
    }
  
    return modalEl
}


describe('Modal', () => {
    let fixtureEl
    let modalEl

    beforeAll(() => {
        fixtureEl = getFixture()
        modalEl = getModal()
        jest.spyOn(console, 'error').mockImplementation(() => {})
    })

    beforeEach(() => {
        fixtureEl.setAttribute('href', '#modal-1')
        modalEl.setAttribute('id', 'modal-1')
        modalEl.setAttribute('aria-hidden', 'true')

        const fixtureEl2 = document.getElementById('fixture-2')
        if (fixtureEl2) {
            document.body.removeChild(fixtureEl2)
        }
    })

    afterAll(() => {
        console.error.mockRestore();
    })

    afterEach(() => {
        console.error.mockClear();
    })

    it('find fixture element', () => {
        expect(fixtureEl).not.toBeNull
    })

    it('find modal element', () => {
        expect(modalEl).not.toBeNull
    })

    it('should return modal as the instance of module object', () => {
        const tsModal = new TsModal()
        expect(tsModal).toBeInstanceOf(TsModal);
    })

    describe('Check buttons and modals', () => {
        it('should return button elements more than 1', () => {
            const tsModal = new TsModal()
            expect(tsModal.elements.length).toBeGreaterThanOrEqual(1)
        })

        it('should console error if not provide a valid ID', () => {
            fixtureEl.setAttribute('href', '#')

            expect(() => new TsModal()).toThrow()
            expect(console.error).toHaveBeenCalled()
        })

        it('should console error if not provide a valid modal element', () => {
            modalEl.setAttribute('id', 'modal-2')

            expect(() => new TsModal()).toThrow()
            expect(console.error).toHaveBeenCalled()
        })

        it('should set attribute for `aria-hidden` if modal does not have `aria-hidden` attribute', () => {
            modalEl.removeAttribute('aria-hidden')
            const tsModal = new TsModal()
            tsModal.modal = modalEl

            expect(tsModal.modal.getAttribute('aria-hidden')).toEqual('true')
        })

        it('should includes modal in an array once only if the modal was already inside the array', () => {
            getFixture('fixture-2')
            const tsModal = new TsModal()

            expect(tsModal.modals.length).toBeGreaterThan(0)
        })
    })

    describe('Convert element to array, expect valid button elements', () => {
        it('should return array if arguments is string', () => {
            const tsModal = new TsModal()
            const spy = jest.spyOn(tsModal, '_toElementArray')
            const arrayElements = tsModal._toElementArray('.ts-modal-toggle')

            expect(spy).toHaveBeenCalled()
            expect(arrayElements).not.toBeNull()
            expect(arrayElements).toEqual(tsModal.elements)
        })

        it('should return array if arguments is array', () => {
            const nodeList = document.querySelectorAll('.ts-modal-toggle')
            const tsModal = new TsModal()
            const spy = jest.spyOn(tsModal, '_toElementArray')
            const arrayElements = tsModal._toElementArray([...nodeList])

            expect(spy).toHaveBeenCalled()
            expect(arrayElements).not.toBeNull()
            expect(arrayElements).toEqual(tsModal.elements)
        })

        it('should return array if arguments is nodeList', () => {
            const nodeList = document.querySelectorAll('.ts-modal-toggle')
            const tsModal = new TsModal()
            const spy = jest.spyOn(tsModal, '_toElementArray')
            const arrayElements = tsModal._toElementArray(nodeList)

            expect(spy).toHaveBeenCalled()
            expect(arrayElements).not.toBeNull()
            expect(arrayElements).toEqual(tsModal.elements)
        })

        it('should return array if arguments is element only', () => {
            const element = document.querySelector('.ts-modal-toggle')
            const tsModal = new TsModal()
            const spy = jest.spyOn(tsModal, '_toElementArray')
            const arrayElements = tsModal._toElementArray(element)

            expect(spy).toHaveBeenCalled()
            expect(arrayElements).not.toBeNull()
            expect(arrayElements).toEqual(tsModal.elements)
        })

        it('should return error if element is null or undefined', () => {
            const tsModal = new TsModal()
            jest.spyOn(tsModal, '_toElementArray')

            expect( () => {
                tsModal._toElementArray(null)
            }).toThrow()
            
            expect( () => {
                tsModal._toElementArray(undefined)
            }).toThrow()
        })
    })

    // describe('Convert to element, expect valid modal element', () => {
    //     it('should return element if arguments is string', () => {
    //         fixtureEl.innerHTML = '<div class="modal">Modal</div>'
    //         const tsModal = new TsModal()
    //         const spy = jest.spyOn(tsModal, '_toElement')
    //         const element = tsModal._toElement('.modal')

    //         expect(spy).toHaveBeenCalled()
    //         expect(element).not.toBeNull()
    //     })

    //     it('should return element if arguments is element only', () => {
    //         fixtureEl.innerHTML = '<div class="modal">Modal</div>'
    //         const queryElement = document.querySelector('.modal')
    //         const tsModal = new TsModal()
    //         const spy = jest.spyOn(tsModal, '_toElement')
    //         const element = tsModal._toElement(queryElement)

    //         expect(spy).toHaveBeenCalled()
    //         expect(element).not.toBeNull()
    //     })

    //     it('should return error if element is null or undefined', () => {
    //         fixtureEl.innerHTML = '<div class="modal">Modal</div>'
    //         const tsModal = new TsModal()
    //         jest.spyOn(tsModal, '_toElement')
            
    //         expect( () => {
    //             tsModal._toElement(undefined)
    //         }).toThrow()

    //         expect( () => {
    //             tsModal._toElement(null)
    //         }).toThrow()
    //     })
    // })

    describe('Trigger button click handler', () => {
        it('should trigger button click and show modal handler', () => {
            const clickHandler = jest.fn()
    
            const tsModal = new TsModal()
            jest.spyOn(tsModal, 'showModal')

            tsModal.elements.forEach( button => {
                button.addEventListener('click', clickHandler)
                button.click()

                expect(clickHandler).toHaveBeenCalled()
                expect(tsModal.showModal).toHaveBeenCalled()
            })
        })
        
        it('should bypass set state for modal if `openClass` option is undefined', () => {
            const clickHandler = jest.fn()

            const tsModal = new TsModal({
                openClass: undefined
            })
            jest.spyOn(tsModal, 'showModal')

            tsModal.elements.forEach( button => {
                button.addEventListener('click', clickHandler)
                button.click()
                
                expect(tsModal.options.openClass).toBeUndefined()
                expect(tsModal.modal.getAttribute('aria-hidden')).toEqual('true')
                expect(tsModal.modal.classList.contains('is-open')).toEqual(false)
                expect(tsModal.activeModal).toBeFalsy()
            })

            tsModal.showModal().closeModal()
            expect(tsModal.options.openClass).toBeUndefined()
        })
        
        it('should bypass event preventDefault method if `preventDefault` option is false', () => {
            let event = { preventDefault: () => {} }
            jest.spyOn(event, 'preventDefault')
    
            const tsModal = new TsModal({
                preventDefault: false
            })
            jest.spyOn(tsModal, 'showModal')

            tsModal.elements.forEach( button => {
                button.addEventListener('click', function(e) {
                    event = Object.assign(event, e)
                    tsModal.showModal(tsModal.modal, event)
                })
                button.click()
                
                expect(tsModal.options.preventDefault).toBeFalsy()
                expect(event.preventDefault).not.toHaveBeenCalled()
            })
        })
        
        it('should trigger modal adding active state/class', () => {
            const clickHandler = jest.fn()
    
            fixtureEl.innerHTML = '<div class="modal">Modal</div>'
            const tsModal = new TsModal()

            tsModal.elements.forEach( button => {
                button.addEventListener('click', clickHandler)
                button.click()
                
                expect(tsModal.modal.getAttribute('aria-hidden')).toEqual('false')
                expect(tsModal.modal.classList.contains('is-open')).toEqual(true)
                expect(tsModal.activeModal).toBeTruthy()
            })
        })
    })

    describe('Close click handler', () => {
        it('should click without trigger close modal handler', () => {
            const clickHandler = jest.fn()
    
            const tsModal = new TsModal()
            jest.spyOn(tsModal, 'closeModal')

            tsModal.modal = modalEl
            tsModal.modal.addEventListener('click', clickHandler)
            tsModal.modal.click()

            expect(clickHandler).toHaveBeenCalled()
            expect(tsModal.closeModal).toHaveBeenCalledTimes(0)
        })

        it('should click and trigger close modal handler', () => {
            const clickHandler = jest.fn()
    
            const tsModal = new TsModal()
            jest.spyOn(tsModal, 'closeModal')

            modalEl.classList.add('ts-close')
            tsModal.modal = modalEl
            tsModal.modal.addEventListener('click', clickHandler)
            tsModal.modal.click()

            expect(clickHandler).toHaveBeenCalled()
            expect(tsModal.closeModal).toHaveBeenCalled()
        })

        it('should trigger close modal with remove active class & state', () => {
            const tsModal = new TsModal()
            jest.spyOn(tsModal, 'closeModal')

            modalEl.classList.add('ts-close')
            tsModal.modal = modalEl
            tsModal.closeModal(modalEl)

            expect(tsModal.closeModal).toHaveBeenCalled()
            expect(tsModal.modal.getAttribute('aria-hidden')).toEqual('true')
            expect(tsModal.activeModal).toBeFalsy()
        })

        it('should trigger close modal with animationend', () => {
            const animationEndCallback = jest.fn()
            const tsModal = new TsModal()
            jest.spyOn(tsModal, 'closeModal')

            const event = new Event('animationend')
            Object.assign(event, { animationName: 'tsSlideIn' })

            modalEl.classList.add('ts-close')
            tsModal.modal = modalEl
            tsModal.modal.addEventListener('animationend', animationEndCallback, false)
            tsModal.closeModal(modalEl)
            tsModal.modal.dispatchEvent(event)

            expect(tsModal.closeModal).toHaveBeenCalled()
            expect(animationEndCallback).toHaveBeenCalled()
            expect(tsModal.modal.getAttribute('aria-hidden')).toEqual('true')
            expect(tsModal.modal.classList.contains('is-open')).toEqual(false)
            expect(tsModal.activeModal).toBeFalsy()
        })
    })

    describe('Callback', () => {
        it('should not trigger onShow callback', () => {
            const tsModal = new TsModal()
            tsModal.modal = undefined
            
            jest.spyOn(tsModal, 'showModal')
            jest.spyOn(tsModal.options, 'onShow')
            
            tsModal.showModal()
            
            expect(tsModal.showModal).toHaveBeenCalled()
            expect(tsModal.options.onShow).not.toHaveBeenCalled()
        })

        it('should trigger onShow callback', () => {
            fixtureEl.innerHTML = '<div class="modal">Modal</div>'
            const tsModal = new TsModal()
            tsModal.options.onShow = jest.fn()
            
            jest.spyOn(tsModal, 'showModal')
            jest.spyOn(tsModal.options, 'onShow').mockImplementation( () => 'on show')

            tsModal.showModal()
            const onShowResponse = tsModal.options.onShow()
            
            expect(tsModal.showModal).toHaveBeenCalled()
            expect(tsModal.options.onShow).toHaveBeenCalled()
            expect(onShowResponse).toBe('on show')
        })

        it('should not trigger onClose callback', () => {
            const tsModal = new TsModal()
            tsModal.modal = undefined
            
            jest.spyOn(tsModal, 'closeModal')
            jest.spyOn(tsModal.options, 'onClose')
            
            tsModal.closeModal()
            
            expect(tsModal.closeModal).toHaveBeenCalled()
            expect(tsModal.options.onClose).not.toHaveBeenCalled()
        })

        it('should trigger onClose callback', () => {
            fixtureEl.innerHTML = '<div class="modal">Modal</div>'
            const tsModal = new TsModal()
            tsModal.options.onClose = jest.fn()
            
            jest.spyOn(tsModal, 'closeModal')
            jest.spyOn(tsModal.options, 'onClose').mockImplementation( () => 'on close')

            tsModal.closeModal()
            const onCloseResponse = tsModal.options.onClose()
            
            expect(tsModal.closeModal).toHaveBeenCalled()
            expect(tsModal.options.onClose).toHaveBeenCalled()
            expect(onCloseResponse).toBe('on close')
        })
    })

    describe('Escape keydown', () => {
        it('should trigger keydown without calling close modal, if activeModal is false', () => {
            const event = { key: 'Escape' }
            const tsModal = new TsModal()

            jest.spyOn(tsModal, '_getKeyCode')
            jest.spyOn(tsModal, 'closeModal')
            
            tsModal.activeModal = false
            document.dispatchEvent(new KeyboardEvent('keydown', event))
            
            expect(tsModal._getKeyCode).toHaveBeenCalled()
            expect(tsModal._getKeyCode(event)).toBe('Escape')
            expect(tsModal.closeModal).toHaveBeenCalledTimes(0)
        })

        it('should trigger keydown without calling close modal, if key is undefined', () => {
            const event = { key: undefined }
            const tsModal = new TsModal()

            jest.spyOn(tsModal, '_getKeyCode')
            jest.spyOn(tsModal, 'closeModal')
            
            tsModal.activeModal = true
            document.dispatchEvent(new KeyboardEvent('keydown', event))

            expect(tsModal._getKeyCode).toHaveBeenCalled()
            expect(tsModal._getKeyCode(event)).toBeUndefined()
            expect(tsModal.closeModal).toHaveBeenCalledTimes(0)
        })

        it('should trigger keydown `key: Escape` and calling close modal', () => {
            const event = { key: 'Escape', preventDefault: () => {} }
            const tsModal = new TsModal()

            jest.spyOn(tsModal, '_getKeyCode')
            jest.spyOn(tsModal, 'closeModal')
            
            tsModal.modal = modalEl
            tsModal.activeModal = true
            document.dispatchEvent(new KeyboardEvent('keydown', event))
            tsModal.closeModal(modalEl, event) // programatically mock and call method

            expect(tsModal._getKeyCode).toHaveBeenCalled()
            expect(tsModal._getKeyCode(event)).toBe('Escape')
            expect(tsModal.closeModal).toHaveBeenCalled()
        })

        it('should trigger keydown `keyCode: 27` and calling close modal', () => {
            const event = { keyCode: 27, preventDefault: () => {} }
            fixtureEl.innerHTML = '<div class="modal">Modal</div>'
            const tsModal = new TsModal()

            jest.spyOn(tsModal, '_getKeyCode')
            jest.spyOn(tsModal, 'closeModal')
            
            tsModal.activeModal = true
            document.dispatchEvent(new KeyboardEvent('keydown', event))
            tsModal.closeModal(modalEl, event) // programatically mock and call method
            
            expect(tsModal._getKeyCode).toHaveBeenCalled()
            expect(tsModal._getKeyCode(event)).toBe(27)
            expect(tsModal.closeModal).toHaveBeenCalled()
        })
    })
})