import { useContext } from "react";
import { Context } from ".";
import { getMails } from "./http/MailAPI";

const Interval = async () => {
  const { user } = useContext(Context);
  const { mail } = useContext(Context);

  const intervalFunc = async () => {
    const dataMail = await getMails(user.user.id);
    dataMail.forEach((element) => {
      element.user = element.user.email;
    });
    mail.setMail(dataMail);
  };

  setInterval(intervalFunc, 5000);
};

export default Interval;
