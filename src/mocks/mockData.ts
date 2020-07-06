import {Message} from "app/store/messages/messages.types";
import {Trade} from "app/store/trades/trades.types";
import {User} from "app/store/user/user.types";

export const fillMockData = () => {
  window.localStorage.setItem('tradeChat', JSON.stringify({
    user: {
      id: 100500,
    },
    trades: [
      {
        "id": 1,
        "num": 4,
        "seller": {
          "id": 100500,
          "photoUrl": "/assets/rabbit.jpg",
          "name": "Rabbit",
          "likes": 3,
          "dislikes": 0,
        },
        "buyer": {
          "id": 500100,
          "photoUrl": "/assets/fox.jpg",
          "name": "Fox",
          "likes": 37,
          "dislikes": 1,
        },
        "card": "Amazon Gift Card",
        "amount": 77,
        "currencyFrom": "USD",
        "currencyTo": "BTC",
        "status": "paid",
        "hash": "45aFD3Rr",
        "startDate": 1593780443845,
        "endDate": 1593780445845
      },
      {
        "id": 2,
        "num": 10,
        "seller": {
          "id": 100500,
          "photoUrl": "/assets/rabbit.jpg",
          "name": "Rabbit",
          "likes": 3,
          "dislikes": 0,
        },
        "buyer": {
          "id": 500100,
          "photoUrl": "/assets/fox.jpg",
          "name": "Fox",
          "likes": 37,
          "dislikes": 1,
        },
        "card": "ITunes Gift Card",
        "amount": 30,
        "currencyFrom": "USD",
        "currencyTo": "BTC",
        "status": "unpaid",
        "hash": "65yhd23H",
        "startDate": 1593780453845
      },
      {
        "id": 3,
        "num": 13,
        "seller": {
          "id": 100500,
          "photoUrl": "/assets/rabbit.jpg",
          "name": "Rabbit",
          "likes": 3,
          "dislikes": 0,
        },
        "buyer": {
          "id": 500100,
          "photoUrl": "/assets/fox.jpg",
          "name": "Fox",
          "likes": 37,
          "dislikes": 1,
        },
        "card": "Paypal",
        "amount": 120,
        "currencyFrom": "USD",
        "currencyTo": "BTC",
        "status": "unpaid",
        "hash": "98njdS8",
        "startDate": 1593780457845
      }
    ],
    messages: [
      {
        "id": 1002,
        "userId": 500100,
        "text": "At sit dico platonem rationibus, mel ea dolores legendos eloquentiam.",
        "sendTime": new Date(1593846016827).toLocaleTimeString(),
        "tradeId": 1,
      },
      {
        "id": 1001,
        "userId": 100500,
        "text": "Commune referrentur voluptatibus quo cu, altera alienum concludaturque ad quo.",
        "sendTime": new Date(1593844216827).toLocaleTimeString(),
        "tradeId": 1,
      },
      {
        "id": 1000,
        "userId": 100500,
        "text": "Lorem ipsum dolor sit amet, nec te dolor omnes fabulas, sumo sanctus conceptam et has. Eu ignota aliquam pericula pro, et percipit ponderum vix. Eum ea habeo scriptorem, cu eam animal malorum. An persius dissentiet nec, ei mundi dicunt senserit nec. Ei torquatos vulputate dissentiunt est, oporteat expetenda pri ne.",
        "sendTime": new Date(1593840616827).toLocaleTimeString(),
        "tradeId": 1,
      },
      {
        "id": 2001,
        "userId": 100500,
        "text": "Commune referrentur voluptatibus quo cu, altera alienum concludaturque ad quo.",
        "sendTime": new Date(1593844216827).toLocaleTimeString(),
        "tradeId": 2,
      },
    ],
    notifications: {
      "100500": [2],
      "500100": [],
    }
  }));
};

export const getMessagesMock = (userId: number, tradeId: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = window.localStorage.getItem('tradeChat') || '';
      if (data === undefined) {
        return [];
      }
      const tradeChatData = JSON.parse(data);

      const { messages, notifications } = tradeChatData;
      const userNotifications = notifications[String(userId)];

      window.localStorage.setItem('tradeChat', JSON.stringify({
        ...tradeChatData,
        notifications: {
          ...notifications,
          [String(userId)]: userNotifications.filter((id: number) => id !== tradeId),
        },
      }));

      return resolve(messages.filter((message: Message) => message.tradeId === tradeId));
    }, 10);
  }) as Promise<Message[]>;
};

export const sendMessageMock = (userId: number, tradeId: number, text: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = window.localStorage.getItem('tradeChat') || "";
      const tradeChatData = JSON.parse(data);
      const { messages, trades, notifications } = tradeChatData;
      const date = new Date();

      const newMessage: Message = {
        tradeId,
        id: date.getTime(),
        text,
        userId,
        sendTime: date.toLocaleTimeString(),
      };

      const { seller, buyer } = trades.find((trade: Trade) => trade.id === tradeId);

      const receiverId = seller.id === userId ? buyer.id : seller.id;
      const receiverNotifications = notifications[String(receiverId)];
      const receiverNotificationsSet = new Set(receiverNotifications);
      receiverNotificationsSet.add(tradeId);

      window.localStorage.setItem('tradeChat', JSON.stringify({
        ...tradeChatData,
        messages: [newMessage, ...messages],
        notifications: {
          ...notifications,
          [String(receiverId)]: Array.from(receiverNotificationsSet),
        },
      }));
      return resolve(newMessage);
    }, 10);
  }) as Promise<Message>;
};

export const fetchNotificationsMock = (userId: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = window.localStorage.getItem('tradeChat');
      if (data === null) {
        return reject(new Error('Local data is not found'));
      }
      try {
        const { notifications } = JSON.parse(data);

        return resolve(notifications[String(userId)] || []);
      } catch (e) {
        return reject(new Error('Local data parsing error'));
      }
    }, 10);
  }) as Promise<number[]>;
};

export const fetchUserDataMock = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = window.localStorage.getItem('tradeChat');
      if (data === null) {
        return reject(new Error('Local data is not found'));
      }
      try {
        const { user } = JSON.parse(data);
        return resolve(user);
      } catch (e) {
        return reject(new Error('Local data parsing error'));
      }
    }, 10);
  }) as Promise<User>;
};

export const fetchTradesMock = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = window.localStorage.getItem('tradeChat');
      if (data === null) {
        return reject(new Error('Local data is not found'));
      }
      try {
        const { trades } = JSON.parse(data);
        return resolve(trades);
      } catch (e) {
        return reject(new Error('Local data parsing error'));
      }
    }, 10);
  }) as Promise<Trade[]>;
};

export const deleteTradeMock = (tradeId: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = window.localStorage.getItem('tradeChat');
      if (data === null) {
        return reject(new Error('Local data is not found'));
      }
      try {
        const tradeChatData = JSON.parse(data);
        const { trades } = tradeChatData;

        window.localStorage.setItem('tradeChat', JSON.stringify({
          ...tradeChatData,
          trades: trades.filter((trade: Trade) => trade.id !== tradeId),
        }));
        return resolve();
      } catch (e) {
        return reject(new Error('Local data parsing error'));
      }
    }, 10);
  }) as Promise<undefined>;
};
