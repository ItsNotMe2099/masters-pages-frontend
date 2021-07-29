import GooglePlacesAutocompleteProps, { AutocompletionRequest } from "components/ui/Inputs/InputAddress/GooglePlacesAutocomplete.types";
import autocompletionRequestBuilder from "components/ui/Inputs/InputAddress/helpers/autocompletionRequestBuilder";
import injectScript from "components/ui/Inputs/InputAddress/helpers/injectScript";
import SelectInput from "components/ui/Inputs/SelectInput";
import { useEffect, useState } from "react";
import { IRootState } from "types";
import { useDebouncedCallback } from "use-debounce";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'

interface Props {

}

export default function InputAddress({
                                       input,
                                       autocompletionRequest = {},
                                       debounce = 300,
                                       minLengthAutocomplete = 0,
                                       selectProps = {},
                                       onLoadFailed = console.error,
                                       withSessionToken = false,
                                       ...rest
                                     }) {
  const dispatch = useDispatch()
  const [value, setValue] = useState();
  const [options, setOptions] = useState([]);
  const handleOnChange = (value) => {
    input.onChange(value);
  }

  const apiKey = `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;

  const [placesService, setPlacesService] = useState<google.maps.places.AutocompleteService | undefined>(undefined);
  const [sessionToken, setSessionToken] = useState<google.maps.places.AutocompleteSessionToken | undefined>(undefined);
  const fetchSuggestions = useDebouncedCallback((value: string): void => {
    const autocompletionReq: AutocompletionRequest = { ...autocompletionRequest };
    placesService.getPlacePredictions(
      autocompletionRequestBuilder(
        autocompletionReq,
        value,
        withSessionToken && sessionToken,
      ), (suggestions) => {
        if (!suggestions) {
          return;
        }
        setOptions(suggestions.map(suggestion => {
          return { label: suggestion.description, value: suggestion.description };
        }))
      }
    );
  }, debounce);

  const handleOnSearchChange = (value) => {

    if (!value) {
      return;
    }
    setValue(value)
    fetchSuggestions.callback(value)
  }

  const initializeService = () => {
    if (!window.google) throw new Error('[react-google-places-autocomplete]: Google script not loaded');
    if (!window.google.maps) throw new Error('[react-google-places-autocomplete]: Google maps script not loaded');
    if (!window.google.maps.places) throw new Error('[react-google-places-autocomplete]: Google maps places script not loaded');

    setPlacesService(new window.google.maps.places.AutocompleteService());
    setSessionToken(new google.maps.places.AutocompleteSessionToken());
  }
  useEffect(() => {
    const init = async () => {
      try {
        if (apiKey) await injectScript(apiKey);
        initializeService();
      } catch (error) {
        onLoadFailed(error);
      }
    }

    init();
  }, []);

  return (
    <SelectInput {...rest}
                 allowCustomInput={true}
                 input={input}
                 options={options as [{label: string, value: any}]}
                 onSearchChange={handleOnSearchChange}/>
  )
}
