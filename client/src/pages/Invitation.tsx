import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import NavBar from '../components/NavBar';
import { socketContext } from '../context/socket';

type Params = {
    id: string
}

const Invitation: React.FC = () => {

    const socket = useContext<Socket>(socketContext);
    const {id} = useParams<Params>();
    const [pseudo, setPseudo] = useState<string>('');
    const [alert, setAlert] = useState<string>('');
    const navigate = useNavigate();

    socket.on('redirectToSettings', (id: string) => {
        navigate(`/${id}`)
    })

    socket.on('alert', (msg: string) => {
        setAlert(msg);
    })

    const join = () => {
        socket.emit('join', {id: id, pseudo: pseudo});  
    }

    return (
        <div className='text-center'>
            <NavBar/>
            {
                alert !== '' ? <div className='container text-center alert alert-danger'>{alert}</div> : <div></div>
            }   
            <h2>Vous allez rejoindre la room : <strong>{id}</strong></h2>
            <div className="my-5 card m-auto w-25">
                <div className="card-header">Lien d'invitation</div>
                <div className="card-body p-5">
                    <input type="text" className='w-100 m-auto text-center form-control' placeholder='Entrez un nom' value={pseudo} onChange={(e) => {setPseudo(e.target.value)}} />
                </div>
                {
                    pseudo === ''
                    ? <input type="submit" className='btn btn-success' disabled value="Rejoindre" />
                    : <input type="submit" className='btn btn-success' onClick={join} value="Rejoindre" />
                }
                
            </div>
        </div>
    )
}

export default Invitation;