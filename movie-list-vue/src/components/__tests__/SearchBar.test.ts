import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import SearchBar from '@/components/SearchBar.vue'
import { useMovieStore } from '@/stores/movies'

// Mock the movie store
const searchMoviesMock = vi.fn();
const fetchMoviesMock = vi.fn();

vi.mock('@/stores/movies', () => ({
  useMovieStore: vi.fn(() => ({
    searchMovies: searchMoviesMock,
    fetchMovies: fetchMoviesMock,
  })),
}))

describe('SearchBar', () => {
  it('updates searchQuery on input', async () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.find('.search-input')

    await input.setValue('Inception')
    expect((wrapper.vm as any).searchQuery).toBe('Inception')
  })

  it('calls searchMovies when input length is >= 2', async () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.find('.search-input')

    await input.setValue('Inception')
    await wrapper.vm.$nextTick() // Ensure any asynchronous operations are completed
    expect(searchMoviesMock).toHaveBeenCalledWith('Inception')
  })

  it('calls fetchMovies when input is cleared', async () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.find('.search-input')
    const movieStore = useMovieStore()

    await input.setValue('Inception')
    await input.setValue('')
    await wrapper.vm.$nextTick() // Ensure any asynchronous operations are completed
    expect(movieStore.fetchMovies).toHaveBeenCalled()
  })
})
