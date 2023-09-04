import { Navbar } from "@/components/";
import LoginForm from "./components/LoginForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  return (
    <>
      <Navbar />
      <LoginForm />
    </>
  );
}
