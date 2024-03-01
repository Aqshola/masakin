import { createContext, useState } from "react";

type cameraState = {
  file: string;
  url: string;
};

type Props = {
  children: React.ReactNode;
};

type Context = {
  data: cameraState | undefined;
  load: boolean;
  setLoading: (val: boolean) => void;
  setCamera: (file: string, url: string) => void;
};

export const CameraContext = createContext<Context | null>(null);

export default function CameraProvider({ children }: Props) {
  const [data, setData] = useState<cameraState>();

  const [load, setLoad] = useState<boolean>(false);

  function handleLoading(val: boolean) {
    setLoad(val);
  }

  function handleData(file: string, url: string) {
    setData({
      file,
      url,
    });
  }

  return (
    <CameraContext.Provider
      value={{
        data,
        load,
        setCamera: handleData,
        setLoading: handleLoading,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
}
