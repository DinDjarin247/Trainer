

// Ingredient 인터페이스 정의
export const Ingredient = {
  icon: "",
  label: ""
};


// 모든 재료 배열
export const allIngredients = [
  { icon: "💪", label: "운동량" },
  { icon: "🧬", label: "체성분" },
  { icon: "⌚", label: "운동시간" },
  { icon: "🥕", label: "Carrot" },
  { icon: "🍌", label: "Banana" },
  { icon: "🫐", label: "Blueberries" },
  { icon: "🥂", label: "Champers?" }
];

// 초기 탭 배열
const [tomato, lettuce, cheese] = allIngredients;
export const initialTabs = [tomato, lettuce, cheese];

// 다음 재료 가져오기 함수
export function getNextIngredient(ingredients) {
  const existing = new Set(ingredients);
  return allIngredients.find((ingredient) => !existing.has(ingredient));
}
