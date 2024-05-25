import {RiErrorWarningFill} from 'react-icons/ri'

function Dialog({ message, onDialog ,title }) {
    

    return (
        <div style={
            {
                position: 'fixed',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                backgroundColor: 'rgb(0,0,0,0.5)',
                
            }
        }>
            <div style={{
                display: 'flex',
                width: '400px',
                flexDirection: 'column',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                backgroundColor: 'white',
                borderRadius: '4px'
            }}>
                <div style={{
                    color: '#111',  
                    backgroundColor: '#D2D7D3',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: "center",  
                    borderRadius: '4px 4px 0px 0' 
                }}>
                    <div style={{
                    color: '#25373D',
                    fontSize: '16px',
                    padding: '5px 5px 5px 15px',
                    fontWeight: 'bold',
                    
                }}>{title}</div>
                <button onClick={() => onDialog(false)}
                style={
                    {
                        width: '10%',   
                        padding: '5px',
                        backgroundColor: 'red',
                        border: 'none',
                        color: 'white',
                        borderRadius: '0px 4px 0px 0px' 
                    }
                }>
                    x
                </button>
                </div>
                <div style={{
                        padding: '24px',
                        width: '400px',
                         
                    }}>
                    <div >
                        <RiErrorWarningFill style={{
                        height: '44px',
                        width: '44px',
                        color: '#4387B5'
                    }}/> 
                        <span style={{
                        color: '#111',                       
                    }}> {message}</span>
                    </div>
                    </div>
                <div style={{
                    display: 'flex', alignItems:"end", color:'black', justifyContent: 'end'
                }}>
                    <button onClick={() => onDialog(true)}
                    style={{
                        padding: '10px',
                        width: "80px",
                        alignItems: 'center',
                        margin: '4px',
                        border: '#4387B5 3px solid',
                        borderRadius: '8px'
                    }}>OK</button>
                    <button onClick={() => onDialog(false)}
                    style={{
                        padding: '10px',
                        width: "80px",
                        alignItems: 'center',
                        margin: '4px', 
                        border: '#8199A3 2px solid',
                        borderRadius: '8px'
                    }}>Cancel</button>
                </div>

            </div>
        </div>
    )
}

export default Dialog


// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// const Dialog = ({title , message ,props, danger}) => {
//   const toggle = () => {
//     props.toggleModal();
//   };

//   const confirmDeleteBook = () => {
//     props.deleteBook(props.currentBook.bookId);
//     toggle();
//   };
//   return (
//     <Modal isOpen={props.isOpen} toggle={toggle}>
//       <ModalHeader>{title}</ModalHeader>
//       <ModalBody>{message}</ModalBody>
//       <ModalFooter>
//         <Button color="danger" onClick={confirmDeleteBook}>
//           {danger}
//         </Button>
//         <Button color="secondary" onClick={toggle}>
//           Hủy
//         </Button>
//       </ModalFooter>
//     </Modal>
//   );
// };

// export default Dialog;