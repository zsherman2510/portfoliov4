"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface BusinessContextProps {
  selectedBusinessId: string | null;
  businesses: any[];
  setSelectedBusinessId: (id: string | null) => void;
  setBusinesses: (businesses: any[]) => void;
  loggedInUser: any;
  setLoggedInUser: (user: any) => void;
  loading: boolean;
}

const BusinessContext = createContext<BusinessContextProps | undefined>(
  undefined
);

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error("useBusiness must be used within a BusinessProvider");
  }
  return context;
};

export const BusinessProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<{
    selectedBusinessId: string | null;
    loggedInUser: any;
    businesses: any[];
    loading: boolean;
  }>({
    selectedBusinessId: null,
    loggedInUser: null,
    businesses: [],
    loading: true,
  });

  const { data: session, status } = useSession();
  const router = useRouter();

  const setSelectedBusinessId = (id: string | null) => {
    setState((prev) => ({ ...prev, selectedBusinessId: id }));
    if (id) {
      localStorage.setItem("selectedBusinessId", id);
    } else {
      localStorage.removeItem("selectedBusinessId");
    }
  };

  useEffect(() => {
    const fetchBusinesses = async () => {
      if (status === "loading") return;

      if (!session) {
        router.push("/api/auth/signin"); // Redirect to login page if not authenticated
        return;
      }

      try {
        const response = await fetch("/api/business");
        const data = await response.json();

        if (!data.loggedInUser) {
          router.push("/api/auth/signin"); // Redirect to error page if fetching user fails
          return;
        }

        if (data.businesses.length === 0) {
          setState({
            selectedBusinessId: null,
            loggedInUser: data.loggedInUser,
            businesses: [],
            loading: false,
          });
          router.push("/welcome"); // Redirect to welcome page if no businesses
          return;
        }

        const storedBusinessId = localStorage.getItem("selectedBusinessId");
        const selectedBusinessId = data.businesses.some(
          (business: any) => business.id === storedBusinessId
        )
          ? storedBusinessId
          : data.businesses[0].id;

        setState({
          selectedBusinessId,
          loggedInUser: data.loggedInUser,
          businesses: data.businesses,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching businesses:", error);
        router.push("/error"); // Redirect to error page if fetching businesses fails
      }
    };

    fetchBusinesses();
  }, [session, status, router]);

  return (
    <BusinessContext.Provider
      value={{
        selectedBusinessId: state.selectedBusinessId,
        setSelectedBusinessId,
        businesses: state.businesses,
        setBusinesses: (businesses) =>
          setState((prev) => ({ ...prev, businesses })),
        loggedInUser: state.loggedInUser,
        setLoggedInUser: (user) =>
          setState((prev) => ({ ...prev, loggedInUser: user })),
        loading: state.loading,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};
