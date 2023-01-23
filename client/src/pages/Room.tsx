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
        navigate(`game?r=${id}`);
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
                <h1 className="text-center border-bottom m-5 p-3">Agent Trouble</h1>
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
                            socket.id === room?.author
                                ? <button className='m-3 btn btn-warning' onClick={() => { socket.emit('redirectToGame') }}>Prêt</button>
                                : <button disabled className='m-3 btn btn-warning'>Prêt</button>
                        }
                    </ul>
                </div>
                <div className="col-7">
                    <div className="card">
                        <div className="card-title text-center">Règle : Agent Trouble</div>
                        <div className="card-body">
                            «Un mot de trop peut couler un bateau.», ce dicton de l’armée pourrait être la devise de Agent Trouble.
                            En début de manche, les joueurs reçoivent secrètement une carte leur indiquant un même lieu, à l’exception d’un des joueurs qui reçoit une carte Espion. Ils se posent ensuite des questions pour tenter de savoir qui est qui : «il fait chaud non ? As-tu reçu ta paie ?» L’espion ne sait pas où il est. Il doit donc être attentif aux échanges pour tenter de le découvrir et parvenir à répondre aux questions qui lui seront posées ! N’importe quand, un joueur peut accuser quelqu’un d’être l’espion. S’il est percé à jour, les agents ont gagné. De son côté, l’espion peut mettre fin à la manche dès qu’il pense avoir découvert le lieu où elle se déroule. Agent trouble est un jeu de suspicion et de bluff qui ne ressemble à aucun autre : il faudra peser chaque mot pour ne pas trop se dévoiler.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Room;