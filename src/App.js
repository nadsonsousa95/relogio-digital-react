import './App.css';
import React, {useState, useEffect} from 'react';

function App() {

  const [hora, setHora] = useState(12);
  const [minutos, setMinutos] = useState(30);
  const [segundos, setSegundos] = useState(0)

  //Acontece na renderização da página
  useEffect(() => {
    const interval = setInterval(() => {
      setSegundos((prevSegundos) => {
        let newSegundos = prevSegundos + 1;
        let newMinutos = minutos;
        let newHora = hora;
  
        if (newSegundos > 59) {
          newSegundos = 0;
          newMinutos += 1;
        }
  
        if (newMinutos > 59) {
          newMinutos = 0;
          newHora = (hora + 1) % 24;
        }
  
        setHora(newHora);
        setMinutos(newMinutos);
        return newSegundos;
      });
    }, 1000);
  
    return () => clearInterval(interval);
  }, [hora, minutos]); // Dependências corrigidas
  
    //Ajuste de hora manual
    const handleSubmit = (event) => {
      //Permite que a função processe os dados sem recarregar a página
      event.preventDefault();
      // Captura os dados do formulário
      const formData = new FormData(event.target);
      // parseInt: converte a string para inteiro, formData.get(): captura o valor digitado no campo
      const newHora = parseInt(formData.get('Horas')) || 0;
      const newMinutos = parseInt(formData.get('Minutos')) || 0;
      const newSegundos = parseInt(formData.get('Segundos')) || 0;

      setHora(newHora);
      setMinutos(newMinutos);
      setSegundos(newSegundos);
    }

    const handleClear = (event) => {
      setHora('');
      setMinutos('');
      setSegundos('');
    }

  return (
    <div className="App">
      <h2>Ajuste o horário do seu <span>relógio!</span></h2>
      <form className='form-ajuste' onSubmit={handleSubmit}>
        <input type='number' placeholder='Horas' name='Horas' min={0} max={23}/>
        <input type='number' placeholder='Minutos' name='Minutos'min={0} max={59}/>
        <input type='number' placeholder='Segundos' name='Segundos' min={0} max={59}/>
        <button type='submit'>Ajustar</button>
      </form>

      <h1>{hora.toString().padStart(2, '0')}:{
      minutos.toString().padStart(2, '0')}:{
        segundos.toString().padStart(2, '0')}</h1>
    </div>
  );
}

export default App;
