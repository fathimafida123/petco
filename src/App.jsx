import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreUser } from "./redux/slice/authSlices";
import { getUserById } from "./services/user services";
import { getUser } from "./utils/localStorege";
import AppRoutes from "./routes/AppRoutes";
import { loadUserCart } from "./utils/loadCart";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreLoggedUser = async () => {
      const userId = getUser();

      if (!userId) {
        dispatch(restoreUser(null));
        return;
      }

      try {
        const user = await getUserById(userId);

        dispatch(restoreUser(user));
         
        await loadUserCart(user.id,dispatch)

      } catch (error) {
        console.log("Failed to restore user:", error);
        dispatch(restoreUser(null));
      }
    };

    restoreLoggedUser();
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;