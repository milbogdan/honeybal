import { Order } from "../models/order.interface";

export const orderMocks: Order[] = [
  {
    id: 1,
    deliveryTypeId: 1,
    comment: "Nema komentara.",
    phoneNumber: "0601234567",
    address: "Кнез Михаилова 10, Београд",
    email: "pera@example.com",
    variations: [
      { quantity: 2, productVariationId: 101 },
      { quantity: 1, productVariationId: 102 }
    ],
    createOrder: new Date('2024-10-01'),
    statusOrder: "pending",
    price: 1200
  },
  {
    id: 2,
    deliveryTypeId: 2,
    comment: "Nema komentara.",
    phoneNumber: "0612345678",
    address: "Булевар ослобођења 45, Нови Сад",
    email: "mika@example.com",
    variations: [
      { quantity: 1, productVariationId: 103 }
    ],
    createOrder: new Date('2024-09-28'),
    statusOrder: "processing",
    price: 1200
  },
  {
    id: 3,
    deliveryTypeId: 1,
    comment: "",
    phoneNumber: "0623456789",
    address: "Цара Душана 7, Ниш",
    email: "ana@example.com",
    variations: [
      { quantity: 3, productVariationId: 104 }
    ],
    createOrder: new Date('2024-09-20'),
    statusOrder: "delivered",
    price: 1000
  },
  {
    id: 4,
    deliveryTypeId: 3,
    comment: "Позвати пре испоруке.",
    phoneNumber: "0634567890",
    address: "Трг Републике 1, Крагујевац",
    email: "marko@example.com",
    variations: [
      { quantity: 2, productVariationId: 105 },
      { quantity: 2, productVariationId: 106 }
    ],
    createOrder: new Date('2024-10-03'),
    statusOrder: "cancelled",
    price: 800
  },
  {
    id: 5,
    deliveryTypeId: 2,
    comment: "Немам ситно.",
    phoneNumber: "0645678901",
    address: "Јевремова 19, Нови Пазар",
    email: "sanja@example.com",
    variations: [
      { quantity: 1, productVariationId: 107 }
    ],
    createOrder: new Date('2024-10-05'),
    statusOrder: "pending",
    price: 4800
  },
  {
    id: 6,
    deliveryTypeId: 1,
    comment: "",
    phoneNumber: "0656789012",
    address: "Змај Јовина 4, Суботица",
    email: "igor@example.com",
    variations: [
      { quantity: 4, productVariationId: 108 }
    ],
    createOrder: new Date('2024-10-06'),
    statusOrder: "processing",
    price: 10000
  },
  {
    id: 7,
    deliveryTypeId: 3,
    comment: "Dobro upakovati.",
    phoneNumber: "0667890123",
    address: "Краља Петра 22, Чачак",
    email: "nina@example.com",
    variations: [
      { quantity: 2, productVariationId: 109 },
      { quantity: 1, productVariationId: 110 }
    ],
    createOrder: new Date('2024-10-07'),
    statusOrder: "delivered",
    price: 300
  },
  {
    id: 8,
    deliveryTypeId: 2,
    comment: "",
    phoneNumber: "0678901234",
    address: "Балканска 12, Београд",
    email: "jelena@example.com",
    variations: [
      { quantity: 1, productVariationId: 111 }
    ],
    createOrder: new Date('2024-10-08'),
    statusOrder: "cancelled",
    price: 1200
  },
  {
    id: 9,
    deliveryTypeId: 1,
    comment: "Убрзана достава ако може.",
    phoneNumber: "0689012345",
    address: "Гаврила Принципа 20, Нови Сад",
    email: "vanja@example.com",
    variations: [
      { quantity: 3, productVariationId: 112 }
    ],
    createOrder: new Date('2024-10-09'),
    statusOrder: "processing",
    price: 1200
  },
  {
    id: 10,
    deliveryTypeId: 2,
    comment: "",
    phoneNumber: "0690123456",
    address: "Немањина 14, Београд",
    email: "dragan@example.com",
    variations: [
      { quantity: 1, productVariationId: 113 }
    ],
    createOrder: new Date('2024-10-10'),
    statusOrder: "pending",
    price: 1200
  },
  {
    id: 11,
    deliveryTypeId: 1,
    comment: "",
    phoneNumber: "0602345678",
    address: "Милутина Миланковића 35, Београд",
    email: "zoran@example.com",
    variations: [
      { quantity: 2, productVariationId: 114 }
    ],
    createOrder: new Date('2024-10-11'),
    statusOrder: "delivered",
    price: 1200
  },
  {
    id: 12,
    deliveryTypeId: 3,
    comment: "",
    phoneNumber: "0613456789",
    address: "Булевар краља Александра 90, Београд",
    email: "luka@example.com",
    variations: [
      { quantity: 1, productVariationId: 115 }
    ],
    createOrder: new Date('2024-10-12'),
    statusOrder: "processing",
    price: 2200
  },
  {
    id: 13,
    deliveryTypeId: 2,
    comment: "Без соли.",
    phoneNumber: "0624567890",
    address: "Косовска 22, Београд",
    email: "sara@example.com",
    variations: [
      { quantity: 3, productVariationId: 116 }
    ],
    createOrder: new Date('2024-10-13'),
    statusOrder: "cancelled",
    price: 3200
  },
  {
    id: 14,
    deliveryTypeId: 1,
    comment: "",
    phoneNumber: "0635678901",
    address: "Карађорђева 5, Нови Сад",
    email: "milica@example.com",
    variations: [
      { quantity: 2, productVariationId: 117 }
    ],
    createOrder: new Date('2024-10-14'),
    statusOrder: "pending",
    price: 1200
  },
  {
    id: 15,
    deliveryTypeId: 3,
    comment: "Пробати позвати ако не отворим.",
    phoneNumber: "0646789012",
    address: "Војводе Степе 15, Београд",
    email: "nikola@example.com",
    variations: [
      { quantity: 1, productVariationId: 118 }
    ],
    createOrder: new Date('2024-10-15'),
    statusOrder: "processing",
    price: 2200
  },
  {
    id: 16,
    deliveryTypeId: 2,
    comment: "Pozvati kada posaljete.",
    phoneNumber: "0657890123",
    address: "Теразије 18, Београд",
    email: "mirjana@example.com",
    variations: [
      { quantity: 1, productVariationId: 119 },
      { quantity: 2, productVariationId: 120 }
    ],
    createOrder: new Date('2024-10-16'),
    statusOrder: "delivered",
    price: 1200
  },
  {
    id: 17,
    deliveryTypeId: 1,
    comment: "",
    phoneNumber: "0668901234",
    address: "Светозара Марковића 6, Ниш",
    email: "dusan@example.com",
    variations: [
      { quantity: 2, productVariationId: 121 }
    ],
    createOrder: new Date('2024-10-17'),
    statusOrder: "pending",
    price: 1200
  },
  {
    id: 18,
    deliveryTypeId: 3,
    comment: "Позвати на алтернативни број.",
    phoneNumber: "0679012345",
    address: "Савска 9, Београд",
    email: "jelica@example.com",
    variations: [
      { quantity: 2, productVariationId: 122 }
    ],
    createOrder: new Date('2024-10-18'),
    statusOrder: "processing",
    price: 1200
  },
  {
    id: 19,
    deliveryTypeId: 2,
    comment: "",
    phoneNumber: "0680123456",
    address: "Булевар Европа 25, Нови Сад",
    email: "filip@example.com",
    variations: [
      { quantity: 1, productVariationId: 123 }
    ],
    createOrder: new Date('2024-10-19'),
    statusOrder: "cancelled",
    price: 1200
  },
  {
    id: 20,
    deliveryTypeId: 1,
    comment: "Хвала унапред!",
    phoneNumber: "0691234567",
    address: "Ђуре Јакшића 7, Крагујевац",
    email: "katarina@example.com",
    variations: [
      { quantity: 3, productVariationId: 124 }
    ],
    createOrder: new Date('2024-10-20'),
    statusOrder: "delivered",
    price: 1200
  }
];
