import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import Header from '@/components/Header.vue'
import { useMovieStore } from '@/stores/movies'

describe('Header', () => {
  const createWrapper = () => {
    return mount(Header, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    })
  }

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders correctly', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.title').text()).toBe('Thikkiiana Movies')
    expect(wrapper.find('.search-input').exists()).toBe(true)
  })

  it('disables search input when loading', async () => {
    const wrapper = createWrapper()
    const store = useMovieStore()
    store.loading = true

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.search-input').attributes()).toHaveProperty('disabled')
    expect(wrapper.find('.search-status').text()).toBe('Searching...')
  })

  it('debounces search input', async () => {
    const wrapper = createWrapper()
    const searchInput = wrapper.find('.search-input')

    await searchInput.setValue('test')
    expect(wrapper.emitted('search')).toBeFalsy()

    vi.advanceTimersByTime(300)
    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')?.[0]).toEqual(['test'])
  })

  it('clears previous timeout on new input', async () => {
    const wrapper = createWrapper()
    const searchInput = wrapper.find('.search-input')

    await searchInput.setValue('test')
    vi.advanceTimersByTime(200)
    await searchInput.setValue('new test')
    vi.advanceTimersByTime(200)

    expect(wrapper.emitted('search')).toBeFalsy()

    vi.advanceTimersByTime(100)
    expect(wrapper.emitted('search')?.[0]).toEqual(['new test'])
  })
})
