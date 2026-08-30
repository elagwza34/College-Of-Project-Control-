import { configureStore, createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: { isMobileMenuOpen: false },
  reducers: {
    openMobileMenu: (state) => { state.isMobileMenuOpen = true },
    closeMobileMenu: (state) => { state.isMobileMenuOpen = false },
    toggleMobileMenu: (state) => { state.isMobileMenuOpen = !state.isMobileMenuOpen },
  },
})

export const uiActions = uiSlice.actions

export const store = configureStore({
  reducer: { ui: uiSlice.reducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

