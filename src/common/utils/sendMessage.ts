import axios from "axios";

const sendMessage = async (
  contactNum: string,
  title: string,
  price: string,
  orderId: string
) => {
  await axios.post("/api/message", {
    contactNum,
    title,
    price,
    orderId,
  });
};

export default sendMessage;
