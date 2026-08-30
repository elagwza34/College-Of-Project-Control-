import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import UiFoundationPage from './UiFoundationPage'

describe('UiFoundationPage', () => {
  it('presents the approved primary colour and a single page heading', () => {
    render(
      <HelmetProvider>
        <UiFoundationPage />
      </HelmetProvider>,
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('A clear visual foundation')
    expect(screen.getAllByText('#003F3C')).toHaveLength(2)
  })
})
