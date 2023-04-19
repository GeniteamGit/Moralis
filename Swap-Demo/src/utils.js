
import { useMoralis } from "react-moralis";

export const Auth = ()=> {

    const { authenticate, isAuthenticated, user } = useMoralis();

    const login = async () => {
      if (!isAuthenticated) {

        await authenticate({ provider: "walletconnect", chainId: 97 })
          .then(function (user) {
            console.log(user.get("ethAddress"));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
}
