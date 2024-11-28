// src/app/models/user.model.ts

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    date: string;
    membership: string;
    image: string; // or `image: File | null;` if you want to allow for file objects
  }