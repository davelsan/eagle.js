import Vue from 'vue'

import { mount } from '@vue/test-utils'

import Slideshow from '../fixtures/simpleSlideshow.vue'

import ComplexSlideshow from '../fixtures/complexSlideshow.vue'

beforeEach(() => {
  const div = document.createElement('div')
  div.id = 'root'
  document.body.appendChild(div)
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Slideshow properties', () => {
  let wrapper
  let vm

  afterEach(() => {
    wrapper.destroy()
  })

  it('default value matches', () => {
    wrapper = mount(Slideshow, {
      attachTo: '#root'
    })

    expect(wrapper.props().firstSlide).toBe(1)
    expect(wrapper.props().startStep).toBe(1)
    expect(wrapper.props().lastSlide).toBe(null)
    expect(wrapper.props().embedded).toBe(false)
    expect(wrapper.props().inserted).toBe(false)
    expect(wrapper.props().keyboardNavigation).toBe(true)
    expect(wrapper.props().mouseNavigation).toBe(true)
    expect(wrapper.props().firstSlide).toBe(1)
    expect(wrapper.props().skip).toBe(false)
    expect(wrapper.props().backBySlide).toBe(false)
    expect(wrapper.props().repeat).toBe(false)
  })

  it('user set props matches', () => {
    wrapper = mount(Slideshow, {
      attachTo: '#root',
      propsData: {
        firstSlide: 2,
        startStep: 2,
        lastSlide: 3,
        embedded: true,
        inserted: true,
        keyboardNavigation: false,
        mouseNavigation: false,
        skip: true,
        backBySlide: true,
        repeat: true
      }
    })

    expect(wrapper.props().firstSlide).toBe(2)
    expect(wrapper.props().startStep).toBe(2)
    expect(wrapper.props().lastSlide).toBe(3)
    expect(wrapper.props().embedded).toBe(true)
    expect(wrapper.props().inserted).toBe(true)
    expect(wrapper.props().keyboardNavigation).toBe(false)
    expect(wrapper.props().mouseNavigation).toBe(false)
    expect(wrapper.props().skip).toBe(true)
    expect(wrapper.props().backBySlide).toBe(true)
    expect(wrapper.props().repeat).toBe(true)
  })

  it('props work in slideshow initialization', () => {
    wrapper = mount(Slideshow, {
      attachTo: '#root',
      propsData: {
        firstSlide: 2,
        startStep: 2,
        lastSlide: 3,
        embedded: true,
        inserted: true,
        keyboardNavigation: false,
        mouseNavigation: false,
        skip: true,
        backBySlide: true
      }
    })
    vm = wrapper.vm
    expect(vm.step).toBe(2)
    expect(vm.slides.length).toBe(2)
  })
})

