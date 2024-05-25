
import './style.css'

function Message({message, type}) {
    return (
        <div className="dialog-overlay error">
          <div className="dialog-content error">
            <h3>Thông báo lỗi !</h3>
            <p>{message}</p>
            <button className="close" onClick={() => setErrorDialogVisible(false)}>
              Thoát
            </button>
          </div>
        </div>
    )
}

export default Message()