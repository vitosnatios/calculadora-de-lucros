import './App.css';
import Input from './Components/Input';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [investimento, setInvestimento] = useState('');
  const [rendimento, setRendimento] = useState('');
  const [meses, setMeses] = useState('');
  const [mediaInput, setMediaInput] = useState('');
  const [media, setMedia] = useState([]);
  const [error, setError] = useState('');
  const [mediaDosValores, setMediaDosValores] = useState('');

  const lucro = investimento * (rendimento / 100);

  const toReal = (n) => {
    return n.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleClick = () => {
    if (mediaInput.length > 0) {
      setError('');
      setMedia([...media, mediaInput]);
      setMediaInput('');
    } else {
      setError('Por favor, insira algum número.');
    }
  };

  const handleDelete = ({ target }) => {
    const buttonIndex = target.value;
    const filtered = media.filter((m, index) => {
      return +buttonIndex !== index;
    });
    setMedia([...filtered]);
  };

  useEffect(() => {
    setMediaDosValores((prev) => {
      if (media.length) {
        const somaDosValores = media.reduce((prev, cur) => {
          return prev + +cur;
        }, 0);
        return somaDosValores / media.length;
      }
    });
    window.scrollTo(0, document.body.scrollHeight);
  }, [media]);

  return (
    <div className='app'>
      <fieldset className='grid'>
        <legend>
          <h1>Calculadora de lucros</h1>
        </legend>
        <div className='flexInput'>
          <Input
            id='investimento'
            value={investimento}
            setState={setInvestimento}
            label='Quantia investida: '
            prefix='R$ '
          />
          <h3 className='num'>{investimento && toReal(+investimento) + '.'}</h3>
        </div>

        <div className='flexInput'>
          <Input
            id='rendimento'
            value={rendimento}
            setState={setRendimento}
            label='Rendimento: '
            prefix='% '
          />
          <h3 className='num'>{rendimento && rendimento + '%.'}</h3>
        </div>

        <h3>
          Você teve um lucro de: <span className='num'>{toReal(lucro)}</span>.
        </h3>

        <h3>
          Com o investimento inicial, são:{' '}
          <span className='num'>{toReal(+investimento + lucro)}</span>.
        </h3>

        <h3 className='mes'>
          Caso você tivesse um rendimento de {rendimento}% por{' '}
          <Input
            id='meses'
            value={meses}
            setState={setMeses}
            label=''
            prefix=''
            placeholder='meses'
            style={{ width: '100px' }}
          />
          meses, estaria com {toReal(lucro * meses)}, jutando com o investimento
          inicial, {toReal(lucro * meses + +investimento)}.
        </h3>

        <h3 className='media'>
          Tire a média das suas porcentagens de rendimento:
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              id='media'
              value={mediaInput}
              setState={setMediaInput}
              label=''
              prefix=''
              placeholder=''
            />
            {error && <span className='erro'>{error}</span>}
            <button className='button' onClick={handleClick}>
              adicionar
            </button>
          </form>
        </h3>
        {media.length !== 0 && (
          <div>
            <h3>
              A média entre{' '}
              {media.map((m, index) => (
                <button
                  onClick={handleDelete}
                  value={index}
                  key={index}
                  className='buttonMedia'
                >
                  {m}
                </button>
              ))}{' '}
              é <button className='button'>{mediaDosValores}</button>
            </h3>
          </div>
        )}
      </fieldset>
    </div>
  );
}

export default App;
