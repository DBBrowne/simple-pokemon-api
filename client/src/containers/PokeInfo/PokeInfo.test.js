import { render, screen } from '@testing-library/react';
import PokeInfo from './PokeInfo';

const notLegendary = {
  id: 4,
  name: 'charmander',
  description: 'Demo Description',
  isLegendary: false,
}
const legendary = {
  ...notLegendary,
  isLegendary: true,
}

const errorText = 'We couldn\'t find that one. How about:'

describe('Component: PokeInfo', ()=>{
  it('shows the pokemon info', () => {
    render(<PokeInfo pokeData={notLegendary} isError={false}/>)
    const descElement = screen.getByText(notLegendary.description)
    expect(descElement).toBeInTheDocument()
  });
  it('does NOT show legendary if NOT Legendary', () => {
    render(<PokeInfo pokeData={notLegendary} isError={false}/>)
    const legendaryTitle = screen.queryByText(/Legendary!/)
    const pokemonWrapper = screen.queryByRole('article')
    expect(legendaryTitle).not.toBeInTheDocument()
    expect(pokemonWrapper).toBeInTheDocument()
    expect(pokemonWrapper.classList).not.toContain('legendary');

  });
  it('does show legendary if Legendary', () => {
    render(<PokeInfo pokeData={legendary} isError={false}/>)

    const legendaryTitle = screen.queryByText(/Legendary!/)
    const pokemonWrapper = screen.queryByRole('article')
    expect(legendaryTitle).toBeInTheDocument()
    expect(pokemonWrapper).toBeInTheDocument()
    expect(pokemonWrapper.classList).toContain('legendary');
  });
  it('shows error test if isError', () => {
    render(<PokeInfo pokeData={notLegendary} isError={true}/>)
    const errorTxtElement = screen.getByText(errorText)
    expect(errorTxtElement).toBeInTheDocument()
  });
})