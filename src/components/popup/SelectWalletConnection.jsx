import React , {useState} from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom'

// https://api.qrserver.com/v1/create-qr-code/?data=

const SelectWalletConnection = () => {
    const [open, setOpen] = useState(true);


    return (
        <>
        <i className="far fa-wallet ms-3"
            key={'btn-connection-terra-wallet'}
            onClick={ () => { setOpen(!open) } }
        > </i>
        {
            open && (
            <div className="modal fade bd-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="smallModalToSelectWallet" aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="row">
                        {
                           
                                <button
                                    key={'connection-' + type + identifier}
                                    onClick={ () => { conosle.log('-----') } } >
                                    <img
                                        src={icon}
                                        alt={name}
                                        style={{ width: '1em', height: '1em' }}
                                    /> {name} [{identifier}]
                                </button>

                        }
                        </div>
                    </div>
                </div>
            </div>  
            )
        }
        </>
    )
}

SelectWalletConnection.protoTypes{
    connection.
}

export default SelectWalletConnection;