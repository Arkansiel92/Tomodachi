import {Place} from "../../pages/Agent";
import { ExtendedSocket } from "../../context/socket";

interface Props {
    props: Place,
    key: number,
    spy: string,
    role: string,
    socket: ExtendedSocket
}

const Places: React.FC<Props> = ({props, spy, role, socket}) => {

    return (
        <div className="col-sm-3 m-3">
            <div className="card px-3 w-100 h-100" style={{backgroundImage:`url(/assets/${props.img})`}}>
                <div className="card-body">
                    <h5 className="card-title border-bottom">{props.place}</h5>
                    <h6 className="card-subtitle text-muted">{props.spyProfession}</h6>
                    {
                        role === "Espion" && spy !== ''
                        ? <button onClick={ () => {socket.emit('findPlace', props.place)} } className="mt-3 btn btn-danger">Valider</button>
                        : <div></div>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Places;