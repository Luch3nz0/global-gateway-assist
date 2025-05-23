import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserData = {
  nationality: string;
  age: string;
  educationLevel: string;
  destinationCountry: 'Brazil' | 'Portugal' | '';
  reasonForImmigration: string;
  serviceNeeds: string[];
  documents: { id: string; name: string; status: 'pending' | 'approved' | 'rejected' }[];
  nextSteps: { id: string; task: string; completed: boolean }[];
  additionalInfo?: string;
};

type UserDataContextType = {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
};

const defaultUserData: UserData = {
  nationality: '',
  age: '',
  educationLevel: '',
  destinationCountry: '',
  reasonForImmigration: '',
  serviceNeeds: [],
  documents: [],
  nextSteps: []
};

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>(defaultUserData);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};
