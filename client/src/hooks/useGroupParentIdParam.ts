import { useParams } from "react-router-dom";

export const useGroupParentIdParam = () => {
  const { groupParentId } = useParams<{ groupParentId: string }>();

  if (groupParentId === undefined || groupParentId === null) {
    return null;
  }
  
  const isNum = /^\d+$/.test(groupParentId);
  return isNum ? +groupParentId : null;
};
