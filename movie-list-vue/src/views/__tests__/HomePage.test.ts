import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import { useMovieStore } from '@/stores/movies'

// Create a mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [], // Add your routes here if needed
})

describe('HomePage', () => {
  const createWrapper = async () => {
    const wrapper = mount(HomePage, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
          router, // Add the router to the plugins
        ],
      },
    })
    await router.isReady() // Wait for the router to be ready
    return wrapper
  }

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders correctly', async () => {
    const wrapper = await createWrapper()
    expect(wrapper.find('.home-page').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'Header' }).exists()).toBe(true)
  })

  it('shows loading skeleton when loading', async () => {
    const wrapper = await createWrapper()
    const store = useMovieStore()
    store.loading = true

    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent({ name: 'MovieSkeleton' }).exists()).toBe(true)
  })

  it('displays error message when there is an error', async () => {
    const wrapper = await createWrapper()
    const store = useMovieStore()
    store.error = { 
      name: 'FetchError', // Add the 'name' property
      message: 'Failed to fetch movies' 
    }

    await wrapper.vm.$nextTick()

    expect(JSON.parse(wrapper.find('.error').text()).message).toBe('Failed to fetch movies')
  })

  it('shows "no results" message when search is active but no movies found', async () => {
    const wrapper = await createWrapper()
    const store = useMovieStore()
    store.isSearchActive = true
    store.movies = []

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.no-results').text()).toBe('No movies found matching your search.')
  })
})
