import NavBar from "../components/NavBar";
import {useContext, useEffect, useState} from 'react';
import {socketContext, ExtendedSocket } from '../context/socket';


interface RoomProps {
    status: string,
    author: string,
    nbPlayers: number,
    players: string[],
    sockets: string[],
    votes: string[]
}

interface target {
    name: string,
    count: number
}

const Wich: React.FC = () => {

    const socket = useContext<ExtendedSocket>(socketContext);
    const [room, setRoom] = useState<RoomProps | null>(null);
    const [question, setQuestion] = useState<string>('');
    const [vote, setVote] = useState<string>('');
    const [target, setTarget] = useState<target>({name: '', count: 0});

    socket.off('target').on('target', (player: target) => {
        setTarget({name: player.name, count: player.count});
    })

    socket.off('getRoom').on('getRoom', (room) => {
        setRoom(room);
    })

    socket.off('getQuestion').on('getQuestion', (question) => {
        setTarget({name: '', count: 0})
        setVote('');
        setQuestion(question);
    })

    const isVote = (player: string) => {
        if (target.name === '') {
            if (vote !== player) {
                setVote(player);
                socket.emit('vote', player) 
            } else {
                setVote('');
                socket.emit('vote', '');
            }
        }
    }

    useEffect(() => {
        if(room === null) {
            socket.emit('getRoom');
        }

        if (question === '') {
            socket.emit('getQuestion', question);
        }
    }, [socket, room, question]);

    return (
        <div>
            <NavBar/>
            <div className="text-center my-5">
                <h1>Qui de nous...</h1>
                <h2>{question} ?</h2>
            </div>
            <div className="row container m-auto my-5 text-center">
                {room?.players.map((player: string, index: number) => (
                    <div key={index} className="col">
                        <div className="card">
                            <div className="card-body">
                                <h4>{player}</h4>
                                {
                                    vote === player
                                    ? <button onClick={() => {isVote(player)}} className="btn btn-success">Voter</button>
                                    : <button onClick={() => {isVote(player)}} className="btn btn-warning">Voter</button>
                                }
                            </div>
                            <div className="card-footer">
                                {
                                    room?.votes[index] !== ''
                                    ? <div>Vote : {room?.votes[index]}</div>
                                    : <div>Vote : <i>aucun</i></div>
                                }
                            </div>
                        </div>
                    </div>
                ))}
                <div>
                    {
                        target.name !== ''
                        ? <div className="my-5">
                            <h1>Le groupe a voté pour {target.name} avec {target.count} voix !</h1>
                            {
                                socket.id === room?.author
                                ? <button className="btn btn-warning" onClick={ () => {setQuestion(''); socket.emit('getQuestion')} }>Prochain round</button>
                                : <button className="btn btn-warning" disabled>Prochain round</button>
                            }
                        </div>
                        : ""
                    }
                </div>
            </div>
        </div>
    )
}

export default Wich;