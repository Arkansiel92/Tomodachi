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
            

            <div className="card w-25 m-auto">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            {
                                card === "create"
                                ? <button className="nav-link active">Partie privée</button>
                                : <button className="nav-link" onClick={() => {setCard('create')}}>Partie privée</button>
                            }
                        </li>
                        <li className="nav-item">
                            {
                                card === "join"
                                ? <button className="nav-link active">Rejoindre</button>
                                : <button className="nav-link" onClick={() => {setCard('join')}}>Rejoindre</button>
                            }
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    {
                        card === "create"
                        ?   <div>
                            <div className="form-group mt-3">
                                <label className='form-label'>Nom du joueur</label>
                                <input type="text" className='form-control' value={pseudo} placeholder="Entrez votre nom" onChange={(e) => {setPseudo(e.target.value)}} />
                            </div>   
                            <div className="form-group my-3">
                                <select className='my-3 form-select' value={players} name="players" onChange={(e) => {setPlayers(Number(e.target.value))}}>
                                    <option value="2">2 joueurs</option>
                                    <option value="3">3 joueurs</option>
                                    <option value="4">4 joueurs</option>
                                    <option value="5">5 joueurs</option>
                                    <option value="6">6 joueurs</option>
                                </select>
                            </div>
                            <div className='my-3'>
                                {
                                    pseudo === ''
                                    ? <button type="submit" disabled className='btn btn-success'>Créer</button>
                                    : <button type="submit" onClick={handleSubmit} className='btn btn-success'>Créer</button>
                                } 
                            </div>
                        </div>
                        : <div>
                            <div className="form-group mt-3">
                                <label className='form-label'>Nom du joueur</label>
                                <input type="text" className='form-control' value={pseudo} placeholder="Entrez votre nom" onChange={(e) => {setPseudo(e.target.value)}} />
                            </div>   

                            <div className="form-group my-3">
                                <input type="text" className='form-control' value={room} placeholder="ID du lobby" onChange={(e) => {setRoom(e.target.value)}} />
                            </div>
                            <div className='my-3'>
                                {
                                    pseudo === '' || room === ''
                                    ? <button type="submit" disabled className='btn btn-success'>Rejoindre</button>
                                    : <button type="submit" onClick={join} className='btn btn-success'>Rejoindre</button>
                                } 
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;