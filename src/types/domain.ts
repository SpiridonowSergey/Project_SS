// src/types/domain.ts

export type MedicalSource = {
    id: string;
    title: string;
    url: string;
    organization: string;
  };
  
  export type Substitute = {
    productId: string;
    note: string;
  };
  
  export type Allergen = {
    id: string;
    label: string;
    substitutes: Substitute[];
  };
  
  export type Ingredient = {
    productId: string;
    amount: number;
    unit: 'g' | 'ml' | 'piece';
  };
  
  export type Recipe = {
    id: string;
    title: string;
    minAgeMonths: number;
    caloriesPer100g: number;
    ingredients: Ingredient[];
    steps: string[];
    allergenIds: string[];
    isPremium: boolean;
  };
  
  export type FeedingStage = {
    ageMonths: number;
    productGroup: string;
    startVolume: string;
    targetVolume: string;
    sourceId: string; // Ссылка на MedicalSource
    notes?: string;
  };