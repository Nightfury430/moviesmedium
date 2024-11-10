import { mount } from '@vue/test-utils'
import DetailPage from '@/views/DetailPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

// Mock router setup
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: {},
    },
  ],
})

const pinia = createPinia()

describe('DetailPage', () => {
  const mockMovie = {
    id: '1',
    title: 'Test Movie',
    poster: 'test.jpg',
    imdb_rating: 8.5,
    released_on: '2020-01-01',
    length: '120 min',
    director: 'John Doe',
    cast: ['Actor 1', 'Actor 2'],
    overview: 'This is a test movie overview.',
  }

  it('renders movie details correctly', async () => {
    const wrapper = mount(DetailPage, {
      global: {
        plugins: [router, pinia],
        mocks: {
          useMovieDetail: () => ({
            movie: mockMovie,
            loading: false,
            error: null,
            getYear: (date: string) => new Date(date).getFullYear(),
          }),
        },
      },
    })

    await router.isReady()
    await wrapper.vm.$nextTick()

    // Debugging: Log the rendered HTML
    expect(wrapper.find('.movie-details').exists()).toBe(true)
  })

  it('displays error message', async () => {
    const wrapper = mount(DetailPage, {
      global: {
        plugins: [router, pinia],
        mocks: {
          useMovieDetail: () => ({
            movie: null,
            loading: false,
            error: 'Error loading movie details',
            getYear: () => null,
          }),
        },
      },
    })

    await wrapper.vm.$nextTick()
  })
})
