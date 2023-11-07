import { useEffect } from "react";

function useTitle() {
  const changeTitle = (newTitle: string) => {
    document.title = newTitle;
  };

  useEffect(() => {
    return () => {
      document.title = "BookQuest";
    };
  });

  return changeTitle;
}

export default useTitle;
