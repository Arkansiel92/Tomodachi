import {useContext, useState, useEffect} from 'react';
import { socketContext, ExtendedSocket } from '../context/socket';
import NavBar from "../components/NavBar";
import { useNavigate } from 'react-router-dom';

export interface roomsProps {
    id: number,
    author: string,
    room: string,
    numberPlayers: number,
    sockets: string[],
    status: string
}

const Home: React.FC = () => {

    const socket = useContext<ExtendedSocket>(socketContext);
    const navigate = useNavigate();
    const [pseudo, setPseudo] = useState<string>('');
    const [players, setPlayers] = useState<number>(2);
    const [room, setRoom] = useState<string>('');
    const [alert, setAlert] = useState<string>('');
    const [card, setCard] = useState<string>('create');


    socket.on('redirectToSettings', (id: string) => {
        navigate(id)
    })

    socket.on('alert', (msg: string) => {
        setAlert(msg);
    })

    const handleSubmit = () => {
        let id: string = Date.now().toString();
        socket.emit('setRoom', {id : id, players: players, pseudo: pseudo})
        navigate(id)
    }

    const join = () => {
        socket.emit('join', {id: room, pseudo: pseudo});  
    }

    useEffect(() => {
        socket.emit('clear');
    }, [socket])

    return(
        <div>
            <NavBar/>
            {
                alert !== '' ? <div className='container text-center alert alert-danger'>{alert}</div> : <div></div>
            }   
            <div className="container border-bottom mb-5">
                <h1 className="text-center">Qui de nous ?</h1>
            </div>
            <div className="m-5">
                {
                    card === 'create'
                    ? <div className="w-25 card m-auto text-center">
                    <div>
                        <div className="card-header text-center"><h3>Partie privée</h3></div>
                            <div className="card-body p-5">
                            <div className="form-group mt-3">
                                <input type="text" className='w-100 m-auto form-control' value={pseudo} placeholder="Entrez votre nom" onChange={(e) => {setPseudo(e.target.value)}} />
                            </div>   
                            <div className="form-group my-3">
                                <select className='w-100 my-3 m-auto form-select' value={players} name="players" onChange={(e) => {setPlayers(Number(e.target.value))}}>
                                    <option value="2">2 joueurs</option>
                                    <option value="3">3 joueurs</option>
                                    <option value="4">4 joueurs</option>
                                    <option value="5">5 joueurs</option>
                                    <option value="6">6 joueurs</option>
                                </select>
                            </div>
                            {/* <select name="game" className='w-100 my-3 m-auto form-select'>
                                <option value="0">Choix du jeu</option>
                                <option value="agent-trouble">Agent Trouble</option>
                                <option value="wich-of-us">Qui de nous ?</option>
                            </select> */}
                            <div className='my-3'>
                                {
                                    pseudo === ''
                                    ? <button type="submit" disabled className='btn btn-success mx-3'>Go!</button>
                                    : <button type="submit" onClick={handleSubmit} className='btn btn-success mx-3'>Go !</button>
                                } 
                                <button onClick={() => {setCard('join')}} className="btn btn-warning mx-3">Rejoindre une partie</button>
                            </div>
                        </div>                                
                    </div>
                </div>
                    : <div className="w-25 card m-auto text-center">
                        <div className="card-header text-center"><h3>Rejoindre</h3></div>
                            <div className="card-body p-5">
                            <div className="form-group mt-3">
                                <input type="text" className='w-100 m-auto form-control' value={pseudo} placeholder="Entrez votre nom" onChange={(e) => {setPseudo(e.target.value)}} />
                            </div>   

                            <div className="form-group my-3">
                                <input type="text" className='w-100 m-auto form-control' value={room} placeholder="Identifiant" onChange={(e) => {setRoom(e.target.value)}} />
                            </div>
                            {/* <select name="game" className='w-100 my-3 m-auto form-select'>
                                <option value="0">Choix du jeu</option>
                                <option value="agent-trouble">Agent Trouble</option>
                                <option value="wich-of-us">Qui de nous ?</option>
                            </select> */}
                            <div className='my-3'>
                                {
                                    pseudo === '' || room === ''
                                    ? <button type="submit" disabled className='btn btn-success mx-3'>Go !</button>
                                    : <button type="submit" onClick={join} className='btn btn-success mx-3'>Go !</button>
                                } 
                                <button onClick={() => {setCard('create')}} className="btn btn-warning mx-3">Créer une partie</button>
                            </div>
                        </div>  
                    </div>
                }

            </div>
        </div>
    )
}

export default Home;