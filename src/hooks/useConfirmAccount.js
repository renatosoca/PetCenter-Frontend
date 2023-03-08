import { useContext } from "react"
import { AuthContext } from "../context"

export const useConfirmAccount = () => {
  const { status, errorMessage } = useContext( AuthContext );

}