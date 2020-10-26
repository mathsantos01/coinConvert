import React, {Component} from 'react';
import Cabecalho from './cabecalho.js';
import "./style.css";


class Converter extends Component{

  /*DADOS API (MOEDAS É O TIPO DO CÂMBIO, BASE É O PRIMEIRO CALCULO, MONTANTE É O VALOR DA MOÉDA, CONVERTTO É A MOEDA QUE VAI TER O RESULTADO CONVERTIDO*/
  state ={
    moedas: ['USD', 'AUD', 'SGD', 'PHP', 'EUR', 'BRL', 'RUB', 'CAD', 'JPY', 'NOK'],
    base: 'BRL',
    montante: "",
    convertTo: "USD",
    result: "",
    date:"",
  }

  /*FUNÇÃO PARA PEGAR O DADO DO SELECT*/
  handleSelect = e =>{
    this.setState({
      [e.target.name]: e.target.value
    },
    this.api
    )
  }

  /*FUNÇÃO PARA PEGAR O DADO DO INPUT*/
  handleInput = e =>{
    this.setState({
      montante: e.target.value},
      this.api
      )
      
  }

  /*FETCH API*/  
  api = () => {
    const montante = this.state.montante;

    if(montante === isNaN){
    return
    }else	{

      /*LINK FETCH USANDO UMA BASE (DOLAR, EURO, REAL, ETC...) PARA A API*/ 
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
        
        <div class="centralizar">
          <div> 
            <form>
              <input
              class="input"
              type= "number"
              value={montante}
              onChange={this.handleInput} 
              placeholder="0.00"        
            
              ></input>
              

              <select 
              class="select"
              name="base"
              value={base}
              onChange={this.handleSelect}
              >
              {moedas.map(moeda => 
                  <option 
                  key={moeda}
                  value={moeda}>
                  {moeda}
                    
                  </option>
                )}
              </select>

            </form>

            <form > 
            
              <input 
              class="input"
              disabled={true} 
              value={result}
              placeholder="0.00"
              ></input>

              <select
              class="select"
              name="convertTo"
              value={convertTo}
              onChange={this.handleSelect}
              >
                {moedas.map(moeda => (
                  <option 
                  key={moeda}
                  value={moeda}>
                  {moeda}
                    
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

