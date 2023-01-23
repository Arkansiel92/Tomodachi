import { useState } from 'react';
import NavBar from "../components/NavBar";


const Jerk = () => {

    const [count, setCount] = useState<number>(0);

    return (
        <div>
            <NavBar/>
            <div className="mb-5 card container">
                <div className="card-body">
                    <h5 className="card-title">Règle</h5>
                    <p className="card-text">
                        Le jeu du con : se joue à deux personnes. 
                        Chacun leur tour, les personnes devront annoncer une carte. 
                        Si la carte tirée est mauvaise, la personne qui a annoncé 
                        la carte boit et ajoute un au compteur. Cependant si la carte est 
                        bonne, la seconde personne boit la totalité des gorgées 
                        accumulées jusque là puis remet le compteur à zéro.
                    </p>
                </div>
            </div>
            <div className="row text-center container-fluid">
                <div className='col'><h1>{count}</h1></div>
                <div className='col'>
                    <button onClick={() => {setCount(count + 1)}} className='btn btn-warning'>Ajouter une gorgée</button><br />
                    <button onClick={() => {setCount(0)}} className='my-5 btn btn-success'>Remettre à zéro</button>
                </div>
            </div>
        </div>
    )
}

export default Jerk;