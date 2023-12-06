// Un test unitaire pour chaque composant de l'application.
test('InputWithLabel renders correctly', () => {
  const handleChange = jest.fn();
  render(<InputWithLabel id="search" value="test" onInputChange={handleChange}>Search:</InputWithLabel>);

  const input = screen.getByLabelText('Search:');
  expect(input).toBeInTheDocument();
  expect(input.value).toBe('test');

  userEvent.type(input, ' new value');
  expect(handleChange).toHaveBeenCalledWith({ target: { value: 'test new value' } });
});
