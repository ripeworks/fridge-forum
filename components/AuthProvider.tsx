import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import storage from "local-storage-fallback";

type AuthContextType = {
  loading: boolean;
  pending?: boolean;
  user?: any;
  getToken: () => string;
  login: (token: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  loading: true,
  login: async () => {},
  getToken: () => "",
  pending: false,
  user: null,
});

type Props = {
  authenticate: (params: { token: string | null }) => Promise<any>;
  children: React.ReactNode;
  storageKey?: string;
};

export function AuthProvider({
  authenticate,
  children,
  storageKey = "authToken",
}: Props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const verifyTimeout = useRef<NodeJS.Timeout>();

  const getToken = () => storage.getItem(storageKey);

  useEffect(() => {
    async function perform() {
      setLoading(true);
      const token = getToken();
      try {
        const user = await authenticate({ token });
        setUser(user);
      } catch (err) {}
      setLoading(false);
    }
    perform();
  }, []);

  const login = async (token: string) => {
    storage.setItem(storageKey, token);
    setPending(true);
  };

  useEffect(() => {
    if (pending) {
      verifyTimeout.current = setInterval(async () => {
        const token = getToken();
        try {
          const res = await fetch(
            `https://api.fridgecms.com/v2/auth/verify?token=${token}`
          );
          if (res.ok) {
            setLoading(true);
            const user = await authenticate({ token });
            setUser(user);
            setLoading(false);
            setPending(false);
          }
        } catch (err) {}
      }, 10000);

      return () => {
        clearInterval(verifyTimeout.current);
      };
    } else {
      clearInterval(verifyTimeout.current);
    }
  }, [pending]);

  return (
    <AuthContext.Provider value={{ loading, login, pending, user, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
