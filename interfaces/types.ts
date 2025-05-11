export interface slider {
  id: number;
  discount: string;
  description: string;
  title: string;
  image: {
    media: string;
  };
  subscription_id: string;
}
export interface branches {
  ar: {
    title: string;
    address: string;
  };
  en: {
    title: string;
    address: string;
  };
  id: number;
  slug: string;
  title: string;
  type: string;
  address: string;
  lat: string;
  lng: string;
  email: string;
  phone_code: number;
  phone: number;
}
export interface partners {
  id: number;
  slug: string;
  image: string;
  title: string;
}
export interface slider {
  id: number;
  slug: string;
  desc: string;
  vedio: string;
}

export interface tools {
  id: number;
  slug: string;
  image: string;
}

export interface artical {
  id: number;
  slug: string;
  date: string;
  time: string;
  title: string;
  image: string;
}
export interface articals {
  articals: artical;
}
export interface latest_news {
  id: number;
  slug: string;
  date: string;
  time: string;
  title: string;
  image: string;
}

export interface galaries {
  id: number;
  slug: string;
  image: string;
  title: string;
}

export interface projects {
  id: number;
  slug: string;
  cover: string;
  title: string;
}
export interface certificates {
  id: number;
  slug: string;
  image: string;
  title: string;
  pdf: any;
}
export interface products {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  type?: string;
  price: string | number;
  discount?: string | number;
  brand: string;
  stock?: number;
  color?: string;
}
export interface projects {
  id: number;
  slug: string;
  cover: string;
  desc: string;
  title: string;
}
export interface values {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
}
export interface features {
  id: number;
  slug: string;
  name: string;
  image: string;
}
