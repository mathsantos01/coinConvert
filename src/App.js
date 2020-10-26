import React, {Component} from 'react';
import Cabecalho from './cabecalho.js';
import "./style.css";

class Converter extends Component{

  state ={
    moedas: ['USD', 'AUD', 'SGD', 'PHP', 'EUR', 'BRL', 'RUB', 'CAD'],
    base: 'BRL',
    montante: "",
    convertTo: "USD",
    result: "",
    date:"",
  }

  handleSelect = e =>{
    this.setState({
      [e.target.name]: e.target.value
    },
    this.api
    )
  }

  handleInput = e =>{
    this.setState({
      montante: e.target.value},
      this.api
      )
      
  }

  /*FECTH API*/  
  api = () => {
    const montante = this.state.montante;

    if(montante === isNaN){
    return
    }else	{

      /*LINK FETCH USANDO O DOLAR COMO BASE PARA A API*/ 
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
      .then(res => res.json())
      .then(data => {
        const date = data.dates;
        /*CALCULO PARA CONVERTER O TIPO DA MOEDA (COTAÇÃO ATUAL DA MOEDA SELECIONADO x MONTANTE DA API)*/
        const result = (data.rates[this.state.convertTo] * montante).toFixed(2);
        this.setState({
          result,
          date
        });
      });
    }
  };

  render(){
    
    /* FRONT-END */
    const {moedas, base, montante, convertTo, result, date} = this.state
    return(
     
      <div>

          <Cabecalho/>
        
        <h5 class="texto">{montante} {base} Convertido para {convertTo} é igual a: </h5>
        <h2 class="texto2">{result} {convertTo}</h2>
        <p>{date}</p>
        
        <div className="row" class="centralizar">
          <div> 
            <form>
              <input
              class="input"
              type= "number"
              value={montante}
              onChange={this.handleInput} 
              ></input>
              

              <select 
              class="select"
              name="base"
              value={base}
              onChange={this.handleSelect}
              >
              {moedas.map(currency => 
                  <option 
                  key={currency}
                  value={currency}>
                  {currency}
                    
                  </option>
                )}
              </select>

            </form>

            <form > 
              <input 
              class="input"
              disabled={true} 
              value={result}
              
              ></input>

              <select
              class="select"
              name="convertTo"
              value={convertTo}
              onChange={this.handleSelect}
              >
                {moedas.map(currency => (
                  <option 
                  key={currency}
                  value={currency}>
                  {currency}
                    
                  </option>
                ))}
              </select>
            </form>
          </div>  
        </div>
      </div>
    )
  }
}

export default Converter

