// client/src/types.ts

export interface IUser {
    _id: string;
    name: string;
    avatarUrl?: string;
  }
  
  export interface IReview {
    _id: string;
    user: IUser;
    restaurant: string;
    rating: number;
    comment: string;
    images?: string[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface IRestaurant {
    _id: string;
    name: string;
    region: string;
    rating?: number;
    cuisine?: string[];
    address?: string;
    mainImage?: string;
    overview?: string;
  }
  