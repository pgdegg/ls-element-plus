import { withInstall } from '@element-plus/utils'
import Autocomplete from './src/autocomplete.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElAutocomplete: SFCWithInstall<typeof Autocomplete> =
  withInstall(Autocomplete)

export default ElAutocomplete

export { autocompleteEmits } from './src/autocomplete'
export type {
  AutocompleteDataItem,
  AutocompleteData,
  AutocompleteFetchSuggestionsCallback,
  AutocompleteFetchSuggestions,
  AutocompletePlacement,
  AutocompleteProps,
  AutocompleteEmits,
  AutocompleteInstance,
} from './src/autocomplete'