describe('Slideshow initilization', () => {
  let wrapper
  let vm

  beforeEach(() => {
    wrapper = mount(Slideshow, {
      attachTo: '#root'
    })
    vm = wrapper.vm
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('has correct slides count', () => {
    expect(vm.slides.length).toBe(4)
  })

  it('has set current slide', () => {
    expect(vm.currentSlideIndex).toBe(1)
  })

  it('has the correct active slide', () => {
    expect(vm.slides[0].active).toBeTruthy()
  })
})

describe('Slideshow lifecycle hooks', () => {
  it('should register default events when created', () => {
    jest.spyOn(window, 'addEventListener')

    const wrapper = mount(Slideshow, {
      attachTo: '#root'
    })

    expect(window.addEventListener).toHaveBeenCalled()

    expect(window.addEventListener.mock.calls[0][0])
      .toEqual('keydown')

    expect(window.addEventListener.mock.calls[0][1].name)
      .toEqual('bound handleKeydown')

    expect(window.addEventListener.mock.calls[1][0])
      .toEqual('click')

    expect(window.addEventListener.mock.calls[1][1].name)
      .toEqual('bound handleClick')

    expect(window.addEventListener.mock.calls[2][0])
      .toEqual('wheel')

    expect(window.addEventListener.mock.calls[2][1].name)
      .toEqual('bound debounced')

    expect(window.addEventListener.mock.calls[3][0])
      .toEqual('resize')

    expect(window.addEventListener.mock.calls[3][1].name)
      .toEqual('bound handleResize')

    wrapper.destroy()
  })

  it('should unregister events when destroyed', () => {
    jest.spyOn(window, 'removeEventListener')

    const wrapper = mount(Slideshow, {
      attachTo: '#root'
    })

    wrapper.destroy()

    expect(window.removeEventListener).toHaveBeenCalled()

    expect(window.removeEventListener.mock.calls[0][0]).toEqual('keydown')

    expect(window.removeEventListener.mock.calls[1][0]).toEqual('click')

    expect(window.removeEventListener.mock.calls[2][0]).toEqual('touchstart')

    expect(window.removeEventListener.mock.calls[3][0]).toEqual('wheel')
  })
})

describe('Slideshow pre/next', () => {
  let wrapper
  let vm

  beforeEach(() => {
    wrapper = mount(Slideshow, {
      attachTo: '#root'
    })
    vm = wrapper.vm
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('Slideshow goes to next slide when current slide\'s step run out',
    async () => {
      vm.nextStep()
      await Vue.nextTick()

      expect(vm.slides[0].active).toBeFalsy()
      expect(vm.slides[1].active).toBeTruthy()
    })

  it('Slideshow goes to prev slide when current slide\'s step run out',
    async () => {
      vm.currentSlideIndex = 2
      vm.previousStep()

      await Vue.nextTick()

      expect(vm.slides[1].active).toBeFalsy()
      expect(vm.slides[0].active).toBeTruthy()
    })

  it('Slideshow sets correct step within current slide',
    async () => {
      vm.currentSlideIndex = 3
      vm.nextStep()

      await Vue.nextTick()

      expect(vm.slides[2].active).toBeTruthy()
      expect(vm.step).toBe(2)
    })
})

describe('Slideshow events', () => {
  let wrapper
  let vm

  beforeEach(() => {
    wrapper = mount(Slideshow, {
      attachTo: '#root'
    })
    vm = wrapper.vm
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('left arrow would perform prev', () => {
    jest.spyOn(vm, 'previousStep')
    wrapper.trigger('keydown', {
      key: 'ArrowLeft'
    })
    expect(vm.previousStep).toHaveBeenCalled()
  })

  it('right arrow would perform next', () => {
    jest.spyOn(vm, 'nextStep')
    wrapper.trigger('keydown', {
      key: 'ArrowRight'
    })
    expect(vm.nextStep).toHaveBeenCalled()
  })

  it('wheel event is throttled', done => {
    const spy = jest.spyOn(vm, 'nextStep')

    wrapper.trigger('wheel', {
      deltaY: 100
    })
    wrapper.trigger('wheel', {
      deltaY: 100
    })
    wrapper.trigger('wheel', {
      deltaY: 100
    })

    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(2)
      spy.mockRestore()
      done()
    }, 1000)
  })
})

describe('Slideshow back mode', () => {
  it('go back by slide would result to previous slide first step', async () => {
    const wrapper = mount(ComplexSlideshow, {
      attachTo: '#root',
      propsData: {
        backBySlide: true
      }
    })
    const vm = wrapper.vm

    vm.currentSlideIndex = 3
    vm.previousStep()
    await Vue.nextTick()

    expect(vm.slides[1].active).toBeTruthy()
    expect(vm.step).toBe(1)

    wrapper.destroy()
  })

  it('go back by step would result to previous slide last step', async () => {
    const wrapper = mount(ComplexSlideshow)
    const vm = wrapper.vm

    vm.currentSlideIndex = 3

    // need to wait watcher function finishes for currentSlideIndex
    await Vue.nextTick()

    vm.previousStep()

    await Vue.nextTick()

    expect(vm.slides[1].active).toBeTruthy()
    expect(vm.step).toBe(5)

    wrapper.destroy()
  })
})

describe('Slideshow features', () => {
  let wrapper
  let vm

  beforeAll(() => {
    wrapper = mount(Slideshow, {
      attachTo: '#root',
      propsData: {
        firstSlide: 4,
        startStep: 4,
        repeat: true
      }
    })
    vm = wrapper.vm
  })

  afterAll(() => {
    wrapper.destroy()
  })

  it('repeat will navigate back to slide 1 when slideshow ends ', async () => {
    vm.nextStep()

    await Vue.nextTick()

    expect(vm.slides[0].active).toBeTruthy()
  })

  it('changes direction', () => {
    const spy = jest.spyOn(vm, 'changeDirection')

    vm.previousStep()
    expect(spy).toHaveBeenCalledWith('prev')
    spy.mockClear()

    vm.nextStep()
    expect(spy).toHaveBeenCalledWith('next')
    spy.mockClear()

    vm.previousSlide()
    expect(spy).toHaveBeenCalledWith('prev')
    spy.mockClear()

    vm.nextSlide()
    expect(spy).toHaveBeenCalledWith('next')
    spy.mockClear()
  })
})

describe('Slideshow on mobile', () => {
  it('should register default events when created', () => {
    Object.defineProperty(window, 'ontouchstart', {
      value: {}
    })

    jest.spyOn(window, 'addEventListener')

    const wrapper = mount(Slideshow, {
      // attachToDocument: true
      attachTo: '#root'
    })

    expect(window.addEventListener).toHaveBeenCalled()
    expect(window.addEventListener.mock.calls[0][0]).toEqual('keydown')
    expect(window.addEventListener.mock.calls[0][1].name).toEqual('bound handleKeydown')
    expect(window.addEventListener.mock.calls[1][0]).toEqual('touchstart')
    expect(window.addEventListener.mock.calls[1][1].name).toEqual('bound handleClick')
    expect(window.addEventListener.mock.calls[2][0]).toEqual('resize')
    expect(window.addEventListener.mock.calls[2][1].name).toEqual('bound handleResize')

    wrapper.destroy()
  })
})
