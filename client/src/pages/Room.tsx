import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { socketContext, ExtendedSocket } from '../context/socket';
import NavBar from '../components/NavBar';

type Params = {
    id: string
}

interface RoomProps {
    status: string,
    author: string,
    game: string,
    describe: string,
    nbPlayers: number,
    players: string[],
    sockets: string[],
    anonymous: boolean,
    self: boolean,
    rounds: number
}

const Room: React.FC = () => {

    const socket = useContext<ExtendedSocket>(socketContext);
    const { id } = useParams<Params>();
    const navigate = useNavigate();
    const [room, setRoom] = useState<RoomProps>();
    const [rounds, setRounds] = useState<number>(10);
    const [anonymous, setAnonymous] = useState<boolean>(true);
    const [self, setSelf] = useState<boolean>(true);

    socket.on('redirectToGame', () => {
        if (room?.game === "Agent Trouble") {
            navigate(`AgentTrouble?r=${id}g=${room?.game}`);
        } else if (room?.game === "Qui de nous ?") {
            navigate(`WichOfUs?r=${id}g=${room?.game}`);
        }
    })

    const handleRounds = (rounds: string) => {
        setRounds(Number(rounds));

        socket.emit('setRounds', rounds);
    }

    const handleAnonymous = () => {
        if (anonymous === true) {
            setAnonymous(false);
        } else {
            setAnonymous(true);
        }

        console.log(anonymous);

        socket.emit('setAnonymous', anonymous);
    }

    const handleSelf = () => {
        if (self === true) {
            setSelf(false);
        } else {
            setSelf(true);
        }

        console.log(self);

        socket.emit('setSelf', self);
    }

    useEffect((): void => {
        socket.emit('isRoom', id);

        socket.off('getRoom').on('getRoom', (room) => {
            setRoom(room);
        })

        socket.off('isRoom').on('isRoom', ({ isRoom }) => {
            if (isRoom === false) {
                navigate('/');
            } else {
                socket.emit('getRoom');
            }
        })

    }, [socket, id, navigate])

    return (
        <div>
            <NavBar />
            <div className="container mb-5">
                <h1 className="text-center border-bottom m-5 p-3">{room?.game}</h1>
                <div className="card m-auto w-50 text-center">
                    <div className="card-header">
                        Identifiant
                    </div>
                    <div className="card-body">
                        {id}
                    </div>
                </div>
            </div>
            <div className="row mx-5">
                <div className="col text-center">
                    <ul className="list-group list-group-flush">
                        {room?.players.map((player: string, index: number) => (
                            <li key={index} className="list-group-item">
                                <h3 style={{color: '#b4c5bb'}}>{player}</h3>
                            </li>
                        ))}
                        {
                            socket.id === room?.author && room?.sockets.length === room?.nbPlayers
                                ? <button className='m-3 btn btn-warning' onClick={() => { socket.emit('redirectToGame') }}>Prêt</button>
                                : <button disabled className='m-3 btn btn-warning'>Prêt</button>
                        }
                    </ul>
                </div>
                <div className="col-7">
                    <div className="card">
                        <div className="card-title text-center">{room?.game}</div>
                        <div className="card-body">
                            <h4 className="my-3 border-bottom">Description</h4>
                            {room?.describe}
                            <div className="my-3">
                                <h4 className='my-3 border-bottom'>Règle du jeu</h4>
                                { 
                                    socket.id === room?.author
                                    ? <div>
                                        <label className='form-label'>Nombre de rounds : {rounds}</label>
                                        <input type="range" min={5} max={25} className='form-range' onChange={(e) => {handleRounds(e.target.value)}} value={rounds} />
                                        <div className="form-check form-switch">
                                            <input type="checkbox" className='form-check-input' onChange={handleAnonymous} />
                                            <label className="form-check-label">Votes anonymes</label>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input type="checkbox" className='form-check-input' onChange={handleSelf} />
                                            <label className="form-check-label">Voter pour soi-même</label>
                                        </div>
                                    </div>
                                    : <div>
                                        <label className='form-label'>Nombre de rounds : {room?.rounds}</label>
                                        <input type="range" min={5} max={25} className='form-range' disabled value={room?.rounds} />
                                        <p>Vote anonyme : {anonymous === true ? "Activé" : "Désactivé"} </p>
                                        <p>Vote pour soi-même : {self === true ? "Activé" : "Désactivé"}</p>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Room;