type UpdateObjectArrayPayload<T> = {
  array: T[];
  item: T;
  itemKey: keyof T;
};

export const updateObjectArray = <
  T extends Partial<Record<keyof T | "id", unknown>>
>({
  array,
  item,
  itemKey
}: UpdateObjectArrayPayload<T>) => {
  const foundItem = array.find(
    currentItem => currentItem[itemKey] === item[itemKey]
  );

  if (foundItem) {
    return array.map(currentItem =>
      currentItem.id === foundItem.id
        ? { ...item, id: currentItem.id }
        : currentItem
    );
  } else {
    return [...array, item];
  }
};
