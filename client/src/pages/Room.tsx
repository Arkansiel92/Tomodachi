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
    sockets: string[]
}

const Room: React.FC = () => {

    const socket = useContext<ExtendedSocket>(socketContext);
    const { id } = useParams<Params>();
    const navigate = useNavigate();
    const [room, setRoom] = useState<RoomProps>();

    socket.on('redirectToGame', () => {
        if (room?.game === "Agent Trouble") {
            navigate(`AgentTrouble?r=${id}g=${room?.game}`);
        } else if (room?.game === "Wich of us") {
            navigate(`WichOfUs?r=${id}g=${room?.game}`);
        }
    })

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
                        Lien d'invitation
                    </div>
                    <div className="card-body">
                        {window.origin}/invite/{id}
                    </div>
                </div>
            </div>
            <div className="row mx-5">
                <div className="col text-center">
                    <ul className="list-group list-group-flush">
                        {room?.players.map((player: string, index: number) => (
                            <li key={index} className="list-group-item">
                                <h3>{player}</h3>
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
                        <div className="card-title text-center">Règle : {room?.game}</div>
                        <div className="card-body">
                            {room?.describe}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Room;