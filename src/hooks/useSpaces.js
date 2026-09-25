import { spacesApi } from '../api/spaces.api';
import { useFetch } from './useFetch';

export function useSpaces() {
  const { data, ...estado } = useFetch(() => spacesApi.list(), []);
  return { spaces: data ?? [], ...estado };
}
