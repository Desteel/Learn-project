type UpdateObjectArrayPayload<T> = {
  array: T[];
  item: T;
  itemKey: keyof T;
};

export const updateObjectArray = <T extends Partial<Record<keyof T, unknown>>>({
  array,
  item,
  itemKey
}: UpdateObjectArrayPayload<T>) => {
  const hasItem = array.some(
    currentItem => currentItem[itemKey] === item[itemKey]
  );

  if (hasItem) {
    return array.map(currentItem =>
      currentItem[itemKey] === item[itemKey] ? item : currentItem
    );
  } else {
    return [...array, item];
  }
};
