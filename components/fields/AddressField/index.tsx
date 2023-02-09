import autocompletionRequestBuilder from 'components/ui/Inputs/InputAddress/helpers/autocompletionRequestBuilder'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useField } from 'formik'
import { IField, InputStyleType } from 'types/types'
import { AutocompletionRequest } from './GooglePlacesAutocomplete.types'
import injectScript from './helpers/injectScript'
import SelectField from '../SelectField'

interface Props<T> extends IField<T> {
  styleType?: InputStyleType
  input?
  autocompletionRequest
  debounce: number
  minLengthAutocomplete: number
  selectProps
  onLoadFailed
  withSessionToken: boolean
}

export default function AddressField(props: Props<string>) {
  // @ts-ignore
  const [field, meta, helpers] = useField(props)
  const [options, setOptions] = useState([])

  const apiKey = `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`

  const [placesService, setPlacesService] = useState<google.maps.places.AutocompleteService | undefined>(undefined)
  const [sessionToken, setSessionToken] = useState<google.maps.places.AutocompleteSessionToken | undefined>(undefined)
  const fetchSuggestions = useDebouncedCallback((value: string): void => {
    const autocompletionReq: AutocompletionRequest = { ...props.autocompletionRequest }
    placesService.getPlacePredictions(
      autocompletionRequestBuilder(
        autocompletionReq,
        value,
        props.withSessionToken && sessionToken,
      ), (suggestions) => {
        if (!suggestions) {
          return
        }
        setOptions(suggestions.map(suggestion => {
          return { label: suggestion.description, value: suggestion.description }
        }))
      }
    )
  }, props.debounce)

  const initializeService = () => {
    if (!window.google) throw new Error('[react-google-places-autocomplete]: Google script not loaded')
    if (!window.google.maps) throw new Error('[react-google-places-autocomplete]: Google maps script not loaded')
    if (!window.google.maps.places) throw new Error('[react-google-places-autocomplete]: Google maps places script not loaded')

    setPlacesService(new window.google.maps.places.AutocompleteService())
    setSessionToken(new google.maps.places.AutocompleteSessionToken())
  }
  useEffect(() => {
    const init = async () => {
      try {
        if (apiKey) await injectScript(apiKey)
        initializeService()
      } catch (error) {
        props.onLoadFailed(error)
      }
    }

    init()
  }, [])

  const handleOnSearchChange = (value) => {

    if (!value) {
      return
    }
    fetchSuggestions(value)
  }

  return (
    <SelectField label={props.label} name={props.name} options={options as [{ label: string, value: any }]} onInputChange={handleOnSearchChange} />
  )
}

AddressField.defaultProps = {
  autocompletionRequest: {},
  debounce: 300,
  minLengthAutocomplete: 0,
  selectProps: {},
  onLoadFailed: console.error,
  withSessionToken: false,
}
