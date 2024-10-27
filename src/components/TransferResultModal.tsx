import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// 定义组件的属性接口
interface TransferResultModalProps {
  show: boolean; // 控制模态框是否显示
  status: "success" | "fail"; // 表示转账的结果：成功或失败
  message: string; 
  handleClose: () => void; // 用于关闭模态框的函数
}

// TransferResultModal 组件
const TransferResultModal: React.FC<TransferResultModalProps> = ({
  show,
  status,
  message,
  handleClose,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      {" "}
      {/* Modal 用来创建弹窗 */}
      <Modal.Header closeButton>
        {" "}
        {/* 弹窗头部，带有关闭按钮 */}
        <Modal.Title>
          {/* 根据转账结果动态显示标题 */}
          {status === "success" ? "Transfer Successful" : "Transfer Failed"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* 根据转账结果显示不同的信息 */}
        {status === "success"
          ? "Your transfer has been completed successfully."
          : message}
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{
            backgroundColor: "#E3432B",
            borderColor: "#E3432B",
            color: "white",
          }}
          onClick={handleClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TransferResultModal;
