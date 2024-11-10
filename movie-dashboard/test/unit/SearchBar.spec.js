import { shallowMount } from '@vue/test-utils';
import SearchBar from '@/components/SearchBar.vue';

describe('SearchBar.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SearchBar, {
      mocks: {
        $store: {
          dispatch: jest.fn(),
        },
      },
    });
  });

  it('renders input field', () => {
    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
  });

  it('updates searchQuery data property on input', async () => {
    const input = wrapper.find('input');
    await input.setValue('test query');
    expect(wrapper.vm.searchQuery).toBe('test query');
  });

  it('dispatches searchMovies action on input', async () => {
    const input = wrapper.find('input');
    await input.setValue('test query');
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('searchMovies', 'test query');
  });

  it('has a search icon', () => {
    const icon = wrapper.find('i.fas.fa-search');
    expect(icon.exists()).toBe(true);
  });
});
