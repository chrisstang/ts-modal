import TsModal from '../index'

const fixtureId = 'fixture'
const fixtureClass = 'ts-modal-toggle'
const getFixture = () => {
    let fixtureEl = document.getElementById(fixtureId)
  
    if (!fixtureEl) {
      fixtureEl = document.createElement('div')
      fixtureEl.setAttribute('id', fixtureId)
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


describe('Modal', () => {
    let fixtureEl

    beforeAll(() => {
        fixtureEl = getFixture()
    })

    it('find fixture element', () => {
        expect(fixtureEl).not.toBeNull
    })

    it('should return modal as the instance of module object', () => {
        const tsModal = new TsModal()
        expect(tsModal).toBeInstanceOf(TsModal);
    })

    describe('Check buttons length', () => {
        it('should return button elements more than 1', () => {
            const tsModal = new TsModal()
            expect(tsModal.elements.length).toBeGreaterThanOrEqual(1)
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

    describe('Convert to element, expect valid modal element', () => {
        it('should return element if arguments is string', () => {
            fixtureEl.innerHTML = '<div class="modal">Modal</div>'
            const tsModal = new TsModal()
            const spy = jest.spyOn(tsModal, '_toElement')
            const element = tsModal._toElement('.modal')

            expect(spy).toHaveBeenCalled()
            expect(element).not.toBeNull()
            expect(element).toEqual(tsModal.modal)
        })

        it('should return element if arguments is element only', () => {
            fixtureEl.innerHTML = '<div class="modal">Modal</div>'
            const queryElement = document.querySelector('.modal')
            const tsModal = new TsModal()
            const spy = jest.spyOn(tsModal, '_toElement')
            const element = tsModal._toElement(queryElement)

            expect(spy).toHaveBeenCalled()
            expect(element).not.toBeNull()
            expect(element).toEqual(tsModal.modal)
        })

        it('should return error if element is null or undefined', () => {
            fixtureEl.innerHTML = '<div class="modal">Modal</div>'
            const tsModal = new TsModal()
            jest.spyOn(tsModal, '_toElement')
            
            expect( () => {
                tsModal._toElement(undefined)
            }).toThrow()

            expect( () => {
                tsModal._toElement(null)
            }).toThrow()
        })
    })

    describe('Trigger button click handler', () => {
        it('should trigger button click and show modal handler', () => {
            const clickHandler = jest.fn()
    
            fixtureEl.innerHTML = '<div class="modal">Modal</div>'
            const tsModal = new TsModal()
            jest.spyOn(tsModal, 'showModal')

            tsModal.elements.forEach( button => {
                button.addEventListener('click', clickHandler)
                button.click()

                expect(clickHandler).toHaveBeenCalled()
                expect(tsModal.showModal).toHaveBeenCalled()
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

        it('should trigger onShow callback', () => {
            fixtureEl.innerHTML = '<div class="modal">Modal</div>'
            const tsModal = new TsModal()
            tsModal.onShow = jest.fn()
            
            jest.spyOn(tsModal, 'showModal')
            jest.spyOn(tsModal, 'onShow')

            tsModal.showModal()
            tsModal.onShow()
            
            expect(tsModal.showModal).toHaveBeenCalled()
            expect(tsModal.onShow).toHaveBeenCalled()
        })
    })

    describe('Close click handler', () => {
        it('should click without trigger close modal handler', () => {
            const clickHandler = jest.fn()
    
            fixtureEl.innerHTML = '<div class="modal">Modal</div>'
            const tsModal = new TsModal()
            jest.spyOn(tsModal, 'closeModal')

            tsModal.modal.addEventListener('click', clickHandler)
            tsModal.modal.click()

            expect(clickHandler).toHaveBeenCalled()
            expect(tsModal.closeModal).toHaveBeenCalledTimes(0)
        })

        it('should click and trigger close modal handler', () => {
            const clickHandler = jest.fn()
    
            fixtureEl.innerHTML = '<div class="modal ts-close">Modal</div>'
            const tsModal = new TsModal()
            jest.spyOn(tsModal, 'closeModal')

            tsModal.modal.addEventListener('click', clickHandler)
            tsModal.modal.click()

            expect(clickHandler).toHaveBeenCalled()
            expect(tsModal.closeModal).toHaveBeenCalled()
        })

        it('should trigger close modal with remove active class & state', () => {
            fixtureEl.innerHTML = '<div class="modal ts-close">Modal</div>'
            const tsModal = new TsModal()
            jest.spyOn(tsModal, 'closeModal')

            tsModal.closeModal()

            expect(tsModal.closeModal).toHaveBeenCalled()
            expect(tsModal.modal.getAttribute('aria-hidden')).toEqual('true')
            expect(tsModal.modal.classList.contains('is-open')).toEqual(false)
            expect(tsModal.activeModal).toBeFalsy()
        })

        it('should trigger close modal with animationend', () => {
            const animationEndCallback = jest.fn()
            fixtureEl.innerHTML = '<div class="modal ts-close">Modal</div>'
            const tsModal = new TsModal()
            jest.spyOn(tsModal, 'closeModal')

            const event = new Event('animationend')
            Object.assign(event, { animationName: 'tsSlideIn' })

            tsModal.modal.addEventListener('animationend', animationEndCallback, false)
            tsModal.closeModal()
            tsModal.modal.dispatchEvent(event)

            expect(tsModal.closeModal).toHaveBeenCalled()
            expect(animationEndCallback).toHaveBeenCalled()
            expect(tsModal.modal.getAttribute('aria-hidden')).toEqual('true')
            expect(tsModal.modal.classList.contains('is-open')).toEqual(false)
            expect(tsModal.activeModal).toBeFalsy()
        })
    })

    describe('Escape keydown', () => {
        it('should trigger keydown without calling close modal', () => {
            const keydownHandler = jest.fn()
            fixtureEl.innerHTML = '<div class="modal">Modal</div>'
            const tsModal = new TsModal()

            const keyCode = jest.spyOn(tsModal, '_getKeyCode').mockImplementation( () => 'Escape')
            jest.spyOn(tsModal, 'closeModal')
            document.addEventListener('keydown', keydownHandler)
            
            tsModal.activeModal = false
            document.dispatchEvent(new KeyboardEvent('keydown', { 'key': keyCode }))

            expect(tsModal._getKeyCode()).toBe('Escape')
            expect(tsModal.closeModal).toHaveBeenCalledTimes(0)
        })

        it('should trigger keydown and calling close modal', () => {
            const keydownHandler = jest.fn()
            fixtureEl.innerHTML = '<div class="modal">Modal</div>'
            const tsModal = new TsModal()

            const keyCode = jest.spyOn(tsModal, '_getKeyCode').mockImplementation( () => 'Escape')
            jest.spyOn(tsModal, 'closeModal')
            document.addEventListener('keydown', keydownHandler)
            
            tsModal.activeModal = true
            document.dispatchEvent(new KeyboardEvent('keydown', { 'key': keyCode }))

            expect(tsModal._getKeyCode()).toBe('Escape')
            expect(tsModal.closeModal).toHaveBeenCalled()
        })
    })
})
