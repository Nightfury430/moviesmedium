import { mount } from '@vue/test-utils'
import MovieCard from '@/components/MovieCard.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/movie/:id',
      name: 'movie-detail',
      component: {},
    },
  ],
})

const pinia = createPinia()

describe('MovieCard', () => {
  const mockMovie = {
    id: '1',
    title: 'Test Movie',
    poster: 'test.jpg',
    rating: 8.5,
    bookmarked: false,
  }

  it('renders movie information correctly', () => {
    const wrapper = mount(MovieCard, {
      props: {
        movie: mockMovie,
      },
      global: {
        plugins: [router, pinia],
      },
    })

    expect(wrapper.find('.movie-title').text()).toBe('Test Movie')
    expect(wrapper.find('.movie-rating').text()).toBe('☆')
    expect(wrapper.find('img').attributes('src')).toBe('test.jpg')
    expect(wrapper.find('img').attributes('alt')).toBe('Test Movie')
  })

  it('links to the correct movie detail page', () => {
    const wrapper = mount(MovieCard, {
      props: {
        movie: mockMovie,
      },
      global: {
        plugins: [router, pinia],
      },
    })

    const link = wrapper.find('.movie-link')
    expect(link.attributes('href')).toBe('/movie/1')
  })
})
