import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState} = createGlobalState({
    search: ""
    
    
})

export { setGlobalState, useGlobalState }