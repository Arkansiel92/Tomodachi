import {useContext, useEffect, useState} from 'react';
import {socketContext, ExtendedSocket } from '../context/socket';
import Places from '../components/Room/Places';
import NavBar from '../components/NavBar';

interface RoomProps {
    status: string,
    author: string,
    nbPlayers: number,
    players: string[],
    place: Place,
    professions: string[],
    sockets: string[],
    votes: string[]
}

export interface Place {
    place: string,
    professions: string[],
    img: string,
    spyProfession: string
}

const Agent: React.FC = () => {

    const socket = useContext<ExtendedSocket>(socketContext);
    const [room, setRoom] = useState<RoomProps | null>(null);
    const [places, setPlaces] = useState<Place[] | null>(null);
    const [role, setRole] = useState<string>('');
    const [profession, setProfession] = useState<string>('');
    const [spy, setSpy] = useState<string>('');
    const [place, setPlace] = useState<string>('');
    const [vote, setVote] = useState<string>('');

    const currentUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentUrl.search);
    const id = searchParams.get('r');

    socket.off('nextRound').on('nextRound', () => {
        setSpy('');
        setPlace('');
        setVote('');
        setRole('');
        setProfession('');

        socket.emit('getRoom');
        socket.emit('getPlaces');
        socket.emit('role', id);

        console.log('prochain round !');
    }) 

    socket.off('finish').on('finish', (place) => {
        setPlace(place);
    }) 

    socket.off('reveal').on('reveal', (name) => {
        setSpy(name);
    })

    socket.off('profession').on('profession', profession => {
        setProfession(profession);
    })

    socket.off('role').on('role', role => {
        setRole(role);
    })

    socket.off('getPlaces').on('getPlaces', places => {
        setPlaces(places);
    })

    socket.off('getRoom').on('getRoom', (room) => {
        setRoom(room);
    })

    useEffect(() => {
        if(room === null) {
            socket.emit('getRoom');
        }

        if (places === null) {
            socket.emit('getPlaces');
        }

        if(role === '') {
            socket.emit('role', id);
        }
    }, [socket, id, room, places, role])

    return (
        <div>
            <NavBar/>
            <div className="container-fluid">
                <div className='text-center'>
                    {
                        place !== '' && room?.author === socket.id
                        ? <button onClick={ () => {socket.emit('nextRound')} } className='btn btn-warning'>Partie suivante</button>
                        : <p></p>
                    }
                </div>
                <div className='my-5 text-center'>
                    <h2>
                        {place}
                    </h2>
                </div>
                <div className="text-center">
                    {
                        role === 'Agent'
                        ?   <div className='container'>
                                <h1 className='text-success'>{role}</h1> 
                                    <div><h4 className='text-muted'><strong>Lieu :</strong> {room?.place.place} </h4></div>
                                    <div><h4 className='text-muted'><strong>Rôle :</strong> {profession}</h4></div>
                                
                            </div>
                        :   <div className='container'>
                                <h1 className='text-danger'>{role}</h1>
                                {
                                    spy !== ''
                                    ? <input type="submit" disabled className='mt-3 btn btn-danger' value="Se dévoiler et trouver le lieu" />
                                    : <input type="submit" onClick={() => {socket.emit("reveal", socket.id)}} className='mt-3 btn btn-danger' value="Se dévoiler et trouver le lieu" /> 
                                }
                                
                            </div>
                    }
                </div>
                <div className='row mt-5 text-center'>
                    <div className="col text-center">
                        {room?.players.map((player: string, index: number) => (
                            <div key={index}>
                                {
                                    room?.sockets[index] !== socket.id && role === 'Agent'
                                    ?
                                    <div className="col">
                                        <div className="card my-3">
                                            <div className="card-body">
                                                <h3>{player}</h3>
                                                {
                                                    spy !== ''
                                                    ? <h4> {room?.sockets[index] === spy ? <h4 className="text-danger">Espion</h4> : <h4 className="text-success">Agent</h4> }</h4>
                                                    : <h4>?</h4>
                                                }
                                                {
                                                    spy !== ''
                                                    ? <div></div>
                                                    : <input type="submit" onClick={() => { if(vote !== room?.sockets[index]) { setVote(room?.sockets[index]); socket.emit('vote', room?.sockets[index]) } else { setVote(''); socket.emit('vote', '') } }} className='btn btn-danger' value="Accuser" />
                                                }
                                                {
                                                    vote !== '' && vote === room?.sockets[index]
                                                    ? <p className='text-danger'><strong>Vote</strong></p>
                                                    : <div></div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div></div>
                                }
                                {
                                    room?.sockets[index] !== socket.id && role === 'Espion'
                                    ?
                                    <div key={index} className="col">
                                        <div className="card my-3">
                                            <div className="card-body">
                                                <h3>{player}</h3>
                                                <h4 className='text-success'>Agent</h4>
                                                <input type="submit" onClick={() => { if(vote !== room?.sockets[index]) { setVote(room?.sockets[index]); socket.emit('vote', room?.sockets[index]) } else { setVote(''); socket.emit('vote', '') } }} className='btn btn-danger ' value="Accuser" />
                                                {
                                                    vote !== '' && vote === room?.sockets[index]
                                                    ? <p className='text-danger'><strong>Vote</strong></p>
                                                    : <div></div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div></div>
                                }

                            </div>
                        ))}
                    </div>
                    <div className="col-9">
                        <div className="row">
                            {places?.map((place: Place, index: number) => (
                                <Places key={index} props={place} spy={spy} role={role} socket={socket}/>
                            ))} 
                        </div>
                    </div>
                </div>
                </div>
            </div>
    )
}

export default Agent;