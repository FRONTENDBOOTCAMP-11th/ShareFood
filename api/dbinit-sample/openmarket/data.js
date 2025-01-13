import moment from 'moment';

function getTime(day = 0, second = 0) {
  return moment()
    .add(day, 'days')
    .add(second, 'seconds')
    .format('YYYY.MM.DD HH:mm:ss');
}

export const initData = async (clientId, nextSeq) => {
  return {
    // 회원
    user: [
      {
        _id: await nextSeq('user'),
        email: 'a1@gmail.com',
        password:
          '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '장유진',
        phone: '01011112222',
        address: '서울시 강남구 역삼동 123',
        type: 'seller',
        loginType: 'email',
        image: `/files/${clientId}/yujin.png`,
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        extra: {
          birthday: '02-04',
          membershipClass: 'MC03',
          addressBook: [],
        },
      },
      {
        _id: await nextSeq('user'),
        email: 'a2@gmail.com',
        password:
          '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '이선재',
        phone: '01022223333',
        address: '서울시 강남구 삼성동 456',
        type: 'seller',
        loginType: 'email',
        image: `/files/${clientId}/sunjae.png`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
        extra: {
          birthday: '11-23',
          membershipClass: 'MC01',
          addressBook: [],
        },
      },
      {
        _id: await nextSeq('user'),
        email: 'a3@gmail.com',
        password:
          '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '이현종',
        phone: '01033334444',
        address: '서울시 강남구 도곡동 789',
        type: 'seller',
        loginType: 'email',
        image: `/files/${clientId}/hyunjong.png`,
        createdAt: getTime(-40, -60 * 30),
        updatedAt: getTime(-30, -60 * 20),
        extra: {
          birthday: '11-24',
          membershipClass: 'MC02',
          addressBook: [],
        },
      },
      {
        _id: await nextSeq('user'),
        email: 'a4@gmail.com',
        password:
          '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '김건우',
        phone: '01044445555',
        address: '서울시 강남구 논현동 222',
        type: 'seller',
        loginType: 'email',
        image: `/files/${clientId}/geonwoo.png`,
        createdAt: getTime(-20, -60 * 30),
        updatedAt: getTime(-10, -60 * 60 * 12),
        extra: {
          birthday: '11-30',
          membershipClass: 'MC02',
          address: [
            {
              id: 1,
              name: '회사',
              value: '서울시 강동구 천호동 123',
            },
            {
              id: 2,
              name: '집',
              value: '서울시 강동구 성내동 234',
            },
          ],
        },
      },
    ],
    // 상품
    product: [
      // 같이 사요 1번 상품
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 2000,
        show: true,
        active: true,
        name: '포도 같이 사실 분~',
        quantity: 20,
        buyQuantity: 10,
        mainImages: [
          {
            path: `/files/${clientId}/grape.png`,
            name: 'grape.png',
            originalname: 'grape.png',
          },
        ],
        content: '포도 한박스에 20송이나 있어서 같이 사실 분 구합니다다ㅠㅠ',
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          location: '서울',
          subLocation: '역삼동 주공아파트 3단지 놀이터',
          meetingTime: '2025.02.03 10:00',
          type: 'buy',
        },
      },
      // 같이 사요 2번 상품
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 3000,
        show: true,
        active: true,
        name: '오렌지 먹은지 너무 오렌지..',
        quantity: 15,
        buyQuantity: 3,
        mainImages: [
          {
            path: `/files/${clientId}/orange.png`,
            name: 'orange.png',
            originalname: 'orange.png',
          },
        ],
        content: '죄송합니다 그냥 오렌지가 먹고싶었을 뿐이에요ㅇㅅㅇ',
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          location: '경기',
          subLocation: '월곡동 구미아파트 정자',
          meetingTime: '2025.01.23 10:00',
          type: 'buy',
        },
      },
      // 같이 사요 3번 상품
      {
        _id: await nextSeq('product'),
        seller_id: 3,
        price: 3000,
        show: true,
        active: true,
        name: '딸기 공구 해요',
        quantity: 3,
        buyQuantity: 1,
        mainImages: [
          {
            path: `/files/${clientId}/strawberry.png`,
            name: 'strawberry.png',
            originalname: 'strawberry.png',
          },
        ],
        content:
          '딸기가 요즘 철이라죠 겨울딸기 먹으실 분 구해요~ 3박스가 한 세트던데 한 세트씩 가져가실 분?',
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          location: '강원',
          subLocation: '춘천시 퇴계동 자이아파트 입구',
          meetingTime: '2025.02.03 10:00',
          type: 'buy',
        },
      },
      // 같이 사요 4번 상품
      {
        _id: await nextSeq('product'),
        seller_id: 4,
        price: 3000,
        show: true,
        active: true,
        name: '당근 vs 셰푸',
        quantity: 100,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/carrat.png`,
            name: 'carrat.png',
            originalname: 'carrat.png',
          },
        ],
        content: '셰푸 승',
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          location: '강원',
          subLocation: '춘천시 퇴계동 자이아파트 입구',
          meetingTime: '2025.02.03 10:00',
          type: 'buy',
        },
      },
      // 팔아요 1번 상품
      {
        _id: await nextSeq('product'),
        seller_id: 4,
        price: 3000,
        show: true,
        active: true,
        name: '포도 팝니다',
        quantity: 5,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/grape.png`,
            name: 'grape.png',
            originalname: 'grape.png',
          },
        ],
        content: '포도가 집에 너어무 많아요',
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          location: '서울',
          subLocation: '주공아파트 3단지 입구',
          meetingTime: '25년 1월 3일 10:00',
          type: 'sell',
        },
      },
      // 팔아요 2번 상품
      {
        _id: await nextSeq('product'),
        seller_id: 3,
        price: 3000,
        show: true,
        active: true,
        name: '오렌지 팝니다',
        quantity: 5,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/orange.png`,
            name: 'orange.png',
            originalname: 'orange.png',
          },
        ],
        content: '오렌지 안 좋아해요',
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          location: '충청',
          subLocation: '계룡시 육군본부 입구',
          meetingTime: '2025.02.03 10:00',
          type: 'sell',
        },
      },
      // 팔아요 3번 상품
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 3000,
        show: true,
        active: true,
        name: '바니바니바니바니 당근당근 바니바니바니바니 당근당근 바니바니바니바니 당근당근',
        quantity: 8,
        buyQuantity: 2,
        mainImages: [
          {
            path: `/files/${clientId}/carrat.png`,
            name: 'carrat.png',
            originalname: 'carrat.png',
          },
        ],
        content:
          '바니바니바니바니 당근당근 바니바니바니바니 당근당근 바니바니바니바니 당근당근',
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          location: '경상',
          subLocation: '해운대',
          meetingTime: '2025.02.03 10:00',
          type: 'sell',
        },
      },
      // 팔아요 4번 상품
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 3000,
        show: true,
        active: true,
        name: '수박 팝니다',
        quantity: 10,
        buyQuantity: 2,
        mainImages: [
          {
            path: `/files/${clientId}/watermelon.png`,
            name: 'watermelon.png',
            originalname: 'watermelon.png',
          },
        ],
        content: '겨울에 수박먹는게 진짜 수박을 사랑하는 일',
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          location: '전라',
          subLocation: '광주 문화예술 전당',
          meetingTime: '2025.02.03 10:00',
          type: 'sell',
        },
      },
    ],
    // 주문
    order: [
      {
        _id: await nextSeq('order'),
        user_id: 4,
        state: 'OS020',
        products: [
          {
            _id: 2,
            seller_id: 1,
            state: 'OS020',
            name: '포도 같이 사실 분~',
            image: {
              path: `/files/${clientId}/grape.png`,
              name: 'grape.png',
              originalname: 'grape.png',
            },
            extra: {
              location: '충청',
              subLocation: '계룡시 육군본부 입구',
              meetingTime: '1월 3일',
              type: 'sell',
            },
            quantity: 2,
            buyQuantity: 5,
            price: 3000,
            review_id: 3,
          },
        ],
        cost: {
          products: 3000,
        },
      },
      {
        _id: await nextSeq('order'),
        user_id: 1,
        state: 'OS020',
        products: [
          {
            _id: 3,
            seller_id: 2,
            state: 'OS020',
            name: '오렌지 먹은지 너무 오렌지..',
            image: {
              path: `/files/${clientId}/orange.png`,
              name: 'orange.png',
              originalname: 'orange.png',
            },
            extra: {
              location: '충청',
              subLocation: '계룡시 육군본부 입구',
              meetingTime: '1월 3일',
              type: 'sell',
            },
            quantity: 4,
            buyQuantity: 4,
            price: 11000,
            review_id: 2,
          },
        ],
        cost: {
          products: 11000,
        },
      },
      {
        _id: await nextSeq('order'),
        user_id: 2,
        state: 'OS020',
        products: [
          {
            _id: 3,
            seller_id: 3,
            state: 'OS020',
            name: '딸기 공구 해요',
            image: {
              path: `/files/${clientId}/strawberry.png`,
              name: 'strawberry.png',
              originalname: 'strawberry.png',
            },
            quantity: 4,
            buyQuantity: 4,
            price: 11000,
            review_id: 2,
          },
        ],
        cost: {
          products: 11000,
        },
      },
      {
        _id: await nextSeq('order'),
        user_id: 3,
        state: 'OS020',
        products: [
          {
            _id: 1,
            seller_id: 4,
            state: 'OS020',
            name: '당근 vs 셰푸',
            image: {
              path: `/files/${clientId}/carrat.png`,
              name: 'carrat.png',
              originalname: 'carrat.png',
            },
            extra: {
              location: '충청',
              subLocation: '계룡시 육군본부 입구',
              meetingTime: '1월 3일',
              type: 'sell',
            },
            quantity: 6,
            buyQuantity: 8,
            price: 2000,
            review_id: 4,
          },
        ],
        cost: {
          products: 2000,
        },
      },
    ],
    // 후기
    review: [
      {
        _id: await nextSeq('review'),
        user_id: 1,
        user: {
          _id: 1,
          name: '장유진',
          image: 'yujin.png',
        },
        order_id: 1,
        product_id: 2,
        rating: 5,
        content: '우~ 드립이 구려서 안살래요',
        createdAt: getTime(-4, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('review'),
        user_id: 2,
        user: {
          _id: 2,
          name: '이선재',
          image: 'sunjae.png',
        },
        order_id: 4,
        product_id: 1,
        rating: 4,
        content: '날이면 날마다 오는게 아니에요~',
        createdAt: getTime(-3, -60 * 60 * 1),
      },
      {
        _id: await nextSeq('review'),
        user_id: 3,
        user: {
          _id: 3,
          name: '이현종',
          image: 'hyunjong.png',
        },
        order_id: 1,
        product_id: 3,
        rating: 1,
        content: '네고 가능한가요?',
        createdAt: getTime(-2, -60 * 60 * 10),
      },
      {
        _id: await nextSeq('review'),
        user_id: 4,
        user: {
          _id: 4,
          name: '김건우',
          image: 'geonwoo.png',
        },
        order_id: 2,
        product_id: 3,
        rating: 1,
        content: '제가 많이 사도 되나요?',
        createdAt: getTime(-2, -60 * 60 * 10),
      },
      {
        _id: await nextSeq('review'),
        user_id: 1,
        user: {
          _id: 1,
          name: '장유진',
          image: 'yujin.png',
        },
        order_id: 3,
        product_id: 3,
        rating: 1,
        content: '군침이 싹',
        createdAt: getTime(-2, -60 * 60 * 10),
      },
    ],
    // 장바구니
    cart: [
      {
        _id: await nextSeq('cart'),
        user_id: 4,
        product_id: 1,
        quantity: 2,
        createdAt: getTime(-7, -60 * 30),
        updatedAt: getTime(-7, -60 * 30),
      },
      {
        _id: await nextSeq('cart'),
        user_id: 4,
        product_id: 2,
        quantity: 1,
        createdAt: getTime(-4, -60 * 30),
        updatedAt: getTime(-3, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('cart'),
        user_id: 2,
        product_id: 3,
        quantity: 2,
        createdAt: getTime(-3, -60 * 60 * 4),
        updatedAt: getTime(-3, -60 * 60 * 4),
      },
      {
        _id: await nextSeq('cart'),
        user_id: 2,
        product_id: 4,
        quantity: 3,
        createdAt: getTime(-2, -60 * 60 * 12),
        updatedAt: getTime(-1, -60 * 60 * 20),
      },
    ],
    // 즐겨찾기/북마크
    bookmark: [
      {
        _id: await nextSeq('bookmark'),
        user_id: 1,
        user: {
          _id: 1,
          name: '장유진',
          image: `/files/${clientId}/yujin.png`,
        },
        type: 'product',
        target_id: 2,
        memo: '첫째 크리스마스 선물.',
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq('bookmark'),
        user_id: 1,
        user: {
          _id: 1,
          name: '장유진',
          image: `/files/${clientId}/yujin.png`,
        },
        type: 'product',
        target_id: 4,
        memo: '둘째 생일 선물',
        createdAt: getTime(-1, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('bookmark'),
        user_id: 2,
        user: {
          _id: 2,
          name: '이선재',
          image: `/files/${clientId}/seonjae.png`,
        },
        type: 'product',
        target_id: 2,
        memo: '단골 셀러',
        createdAt: getTime(-2, -60 * 60 * 20),
      },
      {
        _id: await nextSeq('bookmark'),
        user_id: 3,
        user: {
          _id: 3,
          name: '이현종',
          image: `/files/${clientId}/hyunjong.png`,
        },
        type: 'product',
        target_id: 1,
        memo: '크기 문의글 북마크',
        createdAt: getTime(-1, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('bookmark'),
        user_id: 4,
        user: {
          _id: 4,
          name: '김건우',
          image: `/files/${clientId}/geonwoo.png`,
        },
        type: 'product',
        target_id: 4,
        memo: '1순위로 살것!',
        createdAt: getTime(-1, -60 * 60 * 12),
      },
    ],
    // QnA, 공지사항 등의 게시판
    post: [
      {
        _id: await nextSeq('post'),
        type: 'qna',
        product_id: 1,
        seller_id: 2,
        views: 5,
        user: {
          _id: 4,
          name: '제이지',
          image: 'user-jayg.webp',
        },
        title: '크기가 얼만만한가요?',
        content: '아이가 6살인데 가지고 놀기 적당한 크기인가요?',
        replies: [
          {
            _id: 1,
            user_id: 2,
            user: {
              _id: 2,
              name: '네오',
              image: 'user-neo.webp',
            },
            content: '크기는 상품 상세정보에 나와 있습니다.',
            like: 5,
            createdAt: getTime(-2, -60 * 60 * 20),
            updatedAt: getTime(-2, -60 * 60 * 2),
          },
          {
            _id: 2,
            user_id: 4,
            user: {
              _id: 4,
              name: '제이지',
              image: 'user-jayg.webp',
            },
            content: '어디있나 모르겠어요.',
            like: 7,
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
          },
          {
            _id: 3,
            user_id: 2,
            user: {
              _id: 2,
              name: '네오',
              image: 'user-neo.webp',
            },
            content: '높이 60cm 입니다.',
            like: 3,
            createdAt: getTime(-2, -60 * 60 * 9),
            updatedAt: getTime(-1, -60 * 60 * 20),
          },
        ],
        createdAt: getTime(-3, -60 * 60 * 2),
        updatedAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq('post'),
        type: 'qna',
        product_id: 1,
        seller_id: 2,
        views: 50,
        user: {
          _id: 4,
          name: '제이지',
          image: 'user-jayg.webp',
        },
        title: '이번주 토요일까지 받아볼 수 있을까요?',
        content: '토요일 생일 선물로 준비중인데 그때까지 배송 가능할까요?',
        createdAt: getTime(-2, -60 * 60 * 1),
        updatedAt: getTime(-1, -60 * 60 * 20),
      },
      {
        _id: await nextSeq('post'),
        type: 'qna',
        product_id: 4,
        seller_id: 3,
        views: 0,
        user: {
          _id: 2,
          name: '네오',
          image: 'user-neo.webp',
        },
        title: '배송 빨리 보내주세요.',
        content: '양품으로 보내주세요.',
        createdAt: getTime(-1, -60 * 60 * 14),
        updatedAt: getTime(-1, -60 * 60 * 2),
      },
      {
        _id: await nextSeq('post'),
        type: 'notice',
        views: 10,
        user: {
          _id: 1,
          name: '무지',
          image: 'user-muzi.webp',
        },
        title: '배송지연 안내',
        content:
          '크리스마스 물류 증가로 인해 평소보다 2~3일 지연될 예정입니다.',
        createdAt: getTime(-4, -60 * 60 * 2),
        updatedAt: getTime(-2, -60 * 60 * 13),
      },
      {
        _id: await nextSeq('post'),
        type: 'notice',
        views: 15,
        user: {
          _id: 1,
          name: '무지',
          image: 'user-muzi.webp',
        },
        title: '배송비 인상 안내',
        content:
          '택배사 배송비 인상으로 인해 기존 3,000원에서 3,500원으로 인상됩니다.',
        createdAt: getTime(-6, -60 * 60 * 20),
        updatedAt: getTime(-4, -60 * 60 * 13),
      },
    ],
    // 코드
    code: [
      {
        _id: 'productCategory',
        title: '상품 카테고리',
        codes: [
          {
            sort: 2,
            code: 'PC01',
            value: '어린이',
            depth: 1,
          },
          {
            sort: 3,
            code: 'PC0101',
            value: '퍼즐',
            parent: 'PC01',
            depth: 2,
          },
          {
            sort: 1,
            code: 'PC0102',
            value: '보드게임',
            parent: 'PC01',
            depth: 2,
          },
          {
            sort: 2,
            code: 'PC010201',
            value: '2인용',
            parent: 'PC0102',
            depth: 3,
          },
          {
            sort: 1,
            code: 'PC010202',
            value: '3~4인용',
            parent: 'PC0102',
            depth: 3,
          },
          {
            sort: 2,
            code: 'PC0103',
            value: '레고',
            parent: 'PC01',
            depth: 2,
          },
          {
            sort: 4,
            code: 'PC0104',
            value: '로봇',
            parent: 'PC01',
            depth: 2,
          },

          {
            sort: 1,
            code: 'PC02',
            value: '스포츠',
            depth: 1,
          },
          {
            sort: 1,
            code: 'PC0201',
            value: '축구',
            parent: 'PC02',
            depth: 2,
          },
          {
            sort: 3,
            code: 'PC0202',
            value: '야구',
            parent: 'PC02',
            depth: 2,
          },
          {
            sort: 2,
            code: 'PC0203',
            value: '농구',
            parent: 'PC02',
            depth: 2,
          },

          {
            sort: 3,
            code: 'PC03',
            value: '어른',
            depth: 1,
          },
          {
            sort: 1,
            code: 'PC0301',
            value: '원격 조종',
            parent: 'PC03',
            depth: 2,
          },
          {
            sort: 2,
            code: 'PC0302',
            value: '퍼즐',
            parent: 'PC03',
            depth: 2,
          },
          {
            sort: 3,
            code: 'PC0303',
            value: '레고',
            parent: 'PC03',
            depth: 2,
          },
        ],
      },
      {
        _id: 'orderState',
        title: '주문 상태',
        codes: [
          {
            sort: 1,
            code: 'OS010',
            value: '주문 완료',
          },
          {
            sort: 2,
            code: 'OS020',
            value: '결제 완료',
          },
          {
            sort: 3,
            code: 'OS030',
            value: '배송 준비중',
          },
          {
            sort: 4,
            code: 'OS035',
            value: '배송중',
          },
          {
            sort: 5,
            code: 'OS040',
            value: '배송 완료',
          },
          {
            sort: 6,
            code: 'OS110',
            value: '반품 요청',
          },
          {
            sort: 7,
            code: 'OS120',
            value: '반품 처리중',
          },
          {
            sort: 8,
            code: 'OS130',
            value: '반품 완료',
          },
          {
            sort: 9,
            code: 'OS210',
            value: '교환 요청',
          },
          {
            sort: 10,
            code: 'OS220',
            value: '교환 처리중',
          },
          {
            sort: 11,
            code: 'OS230',
            value: '교환 완료',
          },
          {
            sort: 12,
            code: 'OS310',
            value: '환불 요청',
          },
          {
            sort: 13,
            code: 'OS320',
            value: '환불 처리중',
          },
          {
            sort: 14,
            code: 'OS330',
            value: '환불 완료',
          },
        ],
      },
      {
        _id: 'membershipClass',
        title: '회원 등급',
        codes: [
          {
            sort: 1,
            code: 'MC01',
            value: '일반',
            discountRate: 0, // 할인율
          },
          {
            sort: 2,
            code: 'MC02',
            value: '프리미엄',
            discountRate: 10,
          },
          {
            sort: 3,
            code: 'MC03',
            value: 'VIP',
            discountRate: 20,
          },
        ],
      },
    ],
    // 설정
    config: [
      {
        _id: 'shippingFees',
        title: '배송비',
        value: 3500,
      },
      {
        _id: 'freeShippingFees',
        title: '배송비 무료 금액',
        value: 50000,
      },
    ],
  };
};
