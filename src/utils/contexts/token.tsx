import {
  ReactNode,
  createContext,
  useMemo,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { useCookies } from "react-cookie";

import { useToast } from "@/components/ui/use-toast";
import { setAxiosConfig } from "@/utils/apis/axiosWithConfig";
import { ProfileType, getProfile } from "@/utils/apis/users";

interface Context {
  token: string;
  user: Partial<ProfileType>;
  changeToken: (token?: string) => void;
}

interface Props {
  children: ReactNode;
}

const contextValue = {
  token: "",
  user: {},
  changeToken: () => {},
};

const TokenContext = createContext<Context>(contextValue);

function TokenProvider({ children }: Readonly<Props>) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { toast } = useToast();
  const [token, setToken] = useState(cookies.token ?? "");
  const [user, setUser] = useState<Partial<ProfileType>>({});

  useEffect(() => {
    setAxiosConfig(token);
    token && fetchProfile();
  }, [token]);

  const fetchProfile = useCallback(async () => {
    try {
      const result = await getProfile();
      setUser(result.payload!);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.message.toString(),
        variant: "destructive",
      });
    }
  }, [token]);

  const changeToken = useCallback(
    (token?: string) => {
      const newToken = token ?? "";
      setToken(newToken);
      if (token) {
        setCookie("token", newToken);
      } else {
        removeCookie("token");
        setUser({});
      }
    },
    [token]
  );

  const tokenContextValue = useMemo(
    () => ({
      token,
      user,
      changeToken,
    }),
    [token, user, changeToken]
  );

  return (
    <TokenContext.Provider value={tokenContextValue}>
      {children}
    </TokenContext.Provider>
  );
}

function useToken() {
  const context = useContext(TokenContext);

  if (context === undefined) {
    console.log("ERROR, useToken must be used within TokenContext");
  }

  return context;
}

export { TokenProvider, useToken };
