import { useState, useEffect, useRef } from "react";
import { InteractionManager } from "react-native";

export const useAfterInteractions = () => {
  const [interactionsComplete, setInteractionsComplete] = useState(false);
  const interactionSubRef = useRef(null);

  useEffect(() => {
    interactionSubRef.current = InteractionManager.runAfterInteractions(() => {
      setInteractionsComplete(true);
      interactionSubRef.current = null;
    });
    return () => {
      interactionSubRef.current?.cancel();
    };
  }, []);

  return { shouldRender: interactionsComplete };
};
